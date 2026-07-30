// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Command Center seed - the agency owner's cross-channel
//    executive cockpit. Numbers roll up from window.CLIENTS where
//    sensible and are dated relative to window.TODAY (2026-06-26).
//    This file holds data for the 'home' console cockpit.
//    ============================================================ */
//
// window.COMMAND = {
//
//   // Inline stat-rail metrics (NOT KPI cards). Deltas are vs prior month (May 2026).
//   // adSpend ~ sum of client adSpendUsd lifted with programmatic.
//   // leads ~ sum of client leads lifted with mid-month conversions.
//   // health ~ avg of client healthScores.
//   kpis: {
//     adSpendUsd:   109400,  // MTD blended spend across all paid platforms
//     adSpendDelta: 8.4,     // % vs May
//     roas:         4.1,     // blended return on ad spend
//     roasDelta:    0.3,     // absolute x change
//     leads:        1048,    // leads + conversions MTD
//     leadsDelta:   12.6,    // %
//     pipelineUsd:  318000,  // open pipeline, all from NorthEdge expansion
//     pipelineDelta: 22.0,   // %
//     mrrUsd:       47800,   // agency MRR
//     mrrDelta:     6.2,     // %
//     revenueMtdUsd: 448500, // revenue driven MTD (blended)
//     revenueDelta:  9.1,    // %
//     health:       74,      // avg portfolio health score
//     healthDelta:  -3.0,    // points (Atlas dragging)
//   },
//
//   // Cross-channel performance - the quarter, weekly (Apr-Jun).
//   // 13 weeks. Spend and revenue ladder up; revenue ~ spend * blended ROAS.
//   trend: {
//     labels: ['Apr 1', 'Apr 8', 'Apr 15', 'Apr 22', 'Apr 29', 'May 6', 'May 13', 'May 20', 'May 27', 'Jun 3', 'Jun 10', 'Jun 17', 'Jun 24'],
//     spend:   [21400, 22100, 22800, 23600, 23200, 24100, 24900, 25400, 25100, 26200, 27000, 27600, 28300],
//     revenue: [83800, 88200, 90600, 95400, 92100, 98300, 103200, 106800, 104100, 110600, 115400, 119200, 124800],
//   },
//
//   // Spend mix by channel (MTD). Ladders to ~$109.4k. Paid Ads dominant.
//   // roas is the per-channel blended return; share derived in the view.
//   channelMix: [
//     { id: 'ads',        label: 'Paid Ads',    value: 70200, roas: 4.4, color: '#f59e0b' },
//     { id: 'social',     label: 'Social',      value: 14800, roas: 3.1, color: '#a78bfa' },
//     { id: 'seo',        label: 'SEO & Local',  value: 11400, roas: 6.8, color: '#38bdf8' },
//     { id: 'email',      label: 'Email & SMS',  value: 6900,  roas: 9.2, color: '#6366f1' },
//     { id: 'content',    label: 'Content',     value: 4100,  roas: 5.5, color: '#10b981' },
//     { id: 'reputation', label: 'Reputation',  value: 2000,  roas: 0.0, color: '#f43f5e' },
//   ],
//
//   // Per-client channel status, for the health mini-list status chips.
//   // green = on track, amber = watch, red = needs action. Keys are channel ids.
//   clientChannelStatus: {
//     lumen:     { ads: 'green', seo: 'green', social: 'green', reputation: 'amber', email: 'green', content: 'green' },
//     verdant:   { ads: 'red',   seo: 'amber', social: 'green', reputation: 'green', email: 'amber', content: 'green' },
//     northedge: { ads: 'green', seo: 'green', social: 'green', reputation: 'green', email: 'green', content: 'amber' },
//     peak:      { ads: 'amber', seo: 'green', social: 'green', reputation: 'green', email: 'green', content: 'green' },
//     casaverde: { ads: 'green', seo: 'green', social: 'green', reputation: 'green', email: 'green', content: 'green' },
//     atlas:     { ads: 'amber', seo: 'red',   social: 'amber', reputation: 'amber', email: 'green', content: 'green' },
//   },
//
//   // AI Account Manager digest - the single agent surface on the cockpit.
//   // 9 actions awaiting approval; these are the top by projected impact.
//   // pendingByChannel sums to digestCount and powers the chip strip.
//   digestCount: 9,
//   pendingByChannel: [
//     { id: 'ads',        label: 'Ads',        num: 3 },
//     { id: 'reputation', label: 'Reputation', num: 2 },
//     { id: 'content',    label: 'Content',    num: 2 },
//     { id: 'social',     label: 'Social',     num: 1 },
//     { id: 'email',      label: 'Email',      num: 1 },
//   ],
//   digest: [
//     {
//       id: 'a-101',
//       client: 'verdant',
//       channel: 'ads',
//       action: 'Pause TikTok ad set "Glow Serum - Broad"',
//       why: 'CPA up 41% over 7d, ROAS 1.4x and falling. Reallocate to Meta Advantage+.',
//       impact: 'Save ~$2,340/wk',
//       impactGood: true,
//       confidence: 94,
//     },
//     {
//       id: 'a-102',
//       client: 'lumen',
//       channel: 'reputation',
//       action: 'Reply to 2-star review (Plano location)',
//       why: 'SLA breach in 6h. Draft apologizes, offers re-treatment, stays HIPAA-safe.',
//       impact: 'Protect 4.8 rating',
//       impactGood: true,
//       confidence: 88,
//     },
//     {
//       id: 'a-103',
//       client: 'northedge',
//       channel: 'content',
//       action: 'Send June performance report',
//       why: 'Drafted with commentary. 38 SQLs, $318k pipeline. Renewal call is in 9 days.',
//       impact: 'De-risk renewal',
//       impactGood: true,
//       confidence: 91,
//     },
//     {
//       id: 'a-104',
//       client: 'atlas',
//       channel: 'ads',
//       action: 'Shift $1,800 Google budget to top 3 facilities',
//       why: 'Atlanta-Midtown & Decatur convert 2.1x; 4 zips overspending on no-intent terms.',
//       impact: '+~28 move-ins/mo',
//       impactGood: true,
//       confidence: 79,
//     },
//     {
//       id: 'a-105',
//       client: 'casaverde',
//       channel: 'social',
//       action: 'Publish 6 approved July social posts',
//       why: 'Client approved 6 of 8. Schedule across IG + GBP for the patio-season push.',
//       impact: '+~14k reach',
//       impactGood: true,
//       confidence: 96,
//     },
//   ],
//
//   // Needs-attention feed. `days` -> daysAgo(days) for the timestamp.
//   // severity: P1 (critical) sorts above P2 (warning). aiDraft surfaces the
//   // AI-proposes / human-approves affordance inline.
//   alerts: [
//     { client: 'atlas',     channel: 'crm',        level: 'red',   severity: 'P1', message: 'Churn risk: health 52, NPS 6, renewal in 5 days and unanswered', days: 0,
//       aiDraft: 'Retention save play drafted - re-engagement email + pricing concession', action: 'approvals' },
//     { client: 'verdant',   channel: 'ads',        level: 'red',   severity: 'P1', message: 'ROAS slide: blended 2.9x, 3 ad sets flagged for pause', days: 1,
//       aiDraft: 'Pause + reallocation plan drafted - shifts $2.3k/wk to Meta Advantage+', action: 'approvals' },
//     { client: 'atlas',     channel: 'seo',        level: 'red',   severity: 'P1', message: 'Rank drop: "self storage atlanta" fell 4 to 11 after core update', days: 1 },
//     { client: 'verdant',   channel: 'email',      level: 'red',   severity: 'P2', message: 'Deliverability dip: Klaviyo open rate down to 18.4% (-6.2pt)', days: 2 },
//     { client: 'peak',      channel: 'ads',        level: 'amber', severity: 'P2', message: 'Budget pacing: Meta 82% spent with 11 days left in cycle', days: 0 },
//     { client: 'lumen',     channel: 'reputation', level: 'amber', severity: 'P2', message: 'Review SLA: 2-star reply due in 6h, response drafted and pending', days: 0,
//       aiDraft: 'HIPAA-safe apology + re-treatment offer drafted', action: 'reputation' },
//     { client: 'northedge', channel: 'content',    level: 'amber', severity: 'P2', message: 'Renewal report unsent: June report drafted, renewal call in 9 days', days: 1 },
//     { client: 'casaverde', channel: 'social',     level: 'amber', severity: 'P2', message: 'Approval gap: 2 of 8 July posts unapproved, patio push starts Mon', days: 1 },
//     { client: 'peak',      channel: 'seo',        level: 'amber', severity: 'P2', message: 'GBP suspension warning on 1 of 5 locations, verification needed', days: 2 },
//   ],
//
//   // Recent wins feed.
//   wins: [
//     { client: 'lumen',     channel: 'seo',        message: 'Ranks #3 for "invisalign plano" (was #9), +1,240 monthly impressions', days: 0 },
//     { client: 'casaverde', channel: 'ads',        message: 'ROAS up to 5.2x on the patio-season campaign, CPA down 19%', days: 1 },
//     { client: 'verdant',   channel: 'reputation', message: '213 new reviews this month, 4.5 avg held through a product relaunch', days: 2 },
//     { client: 'peak',      channel: 'social',     message: 'Reels reached 132k, +14% follower growth across 5 locations', days: 3 },
//     { client: 'northedge', channel: 'content',    message: 'Pillar guide drove 38 SQLs and $318k of new pipeline this quarter', days: 4 },
//     { client: 'lumen',     channel: 'ads',        message: 'New-patient cost down to $41 (-23%) after a bid-cap reallocation', days: 5 },
//     { client: 'peak',      channel: 'email',      message: 'Win-back flow recovered 84 lapsed members, $11.2k recurring recovered', days: 6 },
//   ],
//
//   // This-week operating queue (the cockpit "on deck" feed). Counts deep-link.
//   weekAhead: [
//     { label: 'Atlas renewal',        sub: 'Renewal due, unanswered',        kind: 'renewal',  due: 'in 5d',  dot: 'red',    route: 'crm' },
//     { label: 'NorthEdge QBR',        sub: 'Quarterly business review',      kind: 'call',     due: 'in 9d',  dot: 'sky',    route: 'crm' },
//     { label: 'Verdant renewal',      sub: 'Renewal due',                    kind: 'renewal',  due: 'Jul 15', dot: 'amber',  route: 'crm' },
//     { label: '4 reports to send',    sub: 'NorthEdge, Lumen, Peak, CasaVerde', kind: 'report', due: 'this wk', dot: 'sky',  route: 'reporting' },
//     { label: '11 posts scheduled',   sub: '6 CasaVerde, 5 Peak',            kind: 'post',     due: 'this wk', dot: 'violet', route: 'social' },
//     { label: '9 awaiting approval',  sub: 'Across 5 clients',               kind: 'approval', due: 'queued', dot: 'green',  route: 'approvals' },
//   ],
//
//   // Governance / automation summary - the closed-loop framing.
//   governance: {
//     autoApproved: 142,   // actions auto-approved this month under policy
//     hoursSaved:   38,    // est. specialist hours saved this month
//     approvalRate: 96,    // % of AI proposals approved (vs dismissed)
//     avgReviewMin: 4,     // avg minutes from proposal to human decision
//   },
// };
//