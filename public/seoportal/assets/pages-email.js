/* ============================================================
   Email & SMS macro - hub + dense micro sub-modules.
   Each sub-module is its assigned archetype, structurally
   distinct from its siblings:
     email                :: CONSOLE      (panel grid + stat rail)
     email.campaigns      :: DENSE LIST   (full-bleed)
     email.flows          :: FLOW LIST    (step-chain diagrams)
     email.audiences      :: DENSE LIST   + segment builder
     email.deliverability :: CONSOLE      (reputation + auth + placement)
   Deliverability is the wedge against all-in-one tools like
   GoHighLevel. Suggestions are proposed; the team approves.
   ============================================================ */

window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};
window.FULLBLEED = window.FULLBLEED || new Set();
window.FULLBLEED.add('email.campaigns');

(function () {
  const E = () => window.EMAIL;

  const clientName = (id) => (window.getClient(id) || {}).name || id;
  const clientColor = (id) => (window.getClient(id) || {}).logoColor || '#10b981';
  const clientIcon = (id) => (window.getClient(id) || {}).icon || 'circle';
  const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');
  const k1 = (n) => n >= 1000 ? Math.round(n / 1000) + 'k' : '' + n;
  const fmtSize = (n) => n >= 1000000 ? (n / 1000000).toFixed(1) + 'M' : n >= 1000 ? (n / 1000).toFixed(1) + 'k' : '' + n;

  const typeLabel = (t) => t === 'sms' ? 'SMS' : 'Email';
  const statusMeta = (s) => s === 'sent' ? { dot: 'green', label: 'Sent' } : s === 'scheduled' ? { dot: 'sky', label: 'Scheduled' } : { dot: 'slate', label: 'Draft' };

  // client dot + name cell
  const clientCell = (id) => `<span class="flex items-center gap-2"><span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(id)}"></span><span class="text-[12px] text-2 truncate">${clientName(id)}</span></span>`;

  // sub-nav strip shared across the macro
  function subNav(active) {
    const items = [
      { id: 'email',                label: 'Overview' },
      { id: 'email.campaigns',      label: 'Campaigns' },
      { id: 'email.flows',          label: 'Flows' },
      { id: 'email.audiences',      label: 'Audiences' },
      { id: 'email.deliverability', label: 'Deliverability' },
    ];
    return `<div class="flex items-center gap-1 mb-5 -mt-1 flex-wrap">${items.map(it =>
      `<button class="px-2.5 py-1 rounded-md text-[12px] font-medium ${it.id === active ? 'text-1' : 'text-3 hover:text-1'}" ${it.id === active ? 'style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"' : ''} data-action="navigate" data-route="${it.id}">${it.label}</button>`
    ).join('')}</div>`;
  }

  // ====================================================================
  // PAGES.email :: CONSOLE - performance monitor wall
  // ====================================================================
  window.PAGES.email = function () {
    const e = E(); const k = e.kpis;

    const header = LX.modHead({
      title: 'Email & SMS',
      sub: 'Klaviyo, Mailchimp and Twilio across 6 clients - ' + window.AGENCY.period + ', month to date.',
      stats: [
        { k: 'Sends MTD',      v: k1(k.sends),                 delta: k.sendsDelta, deltaUnit: '%' },
        { k: 'Open rate',      v: k.openRate.toFixed(0) + '%', delta: k.openDelta, deltaUnit: 'pt' },
        { k: 'Click rate',     v: k.clickRate.toFixed(1) + '%', delta: k.clickDelta, deltaUnit: 'pt' },
        { k: 'Revenue attr.',  v: formatMoney(k.revenueUsd),   delta: k.revenueDelta, deltaUnit: '%' },
        { k: 'Deliverability', v: k.deliverability + '/100',   delta: k.deliverabilityDelta, deltaUnit: 'pt' },
      ],
      actions: `
        ${UI.btn('This month', { variant: 'secondary', size: 'sm', icon: 'calendar' }).replace('<button', `<button data-action="menu" data-menu='["Last 7 days","Last 30 days","This quarter"]'`)}
        ${UI.btn('New campaign', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="navigate" data-route="email.campaigns"`)}`,
    });

    // Panel 1 - revenue attribution chart
    const trendPanel = LX.panel({
      title: 'Revenue attribution',
      actions: `<div class="flex items-center gap-3 text-[10.5px]">
          <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Email</span>
          <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--violet)"></span>SMS</span>
          <span class="text-3 num">7 weeks</span>
        </div>`,
      body: `<div style="height:212px"><canvas id="email-attr-chart" height="212"></canvas></div>`,
    });

    // Panel 2 - top campaigns mini-list (sent only, by value)
    const sent = e.campaigns.filter(c => c.status === 'sent');
    const top = sent.slice().sort((a, b) => {
      const av = a.metric === 'revenue' ? a.value : a.value * 120;
      const bv = b.metric === 'revenue' ? b.value : b.value * 120;
      return bv - av;
    }).slice(0, 7);
    const topMax = Math.max(...top.map(c => c.metric === 'revenue' ? c.value : c.value * 120));
    const topRows = top.map(c => {
      const w = (c.metric === 'revenue' ? c.value : c.value * 120) / topMax * 100;
      const val = c.metric === 'revenue' ? formatMoney(c.value) : c.value + ' conv';
      return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)"
          data-action="detail" data-title="${esc(c.name)}" data-sub="${esc(clientName(c.client))} - ${typeLabel(c.type)} campaign"
          data-kv='[["Client","${esc(clientName(c.client))}"],["Channel","${typeLabel(c.type)}"],["Sent","${c.sent.toLocaleString()}"],["Result","${val}"]]'>
        <div class="w-[150px] shrink-0 flex items-center gap-2">
          <span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(c.client)}"></span>
          <span class="text-[12px] text-1 font-medium truncate">${c.name}</span>
        </div>
        <div class="flex-1">${LX.bar(w, c.type === 'sms' ? 'var(--violet)' : 'var(--acc)')}</div>
        <span class="text-[10px] text-4 uppercase tracking-wide w-9 text-right">${typeLabel(c.type)}</span>
        <span class="num text-[12px] text-1 w-16 text-right">${val}</span>
      </div>`;
    }).join('');
    const topPanel = LX.panel({
      title: 'Top campaigns',
      actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="email.campaigns">All campaigns &rarr;</button>`,
      bare: true,
      body: `<div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
          <div class="w-[150px] shrink-0">Campaign</div><div class="flex-1">Result share</div>
          <div class="w-9 text-right">Type</div><div class="w-16 text-right">Result</div>
        </div>${topRows}`,
    });

    // Panel 3 - SMS vs email economics
    const cs = e.channelSplit;
    const splitRow = (label, ev, sv, betterSms) => `
      <div class="grid grid-cols-3 items-center px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <span class="text-[11.5px] text-2">${label}</span>
        <span class="text-right text-[12px] num ${!betterSms ? 'text-acc' : 'text-1'}">${ev}</span>
        <span class="text-right text-[12px] num ${betterSms ? 'text-acc' : 'text-1'}">${sv}</span>
      </div>`;
    const splitPanel = LX.panel({
      title: 'SMS vs email',
      actions: `<span class="text-[10.5px] text-3">channel economics MTD</span>`,
      bare: true,
      body: `<div class="grid grid-cols-3 items-center px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
          <span>Metric</span>
          <span class="text-right flex items-center justify-end gap-1.5"><i data-lucide="mail" class="size-3 text-acc"></i>Email</span>
          <span class="text-right flex items-center justify-end gap-1.5"><i data-lucide="message-square" class="size-3 text-violet"></i>SMS</span>
        </div>
        ${splitRow('Sends', k1(cs.email.sends), k1(cs.sms.sends), false)}
        ${splitRow('Click rate', cs.email.clickRate.toFixed(1) + '%', cs.sms.clickRate.toFixed(1) + '%', true)}
        ${splitRow('Revenue', formatMoney(cs.email.revenueUsd), formatMoney(cs.sms.revenueUsd), false)}
        ${splitRow('Send cost', formatMoney(cs.email.costUsd), formatMoney(cs.sms.costUsd), false)}
        ${splitRow('Rev / send', '$' + cs.email.revPerSend.toFixed(3), '$' + cs.sms.revPerSend.toFixed(3), false)}`,
    });

    // Panel 4 - deliverability gauge
    const d = e.deliverability;
    const gMetric = (label, value, good) => `
      <div class="flex items-center justify-between py-1.5" style="border-top:1px solid var(--line-1)">
        <span class="text-[11px] text-2">${label}</span>
        <span class="text-[12px] num ${good === false ? 'text-amber' : good === true ? 'text-acc' : 'text-1'}">${value}</span>
      </div>`;
    const gaugePanel = LX.panel({
      title: 'Deliverability',
      actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="email.deliverability">Deep dive &rarr;</button>`,
      body: `<div class="flex items-center gap-4">
        ${scoreRing(d.score, d.score >= 95 ? 'var(--acc)' : 'var(--amber)', 72)}
        <div class="flex-1">
          ${gMetric('Inbox placement', d.inboxPlacement.toFixed(1) + '%', true)}
          ${gMetric('Bounce rate', d.bounceRate.toFixed(1) + '%', true)}
          ${gMetric('Spam complaints', d.spamRate.toFixed(2) + '%', d.spamRate < 0.1)}
          ${gMetric('Sender score', d.senderScore + '/100', true)}
        </div>
      </div>
      <div class="flex items-start gap-2.5 mt-3 p-2.5 rounded-lg" style="background:var(--acc-soft);box-shadow:inset 0 0 0 1px var(--acc-line)">
        <i data-lucide="shield-check" class="size-3.5 text-acc-bright mt-0.5 shrink-0"></i>
        <div class="text-[10.5px] text-2 leading-snug"><span class="text-acc-bright font-medium">Our edge.</span> 96% inbox placement vs an industry ~83%. We monitor SPF, DKIM and DMARC per domain - where all-in-one tools are weakest.</div>
      </div>`,
    });

    // Panel 5 - recommendations digest (the one quiet agent affordance)
    const a = e.recommendations;
    const recsPanel = `
      <div class="panel" style="box-shadow:inset 0 0 0 1px var(--line-1);border-top:2px solid var(--acc)">
        <div class="panel-head">
          <div class="flex items-center gap-2 min-w-0">
            <i data-lucide="sparkles" class="size-3.5 text-acc-bright shrink-0"></i>
            <div class="panel-title truncate">Suggestions for review</div>
            <span class="status status-acc text-[10px]">2 pending</span>
          </div>
          <button class="text-[11px] text-acc-bright font-medium" data-action="navigate" data-route="approvals">Queue &rarr;</button>
        </div>
        <div class="px-3.5 py-3" style="border-top:1px solid var(--line-1)"
             data-action="detail" data-title="Send-time adjustment" data-sub="${esc(clientName(a.sendTime.client))}"
             data-kv='[["From","${a.sendTime.from}"],["To","${a.sendTime.to}"],["Projected lift","+${a.sendTime.lift}% open"]]'>
          <div class="flex items-center gap-2 mb-1">
            <i data-lucide="clock" class="size-3 text-2"></i>
            <span class="text-[12px] font-medium text-1">Send-time adjustment</span>
            <span class="text-[10.5px] text-3 ml-auto">${clientName(a.sendTime.client)}</span>
          </div>
          <div class="text-[11px] text-2 leading-snug mb-2">${a.sendTime.reason}</div>
          <div class="flex items-center gap-2 text-[11.5px] mb-2.5">
            <span class="text-3 num">${a.sendTime.from}</span><span class="text-4">&rarr;</span>
            <span class="text-1 font-medium num">${a.sendTime.to}</span>
            <span class="tag tag-acc" style="font-size:10px;padding:1px 6px">+${a.sendTime.lift}% open</span>
          </div>
          <div class="flex items-center gap-1.5" onclick="event.stopPropagation()">
            <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Send time applied for the next 3 sends" data-dismiss="1"><span>Apply</span></button>
            <button class="btn btn-ghost btn-sm" data-action="dismiss"><span>Dismiss</span></button>
          </div>
        </div>
        <div class="px-3.5 py-3" style="border-top:1px solid var(--line-1)"
             data-action="detail" data-title="Re-engagement flow drafted" data-sub="${esc(clientName(a.reengage.client))}"
             data-kv='[["Segment","${esc(a.reengage.segment)}"],["Size","${a.reengage.size.toLocaleString()}"],["Projected recovery","${formatMoney(a.reengage.recoverUsd)}"]]'>
          <div class="flex items-center gap-2 mb-1">
            <i data-lucide="mail-plus" class="size-3 text-2"></i>
            <span class="text-[12px] font-medium text-1">Re-engagement flow drafted</span>
            <span class="text-[10.5px] text-3 ml-auto">${clientName(a.reengage.client)}</span>
          </div>
          <div class="text-[11px] text-2 leading-snug mb-2">${a.reengage.body}</div>
          <div class="flex items-center gap-2 mb-2.5">
            <span class="num text-[12px] text-acc-bright">${formatMoney(a.reengage.recoverUsd)}</span>
            <span class="text-[10.5px] text-3">projected recovery from Decaying VIP 90d</span>
          </div>
          <div class="flex items-center gap-1.5" onclick="event.stopPropagation()">
            <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Re-engagement flow queued" data-dismiss="1"><span>Approve and queue</span></button>
            <button class="btn btn-ghost btn-sm" data-action="navigate" data-route="email.flows"><span>Edit draft</span></button>
          </div>
        </div>
      </div>`;

    return `${header}${subNav('email')}
      <div class="grid grid-cols-12 gap-3.5">
        <div class="col-span-12 lg:col-span-8 flex flex-col gap-3.5">
          ${trendPanel}
          ${topPanel}
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
            ${splitPanel}
            ${gaugePanel}
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4 flex flex-col gap-3.5">
          ${recsPanel}
        </div>
      </div>`;
  };

  window.PAGES_AFTER.email = function () {
    const A = E().attribution;
    CHARTS.line('email-attr-chart', A.weeks, [
      { label: 'Email', data: A.email, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.10)' },
      { label: 'SMS',   data: A.sms,   borderColor: '#a78bfa', backgroundColor: 'rgba(167,139,250,0.08)' },
    ], {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }, border: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 }, callback: (v) => '$' + (v / 1000) + 'k' }, border: { display: false } },
      },
    });
  };

  // ====================================================================
  // PAGES['email.campaigns'] :: DENSE LIST (full-bleed)
  // ====================================================================
  window.PAGES['email.campaigns'] = function () {
    const e = E();
    const sent = e.campaigns.filter(c => c.status === 'sent');
    const revTotal = sent.filter(c => c.metric === 'revenue').reduce((s, c) => s + c.value, 0);
    const convTotal = sent.filter(c => c.metric === 'conv').reduce((s, c) => s + c.value, 0);

    const header = `<div class="px-7 pt-7 pb-0">
      ${LX.modHead({
        title: 'Campaigns',
        sub: e.campaigns.length + ' campaigns this cycle - ' + sent.length + ' sent, email and SMS across the book.',
        stats: [
          { k: 'Sent', v: sent.length },
          { k: 'Revenue', v: formatMoney(revTotal) },
          { k: 'Conversions', v: convTotal.toLocaleString() },
          { k: 'Scheduled', v: e.campaigns.filter(c => c.status === 'scheduled').length },
          { k: 'Drafts', v: e.campaigns.filter(c => c.status === 'draft').length },
        ],
        actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
          ${UI.btn('New campaign', { variant: 'primary', size: 'sm', icon: 'plus' })}`,
      })}
      ${subNav('email.campaigns')}
      <div class="toolbar" style="margin-bottom:0">
        ${UI.searchInput('Search campaigns', 'w-72')}
        ${LX.segmented([
          { id: 'all', label: 'All' }, { id: 'email', label: 'Email' }, { id: 'sms', label: 'SMS' },
        ])}
        <div class="grow"></div>
        ${UI.btn('Status', { variant: 'ghost', size: 'sm', icon: 'sliders-horizontal' }).replace('<button', `<button data-action="menu" data-menu='["All status","Sent","Scheduled","Draft"]'`)}
      </div></div>`;

    function rowsFor(filter) {
      return e.campaigns.filter(c => filter === 'all' ? true : c.type === filter);
    }
    function listFor(filter) {
      return LX.dataList({
        columns: [
          { key: 'name', label: 'Campaign', render: (c) => {
              const m = statusMeta(c.status);
              return `<div class="flex items-center gap-2.5">
                <span class="status status-${m.dot}" title="${m.label}"></span>
                <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:300px">${c.name}</span>
              </div>`; } },
          { key: 'client', label: 'Client', render: (c) => clientCell(c.client) },
          { key: 'type', label: 'Type', render: (c) => `<span class="tag ${c.type === 'sms' ? 'tag-violet' : 'tag-acc'}" style="font-size:10px;padding:1px 7px">${typeLabel(c.type)}</span>` },
          { key: 'sent', label: 'Sent', align: 'r', mono: true, render: (c) => `<span class="text-1">${c.sent ? c.sent.toLocaleString() : '-'}</span>` },
          { key: 'openRate', label: 'Open', align: 'r', mono: true, render: (c) => c.type === 'sms' || c.openRate === 0 ? `<span class="text-4">-</span>` : `<span class="text-2">${c.openRate.toFixed(1)}%</span>` },
          { key: 'clickRate', label: 'Click', align: 'r', mono: true, render: (c) => c.clickRate ? `<span class="text-2">${c.clickRate.toFixed(1)}%</span>` : `<span class="text-4">-</span>` },
          { key: 'value', label: 'Revenue / conv', align: 'r', mono: true, render: (c) => {
              if (c.status !== 'sent') return `<span class="text-4">-</span>`;
              return c.metric === 'revenue' ? `<span class="text-acc-bright font-medium">${formatMoney(c.value)}</span>` : `<span class="text-1">${c.value} conv</span>`; } },
          { key: 'status', label: 'Status', render: (c) => { const m = statusMeta(c.status); return `<span class="status status-${m.dot}">${m.label}</span>`; } },
          { key: 'date', label: 'Date', align: 'r', mono: true, render: (c) => `<span class="text-3 text-[11px]">${c.status === 'sent' ? shortDate(daysAgo(c.days)) : shortDate(daysAhead(-c.days))}</span>` },
        ],
        rows: rowsFor(filter),
        rowAttrs: (c) => {
          const m = statusMeta(c.status);
          const result = c.status === 'sent' ? (c.metric === 'revenue' ? formatMoney(c.value) : c.value + ' conv') : 'pending';
          return `data-action="detail" data-title="${esc(c.name)}" data-sub="${esc(clientName(c.client))} - ${typeLabel(c.type)} campaign" data-kv='[["Client","${esc(clientName(c.client))}"],["Channel","${typeLabel(c.type)}"],["Sent","${c.sent.toLocaleString()}"],["Open rate","${c.openRate ? c.openRate.toFixed(1) + '%' : 'n/a'}"],["Click rate","${c.clickRate ? c.clickRate.toFixed(1) + '%' : 'n/a'}"],["Result","${result}"],["Status","${m.label}"]]'`;
        },
      });
    }

    const panes = ['all', 'email', 'sms'].map((f, i) =>
      `<div data-pane="${f}" class="${i === 0 ? '' : 'hidden'}">${listFor(f)}</div>`).join('');

    return `<div class="flex flex-col" style="height:calc(100vh - 44px)">
      <div data-tabwrap class="flex flex-col min-h-0 flex-1">
        ${header}
        <div class="flex-1 overflow-auto" style="margin-top:10px">${panes}</div>
      </div>
    </div>`;
  };

  // ====================================================================
  // PAGES['email.flows'] :: FLOW LIST + step-chain DIAGRAM
  // ====================================================================
  window.PAGES['email.flows'] = function () {
    const e = E();
    const active = e.flows.filter(f => f.active);
    const totalEnrolled = e.flows.reduce((s, f) => s + f.enrolled, 0);
    const totalRev = e.flows.reduce((s, f) => s + f.revenueUsd, 0);

    const kindMeta = {
      welcome:    { icon: 'hand', color: 'var(--acc)' },
      cart:       { icon: 'shopping-cart', color: 'var(--violet)' },
      winback:    { icon: 'undo-2', color: 'var(--amber)' },
      nurture:    { icon: 'sprout', color: 'var(--sky)' },
      onboarding: { icon: 'rocket', color: 'var(--acc)' },
    };

    const header = LX.modHead({
      title: 'Flows',
      sub: e.flows.length + ' automation flows - ' + active.length + ' live, ' + totalEnrolled.toLocaleString() + ' enrolled across the book.',
      stats: [
        { k: 'Flows', v: e.flows.length },
        { k: 'Live', v: active.length },
        { k: 'Enrolled', v: totalEnrolled.toLocaleString() },
        { k: 'Revenue MTD', v: formatMoney(totalRev) },
      ],
      actions: `${UI.btn('Templates', { variant: 'secondary', size: 'sm', icon: 'layout-template' })}
        ${UI.btn('New flow', { variant: 'primary', size: 'sm', icon: 'plus' })}`,
    });

    // step-chain node + connector
    const stepNode = (st) => {
      const isSms = st.type === 'sms';
      const col = isSms ? 'var(--violet)' : 'var(--sky)';
      return `<div class="shrink-0 rounded-lg px-3 py-2" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1);min-width:118px">
        <div class="flex items-center gap-1.5 mb-1">
          <i data-lucide="${isSms ? 'message-square' : 'mail'}" class="size-3" style="color:${col}"></i>
          <span class="text-[11px] text-1 font-medium truncate">${st.label}</span>
        </div>
        <div class="flex items-center justify-between gap-2">
          <span class="text-[9.5px] text-4 uppercase tracking-wide">${st.delay}</span>
          <span class="num text-[10.5px] ${st.convPct >= 8 ? 'text-acc-bright' : 'text-3'}">${st.convPct.toFixed(1)}%</span>
        </div>
        <div class="mt-1">${LX.bar(Math.min(st.convPct * 4, 100), st.convPct >= 8 ? 'var(--acc)' : 'var(--text-3)')}</div>
      </div>`;
    };
    const connector = `<i data-lucide="chevron-right" class="size-3.5 text-4 shrink-0 mx-1.5"></i>`;
    const triggerNode = (label) => `<div class="shrink-0 rounded-lg px-3 py-2 flex items-center gap-1.5" style="background:var(--acc-soft);box-shadow:inset 0 0 0 1px var(--acc-line);min-width:118px">
      <i data-lucide="zap" class="size-3 text-acc-bright"></i>
      <div><div class="eyebrow" style="color:var(--acc-bright)">Trigger</div><div class="text-[11px] text-1 font-medium leading-tight">${label}</div></div>
    </div>`;

    const flowCard = (f) => {
      const m = kindMeta[f.kind] || kindMeta.nurture;
      const chain = f.steps.map((st, i) => `${i === 0 ? '' : connector}${stepNode(st)}`).join('');
      return `<div class="panel" style="box-shadow:inset 0 0 0 1px var(--line-1)"
          data-action="detail" data-title="${esc(f.name)}" data-sub="${esc(clientName(f.client))} - ${f.steps.length}-step flow"
          data-kv='[["Client","${esc(clientName(f.client))}"],["Trigger","${esc(f.trigger)}"],["Enrolled","${f.enrolled.toLocaleString()}"],["Conversion","${f.convRate.toFixed(1)}%"],["Revenue MTD","${formatMoney(f.revenueUsd)}"],["State","${f.active ? 'Live' : 'Paused'}"]]'>
        <div class="panel-head">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="size-7 rounded-md flex items-center justify-center shrink-0" style="background:${m.color}1f;box-shadow:inset 0 0 0 1px ${m.color}55"><i data-lucide="${m.icon}" class="size-3.5" style="color:${m.color}"></i></span>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-[13px] text-1 font-semibold truncate">${f.name}</span>
                <span class="status status-${f.active ? 'green' : 'slate'} text-[10px]">${f.active ? 'Live' : 'Paused'}</span>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="size-1.5 rounded-full" style="background:${clientColor(f.client)}"></span>
                <span class="text-[10.5px] text-3">${clientName(f.client)}</span>
                <span class="text-[10px] text-4">/</span>
                <span class="text-[10.5px] text-3">Trigger: ${f.trigger}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-5 shrink-0" onclick="event.stopPropagation()">
            <div class="text-right"><div class="eyebrow mb-0.5">Enrolled</div><div class="num text-[13px] text-1 font-semibold">${f.enrolled.toLocaleString()}</div></div>
            <div class="text-right"><div class="eyebrow mb-0.5">Conv</div><div class="num text-[13px] font-semibold ${f.convRate >= 15 ? 'text-acc-bright' : 'text-1'}">${f.convRate.toFixed(1)}%</div></div>
            <div class="text-right"><div class="eyebrow mb-0.5">Revenue</div><div class="num text-[13px] text-acc-bright font-semibold">${f.revenueUsd ? formatMoney(f.revenueUsd) : '-'}</div></div>
            <button class="btn btn-ghost btn-sm" data-action="menu" data-menu='["Edit flow","Duplicate","Pause"]'><i data-lucide="ellipsis" class="size-3.5"></i></button>
          </div>
        </div>
        <div class="panel-body">
          <div class="flex items-center overflow-x-auto pb-1">
            ${triggerNode(f.trigger)}${connector}${chain}${connector}
            <div class="shrink-0 rounded-lg px-3 py-2 flex items-center gap-1.5" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
              <i data-lucide="flag" class="size-3 text-3"></i><span class="text-[11px] text-3">Exit</span>
            </div>
          </div>
        </div>
      </div>`;
    };

    return `${header}${subNav('email.flows')}
      <div class="flex flex-col gap-3.5">${e.flows.map(flowCard).join('')}</div>`;
  };

  // ====================================================================
  // PAGES['email.audiences'] :: DENSE LIST + segment builder
  // ====================================================================
  window.PAGES['email.audiences'] = function () {
    const e = E();
    const totalSize = e.segments.reduce((s, x) => s + x.size, 0);
    const engaged = e.segments.reduce((s, x) => s + x.engagement * x.size, 0) / totalSize;

    const header = LX.modHead({
      title: 'Audiences',
      sub: e.segments.length + ' segments across the book - ' + fmtSize(totalSize) + ' total reachable, ' + engaged.toFixed(0) + '% engaged.',
      stats: [
        { k: 'Segments', v: e.segments.length },
        { k: 'Reachable', v: fmtSize(totalSize) },
        { k: 'Avg engaged', v: engaged.toFixed(0) + '%' },
        { k: 'Decaying', v: e.segments.filter(s => s.trend === 'down').length },
      ],
      actions: `${UI.btn('Sync lists', { variant: 'secondary', size: 'sm', icon: 'refresh-cw' })}
        ${UI.btn('Build segment', { variant: 'primary', size: 'sm', icon: 'plus' })}`,
    });

    const trendCell = (t) => t === 'up'
      ? '<i data-lucide="trending-up" class="size-3.5 text-acc-bright"></i>'
      : t === 'down' ? '<i data-lucide="trending-down" class="size-3.5 text-red"></i>'
      : '<i data-lucide="minus" class="size-3.5 text-3"></i>';

    const list = LX.dataList({
      columns: [
        { key: 'name', label: 'Segment', render: (s) => {
            const flag = s.name === 'Decaying VIP 90d';
            return `<div class="flex items-center gap-2.5">
              <span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(s.client)}"></span>
              <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:230px">${s.name}</span>
              ${flag ? `<span class="tag tag-amber" style="font-size:9.5px;padding:1px 6px">re-engage drafted</span>` : ''}
            </div>`; } },
        { key: 'client', label: 'Client', render: (s) => clientCell(s.client) },
        { key: 'size', label: 'Size', align: 'r', mono: true, render: (s) => `<span class="text-1">${s.size.toLocaleString()}</span>` },
        { key: 'engagement', label: 'Engagement', align: 'r', width: '150px', render: (s) => {
            const col = s.engagement >= 50 ? 'var(--acc)' : s.engagement >= 25 ? 'var(--amber)' : 'var(--red)';
            return `<div class="flex items-center gap-2 justify-end">
              <div style="width:70px">${LX.bar(s.engagement, col)}</div>
              <span class="num text-[11px] w-9 text-right" style="color:${col}">${s.engagement.toFixed(0)}%</span></div>`; } },
        { key: 'openRate', label: 'Open', align: 'r', mono: true, render: (s) => `<span class="text-2">${s.openRate.toFixed(1)}%</span>` },
        { key: 'revPerRecipient', label: 'Rev / recip', align: 'r', mono: true, render: (s) => s.revPerRecipient > 0 ? `<span class="${s.revPerRecipient >= 1 ? 'text-acc-bright' : 'text-2'}">$${s.revPerRecipient.toFixed(2)}</span>` : `<span class="text-4">-</span>` },
        { key: 'growth', label: 'Growth', align: 'r', mono: true, render: (s) => `<span class="${s.growth > 0 ? 'delta-up' : s.growth < 0 ? 'delta-down' : 'text-3'}">${s.growth > 0 ? '&uarr;' : s.growth < 0 ? '&darr;' : ''} ${Math.abs(s.growth).toFixed(1)}%</span>` },
        { key: 'lastCampaign', label: 'Last campaign', render: (s) => `<span class="text-[11.5px] text-3 truncate" style="display:inline-block;max-width:170px">${s.lastCampaign}</span>` },
        { key: 'trend', label: 'Trend', align: 'r', render: (s) => trendCell(s.trend) },
      ],
      rows: e.segments,
      rowAttrs: (s) => `data-action="detail" data-title="${esc(s.name)}" data-sub="${esc(clientName(s.client))} - list segment" data-kv='[["Client","${esc(clientName(s.client))}"],["Size","${s.size.toLocaleString()}"],["Engagement","${s.engagement.toFixed(1)}%"],["Open rate","${s.openRate.toFixed(1)}%"],["Rev / recipient","$${s.revPerRecipient.toFixed(2)}"],["Growth","${s.growth.toFixed(1)}%"],["Last campaign","${esc(s.lastCampaign)}"]]'`,
    });

    // segment builder panel
    const ruleRow = (r) => `<div class="flex items-center gap-2.5 px-3 py-2 rounded-lg" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
      <i data-lucide="${r.icon}" class="size-3.5 text-2 shrink-0"></i>
      <span class="text-[11.5px] text-1 font-medium">${r.field}</span>
      <span class="text-[11px] text-3">${r.op}</span>
      <span class="text-[11.5px] text-1 num">${r.value}</span>
      <button class="ml-auto text-3 hover:text-1" data-action="dismiss"><i data-lucide="x" class="size-3.5"></i></button>
    </div>`;
    const matched = 4120;
    const builderPanel = LX.panel({
      title: 'Segment builder',
      actions: `<span class="text-[10.5px] text-3">match ALL conditions</span>`,
      body: `<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 flex flex-col gap-2">
          ${e.segmentRules.map((r, i) => `${i > 0 ? '<div class="flex items-center gap-2 pl-3"><span class="text-[10px] text-4 uppercase tracking-wide">and</span></div>' : ''}${ruleRow(r)}`).join('')}
          <button class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11.5px] text-3 hover:text-1 mt-0.5" style="border:1px dashed var(--line-2)" data-action="modal" data-title="Add condition" data-body="Add a targeting rule to the segment.">
            <i data-lucide="plus" class="size-3.5"></i><span>Add condition</span>
          </button>
        </div>
        <div class="rounded-lg p-4 flex flex-col justify-center" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
          <div class="eyebrow mb-1">Estimated reach</div>
          <div class="num text-1" style="font-size:30px;letter-spacing:-0.02em">${matched.toLocaleString()}</div>
          <div class="text-[11px] text-3 mt-1">profiles match all 4 conditions</div>
          <div class="flex items-center gap-1.5 mt-3.5">
            <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Segment saved"><span>Save segment</span></button>
            <button class="btn btn-ghost btn-sm" data-action="navigate" data-route="email.campaigns"><span>Send to</span></button>
          </div>
        </div>
      </div>`,
    });

    return `${header}${subNav('email.audiences')}
      <div class="flex flex-col gap-3.5">
        ${list}
        ${builderPanel}
      </div>`;
  };

  // ====================================================================
  // PAGES['email.deliverability'] :: CONSOLE
  // ====================================================================
  window.PAGES['email.deliverability'] = function () {
    const e = E(); const d = e.deliverability;

    const header = LX.modHead({
      title: 'Deliverability',
      sub: 'Domain reputation, inbox placement and SPF / DKIM / DMARC posture across 6 sending domains.',
      stats: [
        { k: 'Inbox placement', v: d.inboxPlacement.toFixed(1) + '%' },
        { k: 'Sender score', v: d.senderScore + '/100' },
        { k: 'Bounce rate', v: d.bounceRate.toFixed(1) + '%' },
        { k: 'Spam complaints', v: d.spamRate.toFixed(2) + '%' },
        { k: 'Blocklisted', v: d.blocklisted },
      ],
      actions: `${UI.btn('Run seed test', { variant: 'secondary', size: 'sm', icon: 'beaker' }).replace('<button', `<button data-action="confirm" data-toast="Seed-list test queued"`)}
        ${UI.btn('Postmaster', { variant: 'primary', size: 'sm', icon: 'external-link' })}`,
    });

    // Panel 1 - reputation gauges (scoreRing + bars)
    const repGauge = (label, value, color) => `<div class="flex flex-col items-center text-center px-2">
      ${scoreRing(value, color, 64)}
      <div class="eyebrow mt-2">${label}</div>
    </div>`;
    const repBar = (label, raw, display, max, good) => `<div class="px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[11.5px] text-2">${label}</span>
        <span class="text-[12px] num ${good === false ? 'text-amber' : 'text-acc'}">${display}</span>
      </div>
      ${LX.bar(raw / max * 100, good === false ? 'var(--amber)' : 'var(--acc)')}
    </div>`;
    const reputationPanel = LX.panel({
      title: 'Domain reputation',
      actions: `<span class="status status-acc text-[10px]">${d.domainRep}</span>`,
      bare: true,
      body: `<div class="flex items-center justify-around py-4" style="border-bottom:1px solid var(--line-1)">
          ${repGauge('Deliverability', d.score, d.score >= 95 ? 'var(--acc)' : 'var(--amber)')}
          ${repGauge('Inbox', Math.round(d.inboxPlacement), 'var(--acc)')}
          ${repGauge('Sender', d.senderScore, 'var(--acc)')}
        </div>
        ${repBar('Inbox placement', d.inboxPlacement, d.inboxPlacement.toFixed(1) + '%', 100, true)}
        ${repBar('Bounce rate', d.bounceRate, d.bounceRate.toFixed(1) + '%', 5, true)}
        ${repBar('Spam complaints', d.spamRate, d.spamRate.toFixed(2) + '%', 0.5, d.spamRate < 0.1)}
        ${repBar('Unsubscribe rate', d.unsubRate, d.unsubRate.toFixed(2) + '%', 1, true)}`,
    });

    // Panel 2 - placement trend chart
    const trendPanel = LX.panel({
      title: 'Placement trend',
      actions: `<div class="flex items-center gap-3 text-[10.5px]">
          <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Inbox %</span>
          <span class="text-3 num">7 weeks</span>
        </div>`,
      body: `<div style="height:178px"><canvas id="email-deliv-chart" height="178"></canvas></div>`,
    });

    // Panel 3 - SPF/DKIM/DMARC auth status (dense list inside a panel)
    const authBadge = (v) => v === 'pass'
      ? `<span class="status status-green text-[11px]">Pass</span>`
      : v === 'warn' ? `<span class="status status-amber text-[11px]">Warn</span>`
      : `<span class="status status-red text-[11px]">Fail</span>`;
    const authList = LX.dataList({
      columns: [
        { key: 'domain', label: 'Sending domain', render: (r) => `<div class="flex items-center gap-2.5">
            <span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(r.client)}"></span>
            <div><div class="text-[12px] text-1">${clientName(r.client)}</div><div class="num text-[10.5px] text-3 mt-0.5">${r.domain}</div></div>
          </div>` },
        { key: 'spf', label: 'SPF', align: 'r', render: (r) => authBadge(r.spf) },
        { key: 'dkim', label: 'DKIM', align: 'r', render: (r) => authBadge(r.dkim) },
        { key: 'dmarc', label: 'DMARC', align: 'r', render: (r) => authBadge(r.dmarc) },
        { key: 'dmarcPolicy', label: 'Policy', align: 'r', mono: true, render: (r) => `<span class="text-3 text-[10.5px]">${r.dmarcPolicy}</span>` },
        { key: 'reputation', label: 'Reputation', align: 'r', render: (r) => `<span class="text-[11px] ${r.reputation === 'Low' ? 'text-red' : r.reputation === 'Medium' ? 'text-amber' : 'text-2'}">${r.reputation}</span>` },
      ],
      rows: d.auth,
      cls: 'tight',
      rowAttrs: (r) => `data-action="detail" data-title="${esc(r.domain)}" data-sub="${esc(clientName(r.client))} - sending domain auth" data-kv='[["SPF","${r.spf}"],["DKIM","${r.dkim}"],["DMARC","${r.dmarc}"],["Policy","${r.dmarcPolicy}"],["Reputation","${r.reputation}"],["Note","${esc(r.note)}"]]'`,
    });
    const authPanel = LX.panel({
      title: 'Authentication (SPF / DKIM / DMARC)',
      actions: `<span class="text-[10.5px] text-3">${d.auth.filter(a => a.dmarc !== 'pass').length} need attention</span>`,
      bare: true,
      body: authList,
    });

    // Panel 4 - inbox placement by provider (dense list)
    const provList = LX.dataList({
      columns: [
        { key: 'provider', label: 'Provider', render: (p) => `<div class="flex items-center gap-2.5">
            <i data-lucide="mail" class="size-3.5" style="color:${p.status === 'amber' ? 'var(--amber)' : 'var(--acc)'}"></i>
            <span class="text-[12px] text-1 font-medium">${p.provider}</span></div>` },
        { key: 'share', label: 'Vol share', align: 'r', mono: true, render: (p) => `<span class="text-3">${p.share.toFixed(1)}%</span>` },
        { key: 'inbox', label: 'Inbox', align: 'r', width: '150px', render: (p) => `<div class="flex items-center gap-2 justify-end">
            <div style="width:70px">${LX.bar(p.inbox, p.status === 'amber' ? 'var(--amber)' : 'var(--acc)')}</div>
            <span class="num text-[11px] w-12 text-right ${p.status === 'amber' ? 'text-amber' : 'text-acc-bright'}">${p.inbox.toFixed(1)}%</span></div>` },
        { key: 'spam', label: 'Spam', align: 'r', mono: true, render: (p) => `<span class="${p.spam > 3 ? 'text-amber' : 'text-2'}">${p.spam.toFixed(1)}%</span>` },
        { key: 'missing', label: 'Missing', align: 'r', mono: true, render: (p) => `<span class="text-3">${p.missing.toFixed(1)}%</span>` },
      ],
      rows: d.byProvider,
      cls: 'tight',
      rowAttrs: (p) => `data-action="detail" data-title="${esc(p.provider)} placement" data-sub="Seed-list panel, last 7 days" data-kv='[["Volume share","${p.share.toFixed(1)}%"],["Inbox","${p.inbox.toFixed(1)}%"],["Spam","${p.spam.toFixed(1)}%"],["Missing","${p.missing.toFixed(1)}%"]]'`,
    });
    const provPanel = LX.panel({
      title: 'Inbox placement by provider',
      actions: `<span class="text-[10.5px] text-3">seed list, last 7 days</span>`,
      bare: true,
      body: provList,
    });

    // Panel 5 - urgent fix (Atlas DKIM/DMARC failing)
    const atlas = d.auth.find(a => a.client === 'atlas');
    const fixPanel = `<div class="panel" style="box-shadow:inset 0 0 0 1px var(--line-1);border-top:2px solid var(--red)">
      <div class="panel-head">
        <div class="flex items-center gap-2 min-w-0">
          <i data-lucide="triangle-alert" class="size-3.5 text-red shrink-0"></i>
          <div class="panel-title truncate">Authentication failing</div>
          <span class="status status-red text-[10px]">urgent</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="size-1.5 rounded-full" style="background:${clientColor('atlas')}"></span>
          <span class="text-[12px] text-1 font-medium">${clientName('atlas')}</span>
          <span class="num text-[11px] text-3">${atlas.domain}</span>
        </div>
        <p class="text-[11.5px] text-2 leading-relaxed">${atlas.note}. DKIM and DMARC are failing, placement has dropped to ${d.byClient.find(c => c.client === 'atlas').placement.toFixed(1)}%. Re-publish the DKIM CNAME and move DMARC off <span class="num">p=none</span> to restore reputation.</p>
        <div class="flex items-center gap-1.5 mt-3" onclick="event.stopPropagation()">
          <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Re-auth task created for Atlas" data-dismiss="1"><span>Create fix task</span></button>
          <button class="btn btn-ghost btn-sm" data-action="modal" data-title="DKIM record" data-body="CNAME: ml._domainkey.atlasstorage.com -> dkim.sendgrid.net"><span>View record</span></button>
        </div>
      </div>
    </div>`;

    return `${header}${subNav('email.deliverability')}
      <div class="grid grid-cols-12 gap-3.5">
        <div class="col-span-12 lg:col-span-4 flex flex-col gap-3.5">
          ${reputationPanel}
        </div>
        <div class="col-span-12 lg:col-span-8 flex flex-col gap-3.5">
          ${trendPanel}
          ${authPanel}
        </div>
      </div>
      <div class="grid grid-cols-12 gap-3.5 mt-3.5">
        <div class="col-span-12 lg:col-span-8">${provPanel}</div>
        <div class="col-span-12 lg:col-span-4">${fixPanel}</div>
      </div>`;
  };

  window.PAGES_AFTER['email.deliverability'] = function () {
    const t = E().deliverability.trend;
    CHARTS.line('email-deliv-chart', t.weeks, [
      { label: 'Inbox %', data: t.placement, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.10)' },
    ], {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }, border: { display: false } },
        y: { min: 90, max: 100, grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 }, callback: (v) => v + '%' }, border: { display: false } },
      },
    });
  };

})();
