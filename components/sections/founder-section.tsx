"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".founder-left",
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      )
      gsap.fromTo(".founder-right",
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Photo */}
        <div className="founder-left order-2 lg:order-1">
          <div className="max-w-sm mx-auto lg:ml-12 lg:mr-0">
            {/* Photo — circular portrait */}
            <div className="relative aspect-square rounded-full overflow-hidden border border-accent/20">
              <Image
                src="/images/zain-img.jpeg"
                alt="Zain Saeed - Founder, Xegents"
                fill
                sizes="(max-width: 1024px) 100vw, 384px"
                className="object-cover"
              />
            </div>

          </div>
        </div>

        {/* Copy */}
        <div className="founder-right order-1 lg:order-2 space-y-6">
          <p className="text-xs font-medium text-accent uppercase tracking-widest">About the Founder</p>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
            Built by someone who's <span className="gradient-text">done it inside businesses.</span>
          </h2>

          <blockquote className="border-l-2 border-accent/40 pl-5 text-base text-foreground/70 italic leading-relaxed">
            "Most AI consultants sell a framework. We sell results with a receipt. Every recommendation comes with a before/after number."
          </blockquote>

          <div className="space-y-4 text-sm sm:text-base text-foreground/65 leading-relaxed">
            <p>
              I'm Zain Saeed — founder of Xegents. I spent two years studying exactly where AI creates measurable ROI inside real businesses, not in whitepapers or demos.
            </p>
            <p>
              I built Xegents to do one thing: find the work your team shouldn't be doing, and hand it to AI. No buzzwords, no fluff — just systems that cut hours and recover revenue.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/in/zainsaeeed/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
            >
              Connect on LinkedIn →
            </a>
            <a
              href="https://www.instagram.com/zainsaeeed/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-foreground hover:gap-3 transition-all"
            >
              Follow on Instagram →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
