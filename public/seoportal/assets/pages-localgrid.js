/* ====================================================================
   INSIGHTS - Local Grid (PlacePuls / Whitespark style share-of-local-voice)
   ==================================================================== */

(function () {
  const COLOR_YOU = '#10b981';
  const COLOR_TRACKED = '#f59e0b';
  const COLOR_UNTRACKED = 'rgba(255,255,255,0.18)';

  const STATE = {
    facilityId: 'bs-athens-1',
    keyword: 'athens storage',
    gridSize: 7,
    trackedCompetitors: null,
    scanIndex: 0,
  };

  function rankFill(rank) {
    if (rank == null) return { fill: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.04)' };
    if (rank <= 3) return { fill: 'rgba(16,185,129,0.22)', stroke: 'rgba(16,185,129,0.55)' };
    if (rank <= 6) return { fill: 'rgba(132,204,22,0.18)', stroke: 'rgba(132,204,22,0.42)' };
    if (rank <= 10) return { fill: 'rgba(245,158,11,0.16)', stroke: 'rgba(245,158,11,0.40)' };
    if (rank <= 15) return { fill: 'rgba(244,63,94,0.12)', stroke: 'rgba(244,63,94,0.34)' };
    if (rank <= 20) return { fill: 'rgba(244,63,94,0.06)', stroke: 'rgba(244,63,94,0.22)' };
    return { fill: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.04)' };
  }

  function donutPath(cx, cy, r, startAngle, endAngle, width) {
    const a0 = (startAngle - 90) * (Math.PI / 180);
    const a1 = (endAngle - 90) * (Math.PI / 180);
    const rIn = r - width;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + rIn * Math.cos(a1), y2 = cy + rIn * Math.sin(a1);
    const x3 = cx + rIn * Math.cos(a0), y3 = cy + rIn * Math.sin(a0);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${rIn} ${rIn} 0 ${large} 0 ${x3} ${y3} Z`;
  }

  function rankColor(rank) {
    if (rank.isYou) return COLOR_YOU;
    if (rank.isTrackedCompetitor) return COLOR_TRACKED;
    return COLOR_UNTRACKED;
  }

  function getFixture() {
    return window.LOCAL_GRID_FACILITIES.find((f) => f.id === STATE.facilityId) || window.LOCAL_GRID_FACILITIES[0];
  }

  function getActiveScans() {
    return window.getLocalGridScans(STATE.facilityId, STATE.keyword);
  }

  function getActiveScan() {
    const scans = getActiveScans();
    return scans[STATE.scanIndex] || scans[0];
  }

  function applyTrackedFilter(scan) {
    if (!STATE.trackedCompetitors) {
      const fixture = getFixture();
      STATE.trackedCompetitors = new Set(fixture.competitors.slice(0, 3));
    }
    return scan.cells.map((c) => ({
      ...c,
      ranks: c.ranks.map((r) => ({ ...r, isTrackedCompetitor: r.isTrackedCompetitor && STATE.trackedCompetitors.has(r.businessName) })),
    }));
  }

  function mapTileBackground(size) {
    const lines = [];
    const step = 30;
    for (let i = 0; i <= size; i += step) {
      lines.push(`<line x1="0" y1="${i}" x2="${size}" y2="${i}" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>`);
      lines.push(`<line x1="${i}" y1="0" x2="${i}" y2="${size}" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>`);
    }
    return `
      <svg width="${size}" height="${size}" class="absolute inset-0" style="background: radial-gradient(circle at 50% 50%, rgba(16,185,129,0.04), transparent 70%); border-radius:4px;">
        ${lines.join('')}
        <path d="M 0 ${size * 0.42} Q ${size * 0.35} ${size * 0.38}, ${size * 0.55} ${size * 0.5} T ${size} ${size * 0.46}" stroke="rgba(255,255,255,0.05)" stroke-width="2" fill="none"/>
        <path d="M ${size * 0.18} 0 Q ${size * 0.32} ${size * 0.3}, ${size * 0.28} ${size * 0.6} T ${size * 0.45} ${size}" stroke="rgba(255,255,255,0.04)" stroke-width="2" fill="none"/>
        <path d="M ${size * 0.7} 0 Q ${size * 0.6} ${size * 0.4}, ${size * 0.72} ${size * 0.7} T ${size * 0.85} ${size}" stroke="rgba(255,255,255,0.04)" stroke-width="2" fill="none"/>
      </svg>
    `;
  }

  function renderGrid(scan, cells) {
    const cellPx = 60;
    const gridSize = scan.gridSize;
    const gridPx = gridSize * cellPx;
    const cellSvgs = cells.map((cell, idx) => {
      const col = idx % gridSize;
      const row = Math.floor(idx / gridSize);
      const x = col * cellPx;
      const y = row * cellPx;
      const ourRank = (cell.ranks.find((r) => r.isYou) || {}).rank ?? null;
      const f = rankFill(ourRank);
      const cx = x + cellPx / 2;
      const cy = y + cellPx / 2;
      const r = cellPx * 0.32;
      const width = cellPx * 0.10;
      const segAngle = 360 / Math.max(cell.ranks.length, 1);
      const segs = cell.ranks.map((rk, i) => {
        const op = rk.isYou ? 1 : rk.isTrackedCompetitor ? 0.9 : 0.55;
        return `<path d="${donutPath(cx, cy, r, i * segAngle + 2, (i + 1) * segAngle - 2, width)}" fill="${rankColor(rk)}" opacity="${op}"/>`;
      }).join('');
      const tooltipRows = cell.ranks.map((rk) => `<div class="flex items-center gap-2"><span class="num w-5" style="color:${rk.isYou ? COLOR_YOU : 'var(--text-2)'}">#${rk.rank}</span><span class="size-1.5 rounded-full shrink-0" style="background:${rankColor(rk)}"></span><span class="truncate flex-1" style="color:${rk.isYou ? 'var(--text-1)' : 'var(--text-2)'}">${rk.businessName}</span>${rk.isYou ? `<span class="text-[9px] uppercase mono" style="color:${COLOR_YOU}">you</span>` : ''}</div>`).join('');
      const tooltipHtml = `<div class="lg-tooltip pointer-events-none absolute z-10 rounded-md px-3 py-2 text-[11px] min-w-[180px] hidden" data-cell="${idx}" style="left:${cx}px; top:${y + cellPx + 8}px; transform: translate(-50%, 0); background: var(--bg-2); border: 1px solid rgba(255,255,255,0.10); box-shadow: 0 12px 32px rgba(0,0,0,0.45);"><div class="mono text-[10px] mb-1.5" style="color:var(--text-3)">${cell.lat.toFixed(4)}, ${cell.lng.toFixed(4)}</div><div class="space-y-1">${tooltipRows}</div></div>`;
      return {
        cellSvg: `<g data-cell-trigger="${idx}" style="cursor:pointer">
            <rect x="${x + 0.5}" y="${y + 0.5}" width="${cellPx - 1}" height="${cellPx - 1}" fill="${f.fill}" stroke="${f.stroke}" stroke-width="1" rx="2"/>
            ${segs}
            <text x="${cx}" y="${cy + 3}" text-anchor="middle" font-size="10" font-family="ui-monospace, monospace" fill="${ourRank && ourRank <= 3 ? COLOR_YOU : 'rgba(250,250,247,0.85)'}" font-weight="600">${ourRank ?? '-'}</text>
          </g>`,
        tooltipHtml,
      };
    });

    return `
      <div class="relative" style="width:${gridPx}px; height:${gridPx}px;">
        ${mapTileBackground(gridPx)}
        <svg width="${gridPx}" height="${gridPx}" viewBox="0 0 ${gridPx} ${gridPx}" class="absolute inset-0">
          ${cellSvgs.map((c) => c.cellSvg).join('')}
        </svg>
        ${cellSvgs.map((c) => c.tooltipHtml).join('')}
      </div>
    `;
  }

  function attachGridHover() {
    document.querySelectorAll('[data-cell-trigger]').forEach((g) => {
      g.addEventListener('mouseenter', () => {
        document.querySelectorAll('.lg-tooltip').forEach((t) => t.classList.add('hidden'));
        const idx = g.getAttribute('data-cell-trigger');
        const t = document.querySelector(`.lg-tooltip[data-cell="${idx}"]`);
        if (t) t.classList.remove('hidden');
      });
      g.addEventListener('mouseleave', () => {
        const idx = g.getAttribute('data-cell-trigger');
        const t = document.querySelector(`.lg-tooltip[data-cell="${idx}"]`);
        if (t) t.classList.add('hidden');
      });
    });
  }

  function sparkPath(values, width, height) {
    if (!values.length) return { line: '', area: '' };
    const min = Math.min(...values), max = Math.max(...values);
    const span = max - min || 1;
    const pts = values.map((v, i) => {
      const x = (i / Math.max(1, values.length - 1)) * width;
      const y = height - ((v - min) / span) * (height - 2) - 1;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return {
      line: `M ${pts.join(' L ')}`,
      area: `M 0,${height} L ${pts.join(' L ')} L ${width},${height} Z`,
    };
  }

  function renderHeader() {
    return `
      <div class="flex items-start justify-between mb-7">
        <div>
          <div class="eyebrow mb-2.5">Insights</div>
          <h1 class="h1 flex items-center gap-2.5"><i data-lucide="crosshair" class="size-5 text-acc-bright"></i> Local grid</h1>
          <p class="text-[13px] text-2 mt-2 max-w-2xl leading-relaxed">Share of local voice across a ${STATE.gridSize} by ${STATE.gridSize} grid. PlacePuls / Whitespark style, per-cell donut share, not a single-business heatmap.</p>
        </div>
        <span class="text-[10px] mono text-3">Mock data - awaiting Places / DataForSEO wiring</span>
      </div>
    `;
  }

  function renderLeftRail(fixture, scans) {
    const tracked = STATE.trackedCompetitors || new Set(fixture.competitors.slice(0, 3));
    return `
      <aside class="col-span-3 space-y-4">
        <div class="surface p-4">
          <div class="eyebrow mb-3">Facility</div>
          <select id="lg-facility" class="w-full text-[12.5px] bg-transparent px-3 py-2 rounded-md" style="border:1px solid rgba(255,255,255,0.08); color:var(--text-1);">
            ${window.LOCAL_GRID_FACILITIES.map((f) => `<option value="${f.id}" ${f.id === STATE.facilityId ? 'selected' : ''} style="background:var(--bg-1)">${f.name}</option>`).join('')}
          </select>
        </div>
        <div class="surface p-4">
          <div class="eyebrow mb-3">Keyword</div>
          <select id="lg-keyword" class="w-full text-[12.5px] bg-transparent px-3 py-2 rounded-md" style="border:1px solid rgba(255,255,255,0.08); color:var(--text-1);">
            ${fixture.keywords.map((k) => `<option value="${k}" ${k === STATE.keyword ? 'selected' : ''} style="background:var(--bg-1)">${k}</option>`).join('')}
          </select>
        </div>
        <div class="surface p-4">
          <div class="eyebrow mb-3">Grid size</div>
          <div class="flex gap-1.5">
            ${[5, 7, 9].map((g) => `<button data-grid="${g}" class="flex-1 text-[11.5px] py-1.5 rounded-md num" style="background:${STATE.gridSize === g ? 'var(--acc-soft)' : 'transparent'}; color:${STATE.gridSize === g ? 'var(--acc-bright)' : 'var(--text-2)'}; border:1px solid ${STATE.gridSize === g ? 'var(--acc-line)' : 'rgba(255,255,255,0.08)'}">${g} x ${g}</button>`).join('')}
          </div>
        </div>
        <div class="surface p-4">
          <div class="eyebrow mb-3">Competitors</div>
          <div class="space-y-1.5">
            ${fixture.competitors.map((c) => {
              const on = tracked.has(c);
              return `<label class="flex items-center gap-2 cursor-pointer text-[12px]">
                <input type="checkbox" data-competitor="${c}" ${on ? 'checked' : ''} style="accent-color:${COLOR_TRACKED}; width:12px; height:12px;"/>
                <span class="size-2 rounded-full shrink-0" style="background:${on ? COLOR_TRACKED : 'rgba(255,255,255,0.18)'}"></span>
                <span style="color:${on ? 'var(--text-1)' : 'var(--text-3)'}">${c}</span>
              </label>`;
            }).join('')}
          </div>
        </div>
        <div class="surface p-4">
          <div class="eyebrow mb-3">Scan history</div>
          <div class="space-y-0">
            ${scans.map((s, i) => `
              <div class="flex items-center justify-between py-1.5 text-[11px] cursor-pointer" data-scan-index="${i}" style="border-bottom:${i < scans.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'}">
                <span class="mono" style="color:var(--text-3)">${s.scannedAt.slice(0, 10)}</span>
                <span class="num" style="color:${i === STATE.scanIndex ? 'var(--acc-bright)' : 'var(--text-2)'}">${s.metrics.ourSolv.toFixed(1)}%</span>
              </div>
            `).join('')}
          </div>
        </div>
        <button id="lg-run" class="w-full flex items-center justify-center gap-2 py-2.5 text-[12px] font-medium rounded-md" style="background:var(--acc); color:#001a10;">
          <i data-lucide="play" class="size-3.5"></i> Run new scan
        </button>
      </aside>
    `;
  }

  function renderCenter(scan, cells) {
    return `
      <div class="col-span-6">
        <div class="surface p-6">
          <div class="flex items-baseline justify-between mb-4">
            <div>
              <div class="text-[13px] font-semibold leading-tight">${getFixture().name}</div>
              <div class="text-[10.5px] mono mt-0.5" style="color:var(--text-3)">"${scan.keyword}" - radius ${(scan.radiusMeters / 1000).toFixed(1)} km</div>
            </div>
            <div class="flex items-center gap-2 text-[10px] mono" style="color:var(--text-3)">
              <i data-lucide="map-pin" class="size-3"></i>
              ${scan.centerLat.toFixed(4)}, ${scan.centerLng.toFixed(4)}
            </div>
          </div>
          <div class="flex justify-center mb-5">
            ${renderGrid(scan, cells)}
          </div>
          <div class="flex items-center justify-center gap-5 text-[10.5px]" style="color:var(--text-3)">
            <span class="flex items-center gap-1.5"><span class="size-2 rounded-full" style="background:${COLOR_YOU}"></span> You</span>
            <span class="flex items-center gap-1.5"><span class="size-2 rounded-full" style="background:${COLOR_TRACKED}"></span> Tracked competitor</span>
            <span class="flex items-center gap-1.5"><span class="size-2 rounded-full" style="background:${COLOR_UNTRACKED}"></span> Other top-3</span>
            <span class="flex items-center gap-1.5"><span class="inline-block w-4 h-2 rounded-sm" style="background: linear-gradient(90deg, rgba(16,185,129,0.5), rgba(245,158,11,0.4), rgba(244,63,94,0.4))"></span> Cell tint = our rank intensity</span>
          </div>
        </div>
      </div>
    `;
  }

  function scoreCard(label, value, delta, deltaSuffix, goodDir, iconColor) {
    const showDelta = delta != null && delta !== 0;
    const good = goodDir === 'down' ? delta < 0 : delta > 0;
    return `
      <div class="surface p-4">
        <div class="eyebrow mb-2 flex items-center gap-2">
          ${iconColor ? `<span class="size-2 rounded-full" style="background:${iconColor}"></span>` : ''}
          ${label}
        </div>
        <div class="flex items-baseline gap-2">
          <div class="text-[22px] font-semibold num leading-none">${value}</div>
          ${showDelta ? `<span class="num text-[10.5px]" style="color:${good ? 'var(--acc-bright)' : 'var(--red)'}">${delta > 0 ? '+' : ''}${delta.toFixed(1)}${deltaSuffix || ''}</span>` : ''}
        </div>
      </div>
    `;
  }

  function renderRight(scan, scans) {
    const tracked = STATE.trackedCompetitors || new Set(getFixture().competitors.slice(0, 3));
    const prev = scans[STATE.scanIndex + 1];
    const solvDelta = prev ? Math.round((scan.metrics.ourSolv - prev.metrics.ourSolv) * 10) / 10 : null;
    const rankDelta = prev ? Math.round((scan.metrics.avgRank - prev.metrics.avgRank) * 10) / 10 : null;
    const sparkVals = scans.slice().reverse().map((s) => s.metrics.ourSolv);
    const sp = sparkPath(sparkVals, 240, 56);
    const maxSolv = scan.metrics.perCompetitor[0] ? scan.metrics.perCompetitor[0].solv : 1;
    return `
      <aside class="col-span-3 space-y-4">
        ${scoreCard('Our SoLV', scan.metrics.ourSolv.toFixed(1) + '%', solvDelta, 'pp', 'up', COLOR_YOU)}
        ${scoreCard('Avg rank', scan.metrics.avgRank.toFixed(1), rankDelta, '', 'down')}
        ${scoreCard('Top-3 reach', `${scan.metrics.top3Count} / ${scan.cells.length}`)}
        ${scoreCard('Coverage gaps', String(scan.metrics.coverageGaps), null, '', 'up', COLOR_TRACKED)}
        <div class="surface p-4">
          <div class="eyebrow mb-3">Per-competitor SoLV</div>
          <div class="space-y-2">
            ${scan.metrics.perCompetitor.slice(0, 8).map((c) => {
              const pct = Math.min(100, (c.solv / maxSolv) * 100);
              const isOn = tracked.has(c.name);
              return `
                <div>
                  <div class="flex items-center justify-between text-[11px] mb-1">
                    <span style="color:${isOn ? 'var(--text-1)' : 'var(--text-3)'}">${c.name}</span>
                    <span class="num" style="color:var(--text-2)">${c.solv.toFixed(1)}%</span>
                  </div>
                  <div class="rounded-full overflow-hidden" style="background:rgba(255,255,255,0.05); height:3px;">
                    <div style="width:${pct}%; background:${isOn ? COLOR_TRACKED : 'rgba(255,255,255,0.25)'}; height:100%;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="surface p-4">
          <div class="eyebrow mb-3">Coverage gaps</div>
          <div class="space-y-1.5" style="max-height:160px; overflow-y:auto;">
            ${scan.cells
              .map((c) => ({ c, rank: (c.ranks.find((r) => r.isYou) || {}).rank ?? 99 }))
              .filter((x) => x.rank > 10)
              .slice(0, 8)
              .map(({ c, rank }) => {
                const top = c.ranks.find((r) => !r.isYou && r.rank === 1);
                return `
                  <div class="flex items-center justify-between text-[10.5px] mono py-1" style="border-bottom:1px solid rgba(255,255,255,0.04)">
                    <span style="color:var(--text-3)">${c.lat.toFixed(3)}, ${c.lng.toFixed(3)}</span>
                    <span style="color:var(--red)">#${rank}</span>
                    <span class="truncate ml-2" style="color:var(--text-2); max-width:100px;">${top ? top.businessName : '-'}</span>
                  </div>
                `;
              }).join('')}
          </div>
        </div>
        <div class="surface p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="eyebrow">SoLV last ${sparkVals.length} scans</div>
            <i data-lucide="history" class="size-3 text-3"></i>
          </div>
          <svg width="100%" viewBox="0 0 240 56" preserveAspectRatio="none" style="height:56px;">
            <defs>
              <linearGradient id="lg-spark-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${COLOR_YOU}" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="${COLOR_YOU}" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="${sp.area}" fill="url(#lg-spark-grad)"/>
            <path d="${sp.line}" fill="none" stroke="${COLOR_YOU}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
          </svg>
          <div class="flex items-center justify-between text-[10px] mono mt-1" style="color:var(--text-3)">
            <span>${Math.min(...sparkVals, 0).toFixed(0)}%</span>
            <span>${Math.max(...sparkVals, 0).toFixed(0)}%</span>
          </div>
        </div>
      </aside>
    `;
  }

  function renderLocalGrid() {
    const fixture = getFixture();
    if (!fixture.keywords.includes(STATE.keyword)) {
      STATE.keyword = fixture.keywords[0];
    }
    if (!STATE.trackedCompetitors) {
      STATE.trackedCompetitors = new Set(fixture.competitors.slice(0, 3));
    }
    const scans = getActiveScans();
    if (STATE.scanIndex >= scans.length) STATE.scanIndex = 0;
    const scan = scans[STATE.scanIndex];
    const cells = applyTrackedFilter(scan);

    return `
      ${renderHeader()}
      <div class="grid grid-cols-12 gap-5">
        ${renderLeftRail(fixture, scans)}
        ${renderCenter({ ...scan, cells }, cells)}
        ${renderRight(scan, scans)}
      </div>
    `;
  }

  function attachInteractions() {
    const facilitySel = document.getElementById('lg-facility');
    if (facilitySel) facilitySel.addEventListener('change', (e) => {
      STATE.facilityId = e.target.value;
      const next = getFixture();
      STATE.keyword = next.keywords[0];
      STATE.trackedCompetitors = new Set(next.competitors.slice(0, 3));
      STATE.scanIndex = 0;
      rerender();
    });
    const kwSel = document.getElementById('lg-keyword');
    if (kwSel) kwSel.addEventListener('change', (e) => { STATE.keyword = e.target.value; STATE.scanIndex = 0; rerender(); });
    document.querySelectorAll('[data-grid]').forEach((b) => b.addEventListener('click', () => {
      STATE.gridSize = parseInt(b.getAttribute('data-grid'), 10);
      rerender();
    }));
    document.querySelectorAll('[data-competitor]').forEach((cb) => cb.addEventListener('change', () => {
      const name = cb.getAttribute('data-competitor');
      if (cb.checked) STATE.trackedCompetitors.add(name);
      else STATE.trackedCompetitors.delete(name);
      rerender();
    }));
    document.querySelectorAll('[data-scan-index]').forEach((r) => r.addEventListener('click', () => {
      STATE.scanIndex = parseInt(r.getAttribute('data-scan-index'), 10);
      rerender();
    }));
    const runBtn = document.getElementById('lg-run');
    if (runBtn) runBtn.addEventListener('click', () => {
      STATE.scanIndex = 0;
      rerender();
    });
    attachGridHover();
  }

  function rerender() {
    const target = document.getElementById('page-content');
    if (!target) return;
    target.innerHTML = `<section class="px-10 py-10"><div class="max-w-[1280px] mx-auto">${renderLocalGrid()}</div></section>`;
    if (window.lucide) window.lucide.createIcons();
    attachInteractions();
  }

  window.PAGES = window.PAGES || {};
  window.PAGES.localGrid = renderLocalGrid;
  window.PAGES_AFTER = window.PAGES_AFTER || {};
  window.PAGES_AFTER.localGrid = attachInteractions;
  window.PagesLocalGrid = { renderLocalGrid };
})();
