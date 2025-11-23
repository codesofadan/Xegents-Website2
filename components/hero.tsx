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

      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto opacity-animation">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/20 text-accent rounded-full text-xs sm:text-sm font-semibold border border-accent/30">
                AI Transformation Partner
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              <span className="text-foreground">We Find The Work Your Team Shouldn't Be Doing, </span>
              <span className="gradient-text">& Assign It To AI.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Your team's already doing the work. AI just does it faster, cheaper, and without burning people out. We
              identify where AI creates immediate ROI, then build those systems for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                onClick={scrollToBooking}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-xs sm:text-base font-bold hover:shadow-lg hover:shadow-accent/40 transition-shadow text-foreground"
              >
                Schedule Consultation
              </button>
              <button
                onClick={scrollToCaseStudies}
                className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-primary rounded-xl text-xs sm:text-base font-bold hover:bg-primary/10 transition-colors text-primary"
              >
                How it Works
              </button>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 pt-4 sm:pt-8">
              {[
                { label: "ROI Increase", value: "300%+" },
                { label: "Efficiency Gain", value: "65%+" },
                { label: "Success Rate", value: "98%+" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
