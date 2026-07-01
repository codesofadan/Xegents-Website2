/* ====================================================================
 SALES SPINE — Leads, Deals, Outreach, Proposals
 ==================================================================== */

PAGES.leads = () => {
 const leads = window.LEADS;
 return `
 ${UI.pageHeader({
 eyebrow: 'Sales pipeline',
 title: 'Leads inbox',
 subtitle: '43 new this week. 4 high-score (>85). 2 ready to convert to deals.',
 actions: [
 UI.btn('Bulk enrich', { variant: 'secondary', icon: 'wand-2', onClick: "toast('Enriching 12 leads via Apollo + Hunter','success')" }),
 UI.btn('New lead', { variant: 'primary', icon: 'plus' }),
 ],
 stats: [
 { label: 'New this week', value: '43', delta: 18, deltaLabel: '%', icon: 'inbox', accent: 'indigo' },
 { label: 'Qualified', value: '8', delta: 2, deltaLabel: '', icon: 'check', accent: 'green' },
 { label: 'Avg ICP score', value: '78', delta: 4, deltaLabel: '', icon: 'gauge', accent: 'indigo' },
 { label: 'Conversion rate', value: '22%', delta: 3, deltaLabel: '%', icon: 'trending-up', accent: 'green', sub: 'Lead → Deal' },
 ],
 })}

 <div class="flex items-center gap-2 mb-4 flex-wrap">
 ${UI.searchInput('Search leads, companies, emails...')}
 ${UI.filterPill('Source: all', 'globe')}
 ${UI.filterPill('Score: all', 'gauge')}
 ${UI.filterPill('Status: all', 'circle')}
 ${UI.filterPill('Owner: Mark', 'user')}
 <button class="btn btn-ghost text-[11px] ml-auto"><i data-lucide="download" class="size-3.5 inline"></i> Export CSV</button>
 </div>

 <div class="surface overflow-hidden">
 <table class="w-full">
 <thead>
 <tr class=" border-b">
 <th class="px-4 py-3 w-8"><input type="checkbox" class="rounded bg-1 "/></th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Lead</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Company</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Source</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Score</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">GBP Audit</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Status</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Created</th>
 <th class="w-8"></th>
 </tr>
 </thead>
 <tbody>
 ${leads.map(l => {
 const src = window.LEAD_SOURCES[l.source];
 const st = window.LEAD_STATUSES[l.status];
 const scoreColor = l.score >= 85 ? '#10b981' : l.score >= 70 ? '#f59e0b' : '#94a3b8';
 return `
 <tr class="table-row cursor-pointer" onclick="UI.openDrawer(UI.drawerHTML(${JSON.stringify({title: l.name + ' — ' + l.company}).replace(/"/g, '&quot;')}, leadDrawerBody('${l.id}'))); event.stopPropagation();">
 <td class="px-4 py-3"><input type="checkbox" class="rounded bg-1 " onclick="event.stopPropagation()"/></td>
 <td class="px-3 py-3">
 <div class="flex items-center gap-2.5">
 ${UI.avatar(l.name, '#6366f1', 28)}
 <div>
 <div class="text-[12.5px] font-medium">${l.name}</div>
 <div class="text-[10.5px] text-3">${l.email}</div>
 </div>
 </div>
 </td>
 <td class="px-3 py-3 text-[12.5px]">
 <div>${l.company}</div>
 <div class="text-[10.5px] text-3">${l.city} • ${l.facilities || '-'} fac.</div>
 </td>
 <td class="px-3 py-3">${UI.pill(src.label, src.color.replace('pill-', ''), src.icon)}</td>
 <td class="px-3 py-3">
 <div class="flex items-center gap-2">
 <div class="w-12 h-1.5 rounded-full bg-2 overflow-hidden"><div class="h-full" style="width:${l.score}%;background:${scoreColor}"></div></div>
 <span class="text-[12px] font-mono font-semibold" style="color:${scoreColor}">${l.score}</span>
 </div>
 </td>
 <td class="px-3 py-3 text-[12px]">${l.gbp_audit != null ? `<span class="${l.gbp_audit < 60 ? 'text-red' : 'text-1'} font-mono">${l.gbp_audit}/100</span>` : '<span class="text-4">-</span>'}</td>
 <td class="px-3 py-3">${UI.pill(st.label, st.color.replace('pill-', ''))}</td>
 <td class="px-3 py-3 text-[11px] text-3">${l.created}</td>
 <td class="px-3 py-3"><i data-lucide="chevron-right" class="size-4 text-4"></i></td>
 </tr>
 `;
 }).join('')}
 </tbody>
 </table>
 </div>

 <div class="flex items-center justify-between mt-4 text-[12px] text-3">
 <span>Showing 1-12 of 43</span>
 <div class="flex gap-1">
 <button class="btn btn-ghost"><i data-lucide="chevron-left" class="size-3.5"></i></button>
 <button class="btn btn-secondary text-[11px]">1</button>
 <button class="btn btn-ghost text-[11px]">2</button>
 <button class="btn btn-ghost text-[11px]">3</button>
 <button class="btn btn-ghost text-[11px]">4</button>
 <button class="btn btn-ghost"><i data-lucide="chevron-right" class="size-3.5"></i></button>
 </div>
 </div>
 `;
};

