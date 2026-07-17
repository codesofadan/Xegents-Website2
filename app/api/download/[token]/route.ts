import { NextResponse } from "next/server"
import { connectDB } from "@/lib/leadmagnet/db"
import { LeadMagnet } from "@/lib/leadmagnet/models"
import { magnetFileUrl } from "@/lib/leadmagnet/deliver"
import { verifyDownloadToken } from "@/lib/leadmagnet/download-token"

export const runtime = "nodejs"

interface Ctx { params: Promise<{ token: string }> }

/**
 * Tokenized download: proxies the Cloudinary/external file so the response is
 * a proper attachment with the original filename (and the storage URL stays
 * out of sight).
 */
export async function GET(_req: Request, { params }: Ctx) {
  const { token } = await params
  const verified = verifyDownloadToken(token)
  if (!verified) {
    return NextResponse.json({ error: "This download link is invalid or has expired." }, { status: 403 })
  }

  await connectDB()
  const magnet = await LeadMagnet.findById(verified.magnetId)
  if (!magnet) return NextResponse.json({ error: "File no longer available" }, { status: 404 })

  const src = magnetFileUrl(magnet)
  if (!src) return NextResponse.json({ error: "No file attached to this lead magnet" }, { status: 404 })

  const upstream = await fetch(src)
  if (!upstream.ok || !upstream.body) {
    // e.g. a Drive link that can't be proxied — just send the user there
    return NextResponse.redirect(src)
  }

  const fileName = (magnet.fileName || `${magnet.slug}.zip`).replace(/"/g, "")
  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      ...(upstream.headers.get("content-length") ? { "Content-Length": upstream.headers.get("content-length")! } : {}),
      "Cache-Control": "private, no-store",
    },
  })
}
