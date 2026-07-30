// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// window.WEEKLY_BRIEFING = {
//   client: 'acme',
//   generated_at: '2026-05-15 06:00 PKT',
//   summary: 'Strong week on Atlanta (rank +2.3) and Athens 1. Royal Mini critical anomaly active. Athens 2 still suspended (recovery in step 3 of 12). Acme churn risk improved 16 points week-over-week.',
//   wins: [
//     'Brick & Stone Atlanta climbed -2.3 positions on "atlanta self storage" (citation rebuild + schema deploy)',
//     '187 reviews collected May MTD — running 4% short of target but trajectory positive',
//     'Tamara Veraart partnership signed — 4 PDFs/month commitment recurring',
//   ],
//   risks: [
//     'Royal Mini "athens storage units" -12.2 positions in 7 days — runbook active',
//     'Athens 2 GBP suspension reinstatement evidence pack 60% complete (lease doc still needed from client)',
//   ],
//   recommended_actions: [
//     { priority: 'high', action: 'Approve 7 GBP posts in queue (5 min)', owner: 'Mark' },
//     { priority: 'high', action: 'Push Royal Mini citation rebuild order to Whitespark', owner: 'Khizer' },
//     { priority: 'med',  action: 'Send Acme Q3 strategy reminder email (approval pending 2 days)', owner: 'Mark' },
//     { priority: 'med',  action: 'Reassign 2 of Aimen tasks to Adan (Aimen at 38/30 hours)', owner: 'Mark' },
//     { priority: 'low',  action: 'Schedule QBR follow-up call with Acme', owner: 'Mark' },
//   ],
// };
//
// window.PORTFOLIO_KPIS = {
//   mrr: 6800,
//   mrr_delta_pct: 17.2,
//   mrr_sparkline: [3200, 3800, 4200, 4900, 5400, 5800, 6100, 6400, 6800],
//   avg_rank: 4.6,
//   avg_rank_delta: -1.3,
//   solv: 38,
//   solv_delta: 4.2,
//   cash_collected_mtd_usd: 5240,
//   cash_target_usd: 7800,
//   active_clients: 4,
//   churn_risk_clients: 1,
// };
//
// window.DECISION_QUEUE = [
//   { id: 'dq-001', urgency: 'today', kind: 'review_reply', client: 'Acme Storage',       facility: 'Brick & Stone Athens 1',     title: '1-star review awaiting reply',           body: 'Gate code did not work for 2 days, no one answered the phone. Drafted apology + waived month, ready to send.', sla_hours: 4 },
//   { id: 'dq-002', urgency: 'today', kind: 'anomaly',      client: 'Royal Mini Storage', facility: 'Royal Mini Monroe',          title: 'Rank -12 on "athens storage units"',     body: 'Confidence 0.78. Citation rebuild order drafted. Approve to push to Whitespark.', sla_hours: 8 },
//   { id: 'dq-003', urgency: 'today', kind: 'gbp_post',     client: 'Sunset RV & Boat',   facility: 'Sunset RV Austin',           title: 'Memorial Day referral post',             body: 'Refer a friend, both get $50 off. Scheduled for tomorrow 9:00 PKT.', sla_hours: 18 },
//   { id: 'dq-004', urgency: 'today', kind: 'contract',     client: 'GrowthBoost',        facility: null,                          title: 'Audit-tier renewal contract pending sig', body: 'Mark Faiz reviewed v2 Tuesday. No counter. Worth a same-day nudge.', sla_hours: 6 },
//   { id: 'dq-005', urgency: 'this_week', kind: 'gbp_post',     client: 'Acme Storage',       facility: 'Brick & Stone Atlanta',      title: '6 GBP posts in queue',                   body: 'Welcome series + climate-controlled awareness drip. Batch approve in 5 min.', sla_hours: 52 },
//   { id: 'dq-006', urgency: 'this_week', kind: 'review_reply', client: 'Sunset RV & Boat',   facility: 'Sunset RV Cedar Park',       title: '2-star review on cleanliness',           body: 'Drafted reply with offer to inspect. Owner-tone match: 91%.', sla_hours: 40 },
//   { id: 'dq-007', urgency: 'this_week', kind: 'renewal',     client: 'Acme Storage',       facility: null,                          title: 'Acme retainer renewal in 38 days',       body: 'Health 68 (at risk). QBR not yet scheduled. Auto-renewal pack assembling.', sla_hours: 96 },
//   { id: 'dq-008', urgency: 'this_week', kind: 'anomaly',     client: 'Acme Storage',       facility: 'Star Storage Athens',         title: 'Review velocity -50% week over week',    body: 'Severity amber. Likely cause: kiosk QR code broken. Verify on-site.', sla_hours: 60 },
// ];
//
// window.PORTFOLIO_MOVERS = {
//   gainers: [
//     { client: 'Acme Storage',       facility: 'Brick & Stone Atlanta',    keyword: 'atlanta self storage',       delta: 4 },
//     { client: 'Royal Mini Storage', facility: 'Royal Mini Athens',         keyword: 'cheap storage athens',       delta: 3 },
//     { client: 'Acme Storage',       facility: 'Brick & Stone Athens 1',   keyword: 'climate controlled storage', delta: 3 },
//     { client: 'Sunset RV & Boat',   facility: 'Sunset RV Austin',          keyword: 'rv storage austin',          delta: 2 },
//     { client: 'GrowthBoost',        facility: 'GrowthBoost HQ',            keyword: 'marketing agency lahore',    delta: 2 },
//   ],
//   losers: [
//     { client: 'Royal Mini Storage', facility: 'Royal Mini Monroe',           keyword: 'athens storage units',     delta: -12 },
//     { client: 'Acme Storage',       facility: 'Brick & Stone Athens 2',     keyword: 'storage near uga',          delta: -5 },
//     { client: 'Sunset RV & Boat',   facility: 'Sunset RV Cedar Park',        keyword: 'boat storage cedar park',   delta: -4 },
//     { client: 'Acme Storage',       facility: 'Brick & Stone Bogart',       keyword: 'self storage bogart ga',    delta: -3 },
//     { client: 'Acme Storage',       facility: 'Brick & Stone Watkinsville', keyword: 'storage watkinsville',      delta: -2 },
//   ],
// };
//
// window.CLIENT_HEALTH_ROWS = [
//   { id: 'acme',        name: 'Acme Storage',       facilities: 15, mrr: 3000, score: 68, status: 'at_risk', open_issues: 5, trend: 'down', trend_delta: -8 },
//   { id: 'sunset',      name: 'Sunset RV & Boat',   facilities: 4,  mrr: 1800, score: 41, status: 'healthy', open_issues: 2, trend: 'up',   trend_delta: 3 },
//   { id: 'royal',       name: 'Royal Mini Storage', facilities: 3,  mrr: 1200, score: 22, status: 'healthy', open_issues: 1, trend: 'flat', trend_delta: 0 },
//   { id: 'growthboost', name: 'GrowthBoost',        facilities: 1,  mrr: 800,  score: 18, status: 'healthy', open_issues: 0, trend: 'up',   trend_delta: 5 },
// ];
//
// window.AI_SPEND_BY_CLIENT = [
//   { client: 'Acme Storage',       spend: 82, cap: 200 },
//   { client: 'Sunset RV & Boat',   spend: 41, cap: 100 },
//   { client: 'Royal Mini Storage', spend: 38, cap: 60 },
//   { client: 'GrowthBoost',        spend: 26, cap: 40 },
// ];
//
// window.WEEK_AHEAD = [
//   { date: '2026-05-25', kind: 'qbr',         client: 'Acme Storage',       label: 'Q2 QBR with Sara McKinley' },
//   { date: '2026-05-26', kind: 'renewal',     client: 'GrowthBoost',        label: 'Audit-tier contract decision' },
//   { date: '2026-05-27', kind: 'deliverable', client: 'Sunset RV & Boat',   label: 'May reporting receipt due' },
//   { date: '2026-05-28', kind: 'kickoff',     client: 'Royal Mini Storage', label: 'New facility (Monroe) kickoff' },
// ];
//
// window.SYSTEM_HEALTH = {
//   api_quotas: [
//     { name: 'DataForSEO', used: 71, color: '#f59e0b' },
//     { name: 'Claude API', used: 18, color: '#10b981' },
//     { name: 'Gemini API', used: 24, color: '#10b981' },
//     { name: 'Apify CUs',  used: 12, color: '#10b981' },
//     { name: 'Twilio',     used: 32, color: '#10b981' },
//     { name: 'Helicone',   used: 8,  color: '#10b981' },
//   ],
//   jobs_24h: { completed: 1247, retries: 14, dlq: 2 },
//   cron_status: 'all_green',
//   webhook_rate: 99.7,
//   db_gb: 1.2, db_cap: 8,
//   storage_gb: 8, storage_cap: 100,
//   egress_gb: 4, egress_cap: 250,
// };
//
// window.ACTIVITY = [
//   { user: 'Khizer',  action: 'updated_schema',  resource: 'Brick & Stone Atlanta',   detail: 'Deployed SelfStorage + FAQPage schema',   at: '2026-05-15 12:48' },
//   { user: 'AI',      action: 'drafted_post',     resource: 'Sunset RV Austin',         detail: 'GBP post for referral promo (conf 0.91)', at: '2026-05-15 12:31' },
//   { user: 'Mark',  action: 'approved_post',    resource: 'Brick & Stone Atlanta',   detail: '"Welcoming new customers" — May 18',     at: '2026-05-15 12:22' },
//   { user: 'Aimen',   action: 'submitted_draft',  resource: 'Athens RV storage near 183', detail: 'Brief: brand voice 87, AI detect 28', at: '2026-05-15 11:54' },
//   { user: 'AI',      action: 'detected_anomaly', resource: 'Royal Mini',               detail: 'Rank -12 positions on "athens storage units"', at: '2026-05-15 02:00' },
//   { user: 'AI',      action: 'auto_paused',      resource: 'Athens 2 GBP',             detail: 'Suspension detected — edit lock engaged', at: '2026-05-14 03:47' },
//   { user: 'Khizer',  action: 'fixed_nap',        resource: 'Royal Mini YellowPages',   detail: 'Phone updated via BrightLocal API',     at: '2026-05-14 16:33' },
//   { user: 'Taha',    action: 'submitted_pitch',  resource: 'Featured.com Q3 trends',    detail: 'AI draft approved (conf 0.92)',         at: '2026-05-14 11:08' },
// ];
//
// window.INTEGRATIONS = [
//   { name: 'Google Business Profile', logo: 'gbp',          status: 'connected', last_synced: '2026-05-15 13:00', count: 15 },
//   { name: 'Google Search Console',   logo: 'gsc',          status: 'connected', last_synced: '2026-05-15 12:45', count: 15 },
//   { name: 'Google Analytics 4',      logo: 'ga',           status: 'partial',   last_synced: '2026-05-15 12:30', count: 12 },
//   { name: 'DataForSEO',              logo: 'dataforseo',   status: 'connected', last_synced: '2026-05-15 13:05' },
//   { name: 'BrightLocal',             logo: 'brightlocal',  status: 'connected', last_synced: '2026-05-15 09:00' },
//   { name: 'Whitespark',              logo: 'whitespark',   status: 'connected', last_synced: '2026-05-15 09:00' },
//   { name: 'Smartlead',               logo: 'smartlead',    status: 'connected', last_synced: '2026-05-15 12:00' },
//   { name: 'Featured.com',            logo: 'featured',     status: 'connected', last_synced: '2026-05-15 09:30' },
//   { name: 'Apollo',                  logo: 'apollo',       status: 'connected', last_synced: '2026-05-15 09:00' },
//   { name: 'Twilio',                  logo: 'twilio',       status: 'connected', last_synced: '2026-05-15 13:08' },
//   { name: 'Resend',                  logo: 'resend',       status: 'connected', last_synced: '2026-05-15 13:00' },
//   { name: 'Claude (Anthropic)',      logo: 'anthropic',    status: 'connected', last_synced: '2026-05-15 13:11' },
//   { name: 'Gemini',                  logo: 'gemini',       status: 'connected', last_synced: '2026-05-15 13:11' },
//   { name: 'Stripe',                  logo: 'stripe',       status: 'connected', last_synced: '2026-05-15 12:00' },
//   { name: 'Workfolio',               logo: 'workfolio',    status: 'connected', last_synced: '2026-05-15 12:00' },
//   { name: 'Storable (PMS)',          logo: 'storable',     status: 'partial',   last_synced: '2026-05-15 09:00', count: 8 },
//   { name: 'Nectar Inc (PMS)',        logo: 'nectar',       status: 'disconnected', count: 0 },
// ];
//
// window.ONBOARDING = [
//   {
//     client: 'sunset', name: 'Sunset RV Cedar Park (new facility)',
//     started: '2026-05-12', progress: 7, total: 14,
//     steps: [
//       { name: 'Intake questionnaire sent',  status: 'done', at: '2026-05-12' },
//       { name: 'Intake completed by client', status: 'done', at: '2026-05-13' },
//       { name: 'NDA signed',                  status: 'done', at: '2026-05-13' },
//       { name: 'MSA signed',                  status: 'done', at: '2026-05-13' },
//       { name: 'Access pack request sent',    status: 'done', at: '2026-05-13' },
//       { name: 'GBP OAuth granted',           status: 'done', at: '2026-05-14' },
//       { name: 'GSC OAuth granted',           status: 'done', at: '2026-05-14' },
//       { name: 'GA4 OAuth granted',           status: 'in_progress', detail: '3 of 8 facilities done' },
//       { name: 'WordPress credentials received', status: 'pending' },
//       { name: 'PMS read access verified',     status: 'pending' },
//       { name: 'Kickoff call scheduled',       status: 'pending' },
//       { name: 'Kickoff call completed',       status: 'pending' },
//       { name: 'Strategy doc v1 drafted',      status: 'pending' },
//       { name: 'Strategy doc v1 approved',     status: 'pending' },
//     ],
//   },
//   {
//     client: 'royal', name: 'Royal Mini Monroe (new facility)',
//     started: '2026-05-08', progress: 12, total: 14,
//     steps: [
//       { name: 'Intake questionnaire sent',  status: 'done', at: '2026-05-08' },
//       { name: 'Intake completed by client', status: 'done', at: '2026-05-08' },
//       { name: 'NDA signed',                  status: 'done', at: '2026-05-09' },
//       { name: 'MSA signed',                  status: 'done', at: '2026-05-09' },
//       { name: 'Access pack request sent',    status: 'done', at: '2026-05-09' },
//       { name: 'GBP OAuth granted',           status: 'done', at: '2026-05-10' },
//       { name: 'GSC OAuth granted',           status: 'done', at: '2026-05-10' },
//       { name: 'GA4 OAuth granted',           status: 'done', at: '2026-05-10' },
//       { name: 'WordPress credentials received', status: 'done', at: '2026-05-11' },
//       { name: 'PMS read access verified',     status: 'done', at: '2026-05-12' },
//       { name: 'Kickoff call scheduled',       status: 'done', at: '2026-05-13' },
//       { name: 'Kickoff call completed',       status: 'done', at: '2026-05-14' },
//       { name: 'Strategy doc v1 drafted',      status: 'in_progress' },
//       { name: 'Strategy doc v1 approved',     status: 'pending' },
//     ],
//   },
// ];
//
// window.ACCESS_VAULT = [
//   { service: 'GBP OAuth',    facility: 'bs-athens-1', status: 'valid', expires_in_days: 90 },
//   { service: 'GBP OAuth',    facility: 'bs-athens-2', status: 'valid', expires_in_days: 88 },
//   { service: 'GBP OAuth',    facility: 'bs-atlanta',  status: 'expiring', expires_in_days: 7 },
//   { service: 'GSC OAuth',    facility: 'bs-athens-1', status: 'valid', expires_in_days: 67 },
//   { service: 'GSC OAuth',    facility: 'bs-athens-2', status: 'valid', expires_in_days: 67 },
//   { service: 'GSC OAuth',    facility: 'bs-atlanta',  status: 'valid', expires_in_days: 67 },
//   { service: 'GA4 OAuth',    facility: 'bs-athens-1', status: 'valid', expires_in_days: 67 },
//   { service: 'GA4 OAuth',    facility: 'bs-athens-2', status: 'expired', expires_in_days: -3 },
//   { service: 'WordPress',    facility: 'bs-athens-1', status: 'missing' },
//   { service: 'PMS (Storable)', facility: 'All Acme', status: 'valid', expires_in_days: 365 },
//   { service: 'PMS (Storable)', facility: 'All Sunset', status: 'valid', expires_in_days: 365 },
//   { service: 'PMS (Storable)', facility: 'All Royal',  status: 'valid', expires_in_days: 365 },
// ];
//
// window.KB_DOCS = [
//   { id: 'kb-001', title: 'Self-storage local SEO playbook',        size: '24 pages', updated: '2026-05-12', tags: ['core','seo'] },
//   { id: 'kb-002', title: 'GBP suspension prevention guide',         size: '11 pages', updated: '2026-05-08', tags: ['gbp'] },
//   { id: 'kb-003', title: 'Brand voice template — Acme',             size: '4 pages',  updated: '2026-04-30', tags: ['voice'] },
//   { id: 'kb-004', title: 'Schema templates (SelfStorage + FAQ)',    size: '18 pages', updated: '2026-04-22', tags: ['schema'] },
//   { id: 'kb-005', title: 'Citation directory master list (50+)',    size: '6 pages',  updated: '2026-04-15', tags: ['citations'] },
//   { id: 'kb-006', title: 'NEPQ discovery call framework',            size: '14 pages', updated: '2026-04-10', tags: ['sales'] },
//   { id: 'kb-007', title: 'Featured.com pitch SLA + 5 templates',     size: '8 pages',  updated: '2026-04-08', tags: ['outreach'] },
//   { id: 'kb-008', title: 'Google policy compliance reference',       size: '22 pages', updated: '2026-03-29', tags: ['gbp','compliance'] },
// ];
//
// window.AI_PLAYGROUND_HISTORY = [
//   { q: 'Why did Brick & Stone Athens lose rank for "athens storage" between May 10 and May 14?', ts: '2026-05-15 12:48', ans_summary: 'Most likely cause: Star Storage citation + review campaign (confidence 0.78). Recommended: match velocity.' },
//   { q: 'Which 3 facilities are most at risk for losing top-3 in the next 30 days?', ts: '2026-05-15 09:14', ans_summary: 'Royal Mini, Sunset Round Rock, Brick & Stone Bogart. Citation churn is the common signal.' },
//   { q: 'How does our climate-controlled content cluster compare to competitor content depth?', ts: '2026-05-14 17:20', ans_summary: 'Our 3 climate pages avg 1,420 words. Competitors avg 980. We outperform on depth; SERP gap is in entity coverage.' },
// ];
//
// window.UNIT_MIX = [
//   { facility: 'bs-athens-1', total: 248, occupied: 211, occ_pct: 85, by_size: [
//     { size: '5x5',  total: 48, occupied: 47 },
//     { size: '5x10', total: 64, occupied: 58 },
//     { size: '10x10', total: 72, occupied: 60 },
//     { size: '10x15', total: 32, occupied: 26 },
//     { size: '10x20', total: 24, occupied: 14 },
//     { size: 'RV/Boat', total: 8, occupied: 6 },
//   ] },
// ];
//
// window.SEASONALITY = [
//   { month: 'Jan', demand: 78 }, { month: 'Feb', demand: 72 }, { month: 'Mar', demand: 81 },
//   { month: 'Apr', demand: 92 }, { month: 'May', demand: 108 }, { month: 'Jun', demand: 124 },
//   { month: 'Jul', demand: 138 }, { month: 'Aug', demand: 132 }, { month: 'Sep', demand: 96 },
//   { month: 'Oct', demand: 88 }, { month: 'Nov', demand: 82 }, { month: 'Dec', demand: 76 },
// ];
//
// window.COMPETITOR_PRICING = [
//   { facility: 'bs-athens-1', name: 'Brick & Stone Athens 1', unit: '10x10 climate', price: 149, percentile: 'mid' },
//   { facility: 'star-athens',  name: 'Star Storage Athens',     unit: '10x10 climate', price: 139, percentile: 'low' },
//   { facility: null, name: 'CubeSmart Athens', unit: '10x10 climate', price: 162, percentile: 'high' },
//   { facility: null, name: 'Extra Space Athens', unit: '10x10 climate', price: 158, percentile: 'high' },
//   { facility: null, name: 'UHaul Athens', unit: '10x10 climate', price: 124, percentile: 'low' },
// ];
//
// window.PORTFOLIO_KPIS_V2 = Object.assign({}, window.PORTFOLIO_KPIS, {
//   avg_rank_spark: [6.2, 6.0, 5.7, 5.5, 5.2, 4.9, 4.7, 4.6],
//   solv_spark: [29, 31, 32, 34, 35, 36, 37, 38],
// });
//
// window.AGENT_ACTIVITY = [
//   { id: 'aa-1', agent: 'Claude Sonnet 4.6', avatar: 'CL', action: 'Drafted 4 GBP posts', client: 'Acme Storage', minutes_ago: 12, cost: 0.08, outcome: 'awaiting approval' },
//   { id: 'aa-2', agent: 'Gemini 2.5 Flash', avatar: 'GM', action: 'Scanned Royal Mini SERP for "athens storage units"', client: 'Royal Mini', minutes_ago: 28, cost: 0.02, outcome: 'anomaly opened' },
//   { id: 'aa-3', agent: 'Claude Sonnet 4.6', avatar: 'CL', action: 'Replied to 1-star review (drafted)', client: 'Acme Storage', minutes_ago: 41, cost: 0.04, outcome: 'awaiting approval' },
//   { id: 'aa-4', agent: 'DeepSeek V3', avatar: 'DS', action: 'Generated topic cluster brief', client: 'Acme Storage', minutes_ago: 67, cost: 0.01, outcome: 'queued in studio' },
//   { id: 'aa-5', agent: 'Claude Sonnet 4.6', avatar: 'CL', action: 'Built renewal pitch deck v2', client: 'GrowthBoost', minutes_ago: 94, cost: 0.12, outcome: 'ready to send' },
//   { id: 'aa-6', agent: 'Gemini 2.5 Flash', avatar: 'GM', action: 'Citation NAP scan across 18 directories', client: 'Sunset RV', minutes_ago: 132, cost: 0.03, outcome: '2 drifts found' },
// ];
//
// window.DECISION_QUEUE_PREVIEWS = {
//   'dq-001': 'Gate code did not work for 2 days, no one answered the phone.',
//   'dq-002': 'Confidence 0.78 paired with -32% GBP impressions',
//   'dq-003': 'Refer a friend, both get $50 off your next month.',
//   'dq-004': '$800/mo retainer, 3-month term, audit-tier scope',
//   'dq-006': 'Dust everywhere when I opened my unit after 6 weeks away.',
//   'dq-007': 'Auto-renewal pack assembling - 12 wins, 3 risks, 4 forward bets',
//   'dq-008': 'Verify on-site Friday before push to runbook',
// };
//
// window.PORTFOLIO_MOVERS_TRACES = {
//   'atlanta self storage': [9, 9, 8, 7, 7, 6, 6, 5],
//   'cheap storage athens': [8, 8, 7, 7, 6, 6, 5, 5],
//   'climate controlled storage': [6, 5, 5, 4, 4, 4, 3, 3],
//   'rv storage austin': [7, 7, 6, 6, 6, 5, 5, 5],
//   'marketing agency lahore': [12, 11, 11, 10, 10, 10, 10, 10],
//   'athens storage units': [3, 3, 4, 5, 7, 10, 13, 15],
//   'storage near uga': [4, 4, 5, 5, 6, 7, 8, 9],
//   'boat storage cedar park': [5, 6, 6, 7, 7, 8, 8, 9],
//   'self storage bogart ga': [6, 6, 7, 7, 8, 8, 9, 9],
//   'storage watkinsville': [8, 8, 9, 9, 9, 10, 10, 10],
// };
//
// window.CLIENT_MATRIX = [
//   { id: 'acme',        name: 'Acme Storage',       initials: 'AC', facilities: 15, mrr: 3000, mrr_spark: [2400,2600,2700,2800,2900,2900,3000,3000], avg_rank: 5.2, avg_rank_spark: [6.8,6.5,6.2,5.9,5.6,5.4,5.3,5.2], solv: 41, solv_spark: [30,32,34,36,38,39,40,41], score: 68, churn_risk_pct: 28, status: 'at_risk', open_issues: 5, trend: 'down', trend_delta: -8 },
//   { id: 'sunset',      name: 'Sunset RV & Boat',   initials: 'SS', facilities: 4,  mrr: 1800, mrr_spark: [1500,1550,1600,1650,1700,1750,1780,1800], avg_rank: 4.1, avg_rank_spark: [5.3,5.0,4.7,4.5,4.3,4.2,4.1,4.1], solv: 36, solv_spark: [28,29,31,32,33,34,35,36], score: 41, churn_risk_pct: 9,  status: 'healthy', open_issues: 2, trend: 'up',   trend_delta: 3 },
//   { id: 'royal',       name: 'Royal Mini Storage', initials: 'RM', facilities: 3,  mrr: 1200, mrr_spark: [1100,1100,1150,1150,1200,1200,1200,1200], avg_rank: 6.8, avg_rank_spark: [4.2,4.5,5.0,5.5,5.9,6.3,6.6,6.8], solv: 28, solv_spark: [35,34,33,32,31,30,29,28], score: 22, churn_risk_pct: 4,  status: 'healthy', open_issues: 1, trend: 'down', trend_delta: -2 },
//   { id: 'growthboost', name: 'GrowthBoost',        initials: 'GB', facilities: 1,  mrr: 800,  mrr_spark: [600,650,700,700,750,750,800,800],         avg_rank: 8.4, avg_rank_spark: [12,11,10,9.5,9,8.8,8.6,8.4],     solv: 22, solv_spark: [12,14,16,18,19,20,21,22], score: 18, churn_risk_pct: 2,  status: 'healthy', open_issues: 0, trend: 'up',   trend_delta: 5 },
// ];
//
// window.ALGORITHM_PULSE = {
//   latest_name: 'March 2026 core update',
//   latest_at: '2026-03-14',
//   latest_days_ago: 69,
//   latest_type: 'core',
//   portfolio_net_delta: 0.8,
//   recovery_status: 'complete',
//   facilities_impacted: 4,
//   facilities_recovered: 4,
// };
//
// window.AI_SPEND_DELTAS = {
//   'Acme Storage': 12,
//   'Sunset RV & Boat': 4,
//   'Royal Mini Storage': -3,
//   'GrowthBoost': 18,
// };
//
// window.RECENT_WINS = [
//   { id: 'rw-1', text: 'Brick & Stone Atlanta climbed +4 on "atlanta self storage"', client: 'Acme Storage', at: '2h ago' },
//   { id: 'rw-2', text: '187 reviews collected MTD across portfolio (target 195)', client: 'Portfolio', at: '6h ago' },
//   { id: 'rw-3', text: 'Tamara partnership signed - 4 PDFs/mo recurring', client: 'New revenue', at: '1d ago' },
// ];
//
// window.SYSTEM_PULSE = {
//   apis: [
//     { name: 'Search Console', status: 'ok',       last_sync_min: 8 },
//     { name: 'GBP API',        status: 'ok',       last_sync_min: 14 },
//     { name: 'DataForSEO',     status: 'ok',       last_sync_min: 22 },
//     { name: 'Whitespark',     status: 'degraded', last_sync_min: 47 },
//     { name: 'CallRail',       status: 'ok',       last_sync_min: 3 },
//   ],
//   jobs: [
//     { name: 'Daily citation monitor', schedule: '08:00 PKT',     last_run: 'today 08:00',     status: 'ok' },
//     { name: 'Anomaly detector',       schedule: 'every 6h',      last_run: '02:00 PKT',       status: 'ok' },
//     { name: 'Weekly delivery receipt', schedule: 'Mon 09:00 PKT', last_run: 'Mon 2026-05-19', status: 'ok' },
//   ],
// };
//
// window.AGENT_CONFIDENCE = {
//   'aa-1': 91, 'aa-2': 78, 'aa-3': 88, 'aa-4': 84, 'aa-5': 93, 'aa-6': 96,
// };
//
// window.AI_NARRATIVE = {
//   generated_at: '2026-05-22 05:30 PKT',
//   model: 'Claude Sonnet 4.6',
//   confidence_pct: 87,
//   headline: 'Strong week, one priority',
//   body: 'Portfolio MRR is up 17.2% week over week, driven by Acme retention and the new GrowthBoost renewal. Royal Mini "athens storage units" is the single most important issue - rank dropped 12 positions in 7 days, citation rebuild is drafted and ready to push.',
//   sources: [
//     { label: 'MRR delta', anchor: 'mrr' },
//     { label: 'Acme health +16pt', anchor: 'health' },
//     { label: 'Royal Mini anomaly', anchor: 'anomaly-002' },
//   ],
// };
//
// window.MRR_FORECAST = {
//   past_weeks: [3200, 3800, 4200, 4900, 5400, 5800, 6100, 6400, 6800],
//   forecast_weeks: [6800, 7050, 7300, 7550, 7800],
//   forecast_band_low:  [6800, 6900, 7050, 7200, 7350],
//   forecast_band_high: [6800, 7200, 7550, 7900, 8250],
//   forecast_confidence_pct: 78,
// };
//
// window.QUARTERLY_TARGET = {
//   label: 'Q2 2026 MRR target',
//   target_usd: 10000,
//   current_usd: 6800,
//   pct_achieved: 68,
//   projected_end_usd: 9200,
//   on_track_pct: 92,
//   days_remaining: 41,
// };
//
// window.INDUSTRY_BENCHMARKS = {
//   avg_rank: { our_value: 4.6, industry_median: 7.1, percentile: 88, label: 'top 12% of self-storage agencies' },
//   solv: { our_value: 38, industry_median: 24, percentile: 79, label: 'top 21%' },
//   review_velocity: { our_value: 187, industry_median: 142, percentile: 73, label: 'above average' },
// };
//
// window.GEO_FACILITIES = [
//   { id: 'bs-athens-1', name: 'Brick & Stone Athens 1', client: 'Acme Storage', lat: 33.96, lng: -83.38, status: 'healthy',   avg_rank: 4.2, delta:  2 },
//   { id: 'bs-athens-2', name: 'Brick & Stone Athens 2', client: 'Acme Storage', lat: 33.95, lng: -83.42, status: 'suspended', avg_rank: 12.0, delta: -3 },
//   { id: 'bs-atlanta',  name: 'Brick & Stone Atlanta',  client: 'Acme Storage', lat: 33.74, lng: -84.39, status: 'healthy',   avg_rank: 3.8, delta:  4 },
//   { id: 'bs-bogart',   name: 'Brick & Stone Bogart',   client: 'Acme Storage', lat: 33.94, lng: -83.52, status: 'healthy',   avg_rank: 6.1, delta: -1 },
//   { id: 'bs-wat',      name: 'Brick & Stone Watkinsville', client: 'Acme Storage', lat: 33.86, lng: -83.41, status: 'healthy', avg_rank: 7.2, delta: -2 },
//   { id: 'star-athens', name: 'Star Storage Athens',    client: 'Acme Storage', lat: 33.96, lng: -83.36, status: 'at_risk',   avg_rank: 8.4, delta: -4 },
//   { id: 'royal-mon',   name: 'Royal Mini Monroe',      client: 'Royal Mini',   lat: 33.79, lng: -83.71, status: 'critical',  avg_rank: 15.0, delta: -12 },
//   { id: 'royal-ath',   name: 'Royal Mini Athens',      client: 'Royal Mini',   lat: 33.95, lng: -83.37, status: 'healthy',   avg_rank: 5.0, delta:  3 },
//   { id: 'sunset-aus',  name: 'Sunset RV Austin',       client: 'Sunset RV',    lat: 30.27, lng: -97.74, status: 'healthy',   avg_rank: 5.0, delta:  2 },
//   { id: 'sunset-cp',   name: 'Sunset RV Cedar Park',   client: 'Sunset RV',    lat: 30.50, lng: -97.82, status: 'at_risk',   avg_rank: 9.0, delta: -4 },
//   { id: 'sunset-rr',   name: 'Sunset RV Round Rock',   client: 'Sunset RV',    lat: 30.51, lng: -97.69, status: 'healthy',   avg_rank: 4.5, delta:  1 },
//   { id: 'sunset-gt',   name: 'Sunset RV Georgetown',   client: 'Sunset RV',    lat: 30.63, lng: -97.68, status: 'healthy',   avg_rank: 6.0, delta:  0 },
//   { id: 'gb-hq',       name: 'GrowthBoost HQ',          client: 'GrowthBoost', lat: 31.55, lng: 74.34,  status: 'healthy',   avg_rank: 8.4, delta:  2 },
// ];
//
// window.SERP_FEATURES = [
//   { feature: 'Local pack',       presence_pct: 64, delta_pct: 6,  our_count: 142, total_tracked: 222 },
//   { feature: 'Featured snippet', presence_pct: 18, delta_pct: 3,  our_count: 40,  total_tracked: 222 },
//   { feature: 'Knowledge panel',  presence_pct: 31, delta_pct: 0,  our_count: 69,  total_tracked: 222 },
//   { feature: 'AI Overview',      presence_pct: 22, delta_pct: 9,  our_count: 49,  total_tracked: 222 },
//   { feature: 'Image pack',       presence_pct: 41, delta_pct: -2, our_count: 91,  total_tracked: 222 },
// ];
//