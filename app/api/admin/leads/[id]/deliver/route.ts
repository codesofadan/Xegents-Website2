import { NextResponse } from "next/server"
import { connectDB } from "@/lib/leadmagnet/db"
import { Lead, LeadMagnet } from "@/lib/leadmagnet/models"
import { deliverMagnet } from "@/lib/leadmagnet/deliver"
import { isAdminRequest } from "@/lib/leadmagnet/admin-auth"

export const runtime = "nodejs"

interface Ctx { params: Promise<{ id: string }> }

/**
 * POST → manually confirm a bank-transfer payment: marks the lead paid and
 * sends the delivery email with the file. Used from the admin dashboard.
 */
export async function POST(req: Request, { params }: Ctx) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  await connectDB()

  const lead = await Lead.findById(id)
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 })

  const magnet = await LeadMagnet.findById(lead.magnetId)
  if (!magnet) return NextResponse.json({ error: "Lead magnet no longer exists" }, { status: 404 })

  try {
    await deliverMagnet(lead, magnet, magnet.price > 0, new URL(req.url).origin)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Delivery failed" }, { status: 500 })
  }
}
