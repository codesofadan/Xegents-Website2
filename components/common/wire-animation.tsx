"use client"

import { useEffect, useRef, useState } from "react"

/* ────────────────────────────────────────────────────────────────────────────
   MARKETING AGENCY ⟶ AIOS — one connection, two compositions.

   HISTORY, because it explains the shape of this file. It first shipped as two
   unrelated SVGs: a horizontal one-liner above 640px, and below that a stacked
   pair joined by a snaking S-curve,
   "M 350 48 C 360 48 360 200 180 200 C 0 200 0 352 10 352". Same idea, two
   drawings, and the phone got the one that reads as a diagram of something
   complicated rather than a connection. That was collapsed into a single
   horizontal composition at every width.

   Which was right in principle and wrong in practice. A horizontal run needs
   horizontal room. At 360px the two boxes were squeezed to 112 and 76 units to
   leave the wire anywhere to go, and the labels shrank with them — the wire
   was fine and the thing it connected had become unreadable.

   SO: WIDE IS A LINE, NARROW IS AN S. Going vertical is what buys the boxes
   their width back — both get 200 units instead of 112 and 76 — and the S is
   what spends the height that gained. MARKETING AGENCY sits top-left, AIOS
   bottom-right, and one ogee runs between them, so the reading order is the
   same left-to-right one the wide layout has.

   (A Z was tried first, and it was right about the geometry and wrong about
   the feel: three straight segments meeting at hard corners read as a wiring
   diagram rather than a connection.)

   THE CURVE IS FLATTENED, NOT MEASURED. It is sampled into a polyline at
   module load, which lets it reuse every straight-line mechanism already
   here — <polyline> draws it, strokeDasharray measures it, and the moving tip
   stays linear interpolation between two sampled points. So there is still no
   getTotalLength() or getPointAtLength() anywhere in this file, and the curve
   costs no more per frame than the straight run did.

   Both layouts are DATA, not branches. A layout describes its boxes, its two
   wire halves and its socket; the render below is one code path that draws
   whichever it is handed. A third composition would be another object.
──────────────────────────────────────────────────────────────────────────── */

type Pt = [number, number]

/** One half of the wire: a polyline running from a box to the socket. */
type Half = {
  pts: Pt[]
  /** length of each segment, in viewBox units */
  segs: number[]
  total: number
}

type Box = {
  x: number; y: number; w: number; h: number
  label: string
  size: number
  /** baseline offset from the box's vertical centre. Explicit rather than
      derived from `size`, because the wide layout's two boxes shipped with
      different offsets (5 and 4) and deriving them would move desktop text by
      a pixel or two — which is a pixel or two more than zero. */
  dy: number
  /** stretch the label to fill the box — keeps a long one inside a short box */
  fit?: boolean
  tracking?: number
}

type Layout = {
  vw: number; vh: number
  boxes: [Box, Box]
  /** centre of each connector nub, on the box edge its wire leaves from */
  ports: [Pt, Pt]
  halves: [Half, Half]
  socket: { x: number; y: number; r: number }
  /** Nubs lie flat when the wire leaves a box vertically. */
  portVertical?: boolean
  captionX: number
  captionY: number
  hintY: number
}

const half = (pts: Pt[]): Half => {
  const segs = pts.slice(1).map(([x, y], i) => Math.hypot(x - pts[i][0], y - pts[i][1]))
  return { pts, segs, total: segs.reduce((a, b) => a + b, 0) }
}

/** A point on a cubic Bézier. Plain de Casteljau — no DOM, no measurement. */
const bezier = (p0: Pt, c0: Pt, c1: Pt, p1: Pt, t: number): Pt => {
  const u = 1 - t
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t
  return [
    a * p0[0] + b * c0[0] + c * c1[0] + d * p1[0],
    a * p0[1] + b * c0[1] + c * c1[1] + d * p1[1],
  ]
}

/**
 * Flatten half a cubic into a polyline, from `to` back toward `from`.
 *
 * Flattening is what lets a curve reuse every straight-line mechanism already
 * here: <polyline> draws it, strokeDasharray measures it, and the moving tip
 * stays linear interpolation between two sampled points. Nothing calls
 * getTotalLength() or getPointAtLength(), so the curve costs no more per frame
 * than the straight run did. At 24 samples over 40-odd units the chords are
 * sub-pixel once the viewBox is scaled to a phone.
 *
 * @param at0 t at the box end, at1 t at the socket — pass 0→0.5 for the first
 *   half and 1→0.5 for the second, so both polylines start at their own box
 *   and grow inward to meet in the middle.
 */
