import { useAnimationControls, AnimationControls } from 'framer-motion';
import { useCallback } from 'react';

import usePrefersReducedMotion from './usePrefersReducedMotion';

interface BoopConfig {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    stiffness: 300,
    damping: 10,
    mass: 1,
  },
}: BoopConfig): [AnimationControls, () => void] {
  const prefersReducedMotion = usePrefersReducedMotion();
  const controls = useAnimationControls();

  const trigger = useCallback(() => {
    if (prefersReducedMotion) {
      return;
    }
    controls.start({
      x,
      y,
      rotate: rotation,
      scale,
      transition: {
        type: 'spring',
        ...springConfig,
        duration: timing / 1000, // Framer Motion uses seconds
      },
    });
    // Reset after the animation duration
    setTimeout(() => {
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: {
          type: 'spring',
          ...springConfig,
          duration: timing / 1000,
        },
      });
    }, timing);
  }, [controls, x, y, rotation, scale, timing, springConfig, prefersReducedMotion]);

  // Return controls instead of style. Initial state is handled by motion component.
  return [controls, trigger];
}

export default useBoop;
