import { createHmac, timingSafeEqual } from "crypto"

/**
 * Stateless, signed download tokens: `<magnetId>.<leadId>.<expiresMs>.<sig>`.
 * No extra collection needed; links expire after 7 days by default.
 */

function secret(): string {
  const s = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || process.env.MONGODB_URI
  if (!s) throw new Error("No AUTH_SECRET / ADMIN_PASSWORD set for token signing")
  return s
}

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url")
}

export function createDownloadToken(magnetId: string, leadId: string, days = 7): string {
  const expires = Date.now() + days * 86_400_000
  const data = `${magnetId}.${leadId}.${expires}`
  return `${data}.${sign(data)}`
}

export function verifyDownloadToken(token: string): { magnetId: string; leadId: string } | null {
  const parts = token.split(".")
  if (parts.length !== 4) return null
  const [magnetId, leadId, expires, sig] = parts
  const data = `${magnetId}.${leadId}.${expires}`
  const expected = sign(data)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  if (Number(expires) < Date.now()) return null
  return { magnetId, leadId }
}