const curveHalf = (p0: Pt, c0: Pt, c1: Pt, p1: Pt, at0: number, at1: number, n = 24): Half =>
  half(Array.from({ length: n + 1 }, (_, i) => bezier(p0, c0, c1, p1, at0 + ((at1 - at0) * i) / n)))

/* ── Wide: one straight run, 310 units each side ──────────────────────────── */
const FULL: Layout = {
  vw: 1000, vh: 184,
  boxes: [
    { x: 4,   y: 58, w: 182, h: 68, label: "MARKETING AGENCY", size: 18, dy: 5, fit: true },
    { x: 814, y: 58, w: 182, h: 68, label: "AIOS",             size: 18, dy: 4, tracking: 1.5 },
  ],
  ports:  [[188, 92], [812, 92]],
  halves: [half([[190, 92], [500, 92]]), half([[810, 92], [500, 92]])],
  socket: { x: 500, y: 92, r: 17 },
  captionX: 500, captionY: 128, hintY: 152,
}

/* ── Narrow: the S ─────────────────────────────────────────────────────────
   MARKETING AGENCY sits top-LEFT and AIOS bottom-RIGHT, joined by a single
   ogee. Both boxes get 200 units, which was the whole point of going vertical,
   and the reading order matches the wide layout: agency first, then AIOS.

   The curve is one cubic: down out of the agency box, sweeping right, then
   easing back down into AIOS. Its control points sit directly below and above
   the two ports, which is what makes the tangent vertical at both ends — the
   wire leaves and arrives square to each box rather than clipping its corner.

   The socket sits at t = 0.5. On a curve with this symmetry that is the exact
   centre of the S, so the two halves come out the same length and one progress
   value drives them to meet in the middle at the same instant, as every other
   layout here does. */
const S_P0: Pt = [108, 66]   // bottom edge of the agency box
const S_C0: Pt = [108, 108]
const S_C1: Pt = [252, 104]
const S_P1: Pt = [252, 146]  // top edge of the AIOS box

const COMPACT: Layout = {
  vw: 360, vh: 212,
  boxes: [
    { x: 8,   y: 12,  w: 200, h: 54, label: "MARKETING AGENCY", size: 15, dy: 5, fit: true },
    { x: 152, y: 146, w: 200, h: 54, label: "AIOS",             size: 17, dy: 6, tracking: 2 },
  ],
  ports:  [[108, 62], [252, 150]],
  halves: [
    curveHalf(S_P0, S_C0, S_C1, S_P1, 0, 0.5),   // out of the agency box, downward
    curveHalf(S_P0, S_C0, S_C1, S_P1, 1, 0.5),   // out of AIOS, upward
  ],
  socket: { x: bezier(S_P0, S_C0, S_C1, S_P1, 0.5)[0], y: bezier(S_P0, S_C0, S_C1, S_P1, 0.5)[1], r: 14 },
  portVertical: true,
  /* Off the socket and into the clear block left of the AIOS box, so the
     label never lands on the curve it is describing. */
  captionX: 74, captionY: 180, hintY: 180,
}

/** Where the drawn tip has reached, walking the polyline segment by segment. */
function tipAt(h: Half, p: number): Pt {
  let d = h.total * p
  for (let i = 0; i < h.segs.length; i++) {
    if (d <= h.segs[i] || i === h.segs.length - 1) {
      const t = h.segs[i] === 0 ? 0 : Math.min(1, d / h.segs[i])
      const [x1, y1] = h.pts[i]
      const [x2, y2] = h.pts[i + 1]
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]
    }
    d -= h.segs[i]
  }
  return h.pts[h.pts.length - 1]
}

const points = (h: Half) => h.pts.map(([x, y]) => `${x},${y}`).join(" ")

