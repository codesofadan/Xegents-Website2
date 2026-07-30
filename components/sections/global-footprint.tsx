"use client"

import { useEffect, useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
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
  { country: "Saudi Arabia", x: 59.71, y: 59.11, labelShift: -34 },
  { country: "UAE",          x: 61.97, y: 59.11, labelShift: 26 },
  { country: "Australia",    x: 88.35, y: 84.24 },
]

export function GlobalFootprint() {
  const sectionRef = useRef<HTMLElement>(null)
  // Nine looping pulses is nine animations — none of them run off-screen.
  // `initial: true` because this gate PAUSES rather than reveals: starting
  // false would paint one frame of a stalled map on a section already in view.
  const visible = useInView(sectionRef, { initial: true })

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
            Where Barion Systems already runs — the base Xegents builds on.
          </p>
        </div>

        {/* ── Map (lg and up) ─────────────────────────────────────────────
            Not `sm`. Below ~1024px the Gulf and South-East Asia markers pull
            close enough together that their labels collide — the dots scale
            with the map, the type does not. The orbit section uses the same
            breakpoint for the same reason. */}
        <div className="gf-map relative hidden lg:block">
          <div className="relative mx-auto w-full" style={{ aspectRatio: "1107 / 609" }}>

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

            {MARKETS.map((m, i) => (
              <div
                key={m.country}
                className="gf-pin absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${m.x}%`, top: `${m.y}%`, zIndex: 10 + i }}
              >
                <span className="relative grid place-items-center">
                  {/* outward ping */}
                  <span
                    aria-hidden="true"
                    className={`gf-ping absolute rounded-full bg-accent ${paused}`}
                    style={{
                      width: m.hq ? 14 : 10,
                      height: m.hq ? 14 : 10,
                      animationDelay: `${(i * 0.34).toFixed(2)}s`,
                    }}
                  />
                  {/* steady core */}
                  <span
                    className={`gf-dot relative rounded-full ${paused}`}
                    style={{
                      width: m.hq ? 14 : 10,
                      height: m.hq ? 14 : 10,
                      background: m.hq ? "oklch(0.78 0.16 292)" : "oklch(0.66 0.21 292)",
                      boxShadow: `0 0 ${m.hq ? 18 : 12}px ${m.hq ? 4 : 2}px oklch(0.60 0.22 292 / 0.55)`,
                      animationDelay: `${(i * 0.34).toFixed(2)}s`,
                    }}
                  />
                </span>

                {/* name, directly beneath the dot */}
                <span
                  className="absolute left-1/2 top-full mt-2 whitespace-nowrap"
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
              </div>
            ))}
          </div>
        </div>

        {/* ── Cards (below lg) ─────────────────────────────────────────────── */}
        <div className="gf-cards grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:hidden">
          {MARKETS.map((m) => (
            <div key={m.country} className="gf-card glass-card flex items-center gap-2.5 p-3">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-accent"
                style={{ boxShadow: "0 0 10px 2px oklch(0.60 0.22 292 / 0.55)" }}
              />
              <span className="min-w-0 truncate text-sm font-semibold text-foreground">
                {m.country}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gf-ping {
          0%   { transform: scale(1);   opacity: 0.5; }
          70%  { transform: scale(3.4); opacity: 0; }
          100% { transform: scale(3.4); opacity: 0; }
        }
        @keyframes gf-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.5; }
        }
        .gf-ping { animation: gf-ping 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
        .gf-dot  { animation: gf-blink 2.6s ease-in-out infinite; }
        /* After the shorthand, or it loses — this is eighteen animations that
           were running off-screen. */
        [data-anim="off"] .gf-ping,
        [data-anim="off"] .gf-dot { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .gf-ping { display: none; }
          .gf-dot  { animation: none; }
        }
      `}</style>
    </section>
  )
}
