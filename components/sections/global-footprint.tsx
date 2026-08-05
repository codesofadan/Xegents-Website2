"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { useDismiss } from "@/hooks/use-dismiss"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

/* ────────────────────────────────────────────────────────────────────────────
   GLOBAL FOOTPRINT — where the Barion group operates.

   A presence map: a live purple dot on each country, the name beneath it.
   No percentages — once the list grew past the six markets Barion publishes
   shares for, those numbers stopped summing to anything.

   POSITIONS are solved, not eyeballed. /world-map.png was fitted against 108
   known land/sea control points; it is a WEB MERCATOR silhouette, vertically
   squashed to ~0.82 of conformal. Solved parameters, for the 1107×609 source:

     x_px = 518.9 + 3.035 · lon°
     y_px = 423.5 − 142.5 · ln(tan(45° + lat°/2))

   That fit classifies 107 of 108 control points correctly. The percentages
   below are that formula's output for each capital, then nudged by a few px
   where this silhouette simplifies the coastline away — the Malay peninsula is
   a 6px sliver, Java is not drawn at all (so Indonesia sits on Kalimantan),
   and Britain merges into France below 52°N (so the UK dot sits at 54.5°N).
   Every one is verified to land inside the drawn landmass.

   ONE DELIBERATE EXCEPTION TO THAT, added when the map was un-gated for
   phones: Saudi Arabia and the UAE carry a `nudgeSm` of ∓0.9%, applied ONLY
   below 1024px. Their true positions are 2.26% apart, which is 8.1px on a
   358px-wide stage — closer than the dots are wide, so they overlapped into
   one blob. ±0.9% is ±10px on the 1107px source and still lands well inside
   the Arabian peninsula. At lg and above the solved positions are used
   untouched.

   MOTION: every dot pulses on a staggered delay so the map reads as live
   rather than mechanical. All of it pauses off-screen and stops dead under
   reduced-motion.
──────────────────────────────────────────────────────────────────────────── */

type Market = {
  country: string
  /** solved position on /world-map.png, % across / % down */
  x: number
  y: number
  hq?: boolean
  /** px nudge for the name only, to keep neighbouring labels from touching */
  labelShift?: number
  /**
   * Compact-only horizontal nudge, in PERCENT so it scales with the map.
   * Only two markers need it: Saudi Arabia and the UAE are 2.26% apart, which
   * is 8.1px on a 358px-wide stage — closer than the dots are wide, so they
   * physically overlap. ±0.9% pushes them to 14.5px apart, which is ±10px on
   * the 1107px source image and still well inside the Arabian peninsula.
   */
  nudgeSm?: number
}

const MARKETS: Market[] = [
  { country: "Malaysia",     x: 74.98, y: 68.14, hq: true, labelShift: -20 },
  { country: "Pakistan",     x: 66.94, y: 54.84 },
  { country: "Indonesia",    x: 78.14, y: 70.28, labelShift: 18 },
  // Bangkok and Kuala Lumpur are only ~1° apart in longitude, so Thailand's
  // label lands exactly on the Malaysian pin. Nothing else sits west of it,
  // so the label moves rather than either dot.
  { country: "Thailand",     x: 74.44, y: 62.89, labelShift: -38 },
  { country: "USA",          x: 19.87, y: 51.72 },
  { country: "UK",           x: 46.34, y: 42.86 },
  { country: "Saudi Arabia", x: 59.71, y: 59.11, labelShift: -34, nudgeSm: -0.9 },
  { country: "UAE",          x: 61.97, y: 59.11, labelShift: 26, nudgeSm: 0.9 },
  { country: "Australia",    x: 88.35, y: 84.24 },
]

