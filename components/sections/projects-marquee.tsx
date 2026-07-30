"use client"

import { useEffect, useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import Link from "next/link"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { projects } from "@/lib/projects-data"
import { useRevealRail } from "@/hooks/use-reveal-rail"
import { useDismiss } from "@/hooks/use-dismiss"

/* ────────────────────────────────────────────────────────────────────────────
   PROOF OF WORK — four shipped systems.

   The cards used to open /projects/[id]. The case-study content is compressed
   into the problem / build pair below and revealed in place, so the site stays
   a single page.

   Same shared-panel pattern as the services section above: one surface beneath
   the row that swaps contents, rather than four cells that grow and shove the
   grid around.
──────────────────────────────────────────────────────────────────────────── */

type Detail = { problem: string; built: string }

/** Compressed from lib/projects-data.ts — the challenge/solution pair per build. */
const DETAILS: Record<string, Detail> = {
  "seo-audit-os": {
    problem:
      "Agencies were burning two to three weeks producing audits that prospects had lost interest in by the time they landed. Inconsistent depth, missed checks, and no way to run them at volume.",
    built:
      "One command crawls the site, pulls Core Web Vitals, Google Business Profile data, SERP citations and domain authority, then dispatches four parallel agent teams across 660 checks — returning a consulting-grade PDF and a prioritised remediation playbook in under ten minutes.",
  },
  "leadgen-system": {
    problem:
      "Manual prospecting, one-off outreach emails written from scratch, and replies falling through the cracks. No system, no consistency, nothing that scaled past one person.",
    built:
      "A five-module pipeline: lead discovery, intel gathering with a free-value PDF generated per prospect, personalised sequence writing, automated sending, and reply detection — all triggered by slash command, with no always-on cloud service to pay for.",
  },
  "blog-os": {
    problem:
      "A single 2026-grade SEO article meant hours of SERP research, fact-checking, schema markup, internal linking and manual WordPress upload — multiplied across every client, every week.",
    built:
      "A ten-agent editorial pipeline behind one command: SERP research, AIO citation mapping, passage-based drafting, critical editing, fact-checking, image generation, schema bundling, internal-link selection by reranking, and a direct WordPress draft. One run, zero manual steps.",
  },
  "copywriting-os": {
    problem:
      "Brands needed constant copy — ads, emails, landing pages, VSLs — but every freelancer and tool produced generic output that missed the voice and came back needing heavy rewrites.",
    built:
      "A brand-voice system that ingests the founder's existing copy, call transcripts and messaging docs to build a proprietary voice profile, then generates on-brand ads, sequences and pages at scale — with a scoring layer that rejects anything under a 90% voice match.",
  },
}

/** Rendered twice so the track can loop seamlessly. */
const TRACK = [...projects, ...projects]

export function ProjectsMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const { activeId, setActiveId, gridRef, rail, isOpen } = useRevealRail()

  // activeId is the slot index — each project appears twice in the track and
  // the rail has to point at the copy actually under the cursor.
  const active = activeId !== null ? projects[Number(activeId) % projects.length] : null
  /* DETAILS is an override keyed by project id, and a mistyped key used to
     blank the whole panel silently — BlogOS shipped empty because its id is
     "blog-os", not "blogos". Falling back to the project's own challenge and
     solution means a missing key degrades to the source copy instead of to
     nothing. */
  const detail = active
    ? DETAILS[active.id] ?? { problem: active.challenge, built: active.solution }
    : null

  const drawerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef)

  /* On touch there is no pointerleave, so without this a tapped panel stays
     open — and because the marquee freezes while it is open, the track would
     stay stopped for the rest of the visit. */
  useDismiss(isOpen, () => setActiveId(null), [gridRef, drawerRef])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projm-header-el",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
      gsap.fromTo(".bento-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, stagger: 0.09, duration: 0.75, ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: ".work-viewport", start: "top 85%" },
        }
      )
    }, sectionRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="scroll-mt-28 py-24 sm:py-32 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="projm-header-el text-xs font-medium text-accent uppercase tracking-widest mb-3">Proof of Work</p>
            <h2 className="projm-header-el text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
              Four systems we&apos;ve <span className="gradient-text">shipped.</span>
            </h2>
          </div>
          <p className="projm-header-el text-sm text-foreground/45 max-w-xs leading-relaxed">
            Real internal + client builds already in production — not concepts.
          </p>
        </div>

        {/* Cards */}
        {/* All four in one drifting line — halts under the cursor, and the
            selection clears the moment you leave. */}
        <div
          ref={gridRef}
          className="work-viewport relative overflow-hidden"
          data-anim={inView ? "on" : "off"}
          data-hold={isOpen ? "true" : "false"}
          onPointerLeave={(e) => { if (e.pointerType !== "touch") setActiveId(null) }}
        >
          <div className="work-track flex w-max gap-4 sm:gap-5">
          {TRACK.map((p, i) => {
            const isActive = String(i) === activeId
            return (
              <button
                key={i}
                type="button"
                data-reveal-id={String(i)}
                aria-hidden={i >= projects.length}
                tabIndex={i >= projects.length ? -1 : 0}
                onPointerEnter={(e) => { if (e.pointerType !== "touch") setActiveId(String(i)) }}
                onFocus={() => setActiveId(String(i))}
                /* Tap toggles. onBlur used to close here, which broke the
                   keyboard path entirely: tabbing INTO the panel to reach its
                   link blurred the card and shut the panel on the way. */
                onClick={() => setActiveId(activeId === String(i) ? null : String(i))}
                aria-expanded={isActive}
                aria-controls="work-detail"
                data-active={isActive}
                className="bento-card glass-card group relative flex w-[min(78vw,320px)] shrink-0 flex-col overflow-hidden p-7 text-left transition-all duration-300 data-[active=true]:border-accent/45 data-[active=true]:-translate-y-1 hover:border-accent/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-[380px] sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-data-[active=true]:opacity-100"
                />

                <div className="relative mb-6 flex items-start justify-between gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                    {p.industry}
                  </span>
                  <span className="select-none text-3xl font-black leading-none text-foreground/10 transition-colors duration-300 group-data-[active=true]:text-accent/25">
                    {p.number}
                  </span>
                </div>

                <h3 className="relative mb-3 text-2xl sm:text-3xl font-black tracking-tighter leading-none text-white">
                  {p.name}
                </h3>
                <p className="relative mb-auto text-sm leading-relaxed text-foreground/55">{p.headline}</p>

                <div className="relative mt-7 flex flex-wrap gap-2 border-t border-border pt-5">
                  {p.results.slice(0, 2).map((r) => (
                    <span
                      key={r.label}
                      className="whitespace-nowrap rounded-full border border-border bg-white/[0.05] px-2.5 py-1 text-[11px] font-bold text-foreground/70"
                    >
                      {r.value} {r.label}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16"
               style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16"
               style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
        </div>

        {/* Drawer — same device as the services section above */}
        <div
          id="work-detail"
          ref={drawerRef}
          role="region"
          aria-live="polite"
          className="reveal-drawer relative mt-5 overflow-hidden rounded-xl border border-border"
        >
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

          <div className="flex min-h-14 items-center px-7 sm:px-9 lg:px-10">
            {active ? (
              <p key={active.id} className="reveal-in text-[11px] font-semibold uppercase tracking-widest text-accent">
                {active.number} — {active.industry}
              </p>
            ) : (
              <p className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-widest text-foreground/35">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/70 [animation:reveal-pulse_1.8s_ease-in-out_infinite]" />
                <span className="pointer-coarse:hidden">Hover a system to read the build</span>
                <span className="hidden pointer-coarse:inline">Tap a system to read the build</span>
              </p>
            )}
          </div>

          <div
            className="grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              {active && detail && (
                <div key={active.id} className="reveal-in grid gap-8 px-7 pb-8 sm:px-9 sm:pb-9 lg:grid-cols-[1fr_1.35fr] lg:gap-14 lg:px-10 lg:pb-10">
                  <div>
                    <p className="text-2xl sm:text-3xl font-black tracking-tighter leading-none text-white">
                      {active.name}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/55">{active.headline}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {active.results.map((r) => (
                        <span
                          key={r.label}
                          className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-bold text-accent"
                        >
                          {r.value} {r.label}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/#booking-section"
                      className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3"
                    >
                      Build something like this <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-foreground/35">The problem</p>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/60">{detail.problem}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-foreground/35">What we built</p>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/60">{detail.built}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {active.tags.map((t) => (
                        <span key={t} className="rounded-md border border-border bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-foreground/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
        /* SEAM. The track is the four cards rendered twice in a flex row with a
           gap, so it has 2n-1 gaps, not 2n. translateX(-50%) therefore stops
           half a gap short of where the second set began and the row visibly
           jumped every 64 seconds — 8px below sm, 10px at sm and up. Shifting
           by half the gap on top of -50% lands exactly on the repeat. */
        @keyframes work-marq {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-50% - var(--work-gap) / 2)); }
        }
        .work-track {
          --work-gap: 16px;
          animation: work-marq 64s linear infinite;
          will-change: transform;
        }
        @media (min-width: 640px) { .work-track { --work-gap: 20px; } }

        /* Declared after the shorthand so they actually win.
           data-hold is the touch path: a tap opens the panel and stops the
           track, so the card you are reading about stays where you tapped it.
           Without it the rail measured once and the track slid out from under
           it within a second. */
        .work-viewport[data-hold="true"] .work-track,
        .work-viewport[data-anim="off"] .work-track { animation-play-state: paused; }
        @media (hover: hover) and (pointer: fine) {
          .work-viewport:hover .work-track { animation-play-state: paused; }
        }
        .reveal-in { animation: reveal-in 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        @media (prefers-reduced-motion: reduce) {
          .reveal-in { animation: none; }
          .work-track { animation: none; }
          .reveal-drawer [style*="grid-template-rows"] { transition: none !important; }
        }
      `}</style>
    </section>
  )
}
