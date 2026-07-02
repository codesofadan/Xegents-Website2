# Shaders.com → Xegents — Animation & Design Evaluation

> **UPDATE (2026-07-01):** Hero aurora **implemented** in **Three.js** (purple, brand-matched) — see
> [`components/three/aurora-bg.tsx`](../components/three/aurora-bg.tsx), mounted in
> [`components/sections/hero.tsx`](../components/sections/hero.tsx). Lazy-loaded, pauses offscreen/hidden,
> honours reduced-motion, DPR-capped. The rest of this file is the broader evaluation.
>
> **Status:** Recommendation only. **No site code was changed.** This file is for you to review and approve.
> **Scraped:** https://shaders.com (homepage + component catalog + preset categories), 2026-07-01.
> **Reviewed for:** xegents.com — a professional **AI SEO automation agency** (B2B, dark-navy + single purple accent, Next.js 16 / React 19).

---

## 1. TL;DR (Roman Urdu + English)

**Shaders.com kya hai:** Ek **WebGPU shader component library** — 120 ready-made animated effects (Aurora, Blob, Beam, gradients, noise, blur, glass, etc.) jo aap React/Vue/Svelte/Solid/JS mein `npm i shaders` se drop kar sakte ho. 3 categories: **Backgrounds**, **Logo Shaders**, **Image Effects**. Dark, premium, "modern SaaS" aesthetic — Xegents ke dark+purple theme se naturally match karta hai.

**Meri top-1% UX pick (professional B2B ke liye) — TOP 3:**

| # | Effect | Kahan lagega (Xegents section) | Kyun best |
|---|--------|-------------------------------|-----------|
| **1** | **Aurora** | Hero background (headline ke peeche, low opacity) | Soft flowing light = "intelligent / AI". Purple pe tint karo → perfectly on-brand, premium, trust-worthy. Single best fit. |
| **2** | **DotGrid** | "How We Work" / "Tech Stack" section backgrounds | Subtle animated dot matrix = "data, systems, automation". Bohot restrained + professional. Aapke existing wire/network motif ko reinforce karta hai. |
| **3** | **FlowingGradient** (ya concept-fit: **FlowField**) | Final-CTA band / section transition | Flowing gradient/lines = "automation pipeline / flow of work". FlowingGradient = safe premium; FlowField = concept-level perfect (automation flow). |

**Bottom line:** Aapki site **already** Three.js (`network-bg`) + Vanta + GSAP + Framer + Lenis chala rahi hai. Shaders.com ko **upar se add mat karo** — **consolidate** karo: heavy Three/Vanta background ko **ek** shaders.com Aurora se replace karke bundle halka + Core Web Vitals behtar + brand zyada cohesive ho jayega. (Details §5–§6.)

---

## 2. What shaders.com actually is (scrape findings)

| Property | Finding |
|---|---|
| Tagline | "Shader magic for modern frontends" — component library for creative **WebGPU** effects |
| Tech | **WebGPU** (not WebGL/Three), built on Nuxt/Vue; ships as npm package `shaders` |
| Frameworks supported | **React**, Vue, Svelte, Solid, vanilla JS (→ React quickstart applies directly to Xegents) |
| Catalog size | **120 base components** |
| Preset families | **Backgrounds**, **Logo Shaders**, **Image Effects** |
| Extras | **MCP connector** (AI-agent installable), **Framer plugin**, visual "Design Editor" that exports copy-paste code |
| Model | Free base components + **Pro** (paid) presets; commercial license at `/license` — **confirm before shipping** |
| Aesthetic | Near-black UI (`#141416`), Geist font, restrained, premium — same family as Xegents' own dark theme |

**Full 120-component catalog (for reference):**
AngularBlur, Ascii, Aurora, BarShift, Beam, Blob, Blur, BrickPattern, BrightnessContrast, Bulge, ChannelBlur, Checkerboard, Chevron, ChromaFlow, ChromaticAberration, Circle, ColorWheel, ConcentricSpin, ConicGradient, ContourLines, Crescent, Cross, CRTScreen, Crystal, CursorRipples, CursorTrail, DiamondGradient, DiffuseBlur, Dither, DotGrid, DropShadow, Duotone, Ellipse, Emboss, Exposure, FallingLines, FilmGrain, FloatingParticles, Flower, FlowField, FlowingGradient, FlutedGlass, Fog, Form3D, FractalNoise, Glass, GlassTiles, Glitch, Glow, Godrays, Grid, GridDistortion, Halftone, HexGrid, HueShift, ImageTexture, Kaleidoscope, LensFlare, LinearBlur, LinearGradient, Liquify, Marble, Mirror, MultiPointGradient, Neon, Paper, Perspective, Pixelate, Plasma, PolarCoordinates, Polygon, Posterize, ProgressiveBlur, RadialGradient, RectangularCoordinates, ReflectivePlane, Ring, Ripples, RoundedRect, Saturation, Sharpness, Shatter, SimplexNoise, SineWave, Smoke, SmokeFill, Solarize, SolidColor, Spherize, Spiral, Star, Strands, Stretch, Stripes, StudioBackground, SunBurst, Swirl, ThinFilm, TiltShift, Tint, Trapezoid, Tritone, Truchet, Twirl, Vesica, VHS, Vibrance, VideoTexture, Vignette, Voronoi, Weave, WebcamTexture, WorleyNoise, ZoomBlur.

