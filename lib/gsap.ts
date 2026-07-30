"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/* ────────────────────────────────────────────────────────────────────────────
   One place to register and configure GSAP.

   `gsap.registerPlugin(ScrollTrigger)` was being called at module scope in six
   separate section files. Registration is idempotent so that was harmless, but
   there was nowhere to put configuration that has to apply exactly once.

   ignoreMobileResize — THE mobile scroll fix.
   Every mobile browser resizes the viewport when the address bar slides away.
   ScrollTrigger treats a resize as "the page changed, recompute everything",
   so every start/end position shifts mid-scroll and pinned or revealed
   elements visibly jump. This tells it to ignore the vertical-only resize that
   the address bar causes.

   normalizeScroll — DELIBERATELY NOT USED.
   It is the other half of GSAP's mobile advice and it would fight Lenis: both
   want to own the scroll position, and running the pair gives you double
   smoothing, wrong momentum on iOS, and `position: fixed` elements that detach
   mid-gesture. Take the safe half.
──────────────────────────────────────────────────────────────────────────── */

let configured = false

export function initGsap() {
  if (configured) return
  configured = true

  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })
}

// Registering on import keeps the call sites as a bare `import "@/lib/gsap"`.
if (typeof window !== "undefined") initGsap()

export { gsap, ScrollTrigger }