export function WireAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639.98px)")
    const sync = () => setCompact(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  /* getBoundingClientRect on every scroll event is a forced layout read per
     frame. Coalescing into one rAF keeps it to one read per painted frame. */
  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const el = containerRef.current
      if (!el) return
      const { top } = el.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = (vh * 0.9 - top) / (vh * 0.65)
      setProgress(Math.min(1, Math.max(0, raw)))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    measure()
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const L = compact ? COMPACT : FULL
  const connected = progress >= 0.97

  const a = (o: number) => `rgba(147,51,234,${o})`
  const purple = "rgb(147,51,234)"
  const textFg = "rgba(250,250,247,0.92)"
  const muted = "rgba(250,250,247,0.35)"

  return (
    <div ref={containerRef} className="w-full py-4">
      {/* The diagram carries the whole point of this section and was invisible
          to assistive tech — both SVGs were aria-hidden with no alternative. */}
      <p className="sr-only">
        A marketing agency connects to AIOS along a single link, which completes as you scroll.
      </p>

      <svg
        viewBox={`0 0 ${L.vw} ${L.vh}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {/* BOXES */}
        {L.boxes.map((b, i) => (
          <g key={`b${i}`}>
            <rect
              x={b.x} y={b.y} width={b.w} height={b.h} rx={compact ? 10 : 12}
              fill={a(0.06)} stroke={a(connected ? 0.55 : 0.28)} strokeWidth="1.5"
              style={{ transition: "stroke 0.4s" }}
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 + b.dy}
              textAnchor="middle"
              fontSize={b.size}
              fontWeight="800"
              fill={textFg}
              fontFamily="inherit"
              letterSpacing={b.tracking}
              textLength={b.fit ? b.w - 20 : undefined}
              lengthAdjust={b.fit ? "spacing" : undefined}
            >
              {b.label}
            </text>
            {/* Connector nub on the edge this box's wire leaves from. It lies
                flat when the wire leaves vertically, so it reads as a socket
                on that edge rather than a tab poking through it. */}
            <rect
              x={L.ports[i][0] - (L.portVertical ? 9 : 5)}
              y={L.ports[i][1] - (L.portVertical ? 5 : 9)}
              width={L.portVertical ? 18 : 10}
              height={L.portVertical ? 10 : 18}
              rx="2.5"
              fill={a(0.3)} stroke={a(0.55)} strokeWidth="1"
            />
          </g>
        ))}

        {/* GUIDE TRACKS — the route the wire will take.
            Butt caps, deliberately. A round cap on a dashed stroke extends
            every dash by half the stroke width at both ends, so adding one
            here would visibly fatten the wide layout's guide — a pixel diff on
            a screen this change is not allowed to touch. */}
        {L.halves.map((h, i) => (
          <polyline
            key={`g${i}`}
            points={points(h)}
            fill="none"
            stroke={a(0.08)}
            strokeWidth="2"
            strokeDasharray="6 5"
            strokeLinejoin="round"
          />
        ))}

        {/* ANIMATED WIRES — both halves are the same length, so one progress
            value drives them symmetrically and they arrive together. */}
        {L.halves.map((h, i) => (
          <polyline
            key={`w${i}`}
            points={points(h)}
            fill="none"
            stroke={a(0.8)}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={h.total}
            strokeDashoffset={h.total * (1 - progress)}
          />
        ))}

        {/* MOVING TIPS — linear interpolation along a straight segment, at
            either layout. Nothing is measured. */}
        {progress > 0.03 && !connected && L.halves.map((h, i) => {
          const [tx, ty] = tipAt(h, progress)
          return (
            <g key={`t${i}`}>
              <circle cx={tx} cy={ty} r="7" fill={a(0.2)} />
              <circle cx={tx} cy={ty} r="4" fill={purple} />
            </g>
          )
        })}

        {/* SOCKET */}
        <circle cx={L.socket.x} cy={L.socket.y} r={L.socket.r}
          fill={connected ? a(0.14) : a(0.04)}
          stroke={connected ? a(0.7) : a(0.18)}
          strokeWidth="1.5" style={{ transition: "all 0.4s ease" }} />
        <circle cx={L.socket.x} cy={L.socket.y}
          r={connected ? L.socket.r * 0.53 : L.socket.r * 0.3}
          fill={connected ? purple : a(0.2)}
          style={{ transition: "all 0.45s ease" }} />

        {connected && (
          <>
            <circle cx={L.socket.x} cy={L.socket.y} r={L.socket.r} fill="none" stroke={a(0.45)} strokeWidth="1.5">
              <animate attributeName="r" values={`${L.socket.r};${L.socket.r * 2.6};${L.socket.r}`} dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.45;0;0.45" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx={L.socket.x} cy={L.socket.y} r={L.socket.r * 1.5} fill="none" stroke={a(0.2)} strokeWidth="1">
              <animate attributeName="r" values={`${L.socket.r * 1.5};${L.socket.r * 3};${L.socket.r * 1.5}`} dur="2.4s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.2;0;0.2" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {connected && (
          <text x={L.captionX} y={L.captionY} textAnchor="middle" fontSize={compact ? 10 : 11}
            fontWeight="600" fill={a(0.85)} fontFamily="inherit" letterSpacing="0.5">
            Connected
          </text>
        )}
        {progress < 0.04 && (
          <text x={L.captionX} y={L.hintY} textAnchor="middle" fontSize={compact ? 9.5 : 10.5}
            fill={muted} fontFamily="inherit">
            scroll to connect
          </text>
        )}
      </svg>
    </div>
  )
}
