# Homepage Implementation Review (Next.js / React)

Date: 2025-09-04

Scope: app/page.tsx, components/home/HeroMorph.client.tsx, components/ui/AnimatedText.tsx, components/ui/GlassButton.tsx, app/layout.tsx, components/pages/Body.tsx, components/pages/AmbientBackground.tsx, components/pages/CursorGlow.tsx, hooks/SScrollToTop.ts, hooks/useWebVitalsLogger.ts, app/globals.css, package.json, next.config.mjs

Executive summary
- Strong foundation: server/client boundaries are sensible, performance-critical scroll work is done via CSS variables to avoid React re-renders, reduced motion is respected, fonts and metadata are set up correctly.
- Biggest risk is maintainability of a single, very large client component (HeroMorph ~730 lines) with duplicated UI patterns and heavy inline style objects. It’s performant but hard to evolve.
- A few quick wins address immediate quality and efficiency: remove unused imports in Body.tsx, add a graceful fallback for the missing /matrix-horizontal.mp4, and gate CursorGlow’s RAF loop by input modality and reduced motion. Also deduplicate a duplicated base CSS block.

Files reviewed (highlights)
- app/page.tsx: Server component delegating to client hero; includes sr-only h1 for a11y.
- components/home/HeroMorph.client.tsx: Complex hero with intro sequencing, scroll-driven CSS vars, and morphing overlay. Well-commented and performant, but monolithic and duplicative in places.
- components/ui/AnimatedText.tsx, components/ui/GlassButton.tsx: Clean, focused, reusable.
- app/layout.tsx, components/pages/Body.tsx: Clean layout. Body imports Header/Footer but doesn’t render either (unnecessary bundle pressure).
- components/pages/CursorGlow.tsx: Global RAF loop for cursor glow, always-on.
- app/globals.css: Functional, but contains a repeated @layer base block.

Maintainability
- HeroMorph is monolithic (~730 lines) with repeated patterns (four near-identical nav button blocks) and many inline style objects encoding complex transitions and clip-path logic. This increases change risk and hampers readability.
- CFG constants are a good centralization; consider splitting larger sections (timings, scroll, nav) or moving into a small config module.
- Body.tsx imports Header/Footer but does not use them; this introduces unnecessary coupling and bundle overhead.

Performance
- Positive: Scroll computations update CSS variables under rAF with DOM writes only—no React state updates—reducing layout thrash and improving smoothness.
- Reduced motion handled correctly via matchMedia, including change listener.
- Development-only web-vitals logging.
- Issues:
  - /matrix-horizontal.mp4 is missing, causing a 404 attempt. Video play is already try/catch guarded, but we should avoid the broken fetch and provide a graceful fallback.
  - CursorGlow uses a continuous global RAF loop regardless of modality; wasteful on touch-only devices or when reduced motion is preferred.
  - Unused imports in Body.tsx can unnecessarily pull extra code (e.g., framer-motion through Header) into the layout bundle.

Readability
- HeroMorph has many inline style objects with complex expressions. While sometimes necessary for dynamic CSS var-driven styles, extracting common fragments or moving repeated blocks into subcomponents would improve scanability.
- Comments are high quality and helpful.
- Tailwind usage is consistent; consider extracting reusable class patterns for repeated visual motifs.

Architecture
- Server/client boundaries are good: page.tsx is server, HeroMorph is client.
- Cross-cutting concerns: CursorGlow runs globally; gating by reduced motion and pointer modality aligns better with accessibility and avoids unnecessary work.
- Navigation buttons as links (not buttons) with ARIA labels is correct for routing.

Prioritized recommendations
- P0 (must-fix)
  1) Add a graceful fallback for the missing hero video: check availability, add a poster, and conditionally render a fallback when unavailable.
  2) Remove unused Header/Footer imports from Body.tsx to avoid unnecessary bundling.

- P1 (high-value)
  3) Gate CursorGlow by pointer: fine and prefers-reduced-motion; lazily initialize RAF on first mousemove.
  4) Begin extracting HeroMorph into subcomponents and hooks: a) NavButton, b) useIntroSequence, c) useScrollCssVariables, d) useReducedMotionPreference (you already partly have this), e) useVideoAutoPlay.

- P2 (nice-to-have)
  5) Deduplicate repeated @layer base block in app/globals.css.
  6) Consider inlining a few icons or switching to smaller icon sources if bundle size becomes a concern.

Selected code pointers
- app/page.tsx: lines 5–8 render HeroMorph and sr-only heading.
- components/home/HeroMorph.client.tsx: ~lines 139–218 (scroll CSS var writer); 341–356 (<video> with source); 456–676 (four near-identical nav buttons).
- components/pages/Body.tsx: lines 6–7 import Header and Footer but do not render.
- components/pages/CursorGlow.tsx: always-on RAF loop in effect; starts at loop definition.
- app/globals.css: duplicate @layer base block around lines 325–336.

Next steps that were applied
- Implemented P0 fixes and two easy P1/P2 improvements:
  - Graceful video fallback and poster in HeroMorph.
  - Removed unused imports in Body.tsx.
  - Gated CursorGlow’s RAF by pointer modality and reduced motion, and lazy initialization.
  - Deduplicated the base CSS block in globals.css.

Refactor suggestions (for follow-up work)
- Extract NavButton component to remove duplication (props: href, label, icon, side, offsetPx, size, centerTop).
- Extract useScrollCssVariables(rootRef, CFG) to encapsulate scroll/resize listeners and CSS var updates.
- Extract useIntroSequence(CFG) to own intro timers and flags, reducing complexity in the component body.
- Keep CFG central but consider splitting sections or moving to a small config module for readability.
