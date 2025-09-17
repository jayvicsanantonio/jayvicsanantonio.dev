# Safari Backdrop-Filter Audit (Task 3.1)

Last updated: 2025-09-17

Purpose: Inventory all backdrop-filter usages, categorize by performance impact in Safari, and document visual requirements to guide optimization work in Tasks 3.2–3.4.

Notes

- “High” impact = backdrop-filter is animated or changes during transitions.
- “Medium” impact = backdrop-filter is static but applied to frequently animated elements or large areas.
- “Low” impact = static, infrequent, small area.

Inventory

1. components/ui/GlassButton.tsx

- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/components/ui/GlassButton.tsx
- Lines: 21–23
- Usage: Tailwind utilities: backdrop-blur-[16px], backdrop-saturate-150 with gradient and shadows
- Category: Medium (static blur; many instances site-wide on nav buttons)
- Visual requirements: “Frosted pill” look; readable white-on-dark; subtle inner highlight and soft shadows; must feel glassy but not noisy.

2. components/ui/NavPill.tsx

- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/components/ui/NavPill.tsx
- Lines: 85–87
- Usage: Inline style: WebkitBackdropFilter: 'blur(24px) saturate(200%)', backdropFilter: 'blur(24px) saturate(200%)'
- Category: Medium (static blur with width transform animations on the same element)
- Visual requirements: Expanded/collapsed pill with frosted look; crisp cyan accent when active; tooltip support; smooth width transitions.

3. components/ui/GlassHeaderBubble.tsx

- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/components/ui/GlassHeaderBubble.tsx
- Lines: 59–60, 83–85, 141
- Usage: Tailwind: backdrop-blur-[24px]/[20px], backdrop-saturate-200/180 on various header pills
- Category: Medium (static blur; elements may be repositioned; width changes via NavPill)
- Visual requirements: Header nav cluster with frosted look; responsive sizes; active route pill expands and remains crisp.

4. app/(home)/\_components/hero/MorphingVideo.client.tsx

- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/(home)/\_components/hero/MorphingVideo.client.tsx
- Lines: 78–80 (transition includes 'backdrop-filter'); 84–90 (dynamic backdropFilter based on --p)
- Usage: Container transitions include backdrop-filter; backdropFilter value changes with animation progress
- Category: High (animated backdrop-filter during intro/expand sequence)
- Visual requirements: Large hero container with dynamic frosted effect that ramps with intro progress; seamless visual as the pill expands; no jank.

5. app/(home)/\_components/hero/MorphingVideo overlay pill

- Path: same as above
- Lines: 178–184
- Usage: Tailwind: backdrop-blur-[16px], backdrop-saturate-[160%]
- Category: Medium (static blur; opacity of overlay changes; blur itself remains static)
- Visual requirements: Cyan-tinted translucent pill centered in viewport; smooth opacity transitions; readable text.

6. app/work/\_components/WorkTimeline.client.tsx

- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/work/\_components/WorkTimeline.client.tsx
- Lines: 260–262 (outer article), 272–275 (inner panel)
- Usage: Tailwind: backdrop-blur-[24px] and [20px], backdrop-saturate-[140%]/[150%]
- Category: Medium (static blur on cards; transforms and hover 3D occur on same element)
- Visual requirements: “Frosted card” panels with subtle halos; hover depth without blurring changes; maintain text readability.

7. app/projects/\_components/SkillsAndCases.tsx

- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/projects/\_components/SkillsAndCases.tsx
- Lines: 151–158 (outer article), 155–159 (inner panel)
- Usage: Tailwind: backdrop-blur-[24px] and [20px], backdrop-saturate-[140%]/[150%]
- Category: Medium (static blur; grid/cards may animate entrance/hover; blur is static)
- Visual requirements: Frosted cards over dark gradient; images and text remain crisp; hover polish without blur changes.

8. app/mobile/\_components/NavRow.client.tsx

- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/mobile/\_components/NavRow.client.tsx
- Lines: 19–20, 35–38, 53–56, 70–71
- Usage: Tailwind: backdrop-blur-[22px], backdrop-saturate-[240%] on button variants
- Category: Medium (static blur; buttons are interactive; some opacity changes)
- Visual requirements: Compact frosted icon pills; consistent look with header buttons; smooth hover/press styling.

9. app/(home)/\_components/hero/MobileNavRow.client.tsx

- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/(home)/\_components/hero/MobileNavRow.client.tsx
- Lines: 27–31, 37–41, 49–53, 60–63
- Usage: Tailwind: backdrop-blur-[28px], backdrop-saturate-[220%]
- Category: Medium (static blur; opacity controlled via CSS variable; transform hints applied)
- Visual requirements: On-top mobile nav row; frosted look consistent with hero overlay; maintain tap target sizes.

10. app/mobile/page.tsx (mobile page greeting pill)

- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/mobile/page.tsx
- Lines: 83–87
- Usage: Tailwind: backdrop-blur-[16px], backdrop-saturate-[160%]
- Category: Low (static blur on a single small pill in a secondary section)
- Visual requirements: Small frosted pill with cyan gradient; text readable; subtle depth.

Categorization Summary

- High impact (animated):
  - MorphingVideo container (dynamic backdropFilter; transitions include backdrop-filter)
- Medium impact (static but frequently animated surroundings/elements):
  - GlassButton (site-wide usage)
  - NavPill (inline backdropFilter style; width transform)
  - GlassHeaderBubble (header pills)
  - WorkTimeline cards (outer and inner panels)
  - SkillsAndCases cards (outer and inner panels)
  - Mobile NavRow and hero MobileNavRow buttons (heavier blur/saturate values)
  - MorphingVideo cyan overlay pill (blur static; opacity changes)
- Low impact:
  - Mobile greeting pill on app/mobile/page.tsx

Visual Requirements (by family)

- Frosted pill/buttons (GlassButton, NavPill, Mobile\*):
  - Maintain a translucent, frosted appearance with subtle inner sheen and soft outer shadows.
  - Text/icons should remain high-contrast and readable on dark backgrounds.
  - Hover/active states should not animate blur values; limit to transform/opacity/border/shadow for performance.
- Header bubble (GlassHeaderBubble):
  - Same frosted treatment as buttons; active route pill can widen but blur remains fixed.
- Cards (WorkTimeline, SkillsAndCases):
  - Frosted panels over dark backgrounds; inner content must be tack-sharp.
  - Hover/entrance animations should avoid changing blur; animate transform/opacity only.
- Hero container (MorphingVideo):
  - Dynamic frosted effect tied to intro progress currently animates backdrop-filter; this is the prime candidate for refactor in 3.3.
  - Visual goal: retain the “reveal” feel while avoiding animated blur (split stages or use fallback layering).

Measurement (to be executed in 3.1 step 3)

- Safari (macOS):
  1. Enable Develop menu (Safari > Settings > Advanced > “Show features for web developers”).
  2. Open page, Develop > Show Web Inspector > Timelines.
  3. Record while triggering: hero intro (load), nav interactions, cards hover/scroll; aim for 5–10 seconds captures.
  4. Verify FPS, long paints, and “Backdrops” in Rendering Frames. Note frames with <50 FPS and correlate to components above.
- Safari (iOS):
  1. Connect device to Mac; enable Web Inspector on device.
  2. Use Safari Develop menu to open the device page and repeat Timelines capture.
- Deliverables to capture:
  - Hero intro: record FPS and paint times while pill expands.
  - Nav button interactions: check for drops when MobileNavRow is visible.
  - Scrolling /work and /projects grids: ensure sustained 60fps or document dips.

Next Steps (feeding Tasks 3.2–3.4)

- 3.2: Add .glass-optimized class and ensure transforms are on a wrapper, backdrop-filter on a non-animated child.
- 3.3: Split MorphingVideo transitions into stages; avoid animating backdrop-filter; use delayed effect or solid fallback during motion.
- 3.4: Provide Safari-specific utilities to conditionally disable backdrop-filter during active animations.

## Hero metrics (Safari) — intro and scroll

Measurement date: 2025-09-17
Device/Browser: Safari on macOS (userAgent captured below)
Method: In-app probe with rAF sampling (~10s total): 5s no-scroll intro, then 5s steady scroll to bottom.
How to reproduce: open /?measure=hero&scroll=1 and wait for overlay to finish; see window.heroPerf and console for details.

Summary (combined)

- avg FPS: 36.0 fps
- min FPS: 1.7 fps
- max FPS: 1000.0 fps
- p95 frame: 358.0 ms
- long frames (>16.7ms): 239

Intro window (first ~5s, no scroll)

- avg FPS: 57.8
- min/max FPS: 13.2 / 1000.0
- p95 frame: 20.0 ms
- long frames: 166

Steady window (next ~5s, scroll to bottom)

- avg FPS: 16.3
- min/max FPS: 1.7 / 0.0
- p95 frame: 358.0 ms
- long frames: 73

User agent

