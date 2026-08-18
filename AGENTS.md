# Repository Guidelines

## Project Structure & Module Organization

- `app/` holds all Next.js App Router routes; `layout.tsx`, `page.tsx`, and `global-error.tsx` define the shell. `(home)/` contains homepage-only components, hooks, and animations; `projects/` and `work/` own their route layouts/components. Shared styling lives in `app/globals.css`.
- `components/` provides shared layout pieces (e.g., `layout/ClientAppShell.tsx`, `layout/AmbientBackground.tsx`), navigation, primitives (Badge, GlassButton, Icon), and style helpers.
- `hooks/` exposes cross-page hooks (e.g., `usePrefersReducedMotion`, `useScrollReset`); page-specific hooks stay alongside their route folders.
- `lib/` holds shared utilities (`class-names.ts`, `scroll-lock.ts`, `seo.ts`, `structured-data.ts`); `public/` houses static assets/fonts; root configs (`next.config.mjs`, lint/format configs) drive build tooling.

## Build, Test, and Development Commands

- Install: `pnpm install` (see `engines.node` and `packageManager` in `package.json`; `.nvmrc` pins the Node version). Use `pnpm dev` for local development; `pnpm start` runs the built app.
- Ship: `pnpm build` (webpack enabled). Set `ANALYZE=true pnpm build` to view bundle analysis.
- Quality: `pnpm type-check` (TS strict), `pnpm check` (eslint + prettier + `scripts/check-asset-budgets.mjs`, which fails on non-WebP/AVIF or oversized images), `pnpm fix` (autofix lint + format), `pnpm format` (format JS/TS + CSS/MD).
- Performance: `pnpm lh:all` after a running dev server generates Lighthouse reports under `.lighthouse/`, evaluated against `lighthouse-budgets.json`. Lighthouse reports budget overages but does not exit non-zero, so this is informational rather than a gate.

## Coding Style & Naming Conventions

- TypeScript is strict with `@/` path alias; prefer named exports for shared utilities/components, but keep Next.js `page.tsx`/`layout.tsx` as defaults.
- Components in PascalCase, hooks in camelCase starting with `use*`; one component per file. Mark client-only files with `"use client"` at the top.
- Tailwind CSS v4 drives styling via `app/globals.css`; keep class naming semantic to the UI role.
- Linting uses the Next.js flat config; `no-console` except `console.error`. Prettier formats CSS/Markdown at 100-char width.

## TypeScript

- Only create an abstraction if it's actually needed
- Prefer clear function/variable names over inline comments
- Avoid helper functions when a simple inline expression would suffice
- Use `knip` to remove unused code if making large changes
- The `gh` CLI is installed, use it
- Don't use emojis

## React

- Avoid massive JSX blocks and compose smaller components
- Colocate code that changes together
- Avoid `useEffect` unless absolutely needed

## Tailwind

- Mostly use built-in values, occasionally allow dynamic values, rarely globals
- Always use v4 + global CSS file format + shadcn/ui

## Next

- Prefer fetching data in RSC (page can still be static)
- Use next/font + next/script when applicable
- next/image above the fold should have `sync` / `eager` / use `priority` sparingly
- Be mindful of serialized prop size for RSC -> child components

## TypeScript

- Don't unnecessarily add `try`/`catch`
- Don't cast to `any`

## Testing & Quality Checks

- Unit/component tests run with Vitest (`pnpm test`, `pnpm test:watch`); co-locate `*.test.ts(x)` with the module. End-to-end tests live in `e2e/` and run with Playwright (`pnpm test:e2e`, requires `pnpm exec playwright install chromium` once).
- Run `pnpm test`, `pnpm type-check`, and `pnpm check` before every PR.
- For UI changes, manually smoke-test `/`, `/projects`, and `/work` on desktop and mobile widths; rerun `pnpm lh:all` when performance-sensitive assets change.

## Commit & Pull Request Guidelines

- Follow the existing conventional commit style (`refactor:`, `docs:`, `chore:`, etc.) with imperative, concise subjects.
- PRs should include: summary of changes, linked issue (if any), before/after screenshots for visible UI, and notes on checks run (type-check, lint, Lighthouse). Call out new env vars or migrations.

## Environment & Configuration

- Add secrets to `.env.local` (ignored). There is no env-validation layer; read `process.env` at the point of use. Keep Vercel/Next defaults unless a change is documented in `next.config.mjs`.
