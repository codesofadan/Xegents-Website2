// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* ============================================================
//    Xegents OS - layout archetype builders (LX)
//    Dense, purpose-built shapes so views never default to the
//    "KPI cards + card grid" template. Use these per the contract.
//    ============================================================ */
// window.LX = (function () {
//   const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
//
//   // Inline stat rail - quiet metrics separated by hairlines. NOT boxed cards.
//   function statRail(stats) {
//     return `<div class="stat-rail">${stats.map(s => `
//       <div class="stat-cell"><div class="stat-k">${esc(s.k)}</div>
//         <div class="stat-v">${s.v}${s.delta != null ? ` <span class="delta ${s.delta > 0 ? 'delta-up' : s.delta < 0 ? 'delta-down' : 'delta-flat'}">${s.delta > 0 ? '+' : ''}${s.delta}${s.deltaUnit || '%'}</span>` : ''}</div>
//       </div>`).join('')}</div>`;
//   }
//
//   // Module header: title + sub, optional inline stat rail, optional actions. Replaces the KPI-card band.
//   function modHead({ title, sub, stats, actions }) {
//     return `<div class="mod-head">
//       <div><div class="mod-title">${esc(title)}</div>${sub ? `<div class="mod-sub">${esc(sub)}</div>` : ''}</div>
//       <div class="flex items-center gap-5">${stats ? statRail(stats) : ''}${actions ? `<div class="flex items-center gap-1.5">${actions}</div>` : ''}</div>
//     </div>`;
//   }
//
//   function toolbar({ left, right }) {
//     return `<div class="toolbar">${left || ''}<div class="grow"></div>${right || ''}</div>`;
//   }
//
//   // Segmented control - in-view tabs. Wrap with tabwrap() and pair with [data-pane] for auto-switching.
//   function segmented(items, activeId) {
//     return `<div class="segmented">${items.map((it, i) => `<div class="seg-item ${(activeId ? it.id === activeId : i === 0) ? 'active' : ''}" data-tab="${it.id}">${esc(it.label)}</div>`).join('')}</div>`;
//   }
//   function tabwrap(inner) { return `<div data-tabwrap>${inner}</div>`; }
//
//   // Dense list (Linear/Notion). Full-bleed, sticky header, no card wrapper.
//   // columns: [{key,label,align:'r',mono,width,sortable,render(row,i)}]. rowAttrs(row,i) -> string of attributes (for data-action="detail").
//   function dataList({ columns, rows, rowAttrs, cls }) {
//     const head = `<tr>${columns.map(c => `<th class="${c.align === 'r' ? 'r' : ''} ${c.sortable ? 'sortable' : ''}" ${c.width ? `style="width:${c.width}"` : ''}>${esc(c.label)}</th>`).join('')}</tr>`;
//     const body = rows.map((r, ri) => `<tr ${rowAttrs ? rowAttrs(r, ri) : ''}>${columns.map(c => `<td class="${c.align === 'r' ? 'r' : ''} ${c.mono ? 'num' : ''}">${c.render ? c.render(r, ri) : esc(r[c.key])}</td>`).join('')}</tr>`).join('');
//     return `<div class="dlist-wrap"><table class="dlist ${cls || ''}"><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
//   }
//
//   // Multi-pane workspace (rail + canvas + aside). Full-bleed; register the route in window.FULLBLEED.
//   function workspace({ cols, rail, main, aside }) {
//     const grid = cols || (aside != null ? '300px 1fr 320px' : rail != null ? '300px 1fr' : '1fr');
//     return `<div class="workspace" style="grid-template-columns:${grid}">
//       ${rail != null ? `<div class="ws-rail">${rail}</div>` : ''}
//       <div class="ws-main">${main || ''}</div>
//       ${aside != null ? `<div class="ws-aside">${aside}</div>` : ''}
//     </div>`;
//   }
//
//   // Console panel (monitor tile). Hairline, not glossy.
//   function panel({ title, actions, body, bare, cls }) {
//     return `<div class="panel ${cls || ''}">${title != null ? `<div class="panel-head"><div class="panel-title">${esc(title)}</div>${actions ? `<div class="flex items-center gap-1">${actions}</div>` : ''}</div>` : ''}<div class="${bare ? 'panel-bare' : 'panel-body'}">${body || ''}</div></div>`;
//   }
//
//   // Record / detail header.
//   function recordHead({ mark, markColor, title, sub, meta, actions }) {
//     const col = markColor || 'var(--acc)';
//     return `<div class="record-head">
//       ${mark ? `<div class="record-mark" style="background:${col}1f; color:${col}">${mark}</div>` : ''}
//       <div class="flex-1 min-w-0">
//         <div class="text-[18px] font-semibold tracking-tight text-1">${esc(title)}</div>
//         ${sub ? `<div class="text-[12px] text-3 mt-1">${esc(sub)}</div>` : ''}
//         ${meta ? `<div class="flex items-center gap-5 mt-3 flex-wrap">${meta.map(m => `<div class="text-[11.5px]"><span class="text-3">${esc(m.k)}</span> <span class="text-1 num">${m.v}</span></div>`).join('')}</div>` : ''}
//       </div>
//       ${actions ? `<div class="flex items-center gap-1.5 shrink-0">${actions}</div>` : ''}
//     </div>`;
//   }
//
//   function gallery(tiles) { return `<div class="gallery">${tiles.join('')}</div>`; }
//   function bar(pct, color) { return `<div class="bar-track"><div class="bar-fill" style="width:${Math.min(100, Math.max(0, pct))}%;background:${color || 'var(--acc)'}"></div></div>`; }
//
//   return { statRail, modHead, toolbar, segmented, tabwrap, dataList, workspace, panel, recordHead, gallery, bar, esc };
// })();
//