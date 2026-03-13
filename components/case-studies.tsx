"use client"

import { useRef, useEffect, useState } from "react"

function DocumentIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="12" y1="11" x2="12" y2="17"></line>
      <line x1="9" y1="14" x2="15" y2="14"></line>
    </svg>
  )
}

function TrendingIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-3.08-3.08l-4.24-4.24"></path>
    </svg>
  )
}

const caseStudies = [
  {
    key: "real-estate",
    industry: "Real Estate",
    company: "Real Estate Agencies",
    reality:
      "Agents spend 30-40% of their week on administrative work, updating CRMs, formatting proposals, chasing document signatures, manually tracking deal pipelines. High-performers burn out. New hires take months to ramp up because 'the process is complicated.'",
    solutions: [
      {
        text: "Intelligent document processing - AI reads contracts, extracts key terms, auto-populates deal data across systems",
        icon: DocumentIcon,
      },
      {
        text: "Predictive pipeline management - Machine learning identifies at-risk deals before they fall through",
        icon: TrendingIcon,
      },
      {
        text: "Automated client communication - AI handles follow-ups, scheduling, and routine questions while agents focus on value conversations",
        icon: MessageIcon,
      },
      {
        text: "Smart workflow orchestration - Complex multi-step processes run autonomously with human oversight only where it matters",
        icon: SettingsIcon,
      },
    ],
    results: [
      { label: "Admin Time Reduced", value: "60-70%" },
      { label: "Deals per Agent", value: "2-3x" },
      { label: "Onboarding Time Saved", value: "18h/week" },
    ],
  },
  {
    key: "healthcare",
    industry: "Healthcare",
    company: "Healthcare Organizations",
    reality:
      "Teams were buried in manual intake work. Staff had to type patient details by hand, chase missing info, and juggle schedule changes. Delays stacked up. Billing errors slipped through and cut into revenue. Everyone felt the slowdown, and patients felt it too.",
    solutions: [
      {
        text: "Smart patient intake - AI captures patient info in seconds and syncs it across the system with zero manual typing",
        icon: DocumentIcon,
      },
      {
        text: "Intelligent scheduling - Real-time matching that finds open slots, reduces gaps, and cuts back-and-forth",
        icon: TrendingIcon,
      },
      {
        text: "Automated billing checks - AI flags coding issues, missing data, and claim risks before they hit the payer",
        icon: SettingsIcon,
      },
      {
        text: "End-to-end workflow - Routine steps run on their own while staff focus on care, not paperwork",
        icon: MessageIcon,
      },
    ],
    results: [
      { label: "Wait Time Cut", value: "60%" },
      { label: "Revenue Recovery", value: "+$2.1M" },
      { label: "Staff Efficiency", value: "+38%" },
    ],
  },
]

export function CaseStudies() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
    <section ref={sectionRef} className="py-20 sm:py-28 px-4 sm:px-6 border-t border-border" id="case-studies-section">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-14 sm:mb-20 space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-foreground">
            <span className="gradient-text">Real Results</span> From Real Companies
          </h2>
          <p className="text-sm sm:text-lg text-foreground/70 max-w-2xl mx-auto">
            See how organizations across industries unlock significant operational gains.
          </p>
        </div>

        {/* Both case studies displayed */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {caseStudies.map((caseData, caseIdx) => (
            <div
              key={caseData.key}
              className={`glass-card p-6 sm:p-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: inView ? `${caseIdx * 0.15}s` : "0s" }}
            >
              {/* Header */}
              <div className="mb-6 space-y-1 border-b border-border pb-5">
                <p className="text-xs font-medium text-accent uppercase tracking-wider">{caseData.industry}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">{caseData.company}</h3>
              </div>

              {/* Reality Section */}
              <div className="mb-6 space-y-2">
                <h4 className="font-semibold text-sm text-red-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  The Reality
                </h4>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">{caseData.reality}</p>
              </div>

              {/* Solutions Section */}
              <div className="mb-6 space-y-2">
                <h4 className="font-semibold text-sm text-green-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  What AI Actually Solves
                </h4>
                <div className="grid gap-2">
                  {caseData.solutions.map((solution) => {
                    const Icon = solution.icon
                    return (
                      <div
                        key={solution.text}
                        className="bg-secondary p-3 rounded-lg border border-border"
                      >
                        <div className="flex gap-3 items-start">
                          <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent mt-0.5">
                            <Icon />
                          </div>
                          <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">{solution.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Results Section */}
              <div className="pt-5 border-t border-border">
                <h4 className="font-semibold text-sm mb-4 text-accent">Typical Impact</h4>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {caseData.results.map((result) => (
                    <div
                      key={result.label}
                      className="text-center p-3 rounded-lg bg-secondary border border-border"
                    >
                      <p className="text-[10px] sm:text-xs text-foreground/50 mb-1">{result.label}</p>
                      <p className="text-lg sm:text-2xl font-bold text-foreground">{result.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
