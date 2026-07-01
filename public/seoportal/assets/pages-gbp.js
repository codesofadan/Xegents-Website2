/* ====================================================================
 GBP OPERATIONS SPINE
 ==================================================================== */

PAGES.gbp = () => {
 const fs = window.FACILITIES;
 const pending = window.GBP_APPROVAL_QUEUE;
 const insights = window.GBP_INSIGHTS;
 const health = window.GBP_HEALTH;
 const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
 const postsThisMonth = window.GBP_POSTS.filter(p => p.publish && p.publish.startsWith('2026-05'));

 return `
 ${UI.pageHeader({
 eyebrow: 'Delivery',
 title: 'GBP operations',
 subtitle: '15 profiles • 1 suspended (Athens 2) • 1 at-risk (Royal Mini) • 4 pending approvals',
 actions: [
 UI.btn('Bulk hours', { variant: 'secondary', icon: 'clock' }),
 UI.btn('Bulk post', { variant: 'secondary', icon: 'megaphone' }),
 UI.btn('New post', { variant: 'primary', icon: 'plus' }),
 ],
 stats: [
 { label: 'Calls (May MTD)', value: insights.totalCalls.toLocaleString(), delta: insights.callsDelta * 100, deltaLabel: '%', icon: 'phone', accent: 'green', sparkline: sparkSvg([721, 814, 902, 988, 1052, 1140, 1247], '#10b981') },
 { label: 'Directions', value: insights.totalDirections.toLocaleString(), delta: insights.directionsDelta * 100, deltaLabel: '%', icon: 'map-pin', accent: 'sky' },
 { label: 'Website clicks', value: insights.totalWebsiteClicks.toLocaleString(), delta: insights.websiteDelta * 100, deltaLabel: '%', icon: 'mouse-pointer-click', accent: 'indigo' },
 { label: 'Posts published', value: '23', icon: 'megaphone', accent: 'fuchsia', sub: 'May target: 60', },
 ],
 })}

 <div class="flex border-b mb-5">
 <button onclick="UI.switchTab('gbp','accounts')" data-tab="gbp-accounts" class="tab active">Accounts</button>
 <button onclick="UI.switchTab('gbp','calendar')" data-tab="gbp-calendar" class="tab">Post calendar</button>
 <button onclick="UI.switchTab('gbp','queue')" data-tab="gbp-queue" class="tab">Approval queue (${pending.length})</button>
 <button onclick="UI.switchTab('gbp','editor')" data-tab="gbp-editor" class="tab">Profile editor</button>
 <button onclick="UI.switchTab('gbp','insights')" data-tab="gbp-insights" class="tab">Insights</button>
 <button onclick="UI.switchTab('gbp','health')" data-tab="gbp-health" class="tab">Health & suspensions</button>
 </div>

 <div data-tab-pane="gbp-accounts">
 <div class="surface overflow-hidden">
 <table class="w-full">
 <thead>
 <tr class=" border-b">
 <th class="px-4 py-3 w-8"><input type="checkbox" class="rounded bg-1 "/></th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Facility</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Status</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Rank avg</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Reviews</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Photos</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Posts MTD</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-3 py-3">Last edit</th>
 <th class="w-8"></th>
 </tr>
 </thead>
 <tbody>
 ${fs.map(f => {
 const statusPill = f.gbp_status === 'suspended' ? 'pill-red' : f.gbp_status === 'at_risk' ? 'pill-amber' : 'pill-green';
 const statusLabel = f.gbp_status === 'at_risk' ? 'AT RISK' : f.gbp_status === 'suspended' ? 'SUSPENDED' : 'ACTIVE';
 return `
 <tr class="table-row cursor-pointer" onclick="navigate('facility', {id: '${f.id}'})">
 <td class="px-4 py-3"><input type="checkbox" class="rounded bg-1 " onclick="event.stopPropagation()"/></td>
 <td class="px-3 py-3 text-[12.5px]">
 <div class="font-medium">${f.name}</div>
 <div class="text-[10.5px] text-3">${f.city}, ${f.state}</div>
 </td>
 <td class="px-3 py-3">${UI.pill(statusLabel, statusPill.replace('pill-',''))}</td>
 <td class="px-3 py-3 text-[12.5px]"><span class="font-mono font-semibold">${f.rank.toFixed(1)}</span> <span class="text-[10px] ${f.rank_delta < 0 ? 'text-green' : 'text-red'}">${formatDelta(-f.rank_delta)}</span></td>
 <td class="px-3 py-3 text-[12.5px]">${f.reviews} <span class="text-[10px] text-green">+${f.review_delta}</span></td>
 <td class="px-3 py-3 text-[12.5px] font-mono">${Math.floor(20 + Math.random() * 60)}</td>
 <td class="px-3 py-3 text-[12.5px] font-mono">${Math.floor(1 + Math.random() * 8)}/8</td>
 <td class="px-3 py-3 text-[11px] text-3">${f.edit_cooling ? '<span class="text-amber">In cooling</span>' : 'Apr 28'}</td>
 <td class="px-3 py-3"><i data-lucide="chevron-right" class="size-4 text-4"></i></td>
 </tr>
 `;
 }).join('')}
 </tbody>
 </table>
 </div>
 </div>

 <div data-tab-pane="gbp-calendar" class="hidden">
 <div class="surface p-4 mb-4 flex items-center justify-between">
 <div class="flex items-center gap-3">
 <button class="btn btn-ghost"><i data-lucide="chevron-left" class="size-3.5"></i></button>
 <h3 class="text-[14px] font-semibold">May 2026</h3>
 <button class="btn btn-ghost"><i data-lucide="chevron-right" class="size-3.5"></i></button>
 </div>
 <div class="flex gap-3 text-[11px] text-3">
 <span class="flex items-center gap-1"><span class="dot bg-emerald-500"></span>Live</span>
 <span class="flex items-center gap-1"><span class="dot bg-indigo-500"></span>Scheduled</span>
 <span class="flex items-center gap-1"><span class="dot bg-amber-500"></span>Pending</span>
 <span class="flex items-center gap-1"><span class="dot bg-slate-500"></span>Draft</span>
 </div>
 </div>

 <div class="surface p-4">
 <div class="grid grid-cols-7 gap-1 mb-2">
 ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => `<div class="text-[10px] font-semibold uppercase text-3 text-center py-1">${d}</div>`).join('')}
 </div>
 <div class="grid grid-cols-7 gap-1">
 ${Array.from({ length: 4 }, () => '<div></div>').join('')}
 ${monthDays.map(d => {
 const dayPosts = postsThisMonth.filter(p => p.publish.includes('2026-05-' + String(d).padStart(2, '0')));
 return `
 <div class="surface p-1.5 min-h-[80px] ${d === 15 ? 'ring-2 ring-indigo-500/50' : ''}">
 <div class="flex items-center justify-between mb-1">
 <span class="text-[10px] font-mono text-3 ${d === 15 ? 'text-accent font-bold' : ''}">${d}</span>
 ${dayPosts.length > 0 ? `<span class="text-[9px] font-mono text-4">${dayPosts.length}</span>` : ''}
 </div>
 ${dayPosts.slice(0, 2).map(p => {
 const f = getFacility(p.facility);
 const color = p.status === 'live' ? '#10b981' : p.status === 'scheduled' ? '#6366f1' : p.status === 'pending' ? '#f59e0b' : '#64748b';
 return `<div class="text-[9px] truncate rounded px-1 py-0.5 mb-0.5" style="background:${color}25;color:${color};border-left:2px solid ${color}">${f?.name.split(' ').slice(-1)[0] || ''}: ${p.title.slice(0, 14)}</div>`;
 }).join('')}
 </div>
 `;
 }).join('')}
 </div>
 </div>
 </div>

 <div data-tab-pane="gbp-queue" class="hidden">
 <div class="grid grid-cols-2 gap-4">
 ${pending.map(p => {
 const f = getFacility(p.facility);
 return `
 <div class="surface p-4 card-hover">
 <div class="flex items-start justify-between mb-3">
 <div>
 <div class="text-[11.5px] text-3 mb-0.5">${f?.name}</div>
 <h3 class="text-[14px] font-bold mb-1">${p.title}</h3>
 <div class="flex items-center gap-2 text-[11px] text-3">
 <span class="pill pill-${p.type === 'offer' ? 'amber' : p.type === 'event' ? 'fuchsia' : 'sky'}">${p.type}</span>
 <span>•</span>
 <span>Publish ${shortDate(p.publish.split(' ')[0])} ${p.publish.split(' ')[1] || ''}</span>
 </div>
 </div>
 <div class="size-12 rounded-lg bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 border border-indigo-500/40 flex items-center justify-center">
 <i data-lucide="image" class="size-5 text-accent"></i>
 </div>
 </div>
 <p class="text-[12px] text-1 mb-3 leading-relaxed">${p.body}</p>
 ${p.cta ? `<button class="btn btn-secondary text-[11px] mb-3">${p.cta} →</button>` : ''}
 ${p.ai_drafted ? `<div class="flex items-center gap-2 text-[10.5px] text-3 mb-3"><i data-lucide="sparkles" class="size-3 text-accent"></i>AI drafted • confidence ${(p.confidence * 100).toFixed(0)}%</div>` : ''}
 <div class="flex gap-2 pt-3 border-t">
 <button class="btn btn-primary flex-1 text-[12px]" onclick="toast('Post approved + scheduled','success')">Approve</button>
 <button class="btn btn-secondary text-[12px]"><i data-lucide="edit-2" class="size-3 inline"></i> Edit</button>
 <button class="btn btn-ghost text-[12px]"><i data-lucide="x" class="size-3.5"></i></button>
 </div>
 </div>
 `;
 }).join('')}
 </div>
 </div>

 <div data-tab-pane="gbp-editor" class="hidden">
 <div class="surface p-5">
 <div class="flex items-center gap-3 mb-4">
 <select class="bg-2 rounded h-9 px-3 text-[12px] flex-1">
 ${fs.map(f => `<option ${f.id === 'bs-athens-1' ? 'selected' : ''}>${f.name}</option>`).join('')}
 </select>
 <button class="btn btn-secondary text-[12px]">Save draft</button>
 <button class="btn btn-primary text-[12px]">Schedule update</button>
 </div>

 <div class="flex border-b mb-5">
 <button class="tab active">Basic info</button>
 <button class="tab">Categories</button>
 <button class="tab">Services</button>
 <button class="tab">Products</button>
 <button class="tab">Photos</button>
 <button class="tab">Hours</button>
 <button class="tab">Attributes</button>
 <button class="tab">Description</button>
 </div>

 <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-5 flex items-start gap-2.5">
 <i data-lucide="alert-triangle" class="size-4 text-amber mt-0.5"></i>
 <div class="text-[12px] text-amber-200">
 <span class="font-semibold">Edit cooling window:</span>
 Last edit Apr 28. Safe to edit in <span class="font-mono">5 days</span>. Risky to edit name + categories together.
 </div>
 </div>

 <div class="grid grid-cols-2 gap-5">
 <div>
 <div class="eyebrow mb-2">Primary category</div>
 <div class="surface p-3 mb-4">
 <select class="bg-transparent w-full text-[13px] focus:outline-none">
 <option>Self-Storage Facility</option>
 <option>RV Storage Facility</option>
 <option>Boat Storage Facility</option>
 </select>
 </div>

 <div class="eyebrow mb-2">Secondary categories (max 9)</div>
 <div class="space-y-1.5">
 ${window.GBP_PROFILE_FIELDS.secondaryCategories.map(s => `
 <label class="flex items-center gap-2 text-[12.5px] p-2 rounded hover:bg-2 cursor-pointer">
 <input type="checkbox" checked class="rounded bg-1 "/>
 <span>${s}</span>
 </label>
 `).join('')}
 <label class="flex items-center gap-2 text-[12.5px] p-2 rounded hover:bg-2 cursor-pointer text-3">
 <input type="checkbox" class="rounded bg-1 "/>
 <span>Wine Storage Facility <span class="text-[10px]">(not applicable)</span></span>
 </label>
 </div>
 </div>

 <div>
 <div class="surface bg-indigo-500/8 border-indigo-500/30 p-4 mb-4">
 <div class="flex items-center gap-2 mb-2">
 <i data-lucide="sparkles" class="size-4 text-accent"></i>
 <span class="text-[12px] font-semibold text-accent">AI insight</span>
 </div>
 <p class="text-[12px] text-1">
 Competitor analysis suggests adding <span class="font-medium text-accent">"Records Storage Facility"</span>.
 3 of 5 top-ranking competitors in Athens have this category.
 </p>
 <button class="btn btn-secondary text-[11px] mt-3">Add category</button>
 </div>

 <div class="eyebrow mb-2">Hours</div>
 <div class="surface overflow-hidden">
 ${window.GBP_PROFILE_FIELDS.hours.map(([d, h]) => `
 <div class="flex items-center justify-between px-3 py-1.5 border-b last:border-0 text-[12px]">
 <span class="text-2">${d}</span>
 <span class="font-mono">${h}</span>
 </div>
 `).join('')}
 </div>
 </div>
 </div>
 </div>
 </div>

 <div data-tab-pane="gbp-insights" class="hidden">
 <div class="grid grid-cols-3 gap-4 mb-4">
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Discovery vs Direct searches', icon: 'pie-chart' })}
 <div class="flex items-center gap-4">
 <div class="relative size-32">
 ${UI.donut({ segments: [{ value: insights.discoveryVsDirect.discovery, color: '#6366f1' }, { value: insights.discoveryVsDirect.direct, color: '#10b981' }], size: 128, thickness: 18 })}
 <div class="absolute inset-0 flex items-center justify-center text-[18px] font-bold">${insights.discoveryVsDirect.discovery}%</div>
 </div>
 <div class="flex-1 space-y-2 text-[12px]">
 <div class="flex items-center gap-2"><span class="size-2.5 rounded-sm bg-indigo-500"></span><span class="text-1">Discovery</span><span class="ml-auto font-mono">${insights.discoveryVsDirect.discovery}%</span></div>
 <div class="flex items-center gap-2"><span class="size-2.5 rounded-sm bg-emerald-500"></span><span class="text-1">Direct</span><span class="ml-auto font-mono">${insights.discoveryVsDirect.direct}%</span></div>
 </div>
 </div>
 </div>
 <div class="surface p-5 col-span-2">
 ${UI.cardTitle({ title: 'Top search queries (May)', icon: 'search' })}
 <div class="space-y-2">
 ${insights.topQueries.map(q => `
 <div class="flex items-center gap-3">
 <span class="text-[12px] flex-1 truncate">${q.kw}</span>
 <span class="text-[11px] font-mono text-3 w-20 text-right">${q.impressions.toLocaleString()} imp</span>
 <div class="w-32"><div class="h-1.5 rounded-full bg-2 overflow-hidden"><div class="h-full bg-indigo-500" style="width:${(q.clicks/q.impressions)*100*4}%"></div></div></div>
 <span class="text-[11px] font-mono text-green w-16 text-right">${q.clicks} clk</span>
 </div>
 `).join('')}
 </div>
 </div>
 </div>
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Calls / Directions / Website clicks - 90 days', icon: 'line-chart' })}
 <div class="h-64"><canvas id="gbp-insights-chart"></canvas></div>
 </div>
 </div>

 <div data-tab-pane="gbp-health" class="hidden">
 ${health.map(h => {
 const f = getFacility(h.facility);
 return `
 <div class="surface p-5 mb-4 border-l-4">
 <div class="flex items-start justify-between mb-4">
 <div>
 <div class="flex items-center gap-2 mb-1">
 <i data-lucide="shield-alert" class="size-5 text-red"></i>
 <h3 class="text-[16px] font-bold">${h.status === 'suspended' ? 'GBP SUSPENDED' : 'GBP AT RISK'}: ${f?.name}</h3>
 </div>
 <div class="text-[11.5px] text-3">Detected ${h.detected}</div>
 <div class="text-[12px] text-1 mt-1">Likely cause (AI-analyzed): <span class="font-medium">${h.cause}</span></div>
 </div>
 <button class="btn btn-destructive text-[12px]">Escalate</button>
 </div>

 <div class="eyebrow mb-2">Recovery runbook — step ${h.steps_done} of ${h.steps_total}</div>
 ${UI.progressBar(h.steps_done, h.steps_total, '#ef4444', 6)}

 <div class="grid grid-cols-2 gap-2 mt-4">
 ${['Pause all edits','Document timeline','Prepare evidence pack','File reinstatement','Track ticket','Daily status'].map((s, i) => `
 <div class="flex items-center gap-2 text-[12px] py-1">
 ${i < h.steps_done ? '<i data-lucide="check-circle-2" class="size-4 text-green"></i>' : i === h.steps_done ? '<div class="size-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></div>' : '<i data-lucide="circle" class="size-4 text-4"></i>'}
 <span class="${i < h.steps_done ? 'line-through text-3' : i === h.steps_done ? 'font-medium text-amber' : 'text-2'}">${s}</span>
 </div>
 `).join('')}
 </div>

 <div class="flex gap-2 mt-4 pt-3 border-t">
 <button onclick="navigate('runbooks')" class="btn btn-primary text-[12px]">Open full runbook</button>
 <button class="btn btn-secondary text-[12px]">Assign step</button>
 </div>
 </div>
 `;
 }).join('')}
 </div>
 `;
};
PAGES_AFTER.gbp = () => {
 const labels = Array.from({ length: 12 }, (_, i) => 'Wk ' + (i + 1));
 CHARTS.line('gbp-insights-chart', labels, [
 { label: 'Calls', data: [712, 765, 812, 868, 921, 982, 1023, 1078, 1142, 1188, 1218, 1247], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.12)' },
 { label: 'Directions', data: [2412, 2502, 2588, 2640, 2702, 2780, 2840, 2918, 2988, 3052, 3148, 3211], borderColor: '#0ea5e9', backgroundColor: 'rgba(14,165,233,0.08)' },
 { label: 'Clicks', data: [1582, 1648, 1720, 1781, 1849, 1908, 1972, 2024, 2078, 2117, 2152, 2188], borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.08)' },
 ]);
};
