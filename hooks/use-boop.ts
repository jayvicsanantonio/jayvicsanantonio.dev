import { useCallback } from 'react';
import {
  useAnimationControls,
  AnimationControls,
} from 'framer-motion';
import usePrefersReducedMotion from './use-prefers-reduced-motion';

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
  scale = 1.1, // Default scale slightly larger for a noticeable boop
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
      transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
      transition: {
        type: 'spring',
        ...springConfig,
        duration: timing / 1000, // Framer Motion uses seconds
      },
    });
    // Reset after the animation duration
    setTimeout(() => {
      controls.start({
        transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
        transition: {
          type: 'spring',
          ...springConfig,
          duration: timing / 1000,
        },
      });
    }, timing);
  }, [
    controls,
    x,
    y,
    rotation,
    scale,
    timing,
    springConfig,
    prefersReducedMotion,
  ]);

  // Return controls instead of style. Initial state is handled by motion component.
  return [controls, trigger];
}

export default useBoop;
