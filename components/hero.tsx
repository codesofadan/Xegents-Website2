"use client"

import { AnimatedStars } from "./animated-stars"

export function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking-section")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToCaseStudies = () => {
    const element = document.getElementById("case-studies-section")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <AnimatedStars />

      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto opacity-animation">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <span className="inline-block px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-medium tracking-wide uppercase">
                AI Transformation Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance">
              <span className="text-foreground">We Find The Work Your Team Shouldn't Be Doing, </span>
              <span className="gradient-text">& Assign It To AI.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-foreground/70 leading-relaxed max-w-xl">
              Your team's already doing the work. AI just does it faster, cheaper, and without burning people out. We
              identify where AI creates immediate ROI, then build those systems for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <button
                onClick={scrollToBooking}
                className="px-7 sm:px-8 py-3 bg-foreground text-background rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition-all"
              >
                Schedule Consultation
              </button>
              <button
                onClick={scrollToCaseStudies}
                className="px-7 sm:px-8 py-3 border border-border rounded-lg text-sm sm:text-base font-medium hover:bg-foreground/5 transition-colors text-foreground"
              >
                How it Works
              </button>
            </div>

            <div className="flex flex-wrap gap-8 sm:gap-12 pt-6 sm:pt-10 border-t border-border">
              {[
                { label: "ROI Increase", value: "300%+" },
                { label: "Efficiency Gain", value: "65%+" },
                { label: "Success Rate", value: "98%+" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-xs text-foreground/50 uppercase tracking-wider font-medium">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
