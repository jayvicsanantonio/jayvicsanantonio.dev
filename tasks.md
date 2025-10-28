# Partial Pre-rendering & Cache Components Task Plan

## Phase 0 – Preparation

- [x] Capture current metrics
  - `pnpm build && pnpm analyze` → export bundle stats snapshot.
  - Run Lighthouse (desktop + mobile) for `/`, `/projects`; save to `reports/ppr-baseline/*.json`.
- [x] Enable feature flag plumbing
  - Add `PPR_ENABLED` env toggle in `.env.example` (commented).
  - Update `next.config.mjs` to read flag (no behavioral change yet).
- [x] Create `docs/ppr/` with README stub referencing requirements/design/tasks.

## Phase 1 – Configuration & Infrastructure

- [x] Update `next.config.mjs`
  - `experimental.ppr = process.env.PPR_ENABLED ? 'incremental' : undefined`.
  - Ensure `cacheComponents: true` retained.
  - Document comment explaining rollout strategy.
- [x] Introduce Suspense-ready fallbacks in `components/fallbacks/`.
- [x] Add shared TypeScript types in `lib/content/types.ts` (projects, experiences, skills).
- [x] Update lint/config docs to mention cache directives usage.

## Phase 2 – Data Providers

- [x] Create `lib/content/projects.ts`
  - Port data from `app/projects/projects.data.ts`.
  - Export `getProjects()` (`'use cache'`, `cacheTag('projects')`, `cacheLife('hours')`).
  - Include helper for priority ordering.
- [x] Create `lib/content/experiences.ts`
  - Port experiences array from `WorkTimeline.client.tsx`.
  - Expose `getExperiences()` with caching + section metadata.
- [x] Create `lib/content/skills.ts`
  - Consolidate skill sections shared by home/lite pages.
  - Export `getSkillSections()` with `cacheLife('days')`.
- [x] Create `lib/content/hero.ts`
  - Centralize hero config (timings, video).
  - Precompute preload asset descriptors.
- [x] Replace original data files with re-exports or delete once consumers updated.
- [x] Add unit-like guards (TypeScript `satisfies`) to ensure data conforms to types.

## Phase 3 – Layout & Shell Refactor

- [ ] Mark `app/layout.tsx` with `'use cache'`.
- [ ] Extract cached `AppShell` + `ClientHydration` pattern.
  - `Body.tsx` returns `<body>` with cached ambient background.
  - Wrap `ClientAppShell` in `<Suspense fallback={null}>`.
- [ ] Convert navigation components
  - `GlassHeaderBubble` default export becomes server component.
  - Create `GlassHeaderBubble.client.tsx` (optional) for pointer-follow effect.
  - `NavPill` exposes server markup + optional `NavPill.client.tsx`.
- [ ] Ensure font loading and metadata remain static; add `'use cache'` to helpers if needed.

## Phase 4 – Page Refactors

### Home (`app/page.tsx`)

- [ ] Add `'use cache'` + `export const experimental_ppr = true`.
- [ ] Introduce `HeroShell` server component using `getHeroConfig()`.
- [ ] Create `HeroMorphIsland.client.tsx`; accept props for timings, scroll config, asset urls.
- [ ] Wrap island with `<Suspense fallback={<HeroFallback />}>`.
- [ ] Replace ad-hoc `dynamic()` imports with explicit islands.

### Projects (`app/projects/page.tsx`)

- [ ] Add `'use cache'` + `experimental_ppr`.
- [ ] Fetch `const projects = await getProjects()`.
- [ ] Render cards server-side; move filter state to `ProjectsFilterIsland.client.tsx`.
- [ ] Provide `<ProjectsGridSkeleton />` fallback.
- [ ] Delete direct `React.Suspense` usage in client file.

### Work (`app/work/page.tsx`)

- [ ] Add `'use cache'` + `experimental_ppr`.
- [ ] Render headings using cached data.
- [ ] Create `WorkTimelineIsland.client.tsx` that consumes `experiences`.
- [ ] Add `<WorkTimelineSkeleton />` fallback mirroring layout.

### Lite (`app/lite/page.tsx`)

- [ ] Add `'use cache'` + `experimental_ppr`.
- [ ] Fetch skills from `getSkillSections()`.
- [ ] Stream nav via `NavRowIsland.client.tsx`.
- [ ] Remove duplicated data arrays.

## Phase 5 – Cleanup & Documentation

- [ ] Remove unused `.client` files and dead code paths after migration.
- [ ] Update README with "Using PPR & Cache Components" section referencing new helpers.
- [ ] Add `docs/ppr/rollout.md` summarizing flag usage, revalidation, and contributor guidelines.
- [ ] Ensure ESLint/TypeScript configs accommodate new module paths.

## Phase 6 – Validation & Rollout

- [ ] Run `pnpm type-check`, `pnpm check`, and address findings.
- [ ] Execute targeted smoke tests (`pnpm dev`, manual QA of animations, filters, nav).
- [ ] Capture post-refactor Lighthouse + bundle stats; commit to `reports/ppr-refactor`.
- [ ] Toggle `PPR_ENABLED` off to confirm graceful fallback.
- [ ] Prepare release notes summarizing wins (metrics, risks, toggle instructions).

## Post-Launch Follow-ups (Optional)

- [ ] Add monitoring for PPR streaming timing via custom analytics event.
- [ ] Evaluate Playwright smoke tests for `/`, `/projects`, `/work` streaming flows.
- [ ] Consider integrating `revalidateTag` triggers via GitHub Actions when content files change.
