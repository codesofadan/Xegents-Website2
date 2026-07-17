import { NextResponse } from "next/server"
import { connectDB } from "@/lib/leadmagnet/db"
import { LeadMagnet } from "@/lib/leadmagnet/models"
import { isAdminRequest } from "@/lib/leadmagnet/admin-auth"
import { deleteMagnetFile } from "@/lib/leadmagnet/storage"

export const runtime = "nodejs"

interface Ctx { params: Promise<{ id: string }> }

/** PATCH → edit fields / toggle active */
export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  await connectDB()

  const body = await req.json().catch(() => ({}))
  const allowed = ["title", "tagline", "description", "price", "externalUrl", "active"] as const
  const update: Record<string, unknown> = {}
  for (const key of allowed) if (key in body) update[key] = body[key]
  if ("bullets" in body && Array.isArray(body.bullets)) update.bullets = body.bullets

  const magnet = await LeadMagnet.findByIdAndUpdate(id, { $set: update }, { new: true })
  if (!magnet) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true })
}

/** DELETE → remove magnet + its GridFS file */
export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  await connectDB()

  const magnet = await LeadMagnet.findById(id)
  if (!magnet) return NextResponse.json({ error: "Not found" }, { status: 404 })

  if (magnet.filePublicId) {
    try {
      await deleteMagnetFile(magnet.filePublicId)
    } catch {
      // file already gone — fine
    }
  }
  await LeadMagnet.deleteOne({ _id: magnet._id })
  return NextResponse.json({ ok: true })
}
