"use client"

import { useEffect, type RefObject } from "react"

/**
 * Close an open disclosure the three ways a person actually expects to.
 *
 * The reveal panels on this site were built for a mouse: they open on
 * pointer-enter and close on pointer-leave. On a touch screen the leave event
 * never comes, so once a panel was open there was no way to shut it — and in
 * the projects section that also left the marquee frozen for good.
 *
 * Three exits, and each one earns its place:
 *
 *   POINTERDOWN OUTSIDE, in the capture phase. Capture matters: the panel's own
 *   click handlers run in the bubble phase, so a bubble-phase listener here
 *   would fire after them and fight for the same tap. `pointerdown` rather than
 *   `click` for the same reason — it lands before the synthetic click a tap
 *   generates, so a tap that dismisses never also activates whatever was
 *   underneath.
 *
 *   ESCAPE, because a keyboard user who has tabbed into the panel needs a way
 *   out that is not "tab through everything inside it".
 *
 *   SCROLLED AWAY. Without this, opening a panel and then scrolling past the
 *   section leaves it open and its animation paused forever — you come back
 *   later to a marquee that has silently stopped. Uses IntersectionObserver on
 *   the first ref rather than a scroll listener, so it costs nothing per frame.
 *
 * Everything is wired only while `isOpen`, so a closed section has no global
 * listeners at all.
 */
export function useDismiss(
  isOpen: boolean,
  close: () => void,
  refs: Array<RefObject<HTMLElement | null>>,
) {
  useEffect(() => {
    if (!isOpen) return

    const isInside = (target: EventTarget | null) =>
      target instanceof Node && refs.some((r) => r.current?.contains(target))

    const onPointerDown = (e: PointerEvent) => {
      if (!isInside(e.target)) close()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    document.addEventListener("pointerdown", onPointerDown, true)
    document.addEventListener("keydown", onKeyDown)

    /* An observer reports the CURRENT state as soon as you observe, so a naive
       `if (!isIntersecting) close()` fires the instant you open something that
       is off-screen — and in an accordion that is routine: opening the second
       card pushes the fourth below the fold, so opening the fourth would open
       and immediately shut it. Only close once it has actually been seen and
       then left. */
    const anchor = refs[0]?.current
    let seen = false
    const io =
      anchor && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { seen = true; return }
            if (seen) close()
          }, { threshold: 0 })
        : null
    if (anchor && io) io.observe(anchor)

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true)
      document.removeEventListener("keydown", onKeyDown)
      io?.disconnect()
    }
    // `refs` is a stable array of refs from the caller's render scope.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, close])
}
