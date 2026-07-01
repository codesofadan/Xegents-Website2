/* ============================================================
   Seed data for the v2 feature set: playbooks, renewals,
   competitors, topics, delivery, service areas, calls,
   algorithm updates, crisis mode, multi-platform reviews
   ============================================================ */

// =====================================================================
// 1. CROSS-CLIENT PLAYBOOK LIBRARY
// =====================================================================
window.PLAYBOOKS = [
  {
    id: 'pb-001',
    title: 'Citation rebuild + Schema deploy combo',
    proven_at: 'bs-atlanta',
    proven_date: '2026-05-10',
    avg_outcome: '+2.3 rank in 14 days',
    win_rate: 0.83,
    runs: 6,
    duration: '14 days',
    cost: 480,
    confidence: 0.88,
    description: 'Whitespark citation rebuild (12-15 directories) combined with SelfStorage + FAQPage schema deploy. Highest leverage move for facilities ranking 5-10 on transactional keywords.',
    steps: [
      { n: 1, label: 'Audit current citation health (BrightLocal)',  hours: 1 },
      { n: 2, label: 'Order Whitespark Citation Builder Pro',         hours: 0.5 },
      { n: 3, label: 'Generate SelfStorage + FAQPage JSON-LD',        hours: 2 },
      { n: 4, label: 'Deploy schema via WordPress REST',              hours: 1 },
      { n: 5, label: 'Validate via Rich Results Test',                hours: 0.5 },
      { n: 6, label: 'Track rank delta over 14 days',                 hours: 0.5 },
    ],
    matches: [
      { facility: 'bs-conyers',     score: 0.92, reason: 'Same rank band (3-7), similar citation count' },
      { facility: 'bs-loganville',  score: 0.87, reason: 'Same client, comparable competitor density' },
      { facility: 'royal-loganville', score: 0.84, reason: 'Same market, lower citation count means bigger upside' },
      { facility: 'royal-monroe',   score: 0.79, reason: 'Lower-volume market, slower expected lift' },
    ],
    tags: ['citations', 'schema', 'high-leverage'],
  },
  {
    id: 'pb-002',
    title: 'Climate-controlled content cluster',
    proven_at: 'bs-athens-1',
    proven_date: '2026-04-22',
    avg_outcome: '3x CTR vs standard pages',
    win_rate: 0.76,
    runs: 4,
    duration: '30 days',
    cost: 1200,
    confidence: 0.81,
    description: '6-piece content cluster targeting climate-controlled long-tail keywords. Best for facilities with climate units that under-index on climate intent traffic.',
    steps: [
      { n: 1, label: 'SERP gap analysis on climate cluster',         hours: 2 },
      { n: 2, label: 'Generate 6 briefs (Claude Sonnet)',             hours: 0.5 },
      { n: 3, label: 'Write 6 pieces (AI + human pass)',              hours: 18 },
      { n: 4, label: 'QA gate (originality + brand voice)',           hours: 2 },
      { n: 5, label: 'Internal linking + schema embed',               hours: 2 },
      { n: 6, label: 'Publish + index in GSC',                        hours: 1 },
    ],
    matches: [
      { facility: 'bs-atlanta',     score: 0.94, reason: 'Has climate units, low cluster coverage' },
      { facility: 'star-athens',    score: 0.81, reason: 'Athens market, partial cluster existing' },
      { facility: 'sunset-austin',  score: 0.68, reason: 'Different vertical (RV) but proven framework adapts' },
    ],
    tags: ['content', 'cluster', 'climate'],
  },
  {
    id: 'pb-003',
    title: 'Review velocity sprint (PMS push)',
    proven_at: 'sunset-austin',
    proven_date: '2026-04-15',
    avg_outcome: '+47 reviews in 60 days',
    win_rate: 0.91,
    runs: 9,
    duration: '60 days',
    cost: 180,
    confidence: 0.93,
    description: 'PMS-triggered SMS + email cadence with QR code printout at office. Best ROI per dollar in the playbook library.',
    steps: [
      { n: 1, label: 'PMS webhook health check',                     hours: 0.5 },
      { n: 2, label: 'Configure 2-day SMS + 7-day email cadence',     hours: 1 },
      { n: 3, label: 'Generate QR code printout for office',          hours: 0.5 },
      { n: 4, label: 'Train front-desk on the ask',                   hours: 1 },
      { n: 5, label: 'Monitor velocity weekly',                       hours: 0.5 },
    ],
    matches: [
      { facility: 'royal-mini',     score: 0.96, reason: 'CRITICAL velocity drop, highest urgency' },
      { facility: 'bs-bogart',      score: 0.84, reason: 'Below-target review velocity' },
      { facility: 'royal-monroe',   score: 0.81, reason: 'New facility, low review base' },
    ],
    tags: ['reviews', 'velocity', 'pms'],
  },
  {
    id: 'pb-004',
    title: 'RV-niche backlink campaign',
    proven_at: 'sunset-austin',
    proven_date: '2026-04-30',
    avg_outcome: '5 DR 60+ links in 30 days',
    win_rate: 0.68,
    runs: 3,
    duration: '30 days',
    cost: 360,
    confidence: 0.74,
    description: 'Targeted outreach to RV-vertical publications (rvtravel, rvshare, outdoorsy partners). Highest authority gain per facility for RV/Boat verticals.',
    steps: [
      { n: 1, label: 'Compile prospect list (50 RV-niche sites)',    hours: 2 },
      { n: 2, label: 'Hunter email verification',                     hours: 0.5 },
      { n: 3, label: 'Personalized outreach via Smartlead',           hours: 3 },
      { n: 4, label: 'Follow-up sequence (3 touches)',                hours: 1 },
      { n: 5, label: 'Negotiate placement and anchor',                hours: 4 },
    ],
    matches: [
      { facility: 'sunset-roundrock',  score: 0.89, reason: 'Same vertical (RV), same playbook owner' },
      { facility: 'sunset-georgetown', score: 0.85, reason: 'RV-heavy market, untapped link profile' },
      { facility: 'sunset-cedar',      score: 0.82, reason: 'RV vertical, smallest facility means biggest relative gain' },
    ],
    tags: ['backlinks', 'rv', 'authority'],
  },
  {
    id: 'pb-005',
    title: 'GBP category stack optimization',
    proven_at: 'bs-athens-1',
    proven_date: '2026-03-18',
    avg_outcome: '+18% GBP impressions in 21 days',
    win_rate: 0.72,
    runs: 5,
    duration: '21 days',
    cost: 90,
    confidence: 0.79,
    description: 'Reverse-engineer top competitor category stacks via GMB Everywhere. Add 2-3 missing secondary categories. Highest impression gain per dollar spent.',
    steps: [
      { n: 1, label: 'Pull competitor stacks (top 5 in market)',     hours: 1 },
      { n: 2, label: 'Identify category gaps',                        hours: 0.5 },
      { n: 3, label: 'Verify edit-cooling window is safe',            hours: 0.25 },
      { n: 4, label: 'Apply categories one at a time, 48h apart',     hours: 0.5 },
      { n: 5, label: 'Monitor impression delta',                      hours: 0.5 },
    ],
    matches: [
      { facility: 'bs-watkinsville', score: 0.88, reason: 'Single primary category currently, big upside' },
      { facility: 'royal-monroe',    score: 0.83, reason: 'Generic stack, mismatched vs competitors' },
    ],
    tags: ['gbp', 'categories', 'quick-win'],
  },
];

