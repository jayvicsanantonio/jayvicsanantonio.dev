// Safari-specific video playback optimization utilities
// Handles iOS Safari autoplay policies, video attributes, and performance optimizations

import { getBrowserCapabilities } from './browserUtils';
import { getIOSCapabilities } from './iosSafariUtils';

export interface SafariVideoConfig {
  autoplay: boolean;
  muted: boolean;
  playsInline: boolean;
  preload: 'none' | 'metadata' | 'auto';
  disablePictureInPicture: boolean;
  controls: boolean;
  loop: boolean;
}

/**
 * Gets Safari-optimized video attributes
 */
export const getSafariVideoConfig = (baseConfig: Partial<SafariVideoConfig> = {}): SafariVideoConfig => {
  const capabilities = getBrowserCapabilities();
  const iosCapabilities = getIOSCapabilities();

  const defaults: SafariVideoConfig = {
    autoplay: true,
    muted: true,
    playsInline: true,
    preload: 'metadata',
    disablePictureInPicture: true,
    controls: false,
    loop: true,
  };

  // Safari-specific optimizations
  if (capabilities.isSafari) {
    return {
      ...defaults,
      ...baseConfig,
      // Always require muted for autoplay in Safari
      muted: baseConfig.autoplay !== false ? true : (baseConfig.muted ?? defaults.muted),
      // Always use playsInline for iOS Safari
      playsInline: iosCapabilities.isIOSSafari ? true : (baseConfig.playsInline ?? defaults.playsInline),
      // Conservative preloading on mobile for bandwidth
      preload: iosCapabilities.isIOSSafari ? 'metadata' : (baseConfig.preload ?? defaults.preload),
      // Disable PiP to prevent iOS Safari complications
      disablePictureInPicture: iosCapabilities.isIOSSafari ? true : (baseConfig.disablePictureInPicture ?? defaults.disablePictureInPicture),
    };
  }

  return { ...defaults, ...baseConfig };
};

/**
 * Gets video attributes as React props object
 */
export const getSafariVideoProps = (baseConfig: Partial<SafariVideoConfig> = {}) => {
  const config = getSafariVideoConfig(baseConfig);

  return {
    autoPlay: config.autoplay,
    muted: config.muted,
    playsInline: config.playsInline,
    preload: config.preload,
    disablePictureInPicture: config.disablePictureInPicture,
    controls: config.controls,
    loop: config.loop,
    // Safari-specific attributes (as strings for React)
    'webkit-playsinline': config.playsInline ? 'true' : 'false', // Legacy iOS Safari
    'data-safari-optimized': 'true',
  };
};

/**
 * Optimizes video element for Safari after mounting
 */
export const optimizeVideoForSafari = (videoElement: HTMLVideoElement): void => {
  const capabilities = getBrowserCapabilities();
  const iosCapabilities = getIOSCapabilities();

  if (!capabilities.isSafari) return;

  // Ensure muted for autoplay
  if (videoElement.autoplay) {
    videoElement.muted = true;
  }

  // iOS Safari specific optimizations
  if (iosCapabilities.isIOSSafari) {
    // Ensure playsInline is set
    videoElement.playsInline = true;
    videoElement.setAttribute('webkit-playsinline', '');

    // Disable Picture-in-Picture
    videoElement.disablePictureInPicture = true;

    // Add touch optimization
    videoElement.style.touchAction = 'none';

    // Prevent context menu on video
    videoElement.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // Safari performance optimizations
  videoElement.style.willChange = 'auto'; // Avoid excessive compositing
  videoElement.style.objectFit = 'cover';
  videoElement.style.objectPosition = 'center';
};

/**
 * React hook for Safari video optimization
 */
export const useSafariVideoOptimization = (
  videoRef: React.RefObject<HTMLVideoElement>,
  config: Partial<SafariVideoConfig> = {}
) => {
  const capabilities = getBrowserCapabilities();
  const iosCapabilities = getIOSCapabilities();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [canAutoplay, setCanAutoplay] = React.useState(false);

  // Get optimized video props
  const videoProps = React.useMemo(() => getSafariVideoProps(config), [config]);

  // Apply Safari optimizations after mount
  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    optimizeVideoForSafari(videoElement);

    // Test autoplay capability
    const testAutoplay = async () => {
      if (!capabilities.isSafari) {
        setCanAutoplay(true);
        return;
      }

      try {
        // Test if autoplay is allowed
        await videoElement.play();
        setCanAutoplay(true);
      } catch (error) {
        // Autoplay blocked - this is expected in Safari without user interaction
        setCanAutoplay(false);
        console.log('Autoplay prevented by Safari policy:', error);
      }
    };

    // Handle load events
    const handleLoadedData = () => setIsLoaded(true);
    const handleError = () => {
      setIsLoaded(false);
      setCanAutoplay(false);
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    // Test autoplay after a short delay
    setTimeout(testAutoplay, 100);

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, [capabilities.isSafari, videoRef]);

  // Handle user interaction to enable autoplay
  const enableAutoplay = React.useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement || canAutoplay) return;

    try {
      await videoElement.play();
      setCanAutoplay(true);
    } catch (error) {
      console.warn('Failed to start video playback:', error);
    }
  }, [canAutoplay, videoRef]);

  return {
    videoProps,
    isLoaded,
    canAutoplay,
    isSafari: capabilities.isSafari,
    isIOSSafari: iosCapabilities.isIOSSafari,
    enableAutoplay,
  };
};

/**
 * Creates a Safari-compatible video loading strategy
 */
export const createSafariVideoLoader = (videoSrc: string) => {
  const capabilities = getBrowserCapabilities();

  return {
    src: videoSrc,
    // Preload strategy based on browser
    preload: capabilities.isMobile ? 'metadata' : 'auto',
    // Loading attribute for modern browsers
    loading: 'lazy' as const,
  };
};

// React import
import React from 'react';