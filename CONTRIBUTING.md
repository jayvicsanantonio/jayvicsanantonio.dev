# Contributing Guide

This guide documents conventions and workflows to help contributors move quickly and keep the codebase consistent.

## Tooling

- Node 20+ (see .nvmrc)
- pnpm 9+
- TypeScript strict mode
- ESLint + Prettier (Tailwind class sorting)

Run locally

```bash
pnpm install
pnpm dev
```

Quality gates

```bash
pnpm type-check
pnpm lint
pnpm format:check
```

## Conventions

- One React component per file
  - Enforced by ESLint rule `react/no-multi-comp`
  - Keep files focused and small; extract subcomponents into their own files

- Export style
  - Next.js page/layout/route files: default export
  - All other components (especially reusable UI): named exports

- Client-only boundaries
  - Add `"use client"` only where hooks/DOM APIs are required
  - Prefer server components by default in `app/`

- Folder structure
  - `app/` (server-first routes)
  - `components/` for shared UI
  - Domain-specific components co-located under `app/<route>/_components`
  - `hooks/` and `lib/` for cross-cutting utilities

- Imports
  - Prefer `@/` alias over deep relative paths
  - Keep import order tidy (builtins, external, internal, parent, sibling, index)

- Props & types
  - Export prop types/interfaces next to components for reuse
  - Prefer explicit types over `any`; leverage strict TypeScript settings

## Commit & PR

- Use clear commit messages (Conventional Commits recommended: feat, fix, chore, docs)
- Include screenshots or before/after notes for UX changes
- Ensure CI (type-check + lint + build + Lighthouse) passes before merging
