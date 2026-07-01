"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: "◎",
    number: "01",
    title: "AI Audit",
    tagline: "Find exactly where AI saves you money.",
    href: "/services#audit",
  },
  {
    icon: "⟳",
    number: "02",
    title: "AI Automation",
    tagline: "Replace repetitive work with systems that run themselves.",
    href: "/services#automation",
  },
  {
    icon: "◈",
    number: "03",
    title: "Custom AI Agents",
    tagline: "GPT-powered agents that work inside your business.",
    href: "/services#agents",
  },
  {
    icon: "⊕",
    number: "04",
    title: "System Integration",
    tagline: "Make all your tools talk to each other.",
    href: "/services#integration",
  },
]

export function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-preview-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
      gsap.utils.toArray<HTMLElement>(".svc-preview-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
          }
        )
      })
    }, sectionRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="svc-preview-header text-xs font-medium text-accent uppercase tracking-widest mb-3">What We Build</p>
            <h2 className="svc-preview-header text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
              Four ways AI <span className="gradient-text">moves your numbers.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="svc-preview-header inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all whitespace-nowrap"
          >
            All services →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc) => (
            <Link key={svc.number} href={svc.href} className="svc-preview-card block group">
              <div className="glass-card p-7 h-full flex flex-col hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl text-accent/60 leading-none select-none">{svc.icon}</span>
                  <span className="text-3xl font-black text-foreground/10 leading-none">{svc.number}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">{svc.title}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed flex-1">{svc.tagline}</p>
                <p className="text-xs text-accent font-semibold mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <span>→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
