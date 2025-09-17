# Safari Container Query Compatibility Guide

This document outlines the comprehensive Safari compatibility system implemented for container queries, ensuring consistent responsive design across all browsers while maintaining modern development practices.

Last updated: 2025-01-16 (Updated with critical CSS parsing error discovery)

## Overview

Container queries provide component-based responsive design but are not supported in Safari versions before 16.0. This guide documents the progressive enhancement system that provides automatic fallbacks for older Safari browsers while taking advantage of container queries where supported.

**CRITICAL LESSON LEARNED**: During implementation, we discovered that Tailwind CSS v4 does not support nesting `@utility` directives inside `@supports` blocks. This forced a complete redesign of our Safari compatibility strategy from CSS-based to JavaScript-based fallbacks, which ultimately proved more robust and flexible.

## Browser Support Matrix

| Browser          | Container Query Support | Implementation Strategy          |
| ---------------- | ----------------------- | -------------------------------- |
| Safari 16.0+     | ✅ Native support       | Container queries used directly  |
| Safari 14.0-15.x | ❌ No support           | Viewport-based responsive design |
| Chrome/Firefox   | ✅ Native support       | Container queries used directly  |
| Edge 105+        | ✅ Native support       | Container queries used directly  |

## Architecture

## ⚠️ Critical Implementation Discovery

### Tailwind CSS v4 Limitation with @utility and @supports

**Problem Discovered**: Attempting to nest `@utility` directives inside `@supports` blocks causes CSS parsing errors that break the entire application layout.

**Original Plan** (DOES NOT WORK):

```css
@supports (container-type: inline-size) {
  @utility cq {
    container-type: inline-size;  // ❌ PARSING ERROR
  }
}
```

**Error**: `@utility cannot be nested.`

**Solution**: Simplified approach with JavaScript-based fallbacks:

```css
/* Simple, working approach */
@utility cq {
  container-type: inline-size;  // ✅ WORKS
}
```

**Impact**: This limitation forced us to implement Safari compatibility at the component level using JavaScript utilities, which turned out to be more flexible and maintainable than CSS-only solutions.

### 1. Feature Detection System

**File**: `lib/utils/containerQueries.ts`

Provides utilities for detecting container query support and generating appropriate CSS classes:

```typescript
// Detect container query support
export const supportsContainerQueries = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return CSS.supports("container-type: inline-size");
  } catch {
    return false;
  }
};

// Generate adaptive classes based on browser capability
export const getAdaptiveClasses = (containerClasses: string, fallbackClasses: string): string => {
  return supportsContainerQueries() ? containerClasses : fallbackClasses;
};
```

### 2. Global CSS Utilities

**File**: `app/globals.css`

**CRITICAL DISCOVERY**: Tailwind CSS v4 does not support `@utility` directives nested inside `@supports` blocks. The original plan to wrap utilities in feature detection caused CSS parsing errors that broke the entire layout.

**Simplified Implementation**:

```css
/* Container Query Support - Simplified approach */
@utility cq {
  container-type: inline-size;
}
```

**Why this approach**:

- ✅ **No CSS Parsing Errors**: Avoids Tailwind v4 limitation with nested `@utility` directives
- ✅ **Modern Browser Support**: Container queries work natively in supported browsers
- ✅ **JavaScript Fallbacks**: Safari compatibility handled at component level via `getAdaptiveClasses()`
- ✅ **Maintainable**: Simple, clean CSS that doesn't break during build

### 3. ResizeObserver Fallback

**File**: `hooks/useContainerSize.ts`

Provides precise container width detection for older Safari versions:

```typescript
export function useContainerSize(): ContainerSizeHook {
  const containerRef = useRef<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const supportsContainerQueries = shouldUseContainerQueries();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || supportsContainerQueries) return;

    // ResizeObserver fallback for older Safari
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [supportsContainerQueries]);

  // Convert to breakpoint flags
  const isContainerSize = {
    sm: containerWidth >= 384, // 24rem
    md: containerWidth >= 512, // 32rem
    lg: containerWidth >= 672, // 42rem
    "28rem": containerWidth >= 448, // WorkTimeline specific
    "34rem": containerWidth >= 544, // WorkTimeline specific
    "36rem": containerWidth >= 576, // Grid layouts
  };

  return { containerRef, containerWidth, isContainerSize };
}
```