// =====================================================================
// 2. RENEWAL PITCH AUTO-BUILDER
// =====================================================================
window.RENEWALS = [
  {
    client: 'acme',
    renewal_at: '2026-06-29',
    days_to_renewal: 45,
    current_mrr: 3000,
    proposed_mrr: 3600,
    renewal_status: 'critical',
    months_served: 4,
    started: '2026-01-12',
    before: {
      rank_avg: 6.1, reviews: 300, citations_score: 64,
      gbp_calls_mtd: 781, rentals_attributed: 14,
    },
    now: {
      rank_avg: 4.2, reviews: 487, citations_score: 87,
      gbp_calls_mtd: 1247, rentals_attributed: 42,
    },
    headline: 'Rank avg dropped 1.9 positions. Reviews up 62%. 28 new rentals at $4,200 LTV equal $117,600 attributable lifetime revenue.',
    forward_roadmap: [
      { quarter: 'Q3 2026', bet: 'Land-grab 4 climate-controlled keywords across Athens cluster', expected_lift: '+25 rentals' },
      { quarter: 'Q3 2026', bet: 'Athens 2 reinstatement and recovery sprint',  expected_lift: '+8 rentals' },
      { quarter: 'Q4 2026', bet: 'RV/Boat sub-vertical expansion (new content cluster)',   expected_lift: '+15 rentals' },
    ],
    escape_valves: [
      { name: '10% discount on locked-in 12 month renewal', cost: -360, retention_lift: 0.18 },
      { name: 'Add 1 facility free for first 3 months', cost: -540, retention_lift: 0.22 },
      { name: 'Quarterly executive review with Mark', cost: -180, retention_lift: 0.14 },
    ],
    risks: [
      'Athens 2 GBP still suspended. Reinstatement evidence pack 60% complete.',
      'Sara mentioned 2 missed deliverables in last 90 days. Trust dent.',
      'Competitor Star Storage gained 14 citations on May 11-12. Defensive sprint needed.',
    ],
  },
  {
    client: 'sunset',
    renewal_at: '2026-09-12',
    days_to_renewal: 120,
    current_mrr: 1800,
    proposed_mrr: 2200,
    renewal_status: 'on_track',
    months_served: 3,
    started: '2026-02-08',
    before: { rank_avg: 5.8, reviews: 98, citations_score: 60, gbp_calls_mtd: 198, rentals_attributed: 8 },
    now:    { rank_avg: 5.1, reviews: 142, citations_score: 73, gbp_calls_mtd: 287, rentals_attributed: 19 },
    headline: 'RV-niche backlink push delivered 5 DR 60+ links. 11 new rentals at $4,900 avg LTV equal $53,900 attributable revenue.',
    forward_roadmap: [
      { quarter: 'Q3 2026', bet: 'Add Cedar Park facility expansion (already onboarding)', expected_lift: '+12 rentals' },
      { quarter: 'Q4 2026', bet: 'Outdoorsy / RVshare partnership content series',          expected_lift: '+18 rentals' },
    ],
    escape_valves: [
      { name: 'Multi-facility volume discount (10%)', cost: -260, retention_lift: 0.16 },
    ],
    risks: ['No critical risks. Steady trajectory.'],
  },
  {
    client: 'royal',
    renewal_at: '2026-08-15',
    days_to_renewal: 90,
    current_mrr: 1200,
    proposed_mrr: 1400,
    renewal_status: 'on_track',
    months_served: 2,
    started: '2026-03-01',
    before: { rank_avg: 6.9, reviews: 76, citations_score: 58, gbp_calls_mtd: 312, rentals_attributed: 5 },
    now:    { rank_avg: 4.8, reviews: 92, citations_score: 79, gbp_calls_mtd: 412, rentals_attributed: 11 },
    headline: 'Rank lifted 2.1 positions. Citation score up 21. 6 new rentals.',
    forward_roadmap: [
      { quarter: 'Q3 2026', bet: 'Athens market consolidation (Royal Mini recovery + cluster)', expected_lift: '+9 rentals' },
    ],
    escape_valves: [],
    risks: ['Royal Mini main facility has active rank-drop anomaly. Resolve before pitch.'],
  },
];

