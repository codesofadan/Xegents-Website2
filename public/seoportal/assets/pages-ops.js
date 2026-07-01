/* ====================================================================
 OPERATIONS — Team, Runbooks, SOPs, Activity, Health, Onboarding, Vault
 ==================================================================== */

PAGES.team = () => {
 return `
 ${UI.pageHeader({
 eyebrow: 'Operations',
 title: 'Team',
 subtitle: '5 team members • 1 overloaded, 1 under-utilized this week • avg 67% capacity',
 actions: [
 UI.btn('Capacity planner', { variant: 'secondary', icon: 'calendar' }),
 UI.btn('Invite member', { variant: 'primary', icon: 'plus' }),
 ],
 })}

 <div class="flex border-b mb-5">
 <button onclick="UI.switchTab('team','roster')" data-tab="team-roster" class="tab active">Roster</button>
 <button onclick="UI.switchTab('team','capacity')" data-tab="team-capacity" class="tab">Capacity dashboard</button>
 <button onclick="UI.switchTab('team','tasks')" data-tab="team-tasks" class="tab">Tasks</button>
 <button onclick="UI.switchTab('team','performance')" data-tab="team-performance" class="tab">Performance</button>
 <button onclick="UI.switchTab('team','pulse')" data-tab="team-pulse" class="tab">Pulse survey</button>
 </div>

 <div data-tab-pane="team-roster">
 <div class="grid grid-cols-3 gap-4">
 ${window.TEAM.map(t => `
 <div class="surface p-5">
 <div class="flex items-start gap-3 mb-4">
 <div class="relative">
 ${UI.avatar(t.name, t.color, 56)}
 <span class="ring-dot ${t.status === 'on' ? 'ring-online' : t.status === 'overload' ? 'ring-busy' : 'ring-offline'}"></span>
 </div>
 <div class="flex-1">
 <div class="text-[15px] font-bold">${t.name}</div>
 <div class="text-[11.5px] text-2">${t.role}</div>
 <div class="text-[11px] text-3 mt-0.5"><i data-lucide="map-pin" class="size-2.5 inline"></i> ${t.tz}</div>
 </div>
 </div>
 <div class="space-y-2 mb-4">
 <div class="flex items-center justify-between text-[11.5px]">
 <span class="text-3">This week</span>
 <span class="font-mono ${t.status === 'overload' ? 'text-red' : t.status === 'under' ? 'text-amber' : 'text-green'}">${t.allocated}/${t.capacity}h</span>
 </div>
 ${UI.progressBar(Math.min((t.allocated/t.capacity)*100, 120), 120, t.status === 'overload' ? '#ef4444' : t.status === 'under' ? '#f59e0b' : '#10b981', 4)}
 </div>
 <div class="flex flex-wrap gap-1 mb-3">
 ${t.skills.map(s => `<span class="tag">${s}</span>`).join('')}
 </div>
 <div class="grid grid-cols-3 gap-2 pt-3 border-t text-center">
 <div><div class="text-[10px] text-3 uppercase">Rate</div><div class="text-[12px] font-bold">$${t.rate}/h</div></div>
 <div><div class="text-[10px] text-3 uppercase">Tasks</div><div class="text-[12px] font-bold">12</div></div>
 <div><div class="text-[10px] text-3 uppercase">On-time</div><div class="text-[12px] font-bold text-green">94%</div></div>
 </div>
 </div>
 `).join('')}
 </div>
 </div>

 <div data-tab-pane="team-capacity" class="hidden">
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Weekly capacity', subtitle: 'Week of May 18-24, 2026', icon: 'calendar' })}
 <div class="space-y-3">
 ${window.TEAM.map(t => {
 const pct = (t.allocated / t.capacity) * 100;
 const color = t.status === 'overload' ? '#ef4444' : t.status === 'under' ? '#f59e0b' : '#10b981';
 return `
 <div>
 <div class="flex items-center gap-3 mb-1">
 ${UI.avatar(t.name, t.color, 24)}
 <span class="text-[12.5px] font-medium flex-1">${t.name}</span>
 <span class="text-[11px] text-3">${t.role}</span>
 <span class="text-[12px] font-mono font-semibold ${t.status === 'overload' ? 'text-red' : t.status === 'under' ? 'text-amber' : 'text-1'}">${t.allocated}/${t.capacity}h</span>
 ${t.status === 'overload' ? '<span class="status status-red">OVERLOAD</span>' : t.status === 'under' ? '<span class="status status-amber">UNDER</span>' : '<span class="status status-green">OK</span>'}
 </div>
 <div class="h-2 rounded-full bg-2 overflow-hidden relative">
 <div class="h-full rounded-full" style="width:${Math.min(pct, 120)}%;background:${color}"></div>
 <div class="absolute right-0 top-0 h-full w-px bg-white/30" style="right:${100 - 100}%"></div>
 </div>
 </div>
 `;
 }).join('')}
 </div>

 <div class="surface bg-indigo-500/8 border-indigo-500/30 p-4 mt-5 flex items-start gap-3">
 <i data-lucide="sparkles" class="size-4 text-accent mt-0.5"></i>
 <div class="flex-1">
 <div class="text-[12.5px] font-semibold text-accent mb-1">Suggestion</div>
 <div class="text-[12px] text-1">Move 2 content tasks from Aimen (38h alloc) to Adan (22h alloc). Adan has bandwidth and content drafting capability.</div>
 </div>
 <button class="btn btn-primary text-[11px]" onclick="toast('Tasks reassigned: Adan +6h, Aimen -6h','success')">Apply</button>
 </div>
 </div>
 </div>

 <div data-tab-pane="team-tasks" class="hidden">
 <div class="surface overflow-hidden">
 <table class="w-full">
 <thead>
 <tr class=" border-b">
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">ID</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Title</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Assignee</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Facility</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">SOP</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Due</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Priority</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Status</th>
 </tr>
 </thead>
 <tbody>
 ${window.TASKS.map(t => {
 const member = window.TEAM.find(m => m.id === t.assignee);
 const f = t.facility ? getFacility(t.facility) : null;
 const priColor = t.priority === 'high' ? 'red' : t.priority === 'med' ? 'amber' : 'slate';
 const statusColor = t.status === 'done' ? 'green' : t.status === 'in_progress' ? 'indigo' : 'slate';
 return `
 <tr class="table-row">
 <td class="px-4 py-3 font-mono text-[11px] text-accent">${t.id}</td>
 <td class="px-4 py-3 text-[12.5px] font-medium">${t.title}</td>
 <td class="px-4 py-3">
 <div class="flex items-center gap-1.5">
 ${UI.avatar(member?.name || 'AI', member?.color || '#6366f1', 22)}
 <span class="text-[11.5px]">${member?.name.split(' ')[0] || 'AI'}</span>
 </div>
 </td>
 <td class="px-4 py-3 text-[11.5px] text-2">${f?.name || '—'}</td>
 <td class="px-4 py-3">${t.sop ? `<code class="text-[10px] text-accent">${t.sop}</code>` : ''}</td>
 <td class="px-4 py-3 text-[11px] text-3">${t.due}</td>
 <td class="px-4 py-3">${UI.pill(t.priority, priColor)}</td>
 <td class="px-4 py-3">${UI.pill(t.status.replace('_',' '), statusColor)}</td>
 </tr>
 `;
 }).join('')}
 </tbody>
 </table>
 </div>
 </div>

 <div data-tab-pane="team-performance" class="hidden">
 <div class="grid grid-cols-5 gap-3 mb-4">
 ${window.TEAM.map(t => `
 <div class="surface p-4 text-center">
 ${UI.avatar(t.name, t.color, 40)}
 <div class="text-[12px] font-semibold mt-2">${t.name.split(' ')[0]}</div>
 <div class="grid grid-cols-2 gap-2 mt-3 text-[11px]">
 <div><div class="text-[9px] text-3 uppercase">Tasks</div><div class="font-bold">${10 + Math.floor(Math.random() * 12)}</div></div>
 <div><div class="text-[9px] text-3 uppercase">Done</div><div class="font-bold text-green">${8 + Math.floor(Math.random() * 8)}</div></div>
 <div><div class="text-[9px] text-3 uppercase">On-time</div><div class="font-bold text-green">${90 + Math.floor(Math.random() * 8)}%</div></div>
 <div><div class="text-[9px] text-3 uppercase">QA score</div><div class="font-bold">${82 + Math.floor(Math.random() * 14)}</div></div>
 </div>
 </div>
 `).join('')}
 </div>
 </div>

 <div data-tab-pane="team-pulse" class="hidden">
 <div class="grid grid-cols-2 gap-4">
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Weekly pulse — anonymous', subtitle: 'Aggregated team sentiment', icon: 'heart' })}
 <div class="h-56"><canvas id="pulse-chart"></canvas></div>
 <div class="mt-3 text-[11.5px] text-3">Question (rotates weekly): "On a scale of 1-10, how supported did you feel this week?"</div>
 </div>
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Themes (LLM-extracted)', icon: 'message-square' })}
 <div class="space-y-2 text-[12.5px]">
 <div class="surface p-3 bg-emerald-500/8 border-emerald-500/30">
 <div class="flex items-center gap-2 mb-1"><i data-lucide="thumbs-up" class="size-3.5 text-green"></i><span class="font-semibold text-green">Positive</span></div>
 <div class="text-1">"Adan's onboarding made our content pipeline noticeably faster."</div>
 </div>
 <div class="surface p-3 bg-amber-500/8 border-amber-500/30">
 <div class="flex items-center gap-2 mb-1"><i data-lucide="alert-circle" class="size-3.5 text-amber"></i><span class="font-semibold text-amber">Concern</span></div>
 <div class="text-1">"Content QA gate sometimes blocks 2 days, slows delivery."</div>
 </div>
 <div class="surface p-3 bg-sky-500/8 border-sky-500/30">
 <div class="flex items-center gap-2 mb-1"><i data-lucide="lightbulb" class="size-3.5 text-sky"></i><span class="font-semibold text-sky-300">Suggestion</span></div>
 <div class="text-1">"Could we have a weekly 30 min sync on what is shipping?"</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 `;
};
PAGES_AFTER.team = () => {
 CHARTS.line('pulse-chart', window.PULSE_RESULTS.slice().reverse().map(p => p.week), [{ label: 'Score', data: window.PULSE_RESULTS.slice().reverse().map(p => p.score), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.12)' }], { scales: { y: { min: 5, max: 10 } } });
};

PAGES.runbooks = () => {
 const active = window.ACTIVE_RUNBOOKS[0];
 return `
 ${UI.pageHeader({
 eyebrow: 'Operations',
 title: 'Operational runbooks',
 subtitle: '4 pre-built templates • 1 currently active (Athens 2 suspension recovery)',
 actions: [UI.btn('Custom runbook', { variant: 'primary', icon: 'plus' })],
 })}

 <div class="grid grid-cols-3 gap-4 mb-5">
 ${window.RUNBOOKS_TEMPLATES.map(t => `
 <div class="surface surface-hover p-4">
 <div class="flex items-center gap-2 mb-2">
 <span class="pill pill-${t.severity === 'critical' ? 'red' : 'amber'}">${t.severity.toUpperCase()}</span>
 <span class="text-[10px] text-3 ml-auto">${t.uses} runs</span>
 </div>
 <h3 class="text-[14px] font-bold mb-1">${t.title}</h3>
 <div class="text-[11.5px] text-3">${t.steps} steps</div>
 </div>
 `).join('')}
 </div>

 <div class="surface p-5 border-l-4">
 <div class="flex items-start justify-between mb-4">
 <div>
 <div class="flex items-center gap-2 mb-1">
 <span class="status status-red font-bold">ACTIVE</span>
 <h2 class="text-[18px] font-bold">${active.title}</h2>
 </div>
 <div class="text-[11.5px] text-3">Triggered ${active.triggered_at} • Step ${active.current_step} of ${active.total_steps}</div>
 </div>
 <div class="flex gap-2">
 <button class="btn btn-secondary text-[12px]">Pause</button>
 <button class="btn btn-destructive text-[12px]">Cancel</button>
 </div>
 </div>

 ${UI.progressBar(active.current_step, active.total_steps, '#ef4444', 6)}

 <div class="mt-5 space-y-2">
 ${active.steps.map(s => `
 <div class="surface p-4 ${s.status === 'in_progress' ? 'ring-2 ring-amber-500/40 bg-amber-500/5' : ''}">
 <div class="flex items-center gap-3">
 <span class="size-7 rounded-full flex items-center justify-center font-bold text-[11px]" style="background:${s.status === 'done' ? 'rgba(16,185,129,0.2)' : s.status === 'in_progress' ? 'rgba(245,158,11,0.25)' : 'rgba(100,116,139,0.15)'};color:${s.status === 'done' ? '#10b981' : s.status === 'in_progress' ? '#f59e0b' : '#64748b'};border:1px solid ${s.status === 'done' ? 'rgba(16,185,129,0.5)' : s.status === 'in_progress' ? 'rgba(245,158,11,0.5)' : 'rgba(71,85,105,0.5)'}">${s.status === 'done' ? '✓' : s.n}</span>
 <div class="flex-1">
 <div class="text-[13px] font-semibold ${s.status === 'done' ? 'text-2 line-through' : ''}">${s.label}</div>
 ${s.by ? `<div class="text-[10.5px] text-3">${s.status === 'done' ? 'Done ' : ''}by ${s.by}${s.at ? ' at ' + s.at : ''}</div>` : ''}
 </div>
 ${s.status === 'done' ? '<span class="status status-green">DONE</span>' : s.status === 'in_progress' ? '<span class="status status-amber">IN PROGRESS</span>' : '<span class="tag">PENDING</span>'}
 </div>
 ${s.sub ? `
 <div class="mt-3 pl-10 grid grid-cols-2 gap-2">
 ${s.sub.map(ss => `
 <div class="flex items-center gap-2 text-[12px]">
 ${ss.status === 'done' ? '<i data-lucide="check-circle-2" class="size-3.5 text-green"></i>' : '<i data-lucide="circle-dashed" class="size-3.5 text-amber"></i>'}
 <span class="${ss.status === 'done' ? 'text-2' : 'text-1'}">${ss.label}</span>
 ${ss.status === 'needed' ? '<button class="btn btn-secondary text-[10px] ml-auto"><i data-lucide="upload" class="size-2.5"></i> Upload</button>' : ''}
 </div>
 `).join('')}
 </div>
 ` : ''}
 </div>
 `).join('')}
 </div>

 <div class="surface bg-fuchsia-500/8 border-fuchsia-500/30 p-3 mt-4">
 <div class="flex items-center gap-2 mb-1">
 <i data-lucide="sparkles" class="size-3.5 text-accent"></i>
 <span class="text-[11px] font-semibold text-fuchsia-300">AI pre-populated reinstatement form</span>
 </div>
 <p class="text-[11.5px] text-1">Claude auto-filled the reinstatement form from your business license, address, and historical edit timeline. Ready for review.</p>
 <button class="btn btn-secondary text-[11px] mt-2">Review form</button>
 </div>

 <div class="flex gap-2 mt-4 pt-4 border-t">
 <button class="btn btn-primary"><i data-lucide="check" class="size-3.5 inline"></i> Advance to next step</button>
 <button class="btn btn-secondary">Add comment</button>
 </div>
 </div>

 <div class="surface p-5 mt-5">
 ${UI.cardTitle({ title: 'Learnings library', subtitle: 'Auto-captured at runbook close', icon: 'lightbulb' })}
 ${window.LEARNINGS.map(l => `
 <div class="surface p-3 mb-2 flex items-center gap-3">
 <i data-lucide="lightbulb" class="size-4 text-amber"></i>
 <div class="flex-1">
 <div class="text-[12.5px] font-medium">${l.title}</div>
 <div class="text-[10.5px] text-3">${l.date} • ${l.tags.join(', ')}</div>
 </div>
 </div>
 `).join('')}
 </div>
 `;
};

PAGES.sops = () => {
 return `
 ${UI.pageHeader({
 eyebrow: 'Operations',
 title: 'SOP library',
 subtitle: '28 SOPs • versioned, searchable, linked to tasks. ' + window.SOPS.reduce((s, o) => s + o.uses, 0) + ' total runs.',
 actions: [
 UI.btn('Categories', { variant: 'secondary', icon: 'tags' }),
 UI.btn('New SOP', { variant: 'primary', icon: 'plus' }),
 ],
 })}

 <div class="flex items-center gap-2 mb-4">
 ${UI.searchInput('Search SOPs by title or tag...')}
 ${UI.filterPill('All tags', 'tag')}
 ${UI.filterPill('Sort: most used', 'arrow-down-wide-narrow')}
 </div>

 <div class="surface overflow-hidden">
 <table class="w-full">
 <thead>
 <tr class=" border-b">
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">ID</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Title</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Tags</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Version</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Updated</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Uses</th>
 <th class="w-8"></th>
 </tr>
 </thead>
 <tbody>
 ${window.SOPS.map(s => `
 <tr class="table-row cursor-pointer">
 <td class="px-4 py-3"><code class="text-[11px] text-accent">${s.id}</code></td>
 <td class="px-4 py-3 text-[12.5px] font-medium">${s.title}</td>
 <td class="px-4 py-3">${s.tags.map(t => `<span class="tag mr-1">${t}</span>`).join('')}</td>
 <td class="px-4 py-3"><code class="text-[11px]">${s.version}</code></td>
 <td class="px-4 py-3 text-[11px] text-3">${s.updated}</td>
 <td class="px-4 py-3 font-mono text-[12px] text-1">${s.uses}x</td>
 <td class="px-4 py-3"><i data-lucide="chevron-right" class="size-4 text-4"></i></td>
 </tr>
 `).join('')}
 </tbody>
 </table>
 </div>
 `;
};

PAGES.activity = () => {
 return `
 ${UI.pageHeader({
 eyebrow: 'Operations',
 title: 'Activity log',
 subtitle: 'All actions across portal — humans + AI agents. Filterable, exportable, audit-grade.',
 actions: [UI.btn('Export CSV', { variant: 'secondary', icon: 'download' })],
 })}

 <div class="flex items-center gap-2 mb-4">
 ${UI.searchInput('Search activity...')}
 ${UI.filterPill('All users', 'user')}
 ${UI.filterPill('All actions', 'list')}
 ${UI.filterPill('Last 7 days', 'calendar')}
 </div>

 <div class="surface overflow-hidden">
 ${window.ACTIVITY.concat(window.ACTIVITY).map(a => {
 const userColor = a.user === 'AI' ? '#a78bfa' : '#6366f1';
 return `
 <div class="px-5 py-3 border-b last:border-0 hover: flex items-center gap-3">
 ${UI.avatar(a.user, userColor, 28)}
 <div class="flex-1 text-[12.5px]">
 <span class="font-semibold">${a.user}</span>
 <span class="text-2">${a.action.replace(/_/g, ' ')}</span>
 <span class="font-medium text-accent">${a.resource}</span>
 <div class="text-[11px] text-3 mt-0.5">${a.detail}</div>
 </div>
 <span class="text-[10.5px] font-mono text-3">${a.at}</span>
 </div>
 `;
 }).join('')}
 </div>
 `;
};

PAGES.health = () => {
 const h = window.SYSTEM_HEALTH;
 return `
 ${UI.pageHeader({
 eyebrow: 'Operations',
 title: 'System health',
 subtitle: 'Live infrastructure status: APIs, jobs, webhooks, storage, backups.',
 actions: [UI.btn('Re-run all checks', { variant: 'secondary', icon: 'refresh-cw' })],
 })}

 <div class="grid grid-cols-2 gap-4 mb-4">
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'API quota usage', subtitle: 'May 2026 cycle', icon: 'gauge' })}
 ${h.api_quotas.map(q => `
 <div class="mb-3">
 <div class="flex items-center justify-between text-[12px] mb-1">
 <span>${q.name}</span>
 <span class="font-mono ${q.used > 70 ? 'text-amber' : 'text-2'}">${q.used}%</span>
 </div>
 ${UI.progressBar(q.used, 100, q.color, 4)}
 </div>
 `).join('')}
 </div>
 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Background jobs (24h)', icon: 'activity' })}
 <div class="grid grid-cols-3 gap-3 mb-4">
 <div class="surface p-3 text-center"><div class="eyebrow mb-1">Completed</div><div class="text-2xl font-bold text-green">${h.jobs_24h.completed.toLocaleString()}</div></div>
 <div class="surface p-3 text-center"><div class="eyebrow mb-1">Retries</div><div class="text-2xl font-bold text-amber">${h.jobs_24h.retries}</div></div>
 <div class="surface p-3 text-center"><div class="eyebrow mb-1">DLQ</div><div class="text-2xl font-bold text-red">${h.jobs_24h.dlq}</div></div>
 </div>
 <div class="space-y-2 text-[12px]">
 <div class="flex items-center justify-between"><span class="text-2">Cron schedule</span><span class="status status-green">ALL GREEN</span></div>
 <div class="flex items-center justify-between"><span class="text-2">Webhook delivery</span><span class="font-mono text-green">${h.webhook_rate}%</span></div>
 <div class="flex items-center justify-between"><span class="text-2">Database</span><span class="font-mono">${h.db_gb} GB / ${h.db_cap} GB</span></div>
 <div class="flex items-center justify-between"><span class="text-2">Storage</span><span class="font-mono">${h.storage_gb} GB / ${h.storage_cap} GB</span></div>
 <div class="flex items-center justify-between"><span class="text-2">Egress (mo)</span><span class="font-mono">${h.egress_gb} GB / ${h.egress_cap} GB</span></div>
 </div>
 </div>
 </div>

 <div class="surface p-5">
 ${UI.cardTitle({ title: 'Backup schedule', icon: 'database' })}
 <div class="grid grid-cols-7 gap-1.5">
 ${Array.from({ length: 28 }, (_, i) => `<div class="h-8 rounded-sm bg-emerald-500/60 hover:bg-emerald-500 cursor-pointer" data-tooltip="Snapshot ${i+1}"></div>`).join('')}
 </div>
 <div class="text-[11px] text-3 mt-3">Daily Postgres snapshots to Hetzner Storage Box. 28 days retention. Last backup: 12:00 PKT today (1.2 GB).</div>
 </div>
 `;
};

PAGES.onboarding = () => {
 return `
 ${UI.pageHeader({
 eyebrow: 'Delivery',
 title: 'Onboarding workflows',
 subtitle: '2 active onboardings. Replaces ad-hoc Google Forms + Drive + WhatsApp chaos.',
 actions: [UI.btn('New onboarding', { variant: 'primary', icon: 'plus' })],
 })}

 <div class="flex border-b mb-5">
 <button onclick="UI.switchTab('ob','active')" data-tab="ob-active" class="tab active">Active (2)</button>
 <button onclick="UI.switchTab('ob','vault')" data-tab="ob-vault" class="tab">Access vault</button>
 <button onclick="UI.switchTab('ob','assets')" data-tab="ob-assets" class="tab">Asset library</button>
 </div>

 <div data-tab-pane="ob-active">
 ${window.ONBOARDING.map(o => {
 const c = getClient(o.client);
 return `
 <div class="surface p-5 mb-4">
 <div class="flex items-start justify-between mb-4">
 <div>
 <h3 class="text-[16px] font-bold">${o.name}</h3>
 <div class="text-[11.5px] text-3">${c?.name} • Started ${o.started}</div>
 </div>
 <div class="text-right">
 <div class="text-[20px] font-bold">${o.progress} <span class="text-base text-3">/ ${o.total}</span></div>
 <div class="text-[10px] uppercase tracking-wider text-3">steps complete</div>
 </div>
 </div>

 ${UI.progressBar(o.progress, o.total, '#6366f1', 6)}

 <div class="grid grid-cols-2 gap-2 mt-4">
 ${o.steps.map(s => `
 <div class="surface p-2.5 flex items-center gap-2">
 ${s.status === 'done' ? '<i data-lucide="check-circle-2" class="size-4 text-green shrink-0"></i>' : s.status === 'in_progress' ? '<i data-lucide="loader-2" class="size-4 text-amber shrink-0"></i>' : '<i data-lucide="circle" class="size-4 text-4 shrink-0"></i>'}
 <div class="flex-1 text-[12px] ${s.status === 'done' ? 'text-2 line-through' : ''}">${s.name}</div>
 ${s.at ? `<span class="text-[10px] text-3">${s.at}</span>` : ''}
 ${s.detail ? `<span class="text-[10px] text-amber">${s.detail}</span>` : ''}
 </div>
 `).join('')}
 </div>

 <div class="flex gap-2 mt-4 pt-4 border-t">
 <button class="btn btn-primary text-[12px]"><i data-lucide="send" class="size-3 inline"></i> Send reminder</button>
 <button class="btn btn-secondary text-[12px]">Mark step complete</button>
 <button class="btn btn-ghost text-[12px]"><i data-lucide="plus" class="size-3 inline"></i> Add custom step</button>
 </div>
 </div>
 `;
 }).join('')}
 </div>

 <div data-tab-pane="ob-vault" class="hidden">
 <div class="surface p-3 mb-3 bg-indigo-500/8 border-indigo-500/30 flex items-center gap-3">
 <i data-lucide="lock" class="size-4 text-accent"></i>
 <div class="text-[12px] text-1 flex-1">All credentials encrypted at rest with envelope encryption. Audit log enabled. Per-tenant master key.</div>
 <button class="btn btn-secondary text-[11px]">View audit log</button>
 </div>
 <div class="surface overflow-hidden">
 <table class="w-full">
 <thead>
 <tr class=" border-b">
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Service</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Facility</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Status</th>
 <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Expires</th>
 <th class="w-32"></th>
 </tr>
 </thead>
 <tbody>
 ${window.ACCESS_VAULT.map(v => {
 const statusColor = v.status === 'valid' ? 'green' : v.status === 'expiring' ? 'amber' : v.status === 'expired' ? 'red' : 'slate';
 return `
 <tr class="table-row">
 <td class="px-4 py-3 text-[12.5px] font-medium">${v.service}</td>
 <td class="px-4 py-3 text-[12px] text-2">${v.facility}</td>
 <td class="px-4 py-3">${UI.pill(v.status.toUpperCase(), statusColor)}</td>
 <td class="px-4 py-3 text-[11.5px] font-mono ${v.expires_in_days < 0 ? 'text-red' : v.expires_in_days <= 30 ? 'text-amber' : 'text-2'}">${v.expires_in_days ? (v.expires_in_days > 0 ? v.expires_in_days + 'd left' : Math.abs(v.expires_in_days) + 'd ago') : '—'}</td>
 <td class="px-4 py-3">
 ${v.status === 'expiring' || v.status === 'expired' ? '<button class="btn btn-primary text-[11px]"><i data-lucide="refresh-cw" class="size-3 inline"></i> Renew</button>' : v.status === 'missing' ? '<button class="btn btn-secondary text-[11px]">Request</button>' : '<button class="btn btn-ghost text-[11px]">Test</button>'}
 </td>
 </tr>
 `;
 }).join('')}
 </tbody>
 </table>
 </div>
 </div>

 <div data-tab-pane="ob-assets" class="hidden">
 <div class="grid grid-cols-4 gap-3">
 ${[
 { type: 'logo', name: 'Acme master logo (svg)', size: '14 KB' },
 { type: 'photo', name: 'Athens 1 exterior (drone)', size: '2.4 MB' },
 { type: 'photo', name: 'Athens 1 climate units', size: '1.8 MB' },
 { type: 'photo', name: 'Atlanta team photo', size: '3.1 MB' },
 { type: 'doc', name: 'Acme brand voice doc', size: '12 KB' },
 { type: 'doc', name: 'Acme NAP master record', size: '2 KB' },
 { type: 'doc', name: 'Acme style guide', size: '88 KB' },
 { type: 'video', name: 'Tour walkthrough', size: '47 MB' },
 ].map(a => `
 <div class="surface surface-hover p-3">
 <div class="aspect-video rounded bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 border border-indigo-500/30 flex items-center justify-center mb-2">
 <i data-lucide="${a.type === 'photo' ? 'image' : a.type === 'video' ? 'video' : a.type === 'doc' ? 'file-text' : 'shapes'}" class="size-6 text-accent"></i>
 </div>
 <div class="text-[12px] font-medium truncate">${a.name}</div>
 <div class="text-[10px] text-3">${a.size}</div>
 </div>
 `).join('')}
 </div>
 </div>
 `;
};

PAGES.vault = PAGES.onboarding;
