/* ============================================================
   Social Media macro - hub + dense micro sub-modules.
   Each sub-module is ONE archetype, structurally distinct:
     social            :: CONSOLE      (stat rail + panel wall)
     social.calendar   :: CALENDAR GRID (full-bleed month grid)
     social.composer   :: WORKSPACE    (drafts | composer | phone)
     social.inbox      :: SPLIT INBOX  (conversations | thread)
     social.listening  :: DENSE LIST   (mentions + sentiment panel)
     social.analytics  :: CONSOLE      (top posts list + 2 charts)
   No KPI-card band. LX archetypes + scoped dense styles only.
   ============================================================ */

window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};
window.FULLBLEED = window.FULLBLEED || new Set();
window.FULLBLEED.add('social.calendar');
window.FULLBLEED.add('social.composer');
window.FULLBLEED.add('social.inbox');
window.FULLBLEED.add('social.listening');

/* ---- shared module helpers (scoped, not globals) ---- */
window.SOCIAL_H = (function () {
  const esc = LX.esc;
  const NET = () => window.SOCIAL.networks;
  const netMeta = (id) => NET()[id] || { label: id, icon: 'globe', color: 'var(--text-3)' };
  const clientColor = (id) => (window.getClient(id) || {}).logoColor || '#10b981';
  const clientName = (id) => (window.getClient(id) || {}).name || id;
  const netIcon = (id, size = '3.5') => {
    const n = netMeta(id);
    return `<i data-lucide="${n.icon}" class="size-${size}" style="color:${n.color}"></i>`;
  };
  const cdot = (id, px = 6) => `<span class="inline-block rounded-full shrink-0" style="width:${px}px;height:${px}px;background:${clientColor(id)}"></span>`;
  const sentColor = (s) => s === 'positive' ? 'var(--acc)' : s === 'negative' ? 'var(--red)' : 'var(--amber)';
  const sentDot = (s) => `<span class="inline-block rounded-full shrink-0" style="width:7px;height:7px;background:${sentColor(s)}"></span>`;
  const fmtK = (n) => n >= 1000 ? (n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, '') + 'k' : String(n);
  // shared dense styles, injected once per render (idempotent enough for a sketch)
  const styles = `
    <style>
      .so-shell { height: calc(100vh - 44px); display: flex; flex-direction: column; }
      .so-head { padding: 14px 22px; border-bottom: 1px solid var(--line-1); flex-shrink: 0; }
      .so-head .mod-head { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
      .so-toolbar { display: flex; align-items: center; gap: 8px; padding: 9px 22px; border-bottom: 1px solid var(--line-1); flex-shrink: 0; flex-wrap: wrap; }
      .so-netbtn { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 9px; border-radius: 6px; font-size: 11.5px; color: var(--text-2); background: var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1); cursor: pointer; }
      .so-netbtn:hover { color: var(--text-1); }
      .so-netbtn.active { color: var(--text-1); box-shadow: inset 0 0 0 1px var(--acc-line); }
      /* calendar grid */
      .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); border-left: 1px solid var(--line-1); border-top: 1px solid var(--line-1); }
      .cal-dow { font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-3); padding: 7px 10px; border-right: 1px solid var(--line-1); border-bottom: 1px solid var(--line-1); background: var(--bg-1); position: sticky; top: 0; z-index: 2; }
      .cal-cell { min-height: 138px; padding: 6px 7px; border-right: 1px solid var(--line-1); border-bottom: 1px solid var(--line-1); display: flex; flex-direction: column; gap: 4px; }
      .cal-cell.muted { background: rgba(255,255,255,0.012); }
      .cal-cell.today { box-shadow: inset 0 2px 0 var(--acc); }
      .cal-daynum { font-size: 11px; font-weight: 600; color: var(--text-2); display: flex; align-items: center; justify-content: space-between; }
      .cal-daynum .today-pill { background: var(--acc); color: #04130d; border-radius: 5px; padding: 0 6px; line-height: 17px; height: 17px; }
      .cal-chip { display: flex; align-items: center; gap: 6px; padding: 4px 6px; border-radius: 6px; background: var(--bg-3); cursor: pointer; transition: background 80ms; }
      .cal-chip:hover { background: var(--bg-4); }
      .cal-chip .cap { font-size: 10.5px; color: var(--text-2); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; min-width: 0; }
      .cal-chip .tm { font-size: 9.5px; color: var(--text-3); flex-shrink: 0; }
      /* composer */
      .cmp-rail-row { padding: 10px 13px; border-bottom: 1px solid var(--line-1); cursor: pointer; transition: background 80ms; }
      .cmp-rail-row:hover { background: rgba(255,255,255,0.022); }
      .cmp-rail-row.active { background: var(--bg-2); box-shadow: inset 2px 0 0 var(--acc); }
      .cmp-area { min-height: 150px; line-height: 1.6; white-space: pre-wrap; }
      /* inbox */
      .ib-row { padding: 11px 14px; border-bottom: 1px solid var(--line-1); cursor: pointer; transition: background 80ms; }
      .ib-row:hover { background: rgba(255,255,255,0.022); }
      .ib-row.active { background: var(--bg-2); box-shadow: inset 2px 0 0 var(--acc); }
      .ib-thread { padding: 20px 26px; display: flex; flex-direction: column; gap: 12px; }
      /* listening */
      .lst-row td { vertical-align: top; }
    </style>`;
  return { esc, netMeta, netIcon, cdot, sentColor, sentDot, clientColor, clientName, fmtK, styles };
})();


/* ====================================================================
   1. OVERVIEW  ::  CONSOLE
   ==================================================================== */