// =====================================================================
// 3. COMPETITOR INTELLIGENCE
// =====================================================================
window.US_BASELINE = {
  name: 'Us (Acme Storage)',
  avg_rank: 4.7,
  review_count: 87,
  review_velocity_7d: 5.2,
  citation_count: 84,
  post_velocity_7d: 4,
  schema_completeness_pct: 92,
  page_count: 38,
  backlink_count: 412,
  dr: 41,
  gbp_completeness_pct: 96,
};

window.COMPETITORS = [
  {
    id: 'cp-001', name: 'Star Storage Athens', market: 'Athens, GA',
    facing: ['bs-athens-1', 'bs-athens-2', 'royal-mini'],
    rank_delta_7d: -2.4, rank_delta_30d: -3.8,
    review_velocity_7d: 8.5, review_velocity_baseline: 4.2,
    citation_velocity_7d: 14, citation_velocity_baseline: 2,
    post_velocity_7d: 6, post_velocity_baseline: 2,
    photo_velocity_7d: 4, photo_velocity_baseline: 1,
    avg_rank: 3.2, review_count: 142, citation_count: 96,
    schema_completeness_pct: 88, page_count: 52, backlink_count: 487, dr: 44, gbp_completeness_pct: 94,
    threat_score: 92,
    threat_level: 'critical',
    last_move: 'Coordinated citation and review campaign May 11-12',
    intel: [
      { date: '2026-05-12', signal: 'Citation surge', detail: 'Added 14 directory listings in 48h via Whitespark Pro', source: 'BrightLocal monitor' },
      { date: '2026-05-12', signal: 'Review velocity 2x', detail: '17 reviews in 14 days vs baseline of 8', source: 'GBP API poll' },
      { date: '2026-05-09', signal: 'New blog cluster', detail: '3 climate-controlled pages published in week', source: 'Sitemap diff' },
      { date: '2026-05-05', signal: 'Hired agency?', detail: 'Sudden activity pattern matches new SEO agency signature', source: 'Pattern detection' },
    ],
    actions: [
      { id: 'ca-001', kind: 'copy', description: 'Match their RV-niche backlink push - 5 placements in 21d', cost_usd: 1200, eta_days: 21, confidence: 0.82 },
      { id: 'ca-002', kind: 'differentiate', description: 'Defend Athens reviews velocity - SMS automation, 25/wk target', cost_usd: 400, eta_days: 14, confidence: 0.91 },
    ],
  },
  {
    id: 'cp-002', name: 'CubeSmart Athens', market: 'Athens, GA',
    facing: ['bs-athens-1', 'star-athens'],
    rank_delta_7d: 0.4, rank_delta_30d: 0.6,
    review_velocity_7d: 12.0, review_velocity_baseline: 11.0,
    citation_velocity_7d: 0, citation_velocity_baseline: 0.5,
    post_velocity_7d: 3, post_velocity_baseline: 4,
    photo_velocity_7d: 1, photo_velocity_baseline: 1,
    avg_rank: 5.4, review_count: 311, citation_count: 124,
    schema_completeness_pct: 71, page_count: 28, backlink_count: 612, dr: 52, gbp_completeness_pct: 90,
    threat_score: 41,
    threat_level: 'baseline',
    last_move: 'Steady-state, no new initiatives detected',
    intel: [
      { date: '2026-05-08', signal: 'Brand campaign', detail: 'Detected Google Ads activity uptick on branded terms', source: 'Apify monitor' },
    ],
    actions: [
      { id: 'ca-003', kind: 'copy', description: 'Replicate review request cadence at Athens locations', cost_usd: 200, eta_days: 7, confidence: 0.74 },
    ],
  },
  {
    id: 'cp-003', name: 'Extra Space Atlanta', market: 'Atlanta, GA',
    facing: ['bs-atlanta'],
    rank_delta_7d: 0.1, rank_delta_30d: -0.4,
    review_velocity_7d: 14.0, review_velocity_baseline: 12.5,
    citation_velocity_7d: 2, citation_velocity_baseline: 1.5,
    post_velocity_7d: 4, post_velocity_baseline: 3,
    photo_velocity_7d: 2, photo_velocity_baseline: 1,
    avg_rank: 4.9, review_count: 624, citation_count: 154,
    schema_completeness_pct: 95, page_count: 87, backlink_count: 1184, dr: 61, gbp_completeness_pct: 98,
    threat_score: 38,
    threat_level: 'baseline',
    last_move: 'Adding 24/7 access attribute across all locations',
    intel: [
      { date: '2026-05-13', signal: 'Attribute additions', detail: 'Now displaying 24/7 access on 47 of 52 locations', source: 'GBP scrape' },
    ],
    actions: [
      { id: 'ca-004', kind: 'copy', description: 'Add 24/7 access attribute on all 15 facilities', cost_usd: 80, eta_days: 2, confidence: 0.95 },
      { id: 'ca-005', kind: 'differentiate', description: 'Push schema completeness to 98% to match', cost_usd: 600, eta_days: 10, confidence: 0.83 },
    ],
  },
  {
    id: 'cp-004', name: 'Public Storage Lake Travis', market: 'Austin, TX',
    facing: ['sunset-austin', 'sunset-roundrock'],
    rank_delta_7d: -0.8, rank_delta_30d: -1.2,
    review_velocity_7d: 4.5, review_velocity_baseline: 4.0,
    citation_velocity_7d: 3, citation_velocity_baseline: 1,
    post_velocity_7d: 5, post_velocity_baseline: 2,
    photo_velocity_7d: 3, photo_velocity_baseline: 1,
    avg_rank: 6.1, review_count: 198, citation_count: 102,
    schema_completeness_pct: 64, page_count: 34, backlink_count: 354, dr: 38, gbp_completeness_pct: 89,
    threat_score: 64,
    threat_level: 'elevated',
    last_move: 'New "RV storage" service category added on May 9',
    intel: [
      { date: '2026-05-09', signal: 'RV vertical entry', detail: 'Added RV Storage Facility as secondary category, photo set, dedicated landing', source: 'GBP diff' },
      { date: '2026-05-04', signal: 'Pricing change', detail: 'Reduced 10x20 RV slot from $159 to $129', source: 'Apify price scrape' },
    ],
    actions: [
      { id: 'ca-006', kind: 'differentiate', description: 'Build RV-focused landing for Sunset Austin before they own the keyword', cost_usd: 900, eta_days: 18, confidence: 0.78 },
      { id: 'ca-007', kind: 'copy', description: 'Lower 10x20 RV pricing on competitive overlap locations', cost_usd: 0, eta_days: 3, confidence: 0.65 },
    ],
  },
];

