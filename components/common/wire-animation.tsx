"use client"

import { useEffect, useRef, useState } from "react"

/* ────────────────────────────────────────────────────────────────────────────
   MARKETING AGENCY ⟶ AIOS — one straight line, on every device.

   This used to ship two entirely separate SVGs. Above 640px it was the
   horizontal one-liner: two boxes, a wire drawing inward from each, a socket
   in the middle. Below 640px it swapped to a different drawing altogether —
   the boxes stacked and a snaking S-curve wound between them,
   "M 350 48 C 360 48 360 200 180 200 C 0 200 0 352 10 352". Same idea, two
   unrelated shapes, and the phone got the one that reads as a diagram of
   something complicated rather than a connection.

   Now there is one composition and only its measurements change. The box text
   wraps to two lines on a narrow screen; the wire never does. That is what
   "one-liner" means here — the connection is a single straight run at every
   width, because that is the whole point being made.

   THIS IS A NET DELETION. A straight line's tip is linear interpolation, which
   the wide branch already computed. Dropping the curve therefore also drops
   the path ref, the measured path length, and the getTotalLength() /
   getPointAtLength() calls that ran on every scroll frame — along with a
   duplicated socket, ripple and label block.
──────────────────────────────────────────────────────────────────────────── */

type Layout = {
  vw: number
  vh: number
  /** left box */
  lx: number; lw: number
  /** right box */
  rx: number; rw: number
  boxY: number; boxH: number
  /** wire: from lTip, meeting at cx, arriving from rTip */
  wireL: number; wireR: number; cx: number; cy: number
  socket: number
  /** type */
  labelSize: number; twoLine: boolean
  captionY: number; hintY: number
}

const FULL: Layout = {
  vw: 1000, vh: 184,
  lx: 4, lw: 182, rx: 814, rw: 182,
  boxY: 58, boxH: 68,
  wireL: 190, wireR: 810, cx: 500, cy: 92,
  socket: 17,
  labelSize: 18, twoLine: false,
  captionY: 128, hintY: 152,
}

/* Compact keeps every proportion that matters and only tightens the run. The
   wire is still 80px of clear space either side of the socket — enough to read
   as a wire rather than a join. */
