'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AnimatedTextProps {
  text: string;
  start: boolean;
  perCharDelay?: number; // ms delay between letters
  baseDelay?: number; // ms delay before first letter
  className?: string;
  onComplete?: () => void;
}

function AnimatedText({
  text,
  start,
  perCharDelay = 40,
  baseDelay = 0,
  className,
  onComplete,
}: AnimatedTextProps) {
  const letters = Array.from(text);

  // Fire onComplete after the last letter finishes its transition
  useEffect(() => {
    if (!start) return;
    const total =
      baseDelay + (letters.length - 1) * perCharDelay + 500; // 500ms ~ transition duration
    const t = window.setTimeout(() => onComplete?.(), total);
    return () => window.clearTimeout(t);
  }, [start, baseDelay, perCharDelay, letters.length, onComplete]);

  return (
    <span
      aria-label={text}
      className={className}
      style={{ display: 'inline-block', whiteSpace: 'pre' }}
    >
      {letters.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity, filter',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '500ms, 500ms, 700ms',
            transitionTimingFunction:
              'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: `${baseDelay + i * perCharDelay}ms`,
            opacity: start ? 1 : 0,
            transform: start
              ? 'translateY(0) scale(1)'
              : 'translateY(12px) scale(1.02)',
            filter: start ? 'blur(0px)' : 'blur(2px)',
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const prevOverflowRef = useRef<{
    html: string;
    body: string;
  } | null>(null);
  // CSS-variable scroll state (no React renders on scroll)
  const [scrollY, setScrollY] = useState(0);
  // Intro sequencing
  const [initialPill, setInitialPill] = useState(true);
  const [showTitleGroup, setShowTitleGroup] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showName, setShowName] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      // Ensure autoplay policies are satisfied and video begins loading
      videoRef.current.muted = true;
      // @ts-expect-error - playsInline is supported in browsers
      videoRef.current.playsInline = true;
      // Kick off loading early so onLoadedData can fire without autoplay
      try {
        videoRef.current.load();
      } catch {}
    }

    // Scroll handling moved to CSS variable loop below to avoid React renders.
    return;
  }, []);

  // Intro sequencing independent of video readiness
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setInitialPill(true);
    const timers: number[] = [];

    // After a short delay, start a single smooth expansion.
    timers.push(
      window.setTimeout(() => {
        setInitialPill(false); // triggers CSS transition to final size
        setIsExpanding(true);
        timers.push(
          window.setTimeout(() => setIsExpanding(false), 2000)
        ); // match slower transition duration
      }, 800)
    );

    // Reveal other elements while expansion progresses
    timers.push(window.setTimeout(() => setShowName(true), 1000));
    timers.push(
      window.setTimeout(() => setShowTitleGroup(true), 3600)
    );
    timers.push(window.setTimeout(() => setShowDesc(true), 3200));

    // Set up CSS variable based scroll loop (no React renders on scroll)
    const root = containerRef.current;
    if (root) {
      let raf = 0;
      const MAX = 1800;
      const update = () => {
        const y = window.scrollY;
        const vh = window.innerHeight || 1;
        const p = Math.min(y / MAX, 1);
        const pf = Math.min(p * 1.8, 1); // accelerated progress for faster shrink
        const ps = Math.min(y / (vh * 0.10), 1); // progress to 10% viewport height

        // New: shutter progress variables
        const START = 120; // px where shutter begins
        const LENGTH = 900; // px to fully close
        const sh = Math.min(Math.max((y - START) / LENGTH, 0), 1);
        const gate = Math.min(Math.max((sh - 0.45) / 0.55, 0), 1); // gate from 0 at sh=0.45 to 1 at sh=1
        const yn = vh ? y / vh : 0; // normalized scroll in viewport heights
        const brandUp = 1.6 * yn * gate; // normalized upward travel (0..)
        const ctaUp = 1.2 * yn * gate;

        root.style.setProperty('--scroll-y', String(y));
        root.style.setProperty('--p', String(p));
        root.style.setProperty('--pf', String(pf));
        root.style.setProperty('--ps', String(ps));
        root.style.setProperty('--vh', String(vh));
        root.style.setProperty('--sh', String(sh));
        root.style.setProperty('--gate', String(gate));
        root.style.setProperty('--brand-up', String(brandUp));
        root.style.setProperty('--cta-up', String(ctaUp));
        // Final opening size targets (tweak to taste)
        root.style.setProperty('--closeMaxY', '34vh');
        root.style.setProperty('--closeMaxX', '42vw');
        root.style.setProperty('--clip-r-add', '140px');
      };
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          update();
          raf = 0;
        });
      };
      const onResize = () => update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      update();
      timers.push(0); // sentinel
      const cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
      // store cleanup using a symbol id in timers (not used), return below
      return () => {
        cleanup();
        timers.forEach((t) => t && window.clearTimeout(t));
      };
    }

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  // After the pill finishes expanding, allow the video to play
  useEffect(() => {
    if (!initialPill && !isExpanding) {
      const t = window.setTimeout(
        () => setShouldPlayVideo(true),
        200
      ); // tiny grace after final step
      return () => window.clearTimeout(t);
    }
  }, [initialPill, isExpanding]);

  // When ready and allowed, start the video programmatically
  useEffect(() => {
    if (shouldPlayVideo && videoReady && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldPlayVideo, videoReady]);

  // IntersectionObserver logic removed (unused)

  // Intro continuous animation: start small and smoothly transition to final hero
  const isIntro = initialPill || isExpanding;
  const introScale = initialPill ? 0.14 : 1; // transform-based intro sizing (no width/height animation)
  const containerRadius = initialPill
    ? '9999px'
    : 'calc(24px + 240px * var(--pf, var(--p, 0)))'; // round faster with scroll

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-hidden bg-black"
    >
      {/* Morphing Video - transforms INTO navigation bar */}
      <div
        className="fixed z-30 overflow-hidden flex items-center justify-center"
        style={{
          top: '46%',
          left: '50%',
          '--intro-scale': String(introScale),
          transform: 'translate(-50%, -50%) scale(var(--intro-scale))',
          width: '96vw',
          height: '86vh',
          borderRadius: containerRadius,
          border: 'none',
          willChange: 'transform, opacity, filter, clip-path',
          transformOrigin: '50% 50%',
          transition: isExpanding
            ? 'top 0.4s ease-out, transform 2s cubic-bezier(0.22, 1, 0.36, 1), border-radius 2s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s ease-out, backdrop-filter 0.5s ease-out, box-shadow 0.5s ease-out, clip-path 0.6s ease-out'
            : 'top 0.4s ease-out, border-radius 0s, background-color 0.5s ease-out, backdrop-filter 0.5s ease-out, box-shadow 0.5s ease-out, clip-path 0.3s ease-out',
          '--bg-a': isIntro
            ? '0.95'
            : 'calc(max(0, (var(--p, 0) - 0.7) * 3) * 0.95)',
          '--shadow-a': isIntro
            ? '0.25'
            : 'calc(max(0, (var(--p, 0) - 0.7) * 3) * 0.25)',
          backgroundColor: initialPill
            ? 'transparent'
            : 'rgba(255, 255, 255, var(--bg-a))',
          backdropFilter:
            isIntro && !initialPill
              ? 'blur(20px)'
              : isIntro
              ? 'blur(0px)'
              : 'blur(calc(max(0, (var(--p, 0) - 0.7) * 3) * 20px))',
          boxShadow: initialPill
            ? 'none'
            : '0 25px 50px -12px rgba(0, 0, 0, var(--shadow-a))',
          // Box-like shutter that closes from all sides. Corners round more as it closes.
          clipPath:
            'inset(calc(var(--sh, 0) * var(--closeMaxY, 0)) calc(var(--sh, 0) * var(--closeMaxX, 0)) calc(var(--sh, 0) * var(--closeMaxY, 0)) calc(var(--sh, 0) * var(--closeMaxX, 0)) round calc(24px + var(--sh, 0) * var(--clip-r-add, 120px)))',
        }}
      >
        <div
          className="absolute sm:bottom-40 right-8 md:bottom-22 md:right-10 z-50 transition-opacity duration-700"
          style={{
            opacity: showTitleGroup ? 1 : 0,
          }}
        >
          <h3 className="text-lg md:text-3xl lg:text-4xl 2xl:text-6xl font-medium text-white tracking-widest">
            <AnimatedText
              text="Full-Stack"
              start={showTitleGroup}
              perCharDelay={45}
              onComplete={() => setShowSubtitle(true)}
            />
          </h3>
        </div>

        {/* "imagination" text - right side, positioned vertically */}
        <div
          className="absolute bottom-32 right-8 md:bottom-10 md:right-10 z-50 transition-opacity duration-700"
          style={{
            opacity: showTitleGroup ? 1 : 0,
          }}
        >
          <h4 className="text-lg md:text-3xl lg:text-4xl 2xl:text-5xl font-light text-white/90 tracking-wider italic">
            <AnimatedText
              text="Software Engineer"
              start={showTitleGroup}
              perCharDelay={60}
              baseDelay={240}
            />
          </h4>
        </div>

        {/* Description text - bottom left */}
        <div
          className="absolute bottom-32 left-8 md:bottom-10 md:left-10 max-w-80 z-50 transition-opacity duration-700"
          style={{
            opacity: showDesc ? 1 : 0,
          }}
        >
          <p className="text-sm md:text-base text-white/80 leading-relaxed mb-2">
            I experiment with AI daily—and build web platforms that
            put it to work.
          </p>
        </div>


        {/* The actual video that morphs */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius:
              'calc(24px + 240px * var(--pf, var(--p, 0)))',
            // Keep video hidden until intro completes, then fade it in and keep at full opacity
            opacity: isIntro ? 0 : 1,
            transition: 'opacity 0.8s ease-out',
          }}
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onCanPlayThrough={() => setVideoReady(true)}
            className="w-full h-full object-cover"
            style={{
              willChange: 'opacity, transform',
              transform: 'scale(1.05)', // Slight zoom to crop out watermark
            }}
          >
            <source src="/matrix-horizontal.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"
            style={{ opacity: isIntro ? 0 : 1 }}
          />

          {/* Watermark cover - covers bottom right corner */}
          <div className="absolute bottom-0 right-0 w-20 h-12 bg-gradient-to-tl from-black via-black/80 to-transparent"></div>
        </div>
      </div>

      {/* Initial pill overlay (decoupled from container transforms) */}
      {initialPill && (
        <div className="fixed z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div
            className="flex items-center gap-3 px-6 py-3"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '9999px',
              overflow: 'hidden',
              boxShadow:
                'inset 0 0 0 2px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.14)',
            }}
          >
            <Image
              src="/icon.svg"
              alt="Site icon"
              width={28}
              height={28}
            />
            <span className="hidden sm:inline text-sm md:text-base lg:text-lg font-semibold text-black tracking-wide">
              Jayvic San Antonio
            </span>
            <span className="inline sm:hidden text-[12px] font-semibold text-black tracking-wide">
              Jayvic
            </span>
          </div>
        </div>
      )}

      {/* Profile Image - Positioned like silhouette */}
      <div
        className="fixed isolate bottom-0 left-1/2 -translate-x-1/2 z-40"
        style={{
          opacity: initialPill ? 0 : 1,
          transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          className="relative w-[32rem] md:w-[60rem]"
          style={{
            height: 'calc(50rem - 10rem * var(--p))',
            transform:
              'scale(clamp(0.6, calc(1 - 0.4 * var(--p)), 1))',
            transformOrigin: '50% 100%',
          }}
        >
          <Image
            src="/images/me.png"
            alt="Jayvic San Antonio - Creative Developer"
            fill
            className="object-contain object-bottom"
            style={{
              willChange: 'filter',
              filter: `
                brightness(calc(0.9 + 0.3 * var(--p)))
                saturate(1.3)
                hue-rotate(12deg)
                drop-shadow(0 0 calc(20px + 40px * var(--p)) rgba(0, 139, 139, 0.35))
                drop-shadow(0 0 calc(60px + 120px * var(--p)) rgba(0, 139, 139, 0.18))
              `,
            }}
            priority
          />
        </div>
      </div>

      {/* Text Overlays - positioned around the video and person */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Name in pill - now outside shutter so it remains visible */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: initialPill ? 0 : 'max(0, calc((var(--p, 0) - 0.7) * 3))',
          }}
        >
          <div className="px-3">
            <div className="flex items-center gap-3">
              <Image src="/icon.svg" alt="Site icon" width={16} height={16} />
              {/* Short label on very small widths, full name from sm and up */}
              <span className="inline sm:hidden text-[10px] font-semibold text-black tracking-wide">Jayvic</span>
              <span className="hidden sm:inline text-xs md:text-sm lg:text-base font-semibold text-black tracking-wide">Jayvic San Antonio</span>
            </div>
          </div>
        </div>
        {/* Brand text - bottom left corner */}
        <div
          className="absolute bottom-4 left-16 transition-opacity duration-300"
          style={{
            // Fade starts immediately when upward motion begins; completes by ~35% vh of upward travel
            opacity: showName ? 'calc(1 - clamp(0, var(--brand-up, 0) / 0.35, 1))' : 0,
            // Move upward only after shutter reaches the large rounded box (~image reference)
            // Threshold tuned at ~0.45 of shutter progress; ramps to 1 by sh=1
            transform:
              'translateY(calc(-1.6 * var(--scroll-y, 0) * var(--gate, 0) * 1px))',
            willChange: 'opacity, transform',
          }}
        >
          <div className="text-white">
            <div className="text-lg md:text-3xl font-light tracking-wider">
              Jayvic
            </div>
            <div className="text-xs md:text-2xl font-bold tracking-[0.3em] uppercase">
              SAN ANTONIO
            </div>
          </div>
        </div>

        {/* Work Experience button - bottom right */}
        <div
          className="absolute bottom-8 right-16 pointer-events-auto transition-opacity duration-300"
          style={{
            // Fade starts immediately when upward motion begins; completes by ~35% vh of upward travel
            opacity: showName ? 'calc(1 - clamp(0, var(--cta-up, 0) / 0.35, 1))' : 0,
            // Move upward only after shutter reaches the large rounded box (~image reference)
            // Threshold tuned at ~0.45 of shutter progress; ramps to 1 by sh=1
            transform:
              'translateY(calc(-1.2 * var(--scroll-y, 0) * var(--gate, 0) * 1px))',
            willChange: 'opacity, transform',
          }}
        >
          <Link
            href="/work"
            className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 text-sm md:text-base"
          >
            Work Experience
          </Link>
        </div>
      </div>

      {/* Content sections with smooth transition from black to gray */}
      <div className="relative z-10 min-w-screen">
        {/* Smooth transition from black to gray */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-800 to-gray-200 h-[154rem]"></div>

        {/* Expanding person highlight effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80vw 60vh at 50% 100%, rgba(0,139,139,0.2) 0%, rgba(0,139,139,0.1) 40%, transparent 70%)',
            opacity: 'min(calc(var(--p, 0) * 2), 1)',
          }}
        />
        {/* Spacer section for scroll transition */}
        {/* <section className="h-screen"></section> */}
        {/* About Section */}
        <section className="min-h-[154rem] flex flex-col items-center justify-center px-4 py-20"></section>
      </div>
    </div>
  );
}
