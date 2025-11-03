# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains the Next.js App Router layouts, pages, and route handlers; treat each route as the canonical source for page-level data fetching.
- Reusable UI lives in `components/`, while shared client logic is in `hooks/`; document complex pieces alongside `docs/` stories when context helps onboarding.
- Cross-cutting helpers and configuration utilities belong in `lib/`; keep environment schemas centralized in `env.ts`.
- Static assets ship from `public/`; Lighthouse outputs land in `reports/` and `.lighthouse/` when locally generated.

## Build, Test & Development Commands
- `pnpm dev` — start the local Next.js server with hot reload.
- `pnpm build` — create the production bundle; pair with `pnpm start` for smoke tests.
- `pnpm check` — run ESLint plus Prettier validation; CI requires a clean result.
- `pnpm type-check` — execute `tsc --noEmit` to confirm TypeScript contracts.
- `pnpm analyze` — build with the bundle analyzer for performance profiling.

## Coding Style & Naming Conventions
- TypeScript-first stack with 2-space indentation, single quotes, and trailing commas enforced by ESLint/Prettier (`pnpm fix` applies autofixes).
- Name React components `PascalCase.tsx`; keep utilities and config helpers in `kebab-case.ts`.
- Favor functional components and Tailwind classes; add shared design tokens to `app/globals.css` before introducing ad-hoc styling.

## Testing Guidelines
- No dedicated unit-test runner today; rely on `pnpm check` and `pnpm type-check` ahead of every PR.
- When end-to-end or unit coverage is necessary, add suites under `tests/` and document execution steps near the suite.
- Use descriptive `data-testid` values that mirror component names (e.g., `data-testid="AboutHero"`).

## Commit & Pull Request Guidelines
- Keep commit subjects concise, present-tense, and scoped (e.g., `Adjust background gradient styles in AboutSection`).
- PRs should stay focused: provide a summary, link issues, attach UI screenshots or GIFs for visual changes, and confirm local `pnpm check`, `pnpm type-check`, and `pnpm start` runs.
- Request review before merging, and ensure preview deployments or local smoke tests cover new functionality.

## Environment & Deployment Notes
- Use Node 20+ with pnpm; run `pnpm install` after dependency updates.
- Manage secrets through Next.js environment variables defined by the schema in `env.ts`; never commit `.env` files.
- Monitor performance budgets with the Lighthouse reports in `reports/` before shipping.
