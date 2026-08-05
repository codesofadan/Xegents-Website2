"use client"

import { useEffect, useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Zap,
  ListChecks,
  DollarSign,
  Users,
  type LucideIcon,
} from "lucide-react"

/* ────────────────────────────────────────────────────────────────────────────
   "The Numbers Don't Lie" — market proof, two boxes.

   EVERY FIGURE IS PUBLISHED INDUSTRY RESEARCH, not a Xegents estimate.

   Box 2 plots McKinsey's own adoption series. It is NOT smoothed into a clean
   ramp: adoption genuinely sat flat around 50% from 2020 to 2023 before it
   broke. The flat years are what make the last three bars land — a market that
   moved further in twenty-four months than in the five years before it.

   The chart builds once, left to right, on scroll. It does not loop. Because
   colour is mapped to height, the sequence naturally deepens as it climbs:
   short early bars read dark, the tall recent ones read bright violet.
──────────────────────────────────────────────────────────────────────────── */

// ── Box 1 — sourced adoption / return metrics ──────────────────────────────
type Metric = {
  icon: LucideIcon
  label: string
  value: string
  note: string
  dir: "up" | "down" // direction of the real figure — never an invented delta
}

const METRICS: Metric[] = [
  { icon: DollarSign, label: "Return",         value: "$3.70",   note: "for every $1 put into AI",  dir: "up" },
  { icon: Clock,      label: "Time back",      value: "2.2 hrs", note: "per worker, every week",    dir: "up" },
  { icon: TrendingUp, label: "Productivity",   value: "+37%",    note: "in AI-augmented roles",     dir: "up" },
  { icon: Users,      label: "Adoption",       value: "88%",     note: "of firms already run AI",   dir: "up" },
  { icon: Zap,        label: "Revenue growth", value: "2.5×",    note: "against non-AI peers",      dir: "up" },
  { icon: ListChecks, label: "Support cost",   value: "−30%",    note: "to run the same desk",      dir: "down" },
]

function MetricTile({ icon: Icon, label, value, note, dir }: Metric) {
  const Arrow = dir === "up" ? ArrowUpRight : ArrowDownRight
  return (
    <div className="mb-2.5 rounded-xl bg-secondary/70 border border-border/70 px-3.5 py-3">
      <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-foreground/45">
        <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
        {label}
      </span>
      <div className="mt-1.5 flex items-center gap-2">
        <p className="text-2xl sm:text-3xl font-black text-foreground leading-none tracking-tight tabular-nums">
          {value}
        </p>
        {/* direction of the real figure — both directions are wins, hence both green */}
        <span className="inline-flex items-center rounded-md border border-emerald-400/20 bg-emerald-400/10 p-0.5">
          <Arrow className="w-3 h-3 text-emerald-400/90" />
        </span>
      </div>
      <p className="mt-1 text-[11px] text-foreground/40 leading-tight">{note}</p>
    </div>
  )
}

