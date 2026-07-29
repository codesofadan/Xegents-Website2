"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRevealRail } from "@/hooks/use-reveal-rail"

gsap.registerPlugin(ScrollTrigger)

/* ────────────────────────────────────────────────────────────────────────────
   FOUR WAYS AI MOVES YOUR NUMBERS

   The cards used to navigate to /services#anchor. Everything that page carried
   is compressed into `detail` + `deliverables` below and revealed in place, so
   the site stays a single page.

   ONE SHARED PANEL, NOT FOUR EXPANDING CELLS. Growing a cell inside a 4-column
   grid either stretches the whole row — leaving three columns of dead space —
   or reflows the grid and makes the cards jump. A panel beneath the row is
   always the same object in the same place; only its contents change. Same
   device as the group-companies hub, so the page has one language for this.
──────────────────────────────────────────────────────────────────────────── */

type Service = {
  id: string
  icon: string
  number: string
  title: string
  tagline: string
  detail: string
  deliverables: string[]
}

const SERVICES: Service[] = [
  {
    id: "audit",
    icon: "◎",
    number: "01",
    title: "AI Audit",
    tagline: "Find exactly where AI saves you money.",
    detail:
      "We embed with your team, shadow the real workflows, and time every process. Then we show you the maths — what it costs you now, what AI cuts it to, and which fixes pay for themselves first. No slide deck of possibilities; a ranked list with numbers against it.",
    deliverables: [
      "AI Opportunity Map ranked by ROI",
      "Cost-per-process breakdown",
      "Week-one quick wins",
      "90-day implementation roadmap",
    ],
  },
  {
    id: "automation",
    icon: "⟳",
    number: "02",
    title: "AI Automation",
    tagline: "Replace repetitive work with systems that run themselves.",
    detail:
      "We build automation pipelines on n8n, Make and Zapier that connect the tools you already pay for, remove the manual hand-offs between them, and keep running at 3am without anyone watching. Built with the failure paths handled, not just the happy path.",
    deliverables: [
      "Multi-tool workflow orchestration",
      "Error handling & fallback logic",
      "Real-time monitoring dashboard",
      "Team training & handover",
    ],
  },
  {
    id: "agents",
    icon: "◈",
    number: "03",
    title: "Custom AI Agents",
    tagline: "GPT-powered agents that work inside your business.",
    detail:
      "Not generic chatbots. Agents that know your processes, reach your data, and take real actions on their own — scheduling, drafting, qualifying leads, updating the CRM — with a human checkpoint wherever the decision actually matters.",
    deliverables: [
      "Agents trained on your own data",
      "Tool-use & API integration",
      "Multi-agent coordination",
      "Human-in-the-loop oversight",
    ],
  },
  {
    id: "integration",
    icon: "⊕",
    number: "04",
    title: "System Integration",
    tagline: "Make all your tools talk to each other.",
    detail:
      "Your CRM, project tool, billing and comms are isolated islands, and your team is the ferry between them. We connect them with AI middleware so the data moves by itself — no copy-paste, no re-keying, no gaps where things quietly go missing.",
    deliverables: [
      "CRM ↔ project tool sync",
      "Bidirectional data pipelines",
      "Webhook & API architecture",
      "Single source of truth",
    ],
  },
]