## Implementation Examples

### 1. Component Integration

**WorkTimeline Component** (`app/work/_components/WorkTimeline.client.tsx`):

```typescript
import { getAdaptiveClasses } from '@/lib/utils/containerQueries';

export default function WorkTimeline() {
  return (
    <div className="cq">
      {/* Panel with responsive padding */}
      <div className={`p-5 sm:p-6 ${getAdaptiveClasses(
        '[@container(min-width:36rem)]:p-6',
        'lg:p-6'
      )}`}>

        {/* Title with responsive text size */}
        <h3 className={`text-xl ${getAdaptiveClasses(
          '[@container(min-width:28rem)]:text-2xl',
          'sm:text-2xl'
        )}`}>
          Experience Title
        </h3>

        {/* List with responsive spacing */}
        <ul className={`space-y-3 ${getAdaptiveClasses(
          '[@container(min-width:34rem)]:space-y-4',
          'md:space-y-4'
        )}`}>
          {/* List items */}
        </ul>
      </div>
    </div>
  );
}
```

**SkillsAndCases Component** (`app/projects/_components/SkillsAndCases.tsx`):

```typescript
import { getAdaptiveClasses } from '@/lib/utils/containerQueries';

export default function SkillsAndCases() {
  return (
    <div className="cq">
      {/* Grid layout with container query fallback */}
      <div className={`flex flex-col ${getAdaptiveClasses(
        '[@container(min-width:36rem)]:grid [@container(min-width:36rem)]:grid-cols-[1fr,1.5fr]',
        'lg:grid lg:grid-cols-[1fr,1.5fr]'
      )}`}>

        {/* Image with responsive sizing */}
        <img className={`h-36 w-full object-cover md:h-44 ${getAdaptiveClasses(
          '[@container(min-width:28rem)]:h-44 [@container(min-width:36rem)]:h-full',
          'sm:h-44 lg:h-full'
        )}`} />

        {/* Content with responsive padding */}
        <div className={`p-5 ${getAdaptiveClasses(
          '[@container(min-width:36rem)]:p-6',
          'lg:p-6'
        )}`}>
          {/* Content */}
        </div>
      </div>
    </div>
  );
}
```

### 2. Ready-to-Use Utility Classes

For common patterns, use the pre-built utility classes:

```tsx
// Responsive card layout
<div className="cq-card-layout">
  <img src="..." />
  <div>Content</div>
</div>

// Responsive project grid
<div className="cq-project-grid">
  {projects.map(project => <ProjectCard key={project.id} {...project} />)}
</div>

// Responsive timeline items
<div className="cq-timeline-item">
  Timeline content with responsive spacing
</div>
```

## Decision Guide: Container Queries vs Viewport Queries

### 🎯 Use Container Queries When:

✅ **Component layout depends on its container size, not viewport size**

- Card components that switch from vertical to horizontal layout
- Navigation components that collapse based on available space
- Timeline items that increase padding in wider containers

✅ **Building reusable components that adapt to their context**

- Components that might appear in sidebars, modals, or flexible containers
- Form fields that stack/unstack based on form width
- Product grids that adjust columns based on container width

✅ **You need intrinsic responsive design**

- Component should work the same way regardless of where it's placed
- Component responds to its own space, not global screen size

### 📱 Use Viewport Queries When:

✅ **Layout depends on overall screen size or device type**

- Page headers that change layout on mobile vs desktop
- Global font size scaling based on screen size
- Navigation that switches between mobile hamburger and desktop menu

✅ **Setting global page layout and typography scales**

- Responsive grid systems for entire page layouts
- Responsive typography and spacing scales
- Device-specific optimizations

✅ **Working with mobile-first responsive design principles**

- Responsive breakpoints for entire page layouts
- Need to respond to device characteristics (orientation, resolution)

## Performance Hierarchy

From fastest to slowest performance:

1. **Viewport queries** - No container size calculations required
2. **Container queries** - Efficient browser-native implementation
3. **ResizeObserver** - Manual container width detection with JavaScript

