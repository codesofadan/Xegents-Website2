/* ============================================================
   Command Center (home) :: CONSOLE COCKPIT
   Cross-channel executive cockpit for GrowthBoost. LX.modHead
   inline stat rail (no KPI cards) over a CSS grid of LX.panel
   monitor tiles. Self-wrapped page (in app.js SELF_WRAPPED),
   full width, no inner max-width centering.
   ============================================================ */

window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};
window.FULLBLEED = window.FULLBLEED || new Set();

window.PAGES.home = function () {
  const C = window.COMMAND;
  const k = C.kpis;

  const statusColor = (s) => s === 'critical' ? 'var(--red)' : s === 'at_risk' ? 'var(--amber)' : 'var(--acc)';
  const statusName  = (s) => s === 'critical' ? 'Critical' : s === 'at_risk' ? 'At risk' : 'Healthy';
  const lvlColor    = (l) => l === 'red' ? 'var(--red)' : l === 'amber' ? 'var(--amber)' : 'var(--acc)';
  const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');

  // ====================================================================
  // Header - inline stat rail. NO kpi cards. One quiet hero (revenue).
  // ====================================================================
  const header = LX.modHead({
    title: 'Good afternoon, ' + window.USER.name.split(' ')[0],
    sub: window.AGENCY.name + ' - cross-channel cockpit across ' + window.CLIENTS.length + ' clients and ' + window.CHANNELS.length + ' channels. ' + window.AGENCY.period + ', mid-cycle.',
    stats: [
      { k: 'Revenue MTD',  v: formatMoney(k.revenueMtdUsd), delta: k.revenueDelta, deltaUnit: '%' },
      { k: 'Ad spend MTD', v: formatMoney(k.adSpendUsd),    delta: k.adSpendDelta, deltaUnit: '%' },
      { k: 'Blended ROAS', v: k.roas.toFixed(1) + 'x',      delta: k.roasDelta,    deltaUnit: 'x' },
      { k: 'Leads / conv', v: k.leads.toLocaleString(),     delta: k.leadsDelta,   deltaUnit: '%' },
      { k: 'Open pipeline', v: formatMoney(k.pipelineUsd),  delta: k.pipelineDelta, deltaUnit: '%' },
      { k: 'Agency MRR',   v: formatMoney(k.mrrUsd),        delta: k.mrrDelta,     deltaUnit: '%' },
      { k: 'Portfolio health', v: k.health, delta: k.healthDelta, deltaUnit: 'pt' },
    ],
    actions: `
      ${UI.btn('This month', { variant: 'secondary', size: 'sm', icon: 'calendar' }).replace('<button', `<button data-action="menu" data-menu='["Last 7 days","Last 30 days","This quarter"]'`)}
      ${UI.btn('Open approval queue', { variant: 'primary', size: 'sm', icon: 'inbox', onClick: "navigate('approvals')" })}`,
  });

  // ====================================================================
  // Panel 1 - Cross-channel trend (chart). Spans wide.
  // ====================================================================
  const trendPanel = LX.panel({
    title: 'Cross-channel performance',
    actions: `<div class="flex items-center gap-3 text-[10.5px]">
        <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Revenue</span>
        <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--amber)"></span>Ad spend</span>
        <span class="text-3 num">Apr - Jun, weekly</span>
      </div>`,
    body: `<div style="height:208px"><canvas id="cmd-trend-chart" height="208"></canvas></div>`,
  });

  // ====================================================================
  // Panel 2 - AI Account Manager digest (compact, links to approvals).
  //    The single agent surface on the cockpit. Tall right column.
  // ====================================================================
  const pendingChips = C.pendingByChannel.map(p => {
    const ch = getChannel(p.id);
    return `<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] text-2" style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)">
      <i data-lucide="${ch ? ch.icon : 'circle'}" class="size-3" style="color:${ch ? ch.color : 'var(--text-3)'}"></i>${p.label}
      <span class="num font-semibold text-1">${p.num}</span></span>`;
  }).join('');

  const digestRows = C.digest.map(a => {
    const client = getClient(a.client);
    const ch = getChannel(a.channel);
    return `
      <div class="px-3.5 py-3" style="border-top:1px solid var(--line-1)"
           data-action="detail" data-title="${esc(a.action)}" data-sub="${esc(client.name)} - ${ch.label}"
           data-kv='[["Client","${esc(client.name)}"],["Channel","${ch.label}"],["Projected impact","${esc(a.impact)}"],["Confidence","${a.confidence}%"]]'>
        <div class="flex items-start gap-2.5">
          <div class="size-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style="background:${ch.color}1f">
            <i data-lucide="${ch.icon}" class="size-3" style="color:${ch.color}"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-[12px] font-medium text-1 leading-snug truncate">${a.action}</span>
              <span class="text-[10px] text-3 shrink-0">${client.name}</span>
            </div>
            <div class="text-[11px] text-3 leading-snug mt-0.5">${a.why}</div>
            <div class="flex items-center justify-between gap-2 mt-2">
              <div class="flex items-center gap-2">
                <span class="tag ${a.impactGood ? 'tag-acc' : 'tag-red'}" style="font-size:10px;padding:1px 6px">${a.impact}</span>
                <span class="text-[10px] text-3 num">${a.confidence}% conf</span>
              </div>
              <div class="flex items-center gap-1 shrink-0" onclick="event.stopPropagation()">
                <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Approved" data-dismiss="1"><span>Approve</span></button>
                <button class="btn btn-ghost btn-sm" data-action="navigate" data-route="approvals"><span>Review</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');

  const amPanel = `
    <div class="panel" style="box-shadow:inset 0 0 0 1px var(--line-1);border-top:2px solid var(--acc)">
      <div class="panel-head">
        <div class="flex items-center gap-2 min-w-0">
          <i data-lucide="sparkles" class="size-3.5 text-acc-bright shrink-0"></i>
          <div class="panel-title truncate">AI Account Manager</div>
          <span class="status status-acc text-[10px]">live</span>
        </div>
        <button class="text-[11px] text-acc-bright font-medium" data-action="navigate" data-route="approvals">All ${C.digestCount} &rarr;</button>
      </div>
      <div class="px-3.5 pt-3 pb-2.5 flex flex-wrap items-center gap-1.5" style="border-bottom:1px solid var(--line-1)">
        <span class="num font-semibold text-acc-bright text-[12px] mr-1">${C.digestCount} actions</span>
        <span class="text-[11px] text-3 mr-1.5">awaiting approval -</span>
        ${pendingChips}
      </div>
      <div>${digestRows}</div>
      <div class="px-3.5 py-2.5 flex items-center justify-between" style="border-top:1px solid var(--line-1)">
        <span class="text-[10.5px] text-3">Top ${C.digest.length} by projected impact - humans stay in the loop</span>
        ${UI.btn('Open queue', { variant: 'secondary', size: 'sm', icon: 'inbox', onClick: "navigate('approvals')" })}
      </div>
    </div>`;

  // ====================================================================
  // Panel 3 - Per-client health (dense mini-list).
  // ====================================================================
  const channelOrder = ['ads', 'seo', 'social', 'reputation', 'email', 'content'];
  const healthRows = window.CLIENTS.map(c => {
    const col = statusColor(c.status);
    const cs = C.clientChannelStatus[c.id] || {};
    const chips = channelOrder.map(cid => {
      const ch = getChannel(cid);
      const lvl = cs[cid];
      if (!lvl) return '';
      return `<span class="inline-flex items-center" data-tooltip="${ch ? ch.label : cid} - ${lvl}"><span class="size-2 rounded-full" style="background:${lvlColor(lvl)}"></span></span>`;
    }).join('');
    return {
      name: c.name, industry: c.industry, logoColor: c.logoColor, icon: c.icon,
      status: c.status, healthScore: c.healthScore, mrrUsd: c.mrrUsd,
      renewalAt: c.renewalAt, spark: c.spark, col, chips, id: c.id,
    };
  });

  const healthList = LX.dataList({
    cls: 'tight',
    columns: [
      { key: 'client', label: 'Client', render: (r) => `
        <div class="flex items-center gap-2.5">
          <span class="size-5 rounded-md shrink-0 inline-flex items-center justify-center" style="background:${r.logoColor}22;box-shadow:inset 0 0 0 1px ${r.logoColor}55">
            <i data-lucide="${r.icon}" class="size-3" style="color:${r.logoColor}"></i></span>
          <div class="min-w-0">
            <div class="text-[12px] font-medium text-1 leading-tight truncate">${r.name}</div>
            <div class="text-[10px] text-3 leading-tight">${r.industry}</div>
          </div>
        </div>` },
      { key: 'health', label: 'Health', render: (r) => `
        <div class="flex items-center gap-2">
          <span class="size-2 rounded-full" style="background:${r.col}"></span>
          <span class="num text-[12px] text-1 font-medium">${r.healthScore}</span>
          <span class="text-[10px] text-3">${statusName(r.status)}</span>
        </div>` },
      { key: 'channels', label: 'Channels', render: (r) => `<div class="flex items-center gap-1.5">${r.chips}</div>` },
      { key: 'mrr', label: 'MRR', align: 'r', mono: true, render: (r) => `<span class="text-[12px] text-1">${formatMoney(r.mrrUsd)}</span>` },
      { key: 'renewal', label: 'Renewal', align: 'r', mono: true, render: (r) => `<span class="text-[11px] text-2">${shortDate(r.renewalAt)}</span>` },
      { key: 'trend', label: 'Trend', align: 'r', width: '92px', render: (r) => `<span class="cell-spark">${sparkSvg(r.spark, r.col, 80, 22)}</span>` },
    ],
    rows: healthRows,
    rowAttrs: (r) => `data-action="detail" data-title="${esc(r.name)}" data-sub="${esc(r.industry)} - ${statusName(r.status)}" data-kv='[["Health","${r.healthScore}"],["Status","${statusName(r.status)}"],["MRR","${formatMoney(r.mrrUsd)}"],["Renewal","${shortDate(r.renewalAt)}"]]'`,
  });

  const healthPanel = LX.panel({
    title: 'Client health',
    actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="clients">All clients &rarr;</button>`,
    bare: true,
    body: healthList,
  });

  // ====================================================================
  // Panel 4 - Channel mix (spend share + ROAS bars).
  // ====================================================================
  const mixTotal = C.channelMix.reduce((s, x) => s + x.value, 0);
  const mixMax = Math.max(...C.channelMix.map(x => x.value));
  const mixRows = C.channelMix.map(m => {
    const share = Math.round(m.value / mixTotal * 100);
    return `
      <div class="flex items-center gap-3 px-3.5 py-2" style="border-top:1px solid var(--line-1)">
        <div class="w-[88px] shrink-0 flex items-center gap-2">
          <span class="size-2 rounded-full shrink-0" style="background:${m.color}"></span>
          <span class="text-[11.5px] text-2 truncate">${m.label}</span>
        </div>
        <div class="flex-1">${LX.bar(m.value / mixMax * 100, m.color)}</div>
        <div class="w-14 text-right text-[11.5px] num text-1">${formatMoney(m.value)}</div>
        <div class="w-8 text-right text-[10.5px] num text-3">${share}%</div>
        <div class="w-12 text-right text-[10.5px] num ${m.roas >= 4 ? 'text-acc' : 'text-3'}">${m.roas > 0 ? m.roas.toFixed(1) + 'x' : '-'}</div>
      </div>`;
  }).join('');

  const mixPanel = LX.panel({
    title: 'Spend by channel',
    actions: `<span class="text-[10.5px] text-3 num">${formatMoney(mixTotal)} MTD</span>`,
    bare: true,
    body: `
      <div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
        <div class="w-[88px] shrink-0">Channel</div><div class="flex-1">Share of spend</div>
        <div class="w-14 text-right">Spend</div><div class="w-8 text-right">%</div><div class="w-12 text-right">ROAS</div>
      </div>
      ${mixRows}`,
  });

  // ====================================================================
  // Panel 5 - Needs attention (severity-sorted feed).
  // ====================================================================
  const severityRank = (a) => (a.level === 'red' ? 0 : 1) + (a.severity === 'P1' ? 0 : 0.5);
  const sortedAlerts = [...C.alerts].sort((x, y) => severityRank(x) - severityRank(y));
  const alertRows = sortedAlerts.map(a => {
    const client = getClient(a.client);
    const ch = getChannel(a.channel);
    const sevTag = a.severity === 'P1'
      ? `<span class="tag tag-red" style="font-size:9px;padding:0 5px">P1</span>`
      : `<span class="tag tag-amber" style="font-size:9px;padding:0 5px">P2</span>`;
    return `
      <div class="px-3.5 py-2.5" style="border-top:1px solid var(--line-1)" data-dismiss>
        <div class="flex items-start gap-2.5">
          <span class="size-2 rounded-full mt-1 shrink-0" style="background:${lvlColor(a.level)}"></span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              ${sevTag}
              <span class="text-[11.5px] font-medium text-1">${client.name}</span>
              ${ch ? `<span class="text-[10px] text-3 flex items-center gap-1"><i data-lucide="${ch.icon}" class="size-3"></i>${ch.label}</span>` : ''}
              <span class="text-[10px] text-4 num ml-auto">${shortDate(daysAgo(a.days))}</span>
            </div>
            <div class="text-[11px] text-2 leading-snug mt-0.5">${a.message}</div>
            ${a.aiDraft ? `
            <div class="flex items-center justify-between gap-2 mt-1.5 px-2 py-1.5 rounded-md" style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)">
              <span class="text-[10px] text-2 flex items-center gap-1.5 min-w-0"><i data-lucide="file-pen" class="size-3 text-3 shrink-0"></i><span class="truncate">${a.aiDraft}</span></span>
              <div class="flex items-center gap-1 shrink-0" onclick="event.stopPropagation()">
                <button class="btn btn-secondary btn-sm" data-action="navigate" data-route="${a.action}"><span>Review</span></button>
                <button class="btn btn-ghost btn-sm" data-action="dismiss"><span>Dismiss</span></button>
              </div>
            </div>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');

  const alertsPanel = LX.panel({
    title: 'Needs attention',
    actions: `<span class="status status-red text-[10.5px]">${C.alerts.filter(a => a.level === 'red').length} critical</span>`,
    bare: true,
    body: alertRows,
  });

  // ====================================================================
  // Panel 6 - On deck (this week operating queue).
  // ====================================================================
  const kindIcon = { renewal: 'calendar-clock', call: 'phone', report: 'file-text', post: 'calendar', approval: 'inbox' };
  const deckRows = C.weekAhead.map(w => `
    <button class="w-full text-left px-3.5 py-2.5 flex items-center gap-2.5 surface-hover" style="border-top:1px solid var(--line-1)" onclick="navigate('${w.route}')">
      <span class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)">
        <i data-lucide="${kindIcon[w.kind] || 'circle'}" class="size-3 text-2"></i></span>
      <div class="flex-1 min-w-0">
        <div class="text-[12px] font-medium text-1 leading-tight truncate">${w.label}</div>
        <div class="text-[10px] text-3 leading-tight truncate">${w.sub}</div>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <span class="status status-${w.dot}"></span>
        <span class="text-[10.5px] text-2 num w-12 text-right">${w.due}</span>
      </div>
    </button>`).join('');

  const deckPanel = LX.panel({
    title: 'On deck this week',
    actions: `<span class="text-[10.5px] text-3">Week of ${shortDate(window.TODAY)}</span>`,
    bare: true,
    body: deckRows,
  });

  // ====================================================================
  // Panel 7 - Recent wins.
  // ====================================================================
  const winRows = C.wins.map(w => {
    const client = getClient(w.client);
    const ch = getChannel(w.channel);
    return `
      <div class="px-3.5 py-2.5 flex items-start gap-2.5" style="border-top:1px solid var(--line-1)">
        <i data-lucide="check-circle-2" class="size-3.5 text-acc mt-0.5 shrink-0"></i>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="text-[11.5px] font-medium text-1">${client.name}</span>
            ${ch ? `<span class="text-[10px] text-3 flex items-center gap-1"><i data-lucide="${ch.icon}" class="size-3"></i>${ch.label}</span>` : ''}
            <span class="text-[10px] text-4 num ml-auto">${shortDate(daysAgo(w.days))}</span>
          </div>
          <div class="text-[11px] text-2 leading-snug mt-0.5">${w.message}</div>
        </div>
      </div>`;
  }).join('');

  const winsPanel = LX.panel({
    title: 'Recent wins',
    actions: `<span class="status status-acc text-[10.5px]">this week</span>`,
    bare: true,
    body: winRows,
  });

  // ====================================================================
  // Panel 8 - Automation under policy (governance, quiet stat block).
  // ====================================================================
  const g = C.governance;
  const govCell = (v, label, acc) => `
    <div class="px-3.5 py-3" style="border-left:1px solid var(--line-1)">
      <div class="text-[19px] font-semibold num ${acc ? 'text-acc-bright' : 'text-1'} leading-none">${v}</div>
      <div class="text-[10px] text-3 mt-1.5">${label}</div>
    </div>`;
  const govPanel = LX.panel({
    title: 'Automation under policy',
    actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="automations">Policies &rarr;</button>`,
    bare: true,
    body: `
      <div class="grid grid-cols-4" style="border-top:1px solid var(--line-1)">
        <div class="px-3.5 py-3">
          <div class="text-[19px] font-semibold num text-1 leading-none">${g.autoApproved}</div>
          <div class="text-[10px] text-3 mt-1.5">auto-approved</div>
        </div>
        ${govCell(g.hoursSaved + 'h', 'hours saved', true)}
        ${govCell(g.approvalRate + '%', 'approval rate')}
        ${govCell(g.avgReviewMin + 'm', 'avg review')}
      </div>
      <div class="text-[10.5px] text-3 leading-snug px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">${g.autoApproved} low-risk actions ran under policy this month, returning ${g.hoursSaved}h to the team. Everything else routes to approval.</div>`,
  });

  // ====================================================================
  // Console grid - 12-col monitor wall.
  // ====================================================================
  return `
  <section class="px-8 py-7">
    ${header}
    <div class="grid grid-cols-12 gap-3.5">
      <div class="col-span-12 lg:col-span-8 flex flex-col gap-3.5">
        ${trendPanel}
        ${healthPanel}
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
          ${mixPanel}
          ${deckPanel}
        </div>
        ${govPanel}
      </div>
      <div class="col-span-12 lg:col-span-4 flex flex-col gap-3.5">
        ${amPanel}
        ${alertsPanel}
        ${winsPanel}
      </div>
    </div>
  </section>`;
};

window.PAGES_AFTER.home = function () {
  const t = window.COMMAND.trend;
  CHARTS.line('cmd-trend-chart', t.labels, [
    { label: 'Revenue', data: t.revenue, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.10)' },
    { label: 'Ad spend', data: t.spend, borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.06)', borderDash: [4, 3] },
  ], {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }, border: { display: false } },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false },
        ticks: { padding: 8, font: { size: 10 }, callback: (v) => '$' + (v / 1000) + 'k' },
        border: { display: false },
      },
    },
  });
};
