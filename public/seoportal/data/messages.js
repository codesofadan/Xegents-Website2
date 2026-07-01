window.MESSAGE_THREADS = [
  {
    id: 'mt-001', client: 'acme', contact: 'Sara McKinley',
    channel: 'whatsapp', subject: 'Athens 1 NAP issue',
    last_at: '2026-05-14 14:31',
    unread: true,
    messages: [
      { from: 'Sara', dir: 'in',  at: '2026-05-14 14:31', body: 'Hey Mark — quick one. We had a call with corporate this morning. They moved Athens 1 phone to (706) 555-1199 starting Monday. Can you make sure that propagates everywhere?' },
      { from: 'AI Suggested', dir: 'draft', at: '2026-05-15 13:11', ai: true, body: 'Thanks Sara, got it. I will get this in front of Khizer today — citation propagation typically takes 7-10 days to fully resolve, but I will queue Whitespark + BrightLocal API updates this afternoon so the major directories update tonight. Will send you confirmation once we have the GBP edit logged with a 5-day cooling window (we are tracking edit-cooling carefully on Athens 2 right now).' },
    ],
  },
  {
    id: 'mt-002', client: 'acme', contact: 'Sara McKinley',
    channel: 'email', subject: 'Q3 strategy approval',
    last_at: '2026-05-13 10:18',
    unread: false,
    messages: [
      { from: 'Sara', dir: 'in',  at: '2026-05-13 10:18', body: 'Reviewed the Q3 strategy doc — looks great overall. Two questions: (1) why are we not investing more in RV at Athens 2? and (2) what is the timeline on the climate-control cluster?' },
      { from: 'Mark', dir: 'out', at: '2026-05-13 11:02', body: 'Both fair questions. (1) Athens 2 is GBP-suspended right now so we are holding investment until reinstatement — should know by end of week. (2) Climate-control cluster is 3 of 6 pages live, remaining 3 ship by May 22.' },
    ],
  },
  {
    id: 'mt-003', client: 'sunset', contact: 'Mark Tello',
    channel: 'slack', subject: 'Round Rock referral idea',
    last_at: '2026-05-13 09:00',
    unread: false,
    messages: [
      { from: 'Mark', dir: 'in',  at: '2026-05-13 09:00', body: 'Heard you guys at the RVIA conference last week. Want to chat about a referral arrangement with our dealership network — they push boat storage all the time.' },
      { from: 'Mark', dir: 'out', at: '2026-05-13 14:33', body: 'Love this. I will pull together a quick partner pack and we can do 30 min Thursday or Friday.' },
    ],
  },
  {
    id: 'mt-004', client: 'royal', contact: 'Lakshmi Iyer',
    channel: 'whatsapp', subject: 'Royal Mini rank drop?',
    last_at: '2026-05-14 16:48',
    unread: true,
    messages: [
      { from: 'Lakshmi', dir: 'in', at: '2026-05-14 16:48', body: 'My partner Diane noticed we are not showing in maps for "athens storage units" anymore. Is something wrong?' },
      { from: 'AI Suggested', dir: 'draft', at: '2026-05-15 13:11', ai: true, body: 'Lakshmi, yes I saw this too — anomaly fired at 2 AM yesterday. We are pretty sure this is a citation churn issue (8 directories went dead between Friday and Monday). I have Khizer running a Whitespark rebuild as we speak, plus a separate 5-citation push. Estimated recovery: 14-21 days based on past patterns. Will keep you posted daily.' },
    ],
  },
];

window.CLIENT_APPROVALS = [
  { id: 'ap-001', client: 'acme', resource: 'Q3 strategy — Athens facilities (3)', type: 'strategy', requested: '2026-05-13', status: 'pending' },
  { id: 'ap-002', client: 'acme', resource: 'Budget change — RV expansion ($2,400)', type: 'budget',   requested: '2026-05-12', status: 'pending' },
  { id: 'ap-003', client: 'sunset', resource: 'Scope change — add 1 facility (Cedar Park)', type: 'scope', requested: '2026-05-10', status: 'approved', approved_at: '2026-05-11' },
];
