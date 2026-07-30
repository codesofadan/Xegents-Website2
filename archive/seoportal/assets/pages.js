// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    PAGES - Home + Today (Mission Control aesthetic, v2)
//    ============================================================ */
//
// window.PAGES = window.PAGES || {};
// window.PAGES_AFTER = window.PAGES_AFTER || {};
//
// /* =====================================================================
//    HOME v2 - 10/10 agency principal dashboard
//    Sections: operational stripe, asymmetric hero (MRR + cash donut + 3 micro KPIs),
//    AI agent activity ribbon, decision queue, client portfolio matrix,
//    portfolio movers with per-keyword sparklines, algorithm pulse, recent wins,
//    AI spend by client, week ahead, system pulse footer.
//    ===================================================================== */
//
// function _pktNow() {
//   const parts = new Intl.DateTimeFormat('en-US', {
//     timeZone: 'Asia/Karachi', weekday: 'long', day: 'numeric', month: 'short', year: 'numeric',
//     hour: '2-digit', minute: '2-digit', hour12: false,
//   }).formatToParts(new Date());
//   const get = (t) => parts.find(p => p.type === t)?.value || '';
//   const hour = Number(get('hour'));
//   return {
//     weekday: get('weekday'),
//     dateLabel: `${get('weekday')}, ${get('day')} ${get('month')} ${get('year')}`,
//     clock: `${get('hour')}:${get('minute')} PKT`,
//     greet: hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening',
//   };
// }
//
// function _sparkSvg(data, color, w = 80, h = 24, fill = true) {
//   if (!data || !data.length) return '';
//   const min = Math.min(...data);
//   const max = Math.max(...data);
//   const span = max - min || 1;
//   const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / span) * (h - 2) - 1}`).join(' ');
//   const gid = `sg-${Math.random().toString(36).slice(2, 8)}`;
//   return `
//     <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:${w}px;height:${h}px;display:block;">
//       ${fill ? `
//         <defs>
//           <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stop-color="${color}" stop-opacity="0.28"/>
//             <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
//           </linearGradient>
//         </defs>
//         <polygon points="0,${h} ${pts} ${w},${h}" fill="url(#${gid})"/>
//       ` : ''}
//       <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.3"/>
//     </svg>
//   `;
// }
//
// function _donutSvg(pct, size = 140, stroke = 11, color = '#10b981') {
//   const r = (size - stroke) / 2;
//   const c = 2 * Math.PI * r;
//   const filled = Math.min(Math.max(pct, 0), 100);
//   const offset = c * (1 - filled / 100);
//   return `
//     <div class="relative" style="width:${size}px;height:${size}px;">
//       <svg width="${size}" height="${size}" style="transform: rotate(-90deg);">
//         <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${stroke}"/>
//         <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round" style="transition: stroke-dashoffset 600ms ease-out;"/>
//       </svg>
//       <div class="absolute inset-0 flex flex-col items-center justify-center">
//         <span class="text-[22px] font-semibold tabular-nums leading-none">${filled}%</span>
//         <span class="text-[10px] mt-1" style="color: var(--text-3);">of target</span>
//       </div>
//     </div>
//   `;
// }
//
// function _cashProjection() {
//   const k = window.PORTFOLIO_KPIS;
//   const now = new Date();
//   const dim = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
//   const dayOfMonth = now.getDate();
//   const collected = k.cash_collected_mtd_usd;
//   const target = k.cash_target_usd;
//   const pace = collected / dayOfMonth;
//   const projected = Math.round(pace * dim);
//   return {
//     collected, target, projected,
//     pct: Math.round((collected / target) * 100),
//     daysRemaining: dim - dayOfMonth,
//   };
// }
//
// const _DOT_TONES = {
//   green: '#10b981', amber: '#f59e0b', red: '#f43f5e', sky: '#38bdf8', violet: '#a78bfa', slate: '#565659',
// };
// function _statusDot(color, pulse) {
//   const fill = _DOT_TONES[color] || _DOT_TONES.slate;
//   const ringRgb = { green: '16,185,129', amber: '245,158,11', red: '244,63,94', sky: '56,189,248', violet: '167,139,250', slate: '255,255,255' }[color];
//   const ring = color === 'slate' ? 'transparent' : `rgba(${ringRgb},0.18)`;
//   return `<span class="inline-block size-[6px] rounded-full shrink-0 ${pulse ? 'live-dot' : ''}" style="background:${fill};box-shadow:0 0 0 3px ${ring}"></span>`;
// }
//
// const _KIND_META = {
//   gbp_post:     { label: 'GBP post',     icon: 'check-circle',   tone: 'sky' },
//   review_reply: { label: 'Review reply', icon: 'message-square', tone: 'amber' },
//   anomaly:      { label: 'Anomaly',      icon: 'siren',          tone: 'red' },
//   contract:     { label: 'Contract',     icon: 'file-signature', tone: 'violet' },
//   renewal:      { label: 'Renewal',      icon: 'calendar',       tone: 'amber' },
// };
//
// function _slaLabel(h) {
//   if (h == null) return '';
//   if (h < 1) return 'under 1h';
//   if (h < 24) return `${Math.round(h)}h`;
//   return `${Math.round(h / 24)}d`;
// }
// function _slaTone(h) {
//   if (h == null) return 'var(--text-3)';
//   if (h < 6) return 'var(--red)';
//   if (h < 24) return 'var(--amber)';
//   return 'var(--text-3)';
// }
//
// PAGES.home = () => {
//   const k = window.PORTFOLIO_KPIS;
//   const kv2 = window.PORTFOLIO_KPIS_V2 || k;
//   const queue = window.DECISION_QUEUE;
//   const previews = window.DECISION_QUEUE_PREVIEWS || {};
//   const movers = window.PORTFOLIO_MOVERS;
//   const traces = window.PORTFOLIO_MOVERS_TRACES || {};
//   const matrix = window.CLIENT_MATRIX || window.CLIENT_HEALTH_ROWS;
//   const aiSpend = window.AI_SPEND_BY_CLIENT;
//   const aiDeltas = window.AI_SPEND_DELTAS || {};
//   const weekAhead = window.WEEK_AHEAD;
//   const agentActivity = window.AGENT_ACTIVITY || [];
//   const agentConf = window.AGENT_CONFIDENCE || {};
//   const algPulse = window.ALGORITHM_PULSE || {};
//   const wins = window.RECENT_WINS || [];
//   const sysPulse = window.SYSTEM_PULSE || { apis: [], jobs: [] };
//   const narrative = window.AI_NARRATIVE || null;
//   const forecast = window.MRR_FORECAST || null;
//   const qTarget = window.QUARTERLY_TARGET || null;
//   const benchmarks = window.INDUSTRY_BENCHMARKS || {};
//   const geoFacs = window.GEO_FACILITIES || [];
//   const serp = window.SERP_FEATURES || [];
//
//   const t = _pktNow();
//   const today = queue.filter(q => q.urgency === 'today');
//   const thisWeek = queue.filter(q => q.urgency === 'this_week');
//   const anomalyCount = queue.filter(q => q.kind === 'anomaly').length;
//   const cash = _cashProjection();
//   const critical = today.find(q => (q.sla_hours ?? 99) < 6);
//
//   /* Operational stripe */
//   const stripe = critical ? `
//     <div class="px-10 py-2 flex items-center gap-3 text-[12px]" style="background: rgba(244,63,94,0.08); border-bottom: 1px solid rgba(244,63,94,0.18);">
//       ${_statusDot('red', true)}
//       <span class="font-medium" style="color: var(--red);">Critical</span>
//       <span style="color: var(--text-2);">${critical.client} - ${critical.title}</span>
//       <span class="ml-auto mono tabular-nums" style="color: var(--red);">${_slaLabel(critical.sla_hours)} left</span>
//       <button class="btn btn-ghost btn-sm">Resolve <i data-lucide="arrow-right" class="size-3"></i></button>
//     </div>
//   ` : `
//     <div class="px-10 py-1.5 flex items-center gap-3 text-[11px]" style="background: var(--bg-0); border-bottom: 1px solid var(--line-1); color: var(--text-3);">
//       ${_statusDot('green', true)}
//       <span style="color: var(--text-2);">All systems operational</span>
//       <span>last sync 8m ago</span>
//       <span class="ml-auto mono tabular-nums">${t.clock}</span>
//     </div>
//   `;
//
//   /* Hero: asymmetric */
//   const heroMrrSpark = (() => {
//     const past = (forecast && forecast.past_weeks) || k.mrr_sparkline;
//     const fwd = (forecast && forecast.forecast_weeks) || [];
//     const bandH = (forecast && forecast.forecast_band_high) || [];
//     const bandL = (forecast && forecast.forecast_band_low) || [];
//     const all = [...past, ...fwd, ...bandH];
//     const w = 540, h = 72;
//     const min = Math.min(...all), max = Math.max(...all), span = max - min || 1;
//     const totalLen = past.length + fwd.length - 1;
//     const pastEnd = past.length - 1;
//     const xy = (val, i) => [(i / totalLen) * w, h - ((val - min) / span) * (h - 4) - 2];
//     const pastPts = past.map((v, i) => xy(v, i).join(',')).join(' ');
//     const fwdPts = fwd.map((v, j) => xy(v, pastEnd + j).join(',')).join(' ');
//     const bandHi = bandH.map((v, j) => xy(v, pastEnd + j).join(',')).join(' ');
//     const bandLo = [...bandL].reverse().map((v, j) => xy(v, pastEnd + (bandL.length - 1 - j)).join(',')).join(' ');
//     const lastPast = xy(past[past.length - 1], pastEnd);
//     return `
//       <div class="mt-4" style="filter: drop-shadow(0 0 6px rgba(16,185,129,0.25));">
//         <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:${h}px;display:block;">
//           <defs>
//             <linearGradient id="hmrr" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stop-color="#10b981" stop-opacity="0.30"/>
//               <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
//             </linearGradient>
//           </defs>
//           <polygon points="0,${h} ${pastPts} ${(pastEnd / totalLen) * w},${h}" fill="url(#hmrr)"/>
//           <polyline points="${pastPts}" fill="none" stroke="#10b981" stroke-width="1.6"/>
//           ${bandH.length ? `<polygon points="${bandHi} ${bandLo}" fill="rgba(167,139,250,0.10)"/>` : ''}
//           ${fwd.length ? `<polyline points="${fwdPts}" fill="none" stroke="#a78bfa" stroke-width="1.4" stroke-dasharray="4 3"/>` : ''}
//           <circle cx="${lastPast[0]}" cy="${lastPast[1]}" r="3" fill="#10b981" stroke="var(--bg-1)" stroke-width="2"/>
//         </svg>
//       </div>
//       ${qTarget ? `
//         <div class="mt-5">
//           <div class="flex items-center justify-between mb-1.5 text-[10.5px]" style="color: var(--text-3);">
//             <span class="flex items-center gap-1.5"><i data-lucide="target" class="size-3"></i> ${qTarget.label}</span>
//             <span class="mono tabular-nums">$${qTarget.current_usd.toLocaleString()} / $${qTarget.target_usd.toLocaleString()} · ${qTarget.days_remaining}d left</span>
//           </div>
//           <div class="h-[5px] rounded-full overflow-hidden flex" style="background: var(--bg-3);">
//             <div style="width: ${qTarget.pct_achieved}%; background: var(--acc); height: 100%; transition: width 700ms ease;"></div>
//             <div style="width: ${Math.max(0, Math.min(100, qTarget.on_track_pct) - qTarget.pct_achieved)}%; background: rgba(167,139,250,0.5); height: 100%;"></div>
//           </div>
//           <div class="text-[10px] mt-1 tabular-nums" style="color: var(--text-3);">${qTarget.pct_achieved}% today · on track for ${qTarget.on_track_pct}% by quarter end</div>
//         </div>
//       ` : ''}
//     `;
//   })();
//
//   const microKpi = (label, value, delta, better, spark, sparkColor, sub, dot, inverse, benchmark) => `
//     <div>
//       <div class="flex items-center gap-1.5 mb-1">
//         ${dot ? _statusDot(dot) : ''}
//         <div class="text-[9.5px] uppercase font-medium" style="color: var(--text-3); letter-spacing: 0.09em;">${label}</div>
//       </div>
//       <div class="flex items-baseline gap-2">
//         <span class="text-[19px] font-semibold tabular-nums leading-none">${value}</span>
//         ${delta != null ? `<span class="text-[10.5px] tabular-nums" style="color: ${better ? 'var(--acc-bright)' : 'var(--red)'};">${(inverse ? delta < 0 : delta > 0) ? '↑' : '↓'} ${Math.abs(delta).toFixed(1)}</span>` : ''}
//       </div>
//       ${spark ? `<div class="mt-1.5">${_sparkSvg(spark, sparkColor, 120, 20)}</div>` : ''}
//       ${benchmark ? `<div class="text-[9.5px] mt-1 px-1.5 py-0.5 rounded inline-block font-medium" style="background: rgba(167,139,250,0.10); color: #a78bfa;">${benchmark.label}</div>` : ''}
//       ${sub ? `<div class="text-[10px] mt-1" style="color: var(--text-3);">${sub}</div>` : ''}
//     </div>
//   `;
//
//   const hero = `
//     <section class="px-10 pt-9 pb-10 hero-grad" style="border-bottom: 1px solid var(--line-1);">
//       <div class="max-w-[1320px] mx-auto">
//         <div class="flex items-baseline justify-between mb-6">
//           <div>
//             <div class="text-[10px] uppercase font-medium mb-2.5" style="color: var(--text-3); letter-spacing: 0.09em;">${t.dateLabel}</div>
//             <h1 class="text-[28px] font-semibold tracking-tight leading-none">Good ${t.greet}, Mark.</h1>
//             <p class="text-[13.5px] mt-2.5 leading-relaxed max-w-2xl" style="color: var(--text-2);">
//               ${k.active_clients} clients active, ${anomalyCount} anomalies open, ${queue.length} approvals waiting on you.
//             </p>
//           </div>
//           <div class="flex items-center gap-2">
//             <button class="btn btn-ghost" onclick="navigate('playground')"><i data-lucide="sparkles" class="size-3"></i> Briefing</button>
//             <button class="btn btn-secondary">+ Quick action</button>
//           </div>
//         </div>
//
//         <div class="grid grid-cols-12 gap-7 items-stretch">
//           <div class="col-span-7">
//             <div class="text-[10px] uppercase font-medium mb-2.5" style="color: var(--text-3); letter-spacing: 0.09em;">Portfolio MRR</div>
//             <div class="flex items-baseline gap-3 flex-wrap">
//               <span class="text-[52px] font-semibold leading-none tabular-nums tracking-tight">$${k.mrr.toLocaleString()}</span>
//               <span class="text-[16px] font-medium tabular-nums px-2 py-0.5 rounded" style="color: var(--acc-bright); background: var(--acc-soft);">${k.mrr_delta_pct >= 0 ? '↑' : '↓'} ${Math.abs(k.mrr_delta_pct).toFixed(1)}%</span>
//               ${forecast ? `<span class="text-[10px] ml-1 px-2 py-0.5 rounded mono tabular-nums" style="background: rgba(167,139,250,0.10); color: #a78bfa;">forecast ${forecast.forecast_confidence_pct}%</span>` : ''}
//             </div>
//             <div class="text-[12px] mt-2 tabular-nums" style="color: var(--text-3);">${forecast && forecast.forecast_weeks ? `projected $${forecast.forecast_weeks[forecast.forecast_weeks.length - 1].toLocaleString()} in ${forecast.forecast_weeks.length - 1} weeks` : `from $${(k.mrr_sparkline[k.mrr_sparkline.length - 2] || 0).toLocaleString()} last week`} · ${k.active_clients} clients</div>
//             ${heroMrrSpark}
//           </div>
//
//           <div class="col-span-3 flex items-center justify-center">
//             <div class="flex flex-col items-center gap-3">
//               ${_donutSvg(cash.pct, 140, 11, '#10b981')}
//               <div class="text-center">
//                 <div class="text-[12.5px] font-medium">$${(cash.collected/1000).toFixed(1)}k of $${(cash.target/1000).toFixed(1)}k</div>
//                 <div class="text-[10.5px] mt-0.5" style="color: var(--text-3);">projected $${(cash.projected/1000).toFixed(1)}k · ${cash.daysRemaining}d left</div>
//               </div>
//             </div>
//           </div>
//
//           <div class="col-span-2 flex flex-col justify-between gap-5">
//             ${microKpi('Avg rank', k.avg_rank.toFixed(1), k.avg_rank_delta, k.avg_rank_delta < 0, kv2.avg_rank_spark, '#a78bfa', null, null, true, benchmarks.avg_rank)}
//             ${microKpi('SoLV %', `${k.solv}%`, k.solv_delta, k.solv_delta > 0, kv2.solv_spark, '#10b981', null, null, false, benchmarks.solv)}
//             ${microKpi('Active clients', String(k.active_clients), null, null, null, null, k.churn_risk_clients > 0 ? `${k.churn_risk_clients} at risk` : 'all healthy', k.churn_risk_clients > 0 ? 'amber' : 'green')}
//           </div>
//         </div>
//       </div>
//     </section>
//   `;
//
//   /* AI agent activity ribbon */
//   const agentRibbon = `
//     <section class="px-10 pt-6">
//       <div class="max-w-[1320px] mx-auto">
//         <div class="surface p-4">
//           <div class="flex items-center justify-between mb-3">
//             <div class="flex items-center gap-2">
//               <i data-lucide="bot" class="size-3.5" style="color: var(--violet);"></i>
//               <span class="text-[12.5px] font-semibold">AI agent activity</span>
//               <span class="text-[10.5px]" style="color: var(--text-3);">last 24h</span>
//             </div>
//             <button class="btn btn-ghost" onclick="navigate('playground')">All <i data-lucide="arrow-right" class="size-3"></i></button>
//           </div>
//           <div class="grid grid-cols-3 gap-3">
//             ${agentActivity.slice(0, 6).map(a => {
//               const outcomeTone = a.outcome.includes('approval') || a.outcome.includes('queued') ? 'var(--amber)' : a.outcome.includes('found') || a.outcome.includes('opened') ? 'var(--red)' : 'var(--acc-bright)';
//               const conf = agentConf[a.id] ?? 85;
//               const confTone = conf >= 85 ? 'var(--acc-bright)' : conf >= 70 ? 'var(--amber)' : 'var(--red)';
//               return `
//                 <div class="flex items-start gap-2.5 p-2.5 rounded-md row-hover" style="border: 1px solid var(--line-1);">
//                   <div class="size-7 rounded-md flex items-center justify-center text-[10px] font-semibold shrink-0" style="background: rgba(167,139,250,0.18); color: #a78bfa;">${a.avatar}</div>
//                   <div class="flex-1 min-w-0">
//                     <div class="flex items-center gap-1.5 text-[10px] mb-0.5" style="color: var(--text-3);">
//                       <span style="color: var(--text-2);">${a.agent}</span>
//                       <span class="ml-auto mono tabular-nums">${a.minutes_ago}m</span>
//                     </div>
//                     <div class="text-[11.5px] leading-snug">${a.action}</div>
//                     <div class="flex items-center gap-2 mt-1 text-[10px]" style="color: var(--text-3);">
//                       <span>${a.client}</span>
//                       <span>· $${a.cost.toFixed(2)}</span>
//                       <span class="ml-auto mono tabular-nums" style="color: ${confTone};">${conf}%</span>
//                     </div>
//                     <div class="text-[10px] mt-0.5" style="color: ${outcomeTone};">${a.outcome}</div>
//                   </div>
//                 </div>
//               `;
//             }).join('')}
//           </div>
//         </div>
//       </div>
//     </section>
//   `;
//
//   /* Decision queue */
//   const queueRow = (q) => {
//     const meta = _KIND_META[q.kind];
//     const toneRgb = meta.tone === 'red' ? '244,63,94' : meta.tone === 'amber' ? '245,158,11' : meta.tone === 'sky' ? '56,189,248' : '167,139,250';
//     const toneVar = meta.tone === 'red' ? 'var(--red)' : meta.tone === 'amber' ? 'var(--amber)' : meta.tone === 'sky' ? 'var(--sky)' : 'var(--violet)';
//     const preview = previews[q.id];
//     return `
//       <div class="group flex items-start gap-3 px-3 py-3 -mx-1 rounded-md row-hover" style="border: 1px solid var(--line-1);">
//         <div class="size-8 rounded-md flex items-center justify-center shrink-0 mt-0.5" style="background: rgba(${toneRgb},0.14);">
//           <i data-lucide="${meta.icon}" class="size-3.5" style="color: ${toneVar};"></i>
//         </div>
//         <div class="flex-1 min-w-0">
//           <div class="flex items-center gap-2 mb-0.5 text-[10.5px]" style="color: var(--text-3);">
//             <span style="color: var(--text-2);">${q.client}</span>
//             ${q.facility ? `<span>· ${q.facility}</span>` : ''}
//             <span class="ml-auto mono tabular-nums" style="color: ${_slaTone(q.sla_hours)};">${_slaLabel(q.sla_hours)} left</span>
//           </div>
//           <div class="text-[12.5px] font-medium leading-snug">${q.title}</div>
//           ${preview ? `<div class="text-[11px] mt-1 leading-snug italic" style="color: var(--text-3);">&ldquo;${preview}&rdquo;</div>` : ''}
//           <div class="text-[11.5px] mt-1 leading-snug" style="color: var(--text-2);">${q.body}</div>
//           <div class="flex items-center gap-1.5 mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
//             <button class="btn btn-primary btn-sm"><i data-lucide="check" class="size-3"></i> Approve</button>
//             <button class="btn btn-secondary btn-sm">Skip</button>
//             <button class="btn btn-ghost btn-sm">Open <i data-lucide="arrow-right" class="size-3"></i></button>
//           </div>
//         </div>
//       </div>
//     `;
//   };
//
//   const decisionQueue = `
//     <div class="surface p-6">
//       <div class="flex items-center justify-between mb-5">
//         <div class="flex items-center gap-3">
//           <div class="size-7 rounded-md flex items-center justify-center" style="background: var(--acc-soft);">
//             <i data-lucide="zap" class="size-3.5" style="color: var(--acc);"></i>
//           </div>
//           <div>
//             <div class="flex items-center gap-2">
//               <span class="text-[14px] font-semibold">Decision queue</span>
//               <span class="text-[10px] px-2 py-0.5 rounded" style="background: var(--acc-soft); color: var(--acc-bright);">${today.length + thisWeek.length}</span>
//             </div>
//             <div class="text-[10.5px] mt-0.5" style="color: var(--text-3);">Today and this week · grouped by urgency</div>
//           </div>
//         </div>
//         <button class="btn btn-ghost">Full queue <i data-lucide="arrow-right" class="size-3"></i></button>
//       </div>
//
//       <div class="flex items-center gap-2 mb-2.5">
//         <span class="size-[6px] rounded-full" style="background: var(--red);"></span>
//         <div class="text-[10px] uppercase font-medium" style="color: var(--text-3); letter-spacing: 0.09em;">Today <span style="color: var(--red);">${today.length}</span></div>
//       </div>
//       <div class="space-y-2">
//         ${today.length === 0 ? `<div class="text-[12px] py-3 px-3 rounded-md" style="color: var(--text-3); background: rgba(255,255,255,0.015);">Nothing waiting on you today.</div>` : today.map(queueRow).join('')}
//       </div>
//
//       <div class="mt-5">
//         <div class="flex items-center gap-2 mb-2.5">
//           <span class="size-[6px] rounded-full" style="background: var(--amber);"></span>
//           <div class="text-[10px] uppercase font-medium" style="color: var(--text-3); letter-spacing: 0.09em;">This week <span style="color: var(--amber);">${thisWeek.length}</span></div>
//         </div>
//         <div class="space-y-2">
//           ${thisWeek.length === 0 ? `<div class="text-[12px] py-3 px-3 rounded-md" style="color: var(--text-3); background: rgba(255,255,255,0.015);">Week is clear. Push a renewal.</div>` : thisWeek.map(queueRow).join('')}
//         </div>
//       </div>
//     </div>
//   `;
//
//   /* Client portfolio matrix */
//   const totalMrr = matrix.reduce((s, r) => s + (r.mrr || r.mrrUsd || 0), 0);
//   const totalIssues = matrix.reduce((s, r) => s + (r.open_issues ?? r.openIssues ?? 0), 0);
//   const totalFac = matrix.reduce((s, r) => s + (r.facilities || 0), 0);
//
//   const matrixRow = (r) => {
//     const mrr = r.mrr || r.mrrUsd || 0;
//     const score = r.score ?? r.healthScore;
//     const issues = r.open_issues ?? r.openIssues ?? 0;
//     const churn = r.churn_risk_pct ?? r.churnRiskPct ?? 0;
//     const initials = r.initials || r.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
//     const mrrSpark = r.mrr_spark || [mrr, mrr];
//     const rankSpark = r.avg_rank_spark || [5, 5];
//     const solvSpark = r.solv_spark || [30, 30];
//     const rankBetter = rankSpark[rankSpark.length - 1] < rankSpark[0];
//     const solvBetter = solvSpark[solvSpark.length - 1] > solvSpark[0];
//     return `
//       <a href="#clients" onclick="event.preventDefault(); navigate('clients')" class="grid items-center py-3 px-2 -mx-2 rounded-md row-hover cursor-pointer" style="grid-template-columns: 1.7fr 0.7fr 1fr 1fr 1fr 0.7fr 0.5fr 0.4fr; gap: 12px; border: 1px solid transparent;">
//         <div class="flex items-center gap-2.5 min-w-0">
//           <div class="size-8 rounded-md flex items-center justify-center text-[10px] font-semibold shrink-0" style="background: var(--acc-soft); color: var(--acc-bright);">${initials}</div>
//           <div class="min-w-0">
//             <div class="text-[12.5px] font-medium truncate">${r.name}</div>
//             <div class="text-[10px]" style="color: var(--text-3);">${r.status === 'at_risk' ? 'at risk' : 'healthy'}</div>
//           </div>
//         </div>
//         <div class="text-right text-[12px] tabular-nums" style="color: var(--text-2);">${r.facilities}</div>
//         <div class="flex items-center gap-2">
//           <span class="text-[12.5px] font-semibold tabular-nums">$${mrr.toLocaleString()}</span>
//           ${_sparkSvg(mrrSpark, '#10b981', 60, 20)}
//         </div>
//         <div class="flex items-center gap-2">
//           <span class="text-[12.5px] tabular-nums">${(r.avg_rank ?? r.avgRank ?? 0).toFixed(1)}</span>
//           ${_sparkSvg(rankSpark, rankBetter ? '#10b981' : '#f43f5e', 60, 20)}
//         </div>
//         <div class="flex items-center gap-2">
//           <span class="text-[12.5px] tabular-nums">${r.solv ?? r.solvPct ?? 0}%</span>
//           ${_sparkSvg(solvSpark, solvBetter ? '#10b981' : '#f43f5e', 60, 20)}
//         </div>
//         <div class="text-right text-[12px] mono tabular-nums">
//           <span style="color: ${r.status === 'at_risk' ? 'var(--red)' : 'var(--text-1)'};">${score}</span>
//           <span style="color: var(--text-3);">/100</span>
//         </div>
//         <div class="text-right text-[12px] tabular-nums" style="color: ${issues > 0 ? 'var(--amber)' : 'var(--text-3)'};">${issues}</div>
//         <div class="flex items-center justify-end gap-1.5">
//           <span class="text-[11px] tabular-nums" style="color: ${churn > 20 ? 'var(--red)' : churn > 10 ? 'var(--amber)' : 'var(--text-3)'};">${churn}%</span>
//           <i data-lucide="chevron-right" class="size-3" style="color: var(--text-3);"></i>
//         </div>
//       </a>
//     `;
//   };
//
//   const clientMatrix = `
//     <div class="surface p-6">
//       <div class="flex items-center justify-between mb-5">
//         <div class="flex items-center gap-2">
//           <i data-lucide="heart-pulse" class="size-3.5" style="color: var(--text-3);"></i>
//           <span class="text-[14px] font-semibold">Client portfolio</span>
//           <span class="text-[10.5px]" style="color: var(--text-3);">${matrix.length} active · $${totalMrr.toLocaleString()}/mo</span>
//         </div>
//         <button class="btn btn-ghost" onclick="navigate('clients')">All clients <i data-lucide="arrow-right" class="size-3"></i></button>
//       </div>
//
//       <div class="grid pb-2 text-[10px] uppercase font-medium" style="grid-template-columns: 1.7fr 0.7fr 1fr 1fr 1fr 0.7fr 0.5fr 0.4fr; gap: 12px; color: var(--text-3); letter-spacing: 0.09em; border-bottom: 1px solid var(--line-1);">
//         <div>Client</div>
//         <div class="text-right">Facilities</div>
//         <div>MRR &amp; trend</div>
//         <div>Avg rank</div>
//         <div>SoLV</div>
//         <div class="text-right">Health</div>
//         <div class="text-right">Open</div>
//         <div class="text-right">Churn</div>
//       </div>
//
//       ${matrix.map(matrixRow).join('')}
//
//       <div class="grid items-center pt-2.5 mt-1 text-[11px]" style="grid-template-columns: 1.7fr 0.7fr 1fr 1fr 1fr 0.7fr 0.5fr 0.4fr; gap: 12px; border-top: 1px solid var(--line-1); color: var(--text-3);">
//         <div>Portfolio total</div>
//         <div class="text-right tabular-nums">${totalFac}</div>
//         <div class="font-semibold tabular-nums" style="color: var(--text-1);">$${totalMrr.toLocaleString()}</div>
//         <div></div><div></div><div></div>
//         <div class="text-right tabular-nums" style="color: ${totalIssues > 0 ? 'var(--amber)' : 'inherit'};">${totalIssues}</div>
//         <div></div>
//       </div>
//     </div>
//   `;
//
//   /* Portfolio movers with per-keyword sparklines */
//   const moverRow = (m, positive) => {
//     const trace = traces[m.keyword] || [5, 5, 5, 5, 5, 5, 5, 5];
//     const renderTrace = positive ? [...trace].reverse() : trace;
//     return `
//       <div class="flex items-center gap-3 py-2 leading-snug">
//         <div class="flex-1 min-w-0">
//           <div class="text-[12.5px] font-medium truncate">&ldquo;${m.keyword}&rdquo;</div>
//           <div class="text-[10px] mt-0.5" style="color: var(--text-3);">${m.client} · ${m.facility}</div>
//         </div>
//         ${_sparkSvg(renderTrace, positive ? '#10b981' : '#f43f5e', 64, 22, false)}
//         <span class="text-[12px] mono font-medium tabular-nums shrink-0 w-10 text-right" style="color: ${positive ? 'var(--acc-bright)' : 'var(--red)'};">${positive ? '+' : ''}${m.delta}</span>
//       </div>
//     `;
//   };
//
//   const moversCard = `
//     <div class="surface p-6">
//       <div class="flex items-center justify-between mb-5">
//         <div class="flex items-center gap-2">
//           <i data-lucide="trending-up" class="size-3.5" style="color: var(--text-3);"></i>
//           <span class="text-[14px] font-semibold">Portfolio movers</span>
//           <span class="text-[10.5px]" style="color: var(--text-3);">7 days</span>
//         </div>
//         <button class="btn btn-ghost" onclick="navigate('keywords')">All keywords <i data-lucide="arrow-right" class="size-3"></i></button>
//       </div>
//       <div class="grid grid-cols-2 gap-x-8 gap-y-1">
//         <div>
//           <div class="text-[10px] uppercase font-medium mb-3 flex items-center gap-1.5" style="color: var(--acc-bright); letter-spacing: 0.09em;">
//             <i data-lucide="arrow-up-right" class="size-3"></i> Top gainers
//           </div>
//           ${movers.gainers.map(g => moverRow(g, true)).join('')}
//         </div>
//         <div>
//           <div class="text-[10px] uppercase font-medium mb-3 flex items-center gap-1.5" style="color: var(--red); letter-spacing: 0.09em;">
//             <i data-lucide="arrow-down-right" class="size-3"></i> Top losers
//           </div>
//           ${movers.losers.map(l => moverRow(l, false)).join('')}
//         </div>
//       </div>
//     </div>
//   `;
//
//   /* Algorithm pulse */
//   const algoTone = algPulse.recovery_status === 'complete' ? 'var(--acc-bright)' : algPulse.recovery_status === 'partial' ? 'var(--amber)' : 'var(--red)';
//   const algorithmPulseCard = `
//     <div class="surface p-5">
//       <div class="flex items-center justify-between mb-3">
//         <div class="flex items-center gap-2">
//           <i data-lucide="git-pull-request-arrow" class="size-3.5" style="color: var(--text-3);"></i>
//           <span class="text-[13px] font-semibold">Algorithm pulse</span>
//         </div>
//         <span class="text-[10px] mono" style="color: var(--text-3);">${algPulse.latest_days_ago}d ago</span>
//       </div>
//       <div class="text-[12.5px] font-medium mb-1">${algPulse.latest_name || 'No active update'}</div>
//       <div class="text-[10.5px] mb-3" style="color: var(--text-3);">${algPulse.latest_type || ''} · rolled out ${algPulse.latest_at || ''}</div>
//       <div class="grid grid-cols-2 gap-3 pt-3" style="border-top: 1px solid var(--line-1);">
//         <div>
//           <div class="text-[9.5px] uppercase font-medium" style="color: var(--text-3); letter-spacing: 0.09em;">Net Δ</div>
//           <div class="text-[16px] font-semibold tabular-nums mt-1" style="color: ${algPulse.portfolio_net_delta > 0 ? 'var(--acc-bright)' : algPulse.portfolio_net_delta < 0 ? 'var(--red)' : 'var(--text-1)'};">
//             ${algPulse.portfolio_net_delta > 0 ? '+' : ''}${algPulse.portfolio_net_delta ?? 0}
//           </div>
//           <div class="text-[10px] mt-0.5" style="color: var(--text-3);">positions</div>
//         </div>
//         <div>
//           <div class="text-[9.5px] uppercase font-medium" style="color: var(--text-3); letter-spacing: 0.09em;">Recovery</div>
//           <div class="text-[12.5px] font-medium capitalize mt-1" style="color: ${algoTone};">${algPulse.recovery_status || 'n/a'}</div>
//           <div class="text-[10px] mt-0.5" style="color: var(--text-3);">${algPulse.facilities_recovered ?? 0}/${algPulse.facilities_impacted ?? 0} facilities</div>
//         </div>
//       </div>
//     </div>
//   `;
//
//   /* Recent wins */
//   const recentWinsCard = `
//     <div class="surface p-5">
//       <div class="flex items-center gap-2 mb-3">
//         <i data-lucide="trophy" class="size-3.5" style="color: var(--acc-bright);"></i>
//         <span class="text-[13px] font-semibold">Recent wins</span>
//       </div>
//       <div class="space-y-2.5">
//         ${wins.map(w => `
//           <div class="flex items-start gap-2.5">
//             <i data-lucide="star" class="size-3 mt-1 shrink-0" style="color: var(--acc-bright);"></i>
//             <div class="flex-1 min-w-0">
//               <div class="text-[11.5px] leading-snug">${w.text}</div>
//               <div class="text-[10px] mt-0.5" style="color: var(--text-3);">${w.client} · ${w.at}</div>
//             </div>
//           </div>
//         `).join('')}
//       </div>
//     </div>
//   `;
//
//   /* AI spend by client (richer) */
//   const totalSpend = aiSpend.reduce((s, r) => s + r.spend, 0);
//   const aiSpendCard = `
//     <div class="surface p-5">
//       <div class="flex items-center justify-between mb-4">
//         <div class="flex items-center gap-2">
//           <i data-lucide="wallet" class="size-3.5" style="color: var(--text-3);"></i>
//           <span class="text-[13px] font-semibold">AI spend by client</span>
//         </div>
//         <span class="text-[11px] mono tabular-nums" style="color: var(--text-2);">$${totalSpend}</span>
//       </div>
//       <div class="space-y-3">
//         ${aiSpend.map(s => {
//           const pct = Math.round((s.spend / s.cap) * 100);
//           const tone = pct > 90 ? 'var(--red)' : pct > 70 ? 'var(--amber)' : 'var(--acc)';
//           const delta = aiDeltas[s.client] ?? 0;
//           return `
//             <div>
//               <div class="flex items-center justify-between mb-1">
//                 <span class="text-[12px]">${s.client}</span>
//                 <span class="text-[10px] mono tabular-nums" style="color: ${delta > 0 ? 'var(--amber)' : 'var(--acc-bright)'};">${delta > 0 ? '+' : ''}${delta}%</span>
//               </div>
//               <div class="flex items-center gap-2">
//                 <div class="flex-1 h-[4px] rounded-full overflow-hidden" style="background: var(--bg-3);">
//                   <div style="width: ${Math.min(pct, 100)}%; background: ${tone}; height: 100%; transition: width 600ms ease;"></div>
//                 </div>
//                 <span class="text-[10px] mono tabular-nums" style="color: var(--text-3); min-width: 80px; text-align: right;">$${s.spend} / $${s.cap}</span>
//               </div>
//             </div>
//           `;
//         }).join('')}
//       </div>
//     </div>
//   `;
//
//   /* Week ahead */
//   const kindLabels = { qbr: 'QBR', renewal: 'Renewal', deliverable: 'Deliverable', kickoff: 'Kickoff' };
//   const kindDots = { qbr: 'sky', renewal: 'amber', deliverable: 'green', kickoff: 'violet' };
//   const weekAheadCard = `
//     <div class="surface p-5">
//       <div class="flex items-center gap-2 mb-3">
//         <i data-lucide="calendar" class="size-3.5" style="color: var(--text-3);"></i>
//         <span class="text-[13px] font-semibold">Week ahead</span>
//       </div>
//       <div class="space-y-2.5">
//         ${weekAhead.map(r => `
//           <div class="flex items-start gap-2.5">
//             ${_statusDot(kindDots[r.kind])}
//             <div class="flex-1 min-w-0">
//               <div class="text-[12px] font-medium leading-snug">${r.label}</div>
//               <div class="text-[10px] mt-0.5" style="color: var(--text-3);">${r.date} · ${kindLabels[r.kind]} · ${r.client}</div>
//             </div>
//           </div>
//         `).join('')}
//       </div>
//     </div>
//   `;
//
//   /* System pulse footer */
//   const systemPulseFooter = `
//     <section class="px-10 pb-10">
//       <div class="max-w-[1320px] mx-auto">
//         <div class="surface p-4">
//           <div class="grid grid-cols-2 gap-6">
//             <div>
//               <div class="flex items-center gap-2 mb-3">
//                 <i data-lucide="radio" class="size-3.5" style="color: var(--text-3);"></i>
//                 <span class="text-[11.5px] font-semibold">API health</span>
//               </div>
//               <div class="grid grid-cols-5 gap-3">
//                 ${sysPulse.apis.map(a => `
//                   <div class="text-center">
//                     <div class="flex items-center justify-center gap-1.5 mb-1">
//                       ${_statusDot(a.status === 'ok' ? 'green' : a.status === 'degraded' ? 'amber' : 'red', a.status === 'ok')}
//                       <span class="text-[10px]" style="color: var(--text-2);">${a.name}</span>
//                     </div>
//                     <span class="text-[9.5px] mono tabular-nums" style="color: var(--text-3);">${a.last_sync_min}m</span>
//                   </div>
//                 `).join('')}
//               </div>
//             </div>
//             <div>
//               <div class="flex items-center gap-2 mb-3">
//                 <i data-lucide="activity" class="size-3.5" style="color: var(--text-3);"></i>
//                 <span class="text-[11.5px] font-semibold">Background jobs</span>
//               </div>
//               <div class="space-y-1.5">
//                 ${sysPulse.jobs.map(j => `
//                   <div class="flex items-center gap-2 text-[10.5px]">
//                     ${_statusDot(j.status === 'ok' ? 'green' : 'amber')}
//                     <span style="color: var(--text-2);">${j.name}</span>
//                     <span style="color: var(--text-3);">${j.schedule}</span>
//                     <span class="ml-auto mono tabular-nums" style="color: var(--text-3);">last ${j.last_run}</span>
//                   </div>
//                 `).join('')}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   `;
//
//   /* AI narrative card */
//   const narrativeCard = narrative ? `
//     <section class="px-10 pt-6">
//       <div class="max-w-[1320px] mx-auto">
//         <div class="surface p-5" style="background: linear-gradient(135deg, rgba(167,139,250,0.04), rgba(16,185,129,0.03));">
//           <div class="flex items-start gap-4">
//             <div class="size-9 rounded-md flex items-center justify-center shrink-0" style="background: rgba(167,139,250,0.16);">
//               <i data-lucide="sparkles" class="size-4" style="color: #a78bfa;"></i>
//             </div>
//             <div class="flex-1 min-w-0">
//               <div class="flex items-center gap-2 mb-1.5 text-[10px]" style="color: var(--text-3); letter-spacing: 0.09em;">
//                 <span class="uppercase font-medium">This week</span>
//                 <span>·</span>
//                 <span>${narrative.model}</span>
//                 <span>·</span>
//                 <span class="mono tabular-nums">${narrative.confidence_pct}% confidence</span>
//                 <span class="ml-auto mono tabular-nums">${narrative.generated_at}</span>
//               </div>
//               <div class="text-[16px] font-semibold tracking-tight mb-2">${narrative.headline}</div>
//               <div class="text-[13px] leading-relaxed max-w-3xl" style="color: var(--text-2);">${narrative.body}</div>
//               <div class="flex flex-wrap items-center gap-1.5 mt-3">
//                 <span class="text-[10px] uppercase font-medium" style="color: var(--text-3); letter-spacing: 0.09em;">Sources</span>
//                 ${narrative.sources.map(s => `<span class="text-[10.5px] px-2 py-0.5 rounded font-medium" style="background: rgba(255,255,255,0.04); color: var(--text-2);">${s.label}</span>`).join('')}
//               </div>
//             </div>
//             <button class="btn btn-ghost shrink-0">Open <i data-lucide="arrow-right" class="size-3"></i></button>
//           </div>
//         </div>
//       </div>
//     </section>
//   ` : '';
//
//   /* Geographic portfolio map */
//   const usFacs = geoFacs.filter(f => f.lng < 0);
//   const intlFacs = geoFacs.filter(f => f.lng > 0);
//   const geoMapCard = geoFacs.length ? (() => {
//     const lngs = usFacs.map(f => f.lng), lats = usFacs.map(f => f.lat);
//     const minLng = Math.min(...lngs) - 2, maxLng = Math.max(...lngs) + 2;
//     const minLat = Math.min(...lats) - 2, maxLat = Math.max(...lats) + 2;
//     const w = 760, h = 360;
//     const proj = (lat, lng) => [((lng - minLng) / (maxLng - minLng)) * w, h - ((lat - minLat) / (maxLat - minLat)) * h];
//     const tone = (s) => s === 'critical' ? '#f43f5e' : s === 'at_risk' ? '#f59e0b' : s === 'suspended' ? '#a78bfa' : '#10b981';
//     const counts = { healthy: 0, at_risk: 0, suspended: 0, critical: 0 };
//     geoFacs.forEach(f => { counts[f.status] = (counts[f.status] || 0) + 1; });
//
//     return `
//       <div class="surface p-6">
//         <div class="flex items-center justify-between mb-4">
//           <div class="flex items-center gap-2">
//             <i data-lucide="map-pin" class="size-3.5" style="color: var(--text-3);"></i>
//             <span class="text-[14px] font-semibold">Geographic portfolio</span>
//             <span class="text-[10.5px]" style="color: var(--text-3);">${geoFacs.length} facilities · ${usFacs.length} US${intlFacs.length ? ` · ${intlFacs.length} international` : ''}</span>
//           </div>
//           <div class="flex items-center gap-3 text-[10px]" style="color: var(--text-3);">
//             <span class="flex items-center gap-1.5">${_statusDot('green')} healthy</span>
//             <span class="flex items-center gap-1.5">${_statusDot('amber')} at risk</span>
//             <span class="flex items-center gap-1.5">${_statusDot('violet')} suspended</span>
//             <span class="flex items-center gap-1.5">${_statusDot('red')} critical</span>
//           </div>
//         </div>
//         <div class="rounded-md overflow-hidden relative" style="background: var(--bg-3); border: 1px solid var(--line-1);">
//           <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block;">
//             <defs>
//               <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
//               </pattern>
//             </defs>
//             <rect x="0" y="0" width="${w}" height="${h}" fill="url(#map-grid)"/>
//             ${usFacs.map(f => {
//               const [x, y] = proj(f.lat, f.lng);
//               const t = tone(f.status);
//               return `
//                 <g>
//                   <circle cx="${x}" cy="${y}" r="14" fill="${t}" fill-opacity="0.10"/>
//                   <circle cx="${x}" cy="${y}" r="6" fill="${t}" fill-opacity="0.55"/>
//                   <circle cx="${x}" cy="${y}" r="3" fill="${t}"/>
//                   ${f.status === 'critical' ? `<circle cx="${x}" cy="${y}" r="18" fill="none" stroke="${t}" stroke-opacity="0.5" stroke-width="1.2" class="ping"/>` : ''}
//                   <title>${f.name} (${f.client}) - rank ${f.avg_rank}, ${f.delta > 0 ? '+' : ''}${f.delta}</title>
//                 </g>
//               `;
//             }).join('')}
//           </svg>
//           <div class="absolute inset-x-0 bottom-0 p-3 text-[10px]" style="background: linear-gradient(to top, rgba(0,0,0,0.4), transparent); color: var(--text-3);">
//             <span>Span: ${minLat.toFixed(1)}°N to ${maxLat.toFixed(1)}°N, ${Math.abs(minLng).toFixed(1)}°W to ${Math.abs(maxLng).toFixed(1)}°W</span>
//             ${intlFacs.length ? `<span class="ml-3 px-2 py-0.5 rounded" style="background: rgba(167,139,250,0.14); color: #a78bfa;">+${intlFacs.length} not shown (${intlFacs.map(f => f.name).join(', ')})</span>` : ''}
//           </div>
//         </div>
//         <div class="grid grid-cols-4 gap-3 mt-4">
//           ${['healthy','at_risk','suspended','critical'].map(s => {
//             const c = counts[s] || 0;
//             const col = s === 'critical' ? 'red' : s === 'at_risk' ? 'amber' : s === 'suspended' ? 'violet' : 'green';
//             return `
//               <div class="flex items-center gap-2.5 p-2.5 rounded-md" style="border: 1px solid var(--line-1);">
//                 ${_statusDot(col)}
//                 <div class="flex-1 min-w-0">
//                   <div class="text-[11px] capitalize" style="color: var(--text-2);">${s.replace('_', ' ')}</div>
//                   <div class="text-[16px] font-semibold tabular-nums">${c}</div>
//                 </div>
//               </div>
//             `;
//           }).join('')}
//         </div>
//       </div>
//     `;
//   })() : '';
//
//   /* SERP feature visibility card */
//   const serpCard = serp.length ? `
//     <div class="surface p-5">
//       <div class="flex items-center justify-between mb-4">
//         <div class="flex items-center gap-2">
//           <i data-lucide="layers" class="size-3.5" style="color: var(--text-3);"></i>
//           <span class="text-[13px] font-semibold">SERP feature visibility</span>
//         </div>
//         <span class="text-[10px]" style="color: var(--text-3);">across ${serp[0].total_tracked} kw</span>
//       </div>
//       <div class="space-y-3">
//         ${serp.map(r => {
//           const dTone = r.delta_pct > 0 ? 'var(--acc-bright)' : r.delta_pct < 0 ? 'var(--red)' : 'var(--text-3)';
//           const barColor = r.presence_pct > 50 ? 'var(--acc)' : r.presence_pct > 25 ? 'var(--sky)' : 'var(--violet)';
//           return `
//             <div>
//               <div class="flex items-center justify-between mb-1.5">
//                 <span class="text-[11.5px]">${r.feature}</span>
//                 <span class="text-[10.5px] mono tabular-nums" style="color: var(--text-2);">
//                   ${r.our_count} <span style="color: var(--text-3);">/ ${r.total_tracked}</span>
//                   <span class="ml-2" style="color: ${dTone};">${r.delta_pct > 0 ? '+' : ''}${r.delta_pct}%</span>
//                 </span>
//               </div>
//               <div class="h-[4px] rounded-full overflow-hidden" style="background: var(--bg-3);">
//                 <div style="width: ${r.presence_pct}%; background: ${barColor}; height: 100%; transition: width 700ms ease;"></div>
//               </div>
//             </div>
//           `;
//         }).join('')}
//       </div>
//     </div>
//   ` : '';
//
//   return `
//     ${stripe}
//     ${narrativeCard}
//     ${hero}
//     ${agentRibbon}
//     <section class="px-10 py-6">
//       <div class="max-w-[1320px] mx-auto grid grid-cols-12 gap-5">
//         <div class="col-span-8 space-y-5">
//           ${decisionQueue}
//           ${clientMatrix}
//           ${geoMapCard}
//           ${moversCard}
//         </div>
//         <div class="col-span-4 space-y-5">
//           ${serpCard}
//           ${algorithmPulseCard}
//           ${recentWinsCard}
//           ${aiSpendCard}
//           ${weekAheadCard}
//         </div>
//       </div>
//     </section>
//     ${systemPulseFooter}
//     <style>
//       .hero-grad {
//         background:
//           radial-gradient(circle at 18% 110%, rgba(16,185,129,0.08), transparent 55%),
//           radial-gradient(circle at 82% 0%, rgba(167,139,250,0.05), transparent 50%);
//       }
//       .live-dot { animation: pulseDot 1800ms ease-in-out infinite; }
//       @keyframes pulseDot {
//         0%   { box-shadow: 0 0 0 3px rgba(16,185,129,0.18), 0 0 0 0 rgba(16,185,129,0.35); }
//         70%  { box-shadow: 0 0 0 3px rgba(16,185,129,0.18), 0 0 0 8px rgba(16,185,129,0); }
//         100% { box-shadow: 0 0 0 3px rgba(16,185,129,0.18), 0 0 0 0 rgba(16,185,129,0); }
//       }
//       .row-hover { transition: background 160ms ease, border-color 160ms ease; }
//       .row-hover:hover { background: var(--bg-3); border-color: rgba(255,255,255,0.06) !important; }
//       .ping { transform-origin: center; transform-box: fill-box; animation: pingScale 2s ease-out infinite; }
//       @keyframes pingScale { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
//     </style>
//   `;
// };
//
// /* =====================================================================
//    TODAY - prioritized time-ordered list
//    ===================================================================== */
// PAGES.today = () => {
//   const items = [
//     { time: '08:00', task: 'Anomaly scan complete',        detail: '3 RED, 0 AMBER, 1 GREEN closed', dot: 'red',   done: true },
//     { time: '08:15', task: 'Review 3 anomaly alerts',      detail: 'Royal Mini rank drop -12 positions is the priority', dot: 'red',    cta: 'Open',  route: 'anomalies' },
//     { time: '08:30', task: 'Approve 7 GBP posts',          detail: '5 minute task. Posts scheduled for May 18-21.',     dot: 'acc',    cta: 'Open',  route: 'gbp' },
//     { time: '09:00', task: 'Read AI weekly briefing',      detail: 'Generated this morning. 3 wins, 2 risks, 5 actions.', dot: 'violet', cta: 'Open', route: 'playground' },
//     { time: '10:00', task: 'Sales pipeline review',        detail: '4 new leads overnight. 2 are qualified.',           dot: 'acc',    cta: 'Open',  route: 'leads' },
//     { time: '11:00', task: 'Master client check-in',       detail: 'Churn risk improved 16pt. 3 unread messages from Sara.', dot: 'sky', cta: 'Open', route: 'client' },
//     { time: '14:00', task: 'Approve 4 blog drafts',        detail: '3 ready for review, 1 has factual errors flagged.', dot: 'acc',    cta: 'Open',  route: 'content' },
//     { time: '16:00', task: 'Strategy work',                detail: 'Brick & Stone climate cluster hypothesis.',          dot: 'acc',    cta: 'Open',  route: 'facility' },
//     { time: '18:00', task: 'Team capacity reassignment',   detail: 'Aimen 38h vs 30h. Move 2 tasks to Adan.',           dot: 'amber',  cta: 'Open',  route: 'team' },
//     { time: '19:00', task: 'Review ROI · log out',         detail: 'Pre-shutdown ritual. End of day.',                  dot: 'slate',  cta: 'Open',  route: 'roi' },
//   ];
//
//   return `
//     <section class="px-10 py-10">
//       <div class="max-w-[960px] mx-auto">
//
//         <div class="flex items-start justify-between mb-8">
//           <div>
//             <div class="eyebrow mb-2.5">Friday · 15 May · 13:11 PKT</div>
//             <h1 class="display text-1 leading-none">Today.</h1>
//             <p class="text-[13.5px] text-2 mt-4 leading-relaxed">Time-ordered agenda. 10 blocks · 5h 20min committed · 1 of 10 complete.</p>
//           </div>
//           ${UI.btn('Start focus block', { variant: 'primary', icon: 'timer', size: 'sm', onClick: "toast('25 min focus block started','success')" })}
//         </div>
//
//         <div class="surface overflow-hidden">
//           ${items.map((it, i) => `
//             <div class="px-6 py-4 flex items-center gap-5 hover:bg-3 transition-colors ${it.done ? 'opacity-50' : ''}" style="${i < items.length - 1 ? 'border-bottom: 1px solid var(--line-1);' : ''}">
//               <div class="text-[12px] mono font-medium w-12 shrink-0 ${it.done ? 'text-3' : 'text-2'}">${it.time}</div>
//               ${it.done ? `<i data-lucide="check-circle-2" class="size-4 text-acc-bright shrink-0"></i>` : `<span class="status status-${it.dot} shrink-0"></span>`}
//               <div class="flex-1 min-w-0">
//                 <div class="text-[13.5px] font-medium ${it.done ? 'line-through text-3' : 'text-1'}">${it.task}</div>
//                 <div class="text-[11.5px] text-3 mt-0.5">${it.detail}</div>
//               </div>
//               ${it.cta ? `<button onclick="navigate('${it.route}')" class="btn btn-secondary btn-sm">${it.cta} <i data-lucide="arrow-right" class="size-3"></i></button>` : ''}
//             </div>
//           `).join('')}
//         </div>
//       </div>
//     </section>
//   `;
// };
//