window.PAGES.social = function () {
  const S = window.SOCIAL;
  const H = window.SOCIAL_H;
  const k = S.kpis;

  const header = LX.modHead({
    title: 'Social Media',
    sub: 'Plan, draft, schedule, and publish across six networks for the whole book. Every post is reviewed before it goes live.',
    stats: [
      { k: 'Reach MTD',       v: H.fmtK(k.reachMtd.value),                 delta: k.reachMtd.delta },
      { k: 'Engagement rate', v: k.engagementRate.value.toFixed(1) + '%',  delta: k.engagementRate.delta, deltaUnit: 'pt' },
      { k: 'Scheduled wk',    v: k.scheduledWeek.value,                    delta: k.scheduledWeek.delta, deltaUnit: '' },
      { k: 'Follower growth', v: '+' + H.fmtK(k.followerGrowth.value),     delta: k.followerGrowth.delta },
      { k: 'Inbox unread',    v: k.inboxUnread.value,                      delta: k.inboxUnread.delta, deltaUnit: '' },
    ],
    actions: `
      ${UI.btn('Calendar', { variant: 'secondary', size: 'sm', icon: 'calendar-days', onClick: "navigate('social.calendar')" })}
      ${UI.btn('Compose', { variant: 'primary', size: 'sm', icon: 'pen-line', onClick: "navigate('social.composer')" })}`,
  });

  // Panel A - network performance (dense list with sparkline + bars)
  const perfMax = Math.max(...S.networkPerf.map(n => n.reachMtd));
  const perfList = LX.dataList({
    cls: 'tight',
    columns: [
      { key: 'net', label: 'Network', render: (r) => `<div class="flex items-center gap-2">${H.netIcon(r.id, '3.5')}<span class="text-[12px] text-1">${H.netMeta(r.id).label}</span></div>` },
      { key: 'fol', label: 'Followers', align: 'r', mono: true, render: (r) => r.followersK > 0 ? `<span class="text-1">${r.followersK}k</span>` : `<span class="text-3">-</span>` },
      { key: 'reach', label: 'Reach MTD', align: 'r', width: '160px', render: (r) => `
        <div class="flex items-center gap-2 justify-end">
          <span class="text-1 num text-[12px]">${H.fmtK(r.reachMtd)}</span>
          <span style="width:64px">${LX.bar(r.reachMtd / perfMax * 100, 'var(--acc)')}</span>
        </div>` },
      { key: 'eng', label: 'Eng', align: 'r', mono: true, render: (r) => `<span class="${r.eng >= 6 ? 'text-acc' : 'text-1'}">${r.eng.toFixed(1)}%</span>` },
      { key: 'net2', label: 'Net new', align: 'r', mono: true, render: (r) => `<span class="text-acc">+${r.netNew.toLocaleString()}</span>` },
      { key: 'trend', label: 'Trend', align: 'r', width: '90px', render: (r) => `<span class="cell-spark">${sparkSvg(r.spark, 'var(--acc)', 78, 22)}</span>` },
    ],
    rows: S.networkPerf,
    rowAttrs: (r) => `data-action="detail" data-title="${H.netMeta(r.id).label}" data-sub="${r.posts} posts MTD" data-kv='[["Followers","${r.followersK > 0 ? r.followersK + "k" : "-"}"],["Reach MTD","${r.reachMtd.toLocaleString()}"],["Engagement","${r.eng.toFixed(1)}%"],["Net new","+${r.netNew.toLocaleString()}"]]'`,
  });
  const perfPanel = LX.panel({
    title: 'Network performance',
    actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="social.analytics">Analytics &rarr;</button>`,
    bare: true,
    body: perfList,
  });

  // Panel B - upcoming posts mini-list
  const upcoming = [];
  S.calendar.forEach(d => d.posts.forEach(p => { if (p.status !== 'published') upcoming.push({ ...p, date: d.date, label: d.label }); }));
  upcoming.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : (a.time < b.time ? -1 : 1));
  const upcomingRows = upcoming.slice(0, 8).map(p => `
    <div class="px-3.5 py-2.5 flex items-center gap-2.5" style="border-top:1px solid var(--line-1)"
         data-action="detail" data-title="${H.esc(p.client)}" data-sub="${H.netMeta(p.network).label} . ${p.label} ${p.time}"
         data-kv='[["Network","${H.netMeta(p.network).label}"],["Slot","${p.label} ${p.time}"],["Status","${p.status === 'scheduled' ? 'Scheduled' : 'Draft'}"]]'>
      <span class="w-8 shrink-0 text-center">
        <div class="text-[10px] text-3">${p.label}</div>
        <div class="num text-[11px] text-1 font-medium">${p.time.slice(0, 2)}</div>
      </span>
      ${H.netIcon(p.network, '3.5')}
      ${H.cdot(p.clientId, 6)}
      <div class="flex-1 min-w-0">
        <div class="text-[12px] text-1 leading-tight truncate">${p.caption}</div>
        <div class="text-[10px] text-3">${p.client}</div>
      </div>
      <span class="status status-${p.status === 'scheduled' ? 'amber' : 'slate'} text-[10px] shrink-0">${p.status === 'scheduled' ? 'Scheduled' : 'Draft'}</span>
    </div>`).join('');
  const upcomingPanel = LX.panel({
    title: 'Upcoming posts',
    actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="social.calendar">Calendar &rarr;</button>`,
    bare: true,
    body: upcomingRows,
  });

  // Panel C - recent activity feed
  const actIcon = { published: 'send', approved: 'check', reply: 'corner-down-right', scheduled: 'calendar-clock', flag: 'flag', draft: 'pencil' };
  const actColor = { published: 'var(--acc)', approved: 'var(--acc)', reply: 'var(--sky)', scheduled: 'var(--amber)', flag: 'var(--red)', draft: 'var(--text-3)' };
  const activityRows = S.activity.map(a => `
    <div class="px-3.5 py-2.5 flex items-start gap-2.5" style="border-top:1px solid var(--line-1)">
      <i data-lucide="${actIcon[a.kind] || 'dot'}" class="size-3.5 mt-0.5 shrink-0" style="color:${actColor[a.kind] || 'var(--text-3)'}"></i>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5">
          <span class="text-[11.5px] font-medium text-1">${a.client}</span>
          <span class="text-[10px] text-3 flex items-center gap-1">${H.netIcon(a.network, '3')}${H.netMeta(a.network).label}</span>
          <span class="text-[10px] text-4 num ml-auto">${a.ago}</span>
        </div>
        <div class="text-[11px] text-2 leading-snug mt-0.5">${a.text}</div>
      </div>
    </div>`).join('');
  const activityPanel = LX.panel({ title: 'Recent activity', actions: `<span class="status status-acc text-[10.5px]">live</span>`, bare: true, body: activityRows });

  // Panel D - top posts (dense)
  const topRows = S.topPosts.slice(0, 8).map(p => `
    <div class="px-3.5 py-2.5 flex items-center gap-2.5" style="border-top:1px solid var(--line-1)"
         data-action="detail" data-title="${H.esc(p.caption)}" data-sub="${p.client} . ${H.netMeta(p.network).label}"
         data-kv='[["Client","${p.client}"],["Network","${H.netMeta(p.network).label}"],["Reach","${p.reach.toLocaleString()}"],["Engagement","${p.eng.toFixed(1)}%"]]'>
      ${H.netIcon(p.network, '3.5')}
      ${H.cdot(p.clientId, 6)}
      <span class="text-[12px] text-1 leading-tight truncate flex-1 min-w-0">${p.caption}</span>
      <span class="num text-[11.5px] text-2 w-14 text-right shrink-0">${H.fmtK(p.reach)}</span>
      <span class="num text-[11.5px] w-12 text-right shrink-0 ${p.eng >= 6 ? 'text-acc' : 'text-3'}">${p.eng.toFixed(1)}%</span>
    </div>`).join('');
  const topPanel = LX.panel({
    title: 'Top posts',
    actions: `<span class="text-[10.5px] text-3">Last 7 days . by reach</span>`,
    bare: true,
    body: `
      <div class="flex items-center gap-2.5 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
        <span style="width:14px"></span><span style="width:6px"></span><div class="flex-1">Post</div>
        <span class="w-14 text-right">Reach</span><span class="w-12 text-right">Eng</span>
      </div>
      ${topRows}`,
  });

  return `
    ${header}
    <div class="grid grid-cols-12 gap-3.5">
      <div class="col-span-12 lg:col-span-7 flex flex-col gap-3.5">
        ${perfPanel}
        ${topPanel}
      </div>
      <div class="col-span-12 lg:col-span-5 flex flex-col gap-3.5">
        ${upcomingPanel}
        ${activityPanel}
      </div>
    </div>`;
};


