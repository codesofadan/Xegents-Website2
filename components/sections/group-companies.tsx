"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ────────────────────────────────────────────────────────────────────────────
   GROUP COMPANIES — the orbit.

   Barion's own group graphic, rebuilt dark-native. Five brand discs sit on a
   ring; the hub is a live display. Resting, it shows the Barion mark. Hover or
   keyboard-focus any brand and the hub becomes that company's detail panel —
   so there is one information surface and zero layout shift, instead of five
   tooltips fighting for space at odd angles around a circle.

   CONTRAST LOGIC: the satellites are white discs carrying full-colour brand
   marks (as Barion presents them); the hub is dark glass carrying Barion's
   white knockout. Light orbits dark, which is what makes it read on this page.

   TOUCH: hover is not an input on a phone, so below lg the same five companies
   render as cards with their detail already visible. Not a degraded orbit — a
   layout that suits the input.
──────────────────────────────────────────────────────────────────────────── */

type Company = {
  id: string
  name: string
  logo: string
  w: number
  h: number
  sector: string
  line: string
  url: string
}

const COMPANIES: Company[] = [
  {
    id: "mssalepoint",
    name: "MSSalePoint",
    logo: "/logos/mssalepoint.png",
    w: 80, h: 62,
    sector: "POS & Accounting",
    line: "Point of sale and full accounting in one system — multi-branch, cloud-hosted, and still running when the connection drops.",
    url: "https://mssalepoint.com/",
  },
  {
    id: "secureresi",
    name: "SecureResi",
    logo: "/logos/secureresi.png",
    w: 107, h: 41,
    sector: "Security Management",
    line: "Visitor, guard and building security management, deployed across residential and commercial sites.",
    url: "https://secureresi.com/",
  },
  {
    id: "barioo",
    name: "Barioo",
    logo: "/logos/barioo.png",
    w: 94, h: 94,
    sector: "ERP-Integrated POS",
    line: "ERP-native point of sale for retail, pharmacy and restaurant operations, with live inventory and analytics.",
    url: "https://barioo.com/",
  },
  {
    id: "pakmalls",
    name: "Pak Malls",
    logo: "/logos/pakmalls.png",
    w: 99, h: 30,
    sector: "Cross-Border E-Commerce",
    line: "The e-commerce bridge built between the Pakistani and Malaysian markets.",
    url: "https://barionsystems.com/pakmall.html",
  },
  {
    id: "network-world",
    name: "Network World",
    logo: "/logos/network-world.png",
    w: 70, h: 58,
    sector: "Networking & Infrastructure",
    line: "Enterprise networking, CCTV, security and round-the-clock server management.",
    url: "https://barionsystems.com/network.html",
  },
]

/* Geometry — an ellipse, not a circle, so the orbit uses the page's full
   width instead of being boxed into a square. The stage runs 9:4; the SVG
   viewBox matches that ratio exactly so strokes stay uniform rather than
   stretching vertically the way a squashed 100×100 viewBox would. */
const VB_W = 900
const VB_H = 400
const CX = VB_W / 2
const CY = VB_H / 2

const RX_PCT = 40 // ellipse radii, % of stage width / height
const RY_PCT = 37
const NODE_PCT = 7.4 // disc diameter, % of stage width
const HUB_PCT = 17 // hub diameter, % of stage width

const RX = (RX_PCT / 100) * VB_W
const RY = (RY_PCT / 100) * VB_H
const HUB_R = (HUB_PCT / 200) * VB_W
const NODE_R = (NODE_PCT / 200) * VB_W

// Five evenly-spaced points, first one at twelve o'clock.
const POINTS = COMPANIES.map((c, i) => {
  const rad = ((-90 + i * (360 / COMPANIES.length)) * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)

  // point on the ellipse, in viewBox units
  const nx = CX + RX * cos
  const ny = CY + RY * sin

  // connector runs along the true centre→node vector, clearing both ends
  const dx = nx - CX
  const dy = ny - CY
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len

  return {
    id: c.id,
    // percentage positions for the DOM discs
    x: 50 + RX_PCT * cos,
    y: 50 + RY_PCT * sin,
    // viewBox endpoints for the SVG connector
    x1: CX + ux * (HUB_R + 8),
    y1: CY + uy * (HUB_R + 8),
    x2: nx - ux * (NODE_R + 8),
    y2: ny - uy * (NODE_R + 8),
  }
})

/** `cap` is expressed as a share of the disc, so the mark scales with its
 *  container instead of pinning to a pixel size that overflows when the orbit
 *  shrinks. */
function LogoDisc({ c, cap = "64%" }: { c: Company; cap?: string }) {
  return (
    <Image
      src={c.logo}
      alt={c.name}
      width={c.w}
      height={c.h}
      className="object-contain"
      style={{ maxWidth: cap, maxHeight: `calc(${cap} * 0.62)` }}
    />
  )
}

