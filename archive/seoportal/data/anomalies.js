// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// window.ANOMALIES = [
//   {
//     id: 'a-001', severity: 'red', facility: 'royal-mini', metric: 'rank',
//     title: 'Rank dropped -12 positions',
//     detected: '2026-05-14 02:00 PKT',
//     prior_avg: 4.2, current: 16.4, delta: -12.2,
//     keyword: 'athens storage units',
//     cross_ref: [
//       { signal: 'Google algorithm update', value: 'None detected in window', strength: 'none' },
//       { signal: 'GBP edits in window', value: 'None', strength: 'none' },
//       { signal: 'Citation drop', value: '8 citations lost May 13', strength: 'medium' },
//       { signal: 'Competitor activity', value: 'Star Storage Athens gained 14 new citations May 12', strength: 'high' },
//     ],
//     recommendation: [
//       'Audit Royal Mini citation drop (likely linked to YellowPages and Citysearch NAP drift)',
//       'Submit Whitespark rebuild for the 8 lost directories',
//       'Add 5 new citations from RV/local niche to compensate',
//     ],
//     confidence: 0.78, status: 'open',
//   },
//   {
//     id: 'a-002', severity: 'amber', facility: 'star-athens', metric: 'reviews',
//     title: 'Review velocity -50%',
//     detected: '2026-05-13 02:00 PKT',
//     prior_avg: 5.0, current: 2.5, delta: -50,
//     keyword: null,
//     cross_ref: [
//       { signal: 'PMS webhook health', value: '2 failures on 5/11', strength: 'high' },
//       { signal: 'SMS delivery rate', value: '94% (normal)', strength: 'none' },
//       { signal: 'Manager change', value: 'None', strength: 'none' },
//     ],
//     recommendation: [
//       'Investigate PMS webhook errors on May 11',
//       'Re-trigger review requests for 11 move-ins in the gap',
//       'Re-print QR codes for office front desk',
//     ],
//     confidence: 0.85, status: 'open',
//   },
//   {
//     id: 'a-003', severity: 'amber', facility: 'bs-athens-1', metric: 'gbp_impressions',
//     title: 'GBP impressions -32%',
//     detected: '2026-05-12 02:00 PKT',
//     prior_avg: 2800, current: 1900, delta: -32,
//     keyword: null,
//     cross_ref: [
//       { signal: 'GBP edits in window', value: 'Business hours updated May 9', strength: 'low' },
//       { signal: 'Competitor activity', value: 'Star Storage added 12 new posts May 8-11', strength: 'medium' },
//       { signal: 'Photo cadence', value: 'Last photo May 2 (12 days)', strength: 'medium' },
//     ],
//     recommendation: [
//       'Restore weekly photo cadence (target: every 5 days)',
//       'Match competitor post velocity (4x/week)',
//       'Run Q&A seeding for high-volume queries',
//     ],
//     confidence: 0.71, status: 'open',
//   },
//   {
//     id: 'a-004', severity: 'green', facility: 'bs-atlanta', metric: 'rank',
//     title: 'Rank improved +2.3 positions',
//     detected: '2026-05-10 02:00 PKT',
//     prior_avg: 5.7, current: 3.4, delta: 2.3,
//     keyword: 'atlanta self storage',
//     cross_ref: [
//       { signal: 'Citation rebuild', value: '8 new citations added May 5-8', strength: 'high' },
//       { signal: 'Schema deploy', value: 'SelfStorage + FAQPage May 4', strength: 'high' },
//     ],
//     recommendation: [
//       'Document this pattern in learnings library',
//       'Apply same playbook to Brick & Stone Conyers',
//     ],
//     confidence: 0.88, status: 'closed_win',
//   },
// ];
//
// window.PREDICTIONS = {
//   churn: [
//     { client: 'acme', score: 68, level: 'critical', renewal_in_days: 45, factors: [
//       { code: 'missed_deliverables', label: '2 missed deliverables in last 90d', impact: 30 },
//       { code: 'response_time', label: 'Response time avg 26h (vs 8h baseline)', impact: 15 },
//       { code: 'nps_drop', label: 'NPS dropped from 9 to 7', impact: 10 },
//       { code: 'message_freq', label: 'Message frequency down 40%', impact: 8 },
//       { code: 'satisfaction', label: 'Last satisfaction rating 3/5', impact: 5 },
//     ] },
//     { client: 'sunset', score: 41, level: 'at_risk', renewal_in_days: 120, factors: [
//       { code: 'response_time', label: 'Response time creeping up', impact: 12 },
//       { code: 'engagement', label: 'Lower message frequency this month', impact: 9 },
//       { code: 'rank_volatility', label: 'Two facilities slipping', impact: 20 },
//     ] },
//     { client: 'royal', score: 22, level: 'healthy', renewal_in_days: 90, factors: [
//       { code: 'engagement', label: 'High engagement', impact: 0 },
//       { code: 'nps', label: 'NPS = 9 (promoter)', impact: 0 },
//     ] },
//     { client: 'haseeb-audit', score: 18, level: 'healthy', renewal_in_days: 5, factors: [
//       { code: 'audit_complete', label: 'Audit nearly complete, healthy partnership signals', impact: 0 },
//     ] },
//   ],
//   rank_at_risk: [
//     { facility: 'bs-athens-1', kw: 'athens storage', current: 2.1, predicted_in_14d: 3.8, confidence: 0.66 },
//     { facility: 'sunset-austin', kw: 'rv storage austin', current: 4.4, predicted_in_14d: 5.7, confidence: 0.71 },
//     { facility: 'royal-monroe', kw: 'monroe ga storage', current: 6.4, predicted_in_14d: 9.2, confidence: 0.81 },
//   ],
//   land_grab: [
//     { facility: 'bs-athens-1', kw: 'climate storage athens',  vol: 720, diff: 32, opp: 'high'  },
//     { facility: 'bs-athens-1', kw: '24/7 storage athens',     vol: 490, diff: 28, opp: 'high'  },
//     { facility: 'bs-athens-1', kw: 'rv storage near me',     vol: 220, diff: 21, opp: 'med'   },
//     { facility: 'bs-athens-1', kw: 'covered boat parking',   vol: 180, diff: 18, opp: 'med'   },
//     { facility: 'bs-athens-1', kw: 'storage athens college', vol: 140, diff: 14, opp: 'low'   },
//   ],
// };
//