window.leadDrawerBody = (id) => {
 const l = window.LEADS.find(x => x.id === id);
 if (!l) return '';
 const src = window.LEAD_SOURCES[l.source];
 return `
 <div class="space-y-4">
 <div class="flex items-start justify-between">
 <div class="flex items-center gap-3">
 ${UI.avatar(l.name, '#6366f1', 48)}
 <div>
 <div class="text-[15px] font-bold">${l.name}</div>
 <div class="text-[12px] text-2">${l.company}</div>
 </div>
 </div>
 ${UI.pill(window.LEAD_STATUSES[l.status].label, window.LEAD_STATUSES[l.status].color.replace('pill-',''))}
 </div>

 <div class="grid grid-cols-2 gap-3">
 <div class="surface p-3">
 <div class="eyebrow mb-1">ICP score</div>
 <div class="text-2xl font-bold text-green">${l.score}</div>
 </div>
 <div class="surface p-3">
 <div class="eyebrow mb-1">GBP audit</div>
 <div class="text-2xl font-bold ${l.gbp_audit < 60 ? 'text-amber' : 'text-1'}">${l.gbp_audit || '—'}</div>
 </div>
 </div>

 <div class="surface p-3">
 <div class="eyebrow mb-2">Enrichment</div>
 <div class="space-y-1.5 text-[12px]">
 <div class="flex justify-between"><span class="text-3">Email</span><span class="font-mono">${l.email}</span></div>
 <div class="flex justify-between"><span class="text-3">Phone</span><span class="font-mono">${l.phone}</span></div>
 <div class="flex justify-between"><span class="text-3">Source</span><span>${src.label}</span></div>
 <div class="flex justify-between"><span class="text-3">Facilities</span><span>${l.facilities || '—'}</span></div>
 <div class="flex justify-between"><span class="text-3">City</span><span>${l.city}</span></div>
 </div>
 </div>

 ${l.note ? `<div class="surface p-3"><div class="eyebrow mb-2">Notes</div><div class="text-[12.5px] text-1">${l.note}</div></div>` : ''}

 <div class="surface p-3">
 <div class="eyebrow mb-2">Score breakdown</div>
 ${[
 { label: 'Geography match', val: 20 },
 { label: 'Vertical match (self-storage)', val: l.facilities >= 2 ? 30 : 0 },
 { label: 'Company size 1-10 facilities', val: l.facilities && l.facilities <= 10 ? 25 : 0 },
 { label: 'GBP quality bad (prospect)', val: l.gbp_audit && l.gbp_audit < 60 ? 15 : 0 },
 { label: 'Verified email', val: 10 },
 ].map(s => `
 <div class="flex items-center gap-2 mb-1 text-[12px]">
 ${s.val > 0 ? '<i data-lucide="check-circle-2" class="size-3.5 text-green"></i>' : '<i data-lucide="circle" class="size-3.5 text-4"></i>'}
 <span class="flex-1">${s.label}</span>
 <span class="font-mono ${s.val > 0 ? 'text-green' : 'text-4'}">+${s.val}</span>
 </div>
 `).join('')}
 </div>

 <div class="flex gap-2">
 <button class="btn btn-primary flex-1" onclick="toast('Lead converted to deal','success')">Convert to deal</button>
 <button class="btn btn-secondary"><i data-lucide="mail" class="size-3.5"></i></button>
 <button class="btn btn-secondary"><i data-lucide="calendar" class="size-3.5"></i></button>
 </div>
 </div>
 `;
};

