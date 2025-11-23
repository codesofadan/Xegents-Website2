"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect, useRef, useState } from "react"

export function FinalCTA() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: "ai-consultation" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
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
    <section id="booking-section" className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 opacity-50"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div
          className={`space-y-8 sm:space-y-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-balance">
              Book a Call to Discuss <span className="gradient-text">AI Opportunities</span> for your Business
            </h2>
          </div>

          <div
            className={`glass-card p-3 sm:p-6 lg:p-8 rounded-2xl overflow-hidden transition-all duration-700`}
            style={{
              transitionDelay: inView ? "0.2s" : "0s",
            }}
          >
            {/* Mobile and Desktop responsive container */}
            <div className="w-full rounded-lg overflow-hidden border border-accent/20 bg-muted/20">
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
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .opacity-animation {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}
