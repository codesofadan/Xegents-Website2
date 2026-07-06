"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"
import { projects } from "@/lib/projects-data"

gsap.registerPlugin(ScrollTrigger)

function playTick() {
  try {
    const Ctx = window.AudioContext ?? (window as any).webkitAudioContext
    const ctx = new Ctx() as AudioContext
    const len = Math.floor(ctx.sampleRate * 0.022)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const d   = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * ((1 - i / len) ** 2.5) * 0.32
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(ctx.destination)
    src.start()
    setTimeout(() => ctx.close(), 300)
  } catch (_) {}
}

export function ProjectsPageClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ph-el",
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: "power3.out", delay: 0.15 }
      )
      gsap.utils.toArray<HTMLElement>(".ticker-row").forEach((row) => {
        gsap.fromTo(row, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        })
        ScrollTrigger.create({
          trigger: row,
          start: "top 80%",
          onEnter:     playTick,
          onEnterBack: playTick,
        })
      })
    }, containerRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen">

      {/* ── Header ── */}
      <section className="pt-32 pb-14 px-6 sm:px-10 max-w-screen-xl mx-auto text-center">
        <p className="ph-el text-[10px] font-medium text-accent uppercase tracking-[0.22em] mb-5">
          Case Studies
        </p>
        <h1 className="ph-el text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.88] text-white">
          Our <span className="gradient-text">Work.</span>
        </h1>
        <p className="ph-el mt-8 text-base text-white/40 max-w-sm mx-auto leading-relaxed">
          Real systems. Real results. Click any project to read the full story.
        </p>
      </section>

      {/* ── Project ticker ── */}
      <section className="border-t border-white/8 max-w-screen-xl mx-auto px-6 sm:px-10">
        {projects.map((p) => {
          const on = hovered === p.id
          return (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="ticker-row block border-b border-white/8 relative overflow-hidden group"
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover bg sweep — single accent, no per-project colour */}
              <div
                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                style={{ opacity: on ? 1 : 0, background: "linear-gradient(105deg, rgba(147,51,234,0.07) 0%, transparent 55%)" }}
              />

              <div className="relative flex items-center gap-5 sm:gap-8 lg:gap-10 py-6 sm:py-8">

                {/* Row number */}
                <span className="font-mono text-xs flex-shrink-0 w-6 text-white/20 group-hover:text-white/50 transition-colors duration-300">
                  {p.number}
                </span>

                {/* Project image thumbnail */}
                <div
                  className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-white/10 transition-all duration-500"
                  style={{ opacity: on ? 1 : 0.45 }}
                >
                  <Image
                    src={p.image}
                    alt={p.industry}
                    fill
                    sizes="64px"
                    className="object-cover"
                    draggable={false}
                  />
                </div>

                {/* Industry name — outline on hover, single accent colour */}
                <h2
                  className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none flex-1 min-w-0 transition-all duration-300"
                  style={{
                    color:            on ? "transparent" : "white",
                    WebkitTextStroke: on ? "1.5px rgb(147,51,234)" : "0px white",
                    transform:        on ? "translateX(6px)" : "translateX(0px)",
                    transition: "color 0.28s ease, -webkit-text-stroke 0.28s ease, transform 0.38s cubic-bezier(0.23,1,0.32,1)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.industry}
                </h2>

                {/* Client + year */}
                <div
                  className="hidden lg:block text-right flex-shrink-0 transition-opacity duration-300"
                  style={{ opacity: on ? 0.85 : 0.22 }}
                >
                  <p className="text-sm text-white font-medium">{p.client}</p>
                  <p className="text-xs text-white/35 mt-0.5">{p.year}</p>
                </div>

                {/* Result pill */}
                <div
                  className="hidden sm:block flex-shrink-0"
                  style={{
                    opacity:   on ? 1 : 0,
                    transform: on ? "translateX(0)" : "translateX(14px)",
                    transition: "opacity 0.24s, transform 0.38s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap text-accent bg-accent/10 border border-accent/25">
                    {p.results[0].value} {p.results[0].label}
                  </span>
                </div>

                {/* Arrow */}
                <span
                  className="flex-shrink-0 text-sm transition-all duration-300 text-white/20 group-hover:text-accent group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          )
        })}
      </section>

      {/* ── CTA ── */}
      <section className="mt-28 pb-28 px-6 sm:px-10 max-w-screen-xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/25 mb-4">Ready to be next?</p>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-4 leading-[0.92]">
          Let's build your<br /><span className="gradient-text">case study.</span>
        </h2>
        <p className="text-white/40 text-sm mb-10 max-w-xs mx-auto leading-relaxed">
          Book a free 30-minute AI audit. No pitch, no fluff — just your highest-ROI move.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent/85 transition-colors"
        >
          Book a Discovery Call →
        </Link>
      </section>

    </div>
  )
}