window.COMPETITOR_KPI = {
  total_tracked: 4,
  critical_threats: 1,
  elevated_threats: 1,
  baseline: 2,
  net_share_of_voice: 38,
  net_share_of_voice_delta: -3.2,
};

// =====================================================================
// 4. TOPIC-CLUSTER CONTENT MANAGEMENT
// =====================================================================
window.TOPIC_CLUSTERS = [
  {
    id: 'tc-001', name: 'Climate-controlled storage',
    intent: 'transactional', priority: 'critical',
    target_kw: 'climate controlled storage', search_volume: 14800,
    pieces: 9, target_pieces: 12,
    avg_depth: 1380, competitor_avg_depth: 1620,
    coverage_score: 76,
    cannibalization_risk: [
      { url_a: 'brickandstone.com/athens/climate-controlled', url_b: 'brickandstone.com/atlanta/climate-controlled', overlap: 0.73, recommendation: 'Differentiate by location intent in Athens-only paragraphs' },
    ],
    facilities: ['bs-athens-1', 'bs-atlanta', 'bs-conyers', 'star-athens'],
    by_facility: [
      { facility: 'bs-athens-1', pieces: 3, depth: 1480, rank: 3.2 },
      { facility: 'bs-atlanta',  pieces: 2, depth: 1320, rank: 4.6 },
      { facility: 'bs-conyers',  pieces: 2, depth: 1180, rank: 7.1 },
      { facility: 'star-athens', pieces: 2, depth: 1450, rank: 5.4 },
    ],
    gaps: ['Athens 2 has 0 pieces (suspended, hold)', 'No comparison vs portable storage', 'Missing humidity FAQ for instruments'],
  },
  {
    id: 'tc-002', name: 'RV and boat storage',
    intent: 'transactional', priority: 'high',
    target_kw: 'rv storage near me', search_volume: 8200,
    pieces: 7, target_pieces: 10,
    avg_depth: 1240, competitor_avg_depth: 1180,
    coverage_score: 71,
    cannibalization_risk: [],
    facilities: ['sunset-austin', 'sunset-roundrock', 'sunset-georgetown', 'sunset-cedar'],
    by_facility: [
      { facility: 'sunset-austin',     pieces: 2, depth: 1320, rank: 4.4 },
      { facility: 'sunset-roundrock',  pieces: 2, depth: 1280, rank: 5.7 },
      { facility: 'sunset-georgetown', pieces: 2, depth: 1180, rank: 6.1 },
      { facility: 'sunset-cedar',      pieces: 1, depth: 1080, rank: 4.8 },
    ],
    gaps: ['No winterization guide for Texas climate', 'No motorcycle covered storage variant', 'Boat-specific FAQ thin'],
  },
  {
    id: 'tc-003', name: 'Move-in checklist and packing',
    intent: 'informational', priority: 'medium',
    target_kw: 'how to pack a storage unit', search_volume: 3400,
    pieces: 5, target_pieces: 7,
    avg_depth: 980, competitor_avg_depth: 1140,
    coverage_score: 62,
    cannibalization_risk: [],
    facilities: ['bs-athens-1', 'royal-mini', 'sunset-austin'],
    by_facility: [
      { facility: 'bs-athens-1',  pieces: 2, depth: 1080, rank: 8.4 },
      { facility: 'royal-mini',   pieces: 2, depth: 980,  rank: 11.2 },
      { facility: 'sunset-austin', pieces: 1, depth: 880,  rank: 12.4 },
    ],
    gaps: ['Long-distance move variant missing', 'College move-in seasonal piece'],
  },
  {
    id: 'tc-004', name: '24/7 access and security',
    intent: 'commercial', priority: 'medium',
    target_kw: '24 hour storage near me', search_volume: 5200,
    pieces: 4, target_pieces: 8,
    avg_depth: 920, competitor_avg_depth: 1280,
    coverage_score: 48,
    cannibalization_risk: [],
    facilities: ['bs-athens-1', 'star-athens', 'sunset-austin'],
    by_facility: [
      { facility: 'bs-athens-1',  pieces: 1, depth: 1020, rank: 6.2 },
      { facility: 'star-athens',  pieces: 2, depth: 960,  rank: 4.8 },
      { facility: 'sunset-austin', pieces: 1, depth: 880,  rank: 9.2 },
    ],
    gaps: ['Security tech deep-dive missing', 'After-hours emergency contact variant', 'Insurance comparison missing'],
  },
  {
    id: 'tc-005', name: 'Self-storage pricing',
    intent: 'commercial', priority: 'low',
    target_kw: 'self storage prices', search_volume: 6800,
    pieces: 6, target_pieces: 6,
    avg_depth: 1180, competitor_avg_depth: 1080,
    coverage_score: 88,
    cannibalization_risk: [],
    facilities: ['bs-athens-1', 'bs-atlanta', 'star-athens', 'royal-mini', 'sunset-austin', 'sunset-roundrock'],
    by_facility: [
      { facility: 'bs-athens-1',  pieces: 1, depth: 1240, rank: 4.1 },
      { facility: 'bs-atlanta',   pieces: 1, depth: 1180, rank: 5.2 },
      { facility: 'star-athens',  pieces: 1, depth: 1120, rank: 3.8 },
      { facility: 'royal-mini',   pieces: 1, depth: 1080, rank: 6.4 },
      { facility: 'sunset-austin', pieces: 1, depth: 1240, rank: 4.7 },
      { facility: 'sunset-roundrock', pieces: 1, depth: 1180, rank: 5.1 },
    ],
    gaps: [],
  },
];

