/* ============================================================
   Settings seed - the agency's own account: plan & usage,
   automation spend governance, agency billing + client invoicing, white-label
   branding, and security posture. Reuses window.INTEGRATIONS,
   window.CLIENTS, window.AGENCY, window.TEAM where possible.
   Dated relative to window.TODAY (2026-06-26).
   ============================================================ */

window.SETTINGS = {

  // ---- Plan & usage --------------------------------------------------
  // GrowthBoost is on Agency Scale. Seats and client counts mirror AGENCY.
  plan: {
    name: 'Agency Scale',
    priceUsd: 899,
    cycle: 'monthly',
    billedTo: 'GrowthBoost LLC',
    renewsAt: '2026-07-12',          // ~16 days out
    seatsUsed: 11,
    seatsIncluded: 15,
    clientsUsed: 6,
    clientsIncluded: 0,              // 0 = unlimited
    integrationsUsed: 20,
    integrationsIncluded: 50,
    support: 'Priority + CSM',
    aiActionsUsed: 4280,             // automated agent actions this cycle
    aiActionsIncluded: 6000,
    // Feature ladder for the "what you get" strip.
    perks: [
      { label: 'White-label client reports', icon: 'palette',  on: true },
      { label: 'Account Manager',             icon: 'user-cog', on: true },
      { label: 'Custom report domain',        icon: 'globe',    on: true },
      { label: 'SSO / SAML',                  icon: 'key',      on: true },
      { label: 'Audit log export',            icon: 'history',  on: true },
      { label: 'Dedicated CSM',               icon: 'headset',  on: true },
    ],
  },

  // ---- Automation spend / budget governance -------------------------
  // Ties to AGENCY.apiSpentUsd ($612) / apiBudgetUsd ($1200).
  // byChannel ladders to the spent total; pct is share of spend.
  aiUsage: {
    spent: 612,
    budget: 1200,
    forecast: 1085,                  // projected end-of-month spend
    breaker: 1140,                   // circuit breaker arms here
    deltaPct: 9.2,                   // vs prior month
    byChannel: [
      { id: 'ads',        label: 'Paid Ads',     usd: 188, calls: 12400, color: '#f59e0b' },
      { id: 'content',    label: 'Content',      usd: 142, calls: 6100,  color: '#10b981' },
      { id: 'reputation', label: 'Reputation',   usd: 96,  calls: 8800,  color: '#f43f5e' },
      { id: 'social',     label: 'Social',       usd: 78,  calls: 5400,  color: '#a78bfa' },
      { id: 'seo',        label: 'SEO & Local',  usd: 61,  calls: 4200,  color: '#38bdf8' },
      { id: 'email',      label: 'Email & SMS',  usd: 47,  calls: 3100,  color: '#6366f1' },
    ],
    // Model split, for the small provider strip.
    byModel: [
      { label: 'Claude (reasoning + drafting)', usd: 421, pct: 69 },
      { label: 'Embeddings + classification',   usd: 118, pct: 19 },
      { label: 'Vision (creative QA)',          usd: 73,  pct: 12 },
    ],
    // Daily cumulative spend this cycle, for the trend chart. Last point = spent.
    trend: {
      labels: ['Jun 1', 'Jun 5', 'Jun 9', 'Jun 13', 'Jun 17', 'Jun 21', 'Jun 26'],
      spend:    [62, 168, 254, 351, 438, 529, 612],
      forecast: [62, 168, 254, 351, 438, 529, 612, 712, 814, 949, 1085],
      forecastLabels: ['Jun 1', 'Jun 5', 'Jun 9', 'Jun 13', 'Jun 17', 'Jun 21', 'Jun 26', 'Jun 28', 'Jun 30', 'Jul 1', 'Jul 2'],
    },
    // Highest-cost automated actions this cycle, for the top-actions list.
    topActions: [
      { label: 'Ad creative variant generation', channel: 'Paid Ads',   runs: 412, usd: 96 },
      { label: 'Review reply drafting',          channel: 'Reputation', runs: 880, usd: 71 },
      { label: 'Blog + landing draft',           channel: 'Content',    runs: 184, usd: 64 },
      { label: 'Social caption + hashtag set',   channel: 'Social',     runs: 540, usd: 49 },
      { label: 'Local rank + GBP analysis',      channel: 'SEO & Local', runs: 320, usd: 38 },
    ],
    // Per-client spend attribution, drives the governance allocation list.
    byClient: [
      { client: 'verdant',   usd: 168, calls: 9200, capUsd: 200 },
      { client: 'atlas',     usd: 121, calls: 7400, capUsd: 120 },
      { client: 'lumen',     usd: 96,  calls: 6100, capUsd: 150 },
      { client: 'northedge', usd: 88,  calls: 5300, capUsd: 150 },
      { client: 'peak',      usd: 79,  calls: 4800, capUsd: 120 },
      { client: 'casaverde', usd: 60,  calls: 3500, capUsd: 100 },
    ],
  },

  // ---- Billing -------------------------------------------------------
  // The agency's own card + a client-invoicing table (we invoice clients).
  billing: {
    paymentMethod: { brand: 'Visa', last4: '4218', exp: '09 / 2028', name: 'GrowthBoost LLC' },
    processor: 'Stripe',
    processorStatus: 'connected',
    // Summary stats for the revenue band.
    summary: {
      mrrUsd: 47800,                 // matches AGENCY.mrrUsd
      arrUsd: 573600,
      collectedMtdUsd: 38900,
      outstandingUsd: 11200,         // Verdant due + Atlas overdue
      overdueCount: 1,
      dueSoonCount: 1,
    },
    // Per-client invoicing. retainerUsd reads from each client's mrrUsd.
    // status: paid | due | overdue. next = days from TODAY for next invoice.
    // issuedDays = daysAgo the current invoice was issued.
    clients: [
      { client: 'lumen',     invoice: 'GB-2061', status: 'paid',    nextInDays: 9,   method: 'auto-charge', issuedDays: 21 },
      { client: 'verdant',   invoice: 'GB-2062', status: 'due',     nextInDays: 2,   method: 'invoice',     issuedDays: 5 },
      { client: 'northedge', invoice: 'GB-2063', status: 'paid',    nextInDays: 25,  method: 'auto-charge', issuedDays: 5 },
      { client: 'peak',      invoice: 'GB-2064', status: 'paid',    nextInDays: 14,  method: 'auto-charge', issuedDays: 16 },
      { client: 'casaverde', invoice: 'GB-2065', status: 'paid',    nextInDays: 27,  method: 'auto-charge', issuedDays: 3 },
      { client: 'atlas',     invoice: 'GB-2066', status: 'overdue', nextInDays: -4,  method: 'invoice',     issuedDays: 34 },
    ],
    // Recent invoice ledger - last issued documents across all accounts.
    ledger: [
      { invoice: 'GB-2066', client: 'atlas',     amountUsd: 5200, status: 'overdue', issuedDays: 34, method: 'invoice' },
      { invoice: 'GB-2065', client: 'casaverde', amountUsd: 4100, status: 'paid',    issuedDays: 3,  method: 'auto-charge' },
      { invoice: 'GB-2063', client: 'northedge', amountUsd: 9800, status: 'paid',    issuedDays: 5,  method: 'auto-charge' },
      { invoice: 'GB-2062', client: 'verdant',   amountUsd: 6000, status: 'due',     issuedDays: 5,  method: 'invoice' },
      { invoice: 'GB-2061', client: 'lumen',     amountUsd: 7200, status: 'paid',    issuedDays: 21, method: 'auto-charge' },
      { invoice: 'GB-2058', client: 'peak',      amountUsd: 4400, status: 'paid',    issuedDays: 18, method: 'auto-charge' },
      { invoice: 'GB-2054', client: 'atlas',     amountUsd: 5200, status: 'paid',    issuedDays: 38, method: 'invoice' },
    ],
  },

  // ---- White-label ---------------------------------------------------
  // Agency branding applied to every client-facing report + portal.
  whitelabel: {
    brandName: 'GrowthBoost',
    logoColor: '#10b981',
    accentColor: '#10b981',
    customDomain: 'reports.growthboost.io',
    domainVerified: true,
    customLogin: true,
    removeXegentsBadge: true,
    senderEmail: 'reports@growthboost.io',
    senderVerified: true,
    // Per-client branding overrides (we white-label per account too).
    clients: [
      { client: 'lumen',     accent: '#38bdf8', domain: 'insights.lumendental.com', mode: 'co-branded', logoReady: true },
      { client: 'verdant',   accent: '#10b981', domain: 'data.verdantskin.com',     mode: 'fully-white-label', logoReady: true },
      { client: 'northedge', accent: '#6366f1', domain: 'metrics.northedge.io',     mode: 'fully-white-label', logoReady: true },
      { client: 'peak',      accent: '#f59e0b', domain: 'reports.growthboost.io',   mode: 'co-branded', logoReady: false },
      { client: 'casaverde', accent: '#a78bfa', domain: 'reports.growthboost.io',   mode: 'co-branded', logoReady: false },
      { client: 'atlas',     accent: '#f43f5e', domain: 'reports.growthboost.io',   mode: 'co-branded', logoReady: false },
    ],
  },

  // ---- Security ------------------------------------------------------
  // Toggle rows for the security card. `on` drives the status dot.
  security: [
    { id: '2fa',      label: 'Two-factor authentication', desc: 'Required for all 11 seats. Authenticator app + backup codes.', icon: 'shield-check', on: true,  level: 'good' },
    { id: 'sso',      label: 'SSO / SAML',                desc: 'Google Workspace SSO enforced for the agency domain.',         icon: 'key',          on: true,  level: 'good' },
    { id: 'audit',    label: 'Audit log',                 desc: 'Every automated action and approval recorded. 90-day retention.', icon: 'history',    on: true,  level: 'good' },
    { id: 'session',  label: 'Session policy',            desc: 'Auto sign-out after 12h idle. Re-auth for billing changes.',    icon: 'timer',        on: true,  level: 'good' },
    { id: 'ip',       label: 'IP allowlist',              desc: 'Restrict the admin console to known office + VPN ranges.',      icon: 'network',      on: false, level: 'warn' },
    { id: 'approval', label: 'Spend approval gate',       desc: 'Automated actions over $250 projected impact require a human approver.', icon: 'gavel', on: true,  level: 'good' },
  ],

  // ---- Integration metadata (extends window.INTEGRATIONS for the dense list) -
  // Keyed by integration id. scope = OAuth scope summary, owner = team id,
  // data = what it feeds, errors = recent sync errors this cycle.
  intMeta: {
    'google-ads':    { scope: 'read + write', owner: 't-mark',   feeds: 'Paid Ads, Reporting', errors: 0,  health: 99 },
    'meta-ads':      { scope: 'read + write', owner: 't-mark',   feeds: 'Paid Ads, Social',    errors: 0,  health: 98 },
    'tiktok-ads':    { scope: 'read + write', owner: 't-mark',   feeds: 'Paid Ads',            errors: 0,  health: 97 },
    'linkedin-ads':  { scope: 'read + write', owner: 't-omar',   feeds: 'Paid Ads',            errors: 1,  health: 94 },
    'microsoft-ads': { scope: 'expired',      owner: 't-sara',   feeds: 'Paid Ads',            errors: 14, health: 0  },
    'ga4':           { scope: 'read only',    owner: 't-dana',   feeds: 'Reporting, Attribution', errors: 0, health: 100 },
    'gsc':           { scope: 'read only',    owner: 't-dana',   feeds: 'SEO & Local',         errors: 0,  health: 99 },
    'gbp':           { scope: 'read + write', owner: 't-dana',   feeds: 'SEO & Local, Reputation', errors: 2, health: 96 },
    'meta-pages':    { scope: 'read + write', owner: 't-aimen',  feeds: 'Social',              errors: 0,  health: 98 },
    'tiktok-org':    { scope: 'read + write', owner: 't-aimen',  feeds: 'Social',              errors: 0,  health: 97 },
    'linkedin-org':  { scope: 'read + write', owner: 't-aimen',  feeds: 'Social',              errors: 0,  health: 95 },
    'klaviyo':       { scope: 'read + write', owner: 't-omar',   feeds: 'Email & SMS',         errors: 0,  health: 99 },
    'mailchimp':     { scope: 'read + write', owner: 't-omar',   feeds: 'Email & SMS',         errors: 0,  health: 98 },
    'twilio':        { scope: 'read + write', owner: 't-omar',   feeds: 'Email & SMS',         errors: 0,  health: 99 },
    'callrail':      { scope: 'read only',    owner: 't-dana',   feeds: 'Attribution',         errors: 0,  health: 98 },
    'shopify':       { scope: 'read + write', owner: 't-aimen',  feeds: 'E-commerce, Reporting', errors: 0, health: 99 },
    'stripe':        { scope: 'read + write', owner: 't-omar',   feeds: 'Billing',             errors: 0,  health: 100 },
    'wordpress':     { scope: 'read + write', owner: 't-khizer', feeds: 'Content',             errors: 0,  health: 97 },
    'yelp':          { scope: 'rate-limited', owner: 't-khizer', feeds: 'Reputation',          errors: 6,  health: 71 },
    'trustpilot':    { scope: 'none',         owner: 't-khizer', feeds: 'Reputation',          errors: 0,  health: 0  },
  },

  // ---- Recent account activity (audit log preview) -------------------
  // `byTeam` -> getTeam id. `days` -> daysAgo(days) timestamp.
  activity: [
    { byTeam: 't-mark',   action: 'Approved budget shift for Atlas Storage ($1,800)', icon: 'check-circle-2', days: 0 },
    { byTeam: 't-omar',   action: 'Sent invoice GB-2062 to Verdant Skincare',            icon: 'file-text',      days: 0 },
    { byTeam: 't-sara',   action: 'Reconnected Microsoft Ads is pending - reauth queued', icon: 'plug-zap',      days: 1 },
    { byTeam: 't-dana',   action: 'Updated white-label domain for NorthEdge SaaS',        icon: 'globe',          days: 1 },
    { byTeam: 't-khizer', action: 'Enabled 2FA enforcement for the agency workspace',     icon: 'shield-check',   days: 2 },
    { byTeam: 't-aimen',  action: 'Connected Shopify for Verdant Skincare',               icon: 'shopping-bag',   days: 3 },
  ],
};