const COMPACT: Layout = {
  vw: 360, vh: 120,
  lx: 2, lw: 112, rx: 282, rw: 76,
  boxY: 22, boxH: 56,
  wireL: 118, wireR: 278, cx: 198, cy: 50,
  socket: 13,
  labelSize: 12, twoLine: true,
  captionY: 92, hintY: 110,
}

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
  const runL = L.cx - L.wireL
  const runR = L.wireR - L.cx
  const lTipX = L.wireL + runL * progress
  const rTipX = L.wireR - runR * progress

  const a = (o: number) => `rgba(147,51,234,${o})`
  const purple = "rgb(147,51,234)"
  const textFg = "rgba(250,250,247,0.92)"
  const muted = "rgba(250,250,247,0.35)"

  const boxMidY = L.boxY + L.boxH / 2

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
        {/* LEFT BOX */}
        <rect
          x={L.lx} y={L.boxY} width={L.lw} height={L.boxH} rx={compact ? 10 : 12}
          fill={a(0.06)} stroke={a(connected ? 0.55 : 0.28)} strokeWidth="1.5"
          style={{ transition: "stroke 0.4s" }}
        />
        {L.twoLine ? (
          <>
            <text x={L.lx + L.lw / 2} y={boxMidY - 2} textAnchor="middle"
              fontSize={L.labelSize} fontWeight="800" fill={textFg} fontFamily="inherit">
              MARKETING
            </text>
            <text x={L.lx + L.lw / 2} y={boxMidY + L.labelSize} textAnchor="middle"
              fontSize={L.labelSize} fontWeight="800" fill={textFg} fontFamily="inherit">
              AGENCY
            </text>
          </>
        ) : (
          <text x={L.lx + L.lw / 2} y={boxMidY + 5} textAnchor="middle"
            fontSize={L.labelSize} fontWeight="800" fill={textFg} fontFamily="inherit"
            textLength={L.lw - 10} lengthAdjust="spacing">
            MARKETING AGENCY
          </text>
        )}
        <rect x={L.lx + L.lw - 3} y={boxMidY - 9} width="10" height="18" rx="2.5"
          fill={a(0.3)} stroke={a(0.55)} strokeWidth="1" />

        {/* RIGHT BOX */}
        <rect
          x={L.rx} y={L.boxY} width={L.rw} height={L.boxH} rx={compact ? 10 : 12}
          fill={a(0.06)} stroke={a(connected ? 0.55 : 0.28)} strokeWidth="1.5"
          style={{ transition: "stroke 0.4s" }}
        />
        <text x={L.rx + L.rw / 2} y={boxMidY + (compact ? 4 : 4)} textAnchor="middle"
          fontSize={compact ? 15 : L.labelSize} fontWeight="800" fill={textFg}
          fontFamily="inherit" letterSpacing="1.5">
          AIOS
        </text>
        <rect x={L.rx - 7} y={boxMidY - 9} width="10" height="18" rx="2.5"
          fill={a(0.3)} stroke={a(0.55)} strokeWidth="1" />

        {/* GUIDE TRACKS — one straight run each side, at every width */}
        <line x1={L.wireL} y1={L.cy} x2={L.cx} y2={L.cy}
          stroke={a(0.08)} strokeWidth="2" strokeDasharray="6 5" />
        <line x1={L.wireR} y1={L.cy} x2={L.cx} y2={L.cy}
          stroke={a(0.08)} strokeWidth="2" strokeDasharray="6 5" />

        {/* ANIMATED WIRES */}
        <line x1={L.wireL} y1={L.cy} x2={L.cx} y2={L.cy}
          stroke={a(0.8)} strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={runL} strokeDashoffset={runL * (1 - progress)} />
        <line x1={L.wireR} y1={L.cy} x2={L.cx} y2={L.cy}
          stroke={a(0.8)} strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={runR} strokeDashoffset={runR * (1 - progress)} />

        {/* MOVING TIPS — plain interpolation along a straight line */}
        {progress > 0.03 && !connected && (
          <>
            <circle cx={lTipX} cy={L.cy} r="7" fill={a(0.2)} />
            <circle cx={lTipX} cy={L.cy} r="4" fill={purple} />
            <circle cx={rTipX} cy={L.cy} r="7" fill={a(0.2)} />
            <circle cx={rTipX} cy={L.cy} r="4" fill={purple} />
          </>
        )}

        {/* SOCKET */}
        <circle cx={L.cx} cy={L.cy} r={L.socket}
          fill={connected ? a(0.14) : a(0.04)}
          stroke={connected ? a(0.7) : a(0.18)}
          strokeWidth="1.5" style={{ transition: "all 0.4s ease" }} />
        <circle cx={L.cx} cy={L.cy} r={connected ? L.socket * 0.53 : L.socket * 0.3}
          fill={connected ? purple : a(0.2)}
          style={{ transition: "all 0.45s ease" }} />

        {connected && (
          <>
            <circle cx={L.cx} cy={L.cy} r={L.socket} fill="none" stroke={a(0.45)} strokeWidth="1.5">
              <animate attributeName="r" values={`${L.socket};${L.socket * 2.6};${L.socket}`} dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.45;0;0.45" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx={L.cx} cy={L.cy} r={L.socket * 1.5} fill="none" stroke={a(0.2)} strokeWidth="1">
              <animate attributeName="r" values={`${L.socket * 1.5};${L.socket * 3};${L.socket * 1.5}`} dur="2.4s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.2;0;0.2" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {connected && (
          <text x={L.cx} y={L.captionY} textAnchor="middle" fontSize={compact ? 10 : 11}
            fontWeight="600" fill={a(0.85)} fontFamily="inherit" letterSpacing="0.5">
            Connected
          </text>
        )}
        {progress < 0.04 && (
          <text x={L.cx} y={L.hintY} textAnchor="middle" fontSize={compact ? 9.5 : 10.5}
            fill={muted} fontFamily="inherit">
            scroll to connect
          </text>
        )}
      </svg>
    </div>
  )
}
