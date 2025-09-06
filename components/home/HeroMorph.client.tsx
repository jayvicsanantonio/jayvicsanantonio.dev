'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import NavButton from '@/components/home/NavButton';
import AnimatedText from '@/components/ui/AnimatedText';
import { GlassButton } from '@/components/ui/GlassButton';
import { useIntroSequence } from '@/hooks/home/useIntroSequence';
import { useScrollCssVariables } from '@/hooks/home/useScrollCssVariables';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

/*
  CSS variable contract used by HeroMorph
  --------------------------------------------------
  --scroll-y: current window.scrollY in px
  --vh: viewport height in px
  --p: normalized scroll progress (0..1) based on CFG.scroll.max
  --sh: shutter progress (0..1) based on CFG.scroll.shutterStartPx + length
  --gate: motion gate (0..1) used to gate some transforms
  --overlay-up: normalized upward translation factor for overlay text
  --cyan: opacity of cyan overlay (0..1)
  --ui: reveal progress of UI/nav (0..1)
  --closeMaxX / --closeMaxY: target inset distances for clipPath closing
*/
const CFG = {
  timings: {
    introStartDelay: 800,
    introExpansionDuration: 2000,
    reveal: {
      name: 1000,
      title: 3600,
      desc: 3200,
    },
    graceAfterExpandMs: 200,
  },
  scroll: {
    max: 1800,
    shutterStartPx: 120,
    shutterLengthPx: 900,
    cyanStartT: 0.45, // begins to fade in around 45% shutter
    uiRevealStartT: 0.95, // UI reveals near closed
  },
  closeMaxY: '39vh',
  closeMaxX: '38vw',
  overlayUpDampen: 0.35,
  video: {
    playbackRate: 0.75,
    scale: 1.05,
    preload: 'metadata' as const,
  },
  nav: {
    centerTop: '46%',
    buttonSize: { w: 84, h: 72 },
    leftOffsetsPx: { projects: 54, linkedin: 150 },
    rightOffsetsPx: { work: 54, github: 150 },
  },
} as const;

