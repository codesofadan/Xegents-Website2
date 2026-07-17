import { v2 as cloudinary } from "cloudinary"

/**
 * Cloudinary storage for lead-magnet files (zips/PDFs stored as `raw` assets).
 * Env: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */

let configured = false
function client() {
  if (!configured) {
    const cloud_name = process.env.CLOUDINARY_CLOUD_NAME
    const api_key = process.env.CLOUDINARY_API_KEY
    const api_secret = process.env.CLOUDINARY_API_SECRET
    if (!cloud_name || !api_key || !api_secret) {
      throw new Error("Cloudinary is not configured — set CLOUDINARY_* vars in .env.local")
    }
    cloudinary.config({ cloud_name, api_key, api_secret, secure: true })
    configured = true
  }
  return cloudinary
}

export function isStorageConfigured(): boolean {
  return Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
}

/** Upload a file buffer as a raw asset. Returns its public URL + id. */
export async function uploadMagnetFile(
  buffer: Buffer,
  fileName: string
): Promise<{ url: string; publicId: string; bytes: number }> {
  const cld = client()
  const result = await new Promise<{ secure_url: string; public_id: string; bytes: number }>((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "xegents-lead-magnets",
        // keep the original filename (incl. extension) in the public id
        public_id: fileName.replace(/[^a-zA-Z0-9._-]/g, "_"),
        use_filename: false,
        overwrite: true,
        access_mode: "public",
      },
      (err, res) => (err || !res ? reject(err ?? new Error("Upload failed")) : resolve(res))
    )
    stream.end(buffer)
  })
  return { url: result.secure_url, publicId: result.public_id, bytes: result.bytes }
}

/** Delete a raw asset (used when a magnet is deleted). */
export async function deleteMagnetFile(publicId: string): Promise<void> {
  await client().uploader.destroy(publicId, { resource_type: "raw" })
}

/**
 * Time-limited delivery URL for a raw asset. This account blocks ALL public
 * zip delivery (plain, signed, fl_attachment all 401) — only the
 * authenticated private-download endpoint serves the file, so we mint a
 * short-lived URL each time it's needed.
 */
export function signedFileUrl(publicId: string, validHours = 2): string {
  return client().utils.private_download_url(publicId, "", {
    resource_type: "raw",
    type: "upload",
    expires_at: Math.floor(Date.now() / 1000) + validHours * 3600,
  })
}

/** Fetch a stored file back into a Buffer (for email attachments). */
export async function fetchFileBuffer(url: string, maxBytes = 15 * 1024 * 1024): Promise<Buffer | undefined> {
  try {
    const res = await fetch(url)
    if (!res.ok) return undefined
    const len = Number(res.headers.get("content-length") ?? 0)
    if (len > maxBytes) return undefined
    const buf = Buffer.from(await res.arrayBuffer())
    return buf.length <= maxBytes ? buf : undefined
  } catch {
    return undefined
  }
}
