/* ============================================================
   Content macro - hub + dense micro sub-modules. Each is its
   assigned archetype, visibly distinct from its siblings:
     content           :: BOARD              (full-bleed editorial kanban)
     content.blog      :: WRITING WORKSPACE  (doc editor canvas)
     content.social    :: SCRIPTING WORKSPACE(IG/TikTok script + phone)
     content.video     :: SCRIPT WORKSPACE   (scene blocks + storyboard)
     content.ads       :: VARIATIONS GRID    (ad-copy variants matrix)
     content.email     :: WORKSPACE          (sequence + email editor)
     content.calendar  :: CALENDAR           (month editorial grid)
     content.library   :: DENSE LIST         (all assets, full-height)
   The account manager drafts; the team approves before anything ships.
   ============================================================ */

window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};
window.FULLBLEED = window.FULLBLEED || new Set();
window.FULLBLEED.add('content');
window.FULLBLEED.add('content.blog');
window.FULLBLEED.add('content.social');
window.FULLBLEED.add('content.video');
window.FULLBLEED.add('content.email');
window.FULLBLEED.add('content.calendar');
window.FULLBLEED.add('content.library');

(function () {
  const C = () => window.CONTENT;
  const esc = LX.esc;
  const escA = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');
  const clientName = (id) => (window.getClient(id) || {}).name || id;
  const clientColor = (id) => (window.getClient(id) || {}).logoColor || '#10b981';
  const teamName = (id) => (window.getTeam(id) || {}).name || id;
  const teamColor = (id) => (window.getTeam(id) || {}).avatarColor || '#10b981';

  const TYPE = {
    blog:    { label: 'Blog',     icon: 'file-text',    dot: 'var(--sky)',    tag: 'sky' },
    landing: { label: 'Landing',  icon: 'layout',       dot: 'var(--acc)',    tag: 'acc' },
    ad:      { label: 'Ad copy',  icon: 'megaphone',    dot: 'var(--amber)',  tag: 'amber' },
    email:   { label: 'Email',    icon: 'mail',         dot: 'var(--text-3)', tag: 'slate' },
    social:  { label: 'Social',   icon: 'share-2',      dot: 'var(--violet)', tag: 'violet' },
    video:   { label: 'Video',    icon: 'clapperboard', dot: 'var(--red)',    tag: 'red' },
  };
  const typeTag = (t) => UI.tag(TYPE[t].label, 'slate');
  const typeDot = (t) => `<span class="inline-block size-2 rounded-full shrink-0" style="background:${TYPE[t].dot}"></span>`;
  const typeIcon = (t, size = '3.5') => `<i data-lucide="${TYPE[t].icon}" class="size-${size}" style="color:${TYPE[t].dot}"></i>`;
  const cdot = (id, px = 7) => `<span class="inline-block rounded-full shrink-0" style="width:${px}px;height:${px}px;background:${clientColor(id)}"></span>`;
  const clientCell = (id) => `<span class="flex items-center gap-2">${cdot(id, 7)}<span class="text-[12px] text-2 truncate">${clientName(id)}</span></span>`;

  const STATUS = {
    published: { label: 'Published', dot: 'green' },
    scheduled: { label: 'Scheduled', dot: 'amber' },
    review:    { label: 'In review', dot: 'sky' },
    draft:     { label: 'Draft',     dot: 'slate' },
  };
  const statusPill = (s) => `<span class="status status-${(STATUS[s] || STATUS.draft).dot}">${(STATUS[s] || STATUS.draft).label}</span>`;

  // shared sub-nav across the macro
  function subNav(active) {
    const items = [
      { id: 'content',          label: 'Pipeline' },
      { id: 'content.blog',     label: 'Blog and web' },
      { id: 'content.social',   label: 'Social' },
      { id: 'content.video',    label: 'Video' },
      { id: 'content.ads',      label: 'Ad copy' },
      { id: 'content.email',    label: 'Email' },
      { id: 'content.calendar', label: 'Calendar' },
      { id: 'content.library',  label: 'Library' },
    ];
    return `<div class="flex items-center gap-1 flex-wrap co-nav">${items.map(it =>
      `<button class="px-2.5 py-1 rounded-md text-[12px] font-medium ${it.id === active ? 'text-1' : 'text-3 hover:text-1'}" ${it.id === active ? 'style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"' : ''} data-action="navigate" data-route="${it.id}">${it.label}</button>`
    ).join('')}</div>`;
  }

  // page-local dense styles, injected once per render
  const styles = `
    <style>
      .co-shell { height: calc(100vh - 44px); display: flex; flex-direction: column; }
      .co-head { padding: 13px 22px; border-bottom: 1px solid var(--line-1); flex-shrink: 0; }
      .co-head .mod-head { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
      .co-nav { padding-top: 10px; }
      .co-rail-row { padding: 10px 13px; border-bottom: 1px solid var(--line-1); cursor: pointer; transition: background 80ms; }
      .co-rail-row:hover { background: rgba(255,255,255,0.022); }
      .co-rail-row.active { background: var(--bg-2); box-shadow: inset 2px 0 0 var(--acc); }
      .co-sec { font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-3); padding: 10px 13px 6px; }
      /* document editor canvas */
      .doc-block { margin: 16px 0; }
      .doc-h2 { font-size: 17px; font-weight: 600; letter-spacing: -0.015em; color: var(--text-1); margin: 22px 0 6px; }
      .doc-lede { font-size: 15px; line-height: 1.7; color: var(--text-1); }
      .doc-quote { border-left: 2px solid var(--acc); padding: 4px 0 4px 16px; font-size: 15px; font-style: italic; color: var(--text-1); }
      /* script blocks */
      .scr-block { background: var(--bg-2); border-radius: var(--radius); box-shadow: inset 0 0 0 1px var(--line-1); padding: 13px 15px; margin-bottom: 12px; }
      .scr-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 5px; }
      .scr-field { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-4); margin-bottom: 3px; }
      /* scene rows (video) */
      .scene-row { display: grid; grid-template-columns: 56px 1fr 1fr 60px; gap: 14px; padding: 14px 15px; border-bottom: 1px solid var(--line-1); }
      .scene-n { font-size: 12px; font-weight: 600; color: var(--text-1); }
      /* variations grid */
      .var-grid { width: 100%; border-collapse: collapse; }
      .var-grid th { position: sticky; top: 0; z-index: 2; background: var(--bg-1); text-align: left; font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); padding: 7px 14px; border-bottom: 1px solid var(--line-1); white-space: nowrap; }
      .var-grid th.r { text-align: right; }
      .var-grid td { padding: 11px 14px; font-size: 12px; color: var(--text-1); border-bottom: 1px solid var(--line-1); vertical-align: top; }
      .var-grid td.r { text-align: right; font-variant-numeric: tabular-nums; }
      .var-group td { background: var(--bg-1); font-size: 11px; padding: 8px 14px; border-bottom: 1px solid var(--line-1); }
      /* calendar */
      .co-cal { display: grid; grid-template-columns: repeat(7, 1fr); border-left: 1px solid var(--line-1); border-top: 1px solid var(--line-1); }
      .co-dow { font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-3); padding: 7px 10px; border-right: 1px solid var(--line-1); border-bottom: 1px solid var(--line-1); background: var(--bg-1); position: sticky; top: 0; z-index: 2; }
      .co-cell { min-height: 124px; padding: 6px 7px; border-right: 1px solid var(--line-1); border-bottom: 1px solid var(--line-1); display: flex; flex-direction: column; gap: 4px; }
      .co-cell.muted { background: rgba(255,255,255,0.012); }
      .co-cell.today { box-shadow: inset 0 2px 0 var(--acc); }
      .co-daynum { font-size: 11px; font-weight: 600; color: var(--text-2); display: flex; align-items: center; justify-content: space-between; }
      .co-daynum .pill { background: var(--acc); color: #04130d; border-radius: 5px; padding: 0 6px; line-height: 17px; height: 17px; }
      .co-chip { display: flex; align-items: center; gap: 6px; padding: 4px 6px; border-radius: 6px; background: var(--bg-3); cursor: pointer; transition: background 80ms; }
      .co-chip:hover { background: var(--bg-4); }
      .co-chip .cap { font-size: 10.5px; color: var(--text-2); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; min-width: 0; }
      .co-toolbar { display: flex; align-items: center; gap: 8px; padding: 9px 22px; border-bottom: 1px solid var(--line-1); flex-shrink: 0; flex-wrap: wrap; }
      .chk { display: flex; align-items: flex-start; gap: 8px; padding: 6px 0; }
      .chk-box { width: 15px; height: 15px; border-radius: 4px; flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center; }
    </style>`;

  // ====================================================================
  // PAGES.content :: BOARD - full-bleed editorial kanban
  // ====================================================================
  window.PAGES.content = function () {
    const c = C();
    const k = c.kpis;
    const dueLabel = (d) => d < 0
      ? `<span class="num text-acc-bright">shipped ${Math.abs(d)}d ago</span>`
      : d === 0 ? `<span class="num text-amber">due today</span>`
      : `<span class="num text-3">due ${d}d</span>`;

    const stageDefs = [
      { key: 'brief',     label: 'Brief',           dot: 'slate' },
      { key: 'drafting',  label: 'Draft',           dot: 'acc' },
      { key: 'internal',  label: 'Internal review', dot: 'sky' },
      { key: 'client',    label: 'Client approval', dot: 'amber' },
      { key: 'published', label: 'Published',       dot: 'green' },
    ];
    const ROUTE = { blog: 'content.blog', landing: 'content.blog', social: 'content.social', video: 'content.video', ad: 'content.ads', email: 'content.email' };

    const renderCard = (card) => {
      const t = TYPE[card.type];
      const route = ROUTE[card.type] || 'content.library';
      return `
        <div class="kanban-card" data-action="detail" data-title="${escA(card.title)}" data-sub="${escA(clientName(card.client))} / ${t.label}"
             data-kv='[["Owner","${escA(teamName(card.owner))}"],["Format","${t.label}"],["Stage","${card.stage}"],["Due","${card.due < 0 ? 'shipped' : card.due + 'd'}"]]'>
          <div class="flex items-start gap-2 mb-2">
            ${typeIcon(card.type, '3.5')}
            <span class="text-[12px] font-medium text-1 leading-snug">${card.title}</span>
          </div>
          <div class="flex items-center gap-1.5 mb-2.5">
            ${cdot(card.client, 7)}
            <span class="text-[10.5px] text-3">${clientName(card.client)}</span>
            <button class="text-[9.5px] text-3 ml-1 hover:text-1" style="border:1px solid var(--line-2);border-radius:4px;padding:0 5px;" data-action="navigate" data-route="${route}" onclick="event.stopPropagation()">open</button>
          </div>
          <div class="flex items-center justify-between pt-2" style="border-top: 1px solid var(--line-1);">
            <div class="flex items-center gap-1.5">${UI.avatar(teamName(card.owner), teamColor(card.owner), 18)}<span class="text-[10px] text-3">${teamName(card.owner).split(' ')[0]}</span></div>
            <span class="text-[10px]">${dueLabel(card.due)}</span>
          </div>
        </div>`;
    };

    const columns = stageDefs.map(s => ({ label: s.label, statusDot: s.dot, cards: c.pipeline.filter(p => p.stage === s.key), footer: null }));

    const header = `<div class="co-head">
      ${LX.modHead({
        title: 'Content pipeline',
        sub: 'Every piece in flight across ' + window.CLIENTS.length + ' clients and all six formats. ' + window.AGENCY.period + ', mid-cycle.',
        stats: [
          { k: 'In production', v: k.inProduction, delta: k.inProductionDelta, deltaUnit: '' },
          { k: 'Published MTD', v: k.publishedMtd, delta: k.publishedDelta, deltaUnit: '' },
          { k: 'Awaiting client', v: k.awaitingClient, delta: k.awaitingDelta, deltaUnit: '' },
          { k: 'Drafts ready', v: k.draftsReady, delta: k.draftsDelta, deltaUnit: '' },
        ],
        actions: `
          ${UI.btn('Calendar', { variant: 'secondary', size: 'sm', icon: 'calendar', onClick: "navigate('content.calendar')" })}
          ${UI.btn('New brief', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New brief"`)}`,
      })}
      ${subNav('content')}
    </div>`;

    return `${styles}
      <div class="co-shell">
        ${header}
        <div style="flex:1; overflow:auto; padding: 14px 22px;">
          ${UI.kanban({ columns, renderCard })}
        </div>
      </div>`;
  };

  // ====================================================================
  // PAGES['content.blog'] :: WRITING WORKSPACE - doc editor canvas
  // ====================================================================
  window.PAGES['content.blog'] = function () {
    const c = C();
    const d = c.blogDoc;
    const cName = clientName(d.client), cColor = clientColor(d.client);
    const wordPct = Math.round(d.words / d.wordTarget * 100);

    // RAIL: brief + outline
    const outlineRows = d.outline.map(o => `
      <div class="flex items-start gap-2 py-1.5 ${o.level === 'H3' ? 'pl-4' : ''}" style="border-top:1px solid var(--line-1)">
        <i data-lucide="${o.done ? 'check' : 'circle'}" class="size-3 mt-0.5 shrink-0" style="color:${o.done ? 'var(--acc)' : 'var(--text-4)'}"></i>
        <span class="text-[9px] num shrink-0" style="border:1px solid var(--line-2);border-radius:4px;padding:0 4px;color:var(--text-3)">${o.level}</span>
        <span class="text-[11.5px] ${o.level === 'H2' ? 'text-1' : 'text-2'} leading-snug">${o.text}</span>
      </div>`).join('');

    const rail = `
      <div class="co-sec">Brief</div>
      <div class="px-3.5 pb-3">
        <div class="flex items-center gap-2 mb-2">${typeTag('blog')}${cdot(d.client, 8)}<span class="text-[11px] text-3">${cName}</span></div>
        <div class="rounded-lg px-3 py-2.5 mb-2" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
          <div class="scr-field">Target keyword</div>
          <div class="text-[13px] font-semibold text-1">${d.targetKeyword}</div>
          <div class="grid grid-cols-3 gap-2 mt-2.5">
            <div><div class="num text-[14px] text-1">${d.volume.toLocaleString()}</div><div class="scr-field">vol/mo</div></div>
            <div><div class="num text-[14px] ${d.difficulty >= 50 ? 'text-red' : 'text-amber'}">${d.difficulty}</div><div class="scr-field">KD</div></div>
            <div><div class="num text-[14px] text-1">#${d.currentRank}</div><div class="scr-field">rank</div></div>
          </div>
        </div>
        <div class="text-[11px] text-3">Intent <span class="text-2">${d.intent}</span> &middot; goal rank <span class="text-2 num">#${d.targetRank}</span></div>
      </div>
      <div class="co-sec" style="border-top:1px solid var(--line-1)">Outline</div>
      <div class="px-3.5 pb-4">${outlineRows}</div>`;

    // MAIN: document editor canvas
    const blockHtml = (b) => {
      if (b.kind === 'h1') return `<div class="doc-h1">${b.text}</div>`;
      if (b.kind === 'lede') return `<p class="doc-lede doc-block">${b.text}</p>`;
      if (b.kind === 'h2') return `<div class="doc-h2">${b.text}</div>`;
      if (b.kind === 'quote') return `<div class="doc-quote doc-block">${b.text}</div>`;
      return `<p class="doc-p doc-block">${b.text}</p>`;
    };
    const main = `
      <div class="ws-pad">
        ${LX.recordHead({
          mark: `<i data-lucide="file-text" class="size-4"></i>`, markColor: cColor,
          title: d.title, sub: cName + ' &middot; blog &middot; updated ' + d.updatedHrs + 'h ago',
          meta: [{ k: 'Words', v: d.words.toLocaleString() + ' / ' + d.wordTarget.toLocaleString() }, { k: 'Read', v: d.readMins + ' min' }, { k: 'Stage', v: d.stage }],
          actions: `
            ${UI.btn('Save', { variant: 'secondary', size: 'sm', icon: 'save', onClick: "toast('Draft saved','info')" })}
            ${UI.btn('Send to review', { variant: 'primary', size: 'sm', icon: 'user-check', onClick: "toast('Sent to internal review','success')" })}`,
        })}
        <div class="doc-canvas">
          ${d.blocks.map(blockHtml).join('')}
          <div class="mt-6 pt-4 flex items-center gap-2 text-[12px] text-3" style="border-top:1px dashed var(--line-2)">
            <i data-lucide="plus" class="size-3.5"></i>
            <span>Continue drafting: Pricing models compared</span>
          </div>
        </div>
      </div>`;

    // ASIDE: SEO checklist + meta + word count
    const checks = d.seoChecks.map(s => `
      <div class="chk">
        <div class="chk-box" style="background:${s.pass ? 'var(--acc)' : 'var(--bg-4)'};box-shadow:${s.pass ? 'none' : 'inset 0 0 0 1px var(--line-2)'}">
          ${s.pass ? `<i data-lucide="check" class="size-3" style="color:#04130d"></i>` : ''}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[11.5px] ${s.pass ? 'text-2' : 'text-1'} leading-snug">${s.label}</div>
          ${s.note ? `<div class="text-[10px] text-3 num mt-0.5">${s.note}</div>` : ''}
        </div>
      </div>`).join('');
    const passCount = d.seoChecks.filter(s => s.pass).length;

    const aside = `
      <div class="ws-pad">
        <div class="flex items-center justify-between mb-2">
          <div class="eyebrow">SEO checklist</div>
          <span class="num text-[11px] ${passCount >= 6 ? 'text-acc' : 'text-amber'}">${passCount}/${d.seoChecks.length}</span>
        </div>
        <div class="mb-2">${LX.bar(passCount / d.seoChecks.length * 100, passCount >= 6 ? 'var(--acc)' : 'var(--amber)')}</div>
        <div class="mb-5">${checks}</div>

        <div class="eyebrow mb-2">Word count</div>
        <div class="rounded-lg px-3 py-3 mb-5" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
          <div class="flex items-baseline gap-2">
            <span class="num text-[22px] font-semibold text-1">${d.words.toLocaleString()}</span>
            <span class="text-[11px] text-3 num">/ ${d.wordTarget.toLocaleString()} target</span>
          </div>
          <div class="mt-2">${LX.bar(wordPct, wordPct >= 100 ? 'var(--acc)' : 'var(--sky)')}</div>
          <div class="text-[10.5px] text-3 num mt-1.5">${wordPct}% of target &middot; ${(d.wordTarget - d.words).toLocaleString()} to go</div>
        </div>

        <div class="eyebrow mb-2">Meta</div>
        <div class="rounded-lg px-3 py-3" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
          <div class="scr-field">Title (${d.metaTitle.length} chars)</div>
          <div class="text-[12px] text-1 leading-snug mb-2.5">${d.metaTitle}</div>
          <div class="scr-field">Description (${d.metaDescription.length} chars)</div>
          <div class="text-[11.5px] text-2 leading-snug mb-2.5">${d.metaDescription}</div>
          <div class="scr-field">Slug</div>
          <div class="text-[11.5px] num text-acc">${d.slug}</div>
        </div>
      </div>`;

    const header = `<div class="co-head">
      ${LX.modHead({ title: 'Blog and web engine', sub: 'Long-form drafting against a live SEO target. Nothing publishes without review.',
        actions: `${UI.btn('Pipeline', { variant: 'secondary', size: 'sm', icon: 'kanban', onClick: "navigate('content')" })}` })}
      ${subNav('content.blog')}
    </div>`;

    return `${styles}
      <div class="co-shell">
        ${header}
        <div style="flex:1; min-height:0;">
          ${LX.workspace({ cols: '300px 1fr 300px', rail, main, aside })}
        </div>
      </div>`;
  };

  // ====================================================================
  // PAGES['content.social'] :: SCRIPTING WORKSPACE - IG/TikTok script
  // ====================================================================
  window.PAGES['content.social'] = function () {
    const c = C();
    const s = c.socialScript;
    const cName = clientName(s.client), cColor = clientColor(s.client);
    const blockColor = { Hook: 'var(--violet)', Body: 'var(--sky)', CTA: 'var(--acc)' };

    // RAIL: format + hook ideas
    const hooks = s.hookIdeas.map((h, i) => `
      <div class="co-rail-row ${i === 0 ? 'active' : ''}">
        <div class="flex items-start gap-2">
          <span class="num text-[10px] text-3 mt-0.5">${i + 1}</span>
          <span class="text-[11.5px] ${i === 0 ? 'text-1' : 'text-2'} leading-snug">${h}</span>
        </div>
      </div>`).join('');
    const rail = `
      <div class="co-sec">Format</div>
      <div class="px-3.5 pb-3">
        <div class="rounded-lg px-3 py-2.5" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
          <div class="flex items-center gap-2 mb-1.5">${typeIcon('social', '4')}<span class="text-[13px] font-semibold text-1">${s.format}</span></div>
          <div class="grid grid-cols-2 gap-2 mt-1">
            <div><div class="num text-[14px] text-1">${s.durationSec}s</div><div class="scr-field">runtime</div></div>
            <div><div class="num text-[14px] text-1">9:16</div><div class="scr-field">vertical</div></div>
          </div>
        </div>
      </div>
      <div class="co-sec" style="border-top:1px solid var(--line-1)">Hook ideas</div>
      ${hooks}
      <div class="px-3.5 py-3">
        ${UI.btn('Generate hooks', { variant: 'ghost', size: 'sm', icon: 'sparkles', onClick: "toast('Drafting 3 more hooks','info')" })}
      </div>`;

    // MAIN: script editor (Hook / Body / CTA + on-screen text + shot list)
    const scriptBlocks = s.blocks.map(b => `
      <div class="scr-block">
        <div class="flex items-center gap-2 mb-2">
          <span class="scr-tag" style="background:${blockColor[b.kind]}1f;color:${blockColor[b.kind]}">${b.kind}</span>
          <span class="num text-[10.5px] text-3">${b.sec}</span>
        </div>
        <div class="scr-field">On-screen text</div>
        <div class="input" style="height:auto;padding:6px 10px;margin-bottom:8px;font-size:12px">${b.onscreen}</div>
        <div class="scr-field">Voiceover / spoken</div>
        <div class="input" style="height:auto;padding:8px 10px;font-size:12.5px;line-height:1.55;white-space:pre-wrap">${b.text}</div>
      </div>`).join('');

    const shotList = s.shotList.map((sh, i) => `
      <div class="flex items-start gap-3 py-2" style="border-top:1px solid var(--line-1)">
        <span class="num text-[10px] text-3 mt-0.5 w-4">${i + 1}</span>
        <div class="flex-1 min-w-0">
          <div class="text-[12px] text-1 leading-snug">${sh.shot}</div>
          <div class="text-[10.5px] text-3 mt-0.5">${sh.note}</div>
        </div>
      </div>`).join('');

    const main = `
      <div class="ws-pad" style="max-width:680px">
        ${LX.recordHead({
          mark: `<i data-lucide="clapperboard" class="size-4"></i>`, markColor: cColor,
          title: s.title, sub: cName + ' &middot; ' + s.handle + ' &middot; ' + s.format,
          meta: [{ k: 'Runtime', v: s.durationSec + 's' }, { k: 'Blocks', v: s.blocks.length }, { k: 'Status', v: s.status }],
          actions: `${UI.btn('Send to review', { variant: 'primary', size: 'sm', icon: 'user-check', onClick: "toast('Sent to approval','success')" })}`,
        })}
        ${scriptBlocks}
        <div class="mt-4 rounded-lg p-4" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
          <div class="flex items-center gap-2 mb-1"><i data-lucide="camera" class="size-3.5 text-3"></i><div class="eyebrow">Shot list</div></div>
          ${shotList}
        </div>
        <div class="mt-4">
          <div class="eyebrow mb-1.5">Caption</div>
          <div class="input" style="height:auto;padding:8px 10px;font-size:12.5px;line-height:1.55;white-space:pre-wrap">${s.caption}</div>
        </div>
      </div>`;

    // ASIDE: phone preview
    const aside = `
      <div class="ws-pad">
        <div class="eyebrow mb-3">Preview</div>
        <div class="phone mx-auto">
          <div class="phone-screen" style="aspect-ratio:9/16;position:relative">
            <div class="absolute inset-0 flex items-center justify-center" style="background:var(--bg-4)">
              <div class="text-center"><i data-lucide="play" class="size-8 text-3 mx-auto"></i><div class="text-[10px] text-3 mt-2 num">1080 x 1920</div></div>
            </div>
            <div class="absolute" style="top:14px;left:12px;right:12px">
              <span class="scr-tag" style="background:rgba(0,0,0,0.55);color:#fff;backdrop-filter:blur(2px)">${s.blocks[0].onscreen}</span>
            </div>
            <div class="absolute" style="bottom:12px;left:12px;right:44px">
              <div class="text-[11px] text-1 font-semibold num">${s.handle}</div>
              <div class="text-[10.5px] text-2 leading-snug mt-1" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${s.caption}</div>
            </div>
            <div class="absolute flex flex-col items-center gap-3 text-1" style="bottom:14px;right:10px">
              <i data-lucide="heart" class="size-5"></i><i data-lucide="message-circle" class="size-5"></i><i data-lucide="bookmark" class="size-5"></i><i data-lucide="send" class="size-5"></i>
            </div>
          </div>
        </div>
        <div class="mt-5 rounded-lg px-3.5 py-3" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
          <div class="eyebrow mb-2">Projected</div>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div><div class="num text-[15px] font-semibold text-1">${(s.projected.views / 1000).toFixed(0)}k</div><div class="text-[10px] text-3">views</div></div>
            <div><div class="num text-[15px] font-semibold text-1">${(s.projected.saves / 1000).toFixed(1)}k</div><div class="text-[10px] text-3">saves</div></div>
            <div><div class="num text-[15px] font-semibold text-1">${s.projected.ctr}%</div><div class="text-[10px] text-3">CTR</div></div>
          </div>
        </div>
      </div>`;

    const header = `<div class="co-head">
      ${LX.modHead({ title: 'Social scripting', sub: 'Write the hook, the beats, the on-screen text and the shot list. Preview as you go.',
        actions: `${UI.btn('Pipeline', { variant: 'secondary', size: 'sm', icon: 'kanban', onClick: "navigate('content')" })}` })}
      ${subNav('content.social')}
    </div>`;

    return `${styles}
      <div class="co-shell">
        ${header}
        <div style="flex:1; min-height:0;">
          ${LX.workspace({ cols: '300px 1fr 300px', rail, main, aside })}
        </div>
      </div>`;
  };

  // ====================================================================
  // PAGES['content.video'] :: SCRIPT WORKSPACE - scene blocks
  // ====================================================================
  window.PAGES['content.video'] = function () {
    const c = C();
    const v = c.videoScript;
    const cName = clientName(v.client), cColor = clientColor(v.client);
    const totalDur = v.scenes.reduce((a, s) => a + s.dur, 0);

    // RAIL: brief / angle
    const rail = `
      <div class="co-sec">Brief</div>
      <div class="px-3.5 pb-3">
        <div class="flex items-center gap-2 mb-2">${typeIcon('video', '4')}<span class="text-[13px] font-semibold text-1">${v.format}</span></div>
        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-lg px-3 py-2" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)"><div class="num text-[16px] text-1">${v.durationSec}s</div><div class="scr-field">target</div></div>
          <div class="rounded-lg px-3 py-2" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)"><div class="num text-[16px] ${totalDur > v.durationSec ? 'text-amber' : 'text-acc'}">${totalDur}s</div><div class="scr-field">scripted</div></div>
        </div>
      </div>
      <div class="co-sec" style="border-top:1px solid var(--line-1)">Angle</div>
      <div class="px-3.5 pb-4"><p class="text-[12px] text-2 leading-relaxed">${v.angle}</p></div>
      <div class="co-sec" style="border-top:1px solid var(--line-1)">Scenes</div>
      <div class="px-3.5 pb-4">
        ${v.scenes.map(s => `<div class="flex items-center gap-2 py-1.5" style="border-top:1px solid var(--line-1)"><span class="num text-[10px] text-3 w-4">${s.n}</span><span class="text-[11.5px] text-2 flex-1 min-w-0 truncate">${s.label}</span><span class="num text-[10px] text-3">${s.dur}s</span></div>`).join('')}
      </div>`;

    // MAIN: scene blocks (scene, voiceover, visual, duration)
    const sceneRows = v.scenes.map(s => `
      <div class="scene-row">
        <div>
          <div class="scene-n">${s.n}</div>
          <div class="text-[10px] text-3 mt-0.5">${s.label}</div>
        </div>
        <div>
          <div class="scr-field">Voiceover</div>
          <div class="text-[12.5px] text-1 leading-relaxed">${s.vo}</div>
        </div>
        <div>
          <div class="scr-field">Visual</div>
          <div class="text-[12px] text-2 leading-snug">${s.visual}</div>
        </div>
        <div class="text-right"><span class="num text-[13px] text-1">${s.dur}s</span></div>
      </div>`).join('');

    const main = `
      <div class="ws-pad">
        ${LX.recordHead({
          mark: `<i data-lucide="film" class="size-4"></i>`, markColor: cColor,
          title: v.title, sub: cName + ' &middot; ' + v.format + ' &middot; ' + v.scenes.length + ' scenes',
          meta: [{ k: 'Target', v: v.durationSec + 's' }, { k: 'Scripted', v: totalDur + 's' }, { k: 'Status', v: v.status }],
          actions: `
            ${UI.btn('Save', { variant: 'secondary', size: 'sm', icon: 'save', onClick: "toast('Script saved','info')" })}
            ${UI.btn('Send to review', { variant: 'primary', size: 'sm', icon: 'user-check', onClick: "toast('Sent to approval','success')" })}`,
        })}
        <div class="panel" style="overflow:hidden">
          <div class="scene-row" style="background:var(--bg-1);border-bottom:1px solid var(--line-1)">
            <div class="eyebrow">Scene</div><div class="eyebrow">Voiceover</div><div class="eyebrow">Visual</div><div class="eyebrow text-right">Dur</div>
          </div>
          ${sceneRows}
          <div class="flex items-center justify-between px-4 py-2.5" style="border-top:1px solid var(--line-1)">
            <button class="flex items-center gap-1.5 text-[12px] text-3 hover:text-1" data-action="modal" data-title="Add scene"><i data-lucide="plus" class="size-3.5"></i>Add scene</button>
            <span class="num text-[12px] ${totalDur > v.durationSec ? 'text-amber' : 'text-acc'}">${totalDur}s total</span>
          </div>
        </div>
      </div>`;

    // ASIDE: storyboard / shot list
    const frames = v.storyboard.map(f => `
      <div class="rounded-lg overflow-hidden" style="box-shadow:inset 0 0 0 1px var(--line-1)">
        <div class="flex items-center justify-center" style="aspect-ratio:16/9;background:var(--bg-4)">
          <div class="text-center"><span class="num text-[11px] text-3">Frame ${f.frame}</span></div>
        </div>
        <div class="px-2.5 py-2" style="background:var(--bg-2)">
          <div class="text-[11px] text-1 leading-snug">${f.label}</div>
          <div class="text-[10px] text-3 mt-0.5">${f.note}</div>
        </div>
      </div>`).join('');

    const aside = `
      <div class="ws-pad">
        <div class="eyebrow mb-3">Storyboard</div>
        <div class="grid grid-cols-1 gap-2.5">${frames}</div>
      </div>`;

    const header = `<div class="co-head">
      ${LX.modHead({ title: 'Video scripts', sub: 'Scene-by-scene voiceover and visuals with a running storyboard.',
        actions: `${UI.btn('Pipeline', { variant: 'secondary', size: 'sm', icon: 'kanban', onClick: "navigate('content')" })}` })}
      ${subNav('content.video')}
    </div>`;

    return `${styles}
      <div class="co-shell">
        ${header}
        <div style="flex:1; min-height:0;">
          ${LX.workspace({ cols: '280px 1fr 280px', rail, main, aside })}
        </div>
      </div>`;
  };

  // ====================================================================
  // PAGES['content.ads'] :: VARIATIONS GRID - ad-copy variants matrix
  // ====================================================================
  window.PAGES['content.ads'] = function () {
    const c = C();
    const allVariants = c.adGroups.reduce((a, g) => a + g.variants.length, 0);
    const winners = c.adGroups.reduce((a, g) => a + g.variants.filter(v => v.status === 'winner').length, 0);
    const testing = c.adGroups.reduce((a, g) => a + g.variants.filter(v => v.status === 'testing').length, 0);

    const statusTag = (s) => s === 'winner' ? `<span class="status status-green text-[10px]">Winner</span>`
      : s === 'testing' ? `<span class="status status-amber text-[10px]">A/B testing</span>`
      : s === 'paused' ? `<span class="status status-slate text-[10px]">Paused</span>`
      : `<span class="status status-slate text-[10px]">Draft</span>`;

    const groupBlock = (g) => {
      const rows = g.variants.map(v => `
        <tr data-action="detail" data-title="${escA(v.headline)}" data-sub="${escA(clientName(g.client))} / ${g.platform}"
            data-kv='[["Framework","${v.framework}"],["CTA","${v.cta}"],["CTR","${v.ctr}%"],["CPA","$${v.cpa}"],["Status","${v.status}"]]'>
          <td style="width:120px"><span class="tag tag-slate">${v.framework}</span></td>
          <td><div class="text-[12.5px] font-medium text-1 leading-snug">${v.headline}</div></td>
          <td style="max-width:380px"><div class="text-[11.5px] text-2 leading-snug">${v.primary}</div></td>
          <td style="width:110px"><span class="text-[11.5px] text-acc">${v.cta}</span></td>
          <td class="r" style="width:64px">${v.ctr > 0 ? `<span class="${v.ctr >= 5 ? 'text-acc' : 'text-1'}">${v.ctr}%</span>` : `<span class="text-3">-</span>`}</td>
          <td class="r" style="width:64px">${v.cpa > 0 ? `<span class="text-1">$${v.cpa}</span>` : `<span class="text-3">-</span>`}</td>
          <td style="width:120px">${statusTag(v.status)}</td>
        </tr>`).join('');
      return `
        <tr class="var-group">
          <td colspan="7">
            <div class="flex items-center gap-2.5">
              ${cdot(g.client, 8)}
              <span class="text-[12px] font-semibold text-1">${clientName(g.client)}</span>
              <span class="text-[11px] text-3">&middot; ${g.platform}</span>
              <span class="text-[11px] text-3 truncate">&middot; ${g.objective}</span>
              <span class="num text-[10.5px] text-4 ml-auto">${g.variants.length} variants</span>
            </div>
          </td>
        </tr>
        ${rows}`;
    };

    const grid = `
      <div class="dlist-wrap" style="flex:1">
        <table class="var-grid">
          <thead><tr>
            <th>Framework</th><th>Headline</th><th>Primary text</th><th>CTA</th>
            <th class="r">CTR</th><th class="r">CPA</th><th>A/B status</th>
          </tr></thead>
          <tbody>${c.adGroups.map(groupBlock).join('')}</tbody>
        </table>
      </div>`;

    const header = `<div class="co-head">
      ${LX.modHead({
        title: 'Ad copy engine',
        sub: allVariants + ' variants across ' + c.adGroups.length + ' ad sets - tested by framework, the winner ships to the platform.',
        stats: [
          { k: 'Variants', v: allVariants },
          { k: 'Winners live', v: winners },
          { k: 'In test', v: testing },
          { k: 'Ad sets', v: c.adGroups.length },
        ],
        actions: `
          ${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
          ${UI.btn('New variant', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New ad variant"`)}`,
      })}
      ${subNav('content.ads')}
      <div class="toolbar" style="margin-bottom:0;margin-top:8px">
        ${UI.searchInput('Search headlines and copy', 'w-72')}
        ${LX.segmented([{ id: 'all', label: 'All' }, { id: 'meta', label: 'Meta' }, { id: 'google', label: 'Google Search' }])}
        <div class="grow"></div>
        ${UI.btn('Framework', { variant: 'ghost', size: 'sm', icon: 'sliders-horizontal' }).replace('<button', `<button data-action="menu" data-menu='["All frameworks","PAS","AIDA","Benefit","Trust"]'`)}
      </div>
    </div>`;

    return `${styles}
      <div class="co-shell">
        ${header}
        <div style="flex:1; min-height:0; display:flex; flex-direction:column; overflow:auto;">
          ${grid}
        </div>
      </div>`;
  };

  // ====================================================================
  // PAGES['content.email'] :: WORKSPACE - sequence + email editor
  // ====================================================================
  window.PAGES['content.email'] = function () {
    const c = C();
    const seq = c.emailSequence;
    const a = seq.active;
    const cName = clientName(seq.client), cColor = clientColor(seq.client);

    const stepDot = { live: 'green', draft: 'slate', planned: 'slate' };
    // RAIL: sequence steps
    const steps = seq.steps.map(st => `
      <div class="co-rail-row ${st.n === a.step ? 'active' : ''}">
        <div class="flex items-center gap-2 mb-1">
          <span class="num text-[10px] text-3 w-4">${st.n}</span>
          <span class="text-[11.5px] font-medium text-1 truncate flex-1">${st.name}</span>
          <span class="status status-${stepDot[st.status]} text-[9px] shrink-0">${st.status}</span>
        </div>
        <div class="flex items-center gap-3 text-[10px] text-3 num pl-6">
          <span><i data-lucide="clock" class="size-3 inline"></i> ${st.delay}</span>
          ${st.open > 0 ? `<span>${st.open}% open</span><span>${st.click}% click</span>` : ''}
        </div>
      </div>`).join('');
    const rail = `
      <div class="co-sec">Sequence</div>
      <div class="px-3.5 pb-2">
        <div class="flex items-center gap-2 mb-1">${cdot(seq.client, 8)}<span class="text-[12px] font-semibold text-1">${seq.name}</span></div>
        <div class="text-[10.5px] text-3">${seq.steps.length} steps &middot; ${cName}</div>
      </div>
      ${steps}
      <div class="px-3.5 py-3"><button class="flex items-center gap-1.5 text-[12px] text-3 hover:text-1" data-action="modal" data-title="Add step"><i data-lucide="plus" class="size-3.5"></i>Add step</button></div>`;

    // MAIN: email body editor + subject
    const blockHtml = (b) => {
      if (b.kind === 'cta') return `<div class="my-3"><span class="btn btn-primary" style="pointer-events:none">${b.text}</span></div>`;
      if (b.kind === 'list') return `<ul class="my-3 pl-4" style="list-style:disc">${b.items.map(i => `<li class="doc-p" style="margin:4px 0">${i}</li>`).join('')}</ul>`;
      return `<p class="doc-p" style="margin:12px 0">${b.text}</p>`;
    };
    const main = `
      <div class="ws-pad" style="max-width:660px">
        ${LX.recordHead({
          mark: `<i data-lucide="mail" class="size-4"></i>`, markColor: cColor,
          title: 'Step ' + a.step + ' - ' + seq.steps[a.step - 1].name, sub: cName + ' &middot; ' + seq.name,
          meta: [{ k: 'From', v: a.handle }, { k: 'Step', v: a.step + ' / ' + seq.steps.length }, { k: 'Status', v: 'Live' }],
          actions: `
            ${UI.btn('Send test', { variant: 'secondary', size: 'sm', icon: 'send', onClick: "toast('Test email sent','info')" })}
            ${UI.btn('Save', { variant: 'primary', size: 'sm', icon: 'save', onClick: "toast('Email saved','success')" })}`,
        })}
        <div class="mb-2">
          <div class="scr-field">Subject line</div>
          <div class="input" style="font-size:13.5px;font-weight:500">${a.subject}</div>
        </div>
        <div class="mb-4">
          <div class="scr-field">Preview text</div>
          <div class="input" style="font-size:12px;color:var(--text-2)">${a.preview}</div>
        </div>
        <div class="rounded-lg overflow-hidden" style="box-shadow:inset 0 0 0 1px var(--line-1)">
          <div class="px-4 py-2.5 flex items-center gap-2" style="background:var(--bg-1);border-bottom:1px solid var(--line-1)">
            ${UI.avatar(a.handle, cColor, 24)}
            <div class="min-w-0"><div class="text-[12px] text-1 font-medium">${a.handle}</div><div class="text-[10.5px] text-3 num">${a.fromEmail}</div></div>
          </div>
          <div class="px-5 py-4" style="background:var(--bg-1)">
            <div class="doc-h2" style="margin-top:0;font-size:16px">${a.subject}</div>
            ${a.blocks.map(blockHtml).join('')}
          </div>
        </div>
      </div>`;

    // ASIDE: preview + subject A/B
    const abRows = a.subjectAB.map(t => `
      <div class="rounded-lg px-3 py-2.5 mb-2" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px ${t.status === 'winner' ? 'var(--acc-line)' : 'var(--line-1)'}">
        <div class="flex items-center gap-2 mb-1">
          <span class="num text-[11px] font-semibold text-1">${t.v}</span>
          ${t.status === 'winner' ? `<span class="status status-green text-[9px]">Winner</span>` : `<span class="status status-amber text-[9px]">Testing</span>`}
          <span class="num text-[11px] text-1 ml-auto">${t.open}%</span>
        </div>
        <div class="text-[11.5px] text-2 leading-snug">${t.text}</div>
        <div class="mt-1.5">${LX.bar(t.open, t.status === 'winner' ? 'var(--acc)' : 'var(--amber)')}</div>
      </div>`).join('');
    const aside = `
      <div class="ws-pad">
        <div class="eyebrow mb-2">Inbox preview</div>
        <div class="rounded-lg px-3 py-2.5 mb-5" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
          <div class="flex items-center gap-2 mb-1.5">${UI.avatar(a.handle, cColor, 22)}<span class="text-[12px] font-medium text-1">${a.handle}</span><span class="num text-[10px] text-3 ml-auto">now</span></div>
          <div class="text-[12.5px] font-semibold text-1 leading-snug">${a.subject}</div>
          <div class="text-[11px] text-3 leading-snug mt-0.5 truncate">${a.preview}</div>
        </div>
        <div class="eyebrow mb-2">Subject line A/B</div>
        ${abRows}
        <div class="text-[10.5px] text-3 mt-2">Split sent to 20% of the list; the winner sends to the rest.</div>
      </div>`;

    const header = `<div class="co-head">
      ${LX.modHead({ title: 'Email engine', sub: 'Build the sequence step by step, write the body, and split-test the subject line.',
        actions: `${UI.btn('Pipeline', { variant: 'secondary', size: 'sm', icon: 'kanban', onClick: "navigate('content')" })}` })}
      ${subNav('content.email')}
    </div>`;

    return `${styles}
      <div class="co-shell">
        ${header}
        <div style="flex:1; min-height:0;">
          ${LX.workspace({ cols: '280px 1fr 300px', rail, main, aside })}
        </div>
      </div>`;
  };

  // ====================================================================
  // PAGES['content.calendar'] :: CALENDAR - month editorial grid
  // ====================================================================
  window.PAGES['content.calendar'] = function () {
    const c = C();
    const DAY_MS = 86400000;
    const today = new Date(window.TODAY + 'T00:00:00');
    const gridStart = new Date(today.getTime() - 7 * DAY_MS);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());
    const iso = (d) => d.toISOString().slice(0, 10);

    const byDate = {};
    c.calendar.forEach(p => {
      const d = new Date(today.getTime() + p.dayOffset * DAY_MS);
      (byDate[iso(d)] = byDate[iso(d)] || []).push(p);
    });
    c.suggestedBriefs.forEach(s => {
      const d = new Date(today.getTime() + s.gapDay * DAY_MS);
      (byDate[iso(d)] = byDate[iso(d)] || []).push({ ...s, status: 'suggested' });
    });

    const cells = [];
    for (let i = 0; i < 42; i++) cells.push(new Date(gridStart.getTime() + i * DAY_MS));

    const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const chip = (p) => {
      if (p.status === 'suggested') return `
        <div class="co-chip" style="box-shadow:inset 0 0 0 1px var(--acc-line);background:transparent"
             data-action="detail" data-title="${escA(p.title)}" data-sub="Suggested brief"
             data-kv='[["Client","${escA(clientName(p.client))}"],["Format","${TYPE[p.type].label}"],["Volume","${(p.volume || 0).toLocaleString()}"],["KD","${p.kd || '-'}"]]'>
          <i data-lucide="sparkles" class="size-3" style="color:var(--acc)"></i>
          <span class="cap" style="color:var(--text-3)">${p.title}</span>
        </div>`;
      const dim = p.status === 'published' ? '' : 'opacity:0.85';
      return `
        <div class="co-chip" style="box-shadow:inset 2px 0 0 ${TYPE[p.type].dot};${dim}"
             data-action="detail" data-title="${escA(p.title)}" data-sub="${escA(clientName(p.client))} / ${TYPE[p.type].label}"
             data-kv='[["Client","${escA(clientName(p.client))}"],["Format","${TYPE[p.type].label}"],["Status","${p.status}"]]'>
          ${typeIcon(p.type, '3')}${cdot(p.client, 6)}
          <span class="cap">${p.title}</span>
        </div>`;
    };
    const cell = (d) => {
      const key = iso(d);
      const isToday = key === window.TODAY;
      const inMonth = d.getMonth() === today.getMonth();
      const pieces = byDate[key] || [];
      const shown = pieces.slice(0, 3).map(chip).join('');
      const more = pieces.length > 3 ? `<span class="num text-[9.5px] text-3 pl-1">+${pieces.length - 3} more</span>` : '';
      return `
        <div class="co-cell ${inMonth ? '' : 'muted'} ${isToday ? 'today' : ''}">
          <div class="co-daynum">
            <span class="${inMonth ? '' : 'text-4'}">${isToday ? `<span class="pill num">${d.getDate()}</span>` : `<span class="num">${d.getDate()}</span>`}</span>
            ${pieces.length ? `<span class="num text-[9.5px] text-4">${pieces.length}</span>` : ''}
          </div>
          ${shown}${more}
        </div>`;
    };

    const legend = ['blog', 'landing', 'ad', 'email', 'social', 'video']
      .map(t => `<span class="flex items-center gap-1.5 text-[10.5px] text-3">${typeDot(t)}${TYPE[t].label}</span>`).join('');

    const grid = `<div class="co-cal">${dows.map(d => `<div class="co-dow">${d}</div>`).join('')}${cells.map(cell).join('')}</div>`;

    const sched = c.calendar.filter(p => p.status === 'scheduled').length;
    const pub = c.calendar.filter(p => p.status === 'published').length;

    const header = `<div class="co-head">
      ${LX.modHead({
        title: 'Editorial calendar',
        sub: 'Six weeks of published and scheduled pieces across every client and format.',
        stats: [
          { k: 'Scheduled', v: sched },
          { k: 'Published', v: pub },
          { k: 'Suggested', v: c.suggestedBriefs.length },
          { k: 'Clients', v: window.CLIENTS.length },
        ],
        actions: `
          ${UI.btn('Today', { variant: 'ghost', size: 'sm', icon: 'calendar-check' })}
          ${UI.btn('New brief', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New brief"`)}`,
      })}
      ${subNav('content.calendar')}
    </div>`;

    return `${styles}
      <div class="co-shell">
        ${header}
        <div class="co-toolbar"><span class="eyebrow mr-1">Legend</span>${legend}
          <div class="grow" style="flex:1"></div>
          <span class="flex items-center gap-1.5 text-[10.5px] text-3"><i data-lucide="sparkles" class="size-3" style="color:var(--acc)"></i>Suggested brief</span>
        </div>
        <div style="flex:1; overflow:auto; padding: 0 22px 22px;">${grid}</div>
      </div>`;
  };

  // ====================================================================
  // PAGES['content.library'] :: DENSE LIST - all assets, full-height
  // ====================================================================
  window.PAGES['content.library'] = function () {
    const c = C();
    const lib = c.library;
    const published = lib.filter(r => r.status === 'published');
    const totalViews = published.reduce((a, r) => a + r.views, 0);
    const totalLeads = lib.reduce((a, r) => a + r.leads, 0);

    const shortAgo = (days) => days < 0 ? `in ${Math.abs(days)}d` : days === 0 ? 'today' : `${days}d ago`;

    const list = LX.dataList({
      cls: 'tight',
      columns: [
        { key: 'title', label: 'Title', render: (r) => `
          <div class="flex items-center gap-2.5">
            ${typeIcon(r.type, '3.5')}
            <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:380px">${r.title}</span>
          </div>` },
        { key: 'type', label: 'Type', render: (r) => typeTag(r.type) },
        { key: 'client', label: 'Client', render: (r) => clientCell(r.client) },
        { key: 'author', label: 'Author', render: (r) => `<span class="flex items-center gap-1.5">${UI.avatar(teamName(r.author), teamColor(r.author), 18)}<span class="text-[11.5px] text-2">${teamName(r.author).split(' ')[0]}</span></span>` },
        { key: 'status', label: 'Status', render: (r) => statusPill(r.status) },
        { key: 'days', label: 'Published', align: 'r', mono: true, render: (r) => r.status === 'published' ? `<span class="text-2">${shortAgo(r.days)}</span>` : r.status === 'scheduled' ? `<span class="text-amber">${shortAgo(r.days)}</span>` : `<span class="text-3">-</span>` },
        { key: 'words', label: 'Words', align: 'r', mono: true, render: (r) => `<span class="text-3">${r.words.toLocaleString()}</span>` },
        { key: 'views', label: 'Views', align: 'r', mono: true, render: (r) => r.views > 0 ? `<span class="text-1">${r.views.toLocaleString()}</span>` : `<span class="text-3">-</span>` },
        { key: 'leads', label: 'Leads', align: 'r', mono: true, render: (r) => r.leads > 0 ? `<span class="text-acc-bright">${r.leads}</span>` : `<span class="text-3">-</span>` },
      ],
      rows: lib,
      rowAttrs: (r) => `data-action="detail" data-title="${escA(r.title)}" data-sub="${escA(clientName(r.client))} / ${TYPE[r.type].label}" data-kv='[["Client","${escA(clientName(r.client))}"],["Author","${escA(teamName(r.author))}"],["Status","${(STATUS[r.status] || STATUS.draft).label}"],["Words","${r.words.toLocaleString()}"],["Views","${r.views.toLocaleString()}"],["Leads","${r.leads}"]]'`,
    });

    const header = `<div class="co-head">
      ${LX.modHead({
        title: 'Library',
        sub: lib.length + ' assets across every client and format - drafts, scheduled, and everything live.',
        stats: [
          { k: 'Assets', v: lib.length },
          { k: 'Published', v: published.length },
          { k: 'Total views', v: (totalViews / 1000).toFixed(0) + 'K' },
          { k: 'Total leads', v: totalLeads },
        ],
        actions: `
          ${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
          ${UI.btn('New asset', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New asset"`)}`,
      })}
      ${subNav('content.library')}
      <div class="toolbar" style="margin-bottom:0;margin-top:8px">
        ${UI.searchInput('Search the library', 'w-72')}
        ${LX.segmented([{ id: 'all', label: 'All' }, { id: 'published', label: 'Published' }, { id: 'pipeline', label: 'In pipeline' }])}
        <div class="grow"></div>
        ${UI.btn('Type', { variant: 'ghost', size: 'sm', icon: 'sliders-horizontal' }).replace('<button', `<button data-action="menu" data-menu='["All types","Blog","Landing","Ad copy","Email","Social","Video"]'`)}
      </div>
    </div>`;

    return `${styles}
      <div class="co-shell">
        ${header}
        <div style="flex:1; min-height:0; overflow:auto;">${list}</div>
      </div>`;
  };

})();
