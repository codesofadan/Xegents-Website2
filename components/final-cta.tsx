"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect, useRef, useState } from "react"

export function FinalCTA() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ; (async () => {
      const cal = await getCalApi({ namespace: "ai-consultation" })
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-text": "#000000",
            "cal-text-emphasis": "#000000",
            "cal-text-muted": "#333333",
          },
          dark: {
            "cal-text": "#ffffff",
            "cal-text-emphasis": "#ffffff",
            "cal-text-muted": "#cccccc",
          },
        },
      })
    })()
  }, [])

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
    <section id="booking-section" className="py-20 sm:py-28 px-4 sm:px-6 relative border-t border-border" ref={sectionRef}>
      <div className="relative z-10 max-w-5xl mx-auto">
        <div
          className={`space-y-10 sm:space-y-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Book a Call to Discuss <span className="gradient-text">AI Opportunities</span> for your Business
            </h2>
          </div>

          <div
            className="glass-card p-3 sm:p-6 lg:p-8 overflow-hidden transition-all duration-700"
            style={{
              transitionDelay: inView ? "0.2s" : "0s",
            }}
          >
            <div className="w-full rounded-lg overflow-hidden border border-border bg-secondary/50">
              <div className="w-full" style={{ minHeight: "600px" }}>
                <Cal
                  namespace="ai-consultation"
                  calLink="zainsaeeed/ai-consultation"
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                  }}
                  config={{ layout: "month_view" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
