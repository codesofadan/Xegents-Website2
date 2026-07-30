// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Email & SMS macro seed - data for ALL sub-modules:
//      email                 (Overview / console)
//      email.campaigns       (dense list, full-bleed)
//      email.flows           (flow list + step-chain diagrams)
//      email.audiences       (segment list + builder)
//      email.deliverability  (console: reputation, auth, placement)
//    Keyed to the client book (window.CLIENTS), dated vs
//    window.TODAY. Revenue concentrates in Verdant (DTC e-com).
//    Deliverability is the GoHighLevel weakness we out-execute.
//    ============================================================ */
//
// window.EMAIL = {
//
//   // Headline metrics for the overview stat rail. Deltas vs May 2026.
//   kpis: {
//     sends: 284000,        // sends MTD across email + SMS
//     sendsDelta: 11.2,     // %
//     openRate: 38.0,       // % avg open (email)
//     openDelta: 1.8,       // pt
//     clickRate: 4.2,       // % avg click
//     clickDelta: 0.4,      // pt
//     revenueUsd: 86000,    // attributed revenue, mostly Verdant
//     revenueDelta: 9.3,    // %
//     deliverability: 94,   // inbox-placement score /100
//     deliverabilityDelta: -1.0, // pt (Verdant dip)
//   },
//
//   // Revenue attribution by recent week (attributed email + SMS revenue).
//   attribution: {
//     weeks: ['May 12', 'May 19', 'May 26', 'Jun 2', 'Jun 9', 'Jun 16', 'Jun 23'],
//     email: [14200, 15800, 13900, 16400, 18100, 19600, 21300],
//     sms:   [4100,  4800,  4200,  5600,  6300,  7100,  7900],
//     byChannel: [
//       { label: 'Email', value: 62400, color: '#10b981' },
//       { label: 'SMS',   value: 23600, color: '#a78bfa' },
//     ],
//   },
//
//   // SMS vs email side-by-side comparison (MTD across the book).
//   channelSplit: {
//     email: { sends: 168200, clickRate: 4.2, revenueUsd: 62400, costUsd: 840,  revPerSend: 0.371 },
//     sms:   { sends: 115800, clickRate: 9.4, revenueUsd: 23600, costUsd: 2780, revPerSend: 0.204 },
//   },
//
//   // Campaign log. type: 'email' | 'sms'. metric: revenue for e-com,
//   // conversions for lead-gen / local. days -> daysAgo(days) for sent date.
//   campaigns: [
//     { id: 'c-401', name: 'Summer Glow Launch',        client: 'verdant',   type: 'email', sent: 48200, openRate: 41.6, clickRate: 5.8, metric: 'revenue', value: 31400, status: 'sent',      days: 2 },
//     { id: 'c-402', name: 'Win-back 30d Lapsed',        client: 'peak',      type: 'email', sent: 9100,  openRate: 33.2, clickRate: 3.1, metric: 'conv',    value: 84,    status: 'sent',      days: 4 },
//     { id: 'c-403', name: 'Webinar Nurture 3/5',        client: 'northedge', type: 'email', sent: 6400,  openRate: 47.9, clickRate: 7.4, metric: 'conv',    value: 52,    status: 'sent',      days: 1 },
//     { id: 'c-404', name: 'Flash SMS - 20% Cart',       client: 'verdant',   type: 'sms',   sent: 22600, openRate: 0,    clickRate: 9.2, metric: 'revenue', value: 18700, status: 'sent',      days: 3 },
//     { id: 'c-405', name: 'New Patient Reactivation',   client: 'lumen',     type: 'email', sent: 5200,  openRate: 36.4, clickRate: 2.9, metric: 'conv',    value: 41,    status: 'sent',      days: 6 },
//     { id: 'c-406', name: 'Patio Season Reservations',  client: 'casaverde', type: 'sms',   sent: 3800,  openRate: 0,    clickRate: 11.4, metric: 'conv',   value: 96,    status: 'sent',      days: 5 },
//     { id: 'c-407', name: 'Product Education Drip 2/4',  client: 'verdant',   type: 'email', sent: 38900, openRate: 39.1, clickRate: 4.7, metric: 'revenue', value: 12200, status: 'sent',      days: 8 },
//     { id: 'c-408', name: 'Class Pack Upsell',          client: 'peak',      type: 'sms',   sent: 6700,  openRate: 0,    clickRate: 8.1, metric: 'conv',    value: 63,    status: 'sent',      days: 9 },
//     { id: 'c-409', name: 'Feature Launch Announce',    client: 'northedge', type: 'email', sent: 7200,  openRate: 44.3, clickRate: 6.2, metric: 'conv',    value: 38,    status: 'sent',      days: 11 },
//     { id: 'c-410', name: 'Storage Move-in Promo',      client: 'atlas',     type: 'email', sent: 4100,  openRate: 24.6, clickRate: 1.8, metric: 'conv',    value: 14,    status: 'sent',      days: 12 },
//     { id: 'c-413', name: 'Father\'s Day Gift Guide',   client: 'verdant',   type: 'email', sent: 44600, openRate: 40.2, clickRate: 5.1, metric: 'revenue', value: 21900, status: 'sent',      days: 14 },
//     { id: 'c-414', name: 'Referral Reward Reminder',   client: 'peak',      type: 'email', sent: 8400,  openRate: 31.9, clickRate: 2.7, metric: 'conv',    value: 57,    status: 'sent',      days: 16 },
//     { id: 'c-415', name: 'Case Study - Acme +38% MQLs',client: 'northedge', type: 'email', sent: 6100,  openRate: 46.1, clickRate: 6.9, metric: 'conv',    value: 44,    status: 'sent',      days: 18 },
//     { id: 'c-416', name: 'Wine Pairing Dinner SMS',    client: 'casaverde', type: 'sms',   sent: 4100,  openRate: 0,    clickRate: 12.1, metric: 'conv',   value: 108,   status: 'sent',      days: 19 },
//     { id: 'c-411', name: 'Restock - Vitamin C Serum',  client: 'verdant',   type: 'email', sent: 41800, openRate: 0,    clickRate: 0,   metric: 'revenue', value: 0,     status: 'scheduled', days: -2 },
//     { id: 'c-412', name: 'Q3 Pricing Webinar Invite',  client: 'northedge', type: 'email', sent: 6900,  openRate: 0,    clickRate: 0,   metric: 'conv',    value: 0,     status: 'draft',     days: -4 },
//     { id: 'c-417', name: 'SMS - Flash Bundle 48h',     client: 'verdant',   type: 'sms',   sent: 23800, openRate: 0,    clickRate: 0,   metric: 'revenue', value: 0,     status: 'scheduled', days: -3 },
//     { id: 'c-418', name: 'Summer Hours Update',        client: 'lumen',     type: 'email', sent: 11200, openRate: 0,    clickRate: 0,   metric: 'conv',    value: 0,     status: 'draft',     days: -6 },
//   ],
//
//   // Automation flows. Each renders as a small horizontal step-chain.
//   // steps carry per-step conversion so the chain is quantified.
//   flows: [
//     {
//       id: 's-501', name: 'Welcome Series', client: 'verdant', kind: 'welcome',
//       enrolled: 4820, convRate: 12.4, revenueUsd: 26230, active: true, trigger: 'New subscriber',
//       steps: [
//         { label: 'Welcome',      delay: '0h',   type: 'email', sent: 4820, conv: 268, convPct: 5.6 },
//         { label: 'Brand story',  delay: '24h',  type: 'email', sent: 4612, conv: 142, convPct: 3.1 },
//         { label: 'Best-sellers', delay: '48h',  type: 'email', sent: 4380, conv: 184, convPct: 4.2 },
//         { label: 'Reviews',      delay: '72h',  type: 'email', sent: 4096, conv: 88,  convPct: 2.1 },
//         { label: '10% nudge',    delay: '120h', type: 'email', sent: 3902, conv: 211, convPct: 5.4 },
//       ],
//     },
//     {
//       id: 's-502', name: 'Abandoned Cart', client: 'verdant', kind: 'cart',
//       enrolled: 1960, convRate: 21.8, revenueUsd: 24800, active: true, trigger: 'Cart abandoned',
//       steps: [
//         { label: 'Soft reminder', delay: '1h',  type: 'email', sent: 1960, conv: 312, convPct: 15.9 },
//         { label: 'SMS - 10% off',  delay: '24h', type: 'sms',   sent: 1180, conv: 286, convPct: 24.2 },
//         { label: 'We saved your bag', delay: '24h', type: 'email', sent: 780, conv: 74, convPct: 9.5 },
//         { label: 'Last chance',   delay: '48h', type: 'email', sent: 1454, conv: 156, convPct: 10.7 },
//       ],
//     },
//     {
//       id: 's-503', name: 'Post-purchase Nurture', client: 'verdant', kind: 'nurture',
//       enrolled: 3140, convRate: 16.2, revenueUsd: 18940, active: true, trigger: 'Order placed',
//       steps: [
//         { label: 'Thank you',   delay: '0h',   type: 'email', sent: 3140, conv: 96,  convPct: 3.1 },
//         { label: 'How-to use',  delay: '72h',  type: 'email', sent: 3010, conv: 124, convPct: 4.1 },
//         { label: 'Cross-sell',  delay: '168h', type: 'email', sent: 2880, conv: 188, convPct: 6.5 },
//         { label: 'Reorder',     delay: '720h', type: 'email', sent: 2640, conv: 201, convPct: 7.6 },
//       ],
//     },
//     {
//       id: 's-504', name: 'Re-engagement 90d', client: 'peak', kind: 'winback',
//       enrolled: 1280, convRate: 8.6, revenueUsd: 4120, active: true, trigger: 'No open 90 days',
//       steps: [
//         { label: 'We miss you', delay: '0h',  type: 'email', sent: 1280, conv: 44, convPct: 3.4 },
//         { label: 'Free week',   delay: '72h', type: 'email', sent: 1188, conv: 41, convPct: 3.5 },
//         { label: 'Final offer', delay: '168h', type: 'sms',  sent: 1060, conv: 25, convPct: 2.4 },
//       ],
//     },
//     {
//       id: 's-505', name: 'SaaS Trial Onboarding', client: 'northedge', kind: 'onboarding',
//       enrolled: 740, convRate: 19.4, revenueUsd: 0, active: true, trigger: 'Trial started',
//       steps: [
//         { label: 'Setup',       delay: '0h',  type: 'email', sent: 740, conv: 61, convPct: 8.2 },
//         { label: 'Activation',  delay: '24h', type: 'email', sent: 690, conv: 48, convPct: 7.0 },
//         { label: 'Invite team', delay: '72h', type: 'email', sent: 612, conv: 39, convPct: 6.4 },
//         { label: 'Upgrade',     delay: '168h', type: 'email', sent: 540, conv: 52, convPct: 9.6 },
//         { label: 'CSM intro',   delay: '240h', type: 'email', sent: 470, conv: 28, convPct: 6.0 },
//       ],
//     },
//     {
//       id: 's-506', name: 'Win-back Lapsed', client: 'lumen', kind: 'winback',
//       enrolled: 610, convRate: 6.1, revenueUsd: 1640, active: false, trigger: '6-month no visit',
//       steps: [
//         { label: '6-month check-in', delay: '0h',  type: 'email', sent: 610, conv: 18, convPct: 3.0 },
//         { label: 'Book cleaning',    delay: '72h', type: 'email', sent: 560, conv: 14, convPct: 2.5 },
//         { label: 'Reminder',         delay: '168h', type: 'sms',  sent: 490, conv: 5,  convPct: 1.0 },
//       ],
//     },
//     {
//       id: 's-507', name: 'Reservation Follow-up', client: 'casaverde', kind: 'nurture',
//       enrolled: 980, convRate: 14.8, revenueUsd: 0, active: true, trigger: 'Dined last visit',
//       steps: [
//         { label: 'Thanks for dining', delay: '0h',   type: 'email', sent: 980, conv: 52, convPct: 5.3 },
//         { label: 'Leave a review',    delay: '24h',  type: 'sms',   sent: 910, conv: 61, convPct: 6.7 },
//         { label: 'Book again offer',  delay: '336h', type: 'email', sent: 840, conv: 32, convPct: 3.8 },
//       ],
//     },
//   ],
//
//   // List health / segments. engagement = % engaged last 30d.
//   segments: [
//     { name: 'Engaged 30d',          client: 'verdant',   size: 18400, engagement: 64.2, openRate: 52.1, clickRate: 9.8, revPerRecipient: 2.41, lastCampaign: 'Summer Glow Launch',     growth: 6.4,  trend: 'up' },
//     { name: 'VIP (3+ orders)',      client: 'verdant',   size: 4120,  engagement: 71.8, openRate: 58.4, clickRate: 12.6, revPerRecipient: 6.18, lastCampaign: 'Father\'s Day Gift Guide', growth: 2.1,  trend: 'flat' },
//     { name: 'Decaying VIP 90d',     client: 'verdant',   size: 2140,  engagement: 9.4,  openRate: 11.2, clickRate: 1.1, revPerRecipient: 0.34, lastCampaign: 'Product Education Drip',  growth: -8.7, trend: 'down' },
//     { name: 'Trial - active',       client: 'northedge', size: 740,   engagement: 58.6, openRate: 61.0, clickRate: 14.2, revPerRecipient: 0.0, lastCampaign: 'Webinar Nurture 3/5',     growth: 11.2, trend: 'up' },
//     { name: 'Members - all',        client: 'peak',      size: 9600,  engagement: 41.3, openRate: 38.9, clickRate: 5.2, revPerRecipient: 0.88, lastCampaign: 'Class Pack Upsell',       growth: 1.4,  trend: 'flat' },
//     { name: 'Patients - reachable', client: 'lumen',     size: 11200, engagement: 33.7, openRate: 34.8, clickRate: 3.0, revPerRecipient: 0.0, lastCampaign: 'New Patient Reactivation', growth: -2.0, trend: 'down' },
//     { name: 'Diner list',           client: 'casaverde', size: 6800,  engagement: 47.1, openRate: 44.6, clickRate: 9.4, revPerRecipient: 0.0, lastCampaign: 'Wine Pairing Dinner SMS',  growth: 3.9,  trend: 'up' },
//     { name: 'Unengaged 180d+',      client: 'verdant',   size: 5260,  engagement: 1.2,  openRate: 1.4,  clickRate: 0.1, revPerRecipient: 0.02, lastCampaign: 'Restock - Vitamin C',     growth: -1.1, trend: 'down' },
//     { name: 'High AOV buyers',      client: 'verdant',   size: 1860,  engagement: 68.0, openRate: 56.2, clickRate: 11.0, revPerRecipient: 8.40, lastCampaign: 'Summer Glow Launch',     growth: 4.2,  trend: 'up' },
//     { name: 'Cold leads - SaaS',    client: 'northedge', size: 3200,  engagement: 18.4, openRate: 22.1, clickRate: 2.2, revPerRecipient: 0.0, lastCampaign: 'Feature Launch Announce',  growth: -3.4, trend: 'down' },
//     { name: 'New members 30d',      client: 'peak',      size: 1240,  engagement: 59.7, openRate: 49.8, clickRate: 7.1, revPerRecipient: 0.42, lastCampaign: 'Referral Reward',         growth: 9.8,  trend: 'up' },
//     { name: 'Movers - prospects',   client: 'atlas',     size: 2980,  engagement: 21.6, openRate: 24.6, clickRate: 1.8, revPerRecipient: 0.0, lastCampaign: 'Storage Move-in Promo',    growth: -5.2, trend: 'down' },
//   ],
//
//   // Segment-builder rule presets (for the audience builder panel).
//   segmentRules: [
//     { field: 'Engagement',    op: 'opened in last', value: '30 days',       icon: 'mail-open' },
//     { field: 'Purchases',     op: 'is at least',    value: '3 orders',      icon: 'shopping-bag' },
//     { field: 'Total spend',   op: 'is over',        value: '$400',          icon: 'dollar-sign' },
//     { field: 'Last active',   op: 'is between',     value: '60 and 90 days', icon: 'clock' },
//   ],
//
//   // Deliverability deep-dive. score is the headline /100.
//   deliverability: {
//     score: 94,
//     inboxPlacement: 96.2,  // % landing in primary inbox
//     spamRate: 0.06,        // % spam complaints (target < 0.1)
//     spamScore: 1.4,        // SpamAssassin composite (target < 3.0, lower better)
//     bounceRate: 0.4,       // % hard+soft bounces
//     domainRep: 'High',     // Google Postmaster
//     senderScore: 91,       // Validity sender score /100
//     unsubRate: 0.18,       // % unsubscribe
//     blocklisted: 0,        // domains on a blocklist
//     // 7-week placement trend for the reputation panel sparkline / chart.
//     trend: {
//       weeks: ['May 12', 'May 19', 'May 26', 'Jun 2', 'Jun 9', 'Jun 16', 'Jun 23'],
//       placement: [97.1, 96.8, 95.9, 96.4, 95.2, 96.0, 96.2],
//       sender:    [93, 92, 90, 91, 89, 90, 91],
//     },
//     // Per-client placement; Verdant and Atlas are the soft spots.
//     byClient: [
//       { client: 'verdant',   placement: 91.4, status: 'amber' },
//       { client: 'lumen',     placement: 97.8, status: 'green' },
//       { client: 'northedge', placement: 98.3, status: 'green' },
//       { client: 'peak',      placement: 96.1, status: 'green' },
//       { client: 'casaverde', placement: 97.0, status: 'green' },
//       { client: 'atlas',     placement: 88.7, status: 'amber' },
//     ],
//     // DNS authentication status per sending domain. The GoHighLevel-killer.
//     auth: [
//       { client: 'verdant',   domain: 'send.verdantskin.co',   spf: 'pass', dkim: 'pass', dmarc: 'warn', dmarcPolicy: 'p=quarantine', reputation: 'High',   note: 'DMARC at quarantine, move to reject after 30d clean' },
//       { client: 'lumen',     domain: 'mail.lumendental.com',  spf: 'pass', dkim: 'pass', dmarc: 'pass', dmarcPolicy: 'p=reject',     reputation: 'High',   note: 'Fully aligned' },
//       { client: 'northedge', domain: 'go.northedge.io',       spf: 'pass', dkim: 'pass', dmarc: 'pass', dmarcPolicy: 'p=reject',     reputation: 'High',   note: 'Fully aligned' },
//       { client: 'peak',      domain: 'mail.peakfitness.co',   spf: 'pass', dkim: 'pass', dmarc: 'pass', dmarcPolicy: 'p=quarantine', reputation: 'Medium', note: 'Aligned, BIMI pending' },
//       { client: 'casaverde', domain: 'mg.casaverde.com',      spf: 'pass', dkim: 'pass', dmarc: 'pass', dmarcPolicy: 'p=quarantine', reputation: 'High',   note: 'Aligned' },
//       { client: 'atlas',     domain: 'mail.atlasstorage.com', spf: 'pass', dkim: 'fail', dmarc: 'fail', dmarcPolicy: 'none',         reputation: 'Low',    note: 'DKIM key rotated by host, re-publish CNAME urgently' },
//     ],
//     // Inbox placement broken out by mailbox provider.
//     byProvider: [
//       { provider: 'Gmail',      share: 54.2, inbox: 97.4, spam: 0.9, missing: 1.7, status: 'green' },
//       { provider: 'Outlook',    share: 21.8, inbox: 92.1, spam: 4.8, missing: 3.1, status: 'amber' },
//       { provider: 'Yahoo',      share: 12.4, inbox: 95.6, spam: 2.2, missing: 2.2, status: 'green' },
//       { provider: 'Apple Mail', share: 8.9,  inbox: 98.2, spam: 0.5, missing: 1.3, status: 'green' },
//       { provider: 'Other',      share: 2.7,  inbox: 94.0, spam: 3.1, missing: 2.9, status: 'green' },
//     ],
//   },
//
//   // Recommendations awaiting strategist review. One quiet assist surface.
//   recommendations: {
//     sendTime: {
//       client: 'verdant', from: 'Tue 9:00 AM', to: 'Thu 6:30 PM', lift: 14,
//       reason: 'The active segment opens 14% more on Thursday evenings. Suggested for the next 3 sends.',
//     },
//     reengage: {
//       client: 'verdant', segment: 'Decaying VIP - 90d no open', size: 2140,
//       subject: 'We saved your favorites (and a gift)', recoverUsd: 6400,
//       body: 'A 3-email re-engagement flow for 2,140 lapsing VIPs. Suppresses unengaged after step 2 to protect deliverability. Projected to recover ~$6,400 before the Q3 launch.',
//       steps: [
//         { step: 1, delay: 'Day 0', subject: 'We saved your favorites (and a gift)', body: 'Warm re-open, free-gift hook, no discount yet.' },
//         { step: 2, delay: 'Day 3', subject: 'Still yours - here is 15% to come back', body: 'Single discount, urgency framing, ends in 72h.' },
//         { step: 3, delay: 'Day 6', subject: 'Last note before we tidy your inbox', body: 'Suppression warning. Unengaged are removed to protect the domain.' },
//       ],
//     },
//   },
// };
//