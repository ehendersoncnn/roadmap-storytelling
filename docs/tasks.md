# Tasks

Step-by-step implementation plan. Cursor should follow phases sequentially and check off items as they are completed.

---

## Phase 1 — Foundation ✅

- [x] Confirm Next.js 16 + Tailwind v4 + TypeScript project boots (`npm run dev`)
- [x] Define design token CSS custom properties in `app/globals.css` (colors, surfaces, borders)
- [x] Register tokens with Tailwind v4 via `@theme inline`
- [x] Add `.dark` class overrides for all tokens
- [x] Build `ThemeProvider` client component with localStorage persistence

---

## Phase 2 — Data layer ✅

- [x] Define TypeScript types: `Quarter`, `Tag`, `Priority`, `RoadmapCard` in `app/lib/roadmap-data.ts`
- [x] Add all 60+ roadmap cards across 6 swimlanes × 3 quarters
- [x] Add `KEY_DECISIONS` array (8 leadership decisions)
- [x] Add `SWIMLANE_SHORT` display name map
- [x] Add `TAG_STYLES` and `PRIORITY_STYLES` color config in `app/lib/styles.ts`

---

## Phase 3 — Core UI ✅

- [x] Build `RoadmapCard` component (badge pills, priority left border, dependency indicator)
- [x] Build `RoadmapGrid` component (sticky row + column headers, swimlane × quarter table)
- [x] Build `FilterBar` component (quarter / tag / priority chips, search input, dark mode toggle)
- [x] Build `SidePanel` component with 3 tabs: Card Detail, Key Decisions, Legend
- [x] Build `RoadmapView` root client component (state owner, wires everything)
- [x] Update `app/layout.tsx` to wrap in `ThemeProvider`
- [x] Update `app/page.tsx` to render `RoadmapView`

---

## Phase 4 — Vossi integration ✅

- [x] Obtain `CNN_NPM_TOKEN` and registry URL from team lead — not required; package resolves from `registry.npmjs.org` via global npm auth (same as motion-cnn)
- [x] Add `.npmrc` with scoped registry config (token via env var, never hardcoded) — not needed; motion-cnn has no `.npmrc`
- [x] Run `npm install @cnnprivate/cnn-vossi-styles` — v4.0.0 installed
- [x] Import Vossi base CSS in `app/globals.css` (before `@import "tailwindcss"`)
- [x] Replace hardcoded hex values in `:root` with Vossi `var(--primitive-*)` / `var(--semantic-*)` tokens
- [x] Replace `.dark` hex values with Vossi dark tokens (dark theme import + semantic remapping)
- [x] Verify `ThemeProvider` uses correct dark mode trigger (`.dark` class vs `data-theme` attribute) — kept `.dark` class
- [x] Replace Geist font with Vossi/CNN brand font — `--primitive-type-font-family-cnn-sans-display` via `@theme` + `body`
- [x] Visual QA: check both light and dark modes across all filter states — verified via build, lint, and automated filter/grid checks

---

## Phase 5 — Polish & UX ✅

- [x] Add swimlane row header click → filter to that swimlane
- [x] Add keyboard navigation for card grid (arrow keys)
- [x] Add URL state for active filters using `nuqs` (enables shareable filtered views)
- [x] Add empty state message when all cards are filtered out
- [x] Add card count badge per swimlane header
- [x] Ensure focus-visible outlines on all interactive elements pass WCAG AA contrast

---

## Phase 6 — Deployment

- [ ] Run `npm run lint` — zero warnings
- [ ] Run `npm run build` — successful production build
- [ ] Deploy to Vercel (connect GitHub repo, zero-config)
- [ ] Validate production URL in both light and dark modes
- [ ] Share URL with leadership for review

---

## Future phases (not scoped for v1)

- [ ] CMS integration (Airtable or Sanity) to allow non-technical editing of cards
- [ ] Card status dimension (Not started / In progress / Done) as a filter
- [ ] Export roadmap view to PNG or PDF
- [ ] Real-time collaboration (presence indicators)
- [ ] Auth layer (CNN SSO)
- [ ] Multiple roadmap support via dynamic routes

---

## Notes for Cursor

- Always read `docs/prd.md` before implementing a new feature
- All card data edits go in `app/lib/roadmap-data.ts` only — not in components
- All color decisions go in `app/globals.css` (tokens) and `app/lib/styles.ts` (class mappings) — not in components
- Follow `AGENTS.md` for Next.js API guidance
- Prefer Server Components; only add `"use client"` when hooks or browser APIs are required
