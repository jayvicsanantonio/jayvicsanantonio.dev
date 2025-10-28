# Partial Pre-rendering Rollout Checklist

This guide captures the steps required to enable Partial Pre-rendering (PPR) and cache components across the repository. It complements the high-level spec (`requirements.md`, `design.md`, `tasks.md`).

## Configuration

- PPR is on by default when `cacheComponents` is true. Set `PPR_ENABLED=false` in `.env.local` to render routes without Suspense streaming during debugging.
- Ensure `cacheComponents: true` remains enabled; cache-aware layouts must export `'use cache'`.

## Route Opt-in Steps

For each route:

1. Mark the page module with `'use cache'` and keep the default export async so the directive is honored.
2. Lift data fetching and static chrome into server components (e.g., `HeroSection`, `ProjectsGrid`).
3. Wrap client islands in `<Suspense>` with fallbacks from `components/fallbacks/`, and gate the wrapper behind `PPR_ENABLED` when a non-streaming fallback is required.
4. Pass serialized data via props; avoid `fetch` inside client components.

## Component Patterns

- **Server wrappers**: default export is the cached component; colocate `.client.tsx` wrapper for motion/stateful concerns.
- **Fallbacks**: add skeletons to `components/fallbacks/` and reuse across routes.
- **Revalidation**: use `cacheLife` and `cacheTag` in `lib/content/*` loaders for time-based or tag-based revalidation.

## Validation

- Run `pnpm type-check` and `pnpm check` after each phase.
- Capture Lighthouse before/after metrics under `reports/ppr-baseline/` and `reports/ppr-refactor/`.
- Toggle `PPR_ENABLED` off to verify graceful fallback without Suspense streaming.

## Deployment Notes

- Keep `node >= 20` and `pnpm` up to date.
- When adding new cached loaders, document tags/lifetimes so deploys know how to revalidate.
- Share this checklist with contributors onboarding to the PPR stack.
