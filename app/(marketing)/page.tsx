import { Hero } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem-section"
import { VideoShowcase } from "@/components/sections/video-showcase"
import { TapeMarquee } from "@/components/sections/tape-marquee"
import { NumbersDontLie } from "@/components/sections/numbers-dont-lie"
import { ServicesPreview } from "@/components/sections/services-preview"
import { ParentCompany } from "@/components/sections/parent-company"
import { GroupCompanies } from "@/components/sections/group-companies"
import { GlobalFootprint } from "@/components/sections/global-footprint"
import { ProjectsMarquee } from "@/components/sections/projects-marquee"
import { Testimonials } from "@/components/sections/testimonials"
import { TechStack } from "@/components/sections/tech-stack"
import { FinalCTA } from "@/components/sections/final-cta"

export default function Home() {
  return (
    <main className="w-full bg-black/30">
      <Hero />
      <TapeMarquee />
      <ProblemSection />
      <ServicesPreview />
      <ParentCompany />
      <GlobalFootprint />
      <NumbersDontLie />
      <GroupCompanies />
      <ProjectsMarquee />
      <Testimonials />
      <VideoShowcase />
      <TechStack />
      <FinalCTA />
    </main>
  )
}
