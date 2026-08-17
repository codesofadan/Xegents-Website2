"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/site"
import { scrollToSection } from "@/lib/scroll"
import { useDismiss } from "@/hooks/use-dismiss"

/* How far you have to scroll before the bar is allowed to leave at all. Below
   this the page has barely moved and hiding the nav reads as a glitch. */
const HIDE_AFTER = 96
/* Minimum travel before we react. Under this it is thumb jitter, iOS
   rubber-band, or a Lenis easing tail — all of which would otherwise flap the
   bar in and out several times a second. */
const DEADZONE = 8

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  /* ── Hide going down, return coming up ────────────────────────────────────
     One rAF-coalesced listener drives both the scrolled state and the hide
     state. Nothing is measured — the only read is window.scrollY and the only
     write is a data attribute; CSS does the transform. So this costs nothing
     per frame, which matters because it runs on every scroll of every page.

     Gated to below 1024px in the CSS, not here. The desktop bar is finished
     and must not move, and keeping the calculation unconditional means there
     is no width branch in JS to hydrate wrong. */
  /* Read inside the scroll handler without making it re-subscribe on every
     open and close. */
  const menuOpenRef = useRef(menuOpen)
  menuOpenRef.current = menuOpen

  useEffect(() => {
    let frame = 0
    let lastY = window.scrollY

    const read = () => {
      frame = 0
      const y = window.scrollY
      setIsScrolled(y > 50)

      const dy = y - lastY
      if (Math.abs(dy) < DEADZONE) return
      lastY = y

      /* Moving the page is the clearest possible statement that you are done
         with the menu. Leaving it open over content you are actively scrolling
         past is the thing that reads as broken. */
      if (menuOpenRef.current) { setMenuOpen(false); return }

      setHidden(y > HIDE_AFTER && dy > 0)
    }

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }

    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  /* An open menu pins the bar. Sliding away a nav someone is actively using is
     the one thing an auto-hide bar must never do. */
  const barHidden = hidden && !menuOpen

  /* Tap outside · Escape · scroll away. The header is position:fixed so the
     hook's IntersectionObserver never fires for it — the two that earn their
     place here are the outside-pointerdown (capture phase, so it beats the
     synthetic click a tap generates) and Escape. */
  useDismiss(menuOpen, () => setMenuOpen(false), [headerRef])

  /* Navigating from the menu used to leave it hanging open over the new page. */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Scroll-spy — a section is current while the viewport's vertical center
  // line falls inside its bounds. With flush sections at most one can contain
  // the line at a time, so a nav button stays lit until the boundary of the
  // next section actually crosses the center of the screen. When the line
  // sits between mapped sections (the un-mapped blocks between Affiliation
  // and Work), the departing section stays lit — there is never a moment
  // with no highlight. Only crossing back ABOVE the first section (the Zero
  // Page) clears it.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null)
      return
    }

    const sections = siteConfig.nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (!sections.length) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        let lastLeft: string | null = null
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else { visible.delete(entry.target.id); lastLeft = entry.target.id }
        })
        // Center-line rule: derive the winner from the FULL set after the
        // batch settles, so an up-scroll crossing (enter + leave in one
        // batch) can never blank the highlight between the two entries.
        const next = siteConfig.nav.find((item) => visible.has(item.id))
        if (next) {
          setActiveId(next.id)
        } else if (lastLeft && lastLeft !== siteConfig.nav[0].id) {
          // Line is between mapped sections — keep the departing section
          // lit until the next one's boundary reaches the center.
          setActiveId(lastLeft)
        } else {
          // Back above the first section — the Zero Page has no nav item.
          setActiveId(null)
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  const onNavClick = (e: React.MouseEvent, id: string) => {
    if (pathname !== "/") return // let Next.js navigate to /#id
    if (scrollToSection(id)) {
      e.preventDefault()
      setActiveId(id)
      setMenuOpen(false)
    }
  }

  const onCtaClick = (e: React.MouseEvent) => {
    if (pathname !== "/") return
    if (scrollToSection("booking-section")) {
      e.preventDefault()
      setMenuOpen(false)
    }
  }

  /* Safe areas: the layout uses viewportFit:"cover", so on a notched iPhone
     this bar would otherwise sit under the notch in portrait and under the
     rounded corner in landscape. max() keeps the normal padding on every
     device that reports no inset. */
  return (
    <>
      <header
        ref={headerRef}
        data-hidden={barHidden ? "true" : "false"}
        className="fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] transition-transform duration-300 ease-out motion-reduce:transition-none data-[hidden=true]:-translate-y-[130%] sm:pt-[max(1rem,env(safe-area-inset-top))] sm:pl-[max(1rem,env(safe-area-inset-left))] sm:pr-[max(1rem,env(safe-area-inset-right))] lg:data-[hidden=true]:translate-y-0"
      >
        {/* Floating capsule bar.
            On a coarse pointer the blur is off for GPU cost, and 90% opacity
            over scrolling content was what read as washed out — the content
            behind stayed legible through the bar. 97% plus a brighter hairline
            gives it an edge instead of a haze. Fine pointers keep the glass. */}
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 sm:px-6 sm:py-3 transition-all duration-500 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.06),0_16px_40px_-18px_rgba(0,0,0,0.75)] pointer-coarse:border-white/15 pointer-coarse:bg-background/[0.97] pointer-coarse:backdrop-blur-none ${
            isScrolled
              ? "border-white/12 bg-background/80 backdrop-blur-xl"
              : "border-white/[0.08] bg-background/55 backdrop-blur-lg"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Xegents — back to the top"
            className="flex flex-shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img
              src="/xegents-logo.png"
              alt="Xegents Logo"
              width={40}
              height={40}
              className="h-8 w-auto sm:h-9 object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
              loading="eager"
              /* This is the page's LCP element — the header is the first real
                 content painted. eager alone still queues it at Low priority. */
              fetchPriority="high"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {siteConfig.nav.map((item) => {
              const isActive = activeId === item.id
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.id)}
                  data-active={isActive}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative inline-block text-sm text-foreground/85 transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:text-foreground data-[active=true]:text-foreground"
                >
                  {/* width reserved by an invisible bold copy → zero layout shift when the visible one bolds */}
                  <span className="relative inline-block">
                    <span aria-hidden="true" className="invisible font-semibold">{item.label}</span>
                    <span className="absolute inset-0 font-medium transition-all duration-200 group-hover:font-semibold group-hover:[text-shadow:0_4px_14px_rgba(139,92,246,0.5)] group-data-[active=true]:font-semibold group-data-[active=true]:[text-shadow:0_4px_14px_rgba(139,92,246,0.65)]">
                      {item.label}
                    </span>
                  </span>
                  {/* accent underline grows from the centre on hover, and stays for the active section */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_1px] shadow-accent/45 transition-[width] duration-200 ease-out group-hover:w-full group-data-[active=true]:w-full"
                  />
                </Link>
              )
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/#booking-section"
              onClick={onCtaClick}
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-accent py-1.5 pl-5 pr-1.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-[0_6px_20px_-6px] shadow-accent/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-accent/70 flex-shrink-0 whitespace-nowrap"
            >
              <span>Get Started</span>
              {/* page-fold arrow: on hover the arrow flies out top-right and a fresh one folds in from bottom-left */}
              <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="absolute h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-4 group-hover:translate-x-4 motion-reduce:transition-none">
                  <path d="M7 17 17 7" /><path d="M8 7h9v9" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="absolute h-3.5 w-3.5 -translate-x-4 translate-y-4 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:translate-x-0 motion-reduce:translate-y-0">
                  <path d="M7 17 17 7" /><path d="M8 7h9v9" />
                </svg>
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex h-11 w-11 flex-col items-center justify-center gap-1.5 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`block w-5 h-0.5 bg-foreground transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu — matching floating card */}
        {menuOpen && (
          <div className="md:hidden mx-auto mt-2 max-w-6xl rounded-2xl border border-white/15 bg-background/[0.97] backdrop-blur-xl pointer-coarse:backdrop-blur-none px-3 py-2 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.75)]">
            {siteConfig.nav.map((item) => {
              const isActive = activeId === item.id
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.id)}
                  data-active={isActive}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/85 hover:bg-white/5 hover:text-foreground data-[active=true]:bg-accent/10 data-[active=true]:text-foreground transition-colors"
                >
                  <span className="relative inline-block group-data-[active=true]:[text-shadow:0_4px_14px_rgba(139,92,246,0.65)]">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-1.5 left-0 h-[2px] w-0 rounded-full bg-accent shadow-[0_0_10px_1px] shadow-accent/45 transition-[width] duration-200 ease-out group-data-[active=true]:w-full"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-accent opacity-0 group-data-[active=true]:opacity-100"
                  />
                </Link>
              )
            })}
          </div>
        )}
      </header>

      {/* Reach strip. Once the bar has slid away, a thumb at the very top edge
          is the natural way to ask for it back — scrolling up works too, but
          only if there is somewhere left to scroll. It sits OUTSIDE the header
          so it does not inherit the transform that moved the header off-screen,
          and it only exists while hidden, so it can never swallow a tap meant
          for the page. 16px is inside the padding every section already has. */}
      {barHidden && (
        <button
          type="button"
          aria-label="Show navigation"
          onPointerDown={() => setHidden(false)}
          className="fixed inset-x-0 top-0 z-40 h-4 lg:hidden"
        />
      )}
    </>
  )
}
