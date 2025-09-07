# Personal Website

This is the source for my personal site built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4. It showcases projects and work experience with a focus on performance and accessibility.

## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- UI: React 19, Tailwind CSS v4
- Observability: Sentry
- Performance: Lighthouse CI
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
pnpm lint
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
      HeroMorph.client.tsx
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
    Body.tsx
    ClientAppShell.client.tsx
    AmbientBackground.tsx
    CursorGlow.tsx
  ui/                                # Reusable UI primitives
    AnimatedText.tsx
    Badge.tsx
    GlassButton.tsx
    GlassHeaderBubble.tsx
    NavPill.tsx
    Toaster.tsx

hooks/                               # Shared React hooks
  usePrefersReducedMotion.ts
  useWebVitalsLogger.ts

lib/                                 # Shared utilities
  utils.ts

public/                              # Static assets
```

Conventions (summary)

- One React component per file (enforced by ESLint)
- Client-only components must start with "use client"
- UI/library components: prefer named exports; Next.js page/layout files use default export
- Use the path alias `@/` for internal imports instead of deep relative paths when possible
- Props: export reusable prop types/interfaces alongside components

See CONTRIBUTING.md for more details.

## Environment

Create a `.env.local` with the following variables (see env.ts for schema):

- SENTRY_DSN
- NEXT_PUBLIC_SENTRY_DSN
- RESEND_API_KEY
- RESEND_FROM_EMAIL
- RESEND_TO_EMAIL

## CI

A GitHub Actions workflow runs type-checks, linting, build, and Lighthouse CI.

## Contact

Reach me at [hi@jayvicsanantonio.dev](mailto:hi@jayvicsanantonio.dev) or on [LinkedIn](https://www.linkedin.com/in/jayvicsanantonio/).
