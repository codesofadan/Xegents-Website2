// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Social Media macro - seed data. window.SOCIAL.
//    Holds data for ALL social sub-modules:
//    Overview (console), Calendar (grid), Composer (workspace),
//    Inbox (split), Listening (dense list), Analytics (console).
//
//    Networks: instagram, facebook, linkedin, tiktok, youtube, gbp.
//    Client ids reuse window.CLIENTS.
//    ============================================================ */
//
// window.SOCIAL = {
//
//   // --- KPI rail (overview header - quiet inline stats, no cards) ---
//   kpis: {
//     reachMtd:        { value: 624000, delta: 12.4, better: true },  // total reach MTD
//     engagementRate:  { value: 4.8,   delta: 0.6,  better: true },   // %
//     scheduledWeek:   { value: 31,    delta: 7,    better: true },   // posts scheduled this week
//     followerGrowth:  { value: 6210,  delta: 18.2, better: true },   // net new followers MTD
//     inboxUnread:     { value: 23,    delta: -9,   better: true },   // unread DMs + comments (lower is better)
//   },
//
//   // Network registry - icon maps to a lucide glyph, color is a status-dot only.
//   // tiktok uses the 'music' icon. gbp = Google Business posts.
//   networks: {
//     instagram: { label: 'Instagram', icon: 'instagram', color: '#a78bfa' },
//     facebook:  { label: 'Facebook',  icon: 'facebook',  color: '#38bdf8' },
//     linkedin:  { label: 'LinkedIn',  icon: 'linkedin',  color: '#38bdf8' },
//     tiktok:    { label: 'TikTok',    icon: 'music',     color: '#a78bfa' },
//     youtube:   { label: 'YouTube',   icon: 'youtube',   color: '#f43f5e' },
//     gbp:       { label: 'Google Business', icon: 'map-pin', color: '#10b981' },
//   },
//
//   // --- Per-network performance (overview console panel) ---
//   // followers in thousands of the managed book; reach MTD; eng rate; net new.
//   networkPerf: [
//     { id: 'instagram', followersK: 248, reachMtd: 286000, eng: 5.4, netNew: 2840, posts: 62, spark: [40, 42, 41, 45, 47, 46, 52, 55] },
//     { id: 'tiktok',    followersK: 131, reachMtd: 198000, eng: 7.9, netNew: 2110, posts: 38, spark: [22, 26, 25, 31, 30, 36, 39, 44] },
//     { id: 'facebook',  followersK: 96,  reachMtd: 71000,  eng: 2.8, netNew: 410,  posts: 41, spark: [18, 17, 19, 18, 20, 19, 21, 22] },
//     { id: 'linkedin',  followersK: 54,  reachMtd: 38000,  eng: 4.1, netNew: 620,  posts: 27, spark: [9, 10, 11, 10, 12, 13, 12, 14] },
//     { id: 'youtube',   followersK: 38,  reachMtd: 22000,  eng: 3.6, netNew: 180,  posts: 9,  spark: [6, 6, 7, 7, 8, 8, 9, 9] },
//     { id: 'gbp',       followersK: 0,   reachMtd: 9000,   eng: 3.1, netNew: 50,   posts: 22, spark: [4, 4, 5, 5, 5, 6, 6, 6] },
//   ],
//
//   // --- Content calendar (full month grid) ---
//   // weekStartsMon. days carry posts: {clientId, network, time, status, caption}.
//   // status: published | scheduled | draft. We render a real month grid from
//   // these dated entries; days without entries still render as cells.
//   calendar: [
//     // This week, Mon-Sun (anchor dates), rich coverage.
//     { date: daysAgo(4), label: 'Mon', posts: [
//       { client: 'Casa Verde',      clientId: 'casaverde', network: 'instagram', time: '08:30', status: 'published', caption: 'Patio is open. Sunday brunch, wood-fired, two seatings.' },
//       { client: 'Peak Performance', clientId: 'peak',     network: 'tiktok',    time: '12:15', status: 'published', caption: '30-second mobility flow before leg day. Save this.' },
//       { client: 'Lumen Dental',     clientId: 'lumen',    network: 'gbp',       time: '16:00', status: 'published', caption: 'Now accepting new Invisalign patients in Plano.' },
//     ] },
//     { date: daysAgo(3), label: 'Tue', posts: [
//       { client: 'Verdant Skincare', clientId: 'verdant',  network: 'instagram', time: '09:00', status: 'published', caption: 'The 3-step barrier routine our dermatologist swears by.' },
//       { client: 'NorthEdge SaaS',   clientId: 'northedge', network: 'linkedin', time: '14:30', status: 'published', caption: 'How 40 PMs cut status-meeting time in half. Case study.' },
//       { client: 'Atlas Storage',    clientId: 'atlas',    network: 'facebook',  time: '17:00', status: 'published', caption: 'Climate-controlled units, first month free this June.' },
//     ] },
//     { date: daysAgo(2), label: 'Wed', posts: [
//       { client: 'Casa Verde',       clientId: 'casaverde', network: 'facebook', time: '11:00', status: 'published', caption: 'Midweek special: half-price carafes with any entree.' },
//       { client: 'Peak Performance', clientId: 'peak',     network: 'instagram', time: '17:45', status: 'published', caption: 'Member spotlight: Renee dropped her 5k by four minutes.' },
//       { client: 'Atlas Storage',    clientId: 'atlas',    network: 'gbp',       time: '10:00', status: 'published', caption: 'First month free on climate-controlled units this June.' },
//     ] },
//     { date: daysAgo(1), label: 'Thu', posts: [
//       { client: 'Verdant Skincare', clientId: 'verdant',  network: 'tiktok',    time: '08:45', status: 'published', caption: 'POV: your skin barrier finally calms down. 7-day diary.' },
//       { client: 'NorthEdge SaaS',   clientId: 'northedge', network: 'youtube',  time: '13:00', status: 'published', caption: 'Product walkthrough: the new sprint board, in 90 seconds.' },
//       { client: 'Lumen Dental',     clientId: 'lumen',    network: 'instagram', time: '18:30', status: 'published', caption: 'Five signs you might be grinding your teeth at night.' },
//     ] },
//     { date: daysAgo(0), label: 'Fri', today: true, posts: [
//       { client: 'Casa Verde',       clientId: 'casaverde', network: 'instagram', time: '12:00', status: 'scheduled', caption: 'Weekend menu drop. Chalkboard photo inside.' },
//       { client: 'Peak Performance', clientId: 'peak',     network: 'tiktok',    time: '16:30', status: 'scheduled', caption: 'Friday finisher: 4 rounds, no equipment, 8 minutes.' },
//       { client: 'Verdant Skincare', clientId: 'verdant',  network: 'facebook',  time: '19:00', status: 'scheduled', caption: 'Restock alert: the niacinamide serum is back in stock.' },
//     ] },
//     { date: daysAhead(1), label: 'Sat', posts: [
//       { client: 'Lumen Dental',     clientId: 'lumen',    network: 'gbp',       time: '09:30', status: 'scheduled', caption: 'Saturday emergency slots open. Call to reserve.' },
//       { client: 'Casa Verde',       clientId: 'casaverde', network: 'tiktok',   time: '11:30', status: 'scheduled', caption: 'Behind the pass: plating the heirloom tomato dish.' },
//     ] },
//     { date: daysAhead(2), label: 'Sun', posts: [
//       { client: 'Peak Performance', clientId: 'peak',     network: 'instagram', time: '08:00', status: 'scheduled', caption: 'Sunday reset: mobility, mindset, meal prep. Thread.' },
//       { client: 'NorthEdge SaaS',   clientId: 'northedge', network: 'linkedin', time: '15:00', status: 'scheduled', caption: 'The hidden cost of context-switching, in one chart.' },
//       { client: 'Verdant Skincare', clientId: 'verdant',  network: 'instagram', time: '18:00', status: 'scheduled', caption: 'User-generated: 6 weeks of before-and-after, real members.' },
//     ] },
//     // Prior week (published).
//     { date: daysAgo(11), label: 'Mon', posts: [
//       { client: 'Peak Performance', clientId: 'peak',     network: 'tiktok',    time: '12:00', status: 'published', caption: 'The 4-minute warmup nobody skips after this.' },
//       { client: 'Lumen Dental',     clientId: 'lumen',    network: 'gbp',       time: '15:30', status: 'published', caption: 'Same-week cleanings now open in Frisco.' },
//     ] },
//     { date: daysAgo(10), label: 'Tue', posts: [
//       { client: 'Verdant Skincare', clientId: 'verdant',  network: 'instagram', time: '09:30', status: 'published', caption: 'Niacinamide, explained without the jargon.' },
//       { client: 'Casa Verde',       clientId: 'casaverde', network: 'facebook', time: '18:00', status: 'published', caption: 'Taco Tuesday is back, all summer long.' },
//     ] },
//     { date: daysAgo(9), label: 'Wed', posts: [
//       { client: 'NorthEdge SaaS',   clientId: 'northedge', network: 'linkedin', time: '14:00', status: 'published', caption: 'We rebuilt the sprint board. Here is why.' },
//     ] },
//     { date: daysAgo(8), label: 'Thu', posts: [
//       { client: 'Atlas Storage',    clientId: 'atlas',    network: 'facebook',  time: '11:00', status: 'published', caption: 'Need space fast? Drive-up units available today.' },
//       { client: 'Peak Performance', clientId: 'peak',     network: 'instagram', time: '17:00', status: 'published', caption: 'Form check Friday is coming. Drop your lifts.' },
//     ] },
//     { date: daysAgo(7), label: 'Fri', posts: [
//       { client: 'Casa Verde',       clientId: 'casaverde', network: 'instagram', time: '12:30', status: 'published', caption: 'Weekend specials, photographed at the pass.' },
//       { client: 'Verdant Skincare', clientId: 'verdant',  network: 'tiktok',    time: '16:00', status: 'published', caption: 'A week with the ceramide moisturizer. Real results.' },
//     ] },
//     // Next week (scheduled + drafts).
//     { date: daysAhead(3), label: 'Mon', posts: [
//       { client: 'NorthEdge SaaS',   clientId: 'northedge', network: 'linkedin', time: '14:30', status: 'scheduled', caption: 'The status-meeting report, by the numbers.' },
//       { client: 'Lumen Dental',     clientId: 'lumen',    network: 'gbp',       time: '10:00', status: 'draft',     caption: 'New patient Mondays: book online in 60 seconds.' },
//     ] },
//     { date: daysAhead(4), label: 'Tue', posts: [
//       { client: 'Verdant Skincare', clientId: 'verdant',  network: 'instagram', time: '09:00', status: 'scheduled', caption: 'The barrier-repair routine, simplified to three steps.' },
//       { client: 'Peak Performance', clientId: 'peak',     network: 'tiktok',    time: '12:15', status: 'draft',     caption: 'Three mobility drills your knees will thank you for.' },
//     ] },
//     { date: daysAhead(5), label: 'Wed', posts: [
//       { client: 'Casa Verde',       clientId: 'casaverde', network: 'instagram', time: '12:00', status: 'draft',    caption: 'New summer menu lands Friday. Stone-fruit and smoked trout.' },
//     ] },
//     { date: daysAhead(6), label: 'Thu', posts: [
//       { client: 'Atlas Storage',    clientId: 'atlas',    network: 'facebook',  time: '11:00', status: 'draft',    caption: 'Moving this summer? First month free, no long-term lease.' },
//       { client: 'NorthEdge SaaS',   clientId: 'northedge', network: 'youtube',  time: '13:00', status: 'scheduled', caption: 'Sprint board, in 90 seconds. Part two.' },
//     ] },
//     { date: daysAhead(7), label: 'Fri', posts: [
//       { client: 'Peak Performance', clientId: 'peak',     network: 'instagram', time: '17:30', status: 'scheduled', caption: 'Friday finisher: 8 minutes, no equipment.' },
//       { client: 'Verdant Skincare', clientId: 'verdant',  network: 'facebook',  time: '19:00', status: 'draft',    caption: 'Restock alert, round two. The serum is back.' },
//     ] },
//   ],
//
//   // The "N posts drafted for next month" callout.
//   monthAhead: {
//     month: 'July',
//     drafted: 18,
//     clients: 6,
//     networks: 5,
//     note: 'Full month drafted in each brand voice, ready for review.',
//   },
//
//   // --- Composer: drafts/scheduled rail + the one open post ---
//   composer: {
//     clientId: 'verdant',
//     client: 'Verdant Skincare',
//     handle: '@verdantskin',
//     network: 'instagram',
//     caption: 'Your barrier is not broken, it is asking for less. This week we stripped our routine to three steps: a gentle gel cleanser, the niacinamide serum, and the ceramide moisturizer that started it all. Tap to see the 7-day diary. #skinbarrier #skincare',
//     suggestedTime: 'Tue 9:00 AM, peak window for this audience',
//     likes: 1840,
//     comments: 96,
//     shares: 41,
//     hashtags: ['#skinbarrier', '#skincare', '#dermtested'],
//     media: '1 carousel . 4 frames . 1080 x 1350',
//     charCount: 248,
//     charMax: 2200,
//   },
//
//   // Drafts + scheduled list for the composer rail.
//   drafts: [
//     { id: 'd1', clientId: 'verdant',   client: 'Verdant Skincare',  network: 'instagram', status: 'editing',   time: 'Tue 9:00 AM', caption: 'Your barrier is not broken, it is asking for less. The 3-step routine.', open: true },
//     { id: 'd2', clientId: 'casaverde', client: 'Casa Verde',        network: 'instagram', status: 'review',    time: 'Fri 12:00 PM', caption: 'New summer menu lands Friday. Stone-fruit, smoked trout, peach negroni.' },
//     { id: 'd3', clientId: 'peak',      client: 'Peak Performance',  network: 'tiktok',    status: 'review',    time: 'Sat 4:30 PM', caption: 'Three mobility drills your knees will thank you for. Save this.' },
//     { id: 'd4', clientId: 'northedge', client: 'NorthEdge SaaS',    network: 'linkedin',  status: 'scheduled', time: 'Mon 2:30 PM', caption: 'We asked 200 PMs where their week disappears. New report inside.' },
//     { id: 'd5', clientId: 'lumen',     client: 'Lumen Dental',      network: 'gbp',       status: 'scheduled', time: 'Wed 10:00 AM', caption: 'Now booking new Invisalign consults in Plano and Frisco.' },
//     { id: 'd6', clientId: 'atlas',     client: 'Atlas Storage',     network: 'facebook',  status: 'draft',     time: 'Thu 11:00 AM', caption: 'Moving this summer? First month free on climate-controlled units.' },
//     { id: 'd7', clientId: 'verdant',   client: 'Verdant Skincare',  network: 'tiktok',    status: 'draft',     time: 'unset',       caption: 'A week with the ceramide moisturizer. Real before-and-after.' },
//     { id: 'd8', clientId: 'casaverde', client: 'Casa Verde',        network: 'facebook',  status: 'scheduled', time: 'Sun 11:00 AM', caption: 'Sunday patio brunch, two seatings. Reserve from the link.' },
//     { id: 'd9', clientId: 'peak',      client: 'Peak Performance',  network: 'instagram', status: 'draft',     time: 'unset',       caption: 'Sunday reset: mobility, mindset, meal prep. Thread.' },
//     { id: 'd10', clientId: 'northedge', client: 'NorthEdge SaaS',   network: 'youtube',   status: 'review',    time: 'Thu 1:00 PM', caption: 'Sprint board walkthrough, part two. In 90 seconds.' },
//   ],
//
//   // --- Inbox: incoming conversations (rail) + threads (main) ---
//   inbox: [
//     { id: 'm1', clientId: 'verdant',   client: 'Verdant Skincare',  network: 'instagram', kind: 'DM',      from: '@layla.skin',     handle: '@layla.skin', sentiment: 'neutral',  ago: '8m', unread: true,
//       snippet: 'Is the niacinamide serum safe to layer with retinol at night?',
//       thread: [
//         { who: 'them', t: 'Hi! Obsessed with the barrier serum. Quick question -', ago: '11m' },
//         { who: 'them', t: 'Is the niacinamide serum safe to layer with retinol at night?', ago: '8m' },
//       ],
//       suggestedReply: 'Great question. We recommend niacinamide in the AM and retinol at night to start, then layering once your barrier adjusts. Want our routine guide?' },
//     { id: 'm2', clientId: 'casaverde', client: 'Casa Verde',        network: 'facebook',  kind: 'comment', from: 'Marcus T.',       handle: 'Marcus T.', sentiment: 'positive', ago: '21m', unread: true,
//       snippet: 'Do you take reservations for the patio on Sundays?',
//       thread: [
//         { who: 'them', t: 'That patio photo is gorgeous.', ago: '24m' },
//         { who: 'them', t: 'Do you take reservations for the patio on Sundays?', ago: '21m' },
//       ],
//       suggestedReply: 'We do. Sunday patio brunch has two seatings, 10 and 12:30. You can book straight from our profile link. See you soon.' },
//     { id: 'm3', clientId: 'peak',      client: 'Peak Performance',  network: 'instagram', kind: 'comment', from: '@runwithdee',     handle: '@runwithdee', sentiment: 'positive', ago: '34m', unread: false,
//       snippet: 'Just hit a 5k PR thanks to that mobility flow. Thank you!',
//       thread: [
//         { who: 'them', t: 'Just hit a 5k PR thanks to that mobility flow. Thank you!', ago: '34m' },
//       ],
//       suggestedReply: 'That is a serious win, congratulations. Tag us in the next one, we would love to feature you.' },
//     { id: 'm4', clientId: 'atlas',     client: 'Atlas Storage',     network: 'gbp',       kind: 'comment', from: 'Helen R.',        handle: 'Helen R.', sentiment: 'negative', ago: '52m', unread: true,
//       snippet: 'Gate was down again this morning and I could not get to my unit.',
//       thread: [
//         { who: 'them', t: 'Gate was down again this morning and I could not get to my unit.', ago: '52m' },
//       ],
//       suggestedReply: 'Helen, we are sorry, that should never happen. The gate is back up and we are crediting your account. Please DM your unit number so we can confirm.' },
//     { id: 'm5', clientId: 'northedge', client: 'NorthEdge SaaS',    network: 'linkedin',  kind: 'DM',      from: 'Priya Sundaram',  handle: 'Priya Sundaram', sentiment: 'positive', ago: '1h', unread: false,
//       snippet: 'Loved the status-meeting case study. Do you have the raw benchmark data?',
//       thread: [
//         { who: 'them', t: 'Loved the status-meeting case study.', ago: '1h' },
//         { who: 'them', t: 'Do you have the raw benchmark data anywhere?', ago: '1h' },
//       ],
//       suggestedReply: 'Thank you Priya. The full benchmark is in our resource hub, link in the post. Happy to walk you through it on a quick call.' },
//     { id: 'm6', clientId: 'verdant',   client: 'Verdant Skincare',  network: 'tiktok',    kind: 'comment', from: '@skinfirst22',    handle: '@skinfirst22', sentiment: 'negative', ago: '1h', unread: true,
//       snippet: 'Tried this for a week and got tiny bumps, is that normal?',
//       thread: [
//         { who: 'them', t: 'Tried this for a week and got tiny bumps, is that normal?', ago: '1h' },
//       ],
//       suggestedReply: 'That can be your skin adjusting, but tiny bumps are worth checking. DM us a photo and our esthetician will look this evening.' },
//     { id: 'm7', clientId: 'casaverde', client: 'Casa Verde',        network: 'instagram', kind: 'DM',      from: '@denverfoodie',   handle: '@denverfoodie', sentiment: 'neutral', ago: '2h', unread: false,
//       snippet: 'Is the peach negroni vegan?',
//       thread: [
//         { who: 'them', t: 'Is the peach negroni vegan?', ago: '2h' },
//       ],
//       suggestedReply: 'It is. The peach negroni is fully plant-based, sweetened with house peach syrup. Ask for it at the bar.' },
//     { id: 'm8', clientId: 'lumen',     client: 'Lumen Dental',      network: 'facebook',  kind: 'comment', from: 'Greg P.',         handle: 'Greg P.', sentiment: 'neutral', ago: '3h', unread: false,
//       snippet: 'How much is an Invisalign consult?',
//       thread: [
//         { who: 'them', t: 'How much is an Invisalign consult?', ago: '3h' },
//       ],
//       suggestedReply: 'The first consult is complimentary, including a 3D scan. We can usually fit you in the same week, want us to check Plano availability?' },
//     { id: 'm9', clientId: 'peak',      client: 'Peak Performance',  network: 'tiktok',    kind: 'comment', from: '@liftwithsam',     handle: '@liftwithsam', sentiment: 'positive', ago: '4h', unread: false,
//       snippet: 'This finisher destroyed me in the best way. More please.',
//       thread: [
//         { who: 'them', t: 'This finisher destroyed me in the best way. More please.', ago: '4h' },
//       ],
//       suggestedReply: 'Love to hear it. New finisher drops every Friday, turn on notifications so you never miss one.' },
//     { id: 'm10', clientId: 'northedge', client: 'NorthEdge SaaS',   network: 'linkedin',  kind: 'DM',      from: 'Devon Achebe',    handle: 'Devon Achebe', sentiment: 'neutral', ago: '5h', unread: false,
//       snippet: 'Is there a self-serve tier for teams under ten?',
//       thread: [
//         { who: 'them', t: 'Is there a self-serve tier for teams under ten?', ago: '5h' },
//       ],
//       suggestedReply: 'There is. The Team plan starts at five seats, no sales call required. I can send a setup link if that helps.' },
//     { id: 'm11', clientId: 'verdant',  client: 'Verdant Skincare',  network: 'instagram', kind: 'comment', from: '@glowgetter',     handle: '@glowgetter', sentiment: 'positive', ago: '6h', unread: false,
//       snippet: 'Three weeks in and my redness is basically gone. Thank you!',
//       thread: [
//         { who: 'them', t: 'Three weeks in and my redness is basically gone. Thank you!', ago: '6h' },
//       ],
//       suggestedReply: 'This made our day. Tag us in your routine and we may feature you in next week story.' },
//     { id: 'm12', clientId: 'atlas',    client: 'Atlas Storage',     network: 'facebook',  kind: 'comment', from: 'Dwayne H.',       handle: 'Dwayne H.', sentiment: 'negative', ago: '7h', unread: false,
//       snippet: 'Third time the gate has been broken this month. Looking elsewhere.',
//       thread: [
//         { who: 'them', t: 'Third time the gate has been broken this month. Looking elsewhere.', ago: '7h' },
//       ],
//       suggestedReply: 'Dwayne, that is not the experience we want for you. A manager will call today, and we are applying a credit while we fix the gate hardware for good.' },
//   ],
//
//   // --- Listening: dense mentions list + sentiment summary ---
//   mentions: [
//     { id: 'x1', clientId: 'verdant',   client: 'Verdant Skincare',  network: 'tiktok',   author: '@cleanbeautyhq', sentiment: 'positive', reach: 52000, eng: 4100, days: 0, text: 'Verdant is the only barrier serum that did not break me out. Run, do not walk.' },
//     { id: 'x2', clientId: 'casaverde', client: 'Casa Verde',        network: 'instagram', author: '@denvereats',    sentiment: 'positive', reach: 18400, eng: 1320, days: 0, text: 'The peach negroni at Casa Verde is the drink of the summer. Patio is unbeatable.' },
//     { id: 'x3', clientId: 'peak',      client: 'Peak Performance',  network: 'instagram', author: '@azfitfam',      sentiment: 'positive', reach: 9600,  eng: 740,  days: 0, text: 'Peak Performance Scottsdale has the best 6am class energy in the valley.' },
//     { id: 'x4', clientId: 'atlas',     client: 'Atlas Storage',     network: 'facebook',  author: 'Dwayne H.',      sentiment: 'negative', reach: 2100,  eng: 88,   days: 0, text: 'Third time the Atlas gate has been broken this month. Looking elsewhere.' },
//     { id: 'x5', clientId: 'northedge', client: 'NorthEdge SaaS',    network: 'linkedin',  author: 'Aaron Mills',    sentiment: 'positive', reach: 7300,  eng: 410,  days: 1, text: 'NorthEdge quietly shipped the sprint board redesign we have wanted for a year.' },
//     { id: 'x6', clientId: 'verdant',   client: 'Verdant Skincare',  network: 'instagram', author: '@dermdiaries',   sentiment: 'neutral',  reach: 31000, eng: 2200, days: 1, text: 'Reviewing Verdant niacinamide this week. Early impressions are promising.' },
//     { id: 'x7', clientId: 'casaverde', client: 'Casa Verde',        network: 'tiktok',    author: '@foodtok.dnvr',  sentiment: 'positive', reach: 64000, eng: 5800, days: 1, text: 'Found the heirloom tomato dish everyone is posting. Casa Verde delivers.' },
//     { id: 'x8', clientId: 'peak',      client: 'Peak Performance',  network: 'tiktok',    author: '@coachbrina',    sentiment: 'positive', reach: 22000, eng: 1900, days: 2, text: 'Stole this mobility flow from Peak Performance for my own class. It works.' },
//     { id: 'x9', clientId: 'lumen',     client: 'Lumen Dental',      network: 'gbp',       author: 'Karen W.',       sentiment: 'positive', reach: 1400,  eng: 30,   days: 2, text: 'Lumen got me a same-week Invisalign consult. Painless and friendly.' },
//     { id: 'x10', clientId: 'verdant',  client: 'Verdant Skincare',  network: 'tiktok',    author: '@skinfirst22',   sentiment: 'negative', reach: 8800,  eng: 520,  days: 2, text: 'Got tiny bumps from the Verdant serum after a week. Not sure if it is for me.' },
//     { id: 'x11', clientId: 'northedge', client: 'NorthEdge SaaS',   network: 'linkedin',  author: 'Tara Okonkwo',   sentiment: 'neutral',  reach: 5200,  eng: 210,  days: 3, text: 'Comparing NorthEdge and two competitors for our PMO. Notes in the comments.' },
//     { id: 'x12', clientId: 'casaverde', client: 'Casa Verde',       network: 'facebook',  author: 'Linda S.',       sentiment: 'positive', reach: 3100,  eng: 140,  days: 3, text: 'Best brunch service we have had downtown in years. The patio is a treat.' },
//     { id: 'x13', clientId: 'peak',     client: 'Peak Performance',  network: 'instagram', author: '@valleyrunners', sentiment: 'positive', reach: 14200, eng: 980,  days: 4, text: 'Peak Performance hosted our run club after-party. Class act all around.' },
//     { id: 'x14', clientId: 'atlas',    client: 'Atlas Storage',     network: 'gbp',       author: 'Marcus L.',      sentiment: 'neutral',  reach: 900,   eng: 18,   days: 4, text: 'Atlas units are clean and the climate control is real. Gate access can lag.' },
//     { id: 'x15', clientId: 'verdant',  client: 'Verdant Skincare',  network: 'instagram', author: '@glowgetter',    sentiment: 'positive', reach: 6400,  eng: 470,  days: 5, text: 'Three weeks of Verdant and my redness is basically gone. Believer now.' },
//     { id: 'x16', clientId: 'lumen',    client: 'Lumen Dental',      network: 'facebook',  author: 'Greg P.',        sentiment: 'neutral',  reach: 1100,  eng: 22,   days: 5, text: 'Asked Lumen about consult pricing. Quick reply, complimentary first visit.' },
//     { id: 'x17', clientId: 'northedge', client: 'NorthEdge SaaS',   network: 'youtube',   author: 'devtoolsdaily',  sentiment: 'positive', reach: 41000, eng: 3300, days: 6, text: 'Featured NorthEdge sprint board in our weekly roundup. Clean execution.' },
//     { id: 'x18', clientId: 'casaverde', client: 'Casa Verde',       network: 'instagram', author: '@denverfoodie',  sentiment: 'neutral',  reach: 2700,  eng: 120,  days: 6, text: 'Heard the peach negroni is vegan now. Going to confirm this weekend.' },
//     { id: 'x19', clientId: 'peak',     client: 'Peak Performance',  network: 'tiktok',    author: '@liftwithsam',   sentiment: 'positive', reach: 19000, eng: 1600, days: 7, text: 'That Friday finisher from Peak destroyed me in the best way. More please.' },
//     { id: 'x20', clientId: 'atlas',    client: 'Atlas Storage',     network: 'facebook',  author: 'Priya N.',       sentiment: 'positive', reach: 1900,  eng: 64,   days: 7, text: 'Atlas first-month-free offer saved our move. Booked a drive-up same day.' },
//   ],
//
//   // Sentiment summary for the listening panel.
//   sentiment: { positive: 78, neutral: 14, negative: 8 },
//   sentimentByNet: [
//     { id: 'instagram', positive: 84, neutral: 11, negative: 5 },
//     { id: 'tiktok',    positive: 76, neutral: 12, negative: 12 },
//     { id: 'facebook',  positive: 71, neutral: 18, negative: 11 },
//     { id: 'linkedin',  positive: 82, neutral: 16, negative: 2 },
//   ],
//   shareOfVoice: 41, // % vs assist-only competitors in the same set
//
//   // --- Top posts (overview + analytics) ---
//   topPosts: [
//     { id: 'p1', clientId: 'peak',      client: 'Peak Performance',  network: 'tiktok',    caption: '30-second mobility flow before leg day',         reach: 184200, eng: 9.1, saves: 14200, status: 'published', date: daysAgo(6) },
//     { id: 'p2', clientId: 'verdant',   client: 'Verdant Skincare',  network: 'instagram', caption: 'The 3-step barrier routine our derm swears by',   reach: 142800, eng: 7.4, saves: 9800,  status: 'published', date: daysAgo(3) },
//     { id: 'p3', clientId: 'casaverde', client: 'Casa Verde',        network: 'instagram', caption: 'Wood-fired Sunday brunch, two seatings',          reach: 96400,  eng: 6.8, saves: 4100,  status: 'published', date: daysAgo(4) },
//     { id: 'p4', clientId: 'verdant',   client: 'Verdant Skincare',  network: 'tiktok',    caption: 'POV: your skin barrier finally calms down',       reach: 88600,  eng: 8.2, saves: 7600,  status: 'published', date: daysAgo(1) },
//     { id: 'p5', clientId: 'casaverde', client: 'Casa Verde',        network: 'tiktok',    caption: 'Plating the heirloom tomato dish, behind the pass', reach: 64000, eng: 7.0, saves: 3300, status: 'published', date: daysAgo(2) },
//     { id: 'p6', clientId: 'peak',      client: 'Peak Performance',  network: 'instagram', caption: 'Member spotlight: Renee dropped her 5k by 4 min',  reach: 41200,  eng: 5.9, saves: 1700,  status: 'published', date: daysAgo(2) },
//     { id: 'p7', clientId: 'northedge', client: 'NorthEdge SaaS',    network: 'youtube',   caption: 'Sprint board redesign roundup feature',           reach: 41000,  eng: 4.4, saves: 2100,  status: 'published', date: daysAgo(6) },
//     { id: 'p8', clientId: 'lumen',     client: 'Lumen Dental',      network: 'instagram', caption: 'Five signs you might be grinding your teeth',      reach: 38700,  eng: 4.6, saves: 1100,  status: 'published', date: daysAgo(1) },
//     { id: 'p9', clientId: 'northedge', client: 'NorthEdge SaaS',    network: 'linkedin',  caption: 'How 40 PMs cut status-meeting time in half',      reach: 31900,  eng: 5.2, saves: 980,   status: 'published', date: daysAgo(3) },
//     { id: 'p10', clientId: 'verdant',  client: 'Verdant Skincare',  network: 'instagram', caption: 'Niacinamide, explained without the jargon',       reach: 28800,  eng: 5.0, saves: 1500,  status: 'published', date: daysAgo(10) },
//     { id: 'p11', clientId: 'northedge', client: 'NorthEdge SaaS',   network: 'youtube',   caption: 'Product walkthrough: the new sprint board',       reach: 22400,  eng: 3.8, saves: 760,   status: 'published', date: daysAgo(1) },
//     { id: 'p12', clientId: 'peak',     client: 'Peak Performance',  network: 'tiktok',    caption: 'The 4-minute warmup nobody skips after this',     reach: 19000,  eng: 6.3, saves: 2400,  status: 'published', date: daysAgo(11) },
//     { id: 'p13', clientId: 'atlas',    client: 'Atlas Storage',     network: 'gbp',       caption: 'First month free on climate-controlled units',    reach: 14600,  eng: 3.1, saves: 120,   status: 'published', date: daysAgo(2) },
//     { id: 'p14', clientId: 'casaverde', client: 'Casa Verde',       network: 'facebook',  caption: 'Taco Tuesday is back, all summer long',           reach: 12200,  eng: 3.4, saves: 90,    status: 'published', date: daysAgo(10) },
//     { id: 'p15', clientId: 'lumen',    client: 'Lumen Dental',      network: 'gbp',       caption: 'Same-week cleanings now open in Frisco',          reach: 6800,   eng: 2.9, saves: 40,    status: 'published', date: daysAgo(11) },
//   ],
//
//   // --- Best-time heatmap (used on overview) ---
//   heatBuckets: ['6-9a', '9-12p', '12-3p', '3-6p', '6-9p'],
//   bestTimes: [
//     { day: 'Mon', cells: [11, 6,  9,  4,  2] },
//     { day: 'Tue', cells: [3,  1,  7,  10, 5] },
//     { day: 'Wed', cells: [9,  5,  8,  6,  3] },
//     { day: 'Thu', cells: [7,  4,  12, 9,  2] },
//     { day: 'Fri', cells: [6,  3,  5,  2,  1] },
//     { day: 'Sat', cells: [2,  8,  14, 16, 11] },
//     { day: 'Sun', cells: [1,  6,  13, 12, 9] },
//   ],
//
//   // --- Recent activity feed (overview console) ---
//   activity: [
//     { kind: 'published', clientId: 'verdant',   client: 'Verdant Skincare',  network: 'instagram', text: 'Published the 3-step barrier routine carousel', ago: '12m' },
//     { kind: 'approved',  clientId: 'casaverde', client: 'Casa Verde',        network: 'instagram', text: 'Approved the weekend menu drop for Friday 12:00', ago: '38m' },
//     { kind: 'reply',     clientId: 'peak',      client: 'Peak Performance',  network: 'instagram', text: 'Replied to @runwithdee on the 5k PR comment', ago: '1h' },
//     { kind: 'scheduled', clientId: 'northedge', client: 'NorthEdge SaaS',    network: 'linkedin',  text: 'Scheduled the context-switching chart for Sun 3:00', ago: '2h' },
//     { kind: 'flag',      clientId: 'atlas',     client: 'Atlas Storage',     network: 'gbp',       text: 'Flagged a negative gate comment for the account lead', ago: '2h' },
//     { kind: 'published', clientId: 'lumen',     client: 'Lumen Dental',      network: 'instagram', text: 'Published the teeth-grinding awareness post', ago: '3h' },
//     { kind: 'draft',     clientId: 'verdant',   client: 'Verdant Skincare',  network: 'tiktok',    text: 'Drafted the ceramide moisturizer diary for review', ago: '4h' },
//     { kind: 'scheduled', clientId: 'peak',      client: 'Peak Performance',  network: 'tiktok',    text: 'Scheduled the Friday finisher for 4:30 PM', ago: '5h' },
//   ],
//
//   // --- Analytics: time series + engagement by network (charts) ---
//   reachSeries: [36, 38, 41, 37, 42, 45, 43, 40, 46, 49, 47, 52, 50, 58], // x1000, 14 days
//   engSeries:   [4.1, 4.3, 4.0, 4.4, 4.6, 4.9, 4.7, 4.5, 4.8, 5.1, 4.9, 5.2, 5.0, 5.3],
//   engByNet: [ // engagement rate by network for the bar chart
//     { id: 'tiktok', label: 'TikTok', eng: 7.9 },
//     { id: 'instagram', label: 'Instagram', eng: 5.4 },
//     { id: 'linkedin', label: 'LinkedIn', eng: 4.1 },
//     { id: 'youtube', label: 'YouTube', eng: 3.6 },
//     { id: 'gbp', label: 'Google Business', eng: 3.1 },
//     { id: 'facebook', label: 'Facebook', eng: 2.8 },
//   ],
//
//   // Assist-only competitor framing.
//   assistOnly: ['Hootsuite', 'Buffer', 'Sprout Social'],
// };
//