PAGES.deals = () => {
 const stages = window.DEAL_STAGES;
 const deals = window.DEALS;
 const byStage = {};
 stages.forEach(s => byStage[s.id] = deals.filter(d => d.stage === s.id));
 const totalForecast = deals.filter(d => !['closed_won','closed_lost'].includes(d.stage)).reduce((s, d) => s + d.value * d.prob / 100, 0);
 const totalValue = deals.filter(d => !['closed_won','closed_lost'].includes(d.stage)).reduce((s, d) => s + d.value, 0);

 return `
 ${UI.pageHeader({
 eyebrow: 'Sales pipeline',
 title: 'Deals',
 subtitle: '$' + Math.round(totalForecast).toLocaleString() + ' weighted forecast • $' + totalValue.toLocaleString() + ' total open value across ' + (deals.length - 5) + ' open deals',
 actions: [
 UI.btn('New deal', { variant: 'primary', icon: 'plus' }),
 UI.btn('Insights', { variant: 'secondary', icon: 'bar-chart-2' }),
 ],
 })}

 <div class="flex items-center gap-2 mb-4">
 ${UI.filterPill('All owners', 'user')}
 ${UI.filterPill('All sources', 'globe')}
 ${UI.filterPill('Min value', 'dollar-sign')}
 ${UI.filterPill('Sort: forecast', 'arrow-down-wide-narrow')}
 <div class="ml-auto flex gap-1 p-0.5 rounded-lg border ">
 <button class="p-1.5 rounded bg-indigo-500/20 text-accent"><i data-lucide="kanban-square" class="size-3.5"></i></button>
 <button class="p-1.5 rounded text-2"><i data-lucide="list" class="size-3.5"></i></button>
 <button class="p-1.5 rounded text-2"><i data-lucide="bar-chart-3" class="size-3.5"></i></button>
 </div>
 </div>

 ${UI.kanban({
 columns: stages.map(s => {
 const cards = byStage[s.id];
 const sum = cards.reduce((sm, c) => sm + c.value, 0);
 return {
 id: s.id, label: s.label, color: s.color, cards,
 footer: '<span class="font-semibold text-1">$' + sum.toLocaleString() + '</span>',
 };
 }),
 renderCard: (d) => {
 const tierColors = { audit: 'pill-sky', build: 'pill-fuchsia', retainer: 'pill-indigo', partnership: 'pill-amber' };
 return `
 <div class="kanban-card">
 <div class="flex items-start justify-between mb-1.5">
 <div class="text-[12px] font-semibold truncate">${d.name}</div>
 <span class="text-[10px] font-mono text-3">${d.score}</span>
 </div>
 <div class="text-[10.5px] text-3 mb-2">${d.contact}</div>
 <div class="flex items-center justify-between">
 <span class="text-[13px] font-bold text-green">$${d.value.toLocaleString()}</span>
 ${UI.pill(d.tier, tierColors[d.tier].replace('pill-',''))}
 </div>
 <div class="flex items-center justify-between mt-2 pt-2 border-t/40 text-[10px] text-3">
 <span class="flex items-center gap-1"><i data-lucide="calendar" class="size-2.5"></i>${d.close}</span>
 <span>${d.prob}% prob</span>
 </div>
 </div>
 `;
 },
 })}
 `;
};

