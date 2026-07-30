// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    CRM & Sales macro - hub + dense micro sub-modules.
//    Each sub-module is its assigned archetype, structurally
//    distinct from its siblings:
//      crm           :: BOARD       (full-bleed sales kanban)
//      crm.leads     :: DENSE LIST  (full-bleed)
//      crm.contacts  :: DENSE LIST  (full-bleed)
//      crm.deals     :: DENSE LIST  (full-bleed)
//      crm.forecast  :: CONSOLE     (panel grid + charts)
//    Recommendations are proposed; the team reviews before
//    anything sends. Plain product language throughout.
//    ============================================================ */
//
// window.PAGES = window.PAGES || {};
// window.PAGES_AFTER = window.PAGES_AFTER || {};
// window.FULLBLEED = window.FULLBLEED || new Set();
// window.FULLBLEED.add('crm');
// window.FULLBLEED.add('crm.leads');
// window.FULLBLEED.add('crm.contacts');
// window.FULLBLEED.add('crm.deals');
//
// (function () {
//   const C = () => window.CRM;
//
//   // ---- shared lookups ----
//   const ownerName = (id) => { const t = getTeam(id); return t ? t.name : id; };
//   const ownerFirst = (id) => ownerName(id).split(' ')[0];
//   const ownerColor = (id) => { const t = getTeam(id); return t ? t.avatarColor : '#6366f1'; };
//   const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');
//   const scoreColor = (s) => s >= 85 ? 'var(--acc)' : s >= 70 ? 'var(--amber)' : 'var(--text-3)';
//   const scoreCls = (s) => s >= 85 ? 'text-acc' : s >= 70 ? 'text-amber' : 'text-3';
//   const stageLabel = (id) => { const s = C().stages.find(x => x.id === id); return s ? s.label : id; };
//   const stageDot = (id) => { const s = C().stages.find(x => x.id === id); return s ? s.dot : 'slate'; };
//   const sourceColor = { 'Referral': '#38bdf8', 'GBP': '#10b981', 'Landing page': '#a78bfa', 'Paid ad': '#f59e0b' };
//
//   const ownerCell = (id) => `<span class="flex items-center gap-2">${UI.avatar(ownerName(id), ownerColor(id), 18)}<span class="text-[12px] text-2">${ownerFirst(id)}</span></span>`;
//   const sourceCell = (s) => `<span class="flex items-center gap-1.5"><span class="size-1.5 rounded-full shrink-0" style="background:${sourceColor[s] || 'var(--text-3)'}"></span><span class="text-[12px] text-2">${s}</span></span>`;
//
//   // sub-nav tab strip shared across the macro
//   function subNav(active) {
//     const items = [
//       { id: 'crm',          label: 'Pipeline' },
//       { id: 'crm.leads',    label: 'Leads' },
//       { id: 'crm.contacts', label: 'Contacts' },
//       { id: 'crm.deals',    label: 'Deals' },
//       { id: 'crm.forecast', label: 'Forecast' },
//     ];
//     return `<div class="flex items-center gap-1 mb-5 -mt-1 flex-wrap">${items.map(it =>
//       `<button class="px-2.5 py-1 rounded-md text-[12px] font-medium ${it.id === active ? 'text-1' : 'text-3 hover:text-1'}" ${it.id === active ? 'style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"' : ''} data-action="navigate" data-route="${it.id}">${it.label}</button>`
//     ).join('')}</div>`;
//   }
//
//   const leadStatusLabel = { 'new': 'New', 'contacted': 'Contacted', 'qualified': 'Qualified', 'stalled': 'Stalled' };
//   const leadStatusDot = { 'new': 'slate', 'contacted': 'sky', 'qualified': 'green', 'stalled': 'amber' };
//
//   // ====================================================================
//   // PAGES.crm :: BOARD - full-bleed sales kanban (hub)
//   // ====================================================================
//   window.PAGES.crm = function () {
//     const c = C(); const k = c.kpis;
//     const byStage = {};
//     c.stages.forEach(s => byStage[s.id] = c.deals.filter(d => d.stage === s.id));
//     const totalOpen = c.deals.filter(d => d.stage !== 'won').length;
//     const wonSum = byStage['won'].reduce((a, d) => a + d.value, 0);
//
//     const dealCard = (d) => {
//       const flag = d.risk ? `<span class="status status-red text-[10px]">At risk</span>` : '';
//       const kv = JSON.stringify([
//         ['Value', formatMoney(d.value) + '/mo'],
//         ['Source', d.source],
//         ['Owner', ownerName(d.owner)],
//         ['Score', String(d.score)],
//         ['Stage', stageLabel(d.stage)],
//         ['In stage', d.daysInStage + ' days'],
//         ['Expected close', d.expClose === 0 ? 'Closed' : shortDate(daysAhead(d.expClose))],
//       ]);
//       return `
//         <div class="kanban-card" data-action="detail" data-title="${esc(d.company)}" data-sub="${d.source} lead - ${ownerName(d.owner)}" data-kv='${kv}'>
//           <div class="flex items-start justify-between mb-1.5 gap-2">
//             <div class="text-[12px] font-semibold text-1 leading-tight">${d.company}</div>
//             <span class="text-[11px] num shrink-0" style="color:${scoreColor(d.score)}">${d.score}</span>
//           </div>
//           <div class="flex items-center justify-between mb-2">
//             <span class="text-[13px] font-semibold num text-1">${formatMoney(d.value)}<span class="text-[10px] text-3 font-normal">/mo</span></span>
//             ${sourceCell(d.source)}
//           </div>
//           <div class="flex items-center justify-between pt-2" style="border-top: 1px solid var(--line-1);">
//             <div class="flex items-center gap-1.5">
//               ${UI.avatar(ownerName(d.owner), ownerColor(d.owner), 18)}
//               <span class="text-[10px] text-3 flex items-center gap-1"><i data-lucide="clock" class="size-2.5"></i>${d.daysInStage}d</span>
//             </div>
//             ${flag}
//           </div>
//         </div>`;
//     };
//
//     const columns = c.stages.map(s => {
//       const cards = byStage[s.id];
//       const sum = cards.reduce((a, x) => a + x.value, 0);
//       return {
//         label: s.label, statusDot: s.dot, cards,
//         footer: `<span class="text-2">${cards.length} deals</span> <span class="text-1 font-medium">${formatMoney(sum)}/mo</span>`,
//       };
//     });
//
//     const header = `<div class="crm-head">
//       ${LX.modHead({
//         title: 'Sales pipeline',
//         sub: 'New-business pipeline for ' + window.AGENCY.name + ' - every deal from inbound through close. ' + window.AGENCY.period + ', mid-cycle.',
//         stats: [
//           { k: 'Open deals', v: totalOpen, delta: k.openDealsDelta, deltaUnit: '' },
//           { k: 'Weighted pipeline', v: formatMoney(k.weightedUsd), delta: k.pipelineDelta, deltaUnit: '%' },
//           { k: 'Win rate', v: k.winRate + '%', delta: k.winRateDelta, deltaUnit: 'pt' },
//           { k: 'Avg deal', v: formatMoney(k.avgDealUsd), delta: k.avgDealDelta, deltaUnit: '%' },
//         ],
//         actions: `
//           ${UI.btn('Import leads', { variant: 'secondary', size: 'sm', icon: 'upload' })}
//           ${UI.btn('New deal', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New deal"`)}`,
//       })}
//       ${subNav('crm')}
//     </div>`;
//
//     const lostFooter = `<div class="crm-foot">
//       <div class="flex items-center gap-2 min-w-0">
//         <i data-lucide="x-circle" class="size-3.5 text-red shrink-0"></i>
//         <span class="text-[12px] text-2">Lost this month</span>
//         <span class="text-[12px] num text-1 font-medium">${c.lostMTD} deals</span>
//         <span class="text-[11px] text-3">&middot;</span>
//         <span class="text-[12px] num text-3">${formatMoney(c.lostValueUsd)} forfeited</span>
//       </div>
//       <div class="flex items-center gap-2 shrink-0">
//         ${c.atRisk.map(r => `<span class="status status-amber text-[11px]" data-action="detail" data-title="${esc(r.company)}" data-sub="At risk - ${formatMoney(r.value)}/mo" data-kv='[["Issue","${esc(r.reason)}"],["Suggested action","${esc(r.action)}"],["Value","${formatMoney(r.value)}/mo"]]' style="cursor:pointer">${r.company}</span>`).join('')}
//         <button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="crm.deals">All deals &rarr;</button>
//       </div>
//     </div>`;
//
//     return `${styles}
//       <div class="crm-shell">
//         ${header}
//         <div class="crm-board">
//           ${UI.kanban({ columns, renderCard: dealCard })}
//         </div>
//         ${lostFooter}
//       </div>`;
//   };
//
//   // ====================================================================
//   // PAGES['crm.leads'] :: DENSE LIST (full-bleed)
//   // ====================================================================
//   window.PAGES['crm.leads'] = function () {
//     const c = C();
//     const qualified = c.leads.filter(l => l.status === 'qualified').length;
//     const avgScore = Math.round(c.leads.reduce((s, l) => s + l.score, 0) / c.leads.length);
//     const highIntent = c.leads.filter(l => l.score >= 85).length;
//
//     const header = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Leads',
//         sub: c.leads.length + ' open leads scored by ICP fit - ' + qualified + ' qualified, ' + highIntent + ' high-intent.',
//         stats: [
//           { k: 'Open leads', v: c.leads.length, delta: c.kpis.newLeadsDelta, deltaUnit: '%' },
//           { k: 'Qualified', v: qualified },
//           { k: 'High intent', v: highIntent },
//           { k: 'Avg score', v: avgScore },
//         ],
//         actions: `${UI.btn('Import', { variant: 'secondary', size: 'sm', icon: 'upload' })}
//           ${UI.btn('Add lead', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="Add lead"`)}`,
//       })}
//       ${subNav('crm.leads')}
//       <div class="toolbar" style="margin-bottom:0">
//         ${UI.searchInput('Search leads', 'w-72')}
//         ${LX.segmented([
//           { id: 'all', label: 'All' }, { id: 'new', label: 'New' }, { id: 'contacted', label: 'Contacted' },
//           { id: 'qualified', label: 'Qualified' }, { id: 'stalled', label: 'Stalled' },
//         ])}
//         <div class="grow"></div>
//         ${UI.btn('Source', { variant: 'ghost', size: 'sm', icon: 'filter' }).replace('<button', `<button data-action="menu" data-menu='["All sources","Referral","GBP","Landing page","Paid ad"]'`)}
//       </div></div>`;
//
//     function rowsFor(filter) {
//       return c.leads.filter(l => filter === 'all' ? true : l.status === filter);
//     }
//     function listFor(filter) {
//       return LX.dataList({
//         columns: [
//           { key: 'name', label: 'Lead', render: (l) => `
//             <div class="flex items-center gap-2.5">
//               ${UI.avatar(l.name, ownerColor(l.owner), 26)}
//               <div class="min-w-0">
//                 <div class="text-[12.5px] text-1 font-medium truncate">${l.name}</div>
//                 <div class="text-[10.5px] text-3 truncate">${l.company}</div>
//               </div>
//             </div>` },
//           { key: 'source', label: 'Source', render: (l) => sourceCell(l.source) },
//           { key: 'score', label: 'Score', width: '150px', render: (l) => `
//             <div class="flex items-center gap-2">
//               <div style="width:64px">${LX.bar(l.score, scoreColor(l.score))}</div>
//               <span class="num text-[12px] font-medium ${scoreCls(l.score)}">${l.score}</span>
//             </div>` },
//           { key: 'owner', label: 'Owner', render: (l) => ownerCell(l.owner) },
//           { key: 'status', label: 'Status', render: (l) => `<span class="status status-${leadStatusDot[l.status]}">${leadStatusLabel[l.status]}</span>` },
//           { key: 'days', label: 'Created', align: 'r', mono: true, render: (l) => `<span class="text-3">${l.days === 0 ? 'Today' : shortDate(daysAgo(l.days))}</span>` },
//           { key: 'act', label: '', align: 'r', width: '120px', render: (l) => `<div onclick="event.stopPropagation()">
//             ${l.status === 'qualified'
//               ? `<button class="btn btn-secondary btn-sm" data-action="confirm" data-toast="Converted to deal"><span>Convert</span></button>`
//               : `<button class="btn btn-ghost btn-sm" data-action="confirm" data-toast="Contact logged"><span>Contact</span></button>`}
//           </div>` },
//         ],
//         rows: rowsFor(filter),
//         rowAttrs: (l) => `data-action="detail" data-title="${esc(l.name)}" data-sub="${esc(l.company)} - ${l.source} lead" data-kv='[["Company","${esc(l.company)}"],["Source","${l.source}"],["Score","${l.score}"],["Owner","${esc(ownerName(l.owner))}"],["Status","${leadStatusLabel[l.status]}"],["Created","${l.days === 0 ? 'Today' : shortDate(daysAgo(l.days))}"]]'`,
//       });
//     }
//
//     const panes = ['all', 'new', 'contacted', 'qualified', 'stalled'].map((f, i) =>
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
//   // PAGES['crm.contacts'] :: DENSE LIST (full-bleed)
//   // ====================================================================
//   window.PAGES['crm.contacts'] = function () {
//     const c = C();
//     const withDeals = c.contacts.filter(x => x.openDeals > 0).length;
//
//     const header = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Contacts',
//         sub: c.contacts.length + ' contacts on record - appended from each lead source, ' + withDeals + ' with open deals.',
//         stats: [
//           { k: 'Contacts', v: c.contacts.length },
//           { k: 'With open deals', v: withDeals },
//           { k: 'Decision-makers', v: c.contacts.filter(x => /Owner|Founder|VP|CFO|Director|GM/.test(x.title)).length },
//           { k: 'Enriched', v: c.contacts.filter(x => x.enriched !== 'Manual').length },
//         ],
//         actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
//           ${UI.btn('Add contact', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="Add contact"`)}`,
//       })}
//       ${subNav('crm.contacts')}
//       <div class="toolbar" style="margin-bottom:0">
//         ${UI.searchInput('Search contacts', 'w-72')}
//         <div class="grow"></div>
//         ${UI.btn('Owner', { variant: 'ghost', size: 'sm', icon: 'filter' }).replace('<button', `<button data-action="menu" data-menu='["All owners","Dana","Omar","Sara","Khizer","Aimen"]'`)}
//       </div></div>`;
//
//     const list = LX.dataList({
//       columns: [
//         { key: 'name', label: 'Contact', render: (r) => `
//           <div class="flex items-center gap-2.5">
//             ${UI.avatar(r.name, ownerColor(r.owner), 26)}
//             <div class="min-w-0">
//               <div class="text-[12.5px] text-1 font-medium truncate">${r.name}</div>
//               <div class="text-[10.5px] text-3 truncate">${r.title}</div>
//             </div>
//           </div>` },
//         { key: 'company', label: 'Company', render: (r) => `<span class="text-[12px] text-2 truncate" style="display:inline-block;max-width:200px">${r.company}</span>` },
//         { key: 'email', label: 'Email', render: (r) => `<span class="num text-[11px] text-3 truncate" style="display:inline-block;max-width:230px">${r.email}</span>` },
//         { key: 'days', label: 'Last touch', align: 'r', mono: true, render: (r) => `<span class="text-3">${r.days === 0 ? 'Today' : shortDate(daysAgo(r.days))}</span>` },
//         { key: 'openDeals', label: 'Open deals', align: 'r', mono: true, render: (r) => r.openDeals > 0 ? `<span class="text-1 font-medium">${r.openDeals}</span>` : `<span class="text-4">-</span>` },
//         { key: 'owner', label: 'Owner', render: (r) => ownerCell(r.owner) },
//         { key: 'src', label: 'Source', align: 'r', render: (r) => `${UI.pill(r.enriched, 'slate')}` },
//       ],
//       rows: c.contacts,
//       rowAttrs: (r) => `data-action="detail" data-title="${esc(r.name)}" data-sub="${esc(r.title)} - ${esc(r.company)}" data-kv='[["Title","${esc(r.title)}"],["Company","${esc(r.company)}"],["Email","${esc(r.email)}"],["Phone","${esc(r.phone)}"],["Owner","${esc(ownerName(r.owner))}"],["Open deals","${r.openDeals}"],["Source","${esc(r.enriched)}"]]'`,
//     });
//
//     return `<div class="flex flex-col" style="min-height:calc(100vh - 44px)">
//       ${header}
//       <div style="margin-top:10px">${list}</div>
//     </div>`;
//   };
//
//   // ====================================================================
//   // PAGES['crm.deals'] :: DENSE LIST (full-bleed)
//   // ====================================================================
//   window.PAGES['crm.deals'] = function () {
//     const c = C();
//     const open = c.deals.filter(d => d.stage !== 'won');
//     const openSum = open.reduce((s, d) => s + d.value, 0);
//     const wonSum = c.deals.filter(d => d.stage === 'won').reduce((s, d) => s + d.value, 0);
//     const atRisk = c.deals.filter(d => d.risk).length;
//
//     const header = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Deals',
//         sub: c.deals.length + ' deals in the book - ' + open.length + ' open worth ' + formatMoney(openSum) + '/mo, ' + atRisk + ' flagged at risk.',
//         stats: [
//           { k: 'Open MRR', v: formatMoney(openSum) },
//           { k: 'Open deals', v: open.length },
//           { k: 'Won MTD', v: formatMoney(wonSum) },
//           { k: 'At risk', v: atRisk },
//         ],
//         actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
//           ${UI.btn('New deal', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New deal"`)}`,
//       })}
//       ${subNav('crm.deals')}
//       <div class="toolbar" style="margin-bottom:0">
//         ${UI.searchInput('Search deals', 'w-72')}
//         ${LX.segmented([
//           { id: 'all', label: 'All' }, { id: 'new', label: 'New' }, { id: 'qualified', label: 'Qualified' },
//           { id: 'proposal', label: 'Proposal' }, { id: 'negotiation', label: 'Negotiation' }, { id: 'won', label: 'Won' },
//         ])}
//         <div class="grow"></div>
//         ${UI.btn('Owner', { variant: 'ghost', size: 'sm', icon: 'filter' }).replace('<button', `<button data-action="menu" data-menu='["All owners","Dana","Omar","Sara","Khizer","Aimen"]'`)}
//       </div></div>`;
//
//     function rowsFor(filter) {
//       return c.deals.filter(d => filter === 'all' ? true : d.stage === filter);
//     }
//     function listFor(filter) {
//       return LX.dataList({
//         columns: [
//           { key: 'company', label: 'Deal', render: (d) => `
//             <div class="flex items-center gap-2.5">
//               ${d.risk ? `<i data-lucide="triangle-alert" class="size-3 text-amber shrink-0"></i>` : `<span class="size-1.5 rounded-full shrink-0" style="background:${scoreColor(d.score)}"></span>`}
//               <div class="min-w-0">
//                 <div class="text-[12.5px] text-1 font-medium truncate" style="max-width:240px">${d.company}</div>
//                 <div class="text-[10.5px] text-3 num">${d.id} &middot; score ${d.score}</div>
//               </div>
//             </div>` },
//           { key: 'source', label: 'Source', render: (d) => sourceCell(d.source) },
//           { key: 'value', label: 'Value', align: 'r', mono: true, render: (d) => `<span class="text-1 font-medium">${formatMoney(d.value)}</span><span class="text-[10px] text-3">/mo</span>` },
//           { key: 'stage', label: 'Stage', render: (d) => `<span class="status status-${stageDot(d.stage)}">${stageLabel(d.stage)}</span>` },
//           { key: 'owner', label: 'Owner', render: (d) => ownerCell(d.owner) },
//           { key: 'age', label: 'Age', align: 'r', mono: true, render: (d) => `<span class="text-2">${d.daysInStage}d</span>` },
//           { key: 'expClose', label: 'Exp. close', align: 'r', mono: true, render: (d) => d.expClose === 0 ? `<span class="text-acc">Closed</span>` : `<span class="text-2">${shortDate(daysAhead(d.expClose))}</span>` },
//         ],
//         rows: rowsFor(filter),
//         rowAttrs: (d) => `data-action="detail" data-title="${esc(d.company)}" data-sub="${stageLabel(d.stage)} - ${d.source} lead" data-kv='[["Value","${formatMoney(d.value)}/mo"],["Stage","${stageLabel(d.stage)}"],["Source","${d.source}"],["Owner","${esc(ownerName(d.owner))}"],["Score","${d.score}"],["Age in stage","${d.daysInStage} days"],["Expected close","${d.expClose === 0 ? 'Closed' : shortDate(daysAhead(d.expClose))}"]]'`,
//       });
//     }
//
//     const panes = ['all', 'new', 'qualified', 'proposal', 'negotiation', 'won'].map((f, i) =>
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
//   // PAGES['crm.forecast'] :: CONSOLE - panel grid + charts
//   // ====================================================================
//   window.PAGES['crm.forecast'] = function () {
//     const c = C(); const f = c.forecast;
//
//     const header = LX.modHead({
//       title: 'Forecast',
//       sub: 'New retainer MRR across committed, best-case and full pipeline - quarter view, ' + window.AGENCY.period + '.',
//       stats: [
//         { k: 'Committed', v: formatMoney(f.committedUsd) },
//         { k: 'Best case', v: formatMoney(f.bestCaseUsd) },
//         { k: 'Full pipeline', v: formatMoney(f.pipelineUsd) },
//         { k: 'Monthly quota', v: formatMoney(f.quotaMonthly) },
//         { k: 'Win rate', v: c.kpis.winRate + '%', delta: c.kpis.winRateDelta, deltaUnit: 'pt' },
//       ],
//       actions: `${UI.btn('This quarter', { variant: 'secondary', size: 'sm', icon: 'calendar' }).replace('<button', `<button data-action="menu" data-menu='["This quarter","Next quarter","Trailing 6mo"]'`)}
//         ${UI.btn('Export', { variant: 'primary', size: 'sm', icon: 'download' })}`,
//     });
//
//     // Panel 1 - forecast scenarios chart
//     const chartPanel = LX.panel({
//       title: 'Forecast scenarios',
//       actions: `<div class="flex items-center gap-3 text-[10.5px]">
//           <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Committed</span>
//           <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--sky)"></span>Best case</span>
//           <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--violet)"></span>Full pipeline</span>
//         </div>`,
//       body: `<div style="height:230px"><canvas id="crm-forecast-chart" height="230"></canvas></div>`,
//     });
//
//     // Panel 2 - weighted pipeline by stage (dense bars)
//     const stageMax = Math.max(...f.byStage.map(s => s.valueUsd));
//     const weightedTotal = f.byStage.reduce((a, s) => a + s.valueUsd * s.prob / 100, 0);
//     const stageRows = f.byStage.map(s => {
//       const weighted = Math.round(s.valueUsd * s.prob / 100);
//       return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
//         <div class="w-[104px] shrink-0 flex items-center gap-2">
//           <span class="size-2 rounded-full shrink-0" style="background:${s.color}"></span>
//           <span class="text-[12px] text-1 font-medium truncate">${s.stage}</span>
//         </div>
//         <div class="w-9 text-right num text-[11px] text-3">${s.deals}</div>
//         <div class="flex-1">${LX.bar(s.valueUsd / stageMax * 100, s.color)}</div>
//         <div class="w-16 text-right num text-[12px] text-1">${formatMoney(s.valueUsd)}</div>
//         <div class="w-10 text-right num text-[11px] text-3">${s.prob}%</div>
//         <div class="w-16 text-right num text-[12px] text-acc font-medium">${formatMoney(weighted)}</div>
//       </div>`;
//     }).join('');
//     const stagePanel = LX.panel({
//       title: 'Weighted by stage',
//       actions: `<span class="text-[10.5px] text-3 num">${formatMoney(Math.round(weightedTotal))} weighted</span>`,
//       bare: true,
//       body: `<div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
//           <div class="w-[104px] shrink-0">Stage</div><div class="w-9 text-right">Deals</div><div class="flex-1">Open value</div>
//           <div class="w-16 text-right">Open</div><div class="w-10 text-right">Prob</div><div class="w-16 text-right">Weighted</div>
//         </div>${stageRows}`,
//     });
//
//     // Panel 3 - by owner (dense list, attainment bars)
//     const ownerRows = f.byOwner.map(o => {
//       const pct = Math.round(o.committedUsd / o.quotaUsd * 100);
//       const col = pct >= 90 ? 'var(--acc)' : pct >= 60 ? 'var(--amber)' : 'var(--text-3)';
//       const pctCls = pct >= 90 ? 'text-acc' : pct >= 60 ? 'text-amber' : 'text-3';
//       return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)"
//           data-action="detail" data-title="${esc(ownerName(o.owner))}" data-sub="Forecast - ${o.open} open deals"
//           data-kv='[["Committed","${formatMoney(o.committedUsd)}"],["Best case","${formatMoney(o.bestCaseUsd)}"],["Quota","${formatMoney(o.quotaUsd)}"],["Attainment","${pct}%"],["Win rate","${o.winRate}%"],["Open deals","${o.open}"]]'>
//         <div class="w-[110px] shrink-0 flex items-center gap-2">
//           ${UI.avatar(ownerName(o.owner), ownerColor(o.owner), 20)}
//           <span class="text-[12px] text-1 font-medium truncate">${ownerFirst(o.owner)}</span>
//         </div>
//         <div class="w-9 text-right num text-[11px] text-3">${o.open}</div>
//         <div class="flex-1">${LX.bar(Math.min(pct, 100), col)}</div>
//         <div class="w-16 text-right num text-[12px] text-1">${formatMoney(o.committedUsd)}</div>
//         <div class="w-14 text-right num text-[11px] text-3">/ ${formatMoney(o.quotaUsd)}</div>
//         <div class="w-12 text-right num text-[11px] ${pctCls} font-medium">${pct}%</div>
//       </div>`;
//     }).join('');
//     const ownerPanel = LX.panel({
//       title: 'By owner',
//       actions: `<span class="text-[10.5px] text-3">Committed vs quota</span>`,
//       bare: true,
//       body: `<div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
//           <div class="w-[110px] shrink-0">Owner</div><div class="w-9 text-right">Open</div><div class="flex-1">Attainment</div>
//           <div class="w-16 text-right">Committed</div><div class="w-14 text-right">Quota</div><div class="w-12 text-right">%</div>
//         </div>${ownerRows}`,
//     });
//
//     // Panel 4 - win-rate trend chart
//     const trendPanel = LX.panel({
//       title: 'Win-rate trend',
//       actions: `<span class="text-[10.5px] text-3 num">Jan - Jun</span>`,
//       body: `<div style="height:170px"><canvas id="crm-winrate-chart" height="170"></canvas></div>`,
//     });
//
//     // Panel 5 - lead-source ROI (dense)
//     const roiTotals = c.sourceRoi.reduce((a, r) => ({ spend: a.spend + r.spendUsd, rev: a.rev + r.closedRevUsd }), { spend: 0, rev: 0 });
//     const blendedRoi = (roiTotals.rev / roiTotals.spend).toFixed(1);
//     const roiRows = c.sourceRoi.map(r => {
//       const up = r.trend >= 0;
//       return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
//         <div class="w-[104px] shrink-0 flex items-center gap-2">
//           <span class="size-1.5 rounded-full shrink-0" style="background:${sourceColor[r.source] || 'var(--text-3)'}"></span>
//           <span class="text-[12px] text-1 truncate">${r.source}</span>
//         </div>
//         <div class="w-14 text-right num text-[11px] text-3">${r.deals} / ${r.won}w</div>
//         <div class="w-16 text-right num text-[11px] text-2">${formatMoney(r.spendUsd)}</div>
//         <div class="w-14 text-right num text-[11px] text-2">${formatMoney(r.cacUsd)}</div>
//         <div class="w-14 text-right num text-[12px] font-medium ${r.roi >= 30 ? 'text-acc' : r.roi >= 12 ? 'text-1' : 'text-3'}">${r.roi.toFixed(1)}x</div>
//         <div class="w-14 text-right num text-[11px] ${up ? 'delta-up' : 'delta-down'}">${up ? '&uarr;' : '&darr;'} ${Math.abs(r.trend)}%</div>
//       </div>`;
//     }).join('');
//     const roiPanel = LX.panel({
//       title: 'Lead-source ROI',
//       actions: `<span class="text-[10.5px] text-3 num">${blendedRoi}x blended</span>`,
//       bare: true,
//       body: `<div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
//           <div class="w-[104px] shrink-0">Source</div><div class="w-14 text-right">Deals</div><div class="w-16 text-right">Spend</div>
//           <div class="w-14 text-right">CAC</div><div class="w-14 text-right">ROI</div><div class="w-14 text-right">Trend</div>
//         </div>${roiRows}`,
//     });
//
//     return `${header}${subNav('crm.forecast')}
//       <div class="grid grid-cols-12 gap-3.5">
//         <div class="col-span-12 lg:col-span-7 flex flex-col gap-3.5">
//           ${chartPanel}
//           ${stagePanel}
//         </div>
//         <div class="col-span-12 lg:col-span-5 flex flex-col gap-3.5">
//           ${ownerPanel}
//           ${trendPanel}
//           ${roiPanel}
//         </div>
//       </div>`;
//   };
//
//   window.PAGES_AFTER['crm.forecast'] = function () {
//     const f = C().forecast;
//     CHARTS.bar('crm-forecast-chart', f.labels, [
//       { label: 'Committed',     data: f.committed, backgroundColor: '#10b981' },
//       { label: 'Best case',     data: f.bestCase.map((v, i) => v - f.committed[i]), backgroundColor: 'rgba(56,189,248,0.85)' },
//       { label: 'Full pipeline', data: f.pipeline.map((v, i) => v - f.bestCase[i]), backgroundColor: 'rgba(167,139,250,0.7)' },
//     ], {
//       plugins: { legend: { display: false } },
//       scales: {
//         x: { stacked: true, grid: { display: false }, ticks: { font: { size: 10.5 } }, border: { display: false } },
//         y: { stacked: true, grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 6, font: { size: 10.5 }, callback: (v) => '$' + (v / 1000) + 'k' }, border: { display: false } },
//       },
//     });
//
//     const t = f.winRateTrend;
//     CHARTS.line('crm-winrate-chart', t.labels, [
//       { label: 'Win rate', data: t.values, borderColor: 'var(--acc)', backgroundColor: 'rgba(16,185,129,0.12)', fill: true, tension: 0.4, pointRadius: 0 },
//     ], {
//       plugins: { legend: { display: false } },
//       scales: {
//         x: { grid: { display: false }, ticks: { font: { size: 10 } }, border: { display: false } },
//         y: { grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 6, font: { size: 10 }, callback: (v) => v + '%' }, border: { display: false }, suggestedMin: 30, suggestedMax: 70 },
//       },
//     });
//   };
//
//   // ---- scoped styles for the board shell (full-bleed) ----
//   const styles = `<style>
//     .crm-shell { height: calc(100vh - 44px); display: flex; flex-direction: column; }
//     .crm-head { padding: 13px 22px; border-bottom: 1px solid var(--line-1); flex-shrink: 0; }
//     .crm-head .mod-head { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
//     .crm-board { flex: 1; overflow: auto; padding: 14px 22px; }
//     .crm-board .kanban-col { min-height: 100%; }
//     .crm-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 9px 22px; border-top: 1px solid var(--line-1); flex-shrink: 0; flex-wrap: wrap; background: var(--bg-1); }
//   </style>`;
//
// })();
//