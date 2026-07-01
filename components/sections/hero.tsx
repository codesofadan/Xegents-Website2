"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const STATS = [
  { value: "60%",   label: "Avg. admin time eliminated", numEnd: 60,  suffix: "%" },
  { value: "2–3×",  label: "Revenue / deals recovered",   numEnd: null },
  { value: "8–11×", label: "Client ROI within 90 days",   numEnd: null },
]

function StatCounter({ stat }: { stat: typeof STATS[number] }) {
  const [display, setDisplay] = useState(stat.numEnd ? `0${stat.suffix}` : stat.value)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!stat.numEnd) return
    const end    = stat.numEnd
    const suffix = stat.suffix ?? ""
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const dur   = 1400
        const start = performance.now()
        const tick  = (now: number) => {
          const t     = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(`${Math.round(eased * end)}${suffix}`)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [stat.numEnd, stat.suffix])

  return (
    <div ref={ref} className="text-center py-6 px-4">
      <p className="text-3xl sm:text-4xl font-black text-foreground tabular-nums">{display}</p>
      <p className="text-[11px] text-foreground/40 mt-1.5 leading-tight uppercase tracking-wide">{stat.label}</p>
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
    <section ref={ref} className="relative pt-40 sm:pt-52 pb-24 sm:pb-36 px-4 sm:px-6 text-center">
      <div className="max-w-4xl mx-auto">

        {/* Eyebrow */}
        <div className="hero-el inline-flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-[11px] font-medium text-foreground/50 uppercase tracking-[0.2em]">
            AI Transformation Partner
          </span>
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
            href="/contact"
            className="px-8 py-3.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/85 transition-colors w-full sm:w-auto text-center"
          >
            Book a Free Discovery Call
          </Link>
          <Link
            href="/projects"
            className="px-8 py-3.5 border border-white/12 rounded-lg text-sm font-medium hover:border-white/24 hover:text-white transition-all text-foreground/60 w-full sm:w-auto text-center"
          >
            See Case Studies →
          </Link>
        </div>

        {/* Stats — clean row divided by hairlines */}
        <div className="hero-el grid grid-cols-3 divide-x divide-border border border-border rounded-xl overflow-hidden">
          {STATS.map((s) => <StatCounter key={s.label} stat={s} />)}
        </div>

      </div>
    </section>
  )
}
