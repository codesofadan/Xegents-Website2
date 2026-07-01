window.STRATEGIES = [
  {
    id: 's-001',
    facility: 'bs-athens-1',
    version: 3,
    status: 'approved',
    approved_by: 'Sara McKinley (Acme)',
    approved_at: '2026-05-12',
    current_state: {
      rank_avg: 4.7, rank_at_start: 6.2,
      reviews: 87, rating: 4.7, reviews_in_may: 12,
      citations: 84, citation_target: 100,
      keywords: ['athens storage', 'storage athens ga', 'self storage athens', 'climate controlled athens'],
    },
    goals: [
      { id: 'g-001', target: 'Top 3 for primary keyword by Aug 31', owner: 'Khizer', status: 'on_track' },
      { id: 'g-002', target: '100 reviews by Aug 31',                owner: 'Aimen',  status: 'on_track' },
      { id: 'g-003', target: '7 new RV-storage rentals',             owner: 'Mark', status: 'at_risk' },
    ],
    plan: [
      { id: 'p-001', title: 'Schema upgrade — SelfStorage + makesOffer', tasks: ['T-2341','T-2342'] },
      { id: 'p-002', title: 'GBP post velocity — 4x/wk consistently',     tasks: ['T-2350','T-2351','T-2352'] },
      { id: 'p-003', title: 'Backlink push — 5 RV-niche placements',     tasks: ['T-2410'] },
    ],
  },
];

window.HYPOTHESES = [
  { id: 'h-001', facility: 'bs-athens-1', desc: 'Adding "24/7 gate access" to GBP description will lift CTR 8-12% within 14 days.', change_date: '2026-04-22', measure_date: '2026-05-06', baseline: 4.2, post: 6.1, outcome: 'win', lessons: 'Specific feature mentions outperform generic copy.' },
  { id: 'h-002', facility: 'bs-atlanta', desc: 'Climate-controlled landing page with FAQ schema will rank Top 5 for "climate controlled atlanta" within 30 days.', change_date: '2026-04-08', measure_date: '2026-05-08', baseline: 11.4, post: 4.2, outcome: 'win', lessons: 'FAQ schema + 1500+ words = consistent rank lift.' },
  { id: 'h-003', facility: 'royal-mini', desc: 'Whitespark rebuild of lost citations will recover -8 position drop within 21 days.', change_date: '2026-05-13', measure_date: '2026-06-03', baseline: 16.4, post: null, outcome: 'in_progress' },
  { id: 'h-004', facility: 'sunset-austin', desc: 'RV-niche backlinks (rvtravel.com, rvshare.com) will outperform generic local citations 2x.', change_date: '2026-04-30', measure_date: '2026-05-28', baseline: 5.2, post: 4.4, outcome: 'in_progress' },
];

window.QBR = {
  client: 'acme', quarter: 'Q1', year: 2026,
  status: 'sent_pending_meeting', meeting_date: '2026-05-28',
  summary: {
    avg_rank_improvement: -2.3,
    reviews_collected: 187,
    reviews_target: 195,
    new_citations: 412,
    content_shipped: 89,
    backlinks_earned: 22,
  },
  talking_points: [
    'We exceeded our content target by 14% (89 vs 78 GBP posts + blogs)',
    'Reviews fell 4% short — Royal Mini was the sole drag. Plan attached.',
    'New keyword opportunity in Athens RV market — 4 land-grab pages proposed.',
  ],
  q1_actions: [
    { item: 'Athens schema upgrade', status: 'done', date: '2026-04-08' },
    { item: 'RV-niche backlinks (5 of 5)', status: 'done', date: '2026-04-22' },
    { item: 'Climate-control content cluster (3 of 6)', status: 'in_progress' },
  ],
  q2_proposed: [
    'Land-grab pages: 4 keyword targets identified, 32 hrs total',
    'GBP photo cadence increase: from 1/wk to 2/wk per facility',
    'Citation push: 30 new directories per facility, target 60 each',
  ],
};
