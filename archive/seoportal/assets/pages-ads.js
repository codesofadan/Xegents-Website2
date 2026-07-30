// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Paid Ads macro - hub + dense micro sub-modules.
//    Each sub-module is its assigned archetype, structurally
//    distinct from its siblings:
//      ads            :: CONSOLE        (panel grid + stat rail)
//      ads.campaigns  :: DENSE LIST     (full-bleed)
//      ads.creative   :: GALLERY
//      ads.audiences  :: DENSE LIST     (full-bleed)
//      ads.budgets    :: PACING CONSOLE
//      ads.search     :: DENSE LIST     (full-bleed)
//    Recommendations are proposed, the team reviews and approves;
//    the change is then pushed to the ad platform.
//    ============================================================ */
//
// window.PAGES = window.PAGES || {};
// window.PAGES_AFTER = window.PAGES_AFTER || {};
// window.FULLBLEED = window.FULLBLEED || new Set();
// window.FULLBLEED.add('ads.campaigns');
// window.FULLBLEED.add('ads.audiences');
// window.FULLBLEED.add('ads.search');
//
// (function () {
//   const A = () => window.ADS;
//
//   // ---- shared lookups ----
//   const PLAT = {
//     google:    { label: 'Google',    color: '#38bdf8' },
//     meta:      { label: 'Meta',      color: '#6366f1' },
//     tiktok:    { label: 'TikTok',    color: '#a78bfa' },
//     linkedin:  { label: 'LinkedIn',  color: '#10b981' },
//     microsoft: { label: 'Microsoft', color: '#f59e0b' },
//   };
//   const platLabel = (id) => (PLAT[id] || {}).label || id;
//   const platColor = (id) => (PLAT[id] || {}).color || 'var(--text-3)';
//   const clientName = (id) => (window.getClient(id) || {}).name || id;
//   const clientColor = (id) => (window.getClient(id) || {}).logoColor || '#10b981';
//   const clientIcon = (id) => (window.getClient(id) || {}).icon || 'circle';
//   const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');
//   const sevColor = { high: 'var(--red)', med: 'var(--amber)', low: 'var(--text-3)' };
//   const statusDot = (s) => s === 'active' ? 'green' : s === 'learning' || s === 'building' ? 'amber' : 'slate';
//   const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
//   const roasCls = (r) => r >= 4 ? 'text-acc' : r > 0 && r < 2.5 ? 'text-red' : 'text-1';
//
//   // platform dot + label cell
//   const platCell = (id) => `<span class="flex items-center gap-1.5"><span class="size-1.5 rounded-full shrink-0" style="background:${platColor(id)}"></span><span class="text-[12px] text-2">${platLabel(id)}</span></span>`;
//   // client dot + name cell
//   const clientCell = (id) => `<span class="flex items-center gap-2"><span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(id)}"></span><span class="text-[12px] text-2 truncate">${clientName(id)}</span></span>`;
//
//   // sub-nav tab strip shared across the macro (links between sub-modules)
//   function subNav(active) {
//     const items = [
//       { id: 'ads',           label: 'Overview' },
//       { id: 'ads.campaigns', label: 'Campaigns' },
//       { id: 'ads.creative',  label: 'Creative' },
//       { id: 'ads.audiences', label: 'Audiences' },
//       { id: 'ads.budgets',   label: 'Budget & pacing' },
//       { id: 'ads.search',    label: 'Search terms' },
//     ];
//     return `<div class="flex items-center gap-1 mb-5 -mt-1 flex-wrap">${items.map(it =>
//       `<button class="px-2.5 py-1 rounded-md text-[12px] font-medium ${it.id === active ? 'text-1' : 'text-3 hover:text-1'}" ${it.id === active ? 'style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"' : ''} data-action="navigate" data-route="${it.id}">${it.label}</button>`
//     ).join('')}</div>`;
//   }
//
//   // ====================================================================
//   // PAGES.ads :: CONSOLE - pacing / performance monitor wall
//   // ====================================================================
//   window.PAGES.ads = function () {
//     const a = A(); const k = a.kpis;
//
//     const header = LX.modHead({
//       title: 'Paid Ads',
//       sub: 'Search, social and programmatic across 17 ad accounts and 6 clients - ' + window.AGENCY.period + ', month to date.',
//       stats: [
//         { k: 'Spend MTD',   v: formatMoney(k.spendMtdUsd),  delta: k.spendDelta, deltaUnit: '%' },
//         { k: 'Blended ROAS', v: k.blendedRoas.toFixed(1) + 'x', delta: k.roasDelta, deltaUnit: 'x' },
//         { k: 'Conversions', v: k.conversions.toLocaleString(), delta: k.convDelta, deltaUnit: '%' },
//         { k: 'Avg CPA',     v: formatMoney(k.avgCpaUsd),    delta: k.cpaDelta, deltaUnit: '%' },
//         { k: 'Pacing over', v: k.pacingOver + ' / ' + k.pacingTotal },
//       ],
//       actions: `
//         ${UI.btn('This month', { variant: 'secondary', size: 'sm', icon: 'calendar' }).replace('<button', `<button data-action="menu" data-menu='["Last 7 days","Last 30 days","This quarter"]'`)}
//         ${UI.btn('New campaign', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="navigate" data-route="ads.campaigns"`)}`,
//     });
//
//     // Panel 1 - spend vs return chart
//     const trendPanel = LX.panel({
//       title: 'Spend vs revenue',
//       actions: `<div class="flex items-center gap-3 text-[10.5px]">
//           <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Revenue</span>
//           <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--amber)"></span>Spend</span>
//           <span class="text-3 num">Apr - Jun, weekly</span>
//         </div>`,
//       body: `<div style="height:212px"><canvas id="ads-spend-chart" height="212"></canvas></div>`,
//     });
//
//     // Panel 2 - per-platform breakdown (dense rows w/ bars)
//     const platMax = Math.max(...a.platforms.map(p => p.spendUsd));
//     const platRows = a.platforms.map(p => {
//       const good = p.delta >= 0;
//       return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
//         <div class="w-[96px] shrink-0 flex items-center gap-2">
//           <span class="size-2 rounded-full shrink-0" style="background:${p.color}"></span>
//           <span class="text-[12px] text-1 font-medium truncate">${p.name}</span>
//         </div>
//         <div class="flex-1">${LX.bar(p.spendUsd / platMax * 100, p.color)}</div>
//         <div class="w-16 text-right num text-[12px] text-1">${formatMoney(p.spendUsd)}</div>
//         <div class="w-12 text-right num text-[11px] ${p.roas >= 4 ? 'text-acc' : 'text-3'}">${p.roas.toFixed(1)}x</div>
//         <div class="w-14 text-right num text-[11px] ${good ? 'delta-up' : 'delta-down'}">${good ? '&uarr;' : '&darr;'} ${Math.abs(p.delta).toFixed(1)}%</div>
//       </div>`;
//     }).join('');
//     const platformPanel = LX.panel({
//       title: 'By platform',
//       actions: `<span class="text-[10.5px] text-3 num">${formatMoney(a.platforms.reduce((s, p) => s + p.spendUsd, 0))} MTD</span>`,
//       bare: true,
//       body: `<div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
//           <div class="w-[96px] shrink-0">Platform</div><div class="flex-1">Spend share</div>
//           <div class="w-16 text-right">Spend</div><div class="w-12 text-right">ROAS</div><div class="w-14 text-right">vs LM</div>
//         </div>${platRows}`,
//     });
//
//     // Panel 3 - budget pacing summary (from budgets)
//     const bMax = Math.max(...a.budgets.map(b => b.monthBudgetUsd));
//     const pacingRows = a.budgets.map(b => {
//       const pct = Math.round(b.spentUsd / b.monthBudgetUsd * 100);
//       const projPct = Math.round(b.projectedUsd / b.monthBudgetUsd * 100);
//       const col = projPct > 105 ? 'var(--red)' : projPct > 100 ? 'var(--amber)' : 'var(--acc)';
//       const projCls = projPct > 105 ? 'text-red' : projPct > 100 ? 'text-amber' : 'text-2';
//       return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
//         <div class="w-[96px] shrink-0 flex items-center gap-2">
//           <span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(b.client)}"></span>
//           <span class="text-[12px] text-1 truncate">${clientName(b.client)}</span>
//         </div>
//         <div class="flex-1">${LX.bar(b.spentUsd / bMax * 100, col)}</div>
//         <div class="w-16 text-right num text-[12px] text-1">${formatMoney(b.spentUsd)}</div>
//         <div class="w-14 text-right num text-[11px] text-3">/ ${formatMoney(b.monthBudgetUsd)}</div>
//         <div class="w-16 text-right num text-[11px] ${projCls}">${projPct}% proj</div>
//       </div>`;
//     }).join('');
//     const budgetPanel = LX.panel({
//       title: 'Budget pacing',
//       actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="ads.budgets">Full pacing &rarr;</button>`,
//       bare: true,
//       body: `<div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
//           <div class="w-[96px] shrink-0">Account</div><div class="flex-1">Spent of budget</div>
//           <div class="w-16 text-right">Spent</div><div class="w-14 text-right">Budget</div><div class="w-16 text-right">Projected</div>
//         </div>${pacingRows}`,
//     });
//
//     // Panel 4 - top movers (dense mini-list)
//     const moverRows = a.movers.map(m => {
//       const up = m.dir === 'up';
//       const good = (m.metric === 'CPA') ? !up : up;
//       return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
//         <span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(m.client)}"></span>
//         <div class="min-w-0 flex-1">
//           <div class="text-[12px] text-1 font-medium truncate">${m.name}</div>
//           <div class="text-[10px] text-3">${platLabel(m.platform)}</div>
//         </div>
//         <span class="text-[10px] text-4 uppercase tracking-wide w-8 text-right">${m.metric}</span>
//         <span class="num text-[12px] text-1 w-12 text-right">${m.value}</span>
//         <span class="num text-[11px] w-14 text-right ${good ? 'delta-up' : 'delta-down'}">${up ? '&uarr;' : '&darr;'} ${Math.abs(m.delta)}%</span>
//       </div>`;
//     }).join('');
//     const moversPanel = LX.panel({
//       title: 'Top movers',
//       actions: `<span class="text-[10.5px] text-3">7-day change</span>`,
//       bare: true,
//       body: moverRows,
//     });
//
//     // Panel 5 - AI recommendations digest (the one agent affordance)
//     const recRows = a.optimizations.map(o => `
//       <div class="px-3.5 py-3" style="border-top:1px solid var(--line-1)"
//            data-action="detail" data-title="${esc(o.title)}" data-sub="${esc(clientName(o.client))} - ${platLabel(o.platform)}"
//            data-kv='[["Impact","${esc(o.impact)}"],["Client","${esc(clientName(o.client))}"],["Platform","${platLabel(o.platform)}"],["Confidence","${o.confidence}%"]]'>
//         <div class="flex items-start gap-2.5">
//           <div class="size-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style="background:var(--bg-3)">
//             <i data-lucide="${o.icon}" class="size-3" style="color:${sevColor[o.severity]}"></i>
//           </div>
//           <div class="flex-1 min-w-0">
//             <div class="text-[12px] font-medium text-1 leading-snug">${o.title}</div>
//             <div class="flex items-center gap-1.5 mt-0.5">
//               <span class="size-1.5 rounded-full" style="background:${clientColor(o.client)}"></span>
//               <span class="text-[10.5px] text-3">${clientName(o.client)}</span>
//               <span class="text-[10px] text-4">/</span>
//               <span class="text-[10.5px] text-3">${platLabel(o.platform)}</span>
//             </div>
//             <div class="flex items-center justify-between gap-2 mt-2">
//               <span class="tag ${o.impactDir === 'save' ? 'tag-acc' : 'tag-acc'}" style="font-size:10px;padding:1px 6px">${o.impact}</span>
//               <div class="flex items-center gap-1 shrink-0" onclick="event.stopPropagation()">
//                 ${o.autoExecutable
//                   ? `<button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Approved" data-dismiss="1"><span>Approve</span></button>`
//                   : `<button class="btn btn-secondary btn-sm" data-action="navigate" data-route="approvals"><span>Review</span></button>`}
//                 <button class="btn btn-ghost btn-sm" data-action="dismiss"><span>Dismiss</span></button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>`).join('');
//     const recsPanel = `
//       <div class="panel" style="box-shadow:inset 0 0 0 1px var(--line-1);border-top:2px solid var(--acc)">
//         <div class="panel-head">
//           <div class="flex items-center gap-2 min-w-0">
//             <i data-lucide="sparkles" class="size-3.5 text-acc-bright shrink-0"></i>
//             <div class="panel-title truncate">AI media recommendations</div>
//             <span class="status status-acc text-[10px]">live</span>
//           </div>
//           <button class="text-[11px] text-acc-bright font-medium" data-action="navigate" data-route="approvals">All ${a.optimizations.length} &rarr;</button>
//         </div>
//         <div>${recRows}</div>
//         <div class="px-3.5 py-2.5 text-[10.5px] text-3" style="border-top:1px solid var(--line-1)">Proposed moves, sorted by projected impact. Humans stay in the loop - approve, edit, or dismiss.</div>
//       </div>`;
//
//     return `${header}${subNav('ads')}
//       <div class="grid grid-cols-12 gap-3.5">
//         <div class="col-span-12 lg:col-span-8 flex flex-col gap-3.5">
//           ${trendPanel}
//           <div class="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
//             ${platformPanel}
//             ${budgetPanel}
//           </div>
//           ${moversPanel}
//         </div>
//         <div class="col-span-12 lg:col-span-4 flex flex-col gap-3.5">
//           ${recsPanel}
//         </div>
//       </div>`;
//   };
//
//   window.PAGES_AFTER.ads = function () {
//     const t = A().trend;
//     CHARTS.line('ads-spend-chart', t.labels, [
//       { label: 'Revenue', data: t.revenue, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.10)' },
//       { label: 'Spend', data: t.spend, borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.06)', borderDash: [4, 3] },
//     ], {
//       plugins: { legend: { display: false } },
//       scales: {
//         x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }, border: { display: false } },
//         y: { grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 }, callback: (v) => '$' + (v / 1000) + 'k' }, border: { display: false } },
//       },
//     });
//   };
//
//   // ====================================================================
//   // PAGES['ads.campaigns'] :: DENSE LIST (full-bleed)
//   // ====================================================================
//   window.PAGES['ads.campaigns'] = function () {
//     const a = A();
//     const totalSpend = a.campaigns.reduce((s, c) => s + c.spendUsd, 0);
//     const active = a.campaigns.filter(c => c.status === 'active').length;
//
//     const header = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Campaigns',
//         sub: a.campaigns.length + ' campaigns across 5 platforms - ' + active + ' active, ' + formatMoney(totalSpend) + ' spend MTD.',
//         stats: [
//           { k: 'Spend MTD', v: formatMoney(totalSpend) },
//           { k: 'Avg ROAS', v: (a.campaigns.reduce((s, c) => s + c.roas, 0) / a.campaigns.length).toFixed(1) + 'x' },
//           { k: 'Over budget', v: a.campaigns.filter(c => c.pacingPct > 100).length },
//           { k: 'Learning', v: a.campaigns.filter(c => c.status === 'learning').length },
//         ],
//         actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
//           ${UI.btn('New campaign', { variant: 'primary', size: 'sm', icon: 'plus' })}`,
//       })}
//       ${subNav('ads.campaigns')}
//       <div class="toolbar" style="margin-bottom:0">
//         ${UI.searchInput('Search campaigns', 'w-72')}
//         ${LX.segmented([
//           { id: 'all', label: 'All' }, { id: 'google', label: 'Google' }, { id: 'meta', label: 'Meta' },
//           { id: 'tiktok', label: 'TikTok' }, { id: 'linkedin', label: 'LinkedIn' },
//         ])}
//         <div class="grow"></div>
//         ${UI.btn('Status', { variant: 'ghost', size: 'sm', icon: 'sliders-horizontal' }).replace('<button', `<button data-action="menu" data-menu='["All status","Active","Learning","Paused"]'`)}
//       </div></div>`;
//
//     function rowsFor(filter) {
//       return a.campaigns.filter(c => filter === 'all' ? true : c.platform === filter);
//     }
//     function listFor(filter) {
//       return LX.dataList({
//         columns: [
//           { key: 'name', label: 'Campaign', render: (c) => `
//             <div class="flex items-center gap-2.5">
//               <span class="status status-${statusDot(c.status)}" style="--d:0" title="${cap(c.status)}"></span>
//               <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:340px">${c.name}</span>
//             </div>` },
//           { key: 'client', label: 'Client', render: (c) => clientCell(c.client) },
//           { key: 'platform', label: 'Platform', render: (c) => platCell(c.platform) },
//           { key: 'status', label: 'Status', render: (c) => `<span class="status status-${statusDot(c.status)}">${cap(c.status)}</span>` },
//           { key: 'spendUsd', label: 'Spend', align: 'r', mono: true, render: (c) => `<span class="text-1">${formatMoney(c.spendUsd)}</span>` },
//           { key: 'roas', label: 'ROAS', align: 'r', mono: true, render: (c) => `<span class="${roasCls(c.roas)} font-medium">${c.roas > 0 ? c.roas.toFixed(1) + 'x' : '-'}</span>` },
//           { key: 'cpaUsd', label: 'CPA', align: 'r', mono: true, render: (c) => `<span class="text-2">${c.cpaUsd > 0 ? formatMoney(c.cpaUsd) : '-'}</span>` },
//           { key: 'conversions', label: 'Conv', align: 'r', mono: true, render: (c) => `<span class="text-1">${c.conversions}</span>` },
//           { key: 'pacing', label: 'Pacing', align: 'r', width: '150px', render: (c) => {
//               const over = c.pacingPct > 100, hot = c.pacingPct >= 110;
//               const col = hot ? 'var(--red)' : over ? 'var(--amber)' : 'var(--acc)';
//               const txt = hot ? 'text-red' : over ? 'text-amber' : 'text-2';
//               return `<div class="flex items-center gap-2 justify-end">
//                 <div style="width:78px">${LX.bar(Math.min(c.pacingPct, 100), col)}</div>
//                 <span class="num text-[11px] ${txt} w-9 text-right">${c.pacingPct}%</span></div>`;
//             } },
//         ],
//         rows: rowsFor(filter),
//         rowAttrs: (c) => `data-action="detail" data-title="${esc(c.name)}" data-sub="${esc(clientName(c.client))} - ${platLabel(c.platform)}" data-kv='[["Spend","${formatMoney(c.spendUsd)}"],["ROAS","${c.roas.toFixed(1)}x"],["CPA","${formatMoney(c.cpaUsd)}"],["Conversions","${c.conversions}"],["Budget","${formatMoney(c.budgetUsd)}"],["Pacing","${c.pacingPct}%"]]'`,
//       });
//     }
//
//     const panes = ['all', 'google', 'meta', 'tiktok', 'linkedin'].map((f, i) =>
//       `<div data-pane="${f}" class="${i === 0 ? '' : 'hidden'}">${listFor(f)}</div>`).join('');
//
//     return `<div class="flex flex-col" style="height:calc(100vh - 44px)">
//       <div data-tabwrap class="flex flex-col min-h-0 flex-1">
//         ${header}
//         <div class="flex-1 overflow-auto" style="margin-top:10px">${panes}</div>
//       </div>
//     </div>`;
//   };
//
//   // ====================================================================
//   // PAGES['ads.creative'] :: GALLERY
//   // ====================================================================
//   window.PAGES['ads.creative'] = function () {
//     const a = A();
//     const tagMeta = { top: { label: 'Top performer', cls: 'tag-acc' }, fatigue: { label: 'Fatiguing', cls: 'tag-amber' } };
//
//     const header = LX.modHead({
//       title: 'Creative studio',
//       sub: a.creatives.length + ' active creatives across platforms - best and fatiguing assets across the book.',
//       stats: [
//         { k: 'Creatives', v: a.creatives.length },
//         { k: 'Top performers', v: a.creatives.filter(c => c.tag === 'top').length },
//         { k: 'Fatiguing', v: a.creatives.filter(c => c.tag === 'fatigue').length },
//         { k: 'Avg CTR', v: (a.creatives.reduce((s, c) => s + c.ctr, 0) / a.creatives.length).toFixed(1) + '%' },
//       ],
//       actions: `${UI.btn('Filter', { variant: 'secondary', size: 'sm', icon: 'sliders-horizontal' }).replace('<button', `<button data-action="menu" data-menu='["All formats","Video","Carousel","Static"]'`)}
//         ${UI.btn('Upload creative', { variant: 'primary', size: 'sm', icon: 'upload' })}`,
//     });
//
//     const fmtBadge = (f) => f.startsWith('Video') ? f : f;
//     const tiles = a.creatives.map(cr => {
//       const col = clientColor(cr.client);
//       const t = cr.tag ? tagMeta[cr.tag] : null;
//       const fmtIcon = cr.format.startsWith('Video') ? 'play' : cr.format === 'Carousel' ? 'gallery-horizontal-end' : 'image';
//       return `<div class="tile" data-action="detail" data-title="${esc(cr.headline)}" data-sub="${esc(clientName(cr.client))} - ${platLabel(cr.platform)}"
//           data-kv='[["Format","${cr.format}"],["CTR","${cr.ctr.toFixed(1)}%"],["ROAS","${cr.roas.toFixed(1)}x"],["Spend","${formatMoney(cr.spendUsd)}"],["Client","${esc(clientName(cr.client))}"]]'>
//         <div class="tile-media" style="background:linear-gradient(160deg, ${col}33, ${col}14)">
//           <div class="absolute inset-0 flex items-center justify-center">
//             <i data-lucide="${fmtIcon}" class="size-7" style="color:${col};opacity:0.85"></i>
//           </div>
//           <span class="absolute top-2 left-2 text-[9.5px] px-1.5 py-0.5 rounded" style="background:var(--bg-0);color:var(--text-2);box-shadow:inset 0 0 0 1px var(--line-1)">${fmtBadge(cr.format)}</span>
//           ${t ? `<span class="absolute top-2 right-2 tag ${t.cls}" style="height:16px;padding:0 6px;font-size:9px">${t.label}</span>` : ''}
//         </div>
//         <div class="p-3">
//           <div class="flex items-center gap-1.5 mb-1.5">
//             <span class="size-1.5 rounded-full" style="background:${col}"></span>
//             <span class="text-[10px] text-3 truncate">${clientName(cr.client)} - ${platLabel(cr.platform)}</span>
//           </div>
//           <div class="text-[12px] text-1 font-medium leading-snug mb-2.5 line-clamp-2" style="min-height:32px">${cr.headline}</div>
//           <div class="grid grid-cols-3 gap-1 pt-2.5" style="border-top:1px solid var(--line-1)">
//             <div><div class="eyebrow mb-0.5">CTR</div><div class="num text-[12px] text-1 font-medium">${cr.ctr.toFixed(1)}%</div></div>
//             <div><div class="eyebrow mb-0.5">ROAS</div><div class="num text-[12px] ${roasCls(cr.roas)} font-medium">${cr.roas.toFixed(1)}x</div></div>
//             <div><div class="eyebrow mb-0.5">Spend</div><div class="num text-[12px] text-1 font-medium">${formatMoney(cr.spendUsd)}</div></div>
//           </div>
//         </div>
//       </div>`;
//     });
//
//     return `${header}${subNav('ads.creative')}${LX.gallery(tiles)}`;
//   };
//
//   // ====================================================================
//   // PAGES['ads.audiences'] :: DENSE LIST (full-bleed) + build panel
//   // ====================================================================
//   window.PAGES['ads.audiences'] = function () {
//     const a = A();
//     const fmtSize = (n) => n >= 1000000 ? (n / 1000000).toFixed(1) + 'M' : n >= 1000 ? Math.round(n / 1000) + 'K' : '' + n;
//     const typeTag = { lookalike: 'tag-violet', custom: 'tag-sky', interest: 'tag-slate' };
//
//     const header = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Audiences',
//         sub: a.audiences.length + ' audiences across platforms - lookalikes, custom lists and interest segments.',
//         stats: [
//           { k: 'Audiences', v: a.audiences.length },
//           { k: 'Lookalike', v: a.audiences.filter(x => x.type === 'lookalike').length },
//           { k: 'Custom', v: a.audiences.filter(x => x.type === 'custom').length },
//           { k: 'Building', v: a.audiences.filter(x => x.status === 'building').length },
//         ],
//         actions: `${UI.btn('Sync platforms', { variant: 'secondary', size: 'sm', icon: 'refresh-cw' })}
//           ${UI.btn('Build audience', { variant: 'primary', size: 'sm', icon: 'plus' })}`,
//       })}
//       ${subNav('ads.audiences')}
//       <div class="toolbar" style="margin-bottom:0">
//         ${UI.searchInput('Search audiences', 'w-72')}
//         <div class="grow"></div>
//         ${UI.btn('Type', { variant: 'ghost', size: 'sm', icon: 'filter' }).replace('<button', `<button data-action="menu" data-menu='["All types","Lookalike","Custom","Interest"]'`)}
//       </div></div>`;
//
//     const list = LX.dataList({
//       columns: [
//         { key: 'name', label: 'Audience', render: (r) => `
//           <div class="flex items-center gap-2.5">
//             <span class="status status-${statusDot(r.status)}" title="${cap(r.status)}"></span>
//             <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:320px">${r.name}</span>
//           </div>` },
//         { key: 'type', label: 'Type', render: (r) => `<span class="tag ${typeTag[r.type]}" style="font-size:10px;padding:1px 7px">${cap(r.type)}</span>` },
//         { key: 'platform', label: 'Platform', render: (r) => platCell(r.platform) },
//         { key: 'client', label: 'Client', render: (r) => clientCell(r.client) },
//         { key: 'size', label: 'Size', align: 'r', mono: true, render: (r) => `<span class="text-1">${fmtSize(r.sizeUsers)}</span>` },
//         { key: 'match', label: 'Match rate', align: 'r', width: '130px', render: (r) => {
//             const pct = Math.round(r.matchRate * 100);
//             const col = pct >= 80 ? 'var(--acc)' : pct >= 60 ? 'var(--amber)' : 'var(--text-3)';
//             return `<div class="flex items-center gap-2 justify-end">
//               <div style="width:62px">${LX.bar(pct, col)}</div>
//               <span class="num text-[11px] text-2 w-8 text-right">${pct}%</span></div>`;
//           } },
//         { key: 'campaigns', label: 'In use', align: 'r', mono: true, render: (r) => `<span class="text-2">${r.campaigns}</span>` },
//         { key: 'status', label: 'Status', align: 'r', render: (r) => `<span class="status status-${statusDot(r.status)}">${cap(r.status)}</span>` },
//       ],
//       rows: a.audiences,
//       rowAttrs: (r) => `data-action="detail" data-title="${esc(r.name)}" data-sub="${cap(r.type)} - ${platLabel(r.platform)}" data-kv='[["Type","${cap(r.type)}"],["Platform","${platLabel(r.platform)}"],["Client","${esc(clientName(r.client))}"],["Size","${fmtSize(r.sizeUsers)}"],["Match rate","${Math.round(r.matchRate * 100)}%"],["Campaigns using","${r.campaigns}"]]'`,
//     });
//
//     const buildPanel = `<div class="px-7 pt-3 pb-7">
//       ${LX.panel({
//         title: 'Build a new audience',
//         actions: `<span class="text-[10.5px] text-3">Lookalike, custom upload or interest</span>`,
//         body: `<div class="flex items-center gap-3 flex-wrap">
//           <button class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg surface-hover text-left" style="background:var(--bg-1);box-shadow:inset 0 0 0 1px var(--line-1)" data-action="modal" data-title="Build lookalike" data-body="Pick a seed audience and a platform to model a lookalike.">
//             <span class="size-7 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)"><i data-lucide="users-round" class="size-3.5" style="color:var(--violet)"></i></span>
//             <div><div class="text-[12px] text-1 font-medium">Lookalike</div><div class="text-[10.5px] text-3">Model from a purchaser seed</div></div>
//           </button>
//           <button class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg surface-hover text-left" style="background:var(--bg-1);box-shadow:inset 0 0 0 1px var(--line-1)" data-action="modal" data-title="Upload custom list" data-body="Upload a hashed customer list to build a custom audience.">
//             <span class="size-7 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)"><i data-lucide="upload" class="size-3.5" style="color:var(--sky)"></i></span>
//             <div><div class="text-[12px] text-1 font-medium">Custom list</div><div class="text-[10.5px] text-3">Upload a hashed CRM list</div></div>
//           </button>
//           <button class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg surface-hover text-left" style="background:var(--bg-1);box-shadow:inset 0 0 0 1px var(--line-1)" data-action="modal" data-title="Interest segment" data-body="Compose an interest and demographic segment.">
//             <span class="size-7 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)"><i data-lucide="sliders-horizontal" class="size-3.5 text-2"></i></span>
//             <div><div class="text-[12px] text-1 font-medium">Interest segment</div><div class="text-[10.5px] text-3">Compose by interest + geo</div></div>
//           </button>
//         </div>`,
//       })}
//     </div>`;
//
//     return `<div class="flex flex-col" style="min-height:calc(100vh - 44px)">
//       ${header}
//       <div style="margin-top:10px">${list}</div>
//       ${buildPanel}
//     </div>`;
//   };
//
//   // ====================================================================
//   // PAGES['ads.budgets'] :: PACING CONSOLE
//   // ====================================================================
//   window.PAGES['ads.budgets'] = function () {
//     const a = A();
//     const totalBudget = a.budgets.reduce((s, b) => s + b.monthBudgetUsd, 0);
//     const totalSpent = a.budgets.reduce((s, b) => s + b.spentUsd, 0);
//     const totalProj = a.budgets.reduce((s, b) => s + b.projectedUsd, 0);
//     const overCount = a.budgets.filter(b => b.projectedUsd > b.monthBudgetUsd).length;
//
//     const header = LX.modHead({
//       title: 'Budget & pacing',
//       sub: a.budgets.length + ' ad accounts - ' + (a.budgets[0] ? a.budgets[0].daysLeft : 0) + ' days left in cycle, ' + overCount + ' projected over budget.',
//       stats: [
//         { k: 'Month budget', v: formatMoney(totalBudget) },
//         { k: 'Spent MTD', v: formatMoney(totalSpent) },
//         { k: 'Projected', v: formatMoney(totalProj) },
//         { k: 'Pace', v: Math.round(totalSpent / totalBudget * 100) + '%' },
//         { k: 'Over budget', v: overCount + ' / ' + a.budgets.length },
//       ],
//       actions: `${UI.btn('Rebalance', { variant: 'secondary', size: 'sm', icon: 'arrow-left-right' })}
//         ${UI.btn('Adjust budgets', { variant: 'primary', size: 'sm', icon: 'sliders-horizontal' })}`,
//     });
//
//     // MTD pacing chart panel
//     const chartPanel = LX.panel({
//       title: 'Month-to-date pacing',
//       actions: `<div class="flex items-center gap-3 text-[10.5px]">
//           <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Spent</span>
//           <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--text-3)"></span>On-pace budget</span>
//         </div>`,
//       body: `<div style="height:200px"><canvas id="ads-pacing-chart" height="200"></canvas></div>`,
//     });
//
//     // per-account pacing rows (the dense console)
//     const accountRows = a.budgets.map(b => {
//       const spentPct = Math.round(b.spentUsd / b.monthBudgetUsd * 100);
//       const projPct = Math.round(b.projectedUsd / b.monthBudgetUsd * 100);
//       const over = projPct > 100, hot = projPct > 108;
//       const col = hot ? 'var(--red)' : over ? 'var(--amber)' : 'var(--acc)';
//       const chipCls = hot ? 'tag-red' : over ? 'tag-amber' : 'tag-acc';
//       const diff = b.projectedUsd - b.monthBudgetUsd;
//       return `<div class="px-4 py-3.5" style="border-top:1px solid var(--line-1)"
//           data-action="detail" data-title="${esc(clientName(b.client))} - ${platLabel(b.platform)}" data-sub="Budget pacing"
//           data-kv='[["Month budget","${formatMoney(b.monthBudgetUsd)}"],["Spent MTD","${formatMoney(b.spentUsd)}"],["Projected","${formatMoney(b.projectedUsd)}"],["Pace","${projPct}%"],["Days left","${b.daysLeft}"]]'>
//         <div class="flex items-center gap-3 mb-2.5">
//           <span class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:${clientColor(b.client)}22;box-shadow:inset 0 0 0 1px ${clientColor(b.client)}55">
//             <i data-lucide="${clientIcon(b.client)}" class="size-3" style="color:${clientColor(b.client)}"></i></span>
//           <div class="min-w-0 flex-1">
//             <div class="text-[13px] text-1 font-medium truncate">${clientName(b.client)}</div>
//             <div class="text-[10.5px] text-3">${platLabel(b.platform)} - ${b.daysLeft} days left</div>
//           </div>
//           <span class="tag ${chipCls}" style="font-size:10px;padding:1px 7px">${projPct}% projected</span>
//         </div>
//         <div class="mb-2">${LX.bar(Math.min(spentPct, 100), col)}</div>
//         <div class="flex items-center justify-between text-[11px]">
//           <span class="num text-2"><span class="text-1 font-medium">${formatMoney(b.spentUsd)}</span> <span class="text-3">/ ${formatMoney(b.monthBudgetUsd)}</span></span>
//           <span class="num text-3">Projected end <span class="${over ? (hot ? 'text-red' : 'text-amber') : 'text-2'}">${formatMoney(b.projectedUsd)}</span> <span class="${diff > 0 ? 'text-red' : 'text-acc'}">(${diff > 0 ? '+' : ''}${formatMoney(diff)})</span></span>
//         </div>
//       </div>`;
//     }).join('');
//     const accountsPanel = LX.panel({
//       title: 'Per-account pacing',
//       actions: `<span class="text-[10.5px] text-3">${a.budgets.length} accounts</span>`,
//       bare: true,
//       body: accountRows,
//     });
//
//     return `${header}${subNav('ads.budgets')}
//       <div class="grid grid-cols-12 gap-3.5">
//         <div class="col-span-12 lg:col-span-7">${accountsPanel}</div>
//         <div class="col-span-12 lg:col-span-5 flex flex-col gap-3.5">
//           ${chartPanel}
//           ${LX.panel({
//             title: 'Pacing alert',
//             cls: '',
//             body: `<div class="flex items-start gap-2.5">
//               <div class="size-7 rounded-md flex items-center justify-center shrink-0" style="background:var(--amber-soft, rgba(245,158,11,0.10))"><i data-lucide="triangle-alert" class="size-3.5 text-amber"></i></div>
//               <div class="min-w-0">
//                 <div class="text-[12.5px] text-1 font-medium leading-snug">${overCount} accounts projected over budget</div>
//                 <p class="text-[11.5px] text-2 leading-relaxed mt-1">Atlas Google is pacing to ${Math.round(a.budgets[2].projectedUsd / a.budgets[2].monthBudgetUsd * 100)}% on rising PMax costs. AI recommends shifting ${formatMoney(1800)}/day from Brand to PMax to hold the cap without losing volume.</p>
//                 <div class="flex items-center gap-1.5 mt-3" onclick="event.stopPropagation()">
//                   <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Rebalance approved" data-dismiss="1"><span>Approve rebalance</span></button>
//                   <button class="btn btn-ghost btn-sm" data-action="dismiss"><span>Dismiss</span></button>
//                 </div>
//               </div>
//             </div>`,
//           })}
//         </div>
//       </div>`;
//   };
//
//   window.PAGES_AFTER['ads.budgets'] = function () {
//     const p = A().pacingTrend;
//     CHARTS.line('ads-pacing-chart', p.labels, [
//       { label: 'Spent', data: p.spent, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.10)' },
//       { label: 'On-pace budget', data: p.budget, borderColor: '#565659', backgroundColor: 'rgba(86,86,89,0.05)', borderDash: [4, 3] },
//     ], {
//       plugins: { legend: { display: false } },
//       scales: {
//         x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }, border: { display: false } },
//         y: { grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 }, callback: (v) => '$' + (v / 1000) + 'k' }, border: { display: false } },
//       },
//     });
//   };
//
//   // ====================================================================
//   // PAGES['ads.search'] :: DENSE LIST (full-bleed)
//   // ====================================================================
//   window.PAGES['ads.search'] = function () {
//     const a = A();
//     const wasted = a.searchTerms.filter(t => t.wasted);
//     // wasted cost approximated from clicks for the zero-conversion terms
//     const wastedCost = wasted.reduce((s, t) => s + Math.round(t.clicks * 2.2), 0);
//
//     const header = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Search terms',
//         sub: a.searchTerms.length + ' terms triggering ads last 30 days - ' + wasted.length + ' flagged as wasted spend.',
//         stats: [
//           { k: 'Terms', v: a.searchTerms.length },
//           { k: 'Total clicks', v: a.searchTerms.reduce((s, t) => s + t.clicks, 0).toLocaleString() },
//           { k: 'Conversions', v: a.searchTerms.reduce((s, t) => s + t.conversions, 0) },
//           { k: 'Wasted spend', v: formatMoney(wastedCost) },
//         ],
//         actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
//           ${UI.btn('Negate all wasted', { variant: 'primary', size: 'sm', icon: 'shield-x' }).replace('<button', `<button data-action="confirm" data-toast="${wasted.length} negative keywords added"`)}`,
//       })}
//       ${subNav('ads.search')}
//       <div class="toolbar" style="margin-bottom:0">
//         ${UI.searchInput('Search terms', 'w-72')}
//         <div class="grow"></div>
//         ${UI.btn('Wasted only', { variant: 'ghost', size: 'sm', icon: 'filter' }).replace('<button', `<button data-action="menu" data-menu='["All terms","Wasted only","Converting only"]'`)}
//       </div></div>`;
//
//     const list = LX.dataList({
//       columns: [
//         { key: 'term', label: 'Search term', render: (t) => `
//           <div class="flex items-center gap-2.5">
//             ${t.wasted ? `<i data-lucide="triangle-alert" class="size-3 text-red shrink-0"></i>` : `<span class="size-1.5 rounded-full shrink-0" style="background:var(--acc)"></span>`}
//             <span class="text-[12.5px] ${t.wasted ? 'text-1' : 'text-1'} font-medium truncate" style="max-width:300px">${t.term}</span>
//           </div>` },
//         { key: 'campaign', label: 'Campaign', render: (t) => `<span class="text-[11.5px] text-3 truncate" style="display:inline-block;max-width:220px">${t.campaign}</span>` },
//         { key: 'impressions', label: 'Impr', align: 'r', mono: true, render: (t) => `<span class="text-2">${t.impressions.toLocaleString()}</span>` },
//         { key: 'clicks', label: 'Clicks', align: 'r', mono: true, render: (t) => `<span class="text-1">${t.clicks}</span>` },
//         { key: 'ctr', label: 'CTR', align: 'r', mono: true, render: (t) => `<span class="text-2">${(t.clicks / t.impressions * 100).toFixed(1)}%</span>` },
//         { key: 'conversions', label: 'Conv', align: 'r', mono: true, render: (t) => `<span class="${t.conversions === 0 ? 'text-red' : 'text-1'}">${t.conversions}</span>` },
//         { key: 'cpaUsd', label: 'CPA', align: 'r', mono: true, render: (t) => `<span class="text-2">${t.cpaUsd > 0 ? formatMoney(t.cpaUsd) : '-'}</span>` },
//         { key: 'flag', label: 'Status', render: (t) => t.wasted ? `<span class="tag tag-red" style="font-size:10px;padding:1px 7px">Wasted</span>` : `<span class="tag tag-acc" style="font-size:10px;padding:1px 7px">Converting</span>` },
//         { key: 'action', label: 'Action', align: 'r', width: '190px', render: (t) => `<div class="flex items-center gap-1 justify-end" onclick="event.stopPropagation()">
//             ${t.wasted
//               ? `<button class="btn btn-secondary btn-sm" data-action="confirm" data-toast="Negative added"><span>Add negative</span></button>`
//               : `<button class="btn btn-secondary btn-sm" data-action="confirm" data-toast="Keyword added"><span>Add keyword</span></button>`}
//           </div>` },
//       ],
//       rows: a.searchTerms,
//       rowAttrs: (t) => `data-action="detail" data-title="${esc(t.term)}" data-sub="${esc(t.campaign)}" data-kv='[["Impressions","${t.impressions.toLocaleString()}"],["Clicks","${t.clicks}"],["CTR","${(t.clicks / t.impressions * 100).toFixed(1)}%"],["Conversions","${t.conversions}"],["CPA","${t.cpaUsd > 0 ? formatMoney(t.cpaUsd) : 'n/a'}"]]'`,
//     });
//
//     return `<div class="flex flex-col" style="min-height:calc(100vh - 44px)">
//       ${header}
//       <div style="margin-top:10px">${list}</div>
//     </div>`;
//   };
//
// })();
//