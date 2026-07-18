import { NextResponse } from "next/server"
import { connectDB } from "@/lib/leadmagnet/db"
import { Lead, LeadMagnet } from "@/lib/leadmagnet/models"
import { deliverMagnet } from "@/lib/leadmagnet/deliver"
import { stripe } from "@/lib/leadmagnet/stripe"

export const runtime = "nodejs"

/**
 * Stripe webhook: on checkout.session.completed, mark the lead paid and email
 * the lead magnet. Configure the endpoint in the Stripe dashboard pointing at
 * /api/stripe/webhook with the checkout.session.completed event, and put the
 * signing secret in STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET not set" }, { status: 500 })

  const signature = req.headers.get("stripe-signature")
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 })

  const payload = await req.text()
  let event
  try {
    event = stripe().webhooks.constructEvent(payload, signature, secret)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const leadId = session.metadata?.leadId
    if (leadId) {
      await connectDB()
      const lead = await Lead.findById(leadId)
      if (lead && lead.status !== "paid_delivered") {
        const magnet = await LeadMagnet.findById(lead.magnetId)
        if (magnet) {
          await Lead.updateOne({ _id: lead._id }, { $set: { paymentMethod: "stripe" } })
          try {
            await deliverMagnet(lead, magnet, true, new URL(req.url).origin)
          } catch (e) {
            console.error("[stripe deliver]", e)
          }
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
