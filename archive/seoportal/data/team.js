// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Team operations layer. window.TEAM (the 6 members) already lives
//    in seed.js - do NOT redefine it. This file adds the OPERATIONS
//    around the team: tasks, workload, permissions, capacity, time
//    tracking, throughput, hiring, and the AI staffing proposals.
//
//    window.TEAM_OPS = {
//      stats, tasks[], permissions{}, capacity[],
//      allocations[]  (member x client allocated hours, this month),
//      timeByClient[] (tracked + billable hours by client, this month),
//      throughput{}   (completed, cycle time, on-time %, velocity),
//      trends{}       (per-member 8-week utilization sparkline values),
//      hiring[]       (open seats), recommendations[] (capacity moves)
//    }
//    task: { id, title, clientId, assignee(team id), status, due(days
//            ahead, negative = overdue), priority('high'|'med'|'low'),
//            channel }
//    ============================================================ */
//
// window.TEAM_OPS = {
//
//   // KPI band. Period is the calendar month (matches AGENCY.period).
//   stats: {
//     members: 6,
//     avgUtilization: 80,
//     utilDelta: 4,
//     openTasks: 34,
//     tasksDelta: -6,
//     capacityLabel: 'Stretched',   // good / stretched / overloaded
//     overCount: 1,                 // members over 90%
//     billablePct: 76,              // agency-wide billable share, this month
//     openSeats: 2,
//   },
//
//   // Task board across all 6 clients, assigned to the 6 team members.
//   // status: 'todo' | 'in_progress' | 'done'
//   tasks: [
//     { id: 'TSK-412', title: 'Approve TikTok pause for 3 ad sets', clientId: 'verdant', assignee: 't-khizer', status: 'todo', due: 0, priority: 'high', channel: 'ads' },
//     { id: 'TSK-409', title: 'Reply to 2-star Plano review + call', clientId: 'lumen', assignee: 't-omar', status: 'todo', due: 0, priority: 'high', channel: 'reputation' },
//     { id: 'TSK-415', title: 'Atlas recovery plan - GBP + rank slide', clientId: 'atlas', assignee: 't-sara', status: 'todo', due: 1, priority: 'high', channel: 'seo' },
//     { id: 'TSK-403', title: 'July content calendar - 8 social posts', clientId: 'casaverde', assignee: 't-aimen', status: 'todo', due: 2, priority: 'med', channel: 'social' },
//     { id: 'TSK-418', title: 'Build NorthEdge demand-gen experiment', clientId: 'northedge', assignee: 't-dana', status: 'todo', due: 3, priority: 'med', channel: 'ads' },
//     { id: 'TSK-421', title: 'Peak referral email sequence draft', clientId: 'peak', assignee: 't-aimen', status: 'todo', due: 4, priority: 'low', channel: 'email' },
//     { id: 'TSK-424', title: 'Verdant retention winback flow QA', clientId: 'verdant', assignee: 't-khizer', status: 'todo', due: 2, priority: 'high', channel: 'email' },
//     { id: 'TSK-426', title: 'Atlas Boat/RV landing page brief', clientId: 'atlas', assignee: 't-aimen', status: 'todo', due: 3, priority: 'med', channel: 'content' },
//
//     { id: 'TSK-398', title: 'Verdant Meta Advantage+ restructure', clientId: 'verdant', assignee: 't-khizer', status: 'in_progress', due: 1, priority: 'high', channel: 'ads' },
//     { id: 'TSK-401', title: 'Lumen invisalign landing page rewrite', clientId: 'lumen', assignee: 't-aimen', status: 'in_progress', due: 2, priority: 'med', channel: 'content' },
//     { id: 'TSK-407', title: 'NorthEdge June report + commentary', clientId: 'northedge', assignee: 't-dana', status: 'in_progress', due: 1, priority: 'med', channel: 'reporting' },
//     { id: 'TSK-410', title: 'Atlas citation cleanup (9 locations)', clientId: 'atlas', assignee: 't-sara', status: 'in_progress', due: -1, priority: 'high', channel: 'seo' },
//     { id: 'TSK-414', title: 'Casa Verde Q3 strategy brief', clientId: 'casaverde', assignee: 't-omar', status: 'in_progress', due: 5, priority: 'low', channel: 'reporting' },
//     { id: 'TSK-417', title: 'Verdant CPA recovery - bid + creative', clientId: 'verdant', assignee: 't-khizer', status: 'in_progress', due: 0, priority: 'high', channel: 'ads' },
//     { id: 'TSK-419', title: 'Peak landing page CRO experiment', clientId: 'peak', assignee: 't-dana', status: 'in_progress', due: 4, priority: 'med', channel: 'ads' },
//
//     { id: 'TSK-388', title: 'Peak Performance May report sent', clientId: 'peak', assignee: 't-omar', status: 'done', due: -3, priority: 'med', channel: 'reporting' },
//     { id: 'TSK-391', title: 'Verdant influencer brief approved', clientId: 'verdant', assignee: 't-aimen', status: 'done', due: -4, priority: 'low', channel: 'social' },
//     { id: 'TSK-385', title: 'Lumen GBP profiles verified (7)', clientId: 'lumen', assignee: 't-sara', status: 'done', due: -5, priority: 'med', channel: 'seo' },
//     { id: 'TSK-380', title: 'NorthEdge ABM list scrubbed', clientId: 'northedge', assignee: 't-dana', status: 'done', due: -6, priority: 'low', channel: 'email' },
//     { id: 'TSK-378', title: 'Casa Verde June social batch shipped', clientId: 'casaverde', assignee: 't-aimen', status: 'done', due: -2, priority: 'med', channel: 'social' },
//     { id: 'TSK-375', title: 'Verdant Q2 paid retro deck', clientId: 'verdant', assignee: 't-khizer', status: 'done', due: -7, priority: 'med', channel: 'reporting' },
//     { id: 'TSK-372', title: 'Atlas competitor rank gap analysis', clientId: 'atlas', assignee: 't-sara', status: 'done', due: -8, priority: 'low', channel: 'seo' },
//   ],
//
//   // Permissions matrix. Roles x capabilities. value: true | false | 'limited'
//   permissions: {
//     capabilities: [
//       { id: 'approve', label: 'Approve actions' },
//       { id: 'edit',    label: 'Edit campaigns' },
//       { id: 'reports', label: 'Send reports' },
//       { id: 'billing', label: 'Manage billing' },
//       { id: 'view',    label: 'View only' },
//     ],
//     roles: [
//       { id: 'owner',     label: 'Owner',       grants: { approve: true,      edit: true,  reports: true,  billing: true,  view: true } },
//       { id: 'strategist',label: 'Strategist',  grants: { approve: true,      edit: true,  reports: true,  billing: false, view: true } },
//       { id: 'channel',   label: 'Channel lead',grants: { approve: 'limited', edit: true,  reports: true,  billing: false, view: true } },
//       { id: 'creator',   label: 'Creator',     grants: { approve: false,     edit: 'limited', reports: false, billing: false, view: true } },
//       { id: 'client',    label: 'Client',      grants: { approve: false,     edit: false, reports: false, billing: false, view: true } },
//     ],
//   },
//
//   // Weekly capacity per member (hours). Drives the utilization mini-chart.
//   // billRate = blended billable rate used by the time-tracking summary.
//   capacity: [
//     { id: 't-mark',   allocated: 26, capacity: 40, billRate: 145 },
//     { id: 't-dana',   allocated: 35, capacity: 40, billRate: 135 },
//     { id: 't-khizer', allocated: 37, capacity: 40, billRate: 120 },
//     { id: 't-aimen',  allocated: 32, capacity: 40, billRate:  95 },
//     { id: 't-sara',   allocated: 28, capacity: 40, billRate: 110 },
//     { id: 't-omar',   allocated: 33, capacity: 40, billRate: 105 },
//   ],
//
//   // ---- Capacity planning: member x client allocated hours (this month) ----
//   // Real two-dimensional allocations - every member contributes to several
//   // accounts, not just their owned book. Hours are month-to-date plan hours.
//   // Sum per member ladders close to capacity*4 weeks of booked time.
//   allocations: [
//     { id: 't-mark',   byClient: { lumen: 6,  verdant: 18, northedge: 14, peak: 8,  casaverde: 5,  atlas: 12 } },
//     { id: 't-dana',   byClient: { lumen: 10, verdant: 28, northedge: 34, peak: 26, casaverde: 8,  atlas: 18 } },
//     { id: 't-khizer', byClient: { lumen: 8,  verdant: 52, northedge: 22, peak: 30, casaverde: 6,  atlas: 14 } },
//     { id: 't-aimen',  byClient: { lumen: 22, verdant: 20, northedge: 10, peak: 14, casaverde: 38, atlas: 12 } },
//     { id: 't-sara',   byClient: { lumen: 26, verdant: 12, northedge: 18, peak: 8,  casaverde: 10, atlas: 40 } },
//     { id: 't-omar',   byClient: { lumen: 30, verdant: 16, northedge: 20, peak: 34, casaverde: 24, atlas: 14 } },
//   ],
//
//   // ---- Time tracking summary by client (THIS MONTH) ----
//   // tracked = total logged hours across all contributors (not just the AM).
//   // billable = the share that lands on a client invoice. internal = the rest.
//   timeByClient: [
//     { id: 'lumen',     tracked: 102, billable: 88,  retainerHrs: 90  },
//     { id: 'verdant',   tracked: 146, billable: 104, retainerHrs: 120 },
//     { id: 'northedge', tracked: 118, billable: 101, retainerHrs: 110 },
//     { id: 'peak',      tracked: 120, billable: 99,  retainerHrs: 100 },
//     { id: 'casaverde', tracked: 91,  billable: 72,  retainerHrs: 80  },
//     { id: 'atlas',     tracked: 110, billable: 70,  retainerHrs: 95  },
//   ],
//
//   // ---- Throughput metrics (this week + this month) ----
//   throughput: {
//     completedWeek: 19,
//     completedWeekDelta: 3,
//     completedMonth: 71,
//     completedMonthDelta: 9,
//     avgCycleDays: 2.4,
//     cycleDelta: -0.3,        // lower is better
//     onTimePct: 91,
//     onTimeDelta: 2,
//     // 8-week completed-tasks velocity (oldest -> newest), for the trend chart
//     velocity: [52, 58, 49, 61, 57, 64, 68, 71],
//     velocityWeeks: ['W18', 'W19', 'W20', 'W21', 'W22', 'W23', 'W24', 'W25'],
//   },
//
//   // ---- Per-member 8-week utilization trend (oldest -> newest %) ----
//   // Used for the roster sparkline and the member drill-in drawer.
//   trends: {
//     't-mark':   [58, 61, 60, 63, 59, 62, 66, 64],
//     't-dana':   [74, 78, 81, 80, 84, 86, 85, 88],
//     't-khizer': [82, 85, 88, 90, 89, 91, 90, 92],
//     't-aimen':  [70, 72, 75, 73, 77, 76, 80, 79],
//     't-sara':   [66, 64, 68, 70, 69, 72, 70, 71],
//     't-omar':   [76, 79, 78, 81, 80, 82, 84, 83],
//   },
//
//   // ---- Roles & hiring: open seats ----
//   // status: 'sourcing' | 'interviewing' | 'offer'
//   hiring: [
//     { id: 'h-perf',  role: 'Performance Marketer', fills: 'Relieve paid-media load (Verdant + Peak)', targetStart: 18, status: 'interviewing', pipeline: 7, relieves: 't-khizer' },
//     { id: 'h-seo',   role: 'Junior SEO',           fills: 'Citations + on-page under Sara',           targetStart: 32, status: 'sourcing',     pipeline: 12, relieves: 't-sara' },
//   ],
//
//   // ---- Time entries: member x client logged hours this month ----
//   // Each row is one member's logged time on one client this calendar month.
//   // hours = total logged, billable = share that lands on the invoice,
//   // week = 4-week trend of logged hours (oldest -> newest) for the sparkline.
//   // Drives the Time tracking dense list (PAGES['team.time']).
//   timeEntries: [
//     { member: 't-khizer', client: 'verdant',   hours: 52, billable: 44, week: [11, 13, 14, 14], role: 'Paid build' },
//     { member: 't-sara',   client: 'atlas',     hours: 40, billable: 27, week: [9, 10, 10, 11],  role: 'SEO recovery' },
//     { member: 't-omar',   client: 'peak',      hours: 34, billable: 30, week: [8, 8, 9, 9],     role: 'Account mgmt' },
//     { member: 't-aimen',  client: 'casaverde', hours: 38, billable: 31, week: [9, 9, 10, 10],   role: 'Content + social' },
//     { member: 't-dana',   client: 'northedge', hours: 34, billable: 30, week: [8, 8, 9, 9],     role: 'Strategy + demand' },
//     { member: 't-khizer', client: 'peak',      hours: 30, billable: 26, week: [7, 7, 8, 8],     role: 'Paid media' },
//     { member: 't-omar',   client: 'lumen',     hours: 30, billable: 27, week: [7, 7, 8, 8],     role: 'Account mgmt' },
//     { member: 't-sara',   client: 'lumen',     hours: 26, billable: 23, week: [6, 6, 7, 7],     role: 'Local SEO' },
//     { member: 't-dana',   client: 'verdant',   hours: 28, billable: 22, week: [6, 7, 7, 8],     role: 'Strategy' },
//     { member: 't-omar',   client: 'casaverde', hours: 24, billable: 20, week: [5, 6, 6, 7],     role: 'Account mgmt' },
//     { member: 't-aimen',  client: 'lumen',     hours: 22, billable: 19, week: [5, 5, 6, 6],     role: 'Landing pages' },
//     { member: 't-dana',   client: 'peak',      hours: 26, billable: 22, week: [6, 6, 7, 7],     role: 'CRO + ads' },
//     { member: 't-aimen',  client: 'verdant',   hours: 20, billable: 15, week: [4, 5, 5, 6],     role: 'Social' },
//     { member: 't-sara',   client: 'northedge', hours: 18, billable: 16, week: [4, 4, 5, 5],     role: 'Technical SEO' },
//     { member: 't-omar',   client: 'northedge', hours: 20, billable: 18, week: [5, 5, 5, 5],     role: 'Reporting' },
//     { member: 't-mark',   client: 'verdant',   hours: 18, billable: 12, week: [4, 4, 5, 5],     role: 'Oversight' },
//     { member: 't-khizer', client: 'northedge', hours: 22, billable: 19, week: [5, 5, 6, 6],     role: 'Paid media' },
//     { member: 't-mark',   client: 'northedge', hours: 14, billable: 9,  week: [3, 3, 4, 4],     role: 'Oversight' },
//     { member: 't-aimen',  client: 'atlas',     hours: 12, billable: 9,  week: [3, 3, 3, 3],     role: 'Landing pages' },
//     { member: 't-mark',   client: 'atlas',     hours: 12, billable: 7,  week: [3, 3, 3, 3],     role: 'Oversight' },
//     { member: 't-sara',   client: 'casaverde', hours: 10, billable: 8,  week: [2, 3, 2, 3],     role: 'SEO' },
//     { member: 't-dana',   client: 'atlas',     hours: 18, billable: 14, week: [4, 4, 5, 5],     role: 'Strategy' },
//     { member: 't-mark',   client: 'lumen',     hours: 6,  billable: 4,  week: [1, 2, 1, 2],     role: 'Oversight' },
//     { member: 't-khizer', client: 'lumen',     hours: 8,  billable: 7,  week: [2, 2, 2, 2],     role: 'Paid media' },
//   ],
//
//   // ---- Capacity recommendations awaiting a decision ----
//   // kind: 'rebalance' | 'staffing'
//   recommendations: [
//     {
//       id: 'REC-31', kind: 'rebalance',
//       title: 'Reassign 2 Verdant ad tasks from Khizer to Dana',
//       detected: 'Khizer Ali is at 92% utilization with 5 open Verdant tasks; Dana Brooks sits at 88% but has 2 lighter accounts winding down this week.',
//       action: 'Move TSK-417 and TSK-424 to Dana, keeping the Advantage+ restructure with Khizer.',
//       impact: 'Khizer 92% &rarr; 84%, Verdant SLA risk cleared, no handoff visible to the client.',
//       from: 't-khizer', to: 't-dana', clientId: 'verdant',
//     },
//     {
//       id: 'REC-32', kind: 'staffing',
//       title: 'Hire to relieve Khizer - paid load is structurally over capacity',
//       detected: 'Paid-media demand has run 90%+ for 4 straight weeks. Rebalancing buys 2 weeks; the trend line crosses 100% by W27 as Verdant scales.',
//       action: 'Advance the open Performance Marketer seat to offer; a start in 18 days covers the projected gap.',
//       impact: 'Adds ~32 billable hrs/wk, lifts paid-channel headroom and protects the Verdant retention.',
//       from: 't-khizer', to: 'h-perf', clientId: 'verdant',
//     },
//   ],
// };
//