PAGES.outreach = () => {
 const camps = window.OUTREACH_CAMPAIGNS;
 return `
 ${UI.pageHeader({
 eyebrow: 'Sales pipeline',
 title: 'Outreach campaigns',
 subtitle: '2 active campaigns • 5/5 domains warm • 331 emails sent this month',
 actions: [
 UI.btn('Domain health', { variant: 'secondary', icon: 'shield' }),
 UI.btn('New campaign', { variant: 'primary', icon: 'plus' }),
 ],
 stats: [
 { label: 'Emails sent (mo)', value: '331', delta: 22, deltaLabel: '%', icon: 'send', accent: 'indigo' },
 { label: 'Reply rate', value: '8.1%', delta: 1.4, deltaLabel: '%', icon: 'reply', accent: 'green' },
 { label: 'Meetings booked', value: '9', delta: 4, deltaLabel: '', icon: 'calendar-check', accent: 'green' },
 { label: 'Domain health', value: '99%', icon: 'shield-check', accent: 'green', sub: '5/5 mailboxes warm' },
 ],
 })}

 ${camps.map(c => `
 <div class="surface p-5 mb-4">
 <div class="flex items-start justify-between mb-4">
 <div>
 <div class="flex items-center gap-2 mb-1">
 <h3 class="text-[16px] font-bold">${c.name}</h3>
 ${c.status === 'running' ? '<span class="status status-green"><span class="dot bg-emerald-500 animate-pulse"></span> RUNNING</span>' : '<span class="status status-amber">PAUSED</span>'}
 </div>
 <div class="text-[11.5px] text-3">Sent ${c.sent} • Replied ${c.replied} (${c.replyRate}%) • Booked ${c.booked} • Closed ${c.closed}</div>
 </div>
 <div class="flex gap-2">
 <button class="btn btn-ghost text-[11px]"><i data-lucide="copy" class="size-3 inline"></i> Clone</button>
 <button class="btn btn-secondary text-[11px]"><i data-lucide="edit-2" class="size-3 inline"></i> Edit sequence</button>
 ${c.status === 'running' ? '<button class="btn btn-destructive text-[11px]"><i data-lucide="pause" class="size-3 inline"></i> Pause</button>' : '<button class="btn btn-primary text-[11px]"><i data-lucide="play" class="size-3 inline"></i> Resume</button>'}
 </div>
 </div>

 <div class="space-y-2 mb-4">
 ${c.steps.map(s => `
 <div class="surface p-3">
 <div class="flex items-center gap-3">
 <span class="size-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[11px] font-bold flex items-center justify-center text-accent">${s.n}</span>
 <div class="flex-1">
 <div class="text-[12.5px] font-medium">${s.name}</div>
 <div class="text-[11px] text-3 mt-0.5">${s.sent} sent • ${s.replied} replies</div>
 </div>
 <div class="text-right">
 <div class="text-[13px] font-bold ${s.rate >= 7 ? 'text-green' : s.rate >= 5 ? 'text-amber' : 'text-red'}">${s.rate}%</div>
 <div class="text-[10px] text-3">reply rate</div>
 </div>
 <button class="btn btn-ghost"><i data-lucide="more-horizontal" class="size-3.5"></i></button>
 </div>
 </div>
 `).join('')}
 </div>

 <div class="flex items-start gap-3 p-3 bg-indigo-500/8 border border-indigo-500/20 rounded-lg">
 <i data-lucide="sparkles" class="size-4 text-accent mt-0.5 shrink-0"></i>
 <div>
 <div class="text-[11.5px] font-semibold text-accent mb-1">AI insight</div>
 <div class="text-[11.5px] text-1">${c.insight}</div>
 </div>
 <button class="btn btn-secondary text-[11px] ml-auto shrink-0">Apply</button>
 </div>
 </div>
 `).join('')}

 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Mailbox health (Mailforge)', icon: 'mail-check' })}
 <div class="grid grid-cols-5 gap-2">
 ${Array.from({ length: 15 }, (_, i) => {
 const reputation = 92 + Math.floor(Math.random() * 8);
 const color = reputation >= 95 ? '#10b981' : reputation >= 85 ? '#f59e0b' : '#ef4444';
 return `
 <div class="surface p-2.5 text-center">
 <div class="text-[10px] text-3 mb-1">mailbox-${(i+1).toString().padStart(2,'0')}</div>
 <div class="text-[16px] font-bold" style="color:${color}">${reputation}</div>
 <div class="text-[9px] text-3">reputation</div>
 </div>
 `;
 }).join('')}
 </div>
 </div>
 `;
};