## Implementation Strategy

### 1. Development Workflow

```typescript
// Always use getAdaptiveClasses() for automatic Safari fallbacks
const responsiveClasses = getAdaptiveClasses(
  "[@container(min-width:36rem)]:grid [@container(min-width:36rem)]:grid-cols-2", // Container query
  "lg:grid lg:grid-cols-2", // Viewport fallback
);
```

### 2. Testing Requirements

- ✅ Test on Safari 16+ (container queries work)
- ✅ Test on Safari 14-15 (fallback to viewport queries)
- ✅ Test on Chrome/Firefox (container queries work)
- ✅ Verify visual consistency across all browsers
- ✅ Test responsive behavior at various container/viewport sizes

### 3. Breakpoint Mapping

| Container Query                 | Safari Fallback | Pixel Equivalent |
| ------------------------------- | --------------- | ---------------- |
| `[@container(min-width:24rem)]` | `sm:` (640px)   | 384px container  |
| `[@container(min-width:28rem)]` | `sm:` (640px)   | 448px container  |
| `[@container(min-width:32rem)]` | `md:` (768px)   | 512px container  |
| `[@container(min-width:34rem)]` | `md:` (768px)   | 544px container  |
| `[@container(min-width:36rem)]` | `lg:` (1024px)  | 576px container  |
| `[@container(min-width:42rem)]` | `lg:` (1024px)  | 672px container  |

## Common Patterns

### 1. Card Component Pattern

```tsx
// Flex column by default, grid at larger container sizes
<div className="cq">
  <article
    className={`flex flex-col gap-4 ${getAdaptiveClasses(
      "[@container(min-width:36rem)]:grid [@container(min-width:36rem)]:grid-cols-[1fr,1.5fr] [@container(min-width:36rem)]:gap-6",
      "lg:grid lg:grid-cols-[1fr,1.5fr] lg:gap-6",
    )}`}
  >
    <img
      className={`h-48 object-cover ${getAdaptiveClasses(
        "[@container(min-width:36rem)]:h-full",
        "lg:h-full",
      )}`}
    />
    <div className={`p-4 ${getAdaptiveClasses("[@container(min-width:36rem)]:p-6", "lg:p-6")}`}>
      {/* Content */}
    </div>
  </article>
</div>
```

### 2. Navigation Component Pattern

```tsx
// Horizontal by default, vertical stack in narrow containers
<nav className="cq">
  <ul
    className={`flex gap-4 ${getAdaptiveClasses(
      "[@container(max-width:28rem)]:flex-col [@container(max-width:28rem)]:gap-2",
      "max-sm:flex-col max-sm:gap-2",
    )}`}
  >
    {/* Navigation items */}
  </ul>
</nav>
```

### 3. Timeline Component Pattern

```tsx
// Enhanced spacing and layout in wider containers
<div className="cq">
  <div
    className={`p-4 ${getAdaptiveClasses(
      "[@container(min-width:32rem)]:p-6 [@container(min-width:48rem)]:p-8",
      "md:p-6 xl:p-8",
    )}`}
  >
    <h3
      className={`text-lg ${getAdaptiveClasses(
        "[@container(min-width:32rem)]:text-xl [@container(min-width:48rem)]:text-2xl",
        "md:text-xl xl:text-2xl",
      )}`}
    >
      Timeline Item
    </h3>
  </div>
</div>
```

## Troubleshooting

### Critical Issues

1. **🚨 CSS Parsing Errors Breaking Entire Layout**
   - **Symptom**: `@utility cannot be nested` error, blank/broken homepage
   - **Cause**: Attempting to nest `@utility` inside `@supports` blocks in Tailwind v4
   - **Solution**: Remove `@supports` wrapping from `@utility` directives
   - **Prevention**: Use simple `@utility` declarations, handle fallbacks in JavaScript

2. **Container queries not working in Safari 16+**
   - Verify the element has `container-type: inline-size` (use `.cq` class)
   - Check that the element has a defined width/size

3. **Fallback not activating in older Safari**
   - Ensure `getAdaptiveClasses()` is used correctly
   - Verify viewport-based classes are valid Tailwind utilities

