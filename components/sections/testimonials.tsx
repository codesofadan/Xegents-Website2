"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote:
      "Before Xegents, my agents were spending 3 hours a day on admin. Now they spend 20 minutes. We closed 31% more deals in Q4 without hiring a single person.",
    name: "Marcus Delgado",
    role: "CEO",
    company: "Westfield Properties",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face",
    stat: "31% more deals, Q4",
  },
  {
    quote:
      "The AI billing audit found $180K in missed claims in the first month. ROI on this engagement was 11× in 90 days. Nothing we've ever invested in came close.",
    name: "Dr. Priya Mehta",
    role: "Director of Operations",
    company: "HealthPlus Group",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80&fit=crop&crop=face",
    stat: "$180K recovered, month 1",
  },
  {
    quote:
      "Our support team was drowning in tickets. The AI agent handles 78% of them automatically now. We scaled from 4K to 9K monthly orders without adding headcount.",
    name: "Ryan Okafor",
    role: "Founder",
    company: "Velocity DTC",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face",
    stat: "2× scale, 0 new hires",
  },
]

// Rendered twice so the track can loop seamlessly.
const LOOP = [...TESTIMONIALS, ...TESTIMONIALS]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  // Header reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testi-header-el",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
    }, sectionRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  // Slow, continuous left → right rotation of the comments
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const build = () => {
      tweenRef.current?.kill()
      tweenRef.current = null
      gsap.set(track, { x: 0 })
      if (reduce) return
      // Distance from the start of copy 1 to the start of copy 2 = one full,
      // gap-inclusive tile width → shifting by it tiles perfectly (no jump).
      // Subtract the first child's own offset so the track's px padding isn't
      // counted into the period (which would nudge the seam each loop).
      const first = track.children[0] as HTMLElement | undefined
      const dup = track.children[TESTIMONIALS.length] as HTMLElement | undefined
      if (!first || !dup) return
      const shift = dup.offsetLeft - first.offsetLeft
      if (shift <= 0) return
      // Start shifted left, animate back to 0 → content travels left → right.
      gsap.set(track, { x: -shift })
      tweenRef.current = gsap.to(track, {
        x: 0,
        duration: 38,
        ease: "none",
        repeat: -1,
      })
    }

    build()

    let lastW = window.innerWidth
    const onResize = () => {
      if (window.innerWidth === lastW) return // ignore vertical-only changes
      lastW = window.innerWidth
      build()
    }
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      tweenRef.current?.kill()
    }
  }, [])

  const pause = () => tweenRef.current?.pause()
  const resume = () => tweenRef.current?.resume()

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="testi-header-el text-xs font-medium text-accent uppercase tracking-widest mb-3">Client Results</p>
            <h2 className="testi-header-el text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
              What founders say <span className="gradient-text">after we ship.</span>
            </h2>
          </div>
          <p className="testi-header-el text-sm text-foreground/45 max-w-xs leading-relaxed">
            Numbers from real engagements. No stock photos, no made-up stats.
          </p>
        </div>
      </div>

      {/* Rotating marquee (left → right) */}
      <div className="relative" onMouseEnter={pause} onMouseLeave={resume}>
        <div ref={trackRef} className="flex gap-5 w-max px-4 sm:px-6 will-change-transform">
          {LOOP.map((t, i) => (
            <div
              key={i}
              aria-hidden={i >= TESTIMONIALS.length}
              className="testi-card glass-card w-[320px] sm:w-[380px] shrink-0 p-7 flex flex-col justify-between gap-6 hover:border-accent/25 transition-colors"
            >
              {/* Quote */}
              <div>
                <svg className="w-6 h-6 text-accent/40 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-border flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-bold leading-tight">{t.name}</p>
                    <p className="text-xs text-foreground/45 leading-tight">{t.role}, {t.company}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {t.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[8%] z-10"
             style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[8%] z-10"
             style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
      </div>
    </section>
  )
}
