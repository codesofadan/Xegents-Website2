// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Xegents OS - global interaction layer (XI)
//    Makes every button, row, tab, and filter in the page body do
//    something real. Two paths:
//    1. Authored hooks: data-action="detail|modal|toast|confirm|dismiss|menu|navigate|tab"
//       with data-* params -> rich, contextual behavior.
//    2. Fallback: any unwired button is matched by its label verb and
//       gets a sensible response (drawer / modal / toast / menu).
//    Scoped to #page-content so it never fights the top-bar chrome.
//    ============================================================ */
// (function () {
//   const XI = {};
//   const T = (m, t) => { if (window.toast) window.toast(m, t || 'info'); };
//   const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
//   const parse = (s) => { try { return JSON.parse(s); } catch (e) { return null; } };
//   const titleOf = (el) => {
//     const h = el.querySelector('.font-medium, .h1, .h2, .h3, strong, b, td, .text-1');
//     let t = (h ? h.textContent : el.textContent || '').trim().replace(/\s+/g, ' ');
//     return t.length > 64 ? t.slice(0, 64) + '...' : (t || 'Item');
//   };
//
//   // ---------- drawer / modal builders (lean on UI.* when present) ----------
//   function drawer({ title, subtitle, rows, body, actions }) {
//     const kv = (rows || []).map(r => `<div class="kv-row"><span class="kv-k">${esc(r[0])}</span><span class="kv-v">${r[1]}</span></div>`).join('');
//     const html = `
//       <div class="drawer">
//         <div class="px-5 py-3.5 flex items-center justify-between sticky top-0 z-10" style="background: var(--bg-1); border-bottom: 1px solid var(--line-1);">
//           <div><div class="h3">${esc(title)}</div>${subtitle ? `<div class="text-[11px] text-3 mt-0.5">${esc(subtitle)}</div>` : ''}</div>
//           <button class="btn-icon-sm" data-x-close><i data-lucide="x" class="size-3.5"></i></button>
//         </div>
//         <div class="p-5 space-y-4">
//           ${kv ? `<div>${kv}</div>` : ''}
//           ${body || ''}
//         </div>
//         ${actions !== false ? `<div class="px-5 py-3 flex justify-end gap-2 sticky bottom-0" style="background: var(--bg-1); border-top: 1px solid var(--line-1);">
//           ${actions || `<button class="btn btn-ghost btn-sm" data-x-close>Close</button><button class="btn btn-primary btn-sm" data-x-close data-x-toast="Saved">Save changes</button>`}
//         </div>` : ''}
//       </div>`;
//     mount(html, true);
//   }
//   function modal({ title, body, actions }) {
//     const html = `
//       <div class="modal-backdrop" data-x-backdrop>
//         <div class="modal-body">
//           <div class="px-5 py-3.5 flex items-center justify-between" style="border-bottom: 1px solid var(--line-1);">
//             <h3 class="h3">${esc(title)}</h3>
//             <button class="btn-icon-sm" data-x-close><i data-lucide="x" class="size-3.5"></i></button>
//           </div>
//           <div class="p-5 space-y-4">${body || ''}</div>
//           <div class="px-5 py-3 flex justify-end gap-2" style="border-top: 1px solid var(--line-1);">
//             ${actions || `<button class="btn btn-ghost btn-sm" data-x-close>Cancel</button><button class="btn btn-primary btn-sm" data-x-close data-x-toast="Created">Create</button>`}
//           </div>
//         </div>
//       </div>`;
//     mount(html, false);
//   }
//   function mount(html, isDrawer) {
//     document.querySelectorAll('.drawer, .modal-backdrop').forEach(n => n.remove());
//     const w = document.createElement('div');
//     w.innerHTML = html;
//     document.body.appendChild(w.firstElementChild);
//     if (window.lucide) lucide.createIcons();
//   }
//   function closeOverlays() { document.querySelectorAll('.drawer, .modal-backdrop, .x-menu').forEach(n => n.remove()); }
//
//   // generic form scaffold for create/edit (looks like a real product, no fake claims)
//   function form(fields) {
//     return fields.map(f => `
//       <label class="block">
//         <div class="text-[11px] text-2 mb-1.5">${esc(f.label)}</div>
//         ${f.type === 'select'
//           ? `<select class="input">${(f.options || []).map(o => `<option>${esc(o)}</option>`).join('')}</select>`
//           : f.type === 'textarea'
//           ? `<textarea class="input" rows="3" placeholder="${esc(f.ph || '')}">${esc(f.value || '')}</textarea>`
//           : `<input class="input" placeholder="${esc(f.ph || '')}" value="${esc(f.value || '')}">`}
//       </label>`).join('');
//   }
//
//   // ---------- tabs ----------
//   function activateTab(tab) {
//     const wrap = tab.closest('[data-tabwrap]');
//     if (!wrap) return false;
//     const id = tab.getAttribute('data-tab');
//     wrap.querySelectorAll('[data-tab]').forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === id));
//     wrap.querySelectorAll('[data-pane]').forEach(p => p.classList.toggle('hidden', p.getAttribute('data-pane') !== id));
//     return true;
//   }
//
//   // ---------- dropdown menu (filter / sort) ----------
//   function openMenu(anchor, items) {
//     closeMenuOnly();
//     const r = anchor.getBoundingClientRect();
//     const m = document.createElement('div');
//     m.className = 'x-menu';
//     m.style.cssText = `position: fixed; top:${r.bottom + 4}px; left:${r.left}px; z-index: 70;`;
//     m.innerHTML = items.map((it, i) => `<div class="x-menu-item" data-mi="${i}"><i data-lucide="${it.icon || 'check'}" class="size-3.5 text-3"></i><span>${esc(it.label || it)}</span></div>`).join('');
//     document.body.appendChild(m);
//     if (window.lucide) lucide.createIcons();
//     m.querySelectorAll('[data-mi]').forEach(el => el.addEventListener('click', () => {
//       const it = items[+el.getAttribute('data-mi')];
//       closeMenuOnly();
//       T((typeof it === 'string' ? it : it.label) , 'info');
//     }));
//     setTimeout(() => document.addEventListener('mousedown', menuOut), 0);
//   }
//   function menuOut(e) { if (!e.target.closest('.x-menu')) closeMenuOnly(); }
//   function closeMenuOnly() { document.querySelectorAll('.x-menu').forEach(n => n.remove()); document.removeEventListener('mousedown', menuOut); }
//
//   // ---------- label inference ----------
//   const VERBS = [
//     { k: ['approve', 'accept', 'confirm', 'publish', 'send', 'apply', 'mark as', 'mark '], fn: (el, label) => T(done(label), 'success') },
//     { k: ['schedule', 'enqueue', 'queue'], fn: (el, label) => T('Scheduled', 'success') },
//     { k: ['save', 'update'], fn: () => T('Changes saved', 'success') },
//     { k: ['enable', 'activate', 'turn on', 'connect', 'install'], fn: () => T('Enabled', 'success') },
//     { k: ['launch', 'go live', 'start campaign'], fn: () => T('Launched', 'success') },
//     { k: ['pause', 'snooze', 'hold', 'disable', 'turn off'], fn: () => T('Paused', 'info') },
//     { k: ['dismiss', 'reject', 'decline', 'ignore', 'archive', 'delete', 'remove', 'disconnect', 'unschedule'], fn: (el) => fade(el) },
//     { k: ['edit', 'configure', 'customize', 'manage', 'rename', 'adjust', 'set up'], fn: (el, label) => editDrawer(el, label) },
//     { k: ['new', 'create', 'add', 'compose', 'build ', 'invite', 'upload', 'import', 'request', 'draft '], fn: (el, label) => createModal(label) },
//     { k: ['view', 'open', 'details', 'detail', 'expand', 'see ', 'preview', 'inspect', 'reasoning'], fn: (el, label) => detailDrawer(el, label) },
//     { k: ['export', 'download', 'pdf', 'csv'], fn: () => { T('Preparing download', 'info'); } },
//     { k: ['filter', 'sort', 'group by', 'columns', 'date range', 'this month', 'last 30'], fn: (el) => openMenu(el, ['Today', 'Last 7 days', 'Last 30 days', 'This quarter', 'Custom range']) },
//     { k: ['regenerate', 'retry', 'refresh', 'sync', 'run ', 'recalculate'], fn: () => T('Working on it', 'info') },
//   ];
//   const done = (label) => {
//     const l = (label || '').toLowerCase();
//     if (l.includes('send')) return 'Sent';
//     if (l.includes('publish')) return 'Published';
//     if (l.includes('approve') || l.includes('accept')) return 'Approved';
//     if (l.includes('apply')) return 'Applied';
//     return 'Done';
//   };
//   function fade(el) {
//     const card = el.closest('[data-dismiss], .surface, .kanban-card, .list-rail-row, tr');
//     if (card && card.id !== 'page-content') { card.style.transition = 'opacity 200ms, transform 200ms'; card.style.opacity = '0'; card.style.transform = 'translateX(8px)'; setTimeout(() => card.remove(), 200); }
//     T('Dismissed', 'info');
//   }
//   function editDrawer(el, label) {
//     drawer({ title: 'Edit ' + shortNoun(label, titleOf(closestCard(el))), subtitle: 'Update the details below',
//       body: `<div class="space-y-3.5">${form([{ label: 'Name', value: titleOf(closestCard(el)) }, { label: 'Owner', type: 'select', options: (window.TEAM || []).map(t => t.name) }, { label: 'Status', type: 'select', options: ['Active', 'Paused', 'Draft', 'Archived'] }, { label: 'Notes', type: 'textarea', ph: 'Add a note' }])}</div>` });
//   }
//   function createModal(label) {
//     modal({ title: cap(label || 'Create new'),
//       body: `<div class="space-y-3.5">${form([{ label: 'Name', ph: 'Untitled' }, { label: 'Client', type: 'select', options: (window.CLIENTS || []).map(c => c.name) }, { label: 'Owner', type: 'select', options: (window.TEAM || []).map(t => t.name) }, { label: 'Details', type: 'textarea', ph: 'Describe this' }])}</div>` });
//   }
//   function detailDrawer(el, label) {
//     const card = closestCard(el);
//     drawer({ title: titleOf(card), subtitle: 'Detail view',
//       rows: collectKV(card),
//       body: `<div class="text-[12.5px] text-2 leading-relaxed">Full record opens here. In the live product this pulls the complete history, owner, linked client, and activity for this item.</div>`,
//       actions: `<button class="btn btn-ghost btn-sm" data-x-close>Close</button><button class="btn btn-secondary btn-sm" data-x-toast="Opening editor">Edit</button>` });
//   }
//   function closestCard(el) { return el.closest('.surface, .kanban-card, .list-rail-row, tr, [data-detail]') || el; }
//   function collectKV(card) {
//     const out = [];
//     card.querySelectorAll('.num').forEach(n => { const t = (n.textContent || '').trim(); if (t && out.length < 5) out.push(['Value', '<span class="num">' + esc(t) + '</span>']); });
//     if (!out.length) out.push(['Status', '<span class="status status-green">Active</span>']);
//     return out.slice(0, 5);
//   }
//   const shortNoun = (label, fallback) => fallback || cap((label || '').replace(/edit|configure|manage/ig, '').trim() || 'item');
//   const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
//
//   // ---------- master delegated handler ----------
//   document.addEventListener('click', (e) => {
//     // overlay close / inner action buttons (work anywhere)
//     const closeBtn = e.target.closest('[data-x-close], [data-x-backdrop]');
//     if (closeBtn) {
//       if (closeBtn.hasAttribute('data-x-backdrop') && e.target !== closeBtn) { /* click inside modal */ }
//       else { const t = closeBtn.getAttribute('data-x-toast'); closeOverlays(); if (t) T(t, 'success'); return; }
//     }
//     const toastBtn = e.target.closest('[data-x-toast]');
//     if (toastBtn && !toastBtn.hasAttribute('data-x-close')) { T(toastBtn.getAttribute('data-x-toast'), toastBtn.getAttribute('data-x-type') || 'success'); return; }
//
//     const pc = e.target.closest('#page-content');
//     if (!pc) return;
//
//     // authored action hooks
//     const act = e.target.closest('[data-action]');
//     if (act) {
//       e.preventDefault();
//       const a = act.getAttribute('data-action');
//       if (a === 'tab') { activateTab(act); return; }
//       if (a === 'navigate') { if (window.navigate) navigate(act.getAttribute('data-route')); return; }
//       if (a === 'toast' || a === 'confirm') { T(act.getAttribute('data-toast') || 'Done', act.getAttribute('data-type') || 'success'); if (a === 'confirm' && act.getAttribute('data-dismiss') === '1') fade(act); return; }
//       if (a === 'dismiss') { fade(act); return; }
//       if (a === 'menu') { openMenu(act, parse(act.getAttribute('data-menu')) || ['Option 1', 'Option 2']); return; }
//       if (a === 'modal') { modal({ title: act.getAttribute('data-title') || 'New', body: act.getAttribute('data-body') || `<div class="space-y-3.5">${form([{ label: 'Name', ph: 'Untitled' }, { label: 'Notes', type: 'textarea' }])}</div>` }); return; }
//       if (a === 'detail') {
//         drawer({ title: act.getAttribute('data-title') || titleOf(closestCard(act)), subtitle: act.getAttribute('data-sub') || 'Detail',
//           rows: parse(act.getAttribute('data-kv')) || collectKV(closestCard(act)),
//           body: act.getAttribute('data-body') || `<div class="text-[12.5px] text-2 leading-relaxed">Full record for this item.</div>` });
//         return;
//       }
//       return;
//     }
//
//     // native tabs authored as [data-tab] inside a [data-tabwrap]
//     const tab = e.target.closest('[data-tab]');
//     if (tab && tab.closest('[data-tabwrap]')) { e.preventDefault(); activateTab(tab); return; }
//
//     // let pre-wired inline handlers run untouched
//     if (e.target.closest('[onclick]')) return;
//
//     // clickable rows / cards -> detail
//     const row = e.target.closest('tr.selectable, .list-rail-row, .kanban-card, [data-detail]');
//     if (row) { detailDrawer(row, 'view'); return; }
//
//     // any button / control -> infer from label
//     const btn = e.target.closest('button, .btn, [role="button"]');
//     if (btn && !btn.hasAttribute('data-cs') && btn.id !== 'search-trigger') {
//       const label = (btn.getAttribute('aria-label') || btn.textContent || '').toLowerCase().trim();
//       const hit = VERBS.find(v => v.k.some(k => label.includes(k)));
//       if (hit) hit.fn(btn, label);
//       else if (label) T(cap(label.split('\n')[0].slice(0, 40)), 'info');
//       else T('Done', 'info');
//     }
//   });
//
//   document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOverlays(); });
//
//   XI.drawer = drawer; XI.modal = modal; XI.openMenu = openMenu; XI.activateTab = activateTab; XI.close = closeOverlays;
//   window.XI = XI;
// })();
//