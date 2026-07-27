"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const BARION_URL = "https://barionsystems.com/"

/* ────────────────────────────────────────────────────────────────────────────
   PARENT COMPANY — the credibility beat between "what we build" and "the
   numbers".

   STRUCTURE: deliberately identical to Services / Testimonials / Projects —
   a max-w-7xl container, a left-aligned header row (eyebrow + H2) with a
   right-hand element on the same row, then the body below. The right-hand slot
   that those sections give to a muted line, this one gives to Barion's mark.
   Same skeleton, different payload, so the section reads as part of the page
   rather than as something lifted from another site.

   NO AMBIENT MOTION. The mark is static — glow and rings only. The single
   scroll reveal is kept because every other section on the page has one;
   dropping it would make this the one section that behaves differently.

   LOGO NOTE: /barion-systems-logo.png is Barion's own white-knockout mark,
   109×64 native, rendered at 96px — never upscaled. The medallion supplies the
   presence so the asset never has to stretch.
──────────────────────────────────────────────────────────────────────────── */

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block h-3 w-3 ml-1 -translate-y-px opacity-70"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

function BarionLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={BARION_URL}
      target="_blank"
      rel="noopener noreferrer external"
      title="Barion Systems — the technology group behind Xegents"
      aria-label="Visit the Barion Systems website (opens in a new tab)"
      className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent/85 hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
    >
      {children}
      <ExternalIcon />
    </a>
  )
}

export function ParentCompany() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      return
    }
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const reveal = inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"

  return (
    <section
      id="parent-company"
      ref={sectionRef}
      className="scroll-mt-28 pt-8 sm:pt-10 pb-10 sm:pb-14 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header row — same skeleton as Services / Testimonials / Projects:
            title block left, companion element right, aligned on one baseline. */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 sm:gap-10 mb-12 sm:mb-14">
          <div className={`transition-all duration-700 ${reveal}`}>
            <p className="text-xs font-medium text-accent uppercase tracking-widest mb-3">Backed By</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
              We are trusted by <span className="gradient-text">Barion Systems.</span>
            </h2>
          </div>

          {/* The mark — static. Glow and rings only. */}
          <a
            href={BARION_URL}
            target="_blank"
            rel="noopener noreferrer external"
            aria-label="Visit the Barion Systems website (opens in a new tab)"
            className={`group relative grid h-36 w-36 sm:h-40 sm:w-40 shrink-0 place-items-center rounded-full transition-all duration-700 delay-100 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent ${reveal}`}
          >
            {/* ambient brand light */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.60_0.22_292/0.28),transparent_62%)] blur-lg transition-opacity duration-500 group-hover:opacity-90"
            />
            {/* concentric rings — Barion's own orbit geometry, held still */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full border border-white/[0.10] transition-colors duration-500 group-hover:border-accent/30"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[14%] rounded-full border border-white/[0.06]"
            />
            <Image
              src="/barion-systems-logo.png"
              alt="Barion Systems"
              width={109}
              height={64}
              className="relative w-24 h-auto transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
            />
          </a>
        </div>

        {/* Body — statement left, detail right. Two columns keep a readable
            measure while still using the full container width. */}
        <div className={`grid lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-16 transition-all duration-700 delay-150 ${reveal}`}>
          <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/90 leading-snug text-balance">
            Thirteen years of shipped systems. Nine countries. One engineering group.
          </p>

          <div className="space-y-4">
            <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
              Xegents is backed by <BarionLink>Barion Systems</BarionLink> — an independent technology
              group founded in <strong className="font-semibold text-foreground/90">2013</strong> and
              headquartered in Kuala Lumpur. Seven companies now sit under it, spanning POS and ERP,
              security and visitor management, enterprise networking, hosting, and cross-border
              e-commerce.
            </p>
            <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
              It operates in <strong className="font-semibold text-foreground/90">9+ countries</strong> —
              Malaysia, Pakistan, the USA, the UK, the UAE, and Australia — and its software already
              runs inside some of Kuala Lumpur&apos;s largest retail and commercial developments. That
              engineering bench is what stands behind every AI system we ship.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
