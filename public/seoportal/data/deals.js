window.DEAL_STAGES = [
  { id: 'cold',       label: 'Cold',          color: '#64748b' },
  { id: 'contacted',  label: 'Contacted',     color: '#0ea5e9' },
  { id: 'qualified',  label: 'Qualified',     color: '#6366f1' },
  { id: 'demo',       label: 'Demo',          color: '#a78bfa' },
  { id: 'proposal',   label: 'Proposal',      color: '#f59e0b' },
  { id: 'closed_won', label: 'Closed-Won',    color: '#10b981' },
  { id: 'closed_lost',label: 'Closed-Lost',   color: '#ef4444' },
];

window.DEALS = [
  { id: 'd-001', name: 'SH Storage', contact: 'Sara Hill',     value: 1000, prob: 30, stage: 'cold',       score: 87, owner: 'Mark', close: '2026-07-12', age: 1,  tier: 'audit', source: 'web' },
  { id: 'd-002', name: 'Park Storage Co', contact: 'Devon Park', value: 800, prob: 25, stage: 'cold',     score: 71, owner: 'Mark', close: '2026-07-18', age: 2,  tier: 'audit', source: 'cold' },
  { id: 'd-003', name: 'Sutter Brothers Storage', contact: 'Sam Sutter', value: 1200, prob: 35, stage: 'cold', score: 76, owner: 'Mark', close: '2026-07-22', age: 3, tier: 'audit', source: 'cold' },
  { id: 'd-004', name: 'BluePeak Storage', contact: 'Aaron Reese', value: 600, prob: 28, stage: 'cold',   score: 69, owner: 'Mark', close: '2026-08-01', age: 5, tier: 'audit', source: 'apollo' },
  { id: 'd-005', name: 'MA Storage Group', contact: 'Mike Adams', value: 1500, prob: 60, stage: 'contacted', score: 92, owner: 'Mark', close: '2026-06-30', age: 4, tier: 'audit', source: 'apollo' },
  { id: 'd-006', name: 'Foster Self Storage', contact: 'Adam Foster', value: 800, prob: 55, stage: 'contacted', score: 81, owner: 'Mark', close: '2026-07-05', age: 1, tier: 'audit', source: 'qwoted' },
  { id: 'd-007', name: 'LR Storage', contact: 'Lisa Roberts', value: 1200, prob: 50, stage: 'qualified',  score: 76, owner: 'Mark', close: '2026-06-22', age: 2, tier: 'build', source: 'cold' },
  { id: 'd-008', name: 'Liang Storage Group', contact: 'Renee Liang', value: 1500, prob: 55, stage: 'qualified', score: 85, owner: 'Mark', close: '2026-06-25', age: 3, tier: 'build', source: 'featured' },
  { id: 'd-009', name: 'JP Self Storage', contact: 'John Park', value: 2000, prob: 70, stage: 'demo',     score: 91, owner: 'Mark', close: '2026-06-12', age: 1, tier: 'retainer', source: 'featured' },
  { id: 'd-010', name: 'Mustafa 3PL', contact: 'Murtaza Mustafa', value: 8000, prob: 65, stage: 'demo',  score: 88, owner: 'Mark', close: '2026-07-01', age: 3, tier: 'partnership', source: 'web' },
  { id: 'd-011', name: 'CB Storage Partners', contact: 'Carla Brennan', value: 1800, prob: 80, stage: 'proposal', score: 88, owner: 'Mark', close: '2026-06-10', age: 2, tier: 'retainer', source: 'featured' },
  { id: 'd-012', name: 'Veraart Digital', contact: 'Tamara Veraart', value: 497, prob: 90, stage: 'closed_won', score: 94, owner: 'Mark', close: '2026-05-13', age: 2, tier: 'build', source: 'web' },
  { id: 'd-013', name: 'GrowthBoost (Mark)', contact: 'Mark Faiz', value: 300, prob: 100, stage: 'closed_won', score: 98, owner: 'Mark', close: '2026-04-07', age: 38, tier: 'audit', source: 'web' },
  { id: 'd-014', name: 'Triangle Storage', contact: 'Pam Triangle', value: 1400, prob: 100, stage: 'closed_won', score: 86, owner: 'Mark', close: '2026-04-22', age: 23, tier: 'audit', source: 'apollo' },
  { id: 'd-015', name: 'Mishler Storage', contact: 'Ron Mishler', value: 800, prob: 0, stage: 'closed_lost', score: 64, owner: 'Mark', close: '2026-05-09', age: 6, tier: 'audit', source: 'apollo' },
  { id: 'd-016', name: 'NetSpace Storage', contact: 'Jordan Hale', value: 1100, prob: 0, stage: 'closed_lost', score: 70, owner: 'Mark', close: '2026-05-02', age: 13, tier: 'audit', source: 'cold' },
];

window.OUTREACH_CAMPAIGNS = [
  {
    id: 'oc-001',
    name: 'Self-Storage Q2 Push',
    status: 'running',
    sent: 247, replied: 18, replyRate: 7.3,
    booked: 5, closed: 2, domainsWarm: 5, domainsTotal: 5,
    steps: [
      { n: 1, name: 'Bad GBP teardown',  sent: 247, replied: 18, rate: 7.3 },
      { n: 2, name: 'Follow-up + 1 tip', sent: 158, replied: 12, rate: 7.6 },
      { n: 3, name: 'Final + booking',   sent: 92,  replied: 5,  rate: 5.4 },
    ],
    insight: 'Step 1 reply rate is 8.2% on Tuesdays, 4.1% on Fridays. Suggest sending only Tuesdays and Wednesdays.',
  },
  {
    id: 'oc-002',
    name: 'White-label Partner Outreach',
    status: 'paused',
    sent: 84, replied: 9, replyRate: 10.7,
    booked: 4, closed: 1, domainsWarm: 3, domainsTotal: 3,
    steps: [
      { n: 1, name: 'Loom + free audit offer', sent: 84, replied: 9, rate: 10.7 },
      { n: 2, name: 'Case study send-over',     sent: 54, replied: 4, rate: 7.4 },
      { n: 3, name: 'Close + onboard',          sent: 28, replied: 2, rate: 7.1 },
    ],
    insight: 'Convert rate per replied lead is 22% — 3x the cold benchmark. Scale this sequence.',
  },
];

window.PROPOSALS = [
  { id: 'p-001', deal: 'CB Storage Partners',  tier: 'retainer', value: 1800, sent_at: '2026-05-11', signed_at: null,         status: 'awaiting',   doc: 'cb-storage-proposal.pdf' },
  { id: 'p-002', deal: 'Mustafa 3PL',          tier: 'partnership', value: 8000, sent_at: '2026-05-09', signed_at: null,      status: 'viewed',     doc: 'mustafa-3pl-proposal.pdf' },
  { id: 'p-003', deal: 'Veraart Digital',      tier: 'build',   value: 497,  sent_at: '2026-05-12', signed_at: '2026-05-13', status: 'signed',    doc: 'veraart-build-contract.pdf' },
  { id: 'p-004', deal: 'GrowthBoost (Mark)', tier: 'audit',   value: 300,  sent_at: '2026-04-06', signed_at: '2026-04-07', status: 'signed',    doc: 'mark-audit-contract.pdf' },
  { id: 'p-005', deal: 'Triangle Storage',     tier: 'audit',   value: 1400, sent_at: '2026-04-20', signed_at: '2026-04-22', status: 'signed',    doc: 'triangle-audit-contract.pdf' },
];
