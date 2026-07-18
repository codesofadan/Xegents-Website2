import { Lead, LeadMagnet, type LeadDoc, type LeadMagnetDoc } from "./models"
import { createDownloadToken } from "./download-token"
import { sendMagnetDelivery } from "./mail"
import { fetchFileBuffer, signedFileUrl } from "./storage"

const SITE_URL = () => (process.env.NEXT_PUBLIC_SITE_URL || "https://xegents.com").replace(/\/+$/, "")

/** Resolve the magnet's real file URL (signed Cloudinary URL or external link). */
export function magnetFileUrl(magnet: LeadMagnetDoc): string {
  if (magnet.filePublicId) return signedFileUrl(magnet.filePublicId)
  return magnet.externalUrl || ""
}

/**
 * Send the delivery email (download link + attachment when small) and stamp
 * the lead as delivered. Returns the tokenized download URL so callers can
 * also show it in the UI.
 *
 * `baseUrl` should be the origin of the incoming request (so links match the
 * domain the user is actually on); falls back to NEXT_PUBLIC_SITE_URL.
 */
export async function deliverMagnet(lead: LeadDoc, magnet: LeadMagnetDoc, paid: boolean, baseUrl?: string): Promise<string> {
  const token = createDownloadToken(String(magnet._id), String(lead._id))
  const downloadUrl = `${baseUrl || SITE_URL()}/api/download/${token}`

  // Attach the actual file when it's small enough (mail.ts caps at 8MB)
  const src = magnetFileUrl(magnet)
  const buffer = src ? await fetchFileBuffer(src) : undefined

  await sendMagnetDelivery(lead, magnet, downloadUrl, buffer)

  await Lead.updateOne(
    { _id: lead._id },
    { $set: { status: paid ? "paid_delivered" : "free_delivered", deliveredAt: new Date() } }
  )

  return downloadUrl
}

export { Lead, LeadMagnet }
