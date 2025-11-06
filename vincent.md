# Vincent Saïsset Portfolio – Technical Documentation

## 1. Site Architecture
- **Static shell:** One HTML document renders `<main id="scroller">` with a works list and about section. A single CSS bundle (`build/main.css`) and a single JS bundle (`build/main.min.js`) bootstrap the experience.
- **Canvas layer:** A PixiJS `Application` stretches across the viewport and acts as the primary visual surface for the intro typography, parallax transitions, artwork reveals, and cursor effects.
- **Content manifest:** Project entries exist both in the markup and in `window.works` (slug → image path, mask color, aspect metadata) so Pixi can preload and animate thumbnails.
- **Runtime stack:** Smooth Scrollbar (with a custom `VS_ScrollPlugin`) provides virtual scrolling; GSAP (TweenMax/TimelineMax/PixiPlugin) orchestrates animations across Pixi sprites and DOM nodes.
- **Global state:** Shared objects on `window` expose configuration (`window.works`, `window.imageExt`), scroll progress, cursor positions (instant + delayed), skew angle, touch flags, dispatcher, and Pixi resources for cross-module access.

## 2. Boot Sequence
- **Capability checks:** Before rendering, the script tests WebP support, loads the custom MierA font family via WebFont Loader, and preloads displacement textures (`filter-repeat`, `filter-circle`) through the Pixi loader.
- **Scrollbar initialization:** `Scrollbar.use(VS_ScrollPlugin)` registers the plugin, then `Scrollbar.init(scroller, { damping: 0.1, thumbMinSize: 20, renderByPixels: true, alwaysShowTracks: true, continuousScrolling: false })` mounts the smooth-scrolling layer.
- **Intro build:** `initAnimation` constructs a layered Pixi scene for “Vincent Saïsset / Interactive Developer,” complete with masks, faux scrollbars, and background panels. A master GSAP timeline ties scroll progress to those scene transitions.
- **Loading workflow:** `progressLoad` animates a mask over the intro while assets load; when progress hits 100%, the intro container is removed, the `introduction` body class is cleared, Smooth Scrollbar rewinds to the top, and `initWorks` executes.
- **Event wiring:** Resize is debounced, mouse/touch listeners update cursor vectors, and the dispatcher emits `vs:scroll:init`, `vs:scroll:change`, and `debug` events so subsystems can initialize or respond to state changes.

## 3. Visual Systems
- **Canvas composition:** `initAnimation` and `initWorks` build Pixi container hierarchies—background fills, text overlays, the work wrapper, and per-project sprites masked by adjustable rectangles for wipe transitions and displacement effects.
- **Displacement filters:** `initMovement` positions the `filter-circle` sprite beneath the delayed cursor and feeds it into a Pixi `DisplacementFilter`, producing the liquid highlight around the pointer.
- **Scroll-induced skew:** Scroll velocity sets `window.angle`; the render loop multiplies stored skew coefficients for headings, project listings, and canvas sprites, giving the kinetic slant on fast scrolls while GSAP caps the range.
- **Typography reveals:** Each `.work-title` gets a duplicated `.fill` span whose clip path is animated by GSAP to create the solid-over-outline reveal; the about paragraphs slide in when their scroll triggers activate.

## 4. Interaction Model
- **Scroll management:** Smooth Scrollbar emits `vs:scroll:change`; the plugin toggles `scroll-start`/`scroll-end` classes and keeps `window.progress` aligned with the master GSAP timeline’s progress.
- **Project focus:** Hovering or tapping a title calls `workIn`. It stops any stored `timelineOut`, optionally runs `workOut` on the previous project, animates text fill, fades the description, and crossfades/distorts Pixi sprites and masks based on navigation direction.
- **Cursor experience:** DOM nodes `#cursor` and `#cursor-follower` track the pointer with GSAP-driven scale, rotation, and opacity adjustments. The Pixi displacement sprite follows the delayed cursor to sync the ripple with the glow bubble.
- **Glitch labeling:** Elements carrying `data-glitch` build layered spans (`.fx1`, `.fx2`, `.fx3`). GSAP loops offset and opacity to mimic RGB separation; `data-glitch="always"` forces continuous playback.
- **Touch behavior:** Touch input toggles `window.isTouch`. The render loop automatically highlights the nearest `.work-title` to the viewport center, ensuring mobile users see artwork without hover.