/* ====================================================================
   2. CALENDAR  ::  CALENDAR GRID  (full-bleed)
   ==================================================================== */
window.PAGES['social.calendar'] = function () {
  const S = window.SOCIAL;
  const H = window.SOCIAL_H;

  // Build a 4-week grid (Mon-start) covering the dated calendar entries.
  const byDate = {};
  S.calendar.forEach(d => { byDate[d.date] = d; });
  const dates = Object.keys(byDate).sort();
  // Anchor the grid: 2 weeks back from today through 2 weeks ahead, Mon-aligned.
  function isoToDate(s) { const [y, m, dd] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, dd)); }
  function dateToIso(d) { return d.toISOString().slice(0, 10); }
  const todayIso = window.TODAY;
  const today = isoToDate(todayIso);
  // start = Monday of the week 2 weeks before today
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 14);
  const dow = (start.getUTCDay() + 6) % 7; // 0 = Monday
  start.setUTCDate(start.getUTCDate() - dow);

  const weeks = 4;
  const cells = [];
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start);
    d.setUTCDate(d.getUTCDate() + i);
    const iso = dateToIso(d);
    const entry = byDate[iso];
    cells.push({ iso, day: d.getUTCDate(), inMonth: d.getUTCMonth() === today.getUTCMonth(), isToday: iso === todayIso, entry });
  }

  const statusBar = { published: 'var(--acc-line)', scheduled: 'var(--amber)', draft: 'var(--line-2)' };
  const renderCell = (c) => {
    const chips = (c.entry ? c.entry.posts : []).map(p => `
      <div class="cal-chip" style="box-shadow: inset 2px 0 0 ${statusBar[p.status] || 'var(--line-2)'}"
           data-action="detail" data-title="${H.esc(p.client)}" data-sub="${H.netMeta(p.network).label} . ${p.time}"
           data-kv='[["Network","${H.netMeta(p.network).label}"],["Time","${p.time}"],["Status","${p.status.charAt(0).toUpperCase() + p.status.slice(1)}"]]'>
        ${H.netIcon(p.network, '3')}
        ${H.cdot(p.clientId, 6)}
        <span class="cap">${p.caption}</span>
        <span class="tm num">${p.time}</span>
      </div>`).join('');
    return `
      <div class="cal-cell ${c.inMonth ? '' : 'muted'} ${c.isToday ? 'today' : ''}">
        <div class="cal-daynum">
          <span class="${c.inMonth ? '' : 'text-4'}">${c.isToday ? `<span class="today-pill num">${c.day}</span>` : `<span class="num">${c.day}</span>`}</span>
          ${c.entry && c.entry.posts.length ? `<span class="num text-[9.5px] text-4">${c.entry.posts.length}</span>` : ''}
        </div>
        ${chips}
      </div>`;
  };

  const dows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const grid = `
    <div class="cal-grid">
      ${dows.map(d => `<div class="cal-dow">${d}</div>`).join('')}
      ${cells.map(renderCell).join('')}
    </div>`;

  const allNets = ['instagram', 'facebook', 'linkedin', 'tiktok', 'youtube', 'gbp'];
  const setActive = "(function(b){b.closest('[data-netfilter]').querySelectorAll('.so-netbtn').forEach(function(x){x.classList.remove('active')});b.classList.add('active')})(this)";
  const filterRow = `
    <div class="so-toolbar" data-netfilter>
      <span class="eyebrow mr-1">Networks</span>
      <button class="so-netbtn active" onclick="${setActive};toast('Showing all networks','info')"><i data-lucide="layers" class="size-3"></i>All</button>
      ${allNets.map(n => `<button class="so-netbtn" onclick="${setActive};toast('Filtered to ${H.netMeta(n).label}','info')">${H.netIcon(n, '3')}${H.netMeta(n).label}</button>`).join('')}
      <div class="grow" style="flex:1"></div>
      <span class="flex items-center gap-1.5 text-[10.5px] text-3"><span class="inline-block size-2 rounded-sm" style="background:var(--acc)"></span>Published</span>
      <span class="flex items-center gap-1.5 text-[10.5px] text-3"><span class="inline-block size-2 rounded-sm" style="background:var(--amber)"></span>Scheduled</span>
      <span class="flex items-center gap-1.5 text-[10.5px] text-3"><span class="inline-block size-2 rounded-sm" style="background:var(--text-3)"></span>Draft</span>
    </div>`;

  const header = `
    <div class="so-head">
      ${LX.modHead({
        title: 'Content calendar',
        sub: 'Four weeks across every client and network. Click a post to inspect or edit.',
        stats: [
          { k: 'Scheduled', v: S.kpis.scheduledWeek.value, delta: S.kpis.scheduledWeek.delta, deltaUnit: '' },
          { k: 'Drafted ' + S.monthAhead.month, v: S.monthAhead.drafted, deltaUnit: '' },
          { k: 'Networks', v: S.monthAhead.networks, deltaUnit: '' },
        ],
        actions: `
          ${UI.btn('Today', { variant: 'ghost', size: 'sm', icon: 'calendar-check' })}
          ${UI.btn('New post', { variant: 'primary', size: 'sm', icon: 'pen-line', onClick: "navigate('social.composer')" })}`,
      })}
    </div>`;

  return `
    ${H.styles}
    <div class="so-shell">
      ${header}
      ${filterRow}
      <div style="flex:1; overflow:auto; padding: 0 22px 22px;">
        ${grid}
      </div>
    </div>`;
};


