# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `pnpm dev` - Start development server on localhost:3000
- `pnpm build` - Build production version (runs prebuild checks first)
- `pnpm start` - Start production server

### Quality Assurance

- `pnpm check` - Run all checks (code + content)
- `pnpm check:code` - Biome linting and formatting check
- `pnpm check:content` - Prettier check for CSS/Markdown
- `pnpm type-check` - TypeScript compilation check
- `pnpm fix` - Auto-fix code and content formatting issues
- `pnpm format` - Format all code and content

### Analysis and Performance

- `pnpm analyze` - Build with bundle analyzer (sets ANALYZE=true)
- `pnpm lh:all` - Run Lighthouse on all main pages (requires dev server running)

## Tech Stack and Architecture

This is a Next.js 15 personal website using App Router with the following key technologies:

- **Framework**: Next.js 15 (App Router, server-first)
- **Language**: TypeScript (strict mode with enhanced type safety)
- **Styling**: Tailwind CSS v4
- **UI**: React 19 with Framer Motion for animations
- **Observability**: Vercel Analytics, Speed Insights
- **Quality**: Biome (linting/formatting), Prettier (CSS/Markdown)

### Project Structure Philosophy

The codebase follows App Router conventions with clear separation between server and client components:

- **`app/`** - Route segments (server-first by default)
  - Route groups like `(home)/` organize related functionality without affecting URLs
  - Co-located `_components/` directories contain route-specific components
  - Client components are explicitly marked with `.client.tsx` suffix

- **`components/`** - Shared, reusable components
  - `shell/` - App shell components used across routes
  - `ui/` - Primitive UI components

- **Path alias**: Use `@/` for internal imports instead of relative paths

### Client/Server Architecture

- **Server Components**: Default in `app/` directory, used for static content and SEO
- **Client Components**: Marked with `"use client"` and `.client.tsx` suffix, used for interactivity
- **Hydration Islands**: Complex interactive sections (like home hero) are broken into focused client components

### Key Development Patterns

- One React component per file
- Named exports for reusable components, default exports for Next.js pages/layouts
- Export prop types/interfaces alongside components for reuse
- Client boundaries are explicit and minimal
- Server-first approach with strategic client component usage

## Environment Setup

Environment variables: none required by default. Create `.env.local` as needed for features you enable.

## Code Quality and CI

The project enforces strict quality standards:

- TypeScript strict mode with additional safety flags
- Biome for JS/TS/JSON linting and formatting (single quotes, 100 char line width)
- Prettier for CSS and Markdown formatting
- All changes must pass type-checking, linting, and building
- GitHub Actions workflow runs full quality gates on PRs

## Performance Monitoring

- Bundle analysis available with `ANALYZE=true pnpm build`
- Web Vitals tracking integrated
- Web Vitals tracking integrated