## 5. Core Modules & Functions
- `initAnimation(config)`: Builds the intro layout, faux scrollbars, and the master GSAP timeline with labelled phases (`interactiveDeveloper`, `works`, `about`) mapped to scroll progress.
- `initMovement(config)`: Creates cursor displacement assets, applies filters to target Pixi nodes, and seeds skew data for later updates.
- `initLoading(config)`: Sets up intro masks, the loading displacement filter, and the scroll prompt; triggers intro playback when assets finish loading.
- `initWorks(config)`: After the intro exits, prepares project containers, masks, and sprite scaling per viewport class, then binds interactions to `.work-title` elements.
- `workIn(workTitle, direction)` / `workOut(workTitle, direction)`: GSAP timelines for morphing text clip paths, description opacity, displacement filter intensity, and sprite scale/alpha transitions according to input direction and previous state.
- `render()`: Main loop updating cursor visuals, displacement scaling, timeline progress, skew transforms, and touch-driven auto-selection; schedules itself via `requestAnimationFrame`.
- `VS_ScrollPlugin`: Smooth Scrollbar plugin that emits initialization and change events and rounds scroll offsets into body class toggles for start/end states.
- **Utility hooks:** Dispatcher listeners generate the `mailto:hi@vincentsaisset.com` link, ease `window.angle` with momentum (`TweenMax.to(window, 0.3, { angle })`), and respond to debug resize requests.

## 6. Styling & DOM Layer
- **Typography & layout:** CSS registers the MierA font family, defines the works list grid, and sets responsive font sizes for titles and descriptions.
- **Custom cursor:** `#cursor`/`#cursor-follower` leverage `mix-blend-mode: difference` where available and hide completely on viewports below 1025 px to respect touch-first devices.
- **Glitch effect:** `.glitch` elements stack `base` and `fx*` spans. CSS handles positioning and blend modes while JS timelines drive clip/opacity changes.
- **Responsive tweaks:** Media queries adjust cursor visibility, padding, and heights for `ultraSmall`, `xtraSmall`, `small`, and `large` breakpoints; `.striped` inline highlights use CSS gradients to produce underlines.

## 7. External Dependencies
- **PixiJS v4.8.x:** Provides WebGL rendering, sprites, masks, the displacement filter, and the application loop.
- **GSAP (TweenMax, TimelineMax, PixiPlugin):** Coordinates intro choreography, cursor dynamics, glitch timelines, and project transitions with easing.
- **Smooth Scrollbar:** Implements virtual scrolling with momentum and exposes a plugin system leveraged by `VS_ScrollPlugin`.
- **WebFont Loader:** Ensures MierA fonts load before Pixi draws text, preventing reflow-based jumps.
- **Google Analytics (gtag.js):** Adds traffic tracking and fires asynchronously after the page markup loads.
- **Support utilities:** Event emitter (`window.dispatcher`), WebP detection helper (`supportsWebp`), and `regeneratorRuntime` (from Babel transpilation) ship alongside the bundle.

## 8. Data & Asset Strategy
- **Project manifest:** `window.works` maps each slug to `{ image, color, size }` for Overpass, Remix Goldblum, Vincent Saisset, Marie Morelle, and Fête des Lumières. The metadata drives Pixi loader entries and hover animations.
- **Asset naming:** All assets live under `./build/img/...`; default extensions are `.jpg` / `.png`, swapped to `.webp` when supported. Displacement maps (`filter-circle`, `filter-repeat`) are reused in multiple stages.
- **Static copy:** The about section’s text and social links live in HTML. JavaScript replaces the placeholder email (`--`) and resets Smooth Scrollbar to the top after the intro sequence.

## 9. Operational Notes
- **Client-side only:** After the initial bundles and assets load, the site runs entirely in-browser with no extra API calls (aside from Google Analytics).
- **Debug pathways:** A `window.debug` flag disables intro transitions and forces immediate resize handling, simplifying development inspection.
- **Responsiveness:** Layout and animations adapt to four viewport classes, altering padding, skew intensity, and animation distances for consistent feel across devices.

## 10. Key Takeaways
- The portfolio is a single-page, animation-driven experience where PixiJS replaces typical DOM-heavy layouts, Smooth Scrollbar virtualizes scroll input, and GSAP keeps every transition in sync with user momentum.
- Global namespaces (`window.works`, `window.progress`, `window.cursor`) allow loosely coupled modules to share state without a formal framework.
- Bootstrapping guarantees fonts and textures are ready before unveiling the core scene, delivering a polished, seamless entry and highly interactive browsing experience.