// =====================================================================
// 5. CLIENT DELIVERY RECEIPTS
// =====================================================================
window.DELIVERY_RECEIPTS = {
  acme: {
    month: 'May 2026',
    period: '2026-05-01 to 2026-05-31',
    summary: {
      gbp_posts: 56, posts_target: 60,
      reviews_responded: 42, reviews_target: 24,
      schemas_deployed: 4, schemas_target: 3,
      citations_built: 24, citations_target: 30,
      content_pieces: 11, content_target: 12,
      audits_run: 15, audits_target: 15,
      backlinks_earned: 9, backlinks_target: 6,
      hours_logged: 92, hours_budget: 95,
    },
    timeline: [
      { date: '2026-05-15', icon: 'shield-check', who: 'Khizer', action: 'Deployed SelfStorage + FAQPage schema',     facility: 'bs-atlanta',  outcome: 'Validated via Rich Results Test' },
      { date: '2026-05-14', icon: 'megaphone',     who: 'AI',      action: 'Published GBP post: Memorial Day weekend hours', facility: 'bs-athens-1', outcome: '84 views, 11 clicks in first 12h' },
      { date: '2026-05-13', icon: 'star',          who: 'Khizer', action: 'Responded to 1-star review with retention reply', facility: 'royal-mini',  outcome: 'Customer replied apologetically, no escalation' },
      { date: '2026-05-12', icon: 'link',          who: 'Aimen',  action: 'Earned backlink from athenslocalnews.com (DR 71)', facility: 'bs-athens-1', outcome: 'Brand anchor on local news feature' },
      { date: '2026-05-11', icon: 'file-text',     who: 'Aimen',  action: 'Published blog: Athens storage move-in checklist', facility: 'bs-athens-1', outcome: '412 views, 7 conversions in 4 days' },
      { date: '2026-05-10', icon: 'sparkles',      who: 'AI',      action: 'Cluster gap analysis: 4 land-grab keywords identified', facility: 'bs-athens-1', outcome: 'Briefs queued for next sprint' },
      { date: '2026-05-09', icon: 'shield-check',  who: 'Khizer', action: 'Fixed NAP drift on YellowPages.com',                facility: 'bs-athens-1', outcome: 'Phone number corrected via BrightLocal API' },
      { date: '2026-05-08', icon: 'image',         who: 'AI',      action: 'Generated and uploaded 6 GBP photos',               facility: 'star-athens', outcome: 'Photo cadence streak: 4 weeks consistent' },
      { date: '2026-05-07', icon: 'shield-check',  who: 'Khizer', action: 'Run weekly audit, 3 critical issues auto-fixed',    facility: 'bs-conyers',  outcome: 'Audit score 73 → 78' },
      { date: '2026-05-05', icon: 'send',           who: 'Taha',   action: 'Submitted 6 new citations via Whitespark',           facility: 'bs-loganville', outcome: '4 published within 48h' },
    ],
    rank_movements: [
      { facility: 'bs-atlanta',     keyword: 'atlanta self storage',     from: 5.7, to: 3.4, delta: -2.3 },
      { facility: 'bs-athens-1',   keyword: 'athens storage',           from: 2.7, to: 2.1, delta: -0.6 },
      { facility: 'bs-conyers',    keyword: 'conyers storage',          from: 4.3, to: 3.9, delta: -0.4 },
      { facility: 'royal-mini',     keyword: 'athens storage units',     from: 4.2, to: 16.4, delta: 12.2 },
      { facility: 'star-athens',    keyword: 'athens self storage',     from: 5.3, to: 5.2, delta: -0.1 },
    ],
    business_outcomes: {
      gbp_calls_total: 1247,
      gbp_calls_mom: 0.18,
      directions_total: 3211,
      website_clicks: 2188,
      rentals_attributed: 12,
      revenue_attributed: 50400,
    },
  },
};