4. **Layout differences between browsers**
   - Test container vs viewport breakpoint alignment
   - Consider using ResizeObserver for precise control

### Debugging Tools

```typescript
// Debug container size detection
import { debugContainerSize } from "@/hooks/useContainerSize";

const { containerWidth, isContainerSize } = useContainerSize();
debugContainerSize(containerWidth, isContainerSize); // Logs size info in development
```

## Migration Guide

### Converting Existing Container Queries

**Before** (basic container query):

```tsx
<div className="[@container(min-width:36rem)]:grid [@container(min-width:36rem)]:grid-cols-2">
```

**After** (Safari compatible):

```tsx
<div className={getAdaptiveClasses(
  '[@container(min-width:36rem)]:grid [@container(min-width:36rem)]:grid-cols-2',
  'lg:grid lg:grid-cols-2'
)}>
```

### Adding Container Context

**Before** (no container context):

```tsx
<div className="w-full">
  <div className="[@container(min-width:36rem)]:grid"> {/* Won't work */}
```

**After** (with container context):

```tsx
<div className="cq w-full">
  <div className={getAdaptiveClasses(
    '[@container(min-width:36rem)]:grid',
    'lg:grid'
  )}>
```

## Best Practices

### 1. ⚠️ Avoid CSS Parsing Errors

- **NEVER nest `@utility` inside `@supports` blocks** in Tailwind CSS v4
- Keep CSS utilities simple and handle fallbacks in JavaScript
- Test build process after any CSS utility changes
- Monitor for `@utility cannot be nested` errors

### 2. ⚠️ Prefer Proven Tailwind Patterns Over Custom Utilities

- **Use standard Tailwind patterns** for common layouts (e.g., `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)
- **Avoid custom `@utility` declarations** unless absolutely necessary
- **Test custom utilities thoroughly** as they can have unexpected behavior
- **Replace problematic custom utilities** with proven Tailwind patterns when issues arise

### 3. Always Use Progressive Enhancement

- Start with container queries for modern browsers
- Provide viewport-based fallbacks for Safari < 16.0
- Use `getAdaptiveClasses()` for automatic switching
- Prefer JavaScript-based fallbacks over complex CSS

### 4. Test Across Browser Versions

- Modern Safari (16+): Container queries work natively
- Older Safari (14-15): Fallback to viewport queries
- Chrome/Firefox: Container queries work natively
- **Always test homepage loads without errors** after CSS changes

### 5. Choose Appropriate Breakpoints

- Map container sizes to reasonable viewport equivalents
- Consider the component's typical usage contexts
- Test at various screen sizes and container widths

### 6. Optimize for Performance

- Prefer container queries over ResizeObserver when supported
- Use viewport queries for global layout decisions
- Limit ResizeObserver to cases requiring precise container width detection

## Future Considerations

### Safari 16.0+ Adoption

As Safari 16.0+ adoption increases, the fallback system becomes less critical but should remain for:

- Legacy device support
- Enterprise environments with older browsers
- Progressive enhancement best practices

### Framework Integration

The system is designed to work with:

- ✅ Next.js (current implementation)
- ✅ Any React application
- ✅ Tailwind CSS v3+ and v4+
- ✅ TypeScript (full type safety)

## Contributing

When adding new container query usage:

1. **🚨 NEVER nest `@utility` inside `@supports`** - This breaks the entire build in Tailwind v4
2. **Always use `getAdaptiveClasses()`** for Safari compatibility
3. **Add the `.cq` class** to establish container context
4. **Choose appropriate viewport fallbacks** that maintain visual consistency
5. **Test on Safari 14-15** to verify fallback behavior
6. **Test homepage loads after CSS changes** to ensure no parsing errors
7. **Document any new breakpoint patterns** in this guide

For questions or improvements to this system, refer to the implementation in:

- `lib/utils/containerQueries.ts` - Core utilities
- `hooks/useContainerSize.ts` - ResizeObserver fallback
- `app/globals.css` - Global CSS utilities
- Component examples in `app/work/_components/` and `app/projects/_components/`
