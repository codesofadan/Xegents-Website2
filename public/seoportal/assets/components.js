/* ============================================================
   UI component builders - Mission Control aesthetic
   ============================================================ */

window.UI = {

  // Standard page wrapper - gives padding + max width, used for non-home pages
  page(content) {
    return `<section class="px-10 py-10"><div class="max-w-[1280px] mx-auto">${content}</div></section>`;
  },

  pageHeader({ title, subtitle, eyebrow, actions = [], stats = [] }) {
    return `
      <div class="flex items-start justify-between mb-8">
        <div>
          ${eyebrow ? `<div class="eyebrow mb-2.5">${eyebrow}</div>` : ''}
          <h1 class="h1">${title}</h1>
          ${subtitle ? `<p class="text-[13px] text-2 mt-2 max-w-2xl leading-relaxed">${subtitle}</p>` : ''}
        </div>
        ${actions.length ? `<div class="flex items-center gap-1.5 shrink-0">${actions.join('')}</div>` : ''}
      </div>
      ${stats.length ? `<div class="surface mb-7"><div class="grid grid-cols-${Math.min(stats.length, 4)}">${stats.map((s, i) => `<div class="px-5 py-4" style="${i > 0 ? 'border-left: 1px solid var(--line-1);' : ''}">${this.statContent(s)}</div>`).join('')}</div></div>` : ''}
    `;
  },

  statContent({ label, value, delta, deltaLabel, sub, dot, better }) {
    return `
      <div class="flex items-center gap-2 mb-2">
        ${dot ? `<span class="status status-${dot}"></span>` : ''}
        <div class="eyebrow">${label}</div>
      </div>
      <div class="flex items-baseline gap-2">
        <div class="text-[22px] font-semibold num text-1 leading-none tracking-tight">${value}</div>
        ${delta != null ? `<span class="num text-[11px] ${(better || delta > 0) ? 'text-acc-bright' : 'text-red'}">${delta > 0 ? '↑' : '↓'} ${Math.abs(delta).toFixed ? Math.abs(delta).toFixed(1) : Math.abs(delta)}${deltaLabel || ''}</span>` : ''}
      </div>
      ${sub ? `<div class="text-[10.5px] text-3 mt-1.5">${sub}</div>` : ''}
    `;
  },

  statCard(opts) {
    return `<div class="surface p-4">${this.statContent(opts)}</div>`;
  },

  status(text, color = 'slate') {
    return `<span class="status status-${color}">${text}</span>`;
  },

  tag(text, variant = '') {
    return `<span class="tag ${variant ? 'tag-' + variant : ''}">${text}</span>`;
  },

  pill(text, variant = 'slate') {
    const map = { green: 'green', amber: 'amber', red: 'red', sky: 'sky', indigo: 'acc', accent: 'acc', acc: 'acc', slate: 'slate', fuchsia: 'violet', violet: 'violet' };
    return `<span class="status status-${map[variant] || 'slate'}">${text}</span>`;
  },

  card(content, classes = '') {
    return `<div class="surface p-5 ${classes}">${content}</div>`;
  },

  cardTitle({ title, subtitle, icon, action }) {
    return `
      <div class="flex items-start justify-between mb-4">
        <div>
          <div class="flex items-center gap-2">
            ${icon ? `<i data-lucide="${icon}" class="size-3.5 text-3"></i>` : ''}
            <div class="h3">${title}</div>
          </div>
          ${subtitle ? `<div class="text-[11px] text-3 mt-0.5 ${icon ? 'ml-5' : ''}">${subtitle}</div>` : ''}
        </div>
        ${action || ''}
      </div>
    `;
  },

  switchTab(prefix, id) {
    document.querySelectorAll(`[data-tab^="${prefix}-"]`).forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${prefix}-${id}"]`)?.classList.add('active');
    document.querySelectorAll(`[data-tab-pane^="${prefix}-"]`).forEach(p => p.classList.add('hidden'));
    document.querySelector(`[data-tab-pane="${prefix}-${id}"]`)?.classList.remove('hidden');
  },

  avatar(name, color, size = 22) {
    const initials = name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
    const bg = color || `hsl(${(name.charCodeAt(0) * 11) % 360}, 45%, 45%)`;
    return `<div class="avatar" style="width:${size}px;height:${size}px;background:${bg};font-size:${Math.round(size * 0.42)}px;color: #fafaf7;">${initials}</div>`;
  },

  table({ columns, rows, onRowClick }) {
    return `
      <div class="surface overflow-hidden">
        <table class="table">
          <thead><tr>${columns.map(c => `<th class="${c.align === 'right' ? 'text-right' : ''}">${c.label}</th>`).join('')}</tr></thead>
          <tbody>
            ${rows.map(r => `<tr class="${onRowClick ? 'selectable' : ''}" ${onRowClick ? `onclick="${onRowClick}('${r.id || ''}')"` : ''}>${columns.map(c => `<td class="${c.align === 'right' ? 'text-right' : ''} ${c.mono ? 'num mono' : ''}">${c.render ? c.render(r) : r[c.key]}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  progressBar(value, max = 100, color = 'var(--acc)', height = 3) {
    const pct = Math.min(100, (value / max) * 100);
    return `<div class="rounded-full overflow-hidden" style="background: var(--bg-4); height:${height}px"><div style="width:${pct}%;background:${color};height:100%;border-radius:inherit"></div></div>`;
  },

  emptyState({ icon = 'inbox', title, body, action }) {
    return `<div class="empty-state"><i data-lucide="${icon}" class="size-10"></i><div class="text-[13px] font-medium text-1 mb-1">${title}</div><div class="text-[12px] text-3 mb-4">${body || ''}</div>${action || ''}</div>`;
  },

  modal({ title, body, footer }) {
    return `
      <div class="modal-backdrop" onclick="if(event.target===this) this.remove()">
        <div class="modal-body">
          <div class="px-5 py-3.5 flex items-center justify-between" style="border-bottom: 1px solid var(--line-1);">
            <h3 class="h3">${title}</h3>
            <button onclick="this.closest('.modal-backdrop').remove()" class="btn-icon-sm"><i data-lucide="x" class="size-3.5"></i></button>
          </div>
          <div class="p-5">${body}</div>
          ${footer ? `<div class="px-5 py-3 flex justify-end gap-2" style="border-top: 1px solid var(--line-1);">${footer}</div>` : ''}
        </div>
      </div>
    `;
  },

  openModal(html) {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstElementChild);
    lucide.createIcons();
  },

  drawerHTML({ title, body, actions }) {
    return `
      <div class="drawer">
        <div class="px-5 py-3.5 flex items-center justify-between sticky top-0 z-10" style="background: var(--bg-1); border-bottom: 1px solid var(--line-1);">
          <h3 class="h3">${title}</h3>
          <button onclick="document.querySelector('.drawer').remove()" class="btn-icon-sm"><i data-lucide="x" class="size-3.5"></i></button>
        </div>
        <div class="p-5">${body}</div>
        ${actions ? `<div class="px-5 py-3 flex justify-end gap-2 sticky bottom-0" style="background: var(--bg-1); border-top: 1px solid var(--line-1);">${actions}</div>` : ''}
      </div>
    `;
  },

  openDrawer(html) {
    document.querySelectorAll('.drawer').forEach(d => d.remove());
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstElementChild);
    lucide.createIcons();
  },

  kanban({ columns, renderCard }) {
    return `
      <div class="flex gap-3 pb-2 overflow-x-auto">
        ${columns.map(col => `
          <div class="kanban-col flex-1">
            <div class="px-3 py-2.5 flex items-center justify-between sticky top-0 rounded-t-lg" style="background: var(--bg-1); border-bottom: 1px solid var(--line-1);">
              <div class="flex items-center gap-2">
                <span class="status status-${col.statusDot || 'slate'}"></span>
                <span class="text-[12px] font-medium text-1">${col.label}</span>
                <span class="text-[10.5px] text-3 num">${col.cards.length}</span>
              </div>
              <button class="btn-icon-sm"><i data-lucide="plus" class="size-3"></i></button>
            </div>
            <div class="p-2 flex-1 overflow-y-auto">${col.cards.map(renderCard).join('')}</div>
            ${col.footer ? `<div class="px-3 py-2 text-[11px] text-3 num" style="border-top: 1px solid var(--line-1);">${col.footer}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  },

  donut({ segments, size = 120, thickness = 12 }) {
    const r = (size - thickness) / 2;
    const c = 2 * Math.PI * r;
    let offset = 0;
    const total = segments.reduce((s, x) => s + x.value, 0);
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="-rotate-90">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="rgba(255,255,255,0.05)" stroke-width="${thickness}" fill="none"/>
      ${segments.map(s => {
        const len = (s.value / total) * c;
        const seg = `<circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="${s.color}" stroke-width="${thickness}" fill="none" stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-offset}" stroke-linecap="round"/>`;
        offset += len;
        return seg;
      }).join('')}
    </svg>`;
  },

  legend(items) {
    return `<div class="space-y-1.5">${items.map(i => `
      <div class="flex items-center gap-2 text-[11px]">
        <span class="size-2 rounded-full shrink-0" style="background:${i.color}"></span>
        <span class="text-2 flex-1">${i.label}</span>
        <span class="text-3 num">${i.value}</span>
      </div>
    `).join('')}</div>`;
  },

  searchInput(placeholder = 'Search...', width = 'w-72') {
    return `<div class="relative ${width}">
      <i data-lucide="search" class="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-3"></i>
      <input class="input pl-8" placeholder="${placeholder}">
    </div>`;
  },

  filterPill(label, icon = 'sliders-horizontal') {
    return `<button class="btn btn-secondary btn-sm">
      <i data-lucide="${icon}" class="size-3"></i>
      <span>${label}</span>
      <i data-lucide="chevron-down" class="size-3 text-3"></i>
    </button>`;
  },

  btn(label, { variant = 'primary', icon, onClick, size = '' } = {}) {
    const sz = size === 'sm' ? ' btn-sm' : size === 'lg' ? ' btn-lg' : '';
    return `<button class="btn btn-${variant}${sz}" ${onClick ? `onclick="${onClick}"` : ''}>${icon ? `<i data-lucide="${icon}" class="size-3.5"></i>` : ''}<span>${label}</span></button>`;
  },
};

// ===== Helpers =====
window.formatMoney = (n) => '$' + Math.round(n).toLocaleString();
window.formatPct = (n, d = 1) => (n >= 0 ? '+' : '') + n.toFixed(d) + '%';
window.formatDelta = (n, d = 1) => (n >= 0 ? '+' : '') + n.toFixed(d);

window.shortDate = (s) => {
  const d = new Date(s);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

window.scoreRing = (value, color = '#10b981', size = 56) => {
  const r = (size - 5) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return `<div class="score-ring" style="width:${size}px;height:${size}px;">
    <svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="rgba(255,255,255,0.06)" stroke-width="3" fill="none"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="${color}" stroke-width="3" fill="none" stroke-dasharray="${c}" stroke-dashoffset="${off}" stroke-linecap="round"/>
    </svg>
    <span class="score-ring-text" style="color:${color}">${value}</span>
  </div>`;
};

// Continuous color interpolation for geo-grid - true heatmap feel
window.heatColor = (rank) => {
  // Map rank 1-20 to color gradient: emerald (1) -> amber (10) -> rose (20)
  const t = Math.min(1, Math.max(0, (rank - 1) / 19));
  // Two-stop interpolation
  const stops = [
    [0.0,  { r: 0x10, g: 0xb9, b: 0x81 }], // emerald
    [0.45, { r: 0x84, g: 0xcc, b: 0x16 }], // lime
    [0.7,  { r: 0xf5, g: 0x9e, b: 0x0b }], // amber
    [1.0,  { r: 0xf4, g: 0x3f, b: 0x5e }], // rose
  ];
  let a = stops[0], b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i][0] && t <= stops[i + 1][0]) { a = stops[i]; b = stops[i + 1]; break; }
  }
  const lt = (t - a[0]) / (b[0] - a[0] || 1);
  const r = Math.round(a[1].r + (b[1].r - a[1].r) * lt);
  const g = Math.round(a[1].g + (b[1].g - a[1].g) * lt);
  const bl = Math.round(a[1].b + (b[1].b - a[1].b) * lt);
  const bg = `rgb(${r},${g},${bl})`;
  const luma = 0.299 * r + 0.587 * g + 0.114 * bl;
  return { bg, text: luma > 160 ? '#000004' : '#FAFAF7' };
};

window.sparkSvg = (values, color = '#10b981', width = 96, height = 32) => {
  if (!values.length) return '';
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / span) * (height - 2) - 1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const area = `0,${height} ${points} ${width},${height}`;
  const id = 'sg' + Math.random().toString(36).slice(2, 8);
  return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="none">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity="0.35"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
    <polygon points="${area}" fill="url(#${id})"/>
    <polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
};

window.randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
window.daysAgo = (n) => { const d = new Date('2026-05-15'); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
