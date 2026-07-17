import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

/**
 * Minimal admin auth: ADMIN_PASSWORD env + HMAC-signed session cookie.
 * AUTH_SECRET signs the cookie; fall back to ADMIN_PASSWORD so a single
 * env var is enough to get started.
 */

const COOKIE = "xg_admin"
const SESSION_HOURS = 24 * 7

function secret(): string {
  const s = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD
  if (!s) throw new Error("ADMIN_PASSWORD is not set in .env.local")
  return s
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex")
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD)
}

function safeEqual(given: string, expected: string): boolean {
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export function checkCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD
  if (!expectedUser || !expectedPass) return false
  return safeEqual(username, expectedUser) && safeEqual(password, expectedPass)
}

export function makeSessionCookie(): { name: string; value: string; maxAge: number } {
  const expires = Date.now() + SESSION_HOURS * 3600_000
  const payload = String(expires)
  return {
    name: COOKIE,
    value: `${payload}.${sign(payload)}`,
    maxAge: SESSION_HOURS * 3600,
  }
}

export async function isAdminRequest(): Promise<boolean> {
  try {
    const jar = await cookies()
    const raw = jar.get(COOKIE)?.value
    if (!raw) return false
    const [payload, sig] = raw.split(".")
    if (!payload || !sig) return false
    const expected = sign(payload)
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false
    return Number(payload) > Date.now()
  } catch {
    return false
  }
}

export const ADMIN_COOKIE = COOKIE
