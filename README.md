# Personal Website

This is the source for my personal site built with Next.js 16 (App Router), React 19.2, TypeScript 5.8, and Tailwind CSS v4. It showcases projects and work experience with a focus on performance and accessibility.

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript 5.8
- UI: React 19.2, Tailwind CSS v4
- Tooling: ESLint (flat config) + Prettier
- Observability: Vercel Analytics, Speed Insights
- Performance: Lighthouse (local audits)
- Deploy: Vercel

## Getting Started

Prerequisites

- Node.js 20+
- pnpm 9+

Install dependencies

```bash
pnpm install
```

Run the dev server

```bash
pnpm dev
```

Type-check and lint

```bash
pnpm type-check
pnpm check
```

Build

```bash
pnpm build
```

Optional: Bundle analyze

```bash
ANALYZE=true pnpm build
```

## Project Structure (App Router)

```plaintext
app/                                 # Route segments (server-first by default)
  globals.css                        # Tailwind v4 entry
  layout.tsx                         # Root layout
  page.tsx                           # Home page (mounts co-located client hero)
  (home)/                            # Group segment (not in URL)
    _components/                     # Home-only components
      HeroSection.tsx (server)
      HeroMorphIsland.client.tsx
      NavButton.tsx
      hero/                          # Home hero sub-islands
        config.ts
        InitialPillOverlay.client.tsx
        MobileNavRow.client.tsx
        MorphingVideo.client.tsx
        PrimaryNavOverlay.client.tsx
        ProfileImage.client.tsx
        FooterBrandCTA.client.tsx
    _hooks/                          # Home-only hooks
      useIntroSequence.ts
      useScrollCssVariables.ts
  projects/
    layout.tsx
    page.tsx
    projects.data.ts
    _components/
      AnimatedHeader.client.tsx
      SkillsAndCases.tsx
  work/
    layout.tsx
    page.tsx
    _components/
      WorkTimeline.client.tsx

components/                          # Shared components
  shell/                             # App shell (shared across routes)
    AmbientBackground.tsx
    Body.tsx
    ClientAppShell.client.tsx
    CursorGlow.tsx
  ui/                                # Reusable UI primitives
    AnimatedText.tsx
    Badge.tsx
    GlassButton.tsx
    GlassHeaderBubble.tsx
    GlassHeaderBubble.client.tsx
    NavPill.tsx
    NavPill.client.tsx
    Toaster.tsx

hooks/                               # Shared React hooks
  usePrefersReducedMotion.ts
  useWebVitalsLogger.ts

lib/                                 # Shared utilities and data loaders
  config/ppr.ts
  content/
    hero.ts
    projects.ts
    experiences.ts
    skills.ts
    skills-data.ts
  utils.ts

public/                              # Static assets
```

Conventions (summary)

- One React component per file (ESLint enforces JS/TS rules; Prettier formats CSS/Markdown)
- Client-only components must start with "use client"
- Server components that should prerender must opt in with `'use cache'` (and `'use cache: private'` when data is user-specific); Suspense fallbacks belong in `components/fallbacks/`
- Favor splitting interactive islands: export a server/default component and colocated `.client.tsx` wrapper for motion or browser APIs
- UI/library components: prefer named exports; Next.js page/layout files use default export
- Use the path alias `@/` for internal imports instead of deep relative paths when possible
- Props: export reusable prop types/interfaces alongside components

See CONTRIBUTING.md for more details.

## Environment

Create a `.env.local` with any environment variables required by features you enable.

## CI

A GitHub Actions workflow runs type-checks, linting, and build.

## Contact

Reach me at [hi@jayvicsanantonio.dev](mailto:hi@jayvicsanantonio.dev) or on [LinkedIn](https://www.linkedin.com/in/jayvicsanantonio/).
