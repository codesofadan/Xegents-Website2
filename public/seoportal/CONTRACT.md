# Xegents OS UI Demo - Build Contract (read in full before writing code)

This is a **frontend-only, zero-build** hardcoded UI sketch of the ideal full-stack
digital marketing agency dashboard. Pure static HTML/CSS/JS. No framework, no bundler,
no backend. Tailwind + Lucide + Chart.js load from CDN. The agency operating the product
is **GrowthBoost**; the product brand is **Xegents OS**.

You are building **one module**. Do not touch any file other than the two you are told to
create. The shell, router, design system, and shared data already exist and are wired.

## Files you output

- `data/<module>.js` - hardcoded seed data as `window.<UPPER>` globals.
- `assets/pages-<module>.js` - render functions registered on `window.PAGES`.

Both are already referenced by `index.html`. Just create them with the exact names given.

## How a page is registered

```js
// at top of assets/pages-<module>.js
window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};

window.PAGES.ads = function (params) {
  return `... big HTML string ...`;   // return a string, never touch innerHTML yourself
};

// optional: runs after the HTML is in the DOM - use for Chart.js init only
window.PAGES_AFTER.ads = function (params) {
  CHARTS.line('ads-spend-chart', labels, [{ data, borderColor: 'var(--acc)' }]);
};
```

The router wraps non-self-wrapped pages in `px-10 py-9` + `max-w-[1320px]` automatically.
**Self-wrapped pages** (`home`, `approvals`, `client`) must paint their own padding -
wrap your content in `<section class="px-10 py-9"><div class="max-w-[1320px] mx-auto">...</div></section>`
or go full-bleed deliberately.

Read the current scope with `window.STATE.client` (`'all'` or a client id) and
`window.STATE.role`. You may reflect scope (e.g. show all clients vs one), but it is fine
for a sketch to render the same rich view regardless. Navigate with `navigate('route')`.

## Shared data already available (do NOT redefine)

- `window.CLIENTS` - 6 clients. Each: `{id,name,industry,vertical,logoColor,icon,location,locations,mrrUsd,tier,am,status('healthy'|'at_risk'|'critical'),healthScore,nps,startedAt,renewalAt,channels:[],contact:{name,email,phone},kpis:{adSpendUsd,roas,leads,pipelineUsd,reviewsAvg,reviewsNew,rankAvg,socialReach,...},spark:[]}`. Client ids: `lumen` (dental, healthy), `verdant` (DTC skincare e-com, at_risk), `northedge` (B2B SaaS, healthy), `peak` (fitness, healthy), `casaverde` (restaurant, healthy), `atlas` (self-storage, critical).
- `window.getClient(id)`, `window.bookTotal(kpiKey)`.
- `window.CHANNELS` - 6 channels `{id,label,route,icon,color,blurb}`: ads, social, seo, content, email, reputation. `window.getChannel(id)`.
- `window.INTEGRATIONS` - platform connections `{id,name,group,status('connected'|'action'|'disconnected'),accounts,icon,lastSync}`.
- `window.AGENCY` `{name:'GrowthBoost',period:'June 2026',mrrUsd,apiBudgetUsd,apiSpentUsd,...}`.
- `window.USER`, `window.ROLES`, `window.TEAM` (6 members `{id,name,role,avatarColor,email,utilization}`), `window.getTeam(id)`.
- `window.TODAY` = `'2026-06-26'`. Date helpers: `daysAgo(n)`, `daysAhead(n)` return ISO date strings relative to TODAY. `shortDate(s)` -> "Jun 12".

## Helpers you must reuse (in `window.UI` and globals) - do not reinvent

