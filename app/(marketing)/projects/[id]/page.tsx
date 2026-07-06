import { notFound } from "next/navigation"
import { projects } from "@/lib/projects-data"
import { ProjectDetailClient } from "@/components/sections/project-detail-client"

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const project = projects.find(p => p.id === id)
  if (!project) return {}
  return {
    title: `${project.name} — Case Study | Xegents`,
    description: project.headline,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = projects.find(p => p.id === id)
  if (!project) notFound()

  const idx  = projects.indexOf(project)
  const next = projects[(idx + 1) % projects.length]

  return <ProjectDetailClient project={project} next={next} />
}
