// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ====================================================================
//  AUDIT / ON-PAGE / SCHEMA SPINE
//  ==================================================================== */
//
// PAGES.audit = () => {
//  const pages = window.AUDIT_PAGES;
//  const issues = window.AUDIT_ISSUES;
//  return `
//  ${UI.pageHeader({
//  eyebrow: 'Delivery',
//  title: 'On-page audit',
//  subtitle: '15 facility pages audited weekly • 100-point checklist • avg score 73/100',
//  actions: [
//  UI.btn('Schema editor', { variant: 'secondary', icon: 'code-2', onClick: "UI.switchTab('audit','schema')" }),
//  UI.btn('Bulk audit', { variant: 'secondary', icon: 'shield-check' }),
//  UI.btn('AI fix all', { variant: 'primary', icon: 'wand-2', onClick: "toast('AI fix-all queued','success')" }),
//  ],
//  stats: [
//  { label: 'Avg score', value: '73', delta: 4, deltaLabel: '', icon: 'shield-check', accent: 'amber', sub: '/100' },
//  { label: 'Critical issues', value: '14', delta: -3, deltaLabel: '', icon: 'alert-octagon', accent: 'red' },
//  { label: 'Schema deployed', value: '11', icon: 'code-2', accent: 'green', sub: '/15 facilities' },
//  { label: 'Avg LCP', value: '2.6s', delta: -0.4, deltaLabel: 's', icon: 'zap', accent: 'green' },
//  ],
//  })}
//
//  <div class="flex border-b mb-5">
//  <button onclick="UI.switchTab('audit','pages')" data-tab="audit-pages" class="tab active">Pages</button>
//  <button onclick="UI.switchTab('audit','detail')" data-tab="audit-detail" class="tab">Detail view</button>
//  <button onclick="UI.switchTab('audit','schema')" data-tab="audit-schema" class="tab">Schema editor</button>
//  <button onclick="UI.switchTab('audit','speed')" data-tab="audit-speed" class="tab">Site speed</button>
//  <button onclick="UI.switchTab('audit','indexation')" data-tab="audit-indexation" class="tab">Indexation</button>
//  <button onclick="UI.switchTab('audit','linking')" data-tab="audit-linking" class="tab">Internal linking</button>
//  </div>
//
//  <div data-tab-pane="audit-pages">
//  <div class="surface overflow-hidden">
//  <table class="w-full">
//  <thead>
//  <tr class=" border-b">
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">URL</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Score</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Critical</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">LCP</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">INP</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">CLS</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Schema</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Words</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Backlinks</th>
//  <th class="w-8"></th>
//  </tr>
//  </thead>
//  <tbody>
//  ${pages.map(p => {
//  const scoreColor = p.score >= 80 ? '#10b981' : p.score >= 65 ? '#f59e0b' : '#ef4444';
//  return `
//  <tr class="table-row cursor-pointer" onclick="UI.switchTab('audit','detail')">
//  <td class="px-4 py-3 text-[12px] font-mono text-accent">${p.url}</td>
//  <td class="px-4 py-3"><span class="font-bold text-[16px]" style="color:${scoreColor}">${p.score}</span></td>
//  <td class="px-4 py-3">${p.issues_critical > 0 ? `<span class="status status-red">${p.issues_critical}</span>` : '<span class="text-3">—</span>'}</td>
//  <td class="px-4 py-3 font-mono text-[12px] ${p.lcp <= 2.5 ? 'text-green' : p.lcp <= 4 ? 'text-amber' : 'text-red'}">${p.lcp}s</td>
//  <td class="px-4 py-3 font-mono text-[12px] ${p.inp <= 200 ? 'text-green' : 'text-red'}">${p.inp}ms</td>
//  <td class="px-4 py-3 font-mono text-[12px] ${p.cls <= 0.1 ? 'text-green' : 'text-amber'}">${p.cls}</td>
//  <td class="px-4 py-3 text-[11px]">${p.schema.length}/4 <span class="text-3">deployed</span></td>
//  <td class="px-4 py-3 font-mono text-[12px]">${p.word_count}</td>
//  <td class="px-4 py-3 font-mono text-[12px]">${p.backlinks}</td>
//  <td class="px-4 py-3"><i data-lucide="chevron-right" class="size-4 text-4"></i></td>
//  </tr>
//  `;
//  }).join('')}
//  </tbody>
//  </table>
//  </div>
//  </div>
//
//  <div data-tab-pane="audit-detail" class="hidden">
//  <div class="surface p-5 mb-4">
//  <div class="flex items-center gap-4 mb-4">
//  <div>
//  <div class="text-[11px] text-3 uppercase tracking-wider">Auditing</div>
//  <div class="text-[15px] font-mono font-semibold">brickandstone.com/athens</div>
//  </div>
//  <div class="ml-auto flex items-center gap-3">
//  ${scoreRing(78, '#f59e0b', 56)}
//  <div>
//  <div class="text-[24px] font-bold">78<span class="text-base text-3">/100</span></div>
//  <div class="text-[10.5px] text-3">33 issues found</div>
//  </div>
//  </div>
//  </div>
//
//  <div class="grid grid-cols-3 gap-3 mb-4">
//  <div class="surface bg-red-500/8 border-red-500/30 p-3">
//  <div class="text-[10px] uppercase tracking-wider text-red mb-1 font-semibold">Critical</div>
//  <div class="text-[20px] font-bold">3</div>
//  <div class="text-[10px] text-3">blocks ranking</div>
//  </div>
//  <div class="surface bg-amber-500/8 border-amber-500/30 p-3">
//  <div class="text-[10px] uppercase tracking-wider text-amber mb-1 font-semibold">Warning</div>
//  <div class="text-[20px] font-bold">12</div>
//  <div class="text-[10px] text-3">limits performance</div>
//  </div>
//  <div class="surface bg-sky-500/8 border-sky-500/30 p-3">
//  <div class="text-[10px] uppercase tracking-wider text-sky mb-1 font-semibold">Info</div>
//  <div class="text-[20px] font-bold">18</div>
//  <div class="text-[10px] text-3">nice to have</div>
//  </div>
//  </div>
//
//  <div class="space-y-2">
//  ${issues.map(i => {
//  const sevColor = i.severity === 'critical' ? 'red' : i.severity === 'warning' ? 'amber' : 'sky';
//  return `
//  <div class="surface p-3 flex items-center gap-3">
//  <span class="pill pill-${sevColor} font-bold text-[9px]">${i.severity.toUpperCase()}</span>
//  <span class="tag">${i.cat}</span>
//  <div class="flex-1">
//  <div class="text-[12.5px] font-medium">${i.issue}</div>
//  <div class="text-[11px] text-3">${i.detail}</div>
//  </div>
//  <button class="btn btn-primary text-[11px]"><i data-lucide="wand-2" class="size-3 inline"></i> ${i.action}</button>
//  </div>
//  `;
//  }).join('')}
//  </div>
//
//  <div class="flex gap-2 mt-4 pt-4 border-t">
//  <button class="btn btn-primary"><i data-lucide="wand-2" class="size-3.5 inline"></i> AI fix all critical</button>
//  <button class="btn btn-secondary">Schedule fix</button>
//  <button class="btn btn-secondary">Export checklist</button>
//  </div>
//  </div>
//  </div>
//
//  <div data-tab-pane="audit-schema" class="hidden">
//  <div class="grid grid-cols-12 gap-4">
//  <div class="surface p-5 col-span-7">
//  ${UI.cardTitle({ title: 'Visual JSON-LD editor', subtitle: 'SelfStorage schema', icon: 'code-2' })}
//  <pre class="text-[11.5px] font-mono leading-relaxed bg-0 p-4 rounded-lg overflow-x-auto"><span class="text-3">{</span>
//  <span class="jsonld-key">"@context"</span>: <span class="jsonld-value">"https://schema.org"</span>,
//  <span class="jsonld-key">"@type"</span>: <span class="jsonld-value">"SelfStorage"</span>,
//  <span class="jsonld-key">"name"</span>: <span class="jsonld-value">"Brick &amp; Stone Storage Athens 1"</span>,
//  <span class="jsonld-key">"address"</span>: <span class="text-3">{</span>
//  <span class="jsonld-key">"@type"</span>: <span class="jsonld-value">"PostalAddress"</span>,
//  <span class="jsonld-key">"streetAddress"</span>: <span class="jsonld-value">"1247 Atlanta Hwy"</span>,
//  <span class="jsonld-key">"addressLocality"</span>: <span class="jsonld-value">"Athens"</span>,
//  <span class="jsonld-key">"addressRegion"</span>: <span class="jsonld-value">"GA"</span>,
//  <span class="jsonld-key">"postalCode"</span>: <span class="jsonld-value">"30606"</span>
//  <span class="text-3">}</span>,
//  <span class="jsonld-key">"telephone"</span>: <span class="jsonld-value">"+1-706-555-1100"</span>,
//  <span class="jsonld-key">"priceRange"</span>: <span class="jsonld-value">"$$"</span>,
//  <span class="jsonld-key">"aggregateRating"</span>: <span class="text-3">{</span>
//  <span class="jsonld-key">"@type"</span>: <span class="jsonld-value">"AggregateRating"</span>,
//  <span class="jsonld-key">"ratingValue"</span>: <span class="text-amber">4.7</span>,
//  <span class="jsonld-key">"reviewCount"</span>: <span class="text-amber">87</span>
//  <span class="text-3">}</span>,
//  <span class="jsonld-key">"makesOffer"</span>: <span class="text-3">[</span>
//  <span class="text-3">{</span> <span class="jsonld-key">"name"</span>: <span class="jsonld-value">"5x5 climate"</span>, <span class="jsonld-key">"price"</span>: <span class="text-amber">49</span> <span class="text-3">}</span>,
//  <span class="text-3">{</span> <span class="jsonld-key">"name"</span>: <span class="jsonld-value">"10x10 drive-up"</span>, <span class="jsonld-key">"price"</span>: <span class="text-amber">89</span> <span class="text-3">}</span>,
//  <span class="text-3">{</span> <span class="jsonld-key">"name"</span>: <span class="jsonld-value">"10x20 climate"</span>, <span class="jsonld-key">"price"</span>: <span class="text-amber">149</span> <span class="text-3">}</span>
//  <span class="text-3">]</span>,
//  <span class="jsonld-key">"amenityFeature"</span>: <span class="text-3">[</span>
//  <span class="text-3">{</span> <span class="jsonld-key">"name"</span>: <span class="jsonld-value">"24/7 gate access"</span>, <span class="jsonld-key">"value"</span>: <span class="text-amber">true</span> <span class="text-3">}</span>,
//  <span class="text-3">{</span> <span class="jsonld-key">"name"</span>: <span class="jsonld-value">"Climate-controlled"</span>, <span class="jsonld-key">"value"</span>: <span class="text-amber">true</span> <span class="text-3">}</span>,
//  <span class="text-3">{</span> <span class="jsonld-key">"name"</span>: <span class="jsonld-value">"Drive-up access"</span>, <span class="jsonld-key">"value"</span>: <span class="text-amber">true</span> <span class="text-3">}</span>
//  <span class="text-3">]</span>
// <span class="text-3">}</span></pre>
//
//  <div class="flex gap-2 mt-4">
//  <button class="btn btn-primary text-[12px]"><i data-lucide="check-circle" class="size-3 inline"></i> Validate (Rich Results Test)</button>
//  <button class="btn btn-secondary text-[12px]"><i data-lucide="upload" class="size-3 inline"></i> Deploy to WP</button>
//  <button class="btn btn-secondary text-[12px]">Save draft</button>
//  </div>
//  </div>
//
//  <div class="col-span-5 space-y-4">
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'Rich result preview', icon: 'eye' })}
//  <div class="surface p-4 bg-1/50">
//  <div class="text-[11px] text-3 mb-2">As it would appear in Google search:</div>
//  <div class=" rounded-lg p-3 bg-0">
//  <div class="text-[16px] font-medium text-sky mb-1">Brick & Stone Storage Athens 1</div>
//  <div class="text-[11px] text-green mb-1">brickandstone.com › athens</div>
//  <div class="flex items-center gap-1 text-[11px] mb-1">
//  <span class="text-amber">★★★★★</span>
//  <span class="text-1">4.7 (87)</span>
//  <span class="text-3">· Self-Storage Facility</span>
//  </div>
//  <div class="text-[11.5px] text-2 leading-relaxed">Climate-controlled and standard storage units in Athens, GA. 24/7 gate access, online reservations. From $49/mo.</div>
//  </div>
//  </div>
//  </div>
//
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'Schema templates', icon: 'library' })}
//  <div class="space-y-2">
//  ${[
//  ['SelfStorage', 'Primary type for facility pages', true],
//  ['LocalBusiness', 'Fallback for older browsers', true],
//  ['FAQPage', 'For FAQ-heavy pages', true],
//  ['BreadcrumbList', 'Navigation breadcrumbs', false],
//  ['Review', 'Individual review markup', false],
//  ['Service', 'Per-service markup', false],
//  ].map(([name, desc, on]) => `
//  <div class="surface p-3 flex items-center gap-3">
//  <i data-lucide="code-2" class="size-4 text-accent"></i>
//  <div class="flex-1">
//  <div class="text-[12.5px] font-medium">${name}</div>
//  <div class="text-[10.5px] text-3">${desc}</div>
//  </div>
//  <div class="w-9 h-5 rounded-full ${on ? 'bg-indigo-500' : 'bg-3'} relative cursor-pointer">
//  <div class="absolute top-0.5 ${on ? 'right-0.5' : 'left-0.5'} size-4 rounded-full bg-white"></div>
//  </div>
//  </div>
//  `).join('')}
//  </div>
//  </div>
//  </div>
//  </div>
//  </div>
//
//  <div data-tab-pane="audit-speed" class="hidden">
//  <div class="grid grid-cols-3 gap-4 mb-4">
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'LCP (Largest Contentful Paint)', icon: 'zap' })}
//  <div class="text-3xl font-bold mb-1 text-green">2.4s</div>
//  <div class="text-[11px] text-3 mb-3">Target: ≤2.5s (Good)</div>
//  <div class="h-24"><canvas id="speed-lcp"></canvas></div>
//  </div>
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'INP (Interaction to Next Paint)', icon: 'mouse-pointer-click' })}
//  <div class="text-3xl font-bold mb-1 text-green">124ms</div>
//  <div class="text-[11px] text-3 mb-3">Target: ≤200ms (Good)</div>
//  <div class="h-24"><canvas id="speed-inp"></canvas></div>
//  </div>
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'CLS (Cumulative Layout Shift)', icon: 'move' })}
//  <div class="text-3xl font-bold mb-1 text-green">0.08</div>
//  <div class="text-[11px] text-3 mb-3">Target: ≤0.1 (Good)</div>
//  <div class="h-24"><canvas id="speed-cls"></canvas></div>
//  </div>
//  </div>
//
//  <div class="surface overflow-hidden">
//  <table class="w-full">
//  <thead>
//  <tr class=" border-b">
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">URL</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">LCP</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">INP</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">CLS</th>
//  <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-3 px-4 py-3">Status</th>
//  </tr>
//  </thead>
//  <tbody>
//  ${window.AUDIT_PAGES.map(p => {
//  const cwvGood = p.lcp <= 2.5 && p.inp <= 200 && p.cls <= 0.1;
//  return `
//  <tr class="table-row">
//  <td class="px-4 py-3 text-[12px] font-mono text-accent">${p.url}</td>
//  <td class="px-4 py-3 font-mono text-[12px] ${p.lcp <= 2.5 ? 'text-green' : p.lcp <= 4 ? 'text-amber' : 'text-red'}">${p.lcp}s</td>
//  <td class="px-4 py-3 font-mono text-[12px] ${p.inp <= 200 ? 'text-green' : 'text-red'}">${p.inp}ms</td>
//  <td class="px-4 py-3 font-mono text-[12px] ${p.cls <= 0.1 ? 'text-green' : 'text-amber'}">${p.cls}</td>
//  <td class="px-4 py-3">${cwvGood ? '<span class="status status-green">PASS</span>' : '<span class="status status-amber">NEEDS WORK</span>'}</td>
//  </tr>
//  `;
//  }).join('')}
//  </tbody>
//  </table>
//  </div>
//  </div>
//
//  <div data-tab-pane="audit-indexation" class="hidden">
//  <div class="grid grid-cols-4 gap-4 mb-4">
//  ${UI.statCard({ label: 'Total URLs', value: '247', icon: 'list', accent: 'indigo' })}
//  ${UI.statCard({ label: 'Indexed', value: '231', delta: 4, deltaLabel: '', icon: 'check', accent: 'green', sub: '93.5%' })}
//  ${UI.statCard({ label: 'Excluded', value: '11', icon: 'minus-circle', accent: 'amber' })}
//  ${UI.statCard({ label: 'Errors', value: '5', icon: 'x-circle', accent: 'red', sub: '4xx, soft 404' })}
//  </div>
//  <div class="surface p-5">
//  ${UI.cardTitle({ title: 'Indexation status — Google Search Console', icon: 'search' })}
//  <div class="h-56"><canvas id="indexation-chart"></canvas></div>
//  </div>
//  </div>
//
//  <div data-tab-pane="audit-linking" class="hidden">
//  <div class="surface p-5 text-center">
//  <i data-lucide="git-fork" class="size-16 mx-auto text-accent/50 mb-4"></i>
//  <h3 class="text-[14px] font-bold mb-1">Internal linking matrix</h3>
//  <p class="text-[12px] text-3 mb-4 max-w-md mx-auto">Visual force-directed graph of all internal links across this facility's site. 3 orphan pages detected.</p>
//  <div class="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
//  <div class="surface p-3 text-center"><div class="text-2xl font-bold">42</div><div class="text-[10px] text-3 uppercase">Pages</div></div>
//  <div class="surface p-3 text-center"><div class="text-2xl font-bold">187</div><div class="text-[10px] text-3 uppercase">Internal links</div></div>
//  <div class="surface p-3 text-center"><div class="text-2xl font-bold text-amber">3</div><div class="text-[10px] text-3 uppercase">Orphans</div></div>
//  </div>
//  </div>
//  </div>
//  `;
// };
// PAGES_AFTER.audit = () => {
//  const labels = Array.from({ length: 8 }, (_, i) => 'Wk ' + (i + 1));
//  CHARTS.line('speed-lcp', labels, [{ data: [3.1, 2.9, 2.8, 2.6, 2.5, 2.4, 2.4, 2.4], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)' }], { plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } });
//  CHARTS.line('speed-inp', labels, [{ data: [180, 168, 152, 144, 132, 128, 126, 124], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)' }], { plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } });
//  CHARTS.line('speed-cls', labels, [{ data: [0.18, 0.15, 0.13, 0.11, 0.09, 0.08, 0.08, 0.08], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)' }], { plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } });
//  CHARTS.line('indexation-chart', Array.from({ length: 12 }, (_, i) => 'Wk ' + (i + 1)), [
//  { label: 'Indexed', data: [201, 208, 213, 219, 222, 224, 226, 227, 228, 230, 231, 231], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.12)' },
//  { label: 'Submitted', data: [220, 225, 230, 236, 240, 243, 245, 246, 246, 246, 247, 247], borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.05)', fill: false },
//  ]);
// };
//