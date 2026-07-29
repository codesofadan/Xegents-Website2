"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

type Mode = "form" | "sending" | "free_done" | "bank" | "error"

export function MagnetForm({ slug, title, price }: { slug: string; title: string; price: number }) {
  const search = useSearchParams()
  const paidReturn = search.get("paid") === "1"

  const [mode, setMode] = useState<Mode>("form")
  const [error, setError] = useState("")
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [bankInfo, setBankInfo] = useState("")
  const [payMethod, setPayMethod] = useState<"stripe" | "bank">("stripe")

  const isPaid = price > 0

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setMode("sending")
    const form = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/lead-magnet/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: form.get("name"),
          email: form.get("email"),
          agency: form.get("agency"),
          phone: form.get("phone"),
          paymentMethod: payMethod,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Something went wrong")

      if (data.mode === "stripe" && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
        return
      }
      if (data.mode === "bank") {
        setBankInfo(data.bankDetails ?? "")
        setMode("bank")
        return
      }
      setDownloadUrl(data.downloadUrl ?? null)
      setMode("free_done")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setMode("form")
    }
  }

  /* ── Returned from successful Stripe payment ── */
  if (paidReturn) {
    return (
      <div className="glass-card p-8 text-center space-y-4">
        <div className="text-4xl">🎉</div>
        <h2 className="text-xl font-black text-white">Payment received!</h2>
        <p className="text-sm text-white/55 leading-relaxed">
          <strong className="text-white">{title}</strong> is on its way to your inbox right now.
          Check your email (and the spam folder, just in case).
        </p>
      </div>
    )
  }

  /* ── Free flow done ── */
  if (mode === "free_done") {
    return (
      <div className="glass-card p-8 text-center space-y-5">
        <div className="text-4xl">📬</div>
        <h2 className="text-xl font-black text-white">Check your inbox!</h2>
        <p className="text-sm text-white/55 leading-relaxed">
          We&apos;ve emailed <strong className="text-white">{title}</strong> to you.
          It can take a minute — check spam if you don&apos;t see it.
        </p>
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="inline-block px-8 py-3.5 bg-accent text-white rounded-xl text-sm font-bold hover:bg-accent/85 transition-colors"
          >
            Or download it right now ↓
          </a>
        )}
      </div>
    )
  }

  /* ── Bank transfer instructions ── */
  if (mode === "bank") {
    return (
      <div className="glass-card p-8 space-y-5">
        <h2 className="text-xl font-black text-white">Almost there — ${price}</h2>
        <p className="text-sm text-white/55 leading-relaxed">
          Transfer <strong className="text-white">${price}</strong> using the details below.
          As soon as we confirm it, <strong className="text-white">{title}</strong> lands in your inbox.
        </p>
        <div className="bg-white/[0.04] border border-white/10 rounded-lg p-5 text-sm text-white/75 leading-relaxed whitespace-pre-line">
          {bankInfo.replace(/ \| /g, "\n")}
        </div>
        <p className="text-xs text-white/35">Your request is saved — we&apos;ll match your payment to your email automatically.</p>
      </div>
    )
  }

  /* ── The form ── */
  return (
    <form onSubmit={submit} className="glass-card p-8 space-y-5 lg:sticky lg:top-28">
      <div>
        <h2 className="text-xl font-black text-white">
          {isPaid ? `Get it for $${price}` : "Get it free"}
        </h2>
        <p className="text-sm text-white/45 mt-1">
          {isPaid ? "Instant delivery to your email after payment." : "Tell us where to send it."}
        </p>
      </div>

      <Field label="Your name *">
        <input name="name" required placeholder="Ahmed Khan" className={inputCls} />
      </Field>
      <Field label="Email address *">
        <input name="email" type="email" required placeholder="you@agency.com" className={inputCls} />
      </Field>
      <Field label="Agency / company">
        <input name="agency" placeholder="Your agency name" className={inputCls} />
      </Field>
      <Field label="Phone / WhatsApp">
        <input name="phone" placeholder="+92 300 0000000" className={inputCls} />
      </Field>

      {isPaid && (
        <div className="space-y-2">
          <span className="block text-xs font-semibold text-white/45">Pay with</span>
          <div className="grid grid-cols-2 gap-2">
            {([["stripe", "💳 Card (Stripe)"], ["bank", "🏦 Bank transfer"]] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPayMethod(key)}
                className={`py-2.5 rounded-lg text-xs font-bold border transition-colors ${
                  payMethod === key
                    ? "bg-accent/15 border-accent/50 text-white"
                    : "bg-white/[0.04] border-white/10 text-white/45 hover:text-white/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={mode === "sending"}
        className="w-full py-4 bg-accent text-white rounded-xl text-sm font-bold hover:bg-accent/85 transition-colors disabled:opacity-50"
      >
        {mode === "sending" ? "Working…" : isPaid ? (payMethod === "stripe" ? `Pay $${price} & get it →` : "Get bank details →") : "Send it to me →"}
      </button>

      <p className="text-[11px] text-white/30 text-center leading-relaxed">
        No spam, ever. Your info is only used to deliver this and the occasional genuinely useful email.
      </p>
    </form>
  )
}

const inputCls =
  "w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent/60"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-white/45 mb-1.5">{label}</span>
      {children}
    </label>
  )
}
