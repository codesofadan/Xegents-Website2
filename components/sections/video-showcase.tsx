"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"

/* useLayoutEffect warns when it runs on the server, where it is a no-op
   anyway. Everything it guards here is a browser measurement. */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

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

/* THE LOOP NEEDS SOMEWHERE INVISIBLE TO GO AROUND THE BACK.

   Six cards filling seven visible slots left nowhere, so every step forced one
   card to leap from rel −3 to rel +2 — five positions across the whole stage,
   which CSS then animated as a slide. That was the card seen "cutting".

   Rendering the set twice gives the arc twelve slots. The wrap now lands at
   ±6, well past the fade and fully transparent, so no card ever jumps while
   it can be seen. Only the focused slot ever plays, so the duplicate video
   elements cost a metadata fetch and nothing more. */
const SLOTS = [...VIDEOS, ...VIDEOS]

/* SUPERSAMPLING — why the cards looked soft.

   A 3D transform plus backface-visibility promotes every card to its own
   composited layer, and that layer is rasterised ONCE at the element's layout
   size. Perspective then stretches it up to 1.27× on the outer positions, so a
   270px-wide bitmap gets blown up to 343px on screen. The source clips are
   1080×1920 — four times what we display — so none of that blur came from the
   files.

   The card is therefore laid out 1.5× larger and scaled back down inside the
   transform. Display size is unchanged; the raster behind it is now 405px wide
   and gets downsampled instead of stretched. Overlay sizes are multiplied by
   the same factor so the counter-scale doesn't shrink the type. */
const SS = 1.5

const TRANSITION      = "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease"
const FLAT_TRANSITION = "transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.42s ease"

/** Where the arc gives way to the flat 2-up rail. In rem so it agrees with
 *  Tailwind's lg: (64rem) even if the root font size is not 16px. */
const FLAT_Q = "(max-width: 63.99rem)"

/** How long a STEPPING carousel (flat layout, reduced motion) sits on a
 *  video before auto-advancing (ms). The arc never steps — it drifts
 *  continuously at ROTATE_DEG_PER_SEC instead. */
const AUTO_ADVANCE_MS = 10000

/** Angular speed of the continuous ring drift — deliberately slight. One
 *  slot is 22°, so one video passes the centre every ~11s and a full circle
 *  takes about three minutes. */
const ROTATE_DEG_PER_SEC = 2
const ROTATE_SLOTS_PER_SEC = ROTATE_DEG_PER_SEC / 22

/* ────────────────────────────────────────────────────────────────────────────
   CONCAVE ARC — the row curves *toward* the viewer.

   A convex cylinder (translateZ negative, rotateY +a) pushes the side cards
   away: they shrink, turn outward, and have to be faded off. That hides most
   of the work.

   Flipping both signs turns the arc inside out. Side cards come forward, so
   perspective makes them LARGER, and they rotate inward so the row reads as a
   wall wrapping around you. Every card stays at full opacity and the outermost
   pair bleeds off the edges of the viewport.

   `turn` damps the rotation independently of the spacing angle: at the outer
   position the card sits ~51° rather than a near-edge-on 78°, so its artwork
   is still readable.
──────────────────────────────────────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────────────────────────
   AND WHY IT IS NOT THE ARC ON A PHONE.

   The arc is sized from a radius. At 375px the mobile branch used radius 380
   against a 186px card, and the geometry simply does not close: the ±1 card's
   projected inner edge lands at x = 55.6 while the centre card's edge is at
   93 — a 37px intrusion — and because zIndex is 1000 + translateZ, the
   intruder is NEARER, so it paints ON TOP of the card it is covering. That is
   the "videos cutting into each other".

   The tablet branch has the same fault, milder: radius 560 against a 225px
   card overlaps by 6.6px. Only radius 780 at 1024+ is genuinely clear, at a
   34.6px gap. So the flat mode below runs to 1024, not 640 — it fixes the
   tablet too.

   FLAT MODE IS TWO CARDS, AND THEY CANNOT OVERLAP. Each is exactly half the
   free width; each is pitched by exactly its own width plus the gap. Two
   half-width boxes a full width apart do not intersect at any viewport size,
   in any orientation, with any stale state. There is no radius to tune.

   Its geometry lives in CSS, not here — see the style block at the foot of the
   file. That is deliberate: it means SS, cardH, cardW, radius, theta and step
   are read ONLY by the arc path, so the wide layout's arithmetic is not merely
   unchanged, it is untouched.
──────────────────────────────────────────────────────────────────────────── */
type Dims = {
  /** "arc" is the wide 3D coverflow; "flat" is the 1-up rail below 1024px. */
  mode: "arc" | "flat"
  theta: number   // degrees between adjacent cards
  radius: number  // circle radius — depth is locked to this
  turn: number    // 1 = card sits tangent to the circle
  step: number    // px of drag per card
  cardH: number
  reduced: boolean
}

