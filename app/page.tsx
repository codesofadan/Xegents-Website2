"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/problem-section"
import { HowWeWork } from "@/components/how-we-work"
import { CaseStudies } from "@/components/case-studies"
import { TechStack } from "@/components/tech-stack"
import { FAQ } from "@/components/faq"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approximately 600px)
      setShowBackToTop(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="w-full bg-background">
      <Header />
      <Hero />
      <ProblemSection />
      <HowWeWork />
      <CaseStudies />
      <TechStack />
      <FAQ />
      <FinalCTA />
      <Footer />

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-primary to-accent rounded-lg hover:shadow-lg hover:shadow-accent/40 transition-all hover:scale-110 z-40 opacity-animation"
          title="Back to top"
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 text-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
      )}

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
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </main>
  )
}
