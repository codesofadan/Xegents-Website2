"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/* ──────────────────────────────────────────────────────────────────────────
   VIDEO SHOWCASE — 3D circular drag carousel (Xegents brand)

   • 6 portrait-mode video cards sit on a smooth CSS 3D cylinder.
   • Infinite loop in both directions via wrapping modular arithmetic.
   • Clicking a side card snaps it to centre; clicking the centre card plays/pauses.
   • Auto-advance: when the centred video ends it plays the next one.
   • Drag uses rAF so no React re-render happens per frame.

   CARD GEOMETRY NOTES
   -------------------
   "Wavy/irregular" cylinders come from two sources:
     a) Large border-radius on each card — creates a scalloped silhouette.
        Fix: use rounded-sm (2px) or none on the cards.
     b) Perspective too tight — exaggerates distortion on side cards.
        Fix: increase perspective to 2200px.
   Both are applied here.
────────────────────────────────────────────────────────────────────────── */

type VideoItem = { src: string; title: string; caption?: string }

const VIDEOS: VideoItem[] = [
  { src: "/videos/demo-1.mp4", title: "SEO Audit OS",    caption: "Local search domination"    },
  { src: "/videos/demo-2.mp4", title: "LeadGen System",  caption: "B2B pipeline automation"    },
  { src: "/videos/demo-3.mp4", title: "Blog OS",         caption: "10-agent editorial pipeline" },
  { src: "/videos/demo-4.mp4", title: "Copywriting OS",  caption: "AI-powered copy at scale"   },
  { src: "/videos/demo-5.mp4", title: "System Demo",     caption: "Behind the build"           },
  { src: "/videos/demo-6.mp4", title: "Client Results",  caption: "Real outcomes, on camera"   },
]

const CARD_ASPECT  = "9 / 16"
const AUTO_ADVANCE = true
const TRANSITION   = "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease"

type Dims = { theta: number; radius: number; step: number; cardH: number; reduced: boolean }

function computeDims(w: number, reduced: boolean): Dims {
  // theta: degrees between adjacent cards on the circle
  // radius: cylinder radius in px — bigger → more spread out
  // step: how many px of drag = 1 card step
  // cardH: card height in px
  if (w < 640)  return { theta: 38, radius: 210, step: 140, cardH: Math.min(w * 1.1, 360), reduced }
  if (w < 1024) return { theta: 40, radius: 360, step: 230, cardH: 420, reduced }
  return                { theta: 38, radius: 480, step: 300, cardH: 480, reduced }
}

const mod      = (n: number, m: number) => ((n % m) + m) % m
const wrapRel  = (raw: number, N: number) => raw - N * Math.round(raw / N)

