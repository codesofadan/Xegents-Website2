window.CITATIONS = [
  // active
  { id: 'ct-001', facility: 'bs-athens-1', source: 'Yelp',             url: 'yelp.com/biz/brickandstone-athens', status: 'active', last_updated: '2026-05-14', dr: 92 },
  { id: 'ct-002', facility: 'bs-athens-1', source: 'Bing Places',      url: 'bing.com/maps/place/...',           status: 'active', last_updated: '2026-05-12', dr: 95 },
  { id: 'ct-003', facility: 'bs-athens-1', source: 'Apple Maps',       url: 'maps.apple.com/...',                status: 'active', last_updated: '2026-05-11', dr: 91 },
  { id: 'ct-004', facility: 'bs-athens-1', source: 'Foursquare',       url: 'foursquare.com/v/...',              status: 'active', last_updated: '2026-05-08', dr: 88 },
  { id: 'ct-005', facility: 'bs-athens-1', source: 'Facebook Places',  url: 'facebook.com/brickandstoneathens',  status: 'active', last_updated: '2026-05-09', dr: 96 },
  { id: 'ct-006', facility: 'bs-athens-1', source: 'Data Axle',        url: 'data-axle.com/listing/...',         status: 'active', last_updated: '2026-04-28', dr: 78 },
  { id: 'ct-007', facility: 'bs-athens-1', source: 'BBB',              url: 'bbb.org/us/ga/athens/...',          status: 'active', last_updated: '2026-04-15', dr: 89 },
  { id: 'ct-008', facility: 'bs-athens-1', source: 'Manta',            url: 'manta.com/c/...',                   status: 'active', last_updated: '2026-04-12', dr: 71 },

  // NAP drift
  { id: 'ct-101', facility: 'bs-athens-1', source: 'YellowPages.com',  url: 'yellowpages.com/athens-ga/...',     status: 'nap_drift', last_updated: '2026-03-04', dr: 79, drift_field: 'phone' },
  { id: 'ct-102', facility: 'bs-athens-1', source: 'Citysearch',       url: 'citysearch.com/profile/...',        status: 'nap_drift', last_updated: '2026-02-12', dr: 72, drift_field: 'address' },

  // pending
  { id: 'ct-201', facility: 'bs-athens-1', source: 'SpareFoot',        url: '—', status: 'pending', last_updated: '2026-05-01', dr: 81, submitted: '2026-05-01' },
  { id: 'ct-202', facility: 'bs-athens-1', source: 'StorageFront',     url: '—', status: 'pending', last_updated: '2026-05-05', dr: 76, submitted: '2026-05-05' },

  // missing
  { id: 'ct-301', facility: 'bs-athens-1', source: 'SelfStorage.com',  url: '—', status: 'missing', dr: 84 },
  { id: 'ct-302', facility: 'bs-athens-1', source: 'StorageTreasures', url: '—', status: 'missing', dr: 72 },
  { id: 'ct-303', facility: 'bs-athens-1', source: 'iStorage.com',     url: '—', status: 'missing', dr: 71 },
];

window.NAP_MASTER = {
  name: 'Brick & Stone Storage Athens 1',
  address_line1: '1247 Atlanta Hwy',
  city: 'Athens',
  state: 'GA',
  zip: '30606',
  phone: '+1 (706) 555-1100',
  website: 'https://brickandstone.com/athens-1',
  hours: 'Mon-Fri 8am-6pm, Sat 8am-4pm, Sun Closed',
};

window.FEATURED_PITCH_QUEUE = [
  { id: 'fp-001', query: 'Self-storage trends for Q3 2026 — what should small operators know?',  expert_needed: 'SEO/storage expert', deadline: '2026-05-16', ai_draft: 'As an SEO expert who works with 15+ self-storage facilities, I see three trends shaping Q3 2026: AI-driven content saturation pushing GBP signals (reviews + posts) to matter more, climate-controlled demand outpacing standard for the first time, and Google\'s December 2025 update rewarding first-hand expertise in local content.', confidence: 0.92, status: 'pending' },
  { id: 'fp-002', query: 'How to choose a self-storage facility — what should I look for?', expert_needed: 'storage/consumer expert', deadline: '2026-05-16', ai_draft: 'When choosing storage, prioritize 24/7 gate access, climate control if you are storing electronics or wood furniture, and online reservations so you can avoid the office wait. Check reviews from the last 90 days specifically — older reviews can mask recent management changes.', confidence: 0.88, status: 'pending' },
  { id: 'fp-003', query: 'RV storage for boats — what features matter most?', expert_needed: 'RV/boat expert', deadline: '2026-05-17', ai_draft: 'RV owners storing boats need covered or enclosed bays at minimum (UV damage is the silent killer), 30 or 50 amp power for trickle charging, water access for rinse-down, and a wide-bay turning radius. Outdoor uncovered is fine for short-term but not for off-season.', confidence: 0.79, status: 'review_needed' },
  { id: 'fp-004', query: 'Best places to store seasonal items in a hot climate?', expert_needed: 'storage expert', deadline: '2026-05-18', ai_draft: 'In hot climates, climate-controlled is non-negotiable for photos, electronics, leather furniture, and musical instruments. Standard units are fine for plastic bins, garden tools, and metal items. Aim for facilities that keep temps 55-85°F year-round.', confidence: 0.84, status: 'pending' },
  { id: 'fp-005', query: 'Tips for organizing a self-storage unit',                  expert_needed: 'organization expert', deadline: '2026-05-19', ai_draft: 'Build an aisle down the middle of your unit. Label every box on TWO sides. Put items you might need within 6 months at the front. Keep an inventory list taped to the back of the door.', confidence: 0.86, status: 'pending' },
];

window.BACKLINKS = [
  { id: 'bl-001', from: 'athenslocalnews.com',   anchor: 'Brick & Stone Storage Athens', to: 'brickandstone.com/athens-1', dr: 71, follow: true,  new: true,  date: '2026-05-13' },
  { id: 'bl-002', from: 'rvtravel.com',          anchor: 'RV storage in Austin',         to: 'sunset-rv.com/austin',       dr: 76, follow: true,  new: true,  date: '2026-05-11' },
  { id: 'bl-003', from: 'georgiabusiness.com',   anchor: 'storage facility',             to: 'brickandstone.com',          dr: 64, follow: true,  new: true,  date: '2026-05-09' },
  { id: 'bl-004', from: 'movingmadeeasy.com',    anchor: 'storage options Atlanta',      to: 'brickandstone.com/atlanta',  dr: 58, follow: true,  new: false, date: '2026-05-02' },
  { id: 'bl-005', from: 'spammydirectory.net',   anchor: 'click here',                   to: 'royalmini.com',              dr: 12, follow: false, new: true,  date: '2026-05-08', toxic: true },
];

window.ANCHOR_DISTRIBUTION = [
  { label: 'Brand', pct: 48, color: '#6366f1' },
  { label: 'URL', pct: 18, color: '#0ea5e9' },
  { label: 'Generic', pct: 14, color: '#94a3b8' },
  { label: 'Partial match', pct: 12, color: '#f59e0b' },
  { label: 'Exact match', pct: 5, color: '#ef4444' },
  { label: 'Image', pct: 3, color: '#10b981' },
];
