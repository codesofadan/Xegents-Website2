"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { projects } from "@/lib/projects-data"

gsap.registerPlugin(ScrollTrigger)

// Rendered twice so the track can loop seamlessly.
const LOOP = [...projects, ...projects]

export function ProjectsMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  // Header reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projm-header-el",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
    }, sectionRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  // Slow, continuous right → left rotation — the mirror of the comments marquee.
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
      const first = track.children[0] as HTMLElement | undefined
      const dup = track.children[projects.length] as HTMLElement | undefined
      if (!first || !dup) return
      const shift = dup.offsetLeft - first.offsetLeft
      if (shift <= 0) return
      // Start at 0, animate to -shift → content travels right → left.
      gsap.set(track, { x: 0 })
      tweenRef.current = gsap.to(track, {
        x: -shift,
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
            <p className="projm-header-el text-xs font-medium text-accent uppercase tracking-widest mb-3">Proof of Work</p>
            <h2 className="projm-header-el text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
              Four systems we&apos;ve <span className="gradient-text">shipped.</span>
            </h2>
          </div>
          <p className="projm-header-el text-sm text-foreground/45 max-w-xs leading-relaxed">
            Real internal + client builds already in production — not concepts.
          </p>
        </div>
      </div>

      {/* Rotating marquee (right → left) */}
      <div className="relative" onMouseEnter={pause} onMouseLeave={resume}>
        <div ref={trackRef} className="flex gap-5 w-max px-4 sm:px-6 will-change-transform">
          {LOOP.map((p, i) => (
            <div
              key={i}
              aria-hidden={i >= projects.length}
              className="glass-card w-[320px] sm:w-[380px] shrink-0 p-7 flex flex-col gap-4"
            >
              {/* Industry eyebrow */}
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: p.accent }}>
                {p.industry}
              </span>

              {/* Project name — highlighted, big */}
              <h3
                className="text-3xl sm:text-4xl font-black tracking-tighter leading-none"
                style={{ color: p.accent }}
              >
                {p.name}
              </h3>

              {/* Short description */}
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed font-medium">
                {p.headline}
              </p>

              {/* Top result — echoes the comments card's stat pill */}
              <div className="mt-auto pt-5 border-t border-border">
                <span
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                  style={{ color: p.accent, background: `${p.accent}14`, border: `1px solid ${p.accent}30` }}
                >
                  {p.results[0].value} {p.results[0].label}
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
