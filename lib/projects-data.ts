export const projects = [
  {
    id:       "seo-audit-os",
    name:     "SEO-AUDIT-OS",
    number:   "01",
    industry: "SEO / Local Search",
    client:   "Self-Storage Agency",
    headline: "660-point AI audit delivered in minutes — not weeks",
    year:     "2025",
    accent:   "#f59e0b",
    image:    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80&fit=crop&crop=center",
    tags:     ["Claude Code", "AI Agents", "Parallel Pipelines", "PDF Generation"],

    challenge:
      "SEO agencies were spending 2–3 weeks manually producing audit reports that prospects lose interest in by the time they arrive. Inconsistent depth, missed checks, and zero scalability.",
    solution:
      "Built SEO-AUDIT-OS: a Claude Code slash command that crawls a site, pulls Core Web Vitals, GBP data, SERP citations, and domain authority, then dispatches four parallel AI agent teams across 660 checks to produce a consulting-grade PDF + remediation playbook in minutes.",

    // Extended editorial content
    problem: [
      "SEO agencies were burning weeks on something that should take hours. A single manual audit meant a human touching 15+ tools, reconciling data from Google Search Console, Screaming Frog, Ahrefs, Google Business Profile, PageSpeed Insights, and half a dozen citation databases — then writing a report that often arrived 2–3 weeks after the prospect first asked.",
      "By the time the audit landed, the window had closed. The prospect had either hired someone else or lost confidence. And the audit itself was only as consistent as the analyst who ran it — different people caught different things. There was no repeatable standard, no scalability, and no way to run audits at the volume a modern agency needs.",
    ],
    buildDetails: [
      "SEO-AUDIT-OS is triggered by a single Claude Code slash command. You hand it a domain. It does the rest. Under the hood, four parallel AI agent teams fan out simultaneously — each owning a distinct audit layer — and report back to a synthesis agent that assembles the final deliverable.",
      "The output is a consulting-grade PDF structured as an executive summary, prioritised remediation playbook, and detailed findings per category. The entire run — from blank URL to delivered PDF — takes under 10 minutes. It's been used across 7 client accounts and has caught critical issues that a human analyst missed on manual review.",
    ],
    architectureType: "parallel" as const,
    architectureTitle: "4 Parallel Agent Teams → Synthesis",
    architectureSteps: [
      { id: "input", label: "Domain URL", detail: "Input + business type", type: "input" as const },
      { id: "t1", label: "Technical Audit", detail: "Core Web Vitals · Crawl depth · Site structure · Page speed · Indexability", type: "parallel" as const },
      { id: "t2", label: "Competitive Intel", detail: "SERP analysis · Top 10 competitors · Content gaps · Citation map · Featured snippets", type: "parallel" as const },
      { id: "t3", label: "Local SEO Audit", detail: "GBP profile · NAP consistency · Review velocity · Local pack position · Citation sources", type: "parallel" as const },
      { id: "t4", label: "Authority Analysis", detail: "Domain rating · Backlink profile · Anchor distribution · Toxic link detection", type: "parallel" as const },
      { id: "synth", label: "Synthesis Agent", detail: "Collects all 660 data points · Scores by impact · Prioritises by effort-to-reward", type: "output" as const },
      { id: "out", label: "PDF + Playbook", detail: "Executive summary · Prioritised fixes · Full findings report", type: "final" as const },
    ],

    results: [
      { value: "660",    label: "Checks automated"          },
      { value: "~10min", label: "Full audit delivery time"  },
      { value: "4×",     label: "Agent teams in parallel"   },
    ],
  },

  {
    id:       "leadgen-system",
    name:     "LeadGen OS",
    number:   "02",
    industry: "B2B Lead Generation",
    client:   "Xegents Internal",
    headline: "End-to-end AI outbound pipeline — discovery to booked call",
    year:     "2025",
    accent:   "#06b6d4",
    image:    "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80&fit=crop&crop=center",
    tags:     ["Claude Code", "AI Agents", "Email Automation", "Lead Intelligence"],

    challenge:
      "Manually prospecting, writing one-off outreach emails, and losing track of replies. No system, no consistency, no scale.",
    solution:
      "Five-module AI pipeline: lead discovery, intel gathering + free-value PDF generation per prospect, personalised sequence writing, automated sending, and reply detection — all triggered via Claude Code slash commands with no always-on cloud service needed.",

    problem: [
      "Every lead was an island. Prospecting meant manually scrolling LinkedIn, copying profiles into a spreadsheet, writing a cold email from scratch, following up by hand, and hoping a reply didn't get buried in inbox noise. The output per hour was low. The consistency was lower.",
      "There was no system that knew a lead's recent activity, their company's pain points, and what piece of free value would actually get them to respond — let alone a system that could write the email, send it at the right time, and flag hot replies automatically. That was the gap we built into.",
    ],
    buildDetails: [
      "LeadGen OS is a 5-module AI pipeline triggered entirely via Claude Code slash commands. No always-on server. No SaaS subscription. You run the commands when you want outbound — the system handles the rest.",
      "Module 2 is the differentiator: it researches each prospect individually, identifies a specific pain point relevant to their role and company stage, and generates a free-value PDF tailored to that pain — sent as the first touchpoint. Response rates go up when the first email contains something genuinely useful. The remaining modules handle sequence writing, sending, and reply management automatically.",
    ],
    architectureType: "sequential" as const,
    architectureTitle: "5 Sequential Modules — No Cloud Infrastructure",
    architectureSteps: [
      { id: "m1", label: "Module 1 — Discovery", detail: "Scrapes LinkedIn & Apollo · Filters by ICP criteria · Exports qualified lead list", type: "step" as const },
      { id: "m2", label: "Module 2 — Intel + PDF", detail: "Researches each lead · Identifies pain point · Generates free-value PDF per prospect", type: "step" as const },
      { id: "m3", label: "Module 3 — Sequence Writer", detail: "Writes 3-touch personalised email sequence per lead · References their specific context", type: "step" as const },
      { id: "m4", label: "Module 4 — Dispatch", detail: "Sends sequences via email API · Respects daily limits · Tracks open & click events", type: "step" as const },
      { id: "m5", label: "Module 5 — Reply Detection", detail: "Monitors inbox · Categorises replies (interested / not now / unsubscribe) · Flags hot leads", type: "step" as const },
    ],

    results: [
      { value: "5",       label: "Fully automated modules"  },
      { value: "0",       label: "Cloud infra required"     },
      { value: "Phase 3", label: "Complete & deploy-ready"  },
    ],
  },

  {
    id:       "blog-os",
    name:     "BlogOS",
    number:   "03",
    industry: "Content / SEO",
    client:   "Multiple WordPress Clients",
    headline: "One slash command. 10 AI agents. A publishable blog post.",
    year:     "2025",
    accent:   "#22c55e",
    image:    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80&fit=crop&crop=center",
    tags:     ["Claude Code", "10 AI Agents", "WordPress API", "Flux Image Generation"],

    challenge:
      "Writing a single 2026-grade SEO article required hours of SERP research, fact-checking, schema markup, internal linking, and manual WordPress upload — multiplied across every client, every week.",
    solution:
      "Built BlogOS: a Claude Code slash command that runs a 10-agent editorial pipeline. Agents handle SERP research, AIO citation mapping, passage-based drafting, critical editing, fact-checking, Flux image generation, schema bundle construction, internal link selection via reranking, and direct WordPress Draft publish — one run, zero manual steps.",

    problem: [
      "A single 2026-grade SEO article isn't a blog post. It's a research project. Ranking today requires SERP analysis, AIO citation awareness, structured data, internal link architecture, original imagery, and source-backed claims — all before you write a word. Manually, that's 4–6 hours per article.",
      "Across 4+ clients producing content every week, that pace was unsustainable. The bottleneck wasn't writing ability — it was the scaffolding required before and after writing that nobody had automated end-to-end.",
    ],
    buildDetails: [
      "BlogOS turns a topic into a published WordPress draft via a single slash command. Ten specialist AI agents fire in sequence — each one receiving the output of the last — completing the full editorial production pipeline without a human hand between steps.",
      "The AIO Mapper (Agent 2) is particularly novel: it identifies what Perplexity, ChatGPT, and Gemini currently cite for the target keyword, then structures the article's passage architecture to win those citations. Agent 10 posts the completed article directly to WordPress as a Draft, with all images uploaded, schema injected, and internal links inserted — ready for a 10-minute human QA before hitting Publish.",
    ],
    architectureType: "chain" as const,
    architectureTitle: "10-Agent Sequential Editorial Pipeline",
    architectureSteps: [
      { id: "a1",  label: "SERP Researcher",       detail: "Analyses top 10 ranking pages · Extracts winning content patterns & word counts", type: "step" as const },
      { id: "a2",  label: "AIO Citation Mapper",   detail: "Identifies what Perplexity & ChatGPT cite · Shapes passage architecture to win AIO", type: "step" as const },
      { id: "a3",  label: "Outline Architect",     detail: "Builds passage-based structure targeting featured snippets & AIO positions", type: "step" as const },
      { id: "a4",  label: "Section Drafter",       detail: "Writes each section in sequence using the approved outline", type: "step" as const },
      { id: "a5",  label: "Critical Editor",       detail: "Reviews for depth, accuracy, redundancy · Returns specific revision notes", type: "step" as const },
      { id: "a6",  label: "Fact Checker",          detail: "Verifies all factual claims against 3 external sources · Flags unverified statements", type: "step" as const },
      { id: "a7",  label: "Flux Image Generator",  detail: "Creates 4 on-brand section images via Flux API · Uploads to media library", type: "step" as const },
      { id: "a8",  label: "Schema Constructor",    detail: "Builds JSON-LD bundle: Article + FAQ + HowTo schemas as applicable", type: "step" as const },
      { id: "a9",  label: "Internal Link Selector",detail: "Reranks existing site content · Selects 3–5 contextually relevant internal links", type: "step" as const },
      { id: "a10", label: "WordPress Publisher",   detail: "Posts draft via WP REST API · Injects schema · Inserts images · Sets metadata", type: "step" as const },
    ],

    results: [
      { value: "10",       label: "Specialist AI agents"        },
      { value: "Draft→WP", label: "End-to-end publish pipeline" },
      { value: "4",        label: "AI-generated images / post"  },
    ],
  },

  {
    id:       "copywriting-os",
    name:     "Copywriting-OS",
    number:   "04",
    industry: "Copywriting / Marketing",
    client:   "DTC & B2B Brands",
    headline: "Brand-voice AI that writes copy indistinguishable from the founder",
    year:     "2025",
    accent:   "#e879f9",
    image:    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80&fit=crop&crop=center",
    tags:     ["AI Agents", "Voice Profiling", "Copy Automation", "Scoring System"],

    challenge:
      "Brands needed constant copy — ads, emails, landing pages, VSLs — but every freelancer or tool produced generic output that missed the brand voice and required heavy rewrites.",
    solution:
      "Built a brand-voice AI system: ingests a founder's existing copy, call transcripts, and messaging docs to build a proprietary voice profile, then generates on-brand ads, email sequences, and landing pages at scale — with a scoring layer that rejects anything below a 90% voice-match threshold.",

    problem: [
      "Brand voice is the hardest thing to delegate. Freelancers studied the brief and still missed it. AI tools generated grammatically correct, completely off-brand output that founders rewrote from scratch anyway. The problem wasn't copy volume — it was that no tool had ever actually learned how a specific founder thinks, what words they avoid, how long their sentences run, what rhythm their paragraphs follow.",
      "The cost of this failure is measured in hours. Every campaign brief, every ad batch, every email sequence routed through a human writer who captured maybe 70% of the voice — then required another round of revision to fix the 30%. At 10× output demand, this isn't a workflow problem. It's a systemic one.",
    ],
    buildDetails: [
      "Copywriting-OS starts with a voice ingestion phase that processes every piece of existing copy a founder has written: ads, emails, landing pages, sales call recordings transcribed via Whisper, messaging frameworks, even Slack messages. This corpus becomes the training set for a proprietary voice profile — 12 analysed dimensions including sentence rhythm, vocabulary register, POV consistency, emotional tonality, and structural patterns.",
      "Once the profile exists, the generation layer can produce any copy format (Facebook ads, cold email sequences, landing pages, VSL scripts, LinkedIn posts) at 10× the speed of a freelancer, with a built-in scoring engine that measures every output against the 12-dimension voice profile. Anything scoring below 90% triggers an automatic revision loop with specific critique — it doesn't output until it passes.",
    ],
    architectureType: "loop" as const,
    architectureTitle: "Voice Ingestion → Generation → Scoring Loop",
    architectureSteps: [
      { id: "p1", label: "Voice Ingestion",    detail: "Processes existing ads · emails · landing pages · call transcripts · messaging docs", type: "step" as const },
      { id: "p2", label: "Profile Builder",    detail: "Extracts 12 voice dimensions: sentence rhythm · vocabulary · POV · tone · structure patterns", type: "step" as const },
      { id: "p3", label: "Generation Layer",   detail: "Produces copy variants for: Facebook ads · Email sequences · Landing pages · VSL scripts · LinkedIn posts", type: "step" as const },
      { id: "p4", label: "Voice Scorer",       detail: "Scores each output across 12 voice-match criteria · Returns 0–100 score per dimension", type: "decision" as const },
      { id: "p5", label: "Revision Loop",      detail: "If score < 90%: generates targeted critique → revises → re-scores automatically", type: "loop" as const },
      { id: "p6", label: "Approved Output",    detail: "All outputs pass 90% voice-match threshold before delivery", type: "final" as const },
    ],

    results: [
      { value: "90%+",    label: "Voice-match threshold"      },
      { value: "7 types", label: "Copy formats automated"     },
      { value: "10×",     label: "Output speed vs. freelancer" },
    ],
  },
]

export type Project = (typeof projects)[number]
export type ArchStep = Project["architectureSteps"][number]