/* A TRUE CIRCLE, NOT A FLATTENED ONE.

   Depth used to be about half the radius, which traces an ellipse squashed
   along z — the row reads as a shallow crease rather than a curve. Depth is
   now locked to the radius (x = R·sin a, z = R·(1 − cos a)), so every card
   sits on a real circle. At θ = 22° the outer pair travels 0.59·R toward the
   viewer, double the old 0.29·R.

   RADIUS IS SIZED FROM THE *PROJECTED* POSITION, not the raw one. Perspective
   multiplies x by the same factor it scales the card, so a card at z = 415px
   under a 2200px perspective lands 23% further out than sin(a)·R suggests.
   Sizing off the raw value threw the outer pair clean off a 1600px viewport.

   `turn` is held just under 1: fully tangent cards foreshorten to cos(66°) —
   about a third of their width — which reads as slivers rather than work. */
function computeDims(w: number, reduced: boolean, flat: boolean): Dims {
  // Flat carries the arc numbers untouched so dimsRef.current.step and friends
  // stay well-defined; nothing in the flat path reads them.
  if (flat)
    return { mode: "flat", theta: 22, radius: 380, turn: 0.9, step: 130, cardH: 330, reduced }
  if (w < 1024)
    return { mode: "arc", theta: 22, radius: 560, turn: 0.9, step: 210, cardH: 400, reduced }
  return     { mode: "arc", theta: 22, radius: 780, turn: 0.9, step: 280, cardH: 480, reduced }
}

const mod      = (n: number, m: number) => ((n % m) + m) % m
const wrapRel  = (raw: number, N: number) => raw - N * Math.round(raw / N)

/**
 * @param oldRel where this slot sat on the previous render
 * @param newRel where it sits now
 *
 * Flat mode needs both. Parking every off-screen slot at ±2.5 pitches rather
 * than at its true rel is what keeps a multi-step dot jump to ONE screen of
 * travel instead of a card streaking across five — and knowing which slots
 * were on screen a moment ago is what decides which ones get a transition and
 * which ones may teleport while nobody can see them.
 */
function cardLayout(oldRel: number, newRel: number, dims: Dims) {
  if (dims.mode === "flat") {
    // Clamped, so nothing ever animates further than one screen.
    const park = newRel === 0 ? 0 : newRel < 0 ? -1.5 : 1.5
    const onStage = newRel === 0
    const moving  = onStage || oldRel === 0
    return {
      /* No perspective, no rotation, no scale, no supersample — one axis.
         The park factor is interpolated into the string rather than read from
         a custom property, and that is not cosmetic: with the factor in a
         var() the transform text is identical on every render, so React never
         rewrites the property and Chrome never re-evaluates the substitution.
         The cards silently stop moving while every other signal — park value,
         opacity, visibility — updates correctly. Baking it in means the string
         itself changes, which is what actually drives the transition.
         --vs-cardw and --vs-gap stay as vars: they are constant per breakpoint,
         so they never need to trigger anything. */
      transform:     `translate3d(calc(${park} * (var(--vs-cardw) + var(--vs-gap))), 0, 0)`,
      park,
      opacity:       onStage ? 1 : 0,
      dim:           0,          // a depth scrim is meaningless with no depth
      zIndex:        0,          // constant — overlap is impossible by construction
      pointerEvents: (onStage ? "auto" : "none") as "none" | "auto",
      // Held visible through the exit so the fade can finish; it costs nothing
      // once opacity is 0.
      visibility:    (moving ? "visible" : "hidden") as "hidden" | "visible",
      animates:      moving,
    }
  }

  const rel = newRel
  const absRel = Math.abs(rel)
  let translateX: number, translateZ: number, rotateY: number, scale: number, opacity: number

  // Depth scrim. Everything is at full opacity, so without this the eye has no
  // anchor — six equally-lit cards read as wallpaper. Dimming by distance is
  // what makes the focus obvious and the arc feel lit from the front.
  // Enough separation to establish focus, not so much that the outer cards
  // stop being work you can see. ±1 ≈ 0.19, ±2 ≈ 0.30, ±3 ≈ 0.41.
  const dim = absRel < 0.5 ? 0 : Math.min(0.08 + absRel * 0.11, 0.42)

  if (dims.reduced) {
    translateX = rel * (dims.radius * 0.7)
    translateZ = 0; rotateY = 0
    scale   = Math.max(1 - absRel * 0.12, 0.6)
    opacity = Math.max(1 - absRel * 0.4, 0)
  } else {
    const a   = rel * dims.theta
    const rad = (a * Math.PI) / 180
    translateX = Math.sin(rad) * dims.radius
    translateZ = (1 - Math.cos(rad)) * dims.radius // same radius → a real circle
    rotateY    = -a * dims.turn                    // negative → faces inward
    scale      = 1
    // Full opacity across the visible arc, then a short fade so the slots
    // travelling round the back are gone long before they wrap.
    opacity = absRel <= 3.1 ? 1 : Math.max(0, 1 - (absRel - 3.1) / 0.9)
  }

  return {
    // scale is divided by SS to undo the supersampled layout size. It comes
    // last in the chain, so it never disturbs the translations before it.
    transform:     `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale / SS})`,
    park:          0,
    animates:      true,
    opacity,
    dim:           dims.reduced ? 0 : dim,
    // Nearest wins, which is also what physically overlaps.
    zIndex:        1000 + Math.round(translateZ),
    /* ONLY THE CENTRED CARD TAKES THE POINTER. The side cards used to be
       clickable so you could click one to bring it forward, which is also what
       let the cursor catch on artwork while the row was moving. Navigation is
       the arrows now, so a side card has nothing to respond to and is inert. */
    pointerEvents: (rel === 0 ? "auto" : "none") as "none" | "auto",
    // Five of the twelve slots are round the back at any moment. At opacity 0
    // they still cost a composited layer each; hiding them drops that. Matters
    // on integrated graphics, where twelve supersampled video layers is a lot.
    visibility:    (opacity < 0.02 ? "hidden" : "visible") as "hidden" | "visible",
  }
}

function DoubleChevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? (
        <><polyline points="11 18 5 12 11 6" /><polyline points="19 18 13 12 19 6" /></>
      ) : (
        <><polyline points="13 18 19 12 13 6" /><polyline points="5 18 11 12 5 6" /></>
      )}
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="translate-x-[2px]"
      style={{ width: 28 * SS, height: 28 * SS }}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function VideoShowcase() {
  const N = SLOTS.length // 12 — twice the videos, so the wrap happens out of sight
  // Start with card 0 in the centre
  const [active,  setActive]  = useState(0)
  const [playing, setPlaying] = useState<number | null>(null)
  /* SSR-stable: the server has no viewport, so it renders the wide branch and
     the layout effect below corrects it BEFORE the browser paints. Seeding
     from window here instead would be a hydration mismatch. */
  const [dims,    setDims]    = useState<Dims>(() => computeDims(1280, false, false))
  const flat = dims.mode === "flat"
  /* The arc can run the continuous ring; flat (mobile) and reduced-motion
     layouts step discretely instead. */
  const continuous = dims.mode === "arc" && !dims.reduced

  const sectionRef = useRef<HTMLElement>(null)
  /* Nothing is fetched until the section is approached. This is the eleventh
     of thirteen sections; it was issuing seven metadata requests against a
     27MB video set at page load, for a section nobody had scrolled to. */
  const armed = useInView(sectionRef, { once: true })

  /* Where each slot sat on the previous render, so flat mode knows which cards
     are entering and leaving. Updated after commit, so it never triggers one. */
  const prevActiveRef = useRef(active)
  useEffect(() => { prevActiveRef.current = active })

  /* activeRef, dimsRef and scrimRefs existed only for the per-frame painter,
     which read them outside React's render. Nothing reads outside a render
     any more. */
  const playingRef = useRef(playing); playingRef.current = playing

  const cardRefs  = useRef<(HTMLElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const activeIndex = mod(active, N)

  /* Responsive + reduced-motion — guard against height-only resize events.
     A LAYOUT effect, not a passive one: the initial state is the wide branch,
     and correcting it after paint means a phone briefly renders a 405px-wide
     card in a 375px viewport. Running before paint means nobody sees it.

     FLAT_Q is in rem and not px on purpose. Tailwind's lg: is min-width 64rem,
     so at a bumped root font size a px breakpoint here would open a band where
     neither the flat layout nor the lg: utilities apply. */
  useIsoLayoutEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)")
    const fq = window.matchMedia(FLAT_Q)
    let lastW = -1, lastR = rm.matches, lastF = fq.matches
    const apply = () => {
      const w = window.innerWidth
      if (w === lastW && rm.matches === lastR && fq.matches === lastF) return
      lastW = w; lastR = rm.matches; lastF = fq.matches
      setDims(computeDims(w, rm.matches, fq.matches))
    }
    apply()
    window.addEventListener("resize", apply)
    rm.addEventListener?.("change", apply)
    fq.addEventListener?.("change", apply)
    return () => {
      window.removeEventListener("resize", apply)
      rm.removeEventListener?.("change", apply)
      fq.removeEventListener?.("change", apply)
    }
  }, [])

  // Pause a video that drifts off-centre
  useEffect(() => {
    if (playing !== null && playing !== activeIndex) {
      videoRefs.current[playing]?.pause()
      setPlaying(null)
    }
  }, [activeIndex, playing])

  /* The per-frame painter that used to write transform, opacity, zIndex,
     pointerEvents and visibility across all twelve cards is gone with the drag
     that called it. Every position now comes from a React render, which
     happens once per arrow press rather than once per frame of a gesture. */

  const stopPlayback = useCallback(() => {
    if (playingRef.current !== null) videoRefs.current[playingRef.current]?.pause()
    setPlaying(null)
  }, [])

  const step = useCallback((delta: number) => {
    stopPlayback()
    setActive(a => {
      if (!flat) return a + delta

      const curVideo = mod(a, VIDEOS.length)
      const targetVideo = mod(curVideo + delta, VIDEOS.length)
      let best = 0
      let bestDist = Infinity

      for (let s = targetVideo; s < N; s += VIDEOS.length) {
        const d = wrapRel(s - curVideo, N)
        if (Math.abs(d) < bestDist) {
          bestDist = Math.abs(d)
          best = d
        }
      }

      return a + best
    })
  }, [N, flat, stopPlayback])

  /* ── CONTINUOUS RING + HOVER-PAUSE ─────────────────────────────────────
     On the arc the carousel does not step video by video — every card
     glides along the circumference at one constant, gentle speed, like a
     ball rolling around a circle. A per-frame painter owns the card
     transforms and writes them straight to the DOM, so React never
     re-renders per frame. `pos` is the ring's current slot position (a
     float); `target` is where it is heading: the idle drift advances
     `target` at a fixed rate, hovering freezes it, and a manual nudge jumps
     it by one slot and lets `pos` ease over without stopping. Flat mode and
     reduced-motion fall back to the discrete auto-step timer below. */
  const hoverRef = useRef(false)
  const posRef = useRef(0)
  const targetRef = useRef(0)
  const lastTsRef = useRef<number | null>(null)
  const lastSlotRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const autoTimerRef = useRef<number | null>(null)

  const dimsRef = useRef(dims)
  dimsRef.current = dims
  const continuousRef = useRef(continuous)
  continuousRef.current = continuous

  /* Writes every dynamic style of all twelve cards for one ring position. */
  const paintCards = useCallback((pos: number) => {
    const d = dimsRef.current
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i]
      if (!el) continue
      const base = cardLayout(0, wrapRel(i - pos, N), d)
      el.style.transform = base.transform
      el.style.opacity = String(base.opacity)
      el.style.zIndex = String(base.zIndex)
      el.style.pointerEvents = base.pointerEvents
      el.style.visibility = base.visibility
    }
  }, [N])

  const paintFrame = useCallback((now: number) => {
    rafRef.current = null
    /* Clamped so a long backgrounded tab cannot teleport the ring on return. */
    const dt = lastTsRef.current === null ? 0 : Math.min((now - lastTsRef.current) / 1000, 0.1)
    lastTsRef.current = now

    // Idle drift — the ring turns at a constant speed until the cursor lands
    // on the carousel, which freezes the target (an in-flight glide finishes
    // smoothly, then the painter winds down).
    if (!hoverRef.current) targetRef.current += ROTATE_SLOTS_PER_SEC * dt

    const pos = posRef.current
    const target = targetRef.current
    if (Math.abs(target - pos) > 1e-4) {
      // Exponential settle — smooth for nudges, invisible lag at drift speed.
      posRef.current = pos + (target - pos) * Math.min(1, 0.15 * dt * 60)
    }
    paintCards(posRef.current)

    // Sync React's `active` slot (dots, play/pause, centre glow) only when
    // the ring crosses into the next slot — a few times a minute, not per
    // frame.
    const slot = mod(Math.round(posRef.current), N)
    if (slot !== lastSlotRef.current) {
      lastSlotRef.current = slot
      setActive(slot)
    }

    // Keep painting while drifting, or while easing toward a manual target;
    // stop once a hovered ring has settled.
    const settled = Math.abs(target - posRef.current) <= 1e-4
    if (!settled || !hoverRef.current) rafRef.current = requestAnimationFrame(paintFrame)
  }, [N, paintCards])

  const stopPainter = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const startPainter = useCallback(() => {
    if (rafRef.current !== null) return
    lastTsRef.current = null
    rafRef.current = requestAnimationFrame(paintFrame)
  }, [paintFrame])

  /* Position the ring once before first paint so the continuous mode never
     shows a frame of transform-less cards stacked at the origin, and switch
     motion on/off when the layout or visibility changes. */
  useIsoLayoutEffect(() => {
    if (continuousRef.current) {
      paintCards(posRef.current)
      lastSlotRef.current = mod(Math.round(posRef.current), N)
      if (armed) startPainter()
    } else {
      stopPainter()
    }
  }, [paintCards, continuous, armed, startPainter, stopPainter])

  /* Discrete fallback timer — flat layout and reduced motion only. Each
     auto-step schedules the next one; hovering clears it and leaving
     restarts a fresh countdown. One timer ref, never two. */
  const stopAutoRotate = useCallback(() => {
    if (autoTimerRef.current !== null) {
      window.clearTimeout(autoTimerRef.current)
      autoTimerRef.current = null
    }
  }, [])

  const startAutoRotate = useCallback(() => {
    stopAutoRotate()
    if (hoverRef.current || continuousRef.current) return
    autoTimerRef.current = window.setTimeout(() => {
      autoTimerRef.current = null
      step(1)
      startAutoRotate()
    }, AUTO_ADVANCE_MS)
  }, [step, stopAutoRotate])

  /* The ring drifts once the section is approached; nothing after unmount. */
  useEffect(() => {
    if (!armed) return
    if (continuousRef.current) startPainter()
    else startAutoRotate()
    return () => { stopPainter(); stopAutoRotate() }
  }, [armed, continuous, startPainter, startAutoRotate, stopPainter, stopAutoRotate])

  const onCarouselEnter = () => {
    hoverRef.current = true
    stopAutoRotate()
    // The painter reads the frozen target next frame and winds down.
  }

  const onCarouselLeave = () => {
    hoverRef.current = false
    if (continuousRef.current) startPainter()
    else startAutoRotate()
  }

  /* Manual navigation. On the arc a press nudges the moving ring's target by
     `delta` slots and lets the painter ease to it — the drift never stops
     and nothing snaps. The stepping modes keep their original discrete
     step, and every manual interaction restarts the fallback countdown. */
  const nudge = useCallback((delta: number) => {
    stopPlayback()
    if (continuousRef.current) {
      targetRef.current += delta
      startPainter()
    } else {
      setActive(a => a + delta)
    }
    startAutoRotate()
  }, [stopPlayback, startPainter, startAutoRotate])

  /** Each video now lives in two slots — go to whichever is fewer steps away,
   *  so a dot never sends the ring the long way round. On the arc this moves
   *  the target and lets the drift ease there; elsewhere it steps the React
   *  slot directly. */
  const goToIndex = useCallback((videoIdx: number) => {
    stopPlayback()
    if (continuousRef.current) {
      const cur = mod(Math.round(posRef.current), N)
      let best = 0
      let bestDist = Infinity
      for (let s = videoIdx; s < N; s += VIDEOS.length) {
        const d = wrapRel(s - cur, N)
        if (Math.abs(d) < bestDist) { bestDist = Math.abs(d); best = d }
      }
      targetRef.current = posRef.current + best
      startPainter()
    } else {
      setActive(a => {
        const cur = mod(a, N)
        let best = 0
        let bestDist = Infinity
        for (let s = videoIdx; s < N; s += VIDEOS.length) {
          const d = wrapRel(s - cur, N)
          if (Math.abs(d) < bestDist) { bestDist = Math.abs(d); best = d }
        }
        return a + best
      })
    }
    startAutoRotate()
  }, [N, stopPlayback, startPainter, startAutoRotate])

  const toggleVideo = (i: number) => {
    const el = videoRefs.current[i]
    if (!el) return
    if (el.paused) {
      el.play().then(() => setPlaying(i)).catch(console.error)
    } else {
      el.pause(); setPlaying(null)
    }
  }

  const onVideoEnded = () => setPlaying(null)

  /* ── NO DRAGGING, AT ANY WIDTH ────────────────────────────────────────────
     The carousel moves by the arrows, the dots and the arrow keys. Nothing
     else. The whole pointer-drag path is gone: no pointerdown, no
     setPointerCapture, no rAF loop, no grab cursor.

     It was not just unnecessary, it was the expensive part. Holding a card
     wrote transform, opacity, zIndex, pointerEvents and visibility across all
     twelve cards on every frame, and pointerdown promoted all twelve to their
     own GPU layer via will-change — twelve supersampled 405px layers, plus
     however many <video> textures were live. That is what the cursor was
     "catching" on.

     Only the centred card takes the pointer at all now, and only so it can be
     played. Every other card is inert, so the cursor cannot grab, drag or
     snag on artwork that is not the one you are looking at. */
  const onCardClick = (i: number) => {
    if (i === activeIndex) toggleVideo(i)
  }

  /* Shared by both side arrows and the flat-mode row. The stopPropagation
     is the side arrows' existing guard against reaching the cards below. */
  const onArrowClick = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation()
    nudge(delta)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); nudge(-1) }
    if (e.key === "ArrowRight") { e.preventDefault(); nudge(1)  }
  }

  // The outer pair is scaled ~1.18 by perspective, so the stage needs headroom
  // above and below or the section's overflow-hidden crops them.
  const stageH = Math.round(dims.cardH * (dims.reduced ? 1.18 : 1.38))
  // Card width from the aspect ratio
  const cardW  = Math.round(dims.cardH * (9 / 16))

  return (
    <section
      id="video-showcase"
      ref={sectionRef}
      className="relative overflow-hidden pt-24 sm:pt-32 pb-20 sm:pb-28 border-t border-border"
      style={{ transform: "translateZ(0)", isolation: "isolate" }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 space-y-4">
          <p className="text-xs font-medium text-accent uppercase tracking-widest">See it in action</p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Real results, <span className="gradient-text">on camera.</span>
          </h2>
          {/* Two strings, one CSS switch. Branching this on client state would
              be a hydration mismatch for a sentence. */}
          <p className="text-sm sm:text-lg text-foreground/60 max-w-2xl mx-auto">
            <span className="lg:hidden">Step through the AI systems we&apos;ve shipped. See the work, not just the words.</span>
            <span className="hidden lg:inline">Drag through the AI systems we&apos;ve shipped. See the work, not just the words.</span>
          </p>
        </div>
      </div>

      {/* One hover region over the whole carousel — videos, arrows and dots
          together, so the cursor crossing a gap between them never flaps the
          auto-rotate countdown. Touch has no hover, so auto-rotate simply
          keeps running there. */}
      <div onMouseEnter={onCarouselEnter} onMouseLeave={onCarouselLeave}>
        {/* ── Controls, flat mode only ──────────────────────────────────────
            Above the artwork, not over it. At 375px the 48px side buttons sat
            directly on top of the sliced neighbour cards; here they sit on
            background and the video keeps all of its own width. */}
        {flat && (
          <div className="mb-4 flex items-center justify-center gap-2 px-4">
            <button
              type="button"
              onClick={(e) => onArrowClick(e, -1)}
              aria-label="Previous video"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 bg-background/95 text-accent transition-colors hover:border-accent/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <DoubleChevron dir="left" />
            </button>

            <div className="flex items-center">
              {VIDEOS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToIndex(i)}
                  aria-label={`Go to video ${i + 1}`}
                  aria-current={i === activeIndex % VIDEOS.length}
                  className="grid h-11 w-7 place-items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex % VIDEOS.length ? "w-5 bg-accent" : "w-1.5 bg-foreground/20"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => onArrowClick(e, 1)}
              aria-label="Next video"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 bg-background/95 text-accent transition-colors hover:border-accent/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <DoubleChevron dir="right" />
            </button>
          </div>
        )}

      {/* Stage — full width so side cards have room */}
        <div
          className="vs-stage relative w-full select-none"
          /* The label says "drag to scroll" — the cursor should say it too. */
          style={{
            perspective: "2200px",
            height: stageH,
            /* No grab cursor, because there is nothing to grab. A grab cursor
               over artwork that does not drag is a promise the page cannot
               keep. */
            cursor: "auto",
          }}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          /* An attribute cannot be swapped by CSS, and branching it on client
             state would be a hydration mismatch, so it has to be true at every
             width — which it is. */
          aria-label="Video showcase — use the arrows or the arrow keys"
        >
        <div
            className="vs-inner absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {SLOTS.map((v, i) => {
              const newRel    = wrapRel(i - active, N)
              const oldRel    = wrapRel(i - prevActiveRef.current, N)
              const base      = cardLayout(oldRel, newRel, dims)
              const isCenter  = flat ? newRel === 0 : i === activeIndex
              const isPlaying = playing === i

              return (
                <article
                  key={i}
                  ref={el => { cardRefs.current[i] = el }}
                  className="vs-card"
                  onClick={() => onCardClick(i)}
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                  aria-label={v.title}
                  style={{
                    position:         "absolute",
                    // laid out SS× large, scaled back down in the transform.
                    // Flat mode overrides both in CSS — see the style block.
                    height:           dims.cardH * SS,
                    width:            cardW * SS,
// ↓ rounded-sm (4px) — small enough that the scalloped
                  //   silhouette disappears; sharp enough to look intentional.
                  borderRadius:     "6px",
                  overflow:         "hidden",
                  /* The continuous ring paints these itself every frame, so
                     React must not hold a competing value for them. */
                  ...(continuous ? {
                    transform:        base.transform,
                    opacity:          base.opacity,
                    zIndex:           base.zIndex,
                    pointerEvents:    base.pointerEvents,
                    visibility:       base.visibility,
                  } : {}),
                  /* Continuous mode owns the motion per frame, so its cards
                     get no CSS transition at all. Only the stepping modes
                     (flat, reduced) animate via transition — and only the
                     cards entering or leaving the pair get one. The rest
                     teleport to their parking slot while hidden, which is
                     what keeps a three-step dot jump to one screen of travel
                     instead of a streak. */
                  transition:       continuous ? "none" : (flat ? (dims.reduced || !base.animates ? "none" : FLAT_TRANSITION) : TRANSITION),
                    backfaceVisibility: "hidden",
                    WebkitUserSelect: "none",
                    userSelect:       "none",
                    touchAction:      "pan-y",
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
                    /* No src at all until the section is approached. A <video>
                       with no source is an element with no decoder, no buffer
                       and no network — twelve of those are free; twelve with a
                       src against a 27MB set are not. */
                    src={armed ? v.src : undefined}
                    playsInline
                    /* Inert until it is actually playing. A <video> under the
                       cursor otherwise takes the pointer itself and lets the
                       browser start a native element drag — the ghost image
                       fights the carousel's own pointer handling, which is the
                       flicker. The article above it owns click and drag; the
                       video only takes events back when it has real controls. */
                    style={{ pointerEvents: isPlaying ? "auto" : "none" }}
                    onDragStart={(e) => e.preventDefault()}
                    /* Arc: every card in the visible arc needs metadata to
                       paint a first frame. Flat: only the two on screen do,
                       which is seven concurrent range requests down to two.
                       Metadata is a few KB each; the 27MB of video still only
                       downloads on play. */
                    preload={
                      !armed ? "none"
                        : flat ? (newRel === 0 ? "metadata" : "none")
                        : Math.abs(newRel) <= 3 ? "metadata" : "none"
                    }
                    controls={isPlaying}
                    onEnded={onVideoEnded}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />

                {/* Depth scrim — sits above the video, below the UI. Its
                      opacity is a plain inline style now; the ref existed only
                      so the drag painter could write to it every frame. */}
                  <div
                    aria-hidden="true"
                    className="vs-scrim pointer-events-none absolute inset-0 bg-black"
                    style={{ opacity: base.dim, transition: "opacity 0.55s ease" }}
                  />

                  {/* Play overlay — hidden while playing */}
                  {!isPlaying && (
                    <>
                      {/* Legibility scrim — on every card now, since every card
                          carries a title. Eased back on the unfocused ones so
                          it doesn't stack with the depth scrim and crush
                          them. */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500"
                        style={{ opacity: isCenter ? 1 : 0.7 }}
                      />

                      {/* Play affordance stays on the focused card only — a
                          side card doesn't play, it centres. */}
                      {isCenter && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <span
                            className="vs-play flex items-center justify-center rounded-full bg-accent/90 text-white shadow-[0_0_48px_-6px_rgba(147,51,234,0.7)]"
                            style={{ height: 64 * SS, width: 64 * SS }}
                          >
                            <PlayIcon />
                          </span>
                        </div>
                      )}

                      {/* Title on EVERY card. Hierarchy comes from weight and
                          opacity rather than from hiding it — the caption
                          stays on the focused card so the arc doesn't turn
                          into six competing paragraphs. */}
                      <div
                        className="vs-caption pointer-events-none absolute bottom-0 left-0 right-0 transition-opacity duration-500"
                        style={{ padding: 16 * SS, opacity: isCenter ? 1 : 0.78 }}
                      >
                        <p
                          className="vs-title font-semibold text-white leading-tight"
                          style={{ fontSize: 14 * SS }}
                        >
                          {v.title}
                        </p>
                        {v.caption && (
                          <p
                            className="vs-sub text-white/55 leading-tight transition-opacity duration-500"
                            style={{ fontSize: 12 * SS, marginTop: 2 * SS, opacity: isCenter ? 1 : 0 }}
                          >
                            {v.caption}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </article>
              )
            })}
          </div>

        {/* Edge fades — wider and held opaque longer, so the outer cards
              read as the arc continuing past the frame rather than being
              sliced. Nothing bleeds past the frame in flat mode, so they
              go. */}
          <div aria-hidden className="vs-fade pointer-events-none absolute inset-y-0 left-0 w-[11%] z-[1200]"
               style={{ background: "linear-gradient(to right, var(--background) 6%, transparent)" }} />
          <div aria-hidden className="vs-fade pointer-events-none absolute inset-y-0 right-0 w-[11%] z-[1200]"
               style={{ background: "linear-gradient(to left, var(--background) 6%, transparent)" }} />

          {/* Side arrows — sit above the fades, vertically centred on the
              stage, so the carousel is steerable without reaching for the
              controls underneath it. Replaced above the stage in flat mode,
              where they would otherwise sit on top of the artwork. */}
          <button
            type="button"
            onClick={(e) => onArrowClick(e, -1)}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Previous video"
            className="vs-side-arrow absolute left-3 top-1/2 z-[1300] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-background/70 text-accent backdrop-blur-md transition-all hover:border-accent/45 hover:bg-background/90 sm:left-6 sm:h-14 sm:w-14"
          >
            <DoubleChevron dir="left" />
          </button>
          <button
            type="button"
            onClick={(e) => onArrowClick(e, 1)}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Next video"
            className="vs-side-arrow absolute right-3 top-1/2 z-[1300] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-background/70 text-accent backdrop-blur-md transition-all hover:border-accent/45 hover:bg-background/90 sm:right-6 sm:h-14 sm:w-14"
          >
            <DoubleChevron dir="right" />
          </button>
        </div>

        {/* Bottom control row removed — the arrows live on the sides of the
            stage now, and a duplicate pair underneath was both redundant and
            sitting close enough to the cards to compete for the pointer. */}

        {/* Dot indicators — the dot stays small, the hit area does not. A
            bare 6×6 button is unusable on a phone; each control is 44px tall
            with the mark centred inside it. */}
        <div className="vs-dots mt-1 flex items-center justify-center">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToIndex(i)}
              aria-label={`Go to video ${i + 1}`}
              /* twelve slots, six videos — the dot tracks the video, not the slot */
              aria-current={i === activeIndex % VIDEOS.length}
              className="grid h-11 w-8 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex % VIDEOS.length ? "w-6 bg-accent" : "w-1.5 bg-foreground/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Flat mode geometry ────────────────────────────────────────────
           Every rule is inside a max-width query, so the wide layout never
           evaluates one of them — and because the flat card's box comes from
           here rather than from JS, the supersample constant and the whole
           arc arithmetic stay read-only above 1024px.

           THE OVERLAP PROOF. Each card is half the free width; the pitch is
           one card plus one gap. Two boxes of width W set (W + gap) apart do
           not intersect, at any viewport size, in any orientation, however
           stale the JS state is. There is nothing here to tune.

           THE HEIGHT CAP IS NOT DECORATION. A 9:16 card at half of 619px is
           550px tall — on a 667x375 landscape phone that is taller than the
           screen. svh rather than vh on purpose: the small viewport height
           does not change when the iOS address bar collapses, so scrolling
           never triggers a relayout. */
        @media (max-width: 63.99rem) {
          .vs-stage {
            --vs-gap: 12px;
            --vs-pad: 2rem;
            --vs-cap: 78svh;
            --vs-cardw: min(calc(100vw - var(--vs-pad)), calc(var(--vs-cap) * 9 / 16));
            height: calc(var(--vs-cardw) * 16 / 9) !important;
            /* No depth, so no 3D rendering context over twelve cards. */
            perspective: none !important;
          }
          .vs-inner { transform-style: flat !important; }

          .vs-card {
            width:  var(--vs-cardw) !important;
            height: calc(var(--vs-cardw) * 16 / 9) !important;
            backface-visibility: visible !important;
          }

          /* The overlays are sized 1.5x to survive the counter-scale the arc
             applies. There is no counter-scale here, so they go back to 1x. */
          .vs-play    { height: 64px !important; width: 64px !important; }
          .vs-play svg { width: 28px !important; height: 28px !important; }
          .vs-caption { padding: 14px !important; }
          .vs-title   { font-size: 14px !important; }
          .vs-sub     { font-size: 12px !important; margin-top: 2px !important; }

          /* Replaced by the control row above the stage. */
          .vs-side-arrow, .vs-fade, .vs-dots { display: none !important; }
        }
        @media (min-width: 40rem) and (max-width: 63.99rem) {
          .vs-stage { --vs-gap: 16px; --vs-pad: 3rem; }
        }
      `}</style>
    </section>
  )
}
