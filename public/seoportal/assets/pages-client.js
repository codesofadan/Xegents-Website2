/* ====================================================================
 CLIENT-FACING — White-label dashboard, message inbox, approvals
 ==================================================================== */

PAGES.client = () => {
 const c = getClient('acme');
 const facilities = window.FACILITIES.filter(f => f.client_id === 'acme');
 return `
 <div class="-m-6 p-6 bg-gradient-to-br from-orange-500/5 via-navy-900 to-navy-900 min-h-full">
 <div class="flex items-center gap-3 mb-6">
 <div class="size-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-white text-[18px]">A</div>
 <div>
 <div class="text-[11px] text-orange-400 uppercase tracking-wider font-bold">Acme Storage portal</div>
 <h1 class="text-[20px] font-bold">Storage Portfolio Dashboard</h1>
 <div class="text-[11.5px] text-3">Welcome, Sara. Last refresh: 2 hours ago.</div>
 </div>
 <div class="ml-auto flex gap-2">
 <button class="btn btn-secondary text-[12px]"><i data-lucide="download" class="size-3 inline"></i> Download report</button>
 <button class="btn btn-primary text-[12px]"><i data-lucide="message-circle" class="size-3 inline"></i> Message Mark</button>
 </div>
 </div>

 <div class="grid grid-cols-4 gap-3 mb-6">
 ${UI.statCard({ label: 'Facilities', value: c.facilities, icon: 'warehouse', accent: 'indigo' })}
 ${UI.statCard({ label: 'Avg rank', value: c.avg_rank.toFixed(1), delta: -c.avg_rank_delta, deltaLabel: ' (was 6.1)', icon: 'trending-up', accent: 'green' })}
 ${UI.statCard({ label: 'Total reviews', value: c.total_reviews, delta: 187, deltaLabel: ' this month', icon: 'star', accent: 'amber' })}
 ${UI.statCard({ label: 'GBP calls (mo)', value: c.gbp_calls_mtd.toLocaleString(), delta: c.gbp_calls_mom * 100, deltaLabel: '%', icon: 'phone', accent: 'green' })}
 </div>

 <div class="grid grid-cols-3 gap-4 mb-4">
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Top performers', icon: 'trophy' })}
 ${facilities.sort((a, b) => a.rank - b.rank).slice(0, 5).map((f, i) => `
 <div class="flex items-center gap-3 py-2 border-b last:border-0">
 <span class="text-[11px] font-mono font-bold w-5 ${i === 0 ? 'text-amber' : 'text-3'}">${i + 1}</span>
 <span class="text-[12.5px] flex-1 truncate">${f.name}</span>
 <span class="text-[11px] font-mono text-green">Rank ${f.rank.toFixed(1)}</span>
 <span class="text-[10px] text-green">${formatDelta(-f.rank_delta)}</span>
 </div>
 `).join('')}
 </div>

 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Action items', subtitle: 'Waiting on you', icon: 'inbox' })}
 ${window.CLIENT_APPROVALS.filter(a => a.status === 'pending').map(a => `
 <div class="surface p-3 mb-2 cursor-pointer card-hover">
 <div class="text-[12.5px] font-medium mb-1">${a.resource}</div>
 <div class="text-[10.5px] text-3 mb-2">${a.type} • requested ${a.requested}</div>
 <div class="flex gap-1.5">
 <button class="btn btn-primary text-[11px] flex-1">Approve</button>
 <button class="btn btn-ghost text-[11px]">Review</button>
 </div>
 </div>
 `).join('')}
 </div>

 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Recent activity', icon: 'activity' })}
 <div class="space-y-2">
 ${[
 { icon: 'file-bar-chart', text: 'Audit report ready for review', time: 'May 15' },
 { icon: 'star', text: '12 new reviews this week', time: 'May 14' },
 { icon: 'megaphone', text: '8 GBP posts published', time: 'May 13' },
 { icon: 'shield-check', text: 'Schema deployed for Athens 1', time: 'May 12' },
 { icon: 'link', text: '5 new citations built', time: 'May 12' },
 ].map(a => `
 <div class="flex items-center gap-2 text-[11.5px] py-1">
 <i data-lucide="${a.icon}" class="size-3.5 text-orange-400 shrink-0"></i>
 <span class="flex-1">${a.text}</span>
 <span class="text-[10px] text-3">${a.time}</span>
 </div>
 `).join('')}
 </div>
 </div>
 </div>

 <div class="grid grid-cols-2 gap-4">
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Rank trajectory — last 90 days', icon: 'line-chart' })}
 <div class="h-56"><canvas id="client-rank-chart"></canvas></div>
 </div>
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'YoY comparison', icon: 'git-compare' })}
 <table class="w-full text-[12px]">
 <thead>
 <tr class="border-b ">
 <th class="text-left py-2 text-[10px] uppercase text-3">Metric</th>
 <th class="text-right py-2 text-[10px] uppercase text-3">May 2025</th>
 <th class="text-right py-2 text-[10px] uppercase text-3">May 2026</th>
 <th class="text-right py-2 text-[10px] uppercase text-3">YoY</th>
 </tr>
 </thead>
 <tbody>
 ${[
 ['Avg rank', '7.1', '4.2', '-2.9'],
 ['Reviews collected', '142', '187', '+31.7%'],
 ['GBP calls (mo)', '781', '1,247', '+59.7%'],
 ['Website clicks', '1,388', '2,188', '+57.6%'],
 ['Rentals attributed', '24', '42', '+75%'],
 ].map(([m, a, b, d]) => `
 <tr class="border-b ">
 <td class="py-2 text-1">${m}</td>
 <td class="py-2 text-right font-mono text-3">${a}</td>
 <td class="py-2 text-right font-mono font-semibold">${b}</td>
 <td class="py-2 text-right font-mono text-green">${d}</td>
 </tr>
 `).join('')}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 `;
};
PAGES_AFTER.client = () => {
 const labels = Array.from({ length: 13 }, (_, i) => 'Wk ' + (i + 1));
 CHARTS.line('client-rank-chart', labels, [
 { label: 'Avg portfolio rank', data: [7.1, 6.8, 6.5, 6.2, 5.9, 5.5, 5.2, 4.9, 4.6, 4.4, 4.3, 4.2, 4.2], borderColor: '#fb923c', backgroundColor: 'rgba(251,146,60,0.15)' },
 ], { scales: { y: { reverse: true, suggestedMin: 1, suggestedMax: 8 } } });
};