/* ====================================================================
   3. COMPOSER  ::  WORKSPACE  (drafts | editor | phone preview)
   ==================================================================== */
window.PAGES['social.composer'] = function () {
  const S = window.SOCIAL;
  const H = window.SOCIAL_H;
  const c = S.composer;
  const cName = H.clientName(c.clientId);
  const cColor = H.clientColor(c.clientId);

  const statusMeta = {
    editing:   { label: 'Editing',   dot: 'sky' },
    review:    { label: 'In review', dot: 'amber' },
    scheduled: { label: 'Scheduled', dot: 'amber' },
    draft:     { label: 'Draft',     dot: 'slate' },
  };

  // --- RAIL: drafts + scheduled list ---
  const railRow = (d, first) => {
    const sm = statusMeta[d.status] || statusMeta.draft;
    return `
      <div class="cmp-rail-row ${d.open || first ? 'active' : ''}">
        <div class="flex items-center gap-2 mb-1">
          ${H.netIcon(d.network, '3.5')}
          ${H.cdot(d.clientId, 6)}
          <span class="text-[11.5px] font-medium text-1 truncate">${d.client}</span>
          <span class="status status-${sm.dot} text-[9.5px] ml-auto shrink-0">${sm.label}</span>
        </div>
        <div class="text-[11px] text-2 leading-snug" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${d.caption}</div>
        <div class="text-[10px] text-3 num mt-1 flex items-center gap-1"><i data-lucide="clock" class="size-3"></i>${d.time}</div>
      </div>`;
  };
  const counts = { editing: 0, review: 0, scheduled: 0, draft: 0 };
  S.drafts.forEach(d => { counts[d.status] = (counts[d.status] || 0) + 1; });
  const rail = `
    <div style="padding:11px 13px; border-bottom:1px solid var(--line-1); position:sticky; top:0; background:var(--bg-1); z-index:2;">
      ${LX.segmented([{ id: 'all', label: 'All ' + S.drafts.length }, { id: 'review', label: 'Review ' + (counts.review || 0) }, { id: 'sched', label: 'Scheduled ' + (counts.scheduled || 0) }], 'all')}
    </div>
    ${S.drafts.map((d, i) => railRow(d, i === 0)).join('')}`;

  // --- MAIN: composer ---
  const networkToggles = ['instagram', 'facebook', 'linkedin', 'tiktok'].map(n => {
    const on = n === c.network;
    return `<button class="so-netbtn ${on ? 'active' : ''}" onclick="(function(b){b.classList.toggle('active')})(this);toast('${on ? 'Removed' : 'Added'} ${H.netMeta(n).label}','info')">${H.netIcon(n, '3')}${H.netMeta(n).label}</button>`;
  }).join('');

  const main = `
    <div class="ws-pad" style="max-width:680px">
      ${LX.recordHead({
        mark: `<i data-lucide="instagram" class="size-4"></i>`,
        markColor: cColor,
        title: cName,
        sub: c.handle + ' &middot; ' + H.netMeta(c.network).label,
        meta: [
          { k: 'Status', v: 'Editing' },
          { k: 'Slot', v: c.suggestedTime.split(',')[0] },
          { k: 'Length', v: c.charCount + ' / ' + c.charMax },
        ],
        actions: `${UI.btn('Save draft', { variant: 'secondary', size: 'sm', icon: 'save', onClick: "toast('Saved as draft','info')" })}`,
      })}

      <div class="eyebrow mb-2">Caption</div>
      <div class="input cmp-area" style="height:auto">${c.caption}</div>
      <div class="flex items-center gap-2 mt-2 flex-wrap">
        ${c.hashtags.map(h => `<span class="tag tag-slate">${h}</span>`).join('')}
        <span class="text-[10.5px] text-3 num ml-auto">${c.charCount} / ${c.charMax}</span>
      </div>

      <div class="eyebrow mt-5 mb-2">Media</div>
      <div class="rounded-lg flex items-center gap-4 px-4 py-5" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)">
        <div class="size-14 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-4)"><i data-lucide="images" class="size-6 text-3"></i></div>
        <div class="flex-1 min-w-0">
          <div class="text-[12.5px] text-1 font-medium">${c.media}</div>
          <div class="text-[11px] text-3 mt-0.5">Drag to reorder frames, or replace from the library.</div>
        </div>
        ${UI.btn('Library', { variant: 'secondary', size: 'sm', icon: 'folder-open' })}
      </div>

      <div class="eyebrow mt-5 mb-2">Publish to</div>
      <div class="flex items-center gap-2 flex-wrap">${networkToggles}</div>

      <div class="eyebrow mt-5 mb-2">Schedule</div>
      <div class="rounded-lg flex items-center gap-3 px-4 py-3 flex-wrap" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)">
        <i data-lucide="clock" class="size-4 text-acc-bright shrink-0"></i>
        <span class="text-[12px] text-2">${c.suggestedTime}</span>
        ${UI.btn('Change time', { variant: 'ghost', size: 'sm', icon: 'calendar' }).replace('<button', `<button data-action="menu" data-menu='["Tue 9:00 AM","Wed 12:00 PM","Thu 5:30 PM","Pick custom"]'`)}
      </div>

      <div class="flex items-center gap-2 mt-6 pt-5" style="border-top:1px solid var(--line-1)">
        ${UI.btn('Schedule post', { variant: 'primary', icon: 'calendar-plus', onClick: "toast('Post scheduled for Tue 9:00 AM','success')" })}
        ${UI.btn('Send to review', { variant: 'secondary', icon: 'user-check', onClick: "toast('Sent to approval queue','info')" })}
        ${UI.btn('Discard', { variant: 'ghost', icon: 'trash-2' }).replace('<button', `<button data-action="confirm" data-toast="Draft discarded" data-type="warning"`)}
      </div>
    </div>`;

  // --- ASIDE: live phone preview ---
  const aside = `
    <div class="ws-pad">
      <div class="eyebrow mb-3">Live preview</div>
      <div class="phone mx-auto">
        <div class="phone-screen">
          <div class="flex items-center gap-2 px-3 py-2.5" style="border-bottom:1px solid var(--line-1)">
            ${UI.avatar(cName, cColor, 22)}
            <span class="num text-[11.5px] font-medium text-1">${c.handle}</span>
            <i data-lucide="more-horizontal" class="size-3.5 text-3 ml-auto"></i>
          </div>
          <div class="flex items-center justify-center" style="aspect-ratio:4/5; background:var(--bg-4)">
            <div class="text-center">
              <i data-lucide="images" class="size-7 text-3 mx-auto"></i>
              <div class="text-[10px] text-3 mt-2 num">1080 x 1350</div>
            </div>
          </div>
          <div class="px-3 py-2.5">
            <div class="flex items-center gap-3.5 mb-2 text-2">
              <i data-lucide="heart" class="size-4"></i>
              <i data-lucide="message-circle" class="size-4"></i>
              <i data-lucide="send" class="size-4"></i>
              <i data-lucide="bookmark" class="size-4 ml-auto"></i>
            </div>
            <div class="num text-[11px] font-semibold text-1 mb-1">${c.likes.toLocaleString()} likes</div>
            <div class="text-[11px] text-1 leading-snug">
              <span class="num font-semibold">${c.handle}</span>
              <span class="text-2"> ${c.caption.slice(0, 110)}...</span>
            </div>
            <div class="text-[10px] text-3 mt-1.5">View all ${c.comments} comments</div>
          </div>
        </div>
      </div>
      <div class="mt-5 rounded-lg px-3.5 py-3" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)">
        <div class="eyebrow mb-2">Projected</div>
        <div class="grid grid-cols-3 gap-2 text-center">
          <div><div class="num text-[15px] font-semibold text-1">${(c.likes / 1000).toFixed(1)}k</div><div class="text-[10px] text-3">likes</div></div>
          <div><div class="num text-[15px] font-semibold text-1">${c.comments}</div><div class="text-[10px] text-3">comments</div></div>
          <div><div class="num text-[15px] font-semibold text-1">${c.shares}</div><div class="text-[10px] text-3">shares</div></div>
        </div>
      </div>
    </div>`;

  const header = `
    <div class="so-head">
      ${LX.modHead({
        title: 'Composer',
        sub: 'Draft, schedule, or route a post to approval. Preview updates as you type.',
        actions: `${UI.btn('Calendar', { variant: 'secondary', size: 'sm', icon: 'calendar-days', onClick: "navigate('social.calendar')" })}`,
      })}
    </div>`;

  return `
    ${H.styles}
    <div class="so-shell">
      ${header}
      <div data-tabwrap style="flex:1; min-height:0;">
        ${LX.workspace({ cols: '300px 1fr 320px', rail, main, aside })}
      </div>
    </div>`;
};


