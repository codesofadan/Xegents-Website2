export const projects = [
  {
    id: "real-estate",
    number: "01",
    industry: "Real Estate",
    client: "Multi-location Agency",
    headline: "Cut admin time by 60% — agents closed 2–3× more deals",
    challenge:
      "Agents spent 35% of their week updating CRMs, chasing signatures, and formatting proposals. High performers were burning out and deals slipped through the gaps.",
    solution:
      "AI pipeline reads contracts, extracts key data, and syncs it across every system automatically. Predictive model flags at-risk deals 5 days before they fall.",
    results: [
      { value: "60%",  label: "Admin time eliminated"    },
      { value: "2–3×", label: "Deals per agent"          },
      { value: "18h",  label: "Saved per agent / week"   },
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&fit=crop&crop=center",
    accent: "#a855f7",
    year: "2024",
  },
  {
    id: "healthcare",
    number: "02",
    industry: "Healthcare",
    client: "Regional Healthcare Group",
    headline: "Recovered $2.1M in missed revenue in 90 days",
    challenge:
      "Staff manually typed patient intake data and caught billing errors only after payer rejection. Revenue leaked quietly across every claim cycle.",
    solution:
      "AI intake captures patient data in seconds and syncs across all systems. A billing AI audits every claim before submission, catching errors and missing codes automatically.",
    results: [
      { value: "60%",   label: "Wait time reduced"      },
      { value: "$2.1M", label: "Revenue recovered"      },
      { value: "38%",   label: "Staff efficiency gain"  },
    ],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80&fit=crop&crop=center",
    accent: "#6366f1",
    year: "2024",
  },
  {
    id: "seo-audit-os",
    number: "03",
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
    number: "04",
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
    number: "05",
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
    number: "06",
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
