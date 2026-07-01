/* ============================================================
   SEO & Local macro - hub + dense micro sub-modules.
   Each sub-module is its assigned archetype, structurally
   distinct from its siblings:
     seo            :: CONSOLE        (panel grid + stat rail)
     seo.ranks      :: DENSE LIST     (full-bleed, sparklines)
     seo.local      :: MAP GRID       (full-bleed, geo heatmap)
     seo.audit      :: ISSUES LIST    (health panels + dense list)
     seo.backlinks  :: DENSE LIST     (full-bleed)
     seo.gaps       :: DENSE LIST     (content-gap, create brief)
   AI is a quiet capability here - the approvals macro is its home.
   ============================================================ */

window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};
window.FULLBLEED = window.FULLBLEED || new Set();
window.FULLBLEED.add('seo.ranks');
window.FULLBLEED.add('seo.local');
window.FULLBLEED.add('seo.backlinks');

(function () {
  const S = () => window.SEO;

  // ---- shared lookups ----
  const clientName = (id) => (window.getClient(id) || {}).name || id;
  const clientColor = (id) => (window.getClient(id) || {}).logoColor || '#10b981';
  const clientIcon = (id) => (window.getClient(id) || {}).icon || 'circle';
  const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');
  const cap = (s) => (s || '').charAt(0).toUpperCase() + (s || '').slice(1);

  const clientCell = (id) => `<span class="flex items-center gap-2"><span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(id)}"></span><span class="text-[12px] text-2 truncate">${clientName(id)}</span></span>`;
  const intentTag = (i) => i === 'high' ? `<span class="tag tag-acc" style="font-size:10px;padding:1px 6px">High</span>` : i === 'medium' ? `<span class="tag tag-slate" style="font-size:10px;padding:1px 6px">Med</span>` : `<span class="tag tag-slate" style="font-size:10px;padding:1px 6px">Low</span>`;
  const kdCls = (kd) => kd >= 60 ? 'text-red' : kd >= 40 ? 'text-2' : 'text-acc';
  // rank change: positive = improved (good). Render with up/down arrow entity.
  const changeCell = (n) => {
    if (n === 0) return `<span class="num text-3">-</span>`;
    const up = n > 0;
    return `<span class="num ${up ? 'text-acc' : 'text-red'}">${up ? '&uarr;' : '&darr;'} ${Math.abs(n)}</span>`;
  };

  // sub-nav tab strip shared across the macro
  function subNav(active) {
    const items = [
      { id: 'seo',           label: 'Overview' },
      { id: 'seo.ranks',     label: 'Rank tracking' },
      { id: 'seo.local',     label: 'Local grid' },
      { id: 'seo.audit',     label: 'Site audit' },
      { id: 'seo.backlinks', label: 'Backlinks' },
      { id: 'seo.gaps',      label: 'Content gaps' },
    ];
    return `<div class="flex items-center gap-1 mb-5 -mt-1 flex-wrap">${items.map(it =>
      `<button class="px-2.5 py-1 rounded-md text-[12px] font-medium ${it.id === active ? 'text-1' : 'text-3 hover:text-1'}" ${it.id === active ? 'style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"' : ''} data-action="navigate" data-route="${it.id}">${it.label}</button>`
    ).join('')}</div>`;
  }

  // ====================================================================
  // PAGES.seo :: CONSOLE - rank/local monitor wall
  // ====================================================================
  window.PAGES.seo = function () {
    const s = S(); const k = s.kpis;

    const header = LX.modHead({
      title: 'SEO & Local',
      sub: 'Rank tracking, Google Business Profiles, on-page health, citations and backlinks across ' + window.CLIENTS.length + ' clients - ' + window.AGENCY.period + ', mid-cycle.',
      stats: [
        { k: 'Avg rank',        v: k.rankAvg.toFixed(1), delta: k.rankDelta, deltaUnit: '' },
        { k: 'Keywords',        v: k.keywords.toLocaleString(), delta: k.keywordsDelta, deltaUnit: '' },
        { k: 'GBP calls MTD',   v: k.gbpCalls.toLocaleString(), delta: k.gbpCallsDelta, deltaUnit: '%' },
        { k: 'Citation health', v: k.citationHealth + '%', delta: k.citationDelta, deltaUnit: 'pt' },
        { k: 'Backlinks',       v: k.backlinks.toLocaleString(), delta: k.backlinksDelta, deltaUnit: '' },
      ],
      actions: `
        ${UI.btn('Last 30 days', { variant: 'secondary', size: 'sm', icon: 'calendar' }).replace('<button', `<button data-action="menu" data-menu='["Last 7 days","Last 30 days","This quarter"]'`)}
        ${UI.btn('Run audit', { variant: 'secondary', size: 'sm', icon: 'refresh-cw' }).replace('<button', `<button data-action="navigate" data-route="seo.audit"`)}
        ${UI.btn('Add keywords', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="navigate" data-route="seo.ranks"`)}`,
    });

    // Panel 1 - average-rank trend chart
    const trendPanel = LX.panel({
      title: 'Portfolio average rank',
      actions: `<div class="flex items-center gap-3 text-[10.5px]">
          <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Avg rank</span>
          <span class="text-3 num">Apr - Jun, weekly - lower is better</span>
        </div>`,
      body: `<div style="height:212px"><canvas id="seo-rank-chart" height="212"></canvas></div>`,
    });

    // Panel 2 - position-bucket distribution (keyword universe)
    const totKw = s.buckets.reduce((a, b) => a + b.count, 0);
    const bucketRows = s.buckets.map(b => {
      const good = b.delta >= 0;
      return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <div class="w-[88px] shrink-0 flex items-center gap-2">
          <span class="size-2 rounded-sm shrink-0" style="background:${b.color}"></span>
          <span class="text-[12px] text-1 font-medium">${b.label}</span>
        </div>
        <div class="flex-1">${LX.bar(b.count / totKw * 100, b.color)}</div>
        <div class="w-12 text-right num text-[12px] text-1">${b.count}</div>
        <div class="w-14 text-right num text-[11px] ${good ? 'delta-up' : 'delta-down'}">${good ? '&uarr;' : '&darr;'} ${Math.abs(b.delta)}</div>
      </div>`;
    }).join('');
    const bucketPanel = LX.panel({
      title: 'Keyword universe',
      actions: `<span class="text-[10.5px] text-3 num">${k.keywords.toLocaleString()} tracked</span>`,
      bare: true,
      body: `<div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
          <div class="w-[88px] shrink-0">Bucket</div><div class="flex-1">Share of universe</div>
          <div class="w-12 text-right">Count</div><div class="w-14 text-right">vs LM</div>
        </div>${bucketRows}`,
    });

    // Panel 3 - top movers (dense mini-list)
    const moverRows = s.movers.map(m => {
      const up = m.change > 0;
      return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(m.client)}"></span>
        <div class="min-w-0 flex-1">
          <div class="text-[12px] text-1 font-medium truncate">${m.keyword}</div>
          <div class="text-[10px] text-3">${clientName(m.client)}</div>
        </div>
        <span class="num text-[12px] text-1 w-10 text-right">#${m.rank}</span>
        <span class="num text-[11px] w-14 text-right ${up ? 'delta-up' : 'delta-down'}">${up ? '&uarr;' : '&darr;'} ${Math.abs(m.change)}</span>
      </div>`;
    }).join('');
    const moversPanel = LX.panel({
      title: 'Top movers',
      actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="seo.ranks">All ranks &rarr;</button>`,
      bare: true,
      body: moverRows,
    });

    // Panel 4 - audit issues summary (links to seo.audit)
    const sevCount = (sv) => s.audit.filter(a => a.severity === sv && a.status !== 'resolved').length;
    const issuesPanel = LX.panel({
      title: 'Site audit summary',
      actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="seo.audit">Open audit &rarr;</button>`,
      body: `<div class="flex items-center gap-3 mb-3.5">
          <div class="size-9 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)">${scoreRing(s.health.overall, 'var(--acc)', 34)}</div>
          <div class="min-w-0">
            <div class="text-[13px] text-1 font-medium">Health score ${s.health.overall}</div>
            <div class="text-[10.5px] text-3 num">${s.health.overallDelta >= 0 ? '&uarr;' : '&darr;'} ${Math.abs(s.health.overallDelta)} pts vs last scan</div>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="flex items-center gap-1.5 px-2 py-1 rounded-md" style="background:var(--bg-3)"><span class="status status-red"></span><span class="text-[11px] text-2 num">${sevCount('red')} critical</span></span>
          <span class="flex items-center gap-1.5 px-2 py-1 rounded-md" style="background:var(--bg-3)"><span class="status status-amber"></span><span class="text-[11px] text-2 num">${sevCount('amber')} warnings</span></span>
          <span class="flex items-center gap-1.5 px-2 py-1 rounded-md" style="background:var(--bg-3)"><span class="status status-sky"></span><span class="text-[11px] text-2 num">${sevCount('sky')} info</span></span>
        </div>`,
    });

    // Panel 5 - GBP insights (the local affordance)
    const gbp = s.gbp;
    const gbpMetric = (label, value, delta, icon) => `
      <div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <div class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)"><i data-lucide="${icon}" class="size-3" style="color:var(--sky)"></i></div>
        <span class="text-[12px] text-2 flex-1">${label}</span>
        <span class="num text-[12.5px] font-medium text-1">${value.toLocaleString()}</span>
        <span class="num text-[10.5px] w-12 text-right ${delta >= 0 ? 'delta-up' : 'delta-down'}">${delta >= 0 ? '&uarr;' : '&darr;'} ${Math.abs(delta)}%</span>
      </div>`;
    const gbpPanel = LX.panel({
      title: 'GBP insights',
      actions: `<span class="status status-green text-[10px]">connected</span>`,
      bare: true,
      body: `<div class="px-3.5 py-2.5 text-[11px] text-3">${gbp.profile}</div>
        ${gbpMetric('Calls', gbp.calls, gbp.callsDelta, 'phone')}
        ${gbpMetric('Direction requests', gbp.directionRequests, gbp.directionsDelta, 'navigation')}
        ${gbpMetric('Website clicks', gbp.websiteClicks, gbp.clicksDelta, 'mouse-pointer-click')}
        ${gbpMetric('Photo views', gbp.photoViews, gbp.photoDelta, 'image')}
        <button class="w-full text-left px-3.5 py-2.5 text-[11px] text-3 hover:text-1" style="border-top:1px solid var(--line-1)" data-action="navigate" data-route="seo.local">View local grid &rarr;</button>`,
    });

    return `${header}${subNav('seo')}
      <div class="grid grid-cols-12 gap-3.5">
        <div class="col-span-12 lg:col-span-8 flex flex-col gap-3.5">
          ${trendPanel}
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
            ${bucketPanel}
            ${moversPanel}
          </div>
          ${issuesPanel}
        </div>
        <div class="col-span-12 lg:col-span-4 flex flex-col gap-3.5">
          ${gbpPanel}
        </div>
      </div>`;
  };

  window.PAGES_AFTER.seo = function () {
    const t = S().rankTrend;
    CHARTS.line('seo-rank-chart', t.labels, [
      { label: 'Avg rank', data: t.avgRank, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.10)' },
    ], {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }, border: { display: false } },
        y: { reverse: true, grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 }, precision: 0 }, border: { display: false } },
      },
    });
  };

  // ====================================================================
  // PAGES['seo.ranks'] :: DENSE LIST (full-bleed) - keyword rank tracker
  // ====================================================================
  window.PAGES['seo.ranks'] = function () {
    const s = S();
    const improved = s.ranks.filter(r => r.change > 0).length;
    const top10 = s.ranks.filter(r => r.rank <= 10).length;
    const avg = (s.ranks.reduce((a, r) => a + r.rank, 0) / s.ranks.length).toFixed(1);

    const header = `<div class="px-7 pt-7 pb-0">
      ${LX.modHead({
        title: 'Rank tracking',
        sub: s.kpis.keywords.toLocaleString() + ' keywords tracked across the book - ' + s.ranks.length + ' priority terms shown, ' + improved + ' improved this month.',
        stats: [
          { k: 'Avg rank', v: avg },
          { k: 'Top 10', v: top10 + ' / ' + s.ranks.length },
          { k: 'Improved', v: improved },
          { k: 'Declined', v: s.ranks.filter(r => r.change < 0).length },
        ],
        actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
          ${UI.btn('Add keywords', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="Add keywords" data-body="Paste keywords to track, one per line, and assign a client."`)}`,
      })}
      ${subNav('seo.ranks')}
      <div class="toolbar" style="margin-bottom:0">
        ${UI.searchInput('Search keywords', 'w-72')}
        ${LX.segmented([
          { id: 'all', label: 'All' }, { id: 'lumen', label: 'Lumen' }, { id: 'atlas', label: 'Atlas' },
          { id: 'northedge', label: 'NorthEdge' }, { id: 'casaverde', label: 'Casa Verde' },
          { id: 'verdant', label: 'Verdant' }, { id: 'peak', label: 'Peak' },
        ])}
        <div class="grow"></div>
        ${UI.btn('Sort', { variant: 'ghost', size: 'sm', icon: 'arrow-up-down' }).replace('<button', `<button data-action="menu" data-menu='["Best rank","Biggest gain","Biggest drop","Volume"]'`)}
      </div></div>`;

    function rowsFor(filter) {
      return s.ranks.filter(r => filter === 'all' ? true : r.client === filter);
    }
    function listFor(filter) {
      return LX.dataList({
        cls: 'tight',
        columns: [
          { key: 'keyword', label: 'Keyword', render: (r) => `
            <div class="flex items-center gap-2.5">
              <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:280px">${r.keyword}</span>
              ${intentTag(r.intent)}
            </div>` },
          { key: 'client', label: 'Client', render: (r) => clientCell(r.client) },
          { key: 'rank', label: 'Rank', align: 'r', mono: true, render: (r) => `<span class="text-1 font-semibold">#${r.rank}</span>` },
          { key: 'change', label: 'Change', align: 'r', mono: true, render: (r) => changeCell(r.change) },
          { key: 'volume', label: 'Volume', align: 'r', mono: true, render: (r) => `<span class="text-2">${r.volume.toLocaleString()}</span>` },
          { key: 'kd', label: 'KD', align: 'r', mono: true, render: (r) => `<span class="${kdCls(r.kd)}">${r.kd}</span>` },
          { key: 'url', label: 'URL', render: (r) => `<code class="mono text-[10.5px] text-3 px-1.5 py-0.5 rounded" style="background:var(--bg-3)">${r.url}</code>` },
          { key: 'trend', label: 'Trend', align: 'r', width: '110px', render: (r) => {
              const col = r.change > 0 ? 'var(--acc)' : r.change < 0 ? 'var(--red)' : 'var(--text-3)';
              // invert rank so a better (lower) rank plots higher
              return `<span class="cell-spark">${sparkSvg(r.spark.map(v => 21 - v), col, 88, 22)}</span>`;
            } },
        ],
        rows: rowsFor(filter),
        rowAttrs: (r) => `data-action="detail" data-title="${esc(r.keyword)}" data-sub="${esc(clientName(r.client))} - ${esc(r.url)}" data-kv='[["Current rank","#${r.rank}"],["Change","${r.change > 0 ? '+' : ''}${r.change}"],["Volume","${r.volume.toLocaleString()}/mo"],["Difficulty","${r.kd}"],["Intent","${cap(r.intent)}"],["URL","${esc(r.url)}"]]'`,
      });
    }

    const filters = ['all', 'lumen', 'atlas', 'northedge', 'casaverde', 'verdant', 'peak'];
    const panes = filters.map((f, i) =>
      `<div data-pane="${f}" class="${i === 0 ? '' : 'hidden'}">${listFor(f)}</div>`).join('');

    return `<div class="flex flex-col" style="height:calc(100vh - 44px)">
      <div data-tabwrap class="flex flex-col min-h-0 flex-1">
        ${header}
        <div class="flex-1 overflow-auto" style="margin-top:10px">${panes}</div>
      </div>
    </div>`;
  };

  // ====================================================================
  // PAGES['seo.local'] :: MAP GRID (full-bleed) - geo heatmap
  // ====================================================================
  window.PAGES['seo.local'] = function () {
    const s = S();
    const active = (window.STATE.params && window.STATE.params.grid) || s.gridScenarios[0].id;
    const g = s.gridScenarios.find(x => x.id === active) || s.gridScenarios[0];
    const valid = g.cells.filter(v => v != null);
    const avgRank = (valid.reduce((a, v) => a + v, 0) / valid.length).toFixed(1);
    const top3 = valid.filter(v => v <= 3).length;
    const notRanking = g.cells.filter(v => v == null).length;
    const gc = window.getClient(g.client) || {};

    const header = `<div class="px-7 pt-7 pb-0">
      ${LX.modHead({
        title: 'Local grid',
        sub: 'Geo rank heatmap - share of local voice across a ' + g.size + ' by ' + g.size + ' scan grid, ' + g.location + '.',
        stats: [
          { k: 'Avg rank in grid', v: avgRank },
          { k: 'Share of voice', v: g.solv + '%', delta: g.solvDelta, deltaUnit: 'pp' },
          { k: 'Top 3 cells', v: top3 + ' / ' + valid.length },
          { k: 'Scan radius', v: g.radiusKm + ' km' },
        ],
        actions: `${UI.btn('Rescan grid', { variant: 'secondary', size: 'sm', icon: 'refresh-cw' }).replace('<button', `<button data-action="confirm" data-toast="Grid scan queued"`)}
          ${UI.btn('Export map', { variant: 'primary', size: 'sm', icon: 'download' })}`,
      })}
      ${subNav('seo.local')}</div>`;

    // scenario selector rail
    const scenarioBtns = s.gridScenarios.map(sc => {
      const on = sc.id === g.id;
      const c = window.getClient(sc.client) || {};
      return `<button class="w-full text-left px-3 py-2.5 rounded-lg mb-1.5 ${on ? '' : 'surface-hover'}"
          style="${on ? 'background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)' : ''}"
          onclick="navigate('seo.local',{grid:'${sc.id}'})">
        <div class="flex items-center gap-2 mb-1">
          <span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(sc.client)}"></span>
          <span class="text-[12px] ${on ? 'text-1 font-medium' : 'text-2'} truncate">${c.name || sc.client}</span>
        </div>
        <div class="text-[11px] ${on ? 'text-2' : 'text-3'} truncate">${sc.keyword}</div>
        <div class="text-[10px] text-3 mt-0.5 num">${sc.location} - SoV ${sc.solv}%</div>
      </button>`;
    }).join('');

    // the heat grid
    const cells = g.cells.map((rank, idx) => {
      if (rank == null) {
        return `<div class="heat-cell" style="background:var(--bg-3);color:var(--text-4)" data-tooltip="Scan point ${idx + 1} - not in top 20">-</div>`;
      }
      const hc = heatColor(rank);
      return `<div class="heat-cell" style="background:${hc.bg};color:${hc.text}" data-tooltip="Scan point ${idx + 1} - rank #${rank}">${rank}</div>`;
    }).join('');

    const gridBlock = `
      <div class="panel">
        <div class="panel-head">
          <div class="flex items-center gap-2 min-w-0">
            <i data-lucide="crosshair" class="size-3.5 text-2 shrink-0"></i>
            <div class="panel-title truncate">"${g.keyword}"</div>
            <span class="status status-green text-[10px]">${gc.name || g.client}</span>
          </div>
          <span class="text-[10.5px] text-3 num">scanned ${shortDate(g.scannedAt)}</span>
        </div>
        <div class="panel-body">
          <div class="mx-auto" style="max-width:520px">
            <div class="grid gap-2" style="grid-template-columns:repeat(${g.size}, 1fr)">${cells}</div>
            <div class="flex items-center justify-between mt-4 text-[10px] text-3">
              <span class="flex items-center gap-1.5"><span class="size-2.5 rounded-sm" style="background:${heatColor(2).bg}"></span>Top 3</span>
              <span class="flex items-center gap-1.5"><span class="size-2.5 rounded-sm" style="background:${heatColor(8).bg}"></span>4 - 10</span>
              <span class="flex items-center gap-1.5"><span class="size-2.5 rounded-sm" style="background:${heatColor(16).bg}"></span>11 - 20</span>
              <span class="flex items-center gap-1.5"><span class="size-2.5 rounded-sm" style="background:var(--bg-3)"></span>20+</span>
            </div>
          </div>
        </div>
      </div>`;

    // readout aside
    const readout = `
      <div class="flex flex-col gap-3.5">
        ${LX.panel({
          title: 'Grid readout',
          body: `<div class="space-y-3.5">
            <div>
              <div class="eyebrow mb-1">Avg rank in grid</div>
              <div class="flex items-baseline gap-2"><span class="num text-[26px] font-semibold text-1 leading-none">${avgRank}</span><span class="text-[11px] text-3">stronger at center</span></div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-1"><span class="eyebrow">Share of local voice</span><span class="num text-[10.5px] ${g.solvDelta < 0 ? 'text-red' : 'text-acc'}">${g.solvDelta >= 0 ? '&uarr;' : '&darr;'} ${Math.abs(g.solvDelta)}pp</span></div>
              <div class="flex items-baseline gap-2 mb-1.5"><span class="num text-[20px] font-semibold text-1 leading-none">${g.solv}%</span></div>
              ${LX.bar(g.solv, 'var(--sky)')}
            </div>
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div><div class="eyebrow mb-1">Top 3 cells</div><div class="num text-[16px] font-semibold text-acc leading-none">${top3}</div></div>
              <div><div class="eyebrow mb-1">Not ranking</div><div class="num text-[16px] font-semibold ${notRanking > 0 ? 'text-red' : 'text-2'} leading-none">${notRanking}</div></div>
            </div>
          </div>`,
        })}
        ${LX.panel({
          title: 'Recommendation',
          body: `<p class="text-[11.5px] text-2 leading-relaxed">${g.note}</p>
            <div class="flex items-center gap-1.5 mt-3" onclick="event.stopPropagation()">
              <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Sent to approval queue" data-dismiss="1"><span>Send to queue</span></button>
              <button class="btn btn-ghost btn-sm" data-action="navigate" data-route="seo.gaps"><span>Content gaps</span></button>
            </div>`,
        })}
      </div>`;

    return `<div class="flex flex-col" style="min-height:calc(100vh - 44px)">
      ${header}
      <div class="px-7 pb-7" style="margin-top:6px">
        <div class="grid grid-cols-12 gap-3.5">
          <div class="col-span-12 lg:col-span-3">
            <div class="eyebrow mb-2 px-1">Scan scenarios</div>
            ${scenarioBtns}
          </div>
          <div class="col-span-12 lg:col-span-6">${gridBlock}</div>
          <div class="col-span-12 lg:col-span-3">${readout}</div>
        </div>
      </div>
    </div>`;
  };

  // ====================================================================
  // PAGES['seo.audit'] :: ISSUES LIST - health panels + dense issues
  // ====================================================================
  window.PAGES['seo.audit'] = function () {
    const s = S(); const h = s.health;
    const open = s.audit.filter(a => a.status !== 'resolved');
    const sevCount = (sv) => open.filter(a => a.severity === sv).length;
    const sevOrder = { red: 0, amber: 1, sky: 2 };
    const sorted = [...s.audit].sort((a, b) => sevOrder[a.severity] - sevOrder[b.severity]);

    const header = LX.modHead({
      title: 'Site audit',
      sub: 'On-page, technical and Core Web Vitals issues across the portfolio - ' + open.length + ' open, ' + sevCount('red') + ' critical.',
      stats: [
        { k: 'Health score', v: h.overall, delta: h.overallDelta, deltaUnit: '' },
        { k: 'Critical', v: sevCount('red') },
        { k: 'Warnings', v: sevCount('amber') },
        { k: 'Info', v: sevCount('sky') },
      ],
      actions: `${UI.btn('Re-crawl', { variant: 'secondary', size: 'sm', icon: 'refresh-cw' }).replace('<button', `<button data-action="confirm" data-toast="Crawl started"`)}
        ${UI.btn('Export report', { variant: 'primary', size: 'sm', icon: 'download' })}`,
    });

    // health-score panels (category rings + CWV)
    const catPanel = LX.panel({
      title: 'Category scores',
      bare: true,
      body: h.categories.map(c => {
        const col = c.score >= 80 ? 'var(--acc)' : c.score >= 65 ? 'var(--amber)' : 'var(--red)';
        const good = c.delta >= 0;
        return `<div class="flex items-center gap-3 px-3.5 py-3" style="border-top:1px solid var(--line-1)">
          <div class="shrink-0">${scoreRing(c.score, col, 34)}</div>
          <div class="flex-1 min-w-0"><div class="text-[12.5px] text-1 font-medium">${c.label}</div><div class="text-[10.5px] num ${good ? 'delta-up' : 'delta-down'}">${good ? '&uarr;' : '&darr;'} ${Math.abs(c.delta)} pts</div></div>
        </div>`;
      }).join(''),
    });

    const cwvPanel = LX.panel({
      title: 'Core Web Vitals',
      actions: `<span class="text-[10.5px] text-3">field data, p75</span>`,
      bare: true,
      body: h.cwv.map(m => `
        <div class="flex items-center gap-3 px-3.5 py-3" style="border-top:1px solid var(--line-1)">
          <span class="status status-${m.status} shrink-0"></span>
          <div class="flex-1 min-w-0">
            <div class="text-[12px] text-1 font-medium">${m.metric} <span class="text-3 font-normal">- ${m.label}</span></div>
            <div class="text-[10.5px] text-3 num">good: ${m.good}</div>
          </div>
          <span class="num text-[14px] font-semibold ${m.status === 'green' ? 'text-acc' : m.status === 'amber' ? 'text-amber' : 'text-red'}">${m.value}</span>
        </div>`).join(''),
    });

    // dense issues list
    const sevDot = (sv) => sv === 'red' ? 'red' : sv === 'amber' ? 'amber' : 'sky';
    const catTag = (c) => `<span class="tag tag-slate" style="font-size:10px;padding:1px 6px">${cap(c)}</span>`;
    const statusTag = (st) => st === 'resolved' ? `<span class="tag tag-acc" style="font-size:10px;padding:1px 7px">Resolved</span>`
      : st === 'in_progress' ? `<span class="tag tag-sky" style="font-size:10px;padding:1px 7px">In progress</span>`
      : `<span class="tag tag-slate" style="font-size:10px;padding:1px 7px">Open</span>`;

    const issuesList = LX.dataList({
      columns: [
        { key: 'issue', label: 'Issue', render: (a) => `
          <div class="flex items-center gap-2.5">
            <span class="status status-${sevDot(a.severity)} shrink-0" title="${a.severity === 'red' ? 'Critical' : a.severity === 'amber' ? 'Warning' : 'Info'}"></span>
            <div class="min-w-0">
              <div class="text-[12.5px] text-1 font-medium truncate ${a.status === 'resolved' ? 'line-through text-3' : ''}" style="max-width:320px">${a.issue}</div>
              <code class="mono text-[10px] text-3">${a.page}</code>
            </div>
          </div>` },
        { key: 'category', label: 'Category', render: (a) => catTag(a.category) },
        { key: 'client', label: 'Client', render: (a) => clientCell(a.client) },
        { key: 'pages', label: 'Pages', align: 'r', mono: true, render: (a) => `<span class="text-2">${a.pages}</span>` },
        { key: 'status', label: 'Status', render: (a) => statusTag(a.status) },
        { key: 'action', label: 'Action', align: 'r', width: '160px', render: (a) => `<div class="flex items-center gap-1 justify-end" onclick="event.stopPropagation()">
            ${a.status === 'resolved'
              ? `<span class="text-[11px] text-3">done</span>`
              : a.fix
                ? `<button class="btn btn-secondary btn-sm" data-action="confirm" data-toast="Fix queued"><span>Apply fix</span></button>`
                : `<button class="btn btn-ghost btn-sm" data-action="modal" data-title="Assign issue" data-body="Assign this issue to a specialist."><span>Assign</span></button>`}
          </div>` },
      ],
      rows: sorted,
      rowAttrs: (a) => `data-action="detail" data-title="${esc(a.issue)}" data-sub="${esc(clientName(a.client))} - ${esc(a.page)}" data-kv='[["Severity","${a.severity === 'red' ? 'Critical' : a.severity === 'amber' ? 'Warning' : 'Info'}"],["Category","${cap(a.category)}"],["Pages affected","${a.pages}"],["Status","${cap(a.status.replace('_',' '))}"],["Suggested fix","${a.fix ? esc(a.fix) : 'None proposed'}"]]'`,
    });

    return `${header}${subNav('seo.audit')}
      <div class="grid grid-cols-12 gap-3.5 mb-3.5">
        <div class="col-span-12 lg:col-span-6">${catPanel}</div>
        <div class="col-span-12 lg:col-span-6">${cwvPanel}</div>
      </div>
      ${LX.panel({ title: 'Open issues', actions: `<span class="text-[10.5px] text-3 num">${s.audit.length} total</span>`, bare: true, body: issuesList })}`;
  };

  // ====================================================================
  // PAGES['seo.backlinks'] :: DENSE LIST (full-bleed) - backlink profile
  // ====================================================================
  window.PAGES['seo.backlinks'] = function () {
    const s = S(); const bp = s.backlinkProfile;
    const newCount = s.backlinks.filter(b => b.event === 'new').length;
    const lostCount = s.backlinks.filter(b => b.event === 'lost').length;
    const toxicCount = s.backlinks.filter(b => b.toxic).length;

    const header = `<div class="px-7 pt-7 pb-0">
      ${LX.modHead({
        title: 'Backlinks',
        sub: bp.referringDomains.toLocaleString() + ' referring domains - ' + s.backlinks.length + ' recent changes shown, ' + toxicCount + ' toxic flagged for disavow.',
        stats: [
          { k: 'Referring domains', v: bp.referringDomains.toLocaleString(), delta: bp.referringDelta, deltaUnit: '' },
          { k: 'New (30d)', v: '+' + bp.newLinks },
          { k: 'Lost (30d)', v: '-' + bp.lostLinks },
          { k: 'Dofollow', v: bp.dofollow + '%' },
        ],
        actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
          ${UI.btn('Disavow toxic', { variant: 'primary', size: 'sm', icon: 'shield-x' }).replace('<button', `<button data-action="confirm" data-toast="${toxicCount} domains queued to disavow"`)}`,
      })}
      ${subNav('seo.backlinks')}
      <div class="toolbar" style="margin-bottom:0">
        ${UI.searchInput('Search domains', 'w-72')}
        ${LX.segmented([
          { id: 'all', label: 'All' }, { id: 'new', label: 'New' },
          { id: 'lost', label: 'Lost' }, { id: 'active', label: 'Active' }, { id: 'toxic', label: 'Toxic' },
        ])}
        <div class="grow"></div>
        ${UI.btn('Type', { variant: 'ghost', size: 'sm', icon: 'filter' }).replace('<button', `<button data-action="menu" data-menu='["All types","Dofollow","Nofollow","Toxic"]'`)}
      </div></div>`;

    const drCls = (dr) => dr >= 70 ? 'text-acc' : dr < 20 ? 'text-red' : 'text-2';
    const typeTag = (t) => t === 'dofollow' ? `<span class="tag tag-acc" style="font-size:10px;padding:1px 6px">Dofollow</span>`
      : t === 'nofollow' ? `<span class="tag tag-slate" style="font-size:10px;padding:1px 6px">Nofollow</span>`
      : `<span class="tag tag-red" style="font-size:10px;padding:1px 6px">Toxic</span>`;
    const eventTag = (e) => e === 'new' ? `<span class="tag tag-acc" style="font-size:10px;padding:1px 7px">New</span>`
      : e === 'lost' ? `<span class="tag tag-red" style="font-size:10px;padding:1px 7px">Lost</span>`
      : `<span class="tag tag-slate" style="font-size:10px;padding:1px 7px">Active</span>`;

    function rowsFor(filter) {
      if (filter === 'all') return s.backlinks;
      if (filter === 'toxic') return s.backlinks.filter(b => b.toxic);
      return s.backlinks.filter(b => b.event === filter);
    }
    function listFor(filter) {
      return LX.dataList({
        cls: 'tight',
        columns: [
          { key: 'domain', label: 'Referring domain', render: (b) => `
            <div class="flex items-center gap-2.5">
              ${b.toxic ? `<i data-lucide="triangle-alert" class="size-3 text-red shrink-0"></i>` : `<span class="size-1.5 rounded-full shrink-0" style="background:${b.event === 'lost' ? 'var(--red)' : 'var(--acc)'}"></span>`}
              <span class="text-[12.5px] font-medium ${b.event === 'lost' ? 'line-through text-3' : 'text-1'} truncate" style="max-width:220px">${b.domain}</span>
            </div>` },
          { key: 'dr', label: 'DR', align: 'r', mono: true, render: (b) => `<span class="${drCls(b.dr)} font-medium">${b.dr}</span>` },
          { key: 'anchor', label: 'Anchor', render: (b) => `<span class="text-[11.5px] text-2 truncate" style="display:inline-block;max-width:200px">"${b.anchor}"</span>` },
          { key: 'type', label: 'Type', render: (b) => typeTag(b.type) },
          { key: 'client', label: 'Client', render: (b) => clientCell(b.client) },
          { key: 'firstSeen', label: 'First seen', align: 'r', mono: true, render: (b) => `<span class="text-3 text-[11px]">${shortDate(daysAgo(b.days))}</span>` },
          { key: 'event', label: 'Status', align: 'r', render: (b) => eventTag(b.event) },
        ],
        rows: rowsFor(filter),
        rowAttrs: (b) => `data-action="detail" data-title="${esc(b.domain)}" data-sub="${esc(clientName(b.client))} - DR ${b.dr}" data-kv='[["Domain rating","${b.dr}"],["Type","${cap(b.type)}"],["Anchor","${esc(b.anchor)}"],["Client","${esc(clientName(b.client))}"],["First seen","${shortDate(daysAgo(b.days))}"],["Status","${cap(b.event)}"]]'`,
      });
    }

    const filters = ['all', 'new', 'lost', 'active', 'toxic'];
    const panes = filters.map((f, i) =>
      `<div data-pane="${f}" class="${i === 0 ? '' : 'hidden'}">${listFor(f)}</div>`).join('');

    return `<div class="flex flex-col" style="height:calc(100vh - 44px)">
      <div data-tabwrap class="flex flex-col min-h-0 flex-1">
        ${header}
        <div class="flex-1 overflow-auto" style="margin-top:10px">${panes}</div>
      </div>
    </div>`;
  };

  // ====================================================================
  // PAGES['seo.gaps'] :: DENSE LIST - content gaps, create brief
  // ====================================================================
  window.PAGES['seo.gaps'] = function () {
    const s = S();
    const totalVol = s.contentGaps.reduce((a, g) => a + g.volume, 0);
    const noPage = s.contentGaps.filter(g => g.yourRank == null).length;

    const header = LX.modHead({
      title: 'Content gaps',
      sub: 'Keywords competitors rank for and we do not - ' + s.contentGaps.length + ' opportunities, ' + noPage + ' with no page yet.',
      stats: [
        { k: 'Opportunities', v: s.contentGaps.length },
        { k: 'No page yet', v: noPage },
        { k: 'Total volume', v: (totalVol / 1000).toFixed(1) + 'K' },
        { k: 'Top opp score', v: Math.max(...s.contentGaps.map(g => g.opp)) },
      ],
      actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
        ${UI.btn('Send top 5 to content', { variant: 'primary', size: 'sm', icon: 'file-text' }).replace('<button', `<button data-action="navigate" data-route="content"`)}`,
    });

    const oppCls = (o) => o >= 80 ? 'var(--acc)' : o >= 60 ? 'var(--sky)' : 'var(--amber)';
    const sorted = [...s.contentGaps].sort((a, b) => b.opp - a.opp);

    const list = LX.dataList({
      columns: [
        { key: 'keyword', label: 'Keyword', render: (g) => `
          <div class="flex items-center gap-2.5">
            <span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(g.client)}"></span>
            <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:280px">${g.keyword}</span>
          </div>` },
        { key: 'client', label: 'Client', render: (g) => clientCell(g.client) },
        { key: 'yourRank', label: 'Your rank', align: 'r', mono: true, render: (g) => g.yourRank == null ? `<span class="text-red">not ranking</span>` : `<span class="text-2">#${g.yourRank}</span>` },
        { key: 'compRank', label: 'Top competitor', align: 'r', render: (g) => `<div class="text-right"><span class="num text-[12.5px] text-1 font-medium">#${g.compRank}</span><div class="text-[10px] text-3 truncate" style="max-width:110px;margin-left:auto">${g.compName}</div></div>` },
        { key: 'volume', label: 'Volume', align: 'r', mono: true, render: (g) => `<span class="text-2">${g.volume.toLocaleString()}</span>` },
        { key: 'difficulty', label: 'KD', align: 'r', mono: true, render: (g) => `<span class="${kdCls(g.difficulty)}">${g.difficulty}</span>` },
        { key: 'opp', label: 'Opportunity', align: 'r', width: '150px', render: (g) => {
            const col = oppCls(g.opp);
            return `<div class="flex items-center gap-2 justify-end">
              <div style="width:70px">${LX.bar(g.opp, col)}</div>
              <span class="num text-[11px] text-1 font-medium w-7 text-right">${g.opp}</span></div>`;
          } },
        { key: 'action', label: 'Action', align: 'r', width: '150px', render: (g) => `<div class="flex items-center gap-1 justify-end" onclick="event.stopPropagation()">
            <button class="btn btn-secondary btn-sm" data-action="navigate" data-route="content"><span>Create brief</span></button>
          </div>` },
      ],
      rows: sorted,
      rowAttrs: (g) => `data-action="detail" data-title="${esc(g.keyword)}" data-sub="${esc(clientName(g.client))} - opportunity ${g.opp}" data-kv='[["Your rank","${g.yourRank == null ? 'Not ranking' : '#' + g.yourRank}"],["Top competitor","#${g.compRank} (${esc(g.compName)})"],["Volume","${g.volume.toLocaleString()}/mo"],["Difficulty","${g.difficulty}"],["CPC","${formatMoney(g.cpcUsd)}"],["Opportunity score","${g.opp}"]]'`,
    });

    return `${header}${subNav('seo.gaps')}
      ${LX.panel({ title: 'Opportunities, ranked', actions: `<span class="text-[10.5px] text-3">Send a row to content to spin up a brief</span>`, bare: true, body: list })}`;
  };

})();
