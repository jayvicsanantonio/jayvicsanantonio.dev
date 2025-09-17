// Performance audit logger for real Safari compatibility measurement
// Provides comprehensive metrics collection and analysis

export interface PerformanceMetrics {
  // Timing metrics
  appLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;

  // FPS metrics during different phases
  idleFPS: number[];
  scrollFPS: number[];
  averageIdleFPS: number;
  averageScrollFPS: number;
  minScrollFPS: number;
  maxScrollFPS: number;

  // Scroll performance
  scrollDuration: number;
  scrollDistance: number;
  scrollEventCount: number;
  frameDrops: number;

  // Browser capabilities
  browserInfo: {
    userAgent: string;
    isSafari: boolean;
    isChrome: boolean;
    isMobile: boolean;
    devicePixelRatio: number;
    viewport: { width: number; height: number };
  };

  // Feature support
  featureSupport: {
    backdropFilter: boolean;
    contentVisibility: boolean;
    textBalance: boolean;
    transforms3D: boolean;
    willChange: boolean;
    containerQueries: boolean;
  };

  // Performance observations
  performanceObservations: {
    longTasks: number;
    layoutShifts: number;
    inputDelay: number;
  };
}

export class PerformanceAuditor {
  private startTime: number = 0;
  private metrics: Partial<PerformanceMetrics> = {};
  private fpsHistory: number[] = [];
  private scrollFPSHistory: number[] = [];
  private lastFrameTime: number = 0;
  private frameCount: number = 0;
  private isScrolling: boolean = false;
  private scrollStartTime: number = 0;
  private scrollEventCount: number = 0;
  private frameDrops: number = 0;
  private isRunning: boolean = false;

  constructor() {
    this.initializeBrowserInfo();
    this.initializeFeatureDetection();
    this.setupPerformanceObservers();
  }

  /**
   * Start the comprehensive performance audit
   */
  startAudit(): void {
    console.log('🔍 Starting Performance Audit...');
    this.startTime = performance.now();
    this.isRunning = true;

    // Start FPS monitoring
    this.startFPSMonitoring();

    // Log initial state
    console.log('📊 Initial browser capabilities:', this.metrics.browserInfo);
    console.log('🎯 Feature support:', this.metrics.featureSupport);
  }