/* ====================================================================
   4. INBOX  ::  SPLIT INBOX  (conversations | thread)
   ==================================================================== */
window.PAGES['social.inbox'] = function () {
  const S = window.SOCIAL;
  const H = window.SOCIAL_H;
  const unread = S.inbox.filter(m => m.unread).length;

  // --- RAIL: conversation list ---
  const railRow = (m, first) => `
    <div class="ib-row ${first ? 'active' : ''}" data-tab="${m.id}">
      <div class="flex items-start gap-2.5">
        <div class="shrink-0 flex flex-col items-center gap-1 pt-0.5" style="width:24px">
          ${H.netIcon(m.network, '4')}
          ${H.cdot(m.clientId, 6)}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5 mb-0.5">
            ${H.sentDot(m.sentiment)}
            <span class="text-[12px] font-medium text-1 truncate">${m.from}</span>
            <span class="text-[10px] text-4 num ml-auto shrink-0">${m.ago}</span>
          </div>
          <div class="flex items-center gap-1.5 mb-1">
            <span class="tag tag-slate" style="font-size:9px;padding:0 5px">${m.kind}</span>
            <span class="text-[10px] text-3 truncate">${m.client}</span>
          </div>
          <div class="text-[11px] text-2 leading-snug" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${m.snippet}</div>
        </div>
        ${m.unread ? `<span class="size-1.5 rounded-full shrink-0 mt-1" style="background:var(--acc)"></span>` : ''}
      </div>
    </div>`;

  const rail = `
    <div style="padding:11px 13px; border-bottom:1px solid var(--line-1); position:sticky; top:0; background:var(--bg-1); z-index:2;">
      ${LX.segmented([{ id: 'all', label: 'All ' + S.inbox.length }, { id: 'unread', label: 'Unread ' + unread }, { id: 'neg', label: 'Negative' }], 'all')}
    </div>
    ${S.inbox.map((m, i) => railRow(m, i === 0)).join('')}`;

  // --- MAIN: one thread pane per conversation ---
  const threadPane = (m, first) => {
    const cName = H.clientName(m.clientId);
    const cColor = H.clientColor(m.clientId);
    const bubbles = m.thread.map(t => `
      <div class="flex ${t.who === 'them' ? '' : 'justify-end'}">
        <div class="bubble ${t.who === 'them' ? 'bubble-in' : 'bubble-out'}" style="max-width:78%; font-size:12.5px">
          ${t.t}
          <div class="text-[9.5px] text-3 num mt-1">${t.ago}</div>
        </div>
      </div>`).join('');
    return `
      <div data-pane="${m.id}" class="${first ? '' : 'hidden'}" style="display:flex; flex-direction:column; height:100%;">
        <div style="padding:13px 22px; border-bottom:1px solid var(--line-1); flex-shrink:0;">
          <div class="flex items-center gap-2.5">
            ${UI.avatar(m.from, cColor, 30)}
            <div class="min-w-0">
              <div class="text-[13px] font-medium text-1 flex items-center gap-1.5">${m.from} ${H.sentDot(m.sentiment)}</div>
              <div class="text-[11px] text-3 flex items-center gap-1.5">${H.netIcon(m.network, '3')}${H.netMeta(m.network).label}<span class="text-4">&middot;</span>${cName}</div>
            </div>
            <div class="ml-auto flex items-center gap-1.5 shrink-0">
              ${UI.btn('Profile', { variant: 'ghost', size: 'sm', icon: 'external-link' })}
              ${UI.btn('Mark done', { variant: 'secondary', size: 'sm', icon: 'check' }).replace('<button', `<button data-action="confirm" data-toast="Marked done"`)}
            </div>
          </div>
        </div>

        <div class="ib-thread" style="flex:1; overflow-y:auto;">
          ${bubbles}
        </div>

        <div style="padding:13px 22px; border-top:1px solid var(--line-1); flex-shrink:0;">
          <div class="rounded-lg p-2.5 mb-2.5" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--acc-line)">
            <div class="flex items-center gap-1.5 mb-1.5">
              <i data-lucide="sparkles" class="size-3 text-acc-bright"></i>
              <span class="eyebrow text-acc">Suggested reply</span>
              <div class="ml-auto flex items-center gap-1.5">
                ${UI.btn('Send', { variant: 'primary', size: 'sm', icon: 'send' }).replace('<button', `<button data-action="confirm" data-toast="Reply sent to ${m.from}"`)}
                ${UI.btn('Edit', { variant: 'ghost', size: 'sm', icon: 'pencil' })}
              </div>
            </div>
            <div class="text-[12px] text-2 leading-relaxed">${m.suggestedReply}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="input flex-1" style="height:auto; min-height:38px; color:var(--text-3)">Write a reply...</div>
            ${UI.btn('Send', { variant: 'secondary', icon: 'send' })}
          </div>
        </div>
      </div>`;
  };

  const main = S.inbox.map((m, i) => threadPane(m, i === 0)).join('');

  const header = `
    <div class="so-head">
      ${LX.modHead({
        title: 'Inbox',
        sub: 'Comments and DMs across every network in one queue, each with a suggested reply ready for review.',
        stats: [
          { k: 'Unread', v: `<span class="text-acc">${unread}</span>`, deltaUnit: '' },
          { k: 'Open conversations', v: S.inbox.length, deltaUnit: '' },
          { k: 'Negative', v: `<span class="text-red">${S.inbox.filter(m => m.sentiment === 'negative').length}</span>`, deltaUnit: '' },
        ],
        actions: `${UI.btn('Mark all read', { variant: 'secondary', size: 'sm', icon: 'check-check' }).replace('<button', `<button data-action="confirm" data-toast="All marked read"`)}`,
      })}
    </div>`;

  return `
    ${H.styles}
    <div class="so-shell">
      ${header}
      <div data-tabwrap style="flex:1; min-height:0;">
        ${LX.workspace({ cols: '360px 1fr', rail, main })}
      </div>
    </div>`;
};


