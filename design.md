# Partial Pre-rendering & Cache Components Design

## Architectural Overview

The refactor reorganizes rendering concerns into three layers:

1. **Server Shell (Cached)**
   - Root layout (`app/layout.tsx`) and shared wrappers (`components/shell/Body.tsx`, `AmbientBackground`, nav scaffolding) run with `'use cache'`.
   - Responsible for fonts, metadata, and static chrome.
   - Emits placeholders and `Suspense` boundaries for interactive islands.
2. **Data Providers (Cached Utilities)**
   - Modules under `lib/content/` export async getters (`getProjects`, `getExperiences`, `getSkillSections`, `getHeroConfig`).
   - Each function uses `'use cache'`, `cacheLife('hours'|'days')`, and `cacheTag` where webhook-based invalidation could apply.
   - Transformations (sorting, derived counts) occur server-side so hydrated clients receive ready-to-render props.
3. **Interactive Islands (Client Wrappers)**
   - Thin `.client.tsx` components handle motion, cursor tracking, router navigation, and user-specific queries.
   - They receive serialized props from cached parents and focus solely on browser APIs or high-frequency state.

PPR relies on `cacheComponents: true`; each route renders a cached server shell and streams dynamic islands behind `<Suspense>` fallbacks that can be disabled via the `PPR_ENABLED` toggle.

## Module & File Plan

### Configuration

- `next.config.mjs`
  - Add `experimental: { ppr: process.env.PPR_ENABLED ? 'incremental' : undefined }`.
  - Retain `cacheComponents: true`.
  - Document rollout via environment flag.

### Layout & Shell

- `app/layout.tsx`
  - Add `'use cache'`.
  - Split layout into `AppShell` (cached) + `ClientHydration` (lazy import via Suspense).
  - Ensure `metadata` and `viewport` exports remain static; consider caching `generateMetadata` if introduced.
- `components/shell/Body.tsx`
  - Convert to server component returning `<body>` and injecting `<Suspense fallback={null}><ClientAppShell /></Suspense>`.
  - Move `AmbientBackground` invocation from client shell to server (cached) with optional `suppressHydrationWarning`.

### Data Providers

- `lib/content/projects.ts`
  - Export `getProjects()` returning `Project[]` from existing dataset.
  - Apply `'use cache'`, `cacheTag('projects')`, `cacheLife('hours')`.
  - Provide derived arrays (priority order etc.) to keep client simple.
- `lib/content/experiences.ts`
  - Similar approach for work timeline data.
  - Include grouping metadata for streaming skeletons.
- `lib/content/skills.ts`
  - Consolidate skill sections used by home and lite pages.
- `lib/content/hero.ts`
  - Provide hero timings, video config, nav copy; optionally compute image preloads.
- Update `app/projects/projects.data.ts` consumers to import from the new providers and delete legacy duplicates.

### Page Composition

#### Home (`app/page.tsx`)

- Mark file with `'use cache'`.
- Create a cached `HeroShell` that composes:
  - Static gradient layers.
  - Cached hero metadata from `getHeroConfig`.
  - `<Suspense fallback={<HeroFallback />}>` around new `HeroMorphIsland` client component.
- Move `HeroMorph.client.tsx` to `HeroMorphIsland.client.tsx`; accept props for config, videos, and initial state.
- Ensure `HeroFallback` is lightweight (e.g., skeleton gradient) and serialized with the page.

#### Projects (`app/projects/page.tsx`)

- Mark page with `'use cache'`.
- Fetch `const projects = await getProjects()` once.
- Render project cards server-side; pass data + filter options into `ProjectsFilterIsland.client.tsx`.
- Provide fallback `<ProjectsGridSkeleton />` for Suspense.
- Remove direct `React.Suspense` usage from client component; rely on server to drive streaming.

#### Work (`app/work/page.tsx`)

- Mark page with `'use cache'`.
- Pre-render timeline structure using cached data.
- Wrap motion-intensive `WorkTimelineIsland.client.tsx` in Suspense and feed it `experiences`.
- Add vertical spine skeleton while island loads.

#### Lite (`app/lite/page.tsx`)

- Mark page with `'use cache'`.
- Reuse `getSkillSections()` and other loaders to pre-render static lists.
- Only keep navigation row interactive; move to `NavRowIsland.client.tsx`.

### Component Refactors

- `components/ui/GlassHeaderBubble.tsx` and `NavPill.tsx`
  - Default export becomes server component generating markup and tooltips.
  - Introduce `GlassHeaderBubble.client.tsx` or hook to opt into pointer-follow animation; controlled via prop.
- `components/ui/AnimatedText.tsx`, `CursorGlow`, `ClientAppShell`
  - Remain client islands but accept server-provided props to avoid dynamic imports inside them.
- Replace direct `dynamic(() => import(...), { ssr: false })` with explicit Suspense islands to align with PPR.

### Suspense & Fallbacks

- Define fallbacks in `components/fallbacks/`:
  - `HeroFallback.tsx`
  - `ProjectsGridSkeleton.tsx`
  - `WorkTimelineSkeleton.tsx`
  - `NavRowSkeleton.tsx`
- Ensure fallbacks avoid browser-only APIs and render minimal skeleton UI.

### Asset Prefetching

- Use `preload()` and `preconnect` where appropriate:
  - In `HeroShell`, preload `/matrix-horizontal.mp4` via `headers()` + `<link rel="preload">`.
  - Provide `<Image priority>` only for above-the-fold assets once data is ready.

### Revalidation & Invalidations

- Projects and experiences: `cacheTag` to enable manual invalidation (future webhook).
- Skills & hero config: `cacheLife('days')` since they change infrequently.
- Provide `revalidateTag` utilities in a new `lib/revalidate.ts` for future API routes or actions.

### Observability & Verification

- Extend `useWebVitalsLogger` (client) to log hydration spans post-PPR.
- Capture Lighthouse reports before and after changes in `reports/ppr-baseline.json` and `reports/ppr-refactor.json`.
- Update README with a “PPR & Cache Components” section summarizing obligations.

## Data Flow Diagram (Textual)

```
Request → Next.js Router
       → Cached Layout ('use cache')
         → Suspense boundary: ClientAppShell (hydrated later)
         → Cached page component ('use cache')
            ↳ await getProjects()/getExperiences()/...
            ↳ Render static lists + placeholders
            ↳ Suspense boundary → Island.client.tsx (receives serialized props)
Hydration → Browser executes island scripts
         → Reuses cached data; no refetch → interactive behavior active
```

## Risk Analysis & Mitigations

- **Hydration mismatches**: Ensure client islands receive identical props; add snapshot tests or development warnings.
- **Over-caching dynamic data**: Use `'use cache: private'` for future user-specific helpers (sessions, cookies) and document usage.
- **Performance regressions from Suspense gaps**: Design fallbacks that match final layout dimensions to avoid layout shifts.
- **Complex deployment rollout**: Feature flag PPR (`PPR_ENABLED`) so production can fallback to current behavior if needed.
- **Team onboarding**: Ship docs and lint suggestions (e.g., custom ESLint rule or convention doc) to enforce server/client boundaries.

## Open Questions

- Should we introduce runtime validation (e.g., `zod` schemas) when reading static datasets?
- Do we want to log PPR streaming metrics to Vercel Analytics for ongoing monitoring?
- Is there appetite for optional Playwright smoke tests to verify streaming fallbacks?
