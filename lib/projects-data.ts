export const projects = [
  {
    id: "seo-audit-os",
    name: "SEO-AUDIT-OS",
    number: "01",
    industry: "SEO / Local Search",
    client: "Self-Storage Agency",
    headline: "660-point AI audit delivered in minutes — not weeks",
    challenge:
      "SEO agencies were spending 2–3 weeks manually producing audit reports that prospects lose interest in by the time they arrive. Inconsistent depth, missed checks, and zero scalability.",
    solution:
      "Built SEO-AUDIT-OS: a Claude Code slash command that crawls a site, pulls Core Web Vitals, GBP data, SERP citations, and domain authority, then dispatches four parallel AI agent teams across 660 checks to produce a consulting-grade PDF + remediation playbook in minutes.",
    results: [
      { value: "660",    label: "Checks automated"          },
      { value: "~10min", label: "Full audit delivery time"  },
      { value: "4×",     label: "Agent teams in parallel"   },
    ],
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80&fit=crop&crop=center",
    accent: "#f59e0b",
    year: "2025",
  },
  {
    id: "leadgen-system",
    name: "LeadGen OS",
    number: "02",
    industry: "B2B Lead Generation",
    client: "Xegents Internal",
    headline: "End-to-end AI outbound pipeline — discovery to booked call",
    challenge:
      "Manually prospecting, writing one-off outreach emails, and losing track of replies. No system, no consistency, no scale.",
    solution:
      "Five-module AI pipeline: lead discovery, intel gathering + free-value PDF generation per prospect, personalised sequence writing, automated sending, and reply detection — all triggered via Claude Code slash commands with no always-on cloud service needed.",
    results: [
      { value: "5",       label: "Fully automated modules"  },
      { value: "0",       label: "Cloud infra required"     },
      { value: "Phase 3", label: "Complete & deploy-ready"  },
    ],
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80&fit=crop&crop=center",
    accent: "#06b6d4",
    year: "2025",
  },
  {
    id: "blog-os",
    name: "BlogOS",
    number: "03",
    industry: "Content / SEO",
    client: "Multiple WordPress Clients",
    headline: "One slash command. 10 AI agents. A publishable blog post.",
    challenge:
      "Writing a single 2026-grade SEO article required hours of SERP research, fact-checking, schema markup, internal linking, and manual WordPress upload — multiplied across every client, every week.",
    solution:
      "Built BlogOS: a Claude Code slash command that runs a 10-agent editorial pipeline. Agents handle SERP research, AIO citation mapping, passage-based drafting, critical editing, fact-checking, Flux image generation, schema bundle construction, internal link selection via reranking, and direct WordPress Draft publish — one run, zero manual steps.",
    results: [
      { value: "10",       label: "Specialist AI agents"        },
      { value: "Draft→WP", label: "End-to-end publish pipeline" },
      { value: "4",        label: "AI-generated images / post"  },
    ],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80&fit=crop&crop=center",
    accent: "#22c55e",
    year: "2025",
  },
  {
    id: "copywriting-os",
    name: "Copywriting-OS",
    number: "04",
    industry: "Copywriting / Marketing",
    client: "DTC & B2B Brands",
    headline: "Brand-voice AI that writes copy indistinguishable from the founder",
    challenge:
      "Brands needed constant copy — ads, emails, landing pages, VSLs — but every freelancer or tool produced generic output that missed the brand voice and required heavy rewrites.",
    solution:
      "Built a brand-voice AI system: ingests a founder's existing copy, call transcripts, and messaging docs to build a proprietary voice profile, then generates on-brand ads, email sequences, and landing pages at scale — with a scoring layer that rejects anything below a 90% voice-match threshold.",
    results: [
      { value: "90%+",    label: "Voice-match threshold"      },
      { value: "7 types", label: "Copy formats automated"     },
      { value: "10×",     label: "Output speed vs. freelancer" },
    ],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80&fit=crop&crop=center",
    accent: "#e879f9",
    year: "2025",
  },
]

export type Project = (typeof projects)[number]