PAGES.proposals = () => {
 const props = window.PROPOSALS;
 return `
 ${UI.pageHeader({
 eyebrow: 'Sales pipeline',
 title: 'Proposals & contracts',
 subtitle: '3 awaiting signature, 2 viewed, 5 signed this quarter',
 actions: [
 UI.btn('Template library', { variant: 'secondary', icon: 'file' }),
 UI.btn('New proposal', { variant: 'primary', icon: 'plus' }),
 ],
 })}

 <div class="grid grid-cols-2 gap-4 mb-4">
 <div class="surface p-4">
 <div class="eyebrow mb-3">Signature funnel — Q2</div>
 <div class="space-y-2">
 ${[
 { label: 'Sent', count: 8, color: '#6366f1' },
 { label: 'Opened', count: 7, color: '#0ea5e9' },
 { label: 'Viewed > 30s', count: 6, color: '#a78bfa' },
 { label: 'Signed', count: 5, color: '#10b981' },
 ].map(s => `
 <div class="flex items-center gap-3">
 <span class="text-[11.5px] w-20">${s.label}</span>
 <div class="funnel-bar flex-1" style="background:${s.color};max-width:${(s.count/8)*100}%">
 ${s.count}
 </div>
 </div>
 `).join('')}
 </div>
 </div>
 <div class="surface p-4">
 <div class="eyebrow mb-3">Signed value YTD</div>
 <div class="text-3xl font-bold mb-1">$2,997</div>
 <div class="text-[11px] text-green">+$497 this month</div>
 <div class="mt-4 text-[11px] text-3">Conversion rate: 62.5% sent → signed</div>
 </div>
 </div>

 <div class="surface overflow-hidden">
 <table class="w-full">
 <thead>
 <tr class=" border-b">
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Document</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Deal</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Tier</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Value</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Sent</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Status</th>
 <th class="w-8"></th>
 </tr>
 </thead>
 <tbody>
 ${props.map(p => {
 const sc = p.status === 'signed' ? 'green' : p.status === 'viewed' ? 'sky' : 'amber';
 return `
 <tr class="table-row cursor-pointer">
 <td class="px-4 py-3 text-[12.5px]">
 <div class="flex items-center gap-2">
 <i data-lucide="file-text" class="size-4 text-accent"></i>
 <code class="text-[11px]">${p.doc}</code>
 </div>
 </td>
 <td class="px-4 py-3 text-[12.5px] font-medium">${p.deal}</td>
 <td class="px-4 py-3">${UI.pill(p.tier, 'indigo')}</td>
 <td class="px-4 py-3 text-[12.5px] font-mono font-semibold">$${p.value.toLocaleString()}</td>
 <td class="px-4 py-3 text-[11px] text-3">${p.sent_at}</td>
 <td class="px-4 py-3">${UI.pill(p.status.toUpperCase(), sc)}</td>
 <td class="px-4 py-3"><button class="btn btn-ghost"><i data-lucide="more-horizontal" class="size-4"></i></button></td>
 </tr>
 `;
 }).join('')}
 </tbody>
 </table>
 </div>
 `;
};
