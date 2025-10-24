# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router pages, layouts, and route handlers.
- `components/` and `hooks/`: Reusable UI pieces and client-side behaviors; co-locate stories or docs under `docs/` when more context is needed.
- `lib/`: Shared utilities, data loaders, and config helpers consumed across the app.
- `public/`: Static assets (fonts, images, icons); Lighthouse reports surface in `reports/` and `.lighthouse/` when generated locally.

## Build, Test & Development Commands

- `pnpm dev`: Launch the local Next.js server with hot reloading.
- `pnpm build`: Produce an optimized production bundle.
- `pnpm start`: Serve the compiled build (used for staging smoke tests).
- `pnpm check`: Run Biome linting and Prettier content checks; CI expects this clean.
- `pnpm type-check`: Execute `tsc --noEmit` to ensure TypeScript contracts hold.
- `pnpm analyze`: Build with bundle analyzer enabled for performance profiling.

## Coding Style & Naming Conventions

- TypeScript with 2-space indentation, single quotes, and trailing commas—Biome enforces these defaults.
- Prefer functional React components; name files `PascalCase.tsx` for components and `kebab-case.ts` for utilities.
- Tailwind CSS is the primary styling tool; consolidate design tokens in `app/globals.css` before introducing ad-hoc classes.
- Run `pnpm fix` for auto-fixes (`biome check --write`) and content formatting via Prettier.

## Testing Guidelines

- No unit test harness is present; rely on `pnpm check` and `pnpm type-check` prior to PRs.
- Add Playwright or Vitest suites under `tests/` if new features demand regression coverage, and document usage alongside the suite.
- Use descriptive test ids aligned with component names (e.g., `data-testid="AboutHero"`).

## Commit & Pull Request Guidelines

- Follow the repo convention of concise, present-tense commit subjects (e.g., "Adjust background gradient styles in AboutSection").
- Keep PRs focused: include a summary, screenshots/GIFs for UI shifts, linked issues, and a checklist of verifications (lint, type-check, Lighthouse when relevant).
- Request a review before merging and ensure preview deployments or local `pnpm start` checks succeed.

## Environment & Deployment Notes

- Node >= 20 and pnpm are required; bootstrap with `pnpm install`.
- Define secrets via Next.js environment variables using the schema in `env.ts`; avoid committing `.env` files.
- Monitor performance regressions with the generated Lighthouse reports in `reports/` and ship only when budgets pass.
