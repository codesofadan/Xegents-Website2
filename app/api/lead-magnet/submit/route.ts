import { NextResponse } from "next/server"
import { connectDB } from "@/lib/leadmagnet/db"
import { Lead, LeadMagnet } from "@/lib/leadmagnet/models"
import { deliverMagnet } from "@/lib/leadmagnet/deliver"
import { sendLeadNotification } from "@/lib/leadmagnet/mail"
import { stripe, isStripeConfigured, bankDetails } from "@/lib/leadmagnet/stripe"

export const runtime = "nodejs"

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL || "https://xegents.com"

/**
 * Public form submission for a lead magnet.
 * Free      → save lead, notify, email the file, return download link.
 * Paid+card → save lead, notify, return Stripe Checkout URL.
 * Paid+bank → save lead, notify, return bank transfer details.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 })

  const { slug, name, email, agency, phone, paymentMethod } = body as Record<string, string>
  if (!slug || !name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
  }

  await connectDB()
  const magnet = await LeadMagnet.findOne({ slug, active: true })
  if (!magnet) return NextResponse.json({ error: "Lead magnet not found" }, { status: 404 })

  const isPaid = magnet.price > 0
  const method = isPaid ? (paymentMethod === "bank" ? "bank" : "stripe") : ""

  const lead = await Lead.create({
    magnetId: magnet._id,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    agency: (agency ?? "").trim(),
    phone: (phone ?? "").trim(),
    status: isPaid ? (method === "bank" ? "pending_bank" : "pending_stripe") : "free_delivered",
    paymentMethod: method,
  })

  // Internal notification — never block the user on it
  sendLeadNotification(lead, magnet).catch((e) => console.error("[lead notify]", e))

  /* ── Free: deliver immediately ── */
  if (!isPaid) {
    try {
      const downloadUrl = await deliverMagnet(lead, magnet, false)
      return NextResponse.json({ ok: true, mode: "free", downloadUrl })
    } catch (e) {
      console.error("[deliver]", e)
      return NextResponse.json({ ok: true, mode: "free", downloadUrl: null, warning: "Email delivery failed — we'll send it manually." })
    }
  }

  /* ── Paid via bank transfer ── */
  if (method === "bank") {
    return NextResponse.json({ ok: true, mode: "bank", bankDetails: bankDetails(), price: magnet.price })
  }

  /* ── Paid via Stripe Checkout ── */
  if (!isStripeConfigured()) {
    // Card not available yet → fall back to bank details
    return NextResponse.json({ ok: true, mode: "bank", bankDetails: bankDetails(), price: magnet.price })
  }

  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    customer_email: lead.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(magnet.price * 100),
          product_data: { name: magnet.title, description: magnet.tagline || undefined },
        },
        quantity: 1,
      },
    ],
    metadata: { leadId: String(lead._id), magnetId: String(magnet._id) },
    success_url: `${SITE_URL()}/lead-magnet/${magnet.slug}?paid=1`,
    cancel_url: `${SITE_URL()}/lead-magnet/${magnet.slug}?cancelled=1`,
  })

  await Lead.updateOne({ _id: lead._id }, { $set: { stripeSession: session.id } })
  return NextResponse.json({ ok: true, mode: "stripe", checkoutUrl: session.url })
}