  /**
   * Begin scroll performance measurement
   */
  startScrollTest(): void {
    console.log('🚀 Starting scroll performance test...');
    this.isScrolling = true;
    this.scrollStartTime = performance.now();
    this.scrollEventCount = 0;
    this.scrollFPSHistory = [];

    // Add scroll listener
    const scrollHandler = () => {
      this.scrollEventCount++;
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Store handler for cleanup
    (window as any).__scrollHandler = scrollHandler;
  }

  /**
   * End scroll performance measurement
   */
  endScrollTest(): void {
    console.log('⏹️ Ending scroll performance test...');
    this.isScrolling = false;

    const scrollDuration = performance.now() - this.scrollStartTime;
    const scrollDistance = window.scrollY;

    this.metrics.scrollDuration = scrollDuration;
    this.metrics.scrollDistance = scrollDistance;
    this.metrics.scrollEventCount = this.scrollEventCount;
    this.metrics.scrollFPS = [...this.scrollFPSHistory];
    this.metrics.averageScrollFPS = this.calculateAverage(this.scrollFPSHistory);
    this.metrics.minScrollFPS = Math.min(...this.scrollFPSHistory);
    this.metrics.maxScrollFPS = Math.max(...this.scrollFPSHistory);

    // Remove scroll listener
    const handler = (window as any).__scrollHandler;
    if (handler) {
      window.removeEventListener('scroll', handler);
      delete (window as any).__scrollHandler;
    }

    console.log('📈 Scroll Performance Results:');
    console.log(`- Duration: ${scrollDuration.toFixed(2)}ms`);
    console.log(`- Distance: ${scrollDistance}px`);
    console.log(`- Events: ${this.scrollEventCount}`);
    console.log(`- Average FPS: ${this.metrics.averageScrollFPS?.toFixed(1)}`);
    console.log(`- Min FPS: ${this.metrics.minScrollFPS}`);
    console.log(`- Max FPS: ${this.metrics.maxScrollFPS}`);
  }

  /**
   * Complete the audit and return results
   */
  completeAudit(): PerformanceMetrics {
    console.log('✅ Completing performance audit...');
    this.isRunning = false;

    // Calculate final metrics
    this.metrics.idleFPS = [...this.fpsHistory];
    this.metrics.averageIdleFPS = this.calculateAverage(this.fpsHistory);
    this.metrics.frameDrops = this.frameDrops;

    // Get Core Web Vitals
    this.getCoreWebVitals();

    const finalMetrics = this.metrics as PerformanceMetrics;

    // Performance assessment
    const scrollFPS = finalMetrics.averageScrollFPS || 0;
    const performanceGrade = scrollFPS >= 60 ? '🟢 EXCELLENT' :
                           scrollFPS >= 50 ? '🟡 GOOD' :
                           scrollFPS >= 40 ? '🟠 FAIR' : '🔴 POOR';

    const passes60fps = scrollFPS >= 60;
    const targetStatus = passes60fps ? '✅ PASSES 60fps TARGET' : '❌ FAILS 60fps TARGET';

    console.log('🏆 Final Performance Audit Results:');
    console.log('='.repeat(60));
    console.log(`🌐 Browser: ${finalMetrics.browserInfo?.isSafari ? '🍎 Safari' : '🔵 Chrome'} ${finalMetrics.browserInfo?.isMobile ? '📱 Mobile' : '🖥️ Desktop'}`);
    console.log(`📊 Performance Grade: ${performanceGrade}`);
    console.log(`🎯 60fps Target: ${targetStatus}`);
    console.log('');
    console.log('📈 SCROLL PERFORMANCE (CRITICAL):');
    console.log(`   Average FPS: ${finalMetrics.averageScrollFPS?.toFixed(1)} fps`);
    console.log(`   Min FPS: ${finalMetrics.minScrollFPS} fps`);
    console.log(`   Max FPS: ${finalMetrics.maxScrollFPS} fps`);
    console.log(`   Frame Drops: ${finalMetrics.frameDrops} (${((finalMetrics.frameDrops / (finalMetrics.scrollFPS?.length || 1)) * 100).toFixed(1)}%)`);
    console.log('');
    console.log('⚡ GENERAL PERFORMANCE:');
    console.log(`   App Load Time: ${finalMetrics.appLoadTime?.toFixed(2)}ms`);
    console.log(`   Idle FPS: ${finalMetrics.averageIdleFPS?.toFixed(1)} fps`);
    console.log(`   FCP: ${finalMetrics.firstContentfulPaint?.toFixed(2)}ms`);
    console.log(`   LCP: ${finalMetrics.largestContentfulPaint?.toFixed(2)}ms`);
    console.log('');
    console.log('🔄 SCROLL DETAILS:');
    console.log(`   Duration: ${finalMetrics.scrollDuration?.toFixed(2)}ms`);
    console.log(`   Distance: ${finalMetrics.scrollDistance}px`);
    console.log(`   Events: ${finalMetrics.scrollEventCount}`);
    console.log(`   Speed: ${((finalMetrics.scrollDistance || 0) / (finalMetrics.scrollDuration || 1) * 1000).toFixed(0)}px/s`);
    console.log('');
    console.log('🎨 BROWSER FEATURES:');
    console.log(`   Backdrop Filter: ${finalMetrics.featureSupport?.backdropFilter ? '✅' : '❌'}`);
    console.log(`   Text Balance: ${finalMetrics.featureSupport?.textBalance ? '✅' : '❌'}`);
    console.log(`   Container Queries: ${finalMetrics.featureSupport?.containerQueries ? '✅' : '❌'}`);
    console.log(`   3D Transforms: ${finalMetrics.featureSupport?.transforms3D ? '✅' : '❌'}`);
    console.log('='.repeat(60));

    // Store results globally for manual inspection
    (window as any).performanceAuditResults = finalMetrics;

    return finalMetrics;
  }

  private initializeBrowserInfo(): void {
    const userAgent = navigator.userAgent;
    this.metrics.browserInfo = {
      userAgent,
      isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
      isChrome: /Chrome/.test(userAgent),
      isMobile: /iPhone|iPad|iPod|Android/i.test(userAgent),
      devicePixelRatio: window.devicePixelRatio,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }

  private initializeFeatureDetection(): void {
    this.metrics.featureSupport = {
      backdropFilter: CSS.supports('backdrop-filter: blur(1px)'),
      contentVisibility: CSS.supports('content-visibility: auto'),
      textBalance: CSS.supports('text-wrap: balance'),
      transforms3D: CSS.supports('transform: perspective(1px)'),
      willChange: CSS.supports('will-change: transform'),
      containerQueries: CSS.supports('container-type: inline-size')
    };
  }

  private setupPerformanceObservers(): void {
    // Observe long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          const longTasks = list.getEntries().length;
          this.metrics.performanceObservations = {
            ...this.metrics.performanceObservations,
            longTasks: (this.metrics.performanceObservations?.longTasks || 0) + longTasks
          };
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });

        // Observe layout shifts
        const clsObserver = new PerformanceObserver((list) => {
          const shifts = list.getEntries().length;
          this.metrics.performanceObservations = {
            ...this.metrics.performanceObservations,
            layoutShifts: (this.metrics.performanceObservations?.layoutShifts || 0) + shifts
          };
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Performance observers not fully supported');
      }
    }
  }

