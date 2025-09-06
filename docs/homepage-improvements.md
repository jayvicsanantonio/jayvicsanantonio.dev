# Home Page Improvements and Optimizations

Last updated: 2025-09-02

This document summarizes the architectural, accessibility, performance, and maintainability improvements applied to the Home page implementation while preserving the exact visual/animation choreography.

Scope
- Codebase: jayvicsanantonio.dev (Next.js 15, React 19, Tailwind CSS 4, TypeScript 5)
- Primary files touched:
  - app/page.tsx
  - components/home/HeroMorph.client.tsx (new)
  - components/ui/AnimatedText.tsx (new)
  - app/globals.css

Goals
- Preserve existing hero choreography and visuals
- Improve readability and maintainability for junior engineers
- Strengthen accessibility without changing the look and feel
- Reduce early-load pressure and keep scroll animation efficient
- Keep Tailwind-first styling; only use inline style for CSS-variable-driven dynamics

Summary of changes

1) Architecture and componentization
- Split page into server wrapper + client hero
  - app/page.tsx now only renders semantic main + sr-only h1 and composes the client hero component.
  - New components/home/HeroMorph.client.tsx holds all intro/scroll/video/nav logic.
- Extracted AnimatedText into a reusable, accessible UI component
  - New components/ui/AnimatedText.tsx preserves per-letter animation and timing but exposes a single screen-reader-friendly string, hiding the letter spans from assistive tech.

Benefits
- Smaller hydration surface at the root level
- Clear responsibilities and simpler mental model for future edits
- Reusability of AnimatedText with consistent a11y behavior

2) Accessibility and semantics
- Landmarks and headings
  - app/page.tsx wraps content in main and provides a visually hidden h1.
- Navigation semantics and focus styles
  - Fixed-position links are now wrapped in a semantic nav with a ul/li structure.
  - SVG icons are aria-hidden, while link labels remain accessible.
  - Added visible focus rings for keyboard navigation.
- Animated text a11y
  - Screen readers receive one coherent string rather than per-letter fragments.

Benefits
- Better screen reader experience and logical tab order
- Meets baseline WCAG expectations for landmarks and focus visibility

3) Performance and runtime behavior
- Scroll pipeline remains efficient
  - requestAnimationFrame-gated scroll handler updates CSS variables on a root ref (avoids React re-renders on scroll).
- Video load/play strategy hardened (no visual change)
  - Switched to preload="metadata" and removed the explicit video.load().
  - Playback is attempted once the intro finishes (muted + playsInline still satisfy autoplay policies).

Benefits
- Reduces early network contention without changing user-visible behavior
- Keeps visual smoothness and avoids layout thrash during scroll

4) Maintainability, DX, and constants
- Centralized configuration values
  - Introduced a CFG constants object in HeroMorph.client.tsx for all magic numbers (timings, thresholds, geometry, nav dimensions/offsets, video tuning, etc.).
- Documented CSS variable contract
  - Added a doc block at the top of HeroMorph describing the CSS variables set by the scroll loop and how they’re used.
- Moved bounce keyframes into global CSS
  - nav-bouncy, nav-bounce, and nav-bounce-tap moved from an inline <style jsx global> into app/globals.css.
- Cleanup and small correctness fixes
  - Removed unused state/refs (scrollY, showSubtitle, prevOverflowRef).
  - Removed a duplicate setProperty('--cyan', ...) call.
  - Ensured high-contrast focus rings.

Benefits
- Easier for juniors to tweak timings and thresholds in one place
- Styling is standardized; reduces inline CSS noise
- Code is simpler, with fewer dead branches

Implementation details by file

- app/page.tsx (server component)
  - Renders <main> and an sr-only <h1>.
  - Composes <HeroMorph/>.

- components/home/HeroMorph.client.tsx (client component)
  - Holds: intro sequencing, scroll rAF loop, video element, cyan overlay, silhouette image, fixed nav buttons, and bottom brand/CTA.
  - Uses CFG for all magic numbers and documents CSS variables.
  - Video: preload="metadata"; play() attempted after the intro grace period.
  - Nav: <nav><ul><li> links with aria-hidden SVGs and focus-visible rings.

- components/ui/AnimatedText.tsx (client component)
  - Exposes a full sr-only string for AT; renders per-letter spans aria-hidden.
  - Preserves the previous per-letter animation, timing, and onComplete logic.

- app/globals.css
  - Added nav-bouncy hover/active animations and keyframes.
  - Kept Tailwind-first styling elsewhere.

CSS variable contract (as used in HeroMorph)
- --scroll-y: current window.scrollY in px
- --vh: viewport height in px
- --p: normalized scroll progress (0..1) based on CFG.scroll.max
- --sh: shutter progress (0..1) based on CFG.scroll.shutterStartPx + length
- --gate: motion gate (0..1) used to gate some transforms
- --overlay-up: normalized upward translation factor for overlay text
- --cyan: opacity of cyan overlay (0..1)
- --ui: reveal progress of UI/nav (0..1)
- --closeMaxX / --closeMaxY: inset distances driving the clipPath closing/opening

Verification checklist
- Visuals: Intro pill → expansion → morph into hero → cyan overlay → nav reveal behave exactly as before.
- Keyboard: Tab through the four nav buttons and see a visible focus ring.
- Screen reader: Hero text reads once; icons are ignored; headings/landmarks make sense.
- Performance: No React renders on scroll; fewer early network demands from the video.
- Mobile/iOS Safari: Muted/inline video plays after intro; transforms are smooth; viewport units behave normally.

Next suggestions (optional)
- Consider preload="none" for even more conservative video loading, if you want to push network further out.
- Extract constants into a shared module if other routes will reuse the same patterns.
- Add a small web-vitals console logger in development for LCP/INP/CLS.
- Write a short contributor guide summarizing the CFG fields and CSS variable roles.

