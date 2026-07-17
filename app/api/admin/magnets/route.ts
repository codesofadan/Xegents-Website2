import { NextResponse } from "next/server"
import { connectDB } from "@/lib/leadmagnet/db"
import { LeadMagnet, Lead } from "@/lib/leadmagnet/models"
import { isAdminRequest } from "@/lib/leadmagnet/admin-auth"
import { uploadMagnetFile, isStorageConfigured } from "@/lib/leadmagnet/storage"

export const runtime = "nodejs"

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

/** GET → list all magnets with lead counts */
export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  await connectDB()
  const magnets = await LeadMagnet.find().sort({ createdAt: -1 }).lean()
  const counts = await Lead.aggregate([{ $group: { _id: "$magnetId", n: { $sum: 1 } } }])
  const countMap = new Map(counts.map((c) => [String(c._id), c.n]))
  return NextResponse.json({
    magnets: magnets.map((m) => ({ ...m, _id: String(m._id), leadCount: countMap.get(String(m._id)) ?? 0 })),
  })
}

/** POST (multipart/form-data) → create a magnet, uploading its file to Cloudinary */
export async function POST(req: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  await connectDB()

  const form = await req.formData()
  const title = String(form.get("title") ?? "").trim()
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 })

  const slug = slugify(String(form.get("slug") ?? "") || title)
  const existing = await LeadMagnet.findOne({ slug })
  if (existing) return NextResponse.json({ error: `Slug "${slug}" already exists` }, { status: 409 })

  const price = Math.max(0, Number(form.get("price") ?? 0) || 0)
  const bullets = String(form.get("bullets") ?? "")
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean)

  let fileUrl = ""
  let filePublicId = ""
  let fileName = ""
  let fileSize = 0
  const file = form.get("file")
  if (file instanceof File && file.size > 0) {
    if (!isStorageConfigured()) {
      return NextResponse.json({ error: "Cloudinary is not configured — set CLOUDINARY_* in .env.local" }, { status: 500 })
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const uploaded = await uploadMagnetFile(buffer, file.name)
    fileUrl = uploaded.url
    filePublicId = uploaded.publicId
    fileName = file.name
    fileSize = file.size
  }

  const magnet = await LeadMagnet.create({
    slug,
    title,
    tagline: String(form.get("tagline") ?? ""),
    description: String(form.get("description") ?? ""),
    bullets,
    price,
    fileUrl,
    filePublicId,
    fileName,
    fileSize,
    externalUrl: String(form.get("externalUrl") ?? "").trim(),
    active: true,
  })

  return NextResponse.json({ ok: true, id: String(magnet._id), slug })
}
