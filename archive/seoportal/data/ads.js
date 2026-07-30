// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Paid Ads macro seed - flagship channel.
//    Cross-platform paid media across the whole book of business.
//    One data file feeds the whole macro: overview, campaigns,
//    creative studio, audiences, budgets & pacing, search terms.
//    Client ids + colors reused from window.CLIENTS:
//      lumen #38bdf8  verdant #10b981  northedge #6366f1
//      peak  #f59e0b  casaverde #a78bfa  atlas #f43f5e
//    Coherent with seed notifications (Verdant TikTok CPA +41%,
//    Peak Meta pacing 82%, Atlas wasted spend on storage terms).
//    ============================================================ */
//
// window.ADS = {
//
//   // ---- Agency-wide June MTD metrics (overview stat rail) ----
//   kpis: {
//     spendMtdUsd: 110480,
//     spendDelta: 8.2,          // % vs May MTD
//     blendedRoas: 4.1,
//     roasDelta: 0.3,           // absolute x vs last month
//     conversions: 1180,
//     convDelta: 11.4,          // %
//     avgCpaUsd: 42,
//     cpaDelta: -4.5,           // % - lower is better, negative is good
//     revenueMtdUsd: 452970,
//     revenueDelta: 9.7,
//     pacingOver: 4,            // campaigns pacing over budget
//     pacingUnder: 2,           // campaigns pacing well under
//     pacingTotal: 19,
//     ctrAvg: 2.4,
//     ctrDelta: 0.2,
//   },
//
//   // ---- Platform breakdown ----
//   platforms: [
//     { id: 'google',    name: 'Google Ads',    icon: 'megaphone', color: '#38bdf8', accounts: 6, spendUsd: 42180, roas: 4.8, conversions: 512, cpaUsd: 38, delta: 6.1,  spark: [8.4, 8.9, 9.2, 9.0, 9.6, 10.1, 10.4] },
//     { id: 'meta',      name: 'Meta Ads',      icon: 'facebook',  color: '#6366f1', accounts: 5, spendUsd: 36940, roas: 3.9, conversions: 418, cpaUsd: 41, delta: 9.4,  spark: [6.9, 7.2, 7.6, 8.1, 8.4, 8.9, 9.3] },
//     { id: 'tiktok',    name: 'TikTok Ads',    icon: 'music',     color: '#a78bfa', accounts: 3, spendUsd: 18620, roas: 2.6, conversions: 146, cpaUsd: 64, delta: -3.8, spark: [5.1, 4.8, 4.6, 4.4, 4.2, 4.0, 3.7] },
//     { id: 'linkedin',  name: 'LinkedIn Ads',  icon: 'linkedin',  color: '#10b981', accounts: 2, spendUsd: 8740,  roas: 5.2, conversions: 64,  cpaUsd: 92, delta: 4.7,  spark: [1.4, 1.6, 1.7, 1.8, 2.0, 2.1, 2.2] },
//     { id: 'microsoft', name: 'Microsoft Ads', icon: 'square',    color: '#f59e0b', accounts: 1, spendUsd: 4000,  roas: 4.4, conversions: 40,  cpaUsd: 49, delta: 2.2,  spark: [0.7, 0.8, 0.8, 0.9, 0.9, 1.0, 1.0] },
//   ],
//
//   // ---- Spend vs return trend (weekly, Apr -> Jun) ----
//   trend: {
//     labels: ['Apr 6', 'Apr 13', 'Apr 20', 'Apr 27', 'May 4', 'May 11', 'May 18', 'May 25', 'Jun 1', 'Jun 8', 'Jun 15', 'Jun 22'],
//     spend:       [21400, 22100, 23050, 22600, 24200, 25100, 24800, 26400, 27200, 28100, 27600, 28900],
//     revenue:     [82400, 86900, 91200, 88600, 99400, 104800, 101200, 110900, 116400, 121600, 119800, 127200],
//     conversions: [232, 244, 258, 251, 272, 286, 281, 304, 318, 332, 326, 348],
//   },
//
//   // ---- Top movers (overview dense mini-list) ----
//   movers: [
//     { name: 'Verdant - Brand Defense',        client: 'verdant',   platform: 'google', metric: 'ROAS', value: '9.1x', dir: 'up',   delta: 18 },
//     { name: 'Lumen - Invisalign DFW',         client: 'lumen',     platform: 'google', metric: 'Conv', value: '118',  dir: 'up',   delta: 14 },
//     { name: 'Casa Verde - Weekend Reservations', client: 'casaverde', platform: 'meta', metric: 'CPA', value: '$19', dir: 'down', delta: -11 },
//     { name: 'Verdant - Summer Glow',          client: 'verdant',   platform: 'tiktok', metric: 'CPA',  value: '$71',  dir: 'up',   delta: 41 },
//     { name: 'Peak - UGC Transformation',      client: 'peak',      platform: 'tiktok', metric: 'ROAS', value: '2.2x', dir: 'down', delta: -9 },
//     { name: 'NorthEdge - ABM Mid-Market',     client: 'northedge', platform: 'linkedin', metric: 'SQL', value: '38', dir: 'up',   delta: 7 },
//   ],
//
//   // ---- Campaign table (16-22 rows across platforms) ----
//   campaigns: [
//     { id: 'c-verdant-tt-glow',       name: 'Verdant - TikTok - Summer Glow Prospecting',  client: 'verdant',   platform: 'tiktok',    status: 'learning', spendUsd: 9240, roas: 1.9, cpaUsd: 71, conversions: 84,  budgetUsd: 8800, pacingPct: 105 },
//     { id: 'c-lumen-search-inv',      name: 'Lumen - Search - Invisalign DFW',             client: 'lumen',     platform: 'google',    status: 'active',   spendUsd: 8120, roas: 6.8, cpaUsd: 34, conversions: 118, budgetUsd: 8400, pacingPct: 97 },
//     { id: 'c-northedge-comp',        name: 'NorthEdge - Search - Competitor Conquesting', client: 'northedge', platform: 'google',    status: 'active',   spendUsd: 7180, roas: 5.6, cpaUsd: 47, conversions: 58,  budgetUsd: 7500, pacingPct: 96 },
//     { id: 'c-verdant-meta-dpa',      name: 'Verdant - Meta - Retargeting + DPA',          client: 'verdant',   platform: 'meta',      status: 'active',   spendUsd: 6840, roas: 4.4, cpaUsd: 36, conversions: 96,  budgetUsd: 6500, pacingPct: 105 },
//     { id: 'c-atlas-pmax-atl',        name: 'Atlas - PMax - Atlanta Storage',              client: 'atlas',     platform: 'google',    status: 'active',   spendUsd: 6420, roas: 3.1, cpaUsd: 39, conversions: 92,  budgetUsd: 6000, pacingPct: 112 },
//     { id: 'c-lumen-pmax-implant',    name: 'Lumen - PMax - Dental Implants Plano',        client: 'lumen',     platform: 'google',    status: 'active',   spendUsd: 5260, roas: 5.9, cpaUsd: 44, conversions: 64,  budgetUsd: 5000, pacingPct: 105 },
//     { id: 'c-northedge-li-abm',      name: 'NorthEdge - LinkedIn - ABM Mid-Market',       client: 'northedge', platform: 'linkedin',  status: 'active',   spendUsd: 5180, roas: 5.2, cpaUsd: 92, conversions: 38,  budgetUsd: 5200, pacingPct: 100 },
//     { id: 'c-peak-meta-trial',       name: 'Peak - Meta - 7-Day Trial Prospecting',       client: 'peak',      platform: 'meta',      status: 'active',   spendUsd: 4980, roas: 4.1, cpaUsd: 28, conversions: 132, budgetUsd: 6000, pacingPct: 82 },
//     { id: 'c-atlas-search-near',     name: 'Atlas - Search - Storage Near Me',            client: 'atlas',     platform: 'google',    status: 'active',   spendUsd: 4180, roas: 2.8, cpaUsd: 46, conversions: 41,  budgetUsd: 4000, pacingPct: 104 },
//     { id: 'c-peak-tt-ugc',           name: 'Peak - TikTok - UGC Transformation',          client: 'peak',      platform: 'tiktok',    status: 'learning', spendUsd: 3120, roas: 2.2, cpaUsd: 58, conversions: 54,  budgetUsd: 3000, pacingPct: 104 },
//     { id: 'c-verdant-google-brand',  name: 'Verdant - Search - Brand Defense',            client: 'verdant',   platform: 'google',    status: 'active',   spendUsd: 2640, roas: 9.1, cpaUsd: 14, conversions: 188, budgetUsd: 3000, pacingPct: 88 },
//     { id: 'c-casaverde-meta-rest',   name: 'Casa Verde - Meta - Weekend Reservations',    client: 'casaverde', platform: 'meta',      status: 'active',   spendUsd: 2380, roas: 5.4, cpaUsd: 19, conversions: 124, budgetUsd: 2500, pacingPct: 95 },
//     { id: 'c-casaverde-google-local',name: 'Casa Verde - Local - Denver Brunch',          client: 'casaverde', platform: 'google',    status: 'active',   spendUsd: 1720, roas: 4.9, cpaUsd: 22, conversions: 78,  budgetUsd: 2000, pacingPct: 86 },
//     { id: 'c-lumen-meta-whiten',     name: 'Lumen - Meta - Whitening Promo',              client: 'lumen',     platform: 'meta',      status: 'active',   spendUsd: 3140, roas: 4.6, cpaUsd: 31, conversions: 101, budgetUsd: 3200, pacingPct: 98 },
//     { id: 'c-peak-google-classes',   name: 'Peak - Search - Group Classes Austin',        client: 'peak',      platform: 'google',    status: 'active',   spendUsd: 2860, roas: 4.3, cpaUsd: 26, conversions: 110, budgetUsd: 3000, pacingPct: 95 },
//     { id: 'c-northedge-ms-search',   name: 'NorthEdge - Microsoft - Brand + Category',    client: 'northedge', platform: 'microsoft', status: 'paused',   spendUsd: 980,  roas: 4.4, cpaUsd: 49, conversions: 20,  budgetUsd: 2500, pacingPct: 39 },
//     { id: 'c-verdant-tt-creator',    name: 'Verdant - TikTok - Creator Spark Ads',        client: 'verdant',   platform: 'tiktok',    status: 'active',   spendUsd: 4210, roas: 3.2, cpaUsd: 52, conversions: 81,  budgetUsd: 4000, pacingPct: 105 },
//     { id: 'c-atlas-meta-climate',    name: 'Atlas - Meta - Climate Units Retargeting',    client: 'atlas',     platform: 'meta',      status: 'active',   spendUsd: 2280, roas: 3.4, cpaUsd: 43, conversions: 53,  budgetUsd: 2400, pacingPct: 95 },
//     { id: 'c-casaverde-tt-foodie',   name: 'Casa Verde - TikTok - Foodie Reach',          client: 'casaverde', platform: 'tiktok',    status: 'learning', spendUsd: 1640, roas: 2.4, cpaUsd: 38, conversions: 43,  budgetUsd: 1800, pacingPct: 91 },
//     { id: 'c-lumen-li-employer',     name: 'Lumen - LinkedIn - Employer Hiring',          client: 'lumen',     platform: 'linkedin',  status: 'paused',   spendUsd: 740,  roas: 0,   cpaUsd: 0,  conversions: 0,   budgetUsd: 1500, pacingPct: 49 },
//     { id: 'c-northedge-google-cat',  name: 'NorthEdge - Search - Category Demand',        client: 'northedge', platform: 'google',    status: 'active',   spendUsd: 3960, roas: 4.9, cpaUsd: 58, conversions: 68,  budgetUsd: 4000, pacingPct: 99 },
//     { id: 'c-peak-meta-winback',     name: 'Peak - Meta - Lapsed Member Winback',         client: 'peak',      platform: 'meta',      status: 'active',   spendUsd: 1980, roas: 6.1, cpaUsd: 21, conversions: 94,  budgetUsd: 2000, pacingPct: 99 },
//   ],
//
//   // ---- Recommendations (proposed paid-media moves) ----
//   optimizations: [
//     { id: 'opt-pause-verdant', icon: 'pause-circle', severity: 'high', client: 'verdant', platform: 'tiktok',
//       title: 'Pause 3 ad sets on Summer Glow Prospecting',
//       detail: 'CPA running 41% over the $50 target across 7 days while the campaign sits in extended learning. Spend is not converting.',
//       impact: 'Reclaims ~$1,240/wk wasted spend', impactDir: 'save', confidence: 94, autoExecutable: true },
//     { id: 'opt-shift-pmax', icon: 'arrow-left-right', severity: 'med', client: 'atlas', platform: 'google',
//       title: 'Shift $1,800/day from Brand to PMax',
//       detail: 'Brand search is saturated at 71% impression share. PMax has headroom at a 3.4x marginal ROAS.',
//       impact: 'Projected +$5,900 revenue/mo', impactDir: 'gain', confidence: 88, autoExecutable: true },
//     { id: 'opt-lookalike', icon: 'users-round', severity: 'low', client: 'verdant', platform: 'meta',
//       title: 'Build a 1% lookalike from 9,400 purchasers',
//       detail: 'Last-90-day purchaser seed is now large enough for a stable 1% lookalike. Recommend a $300/day prospecting ad set with the top 3 creatives.',
//       impact: 'Est. 60-80 incremental purchases/mo', impactDir: 'gain', confidence: 79, autoExecutable: true },
//     { id: 'opt-negatives', icon: 'shield-x', severity: 'med', client: 'atlas', platform: 'google',
//       title: 'Add 14 negative keywords to Storage Near Me',
//       detail: 'Search-term report shows job, free, and pallet intent draining budget with zero conversions over 30 days.',
//       impact: 'Stops $640/mo wasted spend', impactDir: 'save', confidence: 91, autoExecutable: true },
//     { id: 'opt-creative-refresh', icon: 'image-plus', severity: 'med', client: 'peak', platform: 'meta',
//       title: 'Refresh 2 fatiguing creatives on Trial Prospecting',
//       detail: 'Frequency at 4.1 and CTR down 22% over 14 days. 3 new variants are drafted from the top performer and ready to launch.',
//       impact: 'Recover ~0.4x ROAS on the ad set', impactDir: 'gain', confidence: 86, autoExecutable: false },
//   ],
//
//   // ---- Creative studio gallery (10-14 tiles) ----
//   creatives: [
//     { id: 'cr-1',  client: 'verdant',   platform: 'meta',     format: 'Video 9:16',  headline: 'The 14-day glow challenge',          ctr: 2.8, roas: 5.1, spendUsd: 4180, tag: 'top' },
//     { id: 'cr-2',  client: 'lumen',     platform: 'google',   format: 'Responsive',  headline: 'Straighter teeth in 6 months',       ctr: 4.1, roas: 6.9, spendUsd: 3620, tag: 'top' },
//     { id: 'cr-3',  client: 'peak',      platform: 'meta',     format: 'Carousel',    headline: 'Your first 7 days are on us',        ctr: 1.9, roas: 4.2, spendUsd: 2940, tag: null },
//     { id: 'cr-4',  client: 'verdant',   platform: 'tiktok',   format: 'Video 9:16',  headline: 'POV: your skin barrier healed',      ctr: 1.2, roas: 1.8, spendUsd: 3210, tag: 'fatigue' },
//     { id: 'cr-5',  client: 'casaverde', platform: 'meta',     format: 'Static',      headline: 'Brunch is back this weekend',        ctr: 3.3, roas: 5.4, spendUsd: 1860, tag: 'top' },
//     { id: 'cr-6',  client: 'atlas',     platform: 'google',   format: 'Static',      headline: 'First month free - climate units',   ctr: 2.1, roas: 3.1, spendUsd: 2240, tag: null },
//     { id: 'cr-7',  client: 'peak',      platform: 'tiktok',   format: 'Video 9:16',  headline: '30-day transformation, real members',ctr: 1.6, roas: 2.2, spendUsd: 1680, tag: 'fatigue' },
//     { id: 'cr-8',  client: 'northedge', platform: 'linkedin', format: 'Static',      headline: 'Ship projects 30% faster',           ctr: 0.9, roas: 5.2, spendUsd: 1540, tag: null },
//     { id: 'cr-9',  client: 'verdant',   platform: 'tiktok',   format: 'Video 9:16',  headline: 'I tried it for 30 days, here is why', ctr: 3.4, roas: 4.6, spendUsd: 2120, tag: 'top' },
//     { id: 'cr-10', client: 'lumen',     platform: 'meta',     format: 'Carousel',    headline: 'Before and after, real patients',    ctr: 2.6, roas: 4.8, spendUsd: 1980, tag: null },
//     { id: 'cr-11', client: 'casaverde', platform: 'tiktok',   format: 'Video 9:16',  headline: 'The dish everyone is ordering',       ctr: 4.0, roas: 2.4, spendUsd: 1340, tag: null },
//     { id: 'cr-12', client: 'atlas',     platform: 'meta',     format: 'Static',      headline: 'Reserve a unit in 60 seconds',       ctr: 1.4, roas: 3.4, spendUsd: 1120, tag: 'fatigue' },
//     { id: 'cr-13', client: 'peak',      platform: 'meta',     format: 'Static',      headline: 'Bring a friend, both train free',    ctr: 2.9, roas: 6.1, spendUsd: 980,  tag: 'top' },
//     { id: 'cr-14', client: 'northedge', platform: 'linkedin', format: 'Video 16:9',  headline: 'See the platform in 90 seconds',     ctr: 1.1, roas: 4.9, spendUsd: 860,  tag: null },
//   ],
//
//   // ---- Audiences (dense list) ----
//   audiences: [
//     { id: 'aud-1',  name: 'Verdant - 90d Purchasers 1% LAL',     client: 'verdant',   type: 'lookalike', platform: 'meta',     sizeUsers: 2400000, matchRate: 0.71, campaigns: 3, status: 'active' },
//     { id: 'aud-2',  name: 'Lumen - Invisalign Intent',           client: 'lumen',     type: 'interest',  platform: 'google',   sizeUsers: 1850000, matchRate: 0.62, campaigns: 2, status: 'active' },
//     { id: 'aud-3',  name: 'Peak - Lapsed Members 180d',          client: 'peak',      type: 'custom',    platform: 'meta',     sizeUsers: 18400,   matchRate: 0.88, campaigns: 1, status: 'active' },
//     { id: 'aud-4',  name: 'NorthEdge - Target Account List',     client: 'northedge', type: 'custom',    platform: 'linkedin', sizeUsers: 9200,    matchRate: 0.94, campaigns: 1, status: 'active' },
//     { id: 'aud-5',  name: 'Atlas - Site Visitors 30d',           client: 'atlas',     type: 'custom',    platform: 'google',   sizeUsers: 42000,   matchRate: 0.79, campaigns: 2, status: 'active' },
//     { id: 'aud-6',  name: 'Verdant - Skincare Enthusiasts',      client: 'verdant',   type: 'interest',  platform: 'tiktok',   sizeUsers: 5600000, matchRate: 0.55, campaigns: 2, status: 'active' },
//     { id: 'aud-7',  name: 'Casa Verde - Local Foodies 10mi',     client: 'casaverde', type: 'interest',  platform: 'meta',     sizeUsers: 310000,  matchRate: 0.64, campaigns: 2, status: 'active' },
//     { id: 'aud-8',  name: 'Lumen - Cart Abandoners',             client: 'lumen',     type: 'custom',    platform: 'meta',     sizeUsers: 6800,    matchRate: 0.83, campaigns: 1, status: 'active' },
//     { id: 'aud-9',  name: 'Peak - Fitness Lookalike 2%',         client: 'peak',      type: 'lookalike', platform: 'meta',     sizeUsers: 4900000, matchRate: 0.68, campaigns: 1, status: 'building' },
//     { id: 'aud-10', name: 'NorthEdge - Competitor Visitors',     client: 'northedge', type: 'custom',    platform: 'linkedin', sizeUsers: 14200,   matchRate: 0.72, campaigns: 1, status: 'active' },
//     { id: 'aud-11', name: 'Atlas - Movers + Relocation Intent',  client: 'atlas',     type: 'interest',  platform: 'google',   sizeUsers: 980000,  matchRate: 0.58, campaigns: 1, status: 'active' },
//     { id: 'aud-12', name: 'Casa Verde - Reservation Lookalike',  client: 'casaverde', type: 'lookalike', platform: 'meta',     sizeUsers: 1200000, matchRate: 0.66, campaigns: 1, status: 'active' },
//     { id: 'aud-13', name: 'Verdant - Email List Custom',         client: 'verdant',   type: 'custom',    platform: 'tiktok',   sizeUsers: 24000,   matchRate: 0.61, campaigns: 1, status: 'active' },
//     { id: 'aud-14', name: 'Peak - Class Bookers Custom',         client: 'peak',      type: 'custom',    platform: 'google',   sizeUsers: 11800,   matchRate: 0.86, campaigns: 1, status: 'active' },
//     { id: 'aud-15', name: 'Lumen - Whitening Lookalike 1%',      client: 'lumen',     type: 'lookalike', platform: 'meta',     sizeUsers: 2100000, matchRate: 0.70, campaigns: 1, status: 'building' },
//     { id: 'aud-16', name: 'Atlas - Climate Unit Interest',       client: 'atlas',     type: 'interest',  platform: 'meta',     sizeUsers: 740000,  matchRate: 0.52, campaigns: 1, status: 'paused' },
//   ],
//
//   // ---- Per-account budget & pacing ----
//   budgets: [
//     { id: 'bud-verdant',   client: 'verdant',   platform: 'meta',     monthBudgetUsd: 32000, spentUsd: 24600, daysLeft: 4, projectedUsd: 34200 },
//     { id: 'bud-lumen',     client: 'lumen',     platform: 'google',   monthBudgetUsd: 28000, spentUsd: 20100, daysLeft: 4, projectedUsd: 27300 },
//     { id: 'bud-atlas',     client: 'atlas',     platform: 'google',   monthBudgetUsd: 22000, spentUsd: 18900, daysLeft: 4, projectedUsd: 25600 },
//     { id: 'bud-northedge', client: 'northedge', platform: 'linkedin', monthBudgetUsd: 18000, spentUsd: 11200, daysLeft: 4, projectedUsd: 15400 },
//     { id: 'bud-peak',      client: 'peak',      platform: 'meta',     monthBudgetUsd: 16000, spentUsd: 12400, daysLeft: 4, projectedUsd: 16800 },
//     { id: 'bud-casaverde', client: 'casaverde', platform: 'meta',     monthBudgetUsd: 9000,  spentUsd: 6100,  daysLeft: 4, projectedUsd: 8300 },
//   ],
//
//   // ---- Month-to-date pacing chart (cumulative budget vs spent) ----
//   pacingTrend: {
//     labels: ['Jun 1', 'Jun 5', 'Jun 9', 'Jun 13', 'Jun 17', 'Jun 21', 'Jun 25', 'Jun 30'],
//     budget:  [4150, 20750, 37350, 53950, 70550, 87150, 103750, 124500],
//     spent:   [4400, 22100, 39800, 56900, 74600, 92800, 110480, null],
//   },
//
//   // ---- Search terms (dense list) ----
//   searchTerms: [
//     { id: 'st-1',  term: 'invisalign cost plano',          campaign: 'Lumen - Invisalign DFW',         impressions: 18400, clicks: 642, conversions: 38, cpaUsd: 41, wasted: false },
//     { id: 'st-2',  term: 'storage units jobs near me',     campaign: 'Atlas - Storage Near Me',         impressions: 9200,  clicks: 142, conversions: 0,  cpaUsd: 0,  wasted: true },
//     { id: 'st-3',  term: 'best dental implants near me',    campaign: 'Lumen - Dental Implants Plano',   impressions: 12100, clicks: 388, conversions: 22, cpaUsd: 54, wasted: false },
//     { id: 'st-4',  term: 'free skincare samples',          campaign: 'Verdant - Summer Glow',           impressions: 7400,  clicks: 96,  conversions: 0,  cpaUsd: 0,  wasted: true },
//     { id: 'st-5',  term: 'climate controlled storage atlanta', campaign: 'Atlas - PMax Atlanta',        impressions: 14600, clicks: 512, conversions: 64, cpaUsd: 36, wasted: false },
//     { id: 'st-6',  term: 'gym membership cost cheap',       campaign: 'Peak - Trial Prospecting',        impressions: 6800,  clicks: 71,  conversions: 0,  cpaUsd: 0,  wasted: true },
//     { id: 'st-7',  term: 'b2b project management software', campaign: 'NorthEdge - Category Demand',     impressions: 21300, clicks: 704, conversions: 41, cpaUsd: 58, wasted: false },
//     { id: 'st-8',  term: 'northedge careers',               campaign: 'NorthEdge - Competitor Conquesting', impressions: 3100, clicks: 38, conversions: 0, cpaUsd: 0, wasted: true },
//     { id: 'st-9',  term: 'teeth whitening dallas deal',     campaign: 'Lumen - Whitening Promo',         impressions: 8900,  clicks: 296, conversions: 31, cpaUsd: 30, wasted: false },
//     { id: 'st-10', term: 'pallet storage wholesale',        campaign: 'Atlas - Storage Near Me',         impressions: 4200,  clicks: 44,  conversions: 0,  cpaUsd: 0,  wasted: true },
//     { id: 'st-11', term: 'brunch reservations denver',      campaign: 'Casa Verde - Denver Brunch',      impressions: 5600,  clicks: 214, conversions: 48, cpaUsd: 22, wasted: false },
//     { id: 'st-12', term: 'group fitness classes austin',    campaign: 'Peak - Group Classes Austin',     impressions: 9800,  clicks: 342, conversions: 56, cpaUsd: 26, wasted: false },
//     { id: 'st-13', term: 'how to fix skin barrier free',    campaign: 'Verdant - Summer Glow',           impressions: 3900,  clicks: 58,  conversions: 0,  cpaUsd: 0,  wasted: true },
//     { id: 'st-14', term: 'self storage near me cheap',      campaign: 'Atlas - Storage Near Me',         impressions: 11200, clicks: 398, conversions: 29, cpaUsd: 48, wasted: false },
//     { id: 'st-15', term: 'crm software free trial',         campaign: 'NorthEdge - Category Demand',     impressions: 7100,  clicks: 188, conversions: 12, cpaUsd: 61, wasted: false },
//     { id: 'st-16', term: 'skincare jobs remote',            campaign: 'Verdant - Brand Defense',         impressions: 2400,  clicks: 31,  conversions: 0,  cpaUsd: 0,  wasted: true },
//     { id: 'st-17', term: 'dentist near me reviews',         campaign: 'Lumen - Invisalign DFW',          impressions: 6300,  clicks: 201, conversions: 18, cpaUsd: 44, wasted: false },
//     { id: 'st-18', term: 'storage units discount code',     campaign: 'Atlas - PMax Atlanta',            impressions: 3800,  clicks: 67,  conversions: 4,  cpaUsd: 88, wasted: true },
//   ],
// };
//