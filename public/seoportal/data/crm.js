/* ============================================================
   CRM & Sales macro seed. New-business pipeline for GrowthBoost
   (the agency winning new retainer clients) plus inbound leads,
   contacts, deals and a sales forecast.
   Deals are GrowthBoost prospects, not the existing 6 clients.
   One data object feeds all five sub-modules:
     crm           (Pipeline board)
     crm.leads     (Leads list)
     crm.contacts  (Contacts list)
     crm.deals     (Deals list)
     crm.forecast  (Forecast console)
   Dated relative to window.TODAY (2026-06-26).
   ============================================================ */

window.CRM = {

  // Top-of-funnel summary numbers (rendered as quiet inline stat rails).
  kpis: {
    openDeals: 17,
    openDealsDelta: 6.0,
    pipelineUsd: 318000,
    pipelineDelta: 14.2,
    weightedUsd: 196400,
    winRate: 62,
    winRateDelta: 3.0,
    newLeads: 22,
    newLeadsDelta: 18.0,
    avgDealUsd: 5900,
    avgDealDelta: 4.4,
  },

  // Pipeline stages, in order. The board renders these as columns.
  stages: [
    { id: 'new',         label: 'New lead',    dot: 'slate' },
    { id: 'qualified',   label: 'Qualified',   dot: 'sky' },
    { id: 'proposal',    label: 'Proposal',    dot: 'violet' },
    { id: 'negotiation', label: 'Negotiation', dot: 'amber' },
    { id: 'won',         label: 'Won',         dot: 'green' },
  ],

  // Lost footer line (not a board column).
  lostMTD: 11,
  lostValueUsd: 71000,

  // ---- Deal cards. owner -> window.TEAM id. score = lead score 0-100. ----
  // expClose -> daysAhead, risk -> short reason string when flagged.
  deals: [
    { id: 'd-601', company: 'Brightway Orthodontics',     value: 7800,  owner: 't-omar',   source: 'GBP',          stage: 'new',         daysInStage: 2,  score: 88, expClose: 26 },
    { id: 'd-602', company: 'Coastal HVAC Group',         value: 4200,  owner: 't-dana',   source: 'Landing page', stage: 'new',         daysInStage: 1,  score: 74, expClose: 30 },
    { id: 'd-603', company: 'Maple Leaf Pediatrics',      value: 3600,  owner: 't-omar',   source: 'Referral',     stage: 'new',         daysInStage: 4,  score: 81, expClose: 24 },
    { id: 'd-604', company: 'Urban Threads Apparel',      value: 9200,  owner: 't-khizer', source: 'Paid ad',      stage: 'new',         daysInStage: 6,  score: 63, expClose: 33 },

    { id: 'd-605', company: 'Summit Physical Therapy',    value: 5400,  owner: 't-omar',   source: 'Referral',     stage: 'qualified',   daysInStage: 3,  score: 91, expClose: 18 },
    { id: 'd-606', company: 'Greenline Landscaping',      value: 3900,  owner: 't-sara',   source: 'GBP',          stage: 'qualified',   daysInStage: 8,  score: 77, expClose: 21 },
    { id: 'd-607', company: 'Nimbus Cloud Tools',         value: 8800,  owner: 't-dana',   source: 'Landing page', stage: 'qualified',   daysInStage: 5,  score: 84, expClose: 16 },

    { id: 'd-608', company: 'Harbor Point Dental',        value: 6700,  owner: 't-omar',   source: 'GBP',          stage: 'proposal',    daysInStage: 7,  score: 86, expClose: 12 },
    { id: 'd-609', company: 'Velocity Auto Detailing',    value: 4100,  owner: 't-khizer', source: 'Paid ad',      stage: 'proposal',    daysInStage: 12, score: 69, expClose: 9,  risk: 'No reply 9 days, opened proposal twice but silent' },
    { id: 'd-610', company: 'Lakeside Wellness Spa',      value: 5200,  owner: 't-aimen',  source: 'Referral',     stage: 'proposal',    daysInStage: 4,  score: 82, expClose: 14 },

    { id: 'd-611', company: 'Forge Industrial Supply',    value: 11200, owner: 't-dana',   source: 'Landing page', stage: 'negotiation', daysInStage: 6,  score: 90, expClose: 8 },
    { id: 'd-612', company: 'Sunrise Family Clinic',      value: 4800,  owner: 't-omar',   source: 'GBP',          stage: 'negotiation', daysInStage: 15, score: 72, expClose: 5,  risk: 'Pushing for 20% discount, champion went quiet' },
    { id: 'd-613', company: 'Pinnacle Realty Group',      value: 6300,  owner: 't-sara',   source: 'Referral',     stage: 'negotiation', daysInStage: 9,  score: 85, expClose: 7 },

    { id: 'd-614', company: 'Evergreen Pediatric Dental', value: 7100,  owner: 't-omar',   source: 'Referral',     stage: 'won',         daysInStage: 1,  score: 94, expClose: 0 },
    { id: 'd-615', company: 'Metro Fitness Collective',   value: 5600,  owner: 't-khizer', source: 'Paid ad',      stage: 'won',         daysInStage: 2,  score: 89, expClose: 0 },
    { id: 'd-616', company: 'Cedar & Co Roasters',        value: 3400,  owner: 't-aimen',  source: 'GBP',          stage: 'won',         daysInStage: 3,  score: 87, expClose: 0 },
    { id: 'd-617', company: 'Northwind Logistics',        value: 8400,  owner: 't-dana',   source: 'Landing page', stage: 'won',         daysInStage: 4,  score: 92, expClose: 0 },
  ],

  // ---- Leads inbox. score 0-100, status drives a small pill. ----
  // days -> daysAgo(days) for created date.
  leads: [
    { id: 'l-701', name: 'Dr. Alan Briggs',  company: 'Brightway Orthodontics',  source: 'GBP',          score: 88, owner: 't-omar',   status: 'new',       days: 0 },
    { id: 'l-702', name: 'Maria Delgado',     company: 'Coastal HVAC Group',      source: 'Landing page', score: 74, owner: 't-dana',   status: 'contacted', days: 1 },
    { id: 'l-703', name: 'James Whitfield',   company: 'Summit Physical Therapy', source: 'Referral',     score: 91, owner: 't-omar',   status: 'qualified', days: 1 },
    { id: 'l-704', name: 'Priya Anand',       company: 'Nimbus Cloud Tools',      source: 'Landing page', score: 84, owner: 't-dana',   status: 'contacted', days: 2 },
    { id: 'l-705', name: 'Tom Becker',        company: 'Urban Threads Apparel',   source: 'Paid ad',      score: 63, owner: 't-khizer', status: 'new',       days: 2 },
    { id: 'l-706', name: 'Sandra Liu',        company: 'Greenline Landscaping',   source: 'GBP',          score: 77, owner: 't-sara',   status: 'qualified', days: 3 },
    { id: 'l-707', name: 'Derek Olsen',       company: 'Forge Industrial Supply', source: 'Landing page', score: 90, owner: 't-dana',   status: 'qualified', days: 3 },
    { id: 'l-708', name: 'Nadia Karim',       company: 'Lakeside Wellness Spa',   source: 'Referral',     score: 82, owner: 't-aimen',  status: 'contacted', days: 4 },
    { id: 'l-709', name: 'Carlos Mendes',     company: 'Velocity Auto Detailing', source: 'Paid ad',      score: 69, owner: 't-khizer', status: 'stalled',   days: 9 },
    { id: 'l-710', name: 'Hannah Cole',       company: 'Pinnacle Realty Group',   source: 'Referral',     score: 85, owner: 't-sara',   status: 'qualified', days: 5 },
    { id: 'l-711', name: 'Owen Frasier',      company: 'Harbor Point Dental',     source: 'GBP',          score: 86, owner: 't-omar',   status: 'contacted', days: 4 },
    { id: 'l-712', name: 'Renee Castillo',    company: 'Forge Industrial Supply', source: 'Referral',     score: 79, owner: 't-dana',   status: 'qualified', days: 6 },
    { id: 'l-713', name: 'Devon Wright',      company: 'Apex Roofing Co',         source: 'Paid ad',      score: 58, owner: 't-khizer', status: 'new',       days: 1 },
    { id: 'l-714', name: 'Grace Holloway',    company: 'Bloom Florist Studio',    source: 'GBP',          score: 71, owner: 't-sara',   status: 'contacted', days: 2 },
    { id: 'l-715', name: 'Marcus Tan',        company: 'Drift Coffee Roasters',   source: 'Referral',     score: 83, owner: 't-aimen',  status: 'qualified', days: 3 },
    { id: 'l-716', name: 'Bethany Cruz',      company: 'Sunset Dermatology',      source: 'Landing page', score: 80, owner: 't-omar',   status: 'contacted', days: 5 },
    { id: 'l-717', name: 'Ravi Mehta',        company: 'Quantum Dental Labs',     source: 'GBP',          score: 76, owner: 't-dana',   status: 'new',       days: 1 },
    { id: 'l-718', name: 'Janet Cho',         company: 'Riverside Yoga Studio',   source: 'Paid ad',      score: 49, owner: 't-khizer', status: 'stalled',   days: 12 },
    { id: 'l-719', name: 'Felix Romero',      company: 'Granite Kitchen & Bath',  source: 'Referral',     score: 87, owner: 't-sara',   status: 'qualified', days: 2 },
    { id: 'l-720', name: 'Wendy Park',        company: 'Lumen Eye Care',          source: 'GBP',          score: 84, owner: 't-omar',   status: 'contacted', days: 4 },
    { id: 'l-721', name: 'Andre Dawson',      company: 'Titan Moving Co',         source: 'Landing page', score: 66, owner: 't-dana',   status: 'new',       days: 0 },
    { id: 'l-722', name: 'Lena Petrov',       company: 'Aurora Med Spa',          source: 'Referral',     score: 81, owner: 't-aimen',  status: 'contacted', days: 6 },
  ],

  // ---- Contacts. company, title, email, phone, last touch, source. ----
  // days -> daysAgo(days) for last-touch. openDeals = active deals on record.
  contacts: [
    { id: 'c-801', name: 'Derek Olsen',     title: 'VP Marketing',       company: 'Forge Industrial Supply', email: 'd.olsen@forgeindustrial.com',    phone: '+1 (414) 555-0182', owner: 't-dana',   dealId: 'd-611', openDeals: 1, days: 1,  enriched: 'Clearbit' },
    { id: 'c-802', name: 'Dr. Alan Briggs', title: 'Practice Owner',     company: 'Brightway Orthodontics',  email: 'a.briggs@brightwayortho.com',    phone: '+1 (303) 555-0147', owner: 't-omar',   dealId: 'd-601', openDeals: 1, days: 1,  enriched: 'Apollo' },
    { id: 'c-803', name: 'James Whitfield', title: 'Clinic Director',    company: 'Summit Physical Therapy', email: 'james@summitpt.health',          phone: '+1 (720) 555-0193', owner: 't-omar',   dealId: 'd-605', openDeals: 1, days: 0,  enriched: 'LinkedIn' },
    { id: 'c-804', name: 'Priya Anand',     title: 'Head of Growth',     company: 'Nimbus Cloud Tools',      email: 'priya@nimbuscloud.io',           phone: '+1 (415) 555-0166', owner: 't-dana',   dealId: 'd-607', openDeals: 1, days: 2,  enriched: 'Clearbit' },
    { id: 'c-805', name: 'Maria Delgado',   title: 'Operations Lead',    company: 'Coastal HVAC Group',      email: 'mdelgado@coastalhvac.com',       phone: '+1 (619) 555-0124', owner: 't-dana',   dealId: 'd-602', openDeals: 1, days: 2,  enriched: 'Apollo' },
    { id: 'c-806', name: 'Sandra Liu',      title: 'Founder',            company: 'Greenline Landscaping',   email: 'sandra@greenlinescapes.com',     phone: '+1 (206) 555-0178', owner: 't-sara',   dealId: 'd-606', openDeals: 1, days: 3,  enriched: 'GBP profile' },
    { id: 'c-807', name: 'Nadia Karim',     title: 'GM',                 company: 'Lakeside Wellness Spa',   email: 'nadia@lakesidespa.com',          phone: '+1 (480) 555-0139', owner: 't-aimen',  dealId: 'd-610', openDeals: 1, days: 4,  enriched: 'Apollo' },
    { id: 'c-808', name: 'Hannah Cole',     title: 'Broker / Owner',     company: 'Pinnacle Realty Group',   email: 'hcole@pinnaclerealty.com',       phone: '+1 (512) 555-0155', owner: 't-sara',   dealId: 'd-613', openDeals: 1, days: 5,  enriched: 'LinkedIn' },
    { id: 'c-809', name: 'Carlos Mendes',   title: 'Owner',              company: 'Velocity Auto Detailing', email: 'carlos@velocitydetail.com',      phone: '+1 (305) 555-0112', owner: 't-khizer', dealId: 'd-609', openDeals: 1, days: 9,  enriched: 'Paid ad form' },
    { id: 'c-810', name: 'Tom Becker',      title: 'Marketing Manager',  company: 'Urban Threads Apparel',   email: 't.becker@urbanthreads.co',       phone: '+1 (212) 555-0171', owner: 't-khizer', dealId: 'd-604', openDeals: 1, days: 2,  enriched: 'Clearbit' },
    { id: 'c-811', name: 'Renee Castillo',  title: 'CFO',                company: 'Forge Industrial Supply', email: 'r.castillo@forgeindustrial.com', phone: '+1 (414) 555-0188', owner: 't-dana',   dealId: 'd-611', openDeals: 1, days: 3,  enriched: 'Manual' },
    { id: 'c-812', name: 'Owen Frasier',    title: 'Director of Ops',    company: 'Harbor Point Dental',     email: 'owen@harborpointdental.com',     phone: '+1 (617) 555-0109', owner: 't-omar',   dealId: 'd-608', openDeals: 1, days: 4,  enriched: 'Apollo' },
    { id: 'c-813', name: 'Marcus Tan',      title: 'Co-founder',         company: 'Drift Coffee Roasters',   email: 'marcus@driftroasters.com',       phone: '+1 (503) 555-0166', owner: 't-aimen',  dealId: 'd-616', openDeals: 1, days: 3,  enriched: 'Referral' },
    { id: 'c-814', name: 'Felix Romero',    title: 'Owner',              company: 'Granite Kitchen & Bath',  email: 'felix@granitekb.com',            phone: '+1 (480) 555-0190', owner: 't-sara',   dealId: 'd-719', openDeals: 0, days: 2,  enriched: 'Referral' },
    { id: 'c-815', name: 'Wendy Park',      title: 'Practice Manager',   company: 'Lumen Eye Care',          email: 'wendy@lumeneye.com',             phone: '+1 (408) 555-0133', owner: 't-omar',   dealId: 'd-720', openDeals: 0, days: 4,  enriched: 'GBP profile' },
    { id: 'c-816', name: 'Lena Petrov',     title: 'Director',           company: 'Aurora Med Spa',          email: 'lena@auroramedspa.com',          phone: '+1 (602) 555-0177', owner: 't-aimen',  dealId: 'd-722', openDeals: 0, days: 6,  enriched: 'Apollo' },
  ],

  // ---- Hero deal for the board detail drawer (d-611). ----
  heroDeal: {
    id: 'd-611',
    company: 'Forge Industrial Supply',
    vertical: 'Industrial B2B distribution',
    valueUsd: 11200,
    contractUsd: 134400,
    owner: 't-dana',
    source: 'Landing page',
    score: 90,
    stage: 'negotiation',
    closeProbability: 70,
    expectedCloseDays: 8,
    contact: {
      name: 'Derek Olsen',
      title: 'VP Marketing',
      email: 'd.olsen@forgeindustrial.com',
      phone: '+1 (414) 555-0182',
      linkedin: 'in/derek-olsen-forge',
      location: 'Milwaukee, WI',
    },
    economicBuyer: { name: 'Renee Castillo', title: 'CFO' },
    history: [
      { stage: 'New lead',    daysAgo: 41, note: 'Inbound demo request from pricing page', durationDays: 5 },
      { stage: 'Qualified',   daysAgo: 36, note: 'Discovery call - 6 locations, $2.1M ad budget', durationDays: 14 },
      { stage: 'Proposal',    daysAgo: 22, note: 'Sent multi-location SEO + paid retainer proposal', durationDays: 16 },
      { stage: 'Negotiation', daysAgo: 6,  note: 'Aligning on 12-mo term and onboarding timeline', durationDays: null },
    ],
    nextSteps: [
      { text: 'Send redlined MSA with 12-mo term and Net-15 billing', confidence: 91, owner: 't-dana', due: 1 },
      { text: 'Loop in CFO Renee Castillo on the ROI model before sign-off', confidence: 84, owner: 't-dana', due: 2 },
      { text: 'Book onboarding kickoff for the week of close to lock momentum', confidence: 88, owner: 't-dana', due: 4 },
    ],
    summary: 'Strong fit: multi-location industrial distributor, real ad budget, motivated VP champion. Only open risk is CFO sign-off on term length. Close probability 70% within 8 days if the MSA lands this week.',
  },

  // ---- Forecast console data ----
  forecast: {
    // New MRR added by month. committed <= bestCase <= pipeline.
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    committed: [21000, 24000, 27500, 31000, 30000, 28000],
    bestCase:  [21000, 24000, 27500, 44000, 48000, 52000],
    pipeline:  [21000, 24000, 27500, 71000, 86000, 98000],
    quotaMonthly: 35000,

    // Roll-up of the three scenarios for the current quarter.
    committedUsd: 86500,
    bestCaseUsd: 144000,
    pipelineUsd: 255000,

    // Weighted pipeline by stage. weighted = value * probability.
    byStage: [
      { stage: 'New lead',    deals: 4, valueUsd: 24800,  prob: 12, color: '#565659' },
      { stage: 'Qualified',   deals: 3, valueUsd: 18100,  prob: 30, color: '#38bdf8' },
      { stage: 'Proposal',    deals: 3, valueUsd: 16000,  prob: 55, color: '#a78bfa' },
      { stage: 'Negotiation', deals: 3, valueUsd: 22300,  prob: 72, color: '#f59e0b' },
      { stage: 'Won',         deals: 4, valueUsd: 24500,  prob: 100, color: '#10b981' },
    ],

    // Forecast by owner. quota + committed + bestCase (monthly new MRR).
    byOwner: [
      { owner: 't-dana',   open: 3, committedUsd: 19600, bestCaseUsd: 32400, quotaUsd: 30000, winRate: 64 },
      { owner: 't-omar',   open: 5, committedUsd: 16900, bestCaseUsd: 28800, quotaUsd: 28000, winRate: 71 },
      { owner: 't-sara',   open: 3, committedUsd: 12600, bestCaseUsd: 18900, quotaUsd: 22000, winRate: 58 },
      { owner: 't-khizer', open: 3, committedUsd: 9700,  bestCaseUsd: 14300, quotaUsd: 20000, winRate: 41 },
      { owner: 't-aimen',  open: 2, committedUsd: 8600,  bestCaseUsd: 12600, quotaUsd: 16000, winRate: 55 },
    ],

    // Trailing 6-month win-rate trend (%).
    winRateTrend: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [44, 49, 53, 55, 58, 62] },
  },

  // Win/loss roll-up (annualized booked / forfeited).
  winLoss: {
    wonCount: 18,
    lostCount: 11,
    wonValueUsd: 1142000,
    lostValueUsd: 681000,
    winRatePct: 62,
    lossReasons: [
      { reason: 'Price / budget',        count: 4, color: '#f43f5e', note: 'Lost on monthly rate vs cheaper freelancers' },
      { reason: 'Built in-house',        count: 3, color: '#f59e0b', note: 'Prospect hired internal marketer instead' },
      { reason: 'Chose competitor',      count: 2, color: '#a78bfa', note: 'Went with an incumbent agency' },
      { reason: 'No decision / ghosted', count: 2, color: '#38bdf8', note: 'Stalled, never re-engaged' },
    ],
  },

  // Lead-source ROI - spend, CAC, closed revenue, payback by channel.
  sourceRoi: [
    { source: 'Referral',     deals: 15, won: 7, spendUsd: 4200,  cacUsd: 600,   closedRevUsd: 411600, roi: 98.0, paybackDays: 11, trend: 11 },
    { source: 'GBP',          deals: 19, won: 8, spendUsd: 9800,  cacUsd: 1225,  closedRevUsd: 408000, roi: 41.6, paybackDays: 19, trend: 6 },
    { source: 'Landing page', deals: 12, won: 4, spendUsd: 16400, cacUsd: 4100,  closedRevUsd: 285600, roi: 17.4, paybackDays: 34, trend: -3 },
    { source: 'Paid ad',      deals: 8,  won: 2, spendUsd: 21200, cacUsd: 10600, closedRevUsd: 124800, roi: 5.9,  paybackDays: 61, trend: -8 },
  ],

  // Deals-at-risk (surfaced on the board for the team to act on).
  atRisk: [
    { id: 'd-609', company: 'Velocity Auto Detailing', value: 4100, reason: 'Opened proposal twice but silent 9 days. Engagement decaying.', action: 'Send breakup email' },
    { id: 'd-612', company: 'Sunrise Family Clinic',   value: 4800, reason: 'Champion went quiet after a 20% discount ask. Stalled at 15 days in stage.', action: 'Loop in economic buyer' },
    { id: 'd-616', company: 'Cedar & Co Roasters',     value: 3400, reason: 'Won but onboarding kickoff not booked - risk of slow start.', action: 'Book kickoff' },
  ],

  // Recent sales activity feed. days -> daysAgo(days).
  activity: [
    { who: 't-omar',   type: 'won',       text: 'Closed Evergreen Pediatric Dental - $7,100/mo retainer', days: 0 },
    { who: 't-dana',   type: 'proposal',  text: 'Sent proposal to Forge Industrial Supply ($11,200/mo)',   days: 0 },
    { who: 't-omar',   type: 'meeting',   text: 'Discovery call booked with Brightway Orthodontics',       days: 1 },
    { who: 't-khizer', type: 'won',       text: 'Closed Metro Fitness Collective - $5,600/mo',              days: 1 },
    { who: 't-sara',   type: 'note',      text: 'Pinnacle Realty asked for a case study, sent dental one',  days: 2 },
    { who: 't-dana',   type: 'qualified', text: 'Qualified Nimbus Cloud Tools after demo',                  days: 2 },
    { who: 't-aimen',  type: 'lost',      text: 'Lost Riverside Yoga Studio - went with in-house',          days: 3 },
  ],
};
