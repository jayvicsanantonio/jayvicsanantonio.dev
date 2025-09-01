'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for section animations
  const observeElement = useCallback(
    (element: HTMLElement | null, id: string) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible((prev) => ({
            ...prev,
            [id]: entry.isIntersecting,
          }));
        },
        {
          threshold: 0.3,
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(element);
      return () => observer.disconnect();
    },
    []
  );

  // Calculate scroll-based transformations
  const maxScroll = 700; // Distance for complete transformation
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  // Video morphing transformations - starts as rounded rectangle, transforms INTO navigation bar
  const videoScale = Math.max(1 - scrollProgress * 0.15, 0.85); // Very subtle shrinking
  const videoBorderRadius = Math.max(24 - scrollProgress * 4, 32); // Starts with 24px radius, less rounded
  const videoWidth = Math.max(96 - scrollProgress * 80, 15); // Starts at 95vw, almost touching sides
  const videoHeight = Math.max(86 - scrollProgress * 62, 8); // Starts at 70vh, much taller

  // Navigation elements emergence (icons appear around the morphing video)
  const navIconsOpacity = Math.max((scrollProgress - 0.6) * 2.5, 0); // Icons appear later
  const navTextOpacity = Math.max((scrollProgress - 0.7) * 3, 0); // Text appears last

  // Profile image positioning and sizing (like the silhouette)
  const profileScale = Math.max(1 - scrollProgress * 0.4, 0.6); // Shrinks to 60%
  // Keep the image always touching the bottom by adjusting the container height
  // Ensure enough height so head doesn't get cut off
  const profileHeight = Math.max(50 - scrollProgress * 10, 35); // rem units - taller to prevent cutoff

  // Text animations
  const titleOpacity = Math.max(1 - scrollY / 300, 0);
  const subtitleOpacity = Math.max(1 - (scrollY - 100) / 300, 0);

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-hidden bg-black"
    >
      {/* Morphing Video - transforms INTO navigation bar */}
      <div
        className="fixed z-30 overflow-hidden flex items-center justify-center"
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -55%)`,
          width: `${videoWidth}vw`,
          height: `${videoHeight}vh`,
          borderRadius: `${videoBorderRadius}px`,
          transition: 'top 0.4s ease-out, transform 0.4s ease-out',
          backgroundColor:
            scrollProgress > 0.7
              ? 'rgba(255, 255, 255, 0.95)'
              : 'transparent',
          backdropFilter:
            scrollProgress > 0.7 ? 'blur(20px)' : 'none',
          boxShadow:
            scrollProgress > 0.7
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              : '0 8px 20px -2px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div
          className="absolute sm:bottom-40 right-8 md:bottom-22 md:right-10 z-50"
          style={{ opacity: titleOpacity }}
        >
          <h3 className="text-lg md:text-3xl lg:text-4xl 2xl:text-6xl font-medium text-white tracking-widest">
            Full-Stack
          </h3>
        </div>

        {/* "imagination" text - right side, positioned vertically */}
        <div
          className="absolute bottom-32 right-8 md:bottom-10 md:right-10 z-50"
          style={{ opacity: titleOpacity }}
        >
          <h4 className="text-lg md:text-3xl lg:text-4xl 2xl:text-5xl font-light text-white/90 tracking-wider italic">
            Software Engineer
          </h4>
        </div>

        {/* Description text - bottom left */}
        <div
          className="absolute bottom-32 left-8 md:bottom-10 md:left-10 max-w-80 z-50"
          style={{ opacity: subtitleOpacity }}
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
            borderRadius: `${videoBorderRadius}px`,
            opacity: scrollProgress < 0.8 ? 1 : 0.3,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{
              filter: `
                brightness(1.8) 
                contrast(1.4) 
                saturate(1.8) 
                hue-rotate(5deg)
                gamma(1.2)
              `,
              transform: 'scale(1.05)', // Slight zoom to crop out watermark
            }}
          >
            <source src="/matrix-horizontal.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

          {/* Watermark cover - covers bottom right corner */}
          <div className="absolute bottom-0 right-0 w-20 h-12 bg-gradient-to-tl from-black via-black/80 to-transparent"></div>
        </div>
      </div>

      {/* Profile Image - Positioned like silhouette */}
      <div className="fixed isolate bottom-0 left-1/2 -translate-x-1/2 z-40">
        <div
          className="relative w-[32rem] md:w-[60rem]"
          style={{
            height: `${profileHeight}rem`,
            transform: `scale(${profileScale})`,
            transformOrigin: '50% 100%',
          }}
        >
          <Image
            src="/images/me.png"
            alt="Jayvic San Antonio - Creative Developer"
            fill
            className="object-contain object-bottom"
            style={{
              filter: `
                brightness(${0.8 + scrollProgress * 0.4}) 
                saturate(1.4) 
                hue-rotate(15deg)
                drop-shadow(0 0 ${
                  20 + scrollProgress * 40
                }px rgba(0, 139, 139, ${
                0.25 + scrollProgress * 0.3
              })) 
                drop-shadow(0 0 ${
                  40 + scrollProgress * 80
                }px rgba(0, 139, 139, ${
                0.15 + scrollProgress * 0.25
              }))
                drop-shadow(0 0 ${
                  60 + scrollProgress * 120
                }px rgba(0, 139, 139, ${0.08 + scrollProgress * 0.2}))
                drop-shadow(0 0 ${
                  100 + scrollProgress * 200
                }px rgba(0, 139, 139, ${scrollProgress * 0.15}))
              `,
            }}
            priority
          />
        </div>
      </div>

      {/* Text Overlays - positioned around the video and person */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Brand text - bottom left corner */}
        <div
          className="absolute bottom-4 left-16"
          style={{ opacity: titleOpacity }}
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
          className="absolute bottom-8 right-16 pointer-events-auto"
          style={{ opacity: titleOpacity }}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-800 to-gray-200 h-[200vh]"></div>

        {/* Expanding person highlight effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80vw 60vh at 50% 100%, 
                rgba(0, 139, 139, ${Math.min(
                  scrollProgress * 0.4,
                  0.2
                )}) 0%, 
                rgba(0, 139, 139, ${Math.min(
                  scrollProgress * 0.2,
                  0.1
                )}) 40%, 
                transparent 70%)`,
            opacity: Math.min(scrollProgress * 2, 1),
          }}
        />
        {/* Spacer section for scroll transition */}
        <section className="h-screen"></section>
        {/* About Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20"></section>
      </div>
    </div>
  );
}