// =====================================================================
// 6. SERVICE AREA EXPANSION MODELER
// =====================================================================
window.SERVICE_AREAS = {
  facility: 'bs-athens-1',
  current_areas: ['Athens', 'Bogart', 'Watkinsville'],
  current_radius_mi: 8,
  current_coverage_pop: 142000,
  current_avg_rank: 2.1,
  expansion_candidates: [
    {
      area: 'Winterville', distance_mi: 6.2, pop: 12400,
      market_demand_score: 68,
      competitor_density: 'low',
      cannibalization_risk: 'minimal',
      expected_rank_dilution: 0.1,
      expected_call_volume_lift: 0.08,
      recommendation: 'expand', confidence: 0.82,
      reasoning: 'Low competitor density, 12.4k population, minimal overlap with existing service areas. Estimated +8% call volume with negligible rank impact.',
    },
    {
      area: 'Bishop',      distance_mi: 11.4, pop: 1900,
      market_demand_score: 24,
      competitor_density: 'low',
      cannibalization_risk: 'none',
      expected_rank_dilution: 0.05,
      expected_call_volume_lift: 0.01,
      recommendation: 'skip',  confidence: 0.91,
      reasoning: 'Population too low (1.9k) to justify even modest dilution. No competitors but no demand either.',
    },
    {
      area: 'Hull',        distance_mi: 7.1, pop: 1100,
      market_demand_score: 18,
      competitor_density: 'none',
      cannibalization_risk: 'none',
      expected_rank_dilution: 0.03,
      expected_call_volume_lift: 0.006,
      recommendation: 'skip', confidence: 0.94,
      reasoning: 'Too small. Not worth the GBP edit risk.',
    },
    {
      area: 'Statham',     distance_mi: 9.8, pop: 2900,
      market_demand_score: 38,
      competitor_density: 'medium',
      cannibalization_risk: 'low',
      expected_rank_dilution: 0.4,
      expected_call_volume_lift: 0.04,
      recommendation: 'caution', confidence: 0.71,
      reasoning: 'Medium competition (2 self-storage operators present). Possible +4% call lift but 0.4 rank dilution probable.',
    },
    {
      area: 'Crawford',    distance_mi: 13.8, pop: 800,
      market_demand_score: 12,
      competitor_density: 'none',
      cannibalization_risk: 'none',
      expected_rank_dilution: 0.02,
      expected_call_volume_lift: 0.003,
      recommendation: 'skip', confidence: 0.95,
      reasoning: 'Too distant and too small.',
    },
  ],
};

