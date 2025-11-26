# Repository Guidelines

## Project Structure & Module Organization

- `app/` holds all Next.js App Router routes; `layout.tsx`, `page.tsx`, and `global-error.tsx` define the shell. `(home)/` contains homepage-only components, hooks, and animations; `projects/` and `work/` own their route layouts/components. Shared styling lives in `app/globals.css`.
- `components/` provides shared layout pieces (e.g., `layout/ClientAppShell.tsx`, `layout/AmbientBackground.tsx`), navigation, primitives (AnimatedText, Badge, GlassButton), feedback (Toaster), and style helpers.
- `hooks/` exposes cross-page hooks (e.g., `usePrefersReducedMotion`, `useWebVitalsLogger`); page-specific hooks stay alongside their route folders.
- `lib/utils.ts` stores general utilities; `public/` houses static assets/fonts; root configs (`env.ts`, `next.config.mjs`, lint/format configs) drive build tooling.

## Build, Test, and Development Commands

- Install: `pnpm install` (Node 20+, pnpm 9+). Use `pnpm dev` for local development; `pnpm start` runs the built app.
- Ship: `pnpm build` (webpack enabled). Set `ANALYZE=true pnpm build` to view bundle analysis.
- Quality: `pnpm type-check` (TS strict), `pnpm check` (eslint + prettier checks), `pnpm fix` (autofix lint + format), `pnpm format` (format JS/TS + CSS/MD).
- Performance: `pnpm lh:all` after a running dev server to generate Lighthouse reports under `.lighthouse/` using `lighthouse-budgets.json`.

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

- There are currently no automated tests; run `pnpm type-check` and `pnpm check` before every PR. If adding tests, co-locate `*.test.tsx` with the module.
- For UI changes, manually smoke-test `/`, `/projects`, and `/work` on desktop and mobile widths; rerun `pnpm lh:all` when performance-sensitive assets change.

## Commit & Pull Request Guidelines

- Follow the existing conventional commit style (`refactor:`, `docs:`, `chore:`, etc.) with imperative, concise subjects.
- PRs should include: summary of changes, linked issue (if any), before/after screenshots for visible UI, and notes on checks run (type-check, lint, Lighthouse). Call out new env vars or migrations.

## Environment & Configuration

- Add secrets to `.env.local` (ignored); surface new variables through `env.ts` using `createEnv`. Keep Vercel/Next defaults unless a change is documented in `next.config.mjs` or `lighthouse-budgets.json`.
