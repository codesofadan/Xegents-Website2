// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Reporting macro - white-label client reporting.
//    Data for ALL reporting sub-modules:
//      reporting             - all reports dense list
//      reporting.builder     - white-label report canvas + widget library
//      reporting.scheduled   - scheduled sends list
//      reporting.templates   - template gallery
//      reporting.whitelabel  - per-client branding panels
//
//    The wedge: every report ships with a drafted narrative (the
//    "why" behind the numbers); a human approves before it sends.
//    Cross-channel blending is what single-channel tools lack.
//
//    Reuses window.CLIENTS, window.CHANNELS, window.TEAM. Money in
//    USD, dates relative to window.TODAY (2026-06-26).
//    ============================================================ */
//
// window.REPORTING = {
//
//   /* ----------------------------------------------------------
//      All reports - the master list. Every recurring report in the
//      book: cadence, blended channels, next send, status, and the
//      white-label domain it ships to. Drives reporting (overview)
//      and reporting.scheduled.
//      status: scheduled | draft | awaiting | paused
//      approval: approved | pending | n/a
//      ---------------------------------------------------------- */
//   reports: [
//     { id: 'r-lumen-monthly',     name: 'Lumen Dental - Monthly Performance', client: 'lumen',     cadence: 'Monthly',   template: 'Monthly Performance', channels: ['seo', 'ads', 'reputation', 'social'],       nextSendIn: 4,  lastSent: 26, recipients: 4, openRate: 78, status: 'awaiting',  approval: 'pending',  delivery: 'reports.lumendental.com',  owner: 't-omar' },
//     { id: 'r-verdant-weekly',    name: 'Verdant - Weekly Ecom Snapshot',     client: 'verdant',   cadence: 'Weekly',    template: 'Ecom Weekly',         channels: ['ads', 'social', 'email'],                    nextSendIn: 1,  lastSent: 6,  recipients: 3, openRate: 64, status: 'awaiting',  approval: 'pending',  delivery: 'reports.growthboost.io',   owner: 't-khizer' },
//     { id: 'r-northedge-mql',     name: 'NorthEdge - Demand-Gen MQL Report',  client: 'northedge', cadence: 'Monthly',   template: 'Paid Media Deep-Dive', channels: ['ads', 'content', 'seo', 'email'],           nextSendIn: 5,  lastSent: 25, recipients: 5, openRate: 82, status: 'awaiting',  approval: 'pending',  delivery: 'analytics.northedge.io',   owner: 't-dana' },
//     { id: 'r-peak-monthly',      name: 'Peak Performance - Studio Growth',   client: 'peak',      cadence: 'Monthly',   template: 'Monthly Performance', channels: ['social', 'ads', 'reputation', 'email'],     nextSendIn: 9,  lastSent: 21, recipients: 3, openRate: 69, status: 'scheduled', approval: 'approved', delivery: 'reports.growthboost.io',   owner: 't-omar' },
//     { id: 'r-casaverde-local',   name: 'Casa Verde - Local Visibility',      client: 'casaverde', cadence: 'Monthly',   template: 'Local SEO',           channels: ['social', 'reputation', 'seo'],              nextSendIn: 12, lastSent: 18, recipients: 2, openRate: 74, status: 'scheduled', approval: 'approved', delivery: 'reports.growthboost.io',   owner: 't-aimen' },
//     { id: 'r-atlas-local-paid',  name: 'Atlas Storage - Local + Paid Recovery', client: 'atlas',  cadence: 'Weekly',    template: 'Local SEO',           channels: ['seo', 'ads', 'reputation'],                 nextSendIn: 2,  lastSent: 5,  recipients: 4, openRate: 58, status: 'scheduled', approval: 'approved', delivery: 'reports.atlasstorage.com', owner: 't-sara' },
//     { id: 'r-lumen-exec',        name: 'Lumen Dental - Quarterly QBR Pack',  client: 'lumen',     cadence: 'Quarterly', template: 'Quarterly QBR',       channels: ['seo', 'ads', 'social', 'reputation', 'content'], nextSendIn: 11, lastSent: 79, recipients: 6, openRate: 91, status: 'draft',     approval: 'n/a',      delivery: 'reports.lumendental.com',  owner: 't-omar' },
//     { id: 'r-verdant-exec',      name: 'Verdant - Executive Summary',        client: 'verdant',   cadence: 'Monthly',   template: 'Executive Summary',   channels: ['ads', 'social', 'email', 'content'],        nextSendIn: 6,  lastSent: 24, recipients: 2, openRate: 72, status: 'scheduled', approval: 'approved', delivery: 'reports.growthboost.io',   owner: 't-khizer' },
//     { id: 'r-northedge-weekly',  name: 'NorthEdge - Weekly Pipeline Pulse',  client: 'northedge', cadence: 'Weekly',    template: 'Executive Summary',   channels: ['ads', 'content', 'email'],                  nextSendIn: 3,  lastSent: 4,  recipients: 4, openRate: 80, status: 'scheduled', approval: 'approved', delivery: 'analytics.northedge.io',   owner: 't-dana' },
//     { id: 'r-peak-social',       name: 'Peak Performance - Social & Reviews', client: 'peak',     cadence: 'Weekly',    template: 'Ecom Weekly',         channels: ['social', 'reputation'],                     nextSendIn: 7,  lastSent: 7,  recipients: 2, openRate: 66, status: 'draft',     approval: 'n/a',      delivery: 'reports.growthboost.io',   owner: 't-aimen' },
//     { id: 'r-casaverde-qbr',     name: 'Casa Verde - Quarterly Review',      client: 'casaverde', cadence: 'Quarterly', template: 'Quarterly QBR',       channels: ['social', 'reputation', 'seo', 'ads'],       nextSendIn: 21, lastSent: 71, recipients: 3, openRate: 85, status: 'scheduled', approval: 'approved', delivery: 'reports.growthboost.io',   owner: 't-aimen' },
//     { id: 'r-atlas-exec',        name: 'Atlas Storage - Executive Recovery Brief', client: 'atlas', cadence: 'Monthly', template: 'Executive Summary',   channels: ['seo', 'ads', 'reputation'],                 nextSendIn: 8,  lastSent: 27, recipients: 3, openRate: 61, status: 'scheduled', approval: 'approved', delivery: 'reports.atlasstorage.com', owner: 't-sara' },
//     { id: 'r-lumen-social',      name: 'Lumen Dental - Social Pulse',        client: 'lumen',     cadence: 'Weekly',    template: 'Ecom Weekly',         channels: ['social', 'reputation'],                     nextSendIn: 3,  lastSent: 4,  recipients: 2, openRate: 70, status: 'scheduled', approval: 'approved', delivery: 'reports.lumendental.com',  owner: 't-omar' },
//     { id: 'r-northedge-qbr',     name: 'NorthEdge - Board QBR Deck',         client: 'northedge', cadence: 'Quarterly', template: 'Quarterly QBR',       channels: ['ads', 'content', 'seo', 'email'],           nextSendIn: 18, lastSent: 74, recipients: 7, openRate: 88, status: 'scheduled', approval: 'approved', delivery: 'analytics.northedge.io',   owner: 't-dana' },
//     { id: 'r-peak-paid',         name: 'Peak Performance - Paid Deep-Dive',  client: 'peak',      cadence: 'Monthly',   template: 'Paid Media Deep-Dive', channels: ['ads', 'social'],                            nextSendIn: 14, lastSent: 20, recipients: 3, openRate: 67, status: 'paused',    approval: 'n/a',      delivery: 'reports.growthboost.io',   owner: 't-omar' },
//     { id: 'r-casaverde-weekly',  name: 'Casa Verde - Weekly Footfall',       client: 'casaverde', cadence: 'Weekly',    template: 'Local SEO',           channels: ['social', 'reputation'],                     nextSendIn: 1,  lastSent: 6,  recipients: 2, openRate: 76, status: 'scheduled', approval: 'approved', delivery: 'reports.growthboost.io',   owner: 't-aimen' },
//   ],
//
//   /* ----------------------------------------------------------
//      KPI summary numbers - rendered inline (stat rail), never as
//      a KPI-card band.
//      ---------------------------------------------------------- */
//   summary: {
//     scheduled: 14, sentThisMonth: 38, sentLastMonth: 32,
//     avgOpenRate: 71, openDelta: 4.2,
//     awaiting: 3, whitelabelProfiles: 6, whitelabelDelta: 1,
//   },
//
//   /* ----------------------------------------------------------
//      Approval queue - THE WEDGE.
//      Each drafted report carries a real executive summary
//      explaining the "why" behind the month. Nothing ships until a
//      human approves. Each carries the specific deltas the narrative
//      is built from so the reviewer can sanity-check.
//      ---------------------------------------------------------- */
//   approvalQueue: [
//     {
//       id: 'r-lumen-monthly', client: 'lumen', reportName: 'Monthly Performance', period: 'June 2026',
//       cadence: 'Monthly', channels: ['seo', 'ads', 'reputation', 'social'],
//       sendsIn: 4, words: 312, drafted: '14m ago', owner: 't-omar', sentiment: 'positive',
//       headline: 'Strongest month since onboarding - new-patient leads up 23%',
//       narrative: 'June was Lumen\'s strongest month since onboarding. New-patient leads rose 23% to 318, driven almost entirely by the Invisalign campaign cluster reaching #3 organic for "invisalign plano" and a 41% lift in Google Business calls across the seven locations. Paid search held a 6.4x ROAS while we shifted 18% of budget out of branded terms into the higher-intent "emergency dentist" set, which is where the new-patient growth concentrated. The one watch-item: review velocity dipped at the Frisco location after a staffing change, so we have queued an in-clinic review-request flow to recover it next month.',
//       proofPoints: [
//         { label: 'New-patient leads', value: '318', delta: 23, better: true },
//         { label: 'Blended ROAS', value: '6.4x', delta: 0.4, better: true },
//         { label: 'GBP calls', value: '1,204', delta: 41, better: true },
//         { label: 'Review velocity', value: '64 new', delta: -8, better: false },
//       ],
//     },
//     {
//       id: 'r-verdant-weekly', client: 'verdant', reportName: 'Weekly Ecom Snapshot', period: 'Week of Jun 23',
//       cadence: 'Weekly', channels: ['ads', 'social', 'email'],
//       sendsIn: 1, words: 268, drafted: '38m ago', owner: 't-khizer', sentiment: 'mixed',
//       headline: 'Revenue held flat while we absorbed a TikTok CPA spike',
//       narrative: 'Revenue held roughly flat this week at $112k as we deliberately absorbed a short-term hit to stabilise blended efficiency. TikTok CPA spiked 41% after the platform reset the prospecting audience, so we paused the three worst ad sets and reallocated that spend to Meta retargeting and the abandoned-cart email flow, which together recovered most of the lost revenue at a 3.1x return. Organic social reach grew 9% on the new UGC series. ROAS sits at 2.9x, still below the 3.5x target, so next week we are testing a creative refresh and a tighter post-purchase upsell to pull blended efficiency back up.',
//       proofPoints: [
//         { label: 'Revenue', value: '$112,000', delta: 0.4, better: true },
//         { label: 'Blended ROAS', value: '2.9x', delta: -0.3, better: false },
//         { label: 'TikTok CPA', value: '$58', delta: 41, better: false },
//         { label: 'Social reach', value: '286k', delta: 9, better: true },
//       ],
//     },
//     {
//       id: 'r-northedge-mql', client: 'northedge', reportName: 'Demand-Gen MQL Report', period: 'June 2026',
//       cadence: 'Monthly', channels: ['ads', 'content', 'seo', 'email'],
//       sendsIn: 5, words: 295, drafted: '1h ago', owner: 't-dana', sentiment: 'positive',
//       headline: 'MQL volume up 16% with sourced pipeline crossing $318k',
//       narrative: 'NorthEdge\'s demand engine compounded again in June. MQL volume rose 16% to 142 and 38 of those converted to SQLs, pushing sourced pipeline past $318k for the quarter. The gain came from two places: the "project-management vs spreadsheets" comparison content ranked page-one and now drives 31% of organic MQLs, and the LinkedIn + Google paid mix improved cost-per-MQL by 19% after we cut the broad-match waste. Email nurture open rates held at 34%. The constraint is now sales-side, not marketing-side: SQL-to-opportunity velocity slowed, so we recommend a tighter lead-scoring handoff before scaling spend further.',
//       proofPoints: [
//         { label: 'MQLs', value: '142', delta: 16, better: true },
//         { label: 'SQLs', value: '38', delta: 12, better: true },
//         { label: 'Sourced pipeline', value: '$318,000', delta: 22, better: true },
//         { label: 'Cost per MQL', value: '$158', delta: -19, better: true },
//       ],
//     },
//   ],
//
//   /* ----------------------------------------------------------
//      Builder - the white-label report canvas.
//      rail: a drag-list widget library grouped by channel.
//      main: the composed report (branded header + blended widgets +
//            a chart).  aside: report settings.
//      ---------------------------------------------------------- */
//   builder: {
//     /* Widget library, grouped - the drag source rail. */
//     widgetGroups: [
//       {
//         group: 'Layout', widgets: [
//           { id: 'w-header',  name: 'Branded header',    icon: 'layout-panel-top', desc: 'Client logo + period' },
//           { id: 'w-summary', name: 'Executive summary', icon: 'file-text',        desc: 'Drafted narrative block' },
//           { id: 'w-divider', name: 'Section divider',   icon: 'minus',            desc: 'Labelled separator' },
//         ],
//       },
//       {
//         group: 'Cross-channel', widgets: [
//           { id: 'w-blend',   name: 'Blended trend chart', icon: 'line-chart',  desc: 'Leads by channel, 6 mo' },
//           { id: 'w-mix',     name: 'Channel mix donut',   icon: 'pie-chart',   desc: 'Contribution share' },
//           { id: 'w-kpirow',  name: 'KPI summary row',     icon: 'layout-grid', desc: 'Top 4 numbers' },
//         ],
//       },
//       {
//         group: 'Channel widgets', widgets: [
//           { id: 'w-seo',     name: 'SEO rank grid',     icon: 'search',     desc: 'Keyword positions' },
//           { id: 'w-ads',     name: 'Paid performance',  icon: 'megaphone',  desc: 'Spend, ROAS, CPA' },
//           { id: 'w-social',  name: 'Social reach',      icon: 'share-2',    desc: 'Reach + engagement' },
//           { id: 'w-rep',     name: 'Reviews + rating',  icon: 'star',       desc: 'Velocity + sentiment' },
//           { id: 'w-goals',   name: 'Goals vs target',   icon: 'target',     desc: 'Progress bars' },
//         ],
//       },
//     ],
//
//     /* The composed canvas - a white-label report for Lumen. */
//     canvas: {
//       client: 'lumen',
//       title: 'Monthly Performance Report',
//       period: 'June 2026',
//       delivery: 'reports.lumendental.com',
//       preparedBy: 'GrowthBoost',
//       accent: '#38bdf8',
//       summary: 'June was Lumen\'s strongest month since onboarding. New-patient leads rose 23%, paid search held a 6.4x ROAS, and organic visibility climbed to an average #4.1 across 42 tracked keywords. Review velocity at the Frisco location is the one watch-item for July.',
//
//       kpis: [
//         { label: 'New-patient leads',  value: '318',  delta: 23,  better: true,  sub: 'vs 259 in May' },
//         { label: 'Blended ROAS',       value: '6.4x', delta: 0.4, better: true,  sub: 'across paid channels' },
//         { label: 'Organic visibility', value: '#4.1', delta: 1.2, better: true,  sub: 'avg rank, 42 keywords' },
//         { label: 'Review rating',      value: '4.8',  delta: 0.1, better: true,  sub: '64 new reviews' },
//       ],
//
//       /* Blended cross-channel trend - leads by channel, 6 months. */
//       chart: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//         datasets: [
//           { label: 'SEO & Local', key: 'seo',    color: '#38bdf8', data: [82, 88, 96, 104, 118, 141] },
//           { label: 'Paid Ads',    key: 'ads',    color: '#f59e0b', data: [101, 96, 110, 118, 121, 134] },
//           { label: 'Social',      key: 'social', color: '#a78bfa', data: [22, 28, 31, 34, 38, 43] },
//         ],
//       },
//
//       /* Per-channel performance, blended into one table. */
//       channelTable: [
//         { channel: 'seo',        spendUsd: 0,     leads: 141, costPerLead: 0,   roas: 0,   delta: 19,  note: '#3 for "invisalign plano"' },
//         { channel: 'ads',        spendUsd: 14200, leads: 134, costPerLead: 106, roas: 6.4, delta: 11,  note: 'Shifted budget to high-intent' },
//         { channel: 'social',     spendUsd: 1800,  leads: 43,  costPerLead: 42,  roas: 3.1, delta: 13,  note: 'UGC patient stories series' },
//         { channel: 'reputation', spendUsd: 0,     leads: 0,   costPerLead: 0,   roas: 0,   delta: -8,  note: 'Frisco velocity dipped' },
//       ],
//
//       goals: [
//         { label: 'New-patient leads',         current: 318, target: 300, unit: '',    color: 'var(--acc)' },
//         { label: 'Blended ROAS',              current: 6.4, target: 5.5, unit: 'x',   color: 'var(--acc)' },
//         { label: 'Avg organic rank (top 4)',  current: 31,  target: 42,  unit: ' kw', color: 'var(--sky)' },
//         { label: 'New reviews collected',     current: 64,  target: 80,  unit: '',    color: 'var(--amber)' },
//       ],
//     },
//
//     /* Settings panel (aside). */
//     settings: {
//       client: 'lumen',
//       cadence: 'Monthly',
//       sendDay: '1st of month, 9:00am',
//       recipients: 4,
//       template: 'Monthly Performance',
//       branding: 'Lumen Dental Insights',
//       domain: 'reports.lumendental.com',
//       accent: '#38bdf8',
//       narrativeDraft: true,
//       requireApproval: true,
//     },
//   },
//
//   /* ----------------------------------------------------------
//      Report templates - reusable starting points.
//      ---------------------------------------------------------- */
//   templates: [
//     { id: 't-monthly', name: 'Monthly Performance',  icon: 'bar-chart-3',  channels: 5, blurb: 'Full cross-channel rollup with written narrative and goals.', uses: 38, sections: 7, accent: '#10b981', default: true },
//     { id: 't-ecom',    name: 'Ecom Weekly',          icon: 'shopping-bag', channels: 4, blurb: 'Revenue, ROAS, AOV and cart recovery for DTC brands.',     uses: 24, sections: 5, accent: '#a78bfa', default: false },
//     { id: 't-local',   name: 'Local SEO',            icon: 'map-pin',      channels: 3, blurb: 'GBP, rank grid, citations and reviews by location.',        uses: 19, sections: 6, accent: '#38bdf8', default: false },
//     { id: 't-paid',    name: 'Paid Media Deep-Dive', icon: 'megaphone',    channels: 2, blurb: 'Spend, CAC, ROAS and creative breakdown by platform.',      uses: 16, sections: 5, accent: '#f59e0b', default: false },
//     { id: 't-exec',    name: 'Executive Summary',    icon: 'file-text',    channels: 6, blurb: 'One-page narrative plus the five numbers that matter.',     uses: 31, sections: 3, accent: '#10b981', default: false },
//     { id: 't-qbr',     name: 'Quarterly QBR',        icon: 'presentation', channels: 6, blurb: 'Strategy review, wins, next-quarter plan and forecast.',    uses: 8,  sections: 9, accent: '#38bdf8', default: false },
//   ],
//
//   /* ----------------------------------------------------------
//      White-label settings - per-client branding profiles. Each
//      client gets its own logo color, accent, custom domain, login
//      and from-name, applied to every report automatically.
//      ---------------------------------------------------------- */
//   whitelabel: [
//     { client: 'lumen',     domain: 'reports.lumendental.com',  accent: '#38bdf8', fromName: 'Lumen Dental Insights', login: 'lumendental.com/portal',  sslVerified: true,  reports: 4, faviconSet: true,  customCss: true  },
//     { client: 'northedge', domain: 'analytics.northedge.io',   accent: '#6366f1', fromName: 'NorthEdge Growth',      login: 'app.northedge.io/login',  sslVerified: true,  reports: 3, faviconSet: true,  customCss: true  },
//     { client: 'atlas',     domain: 'reports.atlasstorage.com', accent: '#f43f5e', fromName: 'Atlas Storage Reports', login: 'atlasstorage.com/login',  sslVerified: false, reports: 2, faviconSet: false, customCss: false },
//     { client: 'verdant',   domain: 'reports.growthboost.io',   accent: '#10b981', fromName: 'GrowthBoost',          login: 'reports.growthboost.io',  sslVerified: true,  reports: 5, faviconSet: true,  customCss: false },
//     { client: 'peak',      domain: 'reports.growthboost.io',   accent: '#a78bfa', fromName: 'Peak Performance Lab',  login: 'reports.growthboost.io',  sslVerified: true,  reports: 3, faviconSet: false, customCss: false },
//     { client: 'casaverde', domain: 'reports.growthboost.io',   accent: '#f59e0b', fromName: 'Casa Verde Insights',   login: 'reports.growthboost.io',  sslVerified: true,  reports: 2, faviconSet: false, customCss: false },
//   ],
// };
//