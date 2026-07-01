"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote:
      "Before Xegents, my agents were spending 3 hours a day on admin. Now they spend 20 minutes. We closed 31% more deals in Q4 without hiring a single person.",
    name: "Marcus Delgado",
    role: "CEO",
    company: "Westfield Properties",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face",
    stat: "31% more deals, Q4",
  },
  {
    quote:
      "The AI billing audit found $180K in missed claims in the first month. ROI on this engagement was 11× in 90 days. Nothing we've ever invested in came close.",
    name: "Dr. Priya Mehta",
    role: "Director of Operations",
    company: "HealthPlus Group",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80&fit=crop&crop=face",
    stat: "$180K recovered, month 1",
  },
  {
    quote:
      "Our support team was drowning in tickets. The AI agent handles 78% of them automatically now. We scaled from 4K to 9K monthly orders without adding headcount.",
    name: "Ryan Okafor",
    role: "Founder",
    company: "Velocity DTC",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face",
    stat: "2× scale, 0 new hires",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testi-header-el",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
      gsap.utils.toArray<HTMLElement>(".testi-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            delay: i * 0.09,
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="testi-header-el text-xs font-medium text-accent uppercase tracking-widest mb-3">Client Results</p>
            <h2 className="testi-header-el text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
              What founders say <span className="gradient-text">after we ship.</span>
            </h2>
          </div>
          <p className="testi-header-el text-sm text-foreground/45 max-w-xs leading-relaxed">
            Numbers from real engagements. No stock photos, no made-up stats.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testi-card glass-card p-7 flex flex-col justify-between gap-6 hover:border-accent/25 transition-colors">
              {/* Quote */}
              <div>
                <svg className="w-6 h-6 text-accent/40 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium">
                  "{t.quote}"
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-border flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-bold leading-tight">{t.name}</p>
                    <p className="text-xs text-foreground/45 leading-tight">{t.role}, {t.company}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {t.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
