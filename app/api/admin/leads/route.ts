import { NextResponse } from "next/server"
import { connectDB } from "@/lib/leadmagnet/db"
import { Lead, LeadMagnet } from "@/lib/leadmagnet/models"
import { isAdminRequest } from "@/lib/leadmagnet/admin-auth"

export const runtime = "nodejs"

/** GET → all leads, newest first, with magnet titles */
export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    await connectDB()
  } catch (e) {
    return NextResponse.json({ error: `Database error: ${e instanceof Error ? e.message : "unknown"}` }, { status: 500 })
  }

  const [leads, magnets] = await Promise.all([
    Lead.find().sort({ createdAt: -1 }).limit(500).lean(),
    LeadMagnet.find().select("title slug price").lean(),
  ])
  const magnetMap = new Map(magnets.map((m) => [String(m._id), m]))

  return NextResponse.json({
    leads: leads.map((l) => {
      const m = magnetMap.get(String(l.magnetId))
      return {
        _id: String(l._id),
        name: l.name,
        email: l.email,
        agency: l.agency,
        phone: l.phone,
        status: l.status,
        paymentMethod: l.paymentMethod,
        createdAt: l.createdAt,
        deliveredAt: l.deliveredAt,
        magnet: m ? { title: m.title, slug: m.slug, price: m.price } : null,
      }
    }),
  })
}