/* ====================================================================
   5. LISTENING  ::  DENSE LIST  (mentions + sentiment panel)
   ==================================================================== */
window.PAGES['social.listening'] = function () {
  const S = window.SOCIAL;
  const H = window.SOCIAL_H;
  const sent = S.sentiment;

  const sentLabel = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const mentionRows = S.mentions.map(m => `
    <tr class="lst-row" data-action="detail" data-title="${H.esc(m.author)}" data-sub="${m.client} . ${H.netMeta(m.network).label}"
        data-kv='[["Author","${m.author}"],["Network","${H.netMeta(m.network).label}"],["Sentiment","${sentLabel(m.sentiment)}"],["Reach","${m.reach.toLocaleString()}"],["Engagement","${m.eng.toLocaleString()}"]]'>
      <td><div class="flex items-center gap-1.5">${H.netIcon(m.network, '3.5')}<span class="text-[11px] text-3">${H.netMeta(m.network).label}</span></div></td>
      <td><div class="flex items-center gap-1.5">${H.cdot(m.clientId, 6)}<span class="num text-[12px] text-1">${m.author}</span></div></td>
      <td><span class="inline-flex items-center gap-1.5">${H.sentDot(m.sentiment)}<span class="text-[11px]" style="color:${H.sentColor(m.sentiment)}">${sentLabel(m.sentiment)}</span></span></td>
      <td><span class="text-[12px] text-2 leading-snug" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;max-width:520px">${m.text}</span></td>
      <td class="r num text-2">${H.fmtK(m.reach)}</td>
      <td class="r num text-3">${H.fmtK(m.eng)}</td>
      <td class="r num text-3">${window.shortDate(window.daysAgo(m.days))}</td>
    </tr>`).join('');

  const list = `
    <div class="dlist-wrap" style="flex:1; overflow:auto;">
      <table class="dlist">
        <thead><tr>
          <th style="width:130px">Source</th>
          <th style="width:170px">Author</th>
          <th style="width:110px">Sentiment</th>
          <th>Mention</th>
          <th class="r" style="width:80px">Reach</th>
          <th class="r" style="width:70px">Eng</th>
          <th class="r" style="width:80px">Date</th>
        </tr></thead>
        <tbody>${mentionRows}</tbody>
      </table>
    </div>`;

  // Sentiment summary aside
  const netBars = S.sentimentByNet.map(n => `
    <div class="mb-3">
      <div class="flex items-center gap-1.5 mb-1.5">
        ${H.netIcon(n.id, '3')}
        <span class="text-[11.5px] text-2">${H.netMeta(n.id).label}</span>
        <span class="num text-[11px] text-acc ml-auto">${n.positive}%</span>
      </div>
      <div class="flex items-center rounded-full overflow-hidden" style="height:5px">
        <div style="width:${n.positive}%; background:var(--acc)"></div>
        <div style="width:${n.neutral}%; background:var(--amber)"></div>
        <div style="width:${n.negative}%; background:var(--red)"></div>
      </div>
    </div>`).join('');

  const counts = { positive: 0, neutral: 0, negative: 0 };
  S.mentions.forEach(m => counts[m.sentiment]++);
  const totalReach = S.mentions.reduce((s, m) => s + m.reach, 0);

  const aside = `
    <div class="ws-pad">
      <div class="eyebrow mb-3">Sentiment, last 7 days</div>
      <div class="flex items-baseline gap-2 mb-3">
        <span class="num font-semibold text-1" style="font-size:30px; line-height:1">${sent.positive}%</span>
        <span class="text-[12px] text-3">positive</span>
      </div>
      <div class="flex items-center rounded-full overflow-hidden mb-3" style="height:8px">
        <div style="width:${sent.positive}%; background:var(--acc)"></div>
        <div style="width:${sent.neutral}%; background:var(--amber)"></div>
        <div style="width:${sent.negative}%; background:var(--red)"></div>
      </div>
      <div class="flex items-center gap-4 mb-5 text-[11px]">
        <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Positive <span class="num text-3">${sent.positive}%</span></span>
        <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--amber)"></span>Neutral <span class="num text-3">${sent.neutral}%</span></span>
        <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--red)"></span>Negative <span class="num text-3">${sent.negative}%</span></span>
      </div>

      <div class="grid grid-cols-3 gap-2 mb-5 text-center">
        <div class="rounded-lg py-2.5" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)"><div class="num text-[16px] font-semibold text-1">${S.mentions.length}</div><div class="text-[10px] text-3">mentions</div></div>
        <div class="rounded-lg py-2.5" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)"><div class="num text-[16px] font-semibold text-1">${H.fmtK(totalReach)}</div><div class="text-[10px] text-3">reach</div></div>
        <div class="rounded-lg py-2.5" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)"><div class="num text-[16px] font-semibold text-acc">${S.shareOfVoice}%</div><div class="text-[10px] text-3">share of voice</div></div>
      </div>

      <div class="eyebrow mb-3">By network</div>
      ${netBars}

      <div class="rounded-lg px-3 py-2.5 mt-4 flex items-start gap-2" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)">
        <i data-lucide="alert-triangle" class="size-3.5 text-red mt-0.5 shrink-0"></i>
        <span class="text-[11px] text-2 leading-snug"><span class="text-1 font-medium">${counts.negative} negative mentions</span> need a reply. The gate complaint at Atlas is recurring.</span>
      </div>
    </div>`;

  const allNets = ['instagram', 'facebook', 'linkedin', 'tiktok', 'youtube', 'gbp'];
  const setActive = "(function(b){b.closest('[data-netfilter]').querySelectorAll('.so-netbtn').forEach(function(x){x.classList.remove('active')});b.classList.add('active')})(this)";
  const toolbar = `
    <div class="so-toolbar" data-netfilter>
      <button class="so-netbtn active" onclick="${setActive};toast('All mentions','info')"><i data-lucide="layers" class="size-3"></i>All</button>
      ${allNets.map(n => `<button class="so-netbtn" onclick="${setActive};toast('Filtered to ${H.netMeta(n).label}','info')">${H.netIcon(n, '3')}${H.netMeta(n).label}</button>`).join('')}
      <div class="grow" style="flex:1"></div>
      ${UI.btn('Positive', { variant: 'ghost', size: 'sm', icon: 'smile' })}
      ${UI.btn('Negative', { variant: 'ghost', size: 'sm', icon: 'frown' })}
      ${UI.btn('Export', { variant: 'ghost', size: 'sm', icon: 'download', onClick: "toast('Exporting CSV','info')" })}
    </div>`;

  const header = `
    <div class="so-head">
      ${LX.modHead({
        title: 'Listening',
        sub: 'Unprompted brand and product mentions across networks, ranked by reach.',
        stats: [
          { k: 'Mentions', v: S.mentions.length, deltaUnit: '' },
          { k: 'Positive', v: `<span class="text-acc">${sent.positive}%</span>`, deltaUnit: '' },
          { k: 'Reach', v: H.fmtK(totalReach), deltaUnit: '' },
        ],
      })}
    </div>`;

  return `
    ${H.styles}
    <div class="so-shell">
      ${header}
      ${toolbar}
      <div style="flex:1; min-height:0; display:grid; grid-template-columns: 1fr 320px;">
        ${list}
        <div style="border-left:1px solid var(--line-1); overflow-y:auto;">${aside}</div>
      </div>
    </div>`;
};


