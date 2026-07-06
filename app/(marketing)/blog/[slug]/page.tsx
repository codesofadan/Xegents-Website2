import { notFound } from "next/navigation"
import Link from "next/link"
import { posts, getPost } from "@/lib/blog-data"

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} | Xegents`, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const idx  = posts.indexOf(post)
  const next = posts[(idx + 1) % posts.length]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: { "@type": "Person", name: "Zain Saeed" },
    publisher: { "@type": "Organization", name: "Xegents" },
  }

  return (
    <div className="min-h-screen">

      {/* ── Article structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <div className="relative h-[50vh] min-h-[360px] max-h-[520px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,5,10,0.3) 0%, rgba(5,5,10,0.92) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end max-w-3xl mx-auto px-6 sm:px-10 pb-12 w-full">
          <Link
            href="/blog"
            className="text-xs text-white/40 hover:text-white/80 transition-colors mb-6 inline-flex items-center gap-1.5 w-fit"
          >
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-accent/80 text-white">
              {post.category}
            </span>
            <span className="text-[11px] text-white/40">{post.date}</span>
            <span className="text-[11px] text-white/40">·</span>
            <span className="text-[11px] text-white/40">{post.readTime}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.06] text-white">
            {post.title}
          </h1>
        </div>
      </div>

      {/* ── Article body ── */}
      <article className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-20">

        {/* Lead paragraph */}
        {post.body.split("\n\n").map((para, i) => (
          <p key={i} className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-6">
            {para}
          </p>
        ))}

        {/* Sections */}
        {post.sections.map((sec) => (
          <section key={sec.heading} className="mt-12">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-5">
              {sec.heading}
            </h2>
            {sec.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-base text-foreground/65 leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </section>
        ))}

      </article>

      {/* ── Divider ── */}
      <div className="border-t border-border max-w-3xl mx-auto mx-0 w-full" />

      {/* ── Next post ── */}
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
        <p className="text-[10px] text-foreground/30 uppercase tracking-[0.18em] mb-4">Next Article</p>
        <Link href={`/blog/${next.slug}`} className="group block">
          <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">{next.category}</p>
          <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white group-hover:text-accent/90 transition-colors leading-snug">
            {next.title}
          </h3>
          <p className="text-sm text-foreground/45 mt-2 group-hover:text-foreground/65 transition-colors">
            {next.excerpt}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent mt-4 group-hover:gap-2 transition-all">
            Read post →
          </span>
        </Link>
      </div>

      {/* ── CTA ── */}
      <div className="border-t border-border">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white mb-1">Want results like these in your business?</p>
            <p className="text-sm text-foreground/40">Book a free 30-minute AI audit — no pitch, just your highest-ROI move.</p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 px-7 py-3 bg-accent text-white rounded-lg font-semibold text-sm hover:bg-accent/85 transition-colors whitespace-nowrap"
          >
            Book a Discovery Call →
          </Link>
        </div>
      </div>

    </div>
  )
}
