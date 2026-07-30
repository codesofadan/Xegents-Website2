"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"

function CloudIcon() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-4 4 4 4 0 0 0 3 3.87V17a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4v-2.13A4 4 0 0 0 20 11a4 4 0 0 0-4-4V6a4 4 0 0 0-4-4z"></path>
      <path d="M12 2v20"></path>
      <path d="M8 7h0"></path>
      <path d="M16 7h0"></path>
      <path d="M6 11h0"></path>
      <path d="M18 11h0"></path>
    </svg>
  )
}

function PlugIcon() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22v-5"></path>
      <path d="M9 8V2"></path>
      <path d="M15 8V2"></path>
      <path d="M18 8v5a6 6 0 0 1-12 0V8h12Z"></path>
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18"></path>
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M9 12l2 2 4-4"></path>
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  )
}

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null)

  const technologies = [
    {
      name: "Cloud Infrastructure",
      description: "Your systems work from anywhere, scale when you grow, don't crash at 5 AM on Friday.",
      icon: CloudIcon,
    },
    {
      name: "AI/ML Integration",
      description: "AI handles the repetitive work humans hate. Humans do the strategic work AI can't.",
      icon: BrainIcon,
    },
    {
      name: "API Architecture",
      description: "Your tools finally talk to each other. Data flows without human intervention.",
      icon: PlugIcon,
    },
    {
      name: "Real-time Analytics",
      description: "You see the growth in runtime to take relevant actions.",
      icon: ChartIcon,
    },
    {
      name: "Data Security",
      description: "Making sure your data is protected and you don't face any privacy issues.",
      icon: ShieldIcon,
    },
    {
      name: "Automation",
      description: "If your team does it again & again, we automate it.",
      icon: BoltIcon,
    },
  ]

  const inView = useInView(containerRef, { threshold: 0.1, once: true })

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-border" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-14 sm:mb-20 space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-foreground">
            Powered by Modern <span className="gradient-text">Technology</span>
          </h2>
          <p className="text-sm sm:text-lg text-foreground/70 max-w-2xl mx-auto">
            We don't care about buzzwords. We care about what actually works.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {technologies.map((tech, index) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.name}
                className={`glass-card p-5 sm:p-6 space-y-3 hover:border-accent/30 transition-all ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: inView ? `${index * 0.08}s` : "0s",
                  transitionDuration: "0.6s",
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Icon />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base text-foreground mb-1.5">{tech.name}</p>
                  <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">{tech.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
