# Contributing Guide: Home Hero (HeroMorph) and CSS Variable System

This guide explains how to safely adjust the Home page hero choreography without breaking accessibility, performance, or maintainability. It covers the CFG constants object, the CSS variable contract, and tips for testing changes.

Files to know
- components/home/HeroMorph.client.tsx: Client component that implements the intro, scroll-driven visuals, video, cyan overlay, fixed nav, and bottom brand/CTA.
- components/ui/AnimatedText.tsx: Accessible per-letter text animation component.
- app/globals.css: Global Tailwind setup and keyframes (e.g., .nav-bouncy).
- app/page.tsx: Server wrapper that renders <main> and composes <HeroMorph/>.

CFG constants: what to change
At the top of HeroMorph.client.tsx there is a CFG object that centralizes all magic numbers.

const CFG = {
  timings: {        // Intro timing
    introStartDelay,
    introExpansionDuration,
    reveal: { name, title, desc },
    graceAfterExpandMs,
  },
  scroll: {         // Scroll thresholds and normalization
    max, shutterStartPx, shutterLengthPx,
    cyanStartT, uiRevealStartT,
  },
  closeMaxY, closeMaxX,   // Clip-path closing extents
  overlayUpDampen,        // Dampening factor for bottom brand fade
  video: { playbackRate, scale, preload },
  nav: { centerTop, buttonSize, leftOffsetsPx, rightOffsetsPx },
} as const;

Guidelines
- Prefer changing values in CFG rather than editing scattered inline styles.
- Keep choreography identical unless explicitly changing the design. Small tweaks (e.g., adjusting intro timings) go here.
- Don’t rename CFG keys unless you update their references throughout the component.

CSS variable contract: how it works
The scroll loop updates the following CSS custom properties on the container. Styles read these variables to animate efficiently without React re-renders.
- --scroll-y: window.scrollY in px
- --vh: viewport height in px
- --p: normalized scroll progress (0..1)
- --sh: shutter progress (0..1)
- --gate: motion gate (0..1)
- --overlay-up: normalized upward translation factor for the bottom brand/CTA row
- --cyan: opacity of the cyan overlay (0..1)
- --ui: UI/nav reveal progress (0..1)
- --closeMaxX / --closeMaxY: inset distances driving the clipPath closing/opening

Do
- Keep variable names stable; they are referenced across multiple style blocks.
- Use CSS variables in styles for any value that varies with scroll.

Don’t
- Move expensive computations into React state or effects that re-render on scroll.
- Replace CSS variables with inline computed pixels unless unavoidable.

Accessibility & semantics
- AnimatedText provides a single sr-only string and hides per-letter spans. When adding new animated headings, reuse AnimatedText.
- The four fixed-position Links live in a <nav aria-label="Primary"> with <ul>/<li>. When adding/removing buttons, keep the list structure and aria-hidden on purely decorative SVGs.
- Keep focus-visible rings on interactive elements; don’t remove keyboard focus styles.

Performance notes
- The video uses preload="metadata" and is played after the intro completes, reducing early network contention.
- The scroll pipeline uses requestAnimationFrame to update CSS variables. Avoid adding setState calls on scroll.
- Keep will-change limited to properties we actually animate.

Testing changes
- Local dev: npm run dev, then open the console. A dev-only Web Vitals logger prints LCP, INP, and CLS.
- Verify visually: Ensure the intro pill → morph → cyan overlay → nav reveal sequence is unchanged (unless you intended changes).
- Keyboard: Tab through the nav buttons; a visible focus ring should appear on each.
- Reduced motion: Enable OS-level “Reduce Motion” and confirm subdued animations.
- iOS Safari: Check muted inline video playback and smooth transforms.

When to consider CSS/module changes
- Keyframes like nav bounce are in app/globals.css to keep Tailwind-first styling with minimal custom CSS.
- If you need additional keyframes, prefer adding them to globals and triggering with utility classes.

Questions or proposals
- If a change seems to require altering the choreography or adding a new dependency, propose it in a PR description first.
- For larger refactors, include before/after Lighthouse/Web Vitals numbers and a short video capture.

