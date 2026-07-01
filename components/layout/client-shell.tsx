"use client"

import dynamic from "next/dynamic"

const Preloader         = dynamic(() => import("@/components/layout/preloader").then(m => ({ default: m.Preloader })),         { ssr: false })
const SmoothScroll      = dynamic(() => import("@/components/layout/smooth-scroll").then(m => ({ default: m.SmoothScroll })),   { ssr: false })
const NetworkBackground = dynamic(() => import("@/components/three/network-bg").then(m => ({ default: m.NetworkBackground })),  { ssr: false })
const PageTransition    = dynamic(() => import("@/components/layout/page-transition").then(m => ({ default: m.PageTransition })), { ssr: false })

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <NetworkBackground />
      <PageTransition>{children}</PageTransition>
    </>
  )
}
