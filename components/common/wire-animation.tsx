"use client"

import { useEffect, useRef, useState } from "react"

// ── DESKTOP paths (horizontal) ────────────────────────────────────────────────
const L_PATH    = "M 190 92 L 490 92"
const R_PATH    = "M 810 92 L 510 92"
const PATH_LEN  = 300

// ── MOBILE path (S-curve: BUSINESS right → AIOS left) ───────────────────────
// ViewBox 0 0 360 400
// BUSINESS box:  x=10 y=10  w=340 h=76  → right-port=(350,48)
// AIOS box:     x=10 y=314 w=340 h=76  → left-port=(10,352)
// S-curve control points stay inside 0-360 range
const MOBILE_S = "M 350 48 C 360 48 360 200 180 200 C 0 200 0 352 10 352"

export function WireAnimation() {
  const containerRef    = useRef<HTMLDivElement>(null)
  const mobilePathRef   = useRef<SVGPathElement>(null)

  const [progress,      setProgress]   = useState(0)
  const [mobileLen,     setMobileLen]  = useState(520)   // approx; updated on mount
  const [mobileTip,     setMobileTip]  = useState({ x: 350, y: 48 })

  // ── Measure mobile path length on mount ──────────────────────────────────
  useEffect(() => {
    if (mobilePathRef.current) {
      setMobileLen(mobilePathRef.current.getTotalLength())
    }
  }, [])

  // ── Scroll → progress ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return
      const { top } = containerRef.current.getBoundingClientRect()
      const vh  = window.innerHeight
      const raw = (vh * 0.9 - top) / (vh * 0.65)
      setProgress(Math.min(1, Math.max(0, raw)))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Update mobile tip position along the S-curve ─────────────────────────
  useEffect(() => {
    if (!mobilePathRef.current || progress <= 0.02) return
    const len = mobilePathRef.current.getTotalLength()
    const pt  = mobilePathRef.current.getPointAtLength(progress * len)
    setMobileTip({ x: pt.x, y: pt.y })
  }, [progress])

  const connected       = progress >= 0.97
  const dashOffset      = PATH_LEN * (1 - progress)
  const mobileDashOff   = mobileLen  * (1 - progress)

  // Desktop live tip positions
  const lTipX = 190 + (490 - 190) * progress
  const rTipX = 810 - (810 - 510) * progress
  const tipY  = 92

  const a      = (o: number) => `rgba(147,51,234,${o})`
  const purple = "rgb(147,51,234)"
  const textFg = "rgba(250,250,247,0.92)"
  const muted  = "rgba(250,250,247,0.35)"

  return (
    <div ref={containerRef} className="w-full py-4">

      {/* ══════════════════════════════════════════════════════
          DESKTOP SVG — horizontal (hidden on mobile)
          ══════════════════════════════════════════════════════ */}
      <svg
        viewBox="0 0 1000 184"
        className="hidden sm:block w-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {/* LEFT BOX: MARKETING AGENCY */}
        <rect x="4" y="58" width="182" height="68" rx="12"
          fill={a(0.06)} stroke={a(connected ? 0.55 : 0.28)} strokeWidth="1.5"
          style={{ transition: "stroke 0.4s" }} />
        <text x="95" y="97" textAnchor="middle"
          fontSize="18" fontWeight="800" fill={textFg} fontFamily="inherit"
          textLength="172" lengthAdjust="spacing">
          MARKETING AGENCY
        </text>
        <rect x="183" y="82" width="10" height="18" rx="2.5"
          fill={a(0.3)} stroke={a(0.55)} strokeWidth="1" />

        {/* RIGHT BOX: AIOS */}
        <rect x="814" y="58" width="182" height="68" rx="12"
          fill={a(0.06)} stroke={a(connected ? 0.55 : 0.28)} strokeWidth="1.5"
          style={{ transition: "stroke 0.4s" }} />
        <text x="905" y="96" textAnchor="middle"
          fontSize="18" fontWeight="800" fill={textFg} fontFamily="inherit" letterSpacing="1.5">
          AIOS
        </text>
        <rect x="807" y="82" width="10" height="18" rx="2.5"
          fill={a(0.3)} stroke={a(0.55)} strokeWidth="1" />

        {/* GUIDE TRACKS */}
        <line x1="190" y1="92" x2="490" y2="92"
          stroke={a(0.08)} strokeWidth="2" strokeDasharray="6 5" />
        <line x1="810" y1="92" x2="510" y2="92"
          stroke={a(0.08)} strokeWidth="2" strokeDasharray="6 5" />

        {/* ANIMATED WIRES */}
        <line x1="190" y1="92" x2="490" y2="92"
          stroke={a(0.80)} strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={PATH_LEN} strokeDashoffset={dashOffset} />
        <line x1="810" y1="92" x2="510" y2="92"
          stroke={a(0.80)} strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={PATH_LEN} strokeDashoffset={dashOffset} />

        {/* MOVING TIPS */}
        {progress > 0.03 && !connected && (
          <>
            <circle cx={lTipX} cy={tipY} r="7" fill={a(0.20)} />
            <circle cx={lTipX} cy={tipY} r="4" fill={purple} />
            <circle cx={rTipX} cy={tipY} r="7" fill={a(0.20)} />
            <circle cx={rTipX} cy={tipY} r="4" fill={purple} />
          </>
        )}

        {/* CENTER SOCKET */}
        <circle cx="500" cy="92" r="17"
          fill={connected ? a(0.14) : a(0.04)}
          stroke={connected ? a(0.70) : a(0.18)}
          strokeWidth="1.5" style={{ transition: "all 0.4s ease" }} />
        <circle cx="500" cy="92" r={connected ? 9 : 5}
          fill={connected ? purple : a(0.2)}
          style={{ transition: "all 0.45s ease" }} />

        {/* RIPPLE */}
        {connected && (
          <>
            <circle cx="500" cy="92" r="17" fill="none" stroke={a(0.45)} strokeWidth="1.5">
              <animate attributeName="r"              values="17;44;17"    dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.45;0;0.45" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="92" r="26" fill="none" stroke={a(0.2)} strokeWidth="1">
              <animate attributeName="r"              values="26;52;26"   dur="2.4s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.2;0;0.2"  dur="2.4s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {connected && (
          <text x="500" y="128" textAnchor="middle" fontSize="11" fontWeight="600"
            fill={a(0.85)} fontFamily="inherit" letterSpacing="0.5">Connected</text>
        )}
        {progress < 0.04 && (
          <text x="500" y="152" textAnchor="middle" fontSize="10.5"
            fill={muted} fontFamily="inherit">scroll to connect</text>
        )}
      </svg>

      {/* ══════════════════════════════════════════════════════
          MOBILE SVG — stacked vertical with S-curve (visible only on mobile)
          ViewBox: 0 0 360 400
          BUSINESS box top, AIOS box bottom, S-curve connects them
          ══════════════════════════════════════════════════════ */}
      <svg
        viewBox="0 0 360 400"
        className="sm:hidden w-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {/* TOP BOX: MARKETING AGENCY */}
        <rect x="10" y="10" width="340" height="76" rx="14"
          fill={a(0.06)} stroke={a(connected ? 0.55 : 0.28)} strokeWidth="1.8"
          style={{ transition: "stroke 0.4s" }} />
        <text x="180" y="55" textAnchor="middle"
          fontSize="22" fontWeight="800" fill={textFg} fontFamily="inherit" letterSpacing="2">
          MARKETING AGENCY
        </text>
        {/* Right port stub */}
        <rect x="348" y="40" width="11" height="18" rx="3"
          fill={a(0.3)} stroke={a(0.55)} strokeWidth="1" />

        {/* BOTTOM BOX: AIOS */}
        <rect x="10" y="314" width="340" height="76" rx="14"
          fill={a(0.06)} stroke={a(connected ? 0.55 : 0.28)} strokeWidth="1.8"
          style={{ transition: "stroke 0.4s" }} />
        <text x="180" y="359" textAnchor="middle"
          fontSize="22" fontWeight="800" fill={textFg} fontFamily="inherit" letterSpacing="2">
          AIOS
        </text>
        {/* Left port stub */}
        <rect x="1" y="344" width="11" height="18" rx="3"
          fill={a(0.3)} stroke={a(0.55)} strokeWidth="1" />

        {/* GUIDE TRACK — dashed S-curve */}
        <path d={MOBILE_S}
          fill="none" stroke={a(0.08)} strokeWidth="2.5" strokeDasharray="7 5" />

        {/* ANIMATED S-WIRE */}
        <path
          ref={mobilePathRef}
          d={MOBILE_S}
          fill="none"
          stroke={a(0.82)}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={mobileLen}
          strokeDashoffset={mobileDashOff}
        />

        {/* MOVING TIP */}
        {progress > 0.03 && !connected && (
          <>
            <circle cx={mobileTip.x} cy={mobileTip.y} r="8"  fill={a(0.20)} />
            <circle cx={mobileTip.x} cy={mobileTip.y} r="4.5" fill={purple} />
          </>
        )}

        {/* CENTER SOCKET at S-curve midpoint (180, 200) */}
        <circle cx="180" cy="200" r="18"
          fill={connected ? a(0.14) : a(0.04)}
          stroke={connected ? a(0.70) : a(0.18)}
          strokeWidth="1.5" style={{ transition: "all 0.4s ease" }} />
        <circle cx="180" cy="200" r={connected ? 10 : 5}
          fill={connected ? purple : a(0.2)}
          style={{ transition: "all 0.45s ease" }} />

        {/* RIPPLE */}
        {connected && (
          <>
            <circle cx="180" cy="200" r="18" fill="none" stroke={a(0.45)} strokeWidth="1.5">
              <animate attributeName="r"              values="18;46;18"    dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.45;0;0.45" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="180" cy="200" r="28" fill="none" stroke={a(0.2)} strokeWidth="1">
              <animate attributeName="r"              values="28;55;28"   dur="2.4s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.2;0;0.2"  dur="2.4s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* LABELS */}
        {connected && (
          <text x="180" y="232" textAnchor="middle" fontSize="12" fontWeight="600"
            fill={a(0.85)} fontFamily="inherit" letterSpacing="0.5">Connected</text>
        )}
        {progress < 0.04 && (
          <text x="180" y="220" textAnchor="middle" fontSize="11"
            fill={muted} fontFamily="inherit">scroll to connect</text>
        )}
      </svg>

    </div>
  )
}
