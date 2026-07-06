"use client"

import dynamic from "next/dynamic"

const SmoothScroll   = dynamic(() => import("@/components/layout/smooth-scroll").then(m => ({ default: m.SmoothScroll })),    { ssr: false })
const PageTransition = dynamic(() => import("@/components/layout/page-transition").then(m => ({ default: m.PageTransition })), { ssr: false })

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <PageTransition>{children}</PageTransition>
    </>
  )
}
