"use client"

import { Hero } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem-section"
import { HowWeWork } from "@/components/sections/how-we-work"
import { VideoShowcase } from "@/components/sections/video-showcase"
import { TapeMarquee } from "@/components/sections/tape-marquee"
import { NumbersDontLie } from "@/components/sections/numbers-dont-lie"
import { ServicesPreview } from "@/components/sections/services-preview"
import { ProjectsMarquee } from "@/components/sections/projects-marquee"
import { Testimonials } from "@/components/sections/testimonials"
import { FounderSection } from "@/components/sections/founder-section"
import { TechStack } from "@/components/sections/tech-stack"
import { FAQ } from "@/components/sections/faq"
import { FinalCTA } from "@/components/sections/final-cta"

export default function Home() {
  return (
    <main className="w-full bg-black/30">
      <Hero />
      <TapeMarquee />
      <ProblemSection />
      <VideoShowcase />
      <HowWeWork />
      <NumbersDontLie />
      <ServicesPreview />
      <ProjectsMarquee />
      <Testimonials />
      <FounderSection />
      <TechStack />
      <FAQ />
      <FinalCTA />
    </main>
  )
}
