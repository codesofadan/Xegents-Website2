/* ============================================================
   AI Account Manager - the flagship work queue.

   Thesis: legacy tools only DESCRIBE data or live in a single
   channel silo. Xegents OS is the one place where AI agents
   propose real ACTIONS across every channel and a human approves
   in ONE inbox.

   Rebuilt as a dense, Linear-style WORK QUEUE: a left list-rail of
   pending actions + a right detail canvas for the selected action.
   Header stat rail. Segmented switch: Pending / Auto-approved /
   History. Full-bleed, self-wrapped.
   ============================================================ */

window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};
window.FULLBLEED = window.FULLBLEED || new Set();
window.FULLBLEED.add('approvals');

window.PAGES.approvals = function () {
  const A = window.APPROVALS;
  const esc = LX.esc;
  const ch = (id) => window.getChannel(id) || { label: id, color: '#8A8A8E', icon: 'circle' };
  const cl = (id) => window.getClient(id) || { name: id, logoColor: 'var(--text-3)' };

  const pending = A.queue.filter(q => q.status !== 'auto');
  const auto    = A.queue.filter(q => q.status === 'auto');

  // ---- small atoms -------------------------------------------------------
  const confColor = (v) => v >= 90 ? 'var(--acc)' : v >= 82 ? 'var(--text-2)' : 'var(--amber)';
  const sensitive = (q) => q.status === 'sensitive';

  const channelChip = (id) => {
    const c = ch(id);
    return `<span class="tag tag-slate" style="font-size:10px;padding:1px 6px;"><i data-lucide="${c.icon}" class="size-3"></i>${esc(c.label)}</span>`;
  };

  const statusLabel = (q) => {
    if (q.status === 'auto')      return `<span class="status status-green" style="font-size:10.5px;"><i data-lucide="zap" class="size-3"></i>Auto-applied</span>`;
    if (q.status === 'sensitive') return `<span class="status status-red" style="font-size:10.5px;"><i data-lucide="shield-alert" class="size-3"></i>Sensitive</span>`;
    return `<span class="status status-amber" style="font-size:10.5px;"><i data-lucide="clock" class="size-3"></i>Awaiting you</span>`;
  };

  const metricChip = (q) => {
    if (!q.metric) return '';
    if (q.metricTone === 'opportunity')
      return `<span class="tag tag-slate" style="font-size:10px;padding:1px 6px;"><i data-lucide="trending-up" class="size-3 text-acc"></i>${esc(q.metric)}</span>`;
    return `<span class="tag tag-red" style="font-size:10px;padding:1px 6px;"><i data-lucide="alert-triangle" class="size-3"></i>${esc(q.metric)}</span>`;
  };

  // ====================================================================
  //  LEFT RAIL - the queue of actions (one compact row each)
  //  Each row is a [data-tab] inside the tabwrap; clicking it swaps the
  //  visible [data-pane] in the detail canvas. First row active.
  // ====================================================================
  const railRow = (q, i, first) => {
    const c = ch(q.channel);
    const client = cl(q.clientId);
    return `
      <div class="lq-row ${first ? 'active' : ''}" data-tab="${q.id}" data-tooltip="${esc(q.title)}"
        style="${sensitive(q) ? 'box-shadow: inset 2px 0 0 var(--red);' : ''}">
        <span class="lq-ico" style="background:var(--bg-3);"><i data-lucide="${c.icon}" class="size-3.5 text-2"></i></span>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1.5 mb-0.5">
            <span class="size-1.5 rounded-full shrink-0" style="background:${client.logoColor}"></span>
            <span class="text-[11px] text-3 truncate">${esc(client.name)}</span>
            <span class="text-[10px] text-4 ml-auto shrink-0">${esc(q.time.replace(/^detected |^auto-applied /, ''))}</span>
          </div>
          <div class="text-[12.5px] font-medium text-1 leading-tight truncate">${esc(q.title)}</div>
          <div class="text-[11px] text-3 leading-snug mt-0.5" style="display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;">${esc(q.oneLine || q.action)}</div>
        </div>
        <div class="flex flex-col items-end shrink-0 ml-1">
          <span class="text-[12px] num font-semibold" style="color:${confColor(q.confidence)}">${q.confidence}<span class="text-[9px] text-4">%</span></span>
          ${sensitive(q) ? '<i data-lucide="shield-alert" class="size-3 text-red mt-1"></i>' : ''}
        </div>
      </div>`;
  };

  const railGroup = (label, rows, startActive) => `
    <div class="lq-grouphead">${esc(label)}<span class="num text-4 ml-1.5">${rows.length}</span></div>
    ${rows.map((q, i) => railRow(q, i, startActive && i === 0)).join('')}`;

  const rail = `
    <div class="lq-railtop">
      ${LX.segmented([{ id: 'pending', label: 'Pending' }, { id: 'auto', label: 'Auto-approved' }, { id: 'history', label: 'History' }], 'pending')}
    </div>
    <div data-pane="pending" class="">
      ${railGroup('Awaiting you', pending, true)}
    </div>
    <div data-pane="auto" class="hidden">
      ${railGroup('Auto-applied this morning', auto, false)}
    </div>
    <div data-pane="history" class="hidden">
      <div class="lq-grouphead">Executed - closed loop<span class="num text-4 ml-1.5">${A.history.length}</span></div>
      ${A.history.map((h, i) => {
        const c = ch(h.channel);
        return `
          <div class="lq-row" data-tab="hist-${i}">
            <span class="lq-ico" style="background:var(--acc-soft);box-shadow:inset 0 0 0 1px var(--acc-line);"><i data-lucide="check" class="size-3.5 text-acc"></i></span>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 mb-0.5">${channelChip(h.channel)}<span class="text-[10px] text-4 ml-auto num">${shortDate(h.time.slice(0,10))}</span></div>
              <div class="text-[12px] text-1 leading-tight" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${esc(h.text)}</div>
              <div class="text-[11px] text-acc-bright mt-0.5 flex items-center gap-1"><i data-lucide="trending-up" class="size-3"></i><span style="display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;">${esc(h.result)}</span></div>
            </div>
          </div>`;
      }).join('')}
    </div>`;

  // ====================================================================
  //  DETAIL CANVAS - one [data-pane] per action id. Pending+auto share
  //  the same rich detail; history items get a compact result view.
  // ====================================================================
  const block = (icon, label, body, accent) => `
    <div class="ap-block" ${accent ? 'style="box-shadow: inset 0 0 0 1px var(--acc-line);"' : ''}>
      <div class="eyebrow mb-1.5 flex items-center gap-1.5 ${accent ? 'text-acc' : ''}"><i data-lucide="${icon}" class="size-3 ${accent ? 'text-acc' : 'text-3'}"></i>${esc(label)}</div>
      <div class="ap-block-body ${accent ? 'text-acc-bright' : 'text-2'}">${body}</div>
    </div>`;

  const detailPane = (q, first) => {
    const c = ch(q.channel);
    const client = cl(q.clientId);
    const owner = window.getTeam(q.owner);
    const isAuto = q.status === 'auto';
    const actionBar = isAuto
      ? `<button class="btn btn-ghost btn-sm" data-action="confirm" data-toast="Action reverted for ${esc(client.name)}" data-type="warning"><i data-lucide="undo-2" class="size-3.5"></i><span>Undo</span></button>
         <button class="btn btn-secondary btn-sm" data-action="toast" data-toast="Opening execution log" data-type="info"><i data-lucide="file-clock" class="size-3.5"></i><span>View result</span></button>`
      : `<button class="btn btn-ghost btn-sm" data-action="dismiss"><i data-lucide="x" class="size-3.5"></i><span>Dismiss</span></button>
         <button class="btn btn-secondary btn-sm" data-action="modal" data-title="Edit before it ships"><i data-lucide="pencil" class="size-3.5"></i><span>Edit draft</span></button>
         <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Approved - executing for ${esc(client.name)}"><i data-lucide="check" class="size-3.5"></i><span>Approve</span></button>`;

    return `
      <div data-pane="${q.id}" class="${first ? '' : 'hidden'}">
        <div class="ws-pad">
          ${LX.recordHead({
            mark: `<i data-lucide="${c.icon}" class="size-4"></i>`,
            markColor: sensitive(q) ? 'var(--red)' : 'var(--acc)',
            title: q.title,
            sub: `${client.name} &middot; ${c.label} &middot; ${esc(q.time)}`,
            meta: [
              { k: 'Confidence', v: `<span style="color:${confColor(q.confidence)}">${q.confidence}%</span>` },
              { k: 'Owner', v: owner ? esc(owner.name) : '-' },
              { k: 'Status', v: isAuto ? 'Auto-applied' : sensitive(q) ? 'Sensitive' : 'Awaiting you' },
            ],
            actions: actionBar,
          })}

          <div class="flex items-center gap-2 flex-wrap mb-5 -mt-2">
            ${statusLabel(q)}${metricChip(q)}
          </div>

          ${block('eye', 'What it detected', esc(q.detected))}

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            ${block('wand-2', 'Proposed action', esc(q.action))}
            ${block('target', 'Projected impact', esc(q.impact), true)}
          </div>

          ${q.draft ? `
            <div class="ap-block mt-3">
              <div class="eyebrow mb-2 flex items-center gap-1.5"><i data-lucide="file-text" class="size-3 text-3"></i>Draft preview</div>
              <div class="bubble bubble-in" style="max-width:100%">${esc(q.draft)}</div>
            </div>` : ''}

          ${q.reasoning ? `
            <div class="ap-block mt-3">
              <div class="eyebrow mb-2 flex items-center gap-1.5"><i data-lucide="git-branch" class="size-3 text-3"></i>How it decided</div>
              <div class="space-y-1.5">
                ${q.reasoning.map(r => `<div class="flex items-start gap-2 text-[12px] text-2 leading-snug"><i data-lucide="dot" class="size-4 text-4 shrink-0 -ml-1"></i><span>${esc(r)}</span></div>`).join('')}
              </div>
            </div>` : ''}

          <div class="flex items-center justify-between mt-5 pt-4" style="border-top:1px solid var(--line-1);">
            <div class="text-[11px] text-3 flex items-center gap-1.5">
              ${owner ? `${UI.avatar(owner.name, owner.avatarColor, 18)}<span>${esc(owner.name)}<span class="text-4 mx-1.5">&middot;</span>${esc(owner.role)}</span>` : ''}
            </div>
            <div class="flex items-center gap-1.5">${actionBar}</div>
          </div>
        </div>
      </div>`;
  };

  const historyPane = (h, i) => {
    const c = ch(h.channel);
    const client = cl(h.clientId);
    return `
      <div data-pane="hist-${i}" class="hidden">
        <div class="ws-pad">
          ${LX.recordHead({
            mark: '<i data-lucide="check-circle-2" class="size-4"></i>',
            markColor: 'var(--acc)',
            title: h.text,
            sub: `${client.name} &middot; ${c.label} &middot; executed ${shortDate(h.time.slice(0,10))}`,
            meta: [{ k: 'Outcome', v: 'Closed loop' }, { k: 'Channel', v: esc(c.label) }],
            actions: `<button class="btn btn-secondary btn-sm" data-action="toast" data-toast="Opening execution log" data-type="info"><i data-lucide="file-clock" class="size-3.5"></i><span>View log</span></button>`,
          })}
          ${block('trending-up', 'Result', esc(h.result), true)}
          <div class="ap-block mt-3">
            <div class="eyebrow mb-1.5 flex items-center gap-1.5"><i data-lucide="check" class="size-3 text-acc"></i>What ran</div>
            <div class="ap-block-body text-2">The AI executed this automatically after approval, then verified the outcome and reported back here. No human re-entry of the work was needed.</div>
          </div>
        </div>
      </div>`;
  };

  const detailEmpty = `
    <div data-pane="__empty" class="hidden">
      <div class="ws-pad">${UI.emptyState({ icon: 'inbox', title: 'Nothing selected', body: 'Pick an action from the queue.' })}</div>
    </div>`;

  const canvas = `
    ${pending.map((q, i) => detailPane(q, i === 0)).join('')}
    ${auto.map((q) => detailPane(q, false)).join('')}
    ${A.history.map((h, i) => historyPane(h, i)).join('')}
    ${detailEmpty}`;

  // ====================================================================
  //  RIGHT ASIDE - governance / rules (quiet context column)
  // ====================================================================
  const ruleRow = (r) => {
    const c = ch(r.channel);
    return `
      <div class="ap-rule">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="status status-${r.dot}"></span>
          <span class="text-[12px] font-medium text-1">${esc(c.label)}</span>
        </div>
        <div class="flex items-start gap-2 text-[11px] mb-1">
          <i data-lucide="zap" class="size-3 text-acc mt-0.5 shrink-0"></i>
          <span class="text-2"><span class="text-acc-bright font-medium">Auto</span> ${esc(r.auto)}</span>
        </div>
        <div class="flex items-start gap-2 text-[11px]">
          <i data-lucide="user-check" class="size-3 text-3 mt-0.5 shrink-0"></i>
          <span class="text-2"><span class="text-1 font-medium">Human</span> ${esc(r.human)}</span>
        </div>
      </div>`;
  };

  const aside = `
    <div class="ws-pad">
      <div class="eyebrow mb-1">How this works</div>
      <div class="text-[11.5px] text-2 leading-relaxed mb-4">The AI acts on its own for low-risk, reversible moves and routes anything sensitive to a human. Tiered per channel.</div>
      <div class="space-y-2.5">
        ${A.rules.map(ruleRow).join('')}
      </div>
      <div class="mt-4 pt-3.5 flex items-center justify-between" style="border-top:1px solid var(--line-1);">
        <span class="text-[11px] text-3"><span class="num">${A.stats.autoApproved}</span> auto-approved this month</span>
        <button class="btn btn-secondary btn-sm" data-action="navigate" data-route="automations"><i data-lucide="sliders-horizontal" class="size-3"></i><span>Rules</span></button>
      </div>
    </div>`;

  // ====================================================================
  //  HEADER stat rail + body workspace
  // ====================================================================
  const header = `
    <div class="ap-head">
      <div class="flex items-end justify-between gap-5">
        <div>
          <div class="eyebrow mb-1.5">AI Account Manager</div>
          <div class="flex items-center gap-2.5">
            <span class="size-7 rounded-lg flex items-center justify-center shrink-0" style="background:var(--acc-soft);box-shadow:inset 0 0 0 1px var(--acc-line);"><i data-lucide="sparkles" class="size-4 text-acc"></i></span>
            <div class="mod-title">Approval inbox</div>
          </div>
        </div>
        ${LX.statRail([
          { k: 'Awaiting you', v: `<span class="text-acc">${A.stats.pending}</span>` },
          { k: 'Approved this week', v: A.stats.approvedThisWeek, delta: 11, deltaUnit: '' },
          { k: 'Est. impact MTD', v: formatMoney(A.stats.monthlyImpactUsd), delta: 18 },
          { k: 'Time saved', v: A.stats.timeSavedHrs + '<span class="text-[12px] text-3 font-normal ml-0.5">hrs</span>' },
        ])}
        <div class="flex items-center gap-1.5 shrink-0">
          <button class="btn btn-secondary btn-sm" data-action="confirm" data-toast="Auto-safe actions executed"><i data-lucide="zap" class="size-3.5"></i><span>Approve auto-safe</span></button>
          <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Queue approved - executing across clients"><i data-lucide="check-check" class="size-3.5"></i><span>Approve queue</span></button>
        </div>
      </div>
    </div>`;

  // Inject the styles this view needs (scoped, dense - not in the global sheet).
  const styles = `
    <style>
      .ap-shell { height: calc(100vh - 44px); display: flex; flex-direction: column; }
      .ap-shell .workspace { height: 100%; }
      .ap-head { padding: 16px 24px; border-bottom: 1px solid var(--line-1); flex-shrink: 0; }
      .lq-railtop { padding: 12px 12px 10px; border-bottom: 1px solid var(--line-1); position: sticky; top: 0; background: var(--bg-1); z-index: 3; }
      .lq-railtop .segmented { width: 100%; }
      .lq-railtop .seg-item { flex: 1; text-align: center; }
      .lq-grouphead { font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-3); padding: 12px 14px 6px; }
      .lq-row { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--line-1); cursor: pointer; transition: background 80ms; }
      .lq-row:hover { background: rgba(255,255,255,0.022); }
      .lq-row.active { background: var(--bg-2); box-shadow: inset 2px 0 0 var(--acc); }
      .lq-ico { width: 26px; height: 26px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
      .ap-block { background: var(--bg-2); border-radius: var(--radius); box-shadow: inset 0 0 0 1px var(--line-1); padding: 12px 14px; }
      .ap-block-body { font-size: 12.5px; line-height: 1.55; }
      .ap-rule { background: var(--bg-2); border-radius: var(--radius); box-shadow: inset 0 0 0 1px var(--line-1); padding: 11px 12px; }
    </style>`;

  return `
    ${styles}
    <div class="ap-shell">
      ${header}
      <div data-tabwrap style="flex:1; min-height:0;">
        ${LX.workspace({
          cols: '340px 1fr 300px',
          rail: rail,
          main: canvas,
          aside: aside,
        })}
      </div>
    </div>`;
};

// All switching (rail row -> detail pane) and approve/dismiss/edit are
// handled declaratively by interactions.js via data-tabwrap / data-tab /
// data-pane / data-action. No page-level JS needed.
