# Xegents OS - Agency UI Demo (frontend only)

A high-fidelity, fully-navigable UI sketch of the **ideal full-stack digital marketing
agency dashboard**. It expands the original local-SEO portal demo into a blended platform
that covers every channel a digital marketing agency runs: paid ads, organic social, SEO,
content, email/SMS, reputation, plus CRM, reporting, automations, team and billing.

The product brand is **Xegents OS**. The demo agency operating it is **GrowthBoost**,
managing a portfolio of 6 diverse clients (dental group, DTC skincare, B2B SaaS, fitness
chain, restaurant group, self-storage) so every channel is populated with realistic data.

Pure frontend: hardcoded seed data, no backend, no build step. This is a demo of the UI
only. It is not wired to any live data source.

## The thesis it demonstrates

Legacy agency tools either (a) describe data with an AI chat box, or (b) take action but
only inside one channel. Xegents OS is the one place where **AI agents propose real actions
across every channel and a human approves them in a single inbox**. See the **AI Account
Manager** module - the approval queue spans ads, social, SEO, content, email and reviews.

## Modules

- **Command Center** - cross-channel mission control, AI digest, client health grid
- **AI Account Manager** - unified approval inbox for AI-proposed actions across all channels
- **Paid Ads** - Google / Meta / TikTok / LinkedIn, budget pacing, creatives, AI optimizations
- **Social Media** - content calendar, composer, AI content queue, unified inbox, listening
- **SEO & Local** - rank tracking, local grid heatmap, GBP, on-page, backlinks
- **Content** - editorial pipeline kanban, AI drafts, content performance
- **Email & SMS** - campaigns, sequences, deliverability, AI subject/send-time
- **Reputation** - multi-platform reviews, sentiment-tiered AI responses, review requests
- **CRM & Sales** - pipeline kanban, lead scoring, AI follow-ups
- **Clients** - portfolio roster + single-client 360 detail
- **Reporting** - white-label reports, AI narrative, pre-send approval gate
- **Automations** - cross-channel workflow library, run history, templates
- **Team** - roster, workload board, utilization, permissions matrix
- **Settings** - integrations, plan & AI-spend governance, client billing, white-label

## Stack

- Static HTML + vanilla JS (no framework, no bundler)
- Tailwind (Play CDN), Lucide icons, Chart.js from CDN (needs internet on first load)
- Seed data in `data/*.js`, view logic in `assets/pages-*.js`, entry point `index.html` + `app.js`
- Design system in `styles.css` (dark "mission control" theme, emerald accent)

## Run it

Any static file server works. Pick one:

```bash
# Python (zero dependencies)
cd agency-os-ui-demo
python -m http.server 8765
# open http://localhost:8765

# Node
npx serve -l 8765 .
```

**Windows one-click:** double-click `launch-demo.bat`.

## Layout

```
index.html          entry point, loads all data + page scripts in order
app.js              shell: router, sidebar nav, command palette, client/role switchers
styles.css          design system (dark theme, emerald accent)
CONTRACT.md         the build spec every module followed
assets/components.js shared UI builders (cards, tables, kanban, charts helpers)
assets/charts.js    Chart.js config + factories
assets/pages-*.js   one render module per page
data/*.js           hardcoded seed data (clients, channels, per-module data)
```

Built 2026-06-26.