function MetricsVisual({ paused }: { paused: string }) {
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
          <div className={`ndl-marq-up flex flex-col ${paused}`}>
            {[...colA, ...colA].map((m, i) => <MetricTile key={i} {...m} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className={`ndl-marq-down flex flex-col ${paused}`}>
            {[...colB, ...colB].map((m, i) => <MetricTile key={i} {...m} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Box 2 — AI adoption across business, McKinsey State of AI ──────────────
type Point = { year: string; value: number }

const ADOPTION: Point[] = [
  { year: "'19", value: 58 },
  { year: "'20", value: 50 },
  { year: "'21", value: 56 },
  { year: "'22", value: 50 },
  { year: "'23", value: 55 },
  { year: "'24", value: 72 },
  { year: "'25", value: 78 },
  { year: "Now", value: 88 },
]

/** Height drives colour: dark violet down low, bright violet at the top — so
 *  the left-to-right build deepens in shade as it climbs. */
function barColor(v: number) {
  const t = Math.min(Math.max((v - 40) / 55, 0), 1)
  const l = 0.34 + t * 0.38
  const c = 0.13 + t * 0.09
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} 292)`
}

function AdoptionClimbVisual() {
  return (
    <div className="relative h-full w-full rounded-lg bg-black/20 border border-border p-3 flex flex-col">
      {/* chart label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] font-semibold uppercase tracking-widest text-foreground/50">
          Businesses using AI
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-widest text-emerald-400/80">
          ↑ 33 pts in 3 yrs
        </span>
      </div>

      {/* plot */}
      <div className="relative flex-1">
        {/* gridlines at 25 / 50 / 75 / 100 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, oklch(1 0 0 / 0.055) 0 1px, transparent 1px 25%)",
          }}
        />

        <div className="absolute inset-0 flex items-end gap-1.5 sm:gap-2">
          {ADOPTION.map((p, i) => {
            const last = i === ADOPTION.length - 1
            return (
              <div key={p.year} className="relative flex-1 h-full flex items-end">
                {/* value callout on the newest reading only — charts label
                    endpoints, not every bar */}
                {last && (
                  <span
                    className="ndl-cap absolute left-1/2 -translate-x-1/2 z-10 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-black tabular-nums text-foreground"
                    style={{ bottom: `calc(${p.value}% + 6px)` }}
                  >
                    {p.value}%
                  </span>
                )}
                <span
                  className="ndl-bar w-full rounded-t-[3px] origin-bottom"
                  style={{
                    height: `${p.value}%`,
                    background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.13) 0 1.5px, transparent 1.5px 4px), linear-gradient(to top, oklch(0.26 0.09 292), ${barColor(p.value)})`,
                    boxShadow: last ? `0 0 16px -2px ${barColor(p.value)}` : "none",
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* year axis */}
      <div className="mt-2 flex gap-1.5 sm:gap-2">
        {ADOPTION.map((p, i) => (
          <span
            key={p.year}
            className={`flex-1 text-center text-[9px] tabular-nums ${
              i === ADOPTION.length - 1 ? "font-bold text-foreground/70" : "text-foreground/35"
            }`}
          >
            {p.year}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Cards ──────────────────────────────────────────────────────────────────

function Card({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="ndl-card glass-card p-4 sm:p-5 flex flex-col">
      <div className="h-64 sm:h-80 mb-5">{children}</div>
      <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-foreground">{title}</h3>
      <p className="text-sm text-foreground/55 mt-2 leading-relaxed">{sub}</p>
    </div>
  )
}

export function NumbersDontLie() {
  const sectionRef = useRef<HTMLElement>(null)

  // Pause the looping metric marquee while the section is off-screen.
  // Pause-gate, so it starts visible: a section already on screen at load must
  // not paint one frame with its marquees stalled.
  const visible = useInView(sectionRef, { initial: true })

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      gsap.fromTo(".ndl-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })

      gsap.utils.toArray<HTMLElement>(".ndl-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: i * 0.1,
            clearProps: "transform",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" } })
      })

      if (reduce) return

      // The chart builds once, left to right, then holds.
      gsap.fromTo(".ndl-bar",
        { scaleY: 0 },
        {
          scaleY: 1, duration: 0.55, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: ".ndl-bar", start: "top 92%", toggleActions: "play none none none" },
        })

      gsap.fromTo(".ndl-cap",
        { opacity: 0, y: 8 },
        {
          opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.85,
          scrollTrigger: { trigger: ".ndl-bar", start: "top 92%", toggleActions: "play none none none" },
        })
    }, sectionRef)

    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  const paused = visible ? "" : "[animation-play-state:paused]"

  return (
    <section
      id="results"
      ref={sectionRef}
      data-anim={visible ? "on" : "off"}
      className="scroll-mt-28 py-24 sm:py-32 px-4 sm:px-6 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8 sm:mb-10">
          <h2 className="ndl-header text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            The Numbers <span className="gradient-text">Don&apos;t Lie.</span>
          </h2>
          <p className="ndl-header mt-4 text-sm text-foreground/45 max-w-xl mx-auto leading-relaxed">
            Published industry research, not our estimates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card
            title="$3.70 Back for Every $1 Put Into AI"
            sub="Measured across 4,000+ businesses already running AI in production. The return stopped being theoretical some time ago."
          >
            <MetricsVisual paused={paused} />
          </Card>

          <Card
            title="From 55% to 88% in Three Years"
            sub="AI adoption sat flat near half the market for five years, then broke. Most of the movement happened after 2023, which is why the cost of waiting is rising, not falling."
          >
            <AdoptionClimbVisual />
          </Card>
        </div>

        <p className="mt-8 text-center text-xs text-foreground/35 leading-relaxed">
          Sources: McKinsey <em>State of AI</em> (2019–2025) · IDC / Microsoft{" "}
          <em>AI Opportunity Study</em> · Federal Reserve Bank of St. Louis
        </p>
      </div>

      <style>{`
        /* Metric marquee — column 1 up, column 2 down */
        @keyframes ndl-marq-up   { from { transform: translateY(0);    } to { transform: translateY(-50%); } }
        @keyframes ndl-marq-down { from { transform: translateY(-50%); } to { transform: translateY(0);    } }
        .ndl-marq-up   { animation: ndl-marq-up   18s linear infinite; will-change: transform; }
        .ndl-marq-down { animation: ndl-marq-down 18s linear infinite; will-change: transform; }
        /* Must come after the shorthand above — the shorthand resets
           animation-play-state, so a utility class on the element loses. */
        [data-anim="off"] .ndl-marq-up,
        [data-anim="off"] .ndl-marq-down { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .ndl-marq-up, .ndl-marq-down { animation: none; }
        }
      `}</style>
    </section>
  )
}
