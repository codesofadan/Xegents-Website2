import { notFound } from "next/navigation"
import { connectDB, isDbConfigured } from "@/lib/leadmagnet/db"
import { LeadMagnet } from "@/lib/leadmagnet/models"
import { MagnetForm } from "./magnet-form"

export const dynamic = "force-dynamic"

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (!isDbConfigured()) return {}
  try {
    await connectDB()
    const magnet = await LeadMagnet.findOne({ slug, active: true }).lean()
    if (!magnet) return {}
    return {
      title: `${magnet.title} | Xegents`,
      description: magnet.tagline || magnet.description?.slice(0, 160) || `Get ${magnet.title} from Xegents.`,
    }
  } catch {
    return {}
  }
}

export default async function LeadMagnetPage({ params }: Props) {
  const { slug } = await params
  if (!isDbConfigured()) notFound()

  let magnet
  try {
    await connectDB()
    magnet = await LeadMagnet.findOne({ slug, active: true }).lean()
  } catch {
    notFound()
  }
  if (!magnet) notFound()

  const isPaid = magnet.price > 0

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:pt-32 sm:pb-24 sm:px-6">
      <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">

        {/* ── Left: pitch ── */}
        <div className="space-y-7">
          <div className="flex items-center gap-3">
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
              isPaid ? "text-accent bg-accent/10 border-accent/25" : "text-green-400 bg-green-500/10 border-green-500/25"
            }`}>
              {isPaid ? `$${magnet.price}` : "100% FREE"}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-white/30">Lead Magnet</span>
          </div>

          {/* break-words throughout: every string on this page is author-entered
              from the admin, and a long unbroken one (a URL, a product code, a
              typo) has no break opportunity for the line-breaker to find. On a
              375px screen that pushes the whole page sideways rather than
              wrapping. Wrapping mid-word is the lesser evil. */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white break-words">
            {magnet.title}<span className="text-accent">.</span>
          </h1>

          {magnet.tagline && (
            <p className="text-lg sm:text-xl text-white/55 leading-relaxed break-words">{magnet.tagline}</p>
          )}

          {magnet.description && (
            <p className="text-sm sm:text-base text-white/45 leading-relaxed break-words">{magnet.description}</p>
          )}

          {magnet.bullets?.length > 0 && (
            <div className="glass-card p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">What&apos;s inside</p>
              <ul className="space-y-3">
                {magnet.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                    <span className="min-w-0 break-words">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Right: capture form ── */}
        <MagnetForm slug={magnet.slug} title={magnet.title} price={magnet.price} />
      </div>
    </main>
  )
}
