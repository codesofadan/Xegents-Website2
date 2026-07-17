import Link from "next/link"
import { connectDB, isDbConfigured } from "@/lib/leadmagnet/db"
import { LeadMagnet } from "@/lib/leadmagnet/models"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Free Tools & Resources | Xegents",
  description:
    "Free (and premium) AI tools, scrapers, and systems from Xegents — grab a lead magnet and see how we build. Delivered straight to your inbox.",
}

export default async function LeadMagnetsPage() {
  let magnets: Array<{ _id: unknown; slug: string; title: string; tagline: string; price: number; bullets: string[] }> = []
  if (isDbConfigured()) {
    try {
      await connectDB()
      magnets = await LeadMagnet.find({ active: true }).sort({ createdAt: -1 }).lean()
    } catch {
      magnets = []
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <p className="text-xs font-medium text-accent uppercase tracking-widest">Free Tools &amp; Resources</p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white">
            Steal our <span className="gradient-text">systems.</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Real tools we use in client work — scrapers, automations, templates. Enter your email and they&apos;re yours.
          </p>
        </div>

        {magnets.length === 0 ? (
          <p className="text-center text-white/35 text-sm">Nothing here yet — check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {magnets.map((m) => (
              <Link
                key={String(m._id)}
                href={`/lead-magnet/${m.slug}`}
                className="group glass-card p-7 flex flex-col gap-4 hover:border-accent/40 transition-colors"
              >
                <span className={`self-start text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  m.price > 0 ? "text-accent bg-accent/10 border-accent/25" : "text-green-400 bg-green-500/10 border-green-500/25"
                }`}>
                  {m.price > 0 ? `$${m.price}` : "FREE"}
                </span>
                <h2 className="text-xl font-black tracking-tight text-white leading-tight group-hover:text-accent transition-colors">
                  {m.title}
                </h2>
                {m.tagline && <p className="text-sm text-white/45 leading-relaxed">{m.tagline}</p>}
                <span className="mt-auto pt-3 text-sm font-semibold text-accent inline-flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  Get it {m.price > 0 ? "now" : "free"} →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
