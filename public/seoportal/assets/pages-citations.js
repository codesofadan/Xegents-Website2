/* ====================================================================
 CITATIONS / BACKLINKS SPINE
 ==================================================================== */

PAGES.citations = () => {
 const cits = window.CITATIONS;
 const drift = cits.filter(c => c.status === 'nap_drift');
 const pending = cits.filter(c => c.status === 'pending');
 const missing = cits.filter(c => c.status === 'missing');
 const active = cits.filter(c => c.status === 'active');

 return `
 ${UI.pageHeader({
 eyebrow: 'Delivery',
 title: 'Citations & backlinks',
 subtitle: `Brick & Stone Athens 1 (15 facilities total) • NAP score 84/100 • ${active.length} active, ${drift.length} drift, ${pending.length} pending`,
 actions: [
 UI.btn('Order Whitespark build', { variant: 'secondary', icon: 'shopping-cart' }),
 UI.btn('NAP master record', { variant: 'secondary', icon: 'database' }),
 UI.btn('Submit citation', { variant: 'primary', icon: 'plus' }),
 ],
 stats: [
 { label: 'Active', value: active.length, icon: 'check-circle', accent: 'green' },
 { label: 'NAP drift', value: drift.length, icon: 'alert-triangle', accent: 'amber', sub: 'Need fix' },
 { label: 'Pending', value: pending.length, icon: 'clock', accent: 'sky' },
 { label: 'Missing', value: missing.length, icon: 'x-circle', accent: 'red', sub: 'Opportunity' },
 ],
 })}

 <div class="flex border-b mb-5">
 <button onclick="UI.switchTab('cit','pipeline')" data-tab="cit-pipeline" class="tab active">Citation pipeline</button>
 <button onclick="UI.switchTab('cit','nap')" data-tab="cit-nap" class="tab">NAP master</button>
 <button onclick="UI.switchTab('cit','backlinks')" data-tab="cit-backlinks" class="tab">Backlinks</button>
 <button onclick="UI.switchTab('cit','pitches')" data-tab="cit-pitches" class="tab">Featured pitches</button>
 </div>

 <div data-tab-pane="cit-pipeline">
 <div class="surface overflow-hidden">
 <table class="w-full">
 <thead>
 <tr class=" border-b">
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Status</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Source</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">URL</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">DR</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Last Updated</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Action</th>
 </tr>
 </thead>
 <tbody>
 ${cits.map(c => {
 const statusColors = { active: 'green', nap_drift: 'amber', pending: 'sky', missing: 'red' };
 const statusLabels = { active: 'ACTIVE', nap_drift: 'NAP DRIFT', pending: 'PENDING', missing: 'MISSING' };
 return `
 <tr class="table-row">
 <td class="px-4 py-3">${UI.pill(statusLabels[c.status], statusColors[c.status])}</td>
 <td class="px-4 py-3 text-[12.5px] font-medium">${c.source}</td>
 <td class="px-4 py-3 text-[11.5px] text-3 font-mono truncate max-w-xs">${c.url}</td>
 <td class="px-4 py-3"><span class="font-mono text-[12px] ${c.dr >= 80 ? 'text-green' : c.dr >= 60 ? 'text-amber' : 'text-2'}">${c.dr}</span></td>
 <td class="px-4 py-3 text-[11.5px] text-3">${c.last_updated || '—'}</td>
 <td class="px-4 py-3">
 ${c.status === 'nap_drift' ? '<button class="btn btn-destructive text-[11px]">Fix NAP</button>' : ''}
 ${c.status === 'pending' ? `<span class="text-[11px] text-3">Submitted ${c.submitted}</span>` : ''}
 ${c.status === 'missing' ? '<button class="btn btn-secondary text-[11px]">Submit</button>' : ''}
 ${c.status === 'active' ? '<button class="btn btn-ghost"><i data-lucide="external-link" class="size-3.5"></i></button>' : ''}
 </td>
 </tr>
 `;
 }).join('')}
 </tbody>
 </table>
 </div>
 </div>

 <div data-tab-pane="cit-nap" class="hidden">
 <div class="grid grid-cols-2 gap-4">
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'NAP master record', subtitle: 'Single source of truth', icon: 'database' })}
 ${Object.entries(window.NAP_MASTER).map(([k, v]) => `
 <div class="flex items-center justify-between py-2 border-b last:border-0">
 <span class="text-[11px] text-3 uppercase">${k.replace(/_/g, ' ')}</span>
 <span class="text-[12.5px] font-mono">${v}</span>
 </div>
 `).join('')}
 <button class="btn btn-secondary w-full mt-4 text-[12px]"><i data-lucide="edit-2" class="size-3 inline"></i> Edit master record</button>
 </div>
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'NAP drift detection', subtitle: '2 mismatches detected', icon: 'alert-triangle' })}
 ${drift.map(c => `
 <div class="surface p-3 mb-2 bg-amber-500/8 border-amber-500/30">
 <div class="flex items-center gap-2 mb-2">
 <i data-lucide="alert-triangle" class="size-3.5 text-amber"></i>
 <span class="text-[13px] font-semibold">${c.source}</span>
 <span class="status status-amber ml-auto">${c.drift_field} mismatch</span>
 </div>
 <div class="text-[11px] text-2 mb-3">Last verified: ${c.last_updated}</div>
 <div class="flex gap-2">
 <button class="btn btn-primary text-[11px] flex-1">Auto-fix via API</button>
 <button class="btn btn-ghost text-[11px]">Manual review</button>
 </div>
 </div>
 `).join('')}
 </div>
 </div>

 <div class="surface p-5 mt-4">
 ${UI.cardTitle({ title: 'Citation source library', subtitle: '54 directories tracked', icon: 'library' })}
 <div class="grid grid-cols-4 gap-2">
 ${['Yelp','Bing Places','Apple Maps','Foursquare','Facebook','Data Axle','BBB','Manta','YellowPages','Citysearch','Yellowbook','SpareFoot','SelfStorage.com','StorageFront','StorageTreasures','iStorage','Hotfrog','MerchantCircle','LocalEdge','EZlocal','ChamberofCommerce','Local.com','TupaloMaps','Tupalo','InsiderPages','UScity','CityVoter','MagicYellow','Storj','Yandex','Cylex','EnGenuity','EZLocal','ShowMeLocal','Where2Go','Brownbook','Bizapedia','OpenCorporates','Tuugo','ZipLocal','PossibleLocal','InfoUSA','Discoverourtown','Justdial','LinkedIn','MapQuest','Yandex','Foursquare','Trustpilot','Glassdoor','Indeed','OpenStreetMap','Waze'].map(d => `
 <div class="text-[11px] flex items-center gap-2 px-2 py-1.5 rounded hover:">
 <i data-lucide="circle-check" class="size-3 text-green"></i>
 <span class="truncate">${d}</span>
 </div>
 `).join('')}
 </div>
 </div>
 </div>

 <div data-tab-pane="cit-backlinks" class="hidden">
 <div class="grid grid-cols-3 gap-4 mb-4">
 <div class="surface p-5 col-span-2">
 ${UI.cardTitle({ title: 'Backlinks - 30 days', icon: 'link' })}
 <div class="grid grid-cols-3 gap-4 mb-4">
 <div><div class="eyebrow mb-1">New</div><div class="text-2xl font-bold text-green">+22</div></div>
 <div><div class="eyebrow mb-1">Lost</div><div class="text-2xl font-bold text-red">-4</div></div>
 <div><div class="eyebrow mb-1">Toxic flagged</div><div class="text-2xl font-bold text-amber">1</div></div>
 </div>
 <div class="h-40"><canvas id="backlinks-chart"></canvas></div>
 </div>
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Anchor distribution', icon: 'pie-chart' })}
 <div class="flex items-center gap-4 mb-3">
 ${UI.donut({ segments: window.ANCHOR_DISTRIBUTION.map(a => ({ value: a.pct, color: a.color })), size: 100, thickness: 14 })}
 </div>
 ${UI.legend(window.ANCHOR_DISTRIBUTION.map(a => ({ label: a.label, value: a.pct + '%', color: a.color })))}
 </div>
 </div>

 <div class="surface overflow-hidden">
 <table class="w-full">
 <thead>
 <tr class=" border-b">
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">From</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Anchor text</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">To</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">DR</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Type</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Date</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Flag</th>
 </tr>
 </thead>
 <tbody>
 ${window.BACKLINKS.map(b => `
 <tr class="table-row">
 <td class="px-4 py-3 text-[12.5px] font-medium">${b.from}</td>
 <td class="px-4 py-3 text-[12px] text-1">"${b.anchor}"</td>
 <td class="px-4 py-3 text-[11.5px] text-3 font-mono">${b.to}</td>
 <td class="px-4 py-3 font-mono text-[12px] ${b.dr >= 60 ? 'text-green' : b.dr >= 30 ? 'text-amber' : 'text-red'}">${b.dr}</td>
 <td class="px-4 py-3">${b.follow ? '<span class="status status-green">Follow</span>' : '<span class="tag">Nofollow</span>'}</td>
 <td class="px-4 py-3 text-[11px] text-3">${b.date}</td>
 <td class="px-4 py-3">
 ${b.new ? '<span class="status status-accent">NEW</span>' : ''}
 ${b.toxic ? '<span class="status status-red">TOXIC</span>' : ''}
 </td>
 </tr>
 `).join('')}
 </tbody>
 </table>
 </div>
 </div>

 <div data-tab-pane="cit-pitches" class="hidden">
 <div class="grid grid-cols-3 gap-4">
 <div class="surface p-5 col-span-2">
 <div class="flex items-center justify-between mb-4">
 <div>
 <h3 class="text-[14px] font-bold">Featured.com pitch queue</h3>
 <div class="text-[11.5px] text-3">Today: 14 relevant queries • 8 sent, 2 replied, 1 placed</div>
 </div>
 <div class="flex gap-2">
 <button class="btn btn-secondary text-[11px]">Review flagged</button>
 <button class="btn btn-primary text-[11px]"><i data-lucide="send" class="size-3 inline"></i> Send approved (5)</button>
 </div>
 </div>
 ${window.FEATURED_PITCH_QUEUE.map(p => `
 <div class="surface p-4 mb-3">
 <div class="flex items-start justify-between mb-2">
 <div class="flex-1 pr-3">
 <div class="text-[10px] text-3 uppercase tracking-wider mb-1">${p.expert_needed} • deadline ${p.deadline}</div>
 <div class="text-[13px] font-semibold">${p.query}</div>
 </div>
 ${p.status === 'review_needed' ? '<span class="status status-amber">REVIEW</span>' : `<span class="status status-green">conf ${(p.confidence*100).toFixed(0)}%</span>`}
 </div>
 <div class="surface bg-1/50 p-3 mt-2">
 <div class="eyebrow mb-2"><i data-lucide="sparkles" class="size-3 inline"></i> AI draft (Claude Sonnet)</div>
 <p class="text-[12px] text-1 leading-relaxed">${p.ai_draft}</p>
 </div>
 <div class="flex gap-2 mt-3 pt-3 border-t">
 <button class="btn btn-primary text-[11px]">Approve + send</button>
 <button class="btn btn-secondary text-[11px]">Edit pitch</button>
 <button class="btn btn-ghost text-[11px]">Skip</button>
 </div>
 </div>
 `).join('')}
 </div>

 <div class="space-y-4">
 <div class="surface p-4">
 ${UI.cardTitle({ title: 'Pitch performance', icon: 'trending-up' })}
 <div class="space-y-3 text-[12px]">
 <div><div class="text-[10px] text-3 uppercase">Sent this month</div><div class="text-xl font-bold">47</div></div>
 <div><div class="text-[10px] text-3 uppercase">Replied</div><div class="text-xl font-bold text-green">9</div><div class="text-[10px] text-3">19% reply rate</div></div>
 <div><div class="text-[10px] text-3 uppercase">Placed</div><div class="text-xl font-bold text-accent">4</div><div class="text-[10px] text-3">DR avg 64</div></div>
 </div>
 </div>
 <div class="surface p-4">
 ${UI.cardTitle({ title: 'Sources', icon: 'rss' })}
 <div class="space-y-1.5 text-[11.5px]">
 <div class="flex items-center justify-between"><span>Featured.com</span><span class="text-green">Active</span></div>
 <div class="flex items-center justify-between"><span>Qwoted</span><span class="text-green">Active</span></div>
 <div class="flex items-center justify-between"><span>SourceBottle</span><span class="text-3">Disabled</span></div>
 <div class="flex items-center justify-between"><span>JustReachOut</span><span class="text-3">Disabled</span></div>
 </div>
 </div>
 </div>
 </div>
 </div>
 `;
};
PAGES_AFTER.citations = () => {
 CHARTS.bar('backlinks-chart',
 Array.from({ length: 12 }, (_, i) => 'Wk ' + (i + 1)),
 [
 { label: 'New', data: [1,3,2,4,1,3,4,2,3,1,4,2], backgroundColor: '#10b981' },
 { label: 'Lost', data: [0,-1,-1,0,-1,0,0,-1,-2,0,0,-1], backgroundColor: '#ef4444' },
 ],
 { plugins: { legend: { display: true, position: 'bottom' } } }
 );
};
