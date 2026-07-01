window.GBP_POSTS = [
  // Live posts
  { id: 'g-001', facility: 'bs-athens-1', type: 'offer',  title: 'Memorial Day weekend hours', body: 'Our office is closed Monday May 26 but gate access is 24/7. Have a great weekend!', publish: '2026-05-12', status: 'live', image: 'memorial', cta: 'Learn more', views: 84,  clicks: 11 },
  { id: 'g-002', facility: 'star-athens', type: 'offer',  title: 'Climate-controlled promo', body: '50% off your first month on any climate-controlled unit. Limited to first 10 customers.', publish: '2026-05-13', status: 'live', image: 'climate', cta: 'Reserve', views: 121, clicks: 18 },
  { id: 'g-003', facility: 'royal-mini',  type: 'update', title: '24/7 gate access reminder', body: 'Did you know you can access your unit any time? Just bring your gate code.', publish: '2026-05-14', status: 'live', image: 'gate', cta: null,        views: 47,  clicks: 6 },

  // Scheduled
  { id: 'g-004', facility: 'bs-athens-1', type: 'offer',  title: 'RV/Boat special pricing',     body: 'Outdoor RV spots starting at $79/mo. Covered $129.', publish: '2026-05-16 09:00', status: 'scheduled', image: 'rv',      cta: 'Reserve' },
  { id: 'g-005', facility: 'star-athens', type: 'update', title: 'New climate-control bays',    body: '12 new climate-controlled units now available, sizes 5x10 to 10x20.', publish: '2026-05-17 09:00', status: 'scheduled', image: 'climate', cta: 'Tour' },

  // Pending approval
  { id: 'g-006', facility: 'bs-atlanta',  type: 'update', title: 'Welcoming new customers', body: 'Brick & Stone Atlanta has 28 new families this month! Welcome.', publish: '2026-05-18 09:00', status: 'pending', image: 'community', cta: null, ai_drafted: true, confidence: 0.86 },
  { id: 'g-007', facility: 'royal-mini',  type: 'event',  title: 'Memorial Day community drive', body: 'Drop off non-perishable food this weekend — donations to Athens Food Bank.', publish: '2026-05-19 09:00', status: 'pending', image: 'community', cta: 'Details', ai_drafted: true, confidence: 0.78 },
  { id: 'g-008', facility: 'sunset-austin', type: 'offer', title: 'Boat storage referral bonus', body: 'Refer a friend, both get $50 off your next month.', publish: '2026-05-20 09:00', status: 'pending', image: 'boat', cta: 'Refer', ai_drafted: true, confidence: 0.91 },
  { id: 'g-009', facility: 'bs-conyers',  type: 'update', title: 'Spring clean tip',          body: 'Pro tip — label every box on TWO sides. You will thank yourself in 6 months.', publish: '2026-05-21 09:00', status: 'pending', image: 'tip', cta: null, ai_drafted: true, confidence: 0.82 },

  // Draft
  { id: 'g-010', facility: 'sunset-roundrock', type: 'offer', title: 'Round Rock RV special', body: 'New oversized bays now open — 12 spots only.', publish: null, status: 'draft' },
];

window.GBP_APPROVAL_QUEUE = window.GBP_POSTS.filter(p => p.status === 'pending');

window.GBP_INSIGHTS = {
  totalCalls: 1247,
  callsDelta: 0.18,
  totalDirections: 3211,
  directionsDelta: 0.09,
  totalWebsiteClicks: 2188,
  websiteDelta: 0.22,
  discoveryVsDirect: { discovery: 64, direct: 36 },
  topQueries: [
    { kw: 'athens storage', impressions: 4112, clicks: 318 },
    { kw: 'self storage athens', impressions: 2890, clicks: 241 },
    { kw: 'storage units near me', impressions: 4480, clicks: 142 },
    { kw: 'climate controlled storage athens', impressions: 1278, clicks: 187 },
    { kw: 'cheap storage athens', impressions: 882, clicks: 98 },
    { kw: '24 hour storage athens', impressions: 612, clicks: 84 },
  ],
};

window.GBP_HEALTH = [
  { facility: 'bs-athens-2', status: 'suspended', detected: '2026-05-14 03:47 PKT', cause: 'NAP edit + category change in 24h window', steps_total: 12, steps_done: 3 },
  { facility: 'royal-mini',  status: 'at_risk',   detected: '2026-05-13 14:22 PKT', cause: 'Sudden citation churn (8 lost in 7 days)', steps_total: 8, steps_done: 2 },
];

window.GBP_PROFILE_FIELDS = {
  primaryCategory: 'Self-Storage Facility',
  secondaryCategories: ['RV Storage Facility','Boat Storage Facility','Automobile Storage Facility','Moving and Storage Service'],
  hours: [
    ['Monday',    '08:00 - 18:00'],
    ['Tuesday',   '08:00 - 18:00'],
    ['Wednesday', '08:00 - 18:00'],
    ['Thursday',  '08:00 - 18:00'],
    ['Friday',    '08:00 - 18:00'],
    ['Saturday',  '08:00 - 16:00'],
    ['Sunday',    'Closed (gate 24/7)'],
  ],
  attributes: ['Wheelchair accessible','Climate-controlled','24/7 gate access','Drive-up units','Online check-in','Credit cards','Mobile payments'],
  description: 'Brick & Stone Storage Athens 1 offers secure, climate-controlled and standard storage units in central Athens, GA. 24/7 gate access, online reservations, and friendly staff. Unit sizes from 5x5 to 20x20. Serving the University of Georgia community since 2018.',
  lastEdit: '2026-04-28',
  editCoolingDays: 5,
};