export default function HeroMorph() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intro/scroll states
  const { initialPill, showTitleGroup, showDesc, showName, isExpanding, shouldPlayVideo } =
    useIntroSequence(CFG);
  const reduceMotion = usePrefersReducedMotion();
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = CFG.video.playbackRate;
      videoRef.current.muted = true;
      // With preload=metadata, we rely on the later play() call to initiate fetching.
    }
    return;
  }, []);

  // Check if hero video asset exists; if not, fall back gracefully
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

  // Scroll-driven CSS variables (no React renders on scroll)
  useScrollCssVariables(
    containerRef,
    {
      scroll: CFG.scroll,
      closeMaxX: 'calc((96vw - var(--nav-row-w, 20vw)) / 2)',
      closeMaxY: 'calc((min(86svh, 86vh) - var(--pill-h, 8vh)) / 2)',
    },
    reduceMotion,
  );

  // When ready and allowed, start the video programmatically
  useEffect(() => {
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldPlayVideo]);

  // Intro continuous animation: start small and smoothly transition to final hero
  const isIntro = initialPill || isExpanding;
  const introScale = initialPill ? 0.14 : 1; // transform-based intro sizing (no width/height animation)
  const containerRadius = initialPill ? '9999px' : 'calc(16px + 160px * var(--sh, 0))'; // unified rounding driven by shutter

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-hidden bg-black [--nav-row-w:258px] [--pill-h:54px] sm:[--nav-row-w:20vw] sm:[--pill-h:8vh]"
    >
      {/* Morphing Video - transforms INTO navigation bar */}
      <div
        className="fixed z-30 flex items-center justify-center overflow-hidden"
        style={{
          top: CFG.nav.centerTop,
          left: '50%',
          ['--intro-scale' as any]: String(introScale),
          transform: 'translate(-50%, -50%) scale(var(--intro-scale))',
          width: '96vw',
          height: 'min(86svh, 86vh)',
          borderRadius: containerRadius,
          border: 'none',
          willChange: isExpanding ? 'transform, opacity, filter, clip-path' : undefined,
          transformOrigin: '50% 50%',
          transition: isExpanding
            ? 'top 0.4s ease-out, transform 2s cubic-bezier(0.22, 1, 0.36, 1), border-radius 2s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s ease-out, backdrop-filter 0.5s ease-out, box-shadow 0.5s ease-out, clip-path 0.6s ease-out'
            : 'top 0.4s ease-out, border-radius 0s, background-color 0.5s ease-out, backdrop-filter 0.5s ease-out, box-shadow 0.5s ease-out, clip-path 0.3s ease-out',
          ['--bg-a' as any]: isIntro ? '0.95' : 'calc(max(0, (var(--p, 0) - 0.7) * 3) * 0.95)',
          ['--shadow-a' as any]: isIntro ? '0.25' : 'calc(max(0, (var(--p, 0) - 0.7) * 3) * 0.25)',
          backgroundColor: initialPill ? 'transparent' : 'rgba(255, 255, 255, var(--bg-a))',
          backdropFilter:
            isIntro && !initialPill
              ? 'blur(20px)'
              : isIntro
                ? 'blur(0px)'
                : 'blur(calc(max(0, (var(--p, 0) - 0.7) * 3) * 20px))',
          boxShadow: initialPill ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, var(--shadow-a))',
          // Box-like shutter that closes from all sides. Corners round more as it closes.
          clipPath:
            'inset(calc(var(--sh, 0) * var(--closeMaxY, 0)) calc(var(--sh, 0) * var(--closeMaxX, 0)) calc(var(--sh, 0) * var(--closeMaxY, 0)) calc(var(--sh, 0) * var(--closeMaxX, 0)) round calc(24px + var(--sh, 0) * 360px))',
        }}
      >
        <div
          className="absolute bottom-64 left-1/2 z-50 -translate-x-1/2 text-center transition-opacity duration-700 sm:right-8 sm:bottom-40 sm:left-auto sm:translate-x-0 md:right-10 md:bottom-22"
          style={{ opacity: showTitleGroup ? 1 : 0 }}
        >
          <h3 className="text-base font-medium tracking-widest text-white sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl">
            <AnimatedText text="Full-Stack" start={showTitleGroup} perCharDelay={45} />
          </h3>
        </div>

        {/* right side tagline */}
        <div
          className="absolute bottom-52 left-1/2 z-50 -translate-x-1/2 text-center transition-opacity duration-700 sm:right-8 sm:left-auto sm:translate-x-0 md:right-10 md:bottom-10"
          style={{ opacity: showTitleGroup ? 1 : 0 }}
        >
          <h4 className="text-base font-light tracking-wider text-white/90 italic sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl">
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
          className="absolute top-6 left-1/2 z-50 max-w-[22rem] -translate-x-1/2 text-center transition-opacity duration-700 sm:top-auto sm:bottom-32 sm:left-8 sm:translate-x-0 sm:text-left md:bottom-10 md:left-10"
          style={{ opacity: showDesc ? 1 : 0 }}
        >
          <p className="mb-2 text-sm leading-relaxed text-white/80 md:text-base">
            I experiment with AI daily—and build web platforms that put it to work.
          </p>
        </div>

        {/* The actual video that morphs */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: 'calc(24px + 360px * var(--sh, 0))',
            // Keep video hidden until intro completes, then fade it in and keep at full opacity
            opacity: isIntro ? 0 : 1,
            transition: 'opacity 0.8s ease-out',
          }}
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload={CFG.video.preload}
              aria-hidden
              tabIndex={-1}
              onError={() => setHasVideo(false)}
              className="h-full w-full object-cover"
              style={{
                willChange: 'opacity, transform',
                transform: `scale(${CFG.video.scale})`,
              }}
            >
              <source src="/matrix-horizontal.mp4" type="video/mp4" />
            </video>
          ) : (
            <div
              aria-hidden
              className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_0%,rgba(59,130,246,0.20),transparent_60%),radial-gradient(60%_50%_at_50%_100%,rgba(168,85,247,0.16),transparent_60%)]"
              style={{
                transform: `scale(${CFG.video.scale})`,
              }}
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"
            style={{ opacity: isIntro ? 0 : 1 }}
          />

          {/* Cyan overlay: fades in as shutter closes; pill width matches mobile nav row */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ opacity: isIntro ? 0 : undefined }}
          >
            {/* Inner pill: xs gets fixed width; sm+ fills container as before */}
            <div
              className="relative flex h-14 w-[var(--nav-row-w)] items-center justify-center rounded-[384px] border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-[16px] backdrop-saturate-[160%] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(120%_60%_at_50%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)] before:content-[''] sm:h-full sm:w-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(24,204,193,0.28) 0%, rgba(0,166,158,0.20) 100%)',
                opacity: 'var(--cyan, 0)',
                transition: 'opacity 0.5s ease-out',
              }}
            >
              <span
                className="font-semibold tracking-wide text-white"
                style={{
                  fontSize: 'clamp(14px, 2.1vw, 22px)',
                  whiteSpace: 'nowrap',
                  maxWidth: '90%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  opacity: 'var(--ui, 0)',
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}
              >
Hi, I’m Jayvic 👋
              </span>
            </div>
          </div>

          {/* Watermark cover - covers bottom right corner */}
          <div className="absolute right-0 bottom-0 h-12 w-20 bg-gradient-to-tl from-black via-black/80 to-transparent"></div>
        </div>
      </div>

      {/* Initial pill overlay (decoupled from container transforms) */}
      {initialPill && (
        <div
          className="pointer-events-none fixed left-1/2 z-[60] -translate-x-1/2 -translate-y-1/2"
          style={{ top: '46%' }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              // Match the final cyan pill size and shape, but keep original white style
              width: 'var(--nav-row-w, calc(96vw - 2 * var(--closeMaxX)))',
              height: 'var(--pill-h, calc(86vh - 2 * var(--closeMaxY)))',
              borderRadius: '384px',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.14)',
            }}
          >
            <span
              className="font-semibold tracking-wide"
              style={{
                color: 'black',
                fontSize: 'clamp(14px, 2.1vw, 22px)',
                whiteSpace: 'nowrap',
              }}
            >
              Hi, I'm Jayvic 👋
            </span>
          </div>
        </div>
      )}

      {/* Profile Image - Positioned like silhouette */}
      <div
        className="fixed bottom-0 left-1/2 isolate z-40 -translate-x-1/2"
        style={{
          opacity: initialPill ? 0 : 1,
          transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          className="relative w-[22rem] sm:w-[28rem] md:w-[60rem]"
          style={{
            height: 'calc(50rem - 10rem * var(--p))',
            transform: 'scale(clamp(0.6, calc(1 - 0.4 * var(--p)), 1))',
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
              filter: `brightness(calc(0.9 + 0.3 * var(--p))) saturate(1.3) hue-rotate(12deg) drop-shadow(0 0 calc(20px + 40px * var(--p)) rgba(0, 139, 139, 0.35)) drop-shadow(0 0 calc(60px + 120px * var(--p)) rgba(0, 139, 139, 0.18))`,
            }}
            priority
          />
        </div>
      </div>

      {/* Text Overlays - positioned around the video and person */}
      <div className="pointer-events-none fixed inset-0 z-50">
        {/* Nav buttons aligned with cyan box: two on left, two on right */}
        <nav aria-label="Primary" className="hidden sm:contents">
          <ul className="contents">
            <li className="contents">
              <NavButton
                href="/projects"
                ariaLabel="Projects"
                tooltip="Projects"
                side="left"
                offsetPx={CFG.nav.leftOffsetsPx.projects}
                size={CFG.nav.buttonSize}
                top={CFG.nav.centerTop}
                className="vt-tag-projects"
              >
                <Icon
                  icon="mdi:application-brackets"
                  width={36}
                  height={36}
                  aria-hidden="true"
                  style={{
                    transform:
                      'translate(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px)) rotate(calc(var(--mx, 0) * -6deg))',
                    transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'transform',
                  }}
                />
              </NavButton>
            </li>
            <li className="contents">
              <NavButton
                href="https://www.linkedin.com/in/jayvicsanantonio/"
                ariaLabel="LinkedIn"
                tooltip="LinkedIn"
                side="left"
                offsetPx={CFG.nav.leftOffsetsPx.linkedin}
                size={CFG.nav.buttonSize}
                top={CFG.nav.centerTop}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="mdi:linkedin"
                  width={40}
                  height={40}
                  aria-hidden="true"
                  style={{
                    transform:
                      'translate(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px)) rotate(calc(var(--mx, 0) * -6deg))',
                    transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'transform',
                  }}
                />
              </NavButton>
            </li>
            <li className="contents">
              <NavButton
                href="/work"
                ariaLabel="Work"
                tooltip="Work Experience"
                side="right"
                offsetPx={CFG.nav.rightOffsetsPx.work}
                size={CFG.nav.buttonSize}
                top={CFG.nav.centerTop}
                className="vt-tag-work"
              >
                <Icon
                  icon="mdi:timeline-text"
                  width={36}
                  height={36}
                  aria-hidden="true"
                  style={{
                    transform:
                      'translate(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px)) rotate(calc(var(--mx, 0) * -6deg))',
                    transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'transform',
                  }}
                />
              </NavButton>
            </li>
            <li className="contents">
              <NavButton
                href="https://github.com/jayvicsanantonio"
                ariaLabel="GitHub"
                tooltip="GitHub"
                side="right"
                offsetPx={CFG.nav.rightOffsetsPx.github}
                size={CFG.nav.buttonSize}
                top={CFG.nav.centerTop}
                target="_blank"
                rel="noopener noreferrer"
                transitionMs={140}
              >
                <Icon
                  icon="mdi:github"
                  width={40}
                  height={40}
                  aria-hidden="true"
                  style={{
                    transform:
                      'translate(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px)) rotate(calc(var(--mx, 0) * -6deg))',
                    transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'transform',
                  }}
                />
              </NavButton>
            </li>
          </ul>
        </nav>

        {/* Mobile nav row (xs only): buttons side-by-side below the cyan pill */}
        <div
          className="pointer-events-none absolute top-[52%] left-1/2 flex w-[var(--nav-row-w)] -translate-x-1/2 items-center justify-between gap-3 sm:hidden"
          style={{ opacity: 'var(--ui, 0)' }}
        >
          <GlassButton
            href="/projects"
            aria-label="Projects"
            className="vt-tag-projects h-14 w-14 rounded-full"
          >
            <Icon icon="mdi:application-brackets" width={28} height={28} aria-hidden="true" />
          </GlassButton>
          <GlassButton
            href="https://www.linkedin.com/in/jayvicsanantonio/"
            aria-label="LinkedIn"
            className="h-14 w-14 rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="mdi:linkedin" width={30} height={30} aria-hidden="true" />
          </GlassButton>
          <GlassButton
            href="/work"
            aria-label="Work Experience"
            className="vt-tag-work h-14 w-14 rounded-full"
          >
            <Icon icon="mdi:timeline-text" width={28} height={28} aria-hidden="true" />
          </GlassButton>
          <GlassButton
            href="https://github.com/jayvicsanantonio"
            aria-label="GitHub"
            className="h-14 w-14 rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="mdi:github" width={30} height={30} aria-hidden="true" />
          </GlassButton>
        </div>

        {/* Bottom row: brand on left, CTA on right; vertically centered and synchronized */}
        <div
          className="pointer-events-none absolute inset-x-4 transition-opacity duration-300 sm:inset-x-16"
          style={{
            bottom: 'max(env(safe-area-inset-bottom), 16px)',
            opacity: showName
              ? `calc(1 - clamp(0, var(--overlay-up, 0) / ${CFG.overlayUpDampen}, 1))`
              : 0,
            transform: 'translateY(calc(-1.2 * var(--scroll-y, 0) * var(--gate, 0) * 1px))',
            willChange: 'opacity, transform',
          }}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="text-white">
              <div className="text-lg font-light tracking-wider md:text-3xl">Jayvic</div>
              <div className="text-xs font-bold tracking-[0.3em] uppercase md:text-2xl">
                SAN ANTONIO
              </div>
            </div>
            <Link
              href="/work"
              className="pointer-events-auto rounded-full bg-white px-5 py-2 text-xs font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 sm:px-6 sm:py-2.5 sm:text-sm md:py-3 md:text-base"
            >
              Work Experience
            </Link>
          </div>
        </div>
      </div>

      {/* Content sections with smooth transition from black to gray */}
      <div className="relative z-10 min-w-screen">
        {/* Smooth transition from black to gray */}
        <div className="absolute inset-0 h-[220svh] bg-gradient-to-b from-black via-gray-800 to-gray-200 md:h-[180svh] lg:h-[154rem]"></div>

        {/* Expanding person highlight effect */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80vw 60vh at 50% 100%, rgba(0,139,139,0.2) 0%, rgba(0,139,139,0.1) 40%, transparent 70%)',
            opacity: 'min(calc(var(--p, 0) * 2), 1)',
          }}
        />

        {/* About Section spacer */}
        <section className="flex min-h-[220svh] flex-col items-center justify-center px-4 py-20 md:min-h-[180svh] lg:min-h-[154rem]"></section>
      </div>
    </div>
  );
}
