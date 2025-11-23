"use client"

import { useState, useEffect } from "react"

function ChevronDownIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
}

function MagnifyingGlassIcon() {
  return (
    <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  )
}

function ArchitectureIcon() {
  return (
    <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
      <path d="M10 10h4M10 10v4M14 10v4"></path>
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4.5 16.5c-1.5-1.5-2-3.5-2-5.5 0-4 3-7 7-7 2 0 4 .5 5.5 2M19.5 4.5c1.5 1.5 2 3.5 2 5.5 0 4-3 7-7 7-2 0-4-.5-5.5-2"></path>
      <path d="M7 7l10 10"></path>
      <circle cx="7" cy="7" r="2"></circle>
      <circle cx="17" cy="17" r="2"></circle>
    </svg>
  )
}

const steps = [
  {
    number: 1,
    title: "Discovery & AI Audit",
    description: "We don't guess. We measure. We find the exact places AI saves you money.",
    icon: MagnifyingGlassIcon,
    details: [
      "We embed with your team for 2-3 weeks. Not surface-level interviews, actual work shadowing.",
      "We time tasks, map every handoff, find every bottleneck.",
      'Then we show you the math: "This process costs you $76K/year. AI cuts it to $5K."',
      "AI Opportunity Map with workflows & ranked by ROI",
      "Cost breakdown per process with exact savings calculations",
      "Quick wins we can fix in week one",
      "Technology gaps currently costing you capacity",
      "Custom ROI projections for every recommendation",
    ],
  },
  {
    number: 2,
    title: "Strategic Roadmap & Solution Design",
    description: "We build AI systems for YOUR business, not generic templates.",
    icon: ArchitectureIcon,
    details: [
      'No vendor pitches. No "let\'s see what works".',
      "We design custom AI solutions that fit your exact processes.",
      "Every recommendation includes clear math: time saved, money recovered, capacity unlocked.",
      "You approve what makes sense.",
      "Prioritized implementation plan based on impact",
      "AI solution architecture showing how systems work together",
      "Team training strategy to think in automation",
      "Existing systems compatibility with AI",
      "90-day launch timeline with milestones",
    ],
  },
  {
    number: 3,
    title: "Build, Deploy & Train",
    description: "Our dev team builds it. We train your team. We don't disappear after launch.",
    icon: RocketIcon,
    details: [
      "We're in your Slack. We're on your calls.",
      "We build the AI systems, deploy them into your workflow, and train your team until they're autonomous.",
      "Then we monitor, measure, and optimize.",
      "Hands-on implementation building and deploying AI systems",
      "Live team training on using AND improving the system",
      "Real-time performance dashboard tracking what works",
      'Change management handling the "why are we changing" conversations',
    ],
  },
]

export function HowWeWork() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setExpandedStep(null) // This will trigger showing all details in render
      } else {
        setExpandedStep(1) // First one open on mobile
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative" id="how-we-work">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 space-y-4 opacity-animation">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-balance">
            How do we <span className="gradient-text">Leverage AI?</span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our proven three-phase approach delivers measurable results in 90 days
          </p>
        </div>

        <div className="space-y-8 lg:space-y-0">
          <div className="hidden lg:block">
            <div className="relative">
              {/* Step cards without connection line */}
              <div className="grid grid-cols-3 gap-8 relative">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isExpanded = !isMobile ? true : expandedStep === step.number

                  return (
                    <div
                      key={step.number}
                      className="opacity-animation"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                      }}
                    >
                      <div
                        className="glass-card p-6 rounded-2xl cursor-pointer hover:border-accent/60 transition-all group flex flex-col relative z-20"
                        onClick={() => {
                          if (isMobile) {
                            setExpandedStep(expandedStep === step.number ? -1 : step.number)
                          }
                        }}
                      >
                        {/* Icon and number */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent p-3 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-accent/50 transition-all">
                            <Icon />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                            {step.number}
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground flex-grow">{step.description}</p>

                        {/* Expand indicator - hide on desktop since details are always shown */}
                        {isMobile && (
                          <div className="mt-4 flex items-center text-accent text-sm font-medium">
                            <span className="mr-2">{isExpanded ? "Hide Details" : "View Details"}</span>
                            <div
                              className="transition-transform"
                              style={{
                                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                              }}
                            >
                              <ChevronDownIcon />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Expanded details - always show on desktop */}
                      {isExpanded && (
                        <div className="glass-card border-t-2 border-accent/30 p-6 rounded-b-2xl rounded-t-none mt-2 opacity-animation space-y-3 relative z-30">
                          <h4 className="font-semibold text-accent mb-3">Key Deliverables:</h4>
                          <ul className="space-y-2">
                            {step.details.map((detail) => (
                              <li key={detail} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2"></span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="opacity-animation"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div
                    className="glass-card overflow-hidden hover:border-accent/40 transition-all cursor-pointer relative z-10"
                    onClick={() => setExpandedStep(expandedStep === step.number ? -1 : step.number)}
                  >
                    <div className="p-4 sm:p-6">
                      {/* Header with icon */}
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent p-2.5 flex items-center justify-center flex-shrink-0">
                          <Icon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-base sm:text-lg font-bold">{step.title}</h3>
                            <div
                              className="flex-shrink-0 text-accent transition-transform"
                              style={{
                                transform: expandedStep === step.number ? "rotate(180deg)" : "rotate(0deg)",
                              }}
                            >
                              <ChevronDownIcon />
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </div>

                      {expandedStep === step.number && (
                        <div className="border-t border-border mt-4 pt-4 opacity-animation space-y-3 relative z-20">
                          <h4 className="text-sm font-semibold text-accent">Key Deliverables:</h4>
                          <ul className="space-y-2">
                            {step.details.map((detail) => (
                              <li
                                key={detail}
                                className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5"></span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
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
