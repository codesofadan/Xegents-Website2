// XEGENTS: /seoportal removed from the site. Entire file commented out; original is in git history.
// window.FACILITIES = [
//   { id: 'bs-athens-1', client_id: 'acme', name: 'Brick & Stone Athens 1', city: 'Athens', state: 'GA', address: '1247 Atlanta Hwy', gbp_status: 'active', rank: 2.1, rank_delta: -0.6, reviews: 87, review_delta: 3, rating: 4.7, citations: 47, citation_score: 84, gbp_calls: 218, gbp_calls_delta: 0.12, audit_score: 78, top_kw: 'athens storage', edit_cooling: false },
//   { id: 'bs-athens-2', client_id: 'acme', name: 'Brick & Stone Athens 2', city: 'Athens', state: 'GA', address: '4421 Lexington Rd', gbp_status: 'suspended', rank: 16.4, rank_delta: 12.2, reviews: 41, review_delta: 0, rating: 4.5, citations: 38, citation_score: 71, gbp_calls: 8, gbp_calls_delta: -0.92, audit_score: 64, top_kw: 'storage athens lexington', edit_cooling: true },
//   { id: 'bs-atlanta', client_id: 'acme', name: 'Brick & Stone Atlanta', city: 'Atlanta', state: 'GA', address: '2210 Peachtree St', gbp_status: 'active', rank: 3.4, rank_delta: -0.2, reviews: 124, review_delta: 5, rating: 4.8, citations: 52, citation_score: 88, gbp_calls: 312, gbp_calls_delta: 0.18, audit_score: 82, top_kw: 'atlanta storage units', edit_cooling: false },
//   { id: 'star-athens', client_id: 'acme', name: 'Star Storage Athens', city: 'Athens', state: 'GA', address: '880 Hawthorne Ave', gbp_status: 'active', rank: 5.2, rank_delta: 0.1, reviews: 124, review_delta: 5, rating: 4.6, citations: 49, citation_score: 81, gbp_calls: 176, gbp_calls_delta: 0.06, audit_score: 71, top_kw: 'athens self storage', edit_cooling: false },
//   { id: 'royal-mini', client_id: 'royal', name: 'Royal Mini Storage', city: 'Athens', state: 'GA', address: '1102 Tallassee Rd', gbp_status: 'at_risk', rank: 16.4, rank_delta: 12.2, reviews: 47, review_delta: 1, rating: 4.4, citations: 34, citation_score: 67, gbp_calls: 42, gbp_calls_delta: -0.81, audit_score: 58, top_kw: 'athens storage units', edit_cooling: false },
//   { id: 'royal-loganville', client_id: 'royal', name: 'Royal Mini Loganville', city: 'Loganville', state: 'GA', address: '4490 Hwy 78', gbp_status: 'active', rank: 4.8, rank_delta: -2.1, reviews: 31, review_delta: 2, rating: 4.5, citations: 28, citation_score: 72, gbp_calls: 87, gbp_calls_delta: 0.31, audit_score: 76, top_kw: 'loganville storage', edit_cooling: false },
//   { id: 'royal-monroe', client_id: 'royal', name: 'Royal Mini Monroe', city: 'Monroe', state: 'GA', address: '3300 W Spring St', gbp_status: 'active', rank: 6.4, rank_delta: -1.2, reviews: 14, review_delta: 1, rating: 4.7, citations: 19, citation_score: 64, gbp_calls: 41, gbp_calls_delta: 0.14, audit_score: 69, top_kw: 'monroe ga storage', edit_cooling: false },
//   { id: 'sunset-austin', client_id: 'sunset', name: 'Sunset RV Austin', city: 'Austin', state: 'TX', address: '12200 Pond Springs Rd', gbp_status: 'active', rank: 4.4, rank_delta: -0.8, reviews: 62, review_delta: 4, rating: 4.8, citations: 41, citation_score: 79, gbp_calls: 128, gbp_calls_delta: 0.21, audit_score: 80, top_kw: 'rv storage austin', edit_cooling: false },
//   { id: 'sunset-roundrock', client_id: 'sunset', name: 'Sunset RV Round Rock', city: 'Round Rock', state: 'TX', address: '101 Western Drive', gbp_status: 'active', rank: 5.7, rank_delta: -0.5, reviews: 38, review_delta: 2, rating: 4.7, citations: 32, citation_score: 71, gbp_calls: 71, gbp_calls_delta: 0.11, audit_score: 74, top_kw: 'round rock boat storage', edit_cooling: false },
//   { id: 'sunset-georgetown', client_id: 'sunset', name: 'Sunset Georgetown', city: 'Georgetown', state: 'TX', address: '4880 Wolf Ranch Pkwy', gbp_status: 'active', rank: 6.1, rank_delta: -0.4, reviews: 24, review_delta: 1, rating: 4.6, citations: 27, citation_score: 68, gbp_calls: 42, gbp_calls_delta: 0.08, audit_score: 72, top_kw: 'georgetown rv storage', edit_cooling: false },
//   { id: 'sunset-cedar', client_id: 'sunset', name: 'Sunset Cedar Park', city: 'Cedar Park', state: 'TX', address: '900 W Whitestone Blvd', gbp_status: 'active', rank: 4.8, rank_delta: -0.7, reviews: 18, review_delta: 1, rating: 4.9, citations: 22, citation_score: 65, gbp_calls: 46, gbp_calls_delta: 0.18, audit_score: 75, top_kw: 'cedar park boat storage', edit_cooling: false },
//   { id: 'bs-conyers', client_id: 'acme', name: 'Brick & Stone Conyers', city: 'Conyers', state: 'GA', address: '1140 Dogwood Dr', gbp_status: 'active', rank: 3.9, rank_delta: -0.4, reviews: 71, review_delta: 4, rating: 4.7, citations: 44, citation_score: 78, gbp_calls: 162, gbp_calls_delta: 0.15, audit_score: 77, top_kw: 'conyers storage', edit_cooling: false },
//   { id: 'bs-loganville', client_id: 'acme', name: 'Brick & Stone Loganville', city: 'Loganville', state: 'GA', address: '4500 Atlanta Hwy', gbp_status: 'active', rank: 4.2, rank_delta: -0.6, reviews: 56, review_delta: 3, rating: 4.8, citations: 38, citation_score: 74, gbp_calls: 132, gbp_calls_delta: 0.18, audit_score: 76, top_kw: 'loganville storage units', edit_cooling: false },
//   { id: 'bs-watkinsville', client_id: 'acme', name: 'Brick & Stone Watkinsville', city: 'Watkinsville', state: 'GA', address: '1112 Mars Hill Rd', gbp_status: 'active', rank: 5.4, rank_delta: -0.3, reviews: 43, review_delta: 2, rating: 4.6, citations: 31, citation_score: 70, gbp_calls: 78, gbp_calls_delta: 0.09, audit_score: 73, top_kw: 'watkinsville storage', edit_cooling: false },
//   { id: 'bs-bogart', client_id: 'acme', name: 'Brick & Stone Bogart', city: 'Bogart', state: 'GA', address: '6620 Macon Hwy', gbp_status: 'active', rank: 6.7, rank_delta: -0.1, reviews: 22, review_delta: 1, rating: 4.4, citations: 24, citation_score: 65, gbp_calls: 51, gbp_calls_delta: 0.05, audit_score: 68, top_kw: 'bogart storage', edit_cooling: false },
// ];
//
// window.getFacility = (id) => window.FACILITIES.find(f => f.id === id);
//
// // 7x7 geo-grid for a primary facility (lower number = better rank)
// window.GEO_GRID = (centerRank = 3) => {
//   const grid = [];
//   for (let y = 0; y < 7; y++) {
//     const row = [];
//     for (let x = 0; x < 7; x++) {
//       const dist = Math.sqrt(Math.pow(x - 3, 2) + Math.pow(y - 3, 2));
//       const rank = Math.max(1, Math.min(20, Math.round(centerRank + dist * 1.4 + (Math.random() - 0.5) * 2)));
//       row.push(rank);
//     }
//     grid.push(row);
//   }
//   return grid;
// };
//