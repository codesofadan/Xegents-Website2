"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { scrollToSection } from "@/lib/scroll"

// Lazy, client-only so `three` never blocks first paint (protects LCP).
const AuroraBackground = dynamic(
  () => import("@/components/three/aurora-bg").then((m) => m.AuroraBackground),
  { ssr: false },
)

const STATS = [
  { value: "60%",   label: "Avg. admin time eliminated" },
  { value: "2–3×",  label: "Revenue / deals recovered" },
  { value: "8–11×", label: "Client ROI within 90 days" },
]

// Splits "8–11×" -> ["", "8", "–", "11", "×"] so every digit-group can count up
// while the separators / suffixes ("–", "×", "%") stay fixed.
const zeroed = (value: string) =>
  value.split(/(\d+)/).map((p) => (/^\d+$/.test(p) ? "0" : p)).join("")

function StatCounter({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState(() => zeroed(value))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) { setDisplay(value); return }

    const parts = value.split(/(\d+)/)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const dur   = 1400
        const start = performance.now()
        const tick  = (now: number) => {
          const t     = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(
            parts.map((p) => (/^\d+$/.test(p) ? String(Math.round(eased * Number(p))) : p)).join(""),
          )
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center py-5 px-2 sm:py-6 sm:px-4">
      {/* At 390px each of the three cells is ~78px of usable width — text-3xl
          breaks "8–11×" across two lines. Step the value down on mobile. */}
      <p className="text-2xl sm:text-4xl font-black text-foreground tabular-nums">{display}</p>
      <p className="text-[10px] sm:text-[11px] text-foreground/40 mt-1.5 leading-tight uppercase tracking-wide text-balance">
        {label}
      </p>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".hero-el")
    if (!els) return
    els.forEach((el, i) => {
      el.style.opacity    = "0"
      el.style.transform  = "translateY(16px)"
      el.style.transition = `opacity 0.7s ease ${i * 0.08}s, transform 0.7s ease ${i * 0.08}s`
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.opacity   = "1"
        el.style.transform = "translateY(0)"
      }))
    })
  }, [])

  return (
    <section ref={ref} className="relative pt-40 sm:pt-52 pb-6 sm:pb-8 px-4 sm:px-6 text-center overflow-hidden">

      {/* Three.js aurora background — brand purple, fades into the page below */}
      <div className="pointer-events-none absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
        <AuroraBackground intensity={0.9} />
      </div>

      {/* Soft scrim so the headline stays crisp over the aurora */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_42%,rgba(12,12,24,0.55),transparent_72%)]" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Eyebrow — animated border-beam pill */}
        <div className="hero-el mb-8 flex justify-center">
          <div className="relative inline-flex overflow-hidden rounded-full p-[1.5px]">
            {/* traveling light that orbits the border */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_285deg,rgba(139,92,246,0.5)_320deg,#ffffff_345deg,rgba(139,92,246,0.5)_350deg,transparent_360deg)] motion-reduce:animate-none"
            />
            {/* faint static ring under the beam */}
            <span aria-hidden="true" className="absolute inset-0 rounded-full border border-white/10" />
            {/* label */}
            <span className="relative inline-flex items-center gap-2 rounded-full bg-background/85 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px] shadow-accent/50" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60">
                AI Transformation Partner
              </span>
            </span>
          </div>
        </div>

        {/* Headline — one gradient word, everything else white */}
        <h1 className="hero-el text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-white mb-8">
          We find the work your team<br className="hidden sm:block" /> shouldn't be doing,{" "}
          <span className="gradient-text">& assign it to AI.</span>
        </h1>

        {/* Sub */}
        <p className="hero-el text-base sm:text-lg text-foreground/50 leading-relaxed max-w-xl mx-auto mb-10">
          Your team's already doing it. AI does it faster and cheaper — without burning anyone out.
          We identify where AI creates immediate ROI, then build those systems.
        </p>

        {/* CTAs */}
        <div className="hero-el flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <Link
            href="/#booking-section"
            onClick={(e) => { if (scrollToSection("booking-section")) e.preventDefault() }}
            className="px-8 py-3.5 bg-accent text-white rounded-lg text-sm font-semibold w-full sm:w-auto text-center transition-all duration-200 ease-out will-change-transform hover:bg-accent/90 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_16px_38px_-10px] hover:shadow-accent/60 active:translate-y-0 active:scale-100 motion-reduce:transform-none motion-reduce:transition-none"
          >
            Book a Free Discovery Call
          </Link>
          <Link
            href="/#work"
            onClick={(e) => { if (scrollToSection("work")) e.preventDefault() }}
            className="px-8 py-3.5 border border-white/12 rounded-lg text-sm font-medium hover:border-white/24 hover:text-white transition-all text-foreground/60 w-full sm:w-auto text-center"
          >
            See Case Studies →
          </Link>
        </div>

        {/* Stats — STATIC cards. A light-beam orbits each border; on hover the
            card lifts out and a soft glowing shadow pulses behind it. */}
        <div className="hero-el grid grid-cols-3 gap-3 sm:gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="group relative hover:z-20">
              {/* pulsing glow shadow behind the card — only on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-2xl bg-accent/25 opacity-0 blur-2xl group-hover:animate-[statGlow_2.4s_ease-in-out_infinite] motion-reduce:hidden"
              />

              {/* card shell — 1.5px padding reveals the orbiting beam as a border */}
              <div className="relative rounded-xl p-[1.5px] overflow-hidden transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-1.5 motion-reduce:transform-none">
                {/* traveling light that orbits the edges + corners */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_295deg,rgba(139,92,246,0.55)_330deg,#ffffff_350deg,rgba(139,92,246,0.55)_356deg,transparent_360deg)] motion-reduce:animate-none group-hover:[animation-duration:2.8s]"
                />
                {/* faint static ring under the beam */}
                <span aria-hidden="true" className="absolute inset-0 rounded-xl border border-white/10" />
                {/* inner surface (opaque so only the border ring shows the beam) */}
                <div className="relative rounded-[10.5px] bg-card/90 backdrop-blur-sm shadow-[0_22px_48px_-26px_rgba(0,0,0,0.9)]">
                  <StatCounter value={s.value} label={s.label} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes statGlow {
          0%, 100% { opacity: 0.45; transform: scale(0.96); }
          50%      { opacity: 0.9;  transform: scale(1.04); }
        }
      `}</style>
    </section>
  )
}