/* ====================================================================
   6. ANALYTICS  ::  CONSOLE  (top posts list + 2 charts)
   ==================================================================== */
window.PAGES['social.analytics'] = function () {
  const S = window.SOCIAL;
  const H = window.SOCIAL_H;
  const k = S.kpis;

  const header = LX.modHead({
    title: 'Analytics',
    sub: 'Reach and engagement across the book of business, last 14 days.',
    stats: [
      { k: 'Reach MTD',       v: H.fmtK(k.reachMtd.value),                delta: k.reachMtd.delta },
      { k: 'Engagement rate', v: k.engagementRate.value.toFixed(1) + '%', delta: k.engagementRate.delta, deltaUnit: 'pt' },
      { k: 'Follower growth', v: '+' + H.fmtK(k.followerGrowth.value),    delta: k.followerGrowth.delta },
      { k: 'Posts published', v: S.networkPerf.reduce((s, n) => s + n.posts, 0), deltaUnit: '' },
    ],
    actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download', onClick: "toast('Exporting report','info')" })}`,
  });

  const reachChart = LX.panel({
    title: 'Reach over time',
    actions: `<div class="flex items-center gap-3 text-[10.5px]">
        <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Reach</span>
        <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--violet)"></span>Engagement rate</span>
        <span class="text-3 num">14 days</span>
      </div>`,
    body: `<div style="height:230px"><canvas id="social-reach-chart" height="230"></canvas></div>`,
  });

  const engChart = LX.panel({
    title: 'Engagement by network',
    actions: `<span class="text-[10.5px] text-3">blended rate</span>`,
    body: `<div style="height:230px"><canvas id="social-eng-chart" height="230"></canvas></div>`,
  });

  // Top posts dense list
  const topList = LX.dataList({
    columns: [
      { key: 'rank', label: '#', width: '34px', mono: true, render: (r, i) => `<span class="text-3">${i + 1}</span>` },
      { key: 'post', label: 'Post', render: (r) => `
        <div class="flex items-center gap-2 min-w-0">
          ${H.netIcon(r.network, '3.5')}
          ${H.cdot(r.clientId, 6)}
          <div class="min-w-0">
            <div class="text-[12.5px] text-1 leading-tight truncate" style="max-width:360px">${r.caption}</div>
            <div class="text-[10px] text-3">${r.client}</div>
          </div>
        </div>` },
      { key: 'reach', label: 'Reach', align: 'r', mono: true, render: (r) => `<span class="text-1">${r.reach.toLocaleString()}</span>` },
      { key: 'eng', label: 'Eng rate', align: 'r', mono: true, render: (r) => `<span class="${r.eng >= 6 ? 'text-acc' : 'text-1'}">${r.eng.toFixed(1)}%</span>` },
      { key: 'saves', label: 'Saves', align: 'r', mono: true, render: (r) => `<span class="text-2">${r.saves.toLocaleString()}</span>` },
      { key: 'date', label: 'Posted', align: 'r', mono: true, render: (r) => `<span class="text-3">${window.shortDate(r.date)}</span>` },
    ],
    rows: S.topPosts,
    rowAttrs: (r) => `data-action="detail" data-title="${H.esc(r.caption)}" data-sub="${r.client} . ${H.netMeta(r.network).label}" data-kv='[["Client","${r.client}"],["Network","${H.netMeta(r.network).label}"],["Reach","${r.reach.toLocaleString()}"],["Engagement","${r.eng.toFixed(1)}%"],["Saves","${r.saves.toLocaleString()}"]]'`,
  });

  const topPanel = LX.panel({
    title: 'Top posts',
    actions: `<span class="text-[10.5px] text-3">${S.topPosts.length} posts . by reach</span>`,
    bare: true,
    body: topList,
  });

  return `
    ${header}
    <div class="grid grid-cols-12 gap-3.5 mb-3.5">
      <div class="col-span-12 lg:col-span-7">${reachChart}</div>
      <div class="col-span-12 lg:col-span-5">${engChart}</div>
    </div>
    ${topPanel}`;
};

