// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Channel registry + integration connections. Shared by the
//    Command Center, Clients, Settings/Integrations, and as a
//    reference for per-channel module pages.
//    ============================================================ */
//
// // The marketing channels Xegents OS operates. `route` ties to the nav.
// window.CHANNELS = [
//   { id: 'ads',        label: 'Paid Ads',       route: 'ads',        icon: 'megaphone',   color: '#f59e0b', blurb: 'Search, social & programmatic ad management with AI optimization.' },
//   { id: 'social',     label: 'Social Media',   route: 'social',     icon: 'share-2',     color: '#a78bfa', blurb: 'Scheduling, composer, unified inbox & listening across networks.' },
//   { id: 'seo',        label: 'SEO & Local',    route: 'seo',        icon: 'search',      color: '#38bdf8', blurb: 'Rank tracking, GBP, on-page, citations & backlinks.' },
//   { id: 'content',    label: 'Content',        route: 'content',    icon: 'pen-tool',    color: '#10b981', blurb: 'Briefs, editorial calendar & AI-assisted drafting.' },
//   { id: 'email',      label: 'Email & SMS',    route: 'email',      icon: 'mail',        color: '#6366f1', blurb: 'Campaigns, sequences, deliverability & list health.' },
//   { id: 'reputation', label: 'Reputation',     route: 'reputation', icon: 'star',        color: '#f43f5e', blurb: 'Multi-platform reviews, AI responses & review requests.' },
// ];
// window.getChannel = (id) => window.CHANNELS.find(c => c.id === id);
//
// // External platform integrations (Settings > Integrations + connection chips).
// window.INTEGRATIONS = [
//   { id: 'google-ads',   name: 'Google Ads',          group: 'Paid Ads',   status: 'connected', accounts: 6, icon: 'megaphone',   lastSync: '4m ago' },
//   { id: 'meta-ads',     name: 'Meta Ads',            group: 'Paid Ads',   status: 'connected', accounts: 5, icon: 'facebook',    lastSync: '6m ago' },
//   { id: 'tiktok-ads',   name: 'TikTok Ads',          group: 'Paid Ads',   status: 'connected', accounts: 3, icon: 'music',       lastSync: '9m ago' },
//   { id: 'linkedin-ads', name: 'LinkedIn Ads',        group: 'Paid Ads',   status: 'connected', accounts: 2, icon: 'linkedin',    lastSync: '14m ago' },
//   { id: 'microsoft-ads',name: 'Microsoft Ads',       group: 'Paid Ads',   status: 'action',    accounts: 1, icon: 'square',      lastSync: 'reauth needed' },
//   { id: 'ga4',          name: 'Google Analytics 4',  group: 'Analytics',  status: 'connected', accounts: 6, icon: 'line-chart',  lastSync: '3m ago' },
//   { id: 'gsc',          name: 'Search Console',      group: 'SEO',        status: 'connected', accounts: 6, icon: 'search',      lastSync: '11m ago' },
//   { id: 'gbp',          name: 'Google Business',     group: 'SEO',        status: 'connected', accounts: 26,icon: 'map-pin',     lastSync: '8m ago' },
//   { id: 'meta-pages',   name: 'Meta Pages & IG',     group: 'Social',     status: 'connected', accounts: 12,icon: 'instagram',   lastSync: '5m ago' },
//   { id: 'tiktok-org',   name: 'TikTok (organic)',    group: 'Social',     status: 'connected', accounts: 4, icon: 'music',       lastSync: '7m ago' },
//   { id: 'linkedin-org', name: 'LinkedIn Pages',      group: 'Social',     status: 'connected', accounts: 3, icon: 'linkedin',    lastSync: '15m ago' },
//   { id: 'klaviyo',      name: 'Klaviyo',             group: 'Email',      status: 'connected', accounts: 2, icon: 'mail',        lastSync: '10m ago' },
//   { id: 'mailchimp',    name: 'Mailchimp',           group: 'Email',      status: 'connected', accounts: 3, icon: 'mail',        lastSync: '12m ago' },
//   { id: 'twilio',       name: 'Twilio SMS',          group: 'Email',      status: 'connected', accounts: 4, icon: 'message-square', lastSync: '6m ago' },
//   { id: 'callrail',     name: 'CallRail',            group: 'Analytics',  status: 'connected', accounts: 5, icon: 'phone',       lastSync: '9m ago' },
//   { id: 'shopify',      name: 'Shopify',             group: 'E-commerce', status: 'connected', accounts: 1, icon: 'shopping-bag',lastSync: '4m ago' },
//   { id: 'stripe',       name: 'Stripe',              group: 'Billing',    status: 'connected', accounts: 1, icon: 'credit-card', lastSync: '2m ago' },
//   { id: 'wordpress',    name: 'WordPress',           group: 'Content',    status: 'connected', accounts: 4, icon: 'file-text',   lastSync: '20m ago' },
//   { id: 'yelp',         name: 'Yelp',                group: 'Reputation', status: 'action',    accounts: 3, icon: 'star',        lastSync: 'rate-limited' },
//   { id: 'trustpilot',   name: 'Trustpilot',          group: 'Reputation', status: 'disconnected', accounts: 0, icon: 'star',     lastSync: 'not connected' },
// ];
//