  private startFPSMonitoring(): void {
    const measureFPS = (timestamp: number) => {
      if (!this.isRunning) return;

      if (this.lastFrameTime > 0) {
        const frameTime = timestamp - this.lastFrameTime;
        const fps = Math.round(1000 / frameTime);

        // Track frame drops (fps < 55 considered a drop)
        if (fps < 55) {
          this.frameDrops++;
        }

        if (this.isScrolling) {
          this.scrollFPSHistory.push(fps);
        } else {
          this.fpsHistory.push(fps);
        }
      }

      this.lastFrameTime = timestamp;
      this.frameCount++;

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  private getCoreWebVitals(): void {
    // Get navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.appLoadTime = navigation.loadEventEnd - navigation.fetchStart;
    }

    // Get paint timing
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        this.metrics.firstContentfulPaint = entry.startTime;
      }
    });

    // Try to get LCP if available
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            this.metrics.largestContentfulPaint = entries[entries.length - 1].startTime;
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }
    }
  }

  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }
}

// Global auditor instance
let globalAuditor: PerformanceAuditor | null = null;

/**
 * Initialize the performance auditor
 */
export const initializePerformanceAudit = (): PerformanceAuditor => {
  if (!globalAuditor) {
    globalAuditor = new PerformanceAuditor();
  }
  return globalAuditor;
};

/**
 * Automated audit sequence as requested:
 * 1. App loads
 * 2. Wait 5 seconds
 * 3. Scroll to bottom
 * 4. Wait 1 second
 * 5. Complete audit
 */
export const runAutomatedAudit = async (): Promise<PerformanceMetrics> => {
  console.log('🤖 Starting Automated Performance Audit Sequence...');

  const auditor = initializePerformanceAudit();
  auditor.startAudit();

  // Step 1: App loads (already happening)
  console.log('⏳ Step 1: App loaded, waiting 5 seconds...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Step 2: Start scroll test
  console.log('⏳ Step 2: Starting scroll to bottom...');
  auditor.startScrollTest();

  // Scroll to bottom smoothly
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const startScroll = performance.now();
  const scrollDuration = 2000; // 2 seconds to scroll

  const smoothScroll = () => {
    const elapsed = performance.now() - startScroll;
    const progress = Math.min(elapsed / scrollDuration, 1);
    const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI); // Smooth easing

    window.scrollTo(0, scrollHeight * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(smoothScroll);
    }
  };

  smoothScroll();

  // Wait for scroll to complete
  await new Promise(resolve => setTimeout(resolve, scrollDuration + 100));

  // Step 3: End scroll test
  auditor.endScrollTest();

  // Step 4: Wait 1 second
  console.log('⏳ Step 3: Scroll complete, waiting 1 second...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Step 5: Complete audit
  console.log('⏳ Step 4: Completing audit...');
  const results = auditor.completeAudit();

  console.log('🎉 Automated audit sequence complete!');
  return results;
};

// Make functions available globally for manual triggering
(window as any).PerformanceAudit = {
  initialize: initializePerformanceAudit,
  runAutomated: runAutomatedAudit
};