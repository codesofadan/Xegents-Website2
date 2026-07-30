// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ====================================================================
//  REVIEWS SPINE
//  ==================================================================== */
//
// PAGES.reviews = () => {
//  const reviews = window.REVIEWS;
//  const pending = reviews.filter(r => r.status === 'pending');
//  const negative = reviews.filter(r => r.stars <= 2);
//
//  return `
//  ${UI.pageHeader({
//  eyebrow: 'Delivery',
//  title: 'Reviews engine',
//  subtitle: `${pending.length} awaiting response • ${negative.length} negative this week • avg 4.65★ across portfolio`,
//  actions: [
//  UI.btn('Velocity dashboard', { variant: 'secondary', icon: 'gauge', onClick: "UI.switchTab('rev','velocity')" }),
//  UI.btn('Request reviews', { variant: 'primary', icon: 'send', onClick: "toast('Bulk review request queued (12 SMS, 8 emails)','success')" }),
//  ],
//  stats: [
//  { label: 'Total reviews (mo)', value: '187', delta: 8, deltaLabel: '', icon: 'star', accent: 'amber' },
//  { label: 'Avg rating', value: '4.65', delta: 0.04, deltaLabel: '', icon: 'star', accent: 'green' },
//  { label: 'Avg response time', value: '8h', delta: -14, deltaLabel: '% (better)', icon: 'timer', accent: 'green', sub: 'SLA: 24h' },
//  { label: 'Pending response', value: pending.length, icon: 'inbox', accent: pending.length > 5 ? 'amber' : 'green' },
//  ],
//  })}
//
//  <div class="flex border-b mb-5">
//  <button onclick="UI.switchTab('rev','inbox')" data-tab="rev-inbox" class="tab active">Google inbox</button>
//  <button onclick="UI.switchTab('rev','platforms')" data-tab="rev-platforms" class="tab">All platforms</button>
//  <button onclick="UI.switchTab('rev','velocity')" data-tab="rev-velocity" class="tab">Velocity</button>
//  <button onclick="UI.switchTab('rev','sentiment')" data-tab="rev-sentiment" class="tab">Sentiment & keywords</button>
//  <button onclick="UI.switchTab('rev','requests')" data-tab="rev-requests" class="tab">Request automation</button>
//  </div>
//
//     <div data-tab-pane="rev-platforms" class="hidden">
//       <div class="surface mb-6">
//         <div class="grid grid-cols-5">
//           ${Object.entries(window.PLATFORM_SCORES).map(([name, p], i) => {
//             const status = p.status === 'healthy' ? 'green' : 'amber';
//             return `
//               <div class="px-5 py-4" style="${i>0?'border-left: 1px solid var(--line-1);':''}">
//                 <div class="flex items-center gap-2 mb-2">
//                   <span class="status status-${status}"></span>
//                   <div class="eyebrow capitalize">${name}</div>
//                 </div>
//                 <div class="flex items-baseline gap-2">
//                   <span class="text-[20px] font-semibold num text-1 leading-none">${p.rating.toFixed(2)}</span>
//                   <span class="text-[10px] num ${p.trend > 0 ? 'text-acc-bright' : 'text-red'}">${p.trend > 0 ? '↑' : '↓'} ${Math.abs(p.trend).toFixed(2)}</span>
//                 </div>
//                 <div class="text-[10px] text-3 mt-1.5 num">${p.reviews} reviews${p.complaints ? ' . ' + p.complaints + ' BBB' : ''}</div>
//               </div>
//             `;
//           }).join('')}
//         </div>
//       </div>
//
//       <div class="surface overflow-hidden">
//         <div class="px-5 py-3 flex items-center justify-between" style="border-bottom: 1px solid var(--line-1);">
//           <div class="text-[13px] font-semibold">Cross-platform review feed</div>
//           <div class="text-[11px] text-3">${window.MULTI_PLATFORM_REVIEWS.filter(r => r.status === 'pending').length} pending response</div>
//         </div>
//         ${window.MULTI_PLATFORM_REVIEWS.map((r, i, arr) => {
//           const f = getFacility(r.facility);
//           const platformColor = { google: 'sky', yelp: 'red', facebook: 'acc', bbb: 'amber', sparefoot: 'violet' }[r.platform] || 'slate';
//           return `
//             <div class="px-5 py-3.5 flex items-center gap-4 hover:bg-3 transition-colors ${i < arr.length - 1 ? 'border-b' : ''}" style="border-color: var(--line-1);">
//               <span class="tag tag-${platformColor} capitalize">${r.platform}</span>
//               <div class="flex-1 min-w-0">
//                 <div class="flex items-center gap-2 mb-0.5">
//                   <span class="text-amber text-[11px]">${'*'.repeat(r.stars)}<span class="text-4">${'*'.repeat(5-r.stars)}</span></span>
//                   <span class="text-[12px] font-medium text-1">${r.author}</span>
//                   <span class="text-[10.5px] text-3 mono">${r.date}</span>
//                   <span class="text-[10.5px] text-3">. ${f?.name}</span>
//                   ${r.complaint ? '<span class="status status-red">BBB complaint</span>' : ''}
//                 </div>
//                 <div class="text-[12px] text-2 leading-relaxed line-clamp-2">${r.body}</div>
//               </div>
//               ${r.status === 'pending' ? '<span class="status status-amber">pending</span>' : '<span class="status status-green">replied</span>'}
//               ${r.priority ? '<span class="status status-red">priority</span>' : ''}
//             </div>
//           `;
//         }).join('')}
//       </div>
//     </div>
//
//  <div data-tab-pane="rev-inbox">
//  <div class="grid grid-cols-12 gap-4">
//  <div class="col-span-3">
//  <div class="surface p-3">
//  <div class="eyebrow mb-2 px-2">Filters</div>
//  <div class="space-y-1">
//  ${[
//  ['Unread (3)', 'inbox', true],
//  ['Pending response (4)', 'circle-dashed', false],
//  ['Negative (2)', 'frown', false],
//  ['Replied', 'check', false],
//  ['Removed', 'archive', false],
//  ['All reviews', 'list', false],
//  ].map(([l, i, a]) => `
//  <button class="nav-item w-full ${a ? 'active' : ''}">
//  <i data-lucide="${i}" class="ni-icon size-3.5"></i>
//  <span class="text-[12px]">${l}</span>
//  </button>
//  `).join('')}
//  </div>
//  <div class="eyebrow mt-4 mb-2 px-2">By facility</div>
//  <div class="space-y-1 max-h-72 overflow-y-auto">
//  ${window.REVIEW_VELOCITY.slice(0, 10).map(v => {
//  const f = getFacility(v.facility);
//  return `<button class="nav-item w-full text-left text-[11.5px]"><i data-lucide="warehouse" class="ni-icon size-3"></i>${f?.name.split(' ').slice(0, 3).join(' ')}<span class="ml-auto text-[10px] text-3">${v.w7}</span></button>`;
//  }).join('')}
//  </div>
//  </div>
//  </div>
//
//  <div class="col-span-4">
//  <div class="surface overflow-hidden">
//  <div class="px-3 py-2.5 border-b flex items-center justify-between sticky top-0 z-10">
//  ${UI.searchInput('Search reviews')}
//  </div>
//  <div class="max-h-[70vh] overflow-y-auto">
//  ${reviews.map((r, i) => {
//  const f = getFacility(r.facility);
//  const isSelected = i === 1; // negative pending
//  return `
//  <div onclick="document.querySelectorAll('.rev-thread').forEach(el=>el.classList.add('hidden'));document.getElementById('rev-thread-${r.id}').classList.remove('hidden');document.querySelectorAll('.rev-row').forEach(el=>el.classList.remove('bg-indigo-500/10','border-l-indigo-500'));this.classList.add('bg-indigo-500/10','border-l-indigo-500');" class="rev-row border-l-2 border-l-transparent px-3 py-3 border-b hover: cursor-pointer ${isSelected ? 'bg-indigo-500/10 border-l-indigo-500' : ''}">
//  <div class="flex items-start justify-between mb-1">
//  <div class="flex items-center gap-2">
//  ${UI.avatar(r.author, r.stars >= 4 ? '#10b981' : r.stars === 3 ? '#f59e0b' : '#ef4444', 24)}
//  <span class="text-[12.5px] font-semibold">${r.author}</span>
//  </div>
//  <span class="text-amber text-[11px]">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
//  </div>
//  <div class="text-[11px] text-3 mb-1">${f?.name} • ${r.date}</div>
//  <div class="text-[12px] text-1 line-clamp-2">${r.body}</div>
//  <div class="flex items-center gap-1.5 mt-1.5">
//  ${r.status === 'pending' ? '<span class="status status-amber text-[9px]">PENDING</span>' : '<span class="status status-green text-[9px]">REPLIED</span>'}
//  ${r.priority ? '<span class="status status-red text-[9px]">PRIORITY</span>' : ''}
//  </div>
//  </div>
//  `;
//  }).join('')}
//  </div>
//  </div>
//  </div>
//
//  <div class="col-span-5">
//  ${reviews.map((r, i) => {
//  const f = getFacility(r.facility);
//  const isSelected = i === 1;
//  return `
//  <div id="rev-thread-${r.id}" class="rev-thread card overflow-hidden ${isSelected ? '' : 'hidden'}">
//  <div class="px-5 py-4 border-b ">
//  <div class="flex items-start gap-3 mb-2">
//  ${UI.avatar(r.author, r.stars >= 4 ? '#10b981' : r.stars === 3 ? '#f59e0b' : '#ef4444', 40)}
//  <div class="flex-1">
//  <div class="flex items-center gap-2 mb-0.5">
//  <span class="text-[14px] font-bold">${r.author}</span>
//  <span class="text-amber text-[13px]">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
//  </div>
//  <div class="text-[11.5px] text-3">${f?.name} • ${r.date}</div>
//  </div>
//  <span class="pill ${r.sentiment === 'positive' ? 'pill-green' : r.sentiment === 'negative' ? 'pill-red' : 'pill-amber'}">${r.sentiment}</span>
//  </div>
//  <div class="flex gap-1 flex-wrap mt-2">
//  ${(r.kw_tags || []).map(t => `<span class="text-[10px] px-2 py-0.5 rounded-full bg-1 text-2 ">${t}</span>`).join('')}
//  </div>
//  </div>
//  <div class="p-5">
//  <div class="bubble bubble-in mb-4">${r.body}</div>
//  ${r.ai_reply ? `
//  <div class="surface bg-fuchsia-500/8 border-fuchsia-500/30 p-3 mb-3">
//  <div class="flex items-center gap-2 mb-2">
//  <i data-lucide="sparkles" class="size-3.5 text-accent"></i>
//  <span class="text-[11px] font-semibold text-fuchsia-300">AI-suggested reply (Claude Sonnet)</span>
//  </div>
//  <div class="text-[12.5px] text-1 whitespace-pre-wrap leading-relaxed">${r.ai_reply}</div>
//  </div>
//  ` : ''}
//  <textarea class="w-full rounded-lg p-3 text-[13px] focus:outline-none focus:border-indigo-500 min-h-[120px]" placeholder="Compose your response...">${r.ai_reply || ''}</textarea>
//  <div class="flex items-center justify-between mt-3">
//  <div class="text-[11px] text-3"><i data-lucide="info" class="size-3 inline"></i> SLA: respond within ${r.sla_due || '24h'} • ${r.stars <= 2 ? 'Owner approval required for 1-2★ replies' : ''}</div>
//  <div class="flex gap-2">
//  <button class="btn btn-ghost text-[12px]">Save draft</button>
//  <button class="btn btn-secondary text-[12px]"><i data-lucide="wand-2" class="size-3 inline"></i> Regenerate</button>
//  <button class="btn btn-primary text-[12px]" onclick="toast('Reply sent to Google','success')">Send reply</button>
//  </div>
//  </div>
//  </div>
//  </div>
//  `;
//  }).join('')}
//  </div>
//  </div>
//  </div>
//
//  <div data-tab-pane="rev-velocity" class="hidden">
//  <div class="surface overflow-hidden">
//  <div class="px-5 py-3 border-b ">
//  <div class="text-[12px] text-2">Target: 3-5 reviews/week per facility • Auto-alert fires on 50%+ velocity drop</div>
//  </div>
//  <table class="w-full">
//  <thead>
//  <tr class=" border-b">
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Facility</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">7d</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">30d</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Target / wk</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Status</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Trend</th>
//  </tr>
//  </thead>
//  <tbody>
//  ${window.REVIEW_VELOCITY.map(v => {
//  const f = getFacility(v.facility);
//  const status = v.status === 'on' ? 'pill-green' : v.status === 'risk' ? 'pill-amber' : 'pill-red';
//  const statusLabel = v.status === 'on' ? 'ON TRACK' : v.status === 'risk' ? 'AT RISK' : 'BREACH';
//  const data = Array.from({ length: 8 }, () => v.w7 + (Math.random() - 0.5) * 1.5);
//  return `
//  <tr class="table-row">
//  <td class="px-4 py-3 text-[12.5px] font-medium">${f?.name || v.facility}</td>
//  <td class="px-4 py-3 text-[12.5px] font-mono">${v.w7}</td>
//  <td class="px-4 py-3 text-[12.5px] font-mono">${v.w30}</td>
//  <td class="px-4 py-3 text-[12.5px] text-2 font-mono">${v.target}</td>
//  <td class="px-4 py-3">${UI.pill(statusLabel, status.replace('pill-',''))}</td>
//  <td class="px-4 py-3 w-32">${sparkSvg(data, v.status === 'on' ? '#10b981' : v.status === 'risk' ? '#f59e0b' : '#ef4444', 80, 24)}</td>
//  </tr>
//  `;
//  }).join('')}
//  </tbody>
//  </table>
//  </div>
//  </div>
//
//  <div data-tab-pane="rev-sentiment" class="hidden">
//  <div class="grid grid-cols-2 gap-4 mb-4">
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'Sentiment trend - 12 weeks', icon: 'line-chart' })}
//  <div class="h-64"><canvas id="sentiment-chart"></canvas></div>
//  </div>
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'Top keywords in reviews', icon: 'tags' })}
//  <div class="space-y-2">
//  ${[
//  ['climate-controlled', 38, 'positive'],
//  ['khizer', 22, 'positive'],
//  ['clean', 19, 'positive'],
//  ['access', 15, 'positive'],
//  ['gate', 11, 'mixed'],
//  ['manager', 8, 'negative'],
//  ['elevator', 6, 'negative'],
//  ['expensive', 4, 'negative'],
//  ].map(([kw, n, s]) => `
//  <div class="flex items-center gap-3">
//  <span class="text-[12.5px] flex-1">${kw}</span>
//  <div class="flex-1 h-1.5 rounded-full bg-2 overflow-hidden">
//  <div class="h-full" style="width:${n * 2}%;background:${s === 'positive' ? '#10b981' : s === 'negative' ? '#ef4444' : '#f59e0b'}"></div>
//  </div>
//  <span class="text-[11px] font-mono text-3 w-8 text-right">${n}</span>
//  </div>
//  `).join('')}
//  </div>
//  </div>
//  </div>
//  </div>
//
//  <div data-tab-pane="rev-requests" class="hidden">
//  <div class="grid grid-cols-3 gap-4">
//  <div class="surface p-5 col-span-2">
//  ${UI.cardTitle({ title: 'Review request cadence', icon: 'send' })}
//  <div class="space-y-3">
//  <div class="surface p-4 flex items-center gap-4">
//  <div class="size-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center"><i data-lucide="user-plus" class="size-4 text-accent"></i></div>
//  <div class="flex-1">
//  <div class="text-[13px] font-semibold">Trigger: PMS move-in event</div>
//  <div class="text-[11.5px] text-3">Storable / SiteLink / Nectar webhook fires on first payment</div>
//  </div>
//  </div>
//  <div class="flex justify-center"><i data-lucide="arrow-down" class="size-4 text-4"></i></div>
//  <div class="surface p-4 flex items-center gap-4">
//  <div class="size-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"><i data-lucide="message-square" class="size-4 text-green"></i></div>
//  <div class="flex-1">
//  <div class="text-[13px] font-semibold">Day 2: SMS</div>
//  <div class="text-[11.5px] text-3">via Twilio • personalized with first name + facility</div>
//  </div>
//  <span class="status status-green">Active</span>
//  </div>
//  <div class="flex justify-center"><i data-lucide="arrow-down" class="size-4 text-4"></i></div>
//  <div class="surface p-4 flex items-center gap-4">
//  <div class="size-10 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center"><i data-lucide="mail" class="size-4 text-sky"></i></div>
//  <div class="flex-1">
//  <div class="text-[13px] font-semibold">Day 7: Email</div>
//  <div class="text-[11.5px] text-3">via Resend • includes direct GBP review link</div>
//  </div>
//  <span class="status status-green">Active</span>
//  </div>
//  <div class="flex justify-center"><i data-lucide="arrow-down" class="size-4 text-4"></i></div>
//  <div class="surface p-4 flex items-center gap-4">
//  <div class="size-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center"><i data-lucide="qr-code" class="size-4 text-amber"></i></div>
//  <div class="flex-1">
//  <div class="text-[13px] font-semibold">Office printout: QR code</div>
//  <div class="text-[11.5px] text-3">Static QR linking to GBP review page (per facility)</div>
//  </div>
//  <span class="status status-green">Active</span>
//  </div>
//  </div>
//  </div>
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'Last 30 days', icon: 'activity' })}
//  <div class="space-y-3 text-[12px]">
//  <div><div class="text-[10px] text-3 uppercase">SMS sent</div><div class="text-2xl font-bold">412</div><div class="text-[11px] text-3">94% delivery</div></div>
//  <div><div class="text-[10px] text-3 uppercase">Emails sent</div><div class="text-2xl font-bold">387</div><div class="text-[11px] text-3">28% open rate</div></div>
//  <div><div class="text-[10px] text-3 uppercase">Reviews collected</div><div class="text-2xl font-bold text-green">187</div><div class="text-[11px] text-3">47% conversion (above industry)</div></div>
//  </div>
//  </div>
//  </div>
//  </div>
//  `;
// };
// PAGES_AFTER.reviews = () => {
//  const labels = Array.from({ length: 12 }, (_, i) => 'Wk ' + (i + 1));
//  CHARTS.line('sentiment-chart', labels, [
//  { label: 'Positive', data: window.SENTIMENT_TRENDS.positive, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.15)', fill: true },
//  { label: 'Neutral', data: window.SENTIMENT_TRENDS.neutral, borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.05)', fill: false },
//  { label: 'Negative', data: window.SENTIMENT_TRENDS.negative, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.05)', fill: false },
//  ]);
// };
//