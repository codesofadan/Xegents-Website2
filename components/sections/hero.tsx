"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"

const HEADLINE_WORDS = [
  { text: "We", highlight: false },
  { text: "Find", highlight: false },
  { text: "The", highlight: false },
  { text: "Work", highlight: true },
  { text: "Your", highlight: false },
  { text: "Team", highlight: false },
  { text: "Shouldn't", highlight: false },
  { text: "Be", highlight: false },
  { text: "Doing,", highlight: false },
  { text: "&", highlight: false },
  { text: "Assign", highlight: true },
  { text: "It", highlight: false },
  { text: "To", highlight: false },
  { text: "AI.", highlight: true },
]

const STATS = [
  { value: "60%",  label: "Avg. admin time eliminated", numEnd: 60, suffix: "%" },
  { value: "2–3×", label: "Deals / revenue recovered",  numEnd: null },
  { value: "8–11×",label: "Client ROI within 90 days",  numEnd: null },
]

function StatCard({ stat }: { stat: typeof STATS[number] }) {
  const [display, setDisplay] = useState(stat.numEnd ? "0" + stat.suffix : stat.value)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!stat.numEnd) return
    const end = stat.numEnd
    const suf = stat.suffix ?? ""
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const dur = 1600
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(`${Math.round(eased * end)}${suf}`)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [stat.numEnd, stat.suffix])

  return (
    <div ref={ref} className="glass-card px-4 py-5 text-center hover:border-accent/20 transition-colors">
      <p className="text-2xl sm:text-4xl font-black text-foreground mb-1">{display}</p>
      <p className="text-[10px] sm:text-xs text-foreground/50 leading-tight">{stat.label}</p>
    </div>
  )
}

function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) * 0.28
    const y = (e.clientY - r.top  - r.height / 2) * 0.28
    el.style.transform = `translate(${x}px, ${y}px)`
    el.style.transition = "transform 0.1s linear"
  }, [])

  const onLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)"
      ref.current.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
    }
  }, [])

  return (
    <a ref={ref} href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </a>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-el",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: "power3.out", delay: 0.1 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative pt-36 sm:pt-44 pb-24 sm:pb-32 px-4 sm:px-6 overflow-hidden text-center"
    >
      <div className="max-w-5xl mx-auto">

        {/* Badge */}
        <span className="hero-el inline-block px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-semibold tracking-widest uppercase mb-8">
          AI Transformation Partner
        </span>

        {/* Headline */}
        <h1 className="hero-el text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tighter mb-8 flex flex-wrap justify-center gap-x-4 gap-y-1 text-white">
          {HEADLINE_WORDS.map((w, i) => (
            <span key={i} className={w.highlight ? "gradient-text" : ""}>
              {w.text}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <p className="hero-el text-base sm:text-lg text-foreground/60 leading-relaxed max-w-xl mx-auto mb-10">
          Your team's already doing the work. AI does it faster, cheaper, and without burning people out.
          We identify where AI creates immediate ROI, then build those systems for you.
        </p>

        {/* CTAs — magnetic */}
        <div className="hero-el flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <MagneticLink
            href="/contact"
            className="px-8 py-3.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors w-full sm:w-auto text-center"
          >
            Book a Free Discovery Call
          </MagneticLink>
          <MagneticLink
            href="/projects"
            className="px-8 py-3.5 border border-accent/40 rounded-lg text-sm font-semibold hover:bg-accent/8 transition-colors text-accent w-full sm:w-auto text-center"
          >
            See Case Studies →
          </MagneticLink>
        </div>

        {/* Stats — number counters */}
        <div className="hero-el grid grid-cols-3 gap-3 sm:gap-5 pt-10 border-t border-border">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