// =====================================================================
// 7. CALL ANALYTICS (CallRail-grade)
// =====================================================================
window.CALL_ANALYTICS = {
  total_calls_mtd: 1247,
  answered_calls: 814,
  missed_calls: 287,
  after_hours: 146,
  answer_rate: 0.65,
  avg_call_duration: 142,
  tour_conversion_rate: 0.18,
  rental_conversion_rate: 0.063,
  by_facility: [
    { facility: 'bs-athens-1',  calls: 218, answered: 162, conv: 14, avg_dur: 168, tag: 'high-intent' },
    { facility: 'bs-atlanta',   calls: 312, answered: 224, conv: 19, avg_dur: 152, tag: 'high-intent' },
    { facility: 'star-athens',  calls: 176, answered: 113, conv: 8,  avg_dur: 142, tag: 'normal' },
    { facility: 'royal-mini',   calls: 42,  answered: 28,  conv: 1,  avg_dur: 98,  tag: 'concerning' },
    { facility: 'sunset-austin', calls: 128, answered: 89, conv: 7, avg_dur: 178, tag: 'high-intent' },
  ],
  recent_calls: [
    { id: 'c-001', facility: 'bs-athens-1', time: '12:34', duration: 247, status: 'answered', outcome: 'tour-booked',    keyword: 'climate storage athens', caller: '(706) 555-0144', sentiment: 'positive' },
    { id: 'c-002', facility: 'bs-atlanta',  time: '11:48', duration: 184, status: 'answered', outcome: 'tour-booked',    keyword: 'atlanta self storage',   caller: '(404) 555-2284', sentiment: 'positive' },
    { id: 'c-003', facility: 'royal-mini',  time: '10:22', duration: 28,  status: 'answered', outcome: 'wrong-number',   keyword: '(direct)',                caller: '(404) 555-9982', sentiment: 'neutral' },
    { id: 'c-004', facility: 'bs-athens-1', time: '09:54', duration: 162, status: 'answered', outcome: 'rental-signed',  keyword: 'cheap storage athens',   caller: '(706) 555-1487', sentiment: 'positive' },
    { id: 'c-005', facility: 'bs-atlanta',  time: '08:33', duration: 0,   status: 'missed',   outcome: 'voicemail-left', keyword: 'storage near me',         caller: '(770) 555-7128', sentiment: '?' },
    { id: 'c-006', facility: 'star-athens', time: '08:11', duration: 92,  status: 'answered', outcome: 'pricing-inquiry', keyword: '(direct)',               caller: '(706) 555-3344', sentiment: 'neutral' },
    { id: 'c-007', facility: 'sunset-austin', time: '07:58', duration: 0, status: 'missed',   outcome: 'after-hours',     keyword: 'rv storage austin',      caller: '(512) 555-1288', sentiment: '?' },
    { id: 'c-008', facility: 'bs-athens-1', time: '07:22', duration: 198, status: 'answered', outcome: 'rental-signed',  keyword: '24 hour storage athens', caller: '(706) 555-8821', sentiment: 'positive' },
  ],
  missed_call_patterns: [
    { pattern: 'After hours (6pm to 8am)', count: 146, recoverable: 0.32, opportunity: '$31,000/mo' },
    { pattern: 'Lunch hour (12pm to 1pm)', count: 41,  recoverable: 0.78, opportunity: '$22,400/mo' },
    { pattern: 'Saturday afternoon', count: 38, recoverable: 0.62, opportunity: '$16,800/mo' },
  ],
};

// =====================================================================
// 8. ALGORITHM UPDATE TRACKER
// =====================================================================
window.ALGORITHM_UPDATES = [
  {
    id: 'up-001', name: 'March 2026 Core Update', date: '2026-03-05', type: 'core',
    confirmed: true, severity: 'high',
    description: 'Broad core update. Local pack volatility above baseline. Helpful Content signal weighting increased.',
    portfolio_impact: { gained: 4, unchanged: 7, lost: 4 },
    recovery_status: 'complete',
    your_playbook: 'Audit content depth on losers, add experience signals, refresh underperformers within 14 days.',
    affected: [
      { facility: 'bs-athens-2', delta: -3.4, status: 'recovered', recovered_in_days: 18 },
      { facility: 'royal-mini',  delta: -2.1, status: 'recovered', recovered_in_days: 21 },
      { facility: 'bs-bogart',   delta: -1.8, status: 'recovered', recovered_in_days: 14 },
      { facility: 'sunset-cedar', delta: -1.2, status: 'partial',  recovered_in_days: null },
      { facility: 'bs-atlanta',  delta: 2.4, status: 'gained',   recovered_in_days: null },
    ],
  },
  {
    id: 'up-002', name: 'February 2026 SERP Feature Refresh', date: '2026-02-14', type: 'feature',
    confirmed: true, severity: 'medium',
    description: 'Local pack expanded to show review snippets and 24h indicator. Photo carousel deprioritized.',
    portfolio_impact: { gained: 6, unchanged: 8, lost: 1 },
    recovery_status: 'complete',
    your_playbook: 'Push 24/7 access attribute, accelerate review velocity to qualify for snippet feature.',
    affected: [
      { facility: 'bs-athens-1',  delta: 1.8, status: 'gained',   recovered_in_days: null },
      { facility: 'star-athens',  delta: 2.2, status: 'gained',   recovered_in_days: null },
      { facility: 'sunset-austin', delta: 1.4, status: 'gained',  recovered_in_days: null },
      { facility: 'royal-loganville', delta: -0.8, status: 'recovered', recovered_in_days: 6 },
    ],
  },
  {
    id: 'up-003', name: 'December 2025 E-E-A-T Expansion', date: '2025-12-12', type: 'guidance',
    confirmed: true, severity: 'medium',
    description: 'E-E-A-T expanded to all competitive queries (not just YMYL). First-hand experience signal heavily weighted.',
    portfolio_impact: { gained: 3, unchanged: 11, lost: 1 },
    recovery_status: 'complete',
    your_playbook: 'Add author bios, first-hand experience markers, customer testimonials inline.',
    affected: [],
  },
];

window.ALGORITHM_RUMORS = [
  { date: '2026-05-10', signal: 'Local pack volatility', detail: 'Mozcast and Semrush sensor at 4.2 / 10', source: 'industry' },
  { date: '2026-05-08', signal: 'Possible update in progress', detail: 'Sudden ranking shifts across multiple verticals', source: 'industry' },
];

