/* ============================================================
   Settings - the agency's own account. TABBED PANELS archetype.
   In-view segmented tabs (LX.segmented inside LX.tabwrap) switch
   between five panes: Integrations, Plan & usage, Billing,
   White-label, Security. Each pane uses LX.modHead (inline stat
   rail) + dense lists / console panels - NOT a grid of glossy
   cards. Integrations is a dense connection list with status
   pills. Plan carries the automation-spend governance meter.
   Billing carries the dense client-invoicing ledger.
   Non-self-wrapped: returns inner HTML (router pads it).
   ============================================================ */

window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};

window.PAGES.settings = function () {
  const S = window.SETTINGS;
  const A = window.AGENCY;
  const money = (n) => formatMoney(n);
  const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');

  // ---- shared bits ----------------------------------------------------
  const statusPill = (st) =>
    st === 'connected' ? UI.pill('Connected', 'green')
    : st === 'action'  ? UI.pill('Action needed', 'amber')
    : UI.pill('Disconnected', 'slate');

  const clientDotColor = (status) =>
    status === 'critical' ? 'var(--red)' : status === 'at_risk' ? 'var(--amber)' : 'var(--acc)';

  const groupColor = {
    'Paid Ads': '#f59e0b', 'Social': '#a78bfa', 'SEO': '#38bdf8',
    'Analytics': '#10b981', 'Email': '#6366f1', 'Reputation': '#f43f5e',
    'E-commerce': '#38bdf8', 'Content': '#10b981', 'Billing': '#a78bfa',
  };

  const ints = window.INTEGRATIONS;
  const meta = S.intMeta;
  const connected = ints.filter(i => i.status === 'connected').length;
  const needAttention = ints.filter(i => i.status !== 'connected');
  const totalAccounts = ints.reduce((a, i) => a + i.accounts, 0);

  const p = S.plan;
  const u = S.aiUsage;
  const usedPct = Math.round((u.spent / u.budget) * 100);
  const meterColor = usedPct >= 90 ? 'var(--red)' : usedPct >= 75 ? 'var(--amber)' : 'var(--acc)';

  // ===================================================================
  //  PANE: INTEGRATIONS  - dense connection list + console panels
  // ===================================================================
  const groupDot = (g) => `<span class="size-2 rounded-sm shrink-0" style="background:${groupColor[g] || 'var(--acc)'}"></span>`;
  const ownerOf = (id) => { const m = meta[id]; const t = m && getTeam(m.owner); return t ? t : null; };

  // attention strip - connections that need a human action, as a tight panel
  const attentionRows = needAttention.map(i => {
    const m = meta[i.id] || {};
    const fix = i.status === 'disconnected'
      ? { verb: 'Connect', why: 'Never connected - the reporting pipeline is missing this source.' }
      : i.lastSync === 'rate-limited'
        ? { verb: 'Resolve', why: 'API rate-limited. Backing off to a 15-minute poll until the window clears.' }
        : { verb: 'Reauth', why: 'OAuth token expired. A re-auth request is queued for the workspace owner.' };
    return `
      <div class="flex items-center gap-3 px-3.5 py-3" style="border-top:1px solid var(--line-1)">
        <div class="size-7 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-4)">
          <i data-lucide="${i.icon}" class="size-3.5 text-amber"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="text-[12.5px] font-medium text-1">${i.name}</span>
            <span class="text-[10.5px] text-3">${i.group} &middot; <span class="num">${m.errors || 0}</span> sync errors</span>
          </div>
          <div class="text-[11.5px] text-2 leading-snug mt-0.5">${fix.why}</div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="${esc(i.name)} reconnect queued"><span>${fix.verb}</span></button>
          <button class="btn btn-ghost btn-sm" data-action="dismiss"><span>Dismiss</span></button>
        </div>
      </div>`;
  }).join('');

  const attentionPanel = needAttention.length ? LX.panel({
    title: needAttention.length + ' connections need attention',
    actions: `<span class="status status-amber text-[11px]">${needAttention.length} of ${ints.length}</span>`,
    bare: true,
    cls: 'mb-3.5',
    body: attentionRows,
  }) : '';

  // dense connection list - the core of this pane
  const intToolbar = LX.toolbar({
    left: `${UI.searchInput('Search integrations', 'w-72')}
      ${LX.segmented([
        { id: 'all', label: 'All' }, { id: 'connected', label: 'Connected' },
        { id: 'action', label: 'Needs action' },
      ])}`,
    right: `${UI.btn('Browse marketplace', { variant: 'secondary', size: 'sm', icon: 'shopping-bag', onClick: "toast('Integration marketplace - 60+ connectors')" })}
      ${UI.btn('Add connection', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="Add connection"`)}`,
  });

  const scopePill = (scope) => {
    if (scope === 'read + write') return `<span class="text-[11px] text-2">Read + write</span>`;
    if (scope === 'read only')   return `<span class="text-[11px] text-3">Read only</span>`;
    if (scope === 'expired')     return `<span class="text-[11px] text-red">Token expired</span>`;
    if (scope === 'rate-limited')return `<span class="text-[11px] text-amber">Rate-limited</span>`;
    return `<span class="text-[11px] text-4">No grant</span>`;
  };

  function intRowsFor(filter) {
    return ints.filter(i => filter === 'all' ? true
      : filter === 'connected' ? i.status === 'connected'
      : i.status !== 'connected');
  }

  function intListFor(filter) {
    return LX.dataList({
      cls: 'tight',
      columns: [
        { key: 'name', label: 'Connection', render: (i) => `
          <div class="flex items-center gap-2.5">
            <div class="size-7 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)">
              <i data-lucide="${i.icon}" class="size-3.5" style="color:${groupColor[i.group] || 'var(--acc)'}"></i>
            </div>
            <div class="min-w-0">
              <div class="text-[12.5px] text-1 font-medium truncate">${i.name}</div>
              <div class="text-[10.5px] text-3 truncate">${(meta[i.id] || {}).feeds || i.group}</div>
            </div>
          </div>` },
        { key: 'group', label: 'Category', render: (i) => `<span class="flex items-center gap-1.5 text-[12px] text-2">${groupDot(i.group)}${i.group}</span>` },
        { key: 'accounts', label: 'Accounts', align: 'r', mono: true, render: (i) => `<span class="text-1 font-medium">${i.accounts}</span>` },
        { key: 'scope', label: 'Scope', render: (i) => scopePill((meta[i.id] || {}).scope) },
        { key: 'health', label: 'Health', width: '130px', render: (i) => {
            const h = (meta[i.id] || {}).health || 0;
            const col = h >= 95 ? 'var(--acc)' : h >= 80 ? 'var(--amber)' : 'var(--red)';
            return `<div class="flex items-center gap-2"><div style="width:60px">${LX.bar(h, col)}</div><span class="num text-[11px] text-3 w-7 text-right">${h}%</span></div>`;
          } },
        { key: 'owner', label: 'Owner', render: (i) => {
            const t = ownerOf(i.id);
            return t ? `<span class="flex items-center gap-2">${UI.avatar(t.name, t.avatarColor, 18)}<span class="text-[12px] text-2">${t.name.split(' ')[0]}</span></span>` : `<span class="text-4">-</span>`;
          } },
        { key: 'status', label: 'Status', align: 'r', render: (i) => statusPill(i.status) },
        { key: 'sync', label: 'Last sync', align: 'r', mono: true, render: (i) => `<span class="${i.status === 'connected' ? 'text-3' : 'text-amber'}">${i.lastSync}</span>` },
      ],
      rows: intRowsFor(filter),
      rowAttrs: (i) => {
        const m = meta[i.id] || {};
        const t = ownerOf(i.id);
        return `data-action="detail" data-title="${esc(i.name)}" data-sub="${esc(i.group)} integration - ${i.accounts} ${i.accounts === 1 ? 'account' : 'accounts'}" data-kv='[["Status","${i.status === 'connected' ? 'Connected' : i.status === 'action' ? 'Action needed' : 'Disconnected'}"],["Accounts","${i.accounts}"],["Scope","${m.scope || 'none'}"],["Feeds","${esc(m.feeds || i.group)}"],["Health","${m.health || 0}%"],["Sync errors","${m.errors || 0}"],["Owner","${t ? esc(t.name) : 'Unassigned'}"],["Last sync","${esc(i.lastSync)}"]]'`;
      },
    });
  }

  const intPanes = ['all', 'connected', 'action'].map((f, i) =>
    `<div data-pane="${f}" class="${i === 0 ? '' : 'hidden'}">${intListFor(f)}</div>`).join('');

  const intPane = `
    <div data-pane="int">
      ${LX.modHead({
        title: 'Integrations',
        sub: connected + ' of ' + ints.length + ' connectors live across ' + totalAccounts + ' linked accounts. Every source feeds reporting and the automation layer.',
        stats: [
          { k: 'Connected', v: connected },
          { k: 'Linked accounts', v: totalAccounts },
          { k: 'Needs action', v: needAttention.length },
          { k: 'Categories', v: Object.keys(groupColor).length },
        ],
      })}
      ${attentionPanel}
      <div data-tabwrap>
        ${intToolbar}
        <div style="margin-top:4px">${intPanes}</div>
      </div>
    </div>`;

  // ===================================================================
  //  PANE: PLAN & USAGE  - plan summary + automation-spend governance
  // ===================================================================
  const channelMax = Math.max(...u.byChannel.map(x => x.usd));
  const actionMax = Math.max(...u.topActions.map(a => a.usd));
  const breakerPct = Math.round((u.breaker / u.budget) * 100);

  // plan panel - dense definition list, no glossy card
  const planRow = (k, v, sub) => `
    <div class="flex items-center justify-between px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
      <div class="text-[12px] text-2">${k}</div>
      <div class="text-right"><span class="text-[12.5px] num text-1 font-medium">${v}</span>${sub ? `<span class="text-[10.5px] text-3 ml-1.5">${sub}</span>` : ''}</div>
    </div>`;
  const planPanel = LX.panel({
    title: 'Subscription',
    actions: UI.btn('Manage plan', { variant: 'ghost', size: 'sm', icon: 'settings-2' }),
    bare: true,
    body: `
      <div class="px-3.5 pt-3.5 pb-3 flex items-baseline gap-2">
        <span class="text-[19px] font-semibold text-1 tracking-tight">${p.name}</span>
        <span class="num text-[13px] text-3">${money(p.priceUsd)} / mo</span>
      </div>
      <div class="px-3.5 pb-3 text-[11px] text-3">Billed ${p.cycle} &middot; renews ${shortDate(p.renewsAt)} &middot; ${p.billedTo}</div>
      ${planRow('Seats', `${p.seatsUsed} / ${p.seatsIncluded}`, `${p.seatsIncluded - p.seatsUsed} open`)}
      ${planRow('Client accounts', `${p.clientsUsed}`, 'unlimited')}
      ${planRow('Integrations', `${p.integrationsUsed} / ${p.integrationsIncluded}`)}
      ${planRow('Automated actions', `${p.aiActionsUsed.toLocaleString()}`, `of ${p.aiActionsIncluded.toLocaleString()}`)}
      ${planRow('Support', p.support)}
      <div class="px-3.5 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5" style="border-top:1px solid var(--line-1)">
        ${p.perks.map(perk => `<span class="inline-flex items-center gap-1 text-[10.5px] ${perk.on ? 'text-2' : 'text-3'}"><i data-lucide="${perk.on ? 'check' : 'minus'}" class="size-3 ${perk.on ? 'text-acc-bright' : 'text-3'}"></i>${perk.label}</span>`).join('')}
      </div>`,
  });

  // automation-spend governance meter - the hero of this pane
  const meterPanel = LX.panel({
    title: 'Automation spend governance',
    actions: `<span class="status status-${usedPct >= 90 ? 'red' : usedPct >= 75 ? 'amber' : 'acc'} text-[11px]">${usedPct}% of cap</span>`,
    body: `
      <div class="flex items-end justify-between mb-2.5">
        <div class="flex items-baseline gap-2">
          <span class="metric-hero num">${money(u.spent)}</span>
          <span class="text-[13px] text-3">/ ${money(u.budget)} cap</span>
          <span class="delta delta-down num">&uarr; ${u.deltaPct}% vs May</span>
        </div>
        <div class="text-right">
          <div class="text-[10.5px] text-3">Forecast end of month</div>
          <div class="text-[12.5px] font-semibold num text-1">${money(u.forecast)} <span class="text-acc-bright text-[11px]">within cap</span></div>
        </div>
      </div>
      <div class="relative">
        <div class="bar-track" style="height:8px"><div class="bar-fill" style="width:${usedPct}%;background:${meterColor}"></div></div>
        <div class="absolute top-0 bottom-0" style="left:${breakerPct}%;width:1.5px;background:var(--red)"></div>
      </div>
      <div class="flex items-center justify-between mt-2 text-[10.5px] text-3">
        <span>Spent ${money(u.spent)}</span>
        <span class="flex items-center gap-1.5"><span class="inline-block w-3 h-px" style="background:var(--red)"></span>Circuit breaker arms at ${money(u.breaker)}</span>
        <span>Cap ${money(u.budget)}</span>
      </div>
      <div class="rounded-lg p-3 mt-4 text-[11px] text-2 leading-snug" style="background:var(--bg-3)">
        <span class="text-acc-bright font-medium">Human-approved.</span> Automated actions with over $250 projected impact route to an approver before they run.
        <button class="block mt-1.5 text-[11px] text-acc hover:underline" data-action="navigate" data-route="approvals">Review actions awaiting approval &rarr;</button>
      </div>`,
  });

  // spend by channel - dense bar list panel
  const channelPanel = LX.panel({
    title: 'Spend by channel',
    actions: `<span class="text-[10.5px] text-3 num">${money(u.spent)} this cycle</span>`,
    bare: true,
    body: u.byChannel.map(ch => `
      <div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <div class="w-28 shrink-0 flex items-center gap-2"><span class="size-2 rounded-sm shrink-0" style="background:${ch.color}"></span><span class="text-[12px] text-1 truncate">${ch.label}</span></div>
        <div class="flex-1">${LX.bar(ch.usd / channelMax * 100, ch.color)}</div>
        <div class="w-14 text-right num text-[12px] text-1">${money(ch.usd)}</div>
        <div class="w-20 text-right num text-[10.5px] text-3">${(ch.calls / 1000).toFixed(1)}k calls</div>
      </div>`).join(''),
  });

  // per-client attribution - dense governance list
  const clientSpendPanel = LX.panel({
    title: 'Spend by client',
    actions: `<span class="text-[10.5px] text-3">Attribution to retainer margin</span>`,
    bare: true,
    body: `<div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
        <div class="w-32 shrink-0">Client</div><div class="flex-1">Spend vs cap</div><div class="w-14 text-right">Spend</div><div class="w-14 text-right">Cap</div>
      </div>` + u.byClient.map(r => {
        const c = getClient(r.client);
        const pct = Math.round(r.usd / r.capUsd * 100);
        const col = pct >= 100 ? 'var(--red)' : pct >= 85 ? 'var(--amber)' : 'var(--acc)';
        const pctCls = pct >= 100 ? 'text-red' : pct >= 85 ? 'text-amber' : 'text-3';
        return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)"
            data-action="detail" data-title="${esc(c.name)}" data-sub="Automation spend - ${money(r.usd)} of ${money(r.capUsd)} cap"
            data-kv='[["Spend","${money(r.usd)}"],["Cap","${money(r.capUsd)}"],["Utilization","${pct}%"],["API calls","${r.calls.toLocaleString()}"]]'>
          <div class="w-32 shrink-0 flex items-center gap-2"><span class="size-2 rounded-full shrink-0" style="background:${clientDotColor(c.status)}"></span><span class="text-[12px] text-1 font-medium truncate">${c.name}</span></div>
          <div class="flex-1">${LX.bar(Math.min(pct, 100), col)}</div>
          <div class="w-14 text-right num text-[12px] text-1">${money(r.usd)}</div>
          <div class="w-14 text-right num text-[11px] ${pctCls}">${money(r.capUsd)}</div>
        </div>`;
      }).join(''),
  });

  // top actions panel
  const actionsPanel = LX.panel({
    title: 'Top actions by cost',
    actions: `<span class="text-[10.5px] text-3">By automated task</span>`,
    bare: true,
    body: u.topActions.map((a, idx) => `
      <div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <span class="num text-[11px] text-3 w-4 shrink-0">${idx + 1}</span>
        <div class="w-44 shrink-0"><div class="text-[12px] text-1 truncate">${a.label}</div><div class="text-[10px] text-3">${a.channel} &middot; <span class="num">${a.runs}</span> runs</div></div>
        <div class="flex-1">${LX.bar(a.usd / actionMax * 100, 'var(--acc)')}</div>
        <div class="w-12 text-right num text-[12px] text-1 font-medium">${money(a.usd)}</div>
      </div>`).join(''),
  });

  // spend trend chart panel
  const trendPanel = LX.panel({
    title: 'Spend trend & forecast',
    actions: `<div class="flex items-center gap-3 text-[10px] text-3">
        <span class="flex items-center gap-1"><span class="inline-block w-3 h-0.5 rounded-full" style="background:var(--acc)"></span>Actual</span>
        <span class="flex items-center gap-1"><span class="inline-block w-3 h-0.5 rounded-full" style="background:var(--text-3)"></span>Forecast</span>
        <span class="flex items-center gap-1"><span class="inline-block w-3 h-px" style="background:var(--red)"></span>Cap</span>
      </div>`,
    body: `<div style="height:200px"><canvas id="settings-spend-trend" height="200"></canvas></div>`,
  });

  const planPane = `
    <div data-pane="plan" class="hidden">
      ${LX.modHead({
        title: 'Plan & usage',
        sub: 'GrowthBoost is on ' + p.name + '. One shared automation budget governs every agent action - forecast and circuit breaker protect margin.',
        stats: [
          { k: 'Plan', v: p.name },
          { k: 'Spend this cycle', v: money(u.spent) },
          { k: 'Cap', v: money(u.budget) },
          { k: 'Forecast', v: money(u.forecast) },
        ],
        actions: UI.btn('Manage plan', { variant: 'primary', size: 'sm', icon: 'settings-2' }),
      })}
      <div class="grid grid-cols-12 gap-3.5">
        <div class="col-span-12 lg:col-span-7 flex flex-col gap-3.5">
          ${meterPanel}
          ${channelPanel}
          ${clientSpendPanel}
        </div>
        <div class="col-span-12 lg:col-span-5 flex flex-col gap-3.5">
          ${planPanel}
          ${trendPanel}
          ${actionsPanel}
        </div>
      </div>
    </div>`;

  // ===================================================================
  //  PANE: BILLING  - revenue rail (via modHead) + dense invoice ledger
  // ===================================================================
  const b = S.billing;
  const bs = b.summary;
  const statusMap = { paid: 'green', due: 'amber', overdue: 'red' };
  const statusLabel = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const agencySubPanel = LX.panel({
    title: 'Your subscription',
    actions: `<span class="text-[10.5px] text-3">What GrowthBoost pays Xegents OS</span>`,
    body: `
      <div class="flex items-baseline gap-2 mb-1">
        <span class="text-[16px] font-semibold text-1">${p.name}</span>
        <span class="num text-[12px] text-3">${money(p.priceUsd)} / mo</span>
      </div>
      <div class="text-[11px] text-3 mb-3.5">Renews ${shortDate(p.renewsAt)} &middot; ${b.paymentMethod.name}</div>
      <div class="rounded-lg p-3 flex items-center gap-3" style="background:var(--bg-3)">
        <div class="w-10 h-7 rounded flex items-center justify-center text-[9px] font-bold" style="background:#1a1f71;color:#fff">VISA</div>
        <div class="flex-1 min-w-0">
          <div class="text-[12px] num text-1">&bull;&bull;&bull;&bull; ${b.paymentMethod.last4}</div>
          <div class="text-[10.5px] text-3">Exp ${b.paymentMethod.exp}</div>
        </div>
        ${UI.pill('Default', 'slate')}
      </div>
      <button class="btn btn-ghost btn-sm w-full mt-3" data-action="modal" data-title="Update payment method"><i data-lucide="credit-card" class="size-3.5"></i><span>Update payment method</span></button>`,
  });

  const processorPanel = LX.panel({
    title: 'Payments processor',
    actions: UI.pill('Connected', 'green'),
    body: `
      <div class="flex items-center gap-3 mb-3">
        <div class="size-9 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)"><i data-lucide="credit-card" class="size-4" style="color:#a78bfa"></i></div>
        <div class="flex-1"><div class="text-[13px] font-semibold text-1">Stripe</div><div class="text-[11px] text-3">Auto-charge + hosted invoices for clients</div></div>
      </div>
      <div class="grid grid-cols-2 gap-3 pt-3" style="border-top:1px solid var(--line-1)">
        <div><div class="eyebrow mb-1.5">Payout</div><div class="text-[12px] text-1 num">Daily &middot; ****8841</div></div>
        <div><div class="eyebrow mb-1.5">Currency</div><div class="text-[12px] text-1">USD</div></div>
      </div>
      <button class="btn btn-ghost btn-sm w-full mt-3" onclick="toast('Opening Stripe dashboard')"><i data-lucide="external-link" class="size-3.5"></i><span>Open Stripe dashboard</span></button>`,
  });

  // dense client invoicing list - one row per active retainer
  const invoiceList = LX.dataList({
    cls: 'tight',
    columns: [
      { key: 'client', label: 'Client', render: (row) => {
          const c = getClient(row.client);
          return `<div class="flex items-center gap-2.5">
            <span class="size-2 rounded-full shrink-0" style="background:${clientDotColor(c.status)}"></span>
            <div class="min-w-0"><div class="text-[12.5px] text-1 font-medium truncate">${c.name}</div><div class="text-[10.5px] text-3 num mono">${row.invoice}</div></div>
          </div>`;
        } },
      { key: 'tier', label: 'Plan', render: (row) => `<span class="text-[12px] text-2">${getClient(row.client).tier}</span>` },
      { key: 'mrr', label: 'MRR', align: 'r', mono: true, render: (row) => `<span class="text-1 font-medium">${money(getClient(row.client).mrrUsd)}</span>` },
      { key: 'method', label: 'Method', render: (row) => `<span class="text-[11.5px] text-2">${row.method}</span>` },
      { key: 'status', label: 'Status', render: (row) => UI.pill(statusLabel(row.status), statusMap[row.status]) },
      { key: 'next', label: 'Next invoice', align: 'r', mono: true, render: (row) => row.status === 'overdue'
          ? `<span class="text-red">${Math.abs(row.nextInDays)}d overdue</span>`
          : `<span class="text-2">${shortDate(daysAhead(row.nextInDays))}</span>` },
      { key: 'act', label: '', align: 'r', width: '110px', render: (row) => `<div onclick="event.stopPropagation()">${
          row.status === 'overdue'
            ? `<button class="btn btn-secondary btn-sm" data-action="confirm" data-toast="Reminder sent for ${row.invoice}"><span>Remind</span></button>`
            : `<button class="btn btn-ghost btn-sm" data-action="confirm" data-toast="Invoice ${row.invoice} sent"><span>Send</span></button>`}</div>` },
    ],
    rows: b.clients,
    rowAttrs: (row) => {
      const c = getClient(row.client);
      return `data-action="detail" data-title="${esc(c.name)}" data-sub="${row.invoice} - ${statusLabel(row.status)}" data-kv='[["Plan","${esc(c.tier)}"],["MRR","${money(c.mrrUsd)}/mo"],["Method","${row.method}"],["Status","${statusLabel(row.status)}"],["Invoice issued","${shortDate(daysAgo(row.issuedDays))}"],["Next invoice","${row.status === 'overdue' ? Math.abs(row.nextInDays) + ' days overdue' : shortDate(daysAhead(row.nextInDays))}"]]'`;
    },
  });

  const invoicePanel = LX.panel({
    title: 'Client invoicing',
    actions: `<span class="text-[10.5px] text-3 num">${b.clients.length} accounts &middot; ${money(bs.mrrUsd)} MRR</span> ${UI.btn('Send invoice', { variant: 'secondary', size: 'sm', icon: 'send' }).replace('<button', `<button data-action="modal" data-title="Invoice composer"`)}`,
    bare: true,
    body: invoiceList,
  });

  // recent invoice ledger - dense document list
  const ledgerList = LX.dataList({
    cls: 'tight',
    columns: [
      { key: 'invoice', label: 'Invoice', mono: true, render: (r) => `<span class="text-1 font-medium num mono">${r.invoice}</span>` },
      { key: 'client', label: 'Client', render: (r) => `<span class="text-[12px] text-2">${getClient(r.client).name}</span>` },
      { key: 'amount', label: 'Amount', align: 'r', mono: true, render: (r) => `<span class="text-1 font-medium">${money(r.amountUsd)}</span>` },
      { key: 'method', label: 'Method', render: (r) => `<span class="text-[11.5px] text-2">${r.method}</span>` },
      { key: 'issued', label: 'Issued', align: 'r', mono: true, render: (r) => `<span class="text-3">${shortDate(daysAgo(r.issuedDays))}</span>` },
      { key: 'status', label: 'Status', align: 'r', render: (r) => UI.pill(statusLabel(r.status), statusMap[r.status]) },
    ],
    rows: b.ledger,
    rowAttrs: (r) => `data-action="detail" data-title="${r.invoice}" data-sub="${getClient(r.client).name} - ${money(r.amountUsd)}" data-kv='[["Client","${esc(getClient(r.client).name)}"],["Amount","${money(r.amountUsd)}"],["Method","${r.method}"],["Issued","${shortDate(daysAgo(r.issuedDays))}"],["Status","${statusLabel(r.status)}"]]'`,
  });

  const ledgerPanel = LX.panel({
    title: 'Recent invoices',
    actions: `<span class="text-[10.5px] text-3 num">Last ${b.ledger.length} issued</span>`,
    bare: true,
    body: ledgerList,
  });

  const billingPane = `
    <div data-pane="billing" class="hidden">
      ${LX.modHead({
        title: 'Billing',
        sub: 'Agency subscription, payments processor, and the client invoicing ledger. ' + bs.overdueCount + ' overdue, ' + bs.dueSoonCount + ' due soon.',
        stats: [
          { k: 'MRR', v: money(bs.mrrUsd) },
          { k: 'ARR', v: money(bs.arrUsd) },
          { k: 'Collected MTD', v: money(bs.collectedMtdUsd) },
          { k: 'Outstanding', v: money(bs.outstandingUsd) },
        ],
      })}
      <div class="grid grid-cols-12 gap-3.5 mb-3.5">
        <div class="col-span-12 lg:col-span-4">${agencySubPanel}</div>
        <div class="col-span-12 lg:col-span-4">${processorPanel}</div>
        <div class="col-span-12 lg:col-span-4">${ledgerPanel}</div>
      </div>
      ${invoicePanel}
    </div>`;

  // ===================================================================
  //  PANE: WHITE-LABEL  - agency brand panel + dense per-client list
  // ===================================================================
  const w = S.whitelabel;

  const swatch = (color, label) => `
    <div class="flex items-center gap-2.5">
      <span class="size-8 rounded-lg shrink-0" style="background:${color};box-shadow:inset 0 0 0 1px rgba(255,255,255,0.12)"></span>
      <div><div class="text-[11px] text-2">${label}</div><div class="text-[11px] num mono text-3">${color}</div></div>
    </div>`;

  const wlToggle = (label, desc, on) => `
    <div class="flex items-center justify-between px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
      <div class="min-w-0"><div class="text-[12px] text-1">${label}</div><div class="text-[11px] text-3">${desc}</div></div>
      <span class="status status-${on ? 'acc' : 'slate'} text-[11px] shrink-0">${on ? 'On' : 'Off'}</span>
    </div>`;

  const agencyBrandPanel = LX.panel({
    title: 'Agency branding',
    actions: `<span class="text-[10.5px] text-3">Applied to every client report</span>`,
    bare: true,
    body: `
      <div class="flex items-center gap-4 px-3.5 py-3.5">
        <div class="size-12 rounded-xl flex items-center justify-center font-bold text-[18px]" style="background:${w.logoColor};color:#06281d">G</div>
        <div class="flex-1">
          <div class="text-[14px] font-semibold text-1">${w.brandName}</div>
          <div class="text-[11px] text-3">${A.tagline}</div>
        </div>
        <button class="btn btn-ghost btn-sm" data-action="modal" data-title="Replace logo"><i data-lucide="upload" class="size-3.5"></i><span>Replace</span></button>
      </div>
      <div class="flex items-center gap-8 px-3.5 py-3" style="border-top:1px solid var(--line-1)">
        ${swatch(w.logoColor, 'Logo color')}
        ${swatch(w.accentColor, 'Accent color')}
      </div>
      <div class="flex items-center justify-between px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <div class="min-w-0">
          <div class="text-[12px] text-1 flex items-center gap-2">Custom report domain ${w.domainVerified ? UI.pill('Verified', 'green') : UI.pill('Pending', 'amber')}</div>
          <div class="text-[11px] num mono text-acc-bright mt-0.5">${w.customDomain}</div>
        </div>
        <button class="btn-icon-sm" onclick="toast('DNS settings')"><i data-lucide="settings-2" class="size-3.5"></i></button>
      </div>
      ${wlToggle('Custom login screen', 'Your logo + colors on the sign-in page', w.customLogin)}
      ${wlToggle('Remove "Powered by Xegents"', 'Fully unbranded client experience', w.removeXegentsBadge)}
      <div class="flex items-center justify-between px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <div><div class="text-[12px] text-1">Sender email</div><div class="text-[11px] num mono text-3 mt-0.5">${w.senderEmail}</div></div>
        ${w.senderVerified ? UI.pill('SPF + DKIM ok', 'green') : UI.pill('Unverified', 'amber')}
      </div>`,
  });

  const perClientList = LX.dataList({
    cls: 'tight',
    columns: [
      { key: 'client', label: 'Client', render: (wc) => {
          const c = getClient(wc.client);
          return `<div class="flex items-center gap-2.5">
            <span class="size-7 rounded-md shrink-0" style="background:${wc.accent};box-shadow:inset 0 0 0 1px rgba(255,255,255,0.12)"></span>
            <div class="text-[12.5px] text-1 font-medium truncate">${c.name}</div>
          </div>`;
        } },
      { key: 'mode', label: 'Mode', render: (wc) => wc.mode === 'fully-white-label' ? UI.pill('White-label', 'acc') : UI.pill('Co-branded', 'slate') },
      { key: 'domain', label: 'Report domain', render: (wc) => `<span class="num mono text-[11px] text-3 truncate" style="display:inline-block;max-width:220px">${wc.domain}</span>` },
      { key: 'accent', label: 'Accent', align: 'r', render: (wc) => `<span class="num mono text-[11px] text-3">${wc.accent}</span>` },
      { key: 'logo', label: 'Logo', align: 'r', render: (wc) => wc.logoReady
          ? `<span class="text-[10.5px] text-2 inline-flex items-center gap-1"><i data-lucide="check-circle-2" class="size-3"></i>Set</span>`
          : `<span class="text-[10.5px] text-amber inline-flex items-center gap-1"><i data-lucide="clock" class="size-3"></i>Missing</span>` },
    ],
    rows: w.clients,
    rowAttrs: (wc) => {
      const c = getClient(wc.client);
      return `data-action="detail" data-title="${esc(c.name)}" data-sub="${wc.mode === 'fully-white-label' ? 'Fully white-label' : 'Co-branded'} - ${wc.domain}" data-kv='[["Mode","${wc.mode === 'fully-white-label' ? 'Fully white-label' : 'Co-branded'}"],["Report domain","${wc.domain}"],["Accent","${wc.accent}"],["Logo","${wc.logoReady ? 'Set' : 'Missing'}"]]'`;
    },
  });

  const perClientPanel = LX.panel({
    title: 'Per-client white-label',
    actions: `<span class="text-[10.5px] text-3 num">${w.clients.length} accounts</span> ${UI.btn('Add profile', { variant: 'ghost', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="Add client branding profile"`)}`,
    bare: true,
    body: perClientList,
  });

  const whitelabelPane = `
    <div data-pane="wl" class="hidden">
      ${LX.modHead({
        title: 'White-label',
        sub: 'Agency branding on every client-facing report and portal, with per-account overrides - co-brand or go fully invisible.',
        stats: [
          { k: 'Brand', v: w.brandName },
          { k: 'Custom domain', v: w.domainVerified ? 'Verified' : 'Pending' },
          { k: 'Fully white-label', v: w.clients.filter(x => x.mode === 'fully-white-label').length },
          { k: 'Logos pending', v: w.clients.filter(x => !x.logoReady).length },
        ],
      })}
      <div class="grid grid-cols-12 gap-3.5">
        <div class="col-span-12 lg:col-span-5">${agencyBrandPanel}</div>
        <div class="col-span-12 lg:col-span-7">${perClientPanel}</div>
      </div>
    </div>`;

  // ===================================================================
  //  PANE: TEAM & SECURITY  - dense posture list + audit log
  // ===================================================================
  const goodCount = S.security.filter(s => s.on).length;
  const warnCount = S.security.filter(s => !s.on).length;

  const securityPanel = LX.panel({
    title: 'Security posture',
    actions: `<span class="status status-${warnCount ? 'amber' : 'acc'} text-[11px]">${goodCount}/${S.security.length} enforced</span>`,
    bare: true,
    body: S.security.map(s => `
      <div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)"
        data-action="detail" data-title="${esc(s.label)}" data-sub="${esc(s.desc)}" data-kv='[["State","${s.on ? 'Enabled' : 'Off'}"],["Level","${s.level === 'good' ? 'Good' : 'Needs attention'}"]]'>
        <div class="size-8 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)"><i data-lucide="${s.icon}" class="size-3.5 ${s.on ? 'text-2' : 'text-3'}"></i></div>
        <div class="flex-1 min-w-0"><div class="text-[12.5px] font-medium text-1">${s.label}</div><div class="text-[11px] text-3 leading-snug">${s.desc}</div></div>
        <span class="status status-${s.on ? (s.level === 'good' ? 'acc' : 'amber') : (s.level === 'warn' ? 'amber' : 'slate')} text-[11px] shrink-0">${s.on ? 'Enabled' : 'Off'}</span>
      </div>`).join(''),
  });

  const teamPanel = LX.panel({
    title: 'Team & roles',
    actions: `<span class="text-[10.5px] text-3 num">${window.TEAM.length} members &middot; ${p.seatsIncluded - p.seatsUsed} open</span> ${UI.btn('Manage', { variant: 'ghost', size: 'sm', icon: 'arrow-right', onClick: "navigate('team')" })}`,
    bare: true,
    body: window.TEAM.map(m => `
      <div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        ${UI.avatar(m.name, m.avatarColor, 26)}
        <div class="flex-1 min-w-0"><div class="text-[12.5px] font-medium text-1 truncate">${m.name}</div><div class="text-[10.5px] text-3">${m.role}</div></div>
        <div class="w-28 flex items-center gap-2 shrink-0">${LX.bar(m.utilization, m.utilization >= 90 ? 'var(--red)' : m.utilization >= 80 ? 'var(--amber)' : 'var(--acc)')}<span class="text-[10.5px] num text-3 w-7 text-right">${m.utilization}%</span></div>
      </div>`).join(''),
  });

  const activityPanel = LX.panel({
    title: 'Account activity',
    actions: `<span class="text-[10.5px] text-3">90-day retention</span> ${UI.btn('Export log', { variant: 'ghost', size: 'sm', icon: 'download', onClick: "toast('Exporting 90-day audit log')" })}`,
    bare: true,
    body: S.activity.map(a => {
      const t = getTeam(a.byTeam);
      return `<div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        ${UI.avatar(t.name, t.avatarColor, 24)}
        <div class="flex-1 min-w-0"><span class="text-[12px] text-1"><span class="font-medium">${t.name.split(' ')[0]}</span> ${a.action}</span></div>
        <span class="text-[10.5px] num text-3 shrink-0">${a.days === 0 ? 'Today' : shortDate(daysAgo(a.days))}</span>
      </div>`;
    }).join(''),
  });

  const securityPane = `
    <div data-pane="sec" class="hidden">
      ${LX.modHead({
        title: 'Team & security',
        sub: 'Account hardening plus the human-approval gate on automation spend. Every change is logged.',
        stats: [
          { k: 'Members', v: window.TEAM.length },
          { k: 'Open seats', v: p.seatsIncluded - p.seatsUsed },
          { k: 'Controls enforced', v: goodCount + '/' + S.security.length },
          { k: 'Needs attention', v: warnCount },
        ],
        actions: UI.btn('Invite member', { variant: 'primary', size: 'sm', icon: 'user-plus', onClick: "navigate('team')" }),
      })}
      <div class="grid grid-cols-12 gap-3.5">
        <div class="col-span-12 lg:col-span-7 flex flex-col gap-3.5">
          ${securityPanel}
          ${activityPanel}
        </div>
        <div class="col-span-12 lg:col-span-5">${teamPanel}</div>
      </div>
    </div>`;

  // ===================================================================
  //  HEADER + TABBED SHELL
  // ===================================================================
  const header = `
    <div class="flex items-start justify-between mb-5">
      <div>
        <div class="eyebrow mb-2">Operations</div>
        <h1 class="h1">Settings</h1>
        <p class="text-[12.5px] text-2 mt-1.5 max-w-2xl leading-relaxed">
          Integrations, plan and spend governance, agency and client billing, white-label, and security for the ${A.name} workspace.
        </p>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <span class="status status-${needAttention.length > 0 ? 'amber' : 'acc'} text-[11px]">${needAttention.length > 0 ? `<span class="num">${needAttention.length}</span> need attention` : 'All systems operational'}</span>
      </div>
    </div>`;

  const tabbar = LX.toolbar({
    left: LX.segmented([
      { id: 'int',     label: 'Integrations' },
      { id: 'plan',    label: 'Plan & usage' },
      { id: 'billing', label: 'Billing' },
      { id: 'wl',      label: 'White-label' },
      { id: 'sec',     label: 'Team & security' },
    ]),
    right: `${UI.btn('Invite member', { variant: 'secondary', size: 'sm', icon: 'user-plus', onClick: "navigate('team')" })}
      ${UI.btn('Manage plan', { variant: 'primary', size: 'sm', icon: 'settings-2' })}`,
  });

  return `
    ${header}
    <div data-tabwrap>
      ${tabbar}
      <div style="margin-top:6px">
        ${intPane}
        ${planPane}
        ${billingPane}
        ${whitelabelPane}
        ${securityPane}
      </div>
    </div>
  `;
};

window.PAGES_AFTER.settings = function () {
  const u = window.SETTINGS.aiUsage;
  const t = u.trend;
  const labels = t.forecastLabels;
  const actual = labels.map((_, idx) => idx < t.spend.length ? t.spend[idx] : null);
  const cap = labels.map(() => u.budget);
  CHARTS.line('settings-spend-trend', labels, [
    { label: 'Actual',   data: actual,     borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.10)' },
    { label: 'Forecast', data: t.forecast, borderColor: '#565659', backgroundColor: 'rgba(86,86,89,0.05)', borderDash: [4, 3] },
    { label: 'Cap',      data: cap,        borderColor: 'rgba(244,63,94,0.55)', backgroundColor: 'transparent', borderDash: [2, 3], borderWidth: 1, pointRadius: 0 },
  ], {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }, border: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 }, callback: (v) => '$' + v }, border: { display: false } },
    },
  });
};
