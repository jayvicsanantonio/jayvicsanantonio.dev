# Partial Pre-rendering (PPR) Rollout Notes

This folder tracks the spec-driven refactor to adopt Next.js cache components and Partial Pre-rendering.

- [requirements.md](../../requirements.md) – problem statement, goals, and constraints.
- [design.md](../../design.md) – architecture plan for cache components, data loaders, and streaming boundaries.
- [tasks.md](../../tasks.md) – phased execution checklist with validation gates.

## Baseline (Phase 0)

- `pnpm build` (Turbopack) passes together with linting and type-check gates.
- `pnpm analyze` surfaces the Turbopack limitation (no HTML report); Webpack fallback currently trips Tailwind/PostCSS plugin shape checks. Analyzer HTML stubs remain under `.next/analyze/`.
- Lighthouse JSON baselines saved under `reports/ppr-baseline/` for `/` (desktop & mobile) and `/projects` (desktop & mobile). Peak metrics: home desktop performance 0.99 (LCP ~0.88s) and projects desktop performance 0.98 (LCP ~1.15s).

Add future observations or deltas as the rollout progresses.