- UA: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15

Notes

- The MorphingVideo refactor stops animating backdrop-filter, and disables it during expansion (Safari), then re-enables after ~1.8s. This reduces long frames during the intro.
- Auto-scroll simulates typical user motion; steady metrics should hover near 60 fps with few long frames.

Interpretation

- Intro (no scroll) is near target at ~58 fps; remaining long frames likely come from large first paints and initial transforms.
- Steady (scroll to bottom) is significantly below target at ~16 fps with high p95 (358 ms), indicating heavy paints during scroll.
- Primary suspects (Safari): clip-path repaints on a large element, large gradient overlays, shadows, and scroll-driven CSS var updates causing style/paint each frame.

Follow-ups planned

- Freeze/replace clip-path during scroll and prefer border-radius-only where possible.
- Keep heavy visual effects on non-animating children; animate transform/opacity only on wrappers.
- Throttle/batch scroll CSS variable writes and verify only transform/opacity depend on them.
- Re-measure in production build and on iOS Safari.

### Additional run — 2025-09-17 02:47 UTC (Safari, macOS)

Method: same probe (~10s): 5s intro (no scroll), 5s steady (scroll to bottom)

Summary (combined)

- avg FPS: 38.63 fps
- min FPS: 2.11 fps
- max FPS: 1000.0 fps
- p95 frame: 346.0 ms
- long frames (>16.7ms): 249

Intro (no scroll)

- avg FPS: 59.23
- min/max FPS: 12.2 / 1000.0
- p95 frame: 18.0 ms
- long frames: 179

Steady (scroll to bottom)

- avg FPS: 18.20
- min/max FPS: 2.11 / 125.0
- p95 frame: 346.0 ms
- long frames: 70

UA: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15

### Additional run — 2025-09-17 03:52 UTC (Safari, macOS)

Method: same probe (~10s): 5s intro (no scroll), 5s steady (scroll to bottom)

Summary (combined)

- avg FPS: 38.03 fps
- min FPS: 2.15 fps
- max FPS: 333.33 fps
- p95 frame: 356.0 ms
- long frames (>16.7ms): 253

Intro (no scroll)

- avg FPS: 59.22
- min/max FPS: 16.95 / 333.33
- p95 frame: 18.0 ms
- long frames: 186

Steady (scroll to bottom)

- avg FPS: 17.01
- min/max FPS: 2.15 / 250.00
- p95 frame: 356.0 ms
- long frames: 67

UA: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15

Analysis snapshot

- Intro remains near 60 fps, consistent with prior runs. The steady scroll phase is still the limiting factor (~17 fps, p95 ~356 ms). The large long-frame count suggests occasional heavy paints, likely due to large gradients and any remaining large-area repaints.
- Next experiment: temporarily disable the hero inner overlay gradient entirely during scrolling (already gated), ensure the hero gradient is fixed and outside the scroll subtree (done), and verify clip-path is not active during scroll (done). Consider also removing box-shadow during scroll for Safari, which we already applied.
- Follow-up measurement: repeat this probe on a production build and on iOS Safari to validate trends.

### Additional run — 2025-09-17 02:55 UTC (Safari, macOS)

Method: same probe (~10s): 5s intro (no scroll), 5s steady (scroll to bottom)

Summary (combined)

- avg FPS: 37.97 fps
- min FPS: 2.04 fps
- max FPS: 333.33 fps
- p95 frame: 369.0 ms
- long frames (>16.7ms): 252

Intro (no scroll)

- avg FPS: 58.92
- min/max FPS: 12.99 / 333.33
- p95 frame: 18.0 ms
- long frames: 183

Steady (scroll to bottom)

- avg FPS: 17.75
- min/max FPS: 2.04 / 111.11
- p95 frame: 369.0 ms
- long frames: 69

UA: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15

### Additional run — 2025-09-17 03:00 UTC (Safari, macOS)

Method: same probe (~10s): 5s intro (no scroll), 5s steady (scroll to bottom)

Summary (combined)

- avg FPS: 38.54 fps
- min FPS: 2.09 fps
- max FPS: 333.33 fps
- p95 frame: 369.0 ms
- long frames (>16.7ms): 241

Intro (no scroll)

- avg FPS: 59.32
- min/max FPS: 12.82 / 333.33
- p95 frame: 18.0 ms
- long frames: 171

Steady (scroll to bottom)

- avg FPS: 18.29
- min/max FPS: 2.09 / 200.00
- p95 frame: 369.0 ms
- long frames: 70

UA: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15
