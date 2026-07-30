// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Reporting macro - hub + dense micro sub-modules.
//    Each sub-module is its assigned archetype, structurally
//    distinct from its siblings:
//      reporting             :: DENSE LIST     (full-bleed)
//      reporting.builder     :: WORKSPACE      (full-bleed)
//      reporting.scheduled   :: DENSE LIST
//      reporting.templates   :: GALLERY
//      reporting.whitelabel  :: SETTINGS PANELS
//    The wedge: every report ships with a drafted narrative; a human
//    approves before it sends. Cross-channel blending is the thing
//    single-channel reporting tools cannot do.
//    ============================================================ */
//
// window.PAGES = window.PAGES || {};
// window.PAGES_AFTER = window.PAGES_AFTER || {};
// window.FULLBLEED = window.FULLBLEED || new Set();
// window.FULLBLEED.add('reporting');
// window.FULLBLEED.add('reporting.builder');
//
// (function () {
//   const R = () => window.REPORTING;
//
//   // ---- shared lookups -------------------------------------------------
//   const clientName  = (id) => (window.getClient(id) || {}).name || id;
//   const clientColor = (id) => (window.getClient(id) || {}).logoColor || '#10b981';
//   const clientIcon  = (id) => (window.getClient(id) || {}).icon || 'circle';
//   const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');
//   const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
//
//   const STATUS = {
//     scheduled: { dot: 'green', label: 'Scheduled' },
//     draft:     { dot: 'slate', label: 'Draft' },
//     awaiting:  { dot: 'amber', label: 'Awaiting approval' },
//     paused:    { dot: 'slate', label: 'Paused' },
//   };
//   const statusPill = (s) => { const m = STATUS[s] || STATUS.draft; return `<span class="status status-${m.dot}">${m.label}</span>`; };
//
//   const APPROVAL = {
//     approved: { cls: 'tag-acc',   label: 'Approved' },
//     pending:  { cls: 'tag-amber', label: 'Pending' },
//     'n/a':    { cls: 'tag-slate', label: 'Not sent' },
//   };
//   const approvalTag = (a) => { const m = APPROVAL[a] || APPROVAL['n/a']; return `<span class="tag ${m.cls}" style="font-size:10px;padding:1px 7px">${m.label}</span>`; };
//
//   // inline channel chip (dot + short label)
//   function chChip(id) {
//     const ch = window.getChannel(id); if (!ch) return '';
//     return `<span class="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] num" style="background:var(--bg-3);color:var(--text-2)" data-tooltip="${ch.label}"><span class="size-1.5 rounded-full" style="background:${ch.color}"></span>${ch.label.split(' ')[0]}</span>`;
//   }
//   const chChips = (ids) => `<div class="flex flex-wrap items-center gap-1">${ids.map(chChip).join('')}</div>`;
//
//   // client dot + name cell
//   const clientCell = (id) => `<span class="flex items-center gap-2"><span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(id)}"></span><span class="text-[12px] text-2 truncate">${clientName(id)}</span></span>`;
//
//   // next-send cell
//   const nextSend = (n) => n === 0 ? 'today' : 'in ' + n + 'd';
//
//   // sub-nav strip shared across the macro
//   function subNav(active) {
//     const items = [
//       { id: 'reporting',            label: 'All reports' },
//       { id: 'reporting.builder',    label: 'Builder' },
//       { id: 'reporting.scheduled',  label: 'Scheduled' },
//       { id: 'reporting.templates',  label: 'Templates' },
//       { id: 'reporting.whitelabel', label: 'White-label' },
//     ];
//     return `<div class="flex items-center gap-1 mb-5 -mt-1 flex-wrap">${items.map(it =>
//       `<button class="px-2.5 py-1 rounded-md text-[12px] font-medium ${it.id === active ? 'text-1' : 'text-3 hover:text-1'}" ${it.id === active ? 'style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"' : ''} data-action="navigate" data-route="${it.id}">${it.label}</button>`
//     ).join('')}</div>`;
//   }
//
//   // ====================================================================
//   // PAGES.reporting :: DENSE LIST (full-bleed) - all reports
//   // ====================================================================
//   window.PAGES.reporting = function () {
//     const r = R();
//     const su = r.summary;
//     const reports = r.reports;
//     const awaiting = reports.filter(x => x.status === 'awaiting').length;
//
//     const header = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Reporting',
//         sub: reports.length + ' recurring reports across 6 clients - white-label, scheduled, every one shipping a drafted narrative you approve.',
//         stats: [
//           { k: 'Scheduled',       v: su.scheduled },
//           { k: 'Sent this month', v: su.sentThisMonth, delta: su.sentThisMonth - su.sentLastMonth, deltaUnit: '' },
//           { k: 'Avg open rate',   v: su.avgOpenRate + '%', delta: su.openDelta, deltaUnit: 'pts' },
//           { k: 'Awaiting',        v: su.awaiting },
//           { k: 'White-label',     v: su.whitelabelProfiles, delta: su.whitelabelDelta, deltaUnit: '' },
//         ],
//         actions: `
//           ${UI.btn('Builder', { variant: 'secondary', size: 'sm', icon: 'pencil-ruler' }).replace('<button', `<button data-action="navigate" data-route="reporting.builder"`)}
//           ${UI.btn('New report', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New report"`)}`,
//       })}
//       ${subNav('reporting')}
//       <div class="toolbar" style="margin-bottom:0">
//         ${UI.searchInput('Search reports', 'w-72')}
//         ${LX.segmented([
//           { id: 'all', label: 'All' }, { id: 'awaiting', label: 'Awaiting' },
//           { id: 'scheduled', label: 'Scheduled' }, { id: 'draft', label: 'Drafts' },
//         ])}
//         <div class="grow"></div>
//         ${UI.btn('All clients', { variant: 'ghost', size: 'sm', icon: 'building-2' }).replace('<button', `<button data-action="menu" data-menu='["All clients","Lumen Dental","Verdant","NorthEdge","Atlas Storage","Peak Performance","Casa Verde"]'`)}
//         ${UI.btn('Cadence', { variant: 'ghost', size: 'sm', icon: 'repeat' }).replace('<button', `<button data-action="menu" data-menu='["All cadences","Weekly","Monthly","Quarterly"]'`)}
//       </div></div>`;
//
//     function rowsFor(filter) {
//       if (filter === 'all') return reports;
//       if (filter === 'scheduled') return reports.filter(x => x.status === 'scheduled');
//       if (filter === 'draft') return reports.filter(x => x.status === 'draft' || x.status === 'paused');
//       return reports.filter(x => x.status === filter);
//     }
//
//     function listFor(filter) {
//       return LX.dataList({
//         cls: 'tight',
//         columns: [
//           { key: 'name', label: 'Report', render: (x) => `
//             <div class="flex items-center gap-2.5">
//               <span class="status status-${(STATUS[x.status] || STATUS.draft).dot}" style="--d:0" title="${(STATUS[x.status] || STATUS.draft).label}"></span>
//               <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:280px">${x.name}</span>
//             </div>` },
//           { key: 'client', label: 'Client', render: (x) => clientCell(x.client) },
//           { key: 'cadence', label: 'Cadence', render: (x) => `<span class="tag tag-slate" style="font-size:10px;padding:1px 7px">${x.cadence}</span>` },
//           { key: 'channels', label: 'Channels', render: (x) => chChips(x.channels) },
//           { key: 'nextSendIn', label: 'Next send', align: 'r', mono: true, render: (x) => `<span class="text-1" data-tooltip="${shortDate(daysAhead(x.nextSendIn))}">${nextSend(x.nextSendIn)}</span>` },
//           { key: 'openRate', label: 'Open', align: 'r', mono: true, render: (x) => { const t = x.openRate >= 75 ? 'text-acc' : x.openRate >= 65 ? 'text-2' : 'text-amber'; return `<span class="${t}">${x.openRate}%</span>`; } },
//           { key: 'status', label: 'Status', render: (x) => statusPill(x.status) },
//           { key: 'delivery', label: 'White-label domain', render: (x) => `<span class="mono text-[11px] text-3 flex items-center gap-1"><i data-lucide="globe" class="size-3"></i>${x.delivery}</span>` },
//         ],
//         rows: rowsFor(filter),
//         rowAttrs: (x) => `data-action="detail" data-title="${esc(x.name)}" data-sub="${esc(x.template)} - ${x.cadence}" data-kv='[["Client","${esc(clientName(x.client))}"],["Template","${esc(x.template)}"],["Cadence","${x.cadence}"],["Recipients","${x.recipients}"],["Open rate","${x.openRate}%"],["Next send","${nextSend(x.nextSendIn)}"],["Domain","${x.delivery}"],["Status","${(STATUS[x.status] || STATUS.draft).label}"]]'`,
//       });
//     }
//
//     const panes = ['all', 'awaiting', 'scheduled', 'draft'].map((f, i) =>
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
//   // PAGES['reporting.builder'] :: WORKSPACE (full-bleed)
//   //   rail  = widget library (drag list)
//   //   main  = white-label report canvas (branded header + blended
//   //           widgets incl a chart)
//   //   aside = report settings
//   // ====================================================================
//   window.PAGES['reporting.builder'] = function () {
//     const b = R().builder;
//     const c = b.canvas;
//     const cl = window.getClient(c.client);
//
//     // ---- RAIL: widget library (drag source) ----
//     const railGroups = b.widgetGroups.map(g => `
//       <div class="px-3.5 py-2 text-[10px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1);background:var(--bg-1)">${g.group}</div>
//       ${g.widgets.map(w => `
//         <div class="flex items-center gap-2.5 px-3.5 py-2.5 surface-hover cursor-grab" style="border-bottom:1px solid var(--line-1)" data-action="detail" data-title="${esc(w.name)}" data-sub="Report widget" data-kv='[["Type","${esc(w.desc)}"],["Group","${esc(g.group)}"]]'>
//           <span class="size-7 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3);color:var(--text-2)"><i data-lucide="${w.icon}" class="size-3.5"></i></span>
//           <div class="min-w-0 flex-1">
//             <div class="text-[12px] text-1 font-medium truncate">${w.name}</div>
//             <div class="text-[10px] text-3 truncate">${w.desc}</div>
//           </div>
//           <i data-lucide="grip-vertical" class="size-3.5 text-4 shrink-0"></i>
//         </div>`).join('')}
//     `).join('');
//     const rail = `
//       <div class="px-3.5 py-3 flex items-center justify-between" style="border-bottom:1px solid var(--line-1)">
//         <div class="text-[12px] font-semibold text-1">Widget library</div>
//         ${UI.searchInput('Search', 'w-28')}
//       </div>
//       ${railGroups}
//       <div class="px-3.5 py-3 text-[10.5px] text-3 leading-relaxed">Drag a widget onto the canvas. Cross-channel widgets blend data from multiple channels into one view.</div>`;
//
//     // ---- MAIN: white-label report canvas ----
//     const kpiRow = c.kpis.map((k, i) => `
//       <div class="px-5 py-4" style="${i > 0 ? 'border-left:1px solid var(--line-1);' : ''}">
//         <div class="eyebrow mb-2">${k.label}</div>
//         <div class="flex items-baseline gap-2">
//           <div class="text-[22px] font-semibold num text-1 leading-none tracking-tight">${k.value}</div>
//           <span class="num text-[11px] ${k.better ? 'text-acc-bright' : 'text-red'}">${k.delta > 0 ? '&uarr;' : '&darr;'} ${Math.abs(k.delta)}</span>
//         </div>
//         <div class="text-[10px] text-3 mt-1.5">${k.sub}</div>
//       </div>`).join('');
//
//     const chanRows = c.channelTable.map(row => {
//       const ch = window.getChannel(row.channel);
//       return `<tr>
//         <td><span class="inline-flex items-center gap-2"><span class="size-1.5 rounded-full" style="background:${ch.color}"></span><span class="text-[12px] text-1">${ch.label}</span></span></td>
//         <td class="text-right num text-2">${row.spendUsd ? formatMoney(row.spendUsd) : '-'}</td>
//         <td class="text-right num text-1 font-medium">${row.leads || '-'}</td>
//         <td class="text-right num text-2">${row.costPerLead ? formatMoney(row.costPerLead) : '-'}</td>
//         <td class="text-right num text-2">${row.roas ? row.roas.toFixed(1) + 'x' : '-'}</td>
//         <td class="text-right"><span class="delta ${row.delta >= 0 ? 'delta-up' : 'delta-down'} num">${row.delta >= 0 ? '&uarr;' : '&darr;'} ${Math.abs(row.delta)}%</span></td>
//         <td class="text-[11px] text-3">${row.note}</td>
//       </tr>`;
//     }).join('');
//
//     const goalsBlock = c.goals.map(g => {
//       const pct = Math.min(100, Math.round((g.current / g.target) * 100));
//       const hit = g.current >= g.target;
//       return `<div class="mb-3.5">
//         <div class="flex items-baseline justify-between mb-1.5">
//           <span class="text-[11.5px] text-2">${g.label}</span>
//           <span class="num text-[11.5px] ${hit ? 'text-acc-bright' : 'text-2'}">${g.current}${g.unit} <span class="text-3">/ ${g.target}${g.unit}</span></span>
//         </div>
//         ${LX.bar(pct, hit ? 'var(--acc)' : g.color)}
//         <div class="text-[10px] text-3 mt-1 num">${hit ? 'on target' : pct + '% to goal'}</div>
//       </div>`;
//     }).join('');
//
//     const main = `
//       <div class="ws-pad">
//         <div class="surface overflow-hidden" style="max-width:860px;margin:0 auto">
//           <!-- branded white-label header -->
//           <div class="px-7 py-5 flex items-center justify-between" style="border-bottom:1px solid var(--line-1)">
//             <div class="flex items-center gap-3">
//               <span class="size-9 rounded-lg flex items-center justify-center shrink-0" style="background:${c.accent};color:#06080c"><i data-lucide="${cl.icon}" class="size-4"></i></span>
//               <div>
//                 <div class="text-[15px] font-semibold text-1 tracking-tight">${cl.name}</div>
//                 <div class="text-[11px] text-3">${c.title} &middot; ${c.period}</div>
//               </div>
//             </div>
//             <div class="text-right">
//               <div class="text-[10px] uppercase tracking-wider" style="color:var(--text-4);letter-spacing:0.09em">Prepared by</div>
//               <div class="text-[12.5px] font-medium text-2 mt-0.5">${c.preparedBy}</div>
//               <div class="mono text-[10px] text-3 mt-0.5 flex items-center gap-1 justify-end"><i data-lucide="globe" class="size-2.5"></i>${c.delivery}</div>
//             </div>
//           </div>
//
//           <!-- executive summary block (drafted narrative) -->
//           <div class="px-7 py-5" style="border-bottom:1px solid var(--line-1)">
//             <div class="flex items-center gap-2 mb-2">
//               <span class="eyebrow">Executive summary</span>
//               <span class="tag tag-amber" style="font-size:9px;padding:1px 6px">draft - awaiting approval</span>
//             </div>
//             <p class="text-[12.5px] text-2 leading-relaxed">${c.summary}</p>
//           </div>
//
//           <!-- KPI summary row -->
//           <div class="grid grid-cols-4" style="border-bottom:1px solid var(--line-1)">${kpiRow}</div>
//
//           <!-- blended chart + goals -->
//           <div class="grid grid-cols-12">
//             <div class="col-span-7 p-6" style="border-right:1px solid var(--line-1)">
//               <div class="flex items-center justify-between mb-1">
//                 <div class="text-[12.5px] font-medium text-1">Leads by channel</div>
//                 <span class="text-[10px] text-3">blended &middot; 6 months</span>
//               </div>
//               <div class="text-[11px] text-3 mb-4">What single-channel tools cannot show: every channel's contribution to one outcome.</div>
//               <div style="height:170px"><canvas id="rep-builder-chart" height="170"></canvas></div>
//               <div class="flex items-center gap-4 mt-4 pt-3" style="border-top:1px solid var(--line-1)">
//                 ${c.chart.datasets.map(d => `<div class="flex items-center gap-1.5 text-[11px]"><span class="size-2 rounded-full" style="background:${d.color}"></span><span class="text-2">${d.label}</span><span class="num text-3">${d.data[d.data.length - 1]}</span></div>`).join('')}
//               </div>
//             </div>
//             <div class="col-span-5 p-6">
//               <div class="text-[12.5px] font-medium text-1 mb-1">Goals vs target</div>
//               <div class="text-[11px] text-3 mb-4">June pacing against the quarter plan.</div>
//               ${goalsBlock}
//             </div>
//           </div>
//
//           <!-- channel performance table -->
//           <div class="px-6 pb-6" style="border-top:1px solid var(--line-1)">
//             <div class="text-[12.5px] font-medium text-1 pt-5 mb-3">Channel performance</div>
//             <table class="table">
//               <thead><tr><th>Channel</th><th class="text-right">Spend</th><th class="text-right">Leads</th><th class="text-right">Cost / lead</th><th class="text-right">ROAS</th><th class="text-right">MoM</th><th>Note</th></tr></thead>
//               <tbody>${chanRows}</tbody>
//             </table>
//           </div>
//         </div>
//       </div>`;
//
//     // ---- ASIDE: report settings ----
//     const s = b.settings;
//     const settingRow = (k, v) => `<div class="flex items-center justify-between py-2" style="border-top:1px solid var(--line-1)"><span class="text-[11px] text-3">${k}</span><span class="text-[11.5px] text-1 ml-2 truncate text-right">${v}</span></div>`;
//     const toggleRow = (k, on) => `<div class="flex items-center justify-between py-2" style="border-top:1px solid var(--line-1)"><span class="text-[11px] text-3">${k}</span><span class="status status-${on ? 'green' : 'slate'}">${on ? 'On' : 'Off'}</span></div>`;
//
//     const aside = `
//       <div class="px-4 py-3.5" style="border-bottom:1px solid var(--line-1)">
//         <div class="text-[12px] font-semibold text-1">Report settings</div>
//         <div class="text-[10.5px] text-3 mt-0.5">Applies to this report's schedule and branding.</div>
//       </div>
//       <div class="px-4 py-3">
//         <div class="eyebrow mb-1">Client</div>
//         <div class="flex items-center gap-2 mb-3">
//           <span class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:${clientColor(s.client)}1a;color:${clientColor(s.client)}"><i data-lucide="${clientIcon(s.client)}" class="size-3"></i></span>
//           <span class="text-[12.5px] text-1 font-medium">${clientName(s.client)}</span>
//         </div>
//         <div class="eyebrow mb-1">Cadence</div>
//         ${settingRow('Frequency', s.cadence)}
//         ${settingRow('Send time', s.sendDay)}
//         ${settingRow('Recipients', s.recipients + ' stakeholders')}
//         <div class="eyebrow mb-1 mt-4">Branding</div>
//         ${settingRow('Template', s.template)}
//         ${settingRow('From name', s.branding)}
//         ${settingRow('Domain', `<span class="mono text-[11px]">${s.domain}</span>`)}
//         <div class="flex items-center justify-between py-2" style="border-top:1px solid var(--line-1)"><span class="text-[11px] text-3">Accent</span><span class="flex items-center gap-1.5"><span class="size-3 rounded shrink-0" style="background:${s.accent}"></span><span class="mono text-[10.5px] text-3">${s.accent}</span></span></div>
//         <div class="eyebrow mb-1 mt-4">Approval</div>
//         ${toggleRow('Draft narrative', s.narrativeDraft)}
//         ${toggleRow('Require approval', s.requireApproval)}
//       </div>
//       <div class="px-4 py-3.5 mt-1" style="border-top:1px solid var(--line-1)">
//         <div class="flex flex-col gap-1.5">
//           ${UI.btn('Send preview', { variant: 'secondary', size: 'sm', icon: 'send', onClick: "toast('Preview link copied','success')" })}
//           ${UI.btn('Save report', { variant: 'primary', size: 'sm', icon: 'check' }).replace('<button', `<button data-action="confirm" data-toast="Report saved"`)}
//         </div>
//       </div>`;
//
//     const top = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Report builder',
//         sub: 'Compose a white-label report by blending cross-channel widgets onto a branded canvas. Nothing sends until approved.',
//         actions: `${UI.btn('All reports', { variant: 'secondary', size: 'sm', icon: 'list' }).replace('<button', `<button data-action="navigate" data-route="reporting"`)}
//           ${UI.btn('Templates', { variant: 'secondary', size: 'sm', icon: 'layout-template' }).replace('<button', `<button data-action="navigate" data-route="reporting.templates"`)}`,
//       })}
//       ${subNav('reporting.builder')}
//     </div>`;
//
//     return `<div class="flex flex-col" style="height:calc(100vh - 44px)">
//       ${top}
//       <div style="flex:1;min-height:0">
//         ${LX.workspace({ cols: '280px 1fr 300px', rail, main, aside })}
//       </div>
//     </div>`;
//   };
//
//   window.PAGES_AFTER['reporting.builder'] = function () {
//     const c = R().builder.canvas;
//     CHARTS.line('rep-builder-chart', c.chart.labels, c.chart.datasets.map(d => ({
//       label: d.label, data: d.data, borderColor: d.color, backgroundColor: d.color + '14', fill: true,
//     })), {
//       plugins: { legend: { display: false } },
//       scales: {
//         x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10 }, maxRotation: 0 }, border: { display: false } },
//         y: { grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 } }, border: { display: false } },
//       },
//     });
//   };
//
//   // ====================================================================
//   // PAGES['reporting.scheduled'] :: DENSE LIST - scheduled sends
//   // ====================================================================
//   window.PAGES['reporting.scheduled'] = function () {
//     const reports = R().reports.filter(x => x.status !== 'draft');
//     // soonest first
//     const rows = reports.slice().sort((a, b) => a.nextSendIn - b.nextSendIn);
//     const pending = rows.filter(x => x.approval === 'pending').length;
//     const dueWeek = rows.filter(x => x.nextSendIn <= 7).length;
//
//     const header = LX.modHead({
//       title: 'Scheduled sends',
//       sub: rows.length + ' reports queued on cadence - ' + dueWeek + ' sending within 7 days, ' + pending + ' still awaiting approval.',
//       stats: [
//         { k: 'Queued', v: rows.length },
//         { k: 'Due this week', v: dueWeek },
//         { k: 'Pending approval', v: pending },
//         { k: 'Recipients', v: rows.reduce((s, x) => s + x.recipients, 0) },
//       ],
//       actions: `${UI.btn('Approve all pending', { variant: 'secondary', size: 'sm', icon: 'check-check' }).replace('<button', `<button data-action="confirm" data-toast="${pending} reports approved"`)}
//         ${UI.btn('Schedule report', { variant: 'primary', size: 'sm', icon: 'calendar-plus' }).replace('<button', `<button data-action="modal" data-title="Schedule report"`)}`,
//     });
//
//     const list = LX.dataList({
//       columns: [
//         { key: 'name', label: 'Report', render: (x) => `
//           <div class="flex items-center gap-2.5">
//             <span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(x.client)}"></span>
//             <div class="min-w-0"><div class="text-[12.5px] text-1 font-medium truncate" style="max-width:280px">${x.name}</div><div class="text-[10px] text-3">${x.cadence} &middot; ${x.template}</div></div>
//           </div>` },
//         { key: 'client', label: 'Client', render: (x) => clientCell(x.client) },
//         { key: 'nextSendIn', label: 'Next send', align: 'r', mono: true, render: (x) => `<span class="text-1" data-tooltip="${shortDate(daysAhead(x.nextSendIn))}">${shortDate(daysAhead(x.nextSendIn))}</span>` },
//         { key: 'lastSent', label: 'Last sent', align: 'r', mono: true, render: (x) => `<span class="text-3" data-tooltip="${shortDate(daysAgo(x.lastSent))}">${x.lastSent}d ago</span>` },
//         { key: 'approval', label: 'Approval', render: (x) => approvalTag(x.approval) },
//         { key: 'recipients', label: 'Recipients', align: 'r', mono: true, render: (x) => `<span class="text-2">${x.recipients}</span>` },
//         { key: 'action', label: 'Action', align: 'r', width: '170px', render: (x) => `<div class="flex items-center gap-1 justify-end" onclick="event.stopPropagation()">
//             ${x.approval === 'pending'
//               ? `<button class="btn btn-primary btn-sm" data-action="confirm" data-toast="${esc(clientName(x.client))} report approved"><span>Approve</span></button>`
//               : `<button class="btn btn-secondary btn-sm" data-action="confirm" data-toast="Send paused"><span>Pause</span></button>`}
//           </div>` },
//       ],
//       rows,
//       rowAttrs: (x) => `data-action="detail" data-title="${esc(x.name)}" data-sub="${x.cadence} - next ${shortDate(daysAhead(x.nextSendIn))}" data-kv='[["Client","${esc(clientName(x.client))}"],["Next send","${shortDate(daysAhead(x.nextSendIn))}"],["Last sent","${shortDate(daysAgo(x.lastSent))}"],["Recipients","${x.recipients}"],["Approval","${(APPROVAL[x.approval] || APPROVAL['n/a']).label}"],["Domain","${x.delivery}"]]'`,
//     });
//
//     return `${header}${subNav('reporting.scheduled')}
//       <div class="surface overflow-hidden">${list}</div>`;
//   };
//
//   // ====================================================================
//   // PAGES['reporting.templates'] :: GALLERY - template library
//   // ====================================================================
//   window.PAGES['reporting.templates'] = function () {
//     const t = R().templates;
//
//     const header = LX.modHead({
//       title: 'Report templates',
//       sub: t.length + ' reusable starting points - branded and channel-aware out of the box. Pick one to seed a new report.',
//       stats: [
//         { k: 'Templates', v: t.length },
//         { k: 'Default', v: t.filter(x => x.default).length },
//         { k: 'Most used', v: (t.slice().sort((a, b) => b.uses - a.uses)[0] || {}).name },
//         { k: 'Total uses', v: t.reduce((s, x) => s + x.uses, 0) },
//       ],
//       actions: `${UI.btn('Import template', { variant: 'secondary', size: 'sm', icon: 'upload' }).replace('<button', `<button data-action="modal" data-title="Import template"`)}
//         ${UI.btn('New template', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New template"`)}`,
//     });
//
//     const tiles = t.map(tpl => {
//       const kv = `[["Channels","${tpl.channels}"],["Sections","${tpl.sections}"],["Used by","${tpl.uses} reports"],["Default","${tpl.default ? 'yes' : 'no'}"]]`;
//       return `<div class="tile" data-action="detail" data-title="${esc(tpl.name)}" data-sub="Report template" data-kv='${kv}'>
//         <div class="tile-media" style="aspect-ratio:16/9;background:linear-gradient(160deg, ${tpl.accent}26, ${tpl.accent}0d)">
//           <div class="absolute inset-0 flex items-center justify-center"><i data-lucide="${tpl.icon}" class="size-7" style="color:${tpl.accent};opacity:0.9"></i></div>
//           ${tpl.default ? `<span class="absolute top-2 right-2 status status-green" style="background:var(--bg-0);padding:2px 7px;border-radius:5px">Default</span>` : `<span class="absolute top-2 right-2 text-[9.5px] num px-1.5 py-0.5 rounded" style="background:var(--bg-0);color:var(--text-2);box-shadow:inset 0 0 0 1px var(--line-1)">${tpl.uses} uses</span>`}
//         </div>
//         <div class="p-4">
//           <div class="text-[13px] font-medium text-1 mb-1">${tpl.name}</div>
//           <div class="text-[11px] text-3 leading-snug mb-3" style="min-height:30px">${tpl.blurb}</div>
//           <div class="flex items-center gap-3 mb-3 text-[10px] text-3 num">
//             <span class="flex items-center gap-1"><i data-lucide="layers" class="size-2.5"></i>${tpl.channels} channels</span>
//             <span class="flex items-center gap-1"><i data-lucide="rows-3" class="size-2.5"></i>${tpl.sections} sections</span>
//           </div>
//           <div class="flex items-center gap-1.5 pt-3" style="border-top:1px solid var(--line-1)" onclick="event.stopPropagation()">
//             <button class="btn btn-primary btn-sm" style="flex:1" data-action="navigate" data-route="reporting.builder"><i data-lucide="pencil-ruler" class="size-3.5"></i><span>Use template</span></button>
//             <button class="btn btn-secondary btn-sm" data-action="detail" data-title="${esc(tpl.name)}" data-sub="Report template preview" data-kv='${kv}'><i data-lucide="eye" class="size-3.5"></i></button>
//           </div>
//         </div>
//       </div>`;
//     });
//
//     return `${header}${subNav('reporting.templates')}<div class="gallery" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">${tiles.join('')}</div>`;
//   };
//
//   // ====================================================================
//   // PAGES['reporting.whitelabel'] :: SETTINGS PANELS
//   //   per-client branding panels
//   // ====================================================================
//   window.PAGES['reporting.whitelabel'] = function () {
//     const w = R().whitelabel;
//     const verified = w.filter(p => p.sslVerified).length;
//     const custom = w.filter(p => p.domain !== 'reports.growthboost.io').length;
//
//     const header = LX.modHead({
//       title: 'White-label branding',
//       sub: w.length + ' client branding profiles - logo color, accent, custom domain and login. Applied to every report automatically.',
//       stats: [
//         { k: 'Profiles', v: w.length },
//         { k: 'Custom domains', v: custom },
//         { k: 'SSL verified', v: verified + ' / ' + w.length },
//         { k: 'Reports branded', v: w.reduce((s, p) => s + p.reports, 0) },
//       ],
//       actions: `${UI.btn('Add domain', { variant: 'secondary', size: 'sm', icon: 'globe' }).replace('<button', `<button data-action="modal" data-title="Add custom domain"`)}
//         ${UI.btn('New profile', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New branding profile"`)}`,
//     });
//
//     // each client = one settings panel
//     function brandPanel(p) {
//       const cl = window.getClient(p.client);
//       const customDomain = p.domain !== 'reports.growthboost.io';
//       const fieldRow = (k, v) => `<div class="flex items-center justify-between py-2.5" style="border-top:1px solid var(--line-1)"><span class="text-[11px] text-3">${k}</span><span class="text-[11.5px] text-1 ml-2 text-right truncate">${v}</span></div>`;
//       const checkRow = (k, on, onLabel, offLabel) => `<div class="flex items-center justify-between py-2.5" style="border-top:1px solid var(--line-1)"><span class="text-[11px] text-3">${k}</span><span class="status status-${on ? 'green' : 'slate'}">${on ? (onLabel || 'On') : (offLabel || 'Off')}</span></div>`;
//
//       const head = `<div class="flex items-center gap-3">
//         <span class="size-9 rounded-lg flex items-center justify-center shrink-0" style="background:${p.accent}1f;color:${p.accent};box-shadow:inset 0 0 0 1px ${p.accent}55"><i data-lucide="${cl.icon}" class="size-4"></i></span>
//         <div class="min-w-0">
//           <div class="text-[13.5px] font-semibold text-1 truncate">${cl.name}</div>
//           <div class="text-[10.5px] text-3 num">${p.reports} branded report${p.reports === 1 ? '' : 's'}</div>
//         </div>
//       </div>`;
//
//       const actions = customDomain && p.sslVerified
//         ? `<span class="status status-green">Live</span>`
//         : customDomain ? `<span class="status status-amber">DNS pending</span>`
//         : `<span class="status status-slate">Shared</span>`;
//
//       // logo color + accent swatches row
//       const swatches = `<div class="flex items-center gap-4 px-4 py-3.5" style="background:var(--bg-2)">
//         <div class="flex items-center gap-2"><span class="size-7 rounded-md shrink-0" style="background:${cl.logoColor}"></span><div><div class="eyebrow mb-0.5">Logo</div><div class="mono text-[10.5px] text-3">${cl.logoColor}</div></div></div>
//         <div class="flex items-center gap-2"><span class="size-7 rounded-md shrink-0" style="background:${p.accent}"></span><div><div class="eyebrow mb-0.5">Accent</div><div class="mono text-[10.5px] text-3">${p.accent}</div></div></div>
//         <div class="flex-1"></div>
//         <button class="btn btn-ghost btn-sm" data-action="modal" data-title="Edit ${esc(cl.name)} palette"><i data-lucide="palette" class="size-3.5"></i><span>Edit</span></button>
//       </div>`;
//
//       const body = `
//         ${swatches}
//         <div class="px-4 pt-1 pb-3">
//           ${fieldRow('From name', p.fromName)}
//           ${fieldRow('Custom domain', `<span class="mono text-[11px] flex items-center gap-1 justify-end"><i data-lucide="globe" class="size-3 text-3"></i>${p.domain}</span>`)}
//           ${fieldRow('Client login', `<span class="mono text-[11px]">${p.login}</span>`)}
//           ${checkRow('SSL certificate', p.sslVerified, 'Verified', 'Pending DNS')}
//           ${checkRow('Custom favicon', p.faviconSet, 'Set', 'Default')}
//           ${checkRow('Custom CSS', p.customCss, 'Active', 'Off')}
//         </div>
//         <div class="px-4 py-3 flex items-center gap-1.5" style="border-top:1px solid var(--line-1)">
//           ${!p.sslVerified ? UI.btn('Verify DNS', { variant: 'primary', size: 'sm', icon: 'shield-check' }).replace('<button', `<button data-action="confirm" data-toast="DNS check queued"`) : UI.btn('Preview portal', { variant: 'secondary', size: 'sm', icon: 'external-link', onClick: "toast('Opening branded portal','info')" })}
//           ${UI.btn('Settings', { variant: 'ghost', size: 'sm', icon: 'settings-2' }).replace('<button', `<button data-action="modal" data-title="${esc(cl.name)} branding settings"`)}
//         </div>`;
//
//       return `<div class="panel">
//         <div class="panel-head">${head}<div class="flex items-center gap-1 shrink-0">${actions}</div></div>
//         <div class="panel-bare">${body}</div>
//       </div>`;
//     }
//
//     const panels = w.map(p => `<div>${brandPanel(p)}</div>`).join('');
//
//     return `${header}${subNav('reporting.whitelabel')}
//       <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3.5">${panels}</div>`;
//   };
//
// })();
//