export function GlobalFootprint() {
  const sectionRef = useRef<HTMLElement>(null)

  /* One selection drives both views: tap a dot and its row lights up, tap a
     row and its dot does. Below lg the labels are gone, so this is the only
     way a country gets named. */
  const [active, setActive] = useState<string | null>(null)
  const activeMarket = MARKETS.find((m) => m.country === active) ?? null
  // Nine looping pulses is nine animations — none of them run off-screen.
  // `initial: true` because this gate PAUSES rather than reveals: starting
  // false would paint one frame of a stalled map on a section already in view.
  const visible = useInView(sectionRef, { initial: true })
  useDismiss(active !== null, () => setActive(null), [sectionRef])

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      gsap.fromTo(".gf-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })

      if (reduce) return

      gsap.fromTo(".gf-pin",
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)", stagger: 0.07,
          scrollTrigger: { trigger: ".gf-map", start: "top 85%", toggleActions: "play none none none" } })

      gsap.fromTo(".gf-card",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05,
          scrollTrigger: { trigger: ".gf-cards", start: "top 90%", toggleActions: "play none none none" } })
    }, sectionRef)

    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  const paused = visible ? "" : "[animation-play-state:paused]"

  return (
    <section
      id="footprint"
      ref={sectionRef}
      data-anim={visible ? "on" : "off"}
      className="scroll-mt-28 py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <p className="gf-header text-xs font-medium text-accent uppercase tracking-widest mb-3">
              Global Footprint
            </p>
            <h2 className="gf-header text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
              Nine countries. <span className="gradient-text">One operating group.</span>
            </h2>
          </div>
          <p className="gf-header text-sm text-foreground/45 max-w-xs leading-relaxed">
            Where Barion Systems already runs, and the base Xegents builds on.
          </p>
        </div>

        {/* ── The map, at every width ──────────────────────────
            It used to be `hidden lg:block`, with a flat card list standing in
            below 1024px — so the whole animation was missing on every phone and
            tablet. It renders everywhere now. Two changes made that possible:

            1. THE DOTS SCALE. They were a fixed 10px (14px for HQ) while their
               positions are percentages, so shrinking the map left them three
               times too big for it. They size from container query units now.
            2. THE LABELS MOVE OUT. Below lg they are hidden and the list below
               carries the names instead — see the note on that list for the
               measurement that forces it. Tapping a dot names it in the chip. */}
        {/* Below lg the country names come off the map and the only way to
            name a dot is to tap it — which nothing on the page said. The
            labels carry that themselves at lg and above, so this is hidden
            there. */}
        <p className="mb-3 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-widest text-foreground/40 lg:hidden">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/70 [animation:gf-hint_1.8s_ease-in-out_infinite]" />
          Click to see
        </p>

        <div className="gf-map relative">
          <div className="gf-stage relative mx-auto w-full" style={{ aspectRatio: "1107 / 609" }}>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 45%, oklch(0.60 0.22 292 / 0.13), transparent 70%)",
              }}
            />

            <Image
              src="/world-map.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain opacity-[0.16]"
              style={{ filter: "saturate(1.6) hue-rotate(-6deg)" }}
            />

            {MARKETS.map((m, i) => {
              const isActive = active === m.country
              return (
                <button
                  key={m.country}
                  type="button"
                  onClick={() => setActive(isActive ? null : m.country)}
                  aria-pressed={isActive}
                  aria-label={m.hq ? m.country + " — headquarters" : m.country}
                  data-hq={m.hq ? "true" : "false"}
                  data-active={isActive ? "true" : "false"}
                  className="gf-pin absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
                  style={{
                    left: "calc(" + m.x + "% + var(--gf-nudge, 0%))",
                    top: m.y + "%",
                    zIndex: isActive ? 40 : 10 + i,
                    ["--gf-nudge-sm"]: (m.nudgeSm ?? 0) + "%",
                    ["--gf-delay"]: (i * 0.34).toFixed(2) + "s",
                  } as React.CSSProperties}
                >
                  <span className="relative grid place-items-center">
                    <span aria-hidden="true" className={`gf-ping absolute rounded-full bg-accent ${paused}`} />
                    <span aria-hidden="true" className={`gf-dot relative rounded-full ${paused}`} />
                  </span>

                  {/* Name beneath the dot. Hidden below lg — nine of these on a
                      358px stage overlap into an unreadable pile. */}
                  <span
                    className="gf-label absolute left-1/2 top-full mt-2 whitespace-nowrap"
                    style={{ transform: `translateX(calc(-50% + ${m.labelShift ?? 0}px))` }}
                  >
                    <span
                      className={`rounded-md bg-background/70 px-1.5 py-0.5 text-[10px] backdrop-blur-sm ${
                        m.hq ? "font-bold text-foreground" : "font-semibold text-foreground/85"
                      }`}
                    >
                      {m.country}
                      {m.hq && <span className="ml-1 text-[8px] font-black tracking-widest text-accent">HQ</span>}
                    </span>
                  </span>
                </button>
              )
            })}

            {/* Chip — anchored to the STAGE, not to the dot. On a 197px-tall
                map a dot-anchored bubble covers two or three neighbours and
                needs edge-clamping maths; this needs none and cannot clip. */}
            <p
              aria-live="polite"
              className={`gf-chip absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-accent/30 bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground transition-opacity duration-200 ${
                activeMarket ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {activeMarket ? activeMarket.country : ""}
              {activeMarket?.hq && <span className="ml-1.5 text-[9px] font-black tracking-widest text-accent">HQ</span>}
            </p>
          </div>
        </div>

        {/* ── The country line ─────────────────────────────────
            Below lg the map carries the countries on its own: nine blinking
            dots, and tapping one names it in the chip. This is not a second
            copy of the map — it is the map's conforming alternative, and it
            earns its place by measurement. Saudi Arabia and the UAE sit 2.26%
            of the map apart, which is 8.1px on a 358px stage; Malaysia to
            Thailand is 10.5px. Separating them by the 24px WCAG 2.2 SC 2.5.8
            asks for would need a map 1062px wide. Map pins whose position
            carries meaning fall under that rule's Essential exception, so the
            fix is not to move the pins but to offer a target you can hit.

            It used to be nine glass cards in a 2-up grid — a second block of
            furniture roughly as tall as the map above it. Now it is one line
            of names under a quiet heading: same nine targets, same binding to
            the dots, a fraction of the height. Each pill clears 36px, well
            over the 24px minimum. */}
        <div className="mt-7 lg:hidden">
          {/* Reads as one sentence running into the pills — "On the ground in ·
              Malaysia · Pakistan · …". It says presence, not sales territory:
              these are the countries the group already runs in, which is the
              whole claim of the section. */}
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
            On the ground in
          </h4>

          <ul className="gf-cards mt-3 flex flex-wrap gap-1.5">
            {MARKETS.map((m) => {
              const isActive = active === m.country
              return (
                <li key={m.country}>
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : m.country)}
                    aria-pressed={isActive}
                    data-active={isActive ? "true" : "false"}
                    className="gf-card flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 text-xs font-semibold text-foreground/80 transition-colors data-[active=true]:border-accent/50 data-[active=true]:bg-accent/10 data-[active=true]:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      style={{ boxShadow: "0 0 8px 1.5px oklch(0.60 0.22 292 / 0.55)" }}
                    />
                    {m.country}
                    {m.hq && (
                      <span className="text-[8px] font-black tracking-widest text-accent">HQ</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <style>{`
        /* The stage becomes a query container so the markers can size
           themselves against the MAP rather than the viewport. That is the
           whole reason the map can now render at any width: positions were
           always percentages, but the dots were fixed pixels, so at 358px they
           were three times too large for the map they sat on.

           NOTE: container-type also makes this element a containing block for
           position:fixed descendants. There are none today — do not add one. */
        .gf-stage { container-type: inline-size; }

        .gf-pin {
          --gf-dot: clamp(7px, 1cqi, 10px);
          --gf-glow: calc(var(--gf-dot) * 1.3);
          background: none;
          border: 0;
          padding: 0;
          line-height: 0;
        }
        .gf-pin[data-hq="true"] { --gf-dot: clamp(9.8px, 1.4cqi, 14px); }

        /* An invisible 32px hit area centred on a 7px dot. Without it the
           marker is a target roughly a fifth the size WCAG asks for. */
        .gf-pin::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 32px;
          height: 32px;
          transform: translate(-50%, -50%);
        }

        .gf-ping,
        .gf-dot {
          width: var(--gf-dot);
          height: var(--gf-dot);
          animation-delay: var(--gf-delay);
        }
        .gf-dot {
          background: oklch(0.66 0.21 292);
          box-shadow: 0 0 var(--gf-glow) calc(var(--gf-dot) * 0.2) oklch(0.60 0.22 292 / 0.55);
        }
        .gf-pin[data-hq="true"] .gf-dot {
          background: oklch(0.78 0.16 292);
          box-shadow: 0 0 var(--gf-glow) calc(var(--gf-dot) * 0.28) oklch(0.60 0.22 292 / 0.55);
        }
        .gf-pin[data-active="true"] .gf-dot {
          background: oklch(0.86 0.14 292);
          box-shadow: 0 0 calc(var(--gf-glow) * 2) calc(var(--gf-dot) * 0.5) oklch(0.60 0.22 292 / 0.9);
        }

        @keyframes gf-ping {
          0%   { transform: scale(1);   opacity: 0.5; }
          70%  { transform: scale(3.4); opacity: 0; }
          100% { transform: scale(3.4); opacity: 0; }
        }
        @keyframes gf-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.5; }
        }
        /* Local to this section rather than reusing the reveal-pulse defined
           in the two accordion sections — this one has to stand on its own if
           either of those is ever removed. */
        @keyframes gf-hint {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%      { opacity: 0.3; transform: scale(0.75); }
        }
        .gf-ping { animation: gf-ping 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
        .gf-dot  { animation: gf-blink 2.6s ease-in-out infinite; }
        /* After the shorthand, or it loses — this is eighteen animations that
           were running off-screen. */
        [data-anim="off"] .gf-ping,
        [data-anim="off"] .gf-dot { animation-play-state: paused; }

        /* Below lg the labels come off the map and the two markers that
           physically overlap get their percentage nudge. Both are width
           decisions, not input decisions — the collision is about space. */
        @media (max-width: 1023.98px) {
          .gf-label { display: none; }
          .gf-pin   { --gf-nudge: var(--gf-nudge-sm, 0%); }
        }
        @media (min-width: 1024px) {
          .gf-chip { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gf-ping { display: none; }
          .gf-dot  { animation: none; }
          [style*="gf-hint"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
