"use client"

import { useRef, useEffect, useState } from "react"

function DatabaseIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"></path>
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"></path>
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  )
}

function BarChart3Icon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="3" x2="12" y2="15"></line>
      <line x1="19" y1="8" x2="19" y2="15"></line>
      <line x1="5" y1="13" x2="5" y2="15"></line>
      <path d="M3 21h18"></path>
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <section ref={sectionRef} className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 rounded-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-muted/60 backdrop-blur-sm pointer-events-none rounded-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-12 sm:mb-16 space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-balance">
            The Problem: Your Profit Is Leaking Through <span className="gradient-text">Invisible Cracks</span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            You hired 10 people for the work that can be done with just 1 AI System
          </p>
        </div>

        <div
          className={`space-y-6 sm:space-y-8 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: inView ? "0.1s" : "0s" }}
        >
          {/* Problem Cards - 4 columns on desktop, responsive on smaller screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {problems.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={`glass-card p-4 sm:p-5 hover:border-accent/40 transition-all group h-full ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    transitionDelay: inView ? `${i * 0.1}s` : "0s",
                    transitionDuration: "0.6s",
                  }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-3 group-hover:from-primary/50 group-hover:to-accent/50 transition-all">
                    <Icon />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Capacity Visualization - Full Width */}
          <div
            className={`relative glass-card p-6 sm:p-8 rounded-2xl overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: inView ? "0.4s" : "0s" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold mb-2">Your Operational Distribution Without AI</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  For every dollar you invest in operations, 28 cents evaporates into system friction, manual handoffs,
                  and processes nobody's optimized in years.
                </p>
              </div>

              <div className="space-y-4">
                {/* Input Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs sm:text-sm font-bold text-muted-foreground">What You Pay For</p>
                    <p className="text-lg sm:text-xl font-bold gradient-text">100%</p>
                  </div>
                  <div className="relative h-10 sm:h-12 bg-muted/40 rounded-lg overflow-hidden border border-accent/20">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500/40 to-blue-500/20"
                      style={{ width: "100%" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold">
                      Input: 100%
                    </div>
                  </div>
                </div>

                {/* Loss Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs sm:text-sm font-bold text-muted-foreground">Lost to Inefficiency</p>
                    <p className="text-lg sm:text-xl font-bold gradient-text">28%</p>
                  </div>
                  <div className="relative h-10 sm:h-12 bg-muted/40 rounded-lg overflow-hidden border border-accent/20">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500/40 to-red-500/20"
                      style={{ width: "28%" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold">
                      Lost: 28%
                    </div>
                  </div>
                </div>

                {/* Output Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs sm:text-sm font-bold text-muted-foreground">Actual Work Output</p>
                    <p className="text-lg sm:text-xl font-bold gradient-text">72%</p>
                  </div>
                  <div className="relative h-10 sm:h-12 bg-muted/40 rounded-lg overflow-hidden border border-accent/20">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500/40 to-green-500/20"
                      style={{ width: "72%" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold">
                      Output: 72%
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
                <div className="p-2 sm:p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-xs text-muted-foreground mb-1">Input</p>
                  <p className="text-lg sm:text-xl font-bold text-blue-400">100%</p>
                </div>
                <div className="p-2 sm:p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <p className="text-xs text-muted-foreground mb-1">Loss</p>
                  <p className="text-lg sm:text-xl font-bold text-red-400">28%</p>
                </div>
                <div className="p-2 sm:p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-xs text-muted-foreground mb-1">Output</p>
                  <p className="text-lg sm:text-xl font-bold text-green-400">72%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
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
