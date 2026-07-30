// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// /* Local Grid mock data - facilities x keywords x scans */
//
// window.LOCAL_GRID_FACILITIES = [
//   {
//     id: 'bs-athens-1',
//     client_id: 'acme',
//     name: 'Brick & Stone Athens 1',
//     center_lat: 33.9519,
//     center_lng: -83.3576,
//     keywords: ['athens storage', 'storage units athens ga', 'self storage athens'],
//     competitors: ['Star Storage Athens', 'Royal Mini Storage', 'Athens Public Storage', 'CubeSmart Athens', 'Extra Space Athens'],
//     base_rank: 2.4,
//   },
//   {
//     id: 'sunset-austin',
//     client_id: 'sunset',
//     name: 'Sunset RV Austin',
//     center_lat: 30.4565,
//     center_lng: -97.7910,
//     keywords: ['rv storage austin', 'boat storage austin', 'rv parking austin tx'],
//     competitors: ['Texas RV Storage', 'Hill Country RV Park', 'Lone Star Boat Storage', 'Austin RV Depot', 'PaddlePoint RV'],
//     base_rank: 3.1,
//   },
//   {
//     id: 'royal-mini',
//     client_id: 'royal',
//     name: 'Royal Mini Storage',
//     center_lat: 33.9311,
//     center_lng: -83.4147,
//     keywords: ['athens storage units', 'cheap storage athens', 'climate controlled storage athens'],
//     competitors: ['Star Storage Athens', 'Brick & Stone Athens 1', 'Athens Public Storage', 'CubeSmart Athens'],
//     base_rank: 4.8,
//   },
//   {
//     id: 'mark-audit',
//     client_id: 'mark-audit',
//     name: 'GrowthBoost HQ',
//     center_lat: 31.5204,
//     center_lng: 74.3587,
//     keywords: ['marketing agency lahore', 'seo agency pakistan', 'digital agency dha lahore'],
//     competitors: ['Markitech', 'Lahore Digital Co', 'Pakistan SEO Pros', 'KreativeStorm', 'DigitalKraft'],
//     base_rank: 6.2,
//   },
// ];
//
// function lgSeededRandom(seed) {
//   let h = 2166136261 >>> 0;
//   for (let i = 0; i < seed.length; i++) {
//     h ^= seed.charCodeAt(i);
//     h = Math.imul(h, 16777619);
//   }
//   return () => {
//     h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
//     return ((h >>> 0) % 100000) / 100000;
//   };
// }
//
// function lgBuildScan(fixture, keyword, gridSize, scanIndex, scannedAtMs) {
//   const rand = lgSeededRandom(`${fixture.id}|${keyword}|${gridSize}|${scanIndex}`);
//   const half = (gridSize - 1) / 2;
//   const stepDegrees = 0.0085;
//   const radiusMeters = Math.round(half * stepDegrees * 111000);
//   const cells = [];
//
//   for (let y = 0; y < gridSize; y++) {
//     for (let x = 0; x < gridSize; x++) {
//       const dx = x - half;
//       const dy = y - half;
//       const dist = Math.sqrt(dx * dx + dy * dy);
//       const driftedBase = fixture.base_rank + scanIndex * 0.18;
//       const ourRank = Math.max(1, Math.min(20, Math.round(driftedBase + dist * 1.35 + (rand() - 0.5) * 2.6)));
//       const ranks = [];
//       const used = new Set();
//       ranks.push({ rank: ourRank, businessName: fixture.name, isYou: true, isTrackedCompetitor: false });
//       used.add(ourRank);
//
//       let placed = 1;
//       let candidate = 1;
//       while (placed < 3 && candidate <= 20) {
//         if (!used.has(candidate)) {
//           const compIdx = Math.floor(rand() * fixture.competitors.length);
//           const compName = fixture.competitors[compIdx];
//           const isTracked = compIdx < Math.min(3, fixture.competitors.length);
//           ranks.push({ rank: candidate, businessName: compName, isYou: false, isTrackedCompetitor: isTracked });
//           used.add(candidate);
//           placed++;
//         }
//         candidate++;
//       }
//       ranks.sort((a, b) => a.rank - b.rank);
//
//       cells.push({
//         lat: fixture.center_lat + dy * stepDegrees,
//         lng: fixture.center_lng + dx * stepDegrees,
//         ranks,
//       });
//     }
//   }
//
//   const top3Count = cells.filter((c) => c.ranks.some((r) => r.isYou && r.rank <= 3)).length;
//   const ourSolv = Math.round((top3Count / cells.length) * 1000) / 10;
//   const avgRank = Math.round((cells.reduce((s, c) => s + (c.ranks.find((r) => r.isYou)?.rank ?? 20), 0) / cells.length) * 10) / 10;
//   const coverageGaps = cells.filter((c) => (c.ranks.find((r) => r.isYou)?.rank ?? 99) > 10).length;
//
//   const perMap = new Map();
//   for (const cell of cells) {
//     for (const r of cell.ranks) {
//       if (r.isYou || r.rank > 3) continue;
//       perMap.set(r.businessName, (perMap.get(r.businessName) || 0) + 1);
//     }
//   }
//   const perCompetitor = Array.from(perMap.entries())
//     .map(([name, count]) => ({ name, solv: Math.round((count / cells.length) * 1000) / 10 }))
//     .sort((a, b) => b.solv - a.solv);
//
//   return {
//     id: `scan__${fixture.id}__${keyword.replace(/\s+/g, '-')}__${scanIndex}`,
//     facilityId: fixture.id,
//     keyword,
//     gridSize,
//     centerLat: fixture.center_lat,
//     centerLng: fixture.center_lng,
//     radiusMeters,
//     scannedAt: new Date(scannedAtMs).toISOString(),
//     cells,
//     metrics: { ourSolv, avgRank, top3Count, coverageGaps, perCompetitor },
//   };
// }
//
// window.LOCAL_GRID = (() => {
//   const result = {};
//   const now = Date.now();
//   const oneWeek = 7 * 24 * 60 * 60 * 1000;
//   for (const fixture of window.LOCAL_GRID_FACILITIES) {
//     result[fixture.id] = {};
//     for (const kw of fixture.keywords) {
//       const scans = [];
//       for (let i = 0; i < 5; i++) {
//         scans.push(lgBuildScan(fixture, kw, 7, i, now - i * oneWeek));
//       }
//       result[fixture.id][kw] = scans;
//     }
//   }
//   return result;
// })();
//
// window.getLocalGridScans = (facilityId, keyword) => {
//   const f = window.LOCAL_GRID[facilityId];
//   if (!f) return [];
//   return f[keyword] || f[Object.keys(f)[0]] || [];
// };
//