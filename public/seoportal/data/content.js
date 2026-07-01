/* ============================================================
   Content macro seed - hub + micro sub-modules:
     content           pipeline kanban (board)
     content.blog      writing workspace (doc editor)
     content.social    scripting workspace (IG/TikTok)
     content.video     script workspace (scene blocks)
     content.ads       variations grid
     content.email     email engine workspace
     content.calendar  month editorial calendar
     content.library   dense asset list
   Six formats: blog, landing, ad, email, social, video.
   Keyed to window.CLIENTS / window.TEAM. Dated relative to
   window.TODAY (2026-06-26).
   ============================================================ */

window.CONTENT = {

  kpis: {
    inProduction: 19, inProductionDelta: 5,
    publishedMtd: 26, publishedDelta: 6,
    draftsReady: 8,    draftsDelta: 3,
    awaitingClient: 6, awaitingDelta: -1,
    organicSessions: 184200, organicDelta: 12,
  },

  // ---- Editorial pipeline kanban. 17 cards across 5 stages. ----
  // stage: brief | drafting | internal | client | published
  // type: blog | landing | ad | email | social | video
  pipeline: [
    { id: 'p-01', title: 'Invisalign vs braces - cost guide',        client: 'lumen',     type: 'blog',    owner: 't-aimen',  due: 4,  stage: 'brief' },
    { id: 'p-02', title: 'Boat and RV storage landing page',         client: 'atlas',     type: 'landing', owner: 't-sara',   due: 2,  stage: 'brief' },
    { id: 'p-03', title: 'Patio-season Reels script (x3)',           client: 'casaverde', type: 'social',  owner: 't-aimen',  due: 6,  stage: 'brief' },
    { id: 'p-04', title: 'Sprint velocity - explainer video script', client: 'northedge', type: 'video',   owner: 't-dana',   due: 8,  stage: 'brief' },

    { id: 'p-05', title: 'Gantt chart software - pillar guide',      client: 'northedge', type: 'blog',    owner: 't-dana',   due: 5,  stage: 'drafting' },
    { id: 'p-06', title: 'Vitamin C serum - PDP rewrite',            client: 'verdant',   type: 'landing', owner: 't-aimen',  due: 3,  stage: 'drafting' },
    { id: 'p-07', title: 'Meta ad copy - summer membership',         client: 'peak',      type: 'ad',      owner: 't-khizer', due: 1,  stage: 'drafting' },
    { id: 'p-08', title: 'Welcome email sequence (5 steps)',         client: 'verdant',   type: 'email',   owner: 't-aimen',  due: 7,  stage: 'drafting' },
    { id: 'p-17', title: 'TikTok hook test - serum results',         client: 'verdant',   type: 'social',  owner: 't-aimen',  due: 2,  stage: 'drafting' },

    { id: 'p-09', title: 'Climate-controlled storage explainer',     client: 'atlas',     type: 'blog',    owner: 't-sara',   due: 2,  stage: 'internal' },
    { id: 'p-10', title: 'Emergency dentist - city landing page',    client: 'lumen',     type: 'landing', owner: 't-omar',   due: 3,  stage: 'internal' },
    { id: 'p-11', title: 'Sprint planning - feature deep dive',      client: 'northedge', type: 'blog',    owner: 't-dana',   due: 4,  stage: 'internal' },

    { id: 'p-12', title: 'July social calendar (12 posts)',          client: 'casaverde', type: 'social',  owner: 't-aimen',  due: -1, stage: 'client' },
    { id: 'p-13', title: 'Re-engagement email - lapsed members',     client: 'peak',      type: 'email',   owner: 't-aimen',  due: 1,  stage: 'client' },
    { id: 'p-14', title: 'Google ad copy - implants frisco',         client: 'lumen',     type: 'ad',      owner: 't-khizer', due: 0,  stage: 'client' },
    { id: 'p-15', title: 'Unboxing video script - serum kit',        client: 'verdant',   type: 'video',   owner: 't-aimen',  due: 2,  stage: 'client' },

    { id: 'p-16', title: 'Self-storage moving checklist',           client: 'atlas',     type: 'blog',    owner: 't-sara',   due: -3, stage: 'published' },
  ],

  // ---- Month editorial calendar. dayOffset relative to TODAY. ----
  calendar: [
    { title: 'Self-storage moving checklist',        client: 'atlas',     type: 'blog',    dayOffset: -3,  status: 'published' },
    { title: 'Farm-to-table summer menu launch',     client: 'casaverde', type: 'social',  dayOffset: -2,  status: 'published' },
    { title: 'How to choose a PM tool',              client: 'northedge', type: 'blog',    dayOffset: -3,  status: 'published' },
    { title: 'Spring cleaning storage tips',         client: 'atlas',     type: 'social',  dayOffset: -6,  status: 'published' },
    { title: 'Whitening before a wedding',           client: 'lumen',     type: 'blog',    dayOffset: -8,  status: 'published' },
    { title: 'Summer membership promo',              client: 'peak',      type: 'landing', dayOffset: -6,  status: 'published' },
    { title: 'Implants Frisco - search ad set',      client: 'lumen',     type: 'ad',      dayOffset: -5,  status: 'published' },
    { title: 'Vegan brunch reel',                    client: 'casaverde', type: 'video',   dayOffset: -9,  status: 'published' },

    { title: 'Climate storage - why it matters',     client: 'atlas',     type: 'blog',    dayOffset: 1,   status: 'scheduled' },
    { title: 'July content calendar - all channels', client: 'lumen',     type: 'social',  dayOffset: 2,   status: 'scheduled' },
    { title: 'Implants Frisco - Google ad set',      client: 'lumen',     type: 'ad',      dayOffset: 2,   status: 'scheduled' },
    { title: 'Re-engagement email - lapsed members', client: 'peak',      type: 'email',   dayOffset: 4,   status: 'scheduled' },
    { title: 'Gantt chart software - pillar guide',  client: 'northedge', type: 'blog',    dayOffset: 5,   status: 'scheduled' },
    { title: 'Patio-season Reels (x3)',              client: 'casaverde', type: 'video',   dayOffset: 6,   status: 'scheduled' },
    { title: 'Vitamin C serum - PDP rewrite',        client: 'verdant',   type: 'landing', dayOffset: 7,   status: 'scheduled' },
    { title: 'TikTok hook test - serum results',     client: 'verdant',   type: 'social',  dayOffset: 8,   status: 'scheduled' },
    { title: 'Welcome email sequence',               client: 'verdant',   type: 'email',   dayOffset: 9,   status: 'scheduled' },
    { title: 'Unboxing video - serum kit',           client: 'verdant',   type: 'video',   dayOffset: 11,  status: 'scheduled' },
    { title: 'Emergency dentist - city page',        client: 'lumen',     type: 'landing', dayOffset: 13,  status: 'scheduled' },
    { title: 'Sprint velocity explainer',            client: 'northedge', type: 'video',   dayOffset: 15,  status: 'scheduled' },
    { title: 'Boat and RV storage page',             client: 'atlas',     type: 'landing', dayOffset: 16,  status: 'scheduled' },
    { title: 'Summer membership - Meta ad set',      client: 'peak',      type: 'ad',      dayOffset: 3,   status: 'scheduled' },
  ],

  // ---- Suggested briefs to fill a calendar gap. ----
  suggestedBriefs: [
    { title: 'Drive-up vs indoor storage - which to pick', client: 'atlas',     type: 'blog',  gapDay: 19, volume: 2400, kd: 24 },
    { title: 'Best time of year to whiten teeth',          client: 'lumen',     type: 'blog',  gapDay: 20, volume: 1300, kd: 18 },
    { title: 'Burndown vs burnup charts explained',        client: 'northedge', type: 'video', gapDay: 22, volume: 880,  kd: 31 },
  ],

  // ---- Content briefs (SEO-targeted). Each maps to a pipeline id. ----
  briefs: {
    'p-05': {
      title: 'Gantt chart software - pillar guide',
      client: 'northedge', type: 'blog', owner: 't-dana',
      targetKeyword: 'gantt chart software',
      volume: 9900, difficulty: 46, intent: 'Commercial',
      currentRank: 14, targetRank: 3, wordTarget: 2400, wordTargetMin: 2100,
      angle: 'Position the product as the agile-native Gantt alternative. Lead with the dependency-mapping pain, not feature lists.',
      outline: [
        { level: 'H2', text: 'What is a Gantt chart and when teams outgrow spreadsheets' },
        { level: 'H3', text: 'The 4 elements every Gantt chart needs' },
        { level: 'H2', text: 'How to choose Gantt chart software in 2026' },
        { level: 'H3', text: 'Dependency mapping and critical-path support' },
        { level: 'H3', text: 'Pricing models compared (per-seat vs flat)' },
        { level: 'H2', text: 'Gantt software for agile teams - the sprint overlay' },
        { level: 'H2', text: 'Migrating from a spreadsheet in under an hour' },
        { level: 'H2', text: 'FAQ - Gantt charts vs Kanban, free options, exports' },
      ],
      supportingKeywords: [
        { kw: 'free gantt chart software', vol: 4400, kd: 38 },
        { kw: 'gantt chart for agile teams', vol: 1600, kd: 29 },
        { kw: 'gantt chart vs kanban', vol: 2900, kd: 22 },
        { kw: 'online gantt chart maker', vol: 3600, kd: 41 },
        { kw: 'project timeline software', vol: 2100, kd: 35 },
        { kw: 'critical path method tool', vol: 720, kd: 27 },
      ],
      internalLinks: ['Asana alternative for agile teams', 'Sprint planning - feature deep dive', 'How to choose a PM tool'],
    },
  },

  // ---- Active blog draft shown in the writing workspace (content.blog). ----
  // A real multi-paragraph article with structured blocks.
  blogDoc: {
    id: 'b-doc', client: 'northedge', type: 'blog', owner: 't-dana',
    status: 'drafting', stage: 'Drafting', updatedHrs: 2,
    title: 'Gantt chart software - the complete 2026 guide',
    targetKeyword: 'gantt chart software',
    volume: 9900, difficulty: 46, intent: 'Commercial',
    currentRank: 14, targetRank: 3,
    words: 1840, wordTarget: 2400, readMins: 9,
    metaTitle: 'Gantt Chart Software: The Complete 2026 Buyer Guide',
    metaDescription: 'Compare the best Gantt chart software for 2026. Dependency mapping, sprint overlays, pricing, and a migration path that imports your spreadsheet in minutes.',
    slug: '/blog/gantt-chart-software',
    outline: [
      { level: 'H2', text: 'What a Gantt chart is and when teams outgrow spreadsheets', done: true },
      { level: 'H3', text: 'The 4 elements every Gantt chart needs', done: true },
      { level: 'H2', text: 'How to choose Gantt chart software in 2026', done: true },
      { level: 'H3', text: 'Dependency mapping and critical-path support', done: true },
      { level: 'H3', text: 'Pricing models compared', done: false },
      { level: 'H2', text: 'Gantt software for agile teams', done: false },
      { level: 'H2', text: 'Migrating from a spreadsheet', done: false },
      { level: 'H2', text: 'FAQ', done: false },
    ],
    blocks: [
      { kind: 'h1', text: 'Gantt chart software - the complete 2026 guide' },
      { kind: 'lede', text: 'A Gantt chart turns a tangle of tasks and dependencies into a single timeline your whole team can read. This guide covers what to look for, how the leading tools compare, and how to migrate without losing a week.' },
      { kind: 'h2', text: 'What a Gantt chart is and when teams outgrow spreadsheets' },
      { kind: 'p', text: 'For project managers juggling overlapping sprints, a Gantt chart is the fastest way to spot a slipping deadline before it cascades into the next release. The bars are simple, but the discipline they enforce is not: every task has a start, an end, and an owner, and nothing hides in a spreadsheet tab nobody opens.' },
      { kind: 'p', text: 'Most teams outgrow their first tool the moment dependencies get real. A launch with twelve moving parts, three external vendors, and a hard event date is not a list. It is a network, and when one task slips you need the tool to tell you which five downstream tasks just moved with it. That is the difference between a static chart and critical-path software that does the math for you.' },
      { kind: 'h2', text: 'How to choose Gantt chart software in 2026' },
      { kind: 'p', text: 'When you evaluate options in 2026, three things separate the serious tools from the pretty ones. First, dependency mapping that supports finish-to-start and start-to-start links, not just visual arrows. Second, a sprint overlay so agile teams can see iteration boundaries on the same timeline as the long-range plan. Third, a migration path that imports your existing spreadsheet in minutes, because a tool nobody adopts is worse than the mess it replaced.' },
      { kind: 'quote', text: 'Pick the tool that makes the next slipped deadline visible the day it happens, not the week it ships late.' },
      { kind: 'p', text: 'Pricing is where most comparison guides go quiet, so we will not. Per-seat models punish growing teams; flat-rate models reward them. For an agency or an in-house team above ten people, the flat plan almost always wins on total cost once you factor in the freelancers and clients you invite as guests. Run the math on your real headcount before you commit to an annual contract.' },
    ],
    seoChecks: [
      { label: 'Target keyword in H1', pass: true },
      { label: 'Keyword in first 100 words', pass: true },
      { label: 'Meta title 50-60 chars', pass: true },
      { label: 'Meta description 140-160 chars', pass: true },
      { label: '3+ internal links placed', pass: false, note: '1 of 3 placed' },
      { label: 'Image alt text on all media', pass: false, note: '2 images missing alt' },
      { label: 'Word count at target', pass: false, note: '1,840 of 2,400' },
      { label: 'FAQ schema block', pass: false, note: 'not started' },
    ],
  },

  // ---- Social script shown in content.social (IG / TikTok scripting). ----
  socialScript: {
    id: 's-script', client: 'verdant', type: 'social',
    format: 'TikTok / Reel', owner: 't-aimen', durationSec: 32, status: 'Drafting',
    title: 'Vitamin C serum - 14-day results hook test',
    handle: '@verdantskin',
    hookIdeas: [
      'POV: your dullest skin meets a 15% vitamin C',
      'I tested this serum for 14 days so you do not have to',
      'The serum dermatologists keep gatekeeping',
      'Stop buying vitamin C until you watch this',
    ],
    blocks: [
      { kind: 'Hook', sec: '0-3s', onscreen: '14 days. one serum.', text: 'I put a 15% vitamin C serum on one half of my face for two weeks. Here is what actually happened.' },
      { kind: 'Body', sec: '3-12s', onscreen: 'the active that matters', text: 'The form is L-ascorbic acid, the most researched vitamin C in skincare. At 15% it is strong enough to work and gentle enough for daily use, sealed in an airless pump so it does not oxidize.' },
      { kind: 'Body', sec: '12-24s', onscreen: 'day 1 vs day 14', text: 'Day one, nothing. Day seven, brighter. Day fourteen, the dullness around my cheeks was visibly lifted and two old dark spots had started to fade. No irritation, no pilling under makeup.' },
      { kind: 'CTA', sec: '24-32s', onscreen: '30-day money back', text: 'Try it for thirty days. If your skin does not thank you, they refund it, no return shipping. Link in bio.' },
    ],
    shotList: [
      { shot: 'Talking head, natural window light', note: 'hook line, hold serum bottle up' },
      { shot: 'Close-up dropper on damp skin', note: 'slow motion, satisfying' },
      { shot: 'Split-screen day 1 vs day 14', note: 'use saved selfies, same angle' },
      { shot: 'Pack shot with bio link overlay', note: 'CTA, point down to caption' },
    ],
    caption: 'I tested this 15% vitamin C serum for 14 days and the dark spots are fading. 30-day money back if it does not work for you. #vitaminc #skincare #skincareroutine',
    projected: { views: 42000, saves: 1900, ctr: 4.1 },
  },

  // ---- Video script shown in content.video (scene blocks). ----
  videoScript: {
    id: 'v-script', client: 'northedge', type: 'video',
    format: 'Explainer', owner: 't-dana', durationSec: 95, status: 'Drafting',
    title: 'Sprint velocity, explained in 90 seconds',
    angle: 'Demystify velocity for new scrum masters. Show, do not lecture - one running example carried through every scene. Land on the product as the tool that calculates it automatically.',
    scenes: [
      { n: 1, label: 'Cold open', dur: 8, visual: 'Whiteboard with a messy burndown, hand wipes it clean', vo: 'Your team finished eight stories last sprint. Or was it twenty points? If those two numbers feel like different languages, this is for you.' },
      { n: 2, label: 'Define it', dur: 14, visual: 'Animated bar fills to "32 points" over a 2-week bracket', vo: 'Velocity is simply the amount of work a team completes in one sprint, measured in story points. Not hours. Not tasks. Points - your own team-relative unit of effort.' },
      { n: 3, label: 'Show the math', dur: 18, visual: 'Three sprint bars: 28, 35, 31, then a dotted average line at 31', vo: 'Take the last three sprints, average the points you actually shipped, and you have your velocity. Thirty-one here. That average, not your best week, is what you plan against.' },
      { n: 4, label: 'Why it matters', dur: 20, visual: 'Calendar fills with future sprints, a release date snaps into place', vo: 'Once you know velocity, forecasting stops being a guess. Sixty points of work left, thirty-one a sprint, and you can tell a stakeholder the release lands in two sprints, with a straight face.' },
      { n: 5, label: 'The trap', dur: 17, visual: 'Velocity line spikes, then a manager frowns', vo: 'One warning: velocity is a planning tool, not a scoreboard. The moment you push a team to make the number go up, they inflate estimates, and the number stops meaning anything.' },
      { n: 6, label: 'CTA', dur: 18, visual: 'Product UI auto-calculates velocity, callout circles the chart', vo: 'Northedge tracks velocity for you, sprint over sprint, so you plan from real numbers instead of a spreadsheet. Start a free trial and import your last three sprints in a click.' },
    ],
    storyboard: [
      { frame: 1, label: 'Messy whiteboard', note: 'hand-drawn, wiped clean' },
      { frame: 2, label: 'Bar to 32 pts', note: 'green fill, 2-wk bracket' },
      { frame: 3, label: 'Three sprint bars', note: 'average dotted line' },
      { frame: 4, label: 'Calendar forecast', note: 'release date snap' },
      { frame: 5, label: 'Spike + frown', note: 'caution beat' },
      { frame: 6, label: 'Product UI', note: 'auto-calc callout' },
    ],
  },

  // ---- Ad copy variations matrix (content.ads). ----
  // Grouped by client + platform; each variant has framework + A/B status.
  adGroups: [
    {
      client: 'peak', platform: 'Meta', objective: 'Summer membership - lapsed reactivation',
      variants: [
        { id: 'a1', framework: 'PAS',  headline: '3 months, pay for 2', primary: 'The hardest rep is the first one through the door. Lock in summer across all 5 studios - small-group coaching, recovery sauna, no contracts. Offer ends Sunday.', cta: 'Sign Up', status: 'winner', ctr: 3.4, cpa: 18 },
        { id: 'a2', framework: 'AIDA', headline: 'Your strongest summer starts here', primary: 'Train at all five Phoenix and Scottsdale studios on one membership. No enrollment fee, cancel anytime. Limited summer spots.', cta: 'Claim Offer', status: 'testing', ctr: 2.9, cpa: 22 },
        { id: 'a3', framework: 'FOMO', headline: 'Summer spots are closing', primary: 'We cap each cohort so coaching stays personal. A handful of summer memberships left at the 3-for-2 rate. When they are gone, they are gone.', cta: 'Get Started', status: 'paused', ctr: 2.1, cpa: 31 },
      ],
    },
    {
      client: 'lumen', platform: 'Google Search', objective: 'Dental implants - Frisco intent',
      variants: [
        { id: 'a4', framework: 'Benefit', headline: 'Dental Implants in Frisco | Same-Day Consult', primary: 'Permanent, natural-looking implants from a top-rated Frisco dentist. Free 3D scan, transparent pricing, financing from $0 down.', cta: 'Book Now', status: 'winner', ctr: 8.2, cpa: 41 },
        { id: 'a5', framework: 'Trust', headline: 'Frisco Implant Dentist | 1,200+ 5-Star Reviews', primary: 'Trusted by Frisco families for over a decade. Sedation options, lifetime warranty, and a free consultation this week.', cta: 'Schedule Visit', status: 'testing', ctr: 7.4, cpa: 47 },
        { id: 'a6', framework: 'Price', headline: 'Implants From $89/mo | Frisco', primary: 'Affordable implant financing with no surprises. Free quote, instant pre-approval, and a same-week appointment.', cta: 'Get Quote', status: 'testing', ctr: 6.8, cpa: 52 },
      ],
    },
    {
      client: 'verdant', platform: 'Meta', objective: 'Vitamin C serum - cold prospecting',
      variants: [
        { id: 'a7', framework: 'PAS',  headline: 'Dull skin? Start here.', primary: 'Retinol and SPF alone never quite reach the dullness. A 15% L-ascorbic serum does. Brighter skin in 14 days or your money back.', cta: 'Shop Now', status: 'winner', ctr: 2.7, cpa: 26 },
        { id: 'a8', framework: 'Social', headline: '4,000 reviewers, one glow', primary: 'It sinks in, it does not pill, and the glow is real. See why our vitamin C serum is the one people repurchase. 30-day money-back.', cta: 'Try It', status: 'testing', ctr: 2.4, cpa: 29 },
        { id: 'a9', framework: 'AIDA', headline: 'The serum dermatologists gatekeep', primary: 'Stabilized 15% L-ascorbic acid in an airless pump, so it works on day 30 the way it worked on day 1. Fresh, potent, refundable.', cta: 'Shop Now', status: 'draft', ctr: 0, cpa: 0 },
      ],
    },
    {
      client: 'atlas', platform: 'Google Search', objective: 'Climate-controlled storage - local',
      variants: [
        { id: 'a10', framework: 'Benefit', headline: 'Climate-Controlled Storage | 1st Month Free', primary: 'Protect what matters from heat and humidity. Drive-up access, 24/7 security, no deposit. Reserve a unit online in 2 minutes.', cta: 'Reserve Now', status: 'winner', ctr: 5.6, cpa: 23 },
        { id: 'a11', framework: 'Urgency', headline: 'Units Selling Fast | Reserve Today', primary: 'Climate-controlled units in your size are limited this month. Lock yours in now with no commitment and the first month free.', cta: 'Check Availability', status: 'testing', ctr: 4.9, cpa: 28 },
      ],
    },
  ],

  // ---- Email engine (content.email). One sequence + the active draft. ----
  emailSequence: {
    client: 'verdant', name: 'New subscriber welcome', steps: [
      { n: 1, name: 'Welcome + routine', delay: 'Immediate', status: 'live', open: 64, click: 18 },
      { n: 2, name: 'The science of vitamin C', delay: 'Day 2', status: 'live', open: 51, click: 12 },
      { n: 3, name: 'How to layer actives', delay: 'Day 4', status: 'draft', open: 0, click: 0 },
      { n: 4, name: 'Real results, real reviews', delay: 'Day 7', status: 'draft', open: 0, click: 0 },
      { n: 5, name: 'Your 15% off expires', delay: 'Day 10', status: 'planned', open: 0, click: 0 },
    ],
    active: {
      step: 1, handle: 'Verdant Skin', fromEmail: 'hello@verdantskin.com',
      subject: 'Welcome to Verdant - your 3-step routine inside',
      preview: 'Plus 15% off your next order, no rush.',
      subjectAB: [
        { v: 'A', text: 'Welcome to Verdant - your 3-step routine inside', open: 64, status: 'winner' },
        { v: 'B', text: 'Your skin is about to thank you (routine inside)', open: 58, status: 'testing' },
      ],
      blocks: [
        { kind: 'p', text: 'Welcome to Verdant. Your skin is about to thank you.' },
        { kind: 'p', text: 'You did the hard part - choosing actives that actually do something - so the next 30 days are about consistency, not more products. Here is the routine our formulators recommend to ease in without overwhelming your barrier.' },
        { kind: 'list', items: ['Mornings: cleanse, two drops of vitamin C on damp skin, moisturizer, SPF.', 'Evenings: cleanse, retinol three nights a week, moisturizer.'] },
        { kind: 'p', text: 'That is the whole thing. Resist the urge to add five more steps in week one - the people with the best results are the ones who did less, longer.' },
        { kind: 'cta', text: 'Shop your routine - 15% off' },
        { kind: 'p', text: 'Reply to this email if your skin reacts or you are not sure what to layer. A real person reads every reply, usually within a day.' },
      ],
    },
  },

  // ---- Topic clusters (kept for reference; surfaced in library detail). ----
  clusters: [
    {
      pillar: 'Project management software', client: 'northedge', pillarStatus: 'published', pillarViews: 12400, coverage: 83,
      pieces: [
        { title: 'How to choose a PM tool',            status: 'published', linked: true },
        { title: 'Asana alternative for agile teams',  status: 'published', linked: true },
        { title: 'Gantt chart software - pillar guide',status: 'draft',     linked: true },
        { title: 'Sprint planning - feature deep dive',status: 'draft',     linked: true },
        { title: 'Kanban vs Scrum for small teams',    status: 'published', linked: false },
        { title: 'Burndown vs burnup charts',          status: 'planned',   linked: false },
      ],
    },
    {
      pillar: 'Self-storage buying guide', client: 'atlas', pillarStatus: 'published', pillarViews: 5400, coverage: 71,
      pieces: [
        { title: '10x10 vs 10x20 - which unit',        status: 'published', linked: true },
        { title: 'Climate-controlled storage explainer',status: 'draft',    linked: true },
        { title: 'Self-storage moving checklist',      status: 'published', linked: true },
        { title: 'Boat and RV storage landing page',   status: 'draft',     linked: false },
        { title: 'Drive-up vs indoor storage',         status: 'planned',   linked: false },
      ],
    },
    {
      pillar: 'Vitamin C skincare', client: 'verdant', pillarStatus: 'published', pillarViews: 6240, coverage: 60,
      pieces: [
        { title: 'Vitamin C serum - skin science explained', status: 'published', linked: true },
        { title: 'Vitamin C serum - PDP rewrite',            status: 'draft',     linked: true },
        { title: 'Best skincare routine for oily skin',      status: 'published', linked: false },
        { title: 'Vitamin C vs retinol - which first',       status: 'planned',   linked: false },
        { title: 'Layering actives without irritation',      status: 'planned',   linked: false },
      ],
    },
  ],

  // ---- Library: every content asset. type/client/author/status/published/perf. ----
  // status: published | scheduled | draft | review. perf views + leads.
  library: [
    { title: 'How to choose a project management tool', client: 'northedge', type: 'blog',    author: 't-dana',   status: 'published', days: 3,  words: 2210, views: 12400, leads: 94 },
    { title: 'Invisalign in Plano - complete guide',     client: 'lumen',     type: 'blog',    author: 't-aimen',  status: 'published', days: 8,  words: 1980, views: 9800,  leads: 71 },
    { title: 'Sprint velocity - explainer video',        client: 'northedge', type: 'video',   author: 't-dana',   status: 'published', days: 7,  words: 420,  views: 9240,  leads: 22 },
    { title: 'Asana alternative for agile teams',        client: 'northedge', type: 'blog',    author: 't-dana',   status: 'published', days: 14, words: 1740, views: 8200,  leads: 58 },
    { title: 'Summer membership promo - landing page',   client: 'peak',      type: 'landing', author: 't-khizer', status: 'published', days: 6,  words: 640,  views: 6600,  leads: 112 },
    { title: 'Vitamin C serum - skin science explained', client: 'verdant',   type: 'blog',    author: 't-aimen',  status: 'published', days: 11, words: 1620, views: 6240,  leads: 14 },
    { title: 'Farm-to-table summer menu launch',         client: 'casaverde', type: 'social',  author: 't-aimen',  status: 'published', days: 2,  words: 180,  views: 18600, leads: 0 },
    { title: '10x10 vs 10x20 - which unit do you need',  client: 'atlas',     type: 'blog',    author: 't-sara',   status: 'published', days: 5,  words: 1340, views: 5400,  leads: 39 },
    { title: 'Private dining at Casa Verde',             client: 'casaverde', type: 'landing', author: 't-omar',   status: 'published', days: 9,  words: 520,  views: 4200,  leads: 28 },
    { title: 'Whitening before a wedding',               client: 'lumen',     type: 'blog',    author: 't-aimen',  status: 'published', days: 8,  words: 1180, views: 3600,  leads: 24 },
    { title: 'Climate-controlled storage explainer',     client: 'atlas',     type: 'blog',    author: 't-sara',   status: 'published', days: 4,  words: 1290, views: 2800,  leads: 21 },
    { title: 'Implants Frisco - search ad set',          client: 'lumen',     type: 'ad',      author: 't-khizer', status: 'published', days: 5,  words: 90,   views: 0,     leads: 63 },
    { title: 'Vegan brunch reel',                        client: 'casaverde', type: 'video',   author: 't-aimen',  status: 'published', days: 9,  words: 160,  views: 7300,  leads: 0 },
    { title: 'Spring cleaning storage tips',             client: 'atlas',     type: 'social',  author: 't-sara',   status: 'published', days: 6,  words: 140,  views: 4100,  leads: 7 },
    { title: 'Welcome email - new subscriber',           client: 'verdant',   type: 'email',   author: 't-aimen',  status: 'published', days: 12, words: 240,  views: 0,     leads: 0 },

    { title: 'Gantt chart software - the complete guide',client: 'northedge', type: 'blog',    author: 't-dana',   status: 'review',    days: 0,  words: 1840, views: 0,     leads: 0 },
    { title: 'Vitamin C serum - PDP rewrite',            client: 'verdant',   type: 'landing', author: 't-aimen',  status: 'review',    days: 0,  words: 640,  views: 0,     leads: 0 },
    { title: 'Climate storage - why it matters',         client: 'atlas',     type: 'blog',    author: 't-sara',   status: 'scheduled', days: -1, words: 1210, views: 0,     leads: 0 },
    { title: 'July content calendar - all channels',     client: 'lumen',     type: 'social',  author: 't-aimen',  status: 'scheduled', days: -2, words: 320,  views: 0,     leads: 0 },
    { title: 'Implants Frisco - Google ad set',          client: 'lumen',     type: 'ad',      author: 't-khizer', status: 'scheduled', days: -2, words: 90,   views: 0,     leads: 0 },
    { title: 'Re-engagement email - lapsed members',     client: 'peak',      type: 'email',   author: 't-aimen',  status: 'scheduled', days: -4, words: 210,  views: 0,     leads: 0 },
    { title: 'TikTok hook test - serum results',         client: 'verdant',   type: 'social',  author: 't-aimen',  status: 'draft',     days: 0,  words: 280,  views: 0,     leads: 0 },
    { title: 'Boat and RV storage landing page',         client: 'atlas',     type: 'landing', author: 't-sara',   status: 'draft',     days: 0,  words: 480,  views: 0,     leads: 0 },
    { title: 'Welcome email sequence (5 steps)',         client: 'verdant',   type: 'email',   author: 't-aimen',  status: 'draft',     days: 0,  words: 980,  views: 0,     leads: 0 },
    { title: 'Sprint planning - feature deep dive',      client: 'northedge', type: 'blog',    author: 't-dana',   status: 'review',    days: 0,  words: 1560, views: 0,     leads: 0 },
    { title: 'Patio-season Reels script (x3)',           client: 'casaverde', type: 'video',   author: 't-aimen',  status: 'draft',     days: 0,  words: 360,  views: 0,     leads: 0 },
    { title: 'Emergency dentist - city landing page',    client: 'lumen',     type: 'landing', author: 't-omar',   status: 'review',    days: 0,  words: 620,  views: 0,     leads: 0 },
    { title: 'Unboxing video script - serum kit',        client: 'verdant',   type: 'video',   author: 't-aimen',  status: 'review',    days: 0,  words: 410,  views: 0,     leads: 0 },
  ],

  // ---- Monthly organic-traffic-by-content (for the optional chart). ----
  organicByContent: {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    sessions:  [98000, 104000, 112000, 121000, 133000, 142000, 156000, 169000, 184200],
    published: [12, 14, 11, 16, 18, 15, 19, 22, 26],
  },
};