---

## 3. The ranking — for a professional AI SEO agency

Filter applied: **trustworthy B2B**, dark navy + **single purple accent**, restrained/premium, not a creative-portfolio look.

### 🟢 Tier 1 — Best fit (premium, on-brand, subtle)
| Effect | Use as | Why it works for Xegents |
|---|---|---|
| **Aurora** | Hero background | Soft flowing aurora = "AI / intelligence". Tint to purple ramp → signature look. |
| **DotGrid** | Section bg (How We Work, Tech Stack) | Dot matrix = data/automation. Extremely restrained, reads "systems". |
| **FlowingGradient / MultiPointGradient** | Hero or CTA band | The modern SaaS mesh-gradient (Stripe/Linear vibe). Purple-native. |
| **FlowField** | CTA / transition band | Flowing field lines = "automation pipeline". Concept-perfect for the brand. |
| **Godrays / Beam** | Hero focal or logo spotlight | Subtle volumetric light → premium, directs the eye to the CTA. Keep low opacity. |
| **FractalNoise / SimplexNoise / FilmGrain** | Overlay texture (5–8% opacity) | Kills flat-gradient banding, adds "expensive" tactile grain. |

### 🟡 Tier 2 — Accent / micro-interaction (use sparingly)
| Effect | Use as | Note |
|---|---|---|
| **Duotone / Tritone / Tint** | Client logos + team/case-study photos | **Pro trick:** purple-duotone every image → instant brand cohesion. High ROI, low risk. |
| **ProgressiveBlur** | Sticky header edge / overlay depth | Adds depth without motion cost. |
| **Glow / Neon** | Xegents wordmark (Logo Shaders) | Subtle glow on the logo only. Don't overdo. |
| **CursorTrail / Ripples / CursorRipples** | Hero pointer interaction | Delightful but risks "gimmicky" for B2B — **hero only, low intensity, optional**. |
| **TiltShift** | Product/dashboard screenshots | Focus attention on one UI region. |

### 🔴 Tier 3 — Avoid (undercuts B2B trust)
VHS, CRTScreen, Glitch, Ascii, Pixelate, Kaleidoscope, heavy ChromaticAberration, Shatter, Twirl, Bulge, Spherize, Liquify, Solarize, Emboss, Posterize.
→ These read "experimental art project", not "reliable automation partner". **Glitch/VHS especially signal instability** — wrong message for an agency selling dependable systems.

---

## 4. Section-by-section map (your actual Xegents sections)

Your sections (from `components/sections/`): Hero, Problem, How We Work, Services Preview, Case Studies, Tech Stack, Testimonials, Founder, FAQ, Final CTA, Tape Marquee.

| Section | Recommended shader | Intensity |
|---|---|---|
| **Hero** | **Aurora** (purple-tinted) + faint **FilmGrain** overlay | Low — headline must stay readable |
| **Problem** | none (keep it calm/serious) or very faint **DotGrid** | Minimal |
| **How We Work** | **DotGrid** or **FlowField** (the "process/flow" idea) | Subtle |
| **Tech Stack** | **DotGrid** / **HexGrid** | Subtle |
| **Case Studies / Testimonials** | **Duotone** purple treatment on all photos/logos | Static (no motion) |
| **Final CTA** | **FlowingGradient** or **Beam/Godrays** spotlight behind the button | Medium, but pause offscreen |
| **Footer / Tape Marquee** | none — let it rest | — |

**Rule of thumb:** max **1 animated shader in view at a time**. Never run Aurora + FlowField + DotGrid simultaneously on screen.

---

## 5. Professional caveats — MUST read before adopting

These matter more than usual because **you are an SEO agency — your own site's Core Web Vitals are a credibility signal.**

1. **Core Web Vitals / SEO (highest priority).** WebGPU shaders are GPU-heavy and can hurt **LCP / INP** and battery.
   - Ship a **static gradient/poster** for the LCP paint; **lazy-mount** the shader only *after* hydration.
   - Never block first paint. Cap concurrent shaders (1 hero + at most 1 section).
   - **Pause when tab hidden or section offscreen** (`IntersectionObserver` + `document.hidden`).
