/* ====================================================================
   FACILITIES - List + split-canvas detail with inspector
   ==================================================================== */

PAGES.facilities = () => {
  const fs = window.FACILITIES;
  return `
    <div class="flex items-start justify-between mb-8">
      <div>
        <div class="eyebrow mb-2.5">All clients</div>
        <h1 class="h1">Facilities</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">15 active across 4 clients. 13 healthy, 1 at-risk, 1 suspended.</p>
      </div>
      <div class="flex items-center gap-1.5">
        ${UI.btn('Bulk audit', { variant: 'secondary', icon: 'shield-check', size: 'sm', onClick: "toast('Audit queued for 15 facilities')" })}
        ${UI.btn('Add facility', { variant: 'primary', icon: 'plus', size: 'sm' })}
      </div>
    </div>

    <div class="flex items-center gap-2 mb-6">
      ${UI.searchInput('Search facilities, cities, keywords')}
      ${UI.filterPill('All clients', 'building-2')}
      ${UI.filterPill('All statuses', 'circle')}
      ${UI.filterPill('Sort: rank', 'arrow-down-wide-narrow')}
      <div class="ml-auto flex items-center gap-1 p-0.5 rounded-md" style="background: var(--bg-2); border: 1px solid var(--line-1);">
        <button class="size-6 rounded flex items-center justify-center text-1" style="background: var(--bg-3);"><i data-lucide="layout-grid" class="size-3"></i></button>
        <button class="size-6 rounded flex items-center justify-center text-3"><i data-lucide="list" class="size-3"></i></button>
        <button class="size-6 rounded flex items-center justify-center text-3"><i data-lucide="map" class="size-3"></i></button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3">
      ${fs.map(f => {
        const c = getClient(f.client_id);
        const dot = f.gbp_status === 'suspended' ? 'red' : f.gbp_status === 'at_risk' ? 'amber' : 'green';
        const statusLabel = f.gbp_status === 'at_risk' ? 'At risk' : f.gbp_status === 'suspended' ? 'Suspended' : 'Active';
        return `
          <div class="surface surface-hover p-4 cursor-pointer" onclick="navigate('facility', {id: '${f.id}'})">
            <div class="flex items-start justify-between mb-4">
              <div class="min-w-0 flex-1">
                <div class="text-[13px] font-medium text-1 truncate">${f.name}</div>
                <div class="text-[10.5px] text-3 mt-0.5">${f.city}, ${f.state} . ${c?.name || ''}</div>
              </div>
              <span class="status status-${dot} shrink-0 ml-2">${statusLabel}</span>
            </div>
            <div class="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div class="eyebrow text-[9px] mb-1.5">Rank</div>
                <div class="text-[22px] font-semibold num text-1 leading-none">${f.rank.toFixed(1)}</div>
                <div class="text-[10px] num mt-1.5 ${f.rank_delta < 0 ? 'text-acc-bright' : 'text-red'}">${formatDelta(-f.rank_delta)}</div>
              </div>
              <div>
                <div class="eyebrow text-[9px] mb-1.5">Reviews</div>
                <div class="text-[22px] font-semibold num text-1 leading-none">${f.reviews}</div>
                <div class="text-[10px] text-3 mt-1.5">${f.rating} star</div>
              </div>
              <div>
                <div class="eyebrow text-[9px] mb-1.5">Audit</div>
                <div class="text-[22px] font-semibold num leading-none ${f.audit_score >= 75 ? 'text-acc-bright' : f.audit_score >= 60 ? 'text-amber' : 'text-red'}">${f.audit_score}</div>
                <div class="text-[10px] text-3 mt-1.5">/100</div>
              </div>
            </div>
            <div class="text-[10.5px] text-3 truncate mb-2.5">"${f.top_kw}"</div>
            <div class="flex items-center justify-between text-[10.5px] text-3 pt-2.5" style="border-top: 1px solid var(--line-1);">
              <div class="flex items-center gap-3 num">
                <span class="flex items-center gap-1"><i data-lucide="phone" class="size-2.5"></i>${f.gbp_calls}</span>
                <span class="flex items-center gap-1"><i data-lucide="link" class="size-2.5"></i>${f.citations}</span>
              </div>
              <i data-lucide="arrow-right" class="size-3 text-4"></i>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

PAGES.facility = (params) => {
  const id = params?.id || 'bs-athens-1';
  const f = getFacility(id) || window.FACILITIES[0];
  const c = getClient(f.client_id);
  const grid = window.GEO_GRID(f.rank);
  const strategy = window.STRATEGIES.find(s => s.facility === f.id) || window.STRATEGIES[0];
  const dot = f.gbp_status === 'suspended' ? 'red' : f.gbp_status === 'at_risk' ? 'amber' : 'green';
  const statusLabel = f.gbp_status === 'at_risk' ? 'At risk' : f.gbp_status === 'suspended' ? 'Suspended' : 'Active';

  return `
    <div class="flex items-center gap-1.5 mb-5 text-[11.5px]">
      <button onclick="navigate('facilities')" class="text-2 hover:text-1 flex items-center gap-1"><i data-lucide="arrow-left" class="size-3"></i> Facilities</button>
      <span class="text-4">/</span>
      <span class="text-3">${c?.name}</span>
      <span class="text-4">/</span>
      <span class="text-1 font-medium">${f.name}</span>
    </div>

    <div class="surface glow-stat p-7 mb-5">
      <div class="flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <span class="status status-${dot}">${statusLabel}</span>
            <span class="text-[11px] text-3 mono">${f.address}</span>
          </div>
          <h1 class="text-[28px] font-semibold tracking-tight leading-none">${f.name}</h1>
          <div class="text-[12px] text-2 mt-3 flex items-center gap-4">
            <span class="flex items-center gap-1.5"><i data-lucide="map-pin" class="size-3 text-3"></i>${f.city}, ${f.state}</span>
            <span class="flex items-center gap-1.5"><i data-lucide="building" class="size-3 text-3"></i>${c?.name}</span>
            <span class="flex items-center gap-1.5"><i data-lucide="search" class="size-3 text-3"></i>"${f.top_kw}"</span>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          ${UI.btn('Run audit', { variant: 'secondary', icon: 'shield-check', size: 'sm', onClick: "toast('Audit queued')" })}
          ${UI.btn('Edit GBP', { variant: 'secondary', icon: 'map-pin', size: 'sm', onClick: "navigate('gbp')" })}
          ${UI.btn('Open in Maps', { variant: 'ghost', icon: 'external-link', size: 'sm' })}
        </div>
      </div>

      <div class="grid grid-cols-6 gap-x-8 mt-7 pt-6" style="border-top: 1px solid var(--line-1);">
        ${[
          { label: 'Rank',          value: f.rank.toFixed(1), delta: -f.rank_delta, deltaLabel: ' pos', better: f.rank_delta < 0 },
          { label: 'Reviews',       value: f.reviews,           delta: f.review_delta, deltaLabel: ' /wk' },
          { label: 'Rating',        value: f.rating + 'star',  sub: 'all-time avg' },
          { label: 'GBP calls',     value: f.gbp_calls,         delta: f.gbp_calls_delta * 100, deltaLabel: '%' },
          { label: 'Citations',     value: f.citations,          sub: 'of 60 target' },
          { label: 'Audit score',   value: f.audit_score,        sub: '/100' },
        ].map(k => `
          <div>
            <div class="eyebrow mb-2">${k.label}</div>
            <div class="flex items-baseline gap-1.5">
              <span class="text-[24px] font-semibold num text-1 leading-none">${k.value}</span>
              ${k.delta != null ? `<span class="text-[11px] num ${(k.better || k.delta > 0) ? 'text-acc-bright' : 'text-red'}">${k.delta > 0 ? '↑' : '↓'} ${Math.abs(k.delta).toFixed ? Math.abs(k.delta).toFixed(1) : Math.abs(k.delta)}${k.deltaLabel}</span>` : ''}
            </div>
            ${k.sub ? `<div class="text-[10px] text-3 mt-1.5">${k.sub}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="flex mb-6" style="border-bottom: 1px solid var(--line-1);">
      <button onclick="UI.switchTab('fac','overview')" data-tab="fac-overview" class="tab active">Overview</button>
      <button onclick="UI.switchTab('fac','strategy')" data-tab="fac-strategy" class="tab">Strategy</button>
      <button onclick="UI.switchTab('fac','geo')" data-tab="fac-geo" class="tab">Geo-grid</button>
      <button onclick="UI.switchTab('fac','content')" data-tab="fac-content" class="tab">Content<span class="tab-count">${window.CONTENT_PIECES.filter(c => c.facility === f.id).length}</span></button>
      <button onclick="UI.switchTab('fac','reviews')" data-tab="fac-reviews" class="tab">Reviews<span class="tab-count">${f.reviews}</span></button>
      <button onclick="UI.switchTab('fac','audit')" data-tab="fac-audit" class="tab">Audit</button>
    </div>

    <div data-tab-pane="fac-overview">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-8 space-y-5">

          <div class="surface p-6">
            <div class="flex items-center justify-between mb-5">
              <div>
                <div class="h3">Rank trajectory</div>
                <div class="text-[11px] text-3 mt-0.5">"${f.top_kw}" . last 90 days</div>
              </div>
              <div class="flex gap-1">
                <button class="btn btn-ghost btn-sm">7d</button>
                <button class="btn btn-secondary btn-sm">90d</button>
                <button class="btn btn-ghost btn-sm">1y</button>
              </div>
            </div>
            <div class="h-56"><canvas id="fac-rank-chart"></canvas></div>
          </div>

          <div class="surface p-6">
            <div class="flex items-center justify-between mb-5">
              <div class="h3">Quick actions</div>
              <span class="text-[11px] text-3">6 available . 34 min total</span>
            </div>
            <div class="grid grid-cols-3 gap-2">
              ${[
                { label: 'Schedule GBP post',  time: '5 min',  icon: 'megaphone' },
                { label: 'Reply to 3 reviews', time: '8 min',  icon: 'star' },
                { label: 'Submit 5 citations', time: '12 min', icon: 'link' },
                { label: 'Validate schema',    time: '3 min',  icon: 'code-2' },
                { label: 'Generate brief',     time: '4 min',  icon: 'sparkles' },
                { label: 'Upload photo',       time: '2 min',  icon: 'image' },
              ].map(a => `
                <button class="surface surface-hover p-3.5 text-left group">
                  <div class="flex items-center justify-between mb-2.5">
                    <i data-lucide="${a.icon}" class="size-3.5 text-acc"></i>
                    <i data-lucide="arrow-right" class="size-3 text-4 group-hover:text-2 transition-colors"></i>
                  </div>
                  <div class="text-[12px] font-medium text-1 leading-snug">${a.label}</div>
                  <div class="text-[10.5px] text-3 mt-1 num">${a.time}</div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="col-span-4 space-y-5">

          ${f.gbp_status === 'suspended' || f.gbp_status === 'at_risk' ? `
            <div class="surface p-5" style="background: var(--bg-2); box-shadow: inset 0 0 0 1px var(--red-line);">
              <div class="flex items-center gap-2 mb-3">
                <span class="status status-red"></span>
                <span class="h3">${f.gbp_status === 'suspended' ? 'GBP suspended' : 'At-risk signals'}</span>
              </div>
              <div class="text-[12px] text-2 leading-relaxed mb-4">Recovery runbook is active. ${f.gbp_status === 'suspended' ? 'Step 3 of 12.' : 'Citation rebuild in progress.'}</div>
              <button onclick="navigate('runbooks')" class="btn btn-secondary btn-sm w-full">Open runbook <i data-lucide="arrow-right" class="size-3"></i></button>
            </div>
          ` : `
            <div class="surface p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="status status-green"></span>
                <span class="h3">All systems healthy</span>
              </div>
              <div class="text-[11.5px] text-3 ml-3.5">No active alerts</div>
            </div>
          `}

          <div class="surface p-5">
            <div class="h3 mb-4">GBP profile</div>
            <div class="space-y-2.5 text-[12px]">
              <div class="flex justify-between gap-3"><span class="text-3">Primary category</span><span class="text-1 text-right">Self-Storage</span></div>
              <div class="flex justify-between"><span class="text-3">Secondary</span><span class="text-1">4 set</span></div>
              <div class="flex justify-between"><span class="text-3">Photos</span><span class="text-1 num">42</span></div>
              <div class="flex justify-between"><span class="text-3">Last edit</span><span class="text-1">Apr 28</span></div>
              <div class="flex justify-between"><span class="text-3">Edit cooling</span><span class="${f.edit_cooling ? 'text-amber' : 'text-acc-bright'}">${f.edit_cooling ? 'In window' : 'Safe'}</span></div>
            </div>
          </div>

          <div class="surface p-5">
            <div class="h3 mb-4">Citation health</div>
            <div class="flex items-center gap-4 mb-4">
              ${scoreRing(f.citation_score, f.citation_score >= 80 ? '#10b981' : '#f59e0b', 56)}
              <div>
                <div class="text-[22px] font-semibold num text-1 leading-none">${f.citations}</div>
                <div class="text-[11px] text-3 mt-1.5">of 60 target</div>
              </div>
            </div>
            <button onclick="navigate('citations')" class="btn btn-secondary btn-sm w-full">Open pipeline <i data-lucide="arrow-right" class="size-3"></i></button>
          </div>
        </div>
      </div>
    </div>

    <div data-tab-pane="fac-strategy" class="hidden">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-8 space-y-5">
          <div class="surface p-6">
            <div class="flex items-center justify-between mb-5">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h2 class="h2">Strategy v${strategy.version}</h2>
                  <span class="status status-green">Approved</span>
                </div>
                <div class="text-[11.5px] text-3">By ${strategy.approved_by} . ${strategy.approved_at}</div>
              </div>
              <div class="flex gap-1">
                <button class="btn btn-ghost btn-sm">v2</button>
                <button class="btn btn-ghost btn-sm">Compare</button>
                <button class="btn btn-secondary btn-sm"><i data-lucide="edit-2" class="size-3"></i> Edit</button>
              </div>
            </div>

            <div class="mb-6">
              <div class="eyebrow mb-3">Current state</div>
              <div class="grid grid-cols-2 gap-2">
                <div class="p-3.5 rounded-md" style="background: var(--bg-3);">
                  <div class="eyebrow text-[9.5px] mb-1.5">Rank avg</div>
                  <div class="text-[18px] font-semibold num">${strategy.current_state.rank_avg}</div>
                  <div class="text-[10px] text-3 mt-1">was ${strategy.current_state.rank_at_start}</div>
                </div>
                <div class="p-3.5 rounded-md" style="background: var(--bg-3);">
                  <div class="eyebrow text-[9.5px] mb-1.5">Reviews</div>
                  <div class="text-[18px] font-semibold num">${strategy.current_state.reviews}</div>
                  <div class="text-[10px] text-acc-bright mt-1">+${strategy.current_state.reviews_in_may} May</div>
                </div>
                <div class="p-3.5 rounded-md" style="background: var(--bg-3);">
                  <div class="eyebrow text-[9.5px] mb-1.5">Citations</div>
                  <div class="text-[18px] font-semibold num">${strategy.current_state.citations} / ${strategy.current_state.citation_target}</div>
                </div>
                <div class="p-3.5 rounded-md" style="background: var(--bg-3);">
                  <div class="eyebrow text-[9.5px] mb-1.5">Keywords</div>
                  <div class="flex gap-1 mt-1.5">${strategy.current_state.keywords.slice(0, 2).map(k => `<span class="tag tag-acc">${k}</span>`).join('')}</div>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <div class="eyebrow mb-3">Q3 goals</div>
              ${strategy.goals.map(g => `
                <div class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-3 transition-colors">
                  <i data-lucide="target" class="size-3.5 text-acc"></i>
                  <div class="flex-1 text-[12.5px]">${g.target}</div>
                  <span class="text-[10.5px] text-3 mono">@${g.owner}</span>
                  <span class="status status-${g.status === 'on_track' ? 'green' : g.status === 'at_risk' ? 'amber' : 'red'}">${g.status.replace(/_/g, ' ')}</span>
                </div>
              `).join('')}
            </div>

            <div>
              <div class="eyebrow mb-3">Plan . next 30 days</div>
              ${strategy.plan.map((p, i) => `
                <div class="p-3.5 mb-2 rounded-md" style="background: var(--bg-3);">
                  <div class="flex items-center gap-2.5 mb-1">
                    <span class="size-5 rounded-full text-[10.5px] font-medium flex items-center justify-center num" style="background: var(--acc-soft); color: var(--acc-bright);">${i + 1}</span>
                    <span class="text-[12.5px] font-medium text-1">${p.title}</span>
                  </div>
                  <div class="ml-7 text-[10.5px] text-3 mono">${p.tasks.map(t => `<span class="text-acc">${t}</span>`).join(' . ')}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="col-span-4 space-y-5">
          <div class="surface p-5">
            <div class="h3 mb-4">Hypotheses</div>
            ${window.HYPOTHESES.filter(h => h.facility === f.id).map(h => `
              <div class="p-3 mb-2 rounded-md" style="background: var(--bg-3);">
                <div class="text-[11.5px] mb-2 leading-relaxed">${h.desc}</div>
                <div class="flex items-center justify-between text-[10.5px]">
                  <span class="text-3 num">${h.change_date} to ${h.measure_date}</span>
                  ${h.outcome === 'win' ? `<span class="status status-green">Win</span>` : h.outcome === 'in_progress' ? `<span class="status status-acc">Running</span>` : `<span class="status status-red">Miss</span>`}
                </div>
              </div>
            `).join('') || '<div class="text-[12px] text-3">No hypotheses yet.</div>'}
            <button class="btn btn-secondary btn-sm w-full mt-2"><i data-lucide="plus" class="size-3"></i> Add hypothesis</button>
          </div>

          <div class="surface p-5">
            <div class="h3 mb-4">Learnings</div>
            ${window.LEARNINGS.filter(l => l.facility === f.id).map(l => `
              <div class="text-[12px] py-2.5 leading-relaxed" style="border-bottom: 1px solid var(--line-1);">${l.title}</div>
            `).join('') || '<div class="text-[12px] text-3">Populated when hypotheses close.</div>'}
          </div>
        </div>
      </div>
    </div>

    <div data-tab-pane="fac-geo" class="hidden">
      <div class="surface p-8">
        <div class="flex items-center justify-between mb-7">
          <div>
            <div class="h3">Geo-grid . rank by location</div>
            <div class="text-[11.5px] text-3 mt-1">Around ${f.city} . "${f.top_kw}" . scanned 13 May 2026</div>
          </div>
          <div class="flex gap-1">
            <button class="btn btn-ghost btn-sm">5x5</button>
            <button class="btn btn-secondary btn-sm">7x7</button>
            <button class="btn btn-ghost btn-sm">11x11</button>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-7">
            <div class="grid grid-cols-7 gap-2 max-w-[480px] mx-auto">
              ${grid.flat().map((r, i) => {
                const h = heatColor(r);
                const isCenter = i === 24;
                return `<div class="heat-cell" style="background:${h.bg};color:${h.text};${isCenter ? 'box-shadow: 0 0 0 2px white, 0 0 0 4px ' + h.bg + ';' : ''}" data-tooltip="Rank ${r}">${r}</div>`;
              }).join('')}
            </div>
            <div class="flex items-center justify-center gap-6 mt-6 text-[10.5px] text-3">
              <span class="flex items-center gap-1.5"><span class="size-3 rounded-sm" style="background:#10b981"></span>1-3 best</span>
              <span class="flex items-center gap-1.5"><span class="size-3 rounded-sm" style="background:#84cc16"></span>4-7</span>
              <span class="flex items-center gap-1.5"><span class="size-3 rounded-sm" style="background:#f59e0b"></span>8-12</span>
              <span class="flex items-center gap-1.5"><span class="size-3 rounded-sm" style="background:#f43f5e"></span>13-20 worst</span>
            </div>
          </div>

          <div class="col-span-5 space-y-4">
            <div class="p-4 rounded-md" style="background: var(--bg-3);">
              <div class="eyebrow mb-2">Center rank</div>
              <div class="text-[40px] font-semibold num text-acc-bright leading-none">${f.rank.toFixed(1)}</div>
              <div class="text-[11px] text-3 mt-2">Position at facility coordinates</div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="eyebrow text-[9.5px] mb-1.5">5-mile avg</div>
                <div class="text-[18px] font-semibold num">${(f.rank + 2.3).toFixed(1)}</div>
              </div>
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="eyebrow text-[9.5px] mb-1.5">Visibility</div>
                <div class="text-[18px] font-semibold num text-acc-bright">${Math.max(0, 85 - f.rank * 3).toFixed(0)}%</div>
              </div>
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="eyebrow text-[9.5px] mb-1.5">In top-3</div>
                <div class="text-[18px] font-semibold num">${grid.flat().filter(r => r <= 3).length}/49</div>
              </div>
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="eyebrow text-[9.5px] mb-1.5">Below 10</div>
                <div class="text-[18px] font-semibold num text-red">${grid.flat().filter(r => r > 10).length}/49</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div data-tab-pane="fac-content" class="hidden">
      <div class="surface overflow-hidden">
        ${(window.CONTENT_PIECES.filter(c => c.facility === f.id)).map((c, i, arr) => `
          <div class="flex items-center gap-3 px-4 py-3 hover:bg-3 transition-colors ${i < arr.length - 1 ? 'border-b' : ''}" style="border-color: var(--line-1);">
            <span class="status status-${c.stage === 'live' ? 'green' : c.stage === 'scheduled' ? 'violet' : c.stage === 'review' ? 'amber' : c.stage === 'draft' ? 'sky' : 'slate'}">${c.stage}</span>
            <span class="text-[12.5px] flex-1">${c.title}</span>
            <span class="text-[11px] text-3 mono">${c.due || c.publish || c.published || ''}</span>
          </div>
        `).join('') || UI.emptyState({ icon: 'file-text', title: 'No content yet', body: 'Generate a brief to start' })}
      </div>
    </div>

    <div data-tab-pane="fac-reviews" class="hidden">
      <div class="surface p-5">
        ${(window.REVIEWS.filter(r => r.facility === f.id)).map((r, i, arr) => `
          <div class="py-4 ${i < arr.length - 1 ? 'border-b' : ''}" style="border-color: var(--line-1);">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-amber text-[12px]">${'*'.repeat(r.stars)}<span class="text-4">${'*'.repeat(5 - r.stars)}</span></span>
              <span class="text-[12.5px] font-medium text-1">${r.author}</span>
              <span class="text-[10.5px] text-3 mono">${r.date}</span>
            </div>
            <div class="text-[12.5px] text-2 leading-relaxed">${r.body}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div data-tab-pane="fac-audit" class="hidden">
      ${UI.btn('Open full audit', { variant: 'primary', icon: 'shield-check', onClick: "navigate('audit-suite')" })}
    </div>
  `;
};
PAGES_AFTER.facility = (params) => {
  const id = params?.id || 'bs-athens-1';
  const f = getFacility(id) || window.FACILITIES[0];
  const labels = Array.from({ length: 12 }, (_, i) => 'W' + (i + 1));
  const start = f.rank + 4;
  const data = labels.map((_, i) => +(start - (start - f.rank) * (i / 11) + (Math.random() - 0.5) * 0.4).toFixed(1));
  CHARTS.line('fac-rank-chart', labels, [
    { label: 'Rank', data, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.10)' },
  ], { scales: { y: { reverse: true, suggestedMin: 1, suggestedMax: Math.max(...data) + 1 } } });
};
