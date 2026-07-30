"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "@/lib/gsap"

/* ────────────────────────────────────────────────────────────────────────────
   Smooth scrolling — wheel only, on purpose.

   NO `syncTouch`. Lenis can take over touch scrolling too, and it is the most
   common reason a site "feels wrong" on iOS: it replaces Apple's momentum
   curve with a JavaScript approximation that is subtly slower to start and
   floatier to stop. Native touch scrolling is already excellent. The fix for
   touch is to not touch it.

   REDUCED MOTION. Smoothing IS animation — it moves content the user did not
   ask to move. When someone asks for reduced motion, Lenis is not constructed
   at all, and `lib/scroll.ts` falls through to its native branch.
──────────────────────────────────────────────────────────────────────────── */

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    // Lenis drives window.scrollY, so ScrollTrigger mostly keeps up on its own.
    // Telling it explicitly makes every trigger exact instead of a frame behind.
    lenis.on("scroll", ScrollTrigger.update)

    /* The rAF id has to be captured. The previous version recursed forever and
       was never cancelled, so after `destroy()` the loop kept running against a
       dead Lenis instance for the life of the page. */
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    ;(window as unknown as Record<string, unknown>).__lenis = lenis

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      delete (window as unknown as Record<string, unknown>).__lenis
    }
  }, [])

  return null
}
