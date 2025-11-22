# Timing Constants Usage Review

**Date**: 2025-11-22  
**Task**: Review timing constant usage (Task 5.3.1)  
**Status**: ✅ Complete

## Summary

Reviewed all animation files to identify magic numbers and verify proper usage of timing constants. The refactor has successfully extracted most timing values, but a few opportunities for improvement remain.

## Findings

### ✅ Successfully Extracted Constants

All major timing values have been properly extracted to `hero-animation-timing.ts`:

- **Intro Animation Timing**: All durations, delays, and stagger values
- **Scroll Animation Timing**: Scrub smoothing, fade durations, snap timing
- **Skills Animation Timing**: Heading duration, row stagger, delays
- **Scroll Thresholds**: Alignment progress, position tolerance
- **Scroll Trigger Positions**: Start/end positions for ScrollTrigger
- **Initial States**: Y-percent, scale, and positioning values
- **Overlay Opacity**: Initial and peak values
- **Cover Timing**: Parallax distance and Y-ranges

### 🟡 Remaining Magic Numbers

#### 1. Timeline Position Offset (Low Priority)

**Location**: `use-hero-intro-animation.ts:162`

```typescript
"<+=0.6"; // Offset for pill background fade timing
```

**Recommendation**: Could extract to `INTRO_TIMING.PILL_BACKGROUND_OFFSET = 0.6` if this value needs to be tuned independently. However, this is a relative timeline position that's tightly coupled to the animation choreography, so leaving it inline is acceptable.

**Decision**: ✅ Leave as-is (acceptable inline usage)

#### 2. Nav Width Calculation Multipliers (Low Priority)

**Location**: `hero-animation-helpers.ts:254`

```typescript
return Math.max(navWidth * 0.35, CFG.nav.buttonSize.w * 3);
```

**Context**: These are fallback calculations when the nav spacer element isn't available:

- `0.35` = 35% of nav width as minimum pill width
- `3` = minimum of 3 button widths

**Recommendation**: Could extract to a `NAV_FALLBACK_CONFIG` constant:

```typescript
export const NAV_FALLBACK_CONFIG = {
  MIN_WIDTH_RATIO: 0.35,
  MIN_BUTTON_COUNT: 3,
} as const;
```

**Decision**: ✅ Leave as-is (these are geometric calculations, not animation timing)

#### 3. Color Values (Low Priority)

**Locations**:

- `hero-animation-helpers.ts:532-533`: `"#ffffff"` and `"0 6px 18px rgba(0,0,0,0.55)"`
- `use-hero-intro-animation.ts:132`: `"#ffffff"`
- `use-hero-intro-animation.ts:180`: `"rgba(255,255,255,0)"`

**Context**: These are styling values used in animations:

- White color for pill content text
- Text shadow for readability
- Transparent background for pill fade

**Recommendation**: These could be extracted to `hero.constants.ts` as:

```typescript
export const PILL_CONTENT_COLOR = "#ffffff";
export const PILL_CONTENT_TEXT_SHADOW = "0 6px 18px rgba(0,0,0,0.55)";
export const PILL_BACKGROUND_TRANSPARENT = "rgba(255,255,255,0)";
export const PILL_BACKGROUND_WHITE = "#ffffff";
```

**Decision**: ✅ Leave as-is (these are one-off style values, not reused constants)

#### 4. Transform Origin Values (Low Priority)

**Locations**:

- `hero-animation-helpers.ts:354`: `"50% 50%"` (skills heading)
- `hero-animation-helpers.ts:493,496`: `"50% 50%"` (pill and video)
- `hero-animation-helpers.ts:743`: `"50% 100%"` (cover fill)

**Context**: Transform origins for scale/rotation animations:

- `"50% 50%"` = center origin (most common)
- `"50% 100%"` = bottom-center origin (for cover scale-up effect)

**Recommendation**: Could extract to constants, but these are standard CSS values that are self-documenting.

**Decision**: ✅ Leave as-is (standard CSS values, clear intent)

#### 5. Geometric Calculations (Acceptable)

**Locations**:

- Division by 2 for centering calculations (lines 210, 271-275, 285-286)
- These are mathematical operations, not magic numbers

**Decision**: ✅ Correct usage (mathematical operations)

### ✅ Proper Constant Usage Verified

All timing constants are being imported and used correctly:

```typescript
// hero-animation-helpers.ts
import {
  SCROLL_THRESHOLDS,
  SCROLL_TIMING,
  SKILLS_TIMING,
  SCROLL_TRIGGER_POSITIONS,
  NAV_INITIAL_STATE,
  SKILLS_INITIAL_STATE,
  COVER_TIMING,
  OVERLAY_OPACITY,
} from "../components/Hero/hero-animation-timing";

// use-hero-intro-animation.ts
import {
  INTRO_TIMING,
  LABEL_INITIAL_STATE,
  OVERLAY_OPACITY,
} from "../components/Hero/hero-animation-timing";
```

All constants are used consistently throughout the codebase with no duplicate hardcoded values.

## Recommendations

### High Priority

None - all critical timing values have been extracted.

### Medium Priority

None - remaining values are either one-off usages or geometric calculations.

### Low Priority (Optional Improvements)

1. **Timeline Position Offset**: Consider extracting `"<+=0.6"` if it needs independent tuning
2. **Nav Fallback Config**: Consider extracting `0.35` and `3` multipliers if they need adjustment
3. **Color Constants**: Consider extracting color values if they're reused elsewhere

### Best Practices Observed ✅

- All timing constants use `as const` for type safety
- Constants are grouped logically by animation phase
- JSDoc comments explain the purpose of each constant
- Import statements are clean and organized
- No duplicate magic numbers found

## Conclusion

The timing constant extraction is **complete and well-executed**. The remaining numeric literals are either:

- Geometric calculations (division by 2 for centering)
- One-off style values (colors, shadows)
- Tightly coupled timeline positions
- Standard CSS values (transform origins)

No action required. The code is maintainable and follows best practices.

## Files Reviewed

- ✅ `app/(home)/components/Hero/hero-animation-timing.ts`
- ✅ `app/(home)/components/Hero/hero.constants.ts`
- ✅ `app/(home)/hooks/hero-animation-helpers.ts`
- ✅ `app/(home)/hooks/use-hero-intro-animation.ts`
- ✅ `app/(home)/hooks/use-hero-scroll-animation.ts`
- ✅ `app/(home)/hooks/use-hero-animations.ts`
