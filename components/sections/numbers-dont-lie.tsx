"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  Zap,
  ListChecks,
  DollarSign,
  Users,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

/* ────────────────────────────────────────────────────────────────────────────
   "The Numbers Don't Lie" — outcome proof grid.
   Themed to the site palette: deep-navy surfaces + purple accent (--accent).
   Row 1: 2 boxes, Row 2: 3 boxes. Boxes are static; only their inner visuals
   animate. The 5th box (error reduction) is the purple gradient highlight.
   Numbers are illustrative placeholders pending real engagement values.
──────────────────────────────────────────────────────────────────────────── */

const ACCENT = "#8B5CF6"       // matches --accent  (oklch(0.60 0.22 292))
const ACCENT_DEEP = "#6D28D9"  // deeper violet for gradients

type Visual = "columns" | "area" | "network" | "globe" | "bars"

interface Box {
  key: string
  title: string
  sub: string
  visual: Visual
  purple?: boolean
  tall?: boolean
}

const BOXES: Record<string, Box> = {
  time: {
    key: "time",
    title: "10,000+ Hours Saved / Year",
    sub: "Repetitive, manual work handed to AI systems — your team gets its week back.",
    visual: "columns",
    tall: true,
  },
  budget: {
    key: "budget",
    title: "$2M+ in Operating Costs Saved",
    sub: "Same output at a fraction of the overhead — reinvested where it compounds.",
    visual: "area",
    tall: true,
  },
  jobs: {
    key: "jobs",
    title: "100% Job Retention",
    sub: "We automate the busywork, not the people. Nobody gets replaced — everybody levels up.",
    visual: "network",
  },
  coverage: {
    key: "coverage",
    title: "24/7 Coverage, Zero Overtime",
    sub: "Systems that run round the clock — without a single extra hire or overtime hour.",
    visual: "globe",
  },
  // 5th box — purple gradient highlight
  errors: {
    key: "errors",
    title: "90% Fewer Errors",
    sub: "Deterministic workflows replace human slips — accuracy that compounds over time.",
    visual: "bars",
    purple: true,
  },
}

// ── Box 1 — two-column metric-tile marquee (col-1 up, col-2 down) ──────────
type Metric = { icon: LucideIcon; label: string; value: string; pct: string }

const METRICS: Metric[] = [
  { icon: Clock,      label: "Time Saved",        value: "68%",  pct: "25%" },
  { icon: Zap,        label: "Faster Turnaround", value: "8×",   pct: "40%" },
  { icon: ListChecks, label: "Tasks Automated",   value: "120+", pct: "24%" },
  { icon: DollarSign, label: "Cost Reduced",      value: "$2M",  pct: "31%" },
  { icon: TrendingUp, label: "Team Output",       value: "3×",   pct: "210%" },
  { icon: Users,      label: "Team Retained",     value: "100%", pct: "12%" },
]

function MetricTile({ icon: Icon, label, value, pct }: Metric) {
  return (
    <div className="mb-2.5 rounded-xl bg-secondary/70 border border-border/70 px-3.5 py-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-1.5 text-xs text-foreground/55 truncate">
          <Icon className="w-4 h-4 text-accent shrink-0" />
          {label}
        </span>
        <MoreHorizontal className="w-4 h-4 text-foreground/25 shrink-0" />
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-2xl sm:text-3xl font-black text-foreground leading-none tracking-tight">{value}</span>
        <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 rounded-md px-1.5 py-1">
          {pct}
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  )
}

