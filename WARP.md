# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview

- Framework: Next.js 16 (App Router, server-first)
- Language: TypeScript 5.8 (strict)
- UI: React 19.2, Tailwind CSS v4
- Tooling: pnpm, ESLint (flat config) for code, Prettier for CSS/Markdown
- Observability: Vercel Analytics, Speed Insights

Core commands

- Install dependencies (Node >=20, pnpm >=9)

```bash path=null start=null
pnpm install
```

- Start dev server (http://localhost:3000)

```bash path=null start=null
pnpm dev
```

- Type-check and lint (fast feedback loop)

```bash path=null start=null
pnpm type-check
pnpm check         # runs ESLint + Prettier checks
```

- Auto-fix and format

```bash path=null start=null
pnpm fix           # ESLint (write) + Prettier (write)
pnpm format        # force full formatting on code + CSS/Markdown
```

- Build and run production

```bash path=null start=null
pnpm build
pnpm start
```

- Bundle analysis (opens Next.js bundle analyzer)

```bash path=null start=null
ANALYZE=true pnpm build
```

- Local page audits (requires dev server running):

```bash path=null start=null
pnpm dev
pnpm lh:all  # outputs HTML reports under .lighthouse/
```

Testing

- No test runner or tests are configured in this repository (no jest/vitest/playwright configs or test scripts found). Running a single test is not applicable.

Environment

- No required observability variables. Create `.env.local` as needed for your own features.

Architecture and structure (big picture)

- App Router layout
  - app/ is server-first by default. Special files include app/layout.tsx, app/page.tsx, global-error.tsx, not-found.tsx.
  - Route groups organize features without affecting the URL, e.g. app/(home)/ with co-located route-only components under \_components/ and hooks under \_hooks/.
  - Client components are explicit and minimal, suffixed with .client.tsx and guarded by "use client".

- App shell composition
  - app/layout.tsx loads Tailwind (app/globals.css), local fonts (next/font/local), and renders a shared <Body/> component.
  - components/shell/Body.tsx wraps all pages in components/shell/ClientAppShell.client.tsx, which:
    - adds AmbientBackground and CursorGlow
    - keys content by pathname and wraps it in React ViewTransition for smooth transitions
    - applies a container layout on non-home pages
    - wires Vercel Speed Insights and Analytics
    - logs Web Vitals to the console in development via hooks/useWebVitalsLogger.ts

- Home page “islands”
  - app/page.tsx mounts a single interactive hero: (home)/\_components/HeroMorph.client.tsx.
  - That hero lazily imports several focusable UI islands (PrimaryNavOverlay, MobileNavRow, FooterBrandCTA, AboutSection, BlackTransitionOverlay) with ssr: false to minimize initial JS and keep client boundaries tight.
  - Scroll and intro sequencing are driven by (home)/\_hooks/useScrollCssVariables.ts and useIntroSequence.ts.

- Feature routes
  - app/projects and app/work expose server-rendered pages with small, co-located client components for interactivity (e.g., AnimatedHeader.client.tsx, WorkTimeline.client.tsx).

- Shared primitives
  - components/ui/ contains reusable UI primitives (AnimatedText, Badge, GlassButton, GlassHeaderBubble, NavPill, Toaster).
  - components/shell/ contains app-wide shell elements (AmbientBackground, CursorGlow, Body, ClientAppShell.client).

- Styling and assets
  - Tailwind CSS v4 entry is app/globals.css; Tailwind configuration is implicit in v4.
  - Local fonts are defined via next/font/local in app/layout.tsx.
  - next.config.mjs allows remote images from avatars.githubusercontent.com.

- TypeScript and imports
  - Strict TS with additional safety flags (noUncheckedIndexedAccess, exactOptionalPropertyTypes, etc.).
  - Path alias @/\* maps to the repository root for shallow internal imports.

- Linting/formatting
  - ESLint (configured via `eslint.config.mjs`) is the source of truth for JS/TS linting and code formatting fixes.
  - Prettier formats CSS and Markdown only (invoked by scripts).
  - Next.js build skips inline linting; rely on `pnpm check` during CI and locally.

Performance

- Use ANALYZE=true to enable bundle analyzer during builds.

CI

- CI runs on pull_request to main:
  - Node 20, pnpm 9
  - pnpm install --frozen-lockfile
  - pnpm check and pnpm type-check
  - pnpm build

Notes from existing assistant guidance (CLAUDE.md)

- Prefer server-first components with explicit, minimal client boundaries.
- Co-locate route-only components under app/<route>/\_components and name client components with .client.tsx.
- One React component per file; prefer named exports for reusable components; Next.js pages/layouts use default exports.
- Keep imports shallow via @/ alias.
