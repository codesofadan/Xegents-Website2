"use client"

// Static imports so pages keep their server-rendered HTML.
// (dynamic(..., { ssr: false }) around a component that WRAPS children bails
// the entire page out of SSR — content vanishes from the initial HTML, which
// hurts SEO. Both components are client components that only touch browser
// APIs inside effects, so they are safe to import statically.)
import { SmoothScroll } from "@/components/layout/smooth-scroll"
import { PageTransition } from "@/components/layout/page-transition"

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <PageTransition>{children}</PageTransition>
    </>
  )
}