PAGES.messages = () => {
 const threads = window.MESSAGE_THREADS;
 return `
 ${UI.pageHeader({
 eyebrow: 'Client',
 title: 'Message inbox',
 subtitle: 'Consolidated WhatsApp + email + Slack threads per client. AI-suggested replies.',
 actions: [
 UI.btn('Bulk reply', { variant: 'secondary', icon: 'reply-all' }),
 UI.btn('New message', { variant: 'primary', icon: 'plus' }),
 ],
 })}

 <div class="grid grid-cols-12 gap-4 h-[calc(100vh-220px)]">
 <div class="col-span-3">
 <div class="surface p-3 h-full overflow-y-auto">
 <div class="eyebrow mb-2 px-2">Inbox (4 unread)</div>
 ${threads.map((t, i) => {
 const c = getClient(t.client);
 const channelIcons = { whatsapp: 'message-circle', email: 'mail', slack: 'hash' };
 const channelColors = { whatsapp: 'text-green', email: 'text-sky', slack: 'text-accent' };
 const isActive = i === 0;
 return `
 <div onclick="document.querySelectorAll('.mt-row').forEach(el=>el.classList.remove('bg-indigo-500/10','border-l-indigo-500'));this.classList.add('bg-indigo-500/10','border-l-indigo-500');document.querySelectorAll('.mt-thread').forEach(el=>el.classList.add('hidden'));document.getElementById('mt-thread-${t.id}').classList.remove('hidden');" class="mt-row p-3 rounded-lg cursor-pointer border-l-2 border-l-transparent hover: mb-1 ${isActive ? 'bg-indigo-500/10 border-l-indigo-500' : ''}">
 <div class="flex items-center gap-2 mb-1">
 <i data-lucide="${channelIcons[t.channel]}" class="size-3.5 ${channelColors[t.channel]}"></i>
 <span class="text-[12px] font-semibold flex-1">${t.contact}</span>
 ${t.unread ? '<span class="dot bg-indigo-500"></span>' : ''}
 </div>
 <div class="text-[11px] text-3 mb-1">${c?.name}</div>
 <div class="text-[12px] font-medium mb-1 truncate">${t.subject}</div>
 <div class="text-[11px] text-3 truncate">${t.messages[t.messages.length - 1].body}</div>
 <div class="text-[10px] text-4 mt-1">${t.last_at}</div>
 </div>
 `;
 }).join('')}
 </div>
 </div>

 <div class="col-span-9">
 ${threads.map((t, i) => {
 const c = getClient(t.client);
 return `
 <div id="mt-thread-${t.id}" class="mt-thread card h-full flex flex-col ${i === 0 ? '' : 'hidden'}">
 <div class="px-5 py-3 border-b flex items-center gap-3">
 ${UI.avatar(t.contact, '#6366f1', 36)}
 <div class="flex-1">
 <div class="text-[14px] font-bold">${t.contact}</div>
 <div class="text-[11px] text-3">${c?.name} • ${t.channel}</div>
 </div>
 <button class="btn btn-ghost"><i data-lucide="phone" class="size-3.5"></i></button>
 <button class="btn btn-ghost"><i data-lucide="info" class="size-3.5"></i></button>
 </div>

 <div class="flex-1 p-5 overflow-y-auto space-y-4">
 ${t.messages.map(m => {
 if (m.dir === 'in') {
 return `
 <div class="flex gap-3 max-w-3xl">
 ${UI.avatar(m.from, '#6366f1', 28)}
 <div class="flex-1">
 <div class="text-[10.5px] text-3 mb-1">${m.from} • ${m.at}</div>
 <div class="bubble bubble-in">${m.body}</div>
 </div>
 </div>
 `;
 } else if (m.dir === 'draft') {
 return `
 <div class="ml-auto max-w-3xl">
 <div class="text-[10.5px] text-accent mb-1 text-right flex items-center justify-end gap-1"><i data-lucide="sparkles" class="size-3"></i> AI suggested reply (Claude Sonnet)</div>
 <div class="surface bg-fuchsia-500/8 border-fuchsia-500/30 p-3">
 <div class="text-[13px] text-1 leading-relaxed whitespace-pre-wrap">${m.body}</div>
 </div>
 <div class="flex gap-2 mt-2 justify-end">
 <button class="btn btn-ghost text-[11px]">Regenerate</button>
 <button class="btn btn-secondary text-[11px]">Edit</button>
 <button class="btn btn-primary text-[11px]"><i data-lucide="send" class="size-3 inline"></i> Send via ${t.channel}</button>
 </div>
 </div>
 `;
 } else {
 return `
 <div class="flex gap-3 max-w-3xl ml-auto">
 <div class="flex-1">
 <div class="text-[10.5px] text-3 mb-1 text-right">${m.from} • ${m.at}</div>
 <div class="bubble bubble-out">${m.body}</div>
 </div>
 </div>
 `;
 }
 }).join('')}
 </div>

 <div class="border-t p-3">
 <div class="relative">
 <textarea class="w-full bg-2 rounded-lg p-3 pr-12 text-[13px] focus:outline-none focus:border-indigo-500" placeholder="Type a reply..." rows="2"></textarea>
 <div class="absolute right-2 bottom-2 flex gap-1">
 <button class="size-7 rounded hover:bg-3 flex items-center justify-center"><i data-lucide="paperclip" class="size-3.5 text-2"></i></button>
 <button class="size-7 rounded hover:bg-3 flex items-center justify-center"><i data-lucide="sparkles" class="size-3.5 text-accent"></i></button>
 <button class="size-7 rounded bg-indigo-500 hover:bg-indigo-400 flex items-center justify-center"><i data-lucide="send" class="size-3.5 text-white"></i></button>
 </div>
 </div>
 </div>
 </div>
 `;
 }).join('')}
 </div>
 </div>
 `;
};
