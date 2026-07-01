/* ============================================================
   Team macro - hub + dense micro sub-modules.
   Each sub-module is its assigned archetype, structurally
   distinct from its siblings:
     team             :: DENSE LIST  (roster, stat rail header)
     team.workload    :: BOARD       (full-bleed kanban + capacity strip)
     team.time        :: DENSE LIST  (time entries by member x client)
     team.permissions :: MATRIX      (roles x capabilities)
   window.TEAM (the 6 members) lives in seed.js - do NOT redefine.
   window.TEAM_OPS (data/team.js) carries the operational layer.
   ============================================================ */

window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};
window.FULLBLEED = window.FULLBLEED || new Set();
window.FULLBLEED.add('team.workload');

(function () {
  const T = () => window.TEAM_OPS;
  const MONTH = () => (window.AGENCY ? window.AGENCY.period : 'this month');

  // ---- shared lookups / formatters ----
  const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');
  const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  const clientName = (id) => (window.getClient(id) || {}).name || id;
  const clientColor = (id) => (window.getClient(id) || {}).logoColor || '#565659';
  const memberName = (id) => { const m = window.getTeam(id); return m ? m.name : id; };
  const memberColor = (id) => { const m = window.getTeam(id); return m ? m.avatarColor : '#565659'; };

  // utilization color band: >90 red, >80 amber, else emerald
  const utilColor = (u) => u > 90 ? 'var(--red)' : u > 80 ? 'var(--amber)' : 'var(--acc)';
  const utilDot   = (u) => u > 90 ? 'red' : u > 80 ? 'amber' : 'green';
  const utilHex   = (u) => u > 90 ? '#f43f5e' : u > 80 ? '#f59e0b' : '#10b981';

  const chMeta = (id) => {
    const c = window.getChannel ? window.getChannel(id) : null;
    if (c) return { color: c.color, icon: c.icon };
    const fb = { crm: { color: '#6366f1', icon: 'contact' }, reporting: { color: '#34d399', icon: 'bar-chart-3' } };
    return fb[id] || { color: '#565659', icon: 'tag' };
  };

  const memberAlloc = (id) => {
    const a = T().allocations.find(x => x.id === id);
    if (!a) return 0;
    return Object.values(a.byClient).reduce((s2, h) => s2 + h, 0);
  };
  const monthlyCap = (cap) => Math.round((cap ? cap.capacity : 40) * 4.33);

  // client dot + name cell
  const clientCell = (id) => `<span class="flex items-center gap-2"><span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(id)}"></span><span class="text-[12px] text-2 truncate">${clientName(id)}</span></span>`;
  // member avatar + name cell
  const memberCell = (id) => {
    const m = window.getTeam(id);
    return `<div class="flex items-center gap-2.5">
      ${UI.avatar(m ? m.name : id, memberColor(id), 22)}
      <div class="min-w-0">
        <div class="text-[12.5px] text-1 font-medium truncate">${m ? m.name : id}</div>
        <div class="text-[10px] text-3 truncate">${m ? m.role : ''}</div>
      </div></div>`;
  };

  // tiny inline 4-week sparkline (cell-spark style)
  const miniSpark = (vals, color) => {
    const w = 64, h = 18, max = Math.max(...vals, 1), min = Math.min(...vals);
    const span = (max - min) || 1;
    const pts = vals.map((v, i) => `${(i / (vals.length - 1) * w).toFixed(1)},${(h - 2 - ((v - min) / span) * (h - 4)).toFixed(1)}`).join(' ');
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/></svg>`;
  };

  // sub-nav tab strip shared across the macro
  function subNav(active) {
    const items = [
      { id: 'team',             label: 'Roster' },
      { id: 'team.workload',    label: 'Workload' },
      { id: 'team.time',        label: 'Time tracking' },
      { id: 'team.permissions', label: 'Permissions' },
    ];
    return `<div class="flex items-center gap-1 mb-5 -mt-1 flex-wrap">${items.map(it =>
      `<button class="px-2.5 py-1 rounded-md text-[12px] font-medium ${it.id === active ? 'text-1' : 'text-3 hover:text-1'}" ${it.id === active ? 'style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"' : ''} data-action="navigate" data-route="${it.id}">${it.label}</button>`
    ).join('')}</div>`;
  }

  // ---- Member drill-in drawer (reused by roster + workload) ----------------
  window.__teamDrawer = (id) => {
    const m = window.getTeam(id);
    if (!m) return;
    const t = T();
    const cap = t.capacity.find(c => c.id === id);
    const trend = t.trends[id] || [];
    const tasks = t.tasks.filter(x => x.assignee === id);
    const open = tasks.filter(x => x.status !== 'done');
    const alloc = t.allocations.find(x => x.id === id);
    const ownerClients = window.CLIENTS.filter(c => c.am === id);
    const billable = cap ? Math.round(memberAlloc(id) * 0.82) : 0;

    const allocRows = alloc ? Object.entries(alloc.byClient)
      .filter(([, h]) => h > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([cid, h]) => {
        const c = window.getClient(cid);
        const max = Math.max(...Object.values(alloc.byClient));
        return `
          <div class="flex items-center gap-3">
            <div class="w-28 flex items-center gap-2 shrink-0">
              <span class="size-2 rounded-full shrink-0" style="background:${c ? c.logoColor : '#565659'}"></span>
              <span class="text-[11.5px] text-2 truncate">${c ? c.name : cid}</span>
            </div>
            <div class="flex-1">${UI.progressBar(h, max, 'var(--acc)', 5)}</div>
            <div class="w-10 text-right text-[11.5px] num text-1">${h}h</div>
          </div>`;
      }).join('') : '';

    const taskRows = open.length ? open.sort((a, b) => a.due - b.due).map(x => {
      const c = window.getClient(x.clientId);
      const cm = chMeta(x.channel);
      const overdue = x.due < 0;
      const dueLabel = overdue ? Math.abs(x.due) + 'd overdue' : x.due === 0 ? 'Due today' : 'Due ' + shortDate(daysAhead(x.due));
      const priClr = x.priority === 'high' ? 'red' : x.priority === 'med' ? 'amber' : 'slate';
      return `
        <div class="flex items-start gap-2.5 py-2" style="border-top:1px solid var(--line-1);">
          <span class="status status-${priClr} mt-1.5 shrink-0"></span>
          <div class="flex-1 min-w-0">
            <div class="text-[12px] text-1 leading-snug">${x.title}</div>
            <div class="flex items-center gap-1.5 mt-0.5 text-[10.5px] text-3">
              <i data-lucide="${cm.icon}" class="size-2.5" style="color:${cm.color}"></i>
              <span class="size-1.5 rounded-full" style="background:${c ? c.logoColor : '#565659'}"></span>
              <span>${c ? c.name : 'Agency'}</span>
            </div>
          </div>
          <span class="text-[10px] num shrink-0 ${overdue ? 'text-red' : 'text-3'}">${dueLabel}</span>
        </div>`;
    }).join('') : `<div class="text-[11.5px] text-3 py-3">No open tasks - fully cleared.</div>`;

    const body = `
      <div class="flex items-center gap-3 mb-4">
        ${UI.avatar(m.name, m.avatarColor, 48)}
        <div class="flex-1 min-w-0">
          <div class="text-[15px] font-semibold text-1">${m.name}</div>
          <div class="text-[12px] text-2">${m.role}</div>
        </div>
        <span class="status status-${utilDot(m.utilization)} text-[11px]">${m.utilization}% util</span>
      </div>

      <div class="grid grid-cols-3 gap-2 mb-5">
        <div class="rounded-md px-3 py-2.5" style="background: var(--bg-1);">
          <div class="eyebrow mb-1">Booked / mo</div>
          <div class="text-[14px] font-semibold num text-1">${memberAlloc(id)}<span class="text-3 text-[11px]">/${monthlyCap(cap)}h</span></div>
        </div>
        <div class="rounded-md px-3 py-2.5" style="background: var(--bg-1);">
          <div class="eyebrow mb-1">Billable</div>
          <div class="text-[14px] font-semibold num text-acc-bright">${billable}h</div>
        </div>
        <div class="rounded-md px-3 py-2.5" style="background: var(--bg-1);">
          <div class="eyebrow mb-1">Open tasks</div>
          <div class="text-[14px] font-semibold num text-1">${open.length}</div>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center justify-between mb-2">
          <div class="eyebrow">Utilization trend - 8 weeks</div>
          <span class="text-[11px] num ${utilDot(trend[trend.length-1]) === 'red' ? 'text-red' : 'text-2'}">${trend[trend.length-1]}%</span>
        </div>
        <div style="color:${utilHex(trend[trend.length-1])}">${sparkSvg(trend, utilHex(trend[trend.length-1]), 360, 56)}</div>
      </div>

      ${ownerClients.length ? `
      <div class="mb-5">
        <div class="eyebrow mb-2">Owns ${ownerClients.length} account${ownerClients.length > 1 ? 's' : ''}</div>
        <div class="flex flex-wrap gap-1.5">${ownerClients.map(c => `
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10.5px] text-2" style="background: var(--bg-3);">
            <span class="size-1.5 rounded-full" style="background:${c.logoColor}"></span>${c.name}
          </span>`).join('')}</div>
      </div>` : ''}

      <div class="mb-5">
        <div class="eyebrow mb-2">Hours allocated by client - ${MONTH()}</div>
        <div class="space-y-2">${allocRows}</div>
      </div>

      <div>
        <div class="eyebrow mb-1">Open tasks (${open.length})</div>
        <div>${taskRows}</div>
      </div>`;

    UI.openDrawer(UI.drawerHTML({
      title: 'Member detail',
      body,
      actions: `${UI.btn('Message', { variant: 'secondary', icon: 'message-square', size: 'sm', onClick: `toast('Opening chat with ${m.name.split(' ')[0]}','info')` })}${UI.btn('Rebalance load', { variant: 'primary', icon: 'scale', size: 'sm', onClick: `toast('Drafting a rebalance for ${m.name.split(' ')[0]}','info')` })}`,
    }));
  };

  // ====================================================================
  // PAGES.team :: DENSE LIST - roster
  // ====================================================================
  window.PAGES.team = function () {
    const t = T();
    const s = t.stats;
    const totalAllocated = t.capacity.reduce((a, c) => a + c.allocated, 0);
    const totalCapacity = t.capacity.reduce((a, c) => a + c.capacity, 0);
    const totalOpen = t.tasks.filter(x => x.status !== 'done').length;

    const header = LX.modHead({
      title: 'Team',
      sub: window.TEAM.length + ' members across strategy, paid, content, SEO and account management - ' + MONTH() + '. Capacity is ' + s.capacityLabel.toLowerCase() + '.',
      stats: [
        { k: 'Members', v: window.TEAM.length },
        { k: 'Avg utilization', v: s.avgUtilization + '%', delta: s.utilDelta, deltaUnit: 'pt' },
        { k: 'Open tasks', v: totalOpen },
        { k: 'Capacity', v: totalAllocated + ' / ' + totalCapacity + 'h' },
        { k: 'Over 90%', v: s.overCount },
      ],
      actions: `
        ${UI.btn('This month', { variant: 'secondary', size: 'sm', icon: 'calendar-clock' }).replace('<button', `<button data-action="menu" data-menu='["This week","This month","This quarter"]'`)}
        ${UI.btn('Invite member', { variant: 'primary', size: 'sm', icon: 'user-plus' }).replace('<button', `<button data-action="confirm" data-toast="Invite link copied"`)}`,
    });

    const list = LX.dataList({
      columns: [
        { key: 'name', label: 'Member', width: '230px', render: (m) => `
          <div class="flex items-center gap-2.5">
            ${UI.avatar(m.name, m.avatarColor, 24)}
            <div class="min-w-0">
              <div class="text-[12.5px] text-1 font-medium truncate">${m.name}</div>
              <div class="text-[10px] text-3 truncate">${m.email}</div>
            </div>
          </div>` },
        { key: 'role', label: 'Role', render: (m) => `<span class="text-[12px] text-2">${m.role}</span>` },
        { key: 'clients', label: 'Clients', align: 'r', mono: true, render: (m) => {
            const owned = window.CLIENTS.filter(c => c.am === m.id);
            return `<span class="text-2" data-tooltip="${owned.map(c => c.name).join(', ') || 'Shared support'}">${owned.length || '-'}</span>`;
          } },
        { key: 'util', label: 'Utilization', width: '200px', render: (m) => {
            const cap = t.capacity.find(c => c.id === m.id);
            const booked = memberAlloc(m.id);
            const mc = monthlyCap(cap);
            const txt = m.utilization > 90 ? 'text-red' : m.utilization > 80 ? 'text-amber' : 'text-2';
            return `<div class="flex items-center gap-2.5">
              <div style="width:96px">${LX.bar(m.utilization, utilColor(m.utilization))}</div>
              <span class="num text-[11.5px] ${txt} w-9 text-right">${m.utilization}%</span>
              <span class="num text-[10.5px] text-3 w-16 text-right">${booked}/${mc}h</span>
            </div>`;
          } },
        { key: 'trend', label: '8wk', align: 'r', width: '74px', render: (m) => {
            const tr = t.trends[m.id] || [];
            return `<div class="flex justify-end" style="color:${utilHex(tr[tr.length-1])}">${sparkSvg(tr, utilHex(tr[tr.length-1]), 64, 18)}</div>`;
          } },
        { key: 'open', label: 'Open tasks', align: 'r', mono: true, render: (m) => {
            const open = t.tasks.filter(x => x.assignee === m.id && x.status !== 'done').length;
            const overdue = t.tasks.filter(x => x.assignee === m.id && x.status !== 'done' && x.due < 0).length;
            return `<span class="text-1">${open}</span>${overdue ? ` <span class="text-red text-[10.5px]">${overdue} late</span>` : ''}`;
          } },
        { key: 'status', label: 'Status', align: 'r', render: (m) => {
            const lbl = m.utilization > 90 ? 'Over capacity' : m.utilization > 80 ? 'Stretched' : 'Healthy';
            return `<span class="status status-${utilDot(m.utilization)}">${lbl}</span>`;
          } },
      ],
      rows: window.TEAM,
      rowAttrs: (m) => {
        const open = t.tasks.filter(x => x.assignee === m.id && x.status !== 'done').length;
        const owned = window.CLIENTS.filter(c => c.am === m.id).map(c => c.name).join(', ') || 'Shared support';
        return `class="cursor-pointer" onclick="window.__teamDrawer('${m.id}')" data-title="${esc(m.name)}"`;
      },
    });

    return `${header}${subNav('team')}
      <div class="flex items-center justify-between mb-2.5 px-0.5">
        <span class="text-[11px] text-3">Workload color-coded - amber over 80%, red over 90%. Click a row for detail.</span>
        ${UI.searchInput('Search members', 'w-64')}
      </div>
      ${list}`;
  };

  // ====================================================================
  // PAGES['team.workload'] :: BOARD (full-bleed) - task kanban + capacity strip
  // ====================================================================
  window.PAGES['team.workload'] = function () {
    const t = T();
    const priMeta = { high: 'red', med: 'amber', low: 'slate' };

    const taskCard = (x) => {
      const c = window.getClient(x.clientId);
      const m = window.getTeam(x.assignee);
      const cm = chMeta(x.channel);
      const overdue = x.due < 0;
      const dueLabel = x.status === 'done'
        ? 'Done ' + shortDate(daysAgo(Math.abs(x.due)))
        : overdue ? Math.abs(x.due) + 'd overdue'
        : x.due === 0 ? 'Due today' : 'Due ' + shortDate(daysAhead(x.due));
      return `
        <div class="kanban-card cursor-pointer" onclick="window.__teamDrawer('${x.assignee}')">
          <div class="flex items-start gap-2 mb-2">
            <span class="status status-${priMeta[x.priority]} mt-1.5 shrink-0"></span>
            <div class="text-[12px] font-medium text-1 leading-snug flex-1">${x.title}</div>
          </div>
          <div class="flex items-center gap-1.5 mb-2 text-[10.5px] text-3">
            <i data-lucide="${cm.icon}" class="size-2.5" style="color:${cm.color}"></i>
            <span class="size-1.5 rounded-full" style="background:${c ? c.logoColor : '#565659'}"></span>
            <span class="truncate">${c ? c.name : 'Agency'}</span>
            <span class="text-4">/</span>
            <span class="num text-4">${x.id}</span>
          </div>
          <div class="flex items-center justify-between pt-2" style="border-top: 1px solid var(--line-1);">
            <div class="flex items-center gap-1.5">
              ${UI.avatar(m ? m.name : 'Unassigned', m ? m.avatarColor : '#565659', 18)}
              <span class="text-[10.5px] text-3">${m ? m.name.split(' ')[0] : 'Unassigned'}</span>
            </div>
            <span class="text-[10px] num ${overdue && x.status !== 'done' ? 'text-red' : 'text-3'}">${dueLabel}</span>
          </div>
        </div>`;
    };

    const board = UI.kanban({
      columns: [
        { label: 'To do',       statusDot: 'slate', cards: t.tasks.filter(x => x.status === 'todo') },
        { label: 'In progress', statusDot: 'amber', cards: t.tasks.filter(x => x.status === 'in_progress') },
        { label: 'Done',        statusDot: 'green', cards: t.tasks.filter(x => x.status === 'done') },
      ],
      renderCard: taskCard,
    });

    // per-member capacity strip
    const capCells = window.TEAM.map(m => {
      const open = t.tasks.filter(x => x.assignee === m.id && x.status !== 'done').length;
      const txt = m.utilization > 90 ? 'text-red' : m.utilization > 80 ? 'text-amber' : 'text-2';
      return `<div class="px-3.5 py-2.5 shrink-0" style="width:172px;border-right:1px solid var(--line-1)">
        <div class="flex items-center gap-2 mb-2">
          ${UI.avatar(m.name, m.avatarColor, 20)}
          <div class="min-w-0">
            <div class="text-[11.5px] text-1 font-medium truncate">${m.name.split(' ')[0]} ${m.name.split(' ')[1] ? m.name.split(' ')[1][0] + '.' : ''}</div>
            <div class="text-[9.5px] text-3 truncate">${m.role}</div>
          </div>
        </div>
        <div class="mb-1.5">${LX.bar(m.utilization, utilColor(m.utilization))}</div>
        <div class="flex items-center justify-between text-[10px]">
          <span class="num ${txt}">${m.utilization}%</span>
          <span class="num text-3">${open} open</span>
        </div>
      </div>`;
    }).join('');

    const header = `<div class="px-7 pt-7 pb-0">
      ${LX.modHead({
        title: 'Workload',
        sub: t.tasks.length + ' tasks this cycle across ' + window.TEAM.length + ' members and ' + window.CLIENTS.length + ' clients - drag-ready board, capacity at a glance.',
        stats: [
          { k: 'To do', v: t.tasks.filter(x => x.status === 'todo').length },
          { k: 'In progress', v: t.tasks.filter(x => x.status === 'in_progress').length },
          { k: 'Done this cycle', v: t.tasks.filter(x => x.status === 'done').length },
          { k: 'Overdue', v: t.tasks.filter(x => x.status !== 'done' && x.due < 0).length },
        ],
        actions: `${UI.btn('Filter', { variant: 'secondary', size: 'sm', icon: 'sliders-horizontal' }).replace('<button', `<button data-action="menu" data-menu='["All members","Assignee","Client","Priority"]'`)}
          ${UI.btn('New task', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New task"`)}`,
      })}
      ${subNav('team.workload')}
      <div class="flex items-stretch overflow-x-auto rounded-lg mb-1" style="background:var(--bg-1);box-shadow:inset 0 0 0 1px var(--line-1)">
        <div class="px-3.5 py-2.5 shrink-0 flex items-center" style="width:130px;border-right:1px solid var(--line-1)">
          <span class="eyebrow">Capacity now</span>
        </div>
        ${capCells}
      </div></div>`;

    return `<div class="flex flex-col" style="height:calc(100vh - 44px)">
      ${header}
      <div class="flex-1 overflow-auto px-7 pb-7" style="margin-top:10px">${board}</div>
    </div>`;
  };

  // ====================================================================
  // PAGES['team.time'] :: DENSE LIST - time entries (member x client)
  // ====================================================================
  window.PAGES['team.time'] = function () {
    const t = T();
    const entries = t.timeEntries.slice().sort((a, b) => b.hours - a.hours);
    const totalHours = entries.reduce((s, e) => s + e.hours, 0);
    const totalBill = entries.reduce((s, e) => s + e.billable, 0);
    const billPct = Math.round(totalBill / totalHours * 100);
    const revenue = Math.round(totalBill * 110); // blended ~$110/h

    const header = LX.modHead({
      title: 'Time tracking',
      sub: entries.length + ' logged time entries across ' + window.TEAM.length + ' members and ' + window.CLIENTS.length + ' clients - ' + MONTH() + ', month to date.',
      stats: [
        { k: 'Tracked', v: totalHours + 'h' },
        { k: 'Billable', v: totalBill + 'h' },
        { k: 'Billable rate', v: billPct + '%' },
        { k: 'Billed value', v: formatMoney(revenue) },
        { k: 'Entries', v: entries.length },
      ],
      actions: `${UI.btn('Export CSV', { variant: 'secondary', size: 'sm', icon: 'download' })}
        ${UI.btn('Log time', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="Log time"`)}`,
    });

    const list = LX.dataList({
      columns: [
        { key: 'member', label: 'Member', width: '210px', render: (e) => memberCell(e.member) },
        { key: 'client', label: 'Client', render: (e) => clientCell(e.client) },
        { key: 'role', label: 'Work', render: (e) => `<span class="text-[11.5px] text-3">${e.role}</span>` },
        { key: 'hours', label: 'Hours', align: 'r', mono: true, render: (e) => `<span class="text-1 font-medium">${e.hours}h</span>` },
        { key: 'billable', label: 'Billable', align: 'r', mono: true, render: (e) => `<span class="text-acc-bright">${e.billable}h</span>` },
        { key: 'billPct', label: 'Billable %', width: '150px', render: (e) => {
            const pct = Math.round(e.billable / e.hours * 100);
            const col = pct >= 85 ? 'var(--acc)' : pct >= 70 ? 'var(--amber)' : 'var(--red)';
            const txt = pct >= 85 ? 'text-2' : pct >= 70 ? 'text-amber' : 'text-red';
            return `<div class="flex items-center gap-2">
              <div class="flex-1" style="max-width:80px">${LX.bar(pct, col)}</div>
              <span class="num text-[11px] ${txt} w-8 text-right">${pct}%</span></div>`;
          } },
        { key: 'week', label: 'Week trend', align: 'r', width: '88px', render: (e) => {
            const up = e.week[e.week.length - 1] >= e.week[0];
            return `<div class="flex justify-end">${miniSpark(e.week, up ? '#10b981' : '#f59e0b')}</div>`;
          } },
      ],
      rows: entries,
      rowAttrs: (e) => `data-action="detail" data-title="${esc(memberName(e.member))} - ${esc(clientName(e.client))}" data-sub="${esc(e.role)} - ${MONTH()}" data-kv='[["Member","${esc(memberName(e.member))}"],["Client","${esc(clientName(e.client))}"],["Work","${esc(e.role)}"],["Tracked","${e.hours}h"],["Billable","${e.billable}h"],["Billable %","${Math.round(e.billable / e.hours * 100)}%"]]'`,
    });

    // per-member roll-up footer strip
    const byMember = window.TEAM.map(m => {
      const rows = entries.filter(e => e.member === m.id);
      const h = rows.reduce((s, e) => s + e.hours, 0);
      const b = rows.reduce((s, e) => s + e.billable, 0);
      return { m, h, b, pct: h ? Math.round(b / h * 100) : 0 };
    }).sort((a, b) => b.h - a.h);
    const rollMax = Math.max(...byMember.map(x => x.h), 1);
    const rollup = LX.panel({
      title: 'By member',
      actions: `<span class="text-[10.5px] text-3 num">${totalHours}h tracked, ${billPct}% billable</span>`,
      bare: true,
      body: byMember.map(x => `
        <div class="flex items-center gap-3 px-3.5 py-2.5 cursor-pointer surface-hover" style="border-top:1px solid var(--line-1)" onclick="window.__teamDrawer('${x.m.id}')">
          <div class="w-[150px] shrink-0 flex items-center gap-2">
            ${UI.avatar(x.m.name, x.m.avatarColor, 20)}
            <span class="text-[12px] text-1 truncate">${x.m.name}</span>
          </div>
          <div class="flex-1">${LX.bar(x.h / rollMax * 100, x.pct >= 85 ? 'var(--acc)' : x.pct >= 70 ? 'var(--amber)' : 'var(--red)')}</div>
          <div class="w-12 text-right num text-[12px] text-1">${x.h}h</div>
          <div class="w-14 text-right num text-[11px] text-acc-bright">${x.b}h bill</div>
          <div class="w-10 text-right num text-[11px] text-3">${x.pct}%</div>
        </div>`).join(''),
    });

    return `${header}${subNav('team.time')}
      <div class="grid grid-cols-12 gap-3.5">
        <div class="col-span-12 lg:col-span-8">${list}</div>
        <div class="col-span-12 lg:col-span-4">${rollup}</div>
      </div>`;
  };

  // ====================================================================
  // PAGES['team.permissions'] :: MATRIX - roles x capabilities
  // ====================================================================
  window.PAGES['team.permissions'] = function () {
    const t = T();
    const P = t.permissions;

    const memberCount = (roleId) => {
      // map team roles roughly onto permission roles for a member tally
      const map = {
        owner: ['Owner'],
        strategist: ['Head of Strategy'],
        channel: ['Paid Media Lead', 'SEO Lead', 'Account Manager'],
        creator: ['Content & Social'],
        client: [],
      };
      return window.TEAM.filter(m => (map[roleId] || []).includes(m.role)).length;
    };

    const cell = (v) => {
      if (v === true) return `<span class="inline-flex items-center justify-center size-6 rounded-md" style="background:rgba(16,185,129,0.12)"><i data-lucide="check" class="size-3.5 text-acc-bright"></i></span>`;
      if (v === 'limited') return `<span class="inline-flex items-center justify-center px-1.5 h-6 rounded-md text-[10px] text-amber" style="background:rgba(245,158,11,0.10)">Limited</span>`;
      return `<span class="text-4">&ndash;</span>`;
    };

    const header = LX.modHead({
      title: 'Permissions',
      sub: P.roles.length + ' roles x ' + P.capabilities.length + ' capabilities - who can approve AI actions, edit campaigns, send reports, and manage billing.',
      stats: [
        { k: 'Roles', v: P.roles.length },
        { k: 'Capabilities', v: P.capabilities.length },
        { k: 'Can approve', v: P.roles.filter(r => r.grants.approve === true).length + ' full' },
        { k: 'Billing access', v: P.roles.filter(r => r.grants.billing === true).length },
      ],
      actions: `${UI.btn('Audit log', { variant: 'secondary', size: 'sm', icon: 'history' })}
        ${UI.btn('New role', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New role"`)}`,
    });

    const matrix = `<div class="dlist-wrap">
      <table class="dlist">
        <thead>
          <tr>
            <th style="width:240px">Role</th>
            ${P.capabilities.map(c => `<th class="text-center">${c.label}</th>`).join('')}
            <th class="r" style="width:88px">Members</th>
          </tr>
        </thead>
        <tbody>
          ${P.roles.map(r => `
            <tr class="cursor-pointer" data-action="detail" data-title="${esc(r.label)} role" data-sub="Capability grants"
                data-kv='${JSON.stringify(P.capabilities.map(c => [c.label, r.grants[c.id] === true ? 'Full' : r.grants[c.id] === 'limited' ? 'Limited' : 'None']))}'>
              <td>
                <div class="flex items-center gap-2.5">
                  <span class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)">
                    <i data-lucide="${r.id === 'owner' ? 'crown' : r.id === 'strategist' ? 'compass' : r.id === 'channel' ? 'megaphone' : r.id === 'creator' ? 'pen-tool' : 'user'}" class="size-3 text-2"></i>
                  </span>
                  <div>
                    <div class="text-[12.5px] text-1 font-medium">${r.label}</div>
                    <div class="text-[10px] text-3">${r.grants.approve === true ? 'Approves actions' : r.grants.approve === 'limited' ? 'Approves on own accounts' : 'View / contribute only'}</div>
                  </div>
                </div>
              </td>
              ${P.capabilities.map(c => `<td class="text-center">${cell(r.grants[c.id])}</td>`).join('')}
              <td class="r"><span class="num text-2">${memberCount(r.id) || '-'}</span></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;

    const legend = `<div class="flex items-center gap-5 mt-4 text-[10.5px] text-3 px-0.5">
      <span class="inline-flex items-center gap-1.5"><i data-lucide="check" class="size-3 text-acc-bright"></i> Full access</span>
      <span class="inline-flex items-center gap-1.5"><span class="text-amber">Limited</span> scoped to assigned accounts</span>
      <span class="inline-flex items-center gap-1.5"><span class="text-4">&ndash;</span> no access</span>
    </div>`;

    // notes panel - the AI-approval gate explained, kept tasteful
    const notes = LX.panel({
      title: 'Approval gate',
      body: `<div class="space-y-3">
        <p class="text-[12px] text-2 leading-relaxed">AI agents propose changes across every channel. <span class="text-1 font-medium">Approve AI actions</span> controls who can release a proposed change to the live platform. Owners and strategists clear anything; channel leads approve only on accounts they own; creators and clients never auto-release.</p>
        <div class="flex items-center gap-2 pt-1">
          <button class="btn btn-secondary btn-sm" data-action="navigate" data-route="approvals"><span>Open approvals queue</span><i data-lucide="arrow-up-right" class="size-3"></i></button>
        </div>
      </div>`,
    });

    return `${header}${subNav('team.permissions')}
      <div class="grid grid-cols-12 gap-3.5">
        <div class="col-span-12 lg:col-span-8">
          ${matrix}
          ${legend}
        </div>
        <div class="col-span-12 lg:col-span-4">${notes}</div>
      </div>`;
  };

})();
