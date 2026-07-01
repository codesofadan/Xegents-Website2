/* ============================================================
   Clients macro - hub + micro sub-modules, dense pro-tool look.
     clients  :: DENSE LIST   (full-bleed roster, sparklines)
     client   :: RECORD PAGE  (self-wrapped 360 record)
   Uses window.CLIENTS / getClient / getTeam / getChannel. Small
   extra consts (activity, per-channel metrics, renewal/health,
   invoices, drivers, upsells, comms, docs) are defined locally -
   data/clients.js is owned upstream and must not be edited.
   ============================================================ */

window.PAGES = window.PAGES || {};
window.PAGES_AFTER = window.PAGES_AFTER || {};
window.FULLBLEED = window.FULLBLEED || new Set();
window.FULLBLEED.add('clients');

(function () {

  const statusColor = (s) => s === 'critical' ? 'var(--red)' : s === 'at_risk' ? 'var(--amber)' : 'var(--acc)';
  const statusDot   = (s) => s === 'critical' ? 'red' : s === 'at_risk' ? 'amber' : 'green';
  const statusLabel = (s) => s === 'critical' ? 'Critical' : s === 'at_risk' ? 'At risk' : 'Healthy';
  const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');

  // --- Per-client channel headline metric (what the AM watches per channel) ---
  const CHANNEL_METRIC = {
    lumen:     { seo: '#3 invisalign plano', ads: '6.4x ROAS', social: '41.2k reach', reputation: '4.8 . 64 new', content: '8 posts live' },
    verdant:   { ads: '2.9x ROAS', social: '286k reach', email: '24% open', content: '12 posts live', reputation: '4.5 . 213 new' },
    northedge: { ads: '142 MQLs', content: '6 briefs', seo: '#7 avg rank', email: '31% open' },
    peak:      { social: '132k reach', ads: '4.1x ROAS', email: '29% open', reputation: '4.7 . 88 new', seo: '#5 avg rank' },
    casaverde: { social: '96.4k reach', reputation: '4.6 . 147 new', seo: '#3 avg rank', ads: '5.2x ROAS' },
    atlas:     { seo: '#9 avg rank', ads: '3.3x ROAS', reputation: '4.2 . 41 new' },
  };

  // --- Per-client channel status (lights up the channel-mix grid) ---
  const CHANNEL_STATUS = {
    lumen:     { seo: 'healthy', ads: 'healthy', social: 'healthy', reputation: 'healthy', content: 'healthy' },
    verdant:   { ads: 'at_risk', social: 'healthy', email: 'at_risk', content: 'healthy', reputation: 'healthy' },
    northedge: { ads: 'healthy', content: 'healthy', seo: 'healthy', email: 'healthy' },
    peak:      { social: 'healthy', ads: 'healthy', email: 'healthy', reputation: 'healthy', seo: 'healthy' },
    casaverde: { social: 'healthy', reputation: 'healthy', seo: 'healthy', ads: 'healthy' },
    atlas:     { seo: 'critical', ads: 'at_risk', reputation: 'at_risk' },
  };

  // --- Recent cross-channel activity per client ---
  const ACTIVITY = {
    lumen: [
      { ch: 'seo',        text: 'Now ranks #3 for "invisalign plano", up from #7', days: 0 },
      { ch: 'reputation', text: 'Published 9 five-star review replies', days: 0 },
      { ch: 'ads',        text: 'New patient search campaign hit 6.4x ROAS', days: 1 },
      { ch: 'content',    text: 'Drafted 4 blog posts on Invisalign vs braces', days: 2 },
      { ch: 'social',     text: 'Frisco location reel reached 18.4k views', days: 3 },
      { ch: 'reputation', text: 'Sent 412 post-visit SMS review requests', days: 4 },
      { ch: 'seo',        text: 'GBP profile verified for new Frisco office', days: 6 },
    ],
    verdant: [
      { ch: 'ads',        text: 'Flagged 3 TikTok ad sets to pause - CPA up 41%', days: 0 },
      { ch: 'email',      text: 'Win-back flow open rate slipped to 24%', days: 1 },
      { ch: 'reputation', text: 'Drafted reply to 1-star damaged-shipment review', days: 1 },
      { ch: 'social',     text: 'UGC creator collab hit 286k reach', days: 2 },
      { ch: 'content',    text: 'Produced 12 product-edu posts for July', days: 3 },
      { ch: 'ads',        text: 'Meta blended ROAS held at 2.9x against target 3.5x', days: 4 },
    ],
    northedge: [
      { ch: 'ads',        text: 'Demand-gen brought 142 MQLs, 38 SQLs this cycle', days: 0 },
      { ch: 'content',    text: 'Shipped 6 mid-funnel comparison briefs', days: 1 },
      { ch: 'email',      text: 'Nurture sequence drove $318k open pipeline', days: 2 },
      { ch: 'seo',        text: 'Cluster on "project management for agencies" ranked', days: 4 },
      { ch: 'ads',        text: 'Rebalanced LinkedIn budget toward ICP audiences', days: 5 },
    ],
    peak: [
      { ch: 'social',     text: 'Scottsdale transformation reel reached 132k', days: 0 },
      { ch: 'ads',        text: 'New-member challenge campaign at 4.1x ROAS', days: 1 },
      { ch: 'reputation', text: 'Published 7 five-star replies', days: 2 },
      { ch: 'email',      text: 'Class-reminder SMS lifted check-ins 9%', days: 3 },
      { ch: 'seo',        text: '5-location GBP posts scheduled for June', days: 5 },
    ],
    casaverde: [
      { ch: 'reputation', text: 'Published 12 five-star replies on Google', days: 0 },
      { ch: 'social',     text: 'Patio tasting-menu carousel hit 96.4k reach', days: 1 },
      { ch: 'seo',        text: 'Ranks #3 for "farm to table denver"', days: 2 },
      { ch: 'ads',        text: 'Weekend reservation ads at 5.2x ROAS', days: 4 },
      { ch: 'reputation', text: 'Sent 344 reservation-followup email requests', days: 6 },
    ],
    atlas: [
      { ch: 'reputation', text: 'Drafted replies to 2 negative reviews - awaiting approval', days: 0 },
      { ch: 'seo',        text: 'Avg local rank slipped to #9 across 9 facilities', days: 1 },
      { ch: 'ads',        text: 'Flagged "boat & RV storage" ad group, CPA rising', days: 2 },
      { ch: 'reputation', text: 'Buckhead gate complaints escalated to district mgr', days: 3 },
      { ch: 'seo',        text: '5 GBP listings missing hours - fix queued', days: 4 },
      { ch: 'ads',        text: 'Move-in landing page conversion down 18%', days: 6 },
    ],
  };

  // --- Renewal / health detail per client ---
  const HEALTH = {
    lumen:     { churnRisk: 6,  openIssues: 0, qbrDays: 28 },
    verdant:   { churnRisk: 34, openIssues: 4, qbrDays: 9 },
    northedge: { churnRisk: 11, openIssues: 1, qbrDays: 41 },
    peak:      { churnRisk: 13, openIssues: 1, qbrDays: 19 },
    casaverde: { churnRisk: 8,  openIssues: 0, qbrDays: 33 },
    atlas:     { churnRisk: 48, openIssues: 6, qbrDays: 5 },
  };

  // --- Per-channel 7-point trend (for sparklines on active channel tiles) ---
  const CHANNEL_SPARK = {
    lumen:     { seo: [7,6,5,5,4,4,3], ads: [5.2,5.6,5.8,6.0,6.1,6.3,6.4], social: [31,34,36,38,39,40,41], reputation: [4.6,4.6,4.7,4.7,4.8,4.8,4.8], content: [3,4,5,6,6,7,8] },
    verdant:   { ads: [3.6,3.4,3.3,3.1,3.0,2.9,2.9], social: [240,252,261,270,278,283,286], email: [29,28,27,26,25,24,24], content: [6,7,9,10,11,12,12], reputation: [4.6,4.6,4.5,4.5,4.5,4.5,4.5] },
    northedge: { ads: [98,112,124,131,136,140,142], content: [2,3,4,4,5,6,6], seo: [9,8,8,7,7,7,7], email: [24,26,27,28,29,30,31] },
    peak:      { social: [104,112,118,124,128,130,132], ads: [3.4,3.6,3.8,3.9,4.0,4.0,4.1], email: [24,25,26,27,28,28,29], reputation: [4.5,4.6,4.6,4.7,4.7,4.7,4.7], seo: [7,7,6,6,5,5,5] },
    casaverde: { social: [78,82,86,90,93,95,96], reputation: [4.4,4.5,4.5,4.6,4.6,4.6,4.6], seo: [5,4,4,4,3,3,3], ads: [4.4,4.6,4.8,5.0,5.1,5.2,5.2] },
    atlas:     { seo: [6,6,7,7,8,8,9], ads: [4.0,3.8,3.6,3.5,3.4,3.3,3.3], reputation: [4.5,4.4,4.4,4.3,4.3,4.2,4.2] },
  };

  // --- Contract / billing: recent invoices keyed by client id ---
  const INVOICES = {
    lumen: [
      { num: 'GB-2406-014', days: 4,   amt: 9500, status: 'paid' },
      { num: 'GB-2405-011', days: 35,  amt: 9500, status: 'paid' },
      { num: 'GB-2404-009', days: 65,  amt: 9500, status: 'paid' },
      { num: 'GB-2403-007', days: 96,  amt: 9500, status: 'paid' },
      { num: 'GB-2402-005', days: 124, amt: 8800, status: 'paid' },
      { num: 'GB-2401-003', days: 155, amt: 8800, status: 'paid' },
    ],
    verdant: [
      { num: 'GB-2406-018', days: 2,   amt: 11200, status: 'overdue' },
      { num: 'GB-2405-015', days: 32,  amt: 11200, status: 'paid' },
      { num: 'GB-2404-012', days: 63,  amt: 11200, status: 'paid' },
      { num: 'GB-2403-010', days: 93,  amt: 10500, status: 'paid' },
      { num: 'GB-2402-008', days: 122, amt: 10500, status: 'paid' },
      { num: 'GB-2401-006', days: 153, amt: 9800,  status: 'paid' },
    ],
    northedge: [
      { num: 'GB-2406-016', days: 6,   amt: 8800, status: 'due' },
      { num: 'GB-2405-013', days: 36,  amt: 8800, status: 'paid' },
      { num: 'GB-2404-011', days: 67,  amt: 8800, status: 'paid' },
      { num: 'GB-2403-008', days: 97,  amt: 8200, status: 'paid' },
      { num: 'GB-2402-006', days: 128, amt: 8200, status: 'paid' },
      { num: 'GB-2401-004', days: 159, amt: 8200, status: 'paid' },
    ],
    peak: [
      { num: 'GB-2406-021', days: 5,   amt: 6400, status: 'paid' },
      { num: 'GB-2405-017', days: 35,  amt: 6400, status: 'paid' },
      { num: 'GB-2404-014', days: 66,  amt: 6400, status: 'paid' },
      { num: 'GB-2403-012', days: 96,  amt: 5800, status: 'paid' },
      { num: 'GB-2402-010', days: 127, amt: 5800, status: 'paid' },
    ],
    casaverde: [
      { num: 'GB-2406-023', days: 3,   amt: 4200, status: 'paid' },
      { num: 'GB-2405-019', days: 33,  amt: 4200, status: 'paid' },
      { num: 'GB-2404-016', days: 64,  amt: 4200, status: 'paid' },
      { num: 'GB-2403-014', days: 94,  amt: 3900, status: 'paid' },
      { num: 'GB-2402-012', days: 125, amt: 3900, status: 'paid' },
    ],
    atlas: [
      { num: 'GB-2406-025', days: 1,   amt: 7700, status: 'overdue' },
      { num: 'GB-2405-021', days: 28,  amt: 7700, status: 'overdue' },
      { num: 'GB-2404-018', days: 59,  amt: 7700, status: 'paid' },
      { num: 'GB-2403-016', days: 89,  amt: 7700, status: 'paid' },
      { num: 'GB-2402-014', days: 120, amt: 7200, status: 'paid' },
      { num: 'GB-2401-011', days: 151, amt: 7200, status: 'paid' },
    ],
  };

  // --- QBR / health drivers: what is pushing the score up or down ---
  const DRIVERS = {
    lumen: [
      { dir: 'up',   text: 'Invisalign cluster ranks #3, up from #7', delta: '+7 ranks' },
      { dir: 'up',   text: 'Paid ROAS at 6.4x against 5.0x target', delta: '+1.4x' },
      { dir: 'up',   text: 'Review velocity strong at 64 new this month', delta: '+18' },
      { dir: 'down', text: 'Frisco GBP still pending category verification', delta: '1 open' },
    ],
    verdant: [
      { dir: 'down', text: 'Blended ROAS 2.9x under 3.5x target', delta: '-0.6x' },
      { dir: 'down', text: 'Win-back email open rate slipped', delta: '-5 pts' },
      { dir: 'down', text: 'Checkout flow conversion down month over month', delta: '-1.4 pts' },
      { dir: 'up',   text: 'UGC creator collab lifted reach to 286k', delta: '+12%' },
      { dir: 'up',   text: 'Reputation steady at 4.5 with 213 new reviews', delta: '+213' },
    ],
    northedge: [
      { dir: 'up',   text: 'Demand-gen produced 142 MQLs, 38 SQLs', delta: '+142' },
      { dir: 'up',   text: 'Nurture sequence drove open pipeline', delta: '+$318k' },
      { dir: 'up',   text: 'Comparison cluster ranked on page one', delta: '+4 ranks' },
      { dir: 'down', text: 'CAC on LinkedIn drifting above target', delta: '-1 issue' },
    ],
    peak: [
      { dir: 'up',   text: 'Scottsdale reel reached 132k organically', delta: '+21%' },
      { dir: 'up',   text: 'New-member challenge ads at 4.1x ROAS', delta: '+0.6x' },
      { dir: 'up',   text: 'Class-reminder SMS lifted check-ins', delta: '+9%' },
      { dir: 'down', text: 'Email list growth flat across 5 locations', delta: '-0 net' },
    ],
    casaverde: [
      { dir: 'up',   text: 'Ranks #3 for "farm to table denver"', delta: '+2 ranks' },
      { dir: 'up',   text: 'Reservation ads holding 5.2x ROAS', delta: '+0.4x' },
      { dir: 'up',   text: 'Patio carousel reached 96.4k', delta: '+15%' },
      { dir: 'down', text: 'Email channel not yet activated', delta: '1 gap' },
    ],
    atlas: [
      { dir: 'down', text: 'Avg local rank slipped to #9 across 9 facilities', delta: '-7 ranks' },
      { dir: 'down', text: 'Review velocity down, 2 negative replies pending', delta: '-2 issues' },
      { dir: 'down', text: 'Open issues climbed across facilities', delta: '6 open' },
      { dir: 'down', text: 'Move-in landing page conversion down', delta: '-18%' },
      { dir: 'up',   text: 'Paid still holding 3.3x ROAS on storage terms', delta: '+0.3x' },
    ],
  };

  // --- Growth opportunities (add-on channels) ---
  const UPSELLS = {
    lumen: [
      { ch: 'email', mrr: 1400, health: 9,  note: 'Recall + reactivation flows for 7-location patient base' },
      { ch: 'content', mrr: 900, health: 5, note: 'Procedure-page content engine to defend organic gains' },
    ],
    verdant: [
      { ch: 'seo', mrr: 1800, health: 11, note: 'Organic moat to cut paid dependence below 3.5x target' },
    ],
    northedge: [
      { ch: 'social', mrr: 1200, health: 7, note: 'LinkedIn thought-leadership to feed demand-gen pipeline' },
      { ch: 'reputation', mrr: 700, health: 5, note: 'G2 + Capterra review program for buyer trust' },
    ],
    peak: [
      { ch: 'content', mrr: 800,  health: 6, note: 'Local fitness blog to lift 5-location organic footprint' },
    ],
    casaverde: [
      { ch: 'email', mrr: 900,  health: 8, note: 'Reservation + loyalty flows to lift repeat covers' },
      { ch: 'content', mrr: 700, health: 5, note: 'Seasonal menu storytelling for organic and social' },
    ],
    atlas: [
      { ch: 'social', mrr: 1100, health: 7, note: 'Geo-targeted move-in offers across 9 facilities' },
      { ch: 'content', mrr: 900, health: 6, note: 'Facility + city pages to recover local rank' },
      { ch: 'email', mrr: 800,  health: 5, note: 'Tenant lifecycle + late-payment recovery flows' },
    ],
  };

  // --- Communication log: human touchpoints with the contact ---
  const COMMS = {
    lumen: [
      { kind: 'qbr',   who: 'Omar Farooq',  text: 'Q2 business review with Dr. Nair - approved Frisco expansion', days: 6 },
      { kind: 'email', who: 'Dr. Priya Nair', text: 'Confirmed budget for new patient acquisition push', days: 9, inbound: true },
      { kind: 'call',  who: 'Omar Farooq',  text: '30-min check-in on Invisalign ranking momentum', days: 14 },
      { kind: 'slack', who: 'Dr. Priya Nair', text: 'Shared 3 new five-star reviews from Plano location', days: 18, inbound: true },
      { kind: 'email', who: 'Omar Farooq',  text: 'Sent May performance recap and June plan', days: 26 },
    ],
    verdant: [
      { kind: 'call',  who: 'Khizer Abbas', text: 'Urgent call on paid efficiency - agreed save-play scope', days: 1 },
      { kind: 'email', who: 'Chloe Bennett', text: 'Pushed back on ad budget, asked for ROAS recovery plan', days: 3, inbound: true },
      { kind: 'slack', who: 'Khizer Abbas', text: 'Shared TikTok ad-set pause recommendation', days: 5 },
      { kind: 'qbr',   who: 'Khizer Abbas', text: 'Mid-quarter review - flagged checkout conversion drop', days: 11 },
      { kind: 'email', who: 'Chloe Bennett', text: 'Asked about renewal terms ahead of Jul 15', days: 16, inbound: true },
    ],
    northedge: [
      { kind: 'email', who: 'Dana Okoro',   text: 'Sent MQL-to-SQL breakdown for the cycle', days: 2 },
      { kind: 'call',  who: 'Marcus Webb',  text: 'Discussed expanding into mid-funnel content', days: 7, inbound: true },
      { kind: 'slack', who: 'Dana Okoro',   text: 'Shared comparison-brief drafts for approval', days: 10 },
      { kind: 'qbr',   who: 'Dana Okoro',   text: 'Quarterly review - pipeline contribution on track', days: 24 },
    ],
    peak: [
      { kind: 'call',  who: 'Omar Farooq',  text: 'Reviewed new-member challenge results', days: 3 },
      { kind: 'email', who: 'Tasha Greene', text: 'Loved the Scottsdale reel performance', days: 6, inbound: true },
      { kind: 'slack', who: 'Omar Farooq',  text: 'Coordinated June GBP post schedule', days: 12 },
      { kind: 'email', who: 'Omar Farooq',  text: 'Sent class-reminder SMS lift report', days: 20 },
    ],
    casaverde: [
      { kind: 'email', who: 'Aimen Riaz',   text: 'Shared patio tasting-menu campaign recap', days: 2 },
      { kind: 'call',  who: 'Diego Marquez', text: 'Talked through summer reservation push', days: 8, inbound: true },
      { kind: 'slack', who: 'Aimen Riaz',   text: 'Sent five-star review highlights', days: 15 },
      { kind: 'qbr',   who: 'Aimen Riaz',   text: 'Quarterly review - proposed email channel add-on', days: 28 },
    ],
    atlas: [
      { kind: 'call',  who: 'Sara Malik',   text: 'Escalation call on local rank slide and reviews', days: 1, inbound: true },
      { kind: 'email', who: 'Roy Caldwell', text: 'Raised concern on Buckhead gate complaints', days: 3, inbound: true },
      { kind: 'slack', who: 'Sara Malik',   text: 'Shared rank-recovery sprint plan for approval', days: 4 },
      { kind: 'qbr',   who: 'Sara Malik',   text: 'Emergency QBR - renewal at risk, save-play presented', days: 8 },
      { kind: 'email', who: 'Roy Caldwell', text: 'Asked for weekly updates until rank recovers', days: 12, inbound: true },
    ],
  };

  // --- Documents / files per client ---
  const DOCS = {
    lumen: [
      { name: 'Master service agreement.pdf', type: 'contract', days: 295 },
      { name: 'Q2 2026 QBR deck.pdf',          type: 'deck',     days: 6 },
      { name: 'May performance report.pdf',     type: 'report',   days: 26 },
      { name: 'Local SEO audit - 7 locations.pdf', type: 'audit', days: 88 },
      { name: 'Brand guidelines v3.pdf',        type: 'brand',    days: 140 },
      { name: 'Frisco expansion brief.docx',    type: 'doc',      days: 9 },
    ],
    verdant: [
      { name: 'Growth retainer agreement.pdf',  type: 'contract', days: 162 },
      { name: 'Mid-quarter review deck.pdf',    type: 'deck',     days: 11 },
      { name: 'Paid efficiency save-play.pdf',  type: 'doc',      days: 1 },
      { name: 'CRO audit - checkout flow.pdf',  type: 'audit',    days: 14 },
      { name: 'Brand kit + tone of voice.pdf',  type: 'brand',    days: 150 },
      { name: 'April performance report.pdf',   type: 'report',   days: 55 },
    ],
    northedge: [
      { name: 'Demand-gen retainer SOW.pdf',    type: 'contract', days: 218 },
      { name: 'Q1 2026 QBR deck.pdf',           type: 'deck',     days: 24 },
      { name: 'ICP + messaging audit.pdf',      type: 'audit',    days: 70 },
      { name: 'May pipeline report.pdf',        type: 'report',   days: 26 },
      { name: 'Comparison content briefs.docx', type: 'doc',      days: 10 },
      { name: 'Brand guidelines.pdf',           type: 'brand',    days: 200 },
    ],
    peak: [
      { name: 'Full retainer agreement.pdf',    type: 'contract', days: 136 },
      { name: 'Q1 2026 QBR deck.pdf',           type: 'deck',     days: 30 },
      { name: 'New-member campaign brief.docx', type: 'doc',      days: 8 },
      { name: '5-location SEO audit.pdf',       type: 'audit',    days: 95 },
      { name: 'Brand assets pack.pdf',          type: 'brand',    days: 130 },
    ],
    casaverde: [
      { name: 'Local + social agreement.pdf',   type: 'contract', days: 96 },
      { name: 'Q1 2026 QBR deck.pdf',           type: 'deck',     days: 28 },
      { name: 'Reservation campaign recap.pdf', type: 'report',   days: 33 },
      { name: 'GBP + local audit.pdf',          type: 'audit',    days: 80 },
      { name: 'Brand + menu photography.pdf',   type: 'brand',    days: 90 },
    ],
    atlas: [
      { name: 'Local SEO + paid agreement.pdf', type: 'contract', days: 329 },
      { name: 'Emergency QBR deck.pdf',         type: 'deck',     days: 8 },
      { name: 'Rank-recovery sprint plan.pdf',  type: 'doc',      days: 4 },
      { name: '9-facility local audit.pdf',     type: 'audit',    days: 12 },
      { name: 'Brand guidelines.pdf',           type: 'brand',    days: 280 },
      { name: 'May performance report.pdf',     type: 'report',   days: 26 },
    ],
  };

  const DOC_ICON = { contract: 'file-signature', deck: 'presentation', report: 'file-bar-chart-2', audit: 'file-search', brand: 'palette', doc: 'file-text' };
  const COMM_ICON  = { email: 'mail', call: 'phone', qbr: 'presentation', slack: 'message-square' };
  const COMM_COLOR = { email: 'var(--sky)', call: 'var(--acc-bright)', qbr: 'var(--violet)', slack: 'var(--amber)' };

  const renewalDaysOf = (c) => Math.round((new Date(c.renewalAt) - new Date(window.TODAY)) / 86400000);

  /* ====================================================================
     ROSTER  -  window.PAGES.clients  ::  DENSE LIST (full-bleed)
     ==================================================================== */
  function renderClients() {
    const rows = window.CLIENTS;
    const totalMrr = rows.reduce((s, c) => s + c.mrrUsd, 0);
    const avgHealth = Math.round(rows.reduce((s, c) => s + c.healthScore, 0) / rows.length);
    const atRisk = rows.filter(c => c.status !== 'healthy').length;
    const renew90 = rows.filter(c => { const d = renewalDaysOf(c); return d >= 0 && d <= 90; }).length;
    const exposed = rows.filter(c => c.status !== 'healthy').reduce((s, c) => s + c.mrrUsd, 0);

    // Portfolio stat rail in the header - no KPI-card band.
    const header = `<div class="px-7 pt-7 pb-0">
      ${LX.modHead({
        title: 'Clients',
        sub: rows.length + ' active retainers across 6 verticals - ' + atRisk + ' need attention. Click a row to open the 360 record.',
        stats: [
          { k: 'Clients', v: rows.length },
          { k: 'Total MRR', v: formatMoney(totalMrr), delta: 4.2, deltaUnit: '%' },
          { k: 'Avg health', v: avgHealth, delta: -2, deltaUnit: 'pt' },
          { k: 'Renewals < 90d', v: renew90 },
          { k: 'At risk', v: atRisk },
          { k: 'MRR exposed', v: formatMoney(exposed) },
        ],
        actions: `${UI.btn('Export book', { variant: 'secondary', size: 'sm', icon: 'download' })}
          ${UI.btn('Add client', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="modal" data-title="Add client" data-body="Create a new client record and assign an account manager."`)}`,
      })}
      <div class="toolbar" style="margin-bottom:0">
        ${UI.searchInput('Search clients', 'w-72')}
        ${LX.segmented([
          { id: 'all', label: 'All' },
          { id: 'attention', label: 'Need attention' },
          { id: 'healthy', label: 'Healthy' },
          { id: 'renewing', label: 'Renewing < 90d' },
        ])}
        <div class="grow"></div>
        ${UI.btn('Sort', { variant: 'ghost', size: 'sm', icon: 'arrow-up-down' }).replace('<button', `<button data-action="menu" data-menu='["MRR high to low","Health low to high","Renewal soonest","NPS high to low"]'`)}
      </div></div>`;

    const npsColor = (n) => n >= 9 ? 'var(--acc-bright)' : n >= 7 ? 'var(--amber)' : 'var(--red)';
    const chipFor = (id) => {
      const ch = getChannel(id);
      return `<span class="inline-flex items-center gap-1 px-1.5 rounded" style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1);height:18px;font-size:10px;color:var(--text-2)"><i data-lucide="${ch ? ch.icon : 'circle'}" class="size-2.5" style="color:${ch ? ch.color : 'var(--text-3)'}"></i>${ch ? ch.label : id}</span>`;
    };

    function rowsFor(filter) {
      if (filter === 'attention') return rows.filter(c => c.status !== 'healthy');
      if (filter === 'healthy')   return rows.filter(c => c.status === 'healthy');
      if (filter === 'renewing')  return rows.filter(c => { const d = renewalDaysOf(c); return d >= 0 && d <= 90; });
      return rows;
    }

    function listFor(filter) {
      return LX.dataList({
        columns: [
          { key: 'name', label: 'Client', render: (c) => `
            <div class="flex items-center gap-2.5">
              <span class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:${c.logoColor}1f">
                <i data-lucide="${c.icon}" class="size-3.5" style="color:${c.logoColor}"></i>
              </span>
              <div class="min-w-0">
                <div class="text-[12.5px] text-1 font-medium truncate" style="max-width:200px">${c.name}</div>
                <div class="text-[10px] text-3 truncate" style="max-width:200px">${c.location.split('(')[0].trim()}</div>
              </div>
            </div>` },
          { key: 'vertical', label: 'Vertical', render: (c) => `<span class="text-[12px] text-2">${c.vertical}</span>` },
          { key: 'healthScore', label: 'Health', align: 'r', mono: true, width: '120px', render: (c) => {
              const col = statusColor(c.status);
              return `<div class="flex items-center gap-2 justify-end">
                <div style="width:54px">${LX.bar(c.healthScore, col)}</div>
                <span class="num text-[12px] font-semibold w-6 text-right" style="color:${col}">${c.healthScore}</span></div>`;
            } },
          { key: 'status', label: 'Status', render: (c) => `<span class="status status-${statusDot(c.status)}">${statusLabel(c.status)}</span>` },
          { key: 'mrrUsd', label: 'MRR', align: 'r', mono: true, render: (c) => `<span class="text-1 font-medium">${formatMoney(c.mrrUsd)}</span>` },
          { key: 'channels', label: 'Channels', width: '210px', render: (c) => `<div class="flex flex-wrap gap-1">${c.channels.map(chipFor).join('')}</div>` },
          { key: 'am', label: 'AM', render: (c) => { const am = getTeam(c.am); return `<span class="flex items-center gap-1.5">${UI.avatar(am ? am.name : 'NA', am ? am.avatarColor : '#565659', 18)}<span class="text-[11.5px] text-2 truncate" style="max-width:110px">${am ? am.name : 'Unassigned'}</span></span>`; } },
          { key: 'renewalAt', label: 'Renewal', align: 'r', mono: true, render: (c) => { const d = renewalDaysOf(c); const soon = d >= 0 && d <= 90; return `<span class="text-[11.5px] ${soon ? 'text-amber' : 'text-2'}">${shortDate(c.renewalAt)}</span>`; } },
          { key: 'nps', label: 'NPS', align: 'r', mono: true, render: (c) => `<span class="font-medium" style="color:${npsColor(c.nps)}">${c.nps}</span>` },
          { key: 'spark', label: 'Health trend', align: 'r', width: '110px', render: (c) => `<span class="cell-spark">${sparkSvg(c.spark, statusColor(c.status), 88, 22)}</span>` },
        ],
        rows: rowsFor(filter),
        rowAttrs: (c) => `onclick="navigate('client',{id:'${c.id}'})" data-title="${esc(c.name)}"`,
      });
    }

    const filters = ['all', 'attention', 'healthy', 'renewing'];
    const panes = filters.map((f, i) =>
      `<div data-pane="${f}" class="${i === 0 ? '' : 'hidden'}">${listFor(f)}</div>`).join('');

    return `<div class="flex flex-col" style="height:calc(100vh - 44px)">
      <div data-tabwrap class="flex flex-col min-h-0 flex-1">
        ${header}
        <div class="flex-1 overflow-auto" style="margin-top:10px">${panes}</div>
      </div>
    </div>`;
  }

  window.PAGES.clients = renderClients;

  /* ====================================================================
     DETAIL  -  window.PAGES.client  ::  RECORD PAGE (self-wrapped)
     ==================================================================== */
  function renderClient(params) {
    const id = (params && params.id) || window.CLIENTS[0].id;
    const c = getClient(id) || window.CLIENTS[0];
    const color = statusColor(c.status);
    const am = getTeam(c.am);
    const h = HEALTH[c.id] || { churnRisk: 0, openIssues: 0, qbrDays: 30 };
    const k = c.kpis;
    const renewalDays = renewalDaysOf(c);
    const termYears = Math.max(1, Math.round((new Date(c.renewalAt) - new Date(c.startedAt)) / (365 * 86400000)));

    // --- Record header (mark + name + status + meta) ---
    const recordHead = LX.recordHead({
      mark: `<i data-lucide="${c.icon}" class="size-6"></i>`,
      markColor: c.logoColor,
      title: c.name,
      sub: c.industry + ' . ' + c.location + (c.locations > 1 ? ' . ' + c.locations + ' locations' : ''),
      meta: [
        { k: 'MRR', v: formatMoney(c.mrrUsd) + '/mo' },
        { k: 'Tier', v: c.tier },
        { k: 'Renewal', v: shortDate(c.renewalAt) + ' (' + renewalDays + 'd)' },
        { k: 'AM', v: am ? am.name : 'Unassigned' },
        { k: 'Contact', v: c.contact.name },
        { k: 'Health', v: `<span style="color:${color}">${c.healthScore}</span> . ${statusLabel(c.status)}` },
      ],
      actions: `
        ${UI.btn('Back to clients', { variant: 'ghost', icon: 'arrow-left', size: 'sm', onClick: "navigate('clients')" })}
        ${UI.btn('Build report', { variant: 'secondary', icon: 'bar-chart-3', size: 'sm', onClick: "navigate('reporting')" })}
        ${UI.btn('QBR deck', { variant: 'primary', icon: 'presentation', size: 'sm' }).replace('<button', `<button data-action="confirm" data-toast="QBR deck queued for ${esc(c.name)}"`)}`,
    });

    // --- Per-active-channel panel tiles (metric + spark + link) ---
    const metrics = CHANNEL_METRIC[c.id] || {};
    const chStatus = CHANNEL_STATUS[c.id] || {};
    const chSpark = CHANNEL_SPARK[c.id] || {};
    const activeChannels = c.channels.map(id => getChannel(id)).filter(Boolean);
    const channelTile = (ch) => {
      const st = chStatus[ch.id] || 'healthy';
      const metric = metrics[ch.id] || 'Active';
      const svals = chSpark[ch.id];
      const sColor = st === 'critical' ? 'var(--red)' : st === 'at_risk' ? 'var(--amber)' : ch.color;
      return LX.panel({
        title: ch.label,
        actions: `<span class="status status-${statusDot(st)} text-[10px]">${statusLabel(st)}</span>`,
        body: `<div class="cursor-pointer" onclick="navigate('${ch.route}')">
          <div class="flex items-end justify-between gap-2">
            <div>
              <div class="text-[15px] font-semibold num text-1">${metric}</div>
              <div class="text-[10.5px] text-3 mt-1 flex items-center gap-1">Open ${ch.label}<i data-lucide="arrow-up-right" class="size-3"></i></div>
            </div>
            ${svals ? `<span class="cell-spark shrink-0" style="width:84px">${sparkSvg(svals, sColor, 84, 26)}</span>` : ''}
          </div>
        </div>`,
      });
    };
    const inactive = window.CHANNELS.filter(ch => !c.channels.includes(ch.id));
    const channelsPanel = LX.panel({
      title: 'Active channels',
      actions: `<span class="text-[10.5px] text-3 num">${activeChannels.length} of ${window.CHANNELS.length} active</span>`,
      bare: true,
      body: `<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-3.5">
          ${activeChannels.map(channelTile).join('')}
        </div>
        ${inactive.length ? `<div class="px-3.5 py-2.5 flex items-center gap-2 flex-wrap text-[11px]" style="border-top:1px solid var(--line-1)">
          <span class="text-3">Not active:</span>
          ${inactive.map(ch => `<button class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] text-2 hover:text-1" style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)" data-action="modal" data-title="Propose ${ch.label} add-on" data-body="Draft a ${ch.label} proposal for ${esc(c.name)}."><i data-lucide="${ch.icon}" class="size-3" style="color:${ch.color}"></i>${ch.label}</button>`).join('')}
        </div>` : ''}`,
    });

    // --- Activity timeline ---
    const acts = ACTIVITY[c.id] || [];
    const actRow = (a) => {
      const ch = getChannel(a.ch);
      return `<div class="flex items-start gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <span class="size-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style="background:${ch ? ch.color : '#565659'}1f">
          <i data-lucide="${ch ? ch.icon : 'circle'}" class="size-3" style="color:${ch ? ch.color : 'var(--text-3)'}"></i>
        </span>
        <div class="flex-1 min-w-0">
          <div class="text-[10px] text-3 uppercase tracking-wide mb-0.5">${ch ? ch.label : a.ch}</div>
          <div class="text-[12.5px] text-1 leading-snug">${a.text}</div>
        </div>
        <span class="text-[10.5px] text-3 num shrink-0 mt-0.5">${shortDate(daysAgo(a.days))}</span>
      </div>`;
    };
    const timelinePanel = LX.panel({
      title: 'Channel activity',
      actions: `<span class="text-[10.5px] text-3 num">${acts.length} this week</span>`,
      bare: true,
      body: acts.map(actRow).join(''),
    });

    // --- Health / renewal panel ---
    const churnColor = h.churnRisk >= 30 ? 'var(--red)' : h.churnRisk >= 15 ? 'var(--amber)' : 'var(--acc-bright)';
    const drivers = DRIVERS[c.id] || [];
    const driverUp = drivers.filter(d => d.dir === 'up');
    const driverDown = drivers.filter(d => d.dir === 'down');
    const driverRow = (d) => `
      <div class="flex items-start gap-2 px-3.5 py-2" style="border-top:1px solid var(--line-1)">
        <i data-lucide="${d.dir === 'up' ? 'trending-up' : 'trending-down'}" class="size-3.5 mt-0.5 shrink-0 ${d.dir === 'up' ? 'text-acc-bright' : 'text-red'}"></i>
        <div class="flex-1 text-[12px] text-2 leading-snug">${d.text}</div>
        <span class="num text-[11px] shrink-0 mt-0.5 ${d.dir === 'up' ? 'text-acc-bright' : 'text-red'}">${d.delta}</span>
      </div>`;
    const statLine = (label, valHtml) => `<div class="flex items-center justify-between px-3.5 py-2.5" style="border-top:1px solid var(--line-1)"><span class="text-[12px] text-2">${label}</span>${valHtml}</div>`;
    const healthPanel = LX.panel({
      title: 'Renewal & health',
      actions: `<span class="status status-${statusDot(c.status)} text-[10px]">${statusLabel(c.status)}</span>`,
      bare: true,
      body: `
        <div class="flex items-center gap-4 px-3.5 py-3.5">
          ${scoreRing(c.healthScore, color, 56)}
          <div class="flex-1">
            <div class="text-[12px] text-2">Renews in <span class="num text-1 font-medium">${renewalDays}d</span></div>
            <div class="text-[11px] text-3 num mt-0.5">${shortDate(c.renewalAt)} . ${termYears}yr term</div>
          </div>
        </div>
        ${statLine('Churn risk', `<div class="flex items-center gap-2"><div class="w-20">${UI.progressBar(h.churnRisk, 100, churnColor, 4)}</div><span class="num text-[12px]" style="color:${churnColor}">${h.churnRisk}%</span></div>`)}
        ${statLine('Open issues', `<span class="num text-[12px] ${h.openIssues > 0 ? 'text-amber' : 'text-2'}">${h.openIssues}</span>`)}
        ${statLine('NPS', `<span class="num text-[12px] text-1">${c.nps} / 10</span>`)}
        ${statLine('Next QBR', `<span class="num text-[12px] text-1">${shortDate(daysAhead(h.qbrDays))}</span>`)}
        <div class="px-3.5 pt-3 pb-1" style="border-top:1px solid var(--line-1)">
          <div class="eyebrow text-acc-bright mb-1">Pushing up (${driverUp.length})</div>
        </div>
        ${driverUp.length ? driverUp.map(driverRow).join('') : `<div class="px-3.5 py-2 text-[11.5px] text-3" style="border-top:1px solid var(--line-1)">None this cycle</div>`}
        <div class="px-3.5 pt-3 pb-1" style="border-top:1px solid var(--line-1)">
          <div class="eyebrow text-red mb-1">Pulling down (${driverDown.length})</div>
        </div>
        ${driverDown.length ? driverDown.map(driverRow).join('') : `<div class="px-3.5 py-2 text-[11.5px] text-3" style="border-top:1px solid var(--line-1)">None this cycle</div>`}
        ${c.status !== 'healthy' ? `
          <div class="m-3.5 rounded-lg p-3.5" style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--acc-line)">
            <div class="flex items-center gap-2 mb-1.5">
              <i data-lucide="lightbulb" class="size-3.5 text-acc-bright"></i>
              <span class="text-[11px] font-semibold text-1">Recommended save-play</span>
              <span class="text-[10px] text-3 ml-auto">Account Manager</span>
            </div>
            <div class="text-[12px] text-2 leading-relaxed mb-2.5">${c.id === 'atlas'
              ? 'Rank-recovery sprint plus reputation triage across 9 facilities. Projected health +14 in 30d.'
              : 'Rebuild paid efficiency to 3.5x and fix checkout flow. Projected health +11 in 30d.'}</div>
            <div class="flex items-center gap-2">
              <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Save-play sent to ${am ? esc(am.name) : 'account manager'} for review"><i data-lucide="check" class="size-3"></i><span>Approve save-play</span></button>
              <button class="btn btn-ghost btn-sm" data-action="navigate" data-route="approvals"><span>Review in queue</span></button>
            </div>
          </div>` : ''}`,
    });

    // --- Contract / billing panel ---
    const invoices = INVOICES[c.id] || [];
    const invDot = (s) => s === 'paid' ? 'green' : s === 'overdue' ? 'red' : 'amber';
    const invLabel = (s) => s === 'paid' ? 'Paid' : s === 'overdue' ? 'Overdue' : 'Due';
    const overdueN = invoices.filter(i => i.status === 'overdue').length;
    const collected = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amt, 0);
    const billingPanel = LX.panel({
      title: 'Contract & billing',
      actions: overdueN > 0 ? `<span class="tag tag-red" style="font-size:10px;padding:1px 6px"><i data-lucide="alert-circle" class="size-2.5"></i>${overdueN} overdue</span>` : `<span class="tag tag-acc" style="font-size:10px;padding:1px 6px">Current</span>`,
      bare: true,
      body: `
        <div class="grid grid-cols-4 gap-3 px-3.5 py-3.5">
          <div><div class="eyebrow mb-1">MRR</div><div class="text-[15px] font-semibold num text-1">${formatMoney(c.mrrUsd)}</div></div>
          <div><div class="eyebrow mb-1">Tier</div><div class="text-[12px] font-medium text-1 mt-0.5 leading-tight">${c.tier}</div></div>
          <div><div class="eyebrow mb-1">Term</div><div class="text-[12px] font-medium num text-1 mt-0.5">${termYears}yr</div></div>
          <div><div class="eyebrow mb-1">Collected</div><div class="text-[15px] font-semibold num text-1">${formatMoney(collected)}</div></div>
        </div>
        <table class="dlist tight" style="border-top:1px solid var(--line-1)">
          <thead><tr><th>Invoice</th><th>Date</th><th class="r">Amount</th><th class="r">Status</th></tr></thead>
          <tbody>
            ${invoices.map(i => `
              <tr data-action="detail" data-title="${i.num}" data-sub="${esc(c.name)} invoice" data-kv='[["Amount","${formatMoney(i.amt)}"],["Status","${invLabel(i.status)}"],["Date","${shortDate(daysAgo(i.days))}"]]'>
                <td class="num text-[11px] text-2">${i.num}</td>
                <td class="num text-[11.5px] text-3">${shortDate(daysAgo(i.days))}</td>
                <td class="r num text-[12px] text-1">${formatMoney(i.amt)}</td>
                <td class="r"><span class="status status-${invDot(i.status)} text-[11px]">${invLabel(i.status)}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>`,
    });

    // --- Growth recommendations panel ---
    const upsells = UPSELLS[c.id] || [];
    const upsellTotal = upsells.reduce((s, u) => s + u.mrr, 0);
    const growthPanel = LX.panel({
      title: 'Growth recommendations',
      actions: `<span class="text-[10.5px] text-3 num">+${formatMoney(upsellTotal)}/mo potential</span>`,
      bare: true,
      body: upsells.map(u => {
        const ch = getChannel(u.ch);
        const label = ch ? ch.label : u.ch;
        return `<div class="px-3.5 py-3" style="border-top:1px solid var(--line-1)">
          <div class="flex items-center gap-2.5 mb-2">
            <span class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:${ch ? ch.color : '#565659'}1f">
              <i data-lucide="${ch ? ch.icon : 'circle'}" class="size-3" style="color:${ch ? ch.color : 'var(--text-3)'}"></i>
            </span>
            <div class="text-[12.5px] font-medium text-1">Add ${label}</div>
            <span class="ml-auto num text-[12px] text-acc-bright">+${formatMoney(u.mrr)} MRR</span>
          </div>
          <div class="text-[11.5px] text-2 leading-snug mb-2.5">${u.note}</div>
          <div class="flex items-center gap-2">
            <span class="text-[11px] text-3 num">Projected +${u.health} health in 60d</span>
            <button class="btn btn-primary btn-sm ml-auto" data-action="confirm" data-toast="Proposal sent to ${esc(c.contact.name)}"><i data-lucide="check" class="size-3"></i><span>Approve</span></button>
            <button class="btn btn-ghost btn-sm" data-action="modal" data-title="Edit ${label} proposal" data-body="Adjust scope and price before sending."><span>Edit</span></button>
          </div>
        </div>`;
      }).join('') || `<div class="px-3.5 py-4 text-[12px] text-3">No open growth recommendations.</div>`,
    });

    // --- Communication log panel ---
    const comms = COMMS[c.id] || [];
    const commRow = (m) => `
      <div class="flex items-start gap-3 px-3.5 py-2.5" style="border-top:1px solid var(--line-1)">
        <span class="size-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style="background:${COMM_COLOR[m.kind]}1f">
          <i data-lucide="${COMM_ICON[m.kind]}" class="size-3" style="color:${COMM_COLOR[m.kind]}"></i>
        </span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-[10px] text-3 uppercase tracking-wide">${m.kind}</span>
            <span class="text-[11px] font-medium text-1">${m.who}</span>
            ${m.inbound ? '<span class="tag tag-sky" style="font-size:9px;padding:0 5px;height:16px">Inbound</span>' : ''}
          </div>
          <div class="text-[12px] text-2 leading-snug">${m.text}</div>
        </div>
        <span class="text-[10.5px] text-3 num shrink-0 mt-0.5">${shortDate(daysAgo(m.days))}</span>
      </div>`;
    const commsPanel = LX.panel({
      title: 'Communication log',
      actions: `<button class="text-[11px] text-acc-bright font-medium" data-action="modal" data-title="Log touchpoint" data-body="Record an email, call, QBR or Slack touchpoint with ${esc(c.contact.name)}.">Log touchpoint</button>`,
      bare: true,
      body: comms.map(commRow).join(''),
    });

    // --- Documents panel ---
    const docs = DOCS[c.id] || [];
    const docRow = (d) => `
      <button class="w-full flex items-center gap-3 px-3.5 py-2 text-left group" style="border-top:1px solid var(--line-1)" data-action="detail" data-title="${esc(d.name)}" data-sub="${d.type} . ${esc(c.name)}" data-kv='[["Type","${d.type}"],["Uploaded","${shortDate(daysAgo(d.days))}"],["Client","${esc(c.name)}"]]'>
        <span class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:var(--bg-3)"><i data-lucide="${DOC_ICON[d.type] || 'file'}" class="size-3 text-3"></i></span>
        <div class="flex-1 min-w-0">
          <div class="text-[12px] text-1 truncate group-hover:text-acc-bright">${d.name}</div>
          <div class="text-[10px] text-3 num">${shortDate(daysAgo(d.days))}</div>
        </div>
        <i data-lucide="download" class="size-3.5 text-3 shrink-0 opacity-0 group-hover:opacity-100"></i>
      </button>`;
    const docsPanel = LX.panel({
      title: 'Documents',
      actions: `<button class="text-[11px] text-acc-bright font-medium" data-action="modal" data-title="Upload document" data-body="Upload a file to ${esc(c.name)}.">Upload</button>`,
      bare: true,
      body: docs.map(docRow).join(''),
    });

    return `<section class="px-8 py-7">
      ${recordHead}
      <div class="mb-3.5">${channelsPanel}</div>
      <div class="grid grid-cols-12 gap-3.5">
        <div class="col-span-12 lg:col-span-8 flex flex-col gap-3.5">
          ${billingPanel}
          ${commsPanel}
          ${timelinePanel}
        </div>
        <div class="col-span-12 lg:col-span-4 flex flex-col gap-3.5">
          ${healthPanel}
          ${growthPanel}
          ${docsPanel}
        </div>
      </div>
    </section>`;
  }

  window.PAGES.client = renderClient;

})();
