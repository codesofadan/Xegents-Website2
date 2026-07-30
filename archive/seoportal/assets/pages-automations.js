// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Automations macro - hub + dense micro sub-modules.
//    Each sub-module is its assigned archetype, structurally
//    distinct from its siblings:
//      automations          :: DENSE LIST    (full-bleed)
//      automations.builder  :: FLOW WORKSPACE (full-bleed, 260px/1fr)
//      automations.runs     :: LOG LIST      (full-bleed)
//    Trigger -> condition -> action chains. Humans approve the
//    sensitive ones; safe ones run on their own.
//    ============================================================ */
//
// window.PAGES = window.PAGES || {};
// window.PAGES_AFTER = window.PAGES_AFTER || {};
// window.FULLBLEED = window.FULLBLEED || new Set();
// window.FULLBLEED.add('automations');
// window.FULLBLEED.add('automations.builder');
// window.FULLBLEED.add('automations.runs');
//
// (function () {
//   const A = () => window.AUTOMATIONS;
//
//   // ---- shared lookups (channel meta with graceful fallback for crm/reporting) ----
//   const chMeta = (id) => {
//     const c = window.getChannel(id);
//     if (c) return { color: c.color, icon: c.icon, label: c.label };
//     const fb = {
//       crm:       { color: '#6366f1', icon: 'contact',     label: 'CRM' },
//       reporting: { color: '#34d399', icon: 'bar-chart-3', label: 'Reporting' },
//     };
//     return fb[id] || { color: '#565659', icon: 'workflow', label: id };
//   };
//   const clientName = (id) => (window.getClient(id) || {}).name || 'Agency';
//   const clientColor = (id) => (window.getClient(id) || {}).logoColor || '#565659';
//   const esc = (s) => String(s == null ? '' : s).replace(/'/g, '').replace(/"/g, '');
//   const srColor = (sr) => sr >= 98 ? 'var(--acc)' : sr >= 95 ? 'var(--amber)' : 'var(--red)';
//
//   const fmtDur = (ms) => {
//     if (ms == null) return '-';
//     const sec = ms / 1000;
//     if (sec < 1) return ms + 'ms';
//     if (sec < 60) return sec.toFixed(sec < 10 ? 1 : 0) + 's';
//     return Math.floor(sec / 60) + 'm ' + Math.round(sec % 60) + 's';
//   };
//
//   // channel dot + label cell
//   const chanCell = (id) => {
//     const m = chMeta(id);
//     return `<span class="flex items-center gap-1.5"><span class="size-1.5 rounded-full shrink-0" style="background:${m.color}"></span><span class="text-[12px] text-2">${m.label}</span></span>`;
//   };
//   const clientCell = (id) => `<span class="flex items-center gap-2"><span class="size-1.5 rounded-full shrink-0" style="background:${clientColor(id)}"></span><span class="text-[12px] text-2 truncate">${clientName(id)}</span></span>`;
//
//   // mode pill
//   const modePill = (mode) => mode === 'approval'
//     ? `<span class="tag tag-amber" style="font-size:10px;padding:1px 7px"><i data-lucide="user-check" class="size-2.5"></i>Approval</span>`
//     : `<span class="tag tag-acc" style="font-size:10px;padding:1px 7px">Auto</span>`;
//
//   // sub-nav strip shared across the macro
//   function subNav(active) {
//     const items = [
//       { id: 'automations',         label: 'Library' },
//       { id: 'automations.builder', label: 'Builder' },
//       { id: 'automations.runs',    label: 'Run history' },
//     ];
//     return `<div class="flex items-center gap-1 mb-4 -mt-1 flex-wrap">${items.map(it =>
//       `<button class="px-2.5 py-1 rounded-md text-[12px] font-medium ${it.id === active ? 'text-1' : 'text-3 hover:text-1'}" ${it.id === active ? 'style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"' : ''} data-action="navigate" data-route="${it.id}">${it.label}</button>`
//     ).join('')}</div>`;
//   }
//
//   // ====================================================================
//   // PAGES.automations :: DENSE LIST (full-bleed) - the automation library
//   // ====================================================================
//   window.PAGES.automations = function () {
//     const a = A();
//     const s = a.stats;
//     const active = a.list.filter(x => x.status === 'active').length;
//     const approvalCount = a.list.filter(x => x.mode === 'approval').length;
//
//     const header = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Automations',
//         sub: a.list.length + ' workflows firing across every channel - safe actions run on their own, anything that spends money or touches a client waits for a human yes.',
//         stats: [
//           { k: 'Active', v: active },
//           { k: 'Runs this month', v: s.runsThisMonth.toLocaleString(), delta: s.runsDelta, deltaUnit: '%' },
//           { k: 'Success rate', v: s.successRate + '%', delta: s.successDelta, deltaUnit: 'pt' },
//           { k: 'Hours saved', v: s.timeSavedHrs + 'h', delta: s.timeSavedDelta, deltaUnit: 'h' },
//           { k: 'Awaiting approval', v: s.awaitingApproval },
//         ],
//         actions: `${UI.btn('Run history', { variant: 'secondary', size: 'sm', icon: 'history' }).replace('<button', `<button data-action="navigate" data-route="automations.runs"`)}
//           ${UI.btn('New automation', { variant: 'primary', size: 'sm', icon: 'plus' }).replace('<button', `<button data-action="navigate" data-route="automations.builder"`)}`,
//       })}
//       ${subNav('automations')}
//       <div class="toolbar" style="margin-bottom:0">
//         ${UI.searchInput('Search automations', 'w-72')}
//         ${LX.segmented([
//           { id: 'all', label: 'All' },
//           { id: 'auto', label: 'Auto' },
//           { id: 'approval', label: 'Approval' },
//           { id: 'paused', label: 'Paused' },
//         ])}
//         <div class="grow"></div>
//         ${UI.btn('Channel', { variant: 'ghost', size: 'sm', icon: 'sliders-horizontal' }).replace('<button', `<button data-action="menu" data-menu='["All channels","Ads","Social","SEO","Content","Email","Reputation","Reporting","CRM"]'`)}
//       </div></div>`;
//
//     // action-chain chips (the trigger -> step -> step chain)
//     const chainChips = (steps) => steps.map((st, i) => `
//       <span class="inline-flex items-center gap-1 text-[10.5px] text-2 whitespace-nowrap">
//         ${i > 0 ? `<i data-lucide="chevron-right" class="size-2.5 text-4"></i>` : ''}
//         <span class="px-1.5 py-0.5 rounded" style="background:var(--bg-3)">${st}</span>
//       </span>`).join('');
//
//     function rowsFor(filter) {
//       return a.list.filter(x =>
//         filter === 'all' ? true :
//         filter === 'paused' ? x.status === 'paused' :
//         x.mode === filter && x.status === 'active');
//     }
//
//     function listFor(filter) {
//       return LX.dataList({
//         columns: [
//           { key: 'name', label: 'Automation', render: (x) => {
//               const m = chMeta(x.channel);
//               return `<div class="flex items-center gap-2.5 min-w-0">
//                 <span class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:${m.color}1f"><i data-lucide="${m.icon}" class="size-3" style="color:${m.color}"></i></span>
//                 <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:200px">${x.name}</span>
//               </div>`;
//             } },
//           { key: 'trigger', label: 'Trigger', render: (x) => `<span class="flex items-center gap-1.5 text-[11.5px] text-2"><i data-lucide="bolt" class="size-2.5 text-3 shrink-0"></i><span class="truncate" style="max-width:200px">${x.trigger}</span></span>` },
//           { key: 'steps', label: 'Action chain', width: '300px', render: (x) => `<div class="flex items-center gap-1 flex-nowrap overflow-hidden">${chainChips(x.steps)}</div>` },
//           { key: 'channel', label: 'Channel', render: (x) => chanCell(x.channel) },
//           { key: 'runs', label: 'Runs', align: 'r', mono: true, render: (x) => `<span class="text-1">${x.runs.toLocaleString()}</span>` },
//           { key: 'successRate', label: 'Success', align: 'r', width: '130px', render: (x) => `<div class="flex items-center gap-2 justify-end">
//               <div style="width:54px">${LX.bar(x.successRate, srColor(x.successRate))}</div>
//               <span class="num text-[11px] text-1 w-10 text-right">${x.successRate}%</span></div>` },
//           { key: 'status', label: 'Status', render: (x) => `<span class="status status-${x.status === 'active' ? 'green' : 'slate'}">${x.status === 'active' ? 'Active' : 'Paused'}</span>` },
//           { key: 'mode', label: 'Mode', align: 'r', render: (x) => modePill(x.mode) },
//         ],
//         rows: rowsFor(filter),
//         rowAttrs: (x) => `data-action="detail" data-title="${esc(x.name)}" data-sub="${esc(x.trigger)}" data-kv='[["Channel","${esc(chMeta(x.channel).label)}"],["Mode","${x.mode === 'approval' ? 'Needs approval' : 'Auto'}"],["Runs","${x.runs.toLocaleString()}"],["Success rate","${x.successRate}%"],["Hours saved/mo","${x.savedHrs}h"],["Median duration","${fmtDur(x.avgDurationSec * 1000)}"],["Status","${x.status === 'active' ? 'Active' : 'Paused'}"]]'`,
//       });
//     }
//
//     const panes = ['all', 'auto', 'approval', 'paused'].map((f, i) =>
//       `<div data-pane="${f}" class="${i === 0 ? '' : 'hidden'}">${listFor(f)}</div>`).join('');
//
//     // quiet AI affordance: one recommended automation strip below the list
//     const sug = a.suggested[0];
//     const sm = chMeta(sug.channel);
//     const recStrip = `<div class="px-7 pt-3 pb-7">
//       ${LX.panel({
//         title: 'Recommended from your run history',
//         actions: `<button class="text-[11px] text-3 hover:text-1 font-medium" data-action="navigate" data-route="automations.builder">Open builder &rarr;</button>`,
//         body: `<div class="flex items-start gap-3">
//           <span class="size-8 rounded-lg flex items-center justify-center shrink-0" style="background:${sm.color}1f"><i data-lucide="${sug.icon}" class="size-4" style="color:${sm.color}"></i></span>
//           <div class="min-w-0 flex-1">
//             <div class="flex items-center gap-2"><span class="text-[12.5px] text-1 font-medium">${sug.name}</span><span class="tag tag-slate" style="font-size:10px;padding:1px 7px">${sug.confidence} confidence</span></div>
//             <p class="text-[11.5px] text-2 leading-snug mt-1">${sug.rationale}</p>
//             <div class="flex items-center gap-1.5 mt-1.5 text-[11px]"><i data-lucide="trending-up" class="size-3 text-3"></i><span class="text-1 font-medium">${sug.impact}</span></div>
//           </div>
//           <div class="flex items-center gap-1.5 shrink-0" onclick="event.stopPropagation()">
//             <button class="btn btn-primary btn-sm" data-action="confirm" data-toast="Enabled: ${esc(sug.name)}" data-dismiss="1"><span>Enable</span></button>
//             <button class="btn btn-ghost btn-sm" data-action="dismiss"><span>Dismiss</span></button>
//           </div>
//         </div>`,
//       })}
//     </div>`;
//
//     return `<div class="flex flex-col" style="min-height:calc(100vh - 44px)">
//       <div data-tabwrap class="flex flex-col min-h-0">
//         ${header}
//         <div style="margin-top:10px">${panes}</div>
//       </div>
//       ${recStrip}
//     </div>`;
//   };
//
//   // ====================================================================
//   // PAGES['automations.builder'] :: FLOW WORKSPACE (full-bleed)
//   //   rail = building blocks; main = branching flow canvas.
//   // ====================================================================
//   window.PAGES['automations.builder'] = function () {
//     const a = A();
//     const g = a.graph;
//     const featured = a.list.find(x => x.id === a.featuredId);
//
//     // ---- RAIL: building-block palettes ----
//     const blockRow = (b) => {
//       const m = chMeta(b.channel);
//       return `<div class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg surface-hover cursor-grab" style="background:var(--bg-2)" data-action="confirm" data-toast="Block added: ${esc(b.name)}">
//         <span class="size-5 rounded-md flex items-center justify-center shrink-0" style="background:${m.color}1f"><i data-lucide="${m.icon}" class="size-2.5" style="color:${m.color}"></i></span>
//         <span class="text-[11.5px] text-1 flex-1 min-w-0 truncate">${b.name}</span>
//         <i data-lucide="plus" class="size-3 text-4 shrink-0"></i>
//       </div>`;
//     };
//     const paletteSec = (title, icon, accent, items) => `
//       <div class="px-3 pt-3 pb-1.5 flex items-center gap-2" style="border-top:1px solid var(--line-1)">
//         <span class="size-5 rounded-md flex items-center justify-center" style="background:${accent}1f"><i data-lucide="${icon}" class="size-3" style="color:${accent}"></i></span>
//         <span class="text-[11.5px] font-semibold text-1">${title}</span>
//         <span class="text-[10px] text-3 num ml-auto">${items.length}</span>
//       </div>
//       <div class="flex flex-col gap-1 px-3 pb-3">${items.map(blockRow).join('')}</div>`;
//
//     const rail = `
//       <div class="px-3.5 py-3 sticky top-0 z-[1]" style="background:var(--bg-1)">
//         <div class="flex items-center gap-2 mb-1"><i data-lucide="blocks" class="size-3.5 text-2"></i><span class="text-[12px] font-semibold text-1">Building blocks</span></div>
//         <div class="text-[10.5px] text-3">Drag onto the canvas to extend the flow.</div>
//         <div class="mt-2.5">${UI.searchInput('Search blocks', 'w-full')}</div>
//       </div>
//       ${paletteSec('Triggers', 'bolt', '#f59e0b', a.blocks.triggers)}
//       ${paletteSec('Conditions', 'git-branch', '#38bdf8', a.blocks.conditions)}
//       ${paletteSec('Actions', 'play', '#10b981', a.blocks.actions)}`;
//
//     // ---- MAIN: the flow canvas (connected nodes, branching) ----
//     const node = (n, accent, w) => `
//       <div class="flex flex-col items-center text-center mx-auto" style="width:${w || 168}px">
//         <div class="w-full rounded-lg px-3 py-2.5" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1);border-top:2px solid ${accent}">
//           <div class="flex items-center justify-center gap-1.5 mb-1.5">
//             <span class="size-6 rounded-md flex items-center justify-center shrink-0" style="background:${accent}1f"><i data-lucide="${n.icon}" class="size-3" style="color:${accent}"></i></span>
//             <span class="eyebrow" style="color:${accent}">${n.kind}</span>
//           </div>
//           <div class="text-[12px] font-medium text-1 leading-snug">${n.title}</div>
//           ${n.sub ? `<div class="text-[10.5px] text-3 mt-0.5 leading-snug">${n.sub}</div>` : ''}
//         </div>
//       </div>`;
//     const vLine = (h) => `<div class="w-px mx-auto" style="height:${h || 22}px;background:var(--line-2)"></div>`;
//     const downArrow = `<div class="flex flex-col items-center"><div class="w-px" style="height:16px;background:var(--line-2)"></div><i data-lucide="chevron-down" class="size-4 text-3 -mt-1"></i></div>`;
//     const branchTag = (txt) => `<span class="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap text-3" style="background:var(--bg-3);box-shadow:inset 0 0 0 1px var(--line-1)"><i data-lucide="corner-down-right" class="size-2.5 text-4"></i>${txt}</span>`;
//
//     const canvas = `
//       <div class="rounded-xl px-6 py-7" style="background:var(--bg-1);box-shadow:inset 0 0 0 1px var(--line-1)">
//         <div>${node(g.trigger, g.trigger.accent)}</div>
//         ${downArrow}
//         <div>${node(g.condition, g.condition.accent)}</div>
//         <div class="mt-3 mb-1 grid grid-cols-2 gap-6 max-w-[560px] mx-auto">
//           ${g.branches.map(b => `
//             <div class="flex flex-col items-center">
//               ${branchTag(b.label)}
//               ${vLine(18)}
//               ${node(b.action, b.accent)}
//               ${vLine(18)}
//             </div>`).join('')}
//         </div>
//         <div class="flex items-center justify-center gap-1 -mt-1 mb-1">
//           <span class="text-[10px] text-3">both paths converge</span>
//           <i data-lucide="git-merge" class="size-3 text-3"></i>
//         </div>
//         ${downArrow}
//         <div>${node(g.gate, g.gate.accent)}</div>
//         ${downArrow}
//         <div>${node(g.execute, g.execute.accent)}</div>
//       </div>`;
//
//     // canvas toolbar + guard note + step inspector strip
//     const stepFlow = featured.steps.map((st, i) => `
//       <span class="inline-flex items-center gap-1.5 text-[10.5px] text-2 whitespace-nowrap">
//         ${i > 0 ? `<i data-lucide="chevron-right" class="size-2.5 text-4"></i>` : ''}
//         <span class="px-2 py-0.5 rounded" style="background:var(--bg-3)">${st}</span>
//       </span>`).join('');
//
//     const main = `<div class="ws-pad">
//       ${LX.modHead({
//         title: featured.name,
//         sub: 'A branching, human-in-the-loop guardrail - detection and drafting are automatic, spend never moves without a human yes.',
//         stats: [
//           { k: 'Channels', v: featured.channels.length },
//           { k: 'Steps', v: featured.steps.length },
//           { k: 'Runs', v: featured.runs.toLocaleString() },
//           { k: 'Success', v: featured.successRate + '%' },
//         ],
//         actions: `${modePill(featured.mode)}
//           ${UI.btn('Test run', { variant: 'secondary', size: 'sm', icon: 'play' }).replace('<button', `<button data-action="confirm" data-toast="Test run queued"`)}
//           ${UI.btn('Save flow', { variant: 'primary', size: 'sm', icon: 'check' }).replace('<button', `<button data-action="confirm" data-toast="Flow saved"`)}`,
//       })}
//
//       <div class="toolbar" style="margin-bottom:14px">
//         <div class="flex items-center gap-2 flex-wrap">${stepFlow}</div>
//         <div class="grow"></div>
//         ${UI.btn('Auto-layout', { variant: 'ghost', size: 'sm', icon: 'layout-grid' }).replace('<button', `<button data-action="confirm" data-toast="Re-laid out"`)}
//         ${UI.btn('Add branch', { variant: 'ghost', size: 'sm', icon: 'git-branch' }).replace('<button', `<button data-action="confirm" data-toast="Branch added"`)}
//       </div>
//
//       ${canvas}
//
//       <div class="flex items-center gap-2 mt-4 p-3 rounded-lg" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--line-1)">
//         <i data-lucide="shield-check" class="size-4 text-3 shrink-0"></i>
//         <span class="text-[11.5px] text-2">The detection, the branch decision, and the draft happen automatically. The approval gate is the whole point - nothing executes until a human approves.</span>
//         <div class="ml-auto flex items-center gap-1.5 shrink-0">
//           ${UI.btn('Approve draft', { variant: 'primary', size: 'sm', icon: 'check' }).replace('<button', `<button data-action="navigate" data-route="approvals"`)}
//           ${UI.btn('Edit', { variant: 'ghost', size: 'sm' })}
//         </div>
//       </div>
//     </div>`;
//
//     const header = `<div class="px-7 pt-7 pb-0" style="border-bottom:1px solid var(--line-1)">
//       ${LX.modHead({
//         title: 'Automation builder',
//         sub: 'Compose triggers, conditions and actions into a guarded flow. Drafts route to a human before anything fires.',
//         actions: `${UI.btn('Library', { variant: 'secondary', size: 'sm', icon: 'list' }).replace('<button', `<button data-action="navigate" data-route="automations"`)}
//           ${UI.btn('Templates', { variant: 'ghost', size: 'sm', icon: 'copy' }).replace('<button', `<button data-action="menu" data-menu='["Lead routing","Review response","Budget guardrail","Report delivery","Onboarding","Churn-save"]'`)}`,
//       })}
//       ${subNav('automations.builder')}
//     </div>`;
//
//     return `<div class="flex flex-col" style="height:calc(100vh - 44px)">
//       ${header}
//       <div style="flex:1; min-height:0;">
//         ${LX.workspace({ cols: '260px 1fr', rail, main })}
//       </div>
//     </div>`;
//   };
//
//   // ====================================================================
//   // PAGES['automations.runs'] :: LOG LIST (full-bleed) - run history
//   // ====================================================================
//   window.PAGES['automations.runs'] = function () {
//     const a = A();
//     const runs = a.runs;
//     const byOutcome = (o) => runs.filter(r => r.outcome === o).length;
//
//     const outcomeMeta = {
//       success:  { dot: 'green', label: 'Completed',         cls: 'text-acc',  tag: 'tag-acc' },
//       approval: { dot: 'amber', label: 'Awaiting approval',  cls: 'text-amber', tag: 'tag-amber' },
//       skipped:  { dot: 'slate', label: 'Skipped',            cls: 'text-3',     tag: 'tag-slate' },
//       failed:   { dot: 'red',   label: 'Failed',             cls: 'text-red',   tag: 'tag-red' },
//     };
//
//     const header = `<div class="px-7 pt-7 pb-0">
//       ${LX.modHead({
//         title: 'Run history',
//         sub: runs.length + ' most recent automation runs across all clients - newest first.',
//         stats: [
//           { k: 'Runs shown', v: runs.length },
//           { k: 'Completed', v: byOutcome('success') },
//           { k: 'Awaiting approval', v: byOutcome('approval') },
//           { k: 'Failed', v: byOutcome('failed') },
//           { k: 'Runs this month', v: a.stats.runsThisMonth.toLocaleString() },
//         ],
//         actions: `${UI.btn('Export log', { variant: 'secondary', size: 'sm', icon: 'download' })}
//           ${UI.btn('Library', { variant: 'primary', size: 'sm', icon: 'list' }).replace('<button', `<button data-action="navigate" data-route="automations"`)}`,
//       })}
//       ${subNav('automations.runs')}
//       <div class="toolbar" style="margin-bottom:0">
//         ${UI.searchInput('Search runs', 'w-72')}
//         ${LX.segmented([
//           { id: 'all', label: 'All' },
//           { id: 'success', label: 'Completed' },
//           { id: 'approval', label: 'Approval' },
//           { id: 'failed', label: 'Failed' },
//         ])}
//         <div class="grow"></div>
//         ${UI.btn('Last 7 days', { variant: 'ghost', size: 'sm', icon: 'calendar' }).replace('<button', `<button data-action="menu" data-menu='["Today","Last 7 days","Last 30 days","This month"]'`)}
//       </div></div>`;
//
//     const whenCell = (r) => r.daysAgo === 0 ? 'Today ' + r.at : shortDate(daysAgo(r.daysAgo)) + ' ' + r.at;
//
//     function rowsFor(filter) {
//       return runs.filter(r => filter === 'all' ? true : r.outcome === filter);
//     }
//
//     function listFor(filter) {
//       return LX.dataList({
//         cls: 'tight',
//         columns: [
//           { key: 'id', label: 'Run', mono: true, width: '64px', render: (r) => `<span class="text-3">${r.id.replace('r-', '#')}</span>` },
//           { key: 'name', label: 'Automation', render: (r) => {
//               const o = outcomeMeta[r.outcome] || outcomeMeta.skipped;
//               return `<div class="flex items-center gap-2.5 min-w-0">
//                 <span class="status status-${o.dot}"></span>
//                 <span class="text-[12.5px] text-1 font-medium truncate" style="max-width:200px">${r.name}</span>
//               </div>`;
//             } },
//           { key: 'trigger', label: 'Trigger', render: (r) => `<span class="text-[11.5px] text-2 truncate" style="display:inline-block;max-width:280px">${r.trigger}</span>` },
//           { key: 'client', label: 'Client', render: (r) => clientCell(r.clientId) },
//           { key: 'outcome', label: 'Outcome', render: (r) => {
//               const o = outcomeMeta[r.outcome] || outcomeMeta.skipped;
//               return `<span class="tag ${o.tag}" style="font-size:10px;padding:1px 7px">${o.label}</span>`;
//             } },
//           { key: 'durationMs', label: 'Duration', align: 'r', mono: true, render: (r) => `<span class="text-2">${fmtDur(r.durationMs)}</span>` },
//           { key: 'when', label: 'When', align: 'r', mono: true, width: '120px', render: (r) => `<span class="text-3">${whenCell(r)}</span>` },
//         ],
//         rows: rowsFor(filter),
//         rowAttrs: (r) => {
//           const o = outcomeMeta[r.outcome] || outcomeMeta.skipped;
//           return `data-action="detail" data-title="${esc(r.name)}" data-sub="${esc(r.trigger)}" data-kv='[["Run","${r.id.replace('r-', '#')}"],["Client","${esc(clientName(r.clientId))}"],["Outcome","${o.label}"],["Detail","${esc(r.detail)}"],["Duration","${fmtDur(r.durationMs)}"],["When","${esc(whenCell(r))}"]]'`;
//         },
//       });
//     }
//
//     const panes = ['all', 'success', 'approval', 'failed'].map((f, i) =>
//       `<div data-pane="${f}" class="${i === 0 ? '' : 'hidden'}">${listFor(f)}</div>`).join('');
//
//     return `<div class="flex flex-col" style="min-height:calc(100vh - 44px)">
//       <div data-tabwrap class="flex flex-col min-h-0">
//         ${header}
//         <div style="margin-top:10px">${panes}</div>
//       </div>
//     </div>`;
//   };
//
// })();
//