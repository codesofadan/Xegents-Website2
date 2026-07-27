"use client"

import { useEffect, useRef, useState } from "react"
import { CalendlyInline } from "@/components/common/calendly-widget"

export function FinalCTA() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="booking-section"
      ref={sectionRef}
      className="scroll-mt-28 py-20 sm:py-28 px-4 sm:px-6 border-t border-border bg-black/30"
    >
      <div className="max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          <div className="text-center mb-10 sm:mb-14 space-y-3">
            <p className="text-xs font-medium text-accent uppercase tracking-widest">Free Discovery Call</p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-balance">
              Book a call to discuss{" "}
              <span className="gradient-text">AI opportunities</span>{" "}
              for your business
            </h2>
            <p className="text-sm text-foreground/55 max-w-md mx-auto">
              30 minutes. No pitch. We'll map your highest-ROI AI move and tell you exactly what to build first.
            </p>
          </div>

          <div
            className="glass-card p-3 sm:p-5"
            style={{ transitionDelay: inView ? "0.15s" : "0s" }}
          >
            <CalendlyInline />
          </div>
        </div>
      </div>
    </section>
  )
}
