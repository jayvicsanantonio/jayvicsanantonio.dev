# jayvicsanantonio.dev: Performance-First Personal Portfolio Migration

**Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion • **Repo:** jayvicsanantonio.dev

> **Executive summary:** Migrated personal portfolio to Next.js 15 with App Router, implementing performance-first architecture with CSS variable-driven animations, comprehensive Lighthouse CI, and Safari compatibility fixes. Achieved sub-1s LCP on desktop through server-first components, dynamic imports, and GPU-optimized scroll effects while maintaining complex hero animations.

### Context

Personal portfolio website serving as a showcase for software engineering work and projects. Critical for professional presence with focus on smooth animations and cross-browser compatibility, particularly Safari support for mobile users.

### Problem

Previous implementation suffered from scroll-induced React re-renders causing layout thrashing, heavy filter chains during animations, and missing Safari compatibility. No automated performance monitoring or CI pipeline for quality gates.

### Constraints

- Solo development effort with limited time for iterative testing
- Complex hero animation requirements (morphing container, video overlays, scroll-driven effects)
- Safari's limited support for modern CSS features requiring progressive enhancement
- Bundle size concerns with multiple animation libraries

### Options Considered

1. **Client-side React state for animations** - Rejected due to performance impact from re-renders
2. **CSS-in-JS runtime styling** - Rejected due to runtime overhead and complexity
3. **CSS variables with RAF-driven updates** - **Chosen** for performance and maintainability
4. **Framer Motion for all animations** - Partially adopted for intro sequences only

### Implementation Highlights

- **Server-first architecture**: Leveraged Next.js 15 App Router with explicit client boundaries marked by `.client.tsx` suffix, keeping animations isolated to specific components
- **CSS variable performance optimization**: Replaced React state updates with `requestAnimationFrame`-driven CSS variable writes to avoid re-render cycles during scroll (HeroMorph.client.tsx:139-218)
- **Dynamic imports for non-critical hero components**: Implemented code splitting to reduce initial bundle size while maintaining visual complexity (commit 4bfc0c7)
- **Safari progressive enhancement**: Added container query fallbacks, backdrop-filter alternatives, and cross-browser animation compatibility (PR #208, #209)
- **Lighthouse CI integration**: Added automated performance monitoring with GitHub Actions testing 3 key routes on every PR (.github/workflows/lighthouse-ci.yml)
- **Transform-only animations**: Replaced layout-affecting properties (width/height) with GPU-accelerated transforms for 60fps performance

### Validation

- **TypeScript strict mode** with enhanced safety flags including `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
- **Biome + Prettier dual linting** for code quality and consistent formatting across JS/TS and CSS/Markdown
- **Lighthouse CI automation** running on all PRs with desktop preset testing home, projects, and work pages
- **Local performance measurement** via pnpm scripts for developer workflow (docs/lighthouse.md)

### Impact (Numbers First)

| Metric                   | Desktop | Mobile | Source                                 |
| ------------------------ | ------: | -----: | -------------------------------------- |
| First Contentful Paint   |    0.3s |   1.2s | docs/artifacts/lighthouse-home-\*.json |
| Largest Contentful Paint |    1.0s |   6.6s | docs/artifacts/lighthouse-home-\*.json |
| Total Blocking Time      |    90ms |  170ms | docs/artifacts/lighthouse-home-\*.json |
| Cumulative Layout Shift  |       0 |      0 | docs/artifacts/lighthouse-home-\*.json |
| Bundle size (home route) |   246kB |    N/A | pnpm build output                      |

### Risks & Follow-ups

- **Mobile LCP performance**: 6.6s on mobile requires investigation of image loading and critical path optimization
- **HeroMorph maintainability**: 730-line monolithic component needs extraction into smaller hooks and subcomponents (documented in docs/HOMEPAGE_REVIEW.md)
- **Missing video fallback**: /matrix-horizontal.mp4 returns 404, needs graceful degradation
- **Safari feature gaps**: Ongoing monitoring needed for backdrop-filter and view transitions support

### Collaboration

Solo engineering effort with comprehensive documentation for future maintainers. Extensive inline comments and architecture decision records in docs/ directory.

### Artifacts

- [Lighthouse CI configuration](.lighthouserc.json)
- [Performance optimization plan](docs/performance-hero.md)
- [Homepage implementation review](docs/HOMEPAGE_REVIEW.md)
- [Safari compatibility documentation](docs/refactor/ssr-boundaries.md)
- [Desktop Lighthouse results](docs/artifacts/lighthouse-home-desktop.json)
- [Mobile Lighthouse results](docs/artifacts/lighthouse-home-mobile.json)
- [Build bundle analysis](pnpm analyze command available)

### Appendix: Evidence Log

- Commit 4bfc0c7: Lighthouse CI implementation with dynamic imports
- Commit 5c9d963: Scroll tracking to Intersection Observer migration
- PR #208/#209: Safari progressive enhancement work
- Commit c189d0e: Homepage implementation review and P0 fixes
- docs/HOMEPAGE_REVIEW.md: Comprehensive architecture analysis dated 2025-09-04
- .github/workflows/lighthouse-ci.yml: Automated performance gates
- package.json scripts: Local development performance tooling