function ColumnsVisual() {
  const colA = [METRICS[0], METRICS[1], METRICS[2]]
  const colB = [METRICS[3], METRICS[4], METRICS[5]]
  return (
    <div
      className="h-full w-full rounded-lg bg-black/20 border border-border p-2.5 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
      }}
    >
      <div className="grid grid-cols-2 gap-2.5 h-full">
        <div className="overflow-hidden">
          <div className="ndl-marq-up flex flex-col">
            {[...colA, ...colA].map((m, i) => <MetricTile key={i} {...m} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="ndl-marq-down flex flex-col">
            {[...colB, ...colB].map((m, i) => <MetricTile key={i} {...m} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Box 2 — cumulative budget-saved area chart ─────────────────────────────
const AREA = [30, 34, 40, 44, 55, 60, 72, 86]
function AreaVisual() {
  const W = 220, H = 120, P = 8
  const iw = W - P * 2
  const ih = H - P * 2
  const x = (i: number) => P + (i / (AREA.length - 1)) * iw
  const y = (v: number) => P + (1 - v / 100) * ih
  const line = "M " + AREA.map((v, i) => `${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" L ")
  const area =
    `M ${x(0).toFixed(1)} ${(H - P).toFixed(1)} ` +
    AREA.map((v, i) => `L ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ") +
    ` L ${x(AREA.length - 1).toFixed(1)} ${(H - P).toFixed(1)} Z`
  return (
    <div className="h-full w-full rounded-lg bg-black/20 border border-border p-3 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] text-foreground/45">Cumulative saved</p>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5 text-accent bg-accent/10">
          <TrendingUp className="w-2.5 h-2.5" /> Up
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full flex-1" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ndl-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="ndl-area" d={area} fill="url(#ndl-area-fill)" />
        <path
          className="ndl-area-line"
          d={line}
          fill="none"
          stroke={ACCENT}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ── Box 3 — team network / job retention ───────────────────────────────────
const NODES = [
  { x: 40, y: 30, c: "#C4B5FD" },
  { x: 100, y: 20, c: ACCENT },
  { x: 170, y: 40, c: "#A78BFA" },
  { x: 60, y: 80, c: "#7C3AED" },
  { x: 120, y: 75, c: ACCENT },
  { x: 185, y: 90, c: ACCENT_DEEP },
  { x: 30, y: 60, c: "#A78BFA" },
]
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [4, 5], [2, 4], [0, 6], [3, 6],
]
function NetworkVisual() {
  return (
    <div className="h-full w-full rounded-lg bg-black/20 border border-border overflow-hidden">
      <svg viewBox="0 0 210 110" className="w-full h-full" aria-hidden="true">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="var(--foreground)"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        ))}
        {NODES.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="8" fill={n.c} opacity="0.16" />
            <circle cx={n.x} cy={n.y} r="3.5" fill={n.c} />
          </g>
        ))}
      </svg>
    </div>
  )
}

// ── Box 4 — 24/7 coverage globe ────────────────────────────────────────────
function GlobeVisual() {
  return (
    <div className="h-full w-full rounded-lg bg-black/20 border border-border flex items-center justify-center overflow-hidden relative">
      <svg viewBox="0 0 160 120" className="w-full h-full" aria-hidden="true">
        <circle cx="80" cy="60" r="42" fill="none" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="1" />
        <ellipse cx="80" cy="60" rx="42" ry="14" fill="none" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="1" />
        <ellipse cx="80" cy="60" rx="42" ry="30" fill="none" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="1" />
        <ellipse cx="80" cy="60" rx="14" ry="42" fill="none" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="1" />
        <ellipse cx="80" cy="60" rx="30" ry="42" fill="none" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="1" />
        <path d="M52 82 Q 80 20 110 44" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="52" cy="82" r="3.5" fill={ACCENT} />
        <circle cx="110" cy="44" r="3.5" fill={ACCENT} />
        <circle cx="96" cy="86" r="3" fill={ACCENT} opacity="0.7" />
      </svg>
      <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5 text-accent bg-accent/10">
        <ShieldCheck className="w-2.5 h-2.5" /> Always on
      </span>
    </div>
  )
}

// ── Box 5 — error-reduction bars (purple, descending) ──────────────────────
const BARS_RISING = [34, 46, 40, 58, 52, 70, 64, 82, 96]
const BARS_DOWN = [96, 84, 76, 62, 54, 46, 38, 30, 22]
function BarsVisual({ purple = false }: { purple?: boolean }) {
  const bars = purple ? BARS_DOWN : BARS_RISING
  return (
    <div
      className="h-full w-full rounded-lg border p-3 flex items-end justify-between gap-1.5"
      style={{
        background: purple ? "rgba(139,92,246,0.08)" : "rgba(0,0,0,0.2)",
        borderColor: purple ? "rgba(139,92,246,0.30)" : "var(--border)",
      }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          className="ndl-bar flex-1 rounded-t"
          style={{ height: `${h}%`, background: `linear-gradient(to top, ${ACCENT_DEEP}, ${ACCENT})` }}
        />
      ))}
    </div>
  )
}