2. **WebGPU support + fallback.** WebGPU is **not universal** (varies by browser/OS/GPU). Feature-detect `navigator.gpu`; if absent, fall back to a CSS gradient / static poster. Test Safari + older devices.
3. **`prefers-reduced-motion`.** Respect it — freeze the shader to a single static frame. (Accessibility + it matches your own usual "subtle-only" taste.)
4. **Don't stack libraries.** You already run **Three.js (`network-bg`) + Vanta + GSAP + Framer Motion + Lenis**. Adding WebGPU on top = bundle bloat + jank + battery drain. **Recommendation: consolidate** — replace Vanta/`network-bg` with **one** shaders.com Aurora background, then drop the now-redundant libs. Net result: lighter bundle, better CWV, more cohesive brand. This is the single biggest win.
5. **Brand discipline.** Your theme's rule is **one purple accent only**. Tint every shader into the purple ramp — **no rainbow presets.** Keep the restraint that already makes the site look premium.
6. **Licensing / cost.** Base components are free via npm `shaders`; **Pro presets are a paid subscription.** Confirm the **commercial license** at `shaders.com/license` before shipping on a client-facing business site. Budget for Pro only if you use Pro presets.

---

## 6. Recommended path (if you approve)

1. **Pilot on Hero only** — Aurora (purple-tinted), low opacity, with static poster fallback + reduced-motion freeze.
2. **Measure** — Lighthouse before/after (LCP, INP, TBT). If green, proceed.
3. **Consolidate** — remove Vanta / trim `network-bg` so only one background system runs.
4. **Add DotGrid** to How-We-Work / Tech-Stack (subtle).
5. **Apply Duotone** purple treatment to all logos/photos (static, zero motion cost, big cohesion win).
6. **Optional** — FlowingGradient/Beam behind the Final CTA, paused offscreen.

**My single strongest recommendation:** Aurora on the hero (consolidating away Vanta) + purple Duotone on all imagery. That alone modernizes the site and tightens the brand without hurting performance.

---

## 6b. Live preview links — SEE the shortlisted animations

> Open in **Chrome or Edge (latest)** — these are **WebGPU**; older Safari/Firefox may show a fallback or blank. Each page has a **live interactive preview** with prop sliders.

**Top 3:**
- Aurora → https://shaders.com/docs/components/aurora
- DotGrid → https://shaders.com/docs/components/dotgrid
- FlowingGradient → https://shaders.com/docs/components/flowinggradient
- FlowField → https://shaders.com/docs/components/flowfield

**Accents / bonus:**
- Godrays → https://shaders.com/docs/components/godrays
- Beam → https://shaders.com/docs/components/beam
- Duotone (image treatment) → https://shaders.com/docs/components/duotone
- MultiPointGradient → https://shaders.com/docs/components/multipointgradient
- FractalNoise → https://shaders.com/docs/components/fractalnoise

**Browse by category (curated preset galleries):**
- Backgrounds → https://shaders.com/presets/backgrounds
- Logo Shaders → https://shaders.com/presets/logo-shaders
- Image Effects → https://shaders.com/presets/image-effects

**Other ways to view:**
- Design Editor (live playground, tweak + export code) → https://shaders.com/ → "Try the Editor"
- Video demos (zero setup) → YouTube https://www.youtube.com/@npm_i_shaders
- Full component index → https://shaders.com/docs/components

**Best way to judge fit:** let me build a tiny **isolated local sandbox** (a throwaway `/sandbox` route, not the live site) that renders these tinted to your **purple brand** on your dark background — so you see them in real Xegents context, not on shaders.com's own styling. Say the word.

---

## Appendix A — Reference hero ("Helix / operating system for modern teams")

User-supplied reference. It's a **soft animated aurora/fog gradient** hero — validates the Tier-1 **Aurora** pick.

**What makes it work:** soft aurora glow from edges · dark **Vignette** for focus · faint **FilmGrain** · big **display serif** headline with an italic accent word · pill badge + 4 stat cards + trusted-by logo row + scroll cue.

**Xegents-branded recipe (same look, our brand):**
- Base `#0C0C18` navy · swap teal → **purple ramp** `oklch(0.60 0.22 292)`, desaturated at edges.
- Stack: `Aurora` (purple, low speed, high softness, ~40–60% opacity) + faint `Fog`/`FractalNoise` (~8%) + `Vignette` + `FilmGrain` 5%.
- Radial dark scrim behind headline → text always crisp.
- **Optional brand lever:** introduce a **display serif** for the H1 (big premium uplift vs current Bricolage Grotesque sans).
- Same caveats as §5 (WebGPU fallback, LCP poster, reduced-motion, replace Vanta — don't stack).

---

## 7. Open items for you to confirm
- [ ] Do you want **Aurora** (soft/premium) or **FlowField** (literal "automation flow") as the hero signature? (I lean Aurora.)
- [ ] OK to **remove Vanta + trim Three `network-bg`** to make room? (Recommended.)
- [ ] Budget for **shaders.com Pro**, or stick to free base components only?
- [ ] Confirm you want the **purple-only** discipline kept (no multi-color presets).

Give me the go on any of these and I'll do a scoped, measured implementation (with before/after Lighthouse).
