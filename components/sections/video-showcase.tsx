"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/* ──────────────────────────────────────────────────────────────────────────
   VIDEO SHOWCASE — 3D circular drag carousel (Xegents brand)

   • Cards sit on a CIRCLE (ring) — front card upright, sides curve back.
   • INFINITE loop: after card 6 comes card 1 again (both directions).
   • When the centred video ENDS, it auto-advances to the next and plays it;
     after the 6th it loops back to the 1st. (Set AUTO_ADVANCE = false to stop.)
   • Drag is applied straight to the DOM via requestAnimationFrame — no React
     re-render per frame — so it stays smooth even with 6 videos mounted.

   HOW TO ADD YOUR 6 VIDEOS
   ------------------------
   Drop your files in  /public/videos/  named exactly:
       video-1.mp4 … video-6.mp4      (the clips)
       poster-1.jpg … poster-6.jpg    (thumbnail shown before Play)
   Then edit the `title` / `caption` strings below. Nothing else to wire up.

   Card orientation is PORTRAIT by default. Landscape → CARD_ASPECT = "16 / 9".
────────────────────────────────────────────────────────────────────────── */

type VideoItem = { src: string; poster: string; title: string; caption?: string }

const VIDEOS: VideoItem[] = [
  { src: "/videos/video-1.mp4", poster: "/videos/poster-1.jpg", title: "Video One",   caption: "Client result" },
  { src: "/videos/video-2.mp4", poster: "/videos/poster-2.jpg", title: "Video Two",   caption: "Client result" },
  { src: "/videos/video-3.mp4", poster: "/videos/poster-3.jpg", title: "Video Three", caption: "Client result" },
  { src: "/videos/video-4.mp4", poster: "/videos/poster-4.jpg", title: "Video Four",  caption: "Client result" },
  { src: "/videos/video-5.mp4", poster: "/videos/poster-5.jpg", title: "Video Five",  caption: "Client result" },
  { src: "/videos/video-6.mp4", poster: "/videos/poster-6.jpg", title: "Video Six",   caption: "Client result" },
]

const CARD_ASPECT = "9 / 16"   // portrait. Landscape → "16 / 9"
const AUTO_ADVANCE = true      // auto-play next when a video ends, looping 6 → 1
const TRANSITION = "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease"

type Dims = { theta: number; radius: number; step: number; cardH: number; reduced: boolean }
function computeDims(w: number, reduced: boolean): Dims {
  if (w < 640)  return { theta: 36, radius: 230, step: 150, cardH: Math.min(w * 1.15, 380), reduced }
  if (w < 1024) return { theta: 40, radius: 380, step: 250, cardH: 440, reduced }
  return { theta: 42, radius: 520, step: 320, cardH: 500, reduced }
}

const mod = (n: number, m: number) => ((n % m) + m) % m
const wrapRel = (raw: number, N: number) => raw - N * Math.round(raw / N)

/* Per-card layout for a given circular offset. Pure math — used by both the
   React render (baseline) and the imperative drag loop. */
