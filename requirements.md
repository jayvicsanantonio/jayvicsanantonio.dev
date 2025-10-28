# Partial Pre-rendering & Cache Components Requirements

## Background

- The portfolio app relies heavily on Client Components (`"use client"`), eliminating most opportunities for server-side caching.
- Static datasets (projects, work history, skills) are duplicated between routes (`/`, `/projects`, `/work`, `/lite`) and rehydrated on the client, increasing bundle size and delaying first paint.
- Partial prerendering (PPR) is not enabled (`experimental.ppr` unset) and no routes export `experimental_ppr`, so the app cannot stream static shells while deferring dynamic islands.
- The team wants to adopt Next.js v16 cache components and PPR to deliver faster TTFB, smaller hydration payloads, and consistent data sourcing.

## Goals & Success Criteria

1. **Enable PPR across the app**: Configure incremental PPR globally and opt-in every route with appropriate `Suspense` boundaries and fallbacks.
2. **Adopt cache components**: Mark prerender-safe server layers with `'use cache'`, migrate static data fetches to cached helpers, and expose invalidation hooks via `cacheTag`/`cacheLife`.
3. **Refactor data delivery**: Move duplicated data constants into shared async providers in `lib/`, returning typed payloads that server components can reuse without rehydration.
4. **Minimize client-only islands**: Split interactive behavior into thin `.client.tsx` wrappers fed by cached server parents so PPR can serve HTML immediately.
5. **Maintain UX parity**: All pages (`/`, `/projects`, `/work`, `/lite`) must render identical layouts, animations, and navigation behavior post-refactor.
6. **Operational guardrails**: Provide flags and configuration guidance to gradually roll out PPR, plus documentation for contributors.

### Quantifiable Targets

- Reduce total JS shipped on initial load for `/` by ≥15% (measured via Next.js bundle analyzer).
- Improve `/` and `/projects` Lighthouse TTFB and LCP by ≥10% compared to current baseline.
- Achieve 100% pass rate on `pnpm check` and `pnpm type-check`.
- Ensure all new data providers have revalidation strategies (time-based or tag-based).

## In-Scope

- Updating `next.config.mjs`, route modules, layouts, and shared shell components to leverage PPR and cache directives.
- Creating shared cached content loaders (`lib/content/*`) for skills, projects, experiences, and hero assets.
- Introducing Suspense fallbacks, skeleton components, and streaming-compatible page structures.
- Documentation updates (`README` excerpt, new docs in `/docs` if needed) describing how to use cache components safely.
- Optional instrumentation to record timing improvements (e.g., `useWebVitalsLogger` enhancements, Lighthouse reports).

## Out of Scope / Non-Goals

- Rewriting visual design, adding new sections, or changing copy beyond what is necessary for structural refactors.
- Introducing backend data sources or APIs outside static files and public assets.
- Implementing automated E2E test suites (can be recommended but not required in this phase).
- Converting the project to use React Compiler or other experimental React 19 features beyond what PPR needs.

## Constraints & Assumptions

- Node.js ≥20 and pnpm are available; no new runtime dependencies should block deployment on Vercel.
- Network access is restricted; all new data must come from existing files or local transforms.
- The app must remain deployable without environment secrets; any dynamic data must degrade gracefully.
- Accessibility and motion preferences must be respected (e.g., reduced motion variants must continue working).
- The worktree may have user changes; tooling commands must avoid destructive operations.

## Stakeholders

- **Primary developer** (Jayvic): implements and reviews the refactor, owns long-term maintenance.
- **Future collaborators**: need documentation on when to use cache directives or client components.
- **End users / Recruiters**: benefit from faster load times and more reliable navigation.

## Acceptance Checklist

- [ ] `experimental.ppr = 'incremental'` enabled behind a configurable flag.
- [ ] Each route exports `experimental_ppr = true` and wraps dynamic sections in `<Suspense>`.
- [ ] Cached data loaders exist for projects, work timeline, and skill sections, referenced by all routes.
- [ ] Root layout and shell components use `'use cache'` (public) or `'use cache: private'` where appropriate.
- [ ] Updated docs outlining cache usage patterns and rollout steps committed alongside code.
- [ ] Bundle analyzer and Lighthouse comparisons captured under `reports/`.
- [ ] `pnpm check` and `pnpm type-check` pass on the final branch.
