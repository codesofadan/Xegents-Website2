"use client"

import { useState, useRef, useEffect } from "react"

function DocumentIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="12" y1="11" x2="12" y2="17"></line>
      <line x1="9" y1="14" x2="15" y2="14"></line>
    </svg>
  )
}

function TrendingIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-3.08-3.08l-4.24-4.24"></path>
    </svg>
  )
}

const caseStudies = {
  "real-estate": {
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
  healthcare: {
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
}

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<"real-estate" | "healthcare">("real-estate")
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const caseData = caseStudies[selectedCase]

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
    <section ref={sectionRef} className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/40" id="case-studies-section">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-balance text-foreground">
            <span className="gradient-text">Real Results</span> From Real Companies
          </h2>
          <p className="text-xs sm:text-lg lg:text-xl text-foreground max-w-2xl mx-auto opacity-100">
            See how organizations across industries unlocks significant operational gains.
          </p>
        </div>

        <div
          className={`flex gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 flex-wrap transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: inView ? "0.2s" : "0s" }}
        >
          {Object.entries(caseStudies).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedCase(key as any)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-base transition-all transform hover:scale-105 ${
                selectedCase === key
                  ? "bg-gradient-to-r from-primary to-accent text-foreground shadow-lg shadow-accent/40 opacity-100"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 opacity-90"
              }`}
            >
              {value.industry}
            </button>
          ))}
        </div>

        <div
          key={selectedCase}
          className={`opacity-animation transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: inView ? "0.3s" : "0s" }}
        >
          <div className="glass-card p-6 sm:p-8 lg:p-12 glow-effect max-w-6xl mx-auto transform transition-all hover:shadow-xl hover:shadow-accent/30">
            {/* Header */}
            <div className="mb-8 space-y-2 border-b border-accent/30 pb-6 opacity-animation">
              <h3 className="text-2xl sm:text-4xl font-bold gradient-text">{caseData.company}</h3>
            </div>

            {/* Reality Section */}
            <div className="mb-10 space-y-3 opacity-animation">
              <h4 className="font-bold text-base sm:text-lg text-red-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                The Reality
              </h4>
              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">{caseData.reality}</p>
            </div>

            {/* Solutions Section */}
            <div className="mb-10 space-y-3 opacity-animation">
              <h4 className="font-bold text-base sm:text-lg text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                What AI Actually Solves
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {caseData.solutions.map((solution, idx) => {
                  const Icon = solution.icon
                  return (
                    <div
                      key={solution.text}
                      className="bg-muted/30 p-3 sm:p-4 rounded-lg border border-accent/20 hover:border-accent/50 hover:bg-muted/40 transition-all hover:translate-y-[-4px] group cursor-pointer opacity-animation"
                      style={{
                        animation: `slideInUp 0.5s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 group-hover:from-primary/50 group-hover:to-accent/50 transition-all">
                          <Icon />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{solution.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Results Section */}
            <div className="pt-8 border-t border-accent/30 opacity-animation">
              <h4 className="font-bold text-base sm:text-lg mb-6 text-accent">Typical Impact</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {caseData.results.map((result, idx) => (
                  <div
                    key={result.label}
                    className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-accent/20 transform transition-all hover:scale-105 opacity-animation"
                    style={{
                      animation: `scaleIn 0.5s ease-out ${idx * 0.1}s both`,
                    }}
                  >
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">{result.label}</p>
                    <p className="text-lg sm:text-3xl font-bold gradient-text">{result.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
