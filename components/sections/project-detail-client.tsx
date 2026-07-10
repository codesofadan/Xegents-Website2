"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Project } from "@/lib/projects-data"

gsap.registerPlugin(ScrollTrigger)

// ── Architecture diagram renderers ──────────────────────────────────────────

function ParallelDiagram({ steps }: { steps: Project["architectureSteps"] }) {
  const input    = steps.find(s => s.type === "input")
  const parallel = steps.filter(s => s.type === "parallel")
  const synth    = steps.find(s => s.type === "output")
  const final    = steps.find(s => s.type === "final")

  return (
    <div className="flex flex-col items-center gap-4 w-full overflow-x-auto">
      {/* Input */}
      {input && (
        <div className="arch-node bg-white/[0.06] border border-white/15 rounded-lg px-6 py-3 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-wider mb-0.5">{input.label}</p>
          <p className="text-[11px] text-white/40">{input.detail}</p>
        </div>
      )}
      <div className="text-white/25 text-sm">↓</div>

      {/* Parallel team grid */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
        {parallel.map((s, i) => (
          <div key={s.id} className="arch-node bg-white/[0.04] border border-accent/20 rounded-lg p-4">
            <p className="text-[10px] font-mono text-accent/70 uppercase tracking-wider mb-1.5">Team {i + 1}</p>
            <p className="text-sm font-semibold text-white/85 leading-tight mb-2">{s.label}</p>
            <p className="text-[11px] text-white/45 leading-relaxed">{s.detail}</p>
          </div>
        ))}
      </div>
      <div className="text-white/25 text-sm">↓ all teams report to</div>

      {/* Synthesis */}
      {synth && (
        <div className="arch-node w-full max-w-sm bg-accent/10 border border-accent/30 rounded-lg px-6 py-4 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1">{synth.label}</p>
          <p className="text-[11px] text-white/55">{synth.detail}</p>
        </div>
      )}
      {final && (
        <>
          <div className="text-white/25 text-sm">↓</div>
          <div className="arch-node bg-white/[0.06] border border-white/15 rounded-lg px-6 py-3 text-center">
            <p className="text-sm font-bold text-white/90">{final.label}</p>
            <p className="text-[11px] text-white/40 mt-0.5">{final.detail}</p>
          </div>
        </>
      )}
    </div>
  )
}

function SequentialDiagram({ steps }: { steps: Project["architectureSteps"] }) {
  return (
    <div className="flex flex-col gap-0 max-w-2xl w-full">
      {steps.map((s, i) => (
        <div key={s.id} className="arch-node">
          <div className="bg-white/[0.04] border border-white/10 rounded-lg p-5 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 text-xs font-mono text-accent/60 w-6 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-semibold text-white/90 mb-1">{s.label}</p>
                <p className="text-[11px] text-white/45 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex justify-center py-1.5">
              <span className="text-white/20 text-sm">↓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ChainDiagram({ steps }: { steps: Project["architectureSteps"] }) {
  return (
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {steps.map((s, i) => (
          <div key={s.id} className="arch-node bg-white/[0.04] border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 text-[10px] font-mono text-accent/60 bg-accent/8 rounded px-1.5 py-0.5 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-semibold text-white/85 mb-1 leading-tight">{s.label}</p>
                <p className="text-[11px] text-white/40 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LoopDiagram({ steps }: { steps: Project["architectureSteps"] }) {
  const mainSteps = steps.filter(s => s.type !== "loop" && s.type !== "final")
  const loopStep  = steps.find(s => s.type === "loop")
  const finalStep = steps.find(s => s.type === "final")

  return (
    <div className="flex flex-col gap-0 max-w-2xl w-full">
      {mainSteps.map((s, i) => {
        const isDecision = s.type === "decision"
        return (
          <div key={s.id} className="arch-node">
            <div className={`border rounded-lg p-5 ${isDecision
              ? "bg-accent/8 border-accent/30"
              : "bg-white/[0.04] border border-white/10"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                  isDecision ? "bg-accent/20 text-accent" : "bg-white/8 text-white/40"
                }`}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90 mb-1">{s.label}</p>
                  <p className="text-[11px] text-white/45 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            </div>

            {/* After decision node, show the branch */}
            {isDecision && loopStep && (
              <div className="ml-6 mt-2 mb-2 grid grid-cols-2 gap-3">
                <div className="arch-node bg-white/[0.03] border border-white/8 rounded-lg p-3">
                  <p className="text-[10px] font-mono text-white/30 uppercase mb-1">If &lt; 90%</p>
                  <p className="text-xs font-semibold text-white/70 mb-1">{loopStep.label}</p>
                  <p className="text-[10px] text-white/35 leading-relaxed">{loopStep.detail}</p>
                  <p className="text-[10px] text-accent/50 mt-1.5">↺ loops back to step 3</p>
                </div>
                {finalStep && (
                  <div className="arch-node bg-accent/8 border border-accent/25 rounded-lg p-3">
                    <p className="text-[10px] font-mono text-accent/60 uppercase mb-1">If ≥ 90%</p>
                    <p className="text-xs font-semibold text-white/85 mb-1">{finalStep.label}</p>
                    <p className="text-[10px] text-white/40 leading-relaxed">{finalStep.detail}</p>
                  </div>
                )}
              </div>
            )}

            {i < mainSteps.length - 1 && !isDecision && (
              <div className="flex justify-center py-1.5">
                <span className="text-white/20 text-sm">↓</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ArchitectureDiagram({ project }: { project: Project }) {
  if (project.architectureType === "parallel")   return <ParallelDiagram   steps={project.architectureSteps} />
  if (project.architectureType === "sequential") return <SequentialDiagram steps={project.architectureSteps} />
  if (project.architectureType === "chain")      return <ChainDiagram      steps={project.architectureSteps} />
  if (project.architectureType === "loop")       return <LoopDiagram       steps={project.architectureSteps} />
  return null
}

// ── Client quotes (matched to the homepage testimonials) ─────────────────────

const QUOTES: Record<string, { text: string; name: string; role: string }> = {
  "seo-audit-os": {
    text: "The 660-point audit that used to take us two weeks now lands in ten minutes as a consulting-grade PDF. Prospects sign before the competition has even sent their first email.",
    name: "Umer",
    role: "SEO Agency Founder",
  },
  "leadgen-system": {
    text: "From finding the lead to booking the call, the pipeline runs itself — personalised emails, a free-value PDF for every prospect, reply detection. I just show up to the meetings.",
    name: "Hasan",
    role: "B2B Consultant",
  },
  "blog-os": {
    text: "I used to lose entire weekends writing blogs for clients. Now one command runs the whole pipeline — research, drafting, fact-checking, even the WordPress upload. Ten agents doing what my team of three couldn't keep up with.",
    name: "Asim",
    role: "Content Agency Owner",
  },
}

// ── Chapter section wrapper ──────────────────────────────────────────────────

function Chapter({
  number, title, children
}: {
  number: string; title: string; children: React.ReactNode
}) {
  return (
    <div className="chapter-section border-t border-white/[0.07] pt-14 sm:pt-20 pb-14 sm:pb-20">
      {/* Chapter header */}
      <div className="flex items-baseline gap-5 sm:gap-8 mb-10 sm:mb-14">
        <span className="text-7xl sm:text-9xl font-black tracking-tighter text-white/[0.06] leading-none select-none flex-shrink-0">
          {number}
        </span>
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-white/40">
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function ProjectDetailClient({
  project,
  next,
}: {
  project: Project
  next: Project
}) {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero stagger
      gsap.fromTo(".hero-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.75, ease: "power3.out", delay: 0.1 }
      )
      // Chapter reveals
      gsap.utils.toArray<HTMLElement>(".chapter-section").forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        )
      })
      // Architecture nodes stagger
      gsap.fromTo(".arch-node",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".arch-container", start: "top 80%" },
        }
      )
      // Results numbers
      gsap.fromTo(".result-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".results-section", start: "top 82%" },
        }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 sm:px-10 max-w-screen-xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/projects"
          className="hero-el inline-flex items-center gap-2 text-xs text-white/35 hover:text-white/70 transition-colors mb-10"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Projects
        </Link>

        {/* Number + category */}
        <div className="hero-el flex items-center gap-4 mb-6">
          <span className="text-xs font-mono text-white/20 tracking-widest">{project.number}</span>
          <span className="w-px h-4 bg-white/10" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/35">{project.industry}</span>
          <span className="w-px h-4 bg-white/10" />
          <span className="text-xs text-white/25">{project.year}</span>
        </div>

        {/* Project name — the big hero */}
        <h1 className="hero-el text-6xl sm:text-8xl lg:text-[108px] font-black tracking-tighter leading-[0.88] text-white mb-7 max-w-4xl">
          {project.name}<span className="text-accent">.</span>
        </h1>

        {/* Headline */}
        <p className="hero-el text-lg sm:text-2xl text-white/50 leading-relaxed max-w-2xl mb-10 font-light">
          {project.headline}
        </p>

        {/* Tags */}
        <div className="hero-el flex flex-wrap gap-2.5">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/50">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.07] max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-3 divide-x divide-white/[0.07]">
          {project.results.map(r => (
            <div key={r.label} className="px-4 sm:px-10 py-8 sm:py-10 text-center">
              <p className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white mb-1.5">{r.value}</p>
              <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-widest leading-relaxed">{r.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── EDITORIAL CHAPTERS ────────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">

        {/* CHAPTER 01 — THE PROBLEM */}
        <Chapter number="01" title="The Problem">
          <div className="max-w-2xl space-y-5">
            {project.problem.map((para, i) => (
              <p key={i} className="text-base sm:text-lg text-white/60 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Chapter>

        {/* CHAPTER 02 — THE BUILD */}
        <Chapter number="02" title="The Build">
          <div className="max-w-2xl space-y-5">
            {project.buildDetails.map((para, i) => (
              <p key={i} className="text-base sm:text-lg text-white/60 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Chapter>

        {/* CHAPTER 03 — THE ARCHITECTURE */}
        <Chapter number="03" title="The Architecture">
          <p className="text-sm font-semibold text-white/50 mb-8">{project.architectureTitle}</p>
          <div className="arch-container">
            <ArchitectureDiagram project={project} />
          </div>
        </Chapter>

        {/* CHAPTER 04 — THE RESULTS */}
        <Chapter number="04" title="The Results">
          <div className="results-section grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.07]">
            {project.results.map(r => (
              <div key={r.label} className="result-item bg-background/80 px-8 py-10 text-center">
                <p className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-2">{r.value}</p>
                <p className="text-xs text-white/35 uppercase tracking-widest">{r.label}</p>
              </div>
            ))}
          </div>

          {/* Client quote — only for projects with a matched testimonial */}
          {QUOTES[project.id] && (
            <figure className="mt-10 sm:mt-14 max-w-3xl mx-auto text-center">
              <svg className="w-7 h-7 text-accent/40 mx-auto mb-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
              <blockquote className="text-lg sm:text-2xl text-white/75 leading-relaxed font-medium mb-6">
                &ldquo;{QUOTES[project.id].text}&rdquo;
              </blockquote>
              <figcaption className="flex items-center justify-center gap-3">
                <span className="w-9 h-9 rounded-full flex items-center justify-center border border-accent/25 bg-gradient-to-br from-accent/25 to-accent/5 text-accent font-black text-sm">
                  {QUOTES[project.id].name.charAt(0)}
                </span>
                <span className="text-sm text-white/50">
                  <span className="font-bold text-white/80">{QUOTES[project.id].name}</span> · {QUOTES[project.id].role}
                </span>
              </figcaption>
            </figure>
          )}
        </Chapter>

      </div>

      {/* ── CTA STRIP ─────────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.07] max-w-screen-xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="max-w-md">
            <p className="text-xs font-medium text-accent uppercase tracking-widest mb-3">Ready to build yours?</p>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-white leading-tight">
              Book a free 30-minute AI audit. No pitch — just your highest-ROI move.
            </h3>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-8 py-4 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent/85 transition-colors whitespace-nowrap"
          >
            Book a Discovery Call →
          </Link>
        </div>
      </div>

      {/* ── NEXT PROJECT ──────────────────────────────────────────────────── */}
      <Link
        href={`/projects/${next.id}`}
        className="group block border-t border-white/[0.07] max-w-screen-xl mx-auto px-6 sm:px-10 py-14 sm:py-20"
      >
        <p className="text-[10px] text-white/25 uppercase tracking-[0.22em] mb-6">Next Project</p>
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2">{next.number} — {next.industry}</p>
            <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-none group-hover:opacity-75 transition-opacity duration-300">
              {next.name}<span className="text-accent">.</span>
            </h3>
          </div>
          <span className="flex-shrink-0 text-white/20 group-hover:text-white/60 group-hover:translate-x-2 transition-all duration-400 text-3xl sm:text-4xl">
            →
          </span>
        </div>
      </Link>

    </div>
  )
}