- `UI.pageHeader({title, subtitle, eyebrow, actions:[htmlBtns], stats:[{label,value,delta,deltaLabel,sub,dot,better}]})`
- `UI.statCard(opts)` / `UI.statContent(opts)` - opts as in stats above. `dot` is a status color.
- `UI.card(html, classes)`, `UI.cardTitle({title, subtitle, icon, action})`
- `UI.table({columns:[{label,key,align,mono,render(row)}], rows, onRowClick})`
- `UI.kanban({columns:[{label,statusDot,cards:[],footer}], renderCard(card)})`
- `UI.tag(text, variant)` variants: `acc green amber red sky violet slate`. `UI.pill(text, variant)`.
- `UI.status(text, color)`, `UI.avatar(name, color, size)`, `UI.progressBar(value,max,color,height)`
- `UI.donut({segments:[{value,color}], size, thickness})`, `UI.legend([{color,label,value}])`
- `UI.btn(label,{variant:'primary'|'secondary'|'ghost'|'destructive', icon, onClick, size:'sm'})`
- `UI.searchInput(ph, widthClass)`, `UI.filterPill(label, icon)`, `UI.emptyState({icon,title,body,action})`
- `UI.modal(...)` + `UI.openModal(html)`, `UI.drawerHTML(...)` + `UI.openDrawer(html)`
- `sparkSvg(values, color, w, h)` -> inline area sparkline SVG. `scoreRing(value, color, size)`.
- `heatColor(rank1to20)` -> `{bg,text}` for heatmap cells (use class `heat-cell`).
- `formatMoney(n)` -> "$1,234". `formatPct(n)`, `formatDelta(n)`.
- `CHARTS.line(id,labels,datasets,opts)`, `CHARTS.bar(...)`, `CHARTS.doughnut(id,labels,data,colors,opts)` - call from PAGES_AFTER with a canvas `<canvas id="..." height="...">`.

## Design system (CSS vars + classes) - the ONLY visual vocabulary

