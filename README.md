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
  page.tsx                           # Home page (mounts hero + sections)
  (home)/                            # Group segment (not in URL)
    components/                      # Home-only components
      HomePageContent.tsx
      Hero/Navigation.tsx
      ...                            # (Hero/About/Skills subsections)
    context/
      HeroContext.tsx
    hooks/
      use-hero-animations.ts
      use-hero-intro-animation.ts
      use-hero-scroll-animation.ts
    animations/                      # Shared animation definitions
      ...
    config.ts
    types.ts
  projects/
    layout.tsx
    page.tsx
    projects.data.ts
    _components/
      AnimatedHeader.tsx
      SkillsAndCases.tsx
  work/
    layout.tsx
    page.tsx
    _components/
      WorkPageContent.tsx
      WorkTimeline.tsx

components/                          # Shared components
  layout/                            # App shell (shared across routes)
    Body.tsx
    ClientAppShell.tsx
    AmbientBackground.tsx
    ScrollProvider.tsx
    ScrollProgressBar.tsx
  navigation/                        # Navigation elements
    GlassHeaderBubble.tsx
    NavPill.tsx
  primitives/                        # Reusable UI primitives
    AnimatedText.tsx
    Badge.tsx
    GlassButton.tsx
  feedback/
    Toaster.tsx
  styles/                            # Shared style helpers
    card-styles.ts

hooks/                               # Shared React hooks
  usePrefersReducedMotion.ts
  useWebVitalsLogger.ts

lib/                                 # Shared utilities
  utils.ts

public/                              # Static assets
```

Conventions (summary)

- One React component per file (ESLint enforces JS/TS rules; Prettier formats CSS/Markdown)
- Client-only components must start with "use client"
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
