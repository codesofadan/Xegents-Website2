import nodemailer, { type Transporter } from "nodemailer"
import type { LeadMagnetDoc, LeadDoc } from "./models"

/**
 * Email delivery via SMTP (works with Gmail app passwords, Zoho, Resend SMTP,
 * any provider). If SMTP_* env vars are missing, falls back to a JSON
 * transport that logs the email to the server console instead of sending —
 * so local testing never hard-fails.
 *
 * Env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, NOTIFY_EMAIL
 */

const NOTIFY_EMAIL = () => process.env.NOTIFY_EMAIL || "zen@theredagents.com"
const MAIL_FROM = () => process.env.MAIL_FROM || process.env.SMTP_USER || "Xegents <no-reply@xegents.com>"
const SITE_URL = () => (process.env.NEXT_PUBLIC_SITE_URL || "https://xegents.com").replace(/\/+$/, "")

// Attach the zip when it's small enough; otherwise the link carries it.
const MAX_ATTACH_BYTES = 8 * 1024 * 1024

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

let cached: Transporter | null = null
function transporter(): Transporter {
  if (cached) return cached
  if (isMailConfigured()) {
    cached = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  } else {
    cached = nodemailer.createTransport({ jsonTransport: true })
  }
  return cached
}

/* Shared dark-brand email wrapper */
function shell(inner: string): string {
  return `
  <div style="background:#0c0c18;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#14141f;border:1px solid #2a2a3a;border-radius:14px;overflow:hidden">
      <div style="background:#9333ea;padding:18px 28px">
        <span style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.5px">Xegents</span>
      </div>
      <div style="padding:28px;color:#d6d6e0;font-size:15px;line-height:1.65">${inner}</div>
      <div style="padding:16px 28px;border-top:1px solid #2a2a3a;color:#6b6b7d;font-size:12px">
        Xegents — Your AI Transformation Partner · <a href="${SITE_URL()}" style="color:#a78bfa">xegents.com</a>
      </div>
    </div>
  </div>`
}

/** Internal notification for every new lead. */
export async function sendLeadNotification(lead: LeadDoc, magnet: LeadMagnetDoc): Promise<void> {
  const priceLabel = magnet.price > 0 ? `$${magnet.price} — ${lead.status}` : "Free"
  const info = await transporter().sendMail({
    from: MAIL_FROM(),
    to: NOTIFY_EMAIL(),
    subject: `New lead: ${lead.name} → ${magnet.title}`,
    html: shell(`
      <h2 style="color:#fff;margin:0 0 16px;font-size:20px">New lead magnet request</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${[
          ["Lead magnet", magnet.title],
          ["Price", priceLabel],
          ["Name", lead.name],
          ["Email", lead.email],
          ["Agency", lead.agency || "—"],
          ["Phone", lead.phone || "—"],
          ["Status", lead.status],
        ]
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 10px;color:#8b8b9d;border-bottom:1px solid #23232f;width:120px">${k}</td><td style="padding:6px 10px;color:#e8e8f0;border-bottom:1px solid #23232f">${v}</td></tr>`
          )
          .join("")}
      </table>`),
  })
  if (!isMailConfigured()) console.log("[mail:dev] lead notification:", info.message?.toString?.().slice(0, 600))
}

/**
 * Delivery email to the lead: download link always, zip attached when small.
 * `fileBuffer` is passed in only when attaching is possible.
 */
export async function sendMagnetDelivery(
  lead: LeadDoc,
  magnet: LeadMagnetDoc,
  downloadUrl: string,
  fileBuffer?: Buffer
): Promise<void> {
  const build = (withAttachment: boolean) => ({
    from: MAIL_FROM(),
    to: lead.email,
    subject: `Your download: ${magnet.title}`,
    attachments: withAttachment
      ? [{ filename: magnet.fileName || `${magnet.slug}.zip`, content: fileBuffer! }]
      : undefined,
    html: shell(`
      <h2 style="color:#fff;margin:0 0 12px;font-size:20px">Here's your ${magnet.title} 🎁</h2>
      <p>Hi ${lead.name.split(" ")[0]},</p>
      <p>Thanks for grabbing <strong style="color:#fff">${magnet.title}</strong>. ${
        withAttachment ? "The file is attached to this email, and you can also" : "You can"
      } download it any time in the next 7 days with the button below.</p>
      <p style="text-align:center;margin:28px 0">
        <a href="${downloadUrl}" style="background:#9333ea;color:#fff;text-decoration:none;font-weight:700;padding:14px 32px;border-radius:10px;display:inline-block">Download ${magnet.title}</a>
      </p>
      <p style="color:#8b8b9d;font-size:13px">Questions? Just reply to this email — a real human reads it.</p>
      <p>— Zain, Xegents</p>`),
  })

  const canAttach = Boolean(fileBuffer && fileBuffer.length <= MAX_ATTACH_BYTES)
  try {
    const info = await transporter().sendMail(build(canAttach))
    if (!isMailConfigured()) console.log("[mail:dev] delivery email:", info.message?.toString?.().slice(0, 600))
  } catch (e) {
    // Gmail rejects some zip contents outright (552-5.7.0). The download link
    // still delivers the file, so retry link-only rather than failing the lead.
    if (canAttach) {
      console.warn("[mail] attachment rejected, resending link-only:", e instanceof Error ? e.message.split("\n")[0] : e)
      await transporter().sendMail(build(false))
    } else {
      throw e
    }
  }
}