// =====================================================================
// 9. REPUTATION CRISIS MODE
// =====================================================================
window.REPUTATION_CRISES = [
  {
    id: 'rc-001', facility: 'royal-mini', triggered: '2026-05-14 11:42 PKT',
    severity: 'critical',
    trigger: '4 one-star reviews in 36 hours (baseline 0.2 per week)',
    pattern: 'gate-malfunction',
    estimated_revenue_at_risk: 18400,
    status: 'in_progress', step: 4, total_steps: 8,
    affected_reviews: [
      { author: 'Bryan T.',    stars: 1, date: '2026-05-13 18:05', issue: 'gate broken 3 days', responded: true },
      { author: 'Renee P.',    stars: 1, date: '2026-05-14 09:14', issue: 'office never staffed', responded: true },
      { author: 'Tom L.',      stars: 1, date: '2026-05-14 11:42', issue: 'gate still broken, dirty unit', responded: false },
      { author: 'Sara D.',     stars: 1, date: '2026-05-14 14:20', issue: 'cannot reach manager',  responded: false },
    ],
    steps: [
      { n: 1, label: 'Auto-pause review request automation',           status: 'done', by: 'auto', at: '2026-05-14 11:43 PKT' },
      { n: 2, label: 'Owner notification + priority alert',              status: 'done', by: 'auto', at: '2026-05-14 11:43 PKT' },
      { n: 3, label: 'AI-draft empathetic responses (all 4)',            status: 'done', by: 'auto', at: '2026-05-14 11:48 PKT' },
      { n: 4, label: 'Identify and reach out to affected tenants',       status: 'in_progress', by: 'Lakshmi', detail: '2 of 4 contacted, 2 declined to engage' },
      { n: 5, label: 'Review removal eligibility check (Google grounds)', status: 'pending' },
      { n: 6, label: 'Client communication: crisis summary to Lakshmi',   status: 'pending' },
      { n: 7, label: 'Root cause fix: gate repair completion',           status: 'pending' },
      { n: 8, label: 'Post-mortem and prevention SOP update',            status: 'pending' },
    ],
    related_signals: [
      { signal: 'Subreddit mention',    detail: "r/Athens thread 'Don't use Royal Mini Storage' posted May 13", source: 'social monitor' },
      { signal: 'BBB complaint',         detail: 'Complaint filed May 14 by Renee P.', source: 'BBB feed' },
      { signal: 'Yelp 1-star',           detail: 'Yelp review posted May 13 by Bryan T.', source: 'Yelp API' },
    ],
  },
];

// =====================================================================
// 10. MULTI-PLATFORM REVIEWS (Yelp, Facebook, BBB, SpareFoot)
// =====================================================================
window.MULTI_PLATFORM_REVIEWS = [
  { id: 'mr-001', facility: 'bs-athens-1', platform: 'yelp',      stars: 4, author: 'Janet K.', date: '2026-05-13', body: 'Decent enough, climate works as advertised.', status: 'pending', priority: false },
  { id: 'mr-002', facility: 'bs-athens-1', platform: 'facebook',  stars: 5, author: 'Marcus H.', date: '2026-05-12', body: 'Easy reservation through Facebook, friendly staff at move-in.', status: 'pending', priority: false },
  { id: 'mr-003', facility: 'royal-mini',  platform: 'yelp',      stars: 1, author: 'Bryan T.', date: '2026-05-13', body: 'Gate has been broken for 3 days. Not acceptable.', status: 'pending', priority: true },
  { id: 'mr-004', facility: 'royal-mini',  platform: 'bbb',       stars: 1, author: 'Renee P.', date: '2026-05-14', body: 'Filed BBB complaint after no response to repeated calls.', status: 'pending', priority: true, complaint: true },
  { id: 'mr-005', facility: 'sunset-austin', platform: 'sparefoot', stars: 5, author: 'Pete L.', date: '2026-05-12', body: 'Best RV storage in Austin. Wide bays, secure, easy access.', status: 'replied' },
  { id: 'mr-006', facility: 'sunset-roundrock', platform: 'sparefoot', stars: 4, author: 'Cole T.', date: '2026-05-09', body: 'Covered boat spot worked great. Small hiccup with access code first day.', status: 'replied' },
  { id: 'mr-007', facility: 'bs-atlanta',  platform: 'yelp',      stars: 5, author: 'Tasha W.', date: '2026-05-12', body: 'Elevator was out briefly, but resolved quickly. Professional team.', status: 'pending' },
  { id: 'mr-008', facility: 'star-athens', platform: 'facebook',  stars: 5, author: 'Quentin B.', date: '2026-05-10', body: 'Booked in 4 minutes online. Best storage value in Athens.', status: 'replied' },
];

window.PLATFORM_SCORES = {
  google:    { reviews: 487, rating: 4.65, trend: 0.04, status: 'healthy' },
  yelp:      { reviews: 142, rating: 4.21, trend: -0.08, status: 'attention' },
  facebook:  { reviews: 88,  rating: 4.71, trend: 0.02, status: 'healthy' },
  bbb:       { reviews: 14,  rating: 4.00, trend: -0.18, status: 'attention', complaints: 2 },
  sparefoot: { reviews: 312, rating: 4.52, trend: 0.06, status: 'healthy' },
};

// Update existing GBP_HEALTH if needed
// (no changes needed)
