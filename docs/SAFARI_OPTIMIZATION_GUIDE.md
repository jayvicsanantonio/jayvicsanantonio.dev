# Safari Optimization Guide

This guide documents Safari-specific optimization patterns, best practices, and troubleshooting techniques implemented in this project to achieve 60fps performance and cross-browser consistency.

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Browser Detection](#browser-detection)
3. [Performance Optimizations](#performance-optimizations)
4. [Visual Compatibility](#visual-compatibility)
5. [Testing and Validation](#testing-and-validation)
6. [Troubleshooting](#troubleshooting)
7. [Migration Guide](#migration-guide)

## Quick Reference

### Essential Safari Optimizations

```typescript
// Browser detection
import { getBrowserCapabilities } from '@/lib/utils/browserUtils';
const capabilities = getBrowserCapabilities();

// Performance monitoring
import { SafariPerformanceTester } from '@/lib/utils/safariPerformanceTesting';
const tester = new SafariPerformanceTester();

// Visual regression testing
import { VisualRegressionTester } from '@/lib/utils/visualRegressionTesting';
const visualTester = new VisualRegressionTester();
```

### Critical Performance Patterns

```css
/* Safari scroll optimization */
html {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
}

/* GPU acceleration for animations */
.animating-element {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
}

/* Text balance fallback */
.text-balance {
  text-wrap: balance; /* Modern browsers */
  word-spacing: 0.05em; /* Safari fallback */
  hyphens: auto;
}
```

## Browser Detection

### Reliable Safari Detection

```typescript
// ✅ Recommended approach
export const getBrowserCapabilities = () => {
  const userAgent = navigator.userAgent;

  return {
    isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
    isMobile: /iPhone|iPad|iPod|Android/i.test(userAgent),
    isIOSSafari: /iPad|iPhone|iPod/.test(userAgent) && /Safari/.test(userAgent),
    supportsBackdropFilter: CSS.supports('backdrop-filter: blur(1px)'),
    supportsContainerQueries: CSS.supports('container-type: inline-size'),
  };
};

// ❌ Avoid user agent string parsing only
const isSafari = navigator.userAgent.includes('Safari'); // Unreliable
```

### Feature Detection Over Browser Detection

```typescript
// ✅ Preferred: Feature detection
const supportsTextBalance = () => {
  return CSS.supports('text-wrap: balance');
};

// ✅ Combine with browser detection for fallbacks
const getTextBalanceClasses = () => {
  if (supportsTextBalance()) {
    return 'text-balance';
  }

  const capabilities = getBrowserCapabilities();
  return capabilities.isSafari ? 'text-balance safari-enhanced' : 'text-balance';
};
```

## Performance Optimizations

### 1. Scroll Performance (Critical)

**Problem**: Safari drops to 15-30fps during scroll with backdrop-filter animations.

**Solution**: Scroll-aware backdrop-filter management

```typescript
// Disable backdrop-filter during scroll
const [isScrolling, setIsScrolling] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolling(true);
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}, []);

// Apply conditional backdrop-filter
const getScrollAwareBackdropFilter = () => {
  if (capabilities.isSafari && isScrolling) {
    return 'blur(0px)'; // Disable during scroll
  }
  return 'blur(16px)'; // Normal backdrop-filter
};
```

### 2. Backdrop-Filter Optimization

**Three-tier optimization strategy**:

```typescript
export const glassConfigs = {
  button: {
    default: { backdrop: 'backdrop-blur-[16px]', background: 'bg-white/20' },
    safari: { backdrop: 'backdrop-blur-[8px]', background: 'bg-white/25' },
    safariMobile: { backdrop: '', background: 'bg-white/35' }, // No blur
  },
};

export const getOptimizedGlassClasses = (
  configKey: GlassConfigKey,
  isScrolling: boolean = false
): string => {
  const config = glassConfigs[configKey];
  const capabilities = getBrowserCapabilities();

  if (capabilities.isMobile) {
    return config.safariMobile.background;
  }

  if (capabilities.isSafari) {
    return isScrolling
      ? config.safari.background
      : `${config.safari.backdrop} ${config.safari.background}`;
  }

  return `${config.default.backdrop} ${config.default.background}`;
};
```

### 3. Framer Motion Safari Optimization

**Problem**: Complex 3D transforms cause performance issues in Safari.

**Solution**: Browser-aware animation variants

```typescript
export const getCardHoverVariants = (): Variants => {
  const capabilities = getBrowserCapabilities();

  if (capabilities.isSafari) {
    // Simple 2D transforms for Safari
    return {
      initial: { y: 0 },
      hover: { y: -2, transition: { duration: 0.2, ease: 'easeOut' } },
    };
  }

  // Full 3D transforms for Chrome
  return {
    initial: { rotateX: 0, rotateY: 0, y: 0 },
    hover: {
      rotateX: 0.6, rotateY: -0.6, y: -4,
      transition: { duration: 0.2, type: 'spring', damping: 15 },
    },
  };
};
```

### 4. CSS Performance Patterns

```css
/* ✅ Flattened selectors for Safari */
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.card-title-large {
  font-size: 1.5rem;
}

/* ❌ Deep nesting that hurts Safari performance */
.card {
  & .content {
    & .title {
      &.large {
        font-size: 1.5rem;
      }
    }
  }
}

/* ✅ Strategic GPU acceleration */
.scroll-element {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* ✅ Safari-specific optimizations */
@supports (-webkit-touch-callout: none) {
  .ios-optimized {
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }
}
```

## Visual Compatibility

### 1. Text Balance Fallbacks

**Problem**: `text-wrap: balance` not supported in Safari.

**Solution**: CSS-first fallback approach

```css
/* ✅ SSR-compatible approach */
@supports (text-wrap: balance) {
  .text-balance {
    text-wrap: balance;
  }
}

@supports not (text-wrap: balance) {
  .text-balance {
    word-spacing: 0.05em;
    letter-spacing: 0.01em;
    line-height: 1.4;
    hyphens: auto;
  }

  /* Safari-specific improvements */
  @supports (-webkit-touch-callout: none) {
    .text-balance {
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
  }
}
```

### 2. Container Queries Fallbacks

**Problem**: Container queries not supported in Safari < 16.0.

**Solution**: JavaScript-based adaptive classes

```typescript
// ✅ Adaptive class system
export const getAdaptiveClasses = (
  containerClasses: string,
  viewportClasses: string
): string => {
  const capabilities = getBrowserCapabilities();

  if (capabilities.supportsContainerQueries) {
    return containerClasses;
  }

  return viewportClasses;
};

// Usage in components
const cardClasses = getAdaptiveClasses(
  '[@container(min-width:36rem)]:grid [@container(min-width:36rem)]:grid-cols-2',
  'lg:grid lg:grid-cols-2'
);
```

### 3. iOS Safari Viewport Handling

```typescript
// Dynamic viewport height calculation
export const getIOSViewportHeight = (): number => {
  if (!capabilities.isIOSSafari) {
    return window.innerHeight;
  }

  // Account for Safari's dynamic viewport
  const documentHeight = document.documentElement.clientHeight;
  const windowHeight = window.innerHeight;

  return Math.max(documentHeight, windowHeight);
};

// CSS implementation
.min-h-screen {
  min-height: 100vh; /* Fallback */
  min-height: -webkit-fill-available; /* iOS Safari */
}
```

### 4. Touch Optimization

```typescript
// Touch-optimized interaction patterns
export const getTouchOptimizedClasses = (): string => {
  const capabilities = getBrowserCapabilities();

  if (capabilities.isMobile) {
    return 'ios-touch-optimized mobile-no-hover';
  }

  return '';
};
```

```css
/* Touch optimization */
.ios-touch-optimized {
  touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* Mobile hover state optimization */
@media (hover: none) and (pointer: coarse) {
  .mobile-no-hover:hover {
    transform: none !important;
  }

  .mobile-no-hover:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
}
```

## Testing and Validation

### 1. Performance Testing

```typescript
// Comprehensive performance testing
import { SafariPerformanceTester } from '@/lib/utils/safariPerformanceTesting';

const runPerformanceTests = async () => {
  const tester = new SafariPerformanceTester();
  const results = await tester.runFullTestSuite();

  // Results include:
  // - scrollTest: 60fps scroll performance
  // - animationTest: Motion performance
  // - glassEffectTest: Backdrop-filter performance
  // - videoPlaybackTest: Safari video compliance
  // - responsiveLayoutTest: Layout consistency

  return results;
};
```

### 2. Visual Regression Testing

```typescript
// Cross-browser visual consistency
import { VisualRegressionTester } from '@/lib/utils/visualRegressionTesting';

const runVisualTests = async () => {
  const tester = new VisualRegressionTester();
  const results = await tester.runVisualTestSuite();

  // Tests include:
  // - Text rendering consistency
  // - Glass effects with fallbacks
  // - Responsive layout behavior
  // - Animation performance

  return results;
};
```

### 3. Playwright Cross-Browser Testing

```bash
# Run Safari-specific tests
npx playwright test --project="Desktop Safari"
npx playwright test --project="Mobile Safari"
npx playwright test --project="iPad Safari"

# Run cross-browser comparison
npx playwright test tests/cross-browser.spec.ts
```

## Troubleshooting

### Common Safari Issues

#### 1. Hydration Mismatch with Browser Detection

**Problem**: Server/client render mismatch when using browser detection.

**Solution**: Use CSS-first approach with `@supports` queries.

```typescript
// ❌ Causes hydration mismatch
const getClasses = () => {
  const capabilities = getBrowserCapabilities();
  return capabilities.isSafari ? 'safari-class' : 'chrome-class';
};

// ✅ SSR-compatible
const getClasses = () => {
  return 'universal-class'; // CSS handles browser differences
};
```

#### 2. Video Autoplay Issues

**Problem**: Videos don't autoplay in Safari due to autoplay policies.

**Solution**: Comprehensive Safari video optimization.

```typescript
// Safari video attributes
const safariVideoProps = {
  autoPlay: true,
  muted: true, // Required for autoplay
  playsInline: true, // Required for iOS
  'webkit-playsinline': 'true', // Legacy iOS support
  preload: capabilities.isMobile ? 'metadata' : 'auto',
  disablePictureInPicture: capabilities.isIOSSafari,
};
```

#### 3. Poor Scroll Performance

**Problem**: Frame drops during scroll with backdrop-filter.

**Solution**: Implement scroll-aware backdrop-filter management.

```typescript
// Monitor scroll state
const [isScrolling, setIsScrolling] = useState(false);

// Disable expensive effects during scroll
const backdropFilter = capabilities.isSafari && isScrolling
  ? 'none'
  : 'blur(16px)';
```

#### 4. Container Query Fallback Issues

**Problem**: Layout breaks in Safari < 16.0.

**Solution**: Always provide viewport-based fallbacks.

```typescript
// Component with fallback
const gridClasses = capabilities.supportsContainerQueries
  ? '[@container(min-width:36rem)]:grid'
  : 'lg:grid';
```

### Performance Debugging

```typescript
// Monitor real-time performance
import { useScrollPerformanceMonitor } from '@/lib/utils/performanceMonitor';

const component = () => {
  const { startMonitoring, stopMonitoring, getMetrics } = useScrollPerformanceMonitor();

  useEffect(() => {
    startMonitoring();
    return stopMonitoring;
  }, []);

  // Check metrics in development
  console.log('Performance:', getMetrics());
};
```

## Migration Guide

### Migrating Existing Components

1. **Add Browser Detection**:
   ```typescript
   import { getBrowserCapabilities } from '@/lib/utils/browserUtils';
   const capabilities = getBrowserCapabilities();
   ```

2. **Implement Glass Effect Optimization**:
   ```typescript
   import { getOptimizedGlassClasses } from '@/lib/utils/glassEffects';
   const glassClasses = getOptimizedGlassClasses('button', isScrolling);
   ```

3. **Add Motion Optimization**:
   ```typescript
   import { getCardHoverVariants } from '@/lib/utils/motionUtils';
   const variants = getCardHoverVariants();
   ```

4. **Implement Touch Optimization**:
   ```typescript
   import { getTouchOptimizedClasses } from '@/lib/utils/touchOptimization';
   const touchClasses = getTouchOptimizedClasses();
   ```

### Testing Checklist

- [ ] Cross-browser visual consistency
- [ ] 60fps scroll performance in Safari
- [ ] Glass effects with proper fallbacks
- [ ] Container query fallbacks
- [ ] Text balance rendering
- [ ] Video playback on iOS Safari
- [ ] Touch interactions on mobile
- [ ] Responsive layout behavior

### Performance Targets

- **Desktop Safari**: 60fps scrolling, <50ms interaction response
- **Mobile Safari**: 45fps+ scrolling, <100ms touch response
- **Glass Effects**: 45fps+ with backdrop-filter, 60fps with fallbacks
- **Animations**: 60fps for 2D transforms, 45fps+ for complex animations

## Best Practices Summary

1. **Always use CSS-first fallbacks** to avoid hydration mismatches
2. **Implement three-tier optimization**: Chrome → Safari Desktop → Safari Mobile
3. **Monitor performance in real-time** during development
4. **Test on actual Safari browsers**, not just WebKit in DevTools
5. **Use feature detection** combined with browser detection for best results
6. **Optimize for scroll performance first** - it's the most noticeable
7. **Provide comprehensive fallbacks** for all cutting-edge CSS features
8. **Document Safari-specific workarounds** for future maintenance

---

For additional support, see the performance monitoring utilities in `lib/utils/` and test examples in `tests/`.