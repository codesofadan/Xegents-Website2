/**
 * Single entry point for in-page anchor navigation.
 *
 * The site runs Lenis, so a native hash jump or `scrollIntoView` fights the
 * smooth-scroll engine and lands in the wrong place. Everything that scrolls to
 * a section goes through here instead.
 */

const HEADER_OFFSET = -96 // clears the floating capsule bar

type LenisLike = { scrollTo: (target: HTMLElement, options?: Record<string, unknown>) => void }

/** Returns false when the target is not on the current page, so the caller can fall through to normal navigation. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return false

  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
  if (lenis) {
    lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.1 })
  } else {
    /* No Lenis means either it has not mounted yet, or the user asked for
       reduced motion and it was never constructed. In the second case a
       "smooth" jump would reintroduce exactly the animation they opted out of,
       so honour the preference here too. */
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  }

  return true
}

/** Click handler for an `<a href="/#id">` that should scroll instead of navigate when already on the home page. */
export function handleAnchorClick(e: React.MouseEvent, id: string, pathname: string) {
  if (pathname !== "/") return false
  if (!scrollToSection(id)) return false
  e.preventDefault()
  return true
}
