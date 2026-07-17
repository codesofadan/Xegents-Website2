import { NextResponse } from "next/server"
import { checkCredentials, makeSessionCookie, ADMIN_COOKIE, isAuthConfigured } from "@/lib/leadmagnet/admin-auth"

export async function POST(req: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: "ADMIN_USERNAME / ADMIN_PASSWORD are not set in .env.local" }, { status: 500 })
  }
  const { username, password } = await req.json().catch(() => ({ username: "", password: "" }))
  if (!checkCredentials(String(username ?? ""), String(password ?? ""))) {
    return NextResponse.json({ error: "Wrong username or password" }, { status: 401 })
  }
  const cookie = makeSessionCookie()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(cookie.name, cookie.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: cookie.maxAge,
    path: "/",
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, "", { maxAge: 0, path: "/" })
  return res
}
