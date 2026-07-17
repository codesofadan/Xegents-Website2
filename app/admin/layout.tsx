import type React from "react"

export const metadata = {
  title: "Admin | Xegents",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>
}
