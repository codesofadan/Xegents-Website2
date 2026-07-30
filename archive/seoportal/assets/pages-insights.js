// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ====================================================================
//    INSIGHTS - Anomalies, Predictive, ROI, SLA, AI Playground, Reports
//    ==================================================================== */
//
// PAGES.anomalies = () => {
//   return `
//     <div class="flex items-start justify-between mb-7">
//       <div>
//         <div class="eyebrow mb-2.5">Insights</div>
//         <h1 class="h1">Anomaly center</h1>
//         <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Cross-referenced against algorithm calendar, GBP edits, and competitor activity. 3 active alerts now.</p>
//       </div>
//       <div class="flex items-center gap-1.5">
//         ${UI.btn('Thresholds', { variant: 'secondary', icon: 'sliders', size: 'sm' })}
//         ${UI.btn('History', { variant: 'secondary', icon: 'history', size: 'sm' })}
//       </div>
//     </div>
//
//     <div class="surface mb-6">
//       <div class="grid grid-cols-4">
//         ${[
//           { label: 'Red severity',   value: '1',  dot: 'red' },
//           { label: 'Amber severity', value: '2',  dot: 'amber' },
//           { label: 'Green wins',     value: '4',  dot: 'green', delta: 1, deltaLabel: ' this week' },
//           { label: 'Auto-resolved',  value: '12', dot: 'slate', sub: 'last 7 days' },
//         ].map((k, i) => `
//           <div class="px-5 py-4" style="${i > 0 ? 'border-left: 1px solid var(--line-1);' : ''}">
//             <div class="flex items-center gap-2 mb-2">
//               <span class="status status-${k.dot}"></span>
//               <div class="eyebrow">${k.label}</div>
//             </div>
//             <div class="text-[22px] font-semibold num text-1 leading-none">${k.value}</div>
//             ${k.delta != null ? `<div class="text-[11px] text-acc-bright num mt-2">^ ${k.delta}${k.deltaLabel}</div>` : k.sub ? `<div class="text-[11px] text-3 mt-2">${k.sub}</div>` : ''}
//           </div>
//         `).join('')}
//       </div>
//     </div>
//
//     <!-- Split canvas -->
//     <div class="grid grid-cols-12 gap-5">
//       <div class="col-span-4 space-y-1.5">
//         ${window.ANOMALIES.map((a, i) => {
//           const sev = a.severity === 'red' ? 'red' : a.severity === 'amber' ? 'amber' : 'green';
//           const f = getFacility(a.facility);
//           const isActive = i === 0;
//           return `
//             <div onclick="document.querySelectorAll('.anom-row').forEach(el=>el.classList.remove('active'));this.classList.add('active');document.querySelectorAll('.anom-detail').forEach(el=>el.classList.add('hidden'));document.getElementById('anom-detail-${a.id}').classList.remove('hidden');" class="anom-row surface surface-hover p-4 cursor-pointer ${isActive ? 'active' : ''}" style="${isActive ? 'background: var(--bg-3);' : ''}">
//               <div class="flex items-center gap-2 mb-2.5">
//                 <span class="status status-${sev}">${a.severity.toUpperCase()}</span>
//                 <span class="text-[10.5px] text-3 mono ml-auto">${a.confidence ? (a.confidence * 100).toFixed(0) + '% conf' : ''}</span>
//               </div>
//               <div class="text-[12.5px] font-medium text-1 mb-1 leading-snug">${a.title}</div>
//               <div class="text-[11px] text-3">${f?.name}</div>
//               ${a.keyword ? `<div class="text-[10.5px] text-3 mono mt-1.5">"${a.keyword}"</div>` : ''}
//               <div class="text-[10.5px] text-3 mt-2.5 flex items-center gap-1.5 num"><i data-lucide="clock" class="size-2.5"></i>${a.detected}</div>
//             </div>
//           `;
//         }).join('')}
//       </div>
//
//       <div class="col-span-8">
//         ${window.ANOMALIES.map((a, i) => {
//           const sev = a.severity === 'red' ? 'red' : a.severity === 'amber' ? 'amber' : 'green';
//           const f = getFacility(a.facility);
//           return `
//             <div id="anom-detail-${a.id}" class="anom-detail surface p-7 ${i === 0 ? '' : 'hidden'}">
//               <div class="flex items-start justify-between mb-6">
//                 <div>
//                   <div class="flex items-center gap-2 mb-3">
//                     <span class="status status-${sev}">${a.severity.toUpperCase()}</span>
//                     <span class="tag">${a.metric.replace(/_/g, ' ')}</span>
//                   </div>
//                   <h2 class="text-[22px] font-semibold tracking-tight leading-none">${a.title}</h2>
//                   <div class="text-[12px] text-2 mt-2.5">${f?.name} . Detected ${a.detected}</div>
//                   ${a.keyword ? `<div class="text-[12.5px] mt-2"><span class="text-3">Keyword</span> <span class="text-acc-bright mono ml-2">"${a.keyword}"</span></div>` : ''}
//                 </div>
//                 <div class="text-right">
//                   <div class="eyebrow mb-1">Confidence</div>
//                   <div class="text-[32px] font-semibold num text-acc-bright leading-none">${a.confidence ? (a.confidence * 100).toFixed(0) + '%' : '-'}</div>
//                 </div>
//               </div>
//
//               <div class="grid grid-cols-3 gap-2 mb-7">
//                 <div class="p-4 rounded-md" style="background: var(--bg-3);">
//                   <div class="eyebrow text-[9.5px] mb-2">Prior 7d avg</div>
//                   <div class="text-[22px] font-semibold num text-2 leading-none">${a.prior_avg}</div>
//                 </div>
//                 <div class="p-4 rounded-md" style="background: var(--bg-3);">
//                   <div class="eyebrow text-[9.5px] mb-2">Current</div>
//                   <div class="text-[22px] font-semibold num leading-none ${a.severity === 'red' ? 'text-red' : a.severity === 'amber' ? 'text-amber' : 'text-acc-bright'}">${a.current}</div>
//                 </div>
//                 <div class="p-4 rounded-md" style="background: var(--bg-3);">
//                   <div class="eyebrow text-[9.5px] mb-2">Delta</div>
//                   <div class="text-[22px] font-semibold num leading-none ${a.delta < 0 ? 'text-red' : 'text-acc-bright'}">${formatDelta(a.delta)}${a.metric.includes('reviews') || a.metric.includes('impressions') ? '%' : ''}</div>
//                 </div>
//               </div>
//
//               <!-- Forensic timeline of cross-references -->
//               <div class="mb-7">
//                 <div class="eyebrow mb-4">Cross-reference engine . forensic timeline</div>
//                 <div class="relative pl-7">
//                   <div class="absolute left-2.5 top-2 bottom-2 w-px" style="background: var(--line-2);"></div>
//                   ${a.cross_ref.map((r, idx) => {
//                     const strength = r.strength === 'high' ? 'red' : r.strength === 'medium' ? 'amber' : 'slate';
//                     const dotSize = r.strength === 'high' ? 14 : r.strength === 'medium' ? 11 : 8;
//                     const dotColor = r.strength === 'high' ? 'var(--red)' : r.strength === 'medium' ? 'var(--amber)' : 'var(--text-3)';
//                     return `
//                       <div class="relative pb-${idx < a.cross_ref.length - 1 ? 4 : 0} pl-4">
//                         <div class="absolute left-0 top-1 -translate-x-[14px] rounded-full" style="width:${dotSize}px;height:${dotSize}px;background:${dotColor};box-shadow: 0 0 0 4px var(--bg-2);"></div>
//                         <div class="flex items-start gap-3">
//                           <div class="flex-1">
//                             <div class="text-[12.5px] font-medium text-1">${r.signal}</div>
//                             <div class="text-[11px] text-3 mt-0.5 leading-relaxed">${r.value}</div>
//                           </div>
//                           <span class="text-[10px] uppercase tracking-wider font-medium" style="color: ${r.strength === 'high' ? 'var(--red)' : r.strength === 'medium' ? 'var(--amber)' : 'var(--text-3)'};">${r.strength}</span>
//                         </div>
//                       </div>
//                     `;
//                   }).join('')}
//                 </div>
//               </div>
//
//               <div class="p-5 rounded-md mb-6" style="background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);">
//                 <div class="flex items-center gap-2 mb-3">
//                   <i data-lucide="sparkles" class="size-3.5 text-acc"></i>
//                   <span class="text-[12px] font-semibold text-1">Recommendation</span>
//                   <span class="tag tag-acc ml-auto">Gemini Flash</span>
//                 </div>
//                 <ol class="space-y-2.5 text-[12.5px] text-1 leading-relaxed">
//                   ${a.recommendation.map((r, idx) => `<li class="flex items-start gap-3"><span class="text-acc-bright num shrink-0 font-medium">${idx + 1}.</span><span>${r}</span></li>`).join('')}
//                 </ol>
//               </div>
//
//               <div class="flex gap-2 pt-4" style="border-top: 1px solid var(--line-1);">
//                 ${UI.btn('Trigger runbook', { variant: 'primary', icon: 'play', size: 'sm' })}
//                 ${UI.btn('Assign to Khizer', { variant: 'secondary', icon: 'user', size: 'sm' })}
//                 ${UI.btn('Dismiss', { variant: 'ghost', size: 'sm' })}
//               </div>
//             </div>
//           `;
//         }).join('')}
//       </div>
//     </div>
//   `;
// };
//
// PAGES.predictive = () => {
//   return `
//     <div class="flex items-start justify-between mb-7">
//       <div>
//         <div class="eyebrow mb-2.5">Insights</div>
//         <h1 class="h1">Predictive</h1>
//         <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">What is about to happen, not just what already did. Churn risk, rank-at-risk, land-grab opportunities.</p>
//       </div>
//       ${UI.btn('Calibrate models', { variant: 'secondary', icon: 'sliders', size: 'sm' })}
//     </div>
//
//     <div class="grid grid-cols-3 gap-5">
//       <div class="surface p-6">
//         <div class="h3 mb-1">Churn risk</div>
//         <div class="text-[11px] text-3 mb-5">Composite 0-100 . updated daily</div>
//         ${window.PREDICTIONS.churn.map(c => {
//           const cl = getClient(c.client);
//           const dot = c.level === 'critical' ? 'red' : c.level === 'at_risk' ? 'amber' : 'green';
//           return `
//             <div class="p-3 mb-1.5 rounded-md cursor-pointer hover:bg-3 transition-colors" onclick="document.getElementById('churn-${c.client}').classList.toggle('hidden')">
//               <div class="flex items-center gap-3">
//                 <span class="status status-${dot}"></span>
//                 <div class="flex-1 min-w-0">
//                   <div class="text-[12.5px] font-medium text-1 truncate">${cl?.name}</div>
//                   <div class="text-[10.5px] text-3">Renewal in ${c.renewal_in_days}d</div>
//                 </div>
//                 <div class="text-[20px] font-semibold num leading-none ${c.level === 'critical' ? 'text-red' : c.level === 'at_risk' ? 'text-amber' : 'text-acc-bright'}">${c.score}</div>
//               </div>
//               <div id="churn-${c.client}" class="${c.client === 'acme' ? '' : 'hidden'} mt-3 pt-3" style="border-top: 1px solid var(--line-1);">
//                 ${c.factors.map(f => `
//                   <div class="flex items-center gap-2 text-[11px] py-1">
//                     <span class="num ${f.impact > 0 ? 'text-red' : 'text-3'} w-8 text-right">${f.impact > 0 ? '+' + f.impact : '0'}</span>
//                     <span class="text-2 flex-1">${f.label}</span>
//                   </div>
//                 `).join('')}
//               </div>
//             </div>
//           `;
//         }).join('')}
//       </div>
//
//       <div class="surface p-6">
//         <div class="h3 mb-1">Rank-at-risk</div>
//         <div class="text-[11px] text-3 mb-5">14-day predictions</div>
//         ${window.PREDICTIONS.rank_at_risk.map(r => {
//           const f = getFacility(r.facility);
//           return `
//             <div class="p-3.5 mb-2 rounded-md" style="background: var(--bg-3);">
//               <div class="text-[12.5px] font-medium text-1 mb-1">${f?.name}</div>
//               <div class="text-[11px] text-acc mono mb-3">"${r.kw}"</div>
//               <div class="flex items-center gap-2.5 text-[13px] num">
//                 <span class="text-acc-bright font-semibold">${r.current}</span>
//                 <i data-lucide="arrow-right" class="size-3 text-3"></i>
//                 <span class="text-red font-semibold">${r.predicted_in_14d}</span>
//                 <span class="text-3 ml-auto text-[10.5px]">${(r.confidence * 100).toFixed(0)}%</span>
//               </div>
//               <button class="btn btn-secondary btn-sm w-full mt-3">Defensive action</button>
//             </div>
//           `;
//         }).join('')}
//       </div>
//
//       <div class="surface p-6">
//         <div class="h3 mb-1">Land-grab</div>
//         <div class="text-[11px] text-3 mb-5">Keywords competitors rank for, you do not</div>
//         ${window.PREDICTIONS.land_grab.map(l => {
//           const oppColor = l.opp === 'high' ? 'green' : l.opp === 'med' ? 'amber' : 'slate';
//           return `
//             <div class="flex items-center gap-2 py-2.5 rounded-md hover:bg-3 transition-colors px-2 -mx-2">
//               <div class="flex-1 min-w-0">
//                 <div class="text-[12.5px] font-medium text-1 truncate">${l.kw}</div>
//                 <div class="text-[10.5px] text-3 num mt-0.5">Vol ${l.vol} . Diff ${l.diff}</div>
//               </div>
//               <span class="status status-${oppColor}">${l.opp}</span>
//               <button class="btn-icon-sm"><i data-lucide="plus" class="size-3"></i></button>
//             </div>
//           `;
//         }).join('')}
//         <div class="mt-5 p-4 rounded-md" style="background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);">
//           <div class="flex items-center gap-2 mb-2">
//             <i data-lucide="sparkles" class="size-3.5 text-acc"></i>
//             <span class="text-[11.5px] font-medium text-1">Insight</span>
//           </div>
//           <p class="text-[11.5px] text-2 leading-relaxed">Top 4 are storage-modifier keywords with low difficulty. Create 4 dedicated pages for ~+18% organic traffic in 30 days.</p>
//           <button class="btn btn-primary btn-sm mt-3 w-full">Queue 4 briefs</button>
//         </div>
//       </div>
//     </div>
//   `;
// };
//
// PAGES.roi = () => {
//   const d = window.ROI_DATA.acme;
//   return `
//     <div class="flex items-start justify-between mb-7">
//       <div>
//         <div class="eyebrow mb-2.5">Insights</div>
//         <h1 class="h1">Attribution & ROI</h1>
//         <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Close the loop from SEO work to rental revenue. Master client: Acme Storage, 90-day rolling.</p>
//       </div>
//       <div class="flex items-center gap-1.5">
//         ${UI.btn('Switch client', { variant: 'secondary', icon: 'building-2', size: 'sm' })}
//         ${UI.btn('Export', { variant: 'secondary', icon: 'download', size: 'sm' })}
//       </div>
//     </div>
//
//     <div class="surface glow-stat mb-6 p-7">
//       <div class="flex items-end justify-between mb-7">
//         <div>
//           <div class="eyebrow mb-3">Total return on investment</div>
//           <div class="flex items-baseline gap-3">
//             <span class="display num text-acc-bright">${d.ltv_cac}:1</span>
//             <span class="text-2 text-[13px]">LTV / CAC ratio</span>
//           </div>
//           <div class="text-[12px] text-3 mt-3">$${d.lifetime_rev.toLocaleString()} lifetime revenue from $${d.total_cost.toLocaleString()} invested</div>
//         </div>
//         <div class="text-right">
//           <div class="eyebrow mb-2">Rentals attributed</div>
//           <div class="text-[40px] font-semibold num text-1 leading-none">${d.rentals_attributed}</div>
//           <div class="text-[11px] text-acc-bright num mt-2">+8 from May 1</div>
//         </div>
//       </div>
//       <div class="grid grid-cols-4 gap-x-8 pt-6" style="border-top: 1px solid var(--line-1);">
//         ${[
//           { label: 'Retainer (3 mo)',  value: '$' + d.investment.toLocaleString() },
//           { label: 'Tools passthrough', value: '$' + d.tools.toLocaleString() },
//           { label: 'Labor cost',        value: '$' + d.labor_cost.toLocaleString() },
//           { label: 'Avg rental LTV',    value: '$' + d.avg_ltv.toLocaleString() },
//         ].map(k => `
//           <div>
//             <div class="eyebrow mb-1.5">${k.label}</div>
//             <div class="text-[18px] font-semibold num text-1 leading-none">${k.value}</div>
//           </div>
//         `).join('')}
//       </div>
//     </div>
//
//     <div class="grid grid-cols-12 gap-5">
//       <div class="col-span-8 space-y-5">
//         <div class="surface p-6">
//           <div class="h3 mb-1">Customer journey funnel</div>
//           <div class="text-[11px] text-3 mb-6">Last 90 days . GBP impression to signed rental</div>
//           <div class="space-y-3">
//             ${d.funnel.map((s) => {
//               const w = Math.max(20, (s.count / d.funnel[0].count) * 100);
//               return `
//                 <div class="flex items-center gap-4">
//                   <span class="text-[12px] w-24 text-2">${s.stage}</span>
//                   <div class="flex-1 flex items-center gap-3">
//                     <div class="funnel-bar num" style="width:${w}%; background: linear-gradient(90deg, #10b981, #059669);">${s.count.toLocaleString()}</div>
//                     <span class="text-[11px] num text-3 shrink-0">${s.pct}%</span>
//                   </div>
//                 </div>
//               `;
//             }).join('')}
//           </div>
//         </div>
//
//         <div class="surface p-6">
//           <div class="h3 mb-1">Revenue by channel</div>
//           <div class="text-[11px] text-3 mb-6">Last 90 days</div>
//           <div class="grid grid-cols-2 gap-8 items-center">
//             <div class="flex items-center justify-center">
//               ${UI.donut({ segments: d.channels.map((c, i) => ({ value: c.rentals * c.ltv, color: ['#10b981','#34d399','#a78bfa','#38bdf8','#565659'][i] })), size: 180, thickness: 22 })}
//             </div>
//             <div>
//               ${UI.legend(d.channels.map((c, i) => ({ label: c.channel, value: '$' + (c.rentals * c.ltv).toLocaleString(), color: ['#10b981','#34d399','#a78bfa','#38bdf8','#565659'][i] })))}
//             </div>
//           </div>
//         </div>
//       </div>
//
//       <div class="col-span-4 space-y-5">
//         <div class="surface p-5">
//           <div class="h3 mb-4">Per-facility</div>
//           ${d.by_facility.map((b, i, arr) => {
//             const f = getFacility(b.facility);
//             return `
//               <div class="flex items-center gap-2 py-2.5 text-[12px] ${i < arr.length - 1 ? 'border-b' : ''}" style="border-color: var(--line-1);">
//                 <span class="flex-1 truncate">${f?.name || b.facility}</span>
//                 <span class="text-3 mono num text-[11px]">${b.rentals}r</span>
//                 <span class="font-semibold text-acc-bright num">$${(b.rev / 1000).toFixed(1)}k</span>
//               </div>
//             `;
//           }).join('')}
//         </div>
//       </div>
//     </div>
//   `;
// };
//
// PAGES.sla = () => {
//   return `
//     <div class="flex items-start justify-between mb-7">
//       <div>
//         <div class="eyebrow mb-2.5">Insights</div>
//         <h1 class="h1">SLA tracker</h1>
//         <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Real-time visibility into contract obligations. Auto-alerts before breach.</p>
//       </div>
//       ${UI.btn('Template library', { variant: 'secondary', icon: 'file', size: 'sm' })}
//     </div>
//
//     ${window.OBLIGATIONS.map(c => {
//       const cl = getClient(c.client);
//       return `
//         <div class="surface p-7 mb-5">
//           <div class="flex items-center justify-between mb-5">
//             <div>
//               <h2 class="h2">${cl?.name}</h2>
//               <div class="text-[11.5px] text-3 mt-1">Tier: retainer . Active since ${cl?.started_at}</div>
//             </div>
//             ${UI.btn('Edit obligations', { variant: 'secondary', size: 'sm' })}
//           </div>
//
//           <div class="surface overflow-hidden">
//             <table class="table">
//               <thead><tr><th>Obligation</th><th>Cadence</th><th>Progress</th><th>Status</th></tr></thead>
//               <tbody>
//                 ${c.items.map(i => {
//                   const pct = (i.progress / i.target) * 100;
//                   const dot = i.status === 'done' ? 'green' : i.status === 'on' ? 'green' : i.status === 'risk' ? 'amber' : 'red';
//                   const label = i.status === 'done' ? 'Done' : i.status === 'on' ? 'On track' : i.status === 'risk' ? 'At risk' : 'Breach';
//                   return `
//                     <tr>
//                       <td><span class="font-medium">${i.name}</span>${i.avg ? `<span class="text-3 ml-2 text-[11px]">(${i.avg})</span>` : ''}</td>
//                       <td class="text-2 text-[12px]">${i.cadence}</td>
//                       <td><div class="flex items-center gap-2"><div class="w-28">${UI.progressBar(i.progress, i.target, pct >= 100 ? 'var(--acc)' : pct >= 80 ? 'var(--acc)' : pct >= 60 ? 'var(--amber)' : 'var(--red)', 3)}</div><span class="text-[11px] num text-2">${i.progress}/${i.target}</span></div></td>
//                       <td><span class="status status-${dot}">${label}</span></td>
//                     </tr>
//                   `;
//                 }).join('')}
//               </tbody>
//             </table>
//           </div>
//
//           <div class="mt-4 p-4 rounded-md flex items-start gap-3" style="background: var(--amber-soft); box-shadow: inset 0 0 0 1px rgba(245,158,11,0.25);">
//             <i data-lucide="alert-triangle" class="size-3.5 text-amber mt-0.5 shrink-0"></i>
//             <div class="flex-1">
//               <div class="text-[12px] font-semibold text-1 mb-1">Citation building 6 short of monthly target</div>
//               <div class="text-[11.5px] text-2 leading-relaxed">16 days remaining. Need 0.4/day to catch up. Suggested: shift 2 of Aimen hours to Khizer for manual submission.</div>
//             </div>
//             ${UI.btn('Reassign', { variant: 'secondary', size: 'sm' })}
//           </div>
//         </div>
//       `;
//     }).join('')}
//   `;
// };
//
// PAGES.playground = () => {
//   return `
//     <div class="flex items-start justify-between mb-7">
//       <div>
//         <div class="eyebrow mb-2.5">Insights</div>
//         <h1 class="h1">AI Playground</h1>
//         <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Ask anything about your portfolio. Cross-references every spine.</p>
//       </div>
//       ${UI.btn('Examples', { variant: 'secondary', icon: 'lightbulb', size: 'sm' })}
//     </div>
//
//     <div class="grid grid-cols-4 gap-5">
//       <div class="col-span-3">
//         <div class="surface flex flex-col" style="min-height: 70vh;">
//
//           <div class="px-5 py-3.5 flex items-center justify-between" style="border-bottom: 1px solid var(--line-1);">
//             <div class="flex items-center gap-2.5">
//               <div class="size-6 rounded-md flex items-center justify-center" style="background: var(--acc);">
//                 <i data-lucide="sparkles" class="size-3" style="color: #001a10;"></i>
//               </div>
//               <span class="h3">Conversation</span>
//             </div>
//             <div class="flex items-center gap-2">
//               <span class="tag tag-acc">Claude Sonnet 4.6</span>
//               <button class="btn-icon-sm"><i data-lucide="more-horizontal" class="size-3.5"></i></button>
//             </div>
//           </div>
//
//           <div class="flex-1 px-7 py-6 overflow-y-auto space-y-7">
//
//             <div class="flex items-start gap-3 max-w-3xl">
//               ${UI.avatar('Mark', '#10b981', 28)}
//               <div class="flex-1">
//                 <div class="flex items-center gap-2 mb-2">
//                   <span class="text-[11.5px] font-medium text-1">Mark</span>
//                   <span class="text-[10.5px] text-3 mono">12:48 PKT</span>
//                 </div>
//                 <div class="text-[13px] text-1 leading-relaxed">Why did Brick & Stone Athens lose rank for "athens storage" between May 10 and May 14?</div>
//               </div>
//             </div>
//
//             <div class="flex items-start gap-3 max-w-4xl">
//               <div class="size-7 rounded-md flex items-center justify-center shrink-0" style="background: var(--acc);">
//                 <i data-lucide="sparkles" class="size-3.5" style="color: #001a10;"></i>
//               </div>
//               <div class="flex-1">
//                 <div class="flex items-center gap-2 mb-2">
//                   <span class="text-[11.5px] font-medium text-1">Claude</span>
//                   <span class="text-[10.5px] text-3 mono">12:49 PKT</span>
//                   <span class="text-[10.5px] text-3">. analyzed 12 sources in 11.4s</span>
//                 </div>
//                 <div class="text-[13px] text-1 leading-relaxed mb-5">Cross-referencing 12 sources, here is what I found:</div>
//
//                 <div class="space-y-2 mb-5">
//                   <div class="flex items-start gap-3 text-[12.5px]">
//                     <span class="status status-red mt-1.5"></span>
//                     <div>Rank dropped from 2.3 to 5.7 between May 10-14 <span class="text-red mono">(-3.4 positions)</span></div>
//                   </div>
//                   <div class="flex items-start gap-3 text-[12.5px]">
//                     <span class="status status-slate mt-1.5"></span>
//                     <div class="text-2">No Google algorithm update detected in window <span class="text-3">(low correlation)</span></div>
//                   </div>
//                   <div class="flex items-start gap-3 text-[12.5px]">
//                     <span class="status status-amber mt-1.5"></span>
//                     <div>GBP edits: business hours changed May 9 <span class="text-3">(timing-correlated, historically low risk)</span></div>
//                   </div>
//                   <div class="flex items-start gap-3 text-[12.5px]">
//                     <span class="status status-amber mt-1.5"></span>
//                     <div>Citation drop of 8 detected May 12 <span class="text-amber">(medium correlation)</span></div>
//                   </div>
//                   <div class="flex items-start gap-3 text-[12.5px]">
//                     <span class="status status-red mt-1.5"></span>
//                     <div>Competitor "Star Storage Athens" gained 14 new citations May 11-12 <span class="text-red font-medium">(high correlation)</span></div>
//                   </div>
//                   <div class="flex items-start gap-3 text-[12.5px]">
//                     <span class="status status-red mt-1.5"></span>
//                     <div>Star review velocity doubled in May <span class="text-red">(8 to 17 in 14 days)</span></div>
//                   </div>
//                 </div>
//
//                 <div class="p-5 rounded-md mb-5" style="background: var(--bg-3); box-shadow: inset 0 0 0 1px var(--acc-line);">
//                   <div class="flex items-center gap-2 mb-2.5">
//                     <i data-lucide="target" class="size-3.5 text-acc"></i>
//                     <span class="text-[11.5px] font-semibold text-1">Most likely cause</span>
//                     <span class="text-[10.5px] mono text-acc-bright ml-auto">0.78 confidence</span>
//                   </div>
//                   <div class="text-[13px] text-1 leading-relaxed">Star Storage Athens ran a coordinated citation and review campaign that displaced you. The hours change is coincidental.</div>
//                 </div>
//
//                 <div class="eyebrow mb-3">Recommended response</div>
//                 <ol class="space-y-2.5 text-[12.5px] text-1 mb-5">
//                   <li class="flex items-start gap-3"><span class="text-acc-bright num shrink-0 font-medium">1.</span><span>Match their citation velocity (12 new in 30d, queued via Whitespark)</span></li>
//                   <li class="flex items-start gap-3"><span class="text-acc-bright num shrink-0 font-medium">2.</span><span>Push review request automation harder (target +6 per week for 4 weeks)</span></li>
//                   <li class="flex items-start gap-3"><span class="text-acc-bright num shrink-0 font-medium">3.</span><span>Audit service list for differentiation opportunities</span></li>
//                 </ol>
//
//                 <div class="flex items-center gap-2 pt-4" style="border-top: 1px solid var(--line-1);">
//                   ${UI.btn('Trigger runbook', { variant: 'primary', icon: 'play', size: 'sm' })}
//                   ${UI.btn('Save to learnings', { variant: 'secondary', size: 'sm' })}
//                   <div class="ml-auto flex gap-1">
//                     <button class="btn-icon-sm"><i data-lucide="thumbs-up" class="size-3.5"></i></button>
//                     <button class="btn-icon-sm"><i data-lucide="thumbs-down" class="size-3.5"></i></button>
//                     <button class="btn-icon-sm"><i data-lucide="copy" class="size-3.5"></i></button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//
//           <div class="px-5 py-4" style="border-top: 1px solid var(--line-1);">
//             <div class="relative">
//               <textarea class="input" placeholder="Ask anything about your portfolio..." rows="2" style="padding-right: 70px;"></textarea>
//               <div class="absolute right-2 bottom-2 flex items-center gap-1">
//                 <button class="btn-icon-sm"><i data-lucide="paperclip" class="size-3.5"></i></button>
//                 <button class="btn btn-primary btn-sm"><i data-lucide="send" class="size-3"></i></button>
//               </div>
//             </div>
//             <div class="flex items-center justify-between mt-2 text-[10.5px] text-3">
//               <span class="flex items-center gap-1"><i data-lucide="zap" class="size-2.5"></i>Claude Sonnet 4.6</span>
//               <span class="num">$0.04 per query . $0.31 today</span>
//             </div>
//           </div>
//         </div>
//       </div>
//
//       <div class="space-y-5">
//         <div class="surface p-5">
//           <div class="h3 mb-4">Recent</div>
//           <div class="space-y-1">
//             ${window.AI_PLAYGROUND_HISTORY.map(h => `
//               <div class="p-2.5 rounded-md hover:bg-3 cursor-pointer transition-colors">
//                 <div class="text-[12px] text-1 line-clamp-2 leading-snug mb-1">${h.q}</div>
//                 <div class="text-[10px] text-3 mono">${h.ts}</div>
//               </div>
//             `).join('')}
//           </div>
//         </div>
//
//         <div class="surface p-5">
//           <div class="h3 mb-4">Try asking</div>
//           <div class="space-y-1">
//             ${[
//               'Which 3 facilities are at highest risk next 30 days?',
//               'Compare our climate content depth to competitors',
//               'Best-performing GBP post type by category?',
//               'Predict next quarter conversion rate',
//               'Why is Aimen overloaded this week?',
//             ].map(q => `
//               <button class="w-full text-left p-2.5 rounded-md text-[11.5px] text-2 hover:bg-3 hover:text-1 transition-colors leading-snug">${q}</button>
//             `).join('')}
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
// };
//
// PAGES.reports = () => {
//   return `
//     <div class="flex items-start justify-between mb-7">
//       <div>
//         <div class="eyebrow mb-2.5">Insights</div>
//         <h1 class="h1">Reports</h1>
//         <p class="text-[13px] text-2 mt-2 max-w-xl leading-relaxed">Auto-generated monthly and ad-hoc reports across all clients. Branded PDFs with YoY comparisons.</p>
//       </div>
//       <div class="flex items-center gap-1.5">
//         ${UI.btn('Templates', { variant: 'secondary', icon: 'file', size: 'sm' })}
//         ${UI.btn('Generate now', { variant: 'primary', icon: 'plus', size: 'sm' })}
//       </div>
//     </div>
//
//     <div class="grid grid-cols-3 gap-3 mb-6">
//       ${[
//         { title: 'Acme Storage', period: 'May 2026',     date: 'Scheduled May 31', status: 'scheduled', kpis: { rank: -2.1, reviews: 187, posts: 60 } },
//         { title: 'Sunset RV',    period: 'May 2026',     date: 'Scheduled May 31', status: 'scheduled', kpis: { rank: -0.6, reviews: 32, posts: 16 } },
//         { title: 'Royal Mini',   period: 'May 2026',     date: 'Scheduled May 31', status: 'scheduled', kpis: { rank: -1.2, reviews: 11, posts: 12 } },
//         { title: 'Acme Storage', period: 'April 2026',   date: 'Delivered Apr 30', status: 'sent',      kpis: { rank: -2.4, reviews: 142, posts: 52 } },
//         { title: 'Sunset RV',    period: 'April 2026',   date: 'Delivered Apr 30', status: 'sent',      kpis: { rank: -0.4, reviews: 28, posts: 14 } },
//         { title: 'Acme QBR',     period: 'Q1 2026',      date: 'Delivered Mar 30', status: 'sent',      kpis: { rank: -3.8, reviews: 421, posts: 168 } },
//       ].map(r => `
//         <div class="surface surface-hover p-5 cursor-pointer">
//           <div class="flex items-start justify-between mb-4">
//             <div>
//               <div class="text-[12.5px] font-medium text-1">${r.title}</div>
//               <div class="text-[10.5px] text-3 mt-0.5">${r.period} . ${r.date}</div>
//             </div>
//             <span class="status status-${r.status === 'sent' ? 'green' : 'amber'}">${r.status === 'sent' ? 'Sent' : 'Scheduled'}</span>
//           </div>
//           <div class="grid grid-cols-3 gap-3 pt-3" style="border-top: 1px solid var(--line-1);">
//             <div><div class="eyebrow text-[9.5px] mb-1">Rank</div><div class="text-[16px] font-semibold num text-acc-bright">${r.kpis.rank}</div></div>
//             <div><div class="eyebrow text-[9.5px] mb-1">Reviews</div><div class="text-[16px] font-semibold num">${r.kpis.reviews}</div></div>
//             <div><div class="eyebrow text-[9.5px] mb-1">Posts</div><div class="text-[16px] font-semibold num">${r.kpis.posts}</div></div>
//           </div>
//           <div class="flex gap-1.5 mt-4">
//             <button class="btn btn-secondary btn-sm flex-1"><i data-lucide="eye" class="size-3"></i> Preview</button>
//             <button class="btn-icon-sm"><i data-lucide="download" class="size-3.5"></i></button>
//           </div>
//         </div>
//       `).join('')}
//     </div>
//
//     <div class="surface p-7">
//       <div class="flex items-center justify-between mb-6">
//         <div>
//           <h2 class="h2">QBR . Acme Q2 2026</h2>
//           <div class="text-[11.5px] text-3 mt-1">Auto-assembled . Meeting scheduled May 28</div>
//         </div>
//         <div class="flex items-center gap-1.5">
//           ${UI.btn('Send to client', { variant: 'primary', icon: 'send', size: 'sm' })}
//           ${UI.btn('Record meeting', { variant: 'secondary', size: 'sm' })}
//         </div>
//       </div>
//
//       <div class="grid grid-cols-5 gap-2 mb-6">
//         ${[
//           { l: 'Avg rank delta', v: '-2.3', color: 'text-acc-bright' },
//           { l: 'Reviews',        v: '187' },
//           { l: 'Citations',      v: '412' },
//           { l: 'Content',        v: '89' },
//           { l: 'Backlinks',      v: '22' },
//         ].map(s => `
//           <div class="p-4 rounded-md" style="background: var(--bg-3);">
//             <div class="eyebrow text-[9.5px] mb-2">${s.l}</div>
//             <div class="text-[22px] font-semibold num ${s.color || 'text-1'} leading-none">${s.v}</div>
//           </div>
//         `).join('')}
//       </div>
//
//       <div class="grid grid-cols-2 gap-6">
//         <div>
//           <div class="eyebrow mb-4">Talking points</div>
//           ${window.QBR.talking_points.map((t, i) => `
//             <div class="flex items-start gap-3 p-3.5 mb-1.5 rounded-md hover:bg-3 transition-colors">
//               <span class="size-5 rounded-full text-[10.5px] font-medium flex items-center justify-center num shrink-0" style="background: var(--acc-soft); color: var(--acc-bright);">${i + 1}</span>
//               <div class="text-[12.5px] flex-1 leading-relaxed">${t}</div>
//             </div>
//           `).join('')}
//         </div>
//         <div>
//           <div class="eyebrow mb-4">Q1 action items</div>
//           ${window.QBR.q1_actions.map(a => `
//             <div class="flex items-center gap-3 p-3.5 mb-1.5 rounded-md hover:bg-3 transition-colors">
//               ${a.status === 'done' ? '<i data-lucide="check-circle-2" class="size-4 text-acc-bright shrink-0"></i>' : '<i data-lucide="loader" class="size-4 text-amber shrink-0"></i>'}
//               <div class="text-[12.5px] flex-1">${a.item}</div>
//               ${a.date ? `<span class="text-[10.5px] text-3 mono">${a.date}</span>` : ''}
//             </div>
//           `).join('')}
//         </div>
//       </div>
//     </div>
//   `;
// };
//
// /* ====================================================================
//    COMPETITORS - 4 tabs (List / Matrix / Movement / Actions)
//    ==================================================================== */
//
// const COMPETITOR_METRICS = [
//   { key: 'avg_rank',                  label: 'Avg rank',  lowerIsBetter: true,  fmt: v => v.toFixed(1) },
//   { key: 'review_count',              label: 'Reviews',   lowerIsBetter: false, fmt: v => Math.round(v).toLocaleString() },
//   { key: 'review_velocity_7d',        label: 'Rev/wk',    lowerIsBetter: false, fmt: v => v.toFixed(1) },
//   { key: 'citation_count',            label: 'Citations', lowerIsBetter: false, fmt: v => Math.round(v).toLocaleString() },
//   { key: 'post_velocity_7d',          label: 'Posts/wk',  lowerIsBetter: false, fmt: v => v.toFixed(0) },
//   { key: 'schema_completeness_pct',   label: 'Schema %',  lowerIsBetter: false, fmt: v => Math.round(v) + '%' },
//   { key: 'page_count',                label: 'Pages',     lowerIsBetter: false, fmt: v => Math.round(v).toLocaleString() },
//   { key: 'backlink_count',            label: 'Backlinks', lowerIsBetter: false, fmt: v => Math.round(v).toLocaleString() },
//   { key: 'dr',                        label: 'DR',        lowerIsBetter: false, fmt: v => Math.round(v) },
//   { key: 'gbp_completeness_pct',      label: 'GBP %',     lowerIsBetter: false, fmt: v => Math.round(v) + '%' },
// ];
//
// function matrixCellTone(usVal, compVal, lowerIsBetter) {
//   if (usVal === compVal) return 'parity';
//   const tol = Math.abs(usVal) * 0.02;
//   if (Math.abs(usVal - compVal) <= tol) return 'parity';
//   if (lowerIsBetter) return usVal < compVal ? 'win' : 'loss';
//   return usVal > compVal ? 'win' : 'loss';
// }
//
// function buildCompetitorMatrixMetrics(c, seedIdx) {
//   const seed = (c.threat || 50) + seedIdx * 7;
//   return {
//     avg_rank:                c.avg_rank                ?? (4 + ((seed % 6) * 0.7)),
//     review_count:            c.review_count            ?? (50 + (seed % 250)),
//     review_velocity_7d:      c.review_velocity_7d      ?? 3.5,
//     citation_count:          c.citation_count          ?? (60 + (seed % 90)),
//     post_velocity_7d:        c.post_velocity_7d        ?? 2,
//     schema_completeness_pct: c.schema_completeness_pct ?? (55 + ((seed * 5) % 40)),
//     page_count:              c.page_count              ?? (18 + (seed % 40)),
//     backlink_count:          c.backlink_count          ?? (180 + (seed * 11) % 900),
//     dr:                      c.dr                      ?? (28 + (seed % 30)),
//     gbp_completeness_pct:    c.gbp_completeness_pct    ?? (70 + ((seed * 3) % 25)),
//   };
// }
//
// function aggregateCompetitorActions(competitors) {
//   const out = [];
//   competitors.forEach(c => {
//     (c.we_should_copy || []).forEach((t, i) => {
//       out.push({
//         id: `${c.id}-copy-${i}`,
//         competitorId: c.id, competitorName: c.name,
//         kind: 'copy', description: t.tactic, cost: t.cost || 0, eta: t.eta || '?', confidence: t.confidence || 0,
//       });
//     });
//     (c.we_should_differentiate || []).forEach((t, i) => {
//       out.push({
//         id: `${c.id}-defend-${i}`,
//         competitorId: c.id, competitorName: c.name,
//         kind: 'defend', description: t.tactic, cost: t.cost || 0, eta: t.eta || '?', confidence: t.confidence || 0,
//       });
//     });
//     (c.actions || []).forEach(a => {
//       out.push({
//         id: a.id, competitorId: c.id, competitorName: c.name,
//         kind: a.kind === 'differentiate' ? 'defend' : a.kind,
//         description: a.description, cost: a.cost_usd || 0, eta: a.eta_days ? a.eta_days + 'd' : '?',
//         confidence: a.confidence || 0,
//       });
//     });
//   });
//   return out;
// }
//
// function aggregateCompetitorMovement(competitors) {
//   const out = [];
//   competitors.forEach(c => {
//     (c.recent_moves || []).forEach((m, i) => {
//       out.push({
//         id: `${c.id}-mv-${i}`,
//         competitorName: c.name, date: m.date, signal: m.move, source: m.source, detail: m.detail || '', severity: m.severity || 'low',
//       });
//     });
//     (c.intel || []).forEach((m, i) => {
//       out.push({
//         id: `${c.id}-intel-${i}`,
//         competitorName: c.name, date: m.date, signal: m.signal, source: m.source, detail: m.detail || '', severity: m.severity || 'low',
//       });
//     });
//   });
//   return out.sort((a, b) => (a.date < b.date ? 1 : -1));
// }
//
// function groupByWeek(items) {
//   const map = new Map();
//   items.forEach(i => {
//     const d = new Date(i.date);
//     if (isNaN(d.getTime())) return;
//     const day = d.getUTCDay();
//     const diff = (day + 6) % 7;
//     d.setUTCDate(d.getUTCDate() - diff);
//     const wk = d.toISOString().slice(0, 10);
//     if (!map.has(wk)) map.set(wk, []);
//     map.get(wk).push(i);
//   });
//   return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
// }
//
// PAGES.competitors = () => {
//   const D = window.DEEP_COMPETITORS && window.DEEP_COMPETITORS.acme;
//   const cl = typeof getClient === 'function' ? getClient('acme') : { name: 'Acme Storage' };
//   const competitors = D ? D.competitors : (window.COMPETITORS || []);
//   const us = (D && D.us_baseline) || window.US_BASELINE || {
//     name: 'Us', avg_rank: 4.7, review_count: 87, review_velocity_7d: 5.2,
//     citation_count: 84, post_velocity_7d: 4, schema_completeness_pct: 92,
//     page_count: 38, backlink_count: 412, dr: 41, gbp_completeness_pct: 96,
//   };
//
//   const matrixRows = competitors.map((c, idx) => ({
//     id: c.id, name: c.name, short: c.short || (c.name || '').slice(0, 3).toUpperCase(),
//     market: c.market,
//     threatLevel: c.threat_label || c.threat_level || 'baseline',
//     metrics: buildCompetitorMatrixMetrics(c, idx),
//   }));
//
//   const movement = aggregateCompetitorMovement(competitors);
//   const actions = aggregateCompetitorActions(competitors);
//   const movementByWeek = groupByWeek(movement);
//
//   const winning = competitors.filter(c => c.head_to_head === 'they_winning' || c.threat_label === 'critical');
//   const losing = competitors.filter(c => c.head_to_head === 'we_winning' && (c.rank_delta_vs_us || 0) > 0);
//   const baseline = competitors.filter(c => (c.threat_label || c.threat_level) === 'baseline');
//
//   return `
//     <div class="flex items-start justify-between mb-7">
//       <div>
//         <div class="eyebrow mb-2.5">Insights</div>
//         <h1 class="h1">Competitor intelligence</h1>
//         <p class="text-[13px] text-2 mt-2 max-w-2xl leading-relaxed">${competitors.length} tracked for ${cl?.name || 'this client'} . ${winning.length} winning vs us . ${losing.length} losing ground</p>
//       </div>
//       <div class="flex items-center gap-1.5">
//         ${UI.btn('Add competitor', { variant: 'primary', icon: 'plus', size: 'sm' })}
//       </div>
//     </div>
//
//     <div class="grid grid-cols-3 gap-5 mb-5">
//       <div class="surface p-5">
//         <div class="flex items-center gap-2 mb-2"><span class="status status-red"></span><div class="eyebrow">Winning vs us</div></div>
//         <div class="text-[22px] font-semibold num text-1 leading-none">${winning.length}</div>
//         <div class="text-[10.5px] text-3 mt-1.5">critical threats</div>
//       </div>
//       <div class="surface p-5">
//         <div class="flex items-center gap-2 mb-2"><span class="status status-green"></span><div class="eyebrow">Losing ground</div></div>
//         <div class="text-[22px] font-semibold num text-1 leading-none">${losing.length}</div>
//         <div class="text-[10.5px] text-3 mt-1.5">rank slipping</div>
//       </div>
//       <div class="surface p-5">
//         <div class="flex items-center gap-2 mb-2"><span class="status status-slate"></span><div class="eyebrow">Baseline</div></div>
//         <div class="text-[22px] font-semibold num text-1 leading-none">${baseline.length}</div>
//         <div class="text-[10.5px] text-3 mt-1.5">stable, monitor</div>
//       </div>
//     </div>
//
//     <div class="flex border-b mb-5">
//       <button onclick="UI.switchTab('cmp','list')"     data-tab="cmp-list"     class="tab active">List</button>
//       <button onclick="UI.switchTab('cmp','matrix')"   data-tab="cmp-matrix"   class="tab">Matrix</button>
//       <button onclick="UI.switchTab('cmp','movement')" data-tab="cmp-movement" class="tab">Movement</button>
//       <button onclick="UI.switchTab('cmp','actions')"  data-tab="cmp-actions"  class="tab">Actions<span class="tab-count">${actions.length}</span></button>
//     </div>
//
//     <div data-tab-pane="cmp-list">
//       <div class="grid grid-cols-12 gap-5">
//         <div class="col-span-4 space-y-2">
//           ${competitors.map(c => {
//             const lvl = c.threat_label || c.threat_level || 'baseline';
//             const dot = lvl === 'critical' ? 'red' : lvl === 'elevated' ? 'amber' : 'slate';
//             const score = c.threat || c.threat_score || 0;
//             return `
//               <div class="surface surface-hover p-4 cursor-pointer">
//                 <div class="flex items-center gap-2 mb-2">
//                   <span class="status status-${dot}">${lvl.toUpperCase()}</span>
//                   <span class="ml-auto text-[13px] font-semibold num text-1">${Math.round(score)}</span>
//                 </div>
//                 <div class="text-[13px] font-semibold text-1 leading-snug">${c.name}</div>
//                 <div class="text-[10.5px] text-3 mt-1">${c.market || '-'}</div>
//               </div>
//             `;
//           }).join('')}
//         </div>
//         <div class="col-span-8">
//           <div class="surface p-6">
//             <div class="text-[13px] text-2">Select a competitor to view full intel (parity with previous detail pane).</div>
//           </div>
//         </div>
//       </div>
//     </div>
//
//     <div data-tab-pane="cmp-matrix" class="hidden">
//       <div class="surface overflow-x-auto">
//         <table class="w-full text-[12px]" style="border-collapse: collapse;">
//           <thead>
//             <tr style="border-bottom: 1px solid var(--line-1);">
//               <th class="text-left px-4 py-3 eyebrow" style="position: sticky; left: 0; background: var(--bg-2); min-width: 180px;">Competitor</th>
//               <th class="text-center px-3 py-3 eyebrow">Threat</th>
//               ${COMPETITOR_METRICS.map(m => `<th class="text-right px-3 py-3 eyebrow">${m.label}</th>`).join('')}
//             </tr>
//           </thead>
//           <tbody>
//             <tr style="border-bottom: 1px solid var(--line-1); background: rgba(167,139,250,0.06);">
//               <td class="px-4 py-3 font-semibold text-1" style="position: sticky; left: 0; background: var(--bg-3);">${us.name}<span class="tag tag-acc ml-2">baseline</span></td>
//               <td class="px-3 py-3 text-center text-3 mono text-[10px]">-</td>
//               ${COMPETITOR_METRICS.map(m => `<td class="px-3 py-3 text-right num font-semibold">${m.fmt(us[m.key])}</td>`).join('')}
//             </tr>
//             ${matrixRows.map(r => {
//               const dot = r.threatLevel === 'critical' ? 'red' : r.threatLevel === 'elevated' ? 'amber' : 'slate';
//               return `
//                 <tr style="border-bottom: 1px solid var(--line-1);">
//                   <td class="px-4 py-3 font-medium text-1" style="position: sticky; left: 0; background: var(--bg-2); min-width: 180px;">
//                     <div class="flex items-center gap-2">
//                       <span class="status status-${dot}"></span>
//                       <span>${r.name}</span>
//                     </div>
//                   </td>
//                   <td class="px-3 py-3 text-center text-[10px] mono uppercase ${dot === 'red' ? 'text-red' : dot === 'amber' ? 'text-amber' : 'text-3'}">${r.threatLevel}</td>
//                   ${COMPETITOR_METRICS.map(m => {
//                     const v = r.metrics[m.key];
//                     const tone = matrixCellTone(us[m.key], v, m.lowerIsBetter);
//                     const color = tone === 'win' ? 'color: var(--acc-bright); background: rgba(16,185,129,0.08);' : tone === 'loss' ? 'color: var(--red); background: rgba(244,63,94,0.08);' : 'color: var(--text-3);';
//                     return `<td class="px-3 py-3 text-right num" style="${color}">${m.fmt(v)}</td>`;
//                   }).join('')}
//                 </tr>
//               `;
//             }).join('')}
//           </tbody>
//         </table>
//       </div>
//     </div>
//
//     <div data-tab-pane="cmp-movement" class="hidden">
//       ${movementByWeek.length === 0 ? `<div class="surface p-10 text-center text-2 text-[13px]">No competitor movement recorded yet.</div>` : ''}
//       <div class="space-y-5">
//         ${movementByWeek.map(([wk, items]) => `
//           <div class="surface p-6">
//             <div class="flex items-baseline justify-between mb-4 pb-3" style="border-bottom: 1px solid var(--line-1);">
//               <div class="text-[13px] font-semibold text-1">Week of ${wk}</div>
//               <span class="text-[10px] mono text-3">${items.length} signal${items.length === 1 ? '' : 's'}</span>
//             </div>
//             <div class="space-y-3">
//               ${items.map(i => {
//                 const dot = i.severity === 'high' ? 'red' : i.severity === 'medium' ? 'amber' : 'slate';
//                 return `
//                   <div class="flex items-start gap-3 py-2" style="border-bottom: 1px solid var(--line-1);">
//                     <span class="status status-${dot}" style="margin-top: 4px;"></span>
//                     <span class="text-[10px] mono text-3 shrink-0" style="margin-top: 2px;">${i.date}</span>
//                     <div class="flex-1 min-w-0">
//                       <div class="flex items-center gap-2 mb-0.5">
//                         <span class="tag" style="background: var(--bg-3); color: var(--text-2);">${i.competitorName}</span>
//                         <span class="text-[12.5px] font-medium text-1">${i.signal}</span>
//                       </div>
//                       ${i.detail ? `<div class="text-[11px] text-2 mt-1 leading-snug">${i.detail}</div>` : ''}
//                     </div>
//                     <span class="text-[10px] mono text-3 shrink-0">${i.source || '-'}</span>
//                   </div>
//                 `;
//               }).join('')}
//             </div>
//           </div>
//         `).join('')}
//       </div>
//     </div>
//
//     <div data-tab-pane="cmp-actions" class="hidden">
//       <div class="surface p-4 mb-4 flex flex-wrap items-center gap-3">
//         <div class="eyebrow">Kind</div>
//         <div class="flex gap-1">
//           <button class="btn btn-secondary btn-sm">All</button>
//           <button class="btn btn-ghost btn-sm">Copy</button>
//           <button class="btn btn-ghost btn-sm">Defend</button>
//         </div>
//         <div class="eyebrow ml-3">Max cost</div>
//         <div class="flex gap-1">
//           <button class="btn btn-ghost btn-sm">$100</button>
//           <button class="btn btn-ghost btn-sm">$500</button>
//           <button class="btn btn-ghost btn-sm">$2k</button>
//           <button class="btn btn-secondary btn-sm">Any</button>
//         </div>
//         <span class="text-[10px] mono text-3 ml-auto">${actions.length} actions</span>
//       </div>
//       <div class="surface overflow-hidden">
//         <table class="w-full text-[12.5px]" style="border-collapse: collapse;">
//           <thead>
//             <tr style="border-bottom: 1px solid var(--line-1);">
//               <th class="text-left px-4 py-3 eyebrow">Kind</th>
//               <th class="text-left px-4 py-3 eyebrow">Competitor</th>
//               <th class="text-left px-4 py-3 eyebrow">Action</th>
//               <th class="text-right px-4 py-3 eyebrow">Cost</th>
//               <th class="text-right px-4 py-3 eyebrow">ETA</th>
//               <th class="text-right px-4 py-3 eyebrow">Conf</th>
//               <th class="text-right px-4 py-3 eyebrow">Run</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${actions.map(a => {
//               const kindClass = a.kind === 'copy' ? 'text-acc-bright' : 'text-amber';
//               return `
//                 <tr style="border-bottom: 1px solid var(--line-1);">
//                   <td class="px-4 py-3"><span class="${kindClass} mono uppercase text-[10px]">${a.kind}</span></td>
//                   <td class="px-4 py-3 font-medium text-1">${a.competitorName}</td>
//                   <td class="px-4 py-3 text-2 leading-snug">${a.description}</td>
//                   <td class="px-4 py-3 text-right num">$${Math.round(a.cost)}</td>
//                   <td class="px-4 py-3 text-right num text-2">${a.eta}</td>
//                   <td class="px-4 py-3 text-right num text-2">${Math.round(a.confidence * 100)}%</td>
//                   <td class="px-4 py-3 text-right">${UI.btn('Run', { variant: 'primary', icon: 'play', size: 'sm', onClick: "toast('Action queued','success')" })}</td>
//                 </tr>
//               `;
//             }).join('')}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   `;
// };
//