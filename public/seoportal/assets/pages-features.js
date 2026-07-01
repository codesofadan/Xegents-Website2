/* ============================================================
   FEATURE PAGES v2 - the 10 features that take it from 6.8 to 10
   ============================================================ */

/* =====================================================================
   1. CROSS-CLIENT PLAYBOOK LIBRARY
   ===================================================================== */
PAGES.playbook = () => {
  const pbs = window.PLAYBOOKS;
  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Operations</div>
        <h1 class="h1">Playbook library</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Proven plays from your own work. Each one comes with auto-matched facilities, ready to queue.</p>
      </div>
      <div class="flex items-center gap-1.5">
        ${UI.btn('From a learning', { variant: 'secondary', icon: 'lightbulb', size: 'sm' })}
        ${UI.btn('New playbook', { variant: 'primary', icon: 'plus', size: 'sm' })}
      </div>
    </div>

    <div class="surface mb-6">
      <div class="grid grid-cols-4">
        ${[
          { label: 'Playbooks', value: pbs.length, sub: 'in library' },
          { label: 'Total runs', value: pbs.reduce((s,p)=>s+p.runs,0) + '', sub: 'all time' },
          { label: 'Avg win rate', value: Math.round(pbs.reduce((s,p)=>s+p.win_rate,0)/pbs.length*100) + '%' },
          { label: 'Auto-matched', value: pbs.reduce((s,p)=>s+p.matches.length,0) + '', sub: 'facilities ready' },
        ].map((k,i)=>`
          <div class="px-5 py-4" style="${i>0?'border-left: 1px solid var(--line-1);':''}">
            <div class="eyebrow mb-2">${k.label}</div>
            <div class="text-[22px] font-semibold num text-1 leading-none">${k.value}</div>
            ${k.sub?`<div class="text-[10.5px] text-3 mt-2">${k.sub}</div>`:''}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-4 space-y-2">
        ${pbs.map((p, i) => `
          <div onclick="document.querySelectorAll('.pb-row').forEach(el=>{el.classList.remove('active');el.style.background='';});this.classList.add('active');this.style.background='var(--bg-3)';document.querySelectorAll('.pb-detail').forEach(el=>el.classList.add('hidden'));document.getElementById('pb-detail-${p.id}').classList.remove('hidden');" class="pb-row surface surface-hover p-4 cursor-pointer ${i===0?'active':''}" style="${i===0?'background: var(--bg-3);':''}">
            <div class="flex items-center justify-between mb-2.5">
              <span class="status status-green">${Math.round(p.win_rate*100)}% win</span>
              <span class="text-[10px] text-3 num">${p.runs} runs</span>
            </div>
            <div class="text-[12.5px] font-medium text-1 leading-snug mb-2">${p.title}</div>
            <div class="text-[10.5px] text-3 mb-2">${p.avg_outcome}</div>
            <div class="flex items-center gap-1.5 mt-2 flex-wrap">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
          </div>
        `).join('')}
      </div>

      <div class="col-span-8">
        ${pbs.map((p, i) => `
          <div id="pb-detail-${p.id}" class="pb-detail surface p-7 ${i===0?'':'hidden'}">
            <div class="flex items-start justify-between mb-6">
              <div>
                <div class="flex items-center gap-2 mb-3 flex-wrap">
                  <span class="status status-green">${Math.round(p.win_rate*100)}% win rate</span>
                  <span class="tag tag-acc">${p.runs} runs</span>
                  <span class="tag">${p.duration}</span>
                  <span class="tag">$${p.cost}/run</span>
                </div>
                <h2 class="text-[22px] font-semibold tracking-tight leading-none">${p.title}</h2>
                <div class="text-[12px] text-2 mt-2.5">Proven at ${getFacility(p.proven_at)?.name} on ${p.proven_date}. Avg outcome: <span class="text-acc-bright">${p.avg_outcome}</span></div>
              </div>
              <div class="text-right">
                <div class="eyebrow mb-1">Confidence</div>
                <div class="text-[28px] font-semibold num text-acc-bright leading-none">${Math.round(p.confidence*100)}%</div>
              </div>
            </div>

            <p class="text-[13px] text-1 leading-relaxed mb-6 max-w-2xl">${p.description}</p>

            <div class="mb-7">
              <div class="eyebrow mb-3">Steps to execute</div>
              <div class="space-y-1.5">
                ${p.steps.map(s => `
                  <div class="flex items-center gap-3 p-3 rounded-md hover:bg-3 transition-colors">
                    <span class="size-5 rounded-full text-[10.5px] font-medium flex items-center justify-center num shrink-0" style="background: var(--acc-soft); color: var(--acc-bright);">${s.n}</span>
                    <div class="flex-1 text-[12.5px] text-1">${s.label}</div>
                    <span class="text-[10.5px] text-3 mono">${s.hours}h</span>
                  </div>
                `).join('')}
                <div class="flex items-center gap-3 p-3 rounded-md" style="background: var(--bg-3);">
                  <span class="size-5 rounded-full text-[10.5px] font-medium flex items-center justify-center num shrink-0" style="background: var(--bg-4); color: var(--text-2);">=</span>
                  <div class="flex-1 text-[12px] text-2 font-medium">Total</div>
                  <span class="text-[12px] text-1 mono num">${p.steps.reduce((s,x)=>s+x.hours,0)}h</span>
                </div>
              </div>
            </div>

            <div class="p-5 rounded-md mb-5" style="background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);">
              <div class="flex items-center gap-2 mb-4">
                <i data-lucide="sparkles" class="size-3.5 text-acc"></i>
                <span class="text-[12px] font-semibold text-1">Facilities matched for this playbook</span>
                <span class="tag tag-acc ml-auto">${p.matches.length} candidates</span>
              </div>
              <div class="space-y-2">
                ${p.matches.map(m => {
                  const f = getFacility(m.facility);
                  return `
                    <div class="flex items-center gap-3 p-3 rounded-md" style="background: var(--bg-2);">
                      <div class="size-7 rounded-md flex items-center justify-center shrink-0" style="background: var(--acc-soft); color: var(--acc-bright);">
                        <i data-lucide="warehouse" class="size-3.5"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="text-[12.5px] font-medium text-1 truncate">${f?.name}</div>
                        <div class="text-[10.5px] text-3 mt-0.5">${m.reason}</div>
                      </div>
                      <div class="text-right">
                        <div class="text-[14px] font-semibold num ${m.score >= 0.9 ? 'text-acc-bright' : m.score >= 0.8 ? 'text-acc' : 'text-amber'}">${Math.round(m.score*100)}%</div>
                        <div class="text-[10px] text-3">match</div>
                      </div>
                      <button class="btn btn-secondary btn-sm" onclick="toast('Playbook queued for ${f?.name}','success')">Queue</button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="flex gap-2 pt-3" style="border-top: 1px solid var(--line-1);">
              ${UI.btn('Queue all matches', { variant: 'primary', icon: 'play', size: 'sm', onClick: "toast('" + p.matches.length + " playbooks queued','success')" })}
              ${UI.btn('Edit playbook', { variant: 'secondary', icon: 'edit-2', size: 'sm' })}
              ${UI.btn('Export SOP', { variant: 'ghost', icon: 'download', size: 'sm' })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/* =====================================================================
   2. RENEWAL PITCH AUTO-BUILDER
   ===================================================================== */
PAGES.renewals = () => {
  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Sales</div>
        <h1 class="h1">Renewals</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Auto-assembled pitch for every upcoming renewal. Before vs now, forward roadmap, escape valves.</p>
      </div>
      ${UI.btn('Template library', { variant: 'secondary', icon: 'file', size: 'sm' })}
    </div>

    <div class="space-y-5">
      ${window.RENEWALS.map(r => {
        const c = getClient(r.client);
        const dot = r.renewal_status === 'critical' ? 'red' : r.renewal_status === 'at_risk' ? 'amber' : 'green';
        const proposedDelta = ((r.proposed_mrr - r.current_mrr) / r.current_mrr * 100);
        return `
          <div class="surface ${r.renewal_status === 'critical' ? 'glow-stat' : ''}">
            <div class="px-7 py-5 flex items-center justify-between" style="border-bottom: 1px solid var(--line-1);">
              <div class="flex items-center gap-4">
                <div class="size-10 rounded-md flex items-center justify-center" style="background: var(--bg-3);">
                  <i data-lucide="building-2" class="size-4 text-2"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <h2 class="h2">${c?.name}</h2>
                    <span class="status status-${dot}">${r.renewal_status.replace('_',' ')}</span>
                  </div>
                  <div class="text-[11.5px] text-3">Renewal in ${r.days_to_renewal} days . ${r.months_served} months served . $${r.current_mrr.toLocaleString()}/mo</div>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                ${UI.btn('Preview pitch', { variant: 'secondary', icon: 'eye', size: 'sm' })}
                ${UI.btn('Send to client', { variant: 'primary', icon: 'send', size: 'sm', onClick: "toast('Renewal pitch sent to " + c?.primary_contact?.email + "','success')" })}
              </div>
            </div>

            <div class="p-7">
              <div class="p-5 rounded-md mb-6" style="background: var(--bg-3);">
                <div class="eyebrow mb-2">AI-extracted headline</div>
                <p class="text-[14px] text-1 leading-relaxed">${r.headline}</p>
              </div>

              <!-- Before vs Now -->
              <div class="mb-7">
                <div class="eyebrow mb-3">Before . now . delta</div>
                <div class="surface overflow-hidden">
                  <table class="table">
                    <thead>
                      <tr><th>Metric</th><th class="text-right">When we started</th><th class="text-right">Today</th><th class="text-right">Delta</th></tr>
                    </thead>
                    <tbody>
                      ${[
                        ['Rank avg', r.before.rank_avg, r.now.rank_avg, (r.now.rank_avg - r.before.rank_avg).toFixed(1), 'better'],
                        ['Total reviews', r.before.reviews, r.now.reviews, '+' + (r.now.reviews - r.before.reviews), 'up'],
                        ['Citations score', r.before.citations_score, r.now.citations_score, '+' + (r.now.citations_score - r.before.citations_score), 'up'],
                        ['GBP calls MTD', r.before.gbp_calls_mtd.toLocaleString(), r.now.gbp_calls_mtd.toLocaleString(), '+' + (r.now.gbp_calls_mtd - r.before.gbp_calls_mtd).toLocaleString(), 'up'],
                        ['Rentals attributed', r.before.rentals_attributed, r.now.rentals_attributed, '+' + (r.now.rentals_attributed - r.before.rentals_attributed), 'up'],
                      ].map(([metric, before, now, delta, dir]) => `
                        <tr>
                          <td class="text-1 font-medium">${metric}</td>
                          <td class="text-right num text-2">${before}</td>
                          <td class="text-right num text-1 font-medium">${now}</td>
                          <td class="text-right num text-acc-bright">${delta}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Forward roadmap -->
              <div class="mb-7">
                <div class="eyebrow mb-3">Forward roadmap . next 12 months</div>
                <div class="grid grid-cols-${r.forward_roadmap.length} gap-2">
                  ${r.forward_roadmap.map((b, i) => `
                    <div class="p-4 rounded-md" style="background: var(--bg-3);">
                      <div class="flex items-center gap-2 mb-3">
                        <span class="size-5 rounded-full text-[10.5px] font-medium flex items-center justify-center num" style="background: var(--acc-soft); color: var(--acc-bright);">${i+1}</span>
                        <span class="tag">${b.quarter}</span>
                      </div>
                      <div class="text-[12.5px] font-medium text-1 leading-snug mb-2">${b.bet}</div>
                      <div class="text-[11px] text-acc-bright num">Expected: ${b.expected_lift}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Proposed pricing + escape valves -->
              <div class="grid grid-cols-2 gap-5 mb-7">
                <div class="surface p-5">
                  <div class="eyebrow mb-3">Proposed renewal</div>
                  <div class="flex items-baseline gap-3 mb-3">
                    <span class="text-[36px] font-semibold num text-1 leading-none">$${r.proposed_mrr.toLocaleString()}</span>
                    <span class="text-[12px] text-3">/mo</span>
                  </div>
                  <div class="text-[11.5px] text-acc-bright num">↑ $${(r.proposed_mrr - r.current_mrr).toLocaleString()} (+${proposedDelta.toFixed(1)}%) from current</div>
                  <div class="mt-4 text-[11.5px] text-2 leading-relaxed">Justified by ROI: ${r.now.rentals_attributed} attributed rentals at $4,200 LTV is $${(r.now.rentals_attributed * 4200).toLocaleString()} lifetime revenue.</div>
                </div>

                <div class="surface p-5">
                  <div class="eyebrow mb-3">Escape valves</div>
                  ${r.escape_valves.length ? r.escape_valves.map(v => `
                    <div class="flex items-center gap-3 py-2.5" style="border-bottom: 1px solid var(--line-1);">
                      <div class="flex-1 text-[12px] text-1">${v.name}</div>
                      <span class="text-[10.5px] text-red num">${v.cost}/mo</span>
                      <span class="text-[10.5px] text-acc-bright num">+${Math.round(v.retention_lift*100)}% retain</span>
                    </div>
                  `).join('') : '<div class="text-[12px] text-3">None recommended. Pitch at full price.</div>'}
                </div>
              </div>

              <!-- Risks -->
              ${r.risks.length ? `
                <div class="mb-5">
                  <div class="eyebrow mb-3 text-amber">Risks to address before pitch</div>
                  <div class="space-y-1.5">
                    ${r.risks.map(risk => `
                      <div class="flex items-start gap-2.5 p-3 rounded-md" style="background: var(--amber-soft); box-shadow: inset 0 0 0 1px rgba(245,158,11,0.18);">
                        <i data-lucide="alert-triangle" class="size-3.5 text-amber mt-0.5 shrink-0"></i>
                        <span class="text-[12.5px] text-1 leading-relaxed">${risk}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

/* =====================================================================
   3. COMPETITOR INTELLIGENCE (legacy v1, superseded by pages-insights.js)
   ===================================================================== */
PAGES._competitorsLegacyV1 = () => {
  const c = window.COMPETITORS;
  const k = window.COMPETITOR_KPI;
  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Insights</div>
        <h1 class="h1">Competitor intelligence</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Who is moving, who hired an agency, who is investing. Cross-referenced from BrightLocal, Apify, and GBP diffs.</p>
      </div>
      ${UI.btn('Add competitor', { variant: 'primary', icon: 'plus', size: 'sm' })}
    </div>

    <div class="surface mb-6">
      <div class="grid grid-cols-4">
        ${[
          { label: 'Tracked', value: k.total_tracked, dot: 'slate' },
          { label: 'Critical threats', value: k.critical_threats, dot: 'red' },
          { label: 'Elevated', value: k.elevated_threats, dot: 'amber' },
          { label: 'Share of voice', value: k.net_share_of_voice + '%', delta: k.net_share_of_voice_delta, deltaLabel: 'pp', better: k.net_share_of_voice_delta > 0 },
        ].map((s, i) => `
          <div class="px-5 py-4" style="${i>0?'border-left: 1px solid var(--line-1);':''}">
            <div class="flex items-center gap-2 mb-2">
              ${s.dot ? `<span class="status status-${s.dot}"></span>` : ''}
              <div class="eyebrow">${s.label}</div>
            </div>
            <div class="flex items-baseline gap-2">
              <div class="text-[22px] font-semibold num text-1 leading-none">${s.value}</div>
              ${s.delta != null ? `<span class="text-[11px] num ${s.better ? 'text-acc-bright' : 'text-red'}">${s.delta > 0 ? '↑' : '↓'} ${Math.abs(s.delta).toFixed(1)}${s.deltaLabel}</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="space-y-3">
      ${c.map(cp => {
        const dot = cp.threat_level === 'critical' ? 'red' : cp.threat_level === 'elevated' ? 'amber' : 'slate';
        return `
          <div class="surface p-6">
            <div class="flex items-start justify-between mb-5">
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <h2 class="h2">${cp.name}</h2>
                  <span class="status status-${dot}">${cp.threat_level}</span>
                </div>
                <div class="text-[11.5px] text-3">${cp.market} . Facing ${cp.facing.length} of your facilities</div>
              </div>
              <div class="text-right">
                <div class="eyebrow mb-1">Threat score</div>
                <div class="text-[28px] font-semibold num leading-none ${cp.threat_score >= 80 ? 'text-red' : cp.threat_score >= 50 ? 'text-amber' : 'text-2'}">${cp.threat_score}</div>
              </div>
            </div>

            <div class="text-[13px] text-1 leading-relaxed mb-5 p-4 rounded-md" style="background: var(--bg-3);">
              <span class="text-3">Last move:</span> ${cp.last_move}
            </div>

            <div class="grid grid-cols-4 gap-2 mb-5">
              ${[
                ['Rank Δ 7d', cp.rank_delta_7d, 'pos', cp.rank_delta_7d < 0],
                ['Reviews/wk', cp.review_velocity_7d, '', cp.review_velocity_7d > cp.review_velocity_baseline],
                ['Citations 7d', cp.citation_velocity_7d, '', cp.citation_velocity_7d > cp.citation_velocity_baseline],
                ['Posts 7d', cp.post_velocity_7d, '', cp.post_velocity_7d > cp.post_velocity_baseline],
              ].map(([l, v, suf, alarming]) => `
                <div class="p-3 rounded-md" style="background: var(--bg-3);">
                  <div class="eyebrow text-[9.5px] mb-1.5">${l}</div>
                  <div class="text-[18px] font-semibold num leading-none ${alarming ? 'text-red' : 'text-2'}">${v > 0 ? '+' + v : v}${suf}</div>
                </div>
              `).join('')}
            </div>

            <div class="mb-5">
              <div class="eyebrow mb-3">Intel feed</div>
              <div class="relative pl-6">
                <div class="absolute left-2 top-2 bottom-2 w-px" style="background: var(--line-2);"></div>
                ${cp.intel.map(i => `
                  <div class="relative pb-3 pl-4">
                    <div class="absolute left-0 top-1.5 -translate-x-[10px] rounded-full size-2.5" style="background: var(--text-3); box-shadow: 0 0 0 4px var(--bg-2);"></div>
                    <div class="flex items-start gap-3">
                      <span class="text-[10.5px] text-3 mono shrink-0 w-20">${i.date}</span>
                      <div class="flex-1">
                        <div class="text-[12.5px] font-medium text-1">${i.signal}</div>
                        <div class="text-[11px] text-3 mt-0.5">${i.detail}</div>
                      </div>
                      <span class="tag">${i.source}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="flex items-center gap-2 pt-3" style="border-top: 1px solid var(--line-1);">
              ${UI.btn('Defensive playbook', { variant: 'primary', icon: 'shield', size: 'sm' })}
              ${UI.btn('Set alerts', { variant: 'secondary', icon: 'bell', size: 'sm' })}
              ${UI.btn('Add to watchlist', { variant: 'ghost', size: 'sm' })}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

/* =====================================================================
   4. TOPIC CLUSTER CONTENT MANAGEMENT
   ===================================================================== */
PAGES.topics = () => {
  const tc = window.TOPIC_CLUSTERS;
  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Delivery</div>
        <h1 class="h1">Topic clusters</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Content organized by topic, not just facility. Find coverage gaps, depth deltas, and cannibalization risk across the portfolio.</p>
      </div>
      ${UI.btn('New cluster', { variant: 'primary', icon: 'plus', size: 'sm' })}
    </div>

    <div class="space-y-4">
      ${tc.map(c => {
        const dot = c.priority === 'critical' ? 'red' : c.priority === 'high' ? 'amber' : c.priority === 'medium' ? 'acc' : 'slate';
        const depthDelta = c.avg_depth - c.competitor_avg_depth;
        return `
          <div class="surface p-6">
            <div class="flex items-start justify-between mb-5">
              <div>
                <div class="flex items-center gap-3 mb-1.5 flex-wrap">
                  <h2 class="h2">${c.name}</h2>
                  <span class="status status-${dot}">${c.priority}</span>
                  <span class="tag">${c.intent}</span>
                </div>
                <div class="text-[11.5px] text-3">Target: <span class="text-acc mono">"${c.target_kw}"</span> . Volume ${c.search_volume.toLocaleString()}/mo</div>
              </div>
              <div class="text-right">
                <div class="eyebrow mb-1">Coverage</div>
                <div class="text-[28px] font-semibold num leading-none ${c.coverage_score >= 80 ? 'text-acc-bright' : c.coverage_score >= 60 ? 'text-amber' : 'text-red'}">${c.coverage_score}</div>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-2 mb-5">
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="eyebrow text-[9.5px] mb-1.5">Pieces</div>
                <div class="text-[18px] font-semibold num">${c.pieces} / ${c.target_pieces}</div>
                <div class="mt-2">${UI.progressBar(c.pieces, c.target_pieces, 'var(--acc)', 3)}</div>
              </div>
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="eyebrow text-[9.5px] mb-1.5">Your avg depth</div>
                <div class="text-[18px] font-semibold num">${c.avg_depth.toLocaleString()}<span class="text-[10px] text-3 ml-1">words</span></div>
              </div>
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="eyebrow text-[9.5px] mb-1.5">Competitor avg</div>
                <div class="text-[18px] font-semibold num text-2">${c.competitor_avg_depth.toLocaleString()}</div>
              </div>
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="eyebrow text-[9.5px] mb-1.5">Depth delta</div>
                <div class="text-[18px] font-semibold num leading-none ${depthDelta >= 0 ? 'text-acc-bright' : 'text-amber'}">${depthDelta >= 0 ? '+' : ''}${depthDelta}</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-5 mb-5">
              <div>
                <div class="eyebrow mb-3">Coverage by facility</div>
                <div class="surface overflow-hidden" style="background: var(--bg-3);">
                  <table class="table">
                    <thead><tr><th>Facility</th><th class="text-right">Pieces</th><th class="text-right">Depth</th><th class="text-right">Rank</th></tr></thead>
                    <tbody>
                      ${c.by_facility.map(bf => {
                        const f = getFacility(bf.facility);
                        return `
                          <tr>
                            <td class="text-1 font-medium">${f?.name || bf.facility}</td>
                            <td class="text-right num">${bf.pieces}</td>
                            <td class="text-right num text-2">${bf.depth}</td>
                            <td class="text-right num ${bf.rank <= 5 ? 'text-acc-bright' : bf.rank <= 10 ? 'text-amber' : 'text-red'}">${bf.rank.toFixed(1)}</td>
                          </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div class="eyebrow mb-3">Gaps and opportunities</div>
                ${c.gaps.length ? c.gaps.map(g => `
                  <div class="flex items-start gap-2.5 p-3 mb-1.5 rounded-md hover:bg-3 transition-colors">
                    <i data-lucide="zap" class="size-3.5 text-amber mt-0.5 shrink-0"></i>
                    <span class="text-[12px] flex-1 text-1 leading-relaxed">${g}</span>
                    <button class="btn-icon-sm"><i data-lucide="plus" class="size-3"></i></button>
                  </div>
                `).join('') : '<div class="text-[12px] text-3 p-3">No gaps identified. Cluster is mature.</div>'}

                ${c.cannibalization_risk.length ? c.cannibalization_risk.map(can => `
                  <div class="p-3 rounded-md mt-3" style="background: var(--red-soft); box-shadow: inset 0 0 0 1px var(--red-line);">
                    <div class="flex items-center gap-2 mb-1.5">
                      <i data-lucide="alert-triangle" class="size-3.5 text-red"></i>
                      <span class="text-[11.5px] font-semibold text-red">Cannibalization risk</span>
                    </div>
                    <div class="text-[11.5px] text-1 leading-relaxed mb-1">${can.url_a}</div>
                    <div class="text-[11.5px] text-1 leading-relaxed mb-2">vs ${can.url_b}</div>
                    <div class="text-[11px] text-2 leading-relaxed">${can.recommendation}</div>
                  </div>
                `).join('') : ''}
              </div>
            </div>

            <div class="flex gap-2 pt-3" style="border-top: 1px solid var(--line-1);">
              ${UI.btn('Generate gap briefs', { variant: 'primary', icon: 'wand-2', size: 'sm', onClick: "toast('Briefs queued','success')" })}
              ${UI.btn('SERP analysis', { variant: 'secondary', icon: 'search', size: 'sm' })}
              ${UI.btn('Export cluster map', { variant: 'ghost', icon: 'download', size: 'sm' })}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

/* =====================================================================
   5. CLIENT DELIVERY RECEIPTS
   ===================================================================== */
PAGES.delivery = () => {
  const d = window.DELIVERY_RECEIPTS.acme;
  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Delivery</div>
        <h1 class="h1">Delivery receipts</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Auto-assembled "what we shipped" report. Sent to clients on the 1st of each month. Designed to justify the retainer.</p>
      </div>
      <div class="flex items-center gap-1.5">
        ${UI.btn('Switch client', { variant: 'secondary', icon: 'building-2', size: 'sm' })}
        ${UI.btn('Send to client', { variant: 'primary', icon: 'send', size: 'sm', onClick: "toast('Delivery receipt sent','success')" })}
      </div>
    </div>

    <div class="surface glow-stat mb-6 p-7">
      <div class="flex items-end justify-between mb-7">
        <div>
          <div class="eyebrow mb-2.5">Acme Storage . ${d.month}</div>
          <h2 class="text-[26px] font-semibold tracking-tight leading-none">We delivered <span class="text-acc-bright">${d.summary.gbp_posts + d.summary.reviews_responded + d.summary.schemas_deployed + d.summary.citations_built + d.summary.content_pieces + d.summary.backlinks_earned}</span> outcomes</h2>
          <div class="text-[12.5px] text-2 mt-2">across 15 facilities . in ${d.summary.hours_logged} hours . for $3,000 retainer</div>
        </div>
        <div class="text-right">
          <div class="eyebrow mb-2">Business impact</div>
          <div class="text-[28px] font-semibold num text-acc-bright leading-none">$${d.business_outcomes.revenue_attributed.toLocaleString()}</div>
          <div class="text-[11px] text-3 mt-1">attributed lifetime revenue</div>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-x-6 pt-6" style="border-top: 1px solid var(--line-1);">
        ${[
          { label: 'GBP posts', v: d.summary.gbp_posts, t: d.summary.posts_target },
          { label: 'Reviews replied', v: d.summary.reviews_responded, t: d.summary.reviews_target },
          { label: 'Schemas', v: d.summary.schemas_deployed, t: d.summary.schemas_target },
          { label: 'Citations', v: d.summary.citations_built, t: d.summary.citations_target },
          { label: 'Content', v: d.summary.content_pieces, t: d.summary.content_target },
          { label: 'Audits', v: d.summary.audits_run, t: d.summary.audits_target },
          { label: 'Backlinks', v: d.summary.backlinks_earned, t: d.summary.backlinks_target },
        ].map(s => {
          const meet = s.v >= s.t;
          return `
            <div>
              <div class="eyebrow mb-1.5">${s.label}</div>
              <div class="flex items-baseline gap-1">
                <span class="text-[20px] font-semibold num text-1">${s.v}</span>
                <span class="text-[11px] text-3 num">/ ${s.t}</span>
              </div>
              <div class="text-[10px] num mt-1 ${meet ? 'text-acc-bright' : 'text-amber'}">${meet ? '↑ exceeded' : 'on track'}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div class="grid grid-cols-3 gap-5 mb-6">
      <div class="surface p-5">
        <div class="h3 mb-1">GBP business actions</div>
        <div class="text-[11px] text-3 mb-4">${d.month} totals</div>
        <div class="space-y-3">
          <div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="text-[12px] text-2">Calls</span>
              <span class="text-[18px] font-semibold num">${d.business_outcomes.gbp_calls_total.toLocaleString()}</span>
            </div>
            <div class="text-[10px] text-acc-bright num">↑ ${(d.business_outcomes.gbp_calls_mom*100).toFixed(0)}% MoM</div>
          </div>
          <div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="text-[12px] text-2">Directions</span>
              <span class="text-[18px] font-semibold num">${d.business_outcomes.directions_total.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="text-[12px] text-2">Website clicks</span>
              <span class="text-[18px] font-semibold num">${d.business_outcomes.website_clicks.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="text-[12px] text-2">Rentals attributed</span>
              <span class="text-[18px] font-semibold num text-acc-bright">${d.business_outcomes.rentals_attributed}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="surface p-5 col-span-2">
        <div class="h3 mb-1">Rank movements</div>
        <div class="text-[11px] text-3 mb-4">Top 5 keyword shifts this month</div>
        <div class="space-y-1">
          ${d.rank_movements.sort((a,b) => a.delta - b.delta).map(rm => {
            const f = getFacility(rm.facility);
            const better = rm.delta < 0;
            return `
              <div class="flex items-center gap-3 p-2.5 rounded-md hover:bg-3 transition-colors">
                <div class="flex-1 min-w-0">
                  <div class="text-[12.5px] font-medium text-1">${f?.name}</div>
                  <div class="text-[10.5px] text-3 mono mt-0.5">"${rm.keyword}"</div>
                </div>
                <div class="flex items-center gap-2 text-[12.5px] num">
                  <span class="text-2">${rm.from.toFixed(1)}</span>
                  <i data-lucide="arrow-right" class="size-3 text-3"></i>
                  <span class="${better ? 'text-acc-bright' : 'text-red'} font-medium">${rm.to.toFixed(1)}</span>
                  <span class="text-[11px] ${better ? 'text-acc-bright' : 'text-red'} mono w-12 text-right">${better ? '' : '+'}${rm.delta.toFixed(1)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <div class="surface p-6">
      <div class="flex items-center justify-between mb-5">
        <div>
          <div class="h3">Delivery timeline</div>
          <div class="text-[11px] text-3 mt-0.5">Every touchpoint, sorted newest to oldest</div>
        </div>
        ${UI.btn('Export PDF', { variant: 'secondary', icon: 'download', size: 'sm' })}
      </div>

      <div class="relative pl-7">
        <div class="absolute left-2.5 top-2 bottom-2 w-px" style="background: var(--line-2);"></div>
        ${d.timeline.map(t => `
          <div class="relative pb-5 pl-5">
            <div class="absolute left-0 top-1 -translate-x-[14px] rounded-full size-3.5 flex items-center justify-center" style="background: var(--bg-3); box-shadow: 0 0 0 4px var(--bg-2);">
              <i data-lucide="${t.icon}" class="size-2 text-acc"></i>
            </div>
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10.5px] mono text-3">${t.date}</span>
                  <span class="text-[10.5px] text-3">.</span>
                  <span class="text-[11px] font-medium text-1">${t.who}</span>
                </div>
                <div class="text-[12.5px] text-1 mb-0.5">${t.action}</div>
                <div class="text-[11px] text-acc-bright">${t.outcome}</div>
              </div>
              <span class="tag shrink-0">${getFacility(t.facility)?.name || t.facility}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/* =====================================================================
   6. SERVICE AREA EXPANSION MODELER
   ===================================================================== */
PAGES.serviceareas = () => {
  const s = window.SERVICE_AREAS;
  const f = getFacility(s.facility);
  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Delivery</div>
        <h1 class="h1">Service area modeler</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Should you expand GBP service area? Models the rank dilution vs call volume opportunity per candidate area.</p>
      </div>
      <div class="flex items-center gap-1.5">
        ${UI.btn('Switch facility', { variant: 'secondary', icon: 'warehouse', size: 'sm' })}
        ${UI.btn('Apply selected', { variant: 'primary', icon: 'check', size: 'sm', onClick: "toast('Service area expansion queued for GBP edit','success')" })}
      </div>
    </div>

    <div class="surface mb-6 p-6">
      <div class="flex items-center justify-between mb-5">
        <div>
          <div class="h3">${f?.name}</div>
          <div class="text-[11.5px] text-3 mt-1">Current service area . ${f?.city}, ${f?.state}</div>
        </div>
        <div class="text-right">
          <div class="eyebrow mb-1">Center rank</div>
          <div class="text-[24px] font-semibold num text-acc-bright leading-none">${s.current_avg_rank.toFixed(1)}</div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-x-6 pt-5" style="border-top: 1px solid var(--line-1);">
        <div>
          <div class="eyebrow mb-1.5">Current areas</div>
          <div class="text-[16px] font-semibold num">${s.current_areas.length}</div>
          <div class="text-[10px] text-3 mt-1">${s.current_areas.join(', ')}</div>
        </div>
        <div>
          <div class="eyebrow mb-1.5">Radius</div>
          <div class="text-[16px] font-semibold num">${s.current_radius_mi} mi</div>
        </div>
        <div>
          <div class="eyebrow mb-1.5">Population covered</div>
          <div class="text-[16px] font-semibold num">${(s.current_coverage_pop / 1000).toFixed(0)}k</div>
        </div>
        <div>
          <div class="eyebrow mb-1.5">Avg rank in coverage</div>
          <div class="text-[16px] font-semibold num text-acc-bright">${s.current_avg_rank.toFixed(1)}</div>
        </div>
      </div>
    </div>

    <div class="surface">
      <div class="px-6 py-4 flex items-center justify-between" style="border-bottom: 1px solid var(--line-1);">
        <div>
          <div class="h3">Expansion candidates</div>
          <div class="text-[11px] text-3 mt-0.5">${s.expansion_candidates.length} nearby areas analyzed</div>
        </div>
        <div class="flex items-center gap-1">
          <button class="btn btn-secondary btn-sm">Sort: recommendation</button>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th class="pl-6"><input type="checkbox" class="rounded" style="background: var(--bg-3); border-color: var(--line-strong);"/></th>
            <th>Area</th>
            <th class="text-right">Distance</th>
            <th class="text-right">Population</th>
            <th class="text-right">Demand</th>
            <th class="text-right">Competition</th>
            <th class="text-right">Rank dilution</th>
            <th class="text-right">Call lift</th>
            <th>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          ${s.expansion_candidates.map(c => {
            const recColor = c.recommendation === 'expand' ? 'green' : c.recommendation === 'caution' ? 'amber' : 'slate';
            return `
              <tr>
                <td class="pl-6"><input type="checkbox" ${c.recommendation === 'expand' ? 'checked' : ''} class="rounded" style="background: var(--bg-3); border-color: var(--line-strong);"/></td>
                <td class="text-1 font-medium">${c.area}</td>
                <td class="text-right num text-2">${c.distance_mi} mi</td>
                <td class="text-right num text-2">${c.pop.toLocaleString()}</td>
                <td class="text-right num ${c.market_demand_score >= 50 ? 'text-acc-bright' : c.market_demand_score >= 30 ? 'text-2' : 'text-3'}">${c.market_demand_score}</td>
                <td class="text-right text-[11px] text-2 capitalize">${c.competitor_density}</td>
                <td class="text-right num ${c.expected_rank_dilution >= 0.3 ? 'text-amber' : 'text-2'}">+${c.expected_rank_dilution.toFixed(2)}</td>
                <td class="text-right num ${c.expected_call_volume_lift >= 0.05 ? 'text-acc-bright' : 'text-2'}">+${(c.expected_call_volume_lift*100).toFixed(1)}%</td>
                <td><span class="status status-${recColor}">${c.recommendation}</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <div class="px-6 py-4 grid grid-cols-3 gap-3" style="border-top: 1px solid var(--line-1);">
        ${s.expansion_candidates.filter(c => c.recommendation === 'expand').map(c => `
          <div class="p-4 rounded-md" style="background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);">
            <div class="flex items-center gap-2 mb-2">
              <i data-lucide="sparkles" class="size-3.5 text-acc"></i>
              <span class="text-[12px] font-semibold text-1">${c.area}</span>
              <span class="text-[10px] text-3 ml-auto num">${Math.round(c.confidence*100)}% conf</span>
            </div>
            <div class="text-[11.5px] text-2 leading-relaxed">${c.reasoning}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/* =====================================================================
   7. CALL ANALYTICS
   ===================================================================== */
PAGES.calls = () => {
  const ca = window.CALL_ANALYTICS;
  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Insights</div>
        <h1 class="h1">Call analytics</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Every call tracked, tagged, attributed. CallRail integration shows what is actually converting between GBP click and rental.</p>
      </div>
      <div class="flex items-center gap-1.5">
        ${UI.btn('Recordings', { variant: 'secondary', icon: 'mic', size: 'sm' })}
        ${UI.btn('Settings', { variant: 'ghost', icon: 'settings', size: 'sm' })}
      </div>
    </div>

    <div class="surface glow-stat mb-6 p-7">
      <div class="flex items-end justify-between mb-7">
        <div>
          <div class="eyebrow mb-2.5">Call volume . MTD</div>
          <div class="flex items-baseline gap-3">
            <span class="display num text-1">${ca.total_calls_mtd.toLocaleString()}</span>
            <span class="text-acc-bright num text-[15px]">↑ 18% MoM</span>
          </div>
          <div class="text-[12px] text-3 mt-3 num">${ca.answered_calls} answered . ${ca.missed_calls} missed . ${ca.after_hours} after-hours</div>
        </div>
        <div class="text-right">
          <div class="eyebrow mb-2">Rental conversion</div>
          <div class="text-[40px] font-semibold num text-acc-bright leading-none">${(ca.rental_conversion_rate*100).toFixed(1)}%</div>
          <div class="text-[11px] text-3 mt-1.5">of answered calls become rentals</div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-x-8 pt-6" style="border-top: 1px solid var(--line-1);">
        ${[
          { l: 'Answer rate', v: (ca.answer_rate*100).toFixed(0)+'%', sub: 'industry avg 72%' },
          { l: 'Avg duration', v: ca.avg_call_duration + 's', sub: '2:22 minutes' },
          { l: 'Tour booking', v: (ca.tour_conversion_rate*100).toFixed(1)+'%', sub: 'of answered calls' },
          { l: 'Missed opp', v: '$70.2k', sub: 'estimated lost revenue' },
        ].map(s => `
          <div>
            <div class="eyebrow mb-1.5">${s.l}</div>
            <div class="text-[18px] font-semibold num text-1 leading-none">${s.v}</div>
            <div class="text-[10px] text-3 mt-1.5">${s.sub}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5 mb-6">
      <div class="surface p-5 col-span-8">
        <div class="h3 mb-1">Per-facility breakdown</div>
        <div class="text-[11px] text-3 mb-4">May MTD</div>
        <table class="table">
          <thead>
            <tr><th>Facility</th><th class="text-right">Calls</th><th class="text-right">Answered</th><th class="text-right">Conversions</th><th class="text-right">Avg duration</th><th>Tag</th></tr>
          </thead>
          <tbody>
            ${ca.by_facility.map(bf => {
              const f = getFacility(bf.facility);
              const tagColor = bf.tag === 'high-intent' ? 'green' : bf.tag === 'normal' ? 'sky' : 'red';
              const ansRate = (bf.answered / bf.calls);
              return `
                <tr>
                  <td class="text-1 font-medium">${f?.name || bf.facility}</td>
                  <td class="text-right num">${bf.calls}</td>
                  <td class="text-right num ${ansRate > 0.7 ? 'text-acc-bright' : ansRate > 0.5 ? 'text-2' : 'text-red'}">${bf.answered} <span class="text-3 text-[10.5px]">(${Math.round(ansRate*100)}%)</span></td>
                  <td class="text-right num text-acc-bright">${bf.conv}</td>
                  <td class="text-right num text-2">${bf.avg_dur}s</td>
                  <td><span class="status status-${tagColor}">${bf.tag}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="surface p-5 col-span-4">
        <div class="h3 mb-1">Missed call patterns</div>
        <div class="text-[11px] text-3 mb-4">Recoverable revenue</div>
        <div class="space-y-3">
          ${ca.missed_call_patterns.map(mp => `
            <div class="p-3 rounded-md" style="background: var(--bg-3);">
              <div class="text-[12px] font-medium text-1 mb-1">${mp.pattern}</div>
              <div class="flex items-center justify-between mt-2">
                <span class="text-[11px] text-3">${mp.count} calls . ${Math.round(mp.recoverable*100)}% recoverable</span>
                <span class="text-[12px] font-semibold text-acc-bright num">${mp.opportunity}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="p-3 rounded-md mt-3" style="background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);">
          <div class="flex items-center gap-2 mb-1.5">
            <i data-lucide="sparkles" class="size-3.5 text-acc"></i>
            <span class="text-[11px] font-medium text-1">Recommendation</span>
          </div>
          <p class="text-[11.5px] text-2 leading-relaxed">Add overflow voicemail-to-SMS with AI auto-text response for after-hours calls. Estimated recovery: $9,920/mo at 32% recovery rate.</p>
        </div>
      </div>
    </div>

    <div class="surface">
      <div class="px-6 py-4 flex items-center justify-between" style="border-bottom: 1px solid var(--line-1);">
        <div>
          <div class="h3">Recent calls</div>
          <div class="text-[11px] text-3 mt-0.5">Live feed . click any call for recording and transcript</div>
        </div>
        ${UI.searchInput('Search by phone, keyword, outcome', 'w-56')}
      </div>
      <table class="table">
        <thead>
          <tr><th>Time</th><th>Facility</th><th>Caller</th><th>Keyword</th><th class="text-right">Duration</th><th>Outcome</th><th>Sentiment</th></tr>
        </thead>
        <tbody>
          ${ca.recent_calls.map(c => {
            const f = getFacility(c.facility);
            const sentDot = c.sentiment === 'positive' ? 'green' : c.sentiment === 'neutral' ? 'sky' : c.sentiment === 'negative' ? 'red' : 'slate';
            const outcomeColor = c.outcome.includes('rental') ? 'text-acc-bright' : c.outcome.includes('tour') ? 'text-acc' : c.outcome.includes('voicemail') || c.outcome.includes('missed') || c.outcome.includes('after-hours') ? 'text-amber' : c.outcome === 'wrong-number' ? 'text-red' : 'text-2';
            return `
              <tr class="selectable">
                <td class="text-2 mono text-[11.5px]">${c.time}</td>
                <td class="text-1 font-medium text-[12px]">${f?.name || c.facility}</td>
                <td class="text-2 mono text-[11px]">${c.caller}</td>
                <td class="text-acc mono text-[11px]">${c.keyword}</td>
                <td class="text-right num text-2 text-[11.5px]">${c.duration ? c.duration + 's' : '-'}</td>
                <td class="${outcomeColor} text-[12px]">${c.outcome.replace(/-/g, ' ')}</td>
                <td><span class="status status-${sentDot}">${c.sentiment}</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
};

/* =====================================================================
   8. ALGORITHM UPDATE TRACKER
   ===================================================================== */
PAGES.algorithm = () => {
  const ups = window.ALGORITHM_UPDATES;
  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Insights</div>
        <h1 class="h1">Algorithm tracker</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Every Google update mapped to your portfolio impact. Recovery playbooks per update type, audit trail for every client conversation.</p>
      </div>
      ${UI.btn('Sensor history', { variant: 'secondary', icon: 'activity', size: 'sm' })}
    </div>

    ${window.ALGORITHM_RUMORS.length ? `
      <div class="surface mb-5 p-4" style="box-shadow: inset 0 0 0 1px rgba(245,158,11,0.18); background: var(--bg-2);">
        <div class="flex items-center gap-3">
          <span class="status status-amber"></span>
          <div class="flex-1">
            <div class="text-[12.5px] font-medium text-1">Unconfirmed activity . ${window.ALGORITHM_RUMORS.length} rumor signals</div>
            <div class="text-[11px] text-3 mt-0.5">${window.ALGORITHM_RUMORS[0].detail} (${window.ALGORITHM_RUMORS[0].date})</div>
          </div>
          ${UI.btn('Investigate', { variant: 'secondary', size: 'sm' })}
        </div>
      </div>
    ` : ''}

    <div class="space-y-5">
      ${ups.map(u => {
        const sevDot = u.severity === 'high' ? 'red' : u.severity === 'medium' ? 'amber' : 'sky';
        const impactNet = u.portfolio_impact.gained - u.portfolio_impact.lost;
        return `
          <div class="surface p-6">
            <div class="flex items-start justify-between mb-5">
              <div>
                <div class="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 class="h2">${u.name}</h2>
                  <span class="status status-${sevDot}">${u.severity}</span>
                  <span class="tag">${u.type}</span>
                  <span class="text-[10.5px] text-3 mono">${u.date}</span>
                </div>
                <div class="text-[12.5px] text-2 leading-relaxed max-w-3xl">${u.description}</div>
              </div>
              <div class="text-right">
                <div class="eyebrow mb-1">Net portfolio</div>
                <div class="text-[24px] font-semibold num leading-none ${impactNet > 0 ? 'text-acc-bright' : impactNet < 0 ? 'text-red' : 'text-2'}">${impactNet > 0 ? '+' : ''}${impactNet}</div>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-2 mb-5">
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="status status-green"></span>
                  <div class="eyebrow text-[9.5px]">Gained</div>
                </div>
                <div class="text-[20px] font-semibold num text-acc-bright">${u.portfolio_impact.gained}</div>
              </div>
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="status status-slate"></span>
                  <div class="eyebrow text-[9.5px]">Unchanged</div>
                </div>
                <div class="text-[20px] font-semibold num text-2">${u.portfolio_impact.unchanged}</div>
              </div>
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="status status-red"></span>
                  <div class="eyebrow text-[9.5px]">Lost</div>
                </div>
                <div class="text-[20px] font-semibold num text-red">${u.portfolio_impact.lost}</div>
              </div>
              <div class="p-3 rounded-md" style="background: var(--bg-3);">
                <div class="flex items-center gap-2 mb-1.5">
                  <i data-lucide="check-circle-2" class="size-3 text-acc"></i>
                  <div class="eyebrow text-[9.5px]">Recovery</div>
                </div>
                <div class="text-[14px] font-semibold capitalize ${u.recovery_status === 'complete' ? 'text-acc-bright' : 'text-amber'}">${u.recovery_status}</div>
              </div>
            </div>

            ${u.affected.length ? `
              <div class="mb-5">
                <div class="eyebrow mb-3">Per-facility impact</div>
                <div class="surface overflow-hidden" style="background: var(--bg-3);">
                  <table class="table">
                    <thead><tr><th>Facility</th><th class="text-right">Position delta</th><th>Status</th><th class="text-right">Recovery time</th></tr></thead>
                    <tbody>
                      ${u.affected.map(af => {
                        const f = getFacility(af.facility);
                        const statusColor = af.status === 'gained' ? 'green' : af.status === 'recovered' ? 'acc' : af.status === 'partial' ? 'amber' : 'red';
                        return `
                          <tr>
                            <td class="text-1 font-medium">${f?.name || af.facility}</td>
                            <td class="text-right num ${af.delta < 0 ? 'text-red' : 'text-acc-bright'}">${af.delta > 0 ? '+' : ''}${af.delta}</td>
                            <td><span class="status status-${statusColor}">${af.status}</span></td>
                            <td class="text-right num text-2">${af.recovered_in_days ? af.recovered_in_days + 'd' : '-'}</td>
                          </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            ` : ''}

            <div class="p-4 rounded-md" style="background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);">
              <div class="flex items-center gap-2 mb-2">
                <i data-lucide="book-open" class="size-3.5 text-acc"></i>
                <span class="text-[11.5px] font-semibold text-1">Playbook applied</span>
              </div>
              <p class="text-[12px] text-1 leading-relaxed">${u.your_playbook}</p>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

/* =====================================================================
   9. REPUTATION CRISIS MODE
   ===================================================================== */
PAGES.crisis = () => {
  const crises = window.REPUTATION_CRISES;
  const platforms = window.PLATFORM_SCORES;
  return `
    <div class="flex items-start justify-between mb-7">
      <div>
        <div class="eyebrow mb-2.5">Delivery</div>
        <h1 class="h1">Reputation crisis</h1>
        <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Triggered when negative review velocity spikes. Auto-paused outbound, owner notified, response playbook running.</p>
      </div>
      ${UI.btn('Crisis playbook library', { variant: 'secondary', icon: 'book-open', size: 'sm' })}
    </div>

    <div class="surface mb-6">
      <div class="grid grid-cols-5">
        ${Object.entries(platforms).map(([name, p], i) => {
          const status = p.status === 'healthy' ? 'green' : 'amber';
          return `
            <div class="px-5 py-4" style="${i>0?'border-left: 1px solid var(--line-1);':''}">
              <div class="flex items-center gap-2 mb-2">
                <span class="status status-${status}"></span>
                <div class="eyebrow capitalize">${name}</div>
              </div>
              <div class="flex items-baseline gap-2">
                <span class="text-[18px] font-semibold num text-1 leading-none">${p.rating.toFixed(2)}</span>
                <span class="text-[10px] num ${p.trend > 0 ? 'text-acc-bright' : 'text-red'}">${p.trend > 0 ? '↑' : '↓'} ${Math.abs(p.trend).toFixed(2)}</span>
              </div>
              <div class="text-[10px] text-3 mt-1.5 num">${p.reviews} reviews${p.complaints ? ' . ' + p.complaints + ' BBB' : ''}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    ${crises.map(cr => {
      const f = getFacility(cr.facility);
      return `
        <div class="surface mb-5" style="box-shadow: inset 0 0 0 1px var(--red-line);">
          <div class="px-7 py-5 flex items-center justify-between" style="border-bottom: 1px solid var(--line-1);">
            <div class="flex items-center gap-4">
              <div class="size-10 rounded-md flex items-center justify-center" style="background: var(--red-soft);">
                <i data-lucide="shield-alert" class="size-4 text-red"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h2 class="h2">${f?.name}</h2>
                  <span class="status status-red">${cr.severity}</span>
                </div>
                <div class="text-[11.5px] text-3">Triggered ${cr.triggered} . Pattern: ${cr.pattern}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="eyebrow mb-1">Revenue at risk</div>
              <div class="text-[20px] font-semibold num text-red leading-none">$${cr.estimated_revenue_at_risk.toLocaleString()}</div>
            </div>
          </div>

          <div class="p-7">
            <div class="p-4 rounded-md mb-5" style="background: var(--red-soft);">
              <div class="text-[12.5px] text-1 leading-relaxed"><span class="text-red font-semibold">Trigger:</span> ${cr.trigger}</div>
            </div>

            <div class="grid grid-cols-12 gap-5">
              <div class="col-span-7">
                <div class="eyebrow mb-3">Affected reviews</div>
                <div class="space-y-1.5">
                  ${cr.affected_reviews.map(ar => `
                    <div class="p-3 rounded-md" style="background: var(--bg-3);">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-red text-[12px]">${'*'.repeat(ar.stars)}<span class="text-4">${'*'.repeat(5-ar.stars)}</span></span>
                        <span class="text-[12px] font-medium text-1">${ar.author}</span>
                        <span class="text-[10.5px] text-3 mono ml-auto">${ar.date}</span>
                        ${ar.responded ? '<span class="status status-acc">replied</span>' : '<span class="status status-red">pending</span>'}
                      </div>
                      <div class="text-[11.5px] text-2 leading-relaxed">${ar.issue}</div>
                    </div>
                  `).join('')}
                </div>

                <div class="eyebrow mt-5 mb-3">Crisis recovery steps</div>
                <div class="space-y-1">
                  ${cr.steps.map(s => `
                    <div class="flex items-center gap-3 p-3 rounded-md ${s.status === 'in_progress' ? '' : 'hover:bg-3'} transition-colors" style="${s.status === 'in_progress' ? 'background: var(--bg-3); box-shadow: inset 0 0 0 1px rgba(245,158,11,0.25);' : ''}">
                      <span class="size-6 rounded-full text-[10.5px] font-medium flex items-center justify-center num shrink-0" style="${s.status === 'done' ? 'background: var(--acc-soft); color: var(--acc-bright);' : s.status === 'in_progress' ? 'background: var(--amber-soft); color: var(--amber);' : 'background: var(--bg-4); color: var(--text-3);'}">${s.status === 'done' ? '✓' : s.n}</span>
                      <div class="flex-1">
                        <div class="text-[12.5px] ${s.status === 'done' ? 'text-3 line-through' : 'text-1'} font-medium">${s.label}</div>
                        ${s.detail ? `<div class="text-[10.5px] text-3 mt-0.5">${s.detail}</div>` : ''}
                        ${s.at ? `<div class="text-[10px] text-3 mono mt-0.5">${s.at} by ${s.by}</div>` : ''}
                      </div>
                      ${s.status === 'pending' && cr.step + 1 === s.n ? `<button class="btn btn-secondary btn-sm">Start</button>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="col-span-5">
                <div class="eyebrow mb-3">Cross-platform signals</div>
                <div class="space-y-1.5 mb-5">
                  ${cr.related_signals.map(rs => `
                    <div class="flex items-start gap-2.5 p-3 rounded-md" style="background: var(--bg-3);">
                      <i data-lucide="alert-circle" class="size-3.5 text-amber mt-0.5 shrink-0"></i>
                      <div class="flex-1 min-w-0">
                        <div class="text-[11.5px] font-medium text-1">${rs.signal}</div>
                        <div class="text-[11px] text-3 mt-0.5 leading-relaxed">${rs.detail}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <div class="p-4 rounded-md" style="background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);">
                  <div class="flex items-center gap-2 mb-2">
                    <i data-lucide="sparkles" class="size-3.5 text-acc"></i>
                    <span class="text-[11.5px] font-semibold text-1">Recommended outreach</span>
                  </div>
                  <p class="text-[11.5px] text-2 leading-relaxed mb-3">2 of 4 reviewers still reachable. Apology call from owner + 1 month free credit historically converts 70% to neutral or positive review.</p>
                  ${UI.btn('Draft outreach', { variant: 'primary', icon: 'phone', size: 'sm' })}
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 mt-5 pt-4" style="border-top: 1px solid var(--line-1);">
              ${UI.btn('Notify client', { variant: 'primary', icon: 'send', size: 'sm' })}
              ${UI.btn('Removal request check', { variant: 'secondary', icon: 'shield-check', size: 'sm' })}
              ${UI.btn('Resolve crisis', { variant: 'ghost', icon: 'check', size: 'sm' })}
            </div>
          </div>
        </div>
      `;
    }).join('')}
  `;
};
