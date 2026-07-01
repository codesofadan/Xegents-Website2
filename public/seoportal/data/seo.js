/* ============================================================
   SEO & Local macro seed - data for ALL sub-modules:
     seo            (overview console)
     seo.ranks      (dense keyword rank list)
     seo.local      (geo heatmap grid)
     seo.audit      (site-audit issues + health scores)
     seo.backlinks  (dense backlink list)
     seo.gaps       (content-gap list)
   Keyed to window.CLIENTS where it matters. Dated relative
   to window.TODAY (2026-06-26). AI is a quiet capability here,
   not the personality - the approvals macro is the AI home.
   ============================================================ */

window.SEO = {

  // Portfolio KPIs. Deltas vs prior month (May 2026).
  kpis: {
    rankAvg: 5.6, rankDelta: -0.7,          // lower is better, so a drop is good
    keywords: 1240, keywordsDelta: 84,       // net new tracked terms
    gbpCalls: 3180, gbpCallsDelta: 11.4,     // % MTD
    citationHealth: 88, citationDelta: 3.0,  // % consistent NAP
    backlinks: 4210, backlinksDelta: 162,    // net new referring links
  },

  // ---- Rank tracking. 32 keywords across clients. spark = last 7 weeks rank. ----
  // change: positions moved this month. Positive = improved (moved up toward #1).
  // kd = keyword difficulty 0-100. url = the ranking page (for drill-in).
  ranks: [
    { keyword: 'invisalign plano',            client: 'lumen',     rank: 3,  change: 6,  volume: 2400,  kd: 34, intent: 'high',   url: '/services/invisalign', spark: [9, 8, 8, 6, 5, 4, 3] },
    { keyword: 'dental implants frisco',      client: 'lumen',     rank: 5,  change: 2,  volume: 1900,  kd: 41, intent: 'high',   url: '/services/dental-implants', spark: [7, 7, 6, 6, 5, 5, 5] },
    { keyword: 'emergency dentist dallas',    client: 'lumen',     rank: 8,  change: -1, volume: 3600,  kd: 47, intent: 'high',   url: '/emergency-dentist', spark: [6, 6, 7, 7, 7, 8, 8] },
    { keyword: 'cosmetic dentist plano',      client: 'lumen',     rank: 6,  change: 3,  volume: 1300,  kd: 38, intent: 'high',   url: '/services/cosmetic', spark: [11, 10, 9, 8, 7, 6, 6] },
    { keyword: 'teeth whitening plano',       client: 'lumen',     rank: 4,  change: 2,  volume: 1700,  kd: 30, intent: 'high',   url: '/services/whitening', spark: [7, 6, 6, 5, 5, 4, 4] },
    { keyword: 'pediatric dentist frisco',    client: 'lumen',     rank: 12, change: -2, volume: 1100,  kd: 35, intent: 'medium', url: '/services/pediatric', spark: [9, 9, 10, 10, 11, 11, 12] },
    { keyword: 'storage units atlanta',       client: 'atlas',     rank: 11, change: -7, volume: 8100,  kd: 52, intent: 'high',   url: '/locations/atlanta-midtown', spark: [4, 4, 5, 7, 9, 10, 11] },
    { keyword: 'climate controlled storage',  client: 'atlas',     rank: 9,  change: -3, volume: 2900,  kd: 44, intent: 'medium', url: '/climate-controlled', spark: [6, 6, 7, 7, 8, 9, 9] },
    { keyword: 'boat and rv storage atlanta', client: 'atlas',     rank: 6,  change: 4,  volume: 1300,  kd: 29, intent: 'high',   url: '/boat-rv-storage', spark: [10, 9, 8, 8, 7, 6, 6] },
    { keyword: 'self storage decatur',        client: 'atlas',     rank: 14, change: -5, volume: 1700,  kd: 36, intent: 'high',   url: '/locations/decatur', spark: [8, 9, 10, 11, 12, 13, 14] },
    { keyword: 'storage units buckhead',      client: 'atlas',     rank: 7,  change: 1,  volume: 2200,  kd: 39, intent: 'high',   url: '/locations/buckhead', spark: [9, 8, 8, 8, 7, 7, 7] },
    { keyword: 'cheap storage atlanta',       client: 'atlas',     rank: 18, change: -4, volume: 3300,  kd: 33, intent: 'high',   url: '/', spark: [12, 13, 14, 15, 16, 17, 18] },
    { keyword: 'business storage atlanta',    client: 'atlas',     rank: 10, change: 2,  volume: 880,   kd: 28, intent: 'medium', url: '/business-storage', spark: [13, 12, 12, 11, 11, 10, 10] },
    { keyword: 'project management software',  client: 'northedge', rank: 14, change: 3,  volume: 33100, kd: 78, intent: 'medium', url: '/', spark: [19, 18, 17, 16, 15, 14, 14] },
    { keyword: 'agile sprint planning tool',  client: 'northedge', rank: 7,  change: 5,  volume: 2700,  kd: 49, intent: 'high',   url: '/features/sprint-planning', spark: [13, 12, 11, 9, 8, 7, 7] },
    { keyword: 'asana alternative',           client: 'northedge', rank: 12, change: 1,  volume: 6600,  kd: 61, intent: 'high',   url: '/asana-alternative', spark: [14, 13, 13, 12, 12, 12, 12] },
    { keyword: 'gantt chart software',        client: 'northedge', rank: 19, change: 4,  volume: 14800, kd: 64, intent: 'medium', url: '/features/gantt', spark: [26, 24, 23, 22, 21, 20, 19] },
    { keyword: 'team task management',        client: 'northedge', rank: 9,  change: 2,  volume: 4400,  kd: 53, intent: 'medium', url: '/features/tasks', spark: [13, 12, 11, 11, 10, 9, 9] },
    { keyword: 'jira alternative',            client: 'northedge', rank: 16, change: -1, volume: 5400,  kd: 58, intent: 'high',   url: '/jira-alternative', spark: [14, 14, 15, 15, 15, 16, 16] },
    { keyword: 'farm to table denver',        client: 'casaverde', rank: 2,  change: 1,  volume: 1600,  kd: 33, intent: 'high',   url: '/', spark: [4, 3, 3, 3, 2, 2, 2] },
    { keyword: 'best brunch denver',          client: 'casaverde', rank: 4,  change: 3,  volume: 4400,  kd: 42, intent: 'medium', url: '/brunch', spark: [8, 7, 6, 6, 5, 4, 4] },
    { keyword: 'private event venue denver',  client: 'casaverde', rank: 9,  change: 2,  volume: 880,   kd: 27, intent: 'high',   url: '/events', spark: [12, 11, 11, 10, 10, 9, 9] },
    { keyword: 'romantic restaurant denver',  client: 'casaverde', rank: 6,  change: 4,  volume: 2100,  kd: 38, intent: 'high',   url: '/', spark: [11, 10, 9, 8, 7, 7, 6] },
    { keyword: 'denver dinner reservations',  client: 'casaverde', rank: 13, change: -2, volume: 1300,  kd: 31, intent: 'medium', url: '/reservations', spark: [10, 10, 11, 11, 12, 13, 13] },
    { keyword: 'vitamin c serum',             client: 'verdant',   rank: 13, change: -2, volume: 18100, kd: 67, intent: 'medium', url: '/products/vitamin-c-serum', spark: [10, 11, 11, 12, 12, 13, 13] },
    { keyword: 'best vitamin c serum',        client: 'verdant',   rank: 17, change: 1,  volume: 9900,  kd: 62, intent: 'high',   url: '/products/vitamin-c-serum', spark: [20, 19, 18, 18, 17, 17, 17] },
    { keyword: 'retinol serum for beginners', client: 'verdant',   rank: 8,  change: 3,  volume: 6600,  kd: 54, intent: 'high',   url: '/products/retinol', spark: [13, 12, 11, 10, 9, 8, 8] },
    { keyword: 'natural skincare brand',      client: 'verdant',   rank: 15, change: -1, volume: 4800,  kd: 56, intent: 'medium', url: '/', spark: [13, 13, 14, 14, 14, 15, 15] },
    { keyword: 'gym membership scottsdale',   client: 'peak',      rank: 5,  change: 2,  volume: 1100,  kd: 31, intent: 'high',   url: '/membership', spark: [8, 7, 7, 6, 6, 5, 5] },
    { keyword: 'personal trainer scottsdale', client: 'peak',      rank: 7,  change: 3,  volume: 1400,  kd: 35, intent: 'high',   url: '/personal-training', spark: [12, 11, 10, 9, 8, 7, 7] },
    { keyword: 'crossfit scottsdale',         client: 'peak',      rank: 3,  change: 1,  volume: 880,   kd: 26, intent: 'high',   url: '/classes/crossfit', spark: [5, 5, 4, 4, 3, 3, 3] },
    { keyword: 'best gym in scottsdale',      client: 'peak',      rank: 10, change: -3, volume: 2400,  kd: 43, intent: 'high',   url: '/', spark: [6, 6, 7, 8, 9, 9, 10] },
  ],

  // ---- Position-bucket distribution across the full 1,240-keyword universe. ----
  buckets: [
    { label: 'Top 3',   range: '1 - 3',    count: 214, delta: 18,  color: 'var(--acc)' },
    { label: '4 - 10',  range: '4 - 10',   count: 388, delta: 41,  color: 'var(--sky)' },
    { label: '11 - 20', range: '11 - 20',  count: 351, delta: 12,  color: 'var(--amber)' },
    { label: '21+',     range: '21 - 100', count: 287, delta: -32, color: 'var(--text-3)' },
  ],

  // ---- Top movers (overview console). Keyword rank shifts this month. ----
  movers: [
    { keyword: 'invisalign plano',           client: 'lumen',     change: 6,  rank: 3 },
    { keyword: 'agile sprint planning tool', client: 'northedge', change: 5,  rank: 7 },
    { keyword: 'gantt chart software',       client: 'northedge', change: 4,  rank: 19 },
    { keyword: 'romantic restaurant denver', client: 'casaverde', change: 4,  rank: 6 },
    { keyword: 'storage units atlanta',      client: 'atlas',     change: -7, rank: 11 },
    { keyword: 'self storage decatur',       client: 'atlas',     change: -5, rank: 14 },
    { keyword: 'cheap storage atlanta',      client: 'atlas',     change: -4, rank: 18 },
    { keyword: 'climate controlled storage', client: 'atlas',     change: -3, rank: 9 },
  ],

  // ---- 12-week portfolio average-rank trend (overview chart). Lower is better. ----
  rankTrend: {
    labels: ['Apr 1', 'Apr 8', 'Apr 15', 'Apr 22', 'Apr 29', 'May 6', 'May 13', 'May 20', 'May 27', 'Jun 3', 'Jun 10', 'Jun 17'],
    avgRank: [7.4, 7.1, 6.9, 6.8, 6.6, 6.5, 6.3, 6.2, 6.0, 5.9, 5.7, 5.6],
  },

  // ---- Local grid heatmaps. Selectable by client+keyword. ----
  // Each scenario: 49 cells, row-major. null = not in top 20.
  // Strong near center (the facility), weaker at edges.
  gridScenarios: [
    {
      id: 'atlas-storage', client: 'atlas', keyword: 'storage units atlanta', location: 'Atlanta, GA',
      size: 7, scannedAt: '2026-06-25', radiusKm: 12, solv: 41.2, solvDelta: -4.1,
      cells: [
        14, 12, 11, 13, 16, 18, 20,
        11, 9, 7, 8, 10, 14, 17,
        8, 6, 4, 5, 7, 11, 15,
        6, 4, 2, 3, 5, 9, 13,
        7, 5, 3, 4, 6, 10, 14,
        10, 8, 6, 7, 9, 13, 17,
        13, 11, 9, 10, 12, 16, 19,
      ],
      note: 'Coverage collapses past the 8 km ring to the north and east. Two GBP service-area posts and a Decatur landing page would lift the edge cells.',
    },
    {
      id: 'atlas-climate', client: 'atlas', keyword: 'climate controlled storage', location: 'Atlanta, GA',
      size: 7, scannedAt: '2026-06-25', radiusKm: 12, solv: 36.8, solvDelta: -2.3,
      cells: [
        16, 14, 13, 14, 17, 19, null,
        13, 11, 9, 10, 12, 16, 18,
        10, 8, 6, 7, 9, 13, 16,
        8, 6, 4, 5, 7, 11, 14,
        9, 7, 5, 6, 8, 12, 15,
        12, 10, 8, 9, 11, 15, 18,
        15, 13, 11, 12, 14, 18, null,
      ],
      note: 'Climate-controlled intent is thinner than core storage. Add interior-unit photos and a dedicated FAQ block to win the snippet from CubeSmart.',
    },
    {
      id: 'lumen-invisalign', client: 'lumen', keyword: 'invisalign plano', location: 'Plano, TX',
      size: 7, scannedAt: '2026-06-24', radiusKm: 9, solv: 58.4, solvDelta: 6.2,
      cells: [
        6, 5, 4, 5, 7, 9, 12,
        5, 4, 3, 3, 5, 7, 10,
        4, 3, 2, 1, 3, 5, 8,
        3, 2, 1, 1, 2, 4, 7,
        4, 3, 2, 2, 3, 5, 8,
        6, 5, 3, 4, 5, 7, 10,
        9, 7, 6, 6, 8, 10, 13,
      ],
      note: 'Strong city-wide coverage. The weak north-east corner overlaps a competitor cluster near Frisco; a Frisco landing page would close it.',
    },
    {
      id: 'casaverde-brunch', client: 'casaverde', keyword: 'best brunch denver', location: 'Denver, CO',
      size: 7, scannedAt: '2026-06-25', radiusKm: 7, solv: 47.9, solvDelta: 3.4,
      cells: [
        9, 8, 6, 7, 9, 11, 14,
        7, 6, 5, 5, 7, 9, 12,
        6, 4, 3, 4, 5, 8, 11,
        5, 3, 2, 3, 4, 7, 10,
        6, 4, 3, 4, 6, 8, 11,
        8, 7, 5, 6, 8, 10, 13,
        11, 9, 8, 9, 11, 13, 16,
      ],
      note: 'Good downtown ownership. Suburban cells lag - a "brunch reservations Denver" page plus fresh GBP photos would extend reach.',
    },
  ],

  // ---- GBP insights for the local client (Atlas). MTD (overview console). ----
  gbp: {
    client: 'atlas',
    profile: 'Atlas Storage - Atlanta Midtown',
    calls: 1240, callsDelta: 8.6,
    directionRequests: 2180, directionsDelta: 12.1,
    websiteClicks: 1640, clicksDelta: -3.2,
    photoViews: 38400, photoDelta: 6.4,
  },

  // ---- GBP multi-location performance. Atlas runs 9 location profiles. MTD. ----
  gbpLocations: [
    { name: 'Atlanta Midtown', views: 14200, calls: 318, directions: 562, clicks: 381, rating: 4.6, reviews: 214, status: 'verified' },
    { name: 'Decatur',         views: 9800,  calls: 241, directions: 438, clicks: 296, rating: 4.4, reviews: 138, status: 'verified' },
    { name: 'Buckhead',        views: 11600, calls: 287, directions: 491, clicks: 332, rating: 4.7, reviews: 176, status: 'verified' },
    { name: 'Marietta',        views: 7400,  calls: 168, directions: 312, clicks: 214, rating: 4.3, reviews: 92,  status: 'verified' },
    { name: 'Sandy Springs',   views: 8900,  calls: 203, directions: 377, clicks: 261, rating: 4.5, reviews: 121, status: 'verified' },
    { name: 'Smyrna',          views: 6100,  calls: 142, directions: 268, clicks: 188, rating: 4.2, reviews: 74,  status: 'verified' },
    { name: 'Alpharetta',      views: 5300,  calls: 119, directions: 224, clicks: 157, rating: 4.4, reviews: 68,  status: 'verified' },
    { name: 'East Point',      views: 3900,  calls: 88,  directions: 171, clicks: 112, rating: 4.0, reviews: 47,  status: 'action' },
    { name: 'Stone Mountain',  views: 3200,  calls: 71,  directions: 138, clicks: 94,  rating: 3.9, reviews: 39,  status: 'action' },
  ],

  // ---- Site audit. Health scores + a dense issues list across clients. ----
  // health: 0-100 per category. cwv = Core Web Vitals dimensions.
  health: {
    overall: 78, overallDelta: 4,
    categories: [
      { key: 'technical', label: 'Technical', score: 82, delta: 3 },
      { key: 'onpage',    label: 'On-page',   score: 74, delta: 5 },
      { key: 'cwv',       label: 'Core Web Vitals', score: 69, delta: -2 },
      { key: 'content',   label: 'Content depth', score: 71, delta: 6 },
    ],
    cwv: [
      { metric: 'LCP', label: 'Largest Contentful Paint', value: '2.8s', status: 'amber', good: '< 2.5s' },
      { metric: 'INP', label: 'Interaction to Next Paint', value: '190ms', status: 'green', good: '< 200ms' },
      { metric: 'CLS', label: 'Cumulative Layout Shift', value: '0.07', status: 'green', good: '< 0.1' },
    ],
  },

  // ---- On-page / technical audit issues. 14 across clients, severity-ranked. ----
  // severity: red(critical) amber(warning) sky(info). category: technical|onpage|cwv|content|schema|links.
  audit: [
    { client: 'atlas',     page: '/locations/atlanta-midtown', issue: 'Missing LocalBusiness schema', category: 'schema',    severity: 'red',   pages: 6, status: 'open',        detail: 'No structured data on 6 of 9 location pages. Blocks rich results.', fix: 'Generate + inject LocalBusiness JSON-LD' },
    { client: 'verdant',   page: '/products/vitamin-c-serum',  issue: 'Slow LCP (4.8s on mobile)',     category: 'cwv',       severity: 'red',   pages: 18, status: 'open',       detail: 'Hero image unoptimized, 1.2 MB PNG. Largest Contentful Paint failing CWV.', fix: 'Convert to WebP + add fetchpriority' },
    { client: 'northedge', page: '/blog',                      issue: 'Render-blocking JavaScript',    category: 'technical', severity: 'red',   pages: 11, status: 'open',       detail: '420 KB of non-deferred JS on blog templates delays first paint.', fix: 'Defer non-critical scripts' },
    { client: 'atlas',     page: '/locations/decatur',         issue: 'Duplicate meta descriptions',   category: 'onpage',    severity: 'amber', pages: 7,  status: 'open',       detail: '7 of 9 location pages share one boilerplate description. Hurts local relevance.', fix: 'Write per-city meta descriptions' },
    { client: 'northedge', page: '/features/sprint-planning',  issue: 'Thin content (210 words)',      category: 'content',   severity: 'amber', pages: 4,  status: 'open',       detail: 'Below the depth of top-3 ranking competitors (avg 1,340 words).', fix: null },
    { client: 'atlas',     page: '/blog/self-storage-tips',    issue: '4 broken internal links',       category: 'links',     severity: 'amber', pages: 1,  status: 'in_progress', detail: 'Links to retired /units/old-pricing return 404. Dilutes link equity.', fix: 'Update or remove dead links' },
    { client: 'lumen',     page: '/services/invisalign',       issue: 'Duplicate title tags',          category: 'onpage',    severity: 'amber', pages: 3,  status: 'open',       detail: '3 location pages share the same title. Cannibalizing rankings.', fix: 'Rewrite titles with city modifiers' },
    { client: 'verdant',   page: '/collections',               issue: 'CLS spikes on lazy images',     category: 'cwv',       severity: 'amber', pages: 9,  status: 'open',       detail: 'Product grid images lack width/height, shifting layout to 0.18 CLS.', fix: 'Add explicit image dimensions' },
    { client: 'peak',      page: '/classes',                   issue: 'H1 missing on 5 pages',         category: 'onpage',    severity: 'amber', pages: 5,  status: 'open',       detail: 'Class detail pages open with an H2; no H1 present.', fix: 'Promote class name to H1' },
    { client: 'casaverde', page: '/menu',                      issue: 'Missing alt text (12 images)',  category: 'onpage',    severity: 'sky',   pages: 1,  status: 'open',       detail: 'Menu photos lack alt attributes. Minor accessibility + image-search loss.', fix: null },
    { client: 'northedge', page: '/',                          issue: 'No canonical on paginated set', category: 'technical', severity: 'sky',   pages: 6,  status: 'open',       detail: '/blog?page=2..7 self-canonicalize, risking index bloat.', fix: null },
    { client: 'lumen',     page: '/sitemap.xml',               issue: 'Sitemap lists 3 noindex URLs',  category: 'technical', severity: 'sky',   pages: 3,  status: 'resolved',   detail: 'Thank-you pages were submitted in the sitemap. Wastes crawl budget.', fix: 'Excluded from sitemap' },
    { client: 'peak',      page: '/schedule',                  issue: 'Missing FAQ schema',            category: 'schema',    severity: 'sky',   pages: 1,  status: 'open',       detail: 'Schedule FAQ block is eligible for rich results but lacks markup.', fix: 'Add FAQPage JSON-LD' },
    { client: 'casaverde', page: '/events',                    issue: 'Mixed-content image request',   category: 'technical', severity: 'sky',   pages: 1,  status: 'open',       detail: 'One http:// image on the events page triggers a console warning.', fix: 'Serve over https' },
  ],

  // ---- Backlinks. 28 referring-domain rows, new + lost + toxic. ----
  // type: dofollow|nofollow|toxic. event: new|lost|active. dr = domain rating 0-100.
  backlinkProfile: {
    referringDomains: 1840, referringDelta: 47,
    newLinks: 162, lostLinks: 38, disavowed: 6,
    dofollow: 71, nofollow: 29,
  },
  backlinks: [
    { client: 'northedge', domain: 'producthunt.com',    dr: 91, type: 'dofollow', anchor: 'NorthEdge',               event: 'new',    days: 1 },
    { client: 'lumen',     domain: 'dallasnews.com',      dr: 84, type: 'dofollow', anchor: 'Lumen Dental Group',      event: 'new',    days: 3 },
    { client: 'casaverde', domain: 'eater.com',           dr: 89, type: 'dofollow', anchor: 'farm-to-table spot',      event: 'new',    days: 4 },
    { client: 'verdant',   domain: 'byrdie.com',          dr: 88, type: 'nofollow', anchor: 'Verdant vitamin C serum', event: 'new',    days: 6 },
    { client: 'northedge', domain: 'techcrunch.com',      dr: 93, type: 'dofollow', anchor: 'project management tool', event: 'new',    days: 7 },
    { client: 'peak',      domain: 'menshealth.com',      dr: 90, type: 'nofollow', anchor: 'Scottsdale gym',          event: 'new',    days: 8 },
    { client: 'verdant',   domain: 'allure.com',          dr: 91, type: 'dofollow', anchor: 'best vitamin C serum',    event: 'new',    days: 9 },
    { client: 'lumen',     domain: 'healthline.com',      dr: 92, type: 'nofollow', anchor: 'Invisalign cost',         event: 'new',    days: 11 },
    { client: 'casaverde', domain: 'thrillist.com',       dr: 86, type: 'dofollow', anchor: 'Denver brunch',           event: 'new',    days: 12 },
    { client: 'northedge', domain: 'capterra.com',        dr: 88, type: 'dofollow', anchor: 'NorthEdge software',      event: 'new',    days: 14 },
    { client: 'atlas',     domain: 'atlantamagazine.com', dr: 79, type: 'dofollow', anchor: 'Atlas Storage',           event: 'new',    days: 15 },
    { client: 'peak',      domain: 'azcentral.com',       dr: 81, type: 'dofollow', anchor: 'Peak Fitness Scottsdale', event: 'new',    days: 17 },
    { client: 'verdant',   domain: 'wellandgood.com',     dr: 83, type: 'dofollow', anchor: 'natural skincare',        event: 'new',    days: 19 },
    { client: 'northedge', domain: 'getapp.com',          dr: 84, type: 'dofollow', anchor: 'agile planning tool',     event: 'new',    days: 21 },
    { client: 'lumen',     domain: 'plano.gov',           dr: 72, type: 'dofollow', anchor: 'local dentists',          event: 'new',    days: 23 },
    { client: 'casaverde', domain: 'denverpost.com',      dr: 87, type: 'dofollow', anchor: 'Casa Verde',              event: 'new',    days: 25 },
    { client: 'atlas',     domain: 'storagereview.org',   dr: 62, type: 'dofollow', anchor: 'Atlas Storage Atlanta',   event: 'lost',   days: 2 },
    { client: 'northedge', domain: 'g2.com',              dr: 90, type: 'dofollow', anchor: 'project tool',            event: 'lost',   days: 5 },
    { client: 'verdant',   domain: 'refinery29.com',      dr: 89, type: 'dofollow', anchor: 'serum review',            event: 'lost',   days: 9 },
    { client: 'peak',      domain: 'yelp.com',            dr: 93, type: 'nofollow', anchor: 'Peak Fitness',            event: 'lost',   days: 13 },
    { client: 'lumen',     domain: 'directory-spam.net',  dr: 18, type: 'nofollow', anchor: 'dentist near me',         event: 'lost',   days: 16 },
    { client: 'casaverde', domain: 'opentable.com',       dr: 88, type: 'dofollow', anchor: 'Denver restaurant',       event: 'active', days: 28 },
    { client: 'atlas',     domain: 'sparefoot.com',       dr: 74, type: 'dofollow', anchor: 'self storage Atlanta',    event: 'active', days: 34 },
    { client: 'northedge', domain: 'trustradius.com',     dr: 82, type: 'dofollow', anchor: 'sprint planning',         event: 'active', days: 41 },
    { client: 'verdant',   domain: 'sephora.com',         dr: 92, type: 'nofollow', anchor: 'Verdant',                 event: 'active', days: 52 },
    { client: 'peak',      domain: 'classpass.com',       dr: 85, type: 'dofollow', anchor: 'Scottsdale fitness',      event: 'active', days: 60 },
    { client: 'atlas',     domain: 'spammylinks.ru',      dr: 4,  type: 'toxic',    anchor: 'cheap storage',           event: 'lost',   days: 2, toxic: true },
    { client: 'verdant',   domain: 'cheap-seo-links.biz', dr: 6,  type: 'toxic',    anchor: 'buy serum',               event: 'active', days: 38, toxic: true },
  ],

  // ---- Content gaps. Keywords competitors rank for and we do not. ----
  // yourRank: null = not ranking. opp = opportunity score 0-100.
  contentGaps: [
    { client: 'northedge', keyword: 'gantt chart software',       yourRank: 19,   compRank: 2,  compName: 'Asana',         volume: 14800, difficulty: 38, opp: 88, cpcUsd: 9.40 },
    { client: 'lumen',     keyword: 'cost of dental implants',    yourRank: null, compRank: 1,  compName: 'SmileWorks',    volume: 12100, difficulty: 44, opp: 84, cpcUsd: 7.20 },
    { client: 'northedge', keyword: 'kanban board template',      yourRank: null, compRank: 2,  compName: 'Trello',        volume: 8200,  difficulty: 24, opp: 82, cpcUsd: 4.10 },
    { client: 'verdant',   keyword: 'how to use vitamin c serum', yourRank: 24,   compRank: 1,  compName: 'Byrdie',        volume: 9100,  difficulty: 29, opp: 79, cpcUsd: 2.60 },
    { client: 'atlas',     keyword: 'cheap storage near me',      yourRank: null, compRank: 3,  compName: 'Public Storage', volume: 6600,  difficulty: 31, opp: 76, cpcUsd: 3.80 },
    { client: 'casaverde', keyword: 'private dining denver',      yourRank: null, compRank: 2,  compName: 'Snooze',        volume: 2900,  difficulty: 26, opp: 71, cpcUsd: 5.10 },
    { client: 'peak',      keyword: 'best time to work out',      yourRank: null, compRank: 4,  compName: 'Mens Health', volume: 5400,  difficulty: 22, opp: 68, cpcUsd: 1.90 },
    { client: 'northedge', keyword: 'resource planning software', yourRank: null, compRank: 5,  compName: 'Monday.com',    volume: 4400,  difficulty: 47, opp: 64, cpcUsd: 11.30 },
    { client: 'lumen',     keyword: 'invisalign vs braces',       yourRank: 31,   compRank: 2,  compName: 'Plano Dental',  volume: 8100,  difficulty: 36, opp: 62, cpcUsd: 6.40 },
    { client: 'atlas',     keyword: 'how much does storage cost', yourRank: null, compRank: 3,  compName: 'CubeSmart',     volume: 3300,  difficulty: 28, opp: 59, cpcUsd: 3.10 },
    { client: 'verdant',   keyword: 'vitamin c vs retinol',       yourRank: null, compRank: 1,  compName: 'Allure',        volume: 2700,  difficulty: 33, opp: 55, cpcUsd: 2.20 },
    { client: 'casaverde', keyword: 'denver date night ideas',    yourRank: null, compRank: 6,  compName: 'Thrillist',     volume: 1900,  difficulty: 19, opp: 51, cpcUsd: 1.40 },
  ],
};