window.PAGES_AFTER['social.analytics'] = function () {
  const S = window.SOCIAL;
  const labels = [];
  for (let i = 13; i >= 0; i--) labels.push(window.shortDate(window.daysAgo(i)));
  const reach = S.reachSeries.map(n => n * 1000);

  CHARTS.line('social-reach-chart', labels, [
    { label: 'Reach', data: reach, borderColor: 'var(--acc)', backgroundColor: 'rgba(16,185,129,0.10)', yAxisID: 'y', fill: true },
    { label: 'Engagement rate', data: S.engSeries, borderColor: '#a78bfa', backgroundColor: 'transparent', yAxisID: 'y1', fill: false },
  ], {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 }, maxTicksLimit: 8 }, border: { display: false } },
      y:  { position: 'left',  grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 }, callback: (v) => (v / 1000) + 'k' }, border: { display: false } },
      y1: { position: 'right', grid: { display: false }, ticks: { padding: 8, font: { size: 10 }, callback: (v) => v + '%' }, border: { display: false }, min: 3, max: 6 },
    },
  });

  CHARTS.bar('social-eng-chart', S.engByNet.map(n => n.label), [
    { label: 'Engagement', data: S.engByNet.map(n => n.eng), backgroundColor: 'rgba(16,185,129,0.55)', borderColor: 'var(--acc)' },
  ], {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 } }, border: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 }, callback: (v) => v + '%' }, border: { display: false } },
    },
  });
};
