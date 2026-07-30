// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Seed data v3: Audit Suite, Keywords, Studio, Deep Competitors
//    ============================================================ */
//
// // =====================================================================
// // LOCAL SEO AUDIT SUITE - 8 categories, 142 checks
// // =====================================================================
// window.AUDIT_SUITE = {
//   facility: 'bs-athens-1',
//   ran_at: '2026-05-15 13:11 PKT',
//   duration_sec: 84,
//   overall_score: 78,
//   prior_score: 71,
//   benchmark_score: 82,
//   categories: [
//     {
//       id: 'gbp', name: 'Google Business Profile', score: 84, prior: 76, weight: 25,
//       checks: [
//         { id: 'gbp-1', label: 'Primary category set', status: 'pass', detail: 'Self-Storage Facility' },
//         { id: 'gbp-2', label: 'Secondary categories (3-9)', status: 'pass', detail: '4 of 9 used', recommendation: 'Add 2-3 more from competitor analysis' },
//         { id: 'gbp-3', label: 'NAP consistency with website', status: 'pass', detail: 'Match' },
//         { id: 'gbp-4', label: 'Hours filled including holidays', status: 'warn', detail: '7 holidays unfilled in 2026' },
//         { id: 'gbp-5', label: 'Photo count above 25', status: 'pass', detail: '42 photos' },
//         { id: 'gbp-6', label: 'Photo cadence weekly', status: 'warn', detail: 'Last photo 12 days ago', recommendation: 'Upload 1 photo this week to maintain cadence' },
//         { id: 'gbp-7', label: 'Q&A populated (5+ answered)', status: 'fail', detail: '0 Q&A answered', recommendation: 'Seed 5 Q&A from common SMS inquiries' },
//         { id: 'gbp-8', label: 'Description length 600-750 chars', status: 'pass', detail: '682 chars' },
//         { id: 'gbp-9', label: 'Description keyword density 1-2%', status: 'pass', detail: '1.4%' },
//         { id: 'gbp-10', label: 'Attributes set (24/7, wheelchair, etc)', status: 'pass', detail: '7 attributes' },
//         { id: 'gbp-11', label: 'Posts published weekly', status: 'pass', detail: '4 posts in last 7d' },
//         { id: 'gbp-12', label: 'Service list populated', status: 'warn', detail: '3 services, competitors have 8-12' },
//         { id: 'gbp-13', label: 'Product list populated', status: 'fail', detail: 'Empty' },
//         { id: 'gbp-14', label: 'Messaging enabled', status: 'pass' },
//         { id: 'gbp-15', label: 'Booking link active', status: 'pass' },
//         { id: 'gbp-16', label: 'Verified status', status: 'pass' },
//         { id: 'gbp-17', label: 'No suspension history (12 mo)', status: 'pass' },
//         { id: 'gbp-18', label: 'Edit cooling window safe', status: 'pass', detail: '17 days since last edit' },
//       ],
//     },
//     {
//       id: 'reviews', name: 'Reviews & reputation', score: 82, prior: 74, weight: 18,
//       checks: [
//         { id: 'rev-1', label: 'Avg rating above 4.5 stars', status: 'pass', detail: '4.7' },
//         { id: 'rev-2', label: 'Review velocity 3+/week', status: 'pass', detail: '4 per week' },
//         { id: 'rev-3', label: 'Response rate above 95%', status: 'pass', detail: '98%' },
//         { id: 'rev-4', label: 'Avg response time under 24h', status: 'pass', detail: '8h avg' },
//         { id: 'rev-5', label: '1-star reviews responded within 6h', status: 'warn', detail: 'Last 1-star at 9h' },
//         { id: 'rev-6', label: 'Multi-platform presence', status: 'pass', detail: 'Google, Yelp, Facebook, SpareFoot' },
//         { id: 'rev-7', label: 'BBB accredited', status: 'pass' },
//         { id: 'rev-8', label: 'Review sentiment positive trend', status: 'pass', detail: '+4% MoM' },
//         { id: 'rev-9', label: 'Keyword-rich responses', status: 'pass' },
//         { id: 'rev-10', label: 'No review velocity drops 50%+', status: 'pass' },
//         { id: 'rev-11', label: 'SMS/email cadence active', status: 'pass' },
//         { id: 'rev-12', label: 'QR code printout in office', status: 'warn', detail: 'Not deployed yet' },
//       ],
//     },
//     {
//       id: 'onpage', name: 'On-page SEO', score: 71, prior: 65, weight: 18,
//       checks: [
//         { id: 'on-1', label: 'Title tag present + 50-60 chars', status: 'pass', detail: '54 chars' },
//         { id: 'on-2', label: 'Meta description 140-160 chars', status: 'pass', detail: '152 chars' },
//         { id: 'on-3', label: 'H1 present and unique', status: 'pass' },
//         { id: 'on-4', label: 'H2 structure logical', status: 'pass' },
//         { id: 'on-5', label: 'Word count above 1000', status: 'pass', detail: '1180 words' },
//         { id: 'on-6', label: 'Word count above competitor avg', status: 'fail', detail: '1180 vs 1420 competitor avg', recommendation: 'Expand by 240 words minimum' },
//         { id: 'on-7', label: 'Internal links 5+', status: 'warn', detail: '3 links' },
//         { id: 'on-8', label: 'External links to authority', status: 'pass' },
//         { id: 'on-9', label: 'Images optimized (webp + alt)', status: 'warn', detail: '14 of 22 missing alt' },
//         { id: 'on-10', label: 'NAP block in footer', status: 'pass' },
//         { id: 'on-11', label: 'Phone click-to-call', status: 'pass' },
//         { id: 'on-12', label: 'Local business address embedded', status: 'pass' },
//         { id: 'on-13', label: 'OG and Twitter cards', status: 'fail', detail: 'No og:image set' },
//         { id: 'on-14', label: 'Canonical URL set', status: 'pass' },
//       ],
//     },
//     {
//       id: 'schema', name: 'Schema markup', score: 60, prior: 45, weight: 10,
//       checks: [
//         { id: 'sc-1', label: 'LocalBusiness schema present', status: 'pass' },
//         { id: 'sc-2', label: 'SelfStorage type used', status: 'fail', detail: 'Using generic LocalBusiness', recommendation: 'Upgrade to SelfStorage type' },
//         { id: 'sc-3', label: 'FAQPage schema present', status: 'fail' },
//         { id: 'sc-4', label: 'BreadcrumbList schema present', status: 'pass' },
//         { id: 'sc-5', label: 'aggregateRating included', status: 'pass' },
//         { id: 'sc-6', label: 'makesOffer with prices', status: 'fail' },
//         { id: 'sc-7', label: 'amenityFeature listed', status: 'fail' },
//         { id: 'sc-8', label: 'openingHoursSpecification', status: 'pass' },
//         { id: 'sc-9', label: 'priceRange', status: 'pass' },
//         { id: 'sc-10', label: 'No validation errors', status: 'pass' },
//       ],
//     },
//     {
//       id: 'tech', name: 'Technical SEO', score: 84, prior: 81, weight: 12,
//       checks: [
//         { id: 'tch-1', label: 'LCP under 2.5s', status: 'pass', detail: '2.4s' },
//         { id: 'tch-2', label: 'INP under 200ms', status: 'pass', detail: '124ms' },
//         { id: 'tch-3', label: 'CLS under 0.1', status: 'pass', detail: '0.08' },
//         { id: 'tch-4', label: 'Mobile responsive', status: 'pass' },
//         { id: 'tch-5', label: 'HTTPS enabled', status: 'pass' },
//         { id: 'tch-6', label: 'No mixed content', status: 'pass' },
//         { id: 'tch-7', label: 'Sitemap.xml present + submitted', status: 'pass' },
//         { id: 'tch-8', label: 'Robots.txt valid', status: 'pass' },
//         { id: 'tch-9', label: 'Tap targets above 48x48px', status: 'warn', detail: 'Footer buttons too close' },
//         { id: 'tch-10', label: 'No broken links', status: 'pass' },
//         { id: 'tch-11', label: 'Indexed in Google', status: 'pass' },
//       ],
//     },
//     {
//       id: 'citations', name: 'Citations & NAP', score: 84, prior: 71, weight: 10,
//       checks: [
//         { id: 'ci-1', label: 'Active in 8 T1 directories', status: 'pass', detail: '8 of 8' },
//         { id: 'ci-2', label: 'Active in 15 T2 directories', status: 'pass', detail: '13 of 15' },
//         { id: 'ci-3', label: 'Submitted to 30 T3 directories', status: 'warn', detail: '24 of 30' },
//         { id: 'ci-4', label: 'NAP drift score above 90', status: 'warn', detail: '84 (2 drifts active)' },
//         { id: 'ci-5', label: 'Industry-specific listings (SpareFoot, etc)', status: 'pass' },
//         { id: 'ci-6', label: 'Local chamber of commerce', status: 'pass' },
//         { id: 'ci-7', label: 'BBB profile claimed', status: 'pass' },
//         { id: 'ci-8', label: 'Data Axle (free) claimed', status: 'pass' },
//         { id: 'ci-9', label: 'No duplicate listings', status: 'pass' },
//         { id: 'ci-10', label: 'Whitespark rebuild scheduled', status: 'pass' },
//       ],
//     },
//     {
//       id: 'backlinks', name: 'Backlinks & authority', score: 70, prior: 64, weight: 10,
//       checks: [
//         { id: 'bl-1', label: 'Referring domains above 25', status: 'pass', detail: '34 RDs' },
//         { id: 'bl-2', label: 'Average DR above 40', status: 'pass', detail: '46 avg' },
//         { id: 'bl-3', label: 'Local link relevance high', status: 'warn', detail: '38% local-relevant' },
//         { id: 'bl-4', label: 'Anchor diversity balanced', status: 'pass' },
//         { id: 'bl-5', label: 'No toxic anchor over 5%', status: 'pass' },
//         { id: 'bl-6', label: 'No links from spammy domains', status: 'warn', detail: '1 toxic detected' },
//         { id: 'bl-7', label: 'Chamber/local sponsorships', status: 'pass' },
//         { id: 'bl-8', label: 'PR/Featured placements', status: 'pass' },
//         { id: 'bl-9', label: '.edu or .gov citation', status: 'fail' },
//         { id: 'bl-10', label: 'New RDs trending up', status: 'pass', detail: '+22 in 30d' },
//       ],
//     },
//     {
//       id: 'pack', name: 'Local pack visibility', score: 78, prior: 71, weight: 7,
//       checks: [
//         { id: 'pk-1', label: 'In 3-pack for primary keyword', status: 'pass', detail: 'Rank 2.1 for athens storage' },
//         { id: 'pk-2', label: 'In 3-pack for 5+ keywords', status: 'pass', detail: '7 keywords' },
//         { id: 'pk-3', label: 'Geo-grid coverage above 60%', status: 'pass', detail: '78%' },
//         { id: 'pk-4', label: 'No competitor displacement week-over-week', status: 'pass' },
//         { id: 'pk-5', label: 'Center rank under 5', status: 'pass', detail: '2.1' },
//         { id: 'pk-6', label: 'Geo-grid edge rank under 10', status: 'warn', detail: '14.2 NE corner' },
//       ],
//     },
//   ],
// };
//
// window.AUDIT_HISTORY = [
//   { date: '2026-05-15', score: 78, ran_by: 'auto' },
//   { date: '2026-05-08', score: 76, ran_by: 'Khizer' },
//   { date: '2026-05-01', score: 74, ran_by: 'auto' },
//   { date: '2026-04-24', score: 73, ran_by: 'Khizer' },
//   { date: '2026-04-17', score: 71, ran_by: 'auto' },
//   { date: '2026-04-10', score: 68, ran_by: 'Khizer' },
//   { date: '2026-04-03', score: 65, ran_by: 'auto' },
//   { date: '2026-03-27', score: 62, ran_by: 'Khizer' },
// ];
//
// // =====================================================================
// // KEYWORD RESEARCH AND UNIVERSE
// // =====================================================================
// window.KEYWORDS = [
//   // PRIORITY 1 - converting
//   { id: 'kw-001', term: 'athens storage', facility: 'bs-athens-1', vol: 4400, diff: 38, intent: 'transactional', position: 2.1, prev_pos: 2.7, in_3pack: true, serp_features: ['local_pack', 'reviews', 'image_pack'], cpc: 4.20, cluster: 'core-athens', priority: 'critical', tracked_for: 90, trend: 'up' },
//   { id: 'kw-002', term: 'self storage athens', facility: 'bs-athens-1', vol: 2900, diff: 36, intent: 'transactional', position: 2.4, prev_pos: 3.1, in_3pack: true, serp_features: ['local_pack', 'reviews'], cpc: 4.40, cluster: 'core-athens', priority: 'critical', tracked_for: 90, trend: 'up' },
//   { id: 'kw-003', term: 'storage units athens ga', facility: 'bs-athens-1', vol: 1900, diff: 34, intent: 'transactional', position: 3.2, prev_pos: 4.1, in_3pack: true, serp_features: ['local_pack', 'reviews', 'paa'], cpc: 3.90, cluster: 'core-athens', priority: 'critical', tracked_for: 90, trend: 'up' },
//   { id: 'kw-004', term: 'storage near me athens', facility: 'bs-athens-1', vol: 1300, diff: 32, intent: 'transactional', position: 3.6, prev_pos: 4.8, in_3pack: true, serp_features: ['local_pack'], cpc: 3.60, cluster: 'core-athens', priority: 'critical', tracked_for: 90, trend: 'up' },
//   { id: 'kw-005', term: 'climate controlled storage athens', facility: 'bs-athens-1', vol: 720, diff: 32, intent: 'transactional', position: 3.8, prev_pos: 4.4, in_3pack: true, serp_features: ['local_pack', 'reviews'], cpc: 5.10, cluster: 'climate', priority: 'critical', tracked_for: 90, trend: 'up' },
//
//   // PRIORITY 2 - growing
//   { id: 'kw-006', term: '24 hour storage athens', facility: 'bs-athens-1', vol: 490, diff: 28, intent: 'transactional', position: 4.2, prev_pos: 5.1, in_3pack: true, serp_features: ['local_pack'], cpc: 3.80, cluster: '24hour', priority: 'high', tracked_for: 60, trend: 'up' },
//   { id: 'kw-007', term: 'cheap storage athens', facility: 'bs-athens-1', vol: 880, diff: 34, intent: 'commercial', position: 5.4, prev_pos: 5.8, in_3pack: false, serp_features: ['local_pack', 'paa'], cpc: 3.20, cluster: 'pricing', priority: 'high', tracked_for: 60, trend: 'flat' },
//   { id: 'kw-008', term: 'storage facility athens', facility: 'bs-athens-1', vol: 590, diff: 32, intent: 'transactional', position: 4.8, prev_pos: 5.2, in_3pack: false, serp_features: ['local_pack'], cpc: 4.10, cluster: 'core-athens', priority: 'high', tracked_for: 60, trend: 'up' },
//
//   // PRIORITY 3 - opportunity
//   { id: 'kw-009', term: 'rv storage athens', facility: 'bs-athens-1', vol: 220, diff: 21, intent: 'transactional', position: 8.4, prev_pos: 9.2, in_3pack: false, serp_features: ['local_pack', 'image_pack'], cpc: 4.80, cluster: 'rv-boat', priority: 'medium', tracked_for: 30, trend: 'up' },
//   { id: 'kw-010', term: 'covered boat parking athens', facility: 'bs-athens-1', vol: 180, diff: 18, intent: 'transactional', position: 11.2, prev_pos: 12.6, in_3pack: false, serp_features: ['local_pack'], cpc: 5.20, cluster: 'rv-boat', priority: 'medium', tracked_for: 30, trend: 'up' },
//   { id: 'kw-011', term: 'storage athens college', facility: 'bs-athens-1', vol: 140, diff: 14, intent: 'transactional', position: 6.8, prev_pos: 7.4, in_3pack: false, serp_features: ['local_pack'], cpc: 3.40, cluster: 'college', priority: 'medium', tracked_for: 30, trend: 'up' },
//
//   // LAND-GRAB - not yet ranked
//   { id: 'kw-012', term: 'storage athens university of georgia', facility: 'bs-athens-1', vol: 110, diff: 12, intent: 'transactional', position: null, prev_pos: null, in_3pack: false, serp_features: ['local_pack'], cpc: 3.20, cluster: 'college', priority: 'land-grab', tracked_for: 14, trend: 'new' },
//   { id: 'kw-013', term: 'short term storage athens', facility: 'bs-athens-1', vol: 90, diff: 16, intent: 'transactional', position: null, prev_pos: null, in_3pack: false, serp_features: ['local_pack'], cpc: 2.90, cluster: 'duration', priority: 'land-grab', tracked_for: 14, trend: 'new' },
//   { id: 'kw-014', term: 'moving and storage athens', facility: 'bs-athens-1', vol: 320, diff: 28, intent: 'transactional', position: null, prev_pos: null, in_3pack: false, serp_features: ['local_pack', 'paa'], cpc: 4.40, cluster: 'moving', priority: 'land-grab', tracked_for: 14, trend: 'new' },
//
//   // RANK-AT-RISK
//   { id: 'kw-015', term: 'best storage athens', facility: 'bs-athens-1', vol: 340, diff: 30, intent: 'commercial', position: 4.4, prev_pos: 3.2, in_3pack: true, serp_features: ['local_pack', 'reviews'], cpc: 4.00, cluster: 'core-athens', priority: 'defend', tracked_for: 90, trend: 'down' },
//   { id: 'kw-016', term: 'secure storage athens ga', facility: 'bs-athens-1', vol: 110, diff: 22, intent: 'commercial', position: 7.2, prev_pos: 5.4, in_3pack: false, serp_features: ['local_pack'], cpc: 4.30, cluster: 'security', priority: 'defend', tracked_for: 30, trend: 'down' },
// ];
//
// window.KEYWORD_CLUSTERS_LIST = [
//   { id: 'core-athens', name: 'Core Athens transactional', count: 6, avg_pos: 3.6, trend: 'up' },
//   { id: 'climate', name: 'Climate-controlled', count: 3, avg_pos: 4.2, trend: 'up' },
//   { id: '24hour', name: '24-hour access', count: 2, avg_pos: 5.1, trend: 'up' },
//   { id: 'rv-boat', name: 'RV and boat', count: 4, avg_pos: 8.8, trend: 'up' },
//   { id: 'pricing', name: 'Pricing intent', count: 2, avg_pos: 6.1, trend: 'flat' },
//   { id: 'college', name: 'College / student', count: 3, avg_pos: 7.2, trend: 'up' },
//   { id: 'security', name: 'Security focused', count: 1, avg_pos: 7.2, trend: 'down' },
//   { id: 'moving', name: 'Moving + storage', count: 1, avg_pos: null, trend: 'new' },
//   { id: 'duration', name: 'Short / long term', count: 1, avg_pos: null, trend: 'new' },
// ];
//
// window.KEYWORD_KPI = {
//   total_tracked: window.KEYWORDS.length,
//   in_top_3: window.KEYWORDS.filter(k => k.position && k.position <= 3).length,
//   in_top_10: window.KEYWORDS.filter(k => k.position && k.position <= 10).length,
//   in_3pack: window.KEYWORDS.filter(k => k.in_3pack).length,
//   trending_up: window.KEYWORDS.filter(k => k.trend === 'up').length,
//   trending_down: window.KEYWORDS.filter(k => k.trend === 'down').length,
//   land_grab: window.KEYWORDS.filter(k => k.priority === 'land-grab').length,
//   total_volume: window.KEYWORDS.reduce((s, k) => s + k.vol, 0),
//   estimated_traffic: 1840,
// };
//
// // =====================================================================
// // CONTENT STUDIO - briefs, agents, generations, voice profiles
// // =====================================================================
// window.STUDIO_AGENTS = [
//   {
//     id: 'agent-bs-blog', name: 'Brick & Stone Blog Writer',
//     base_model: 'Claude Sonnet 4.6',
//     voice_profile: 'Brick & Stone Storage',
//     trained_on: ['Brand voice doc v3', '24 prior approved blogs', 'Athens facility tour transcript'],
//     avg_brand_voice_score: 91,
//     avg_ai_detect: 24,
//     pieces_drafted: 47,
//     win_rate: 0.94,
//     cost_per_piece: 0.18,
//     avg_words: 1280,
//     persona: 'Warm, practical, locally-rooted. Speaks to Athens-area renters in plain language. Avoids jargon. Always mentions the on-site team by name.',
//   },
//   {
//     id: 'agent-bs-gbp', name: 'Brick & Stone GBP Poster',
//     base_model: 'Gemini 2.5 Flash',
//     voice_profile: 'Brick & Stone Storage',
//     trained_on: ['Brand voice doc v3', '120 prior approved GBP posts'],
//     avg_brand_voice_score: 88,
//     avg_ai_detect: 31,
//     pieces_drafted: 312,
//     win_rate: 0.97,
//     cost_per_piece: 0.02,
//     avg_words: 142,
//     persona: 'Short, friendly, action-oriented. Always includes a CTA.',
//   },
//   {
//     id: 'agent-sunset-blog', name: 'Sunset RV Blog Writer',
//     base_model: 'Claude Sonnet 4.6',
//     voice_profile: 'Sunset RV',
//     trained_on: ['Brand voice doc v2', '14 prior approved blogs', 'RV community subreddit corpus'],
//     avg_brand_voice_score: 87,
//     avg_ai_detect: 26,
//     pieces_drafted: 18,
//     win_rate: 0.89,
//     cost_per_piece: 0.20,
//     avg_words: 1320,
//     persona: 'Enthusiast voice. Talks RVer-to-RVer. Heavy on specifics (rig dimensions, power requirements, winterization details).',
//   },
//   {
//     id: 'agent-royal-faq', name: 'Royal Mini FAQ Builder',
//     base_model: 'DeepSeek V3',
//     voice_profile: 'Royal Mini',
//     trained_on: ['Brand voice doc v1', '40 SMS inquiry threads', 'Office front-desk Q&A log'],
//     avg_brand_voice_score: 82,
//     avg_ai_detect: 34,
//     pieces_drafted: 28,
//     win_rate: 0.91,
//     cost_per_piece: 0.04,
//     avg_words: 220,
//     persona: 'Direct answers. Short paragraphs. Suited to FAQ schema embedding.',
//   },
//   {
//     id: 'agent-research', name: 'Topic Research Agent',
//     base_model: 'Claude Sonnet 4.6 + Perplexity',
//     voice_profile: 'Neutral',
//     trained_on: ['Storage industry corpus', 'Local market research playbook'],
//     avg_brand_voice_score: null,
//     avg_ai_detect: null,
//     pieces_drafted: 88,
//     win_rate: 0.96,
//     cost_per_piece: 0.32,
//     avg_words: 1800,
//     persona: 'Pulls SERP, competitor pages, and AI overview snippets. Outputs structured research briefs.',
//   },
// ];
//
// window.STUDIO_QUEUE = [
//   { id: 's-q-001', stage: 'brief', title: '24/7 access self-storage in Athens', facility: 'bs-athens-1', kw: 'athens 24 hour storage', agent: 'agent-research', words_target: 1400, status: 'queued', priority: 'high' },
//   { id: 's-q-002', stage: 'drafting', title: 'Climate-controlled vs standard: Atlanta guide', facility: 'bs-atlanta', kw: 'climate controlled storage atlanta', agent: 'agent-bs-blog', words_target: 1500, status: 'generating', priority: 'critical', progress: 0.64 },
//   { id: 's-q-003', stage: 'humanize', title: 'RV winterization checklist for Texas', facility: 'sunset-austin', kw: 'rv winterization texas', agent: 'agent-sunset-blog', words_target: 1300, status: 'in_review', priority: 'medium', brand_voice_score: 88, ai_detect: 22 },
//   { id: 's-q-004', stage: 'qa', title: 'Royal Mini moving FAQ', facility: 'royal-mini', kw: 'moving storage athens faq', agent: 'agent-royal-faq', words_target: 800, status: 'qa_passed', priority: 'medium', brand_voice_score: 85, ai_detect: 19 },
//   { id: 's-q-005', stage: 'schema', title: 'Best 10x10 climate units Athens', facility: 'bs-athens-1', kw: 'best 10x10 storage athens', agent: 'agent-bs-blog', words_target: 1200, status: 'schema_added', priority: 'high', brand_voice_score: 92, ai_detect: 18 },
//   { id: 's-q-006', stage: 'publish', title: 'Memorial Day weekend hours announcement', facility: 'bs-athens-1', kw: '(brand)', agent: 'agent-bs-gbp', words_target: 140, status: 'scheduled', priority: 'low', scheduled: '2026-05-23 09:00' },
// ];
//
// window.STUDIO_DEMO_GENERATION = {
//   brief: {
//     title: 'Climate-controlled vs standard: Atlanta guide',
//     target_kw: 'climate controlled storage atlanta',
//     intent: 'commercial',
//     volume: 1200,
//     difficulty: 36,
//     target_words: 1500,
//     competitor_avg: 1380,
//     sections: [
//       'What does climate-controlled actually mean (humidity + temp ranges)',
//       'When you need it: items at risk in Atlanta heat',
//       'When you don\'t: items that are fine in standard',
//       'Price comparison: how much more does climate cost in Atlanta',
//       'How to choose the right size with climate vs standard',
//       'Atlanta-specific FAQs',
//     ],
//     internal_links: ['/atlanta/pricing', '/atlanta/unit-sizes', '/atlanta'],
//     schema: ['BlogPosting', 'FAQPage'],
//   },
//   draft_excerpt: 'In Atlanta, the question is not whether you need storage. It is whether you need climate-controlled storage. Summer humidity in Atlanta averages 71 percent and frequently hits 90 percent. Inside a standard storage unit with no climate control, that humidity sits against your belongings for months at a time. For some things, that does not matter at all. For others, it is the difference between unpacking your stuff in fall and finding moldy boxes...',
//   qa_results: {
//     brand_voice: 92,
//     ai_detection: 18,
//     seo_score: 87,
//     originality: 98,
//     readability: 'grade 8',
//     fact_check: '4 of 4 citations verified',
//   },
// };
//
// window.VOICE_PROFILES = [
//   { id: 'vp-bs', client: 'acme', name: 'Brick & Stone Storage', version: 'v3', trained_pieces: 47, brand_voice_score_avg: 91, status: 'active' },
//   { id: 'vp-sunset', client: 'sunset', name: 'Sunset RV', version: 'v2', trained_pieces: 14, brand_voice_score_avg: 87, status: 'active' },
//   { id: 'vp-royal', client: 'royal', name: 'Royal Mini Storage', version: 'v1', trained_pieces: 8, brand_voice_score_avg: 82, status: 'training' },
// ];
//
// // =====================================================================
// // DEEP COMPETITORS - per-client, 10-12 competitors, win/loss tracking
// // =====================================================================
// window.DEEP_COMPETITORS = {
//   acme: {
//     client: 'acme', tracked_count: 11,
//     us_baseline: {
//       name: 'Us (Acme Storage)',
//       avg_rank: 4.7,
//       review_count: 87,
//       review_velocity_7d: 5.2,
//       citation_count: 84,
//       post_velocity_7d: 4,
//       schema_completeness_pct: 92,
//       page_count: 38,
//       backlink_count: 412,
//       dr: 41,
//       gbp_completeness_pct: 96,
//     },
//     summary: {
//       we_winning_count: 7, they_winning_count: 4, tie_count: 0,
//       share_of_voice: 38, share_of_voice_delta: -3.2,
//       avg_threat_score: 56,
//     },
//     competitors: [
//       {
//         id: 'cp-star', name: 'Star Storage Athens', short: 'STAR',
//         threat: 92, threat_label: 'critical',
//         head_to_head: 'they_winning', rank_delta_vs_us: -1.3,
//         market: 'Athens, GA',
//         wins_against_us: ['Citation velocity (14 vs our 4 last 7d)', 'Review velocity (2x baseline)', 'Climate cluster depth (1620 vs our 1420 words)'],
//         we_win_against: ['GBP photo cadence', 'Schema completeness', 'Local-relevant backlinks'],
//         what_they_do_well: [
//           { area: 'Citation strategy', detail: 'Just ran a 14-citation Whitespark sprint in 48h. Aggressive and visible.', impact: 'high' },
//           { area: 'Review collection', detail: 'PMS-triggered SMS at day 1 (we do day 2). Higher capture rate.', impact: 'high' },
//           { area: 'Content cadence', detail: '4 blog posts per month vs our 2-3. Topical authority compounding.', impact: 'medium' },
//           { area: 'Pricing transparency', detail: 'All prices visible on landing page. Reduces friction.', impact: 'medium' },
//         ],
//         we_should_copy: [
//           { tactic: 'Whitespark 14-citation sprint', cost: 360, eta: '14 days', confidence: 0.86 },
//           { tactic: 'Move SMS review request from day 2 to day 1', cost: 0, eta: '2 days', confidence: 0.91 },
//           { tactic: 'Add visible pricing block to facility pages', cost: 180, eta: '5 days', confidence: 0.78 },
//         ],
//         we_should_differentiate: [
//           { tactic: 'Lean into 24/7 human-staffed phone (they have voicemail nights)', confidence: 0.84 },
//           { tactic: 'Athens-specific climate guidance content (they are generic)', confidence: 0.81 },
//         ],
//         recent_moves: [
//           { date: '2026-05-12', move: 'Added 14 directory citations', source: 'BrightLocal' },
//           { date: '2026-05-11', move: 'Review velocity doubled', source: 'GBP API' },
//           { date: '2026-05-09', move: 'Published 3 climate-controlled pages', source: 'sitemap diff' },
//           { date: '2026-05-05', move: 'Pattern matches new SEO agency signature', source: 'Pattern detection' },
//         ],
//       },
//       {
//         id: 'cp-cubesmart', name: 'CubeSmart Athens', short: 'CUBE',
//         threat: 64, threat_label: 'elevated',
//         head_to_head: 'we_winning', rank_delta_vs_us: 1.8,
//         market: 'Athens, GA',
//         wins_against_us: ['National brand authority', 'Google Ads spend'],
//         we_win_against: ['Local rank for "athens storage"', 'Review velocity', 'Citation breadth', 'Local backlinks'],
//         what_they_do_well: [
//           { area: 'Brand recall', detail: 'National brand. Customers search them by name.', impact: 'medium' },
//           { area: 'Paid search', detail: 'Steady $4-6k/mo Google Ads on branded + competitor terms.', impact: 'medium' },
//           { area: 'Standardized UX', detail: 'Reservation flow optimized at corporate level.', impact: 'low' },
//         ],
//         we_should_copy: [
//           { tactic: 'Trademark our pet name and run brand defense ads', cost: 800, eta: '30 days', confidence: 0.68 },
//         ],
//         we_should_differentiate: [
//           { tactic: 'Hyper-local content (we know Athens, they do not)', confidence: 0.92 },
//           { tactic: 'Local owner story (they have no local face)', confidence: 0.87 },
//         ],
//         recent_moves: [
//           { date: '2026-05-08', move: 'Google Ads activity uptick on branded terms', source: 'Apify' },
//         ],
//       },
//       {
//         id: 'cp-extraspace', name: 'Extra Space Atlanta', short: 'EXTRA',
//         threat: 38, threat_label: 'baseline',
//         head_to_head: 'we_winning', rank_delta_vs_us: 2.4,
//         market: 'Atlanta, GA',
//         wins_against_us: ['REIT scale and pricing power'],
//         we_win_against: ['Rank for "atlanta self storage"', 'Local relevance', 'Review response time'],
//         what_they_do_well: [
//           { area: 'Attribute coverage', detail: 'Adding 24/7 access attribute across all locations now.', impact: 'low' },
//           { area: 'Operational scale', detail: '52 locations in Atlanta metro alone.', impact: 'low' },
//         ],
//         we_should_copy: [
//           { tactic: 'Push 24/7 access attribute on all 15 facilities', cost: 0, eta: '7 days', confidence: 0.92 },
//         ],
//         we_should_differentiate: [
//           { tactic: 'Same-day move-in guarantee (they require 24h notice)', confidence: 0.79 },
//         ],
//         recent_moves: [
//           { date: '2026-05-13', move: 'Now showing 24/7 access on 47 of 52 locations', source: 'GBP scrape' },
//         ],
//       },
//       {
//         id: 'cp-publicstorage', name: 'Public Storage Athens', short: 'PUB',
//         threat: 42, threat_label: 'baseline',
//         head_to_head: 'we_winning', rank_delta_vs_us: 2.1,
//         market: 'Athens, GA',
//         wins_against_us: ['First-month-free promo'],
//         we_win_against: ['Local rank', 'Review velocity', 'Citation breadth'],
//         what_they_do_well: [
//           { area: 'Promotional cadence', detail: 'First-month-free runs in 9 of 12 months.', impact: 'medium' },
//         ],
//         we_should_copy: [
//           { tactic: 'Test first-month-free for college move-in window only', cost: 200, eta: '14 days', confidence: 0.74 },
//         ],
//         we_should_differentiate: [],
//         recent_moves: [],
//       },
//       {
//         id: 'cp-uhaul', name: 'U-Haul Athens', short: 'UH',
//         threat: 48, threat_label: 'baseline',
//         head_to_head: 'we_winning', rank_delta_vs_us: 1.6,
//         market: 'Athens, GA',
//         wins_against_us: ['Truck rental cross-sell', 'Moving and storage bundling'],
//         we_win_against: ['Pure storage rank', 'Review quality (they have many low-star)'],
//         what_they_do_well: [
//           { area: 'Bundle messaging', detail: 'Rent truck + storage in one transaction.', impact: 'medium' },
//         ],
//         we_should_copy: [
//           { tactic: 'Partner with local moving company for referral fee', cost: 0, eta: '21 days', confidence: 0.71 },
//         ],
//         we_should_differentiate: [
//           { tactic: 'Cleanliness messaging (their reviews mention dirty units)', confidence: 0.84 },
//         ],
//         recent_moves: [],
//       },
//       {
//         id: 'cp-storquest', name: 'StorQuest Athens', short: 'STQ',
//         threat: 51, threat_label: 'baseline',
//         head_to_head: 'we_winning', rank_delta_vs_us: 1.4,
//         market: 'Athens, GA',
//         wins_against_us: ['Modern facility aesthetic', 'Higher-end positioning'],
//         we_win_against: ['Pricing accessibility', 'Local rank'],
//         what_they_do_well: [
//           { area: 'Photo quality', detail: 'Professional architectural photography on GBP and site.', impact: 'medium' },
//         ],
//         we_should_copy: [
//           { tactic: 'Professional photo shoot for top 3 facilities', cost: 600, eta: '14 days', confidence: 0.83 },
//         ],
//         we_should_differentiate: [],
//         recent_moves: [],
//       },
//       {
//         id: 'cp-redbox', name: 'Red Box Storage', short: 'RBX',
//         threat: 28, threat_label: 'baseline',
//         head_to_head: 'we_winning', rank_delta_vs_us: 3.2,
//         market: 'Athens, GA',
//         wins_against_us: [],
//         we_win_against: ['Everything'],
//         what_they_do_well: [
//           { area: 'None notable', detail: 'Limited online presence. Mostly walk-ins.', impact: 'low' },
//         ],
//         we_should_copy: [],
//         we_should_differentiate: [],
//         recent_moves: [],
//       },
//       {
//         id: 'cp-life', name: 'Life Storage Atlanta', short: 'LIFE',
//         threat: 56, threat_label: 'baseline',
//         head_to_head: 'they_winning', rank_delta_vs_us: -0.4,
//         market: 'Atlanta, GA',
//         wins_against_us: ['Multi-location brand', 'App-based reservation'],
//         we_win_against: ['Local Athens rank'],
//         what_they_do_well: [
//           { area: 'Mobile app', detail: 'Native iOS/Android with gate code in app.', impact: 'medium' },
//           { area: 'Online check-in', detail: 'Fully contactless move-in flow.', impact: 'medium' },
//         ],
//         we_should_copy: [
//           { tactic: 'PWA for gate code access', cost: 1200, eta: '60 days', confidence: 0.66 },
//         ],
//         we_should_differentiate: [
//           { tactic: 'Lean on local owner identity (they are corporate)', confidence: 0.88 },
//         ],
//         recent_moves: [],
//       },
//       {
//         id: 'cp-storage-pros', name: 'Storage Pros Athens', short: 'PRO',
//         threat: 44, threat_label: 'baseline',
//         head_to_head: 'we_winning', rank_delta_vs_us: 1.8,
//         market: 'Athens, GA',
//         wins_against_us: ['Family-owned story'],
//         we_win_against: ['Most everything else'],
//         what_they_do_well: [
//           { area: 'Owner story page', detail: 'Founder story on About page generates 18% of organic traffic.', impact: 'medium' },
//         ],
//         we_should_copy: [
//           { tactic: 'Build "Meet the team" page with photos and bios', cost: 200, eta: '10 days', confidence: 0.85 },
//         ],
//         we_should_differentiate: [],
//         recent_moves: [],
//       },
//       {
//         id: 'cp-allstar', name: 'All-Star Self Storage', short: 'ALL',
//         threat: 36, threat_label: 'baseline',
//         head_to_head: 'we_winning', rank_delta_vs_us: 2.6,
//         market: 'Athens, GA',
//         wins_against_us: ['Veteran-owned positioning'],
//         we_win_against: ['Local rank', 'Review velocity', 'Content depth'],
//         what_they_do_well: [
//           { area: 'Niche positioning', detail: 'Targets veterans, gets word-of-mouth from base community.', impact: 'low' },
//         ],
//         we_should_copy: [],
//         we_should_differentiate: [],
//         recent_moves: [],
//       },
//       {
//         id: 'cp-watkinsville', name: 'Watkinsville Storage', short: 'WTK',
//         threat: 32, threat_label: 'baseline',
//         head_to_head: 'they_winning', rank_delta_vs_us: -1.1,
//         market: 'Watkinsville, GA',
//         wins_against_us: ['Hyper-local Watkinsville rank'],
//         we_win_against: ['Athens market', 'Brand reach'],
//         what_they_do_well: [
//           { area: 'Watkinsville-specific content', detail: '5 pages dedicated to Watkinsville micro-market.', impact: 'low' },
//         ],
//         we_should_copy: [
//           { tactic: 'Build Watkinsville sub-page for our facility there', cost: 240, eta: '10 days', confidence: 0.82 },
//         ],
//         we_should_differentiate: [],
//         recent_moves: [],
//       },
//     ],
//   },
//   sunset: {
//     client: 'sunset', tracked_count: 4,
//     summary: { we_winning_count: 3, they_winning_count: 1, tie_count: 0, share_of_voice: 41, share_of_voice_delta: 2.1, avg_threat_score: 38 },
//     competitors: [
//       { id: 'cp-pub-austin', name: 'Public Storage Austin', short: 'PUB', threat: 32, threat_label: 'baseline', head_to_head: 'we_winning', rank_delta_vs_us: 1.4, market: 'Austin, TX', wins_against_us: [], we_win_against: ['Local Austin rank'], what_they_do_well: [], we_should_copy: [], we_should_differentiate: [], recent_moves: [] },
//       { id: 'cp-laketravis', name: 'Lake Travis Storage', short: 'LKT', threat: 64, threat_label: 'elevated', head_to_head: 'we_winning', rank_delta_vs_us: 0.6, market: 'Austin, TX', wins_against_us: ['RV-specific signage'], we_win_against: ['Covered bay variety', 'Review count'], what_they_do_well: [], we_should_copy: [], we_should_differentiate: [], recent_moves: [{ date: '2026-05-09', move: 'Added RV Storage Facility as secondary category', source: 'GBP diff' }] },
//       { id: 'cp-stowit', name: 'StowIt RV Round Rock', short: 'STO', threat: 41, threat_label: 'baseline', head_to_head: 'we_winning', rank_delta_vs_us: 1.2, market: 'Round Rock, TX', wins_against_us: [], we_win_against: ['Rank', 'Reviews'], what_they_do_well: [], we_should_copy: [], we_should_differentiate: [], recent_moves: [] },
//       { id: 'cp-blueline', name: 'BlueLine Boat Storage', short: 'BLU', threat: 36, threat_label: 'baseline', head_to_head: 'they_winning', rank_delta_vs_us: -0.4, market: 'Georgetown, TX', wins_against_us: ['Boat-specific positioning'], we_win_against: [], what_they_do_well: [], we_should_copy: [], we_should_differentiate: [], recent_moves: [] },
//     ],
//   },
// };
//