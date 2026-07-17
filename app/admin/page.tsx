"use client"

import { useCallback, useEffect, useState } from "react"

/* ── Types ──────────────────────────────────────────────────────────────── */

type Magnet = {
  _id: string
  slug: string
  title: string
  tagline: string
  description: string
  bullets: string[]
  price: number
  fileName: string
  fileSize: number
  externalUrl: string
  active: boolean
  leadCount: number
}

type LeadRow = {
  _id: string
  name: string
  email: string
  agency: string
  phone: string
  status: string
  paymentMethod: string
  createdAt: string
  deliveredAt: string | null
  magnet: { title: string; slug: string; price: number } | null
}

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  free_delivered: { label: "Free · delivered",  cls: "bg-green-500/10 text-green-400 border-green-500/25" },
  paid_delivered: { label: "Paid · delivered",  cls: "bg-green-500/10 text-green-400 border-green-500/25" },
  pending_stripe: { label: "Awaiting card payment", cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/25" },
  pending_bank:   { label: "Awaiting bank transfer", cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/25" },
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [tab, setTab] = useState<"magnets" | "leads">("magnets")
  const [magnets, setMagnets] = useState<Magnet[]>([])
  const [leads, setLeads] = useState<LeadRow[]>([])
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState("")

  const loadAll = useCallback(async () => {
    setLoading(true)
    try {
      const [mRes, lRes] = await Promise.all([fetch("/api/admin/magnets"), fetch("/api/admin/leads")])
      if (mRes.status === 401) { setAuthed(false); return }
      const m = await mRes.json()
      const l = await lRes.json()
      setMagnets(m.magnets ?? [])
      setLeads(l.leads ?? [])
      setAuthed(true)
    } catch (e) {
      setBanner(e instanceof Error ? e.message : "Failed to load")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) { setUsername(""); setPassword(""); loadAll() }
    else setLoginError((await res.json()).error ?? "Login failed")
  }

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" })
    setAuthed(false)
  }

  /* ── Login gate ── */
  if (authed === null) {
    return <div className="min-h-screen grid place-items-center text-white/40 text-sm">Loading…</div>
  }
  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <form onSubmit={login} className="w-full max-w-sm glass-card p-8 space-y-5">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">Xegents Admin</h1>
            <p className="text-sm text-white/40 mt-1">Sign in to continue.</p>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            autoFocus
            className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent/60"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent/60"
          />
          {loginError && <p className="text-xs text-red-400">{loginError}</p>}
          <button type="submit" className="w-full py-3 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/85 transition-colors">
            Sign in →
          </button>
        </form>
      </div>
    )
  }

  /* ── Dashboard ── */
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Admin Dashboard</h1>
          <p className="text-sm text-white/40 mt-1">Lead magnets, leads &amp; deliveries</p>
        </div>
        <button onClick={logout} className="text-xs text-white/40 hover:text-white/80 border border-white/10 rounded-lg px-4 py-2 transition-colors">
          Sign out
        </button>
      </div>

      {banner && (
        <div className="mb-6 text-sm text-yellow-300 bg-yellow-500/10 border border-yellow-500/25 rounded-lg px-4 py-3">
          {banner} <button className="underline ml-2" onClick={() => setBanner("")}>dismiss</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {([["magnets", `Lead Magnets (${magnets.length})`], ["leads", `Leads (${leads.length})`]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === key ? "bg-accent text-white" : "bg-white/[0.05] text-white/50 hover:text-white/80 border border-white/10"
            }`}
          >
            {label}
          </button>
        ))}
        <button onClick={loadAll} disabled={loading} className="ml-auto text-xs text-white/40 hover:text-white/80 px-3">
          {loading ? "Refreshing…" : "↻ Refresh"}
        </button>
      </div>

      {tab === "magnets" ? (
        <MagnetsTab magnets={magnets} onChanged={loadAll} setBanner={setBanner} />
      ) : (
        <LeadsTab leads={leads} onChanged={loadAll} setBanner={setBanner} />
      )}
    </div>
  )
}

/* ── Lead Magnets tab ───────────────────────────────────────────────────── */

function MagnetsTab({ magnets, onChanged, setBanner }: { magnets: Magnet[]; onChanged: () => void; setBanner: (s: string) => void }) {
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/admin/magnets", { method: "POST", body: new FormData(e.currentTarget) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to create")
      setShowForm(false)
      onChanged()
      setBanner(`Created — public page: /lead-magnet/${data.slug}`)
    } catch (err) {
      setBanner(err instanceof Error ? err.message : "Failed to create")
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (m: Magnet) => {
    await fetch(`/api/admin/magnets/${m._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !m.active }),
    })
    onChanged()
  }

  const remove = async (m: Magnet) => {
    if (!confirm(`Delete "${m.title}" and its file? Leads are kept.`)) return
    await fetch(`/api/admin/magnets/${m._id}`, { method: "DELETE" })
    onChanged()
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowForm((v) => !v)}
        className="px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/85 transition-colors"
      >
        {showForm ? "× Cancel" : "+ New Lead Magnet"}
      </button>

      {/* Create form */}
      {showForm && (
        <form onSubmit={create} className="glass-card p-7 grid sm:grid-cols-2 gap-5">
          <Field label="Title *"><input name="title" required placeholder="Google Maps Web Scraper" className={inputCls} /></Field>
          <Field label="Slug (auto from title if empty)"><input name="slug" placeholder="google-web-scraper" className={inputCls} /></Field>
          <Field label="Tagline"><input name="tagline" placeholder="Scrape 1,000 local leads in 10 minutes" className={inputCls} /></Field>
          <Field label="Price in USD (0 = free)"><input name="price" type="number" min={0} step="0.01" defaultValue={0} className={inputCls} /></Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea name="description" rows={3} placeholder="What this is and who it's for…" className={inputCls} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="What's inside — one bullet per line">
              <textarea name="bullets" rows={4} placeholder={"Full source code (Python)\nStep-by-step setup guide\n1-click Google Maps export"} className={inputCls} />
            </Field>
          </div>
          <Field label="Zip file (uploaded to Cloudinary)"><input name="file" type="file" accept=".zip,.rar,.7z,.pdf" className={`${inputCls} file:mr-3 file:rounded file:border-0 file:bg-accent/20 file:text-accent file:px-3 file:py-1 file:text-xs`} /></Field>
          <Field label="…or external file URL (Drive/Dropbox, for big files)"><input name="externalUrl" placeholder="https://drive.google.com/…" className={inputCls} /></Field>
          <div className="sm:col-span-2">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/85 transition-colors disabled:opacity-50">
              {saving ? "Creating…" : "Create Lead Magnet"}
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {magnets.length === 0 && !showForm && (
        <p className="text-sm text-white/35">No lead magnets yet — create your first one.</p>
      )}
      <div className="grid gap-4">
        {magnets.map((m) => (
          <div key={m._id} className="glass-card p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-bold text-white">{m.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m.price > 0 ? "text-accent bg-accent/10 border-accent/25" : "text-green-400 bg-green-500/10 border-green-500/25"}`}>
                  {m.price > 0 ? `$${m.price}` : "FREE"}
                </span>
                {!m.active && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/40 border border-white/10">HIDDEN</span>}
              </div>
              <p className="text-xs text-white/40 mt-1 truncate">
                /lead-magnet/{m.slug} · {m.fileName ? `${m.fileName} (${(m.fileSize / 1024 / 1024).toFixed(1)}MB)` : m.externalUrl ? "external URL" : "⚠ no file"} · {m.leadCount} lead{m.leadCount === 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a href={`/lead-magnet/${m.slug}`} target="_blank" rel="noreferrer" className={btnCls}>View</a>
              <button onClick={() => toggleActive(m)} className={btnCls}>{m.active ? "Hide" : "Publish"}</button>
              <button onClick={() => remove(m)} className={`${btnCls} !text-red-400/70 hover:!text-red-400`}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Leads tab ──────────────────────────────────────────────────────────── */

function LeadsTab({ leads, onChanged, setBanner }: { leads: LeadRow[]; onChanged: () => void; setBanner: (s: string) => void }) {
  const [busy, setBusy] = useState<string | null>(null)

  const deliver = async (l: LeadRow) => {
    setBusy(l._id)
    try {
      const res = await fetch(`/api/admin/leads/${l._id}/deliver`, { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed")
      setBanner(`Delivered to ${l.email}`)
      onChanged()
    } catch (e) {
      setBanner(e instanceof Error ? e.message : "Delivery failed")
    } finally {
      setBusy(null)
    }
  }

  if (leads.length === 0) return <p className="text-sm text-white/35">No leads yet.</p>

  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full text-sm min-w-[760px]">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-white/30 border-b border-white/[0.08]">
            <th className="px-5 py-3.5">Date</th>
            <th className="px-5 py-3.5">Name</th>
            <th className="px-5 py-3.5">Email</th>
            <th className="px-5 py-3.5">Agency</th>
            <th className="px-5 py-3.5">Magnet</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5"></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => {
            const st = STATUS_LABEL[l.status] ?? { label: l.status, cls: "bg-white/10 text-white/50 border-white/10" }
            const pending = l.status === "pending_bank" || l.status === "pending_stripe"
            return (
              <tr key={l._id} className="border-b border-white/[0.05] text-white/70">
                <td className="px-5 py-3.5 whitespace-nowrap text-white/40 text-xs">{new Date(l.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3.5 font-semibold text-white/85">{l.name}</td>
                <td className="px-5 py-3.5"><a className="hover:text-accent" href={`mailto:${l.email}`}>{l.email}</a></td>
                <td className="px-5 py-3.5 text-white/45">{l.agency || "—"}</td>
                <td className="px-5 py-3.5 text-white/45">{l.magnet?.title ?? "—"}</td>
                <td className="px-5 py-3.5"><span className={`text-[10px] font-bold px-2 py-1 rounded-full border whitespace-nowrap ${st.cls}`}>{st.label}</span></td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={() => deliver(l)} disabled={busy === l._id} className={`${btnCls} whitespace-nowrap disabled:opacity-40`}>
                    {busy === l._id ? "Sending…" : pending ? "Mark paid & send" : "Resend file"}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ── Small helpers ──────────────────────────────────────────────────────── */

const inputCls =
  "w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent/60"
const btnCls =
  "text-xs font-semibold text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3.5 py-2 transition-colors"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-white/45 mb-1.5">{label}</span>
      {children}
    </label>
  )
}
