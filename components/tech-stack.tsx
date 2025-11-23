"use client"

import { useRef, useEffect, useState } from "react"

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  const technologies = [
    {
      name: "Cloud Infrastructure",
      description: "Your systems work from anywhere, scale when you grow, don't crash at 5 AM on Friday.",
      icon: "☁️",
    },
    {
      name: "AI/ML Integration",
      description: "AI handles the repetitive work humans hate. Humans do the strategic work AI can't.",
      icon: "🤖",
    },
    {
      name: "API Architecture",
      description: "Your tools finally talk to each other. Data flows without human intervention.",
      icon: "🔌",
    },
    {
      name: "Real-time Analytics",
      description: "You see the growth in runtime to take relevant actions.",
      icon: "📊",
    },
    {
      name: "Data Security",
      description: "Making sure your data is protected and you don't face any privacy issues.",
      icon: "🔐",
    },
    {
      name: "Automation",
      description: "If your team does it again & again, we automate it.",
      icon: "⚡",
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

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/40" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-balance text-foreground">
            Powered by Modern <span className="gradient-text">Technology</span>
          </h2>
          <p className="text-xs sm:text-lg lg:text-xl text-foreground max-w-2xl mx-auto opacity-100">
            We don't care about buzzwords. We care about what actually works.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 lg:p-12 rounded-3xl overflow-hidden glow-effect bg-muted/60 backdrop-blur-sm transform transition-all hover:shadow-xl hover:shadow-accent/30">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className={`p-4 sm:p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-accent/40 transition-all space-y-3 hover:scale-105 hover:-translate-y-2 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: inView ? `${index * 0.1}s` : "0s",
                  transitionDuration: "0.6s",
                }}
              >
                <div className="text-3xl sm:text-4xl transform transition-transform group-hover:scale-110">
                  {tech.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base text-foreground mb-2">{tech.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                </div>
              </div>
            ))}
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
