// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Reputation macro - hub + dense micro sub-modules.
//    Each sub-module is ONE archetype, structurally distinct:
//      reputation             :: CONSOLE      (stat rail + panel wall)
//      reputation.inbox       :: SPLIT INBOX  (review list | response editor)
//      reputation.requests    :: DENSE LIST   (campaigns + builder panel)
//      reputation.listings    :: DENSE LIST   (NAP accuracy, full-bleed)
//      reputation.competitors :: COMPARE TABLE (client vs local rivals)
//    Response policy: 4-5 star replies publish automatically; sub-3
//    star replies are held for owner sign-off. No KPI-card band.
//    LX archetypes + scoped dense styles only.
//    ============================================================ */
//
// window.PAGES = window.PAGES || {};
// window.PAGES_AFTER = window.PAGES_AFTER || {};
// window.FULLBLEED = window.FULLBLEED || new Set();
// window.FULLBLEED.add('reputation.inbox');
// window.FULLBLEED.add('reputation.listings');
//
// /* ---- shared module helpers (scoped, not globals) ---- */
// window.REP_H = (function () {
//   const esc = LX.esc;
//   const R = () => window.REPUTATION;
//   const platMeta = (id) => (R().platforms.find(p => p.id === id) || {});
//   const platColor = (id) => platMeta(id).color || 'var(--text-3)';
//   const platLabel = (id) => platMeta(id).label || id;
//   const lp = (id) => (R().listingPlatforms || {})[id] || { label: id, color: 'var(--text-3)', icon: 'globe' };
//   const clientName = (id) => (window.getClient(id) || {}).name || id;
//   const clientColor = (id) => (window.getClient(id) || {}).logoColor || '#10b981';
//   const clientIcon = (id) => (window.getClient(id) || {}).icon || 'building-2';
//   const cdot = (id, px = 6) => `<span class="inline-block rounded-full shrink-0" style="width:${px}px;height:${px}px;background:${clientColor(id)}"></span>`;
//   const cap = (s) => String(s || '').charAt(0).toUpperCase() + String(s || '').slice(1);
//   const stars = (n, size = '3.5') => {
//     let out = '';
//     for (let i = 1; i <= 5; i++) {
//       const f = i <= n;
//       out += `<i data-lucide="star" class="size-${size} ${f ? 'text-amber' : 'text-4'}" ${f ? 'style="fill:var(--amber)"' : ''}></i>`;
//     }
//     return `<span class="inline-flex items-center gap-0.5">${out}</span>`;
//   };
//   const sentColor = (s) => s === 'positive' ? 'var(--acc)' : s === 'negative' ? 'var(--red)' : 'var(--amber)';
//   const sentDot = (s) => `<span class="inline-block rounded-full shrink-0" style="width:7px;height:7px;background:${sentColor(s)}"></span>`;
//   const platCell = (id) => `<span class="flex items-center gap-1.5"><span class="size-1.5 rounded-full shrink-0" style="background:${platColor(id)}"></span><span class="text-[12px] text-2">${platLabel(id)}</span></span>`;
//   const clientCell = (id) => `<span class="flex items-center gap-2">${cdot(id, 6)}<span class="text-[12px] text-2 truncate">${clientName(id)}</span></span>`;
//
//   function subNav(active) {
//     const items = [
//       { id: 'reputation',             label: 'Overview' },
//       { id: 'reputation.inbox',       label: 'Reviews' },
//       { id: 'reputation.requests',    label: 'Requests' },
//       { id: 'reputation.listings',    label: 'Listings' },
//       { id: 'reputation.competitors', label: 'Competitors' },
//     ];
//     return `<div class="flex items-center gap-1 mb-5 -mt-1 flex-wrap">${items.map(it =>
//       `<button class="px-2.5 py-1 rounded-md text-[12px] font-medium ${it.id === active ? 'text-1' : 'text-3 hover:text-1'}" ${it.id === active ? 'style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"' : ''} data-action="navigate" data-route="${it.id}">${it.label}</button>`
//     ).join('')}</div>`;
//   }
//
//   const styles = `
//     <style>
//       .rep-shell { height: calc(100vh - 44px); display: flex; flex-direction: column; }
//       .rep-head { padding: 14px 22px; border-bottom: 1px solid var(--line-1); flex-shrink: 0; }
//       .rep-head .mod-head { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
//       .rv-row { padding: 11px 14px; border-bottom: 1px solid var(--line-1); cursor: pointer; transition: background 80ms; }
//       .rv-row:hover { background: rgba(255,255,255,0.022); }
//       .rv-row.active { background: var(--bg-2); box-shadow: inset 2px 0 0 var(--acc); }
//       .rv-snippet { font-size: 11px; color: var(--text-2); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
//     </style>`;
//
//   return { esc, R, platMeta, platColor, platLabel, lp, clientName, clientColor, clientIcon, cdot, cap, stars, sentColor, sentDot, platCell, clientCell, subNav, styles };
// })();
//
//
// /* ====================================================================
//    1. OVERVIEW  ::  CONSOLE  (stat rail + panel wall)
//    ==================================================================== */
// window.PAGES.reputation = function () {
//   const R = window.REPUTATION;
//   const H = window.REP_H;
//   const k = R.kpis;
//   const dot = `<span class="text-4 mx-1.5">&bull;</span>`;
//
//   const header = LX.modHead({
//     title: 'Reputation',
//     sub: R.reviews.length + ' new reviews across Google, Yelp, Facebook and Trustpilot - ' + window.AGENCY.period + ', month to date. Praise publishes automatically, anything three stars or below is held for sign-off.',
//     stats: [
//       { k: 'Avg rating', v: k.avgRating.toFixed(1), delta: k.avgRatingDelta, deltaUnit: '' },
//       { k: 'New reviews MTD', v: k.newReviewsMtd.toLocaleString(), delta: k.newReviewsDelta, deltaUnit: '%' },
//       { k: 'Response rate', v: k.responseRate + '%', delta: k.responseRateDelta, deltaUnit: 'pt' },
//       { k: 'Avg response', v: k.avgResponseHrs + 'h', delta: k.avgResponseDelta, deltaUnit: 'h' },
//       { k: 'Negative open', v: `<span class="${k.negativeOpen ? 'text-red' : ''}">${k.negativeOpen}</span>`, deltaUnit: '' },
//     ],
//     actions: `
//       ${UI.btn('Request reviews', { variant: 'secondary', size: 'sm', icon: 'send' }).replace('<button', `<button data-action="navigate" data-route="reputation.requests"`)}
//       ${UI.btn('Open reviews', { variant: 'primary', size: 'sm', icon: 'message-square-text' }).replace('<button', `<button data-action="navigate" data-route="reputation.inbox"`)}`,
//   });
//
//   // Panel 1 - rating trend chart
//   const trendPanel = LX.panel({
//     title: 'Rating trend',
//     actions: `<div class="flex items-center gap-3 text-[10.5px]">
//         <span class="flex items-center gap-1.5 text-2"><span class="size-2 rounded-full" style="background:var(--acc)"></span>Blended star avg</span>
//         <span class="delta delta-up num">&uarr; 0.18 since Wk1</span>
//         <span class="text-3 num">12 weeks</span>
//       </div>`,
//     body: `<div style="height:212px"><canvas id="rep-trend-chart" height="212"></canvas></div>`,
//   });
//
//   // Panel 2 - platform breakdown (dense bars)
//   const platMax = Math.max(...R.platforms.map(p => p.reviews));
//   const platRows = R.platforms.map(p => `
//     <div class="flex items-center gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
//       <div class="w-[92px] shrink-0 flex items-center gap-2">
//         <span class="size-2 rounded-full shrink-0" style="background:${p.color}"></span>
//         <span class="text-[12px] text-1 font-medium truncate">${p.label}</span>
//       </div>
//       <div class="flex-1">${LX.bar(p.reviews / platMax * 100, p.color)}</div>
//       <div class="w-12 text-right num text-[12px] text-1">${p.rating.toFixed(1)}</div>
//       <div class="w-14 text-right num text-[11px] text-2">${p.reviews.toLocaleString()}</div>
//       <div class="w-10 text-right num text-[11px] text-3">${p.share}%</div>
//     </div>`).join('');
//   const platformPanel = LX.panel({
//     title: 'By platform',
//     actions: `<span class="text-[10.5px] text-3 num">${R.platforms.reduce((s, p) => s + p.reviews, 0).toLocaleString()} reviews</span>`,
//     bare: true,
//     body: `<div class="flex items-center gap-3 px-3.5 py-2 text-[9.5px] uppercase tracking-wide text-4" style="border-bottom:1px solid var(--line-1)">
//         <div class="w-[92px] shrink-0">Platform</div><div class="flex-1">Review share</div>
//         <div class="w-12 text-right">Rating</div><div class="w-14 text-right">Reviews</div><div class="w-10 text-right">Vol</div>
//       </div>${platRows}`,
//   });
//
//   // Panel 3 - sentiment donut
//   const sent = R.sentiment;
//   const sentTotal = sent.positive + sent.neutral + sent.negative;
//   const donutPanel = LX.panel({
//     title: 'Sentiment',
//     actions: `<span class="text-[10.5px] text-3 num">${sentTotal.toLocaleString()} this month</span>`,
//     body: `<div class="flex items-center gap-5">
//         <div class="relative shrink-0">
//           ${UI.donut({ segments: [
//             { value: sent.positive, color: '#10b981' },
//             { value: sent.neutral,  color: '#f59e0b' },
//             { value: sent.negative, color: '#f43f5e' },
//           ], size: 116, thickness: 13 })}
//           <div class="absolute inset-0 flex flex-col items-center justify-center">
//             <div class="text-[19px] font-semibold num text-1 leading-none">${Math.round(sent.positive / sentTotal * 100)}%</div>
//             <div class="text-[10px] text-3 mt-0.5">positive</div>
//           </div>
//         </div>
//         <div class="flex-1">
//           ${UI.legend([
//             { color: '#10b981', label: 'Positive', value: sent.positive },
//             { color: '#f59e0b', label: 'Neutral',  value: sent.neutral },
//             { color: '#f43f5e', label: 'Negative', value: sent.negative },
//           ])}
//         </div>
//       </div>`,
//   });
//
//   // Panel 4 - recent reviews mini-list
//   const miniRows = R.reviews.slice(0, 8).map(r => {
//     const c = window.getClient(r.client);
//     const stateChip = r.state === 'auto'
//       ? `<span class="tag tag-acc" style="font-size:9px;padding:0 6px">Auto</span>`
//       : r.state === 'replied'
//         ? `<span class="tag tag-slate" style="font-size:9px;padding:0 6px">Replied</span>`
//         : `<span class="tag tag-red" style="font-size:9px;padding:0 6px">Hold</span>`;
//     return `<div class="flex items-start gap-2.5 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)"
//         data-action="detail" data-title="${H.esc(r.author)}" data-sub="${H.esc(c ? c.name : r.client)} - ${H.platLabel(r.platform)}"
//         data-kv='[["Rating","${r.stars} stars"],["Sentiment","${H.cap(r.sentiment)}"],["Client","${H.esc(c ? c.name : r.client)}"],["State","${r.state}"]]'>
//       ${H.cdot(r.client, 7)}
//       <div class="flex-1 min-w-0">
//         <div class="flex items-center gap-1.5 mb-0.5">
//           <span class="text-[12px] text-1 font-medium truncate">${r.author}</span>
//           ${H.stars(r.stars, '3')}
//           <span class="text-[10px] text-4 num ml-auto shrink-0">${window.shortDate(window.daysAgo(r.days))}</span>
//         </div>
//         <div class="rv-snippet">${r.text}</div>
//         <div class="flex items-center gap-1.5 mt-1">
//           <span class="text-[10px] text-3">${c ? c.name : r.client}</span>
//           <span class="text-[9px] text-4">/</span>
//           <span class="text-[10px] text-3">${H.platLabel(r.platform)}</span>
//           <span class="ml-auto">${stateChip}</span>
//         </div>
//       </div>
//     </div>`;
//   }).join('');
//   const recentPanel = LX.panel({
//     title: 'Recent reviews',
//     actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="reputation.inbox">All reviews &rarr;</button>`,
//     bare: true,
//     body: miniRows,
//   });
//
//   // Panel 5 - awaiting approval (the one quiet agent affordance)
//   const pending = R.reviews.filter(r => r.state === 'pending');
//   const pendRows = pending.slice(0, 4).map(r => {
//     const c = window.getClient(r.client);
//     return `<div class="px-3.5 py-3" style="border-top:1px solid var(--line-1)"
//         data-action="detail" data-title="${H.esc(r.author)}" data-sub="${H.esc(c ? c.name : r.client)} - ${H.platLabel(r.platform)}"
//         data-kv='[["Rating","${r.stars} stars"],["Reply within","${r.slaHrs || 8}h"],["Client","${H.esc(c ? c.name : r.client)}"]]'>
//       <div class="flex items-start gap-2.5">
//         <div class="size-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style="background:var(--bg-3)">
//           <i data-lucide="message-square-warning" class="size-3 text-red"></i>
//         </div>
//         <div class="flex-1 min-w-0">
//           <div class="flex items-center gap-1.5">
//             <span class="text-[12px] font-medium text-1 truncate">${r.author}</span>
//             ${H.stars(r.stars, '3')}
//           </div>
//           <div class="flex items-center gap-1.5 mt-0.5">
//             ${H.cdot(r.client, 6)}
//             <span class="text-[10.5px] text-3">${c ? c.name : r.client}</span>
//             <span class="text-[10px] text-red ml-auto flex items-center gap-1"><i data-lucide="clock" class="size-3"></i>within <span class="num">${r.slaHrs || 8}h</span></span>
//           </div>
//           <div class="text-[11px] text-2 leading-snug mt-1.5" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${r.reply}</div>
//           <div class="flex items-center gap-1 mt-2" onclick="event.stopPropagation()">
//             <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Published to ${H.platLabel(r.platform)}" data-dismiss="1"><span>Approve</span></button>
//             <button class="btn btn-ghost btn-sm" data-action="navigate" data-route="reputation.inbox"><span>Open</span></button>
//           </div>
//         </div>
//       </div>`;
//   }).join('');
//   const pendingPanel = `
//     <div class="panel" style="box-shadow:inset 0 0 0 1px var(--line-1);border-top:2px solid var(--acc)">
//       <div class="panel-head">
//         <div class="flex items-center gap-2 min-w-0">
//           <i data-lucide="shield-check" class="size-3.5 text-acc-bright shrink-0"></i>
//           <div class="panel-title truncate">Replies awaiting approval</div>
//           <span class="status status-red text-[10px]">${pending.length}</span>
//         </div>
//         <button class="text-[11px] text-acc-bright font-medium" data-action="navigate" data-route="reputation.inbox">Review all &rarr;</button>
//       </div>
//       <div>${pendRows}</div>
//       <div class="px-3.5 py-2.5 text-[10.5px] text-3" style="border-top:1px solid var(--line-1)">Drafted in the brand voice, held before they go live. Approve, edit, or open the full thread.</div>
//     </div>`;
//
//   return `${header}${H.subNav('reputation')}
//     <div class="grid grid-cols-12 gap-3.5">
//       <div class="col-span-12 lg:col-span-8 flex flex-col gap-3.5">
//         ${trendPanel}
//         <div class="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
//           ${platformPanel}
//           ${donutPanel}
//         </div>
//         ${recentPanel}
//       </div>
//       <div class="col-span-12 lg:col-span-4 flex flex-col gap-3.5">
//         ${pendingPanel}
//       </div>
//     </div>`;
// };
//
// window.PAGES_AFTER.reputation = function () {
//   const t = window.REPUTATION.trend;
//   CHARTS.line('rep-trend-chart', t.labels, [
//     { label: 'Avg rating', data: t.rating, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.10)' },
//   ], {
//     plugins: { legend: { display: false } },
//     scales: {
//       x: { grid: { display: false }, ticks: { padding: 6, font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 12 }, border: { display: false } },
//       y: { min: 4.2, max: 4.8, grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false }, ticks: { padding: 8, font: { size: 10 }, callback: (v) => v.toFixed(1) }, border: { display: false } },
//     },
//   });
// };
//
//
// /* ====================================================================
//    2. REVIEWS  ::  SPLIT INBOX  (review list | response editor)
//    ==================================================================== */
// window.PAGES['reputation.inbox'] = function () {
//   const R = window.REPUTATION;
//   const H = window.REP_H;
//   const pendingCount = R.reviews.filter(r => r.state === 'pending').length;
//
//   // --- RAIL: review list ---
//   const railRow = (r, first) => {
//     const c = window.getClient(r.client);
//     const stateChip = r.state === 'auto'
//       ? `<span class="tag tag-acc" style="font-size:9px;padding:0 5px">Auto</span>`
//       : r.state === 'replied'
//         ? `<span class="tag tag-slate" style="font-size:9px;padding:0 5px">Replied</span>`
//         : `<span class="tag tag-red" style="font-size:9px;padding:0 5px">Needs approval</span>`;
//     return `
//       <div class="rv-row ${first ? 'active' : ''}" data-tab="${r.id}">
//         <div class="flex items-start gap-2.5">
//           <div class="shrink-0 flex flex-col items-center gap-1 pt-0.5" style="width:22px">
//             <span class="size-2 rounded-full" style="background:${H.platColor(r.platform)}"></span>
//             ${H.cdot(r.client, 7)}
//           </div>
//           <div class="flex-1 min-w-0">
//             <div class="flex items-center gap-1.5 mb-0.5">
//               ${H.sentDot(r.sentiment)}
//               <span class="text-[12px] font-medium text-1 truncate">${r.author}</span>
//               <span class="text-[10px] text-4 num ml-auto shrink-0">${window.shortDate(window.daysAgo(r.days))}</span>
//             </div>
//             <div class="flex items-center gap-1.5 mb-1">
//               ${H.stars(r.stars, '3')}
//               <span class="text-[10px] text-3 truncate">${c ? c.name : r.client}</span>
//             </div>
//             <div class="rv-snippet">${r.text}</div>
//             <div class="mt-1">${stateChip}</div>
//           </div>
//         </div>
//       </div>`;
//   };
//
//   const rail = `
//     <div style="padding:11px 13px; border-bottom:1px solid var(--line-1); position:sticky; top:0; background:var(--bg-1); z-index:2;">
//       ${LX.segmented([
//         { id: 'all',     label: 'All ' + R.reviews.length },
//         { id: 'pending', label: 'Needs approval ' + pendingCount },
//         { id: 'neg',     label: 'Negative' },
//       ], 'all')}
//     </div>
//     ${R.reviews.map((r, i) => railRow(r, i === 0)).join('')}`;
//
//   // --- MAIN: review + response editor per review ---
//   const editorPane = (r, first) => {
//     const c = window.getClient(r.client);
//     const cName = c ? c.name : r.client;
//     const cColor = H.clientColor(r.client);
//     const tier = r.stars >= 4
//       ? { label: 'Auto-publish', cls: 'status-green', note: 'Praise (4-5 stars) publishes automatically in the brand voice.' }
//       : r.stars === 3
//         ? { label: 'Light review', cls: 'status-amber', note: 'Neutral (3 stars) gets a quick glance before it goes live.' }
//         : { label: 'Needs approval', cls: 'status-red', note: 'Negative (1-2 stars) is held for owner sign-off before publishing.' };
//     const published = r.state === 'auto' || r.state === 'replied';
//
//     const actionRow = published
//       ? `<div class="flex items-center gap-1.5">
//            <span class="status status-green text-[11px]">${r.state === 'auto' ? 'Published automatically' : 'Reply sent by ' + (c ? (c.am || 'your team') : 'your team')}</span>
//            <div class="ml-auto flex items-center gap-1.5">
//              ${UI.btn('Edit reply', { variant: 'secondary', size: 'sm', icon: 'pencil' })}
//            </div>
//          </div>`
//       : `<div class="flex items-center gap-1.5">
//            ${UI.btn('Approve & publish', { variant: 'primary', size: 'sm', icon: 'check' }).replace('<button', `<button data-action="confirm" data-toast="Published to ${H.platLabel(r.platform)}"`)}
//            ${UI.btn('Edit', { variant: 'secondary', size: 'sm', icon: 'pencil' })}
//            <div class="ml-auto"><button class="btn btn-ghost btn-sm" data-action="dismiss"><span>Dismiss</span></button></div>
//          </div>`;
//
//     return `
//       <div data-pane="${r.id}" class="${first ? '' : 'hidden'}" style="display:flex; flex-direction:column; height:100%;">
//         <div style="padding:13px 22px; border-bottom:1px solid var(--line-1); flex-shrink:0;">
//           <div class="flex items-center gap-2.5">
//             ${UI.avatar(r.author, cColor, 30)}
//             <div class="min-w-0">
//               <div class="text-[13px] font-medium text-1 flex items-center gap-1.5">${r.author} ${H.sentDot(r.sentiment)}</div>
//               <div class="text-[11px] text-3 flex items-center gap-1.5"><span class="size-2 rounded-full" style="background:${H.platColor(r.platform)}"></span>${H.platLabel(r.platform)}<span class="text-4">&middot;</span>${cName}</div>
//             </div>
//             <div class="ml-auto flex items-center gap-1.5 shrink-0">
//               ${H.stars(r.stars, '3.5')}
//               ${!published ? `<span class="text-[10.5px] text-red flex items-center gap-1 ml-1"><i data-lucide="clock" class="size-3"></i>within <span class="num">${r.slaHrs || 8}h</span></span>` : ''}
//             </div>
//           </div>
//         </div>
//
//         <div style="flex:1; overflow-y:auto; padding:20px 26px;">
//           <div class="rounded-lg p-4 mb-4" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)">
//             <div class="flex items-center gap-2 mb-2">
//               <span class="eyebrow">${H.cap(r.sentiment)} review</span>
//               <span class="text-[10px] text-4 num">${window.shortDate(window.daysAgo(r.days))}</span>
//             </div>
//             <div class="text-[13px] text-1 leading-relaxed">${r.text}</div>
//           </div>
//
//           <div class="flex items-center gap-2 mb-2.5">
//             <span class="status ${tier.cls} text-[11px]">${tier.label}</span>
//             <span class="text-[10.5px] text-3">${tier.note}</span>
//           </div>
//         </div>
//
//         <div style="padding:13px 22px; border-top:1px solid var(--line-1); flex-shrink:0;">
//           <div class="rounded-lg p-3 mb-2.5" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px ${published ? 'var(--line-1)' : 'var(--acc-line)'}">
//             <div class="flex items-center gap-1.5 mb-1.5">
//               <i data-lucide="${published ? 'check-circle-2' : 'pencil-line'}" class="size-3 ${published ? 'text-acc' : 'text-acc-bright'}"></i>
//               <span class="eyebrow ${published ? '' : 'text-acc'}">${published ? 'Published reply' : 'Suggested reply'}</span>
//               <span class="text-[10px] text-3 num ml-auto">${r.reply.length} chars</span>
//             </div>
//             <div class="text-[12.5px] text-2 leading-relaxed" contenteditable="false">${r.reply}</div>
//           </div>
//           ${actionRow}
//         </div>
//       </div>`;
//   };
//
//   const main = R.reviews.map((r, i) => editorPane(r, i === 0)).join('');
//
//   const header = `
//     <div class="rep-head">
//       ${LX.modHead({
//         title: 'Reviews',
//         sub: 'Every review across platforms in one queue, each with a suggested response ready to approve. Praise auto-publishes, negatives are held for sign-off.',
//         stats: [
//           { k: 'Open', v: R.reviews.length, deltaUnit: '' },
//           { k: 'Needs approval', v: `<span class="text-red">${pendingCount}</span>`, deltaUnit: '' },
//           { k: 'Auto-published', v: R.reviews.filter(r => r.state === 'auto').length, deltaUnit: '' },
//           { k: 'Avg response', v: R.kpis.avgResponseHrs + 'h', deltaUnit: '' },
//         ],
//         actions: `${UI.btn('Filter', { variant: 'secondary', size: 'sm', icon: 'sliders-horizontal' }).replace('<button', `<button data-action="menu" data-menu='["All platforms","Google","Yelp","Facebook","Trustpilot"]'`)}`,
//       })}
//     </div>`;
//
//   return `
//     ${H.styles}
//     <div class="rep-shell">
//       ${header}
//       <div data-tabwrap style="flex:1; min-height:0;">
//         ${LX.workspace({ cols: '380px 1fr', rail, main })}
//       </div>
//     </div>`;
// };
//
//
// /* ====================================================================
//    3. REQUESTS  ::  DENSE LIST  (campaigns + builder panel)
//    ==================================================================== */
// window.PAGES['reputation.requests'] = function () {
//   const R = window.REPUTATION;
//   const H = window.REP_H;
//
//   const totalSent = R.requests.reduce((s, q) => s + q.sent, 0);
//   const totalDone = R.requests.reduce((s, q) => s + q.completed, 0);
//   const active = R.requests.filter(q => q.status === 'active').length;
//   const blended = (totalDone / totalSent * 100);
//
//   const statusDot = (s) => s === 'active' ? 'green' : s === 'paused' ? 'amber' : 'slate';
//
//   const header = LX.modHead({
//     title: 'Review requests',
//     sub: R.requests.length + ' outbound campaigns across SMS and email - ' + active + ' active, ' + totalDone.toLocaleString() + ' reviews captured this cycle.',
//     stats: [
//       { k: 'Requests sent', v: totalSent.toLocaleString() },
//       { k: 'Completed', v: totalDone.toLocaleString() },
//       { k: 'Blended conversion', v: blended.toFixed(1) + '%' },
//       { k: 'Active', v: active + ' / ' + R.requests.length },
//     ],
//     actions: `${UI.btn('Export', { variant: 'secondary', size: 'sm', icon: 'download' })}
//       ${UI.btn('New campaign', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="New review request campaign"`)}`,
//   });
//
//   const list = LX.dataList({
//     columns: [
//       { key: 'name', label: 'Campaign', render: (q) => `
//         <div class="flex items-center gap-2.5">
//           <span class="status status-${statusDot(q.status)}" title="${H.cap(q.status)}"></span>
//           <div class="min-w-0">
//             <div class="text-[12.5px] text-1 font-medium truncate" style="max-width:200px">${q.name}</div>
//             <div class="text-[10.5px] text-3 truncate">${q.trigger}</div>
//           </div>
//         </div>` },
//       { key: 'client', label: 'Client', render: (q) => H.clientCell(q.client) },
//       { key: 'channel', label: 'Channel', render: (q) => q.channel === 'sms'
//           ? `<span class="tag tag-slate" style="font-size:10px;padding:1px 7px"><i data-lucide="message-square" class="size-3"></i>SMS</span>`
//           : `<span class="tag tag-slate" style="font-size:10px;padding:1px 7px"><i data-lucide="mail" class="size-3"></i>Email</span>` },
//       { key: 'sent', label: 'Sent', align: 'r', mono: true, render: (q) => `<span class="text-1">${q.sent.toLocaleString()}</span>` },
//       { key: 'completed', label: 'Completed', align: 'r', mono: true, render: (q) => `<span class="text-2">${q.completed.toLocaleString()}</span>` },
//       { key: 'conversion', label: 'Conversion', align: 'r', width: '160px', render: (q) => {
//           const col = q.conversion >= 40 ? 'var(--acc)' : q.conversion >= 30 ? 'var(--amber)' : 'var(--text-3)';
//           return `<div class="flex items-center gap-2 justify-end">
//             <div style="width:78px">${LX.bar(q.conversion / 50 * 100, col)}</div>
//             <span class="num text-[11px] w-11 text-right" style="color:${col}">${q.conversion.toFixed(1)}%</span></div>`;
//         } },
//       { key: 'status', label: 'Status', align: 'r', render: (q) => `<span class="status status-${statusDot(q.status)}">${H.cap(q.status)}</span>` },
//     ],
//     rows: R.requests,
//     rowAttrs: (q) => `data-action="detail" data-title="${H.esc(q.name)}" data-sub="${H.esc(H.clientName(q.client))} - ${q.channel.toUpperCase()}" data-kv='[["Client","${H.esc(H.clientName(q.client))}"],["Trigger","${H.esc(q.trigger)}"],["Channel","${q.channel.toUpperCase()}"],["Sent","${q.sent.toLocaleString()}"],["Completed","${q.completed.toLocaleString()}"],["Conversion","${q.conversion.toFixed(1)}%"],["Status","${H.cap(q.status)}"]]'`,
//   });
//
//   // request-builder panel
//   const cb = R.campaignBuilder;
//   const cbName = H.clientName(cb.client);
//   const stepChip = (icon, label, value) => `
//     <div class="flex-1 min-w-0 rounded-lg p-3" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)">
//       <div class="flex items-center gap-1.5 mb-1.5">
//         <i data-lucide="${icon}" class="size-3 text-3"></i>
//         <span class="eyebrow">${label}</span>
//       </div>
//       <div class="text-[12px] text-1 font-medium leading-snug">${value}</div>
//     </div>`;
//   const builder = LX.panel({
//     title: 'Request builder',
//     actions: `<span class="tag tag-slate" style="font-size:10px;padding:1px 7px">Draft</span>
//       <span class="text-[11px] text-3 flex items-center gap-1.5 ml-1">${H.cdot(cb.client, 6)}${cbName}</span>`,
//     body: `
//       <div class="flex items-stretch gap-2 mb-4">
//         ${stepChip('zap', 'Trigger', cb.trigger)}
//         <div class="flex items-center text-4">&rarr;</div>
//         ${stepChip(cb.channel === 'sms' ? 'message-square' : 'mail', 'Channel', cb.channel.toUpperCase())}
//         <div class="flex items-center text-4">&rarr;</div>
//         ${stepChip('clock', 'Delay', cb.delayLabel)}
//       </div>
//       <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
//         <div class="rounded-lg p-3" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)">
//           <div class="eyebrow mb-1.5">Message template</div>
//           <div class="text-[12.5px] text-2 leading-relaxed">${cb.message}</div>
//         </div>
//         <div class="rounded-lg p-3" style="background:var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1)">
//           <div class="eyebrow mb-1.5">Recommended send window</div>
//           <div class="text-[12px] text-2 leading-relaxed">${cb.sendWindow}. <span class="text-3">${cb.sendWindowReason}.</span></div>
//           <div class="text-[11px] text-3 mt-2 leading-relaxed">Audience: <span class="text-2">${cb.audience}</span></div>
//         </div>
//       </div>
//       <div class="flex items-center gap-3">
//         <span class="text-[11px] text-3 flex items-center">est. reach <span class="num text-1 mx-1">${cb.estReach}</span>&bull;<span class="num text-acc-bright mx-1">~${cb.estReviews}</span> new reviews</span>
//         <div class="ml-auto flex items-center gap-1.5">
//           ${UI.btn('Edit', { variant: 'secondary', size: 'sm', icon: 'pencil' })}
//           ${UI.btn('Approve & launch', { variant: 'primary', size: 'sm', icon: 'rocket' }).replace('<button', `<button data-action="confirm" data-toast="Campaign launched: ${cb.estReach} SMS queued"`)}
//         </div>
//       </div>`,
//   });
//
//   return `${header}${H.subNav('reputation.requests')}
//     <div class="mb-4">${list}</div>
//     ${builder}`;
// };
//
//
// /* ====================================================================
//    4. LISTINGS  ::  DENSE LIST  (NAP accuracy, full-bleed)
//    ==================================================================== */
// window.PAGES['reputation.listings'] = function () {
//   const R = window.REPUTATION;
//   const H = window.REP_H;
//
//   const consistent = R.listings.filter(l => l.napStatus === 'consistent').length;
//   const mismatch = R.listings.filter(l => l.napStatus === 'mismatch').length;
//   const missing = R.listings.filter(l => l.napStatus === 'missing').length;
//   const avgComplete = Math.round(R.listings.reduce((s, l) => s + l.completeness, 0) / R.listings.length);
//
//   const napTag = (s) => s === 'consistent'
//     ? `<span class="tag tag-acc" style="font-size:10px;padding:1px 7px">Consistent</span>`
//     : s === 'mismatch'
//       ? `<span class="tag tag-amber" style="font-size:10px;padding:1px 7px">Mismatch</span>`
//       : `<span class="tag tag-red" style="font-size:10px;padding:1px 7px">Missing</span>`;
//
//   const header = `<div class="px-7 pt-7 pb-0">
//     ${LX.modHead({
//       title: 'Listings accuracy',
//       sub: R.listings.length + ' location listings across Google, Apple, Bing and the review platforms - ' + (mismatch + missing) + ' need attention.',
//       stats: [
//         { k: 'Listings', v: R.listings.length },
//         { k: 'Consistent', v: `<span class="text-acc">${consistent}</span>` },
//         { k: 'Mismatch', v: `<span class="text-amber">${mismatch}</span>` },
//         { k: 'Missing', v: `<span class="text-red">${missing}</span>` },
//         { k: 'Avg completeness', v: avgComplete + '%' },
//       ],
//       actions: `${UI.btn('Sync now', { variant: 'secondary', size: 'sm', icon: 'refresh-cw' }).replace('<button', `<button data-action="confirm" data-toast="Listing sync queued across all platforms"`)}
//         ${UI.btn('Fix all mismatches', { variant: 'primary', size: 'sm', icon: 'wand-2' }).replace('<button', `<button data-action="confirm" data-toast="${mismatch} listing fixes pushed for approval"`)}`,
//     })}
//     ${H.subNav('reputation.listings')}
//     <div class="toolbar" style="margin-bottom:0">
//       ${UI.searchInput('Search locations', 'w-72')}
//       ${LX.segmented([
//         { id: 'all',        label: 'All' },
//         { id: 'consistent', label: 'Consistent' },
//         { id: 'mismatch',   label: 'Mismatch' },
//         { id: 'missing',    label: 'Missing' },
//       ])}
//       <div class="grow"></div>
//       ${UI.btn('Platform', { variant: 'ghost', size: 'sm', icon: 'filter' }).replace('<button', `<button data-action="menu" data-menu='["All platforms","Google","Apple Maps","Bing","Yelp","Facebook"]'`)}
//     </div></div>`;
//
//   function rowsFor(filter) {
//     return R.listings.filter(l => filter === 'all' ? true : l.napStatus === filter);
//   }
//   function listFor(filter) {
//     return LX.dataList({
//       columns: [
//         { key: 'location', label: 'Location', render: (l) => `
//           <div class="flex items-center gap-2.5">
//             ${l.napStatus === 'consistent'
//               ? `<i data-lucide="map-pin" class="size-3 text-3 shrink-0"></i>`
//               : `<i data-lucide="triangle-alert" class="size-3 ${l.napStatus === 'missing' ? 'text-red' : 'text-amber'} shrink-0"></i>`}
//             <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:220px">${l.location}</span>
//           </div>` },
//         { key: 'client', label: 'Client', render: (l) => H.clientCell(l.client) },
//         { key: 'platform', label: 'Platform', render: (l) => {
//             const p = H.lp(l.platform);
//             return `<span class="flex items-center gap-1.5"><i data-lucide="${p.icon}" class="size-3" style="color:${p.color}"></i><span class="text-[12px] text-2">${p.label}</span></span>`;
//           } },
//         { key: 'napStatus', label: 'NAP status', render: (l) => napTag(l.napStatus) },
//         { key: 'completeness', label: 'Completeness', align: 'r', width: '150px', render: (l) => {
//             const col = l.completeness >= 95 ? 'var(--acc)' : l.completeness >= 75 ? 'var(--amber)' : 'var(--red)';
//             return `<div class="flex items-center gap-2 justify-end">
//               <div style="width:70px">${LX.bar(l.completeness, col)}</div>
//               <span class="num text-[11px] w-9 text-right" style="color:${col}">${l.completeness}%</span></div>`;
//           } },
//         { key: 'issue', label: 'Issue', render: (l) => l.issue
//             ? `<span class="text-[11.5px] text-3 truncate" style="display:inline-block;max-width:260px">${l.issue}</span>`
//             : `<span class="text-4 text-[11px]">-</span>` },
//         { key: 'days', label: 'Last updated', align: 'r', mono: true, render: (l) => l.napStatus === 'missing'
//             ? `<span class="text-red text-[11px]">never</span>`
//             : `<span class="text-3 text-[11px]">${window.shortDate(window.daysAgo(l.days))}</span>` },
//         { key: 'action', label: '', align: 'r', width: '130px', render: (l) => l.napStatus === 'consistent'
//             ? `<span class="text-4 text-[11px]">-</span>`
//             : `<div class="flex items-center justify-end" onclick="event.stopPropagation()">
//                 <button class="btn btn-secondary btn-sm" data-action="confirm" data-toast="${l.napStatus === 'missing' ? 'Listing claim queued' : 'Fix pushed for approval'}"><span>${l.napStatus === 'missing' ? 'Claim' : 'Fix'}</span></button>
//               </div>` },
//       ],
//       rows: rowsFor(filter),
//       rowAttrs: (l) => `data-action="detail" data-title="${H.esc(l.location)}" data-sub="${H.esc(H.clientName(l.client))} - ${H.lp(l.platform).label}" data-kv='[["Client","${H.esc(H.clientName(l.client))}"],["Platform","${H.lp(l.platform).label}"],["NAP status","${H.cap(l.napStatus)}"],["Completeness","${l.completeness}%"],["Issue","${H.esc(l.issue || 'None')}"]]'`,
//     });
//   }
//
//   const panes = ['all', 'consistent', 'mismatch', 'missing'].map((f, i) =>
//     `<div data-pane="${f}" class="${i === 0 ? '' : 'hidden'}">${listFor(f)}</div>`).join('');
//
//   return `<div class="flex flex-col" style="height:calc(100vh - 44px)">
//     <div data-tabwrap class="flex flex-col min-h-0 flex-1">
//       ${header}
//       <div class="flex-1 overflow-auto" style="margin-top:10px">${panes}</div>
//     </div>
//   </div>`;
// };
//
//
// /* ====================================================================
//    5. COMPETITORS  ::  COMPARE TABLE  (client vs local rivals)
//    ==================================================================== */
// window.PAGES['reputation.competitors'] = function () {
//   const R = window.REPUTATION;
//   const H = window.REP_H;
//
//   // portfolio-wide quick stats
//   const usWins = R.benchmark.filter(b => {
//     const us = b.set.find(s => s.isUs);
//     return us && us.rating === Math.max(...b.set.map(s => s.rating));
//   }).length;
//   const totalRivals = R.benchmark.reduce((s, b) => s + (b.set.length - 1), 0);
//
//   const header = LX.modHead({
//     title: 'Competitor benchmark',
//     sub: 'Each client measured against its named local rivals on rating, review count, velocity, response rate and sentiment.',
//     stats: [
//       { k: 'Client sets', v: R.benchmark.length },
//       { k: 'Rivals tracked', v: totalRivals },
//       { k: 'Rating leader', v: usWins + ' / ' + R.benchmark.length },
//       { k: 'Avg response edge', v: '+31pt' },
//     ],
//     actions: `${UI.btn('Add competitor', { variant: 'secondary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="Track a competitor"`)}
//       ${UI.btn('Export benchmark', { variant: 'primary', size: 'sm', icon: 'download' })}`,
//   });
//
//   const compareTable = (b) => {
//     const c = window.getClient(b.client);
//     const us = b.set.find(s => s.isUs) || b.set[0];
//     const fieldMax = (key) => Math.max(...b.set.map(s => s[key]));
//     const fieldMin = (key) => Math.min(...b.set.map(s => s[key]));
//
//     // best column highlighting: higher is better for all except none here
//     const cell = (s, key, fmt, betterMax = true) => {
//       const best = betterMax ? s[key] === fieldMax(key) : s[key] === fieldMin(key);
//       const cls = s.isUs
//         ? (best ? 'text-acc-bright font-semibold' : 'text-1 font-medium')
//         : (best ? 'text-2 font-medium' : 'text-3');
//       return `<span class="num text-[12.5px] ${cls}">${fmt(s[key])}</span>`;
//     };
//     const barCell = (s, key, fmt, maxScale) => {
//       const best = s[key] === fieldMax(key);
//       const col = s.isUs ? 'var(--acc)' : best ? 'var(--text-2)' : 'var(--text-4)';
//       return `<div class="flex items-center gap-2 justify-end">
//         <div style="width:54px">${LX.bar(s[key] / maxScale * 100, col)}</div>
//         <span class="num text-[12px] w-9 text-right ${s.isUs ? 'text-acc-bright font-semibold' : best ? 'text-2' : 'text-3'}">${fmt(s[key])}</span></div>`;
//     };
//
//     const rows = b.set.map(s => `
//       <tr ${s.isUs ? 'style="background:var(--acc-soft)"' : ''}>
//         <td>
//           <div class="flex items-center gap-2">
//             ${s.isUs
//               ? `<i data-lucide="${c ? c.icon : 'building-2'}" class="size-3.5" style="color:${c ? c.logoColor : 'var(--acc)'}"></i>`
//               : `<span class="size-1.5 rounded-full bg-[var(--text-4)] ml-1"></span>`}
//             <span class="${s.isUs ? 'font-semibold text-1' : 'text-2'}">${s.name}</span>
//             ${s.isUs ? UI.tag('You', 'acc') : ''}
//           </div>
//         </td>
//         <td class="r">
//           <span class="inline-flex items-center gap-1.5 justify-end">
//             ${cell(s, 'rating', x => x.toFixed(1))}
//             ${H.stars(Math.round(s.rating), '2.5')}
//           </span>
//         </td>
//         <td class="r">${cell(s, 'reviews', x => x.toLocaleString())}</td>
//         <td class="r">${barCell(s, 'velocity', x => x + '/mo', fieldMax('velocity'))}</td>
//         <td class="r">${barCell(s, 'responseRate', x => x + '%', 100)}</td>
//         <td class="r">${barCell(s, 'sentiment', x => x + '%', 100)}</td>
//       </tr>`).join('');
//
//     return `
//       <div class="surface overflow-hidden mb-4">
//         <div class="px-5 py-3.5 flex items-center justify-between" style="border-bottom:1px solid var(--line-1)">
//           <div class="flex items-center gap-2">
//             <i data-lucide="${c ? c.icon : 'building-2'}" class="size-3.5" style="color:${c ? c.logoColor : 'var(--text-3)'}"></i>
//             <div class="h3">${us.name}</div>
//             <span class="text-[11px] text-3 flex items-center">vs <span class="num mx-1">${b.set.length - 1}</span> local rivals</span>
//           </div>
//           <span class="text-[10.5px] text-3">emerald = your line, bold = category best</span>
//         </div>
//         <table class="table">
//           <thead><tr>
//             <th>Business</th>
//             <th class="r">Rating</th><th class="r">Reviews</th>
//             <th class="r">Velocity</th><th class="r">Response rate</th><th class="r">Sentiment</th>
//           </tr></thead>
//           <tbody>${rows}</tbody>
//         </table>
//       </div>`;
//   };
//
//   return `${header}${H.subNav('reputation.competitors')}
//     ${R.benchmark.map(compareTable).join('')}`;
// };
//