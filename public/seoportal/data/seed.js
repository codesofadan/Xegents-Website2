/* ============================================================
   Xegents OS - global seed: agency identity, period, user, team,
   notifications. Loaded after components.js so helpers exist.
   ============================================================ */

// Demo "today" - everything is dated relative to this.
window.TODAY = '2026-06-26';

// Re-point the daysAgo helper to the demo's today.
window.daysAgo = (n) => { const d = new Date(window.TODAY); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
window.daysAhead = (n) => { const d = new Date(window.TODAY); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

// The agency operating this Xegents OS instance.
window.AGENCY = {
  name: 'GrowthBoost',
  tagline: 'Full-service digital marketing',
  plan: 'Agency Scale',
  clients: 6,
  seats: 11,
  period: 'June 2026',
  periodShort: 'Jun',
  mrrUsd: 47800,        // agency MRR across the book of business
  apiBudgetUsd: 1200,   // monthly AI spend cap
  apiSpentUsd: 612,
};

// Signed-in user (the agency owner).
window.USER = { name: 'Mark Faiz', email: 'mark@growthboost.io', initials: 'MF', role: 'owner' };

// Roles available in the "view as" switcher.
window.ROLES = [
  { id: 'owner',      label: 'Owner',         person: 'Mark',   icon: 'crown' },
  { id: 'strategist', label: 'Strategist',    person: 'Dana',   icon: 'compass' },
  { id: 'specialist', label: 'Channel lead',  person: 'Khizer', icon: 'wrench' },
  { id: 'creator',    label: 'Creator',       person: 'Aimen',  icon: 'pen-tool' },
  { id: 'client',     label: 'Client view',   person: 'Lumen',  icon: 'building-2' },
];

// Agency team (referenced across modules as owners/assignees).
window.TEAM = [
  { id: 't-mark',   name: 'Mark Faiz',     role: 'Owner',            avatarColor: '#10b981', email: 'mark@growthboost.io',   utilization: 64 },
  { id: 't-dana',   name: 'Dana Brooks',   role: 'Head of Strategy', avatarColor: '#6366f1', email: 'dana@growthboost.io',   utilization: 88 },
  { id: 't-khizer', name: 'Khizer Ali',    role: 'Paid Media Lead',  avatarColor: '#f59e0b', email: 'khizer@growthboost.io', utilization: 92 },
  { id: 't-aimen',  name: 'Aimen Raza',    role: 'Content & Social',  avatarColor: '#a78bfa', email: 'aimen@growthboost.io',  utilization: 79 },
  { id: 't-sara',   name: 'Sara Lin',      role: 'SEO Lead',          avatarColor: '#38bdf8', email: 'sara@growthboost.io',   utilization: 71 },
  { id: 't-omar',   name: 'Omar Naveed',   role: 'Account Manager',   avatarColor: '#f43f5e', email: 'omar@growthboost.io',   utilization: 83 },
];
window.getTeam = (id) => window.TEAM.find(t => t.id === id);

// Top-bar notifications.
window.SEED_NOTIFICATIONS = [
  { title: 'AI flagged 3 ad sets to pause', body: 'Verdant Skincare - TikTok CPA up 41% over 7d. Fix drafted, awaiting your approval.', time: '12m ago', dot: 'red', go: 'approvals' },
  { title: 'Negative review needs a reply', body: 'Lumen Dental (Plano) - 2 star, AI draft ready for review.', time: '38m ago', dot: 'amber', go: 'reputation' },
  { title: 'June report ready to send', body: 'NorthEdge SaaS monthly report drafted with commentary.', time: '1h ago', dot: 'accent', go: 'reporting' },
  { title: 'Budget pacing alert', body: 'Peak Performance - Meta budget 82% spent with 11 days left.', time: '2h ago', dot: 'amber', go: 'ads' },
  { title: 'Content approved by client', body: 'Casa Verde approved 6 of 8 July social posts.', time: '3h ago', dot: 'accent', go: 'social' },
  { title: 'New lead from landing page', body: 'Atlas Storage - "Boat & RV storage" form, routed to pipeline.', time: '4h ago', dot: 'accent', go: 'crm' },
  { title: 'Keyword win', body: 'Lumen Dental now ranks #3 for "invisalign plano".', time: '6h ago', dot: 'accent', go: 'seo' },
];
