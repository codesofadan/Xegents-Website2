/* ============================================================
   Reputation macro seed - data for ALL sub-modules:
     reputation             (Overview / CONSOLE)
     reputation.inbox       (Reviews / SPLIT INBOX)
     reputation.requests    (Requests / DENSE LIST)
     reputation.listings    (Listings / DENSE LIST)
     reputation.competitors (Competitors / COMPARE TABLE)

   Response policy: 4-5 star replies publish automatically in the
   brand voice; sub-3 star replies are held for owner sign-off
   before they go live (sentiment-tiered, human in the loop).
   Keyed to window.CLIENTS.
   ============================================================ */

window.REPUTATION = {

  // ---- KPI rail (mid-quarter, June 2026) ----
  kpis: {
    avgRating: 4.6,
    avgRatingDelta: 0.1,
    newReviewsMtd: 470,
    newReviewsDelta: 12,
    responseRate: 96,
    responseRateDelta: 3,
    avgResponseHrs: 2.4,
    avgResponseDelta: -0.6,   // lower is better
    negativeOpen: 4,
  },

  // ---- Platform rollup ----
  platforms: [
    { id: 'google',     label: 'Google',     color: '#38bdf8', rating: 4.7, reviews: 1840, share: 61 },
    { id: 'yelp',       label: 'Yelp',       color: '#f43f5e', rating: 4.3, reviews: 412,  share: 14 },
    { id: 'facebook',   label: 'Facebook',   color: '#6366f1', rating: 4.6, reviews: 388,  share: 13 },
    { id: 'trustpilot', label: 'Trustpilot', color: '#10b981', rating: 4.5, reviews: 366,  share: 12 },
  ],

  // ---- Review feed. state: 'auto' | 'pending' | 'replied' ----
  reviews: [
    {
      id: 'rv-01', client: 'lumen', platform: 'google', stars: 5,
      author: 'Marianne Cole', days: 0,
      text: 'Dr. Nair and the Plano team made my Invisalign consult painless. Booked, seen, and out in under an hour. The whole front desk is wonderful.',
      sentiment: 'positive', state: 'auto',
      reply: 'Thank you, Marianne. We are thrilled your Invisalign consult went so smoothly. Dr. Nair and the Plano team look forward to seeing you again.',
    },
    {
      id: 'rv-02', client: 'atlas', platform: 'google', stars: 2,
      author: 'Derek Holloway', days: 0,
      text: 'Reserved a 10x10 online, showed up and the unit was already occupied. Front office could not reach the manager. Lost an afternoon and a moving truck.',
      sentiment: 'negative', state: 'pending',
      reply: 'Derek, I am sorry your reserved unit was unavailable on arrival and that you lost time and a truck rental. That is not the standard at Atlas. I have flagged this for our district manager, Roy Caldwell, who will call you today to make it right and reimburse the truck. Please expect his call by 4 PM.',
      slaHrs: 4,
    },
    {
      id: 'rv-03', client: 'casaverde', platform: 'yelp', stars: 5,
      author: 'Priscilla Tran', days: 1,
      text: 'The farm-to-table tasting menu was the best meal we have had in Denver this year. Every course was a story. Ask for the heirloom tomato dish.',
      sentiment: 'positive', state: 'auto',
      reply: 'Priscilla, this means the world to us. The heirloom tomato dish is a team favorite too. Thank you for celebrating local farms with us, see you next season.',
    },
    {
      id: 'rv-04', client: 'verdant', platform: 'trustpilot', stars: 1,
      author: 'Jordan Reyes', days: 1,
      text: 'Ordered the vitamin C serum, arrived leaking and the cap was cracked. Support took five days to reply. Disappointing for the price point.',
      sentiment: 'negative', state: 'pending',
      reply: 'Jordan, I am genuinely sorry your serum arrived damaged and that our support reply took five days, that is far too long. A replacement is already shipping with overnight delivery at no cost, and I have refunded this order in full. We are also reviewing our packaging supplier this week. Thank you for giving us the chance to fix it.',
      slaHrs: 6,
    },
    {
      id: 'rv-05', client: 'peak', platform: 'google', stars: 5,
      author: 'Nadia Fournier', days: 2,
      text: 'Switched to the Scottsdale location for the small-group strength classes. Coaches actually coach. Down 11 lbs and stronger in eight weeks.',
      sentiment: 'positive', state: 'auto',
      reply: 'Nadia, eight weeks and 11 lbs stronger, that is incredible work. The Scottsdale coaches are proud to have you. Keep crushing those strength blocks.',
    },
    {
      id: 'rv-06', client: 'lumen', platform: 'facebook', stars: 4,
      author: 'Greg Maddox', days: 2,
      text: 'Good cleaning and friendly hygienist. Only knock is the wait, I sat about 20 minutes past my appointment time. Otherwise solid.',
      sentiment: 'positive', state: 'auto',
      reply: 'Thanks for the honest note, Greg. We are glad the cleaning went well and we hear you on the wait, our Frisco office is adjusting the morning schedule to keep us on time. See you at the next visit.',
    },
    {
      id: 'rv-07', client: 'verdant', platform: 'google', stars: 5,
      author: 'Bianca Russo', days: 3,
      text: 'The retinol night cream cleared my texture in three weeks. Clean ingredients, fast shipping the second time around. Repeat customer for life.',
      sentiment: 'positive', state: 'auto',
      reply: 'Bianca, three weeks to clearer texture is a beautiful result. Thank you for coming back, we are honored to be part of your routine.',
    },
    {
      id: 'rv-08', client: 'atlas', platform: 'yelp', stars: 2,
      author: 'Sheila Barnes', days: 3,
      text: 'Rates went up twice in six months with no notice. Gate has been broken for weeks. I expected more for a climate-controlled unit.',
      sentiment: 'negative', state: 'pending',
      reply: 'Sheila, I am sorry, two rate increases without clear notice and a gate left unrepaired is not acceptable. The Buckhead gate motor was replaced Tuesday and is back online. I would also like to review your account and hold your rate, our manager will reach out this week. Thank you for telling us.',
      slaHrs: 8,
    },
    {
      id: 'rv-09', client: 'casaverde', platform: 'google', stars: 5,
      author: 'Hugo Beltran', days: 4,
      text: 'Booked the patio for a birthday of 12. Staff handled dietary needs without a hitch and the sommelier pairing was spot on. Will be back.',
      sentiment: 'positive', state: 'auto',
      reply: 'Hugo, hosting your party of 12 was our pleasure, and our sommelier will be glad to hear the pairings landed. The patio is yours whenever you are back.',
    },
    {
      id: 'rv-10', client: 'northedge', platform: 'trustpilot', stars: 4,
      author: 'Lena Kowalski', days: 5,
      text: 'Rollout to our 40-person team went smoothly and the onboarding docs are clear. Reporting could use more custom fields, but support is responsive.',
      sentiment: 'positive', state: 'replied',
      reply: 'Thank you, Lena. Smooth rollout to 40 seats is exactly what we aim for. Custom reporting fields are on the Q3 roadmap, I will flag your team when they ship.',
    },
    {
      id: 'rv-11', client: 'peak', platform: 'facebook', stars: 5,
      author: 'Theo Marsh', days: 6,
      text: 'The new recovery and mobility add-on is worth it alone. Front desk remembers your name. Best gym community in Phoenix, full stop.',
      sentiment: 'positive', state: 'auto',
      reply: 'Theo, community is everything to us, thank you. Glad the recovery and mobility add-on is paying off. See you on the floor.',
    },
    {
      id: 'rv-12', client: 'verdant', platform: 'facebook', stars: 3,
      author: 'Amara Osei', days: 7,
      text: 'Love the products but the subscription is hard to pause and the checkout glitched twice. Fix the website and this is a five-star brand.',
      sentiment: 'neutral', state: 'pending',
      reply: 'Amara, thank you, and you are right that pausing a subscription should be effortless. I have paused yours now and our team is shipping a checkout fix this sprint. I would love to follow up once it is live, the products clearly deserve a smoother experience.',
      slaHrs: 12,
    },
    {
      id: 'rv-13', client: 'lumen', platform: 'google', stars: 5,
      author: 'Vince Caruso', days: 8,
      text: 'Emergency root canal on a Saturday. They fit me in and Dr. Nair was calm and quick. Pain gone, follow-up booked. Cannot recommend enough.',
      sentiment: 'positive', state: 'auto',
      reply: 'Vince, a Saturday emergency is exactly when we want to be there for you. So glad Dr. Nair could help fast. See you at the follow-up.',
    },
    {
      id: 'rv-14', client: 'casaverde', platform: 'trustpilot', stars: 4,
      author: 'Renata Dvorak', days: 9,
      text: 'Lovely food and atmosphere. Service was a touch slow on a busy Friday, but the kitchen clearly cares. Worth the trip.',
      sentiment: 'positive', state: 'replied',
      reply: 'Thank you, Renata. We are glad the kitchen shone through, and we are staffing up Friday service to keep pace. The trip is always worth it, we will make sure of it.',
    },
    {
      id: 'rv-15', client: 'atlas', platform: 'facebook', stars: 1,
      author: 'Marcus Webb', days: 1,
      text: 'Auto-pay charged me after I moved out and closed the account in writing. Three calls, no callback. This is how you lose a customer for good.',
      sentiment: 'negative', state: 'pending',
      reply: 'Marcus, charging you after a written move-out and not returning your calls is a serious miss, and I am sorry. I have stopped the charge, refunded it today, and our district manager will call you within the hour to confirm the account is fully closed.',
      slaHrs: 4,
    },
    {
      id: 'rv-16', client: 'northedge', platform: 'google', stars: 5,
      author: 'Priya Sharma', days: 4,
      text: 'Support answered a tricky SSO config question in under an hour and stayed on until it worked. Rare to feel this looked after by a SaaS vendor.',
      sentiment: 'positive', state: 'auto',
      reply: 'Priya, thank you. SSO edge cases are exactly where we want to show up fast. Glad it is humming, and we are here whenever the next config question lands.',
    },
    {
      id: 'rv-17', client: 'peak', platform: 'yelp', stars: 4,
      author: 'Dominic Hale', days: 10,
      text: 'Solid facility and great coaches. Locker rooms get crowded at 6pm and the app booking is clunky. Both fixable, otherwise a five.',
      sentiment: 'positive', state: 'replied',
      reply: 'Thanks, Dominic. We hear you on the 6pm crunch and the app, both are on our list. We are adding a second peak-hour class block and the booking flow is being rebuilt this quarter.',
    },
    {
      id: 'rv-18', client: 'lumen', platform: 'yelp', stars: 3,
      author: 'Carol Whitman', days: 11,
      text: 'Dentistry was fine but the billing was confusing and an estimate changed after the visit. Front desk was kind about sorting it out though.',
      sentiment: 'neutral', state: 'pending',
      reply: 'Carol, a clear estimate that holds is the least you should expect, and I am sorry it shifted. I am reviewing your account now and our office manager will call to walk through every line and make it right.',
      slaHrs: 12,
    },
  ],

  // ---- Per-location review breakdown (kept for overview context) ----
  locationBreakdown: [
    {
      client: 'lumen', cityLabel: 'Dallas-Fort Worth, TX', total: 1840,
      branches: [
        { name: 'Plano',         rating: 4.9, reviews: 412, responseRate: 99, newMtd: 14 },
        { name: 'Frisco',        rating: 4.8, reviews: 366, responseRate: 98, newMtd: 11 },
        { name: 'Dallas Uptown', rating: 4.8, reviews: 298, responseRate: 97, newMtd: 9  },
        { name: 'Arlington',     rating: 4.7, reviews: 241, responseRate: 96, newMtd: 8  },
        { name: 'Irving',        rating: 4.7, reviews: 207, responseRate: 95, newMtd: 7  },
        { name: 'McKinney',      rating: 4.6, reviews: 168, responseRate: 94, newMtd: 6  },
        { name: 'Garland',       rating: 4.2, reviews: 148, responseRate: 88, newMtd: 9, low: true },
      ],
    },
    {
      client: 'atlas', cityLabel: 'Atlanta, GA', total: 388,
      branches: [
        { name: 'Buckhead',      rating: 4.5, reviews: 71, responseRate: 92, newMtd: 6  },
        { name: 'Midtown',       rating: 4.4, reviews: 58, responseRate: 90, newMtd: 5  },
        { name: 'Sandy Springs', rating: 4.3, reviews: 49, responseRate: 88, newMtd: 4  },
        { name: 'Decatur',       rating: 4.3, reviews: 44, responseRate: 87, newMtd: 4  },
        { name: 'Marietta',      rating: 4.2, reviews: 41, responseRate: 85, newMtd: 5  },
        { name: 'Smyrna',        rating: 4.1, reviews: 36, responseRate: 83, newMtd: 3  },
        { name: 'Roswell',       rating: 4.0, reviews: 33, responseRate: 81, newMtd: 4  },
        { name: 'Alpharetta',    rating: 3.9, reviews: 31, responseRate: 79, newMtd: 3  },
        { name: 'Kennesaw',      rating: 3.4, reviews: 25, responseRate: 68, newMtd: 7, low: true },
      ],
    },
    {
      client: 'peak', cityLabel: 'Phoenix & Scottsdale, AZ', total: 612,
      branches: [
        { name: 'Scottsdale',      rating: 4.9, reviews: 188, responseRate: 99, newMtd: 12 },
        { name: 'Phoenix Central', rating: 4.8, reviews: 152, responseRate: 98, newMtd: 10 },
        { name: 'Tempe',           rating: 4.7, reviews: 121, responseRate: 96, newMtd: 8  },
        { name: 'Chandler',        rating: 4.6, reviews: 88,  responseRate: 94, newMtd: 6  },
        { name: 'Mesa',            rating: 4.3, reviews: 63,  responseRate: 89, newMtd: 5, low: true },
      ],
    },
    {
      client: 'casaverde', cityLabel: 'Denver, CO', total: 980,
      branches: [
        { name: 'LoDo',         rating: 4.8, reviews: 372, responseRate: 98, newMtd: 13 },
        { name: 'RiNo',         rating: 4.7, reviews: 284, responseRate: 97, newMtd: 11 },
        { name: 'Cherry Creek', rating: 4.7, reviews: 201, responseRate: 96, newMtd: 9  },
        { name: 'Highlands',    rating: 4.4, reviews: 123, responseRate: 91, newMtd: 8, low: true },
      ],
    },
  ],

  // ---- Response-template library (used by the inbox composer) ----
  templates: [
    { id: 'tpl-01', name: '5-star thank-you',       scenario: 'praise',      sentiment: 'positive', uses: 312, snippet: 'Thank you so much, {first_name}. We are thrilled {highlight} landed for you. The {location} team looks forward to seeing you again.' },
    { id: 'tpl-02', name: 'Named-staff shout-out',  scenario: 'praise',      sentiment: 'positive', uses: 147, snippet: 'It means a lot to hear {staff_name} took good care of you, {first_name}. We will pass your kind words along to the whole {location} team.' },
    { id: 'tpl-03', name: 'Neutral wait-time',      scenario: 'wait',        sentiment: 'neutral',  uses: 96,  snippet: 'Thanks for the honest note, {first_name}. We hear you on the wait and {location} is adjusting the schedule to keep us on time. See you next visit.' },
    { id: 'tpl-04', name: 'Subscription / billing', scenario: 'billing',     sentiment: 'neutral',  uses: 71,  snippet: 'You are right that {issue} should be effortless, {first_name}. I have handled it on your account and our team is shipping a fix this sprint.' },
    { id: 'tpl-05', name: '1-star service failure', scenario: 'failure',     sentiment: 'negative', uses: 54,  snippet: 'I am sorry, {first_name}, {issue} is not the standard at {brand}. I have flagged this for {manager}, who will call you today to make it right.' },
    { id: 'tpl-06', name: 'Damaged / wrong order',  scenario: 'fulfillment', sentiment: 'negative', uses: 38,  snippet: 'I am genuinely sorry your order arrived {defect}, {first_name}. A replacement is shipping at no cost and I have refunded this order in full.' },
    { id: 'tpl-07', name: 'Billing dispute',        scenario: 'billing',     sentiment: 'negative', uses: 33,  snippet: 'I understand the {charge} caught you off guard, {first_name}. I am reviewing your account now and our manager will reach out this week to resolve it.' },
    { id: 'tpl-08', name: 'Win-back invite',        scenario: 'recovery',    sentiment: 'negative', uses: 22,  snippet: 'Thank you for giving us the chance to fix this, {first_name}. When you are ready, your next {service} at {location} is on us.' },
  ],

  // ---- Review request campaigns (SMS/email outbound) ----
  requests: [
    { id: 'rq-01', name: 'Post-visit SMS', client: 'lumen',     channel: 'sms',   sent: 412,  completed: 188, conversion: 45.6, trigger: 'Post-visit (PMS)',     status: 'active' },
    { id: 'rq-02', name: 'Class check-in', client: 'peak',      channel: 'sms',   sent: 286,  completed: 121, conversion: 42.3, trigger: 'Class check-in',      status: 'active' },
    { id: 'rq-03', name: 'Reservation +1d', client: 'casaverde', channel: 'email', sent: 344,  completed: 132, conversion: 38.4, trigger: 'Reservation +1d',     status: 'active' },
    { id: 'rq-04', name: 'Delivery +3d',   client: 'verdant',   channel: 'email', sent: 1280, completed: 401, conversion: 31.3, trigger: 'Delivery +3d',        status: 'active' },
    { id: 'rq-05', name: 'Move-in event',  client: 'atlas',     channel: 'sms',   sent: 198,  completed: 52,  conversion: 26.3, trigger: 'Move-in event',       status: 'paused' },
    { id: 'rq-06', name: 'CSAT +90d',      client: 'northedge', channel: 'email', sent: 96,   completed: 22,  conversion: 22.9, trigger: 'CSAT survey +90d',    status: 'active' },
    { id: 'rq-07', name: 'Refill reminder', client: 'verdant',  channel: 'sms',   sent: 540,  completed: 196, conversion: 36.3, trigger: 'Refill due',          status: 'active' },
    { id: 'rq-08', name: 'Follow-up call', client: 'lumen',     channel: 'email', sent: 220,  completed: 81,  conversion: 36.8, trigger: 'Hygiene recall',      status: 'active' },
    { id: 'rq-09', name: 'Renewal +7d',    client: 'northedge', channel: 'email', sent: 64,   completed: 19,  conversion: 29.7, trigger: 'Annual renewal',      status: 'draft'  },
    { id: 'rq-10', name: 'Patio booking',  client: 'casaverde', channel: 'sms',   sent: 152,  completed: 61,  conversion: 40.1, trigger: 'Large party +1d',     status: 'active' },
    { id: 'rq-11', name: 'New member +14d', client: 'peak',     channel: 'email', sent: 188,  completed: 58,  conversion: 30.9, trigger: 'New signup +14d',     status: 'active' },
    { id: 'rq-12', name: 'Unit upsize',    client: 'atlas',     channel: 'email', sent: 88,   completed: 17,  conversion: 19.3, trigger: 'Tenure 6mo',          status: 'paused' },
  ],

  // ---- Request builder preview (drafted, approve to launch) ----
  campaignBuilder: {
    client: 'casaverde',
    trigger: 'Reservation completed + 1 day',
    channel: 'sms',
    delayLabel: '24 hours after visit',
    sendWindow: 'Tue-Thu, 11:00 AM - 1:00 PM local',
    sendWindowReason: 'highest historical reply rate for dining, avoids dinner rush',
    audience: 'Parties of 2+, first or second visit, no review on file',
    estReach: 318,
    estReviews: 122,
    message: 'Hi {first_name}, thanks for dining with Casa Verde {location} last night. A quick star rating helps our small team a lot: {review_link}',
  },

  // ---- Listings accuracy (NAP) - one row per location/platform ----
  // napStatus: 'consistent' | 'mismatch' | 'missing'
  listings: [
    { id: 'ls-01', client: 'lumen',     location: 'Plano, TX',          platform: 'google',     napStatus: 'consistent', completeness: 100, days: 2,  issue: '' },
    { id: 'ls-02', client: 'lumen',     location: 'Plano, TX',          platform: 'yelp',       napStatus: 'consistent', completeness: 96,  days: 6,  issue: 'Missing 2 service categories' },
    { id: 'ls-03', client: 'lumen',     location: 'Frisco, TX',         platform: 'google',     napStatus: 'consistent', completeness: 98,  days: 3,  issue: '' },
    { id: 'ls-04', client: 'lumen',     location: 'Garland, TX',        platform: 'google',     napStatus: 'mismatch',   completeness: 74,  days: 41, issue: 'Phone differs from CRM, suite number outdated' },
    { id: 'ls-05', client: 'lumen',     location: 'Garland, TX',        platform: 'bing',       napStatus: 'missing',    completeness: 0,   days: 0,  issue: 'No claimed listing' },
    { id: 'ls-06', client: 'casaverde', location: 'LoDo, Denver',       platform: 'google',     napStatus: 'consistent', completeness: 100, days: 1,  issue: '' },
    { id: 'ls-07', client: 'casaverde', location: 'LoDo, Denver',       platform: 'yelp',       napStatus: 'consistent', completeness: 92,  days: 9,  issue: 'Hours not synced for holidays' },
    { id: 'ls-08', client: 'casaverde', location: 'RiNo, Denver',       platform: 'google',     napStatus: 'mismatch',   completeness: 81,  days: 22, issue: 'Two duplicate listings detected' },
    { id: 'ls-09', client: 'casaverde', location: 'Cherry Creek',       platform: 'facebook',   napStatus: 'consistent', completeness: 94,  days: 5,  issue: '' },
    { id: 'ls-10', client: 'peak',      location: 'Scottsdale, AZ',     platform: 'google',     napStatus: 'consistent', completeness: 100, days: 1,  issue: '' },
    { id: 'ls-11', client: 'peak',      location: 'Phoenix Central',    platform: 'apple',      napStatus: 'mismatch',   completeness: 70,  days: 33, issue: 'Address pin off by one block' },
    { id: 'ls-12', client: 'peak',      location: 'Mesa, AZ',           platform: 'google',     napStatus: 'consistent', completeness: 88,  days: 12, issue: 'Photos older than 90 days' },
    { id: 'ls-13', client: 'peak',      location: 'Mesa, AZ',           platform: 'yelp',       napStatus: 'missing',    completeness: 0,   days: 0,  issue: 'No claimed listing' },
    { id: 'ls-14', client: 'atlas',     location: 'Buckhead, Atlanta',  platform: 'google',     napStatus: 'consistent', completeness: 90,  days: 4,  issue: '' },
    { id: 'ls-15', client: 'atlas',     location: 'Kennesaw, GA',       platform: 'google',     napStatus: 'mismatch',   completeness: 62,  days: 58, issue: 'Name format and hours both stale' },
    { id: 'ls-16', client: 'atlas',     location: 'Kennesaw, GA',       platform: 'bing',       napStatus: 'missing',    completeness: 0,   days: 0,  issue: 'No claimed listing' },
    { id: 'ls-17', client: 'atlas',     location: 'Alpharetta, GA',     platform: 'apple',      napStatus: 'mismatch',   completeness: 68,  days: 47, issue: 'Suite number missing on map' },
    { id: 'ls-18', client: 'verdant',   location: 'Brooklyn, NY (HQ)',  platform: 'google',     napStatus: 'consistent', completeness: 98,  days: 7,  issue: '' },
    { id: 'ls-19', client: 'verdant',   location: 'Brooklyn, NY (HQ)',  platform: 'trustpilot', napStatus: 'consistent', completeness: 100, days: 2,  issue: '' },
    { id: 'ls-20', client: 'northedge', location: 'Austin, TX (HQ)',    platform: 'google',     napStatus: 'consistent', completeness: 95,  days: 8,  issue: 'No service area set' },
    { id: 'ls-21', client: 'northedge', location: 'Austin, TX (HQ)',    platform: 'bing',       napStatus: 'mismatch',   completeness: 79,  days: 29, issue: 'Category mapped to wrong industry' },
    { id: 'ls-22', client: 'lumen',     location: 'Arlington, TX',      platform: 'apple',      napStatus: 'consistent', completeness: 91,  days: 10, issue: '' },
    { id: 'ls-23', client: 'casaverde', location: 'Highlands, Denver',  platform: 'google',     napStatus: 'consistent', completeness: 86,  days: 14, issue: 'Menu link broken' },
    { id: 'ls-24', client: 'peak',      location: 'Tempe, AZ',          platform: 'facebook',   napStatus: 'consistent', completeness: 93,  days: 6,  issue: '' },
  ],

  // ---- Listing platform meta ----
  listingPlatforms: {
    google:     { label: 'Google',     color: '#38bdf8', icon: 'map-pin' },
    yelp:       { label: 'Yelp',       color: '#f43f5e', icon: 'star' },
    facebook:   { label: 'Facebook',   color: '#6366f1', icon: 'facebook' },
    apple:      { label: 'Apple Maps', color: '#a78bfa', icon: 'map' },
    bing:       { label: 'Bing',       color: '#f59e0b', icon: 'globe' },
    trustpilot: { label: 'Trustpilot', color: '#10b981', icon: 'shield-check' },
  },

  // ---- Rating trend (12 weeks, portfolio avg) ----
  trend: {
    labels: ['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5', 'Wk6', 'Wk7', 'Wk8', 'Wk9', 'Wk10', 'Wk11', 'Wk12'],
    rating: [4.42, 4.45, 4.44, 4.48, 4.5, 4.49, 4.52, 4.55, 4.54, 4.57, 4.58, 4.6],
    volume: [88, 94, 91, 103, 110, 99, 118, 121, 114, 132, 141, 150],
  },

  // ---- Sentiment breakdown (this month, across platforms) ----
  sentiment: {
    positive: 384,
    neutral: 61,
    negative: 25,
  },

  // ---- Sentiment themes (topic-level, mined from corpus) ----
  themes: {
    positive: [
      { topic: 'Staff friendliness',  mentions: 214, delta: 18 },
      { topic: 'Speed / short wait',  mentions: 156, delta: 24 },
      { topic: 'Quality of work',     mentions: 142, delta: 9  },
      { topic: 'Clean facilities',    mentions: 98,  delta: 6  },
      { topic: 'Value for price',     mentions: 71,  delta: -4 },
    ],
    negative: [
      { topic: 'Wait time',            mentions: 41, delta: -7 },
      { topic: 'Billing / pricing',    mentions: 33, delta: 11 },
      { topic: 'Packaging / shipping', mentions: 24, delta: 5  },
      { topic: 'Website / checkout',   mentions: 19, delta: 8  },
      { topic: 'Reachability',         mentions: 14, delta: -3 },
    ],
  },

  // ---- Competitor benchmark (client vs 3-4 named local rivals) ----
  // Metrics: rating, reviews, velocity (new reviews/mo), responseRate (%), sentiment (positive %).
  benchmark: [
    {
      client: 'lumen',
      set: [
        { name: 'Lumen Dental Group',  isUs: true, rating: 4.8, reviews: 1840, velocity: 64, responseRate: 96, sentiment: 91 },
        { name: 'Brightsmile Dental',  rating: 4.6, reviews: 1120, velocity: 38, responseRate: 71, sentiment: 84 },
        { name: 'Cedar Park Dental',   rating: 4.4, reviews: 884,  velocity: 29, responseRate: 54, sentiment: 79 },
        { name: 'Metro Family Dental', rating: 4.5, reviews: 712,  velocity: 41, responseRate: 63, sentiment: 82 },
      ],
    },
    {
      client: 'casaverde',
      set: [
        { name: 'Casa Verde',   isUs: true, rating: 4.7, reviews: 980,  velocity: 47, responseRate: 95, sentiment: 89 },
        { name: 'The Larkspur', rating: 4.5, reviews: 1340, velocity: 41, responseRate: 58, sentiment: 81 },
        { name: 'Mercantile',   rating: 4.6, reviews: 1102, velocity: 52, responseRate: 64, sentiment: 85 },
        { name: 'Olive & Ash',  rating: 4.4, reviews: 760,  velocity: 33, responseRate: 49, sentiment: 77 },
      ],
    },
    {
      client: 'peak',
      set: [
        { name: 'Peak Performance', isUs: true, rating: 4.7, reviews: 612, velocity: 36, responseRate: 97, sentiment: 90 },
        { name: 'IronHaus Fitness', rating: 4.2, reviews: 540, velocity: 22, responseRate: 44, sentiment: 72 },
        { name: 'Forge Athletics',  rating: 4.5, reviews: 488, velocity: 31, responseRate: 60, sentiment: 83 },
      ],
    },
    {
      client: 'atlas',
      set: [
        { name: 'Atlas Self-Storage', isUs: true, rating: 4.2, reviews: 388, velocity: 18, responseRate: 92, sentiment: 74 },
        { name: 'Vault Self-Storage', rating: 4.6, reviews: 720, velocity: 44, responseRate: 67, sentiment: 86 },
        { name: 'StoreRight',         rating: 4.3, reviews: 512, velocity: 29, responseRate: 51, sentiment: 78 },
        { name: 'CitySpace Storage',  rating: 4.1, reviews: 410, velocity: 24, responseRate: 38, sentiment: 70 },
      ],
    },
  ],
};