function cardLayout(rel: number, dims: Dims) {
  const absRel = Math.abs(rel)
  let translateX: number, translateZ: number, rotateY: number, scale: number, opacity: number

  if (dims.reduced) {
    translateX = rel * (dims.radius * 0.7)
    translateZ = 0; rotateY = 0
    scale   = Math.max(1 - absRel * 0.12, 0.6)
    opacity = Math.max(1 - absRel * 0.4, 0)
  } else {
    const a   = rel * dims.theta
    const rad = (a * Math.PI) / 180
    translateX = Math.sin(rad) * dims.radius
    translateZ = Math.cos(rad) * dims.radius - dims.radius
    rotateY   = a
    scale     = 1
    // Fade out quickly beyond 2 steps so only ~5 cards are ever visible.
    // Cards beyond 90° (behind the cylinder) get opacity 0.
    opacity = Math.abs(a) >= 90 ? 0 : Math.max(1 - absRel * 0.22, 0.12)
  }

  return {
    transform:     `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex:        1000 + Math.round(translateZ),
    pointerEvents: (opacity < 0.12 ? "none" : "auto") as "none" | "auto",
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
    <svg className="w-7 h-7 translate-x-[2px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function VideoShowcase() {
  const N = VIDEOS.length
  // Start with card 0 in the centre
  const [active,  setActive]  = useState(0)
  const [playing, setPlaying] = useState<number | null>(null)
  const [dims,    setDims]    = useState<Dims>(() => computeDims(1280, false))

  const activeRef  = useRef(active);  activeRef.current  = active
  const dimsRef    = useRef(dims);    dimsRef.current    = dims
  const playingRef = useRef(playing); playingRef.current = playing

  const startX  = useRef(0)
  const dragDX  = useRef(0)
  const dragging = useRef(false)
  const didDrag  = useRef(false)
  const rafId   = useRef(0)
  const chain   = useRef(false)
  const cardRefs  = useRef<(HTMLElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const activeIndex = mod(active, N)

  // Responsive + reduced-motion — guard against height-only resize events
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let lastW = -1; let lastR = mq.matches
    const apply = () => {
      const w = window.innerWidth
      if (w === lastW && mq.matches === lastR) return
      lastW = w; lastR = mq.matches
      setDims(computeDims(w, mq.matches))
    }
    apply()
    window.addEventListener("resize", apply)
    mq.addEventListener?.("change", apply)
    return () => { window.removeEventListener("resize", apply); mq.removeEventListener?.("change", apply) }
  }, [])

  // Pause a video that drifts off-centre (unless auto-loop is driving it)
  useEffect(() => {
    if (playing !== null && playing !== activeIndex && !chain.current) {
      videoRefs.current[playing]?.pause()
      setPlaying(null)
    }
  }, [activeIndex, playing])

  // Auto-advance: play new centre card when chain is active
  useEffect(() => {
    if (!chain.current) return
    const el = videoRefs.current[activeIndex]
    if (!el) return
    el.currentTime = 0
    el.play().then(() => setPlaying(activeIndex)).catch(() => { chain.current = false; setPlaying(null) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Imperatively write transforms — no React re-render per drag frame
  const paint = useCallback((off: number) => {
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i]
      if (!el) continue
      const s = cardLayout(wrapRel(i - off, N), dimsRef.current)
      el.style.transform     = s.transform
      el.style.opacity       = String(s.opacity)
      el.style.zIndex        = String(s.zIndex)
      el.style.pointerEvents = s.pointerEvents
    }
  }, [N])

  const stopPlayback = useCallback(() => {
    if (playingRef.current !== null) videoRefs.current[playingRef.current]?.pause()
    chain.current = false
    setPlaying(null)
  }, [])

  const step    = useCallback((delta: number) => { stopPlayback(); setActive(a => a + delta) }, [stopPlayback])
  const goToIndex = useCallback((j: number) => {
    stopPlayback()
    setActive(a => a + wrapRel(j - mod(a, N), N))
  }, [N, stopPlayback])

  const toggleVideo = (i: number) => {
    const el = videoRefs.current[i]
    if (!el) return
    if (el.paused) {
      el.play().then(() => { setPlaying(i); chain.current = AUTO_ADVANCE }).catch(console.error)
    } else {
      el.pause(); chain.current = false; setPlaying(null)
    }
  }

  const onVideoEnded = () => {
    setPlaying(null)
    if (chain.current) setActive(a => a + 1)
  }

  // ── Pointer drag ──────────────────────────────────────────────────────────
  // IMPORTANT: do NOT setPointerCapture on pointerdown. Capturing on the stage
  // retargets the subsequent `click` event to the stage element, so the card's
  // onClick (the play button) never fires. We only capture once an actual drag
  // has started (>8px movement) — at that point the click is suppressed anyway.
  const onPointerDown = (e: React.PointerEvent) => {
    if (playingRef.current !== null) return
    dragging.current = true; didDrag.current = false; dragDX.current = 0
    startX.current = e.clientX
    for (const el of cardRefs.current) if (el) { el.style.transition = "none"; el.style.willChange = "transform" }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - startX.current
    if (!didDrag.current && Math.abs(dx) > 8) {
      didDrag.current = true
      ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    }
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
    if (steps !== 0) setActive(a => a - steps)
    else paint(activeRef.current)
  }

  const onCardClick = (i: number) => {
    if (didDrag.current) return
    if (i === activeIndex) toggleVideo(i)
    else goToIndex(i)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); step(-1) }
    if (e.key === "ArrowRight") { e.preventDefault(); step(1)  }
  }

  const stageH = Math.round(dims.cardH * 1.18)
  // Card width from the aspect ratio
  const cardW  = Math.round(dims.cardH * (9 / 16))

  return (
    <section
      id="video-showcase"
      className="relative overflow-hidden pt-8 sm:pt-10 pb-20 sm:pb-28 border-t border-border"
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

      {/* Stage — full width so side cards have room */}
      <div
        className="relative w-full select-none touch-pan-y"
        style={{ perspective: "2200px", height: stageH, cursor: "default" }}
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
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {VIDEOS.map((v, i) => {
            const base      = cardLayout(wrapRel(i - active, N), dims)
            const isCenter  = i === activeIndex
            const isPlaying = playing === i

            return (
              <article
                key={v.src}
                ref={el => { cardRefs.current[i] = el }}
                onClick={() => onCardClick(i)}
                aria-label={v.title}
                style={{
                  position:         "absolute",
                  height:           dims.cardH,
                  width:            cardW,
                  // ↓ rounded-sm (4px) — small enough that the scalloped
                  //   silhouette disappears; sharp enough to look intentional.
                  borderRadius:     "6px",
                  overflow:         "hidden",
                  transform:        base.transform,
                  opacity:          base.opacity,
                  zIndex:           base.zIndex,
                  pointerEvents:    base.pointerEvents,
                  transition:       TRANSITION,
                  backfaceVisibility: "hidden",
                  // Centre card gets a purple ambient glow; side cards a dark shadow
                  boxShadow: isCenter
                    ? "0 28px 60px -24px oklch(0.60 0.22 292 / 0.60), 0 8px 24px -12px rgba(0,0,0,0.8)"
                    : "0 16px 40px -24px rgba(0,0,0,0.85)",
                }}
              >
                {/* Brand gradient fallback while video loads */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(160deg, oklch(0.20 0.10 292 / 0.60), oklch(0.085 0.008 265))" }}
                />

                <video
                  ref={el => { videoRefs.current[i] = el }}
                  src={v.src}
                  playsInline
                  preload={Math.abs(wrapRel(i - active, N)) <= 1 ? "metadata" : "none"}
                  controls={isPlaying}
                  onEnded={onVideoEnded}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />

                {/* Play overlay — hidden while playing */}
                {!isPlaying && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                    {/* Play button — only on centre card */}
                    {isCenter && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 text-white shadow-[0_0_32px_-4px_rgba(147,51,234,0.7)] transition-transform duration-200 hover:scale-105 active:scale-95">
                          <PlayIcon />
                        </span>
                      </div>
                    )}

                    {/* Side card: dimmer play hint */}
                    {!isCenter && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white/70">
                          <svg className="w-4 h-4 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </span>
                      </div>
                    )}

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm font-semibold text-white leading-tight">{v.title}</p>
                      {v.caption && (
                        <p className="text-xs text-white/55 leading-tight mt-0.5">{v.caption}</p>
                      )}
                    </div>
                  </>
                )}
              </article>
            )
          })}
        </div>

        {/* Left/right edge fades */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[10%] z-[1200]"
             style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[10%] z-[1200]"
             style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button type="button" onClick={() => step(-1)} aria-label="Previous video"
          className="grid place-items-center w-11 h-11 rounded-full border border-border text-accent hover:bg-accent/8 transition-colors">
          <ChevronIcon dir="left" />
        </button>
        <span className="text-xs uppercase tracking-widest text-foreground/40 select-none">Drag to scroll</span>
        <button type="button" onClick={() => step(1)} aria-label="Next video"
          className="grid place-items-center w-11 h-11 rounded-full border border-border text-accent hover:bg-accent/8 transition-colors">
          <ChevronIcon dir="right" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToIndex(i)}
            aria-label={`Go to video ${i + 1}`}
            aria-current={i === activeIndex}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
