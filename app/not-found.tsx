import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page not found | Xegents",
  robots: { index: false, follow: true },
}

/* Xegents is a single page now, so every former route — /services, /projects,
   /blog, /contact, /team — lands here. This page's job is to catch that
   traffic and put it back on the right section rather than dead-end it.

   It lives at the app root, outside the (marketing) group, so it renders
   without the marketing header and footer — hence the self-contained mark. */

const DESTINATIONS = [
  { label: "What we build", href: "/#services", hint: "Audit, automation, agents, integration" },
  { label: "Our work", href: "/#work", hint: "Four systems already in production" },
  { label: "The group", href: "/#group", hint: "Owned by Barion Systems" },
  { label: "Book a call", href: "/#booking-section", hint: "30 minutes, no pitch" },
]

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.60 0.22 292 / 0.18), transparent 65%)",
        }}
      />

      <div className="relative w-full max-w-2xl">
        <Link
          href="/"
          aria-label="Xegents — back to the home page"
          className="inline-block transition-opacity hover:opacity-80"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/xegents-logo.png"
            alt="Xegents"
            width={40}
            height={40}
            className="mx-auto h-9 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>

        <p className="mt-12 text-xs font-medium uppercase tracking-widest text-accent">Error 404</p>
        <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tighter leading-none text-white text-balance">
          That page moved <span className="gradient-text">onto one page.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm sm:text-base leading-relaxed text-foreground/55">
          We consolidated the whole site into a single page. Everything that used to live on its own
          URL is still here — just further down.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="glass-card group flex min-h-16 flex-col justify-center px-5 py-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                {d.label}
                <span
                  aria-hidden="true"
                  className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span className="mt-0.5 text-xs leading-tight text-foreground/45">{d.hint}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/90"
        >
          Back to the top
        </Link>
      </div>
    </main>
  )
}