function renderVisual(box: Box) {
  switch (box.visual) {
    case "columns": return <ColumnsVisual />
    case "area": return <AreaVisual />
    case "network": return <NetworkVisual />
    case "globe": return <GlobeVisual />
    case "bars": return <BarsVisual purple={!!box.purple} />
  }
}

function Card({ box }: { box: Box }) {
  return (
    <div className={`ndl-card p-4 sm:p-5 flex flex-col ${box.purple ? "ndl-purple" : "glass-card"}`}>
      <div className={`${box.tall ? "h-64 sm:h-80" : "h-40 sm:h-44"} mb-5`}>{renderVisual(box)}</div>
      <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-foreground">{box.title}</h3>
      <p className="text-sm text-foreground/55 mt-2 leading-relaxed">{box.sub}</p>
    </div>
  )
}

export function NumbersDontLie() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      gsap.fromTo(".ndl-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })

      gsap.utils.toArray<HTMLElement>(".ndl-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: (i % 3) * 0.08,
            clearProps: "transform",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" } })
      })

      if (reduce) return

      gsap.utils.toArray<HTMLElement>(".ndl-bar").forEach((bar) => {
        gsap.fromTo(bar,
          { scaleY: 0 },
          { scaleY: 1, transformOrigin: "bottom", duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 95%", toggleActions: "play none none none" } })
      })

      gsap.utils.toArray<SVGPathElement>(".ndl-area-line").forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut",
          scrollTrigger: { trigger: path, start: "top 90%" } })
      })
    }, sectionRef)

    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="ndl-header text-center text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-14 sm:mb-16">
          The Numbers <span className="gradient-text">Don&apos;t Lie.</span>
        </h2>

        {/* Static grid — row 1: 2 boxes, row 2: 3 boxes */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card box={BOXES.time} />
            <Card box={BOXES.budget} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Card box={BOXES.jobs} />
            <Card box={BOXES.coverage} />
            <Card box={BOXES.errors} />
          </div>
        </div>
      </div>

      <style>{`
        .ndl-purple {
          background: linear-gradient(160deg, rgba(139,92,246,0.20), rgba(109,40,217,0.05));
          border: 1px solid rgba(139,92,246,0.40);
          border-radius: 12px;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ndl-purple:hover {
          border-color: rgba(139,92,246,0.75);
          transform: translateY(-4px);
          box-shadow: 0 20px 45px -22px rgba(139,92,246,0.45);
        }
        /* First box — column 1 scrolls up, column 2 scrolls down (seamless) */
        @keyframes ndl-marq-up   { from { transform: translateY(0);    } to { transform: translateY(-50%); } }
        @keyframes ndl-marq-down { from { transform: translateY(-50%); } to { transform: translateY(0);    } }
        .ndl-marq-up   { animation: ndl-marq-up   18s linear infinite; will-change: transform; }
        .ndl-marq-down { animation: ndl-marq-down 18s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .ndl-purple { transition: border-color 0.2s ease; }
          .ndl-purple:hover { transform: none; }
          .ndl-marq-up, .ndl-marq-down { animation: none; }
        }
      `}</style>
    </section>
  )
}
