/* ============================================================
   FEATURE PAGES v3
   - Audit Suite (deep 142-check audit)
   - Keywords (research + tracking + cluster + SERP features)
   - Studio (AI content generation with agents and brand voice)
   - Competitors deep (rebuild with client selector + 10-12 competitors)
   ============================================================ */

/* =====================================================================
   LOCAL SEO AUDIT SUITE
   ===================================================================== */
PAGES['audit-suite'] = () => {
  const A = window.AUDIT_SUITE;
  const f = getFacility(A.facility);
  const totalChecks = A.categories.reduce((s, c) => s + c.checks.length, 0);
  const passedChecks = A.categories.reduce((s, c) => s + c.checks.filter(ch => ch.status === 'pass').length, 0);
  const warnChecks = A.categories.reduce((s, c) => s + c.checks.filter(ch => ch.status === 'warn').length, 0);
  const failChecks = A.categories.reduce((s, c) => s + c.checks.filter(ch => ch.status === 'fail').length, 0);

  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Delivery</div>
        <h1 class="h1">Local SEO audit suite</h1>
        <p class="text-[13px] text-2 mt-2 max-w-2xl leading-relaxed">${totalChecks}-check comprehensive audit across 8 categories. Ran ${A.ran_at} on ${f?.name} in ${A.duration_sec}s.</p>
      </div>
      <div class="flex items-center gap-1.5">
        ${UI.btn('Switch facility', { variant: 'secondary', icon: 'warehouse', size: 'sm' })}
        ${UI.btn('Re-run audit', { variant: 'primary', icon: 'play', size: 'sm', onClick: "toast('Audit queued','success')" })}
        ${UI.btn('Export PDF', { variant: 'ghost', icon: 'download', size: 'sm' })}
      </div>
    </div>

    <!-- Hero score -->
    <div class="surface glow-stat p-7 mb-6">
      <div class="grid grid-cols-12 gap-8 items-center">
        <div class="col-span-3 text-center">
          ${scoreRing(A.overall_score, A.overall_score >= 80 ? '#10b981' : A.overall_score >= 65 ? '#f59e0b' : '#f43f5e', 140)}
          <div class="text-[11px] text-3 mt-3">Overall score</div>
        </div>
        <div class="col-span-9">
          <div class="grid grid-cols-4 gap-x-7 gap-y-5">
            <div>
              <div class="eyebrow mb-1.5">Score change</div>
              <div class="flex items-baseline gap-2">
                <span class="text-[22px] font-semibold num text-acc-bright">+${A.overall_score - A.prior_score}</span>
                <span class="text-[11px] text-3">vs last audit</span>
              </div>
            </div>
            <div>
              <div class="eyebrow mb-1.5">Industry benchmark</div>
              <div class="text-[22px] font-semibold num text-2">${A.benchmark_score}</div>
            </div>
            <div>
              <div class="eyebrow mb-1.5">Checks passed</div>
              <div class="text-[22px] font-semibold num text-acc-bright">${passedChecks}<span class="text-[12px] text-3"> / ${totalChecks}</span></div>
            </div>
            <div>
              <div class="eyebrow mb-1.5">Critical issues</div>
              <div class="text-[22px] font-semibold num text-red">${failChecks}</div>
            </div>
          </div>

          <div class="mt-6 pt-5" style="border-top: 1px solid var(--line-1);">
            <div class="eyebrow mb-3">Distribution</div>
            <div class="flex items-center gap-1 h-3 rounded-full overflow-hidden">
              <div style="background: var(--acc); width: ${passedChecks/totalChecks*100}%;" data-tooltip="${passedChecks} passing"></div>
              <div style="background: var(--amber); width: ${warnChecks/totalChecks*100}%;" data-tooltip="${warnChecks} warnings"></div>
              <div style="background: var(--red); width: ${failChecks/totalChecks*100}%;" data-tooltip="${failChecks} failures"></div>
            </div>
            <div class="flex items-center gap-5 mt-3 text-[11px]">
              <span class="status status-green">${passedChecks} passing</span>
              <span class="status status-amber">${warnChecks} warnings</span>
              <span class="status status-red">${failChecks} failures</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category strip -->
    <div class="grid grid-cols-8 gap-2 mb-6">
      ${A.categories.map((c, i) => {
        const color = c.score >= 80 ? 'text-acc-bright' : c.score >= 65 ? 'text-amber' : 'text-red';
        return `
          <button onclick="document.querySelectorAll('.cat-tab').forEach(el=>el.classList.remove('active'));this.classList.add('active');document.querySelectorAll('.cat-panel').forEach(el=>el.classList.add('hidden'));document.getElementById('cat-${c.id}').classList.remove('hidden');" class="cat-tab surface surface-hover p-3 text-left ${i === 0 ? 'active' : ''}" style="${i === 0 ? 'background: var(--bg-3);' : ''}">
            <div class="text-[10px] uppercase tracking-wider text-3 font-medium mb-1.5 truncate">${c.name}</div>
            <div class="flex items-baseline justify-between">
              <span class="text-[20px] font-semibold num ${color} leading-none">${c.score}</span>
              <span class="text-[10px] num text-acc-bright">+${c.score - c.prior}</span>
            </div>
            <div class="mt-2 h-1 rounded-full overflow-hidden" style="background: var(--bg-4);">
              <div style="width:${c.score}%; height:100%; background:${c.score >= 80 ? 'var(--acc)' : c.score >= 65 ? 'var(--amber)' : 'var(--red)'}; border-radius:inherit;"></div>
            </div>
          </button>
        `;
      }).join('')}
    </div>

    <!-- Category detail panels -->
    ${A.categories.map((c, i) => `
      <div id="cat-${c.id}" class="cat-panel surface p-7 ${i === 0 ? '' : 'hidden'}">
        <div class="flex items-start justify-between mb-6">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h2 class="h2">${c.name}</h2>
              <span class="tag tag-acc">${c.weight}% weight</span>
            </div>
            <div class="text-[11.5px] text-3">${c.checks.length} checks . ${c.checks.filter(ch => ch.status === 'pass').length} passing</div>
          </div>
          <div class="text-right">
            <div class="eyebrow mb-1">Category score</div>
            <div class="text-[28px] font-semibold num leading-none ${c.score >= 80 ? 'text-acc-bright' : c.score >= 65 ? 'text-amber' : 'text-red'}">${c.score}</div>
            <div class="text-[10px] text-acc-bright num mt-1">+${c.score - c.prior} vs prior</div>
          </div>
        </div>

        <div class="space-y-1.5">
          ${c.checks.map(ch => {
            const statusColor = ch.status === 'pass' ? 'green' : ch.status === 'warn' ? 'amber' : 'red';
            const statusIcon = ch.status === 'pass' ? 'check-circle-2' : ch.status === 'warn' ? 'alert-triangle' : 'x-circle';
            const statusTextColor = ch.status === 'pass' ? 'text-acc-bright' : ch.status === 'warn' ? 'text-amber' : 'text-red';
            return `
              <div class="flex items-start gap-3 p-3 rounded-md hover:bg-3 transition-colors">
                <i data-lucide="${statusIcon}" class="size-3.5 ${statusTextColor} mt-0.5 shrink-0"></i>
                <div class="flex-1 min-w-0">
                  <div class="text-[12.5px] text-1 font-medium">${ch.label}</div>
                  ${ch.detail ? `<div class="text-[11px] text-3 mt-0.5">${ch.detail}</div>` : ''}
                  ${ch.recommendation ? `<div class="text-[11px] text-acc mt-1 flex items-start gap-1.5"><i data-lucide="sparkles" class="size-2.5 mt-0.5 shrink-0"></i><span>${ch.recommendation}</span></div>` : ''}
                </div>
                ${ch.status !== 'pass' ? `<button class="btn btn-secondary btn-sm">Fix</button>` : ''}
              </div>
            `;
          }).join('')}
        </div>

        ${c.checks.filter(ch => ch.status !== 'pass').length > 0 ? `
          <div class="flex gap-2 mt-6 pt-4" style="border-top: 1px solid var(--line-1);">
            ${UI.btn('AI auto-fix all', { variant: 'primary', icon: 'wand-2', size: 'sm', onClick: "toast('AI fix queued for " + c.checks.filter(ch => ch.status !== 'pass').length + " checks','success')" })}
            ${UI.btn('Export checklist', { variant: 'secondary', icon: 'download', size: 'sm' })}
          </div>
        ` : ''}
      </div>
    `).join('')}

    <!-- History sparkline -->
    <div class="surface p-6 mt-6">
      <div class="flex items-center justify-between mb-5">
        <div>
          <div class="h3">Audit history</div>
          <div class="text-[11px] text-3 mt-0.5">Weekly trend . last 8 audits</div>
        </div>
      </div>
      <div class="grid grid-cols-8 gap-2">
        ${[...window.AUDIT_HISTORY].reverse().map(h => {
          const heightPct = (h.score / 100) * 100;
          const color = h.score >= 80 ? 'var(--acc)' : h.score >= 65 ? 'var(--amber)' : 'var(--red)';
          return `
            <div class="text-center">
              <div class="h-32 flex items-end mb-2">
                <div class="w-full rounded-t-sm" style="background:${color}; height:${heightPct}%;"></div>
              </div>
              <div class="text-[14px] font-semibold num text-1">${h.score}</div>
              <div class="text-[10px] text-3 mono mt-1">${h.date.slice(5)}</div>
              <div class="text-[10px] text-3 mt-0.5">${h.ran_by}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
};

/* =====================================================================
   KEYWORDS - research, tracking, clusters, SERP features
   ===================================================================== */
PAGES.keywords = () => {
  const K = window.KEYWORDS;
  const KPI = window.KEYWORD_KPI;
  const CL = window.KEYWORD_CLUSTERS_LIST;

  const priorityOrder = ['critical', 'high', 'medium', 'land-grab', 'defend', 'low'];
  const sorted = [...K].sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));

  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Insights</div>
        <h1 class="h1">Keyword universe</h1>
        <p class="text-[13px] text-2 mt-2 max-w-2xl leading-relaxed">${KPI.total_tracked} keywords tracked across all facilities. SERP features, position history, cluster grouping, land-grab opportunities.</p>
      </div>
      <div class="flex items-center gap-1.5">
        ${UI.btn('Bulk import', { variant: 'secondary', icon: 'upload', size: 'sm' })}
        ${UI.btn('Research', { variant: 'secondary', icon: 'search', size: 'sm' })}
        ${UI.btn('Add keyword', { variant: 'primary', icon: 'plus', size: 'sm' })}
      </div>
    </div>

    <!-- Hero KPI -->
    <div class="surface glow-stat p-7 mb-6">
      <div class="flex items-end justify-between mb-7">
        <div>
          <div class="eyebrow mb-3">Estimated organic traffic</div>
          <div class="flex items-baseline gap-3">
            <span class="display num text-1">${KPI.estimated_traffic.toLocaleString()}</span>
            <span class="text-acc-bright num text-[15px]">visits/mo</span>
          </div>
          <div class="text-[12px] text-3 mt-3 num">from ${KPI.total_tracked} tracked keywords . ${KPI.total_volume.toLocaleString()} total monthly search volume</div>
        </div>
        <div class="text-right">
          <div class="eyebrow mb-2">Top-3 share</div>
          <div class="text-[40px] font-semibold num text-acc-bright leading-none">${Math.round(KPI.in_top_3 / KPI.total_tracked * 100)}%</div>
          <div class="text-[11px] text-3 mt-1.5">${KPI.in_top_3} of ${KPI.total_tracked} in top-3 organic</div>
        </div>
      </div>
      <div class="grid grid-cols-6 gap-x-7 pt-6" style="border-top: 1px solid var(--line-1);">
        ${[
          { l: 'In top 3', v: KPI.in_top_3, dot: 'green' },
          { l: 'In top 10', v: KPI.in_top_10, dot: 'acc' },
          { l: 'In 3-pack', v: KPI.in_3pack, dot: 'green' },
          { l: 'Trending up', v: KPI.trending_up, dot: 'green', delta: '+5' },
          { l: 'Trending down', v: KPI.trending_down, dot: 'red' },
          { l: 'Land-grab', v: KPI.land_grab, dot: 'violet' },
        ].map(s => `
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="status status-${s.dot}"></span>
              <div class="eyebrow">${s.l}</div>
            </div>
            <div class="text-[20px] font-semibold num text-1 leading-none">${s.v}</div>
            ${s.delta ? `<div class="text-[10.5px] text-acc-bright num mt-1.5">${s.delta} this week</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Cluster overview -->
    <div class="surface p-6 mb-6">
      <div class="flex items-center justify-between mb-5">
        <div>
          <div class="h3">Cluster breakdown</div>
          <div class="text-[11px] text-3 mt-0.5">${CL.length} active clusters</div>
        </div>
        ${UI.btn('View as topic clusters', { variant: 'secondary', size: 'sm', onClick: "navigate('topics')" })}
      </div>
      <div class="grid grid-cols-3 gap-2">
        ${CL.map(c => {
          const trendIcon = c.trend === 'up' ? '↑' : c.trend === 'down' ? '↓' : c.trend === 'new' ? '+' : '=';
          const trendColor = c.trend === 'up' ? 'text-acc-bright' : c.trend === 'down' ? 'text-red' : c.trend === 'new' ? 'text-violet' : 'text-3';
          return `
            <div class="p-4 rounded-md hover:bg-3 cursor-pointer transition-colors" style="background: var(--bg-3);">
              <div class="flex items-start justify-between mb-2">
                <span class="text-[12.5px] font-medium text-1">${c.name}</span>
                <span class="text-[14px] font-semibold num ${trendColor}">${trendIcon}</span>
              </div>
              <div class="flex items-center gap-3 text-[11px] text-3">
                <span class="num">${c.count} keywords</span>
                ${c.avg_pos ? `<span>. avg pos <span class="text-1 num">${c.avg_pos.toFixed(1)}</span></span>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Filter bar -->
    <div class="flex items-center gap-2 mb-4">
      ${UI.searchInput('Search keywords, clusters, facilities')}
      ${UI.filterPill('All facilities', 'warehouse')}
      ${UI.filterPill('All clusters', 'network')}
      ${UI.filterPill('All priorities', 'flag')}
      ${UI.filterPill('SERP features', 'star')}
      <button class="btn btn-ghost btn-sm ml-auto"><i data-lucide="filter-x" class="size-3"></i>Clear</button>
    </div>

    <!-- Keywords table -->
    <div class="surface overflow-hidden">
      <table class="table">
        <thead>
          <tr>
            <th>Priority</th>
            <th>Keyword</th>
            <th>Facility</th>
            <th>Cluster</th>
            <th class="text-right">Volume</th>
            <th class="text-right">Difficulty</th>
            <th class="text-right">CPC</th>
            <th class="text-right">Position</th>
            <th>SERP features</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map(k => {
            const f = getFacility(k.facility);
            const pColor = k.priority === 'critical' ? 'red' : k.priority === 'high' ? 'amber' : k.priority === 'land-grab' ? 'violet' : k.priority === 'defend' ? 'amber' : 'slate';
            const posColor = k.position == null ? 'text-3' : k.position <= 3 ? 'text-acc-bright' : k.position <= 10 ? 'text-amber' : 'text-red';
            const trendIcon = k.trend === 'up' ? '↑' : k.trend === 'down' ? '↓' : k.trend === 'new' ? '+' : '=';
            const trendColor = k.trend === 'up' ? 'text-acc-bright' : k.trend === 'down' ? 'text-red' : k.trend === 'new' ? 'text-violet' : 'text-3';
            const posDelta = k.position && k.prev_pos ? (k.prev_pos - k.position).toFixed(1) : null;
            return `
              <tr class="selectable">
                <td><span class="status status-${pColor}">${k.priority}</span></td>
                <td>
                  <div class="text-1 font-medium">${k.term}</div>
                  <div class="text-[10.5px] text-3 mt-0.5 capitalize">${k.intent}</div>
                </td>
                <td class="text-[11.5px] text-2">${f?.name || '-'}</td>
                <td><span class="tag">${k.cluster}</span></td>
                <td class="text-right num text-2">${k.vol.toLocaleString()}</td>
                <td class="text-right num text-2">${k.diff}</td>
                <td class="text-right num text-2">$${k.cpc.toFixed(2)}</td>
                <td class="text-right">
                  <div class="num font-semibold ${posColor}">${k.position == null ? '-' : k.position.toFixed(1)}</div>
                  ${posDelta ? `<div class="text-[10px] num ${posDelta > 0 ? 'text-acc-bright' : 'text-red'} mt-0.5">${posDelta > 0 ? '↑' : '↓'} ${Math.abs(posDelta)}</div>` : ''}
                  ${k.in_3pack ? '<div class="text-[9px] text-acc mt-0.5 font-medium">IN 3-PACK</div>' : ''}
                </td>
                <td>
                  <div class="flex gap-1">
                    ${k.serp_features.map(sf => {
                      const fLabel = { local_pack: 'LP', reviews: 'R', image_pack: 'IP', paa: 'PAA', featured_snippet: 'FS' }[sf] || sf.slice(0,3).toUpperCase();
                      return `<span class="tag" data-tooltip="${sf.replace(/_/g, ' ')}" style="font-size: 9px;">${fLabel}</span>`;
                    }).join('')}
                  </div>
                </td>
                <td class="text-[15px] font-semibold ${trendColor}">${trendIcon}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- Action panels -->
    <div class="grid grid-cols-3 gap-5 mt-6">
      <div class="surface p-5">
        <div class="flex items-center gap-2 mb-3">
          <i data-lucide="flag" class="size-3.5 text-violet"></i>
          <span class="h3">Land-grab queue</span>
          <span class="tag tag-violet ml-auto">${KPI.land_grab}</span>
        </div>
        <p class="text-[11.5px] text-2 leading-relaxed mb-3">Keywords competitors rank for that we do not yet. Highest opportunity per dollar.</p>
        ${UI.btn('Generate briefs', { variant: 'primary', icon: 'wand-2', size: 'sm', onClick: "toast('3 briefs queued','success')" })}
      </div>
      <div class="surface p-5">
        <div class="flex items-center gap-2 mb-3">
          <i data-lucide="shield-alert" class="size-3.5 text-amber"></i>
          <span class="h3">Defend queue</span>
          <span class="tag tag-amber ml-auto">${K.filter(k => k.priority === 'defend').length}</span>
        </div>
        <p class="text-[11.5px] text-2 leading-relaxed mb-3">Keywords slipping. Defensive sprint needed before competitor takes the position.</p>
        ${UI.btn('Defensive playbook', { variant: 'primary', icon: 'shield', size: 'sm' })}
      </div>
      <div class="surface p-5">
        <div class="flex items-center gap-2 mb-3">
          <i data-lucide="alert-triangle" class="size-3.5 text-amber"></i>
          <span class="h3">Cannibalization risk</span>
          <span class="tag ml-auto">2 pairs</span>
        </div>
        <p class="text-[11.5px] text-2 leading-relaxed mb-3">Two pages competing for the same query. Decide winner and consolidate.</p>
        ${UI.btn('Review pairs', { variant: 'primary', icon: 'git-compare', size: 'sm' })}
      </div>
    </div>
  `;
};

/* =====================================================================
   CONTENT STUDIO - AI generation, agents, brand voice, full workflow
   ===================================================================== */
PAGES.studio = () => {
  const agents = window.STUDIO_AGENTS;
  const queue = window.STUDIO_QUEUE;
  const demo = window.STUDIO_DEMO_GENERATION;
  const voices = window.VOICE_PROFILES;

  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Delivery</div>
        <h1 class="h1">Content studio</h1>
        <p class="text-[13px] text-2 mt-2 max-w-2xl leading-relaxed">End-to-end AI generation. ${agents.length} custom-trained agents, ${voices.length} brand voice profiles, full QA pipeline.</p>
      </div>
      <div class="flex items-center gap-1.5">
        ${UI.btn('Train voice', { variant: 'secondary', icon: 'sparkles', size: 'sm' })}
        ${UI.btn('Agent library', { variant: 'secondary', icon: 'bot', size: 'sm' })}
        ${UI.btn('New brief', { variant: 'primary', icon: 'plus', size: 'sm', onClick: "toast('Brief workspace opened','success')" })}
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex mb-6" style="border-bottom: 1px solid var(--line-1);">
      <button onclick="UI.switchTab('studio','workspace')" data-tab="studio-workspace" class="tab active">Workspace</button>
      <button onclick="UI.switchTab('studio','queue')" data-tab="studio-queue" class="tab">Queue<span class="tab-count">${queue.length}</span></button>
      <button onclick="UI.switchTab('studio','agents')" data-tab="studio-agents" class="tab">Agents<span class="tab-count">${agents.length}</span></button>
      <button onclick="UI.switchTab('studio','voices')" data-tab="studio-voices" class="tab">Brand voices<span class="tab-count">${voices.length}</span></button>
    </div>

    <!-- WORKSPACE -->
    <div data-tab-pane="studio-workspace">
      <div class="grid grid-cols-12 gap-5">

        <!-- LEFT: Brief builder -->
        <div class="col-span-4">
          <div class="surface p-5">
            <div class="h3 mb-1">Brief</div>
            <div class="text-[11px] text-3 mb-5">Generated by Topic Research Agent</div>

            <div class="space-y-4 mb-5">
              <div>
                <div class="eyebrow mb-1.5">Target keyword</div>
                <input class="input" value="${demo.brief.target_kw}" />
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <div class="eyebrow mb-1.5">Volume</div>
                  <div class="text-[14px] font-semibold num">${demo.brief.volume.toLocaleString()}</div>
                </div>
                <div>
                  <div class="eyebrow mb-1.5">Difficulty</div>
                  <div class="text-[14px] font-semibold num text-amber">${demo.brief.difficulty}</div>
                </div>
                <div>
                  <div class="eyebrow mb-1.5">Intent</div>
                  <div class="text-[12px] font-medium capitalize">${demo.brief.intent}</div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <div class="eyebrow mb-1.5">Target words</div>
                  <input class="input" type="number" value="${demo.brief.target_words}" />
                </div>
                <div>
                  <div class="eyebrow mb-1.5">Competitor avg</div>
                  <div class="text-[14px] font-semibold num text-2 pt-2">${demo.brief.competitor_avg}</div>
                </div>
              </div>
            </div>

            <div class="mb-5">
              <div class="eyebrow mb-2">Suggested sections</div>
              <div class="space-y-1.5">
                ${demo.brief.sections.map((s, i) => `
                  <div class="flex items-start gap-2 p-2 rounded-md hover:bg-3 transition-colors">
                    <span class="size-5 rounded-full text-[10px] font-medium flex items-center justify-center num shrink-0 mt-0.5" style="background: var(--acc-soft); color: var(--acc-bright);">${i + 1}</span>
                    <span class="text-[11.5px] text-1 leading-snug">${s}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="mb-5">
              <div class="eyebrow mb-2">Schema to embed</div>
              <div class="flex flex-wrap gap-1">
                ${demo.brief.schema.map(s => `<span class="tag tag-acc">${s}</span>`).join('')}
              </div>
            </div>

            <div class="mb-5">
              <div class="eyebrow mb-2">Internal links</div>
              <div class="space-y-1">
                ${demo.brief.internal_links.map(l => `
                  <div class="text-[11px] text-acc mono p-1.5 rounded" style="background: var(--bg-3);">${l}</div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- CENTER: Agent picker + Editor -->
        <div class="col-span-5">
          <div class="surface p-5 mb-4">
            <div class="eyebrow mb-3">Select agent</div>
            <div class="space-y-2">
              ${agents.slice(0, 3).map((a, i) => `
                <div class="p-3 rounded-md cursor-pointer transition-colors ${i === 0 ? '' : 'hover:bg-3'}" style="${i === 0 ? 'background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);' : ''}">
                  <div class="flex items-start gap-3">
                    <div class="size-8 rounded-md flex items-center justify-center shrink-0" style="background: var(--acc-soft);">
                      <i data-lucide="bot" class="size-4 text-acc"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-[12.5px] font-medium text-1">${a.name}</span>
                        ${i === 0 ? '<span class="status status-acc">selected</span>' : ''}
                      </div>
                      <div class="text-[10.5px] text-3 mb-2">${a.base_model}</div>
                      <div class="flex items-center gap-3 text-[10px] text-3">
                        <span>Voice <span class="text-1 num">${a.avg_brand_voice_score ? a.avg_brand_voice_score : '-'}</span></span>
                        <span>AI det <span class="text-1 num">${a.avg_ai_detect ? a.avg_ai_detect + '%' : '-'}</span></span>
                        <span>Cost <span class="text-1 num">$${a.cost_per_piece}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="surface p-5">
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="h3">Generated draft</div>
                <div class="text-[11px] text-3 mt-0.5 flex items-center gap-2">
                  <span class="flex items-center gap-1.5"><span class="size-1.5 rounded-full bg-acc animate-pulse"></span>Streaming . 64% complete</span>
                </div>
              </div>
              <div class="flex gap-1">
                <button class="btn btn-ghost btn-sm"><i data-lucide="pause" class="size-3"></i></button>
                <button class="btn btn-ghost btn-sm"><i data-lucide="refresh-cw" class="size-3"></i></button>
              </div>
            </div>

            <div class="rounded-md p-4 mb-3 text-[12.5px] text-1 leading-relaxed" style="background: var(--bg-3); min-height: 200px; max-height: 280px; overflow-y: auto;">
              <p>${demo.draft_excerpt}<span class="inline-block w-1.5 h-3.5 bg-acc align-middle ml-0.5 animate-pulse"></span></p>
            </div>

            <div class="grid grid-cols-4 gap-2 mb-3">
              <div class="p-2.5 rounded-md text-center" style="background: var(--bg-3);">
                <div class="eyebrow text-[9px] mb-1">Words</div>
                <div class="text-[14px] font-semibold num">960</div>
              </div>
              <div class="p-2.5 rounded-md text-center" style="background: var(--bg-3);">
                <div class="eyebrow text-[9px] mb-1">Reading</div>
                <div class="text-[14px] font-semibold num">3:48</div>
              </div>
              <div class="p-2.5 rounded-md text-center" style="background: var(--bg-3);">
                <div class="eyebrow text-[9px] mb-1">Tokens used</div>
                <div class="text-[14px] font-semibold num">1.3k</div>
              </div>
              <div class="p-2.5 rounded-md text-center" style="background: var(--bg-3);">
                <div class="eyebrow text-[9px] mb-1">Cost</div>
                <div class="text-[14px] font-semibold num text-acc-bright">$0.12</div>
              </div>
            </div>

            <div class="flex gap-2">
              ${UI.btn('Regenerate section', { variant: 'secondary', icon: 'refresh-cw', size: 'sm' })}
              ${UI.btn('Open full editor', { variant: 'secondary', icon: 'edit-3', size: 'sm' })}
              ${UI.btn('Send to QA', { variant: 'primary', icon: 'arrow-right', size: 'sm' })}
            </div>
          </div>
        </div>

        <!-- RIGHT: QA pipeline + Schema -->
        <div class="col-span-3">
          <div class="surface p-5 mb-4">
            <div class="h3 mb-1">QA pipeline</div>
            <div class="text-[11px] text-3 mb-4">Auto-runs at draft completion</div>
            <div class="space-y-2.5">
              ${[
                { label: 'Brand voice match', value: demo.qa_results.brand_voice, threshold: 75, type: 'score' },
                { label: 'AI detection', value: demo.qa_results.ai_detection, threshold: 40, type: 'inverse' },
                { label: 'SEO score', value: demo.qa_results.seo_score, threshold: 80, type: 'score' },
                { label: 'Originality', value: demo.qa_results.originality, threshold: 90, type: 'score' },
              ].map(q => {
                const passing = q.type === 'inverse' ? q.value < q.threshold : q.value >= q.threshold;
                return `
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[11.5px] text-2">${q.label}</span>
                      <span class="text-[11.5px] font-semibold num ${passing ? 'text-acc-bright' : 'text-red'}">${q.value}${q.type === 'inverse' ? '%' : ''}</span>
                    </div>
                    <div class="h-1 rounded-full overflow-hidden" style="background: var(--bg-4);">
                      <div style="width:${Math.min(q.value, 100)}%; height: 100%; background: ${passing ? 'var(--acc)' : 'var(--red)'};"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
            <div class="mt-4 pt-3 text-[11px] text-2" style="border-top: 1px solid var(--line-1);">
              <div class="flex items-center justify-between mb-1.5">
                <span>Readability</span>
                <span class="text-1">${demo.qa_results.readability}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Fact check</span>
                <span class="text-acc-bright">${demo.qa_results.fact_check}</span>
              </div>
            </div>
          </div>

          <div class="surface p-5">
            <div class="h3 mb-1">Schema preview</div>
            <div class="text-[11px] text-3 mb-3">Auto-generated</div>
            <pre class="text-[10px] mono text-2 leading-relaxed p-3 rounded-md overflow-x-auto" style="background: var(--bg-3);">{
  "@type": "BlogPosting",
  "headline": "...",
  "datePublished": "2026-05-15",
  "author": {...},
  "mainEntity": {
    "@type": "FAQPage",
    "questions": [...]
  }
}</pre>
            <button class="btn btn-secondary btn-sm w-full mt-3">Validate via Rich Results</button>
          </div>
        </div>

      </div>
    </div>

    <!-- QUEUE -->
    <div data-tab-pane="studio-queue" class="hidden">
      <div class="surface overflow-hidden">
        <table class="table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Title</th>
              <th>Facility</th>
              <th>Agent</th>
              <th class="text-right">Words</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Quality</th>
            </tr>
          </thead>
          <tbody>
            ${queue.map(q => {
              const f = getFacility(q.facility);
              const agent = agents.find(a => a.id === q.agent);
              const stageColor = q.stage === 'publish' ? 'green' : q.stage === 'schema' || q.stage === 'qa' ? 'acc' : q.stage === 'humanize' ? 'amber' : q.stage === 'drafting' ? 'violet' : 'slate';
              const pColor = q.priority === 'critical' ? 'red' : q.priority === 'high' ? 'amber' : q.priority === 'medium' ? 'acc' : 'slate';
              return `
                <tr class="selectable">
                  <td><span class="status status-${stageColor}">${q.stage}</span></td>
                  <td class="text-1 font-medium">${q.title}</td>
                  <td class="text-[11.5px] text-2">${f?.name}</td>
                  <td>
                    <div class="text-[11.5px] text-2">${agent?.name}</div>
                    <div class="text-[10px] text-3 mt-0.5">${agent?.base_model}</div>
                  </td>
                  <td class="text-right num text-2">${q.words_target}</td>
                  <td><span class="status status-${pColor}">${q.priority}</span></td>
                  <td>
                    <div class="text-[11px] text-1">${q.status.replace(/_/g, ' ')}</div>
                    ${q.progress ? `<div class="mt-1 h-1 w-24 rounded-full overflow-hidden" style="background: var(--bg-4);"><div style="width:${q.progress*100}%; height: 100%; background: var(--acc);"></div></div>` : ''}
                    ${q.scheduled ? `<div class="text-[10px] text-3 mono mt-0.5">${q.scheduled}</div>` : ''}
                  </td>
                  <td>
                    ${q.brand_voice_score ? `<div class="flex items-center gap-2 text-[10px]"><span class="text-2">V <span class="text-1 num">${q.brand_voice_score}</span></span><span class="text-2">AI <span class="text-1 num">${q.ai_detect}%</span></span></div>` : '<span class="text-3 text-[11px]">-</span>'}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- AGENTS -->
    <div data-tab-pane="studio-agents" class="hidden">
      <div class="grid grid-cols-2 gap-4">
        ${agents.map(a => `
          <div class="surface p-6">
            <div class="flex items-start gap-3 mb-4">
              <div class="size-10 rounded-md flex items-center justify-center shrink-0" style="background: var(--acc-soft);">
                <i data-lucide="bot" class="size-5 text-acc"></i>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="h2">${a.name}</h3>
                </div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="tag tag-acc">${a.base_model}</span>
                  <span class="tag">${a.voice_profile}</span>
                </div>
              </div>
            </div>

            <p class="text-[12.5px] text-2 leading-relaxed mb-5 p-3 rounded-md" style="background: var(--bg-3);">${a.persona}</p>

            <div class="mb-5">
              <div class="eyebrow mb-2">Trained on</div>
              <div class="flex flex-wrap gap-1.5">
                ${a.trained_on.map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>

            <div class="grid grid-cols-4 gap-2 mb-5">
              <div class="p-3 rounded-md text-center" style="background: var(--bg-3);">
                <div class="eyebrow text-[9px] mb-1">Pieces</div>
                <div class="text-[16px] font-semibold num">${a.pieces_drafted}</div>
              </div>
              <div class="p-3 rounded-md text-center" style="background: var(--bg-3);">
                <div class="eyebrow text-[9px] mb-1">Win rate</div>
                <div class="text-[16px] font-semibold num text-acc-bright">${Math.round(a.win_rate*100)}%</div>
              </div>
              <div class="p-3 rounded-md text-center" style="background: var(--bg-3);">
                <div class="eyebrow text-[9px] mb-1">Voice avg</div>
                <div class="text-[16px] font-semibold num">${a.avg_brand_voice_score || '-'}</div>
              </div>
              <div class="p-3 rounded-md text-center" style="background: var(--bg-3);">
                <div class="eyebrow text-[9px] mb-1">Cost / piece</div>
                <div class="text-[16px] font-semibold num text-acc-bright">$${a.cost_per_piece}</div>
              </div>
            </div>

            <div class="flex gap-2 pt-3" style="border-top: 1px solid var(--line-1);">
              ${UI.btn('Retrain', { variant: 'primary', icon: 'sparkles', size: 'sm' })}
              ${UI.btn('Test prompt', { variant: 'secondary', icon: 'play', size: 'sm' })}
              ${UI.btn('Edit persona', { variant: 'ghost', icon: 'edit-2', size: 'sm' })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- BRAND VOICES -->
    <div data-tab-pane="studio-voices" class="hidden">
      <div class="grid grid-cols-3 gap-4">
        ${voices.map(v => {
          const cl = getClient(v.client);
          return `
            <div class="surface p-6">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="h2">${v.name}</h3>
                  <div class="text-[11px] text-3 mt-1">${cl?.name} . ${v.version}</div>
                </div>
                <span class="status status-${v.status === 'active' ? 'green' : 'amber'}">${v.status}</span>
              </div>
              <div class="grid grid-cols-2 gap-2 mb-5">
                <div class="p-3 rounded-md text-center" style="background: var(--bg-3);">
                  <div class="eyebrow text-[9px] mb-1">Trained on</div>
                  <div class="text-[16px] font-semibold num">${v.trained_pieces}</div>
                  <div class="text-[10px] text-3 mt-0.5">approved pieces</div>
                </div>
                <div class="p-3 rounded-md text-center" style="background: var(--bg-3);">
                  <div class="eyebrow text-[9px] mb-1">Avg match</div>
                  <div class="text-[16px] font-semibold num text-acc-bright">${v.brand_voice_score_avg}</div>
                  <div class="text-[10px] text-3 mt-0.5">brand voice</div>
                </div>
              </div>
              <div class="space-y-2 mb-5">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-3">Tone calibration</span>
                  <span class="text-1">Friendly, practical</span>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-3">Voice axes</span>
                  <span class="text-1">4 calibrated</span>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-3">Forbidden phrases</span>
                  <span class="text-1">12 listed</span>
                </div>
              </div>
              <div class="flex gap-2 pt-3" style="border-top: 1px solid var(--line-1);">
                ${UI.btn('Train v' + (parseInt(v.version.slice(1)) + 1), { variant: 'primary', icon: 'sparkles', size: 'sm' })}
                ${UI.btn('Preview', { variant: 'secondary', icon: 'eye', size: 'sm' })}
              </div>
            </div>
          `;
        }).join('')}

        <div class="surface p-6 flex flex-col items-center justify-center" style="border: 1px dashed var(--line-2);">
          <i data-lucide="plus-circle" class="size-8 text-3 mb-3"></i>
          <div class="text-[12.5px] font-medium text-1 mb-1">Train a new voice</div>
          <div class="text-[11px] text-3 text-center mb-4">Upload 10+ approved pieces to fine-tune a brand voice agent</div>
          ${UI.btn('Start training', { variant: 'primary', icon: 'upload', size: 'sm' })}
        </div>
      </div>
    </div>
  `;
};

/* =====================================================================
   COMPETITORS - rebuild with client selector + 10-12 competitor deep view
   ===================================================================== */
PAGES._competitorsLegacyV2 = () => {
  const clientId = 'acme';
  const D = window.DEEP_COMPETITORS[clientId];
  const cl = getClient(clientId);

  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Insights</div>
        <h1 class="h1">Competitor intelligence</h1>
        <p class="text-[13px] text-2 mt-2 max-w-2xl leading-relaxed">${D.tracked_count} competitors tracked for ${cl?.name}. Win/loss leaderboard, gap analysis, copy-or-differentiate recommendations.</p>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="relative">
          <button class="btn btn-secondary btn-sm" style="min-width: 180px; justify-content: space-between;">
            <span class="flex items-center gap-2">
              <i data-lucide="building-2" class="size-3"></i>
              ${cl?.name}
            </span>
            <i data-lucide="chevron-down" class="size-3"></i>
          </button>
        </div>
        ${UI.btn('Add competitor', { variant: 'primary', icon: 'plus', size: 'sm' })}
      </div>
    </div>

    <!-- Hero KPI -->
    <div class="surface glow-stat p-7 mb-6">
      <div class="flex items-end justify-between mb-7">
        <div>
          <div class="eyebrow mb-3">Head-to-head leaderboard</div>
          <div class="flex items-baseline gap-3">
            <span class="display num text-acc-bright">${D.summary.we_winning_count}</span>
            <span class="text-2 text-[13px]">winning</span>
            <span class="text-3 mx-1">.</span>
            <span class="text-[40px] font-semibold num text-red">${D.summary.they_winning_count}</span>
            <span class="text-2 text-[13px]">losing</span>
          </div>
          <div class="text-[12px] text-3 mt-3">across ${D.tracked_count} tracked competitors in ${cl?.name} markets</div>
        </div>
        <div class="text-right">
          <div class="eyebrow mb-2">Share of voice</div>
          <div class="flex items-baseline gap-2 justify-end">
            <span class="text-[32px] font-semibold num text-1 leading-none">${D.summary.share_of_voice}%</span>
            <span class="num text-[12px] ${D.summary.share_of_voice_delta > 0 ? 'text-acc-bright' : 'text-red'}">${D.summary.share_of_voice_delta > 0 ? '↑' : '↓'} ${Math.abs(D.summary.share_of_voice_delta).toFixed(1)}pp</span>
          </div>
          <div class="text-[11px] text-3 mt-1.5">across all tracked keywords</div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-x-7 pt-6" style="border-top: 1px solid var(--line-1);">
        ${[
          { l: 'Critical threats', v: D.competitors.filter(c => c.threat_label === 'critical').length, dot: 'red' },
          { l: 'Elevated', v: D.competitors.filter(c => c.threat_label === 'elevated').length, dot: 'amber' },
          { l: 'Avg threat score', v: D.summary.avg_threat_score, dot: 'slate' },
          { l: 'Recent moves (7d)', v: D.competitors.reduce((s, c) => s + c.recent_moves.length, 0), dot: 'violet' },
        ].map(s => `
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="status status-${s.dot}"></span>
              <div class="eyebrow">${s.l}</div>
            </div>
            <div class="text-[20px] font-semibold num text-1 leading-none">${s.v}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Win/Loss board -->
    <div class="grid grid-cols-2 gap-5 mb-6">
      <div class="surface p-5">
        <div class="flex items-center gap-2 mb-4">
          <i data-lucide="trophy" class="size-4 text-acc"></i>
          <span class="h3">Where we are winning</span>
          <span class="tag tag-acc ml-auto">${D.summary.we_winning_count}</span>
        </div>
        <div class="space-y-1.5">
          ${D.competitors.filter(c => c.head_to_head === 'we_winning').slice(0, 6).map(c => `
            <div class="flex items-center gap-3 p-2.5 rounded-md hover:bg-3 transition-colors">
              <div class="size-7 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0" style="background: var(--bg-4); color: var(--text-2);">${c.short}</div>
              <div class="flex-1 min-w-0">
                <div class="text-[12px] font-medium text-1 truncate">${c.name}</div>
                <div class="text-[10px] text-3">${c.market}</div>
              </div>
              <div class="text-right">
                <div class="text-[12px] num text-acc-bright font-semibold">+${c.rank_delta_vs_us}</div>
                <div class="text-[9px] text-3 uppercase tracking-wider">positions</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="surface p-5">
        <div class="flex items-center gap-2 mb-4">
          <i data-lucide="swords" class="size-4 text-red"></i>
          <span class="h3">Where they are winning</span>
          <span class="tag tag-red ml-auto">${D.summary.they_winning_count}</span>
        </div>
        <div class="space-y-1.5">
          ${D.competitors.filter(c => c.head_to_head === 'they_winning').map(c => `
            <div class="flex items-center gap-3 p-2.5 rounded-md hover:bg-3 transition-colors">
              <div class="size-7 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0" style="background: var(--bg-4); color: var(--text-2);">${c.short}</div>
              <div class="flex-1 min-w-0">
                <div class="text-[12px] font-medium text-1 truncate">${c.name}</div>
                <div class="text-[10px] text-3">${c.market}</div>
              </div>
              <div class="text-right">
                <div class="text-[12px] num text-red font-semibold">${c.rank_delta_vs_us}</div>
                <div class="text-[9px] text-3 uppercase tracking-wider">positions</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Competitor detail rows (split: list + detail) -->
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-4 space-y-1.5" style="max-height: 80vh; overflow-y: auto;">
        ${D.competitors.map((c, i) => {
          const isActive = i === 0;
          const dotColor = c.threat_label === 'critical' ? 'red' : c.threat_label === 'elevated' ? 'amber' : 'slate';
          return `
            <div onclick="document.querySelectorAll('.cp-row').forEach(el=>el.classList.remove('active'));this.classList.add('active');this.style.background='var(--bg-3)';document.querySelectorAll('.cp-row').forEach(el=>{if(el!==this){el.style.background='';}});document.querySelectorAll('.cp-detail').forEach(el=>el.classList.add('hidden'));document.getElementById('cp-detail-${c.id}').classList.remove('hidden');" class="cp-row surface surface-hover p-3 cursor-pointer ${isActive ? 'active' : ''}" style="${isActive ? 'background: var(--bg-3);' : ''}">
              <div class="flex items-start gap-3">
                <div class="size-9 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0" style="background: var(--bg-4); color: var(--text-1);">${c.short}</div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[12px] font-medium text-1 truncate">${c.name}</span>
                    <span class="status status-${dotColor}"></span>
                  </div>
                  <div class="text-[10.5px] text-3 mb-1.5">${c.market}</div>
                  <div class="flex items-center gap-3 text-[10.5px]">
                    <span class="num ${c.head_to_head === 'we_winning' ? 'text-acc-bright' : 'text-red'}">${c.head_to_head === 'we_winning' ? '↑' : '↓'} ${Math.abs(c.rank_delta_vs_us)}</span>
                    <span class="text-3">threat <span class="text-1 num">${c.threat}</span></span>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="col-span-8">
        ${D.competitors.map((c, i) => {
          const dotColor = c.threat_label === 'critical' ? 'red' : c.threat_label === 'elevated' ? 'amber' : 'slate';
          return `
            <div id="cp-detail-${c.id}" class="cp-detail surface p-7 ${i === 0 ? '' : 'hidden'}">
              <div class="flex items-start justify-between mb-6">
                <div class="flex items-start gap-4">
                  <div class="size-12 rounded-md flex items-center justify-center text-[13px] font-bold shrink-0" style="background: var(--bg-3); color: var(--text-1);">${c.short}</div>
                  <div>
                    <div class="flex items-center gap-3 mb-1.5 flex-wrap">
                      <h2 class="h2">${c.name}</h2>
                      <span class="status status-${dotColor}">${c.threat_label}</span>
                      <span class="status status-${c.head_to_head === 'we_winning' ? 'green' : 'red'}">${c.head_to_head === 'we_winning' ? 'we winning' : 'they winning'}</span>
                    </div>
                    <div class="text-[11.5px] text-3">${c.market}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="eyebrow mb-1">Threat score</div>
                  <div class="text-[28px] font-semibold num leading-none ${c.threat >= 80 ? 'text-red' : c.threat >= 50 ? 'text-amber' : 'text-2'}">${c.threat}</div>
                </div>
              </div>

              <!-- Win/Loss side-by-side -->
              <div class="grid grid-cols-2 gap-3 mb-6">
                <div class="p-4 rounded-md" style="background: var(--acc-soft);">
                  <div class="flex items-center gap-2 mb-3">
                    <i data-lucide="check-circle-2" class="size-3.5 text-acc-bright"></i>
                    <span class="text-[11.5px] font-semibold text-acc-bright">We beat them on</span>
                  </div>
                  ${c.we_win_against.length ? c.we_win_against.map(w => `
                    <div class="flex items-start gap-2 mb-1.5 text-[12px] text-1 leading-snug">
                      <span class="text-acc-bright mt-0.5">·</span><span>${w}</span>
                    </div>
                  `).join('') : '<div class="text-[12px] text-3">No clear wins</div>'}
                </div>

                <div class="p-4 rounded-md" style="background: var(--red-soft);">
                  <div class="flex items-center gap-2 mb-3">
                    <i data-lucide="alert-circle" class="size-3.5 text-red"></i>
                    <span class="text-[11.5px] font-semibold text-red">They beat us on</span>
                  </div>
                  ${c.wins_against_us.length ? c.wins_against_us.map(w => `
                    <div class="flex items-start gap-2 mb-1.5 text-[12px] text-1 leading-snug">
                      <span class="text-red mt-0.5">·</span><span>${w}</span>
                    </div>
                  `).join('') : '<div class="text-[12px] text-3">Nothing significant</div>'}
                </div>
              </div>

              <!-- What they do well -->
              ${c.what_they_do_well.length ? `
                <div class="mb-6">
                  <div class="eyebrow mb-3">What they do well</div>
                  <div class="space-y-2">
                    ${c.what_they_do_well.map(w => {
                      const impactColor = w.impact === 'high' ? 'red' : w.impact === 'medium' ? 'amber' : 'slate';
                      return `
                        <div class="p-4 rounded-md" style="background: var(--bg-3);">
                          <div class="flex items-start justify-between gap-3 mb-1.5">
                            <span class="text-[12.5px] font-semibold text-1">${w.area}</span>
                            <span class="status status-${impactColor}">${w.impact} impact</span>
                          </div>
                          <div class="text-[11.5px] text-2 leading-relaxed">${w.detail}</div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Tactics we should copy -->
              ${c.we_should_copy.length ? `
                <div class="mb-6">
                  <div class="eyebrow mb-3 text-acc-bright">Tactics to copy</div>
                  <div class="space-y-2">
                    ${c.we_should_copy.map(t => `
                      <div class="p-4 rounded-md" style="background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);">
                        <div class="flex items-start justify-between gap-3 mb-2">
                          <span class="text-[12.5px] font-semibold text-1">${t.tactic}</span>
                          <span class="text-[10px] num text-acc-bright">${Math.round(t.confidence*100)}% conf</span>
                        </div>
                        <div class="flex items-center gap-4 text-[11px] text-3 mb-3">
                          <span><i data-lucide="dollar-sign" class="size-2.5 inline"></i> $${t.cost}</span>
                          <span><i data-lucide="clock" class="size-2.5 inline"></i> ${t.eta}</span>
                        </div>
                        <button class="btn btn-secondary btn-sm w-full">Queue tactic</button>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Differentiation moves -->
              ${c.we_should_differentiate.length ? `
                <div class="mb-6">
                  <div class="eyebrow mb-3 text-violet">Differentiation moves</div>
                  <div class="space-y-2">
                    ${c.we_should_differentiate.map(d => `
                      <div class="p-3 rounded-md" style="background: var(--violet-soft);">
                        <div class="flex items-start gap-3">
                          <i data-lucide="zap" class="size-3.5 text-violet mt-0.5 shrink-0"></i>
                          <div class="flex-1">
                            <div class="text-[12.5px] text-1 leading-snug">${d.tactic}</div>
                          </div>
                          <span class="text-[10px] num text-violet shrink-0">${Math.round(d.confidence*100)}%</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Recent moves timeline -->
              ${c.recent_moves.length ? `
                <div class="mb-5">
                  <div class="eyebrow mb-3">Intel feed</div>
                  <div class="relative pl-6">
                    <div class="absolute left-2 top-2 bottom-2 w-px" style="background: var(--line-2);"></div>
                    ${c.recent_moves.map(m => `
                      <div class="relative pb-3 pl-4">
                        <div class="absolute left-0 top-1.5 -translate-x-[10px] rounded-full size-2.5" style="background: var(--text-3); box-shadow: 0 0 0 4px var(--bg-2);"></div>
                        <div class="flex items-start gap-3">
                          <span class="text-[10.5px] text-3 mono shrink-0 w-20">${m.date}</span>
                          <div class="flex-1 text-[11.5px] text-1">${m.move}</div>
                          <span class="tag">${m.source}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <div class="flex gap-2 pt-3" style="border-top: 1px solid var(--line-1);">
                ${UI.btn('Queue all "copy" tactics', { variant: 'primary', icon: 'play', size: 'sm', onClick: "toast('" + c.we_should_copy.length + " tactics queued','success')" })}
                ${UI.btn('Set alerts', { variant: 'secondary', icon: 'bell', size: 'sm' })}
                ${UI.btn('Export report', { variant: 'ghost', icon: 'download', size: 'sm' })}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
};
