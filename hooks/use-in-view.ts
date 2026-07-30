"use client"

import { useEffect, useState, type RefObject } from "react"

type Options = {
  /** IntersectionObserver threshold. */
  threshold?: number
  /** Stop observing after the first intersection. For one-shot reveals. */
  once?: boolean
  /**
   * What to report before the observer has run.
   *
   * This matters more than it looks. Sections that use the result to PAUSE a
   * looping animation must start `true`, or the very first painted frame has
   * `data-anim="off"` and the animation visibly stutters into life on a section
   * that was already on screen at load. Sections that use the result to REVEAL
   * something must start `false`, or the reveal is skipped entirely.
   */
  initial?: boolean
}

/**
 * One IntersectionObserver, seven call sites.
 *
 * This was copy-pasted into global-footprint, group-companies, projects-marquee,
 * numbers-dont-lie, parent-company, tech-stack and problem-section — each with
 * slightly different thresholds and its own subtly different disconnect logic.
 * Two of them leaked (observed a ref that could be null, never re-observed) and
 * two disagreed about the starting value. Now there is one place to fix.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { threshold = 0, once = false, initial = false }: Options = {},
): boolean {
  const [inView, setInView] = useState(initial)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Bail out where the API is missing rather than leaving the section stuck
    // at its initial value — better to show everything than to show nothing.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, once])

  return inView
}
