"use client"

import { useRef, useEffect, useState } from "react"
import { WireAnimation } from "@/components/common/wire-animation"

function DatabaseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"></path>
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"></path>
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  )
}

function BarChart3Icon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="3" x2="12" y2="15"></line>
      <line x1="19" y1="8" x2="19" y2="15"></line>
      <line x1="5" y1="13" x2="5" y2="15"></line>
      <path d="M3 21h18"></path>
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
    </svg>
  )
}

export function ProblemSection() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const problems = [
    {
      title: "Fragmented Systems",
      desc: "Your CRM doesn't talk to your project tools. Your team manually re-enters the same customer data 4 times. Nobody notices until an angry client compains",
      icon: DatabaseIcon,
    },
    {
      title: "Process Inefficiencies",
      desc: "Sarah needs Tom's approval. Tom's in meetings. The deal waits 3 days. Multiply by 50 deals. Your competition just closed while you waited for an email reply.",
      icon: ZapIcon,
    },
    {
      title: "Visibility Gaps",
      desc: "Ask your ops manager \"Where are we losing time?\" Watch them guess. They'll tell you what feels slow. We'll show you what's actually bleeding cash.",
      icon: BarChart3Icon,
    },
    {
      title: "Talent Burnout",
      desc: "You hired a $120K analyst to analyze. They spend 20 hours a week formatting spreadsheets which can be done by an AI bot in 30 minutes for just a few bucks.",
      icon: BriefcaseIcon,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-14 sm:mb-20 space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            The Problem: Your Profit Is Leaking Through <span className="gradient-text">Invisible Cracks</span>
          </h2>
          <p className="text-sm sm:text-lg text-foreground/70 max-w-2xl mx-auto">
            You hired 10 people for the work that can be done with just 1 AI System
          </p>
        </div>

        {/* Wire plug-in animation */}
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: inView ? "0.05s" : "0s" }}>
          <WireAnimation />
        </div>

        <div
          className={`space-y-8 sm:space-y-10 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: inView ? "0.15s" : "0s" }}
        >
          {/* Problem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {problems.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={`glass-card p-5 sm:p-6 hover:border-accent/40 transition-all group h-full ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    transitionDelay: inView ? `${i * 0.1}s` : "0s",
                    transitionDuration: "0.6s",
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent">
                    <Icon />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Capacity Visualization */}
          <div
            className={`glass-card p-6 sm:p-8 overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: inView ? "0.4s" : "0s" }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold mb-2 text-foreground">Your Operational Distribution Without AI</h3>
                <p className="text-xs sm:text-sm text-foreground/60 mb-4">
                  For every dollar you invest in operations, 28 cents evaporates into system friction, manual handoffs,
                  and processes nobody's optimized in years.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { label: "Total Investment",   pct: 100, opacity: 0.35 },
                  { label: "Lost to Inefficiency", pct: 28,  opacity: 0.22 },
                  { label: "Actual Work Output",  pct: 72,  opacity: 0.50 },
                ].map(({ label, pct, opacity }) => (
                  <div key={label}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <p className="text-xs sm:text-sm font-medium text-foreground/70">{label}</p>
                      <p className="text-sm font-semibold text-foreground tabular-nums">{pct}%</p>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden border border-border">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: `rgba(147, 51, 234, ${opacity})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary row */}
              <div className="flex gap-6 pt-2 border-t border-border mt-2">
                {[
                  { label: "You invest",   value: "$1.00" },
                  { label: "Goes to waste", value: "¢28"  },
                  { label: "Real output",  value: "¢72"  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] sm:text-xs text-foreground/50 mb-0.5">{label}</p>
                    <p className="text-base sm:text-lg font-bold text-accent">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .opacity-animation {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}
