'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import AnimatedText from '@/components/ui/AnimatedText';

export type MorphingVideoProps = {
  centerTop: string;
  isIntro: boolean;
  initialPill: boolean;
  isExpanding: boolean;
  isScrolling?: boolean; // used to simplify clip-path on Safari while scrolling
  showTitleGroup: boolean;
  showDesc: boolean;
  shouldPlayVideo: boolean;
  containerRadius: string;
  video: { playbackRate: number; scale: number; preload: 'auto' | 'metadata' | 'none' };
};

export default function MorphingVideo({
  centerTop,
  isIntro,
  initialPill,
  isExpanding,
  isScrolling = false,
  showTitleGroup,
  showDesc,
  shouldPlayVideo,
  containerRadius,
  video,
}: MorphingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);

  // Browser detection (hydration-safe) for Safari-specific handling
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsSafari(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
    }
  }, []);

  // Stage control for backdrop-filter: disable during heavy transforms, enable after
  const [enableBackdrop, setEnableBackdrop] = useState(!isExpanding);
  useEffect(() => {
    if (isExpanding) {
      // During expansion, prefer no backdrop-filter (especially for Safari)
      setEnableBackdrop(false);
      const t = window.setTimeout(() => setEnableBackdrop(true), 1800);
      return () => window.clearTimeout(t);
    }
    setEnableBackdrop(true);
  }, [isExpanding]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = video.playbackRate;
      videoRef.current.muted = true;
    }
  }, [video.playbackRate]);

  useEffect(() => {
    let active = true;
    if (typeof window !== 'undefined') {
      fetch('/matrix-horizontal.mp4', { method: 'HEAD' })
        .then((res) => {
          if (!active) return;
          setHasVideo(res.ok);
        })
        .catch(() => {
          if (!active) return;
          setHasVideo(false);
        });
    }
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldPlayVideo]);

  type CSSVars = React.CSSProperties & Record<'--intro-scale' | '--bg-a' | '--shadow-a', string>;

  // Compute backdrop-filter value without animating the property
  const computedBackdrop = (() => {
    // Safari: never apply backdrop-filter during expansion
    if (isSafari && isExpanding) return 'none';
    // Safari: force-disable backdrop-filter during active scrolling
    if (isSafari && isScrolling) return 'none';
    if (!enableBackdrop) return 'none';
    if (isIntro && !initialPill) return 'blur(20px)';
    if (isIntro) return 'blur(0px)';
    // Post-intro: keep the dynamic effect but without animating the property
    return 'blur(calc(max(0, (var(--p, 0) - 0.7) * 3) * 20px))';
  })();

  const containerStyle: CSSVars = {
    top: centerTop,
    left: '50%',
    '--intro-scale': String(isIntro ? (initialPill ? 0.14 : 1) : 1),
    transform: 'translate(-50%, -50%) scale(var(--intro-scale))',
    width: 'min(96vw, 96svw)',
    height: 'min(86svh, 86vh)',
    borderRadius: isSafari && isScrolling ? '24px' : containerRadius,
    border: 'none',
    willChange: isExpanding ? 'transform, opacity, clip-path' : undefined,
    transformOrigin: '50% 50%',
    transition: isExpanding
      ? 'top 0.4s ease-out, transform 2s cubic-bezier(0.22, 1, 0.36, 1), border-radius 2s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s ease-out, box-shadow 0.5s ease-out, clip-path 0.6s ease-out'
      : 'top 0.4s ease-out, border-radius 0s, background-color 0.5s ease-out, box-shadow 0.5s ease-out, clip-path 0.3s ease-out',
    '--bg-a': isIntro ? '0.95' : 'calc(max(0, (var(--p, 0) - 0.7) * 3) * 0.95)',
    '--shadow-a': isIntro ? '0.25' : 'calc(max(0, (var(--p, 0) - 0.7) * 3) * 0.25)',
    backgroundColor: initialPill
      ? 'transparent'
      : isSafari && isScrolling
        // Freeze to a stable value during scroll (reduces per-frame paint churn)
        ? 'rgba(255, 255, 255, 0.42)'
        : 'rgba(255, 255, 255, var(--bg-a))',
    backdropFilter: computedBackdrop,
    WebkitBackdropFilter: computedBackdrop as unknown as string,
    boxShadow: initialPill
      ? 'none'
      : isSafari && isScrolling
        ? 'none'
        : '0 25px 50px -12px rgba(0, 0, 0, var(--shadow-a))',
    // Simplify clip-path on Safari while actively scrolling; otherwise use original
    clipPath:
      isSafari && isScrolling
        ? undefined
        : 'inset(calc(var(--sh, 0) * var(--closeMaxY, 0)) calc(var(--sh, 0) * var(--closeMaxX, 0)) calc(var(--sh, 0) * var(--closeMaxY, 0)) calc(var(--sh, 0) * var(--closeMaxX, 0)) round calc(24px + var(--sh, 0) * 360px))',
  };

  // Precompute visibility flags to avoid nested JSX conditionals
  const showFallbackBg = !hasVideo && !(isSafari && isScrolling);
  const showOverlayGradient = !(isSafari && isScrolling);

  return (
    <div
      className="fixed z-30 flex items-center justify-center overflow-hidden glass-optimized"
      style={containerStyle}
    >
      {/* Titles */}
      <div
        className="absolute bottom-40 left-1/2 z-50 -translate-x-1/2 text-center px-4 transition-opacity duration-700 sm:bottom-40 sm:right-8 sm:left-auto sm:translate-x-0 sm:px-0 md:right-10 md:bottom-22"
        style={{ opacity: showTitleGroup ? 1 : 0 }}
      >
        <h2 className="text-lg font-medium tracking-widest text-white text-balance sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl">
          <AnimatedText text="Full-Stack" start={showTitleGroup} perCharDelay={45} />
        </h2>
      </div>
      <div
        className="absolute bottom-28 left-1/2 z-50 -translate-x-1/2 text-center px-4 transition-opacity duration-700 sm:bottom-10 sm:right-8 sm:left-auto sm:translate-x-0 sm:px-0 md:right-10 md:bottom-10"
        style={{ opacity: showTitleGroup ? 1 : 0 }}
      >
        <h3 className="text-lg font-light tracking-wider text-white/90 italic text-balance sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl">
          <AnimatedText
            text="Software Engineer"
            start={showTitleGroup}
            perCharDelay={60}
            baseDelay={240}
          />
        </h3>
      </div>

      {/* Description */}
      <div
        className="absolute top-6 left-1/2 z-50 max-w-[20rem] -translate-x-1/2 text-center px-4 transition-opacity duration-700 sm:top-auto sm:bottom-32 sm:left-8 sm:max-w-[22rem] sm:translate-x-0 sm:text-left sm:px-0 md:bottom-10 md:left-10"
        style={{ opacity: showDesc ? 1 : 0 }}
      >
        <p className="mb-2 text-sm leading-relaxed text-white/80 text-balance md:text-base">
          I experiment with AI daily—and build web platforms that put it to work.
        </p>
      </div>

      {/* Video / Fallback */}
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          borderRadius: 'calc(24px + 360px * var(--sh, 0))',
          opacity: isIntro ? 0 : 1,
          transition: 'opacity 0.8s ease-out',
        }}
      >
        {hasVideo && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload={video.preload}
            aria-hidden
            tabIndex={-1}
            onError={() => setHasVideo(false)}
            className="h-full w-full object-cover"
            style={{
              willChange: 'opacity, transform',
              transform: `scale(${video.scale})`,
            }}
          >
            <source src="/matrix-horizontal.mp4" type="video/mp4" />
          </video>
        )}
        {showFallbackBg && (
          <div
            aria-hidden
            className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_0%,rgba(59,130,246,0.20),transparent_60%),radial-gradient(60%_50%_at_50%_100%,rgba(168,85,247,0.16),transparent_60%)]"
            style={{ transform: `scale(${video.scale})` }}
          />
        )}
        {/* Remove inner overlay gradient completely while scrolling in Safari */}
        {showOverlayGradient ? (
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"
            style={{ opacity: isIntro ? 0 : 1 }}
          />
        ) : null}

        {/* Watermark cover */}
        <div className="absolute right-0 bottom-0 h-12 w-20 bg-gradient-to-tl from-black via-black/80 to-transparent" />
      </div>
    </div>
  );
}
