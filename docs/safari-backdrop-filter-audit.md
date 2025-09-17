# Safari Backdrop-Filter Audit (Task 3.1)

Last updated: 2025-09-17

Purpose: Inventory all backdrop-filter usages, categorize by performance impact in Safari, and document visual requirements to guide optimization work in Tasks 3.2–3.4.

Notes
- “High” impact = backdrop-filter is animated or changes during transitions.
- “Medium” impact = backdrop-filter is static but applied to frequently animated elements or large areas.
- “Low” impact = static, infrequent, small area.

Inventory

1) components/ui/GlassButton.tsx
- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/components/ui/GlassButton.tsx
- Lines: 21–23
- Usage: Tailwind utilities: backdrop-blur-[16px], backdrop-saturate-150 with gradient and shadows
- Category: Medium (static blur; many instances site-wide on nav buttons)
- Visual requirements: “Frosted pill” look; readable white-on-dark; subtle inner highlight and soft shadows; must feel glassy but not noisy.

2) components/ui/NavPill.tsx
- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/components/ui/NavPill.tsx
- Lines: 85–87
- Usage: Inline style: WebkitBackdropFilter: 'blur(24px) saturate(200%)', backdropFilter: 'blur(24px) saturate(200%)'
- Category: Medium (static blur with width transform animations on the same element)
- Visual requirements: Expanded/collapsed pill with frosted look; crisp cyan accent when active; tooltip support; smooth width transitions.

3) components/ui/GlassHeaderBubble.tsx
- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/components/ui/GlassHeaderBubble.tsx
- Lines: 59–60, 83–85, 141
- Usage: Tailwind: backdrop-blur-[24px]/[20px], backdrop-saturate-200/180 on various header pills
- Category: Medium (static blur; elements may be repositioned; width changes via NavPill)
- Visual requirements: Header nav cluster with frosted look; responsive sizes; active route pill expands and remains crisp.

4) app/(home)/_components/hero/MorphingVideo.client.tsx
- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/(home)/_components/hero/MorphingVideo.client.tsx
- Lines: 78–80 (transition includes 'backdrop-filter'); 84–90 (dynamic backdropFilter based on --p)
- Usage: Container transitions include backdrop-filter; backdropFilter value changes with animation progress
- Category: High (animated backdrop-filter during intro/expand sequence)
- Visual requirements: Large hero container with dynamic frosted effect that ramps with intro progress; seamless visual as the pill expands; no jank.

5) app/(home)/_components/hero/MorphingVideo overlay pill
- Path: same as above
- Lines: 178–184
- Usage: Tailwind: backdrop-blur-[16px], backdrop-saturate-[160%]
- Category: Medium (static blur; opacity of overlay changes; blur itself remains static)
- Visual requirements: Cyan-tinted translucent pill centered in viewport; smooth opacity transitions; readable text.

6) app/work/_components/WorkTimeline.client.tsx
- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/work/_components/WorkTimeline.client.tsx
- Lines: 260–262 (outer article), 272–275 (inner panel)
- Usage: Tailwind: backdrop-blur-[24px] and [20px], backdrop-saturate-[140%]/[150%]
- Category: Medium (static blur on cards; transforms and hover 3D occur on same element)
- Visual requirements: “Frosted card” panels with subtle halos; hover depth without blurring changes; maintain text readability.

7) app/projects/_components/SkillsAndCases.tsx
- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/projects/_components/SkillsAndCases.tsx
- Lines: 151–158 (outer article), 155–159 (inner panel)
- Usage: Tailwind: backdrop-blur-[24px] and [20px], backdrop-saturate-[140%]/[150%]
- Category: Medium (static blur; grid/cards may animate entrance/hover; blur is static)
- Visual requirements: Frosted cards over dark gradient; images and text remain crisp; hover polish without blur changes.

8) app/mobile/_components/NavRow.client.tsx
- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/mobile/_components/NavRow.client.tsx
- Lines: 19–20, 35–38, 53–56, 70–71
- Usage: Tailwind: backdrop-blur-[22px], backdrop-saturate-[240%] on button variants
- Category: Medium (static blur; buttons are interactive; some opacity changes)
- Visual requirements: Compact frosted icon pills; consistent look with header buttons; smooth hover/press styling.

9) app/(home)/_components/hero/MobileNavRow.client.tsx
- Path: /Users/jayvicsanantonio/Developer/jayvicsanantonio.dev/app/(home)/_components/hero/MobileNavRow.client.tsx
- Lines: 27–31, 37–41, 49–53, 60–63
- Usage: Tailwind: backdrop-blur-[28px], backdrop-saturate-[220%]
- Category: Medium (static blur; opacity controlled via CSS variable; transform hints applied)
- Visual requirements: On-top mobile nav row; frosted look consistent with hero overlay; maintain tap target sizes.

10) app/mobile/page.tsx (mobile page greeting pill)
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
- Frosted pill/buttons (GlassButton, NavPill, Mobile*):
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
  1) Enable Develop menu (Safari > Settings > Advanced > “Show features for web developers”).
  2) Open page, Develop > Show Web Inspector > Timelines.
  3) Record while triggering: hero intro (load), nav interactions, cards hover/scroll; aim for 5–10 seconds captures.
  4) Verify FPS, long paints, and “Backdrops” in Rendering Frames. Note frames with <50 FPS and correlate to components above.
- Safari (iOS):
  1) Connect device to Mac; enable Web Inspector on device.
  2) Use Safari Develop menu to open the device page and repeat Timelines capture.
- Deliverables to capture:
  - Hero intro: record FPS and paint times while pill expands.
  - Nav button interactions: check for drops when MobileNavRow is visible.
  - Scrolling /work and /projects grids: ensure sustained 60fps or document dips.

Next Steps (feeding Tasks 3.2–3.4)
- 3.2: Add .glass-optimized class and ensure transforms are on a wrapper, backdrop-filter on a non-animated child.
- 3.3: Split MorphingVideo transitions into stages; avoid animating backdrop-filter; use delayed effect or solid fallback during motion.
- 3.4: Provide Safari-specific utilities to conditionally disable backdrop-filter during active animations.
