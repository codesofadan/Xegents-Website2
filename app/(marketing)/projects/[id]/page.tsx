import { notFound } from "next/navigation"
import Link from "next/link"
import { projects } from "@/lib/projects-data"

interface Props { params: { id: string } }

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.id)
  if (!project) notFound()

  const p = project
  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]

  return (
    <div className="min-h-screen bg-black/30">

      {/* ── Hero ── */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={p.image} alt={p.industry} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 pb-12 max-w-screen-xl mx-auto">
          <Link href="/projects" className="text-xs text-white/50 hover:text-white transition-colors mb-6 inline-flex items-center gap-1.5">
            ← All Projects
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: p.accent }}>
            {p.industry} · {p.client} · {p.year}
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white max-w-3xl">
            {p.headline}
          </h1>
        </div>
      </div>

      {/* ── Results strip ── */}
      <div className="border-y border-white/8 max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-3 divide-x divide-white/8">
          {p.results.map((r) => (
            <div key={r.label} className="px-6 py-8 text-center">
              <p className="text-3xl sm:text-4xl font-black mb-1" style={{ color: p.accent }}>{r.value}</p>
              <p className="text-xs text-white/40 uppercase tracking-wide">{r.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-20">
        <div className="grid sm:grid-cols-2 gap-12 max-w-3xl">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: p.accent }}>The Challenge</p>
            <p className="text-white/65 leading-relaxed">{p.challenge}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: p.accent }}>Our Solution</p>
            <p className="text-white/65 leading-relaxed">{p.solution}</p>
          </div>
        </div>
      </div>

      {/* ── Next project ── */}
      <div className="border-t border-white/8 max-w-screen-xl mx-auto px-6 sm:px-10 py-16">
        <p className="text-[10px] text-white/28 uppercase tracking-[0.22em] mb-5">Next Project</p>
        <Link
          href={`/projects/${next.id}`}
          className="group inline-flex items-center gap-6"
        >
          <h3
            className="text-4xl sm:text-6xl font-black tracking-tighter transition-all duration-300 group-hover:opacity-70"
            style={{ color: next.accent }}
          >
            {next.industry}
          </h3>
          <span className="text-white/30 group-hover:text-white transition-colors text-xl group-hover:translate-x-1 duration-300">→</span>
        </Link>
      </div>

      {/* ── CTA ── */}
      <div className="border-t border-white/8 max-w-screen-xl mx-auto px-6 sm:px-10 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white font-bold text-lg mb-1">Want results like these?</p>
          <p className="text-white/40 text-sm">Book a free 30-min AI audit — no pitch, just your highest-ROI move.</p>
        </div>
        <Link
          href="/contact"
          className="flex-shrink-0 px-8 py-3.5 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:bg-accent/90 transition-colors whitespace-nowrap"
        >
          Book a Discovery Call →
        </Link>
      </div>

    </div>
  )
}
