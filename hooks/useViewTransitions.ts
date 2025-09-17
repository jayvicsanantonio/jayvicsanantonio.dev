// React hook for View Transitions API with Safari fallbacks
// Provides consistent animation experience across all browsers

'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  isBrowser,
  safeViewTransition,
  supportsViewTransitions,
} from '@/lib/utils/viewTransitions';

interface UseViewTransitionsReturn {
  /** Whether View Transitions API is supported */
  isSupported: boolean;
  /** Whether currently in a view transition */
  isTransitioning: boolean;
  /** Safely execute a view transition with fallback */
  startTransition: (updateCallback: () => void | Promise<void>) => Promise<void>;
}

/**
 * Hook for managing View Transitions with Safari fallbacks
 * @returns {UseViewTransitionsReturn} View transition utilities
 */
export function useViewTransitions(): UseViewTransitionsReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isBrowser()) {
      setIsSupported(supportsViewTransitions());
    }
  }, []);

  const startTransition = useCallback(async (updateCallback: () => void | Promise<void>) => {
    setIsTransitioning(true);

    try {
      await safeViewTransition(updateCallback);
    } finally {
      setIsTransitioning(false);
    }
  }, []);

  return {
    isSupported,
    isTransitioning,
    startTransition,
  };
}
