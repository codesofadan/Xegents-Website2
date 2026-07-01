"use client"

import dynamic from "next/dynamic"

const SmoothScroll = dynamic(
  () => import("@/components/layout/smooth-scroll").then((m) => ({ default: m.SmoothScroll })),
  { ssr: false }
)

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      {children}
    </>
  )
}
