import type React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ClientShell } from "@/components/layout/client-shell"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientShell>{children}</ClientShell>
      <Header />
      <Footer />
    </>
  )
}
