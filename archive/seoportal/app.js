// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Xegents OS - Application Router & Chrome
//    Hierarchical macro/micro IA. Macros expand to sub-modules.
//    ============================================================ */
//
// const ROUTE_REDIRECTS = { today: 'home', dashboard: 'home', ai: 'approvals', paid: 'ads', reviews: 'reputation', reports: 'reporting', pipeline: 'crm' };
//
// // Macro hubs with micro sub-modules. A macro's overview route id === macro id.
// const NAV = [
//   { group: 'Overview', items: [
//     { id: 'home', label: 'Command Center', icon: 'layout-dashboard' },
//     { id: 'approvals', label: 'AI Account Manager', icon: 'sparkles', alert: '9' },
//   ]},
//   { group: 'Channels', items: [
//     { id: 'ads', label: 'Paid Ads', icon: 'megaphone', sub: [
//       { id: 'ads', label: 'Overview' },
//       { id: 'ads.campaigns', label: 'Campaigns' },
//       { id: 'ads.creative', label: 'Creative studio' },
//       { id: 'ads.audiences', label: 'Audiences' },
//       { id: 'ads.budgets', label: 'Budget & pacing' },
//       { id: 'ads.search', label: 'Search terms' },
//     ]},
//     { id: 'social', label: 'Social Media', icon: 'share-2', sub: [
//       { id: 'social', label: 'Overview' },
//       { id: 'social.calendar', label: 'Calendar' },
//       { id: 'social.composer', label: 'Composer' },
//       { id: 'social.inbox', label: 'Inbox' },
//       { id: 'social.listening', label: 'Listening' },
//       { id: 'social.analytics', label: 'Analytics' },
//     ]},
//     { id: 'seo', label: 'SEO & Local', icon: 'search', sub: [
//       { id: 'seo', label: 'Overview' },
//       { id: 'seo.ranks', label: 'Rank tracking' },
//       { id: 'seo.local', label: 'Local grid' },
//       { id: 'seo.audit', label: 'Site audit' },
//       { id: 'seo.backlinks', label: 'Backlinks' },
//       { id: 'seo.gaps', label: 'Content gaps' },
//     ]},
//     { id: 'content', label: 'Content', icon: 'pen-tool', sub: [
//       { id: 'content', label: 'Pipeline' },
//       { id: 'content.blog', label: 'Blog & web engine' },
//       { id: 'content.social', label: 'Social scripting' },
//       { id: 'content.video', label: 'Video scripts' },
//       { id: 'content.ads', label: 'Ad copy engine' },
//       { id: 'content.email', label: 'Email engine' },
//       { id: 'content.calendar', label: 'Editorial calendar' },
//       { id: 'content.library', label: 'Library' },
//     ]},
//     { id: 'email', label: 'Email & SMS', icon: 'mail', sub: [
//       { id: 'email', label: 'Overview' },
//       { id: 'email.campaigns', label: 'Campaigns' },
//       { id: 'email.flows', label: 'Flows' },
//       { id: 'email.audiences', label: 'Audiences' },
//       { id: 'email.deliverability', label: 'Deliverability' },
//     ]},
//     { id: 'reputation', label: 'Reputation', icon: 'star', alert: '2', sub: [
//       { id: 'reputation', label: 'Overview' },
//       { id: 'reputation.inbox', label: 'Reviews' },
//       { id: 'reputation.requests', label: 'Requests' },
//       { id: 'reputation.listings', label: 'Listings' },
//       { id: 'reputation.competitors', label: 'Competitors' },
//     ]},
//   ]},
//   { group: 'Pipeline', items: [
//     { id: 'crm', label: 'CRM & Sales', icon: 'kanban-square', sub: [
//       { id: 'crm', label: 'Pipeline' },
//       { id: 'crm.leads', label: 'Leads' },
//       { id: 'crm.contacts', label: 'Contacts' },
//       { id: 'crm.deals', label: 'Deals' },
//       { id: 'crm.forecast', label: 'Forecast' },
//     ]},
//     { id: 'clients', label: 'Clients', icon: 'building-2', badge: '6' },
//   ]},
//   { group: 'Insights', items: [
//     { id: 'reporting', label: 'Reporting', icon: 'bar-chart-3', sub: [
//       { id: 'reporting', label: 'All reports' },
//       { id: 'reporting.builder', label: 'Builder' },
//       { id: 'reporting.scheduled', label: 'Scheduled' },
//       { id: 'reporting.templates', label: 'Templates' },
//       { id: 'reporting.whitelabel', label: 'White-label' },
//     ]},
//   ]},
//   { group: 'Operations', items: [
//     { id: 'automations', label: 'Automations', icon: 'workflow', sub: [
//       { id: 'automations', label: 'Library' },
//       { id: 'automations.builder', label: 'Builder' },
//       { id: 'automations.runs', label: 'Run history' },
//     ]},
//     { id: 'team', label: 'Team', icon: 'users', sub: [
//       { id: 'team', label: 'Roster' },
//       { id: 'team.workload', label: 'Workload' },
//       { id: 'team.time', label: 'Time tracking' },
//       { id: 'team.permissions', label: 'Permissions' },
//     ]},
//     { id: 'settings', label: 'Settings', icon: 'settings' },
//   ]},
// ];
//
// // Flat label lookup for breadcrumbs.
// const LABELS = {};
// NAV.forEach(g => g.items.forEach(it => {
//   LABELS[it.id] = { macro: it.label, group: g.group, sub: null };
//   (it.sub || []).forEach(s => { if (s.id !== it.id) LABELS[s.id] = { macro: it.label, group: g.group, sub: s.label }; });
// }));
// LABELS['client'] = { macro: 'Clients', group: 'Pipeline', sub: 'Client detail' };
//
// const macroOf = (route) => route.split('.')[0];
//
// function loadSelectedClient() {
//   try { const s = localStorage.getItem('xos.client'); if (s && (s === 'all' || (window.CLIENTS || []).some(c => c.id === s))) return s; } catch (e) {}
//   return 'all';
// }
//
// const STATE = { route: 'home', role: 'owner', client: loadSelectedClient(), notifications: window.SEED_NOTIFICATIONS || [] };
//
// function renderSidebar() {
//   const activeMacro = macroOf(STATE.route === 'client' ? 'clients' : STATE.route);
//   const html = NAV.map(g => `
//     <div>
//       <div class="nav-section">${g.group}</div>
//       <div class="space-y-0.5">
//         ${g.items.map(it => {
//           const isActiveMacro = it.id === activeMacro;
//           const onMacroRow = STATE.route === it.id;
//           const row = `
//             <div class="nav-item ${onMacroRow ? 'active' : ''}" data-route="${it.id}">
//               <i data-lucide="${it.icon}" class="ni-icon size-3.5"></i>
//               <span>${it.label}</span>
//               ${it.sub ? `<i data-lucide="chevron-${isActiveMacro ? 'down' : 'right'}" class="size-3 ml-auto" style="color: var(--text-4)"></i>`
//                 : it.alert ? `<span class="ni-badge ni-badge-alert">${it.alert}</span>`
//                 : it.badge ? `<span class="ni-badge">${it.badge}</span>` : ''}
//             </div>`;
//           const subs = (it.sub && isActiveMacro) ? `
//             <div class="nav-sub">
//               ${it.sub.map(s => `<div class="nav-subitem ${STATE.route === s.id ? 'active' : ''}" data-route="${s.id}">${s.label}</div>`).join('')}
//             </div>` : '';
//           return row + subs;
//         }).join('')}
//       </div>
//     </div>`).join('');
//   document.getElementById('nav-groups').innerHTML = html;
//   document.querySelectorAll('[data-route]').forEach(el => el.addEventListener('click', (e) => { e.stopPropagation(); navigate(el.getAttribute('data-route')); }));
//   lucide.createIcons();
// }
//
// function renderBreadcrumb() {
//   const l = LABELS[STATE.route] || { macro: STATE.route };
//   const parts = l.sub ? [l.macro, l.sub] : [l.macro];
//   document.getElementById('breadcrumb').innerHTML = parts.map((p, i) => `
//     <span class="${i === parts.length - 1 ? 'text-1 font-medium' : 'text-3'}">${p}</span>
//     ${i < parts.length - 1 ? '<i data-lucide="chevron-right" class="size-3" style="color: var(--text-4)"></i>' : ''}
//   `).join('');
//   lucide.createIcons();
// }
//
// function navigate(route, params) {
//   if (ROUTE_REDIRECTS[route]) route = ROUTE_REDIRECTS[route];
//   STATE.route = route;
//   STATE.params = params || {};
//   window.location.hash = '#' + route + (params && Object.keys(params).length ? '?' + new URLSearchParams(params).toString() : '');
//   renderSidebar(); renderBreadcrumb(); renderPage();
// }
//
// // Pages that paint their own full-bleed canvas. Most dense views are full-bleed.
// const SELF_WRAPPED = new Set(['home', 'approvals', 'client']);
//
// function renderPage() {
//   const target = document.getElementById('page-content');
//   target.scrollTop = 0; document.getElementById('main').scrollTop = 0;
//   const fn = window.PAGES && window.PAGES[STATE.route];
//   let html;
//   try { html = fn ? fn(STATE.params) : missingPage(STATE.route); }
//   catch (err) { html = errorPage(STATE.route, err); }
//   const fullBleed = SELF_WRAPPED.has(STATE.route) || (window.FULLBLEED && window.FULLBLEED.has(STATE.route));
//   if (!fullBleed) html = `<section class="px-8 py-7">${html}</section>`;
//   target.innerHTML = html;
//   lucide.createIcons();
//   if (window.PAGES_AFTER && window.PAGES_AFTER[STATE.route]) { try { window.PAGES_AFTER[STATE.route](STATE.params); } catch (err) { console.error('after', STATE.route, err); } }
//   target.classList.remove('animate-fade-in'); void target.offsetWidth; target.classList.add('animate-fade-in');
// }
//
// function missingPage(route) {
//   const l = LABELS[route] || { macro: route };
//   return `<div class="empty-state"><i data-lucide="hammer" class="size-9"></i>
//     <div class="text-[14px] font-medium text-1 mb-1">${l.sub || l.macro}</div>
//     <div class="text-[12px] text-3">This sub-module is part of the structure and is being built.</div></div>`;
// }
// function errorPage(route, err) {
//   return `<div class="empty-state"><i data-lucide="alert-triangle" class="size-9"></i>
//     <div class="text-[14px] font-medium text-1 mb-1">Render error in "${route}"</div>
//     <div class="text-[12px] text-red mono mt-2">${(err && err.message) || err}</div></div>`;
// }
//
// const CMDK_TARGETS = () => {
//   const items = [];
//   items.push({ section: 'Actions', label: 'Review AI approval queue', icon: 'sparkles', go: () => navigate('approvals') });
//   items.push({ section: 'Actions', label: 'New ad campaign', icon: 'megaphone', go: () => navigate('ads.campaigns') });
//   items.push({ section: 'Actions', label: 'Compose social post', icon: 'share-2', go: () => navigate('social.composer') });
//   items.push({ section: 'Actions', label: 'Write content', icon: 'pen-tool', go: () => navigate('content.blog') });
//   items.push({ section: 'Actions', label: 'Build a report', icon: 'bar-chart-3', go: () => navigate('reporting.builder') });
//   (window.CLIENTS || []).forEach(c => items.push({ section: 'Clients', label: c.name, sub: c.industry, icon: c.icon || 'building-2', go: () => { STATE.client = c.id; try { localStorage.setItem('xos.client', c.id); } catch (e) {} renderClientSwitcher(); navigate('client', { id: c.id }); } }));
//   NAV.forEach(g => g.items.forEach(it => {
//     items.push({ section: 'Navigate', label: it.label, icon: it.icon, go: () => navigate(it.id) });
//     (it.sub || []).forEach(s => { if (s.id !== it.id) items.push({ section: 'Navigate', label: it.label + ' / ' + s.label, icon: it.icon, go: () => navigate(s.id) }); });
//   }));
//   return items;
// };
//
// function renderCmdK(query) {
//   const items = CMDK_TARGETS();
//   const q = query.toLowerCase().trim();
//   const filtered = q ? items.filter(i => i.label.toLowerCase().includes(q)) : items.slice(0, 28);
//   const grouped = {};
//   filtered.forEach(i => { (grouped[i.section] = grouped[i.section] || []).push(i); });
//   const html = Object.entries(grouped).map(([section, list]) => `
//     <div class="px-3 pt-3 pb-1 text-[10px] uppercase tracking-wider text-3 font-medium">${section}</div>
//     ${list.map((i, idx) => `
//       <button data-cmdk-idx="${idx}" data-cmdk-section="${section}" class="cmdk-item w-full flex items-center gap-2.5 px-3 py-1.5 text-[12.5px] text-left transition-colors" style="color: var(--text-1)" onmouseover="this.style.background='var(--bg-3)'" onmouseout="this.style.background='transparent'">
//         <i data-lucide="${i.icon}" class="size-3.5 text-2"></i><span class="flex-1 text-1">${i.label}</span>
//         ${i.sub ? `<span class="text-3 text-[11px]">${i.sub}</span>` : ''}
//       </button>`).join('')}`).join('');
//   document.getElementById('cmdk-results').innerHTML = html || '<div class="empty-state"><i data-lucide="search-x" class="size-8"></i><div class="text-[12.5px] mt-2">No results</div></div>';
//   lucide.createIcons();
//   document.querySelectorAll('.cmdk-item').forEach(el => el.addEventListener('click', () => { const idx = +el.getAttribute('data-cmdk-idx'); const s = el.getAttribute('data-cmdk-section'); hideCmdK(); grouped[s][idx].go(); }));
// }
// function showCmdK() { document.getElementById('cmdk-backdrop').classList.remove('hidden'); const i = document.getElementById('cmdk-input'); i.value = ''; renderCmdK(''); setTimeout(() => i.focus(), 50); }
// function hideCmdK() { document.getElementById('cmdk-backdrop').classList.add('hidden'); }
//
// function renderNotifications() {
//   document.getElementById('notif-list').innerHTML = STATE.notifications.map(n => `
//     <div class="rounded-lg p-3 mb-1.5 cursor-pointer transition-colors" data-notif-go="${n.go || ''}" onmouseover="this.style.background='var(--bg-3)'" onmouseout="this.style.background='transparent'">
//       <div class="flex items-start gap-2.5"><span class="status status-${n.dot || 'accent'} mt-1.5"></span>
//         <div class="flex-1 min-w-0"><div class="text-[12.5px] font-medium text-1 mb-0.5">${n.title}</div>
//         <div class="text-[11.5px] text-2 leading-snug">${n.body}</div><div class="text-[10.5px] text-3 mt-1.5">${n.time}</div></div></div></div>`).join('');
//   document.querySelectorAll('[data-notif-go]').forEach(el => el.addEventListener('click', () => { const r = el.getAttribute('data-notif-go'); if (r) { hideNotifPanel(); navigate(r); } }));
// }
// function showNotifPanel() { renderNotifications(); document.getElementById('notif-panel').classList.remove('hidden'); }
// function hideNotifPanel() { document.getElementById('notif-panel').classList.add('hidden'); }
//
// function toast(message, type = 'info') {
//   const dots = { info: 'accent', success: 'green', warning: 'amber', error: 'red' };
//   const el = document.createElement('div');
//   el.className = 'flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[12.5px] animate-fade-in';
//   el.style.cssText = 'background: var(--bg-2); box-shadow: 0 16px 48px rgba(0,0,0,0.5), inset 0 0 0 1px var(--line-2);';
//   el.innerHTML = `<span class="status status-${dots[type]}"></span><span class="text-1">${message}</span>`;
//   document.getElementById('toast-container').appendChild(el);
//   setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 240ms'; setTimeout(() => el.remove(), 240); }, 2400);
// }
// window.toast = toast;
//
// function wireChrome() {
//   document.getElementById('search-trigger').addEventListener('click', showCmdK);
//   document.getElementById('cmdk-backdrop').addEventListener('click', e => { if (e.target.id === 'cmdk-backdrop') hideCmdK(); });
//   document.getElementById('cmdk-input').addEventListener('input', e => renderCmdK(e.target.value));
//   document.addEventListener('keydown', e => {
//     if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); showCmdK(); }
//     else if (e.key === 'Escape') { hideCmdK(); hideNotifPanel(); document.getElementById('avatar-menu').classList.add('hidden'); }
//   });
//   document.getElementById('bell-trigger').addEventListener('click', showNotifPanel);
//   document.getElementById('notif-close').addEventListener('click', hideNotifPanel);
//   const ab = document.getElementById('avatar-trigger'), am = document.getElementById('avatar-menu');
//   ab.addEventListener('click', e => { e.stopPropagation(); am.classList.toggle('hidden'); });
//   document.addEventListener('click', e => { if (!am.contains(e.target) && e.target !== ab) am.classList.add('hidden'); });
//   document.getElementById('theme-toggle').addEventListener('click', () => {
//     document.documentElement.classList.toggle('dark');
//     const d = document.documentElement.classList.contains('dark');
//     document.getElementById('theme-label').textContent = d ? 'Dark mode' : 'Light mode';
//     document.querySelector('#theme-toggle .ni-icon').setAttribute('data-lucide', d ? 'moon' : 'sun'); lucide.createIcons();
//   });
//   document.querySelectorAll('.role-opt').forEach(el => el.addEventListener('click', () => {
//     document.querySelectorAll('.role-opt').forEach(r => r.classList.remove('active')); el.classList.add('active');
//     STATE.role = el.getAttribute('data-role'); am.classList.add('hidden');
//     toast(`Viewing as ${el.querySelector('span').textContent.trim()}`, 'success'); renderPage();
//   }));
//   wireClientSwitcher();
// }
//
// function renderClientSwitcher() {
//   const btn = document.getElementById('client-switcher'); if (!btn) return;
//   const all = STATE.client === 'all'; const c = all ? null : window.getClient(STATE.client);
//   btn.querySelector('[data-cs-name]').textContent = all ? 'All clients' : c.name;
//   btn.querySelector('[data-cs-sub]').textContent = all ? `${(window.CLIENTS || []).length} accounts` : c.industry;
//   btn.querySelector('[data-cs-icon]').setAttribute('data-lucide', all ? 'layers' : (c.icon || 'building-2')); lucide.createIcons();
// }
// window.renderClientSwitcher = renderClientSwitcher;
//
// function wireClientSwitcher() {
//   const btn = document.getElementById('client-switcher'); if (!btn) return;
//   renderClientSwitcher();
//   let menu = null;
//   const close = () => { if (menu) { menu.remove(); menu = null; } document.removeEventListener('mousedown', out); };
//   const out = (e) => { if (menu && !menu.contains(e.target) && !btn.contains(e.target)) close(); };
//   const row = (id, name, sub, dot, active) => `<button type="button" data-client-id="${id}" class="w-full flex items-center gap-2 px-2.5 py-2 text-left transition-colors" onmouseover="this.style.background='var(--bg-3)'" onmouseout="this.style.background='transparent'">
//     <span class="inline-block size-[6px] rounded-full shrink-0" style="background:${dot}"></span>
//     <div class="flex-1 min-w-0"><div class="text-[12.5px] font-medium leading-tight truncate text-1">${name}</div><div class="text-[10px] leading-tight mt-0.5" style="color: var(--text-3)">${sub}</div></div>
//     ${active ? `<i data-lucide="check" class="size-3" style="color: var(--acc-bright)"></i>` : ''}</button>`;
//   function open() {
//     menu = document.createElement('div'); const r = btn.getBoundingClientRect();
//     menu.style.cssText = `position: fixed; top:${r.bottom + 4}px; left:${r.left}px; width:${Math.max(r.width, 240)}px; background: var(--bg-2); border: 1px solid var(--line-2); border-radius: 8px; box-shadow: 0 16px 40px rgba(0,0,0,0.5); z-index: 60; overflow: hidden;`;
//     const dot = (s) => s === 'critical' ? '#e5546b' : s === 'at_risk' ? '#d99a3a' : '#15a06f';
//     menu.innerHTML = `<div class="px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-medium" style="color: var(--text-3); letter-spacing: 0.09em">Scope</div>
//       ${row('all', 'All clients', `${(window.CLIENTS || []).length} accounts`, '#15a06f', STATE.client === 'all')}
//       <div style="height:1px;background:var(--line-1);margin:2px 0"></div>
//       ${(window.CLIENTS || []).map(c => row(c.id, c.name, `$${(c.mrrUsd / 1000).toFixed(1)}k/mo`, dot(c.status), c.id === STATE.client)).join('')}`;
//     document.body.appendChild(menu); lucide.createIcons();
//     menu.querySelectorAll('[data-client-id]').forEach(el => el.addEventListener('click', (e) => {
//       e.stopPropagation(); const id = el.getAttribute('data-client-id'); STATE.client = id;
//       try { localStorage.setItem('xos.client', id); } catch (er) {}
//       renderClientSwitcher(); close(); toast(id === 'all' ? 'Scope: all clients' : `Scope: ${window.getClient(id).name}`, 'success'); renderPage();
//     }));
//     setTimeout(() => document.addEventListener('mousedown', out), 0);
//   }
//   btn.addEventListener('click', (e) => { e.stopPropagation(); if (menu) close(); else open(); });
// }
//
// function readHash() {
//   const h = window.location.hash.replace('#', '').split('?');
//   let route = h[0] || 'home';
//   let params = h[1] ? Object.fromEntries(new URLSearchParams(h[1])) : {};
//   if (ROUTE_REDIRECTS[route]) route = ROUTE_REDIRECTS[route];
//   STATE.route = route; STATE.params = params;
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//   readHash(); renderSidebar(); renderBreadcrumb(); renderPage(); wireChrome();
//   const a = window.AGENCY || {}; const pct = a.apiBudgetUsd ? Math.round((a.apiSpentUsd / a.apiBudgetUsd) * 100) : 0;
//   const m = document.getElementById('api-meter'); if (m) m.style.width = pct + '%';
//   const ml = document.getElementById('api-meter-label'); if (ml) ml.textContent = `$${a.apiSpentUsd}/$${a.apiBudgetUsd}`;
//   lucide.createIcons();
// });
// window.addEventListener('hashchange', () => { readHash(); renderSidebar(); renderBreadcrumb(); renderPage(); });
// window.navigate = navigate; window.STATE = STATE;
//