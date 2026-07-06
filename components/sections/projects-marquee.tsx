"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { projects } from "@/lib/projects-data"

gsap.registerPlugin(ScrollTrigger)

export function ProjectsMarquee() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projm-header-el",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
      gsap.fromTo(".bento-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, stagger: 0.09, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".bento-grid", start: "top 82%" },
        }
      )
    }, sectionRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  const [p01, p02, p03, p04] = projects

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
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

        {/* Bento Grid */}
        <div className="bento-grid grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

          {/* 01 — Large featured card (left, 2-col) */}
          <Link
            href={`/projects/${p01.id}`}
            className="bento-card group lg:col-span-2 relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 flex flex-col min-h-[340px] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.055] hover:shadow-[0_0_50px_-10px_rgba(147,51,234,0.25)]"
          >
            {/* Subtle top-left gradient accent */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between mb-auto">
              <span className="text-xs font-mono text-white/25 tracking-widest">{p01.number}</span>
              <span className="text-xs font-medium text-white/35 uppercase tracking-wider">{p01.year}</span>
            </div>

            <div className="relative mt-8 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{p01.industry}</p>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tighter text-white leading-none">{p01.name}</h3>
              <p className="text-sm sm:text-base text-white/55 leading-relaxed max-w-md">{p01.headline}</p>
            </div>

            <div className="relative mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <div className="flex flex-wrap gap-3">
                {p01.results.slice(0, 2).map((r) => (
                  <span key={r.label} className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/70 whitespace-nowrap">
                    {r.value} {r.label}
                  </span>
                ))}
              </div>
              <span className="text-white/25 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 text-lg">→</span>
            </div>
          </Link>

          {/* 02 + 03 — Stacked small cards (right column) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-1">

            {/* 02 */}
            <Link
              href={`/projects/${p02.id}`}
              className="bento-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 flex flex-col flex-1 min-h-[155px] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.055] hover:shadow-[0_0_40px_-12px_rgba(147,51,234,0.22)]"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-accent/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between mb-auto">
                <span className="text-xs font-mono text-white/25">{p02.number}</span>
              </div>
              <div className="relative mt-5 space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">{p02.industry}</p>
                <h3 className="text-xl sm:text-2xl font-black tracking-tighter text-white leading-tight">{p02.name}</h3>
              </div>
              <div className="relative mt-4 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/65 whitespace-nowrap">
                  {p02.results[0].value} {p02.results[0].label}
                </span>
                <span className="text-white/25 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300">→</span>
              </div>
            </Link>

            {/* 03 */}
            <Link
              href={`/projects/${p03.id}`}
              className="bento-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 flex flex-col flex-1 min-h-[155px] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.055] hover:shadow-[0_0_40px_-12px_rgba(147,51,234,0.22)]"
            >
              <div className="pointer-events-none absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-accent/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between mb-auto">
                <span className="text-xs font-mono text-white/25">{p03.number}</span>
              </div>
              <div className="relative mt-5 space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">{p03.industry}</p>
                <h3 className="text-xl sm:text-2xl font-black tracking-tighter text-white leading-tight">{p03.name}</h3>
              </div>
              <div className="relative mt-4 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/65 whitespace-nowrap">
                  {p03.results[0].value} {p03.results[0].label}
                </span>
                <span className="text-white/25 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300">→</span>
              </div>
            </Link>
          </div>

          {/* 04 — Full-width wide card */}
          <Link
            href={`/projects/${p04.id}`}
            className="bento-card group lg:col-span-3 relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.055] hover:shadow-[0_0_50px_-10px_rgba(147,51,234,0.22)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            <div className="relative flex-shrink-0">
              <p className="text-xs font-mono text-white/25 mb-2">{p04.number}</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-2">{p04.industry}</p>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-white leading-none">{p04.name}</h3>
            </div>

            <div className="relative flex-1 sm:border-l sm:border-white/[0.07] sm:pl-10">
              <p className="text-sm sm:text-base text-white/55 leading-relaxed">{p04.headline}</p>
            </div>

            <div className="relative flex-shrink-0 flex flex-wrap gap-3 sm:flex-col sm:items-end">
              {p04.results.slice(0, 2).map((r) => (
                <span key={r.label} className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/65 whitespace-nowrap">
                  {r.value} {r.label}
                </span>
              ))}
              <span className="hidden sm:inline text-white/25 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 self-end">→</span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  )
}
