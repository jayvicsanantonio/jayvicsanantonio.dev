// Performance monitoring utilities for Safari animation validation
import { getBrowserCapabilities } from './browserUtils';

export interface PerformanceMetrics {
  fps: number;
  frameDrops: number;
  averageFrameTime: number;
  isPerformant: boolean;
  browser: string;
}

/**
 * Monitor FPS during animations and scroll events
 */
export class PerformanceMonitor {
  private frames: number[] = [];
  private lastTime = 0;
  private animationId: number | null = null;
  private isMonitoring = false;
  private capabilities = getBrowserCapabilities();

  private onFrame = (timestamp: number) => {
    if (this.lastTime > 0) {
      const frameTime = timestamp - this.lastTime;
      this.frames.push(frameTime);

      // Keep only last 60 frames for moving average
      if (this.frames.length > 60) {
        this.frames.shift();
      }
    }

    this.lastTime = timestamp;

    if (this.isMonitoring) {
      this.animationId = requestAnimationFrame(this.onFrame);
    }
  };

  start(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.frames = [];
    this.lastTime = 0;
    this.animationId = requestAnimationFrame(this.onFrame);
  }

  stop(): PerformanceMetrics {
    this.isMonitoring = false;

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    return this.getMetrics();
  }

  getMetrics(): PerformanceMetrics {
    if (this.frames.length === 0) {
      return {
        fps: 0,
        frameDrops: 0,
        averageFrameTime: 0,
        isPerformant: false,
        browser: this.capabilities.isSafari ? 'Safari' : 'Chrome',
      };
    }

    const averageFrameTime = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
    const fps = Math.round(1000 / averageFrameTime);

    // Count frames that took longer than 16.67ms (60fps threshold)
    const frameDrops = this.frames.filter((time) => time > 16.67).length;

    // Consider performance good if FPS > 55 and frame drops < 10%
    const isPerformant = fps > 55 && frameDrops / this.frames.length < 0.1;

    return {
      fps,
      frameDrops,
      averageFrameTime,
      isPerformant,
      browser: this.capabilities.isSafari ? 'Safari' : 'Chrome',
    };
  }

  getInstantFPS(): number {
    if (this.frames.length < 2) return 0;

    const lastFrame = this.frames[this.frames.length - 1];
    return lastFrame ? Math.round(1000 / lastFrame) : 0;
  }
}

/**
 * Scroll performance monitoring hook
 */
export const useScrollPerformanceMonitor = () => {
  const monitor = new PerformanceMonitor();
  let scrolling = false;
  let scrollTimeout: number;

  const startMonitoring = () => {
    if (!scrolling) {
      scrolling = true;
      monitor.start();
    }
  };

  const stopMonitoring = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(() => {
      if (scrolling) {
        scrolling = false;
        const metrics = monitor.stop();

        // Log performance metrics for debugging
        if (typeof window !== 'undefined' && window.console) {
          console.log('Scroll Performance Metrics:', metrics);

          if (!metrics.isPerformant) {
            console.warn(
              `Performance warning: ${metrics.fps}fps detected during scroll in ${metrics.browser}. ` +
                `Frame drops: ${metrics.frameDrops}/${monitor.getMetrics().frameDrops}`,
            );
          }
        }
      }
    }, 150);
  };

  return {
    startMonitoring,
    stopMonitoring,
    getMetrics: () => monitor.getMetrics(),
    getInstantFPS: () => monitor.getInstantFPS(),
  };
};

/**
 * Component performance validation utility
 */
export const validateComponentPerformance = async (
  componentName: string,
  testDuration: number = 3000,
): Promise<PerformanceMetrics> => {
  return new Promise((resolve) => {
    const monitor = new PerformanceMonitor();
    monitor.start();

    setTimeout(() => {
      const metrics = monitor.stop();

      console.log(`Performance validation for ${componentName}:`, metrics);

      if (!metrics.isPerformant) {
        console.warn(`${componentName} performance below 60fps target: ${metrics.fps}fps`);
      } else {
        console.log(`✅ ${componentName} meets 60fps performance target: ${metrics.fps}fps`);
      }

      resolve(metrics);
    }, testDuration);
  });
};

/**
 * Safari-specific performance recommendations
 */
export const getSafariPerformanceRecommendations = (metrics: PerformanceMetrics): string[] => {
  const recommendations: string[] = [];
  const capabilities = getBrowserCapabilities();

  if (!capabilities.isSafari) {
    return ['Not applicable - browser is not Safari'];
  }

  if (metrics.fps < 60) {
    recommendations.push('Consider reducing backdrop-filter intensity during animations');
    recommendations.push('Simplify 3D transforms to 2D transforms');
    recommendations.push('Add will-change properties to animating elements');
  }

  if (metrics.frameDrops > metrics.fps * 0.1) {
    recommendations.push('Disable complex animations during scroll events');
    recommendations.push('Use transform3d(0,0,0) to force GPU compositing');
    recommendations.push('Batch DOM updates using requestAnimationFrame');
  }

  if (metrics.averageFrameTime > 20) {
    recommendations.push('Optimize CSS selectors and reduce nesting');
    recommendations.push('Consider using CSS containment for isolated components');
    recommendations.push('Remove or reduce filter effects (blur, brightness, etc.)');
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ Performance is optimal for Safari');
  }

  return recommendations;
};