function cardLayout(rel: number, dims: Dims) {
  const absRel = Math.abs(rel)
  let translateX: number, translateZ: number, rotateY: number, scale: number, opacity: number
  if (dims.reduced) {
    translateX = rel * (dims.radius * 0.7); translateZ = 0; rotateY = 0
    scale = Math.max(1 - absRel * 0.12, 0.6); opacity = Math.max(1 - absRel * 0.4, 0)
  } else {
    const a = rel * dims.theta
    const rad = (a * Math.PI) / 180
    translateX = Math.sin(rad) * dims.radius
    translateZ = Math.cos(rad) * dims.radius - dims.radius
    rotateY = a; scale = 1
    opacity = Math.abs(a) >= 90 ? 0 : Math.max(1 - absRel * 0.18, 0.15)
  }
  return {
    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: 1000 + Math.round(translateZ),
    pointerEvents: (opacity < 0.15 ? "none" : "auto") as "none" | "auto",
  }
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function VideoShowcase() {
  const N = VIDEOS.length
  const [active, setActive] = useState(Math.floor((N - 1) / 2))
  const [playing, setPlaying] = useState<number | null>(null)
  const [dims, setDims] = useState<Dims>(() => computeDims(1280, false))

  // Refs kept current every render so event handlers never read stale values.
  const activeRef = useRef(active); activeRef.current = active
  const dimsRef = useRef(dims); dimsRef.current = dims
  const playingRef = useRef(playing); playingRef.current = playing

  const startX = useRef(0)
  const dragDX = useRef(0)
  const dragging = useRef(false)
  const didDrag = useRef(false)
  const rafId = useRef(0)
  const chain = useRef(false)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const activeIndex = mod(active, N)

  // Responsive geometry + reduced-motion.
  // Guard against WIDTH-unchanged resize events: mobile scroll shows/hides the
  // URL bar, firing `resize` with only a height delta. Without this guard every
  // such event calls setDims → a full carousel re-render mid-scroll → stutter.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let lastW = -1
    let lastReduced = mq.matches
    const apply = () => {
      const w = window.innerWidth
      if (w === lastW && mq.matches === lastReduced) return
      lastW = w
      lastReduced = mq.matches
      setDims(computeDims(w, mq.matches))
    }
    apply()
    window.addEventListener("resize", apply)
    mq.addEventListener?.("change", apply)
    return () => {
      window.removeEventListener("resize", apply)
      mq.removeEventListener?.("change", apply)
    }
  }, [])

  // Pause a video that ends up off-centre (unless the auto-loop is driving it).
  useEffect(() => {
    if (playing !== null && playing !== activeIndex && !chain.current) {
      videoRefs.current[playing]?.pause()
      setPlaying(null)
    }
  }, [activeIndex, playing])

  // Auto-advance loop: when the centre changes while chaining, play the new centre.
  useEffect(() => {
    if (!chain.current) return
    const el = videoRefs.current[activeIndex]
    if (!el) return
    el.currentTime = 0
    el.play().then(() => setPlaying(activeIndex)).catch(() => { chain.current = false; setPlaying(null) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Write transforms straight to the DOM for a given offset (no React render).
  const paint = useCallback((off: number) => {
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i]
      if (!el) continue
      const s = cardLayout(wrapRel(i - off, N), dimsRef.current)
      el.style.transform = s.transform
      el.style.opacity = String(s.opacity)
      el.style.zIndex = String(s.zIndex)
      el.style.pointerEvents = s.pointerEvents
    }
  }, [N])

  const stopPlayback = useCallback(() => {
    if (playingRef.current !== null) videoRefs.current[playingRef.current]?.pause()
    chain.current = false
    setPlaying(null)
  }, [])

  const step = useCallback((delta: number) => { stopPlayback(); setActive((a) => a + delta) }, [stopPlayback])
  const goToIndex = useCallback((j: number) => {
    stopPlayback()
    setActive((a) => a + wrapRel(j - mod(a, N), N))
  }, [N, stopPlayback])

  const toggleVideo = (i: number) => {
    const el = videoRefs.current[i]
    if (!el) return
    if (el.paused) {
      el.play().then(() => { setPlaying(i); chain.current = AUTO_ADVANCE }).catch(() => {})
    } else {
      el.pause(); chain.current = false; setPlaying(null)
    }
  }

  const onVideoEnded = () => {
    setPlaying(null)
    if (chain.current) setActive((a) => a + 1)
  }

  // ── Pointer drag (imperative, rAF-batched) ────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    if (playingRef.current !== null) return // let native controls work while playing
    dragging.current = true
    didDrag.current = false
    dragDX.current = 0
    startX.current = e.clientX
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    for (const el of cardRefs.current) if (el) { el.style.transition = "none"; el.style.willChange = "transform" }
    ;(e.currentTarget as HTMLElement).style.cursor = "default"
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 8) didDrag.current = true
    dragDX.current = dx
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0
        paint(activeRef.current - dragDX.current / dimsRef.current.step)
      })
    }
  }
  const endDrag = (e: React.PointerEvent) => {
    if (!dragging.current) return
    dragging.current = false
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = 0 }
    const steps = Math.round(dragDX.current / dimsRef.current.step)
    dragDX.current = 0
    for (const el of cardRefs.current) if (el) { el.style.transition = TRANSITION; el.style.willChange = "auto" }
    ;(e.currentTarget as HTMLElement).style.cursor = "default"
    if (steps !== 0) setActive((a) => a - steps)
    else paint(activeRef.current) // animate back to exact centre after a tiny drag
  }

  const onCardClick = (i: number) => {
    if (didDrag.current) return
    if (i === activeIndex) toggleVideo(i)
    else goToIndex(i)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1) }
    if (e.key === "ArrowRight") { e.preventDefault(); step(1) }
  }

  const stageHeight = Math.round(dims.cardH * 1.16)

  return (
    <section
      id="video-showcase"
      className="relative overflow-hidden pt-8 sm:pt-10 pb-20 sm:pb-28 border-t border-border"
      /* Own compositing layer: keeps the fixed body-gradient from forcing this
         3D section to repaint on every scroll frame. */
      style={{ transform: "translateZ(0)", isolation: "isolate" }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 space-y-4">
          <p className="text-xs font-medium text-accent uppercase tracking-widest">See it in action</p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Real results, <span className="gradient-text">on camera.</span>
          </h2>
          <p className="text-sm sm:text-lg text-foreground/60 max-w-2xl mx-auto">
            Drag through the AI systems we&apos;ve shipped — see the work, not just the words.
          </p>
        </div>
      </div>

      {/* Stage */}
      <div
        className="relative mx-auto select-none touch-pan-y"
        style={{ perspective: "1600px", height: stageHeight, cursor: "default" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Video showcase — drag or use arrow keys"
        data-lenis-prevent
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
          {VIDEOS.map((v, i) => {
            const base = cardLayout(wrapRel(i - active, N), dims)
            const isCenter = i === activeIndex
            return (
              <article
                key={v.src}
                ref={(el) => { cardRefs.current[i] = el }}
                onClick={() => onCardClick(i)}
                className="absolute overflow-hidden rounded-2xl border border-border bg-card"
                style={{
                  height: dims.cardH,
                  aspectRatio: CARD_ASPECT,
                  transform: base.transform,
                  opacity: base.opacity,
                  zIndex: base.zIndex,
                  pointerEvents: base.pointerEvents,
                  transition: TRANSITION,
                  boxShadow: isCenter
                    ? "0 30px 70px -30px oklch(0.60 0.22 292 / 0.55), 0 12px 30px -16px rgba(0,0,0,0.7)"
                    : "0 20px 45px -28px rgba(0,0,0,0.8)",
                  backfaceVisibility: "hidden",
                }}
                aria-label={v.title}
              >
                {/* brand gradient so empty posters still look intentional */}
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(120% 80% at 50% 0%, oklch(0.22 0.10 292 / 0.55), oklch(0.085 0.008 265) 70%)" }}
                />

                <video
                  ref={(el) => { videoRefs.current[i] = el }}
                  src={v.src}
                  poster={v.poster}
                  playsInline
                  preload={Math.abs(wrapRel(i - active, N)) <= 1 ? "metadata" : "none"}
                  controls={playing === i}
                  onEnded={onVideoEnded}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />

                {/* Play affordance + caption — hidden once that video is playing */}
                {playing !== i && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`flex items-center justify-center rounded-full text-white transition-transform ${
                          isCenter ? "w-16 h-16 bg-accent/90 shadow-lg" : "w-12 h-12 bg-white/20"
                        }`}
                      >
                        <PlayIcon />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm font-semibold text-white leading-tight">{v.title}</p>
                      {v.caption && <p className="text-xs text-white/60 leading-tight mt-0.5">{v.caption}</p>}
                    </div>
                  </>
                )}
              </article>
            )
          })}
        </div>

        {/* Cheap edge fades (replace the expensive mask-image) */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[8%] z-[1200]"
             style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[8%] z-[1200]"
             style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
      </div>

      {/* Controls: chevrons + "Drag to scroll" (infinite — never disabled) */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous video"
          className="grid place-items-center w-11 h-11 rounded-full border border-border text-accent"
        >
          <ChevronIcon dir="left" />
        </button>
        <span className="text-xs uppercase tracking-widest text-foreground/50 select-none">Drag to scroll</span>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next video"
          className="grid place-items-center w-11 h-11 rounded-full border border-border text-accent"
        >
          <ChevronIcon dir="right" />
        </button>
      </div>

      {/* Position dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToIndex(i)}
            aria-label={`Go to video ${i + 1}`}
            aria-current={i === activeIndex}
            className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-foreground/25"}`}
          />
        ))}
      </div>
    </section>
  )
}
