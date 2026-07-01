window.REVIEWS = [
  { id: 'r-001', facility: 'bs-athens-1', stars: 5, author: 'Janet K.', date: '2026-05-14 09:22', body: 'Super clean facility. Khizer set me up with a 5x10 unit and the access codes worked first try. Climate-controlled section is genuinely cool.', sentiment: 'positive', status: 'pending', ai_reply: 'Thank you so much, Janet! We are so glad Khizer made your move-in smooth. Welcome to the Brick & Stone family — please reach out if you need anything.', sla_due: '24h', kw_tags: ['climate-controlled','access','clean'] },
  { id: 'r-002', facility: 'royal-mini', stars: 1, author: 'Bryan T.', date: '2026-05-13 18:05', body: 'Gate was broken for 3 days. Manager never returned my calls. Considering moving my stuff elsewhere.', sentiment: 'negative', status: 'pending', ai_reply: 'Bryan, this is not the standard we hold ourselves to. I would like to make this right. Please call me directly at (404) 555-0114 today — I will personally make sure the gate issue and your communication concerns are resolved within 24 hours.\n\n— Lakshmi, Royal Mini Storage', sla_due: '6h', kw_tags: ['gate','manager','communication'], priority: true, sla_breach: false },
  { id: 'r-003', facility: 'star-athens', stars: 5, author: 'Marco V.', date: '2026-05-13 14:11', body: 'Helpful staff, easy reservation online. Athens location is super convenient off Hawthorne.', sentiment: 'positive', status: 'replied', kw_tags: ['staff','online','location'] },
  { id: 'r-004', facility: 'bs-atlanta', stars: 4, author: 'Tasha W.', date: '2026-05-12 21:48', body: 'Mostly great, but the elevator was out one day. Otherwise no complaints.', sentiment: 'neutral', status: 'pending', ai_reply: 'Tasha, thank you for the honest feedback. The elevator issue was resolved within 24 hours and we have added a daily inspection step. We appreciate your patience.', sla_due: '24h', kw_tags: ['elevator','responsive'] },
  { id: 'r-005', facility: 'sunset-austin', stars: 5, author: 'Pete L.', date: '2026-05-12 11:30', body: 'Perfect for my Class A motorhome. Wide bays, well-lit, easy in and out.', sentiment: 'positive', status: 'replied', kw_tags: ['motorhome','wide','lit'] },
  { id: 'r-006', facility: 'bs-athens-1', stars: 5, author: 'Audrey S.', date: '2026-05-11 16:00', body: 'Khizer answered all my questions about climate-controlled. Stayed late to give a tour.', sentiment: 'positive', status: 'replied', kw_tags: ['khizer','climate-controlled','tour'] },
  { id: 'r-007', facility: 'royal-mini', stars: 2, author: 'Diane M.', date: '2026-05-11 09:14', body: 'Pricing is fine but the office is rarely staffed. Hard to talk to a person.', sentiment: 'negative', status: 'replied', kw_tags: ['office','staffing'] },
  { id: 'r-008', facility: 'star-athens', stars: 5, author: 'Quentin B.', date: '2026-05-10 13:42', body: 'Athens area best storage value. Booked online in 4 minutes.', sentiment: 'positive', status: 'replied', kw_tags: ['value','online'] },
  { id: 'r-009', facility: 'bs-atlanta', stars: 5, author: 'Lin H.', date: '2026-05-10 08:11', body: 'Booked a 10x10 climate unit. Easy and professional. Will recommend.', sentiment: 'positive', status: 'replied', kw_tags: ['climate-controlled','professional'] },
  { id: 'r-010', facility: 'sunset-roundrock', stars: 4, author: 'Cole T.', date: '2026-05-09 19:55', body: 'Great covered boat spot. Slight delay on getting access code first day.', sentiment: 'neutral', status: 'replied', kw_tags: ['covered','boat','access'] },
];

window.REVIEW_VELOCITY = [
  { facility: 'bs-athens-1',  w7: 4, w30: 18, target: 4.0, status: 'on'  },
  { facility: 'bs-athens-2',  w7: 0, w30: 4,  target: 3.0, status: 'breach' },
  { facility: 'bs-atlanta',   w7: 5, w30: 22, target: 5.0, status: 'on'  },
  { facility: 'star-athens',  w7: 5, w30: 21, target: 5.0, status: 'on'  },
  { facility: 'royal-mini',   w7: 1, w30: 4,  target: 3.0, status: 'breach' },
  { facility: 'royal-loganville', w7: 2, w30: 10, target: 3.0, status: 'risk' },
  { facility: 'royal-monroe', w7: 1, w30: 6, target: 3.0, status: 'risk' },
  { facility: 'sunset-austin', w7: 6, w30: 24, target: 5.0, status: 'on' },
  { facility: 'sunset-roundrock', w7: 3, w30: 14, target: 4.0, status: 'on' },
  { facility: 'sunset-georgetown', w7: 2, w30: 9, target: 3.0, status: 'on' },
  { facility: 'sunset-cedar', w7: 2, w30: 8, target: 3.0, status: 'on' },
  { facility: 'bs-conyers',   w7: 4, w30: 17, target: 4.0, status: 'on' },
  { facility: 'bs-loganville', w7: 3, w30: 13, target: 4.0, status: 'risk' },
  { facility: 'bs-watkinsville', w7: 2, w30: 9, target: 3.0, status: 'on' },
  { facility: 'bs-bogart', w7: 1, w30: 5, target: 3.0, status: 'risk' },
];

window.SENTIMENT_TRENDS = {
  positive: [82, 84, 80, 85, 87, 86, 88, 85, 87, 90, 88, 91],
  neutral:  [12, 10, 14, 9, 8, 9, 8, 11, 8, 6, 7, 5],
  negative: [6, 6, 6, 6, 5, 5, 4, 4, 5, 4, 5, 4],
};