Tokens: `--bg-0..5` (near-black surfaces), `--text-1` (warm white) `--text-2` (mid) `--text-3` (dim) `--text-4` (faint), hairlines `--line-1/2`, accent `--acc`/`--acc-bright`/`--acc-soft`/`--acc-line` (emerald #10b981), `--red`(#f43f5e), `--amber`(#f59e0b), `--sky`(#38bdf8), `--violet`(#a78bfa). Radii `--radius-sm/-/lg/xl`.

Classes: `.surface` (card bg) `.surface-hover`, `.h1 .h2 .h3 .eyebrow`, `.num` (tabular nums - use on EVERY number) `.mono`, `.text-1/2/3 .text-acc .text-red ...`, `.btn .btn-primary/secondary/ghost/destructive .btn-sm`, `.input`, `.tag .tag-acc/red/amber/sky/violet`, `.status .status-green/amber/red/sky/violet` (dot+label), `.table`, `.tab .tab.active`, `.kanban-col .kanban-card`, `.heat-cell`, `.bubble .bubble-in/out`, `.funnel-bar`, `kbd`, `[data-tooltip="..."]`.

### Hard visual rules
- **Dark, near-black canvas. Emerald is the ONE brand accent.** Red only for alerts/critical. Amber/sky/violet only as small status dots or tiny tags, never large fills.
- Numbers are the subject: large, `.num`, tight tracking. Labels are small `.eyebrow` uppercase.
- Use `lucide` icons via `<i data-lucide="icon-name" class="size-3.5"></i>`. The router calls `lucide.createIcons()` after render.
- Generous whitespace, hairline borders, restrained. **Consultancy-grade, not flashy. No emojis. No em dash (use a hyphen).**
- Realistic, specific data: real-sounding campaign names, $ figures that ladder up, dates relative to TODAY, believable deltas. Make tables 6-15 rows, not 2. This is a sketch meant to look like a live product mid-quarter.
- Every page: a `UI.pageHeader` with title + 3-4 KPI stats, then 2-3 well-composed sections (tables, cards, charts, kanban). Aim for something a founder would screenshot.

## The AI-hybrid thesis (weave this in where natural)

The product's differentiator: **AI agents take action across channels, humans approve.**
Where it fits your module, surface an "AI proposed / awaiting approval" affordance - e.g. an
AI-suggested action row with Approve / Edit / Dismiss, an "AI draft ready" badge, or a small
"AI optimization" card. Keep humans in the loop. This is the soul of the product.

## v2 - Macro/micro density system (SUPERSEDES the layout guidance above)

The product was restructured into **macro hubs with micro sub-modules**, and the visual target is now **dense, purpose-built, pro-tool** (Linear / Notion / Bloomberg), NOT the "KPI cards + card grid" template. That template is the #1 reason it looked AI-generated. Do not reproduce it.

### Routes & registration
- One page file per macro registers MANY routes: the overview is `window.PAGES['<macro>']`, each sub-module is `window.PAGES['<macro>.<sub>']` (e.g. `PAGES['ads']`, `PAGES['ads.campaigns']`). The macro's data file holds data for ALL its sub-modules.
- For any full-bleed view (workspace, board, calendar, map, split-inbox, dense full-height list), register it: `window.FULLBLEED = window.FULLBLEED || new Set(); window.FULLBLEED.add('ads.campaigns');` - the router then skips the page padding so it goes edge-to-edge. Non-fullbleed routes are auto-padded with `px-8 py-7` (full width, NOT max-width-centered).

### Anti-template rules (hard)
- **No KPI-card band.** Never open a page with a row of 4 equal boxed stat cards. Use `LX.modHead({title, sub, stats, actions})` - its stats render as a quiet inline `stat-rail` (numbers separated by hairlines), not cards. One page may have ONE genuinely hero number; the rest stay quiet.
- **No uniform card-grid.** Each sub-module gets the ONE archetype assigned to it. Adjacent views must look structurally different.
- **Prefer dense over boxed.** Tables/lists (`LX.dataList`) and workspaces beat grids of cards. Real data, many rows (15-40), tabular-nums, sticky headers, inline bars/sparklines.
- Whitespace is intentional, not absent and not excessive. Hierarchy via size/weight/position, not color. Emerald is a signal only.

### LX archetype library (window.LX) - use these
- `LX.modHead({title, sub, stats:[{k,v,delta,deltaUnit}], actions})` - page header + inline stat rail. The standard top of most views.
- `LX.dataList({columns, rows, rowAttrs, cls})` - dense Linear/Notion list. columns: `[{key,label,align:'r',mono,width,sortable,render(row,i)}]`. `rowAttrs(row,i)` returns an attribute string - use it to add `data-action="detail" data-title="..."` for click-to-detail. `cls:'tight'` for extra density.
- `LX.workspace({cols, rail, main, aside})` - multi-pane (list rail + canvas + context). cols e.g. `'300px 1fr 320px'`. Register the route in FULLBLEED.
- `LX.panel({title, actions, body, bare, cls})` - a console/monitor tile (hairline, not glossy). Compose several in a CSS grid for an overview "console".
- `LX.segmented(items:[{id,label}], activeId)` inside `LX.tabwrap(...)` with sibling `[data-pane="id"]` elements - in-view switching (handled by interactions.js). Put class `hidden` on all panes but the first.
- `LX.recordHead({mark, markColor, title, sub, meta:[{k,v}], actions})` - detail/record page header.
- `LX.gallery([tileHtml,...])` + the `.tile` / `.tile-media` classes - creative/library galleries.
- `LX.bar(pct, color)`, `LX.statRail(stats)`, `LX.esc(s)`.
- Plus dense CSS classes: `.dlist`, `.panel`, `.workspace/.ws-rail/.ws-main/.ws-aside/.ws-pad`, `.segmented/.seg-item`, `.toolbar`, `.record-head/.record-mark`, `.doc-canvas/.doc-h1/.doc-p/.doc-block`, `.phone/.phone-screen`, `.gallery/.tile`, `.stat-rail/.stat-cell`, `.bar-track/.bar-fill`, `.cell-spark`.
- Charts still via `CHARTS.*` in `PAGES_AFTER['<macro>.<sub>']` with a `<canvas id>`. Keep charts purposeful and few.

### Interactions (already global via interactions.js)
Every button responds by label automatically; rows/tabs work via `data-action` / `data-tabwrap`. Just author clear labels and add `data-action="detail"` (with `data-title`, optional `data-kv='[["k","v"]]'`) on records, `data-action="modal|menu|confirm|dismiss|navigate"` where specific, and `data-tab`/`data-pane` inside `data-tabwrap` for in-view tabs. Never leave a button unlabeled.

## Definition of done
- Both files parse as valid JS (no syntax errors). Test mentally: balanced backticks/braces.
- `window.PAGES.<route>` is defined and returns a non-empty HTML string.
- No external data calls, no fetch, no imports. Pure strings + the helpers above.
- Visually consistent with the design system. Rich, realistic, pleasant, well-structured.
