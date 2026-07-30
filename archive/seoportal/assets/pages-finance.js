// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ====================================================================
//  FINANCIAL OPERATIONS SPINE
//  ==================================================================== */
//
// PAGES.finance = () => {
//  const totalRev = window.PL_BY_CLIENT.reduce((s, p) => s + p.revenue, 0);
//  const totalGross = window.PL_BY_CLIENT.reduce((s, p) => s + p.gross, 0);
//  const avgMargin = (totalGross / totalRev * 100).toFixed(1);
//
//  return `
//  ${UI.pageHeader({
//  eyebrow: 'Insights',
//  title: 'Financial operations',
//  subtitle: 'Per-client P&L • API attribution • churn risk • invoicing • forecasting',
//  actions: [
//  UI.btn('Send invoice', { variant: 'secondary', icon: 'file-text' }),
//  UI.btn('Export', { variant: 'primary', icon: 'download' }),
//  ],
//  stats: [
//  { label: 'MRR', value: '$' + totalRev.toLocaleString(), delta: 17.2, deltaLabel: '%', icon: 'trending-up', accent: 'green', sparkline: sparkSvg(window.MRR_TRAJECTORY.map(m => m.mrr), '#10b981') },
//  { label: 'Gross margin', value: avgMargin + '%', delta: 1.2, deltaLabel: '%', icon: 'percent', accent: 'green' },
//  { label: 'API spend MTD', value: '$' + window.API_SPEND_TOTAL, delta: -12, deltaLabel: '% vs budget', icon: 'gauge', accent: 'sky' },
//  { label: 'AR outstanding', value: '$6,000', icon: 'inbox', accent: 'amber', sub: '3 invoices' },
//  ],
//  })}
//
//  <div class="flex border-b mb-5">
//  <button onclick="UI.switchTab('fin','pl')" data-tab="fin-pl" class="tab active">Per-client P&L</button>
//  <button onclick="UI.switchTab('fin','api')" data-tab="fin-api" class="tab">API attribution</button>
//  <button onclick="UI.switchTab('fin','churn')" data-tab="fin-churn" class="tab">Churn risk</button>
//  <button onclick="UI.switchTab('fin','invoices')" data-tab="fin-invoices" class="tab">Invoicing & AR</button>
//  <button onclick="UI.switchTab('fin','forecast')" data-tab="fin-forecast" class="tab">Forecast</button>
//  </div>
//
//  <div data-tab-pane="fin-pl">
//  <div class="grid grid-cols-3 gap-4 mb-4">
//  <div class="surface p-5 col-span-2">
//  ${UI.cardTitle({ title: 'P&L by client - May 2026', icon: 'wallet' })}
//  <table class="w-full text-[12.5px]">
//  <thead>
//  <tr class="border-b">
//  <th class="text-left py-2 text-[10px] uppercase text-3">Client</th>
//  <th class="text-right py-2 text-[10px] uppercase text-3">Revenue</th>
//  <th class="text-right py-2 text-[10px] uppercase text-3">Labor</th>
//  <th class="text-right py-2 text-[10px] uppercase text-3">API</th>
//  <th class="text-right py-2 text-[10px] uppercase text-3">Tools</th>
//  <th class="text-right py-2 text-[10px] uppercase text-3">Gross</th>
//  <th class="text-right py-2 text-[10px] uppercase text-3">Margin</th>
//  </tr>
//  </thead>
//  <tbody>
//  ${window.PL_BY_CLIENT.map(p => {
//  const c = getClient(p.client);
//  return `
//  <tr class="border-b ">
//  <td class="py-2.5 font-medium">${c?.name}</td>
//  <td class="py-2.5 text-right font-mono">$${p.revenue.toLocaleString()}</td>
//  <td class="py-2.5 text-right font-mono text-2">($${p.labor})</td>
//  <td class="py-2.5 text-right font-mono text-2">($${p.api})</td>
//  <td class="py-2.5 text-right font-mono text-2">($${p.tools})</td>
//  <td class="py-2.5 text-right font-mono font-bold text-green">$${p.gross.toLocaleString()}</td>
//  <td class="py-2.5 text-right font-mono font-bold ${p.margin >= 80 ? 'text-green' : p.margin >= 70 ? 'text-amber' : 'text-red'}">${p.margin}%</td>
//  </tr>
//  `;
//  }).join('')}
//  <tr class="border-t-2 font-bold">
//  <td class="py-2.5">Total</td>
//  <td class="py-2.5 text-right font-mono">$${totalRev.toLocaleString()}</td>
//  <td class="py-2.5 text-right font-mono text-2">$${window.PL_BY_CLIENT.reduce((s,p) => s + p.labor, 0)}</td>
//  <td class="py-2.5 text-right font-mono text-2">$${window.PL_BY_CLIENT.reduce((s,p) => s + p.api, 0)}</td>
//  <td class="py-2.5 text-right font-mono text-2">$${window.PL_BY_CLIENT.reduce((s,p) => s + p.tools, 0)}</td>
//  <td class="py-2.5 text-right font-mono text-green">$${totalGross.toLocaleString()}</td>
//  <td class="py-2.5 text-right font-mono">${avgMargin}%</td>
//  </tr>
//  </tbody>
//  </table>
//  </div>
//
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'Per-facility margin top 5', icon: 'trophy' })}
//  ${window.PL_BY_FACILITY.slice(0, 7).sort((a,b) => b.margin - a.margin).map((p, i) => {
//  const f = getFacility(p.facility);
//  return `
//  <div class="flex items-center gap-3 py-2 border-b last:border-0">
//  <span class="text-[11px] font-mono font-bold w-4 ${i === 0 ? 'text-amber' : 'text-3'}">${i + 1}</span>
//  <span class="text-[12px] flex-1 truncate">${f?.name}</span>
//  <span class="text-[12px] font-mono font-bold ${p.margin >= 80 ? 'text-green' : 'text-amber'}">${p.margin}%</span>
//  </div>
//  `;
//  }).join('')}
//  </div>
//  </div>
//
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'MRR trajectory', icon: 'line-chart' })}
//  <div class="h-56"><canvas id="mrr-chart"></canvas></div>
//  </div>
//  </div>
//
//  <div data-tab-pane="fin-api" class="hidden">
//  <div class="grid grid-cols-3 gap-4 mb-4">
//  <div class="surface p-5 col-span-2">
//  ${UI.cardTitle({ title: 'API spend by provider - May MTD', subtitle: 'Total: $' + window.API_SPEND_TOTAL + ' / $400 cap (' + Math.round(window.API_SPEND_TOTAL/400*100) + '%)', icon: 'gauge' })}
//  ${window.API_SPEND.map(p => `
//  <div class="flex items-center gap-3 py-2 border-b last:border-0">
//  <span class="size-2.5 rounded-sm" style="background:${p.color}"></span>
//  <span class="text-[12.5px] flex-1">${p.provider}</span>
//  <div class="w-32 h-1.5 rounded-full bg-2 overflow-hidden">
//  <div class="h-full rounded-full" style="width:${p.pct}%;background:${p.color}"></div>
//  </div>
//  <span class="text-[11px] font-mono text-3 w-10 text-right">${p.pct}%</span>
//  <span class="text-[12.5px] font-mono font-semibold w-14 text-right">$${p.mtd}</span>
//  </div>
//  `).join('')}
//  </div>
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'Per-client attribution', icon: 'pie-chart' })}
//  <div class="space-y-3">
//  ${window.PL_BY_CLIENT.map((p, i) => {
//  const c = getClient(p.client);
//  const total = window.PL_BY_CLIENT.reduce((s, x) => s + x.api, 0);
//  const pct = (p.api / total) * 100;
//  const colors = ['#6366f1','#10b981','#f59e0b','#0ea5e9'];
//  return `
//  <div>
//  <div class="flex items-center justify-between text-[11.5px] mb-1">
//  <span class="flex items-center gap-2"><span class="size-2.5 rounded-sm" style="background:${colors[i]}"></span>${c?.name}</span>
//  <span class="font-mono">$${p.api}</span>
//  </div>
//  ${UI.progressBar(pct, 100, colors[i], 4)}
//  </div>
//  `;
//  }).join('')}
//  </div>
//  <div class="surface bg-indigo-500/8 border-indigo-500/30 p-3 mt-4 text-[11.5px] text-1">
//  Forecasted end of month: <span class="font-bold text-green">$321</span> (well within $400 cap). Circuit breaker armed at $380.
//  </div>
//  </div>
//  </div>
//  </div>
//
//  <div data-tab-pane="fin-churn" class="hidden">
//  ${window.PREDICTIONS.churn.map(c => {
//  const cl = getClient(c.client);
//  const color = c.level === 'critical' ? 'red' : c.level === 'at_risk' ? 'amber' : 'green';
//  return `
//  <div class="surface p-5 mb-4 border-l-4 ${c.level === 'critical' ? 'border-red-500' : c.level === 'at_risk' ? 'border-amber-500' : 'border-emerald-500'}">
//  <div class="flex items-start justify-between mb-4">
//  <div>
//  <div class="flex items-center gap-2 mb-1">
//  ${UI.pill(c.level.toUpperCase().replace(/_/g, ' '), color)}
//  <h3 class="text-[15px] font-bold">${cl?.name}</h3>
//  </div>
//  <div class="text-[11.5px] text-3">MRR $${cl?.mrr.toLocaleString()} • Renewal in ${c.renewal_in_days} days</div>
//  </div>
//  <div class="text-right">
//  <div class="text-3xl font-bold" style="color:${c.level === 'critical' ? '#ef4444' : c.level === 'at_risk' ? '#f59e0b' : '#10b981'}">${c.score}</div>
//  <div class="text-[10px] uppercase tracking-wider text-3">Risk score</div>
//  </div>
//  </div>
//
//  ${c.factors.length > 0 && c.factors[0].impact > 0 ? `
//  <div class="eyebrow mb-2">Contributing factors</div>
//  ${c.factors.map(f => `
//  <div class="flex items-center gap-3 py-1.5 text-[12px]">
//  <span class="text-red font-mono w-8">+${f.impact}</span>
//  <span class="flex-1">${f.label}</span>
//  </div>
//  `).join('')}
//  ` : ''}
//
//  ${c.level === 'critical' ? `
//  <div class="surface bg-red-500/8 border-red-500/30 p-4 mt-4">
//  <div class="eyebrow text-red mb-2">Retention playbook</div>
//  ${window.RETENTION_PLAYBOOK_ACME.map(s => `
//  <div class="flex items-center gap-3 py-1.5 text-[12px]">
//  <span class="size-5 rounded-full bg-red-500/20 border border-red-500/40 text-[10px] font-bold flex items-center justify-center text-red">${s.step}</span>
//  <span class="flex-1">${s.action}</span>
//  <span class="text-[10.5px] text-3">@${s.owner} • ${s.due}</span>
//  </div>
//  `).join('')}
//  <button class="btn btn-primary text-[11px] mt-3 w-full">Trigger save-play runbook</button>
//  </div>
//  ` : ''}
//  </div>
//  `;
//  }).join('')}
//  </div>
//
//  <div data-tab-pane="fin-invoices" class="hidden">
//  <div class="grid grid-cols-4 gap-3 mb-4">
//  ${UI.statCard({ label: 'Sent', value: '3', icon: 'send', accent: 'sky' })}
//  ${UI.statCard({ label: 'Paid', value: '12', icon: 'check', accent: 'green' })}
//  ${UI.statCard({ label: 'Overdue', value: '0', icon: 'alert-triangle', accent: 'green' })}
//  ${UI.statCard({ label: 'Outstanding', value: '$6,000', icon: 'wallet', accent: 'amber' })}
//  </div>
//
//  <div class="surface overflow-hidden">
//  <table class="w-full">
//  <thead>
//  <tr class=" border-b">
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Invoice</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Client</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Amount</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Sent</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Due</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Status</th>
//  <th class="w-20"></th>
//  </tr>
//  </thead>
//  <tbody>
//  ${window.INVOICES.map(inv => {
//  const c = getClient(inv.client);
//  return `
//  <tr class="table-row">
//  <td class="px-4 py-3 font-mono text-[12px] text-accent">${inv.id}</td>
//  <td class="px-4 py-3 text-[12.5px] font-medium">${c?.name}</td>
//  <td class="px-4 py-3 font-mono text-[12px] font-semibold">$${inv.amount.toLocaleString()}</td>
//  <td class="px-4 py-3 text-[11px] text-3">${inv.sent}</td>
//  <td class="px-4 py-3 text-[11px] text-3">${inv.due}</td>
//  <td class="px-4 py-3">${UI.pill(inv.status.toUpperCase(), inv.status === 'paid' ? 'green' : inv.status === 'sent' ? 'sky' : 'red')}</td>
//  <td class="px-4 py-3"><button class="btn btn-ghost"><i data-lucide="more-horizontal" class="size-4"></i></button></td>
//  </tr>
//  `;
//  }).join('')}
//  </tbody>
//  </table>
//  </div>
//  </div>
//
//  <div data-tab-pane="fin-forecast" class="hidden">
//  <div class="grid grid-cols-4 gap-3 mb-4">
//  ${UI.statCard({ label: 'Retainer recurring (90d)', value: '$' + window.REVENUE_FORECAST_90D.retainer_recurring.toLocaleString(), icon: 'repeat', accent: 'green' })}
//  ${UI.statCard({ label: 'Pipeline expected', value: '$' + window.REVENUE_FORECAST_90D.pipeline_expected.toLocaleString(), icon: 'trending-up', accent: 'indigo' })}
//  ${UI.statCard({ label: 'New audit expected', value: '$' + window.REVENUE_FORECAST_90D.new_audit_expected.toLocaleString(), icon: 'shield-check', accent: 'sky' })}
//  ${UI.statCard({ label: 'Total forecast 90d', value: '$' + window.REVENUE_FORECAST_90D.total.toLocaleString(), icon: 'target', accent: 'green' })}
//  </div>
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'Revenue forecast - 12 months', icon: 'line-chart' })}
//  <div class="h-72"><canvas id="forecast-chart"></canvas></div>
//  </div>
//  </div>
//  `;
// };
// PAGES_AFTER.finance = () => {
//  CHARTS.line('mrr-chart', window.MRR_TRAJECTORY.map(m => m.month), [{ label: 'MRR', data: window.MRR_TRAJECTORY.map(m => m.mrr), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.15)' }]);
//  const labels12 = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
//  const baseline = [6800, 7400, 8100, 8800, 9600, 10400, 11200, 12000, 12800, 13600, 14400, 15200];
//  const optimistic = baseline.map(b => Math.round(b * 1.18));
//  const pessimistic = baseline.map(b => Math.round(b * 0.78));
//  CHARTS.line('forecast-chart', labels12, [
//  { label: 'Optimistic', data: optimistic, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)', borderDash: [5, 5], fill: false },
//  { label: 'Expected', data: baseline, borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.12)' },
//  { label: 'Pessimistic',data: pessimistic, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.05)', borderDash: [5, 5], fill: false },
//  ]);
// };
//