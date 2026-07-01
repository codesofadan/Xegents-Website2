"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { projects } from "@/lib/projects-data"

gsap.registerPlugin(ScrollTrigger)

// ── Mechanical tick sound via Web Audio API ───────────────────────────────────
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

// ── Static data ───────────────────────────────────────────────────────────────

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const previewRef   = useRef<HTMLDivElement>(null)
  const rafRef       = useRef<number>(0)
  const target       = useRef({ x: 0, y: 0 })
  const pos          = useRef({ x: 0, y: 0 })
  const [hovered, setHovered] = useState<string | null>(null)

  // Smooth cursor-follow for preview card
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener("mousemove", onMove)
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.11
      pos.current.y += (target.current.y - pos.current.y) * 0.11
      const x = Math.min(pos.current.x + 32, window.innerWidth  - 330)
      const y = Math.max(pos.current.y - 140, 8)
      el.style.transform = `translate(${x}px,${y}px)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current) }
  }, [])

  // GSAP entry animations + scroll ticks
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ph-el",
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: "power3.out", delay: 0.15 }
      )
      gsap.utils.toArray<HTMLElement>(".ticker-row").forEach((row) => {
        // Entry animation — plays once
        gsap.fromTo(row, { opacity: 0, y: 52 }, {
          opacity: 1, y: 0, duration: 0.72, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        })
        // Tick sound — fires every scroll pass, both directions
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

  const activeProj = projects.find(p => p.id === hovered)

  return (
    <div ref={containerRef} className="min-h-screen bg-black/30">

      {/* ── Floating image preview (follows cursor, desktop only) ── */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 z-50 pointer-events-none will-change-transform hidden sm:block"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.18s ease" }}
      >
        {activeProj && (
          <div
            className="w-72 rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.7)]"
            style={{ border: `1.5px solid ${activeProj.accent}45`, background: "rgba(8,8,12,0.92)", backdropFilter: "blur(14px)" }}
          >
            <img
              src={activeProj.image}
              alt={activeProj.industry}
              className="w-full h-44 object-cover"
            />
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: activeProj.accent }}>
                {activeProj.client}
              </p>
              <p className="text-sm font-bold text-white leading-snug">{activeProj.headline.split("—")[0].trim()}</p>
              <p className="text-xs mt-1.5 font-semibold" style={{ color: activeProj.accent }}>
                {activeProj.results[0].value} {activeProj.results[0].label} →
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════
          SECTION 1 — PAGE HEADER
          ════════════════════════════════════════════ */}
      <section className="pt-32 pb-14 px-6 sm:px-10 max-w-screen-xl mx-auto text-center">
        <p className="ph-el text-[10px] font-medium text-accent uppercase tracking-[0.22em] mb-5">
          Case Studies
        </p>
        <h1 className="ph-el text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.88] text-white">
          Our <span className="gradient-text">Work.</span>
        </h1>
        <p className="ph-el mt-8 text-base text-white/40 max-w-sm mx-auto leading-relaxed">
          Real clients. Real transformations. Hover a name to preview — click to read the full story.
        </p>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — PROJECT TICKER
          ════════════════════════════════════════════ */}
      <section className="border-t border-white/8 max-w-screen-xl mx-auto px-6 sm:px-10">
        {projects.map((p) => {
          const on = hovered === p.id
          return (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="ticker-row block border-b border-white/8 relative overflow-hidden"
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Sweep bg */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: on ? 1 : 0, background: `linear-gradient(105deg, ${p.accent}12 0%, transparent 55%)` }}
              />

              <div className="relative flex items-center gap-4 sm:gap-8 lg:gap-12 py-8 sm:py-11">

                {/* Row number */}
                <span
                  className="font-mono text-xs flex-shrink-0 w-7 transition-colors duration-300"
                  style={{ color: on ? p.accent : "rgba(255,255,255,0.16)" }}
                >
                  {p.number}
                </span>

                {/* Tick mark line */}
                <div
                  className="hidden sm:block h-px flex-shrink-0 transition-all duration-500"
                  style={{
                    width: on ? "52px" : "36px",
                    background: on ? p.accent : "rgba(255,255,255,0.10)",
                  }}
                />

                {/* ★ Giant industry name */}
                <h2
                  className="text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] font-black tracking-tighter leading-none flex-1 min-w-0"
                  style={{
                    color:            on ? "transparent"  : "white",
                    WebkitTextStroke: on ? `1.5px ${p.accent}` : "0px white",
                    transform:        on ? "translateX(10px)" : "translateX(0px)",
                    transition: "color 0.32s ease, -webkit-text-stroke 0.32s ease, transform 0.42s cubic-bezier(0.23,1,0.32,1)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.industry}
                </h2>

                {/* Client + year — right side */}
                <div
                  className="hidden lg:block text-right flex-shrink-0 transition-all duration-300"
                  style={{ opacity: on ? 0.9 : 0.25 }}
                >
                  <p className="text-sm text-white font-medium">{p.client}</p>
                  <p className="text-xs text-white/35 mt-0.5">{p.year}</p>
                </div>

                {/* Result pill — slides in on hover */}
                <div
                  className="hidden sm:block flex-shrink-0 transition-all duration-400"
                  style={{
                    opacity:   on ? 1 : 0,
                    transform: on ? "translateX(0)" : "translateX(18px)",
                    transition: "opacity 0.28s, transform 0.42s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <span
                    className="text-xs font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap"
                    style={{ color: p.accent, background: `${p.accent}14`, border: `1px solid ${p.accent}30` }}
                  >
                    {p.results[0].value} {p.results[0].label}
                  </span>
                </div>

                {/* Arrow */}
                <span
                  className="flex-shrink-0 text-base transition-all duration-300"
                  style={{
                    color:     on ? p.accent : "rgba(255,255,255,0.18)",
                    transform: on ? "translate(5px,0)" : "translate(0,0)",
                  }}
                >
                  →
                </span>
              </div>
            </Link>
          )
        })}
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — CTA
          ════════════════════════════════════════════ */}
      <section className="mt-28 pb-28 px-6 sm:px-10 max-w-screen-xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/22 mb-4">Ready to be next?</p>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-4 leading-[0.92]">
          Let's build your<br /><span className="gradient-text">case study.</span>
        </h2>
        <p className="text-white/40 text-sm mb-10 max-w-xs mx-auto leading-relaxed">
          Book a free 30-minute AI audit. No pitch, no fluff — just your highest-ROI move.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-colors"
        >
          Book a Discovery Call →
        </Link>
      </section>

    </div>
  )
}
