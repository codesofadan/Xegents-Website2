// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// window.PL_BY_CLIENT = [
//   { client: 'acme',    revenue: 3000, labor: 420, api: 87, tools: 43, gross: 2450, margin: 81.7 },
//   { client: 'sunset',  revenue: 1800, labor: 280, api: 32, tools: 31, gross: 1457, margin: 80.9 },
//   { client: 'royal',   revenue: 1200, labor: 190, api: 24, tools: 28, gross: 958,  margin: 79.8 },
//   { client: 'mark-audit', revenue: 800,  labor: 110, api: 14, tools: 16, gross: 660,  margin: 82.5 },
// ];
//
// window.PL_BY_FACILITY = [
//   { facility: 'bs-athens-1', client: 'acme', margin: 88 },
//   { facility: 'bs-athens-2', client: 'acme', margin: 84 },
//   { facility: 'bs-atlanta',  client: 'acme', margin: 78 },
//   { facility: 'royal-mini',  client: 'royal', margin: 76 },
//   { facility: 'star-athens', client: 'acme', margin: 72 },
//   { facility: 'sunset-austin', client: 'sunset', margin: 81 },
//   { facility: 'bs-conyers', client: 'acme', margin: 79 },
// ];
//
// window.API_SPEND = [
//   { provider: 'DataForSEO',        mtd: 87, pct: 47, color: '#6366f1' },
//   { provider: 'Smartlead',         mtd: 39, pct: 21, color: '#0ea5e9' },
//   { provider: 'Claude API',        mtd: 32, pct: 17, color: '#a78bfa' },
//   { provider: 'Gemini API',        mtd: 14, pct: 7,  color: '#10b981' },
//   { provider: 'DeepSeek API',      mtd: 12, pct: 6,  color: '#34d399' },
//   { provider: 'Twilio',            mtd: 11, pct: 6,  color: '#f59e0b' },
//   { provider: 'Apify',             mtd: 8,  pct: 4,  color: '#f97316' },
//   { provider: 'Mailforge',         mtd: 45, pct: 24, color: '#ec4899' },
//   { provider: 'BrightLocal',       mtd: 29, pct: 16, color: '#0d9488' },
//   { provider: 'Originality.ai',    mtd: 13, pct: 7,  color: '#dc2626' },
// ];
//
// window.API_SPEND_TOTAL = window.API_SPEND.reduce((s, r) => s + r.mtd, 0);
//
// window.AR_AGING = [
//   { client: 'acme',  amount: 3000, age_days: 14, due: '2026-05-29' },
//   { client: 'sunset', amount: 1800, age_days: 22, due: '2026-06-05' },
//   { client: 'royal',  amount: 1200, age_days: 8,  due: '2026-05-23' },
//   { client: 'mark-audit', amount: 0, age_days: 0, due: 'Paid' },
// ];
//
// window.REVENUE_FORECAST_90D = {
//   retainer_recurring: 18000,
//   pipeline_expected: 12300,
//   new_audit_expected: 2400,
//   total: 32700,
// };
//
// window.MRR_TRAJECTORY = [
//   { month: 'Dec', mrr: 0 },
//   { month: 'Jan', mrr: 600 },
//   { month: 'Feb', mrr: 1800 },
//   { month: 'Mar', mrr: 3000 },
//   { month: 'Apr', mrr: 5800 },
//   { month: 'May', mrr: 6800 },
// ];
//
// window.OBLIGATIONS = [
//   { client: 'acme', items: [
//     { name: 'GBP posts',         cadence: '4/wk x 15 facilities', progress: 56, target: 60, status: 'on' },
//     { name: 'Monthly report',    cadence: '5th of each month',     progress: 1,  target: 1,  status: 'done' },
//     { name: 'Audit report',      cadence: 'Monthly',               progress: 1,  target: 1,  status: 'done' },
//     { name: 'Review response',   cadence: '24h SLA',               progress: 8,  target: 24, status: 'on', avg: '8h avg' },
//     { name: 'Schema deploy',     cadence: 'One-time',              progress: 1,  target: 1,  status: 'done' },
//     { name: 'Citation building', cadence: '30/mo',                 progress: 24, target: 30, status: 'risk' },
//   ] },
// ];
//
// window.RETENTION_PLAYBOOK_ACME = [
//   { step: 1, action: 'Schedule retention call this week', owner: 'Mark', due: '2026-05-17' },
//   { step: 2, action: 'Audit Q2 deliverables, send retention pack', owner: 'Khizer', due: '2026-05-18' },
//   { step: 3, action: 'Prepare 10% renewal discount offer (escape valve)', owner: 'Mark', due: '2026-05-19' },
//   { step: 4, action: 'Send proactive QBR scheduling email', owner: 'Mark', due: '2026-05-20' },
// ];
//
// window.INVOICES = [
//   { id: 'INV-2026-051', client: 'acme',  amount: 3000, status: 'sent',  sent: '2026-05-01', due: '2026-05-29' },
//   { id: 'INV-2026-050', client: 'sunset', amount: 1800, status: 'sent',  sent: '2026-05-01', due: '2026-06-05' },
//   { id: 'INV-2026-049', client: 'royal',  amount: 1200, status: 'paid',  sent: '2026-05-01', due: '2026-05-23' },
//   { id: 'INV-2026-048', client: 'mark-audit', amount: 300, status: 'paid', sent: '2026-04-07', due: '2026-04-14' },
//   { id: 'INV-2026-047', client: 'mark-audit', amount: 500, status: 'paid', sent: '2026-04-30', due: '2026-05-07' },
// ];
//
// window.ROI_DATA = {
//   acme: {
//     investment: 9000, tools: 1200, labor_hours: 120, labor_cost: 260,
//     total_cost: 11460,
//     rentals_attributed: 42, avg_ltv: 4200, lifetime_rev: 176400, ltv_cac: 18,
//     by_facility: [
//       { facility: 'bs-athens-1', rentals: 9, rev: 37800 },
//       { facility: 'bs-atlanta', rentals: 8, rev: 33600 },
//       { facility: 'star-athens', rentals: 7, rev: 29400 },
//       { facility: 'bs-conyers', rentals: 5, rev: 21000 },
//       { facility: 'bs-loganville', rentals: 5, rev: 21000 },
//       { facility: 'bs-watkinsville', rentals: 4, rev: 16800 },
//       { facility: 'royal-mini', rentals: 2, rev: 8400 },
//       { facility: 'bs-bogart', rentals: 2, rev: 8400 },
//     ],
//     funnel: [
//       { stage: 'Impressions',  count: 84300, pct: 100 },
//       { stage: 'Clicks',       count: 6118,  pct: 7.3 },
//       { stage: 'Calls',        count: 1247,  pct: 1.48 },
//       { stage: 'Tours',        count: 187,   pct: 0.22 },
//       { stage: 'Rentals',      count: 42,    pct: 0.05 },
//     ],
//     channels: [
//       { channel: 'GBP organic',  rentals: 19, ltv: 4500 },
//       { channel: 'Web organic',  rentals: 11, ltv: 3800 },
//       { channel: 'GBP direct call', rentals: 7,  ltv: 4900 },
//       { channel: 'Referrals',    rentals: 3,  ltv: 5200 },
//       { channel: 'Other',        rentals: 2,  ltv: 3200 },
//     ],
//   },
// };
//