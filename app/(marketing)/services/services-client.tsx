"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: "01",
    title: "AI Audit & Consulting",
    tagline: "Find exactly where AI saves you money.",
    description:
      "We embed with your team, shadow real workflows, and time every process. Then we show you the math — what it costs now, what AI cuts it to, and which fixes pay back first.",
    deliverables: ["AI Opportunity Map ranked by ROI", "Cost-per-process breakdown", "Quick-win list (week-one fixes)", "90-day implementation roadmap"],
    icon: "◎",
  },
  {
    number: "02",
    title: "AI Automation",
    tagline: "Replace repetitive work with systems that run themselves.",
    description:
      "We build automation pipelines using n8n, Make, and Zapier that connect your tools, eliminate manual hand-offs, and run 24/7 without burning out your team.",
    deliverables: ["Multi-tool workflow orchestration", "Error handling & fallback logic", "Real-time monitoring dashboard", "Team training & handover"],
    icon: "⟳",
  },
  {
    number: "03",
    title: "Custom AI Agents",
    tagline: "GPT-powered agents that work inside your business.",
    description:
      "Not generic chatbots. Agents that know your processes, access your data, and take real actions — scheduling, drafting, qualifying leads, updating CRMs — autonomously.",
    deliverables: ["Custom-trained agents on your data", "Tool-use & API integration", "Multi-agent coordination", "Human-in-the-loop oversight layer"],
    icon: "◈",
  },
  {
    number: "04",
    title: "System Integration",
    tagline: "Make all your tools talk to each other.",
    description:
      "Your CRM, project management, billing, and comms are isolated islands. We connect them with AI middleware so data flows automatically — no more copy-paste, no more gaps.",
    deliverables: ["CRM ↔ project tool sync", "Bidirectional data pipelines", "Webhook & API architecture", "Single source of truth setup"],
    icon: "⊕",
  },
]

export function ServicesPageClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.fromTo(".svc-hero-line",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.2 }
      )

      // Service cards
      gsap.utils.toArray<HTMLElement>(".svc-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
          }
        )
      })

      // Deliverable items
      gsap.utils.toArray<HTMLElement>(".svc-deliverable").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 20 },
          {
            opacity: 1, x: 0, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 px-4 sm:px-6 bg-black/30">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="mb-24 sm:mb-32 text-center max-w-3xl mx-auto">
          <p className="svc-hero-line text-xs font-medium text-accent uppercase tracking-widest mb-4">
            What We Build
          </p>
          <h1 className="svc-hero-line text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-6 text-white">
            Four ways we <span className="gradient-text">plug AI</span> into your business
          </h1>
          <p className="svc-hero-line text-base sm:text-lg text-foreground/75 max-w-2xl mx-auto leading-relaxed">
            Every engagement starts with an audit. We find the exact workflows bleeding time and money, then build the systems that fix them.
          </p>
        </div>

        {/* Service sections */}
        <div className="space-y-24 sm:space-y-32">
          {services.map((svc, i) => (
            <div
              key={svc.number}
              className={`svc-card grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              {/* Left: info */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-5xl text-accent/40 font-black leading-none select-none">{svc.number}</span>
                  <div>
                    <div className="text-4xl text-accent mb-1 select-none">{svc.icon}</div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">{svc.title}</h2>
                  <p className="text-accent font-semibold mb-4 text-lg">{svc.tagline}</p>
                  <p className="text-foreground/60 leading-relaxed">{svc.description}</p>
                </div>
              </div>

              {/* Right: deliverables */}
              <div className="glass-card p-8 space-y-4">
                <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-6">What you get</p>
                {svc.deliverables.map((d, di) => (
                  <div key={di} className="svc-deliverable flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                    <p className="text-sm sm:text-base text-foreground/80">{d}</p>
                  </div>
                ))}
                <div className="pt-4 border-t border-border mt-4">
                  <Link
                    href="/#booking-section"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
                  >
                    Get started with this service
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center glass-card p-12 sm:p-16">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-foreground/60 mb-8 max-w-xl mx-auto">
            Start with the AI Audit. We'll map everything and tell you exactly what to build first.
          </p>
          <Link
            href="/#booking-section"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold text-base hover:bg-accent/90 transition-all hover:gap-3"
          >
            Book a free discovery call
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
