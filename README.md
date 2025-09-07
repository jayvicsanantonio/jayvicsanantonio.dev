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
app/                     # Route segments (server-first by default)
  globals.css            # Tailwind v4 entry
  (root pages)/
components/              # Reusable components (UI, pages, home, projects, etc.)
hooks/                   # Shared React hooks
lib/                     # Shared utilities
public/                  # Static assets
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
