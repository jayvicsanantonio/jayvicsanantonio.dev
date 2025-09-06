# Page Performance Optimization Plan (app/page.tsx)

This document captures the findings and concrete actions to make the hero experience buttery smooth, particularly under scroll.

## Findings

1. React re-renders on scroll

- setScrollY updates state on every scroll frame, causing component re-renders and layout/style recalculation.

2. Layout-thrashing properties animated

- width/height/border-radius are animated during intro or scroll. These cause layout and heavy paints.

3. Heavy filters and backdrop-filter

- Video uses a chain of filters each frame; profile image has multiple drop-shadows; backdrop-filter blur is expensive.

4. Inline dynamic styles

- Gradients and computed style strings change on every render; costly to recalc and repaint.

5. Unused code

- IntersectionObserver setup and some derived values (e.g., navIconsOpacity/navTextOpacity) are unused.

6. Too many animated properties at once

- Multiple properties animate simultaneously, competing for rendering resources.

## Goals

- Zero React re-renders during scroll animation.
- GPU-friendly animations (transform/opacity only) whenever possible.
- Keep heavy effects (backdrop-filter) minimal and time-bounded.
- Reduce filter/shadow complexity.
- Clean, maintainable code with CSS variables driving visuals.

## Action Plan

1. Switch to CSS variables for scroll-driven visuals

- Add a single requestAnimationFrame (rAF) scroll handler that writes to CSS variables on the root container (e.g., --p for progress, --scroll-y for pixels).
- Bind transforms/opacity in CSS using those variables (no React state).

2. Replace width/height/border-radius animations with transforms

- Use scaleX/scaleY for intro growth; keep container at a fixed logical size.
- Border radius should be constant during scroll; for the intro, transition it once if needed.

3. Trim filters and shadows

- Remove gamma() (not supported). Keep at most 1–2 shadows on the profile image. Keep video filter static.

4. Constrain backdrop-filter usage

- Keep frosted blur only during the intro; afterwards swap to a simple translucent overlay if needed.

5. Static gradients, animated opacity only

- Keep the highlight as a static CSS gradient; animate only its opacity via a variable.

6. Reduce React work and code size

- Remove unused IntersectionObserver and derived variables.
- Memoize static subtrees if necessary (likely unnecessary after CSS-var migration).

7. Progressive enhancement and accessibility

- Gate heavy effects behind prefers-reduced-motion and/or low deviceMemory.
- Ensure animations remain composited with will-change and backface-visibility.

## Metrics to Check After Refactor

- FPS during scroll (Chrome DevTools Performance).
- Layers and paints (Layers tab): morphing container, video, profile image.
- CPU time spent in scripting vs rendering.
- Memory footprint (don’t overuse will-change).

## Rollout Notes

- Keep the current visual behavior intact: frosted pill intro, slow continuous expansion, cross-fade to video, scroll morph effects.
- The refactor focuses on how we drive animations, not the look.
