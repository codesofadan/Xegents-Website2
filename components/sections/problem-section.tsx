"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { WireAnimation } from "@/components/common/wire-animation"

export function ProblemSection() {

  const sectionRef = useRef<HTMLDivElement>(null)

  const inView = useInView(sectionRef, { threshold: 0.1, once: true })

  return (
    <section ref={sectionRef} className="pt-20 sm:pt-28 pb-8 sm:pb-10 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-6 sm:mb-10 space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