export function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const { activeId, setActiveId, gridRef, rail, isOpen } = useRevealRail()

  const active = activeId !== null ? SERVICES[Number(activeId) % SERVICES.length] : null

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-preview-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
      gsap.fromTo(".svc-preview-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07,
          clearProps: "transform",
          scrollTrigger: { trigger: ".svc-viewport", start: "top 85%", toggleActions: "play none none none" },
        }
      )
    }, sectionRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  return (
    <section id="services" ref={sectionRef} className="scroll-mt-28 pt-24 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="svc-preview-header text-xs font-medium text-accent uppercase tracking-widest mb-3">What We Build</p>
            <h2 className="svc-preview-header text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
              Four ways AI <span className="gradient-text">moves your numbers.</span>
            </h2>
          </div>
          <p className="svc-preview-header text-sm text-foreground/45 max-w-xs leading-relaxed">
            Every engagement starts with the audit — we find the workflows bleeding time, then build the fix.
          </p>
        </div>

        {/* Static grid — four fixed cards. Hovering one reveals its detail in
            the shared drawer below; leaving the grid clears the selection. */}
        <div
          ref={gridRef}
          className="svc-viewport relative"
          onMouseLeave={() => setActiveId(null)}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((svc, i) => {
              const isActive = String(i) === activeId
              return (
                <button
                  key={svc.id}
                  type="button"
                  data-reveal-id={String(i)}
                  onMouseEnter={() => setActiveId(String(i))}
                  onFocus={() => setActiveId(String(i))}
                  onBlur={() => setActiveId(null)}
                  onClick={() => setActiveId(String(i))}
                  aria-expanded={isActive}
                  aria-controls="svc-detail"
                  data-active={isActive}
                  className="svc-preview-card glass-card group flex flex-col p-7 text-left transition-all duration-300 data-[active=true]:border-accent/45 data-[active=true]:-translate-y-1 hover:border-accent/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <span className="select-none text-3xl leading-none text-accent/60">{svc.icon}</span>
                    <span className="select-none text-3xl font-black leading-none text-foreground/10 transition-colors duration-300 group-data-[active=true]:text-accent/25">
                      {svc.number}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold transition-colors duration-300 group-data-[active=true]:text-accent">
                    {svc.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-foreground/55">{svc.tagline}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Drawer. Deliberately NOT a glass-card — it is tinted at the top
            where it meets the row and fades down, so it reads as the card
            above it opened rather than as a fifth card. */}
        <div
          id="svc-detail"
          role="region"
          aria-live="polite"
          className="reveal-drawer relative mt-5 overflow-hidden rounded-xl border border-border"
        >
          {/* Rail — slides to sit under the active card and matches its width */}
          <span
            aria-hidden="true"
            className="absolute top-0 z-10 h-[2px] rounded-full bg-accent transition-all duration-[420ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{
              left: rail.left,
              width: rail.width,
              opacity: isOpen ? 1 : 0,
              boxShadow: "0 0 18px 1px oklch(0.60 0.22 292 / 0.7)",
            }}
          />

          {/* Header row — always present, so the panel never collapses to
              nothing and there is always an affordance to read. */}
          <div className="flex min-h-14 items-center px-7 sm:px-9 lg:px-10">
            {active ? (
              <p key={active.id} className="reveal-in text-[11px] font-semibold uppercase tracking-widest text-accent">
                {active.number} — {active.title}
              </p>
            ) : (
              <p className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-widest text-foreground/35">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/70 [animation:reveal-pulse_1.8s_ease-in-out_infinite]" />
                Hover a service to see what&apos;s inside
              </p>
            )}
          </div>

          {/* Content — grows from nothing on first hover, then stays open */}
          <div
            className="grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              {active && (
                <div key={active.id} className="reveal-in grid gap-8 px-7 pb-8 sm:px-9 sm:pb-9 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:px-10 lg:pb-10">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold tracking-tight leading-snug text-foreground text-balance">
                      {active.tagline}
                    </p>
                    <Link
                      href="/#booking-section"
                      className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3"
                    >
                      Start with this <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  <div>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground/60">{active.detail}</p>
                    <p className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-foreground/35">
                      What you get
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {active.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-foreground/75">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Tinted where it meets the row, fading down — an opened drawer,
           not another card. */
        .reveal-drawer {
          background:
            linear-gradient(to bottom, oklch(0.60 0.22 292 / 0.07), transparent 45%),
            oklch(0.10 0.010 265);
        }
        @keyframes reveal-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes reveal-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.3; transform: scale(0.75); }
        }
        .reveal-in { animation: reveal-in 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        @media (prefers-reduced-motion: reduce) {
          .reveal-in { animation: none; }
          .reveal-drawer [style*="grid-template-rows"] { transition: none !important; }
        }
      `}</style>
    </section>
  )
}
