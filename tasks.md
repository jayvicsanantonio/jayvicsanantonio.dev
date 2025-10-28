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
  - Keep `cacheComponents: true` enabled (global prerequisite).
  - Drop deprecated `experimental.ppr` toggle in favor of per-route flags.
  - Document how to disable PPR via the `PPR_ENABLED` env toggle used by pages.
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

- [x] Mark `app/layout.tsx` with `'use cache'`.
- [x] Extract cached `AppShell` + `ClientHydration` pattern.
  - `Body.tsx` returns `<body>` with cached ambient background.
  - Wrap `ClientAppShell` in `<Suspense fallback={null}>`.
- [x] Convert navigation components
  - `GlassHeaderBubble` default export becomes server component.
  - Create `GlassHeaderBubble.client.tsx` (optional) for pointer-follow effect.
  - `NavPill` exposes server markup + optional `NavPill.client.tsx`.
- [x] Ensure font loading and metadata remain static; add `'use cache'` to helpers if needed.

## Phase 4 – Page Refactors

### Home (`app/page.tsx`)

- [x] Keep the page cached (async + `'use cache'`) and defer hero streaming behind `PPR_ENABLED`.
- [x] Introduce `HeroShell` server component using `getHeroConfig()`.
- [x] Create `HeroMorphIsland.client.tsx`; accept props for timings, scroll config, asset urls.
- [x] Wrap island with `<Suspense fallback={<HeroFallback />}>`.
- [x] Replace ad-hoc `dynamic()` imports with explicit islands.

### Projects (`app/projects/page.tsx`)

- [x] Keep the page cached (async + `'use cache'`) and gate streaming with `PPR_ENABLED`.
- [x] Fetch `const projects = await getProjects()`.
- [x] Render cards server-side; move filter state to `ProjectsFilterIsland.client.tsx`.
- [x] Provide `<ProjectsGridSkeleton />` fallback.
- [x] Delete direct `React.Suspense` usage in client file.

### Work (`app/work/page.tsx`)

- [x] Keep the page cached (async + `'use cache'`) and gate streaming with `PPR_ENABLED`.
- [x] Render headings using cached data.
- [x] Create `WorkTimelineIsland.client.tsx` that consumes `experiences`.
- [x] Add `<WorkTimelineSkeleton />` fallback mirroring layout.

### Lite (`app/lite/page.tsx`)

- [x] Keep the page cached (async + `'use cache'`) and gate streaming with `PPR_ENABLED`.
- [x] Fetch skills from `getSkillSections()`.
- [x] Stream nav via `NavRowIsland.client.tsx`.
- [x] Remove duplicated data arrays.

## Phase 5 – Cleanup & Documentation

- [x] Remove unused `.client` files and dead code paths after migration.
- [x] Update README with "Using PPR & Cache Components" section referencing new helpers.
- [x] Add `docs/ppr/rollout.md` summarizing flag usage, revalidation, and contributor guidelines.
- [x] Ensure ESLint/TypeScript configs accommodate new module paths.

## Phase 6 – Validation & Rollout

- [x] Run `pnpm type-check`, `pnpm check`, and address findings.
- [x] Execute targeted smoke tests (`next start` + Lighthouse against home/projects).
- [x] Capture post-refactor Lighthouse + bundle stats; commit to `reports/ppr-refactor`.
- [x] Toggle `PPR_ENABLED` off to confirm graceful fallback.
- [x] Prepare release notes summarizing wins (metrics, risks, toggle instructions).

## Post-Launch Follow-ups (Optional)

- [ ] Add monitoring for PPR streaming timing via custom analytics event.
- [ ] Evaluate Playwright smoke tests for `/`, `/projects`, `/work` streaming flows.
- [ ] Consider integrating `revalidateTag` triggers via GitHub Actions when content files change.
