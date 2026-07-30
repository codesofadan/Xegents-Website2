"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/site"
import { scrollToSection } from "@/lib/scroll"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll-spy — a section counts as active once it crosses the middle band of
  // the viewport, which keeps the indicator stable instead of flickering
  // between neighbours at section boundaries.
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })
        // Pick the first in document order so the indicator moves predictably.
        const next = siteConfig.nav.find((item) => visible.has(item.id))
        setActiveId(next?.id ?? null)
      },
      { rootMargin: "-45% 0px -50% 0px" },
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

  /* Safe areas: the layout now uses viewportFit:"cover", so on a notched
     iPhone this bar would otherwise sit under the notch in portrait and under
     the rounded corner in landscape. max() keeps the normal padding on every
     device that reports no inset. */
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:pt-[max(1rem,env(safe-area-inset-top))] sm:pl-[max(1rem,env(safe-area-inset-left))] sm:pr-[max(1rem,env(safe-area-inset-right))]">
      {/* Floating capsule bar */}
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 sm:px-6 sm:py-3 transition-all duration-500 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.06),0_16px_40px_-18px_rgba(0,0,0,0.75)] ${
          isScrolled
            ? "border-white/12 bg-background/80 backdrop-blur-xl pointer-coarse:bg-background/95 pointer-coarse:backdrop-blur-none"
            : "border-white/[0.08] bg-background/55 backdrop-blur-lg pointer-coarse:bg-background/90 pointer-coarse:backdrop-blur-none"
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
                  <span className="absolute inset-0 font-medium transition-all duration-200 group-hover:font-semibold group-hover:[text-shadow:0_4px_14px_rgba(139,92,246,0.5)] group-data-[active=true]:font-semibold">
                    {item.label}
                  </span>
                </span>
                {/* purple underline shade grows from the centre on hover, and stays for the active section */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent transition-[width] duration-300 ease-out group-hover:w-full group-data-[active=true]:w-full"
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
        <div className="md:hidden mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl pointer-coarse:backdrop-blur-none px-3 py-2 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.75)]">
          {siteConfig.nav.map((item) => {
            const isActive = activeId === item.id
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => onNavClick(e, item.id)}
                data-active={isActive}
                aria-current={isActive ? "true" : undefined}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/85 hover:bg-white/5 hover:text-foreground data-[active=true]:bg-accent/10 data-[active=true]:text-foreground transition-colors"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent opacity-0 data-[active=true]:opacity-100"
                  data-active={isActive}
                />
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