export function GroupCompanies() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = COMPANIES.find((c) => c.id === activeId) ?? null

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gc-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })

      gsap.fromTo(".gc-stage",
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".gc-stage", start: "top 85%", toggleActions: "play none none none" } })

      gsap.fromTo(".gc-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".gc-cards", start: "top 88%", toggleActions: "play none none none" } })
    }, sectionRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  return (
    <section
      id="group"
      ref={sectionRef}
      className="scroll-mt-28 py-24 sm:py-32 px-4 sm:px-6 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <p className="gc-header text-xs font-medium text-accent uppercase tracking-widest mb-3">
            The Group
          </p>
          <h2 className="gc-header text-3xl sm:text-5xl font-black tracking-tighter leading-tight text-balance">
            They trusted us. <span className="gradient-text">Would you?</span>
          </h2>
          <p className="gc-header mt-4 text-sm sm:text-base text-foreground/55 leading-relaxed">
            Five production systems built and run inside the Barion Systems group — POS, security,
            networking, and cross-border commerce, live across nine countries.
          </p>
        </div>

        {/* ── Orbit (lg and up) ───────────────────────────────────────────── */}
        <div className="gc-stage hidden lg:block">
          <div className="gc-orbit relative mx-auto w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>

            {/* ellipse + connector lines */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <ellipse
                cx={CX} cy={CY} rx={RX} ry={RY}
                fill="none"
                stroke="oklch(1 0 0 / 0.10)"
                strokeWidth="1.4"
              />
              {POINTS.map((p) => (
                <line
                  key={p.id}
                  x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                  stroke={activeId === p.id ? "oklch(0.60 0.22 292 / 0.85)" : "oklch(1 0 0 / 0.07)"}
                  strokeWidth={activeId === p.id ? 2.4 : 1.4}
                  className="transition-all duration-300"
                />
              ))}
            </svg>

            {/* hub — Barion at rest, company detail on hover/focus */}
            <div
              className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 backdrop-blur-sm px-5 text-center"
              style={{
                width: `${HUB_PCT}cqw`,
                height: `${HUB_PCT}cqw`,
                boxShadow: "0 0 60px -18px oklch(0.60 0.22 292 / 0.55)",
              }}
            >
              <div aria-live="polite" className="relative w-full">
                {/* resting state */}
                <div className={`transition-opacity duration-300 ${active ? "opacity-0" : "opacity-100"}`}>
                  <Image
                    src="/barion-systems-logo.png"
                    alt="Barion Systems"
                    width={109}
                    height={64}
                    className="mx-auto w-20 h-auto"
                  />
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-foreground/40">
                    Hover a company
                  </p>
                </div>

                {/* active state */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {active && (
                    <>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-accent">
                        {active.sector}
                      </p>
                      <p className="mt-1.5 text-lg font-black tracking-tight leading-tight text-foreground">
                        {active.name}
                      </p>
                      <p className="mt-2 text-[11px] leading-snug text-foreground/60">
                        {active.line}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* satellites */}
            {COMPANIES.map((c, i) => {
              const p = POINTS[i]
              const isActive = activeId === c.id
              return (
                <a
                  key={c.id}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer external"
                  aria-label={`${c.name} — ${c.sector}. Opens in a new tab.`}
                  onMouseEnter={() => setActiveId(c.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(c.id)}
                  onBlur={() => setActiveId(null)}
                  /* NOTE: no -translate-*-1/2 utilities here. Tailwind v4 emits
                     those as the standalone `translate` property, which composes
                     with the inline `transform` below instead of losing to it —
                     the disc would be centred twice and drift half its own width
                     up and left. Centring lives in the inline transform only. */
                  className="absolute grid place-items-center rounded-full bg-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${NODE_PCT}cqw`,
                    height: `${NODE_PCT}cqw`,
                    opacity: activeId && !isActive ? 0.4 : isActive ? 1 : 0.85,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1.12 : 1})`,
                    boxShadow: isActive
                      ? "0 0 34px -4px oklch(0.60 0.22 292 / 0.9), 0 0 0 3px oklch(0.60 0.22 292 / 0.35)"
                      : "0 10px 28px -12px rgba(0,0,0,0.8)",
                  }}
                >
                  <LogoDisc c={c} />
                </a>
              )
            })}
          </div>
        </div>

        {/* ── Cards (below lg) — detail always visible, no hover required ─── */}
        <div className="gc-cards grid gap-4 sm:grid-cols-2 lg:hidden">
          {COMPANIES.map((c) => (
            <a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer external"
              className="gc-card glass-card flex items-start gap-4 p-5 transition-colors hover:border-accent/30"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white">
                <LogoDisc c={c} cap="72%" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-accent">
                  {c.sector}
                </span>
                <span className="mt-1 block text-base font-black tracking-tight text-foreground">
                  {c.name}
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-foreground/55">
                  {c.line}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* container context so the discs, hub and marks all scale from the
           stage's own width rather than the viewport */
        .gc-orbit { container-type: inline-size; }
      `}</style>
    </section>
  )
}
