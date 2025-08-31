'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

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
  const maxScroll = 800; // Distance for complete transformation
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  // Video background transformations
  const videoScale = Math.max(1 - scrollProgress * 0.7, 0.3); // Shrinks to 30%
  const videoOpacity = Math.max(1 - scrollProgress * 1.2, 0);
  const videoBorderRadius = scrollProgress * 40; // Becomes rounded

  // Navigation bar emergence
  const navOpacity = Math.max((scrollProgress - 0.4) * 2.5, 0); // Appears after 40% scroll
  const navScale = Math.min(0.8 + (scrollProgress - 0.4) * 0.5, 1);

  // Profile image positioning and sizing (like the silhouette)
  const profileScale = Math.max(1 - scrollProgress * 0.4, 0.6); // Shrinks to 60%
  const profileOpacity = Math.max(1 - scrollProgress * 0.3, 0.7);
  // Keep the image always touching the bottom by adjusting the container height
  const profileHeight = Math.max(40 - scrollProgress * 8, 20); // rem units

  // Text animations
  const titleOpacity = Math.max(1 - scrollY / 300, 0);
  const subtitleOpacity = Math.max(1 - (scrollY - 100) / 300, 0);

  return (
    <div ref={containerRef} className="relative bg-gray-100">
      {/* Shrinking Video Background */}
      <div
        className="fixed top-1/2 left-1/2 z-10 overflow-hidden"
        style={{
          transform: `translate(-50%, -50%) scale(${videoScale})`,
          opacity: videoOpacity,
          borderRadius: `${videoBorderRadius}px`,
          width: '100vw',
          height: '100vh',
          transition: 'none',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/matrix.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Navigation Bar (appears as video shrinks) */}
      <div
        className="fixed top-20 left-1/2 z-30 flex items-center gap-4 px-8 py-4 bg-white/90 backdrop-blur-md rounded-full shadow-2xl"
        style={{
          transform: `translate(-50%, 0) scale(${navScale})`,
          opacity: navOpacity,
          transition: 'none',
        }}
      >
        {/* Navigation Icons - similar to the app icons in the images */}
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">💡</span>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">🎨</span>
        </div>

        {/* Video becomes the expanded navigation item */}
        <div className="relative flex items-center bg-white rounded-full px-6 py-2 shadow-lg">
          <div className="w-8 h-8 rounded-lg overflow-hidden mr-3 flex-shrink-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/matrix.mp4" type="video/mp4" />
            </video>
          </div>
          <span className="text-gray-900 font-medium text-sm whitespace-nowrap">
            Creative visuals for development
          </span>
        </div>

        <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">☁️</span>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">🚀</span>
        </div>
      </div>

      {/* Profile Image - Positioned like silhouette */}
      <div
        className="fixed bottom-0 left-1/2 z-20"
        style={{
          transform: `translateX(-50%) scale(${profileScale})`,
          opacity: profileOpacity,
          transition: 'none',
        }}
      >
        <div
          className="relative w-98 md:w-132"
          style={{ height: `${profileHeight}rem` }}
        >
          <Image
            src="/images/me2.png"
            alt="Jayvic San Antonio - Creative Developer"
            fill
            className="object-cover object-bottom shadow-lg shadow-white/10"
            style={{
              filter:
                'drop-shadow(0 0 15px rgba(255, 255, 255, 0.15)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.1))',
            }}
            priority
          />
        </div>
      </div>

      {/* Hero Content */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div
          className="text-center mb-8 max-w-4xl"
          style={{ opacity: titleOpacity }}
        >
          {/* Main Title - "New freedoms" style */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4 tracking-[0.2em]">
            <span className="inline-block mr-4">N</span>
            <span className="inline-block mr-4">e</span>
            <span className="inline-block mr-4">w</span>
          </h1>

          <h2 className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-6 tracking-[0.15em] italic">
            <span className="inline-block mr-4">f</span>
            <span className="inline-block mr-4">r</span>
            <span className="inline-block mr-4">e</span>
            <span className="inline-block mr-4">e</span>
            <span className="inline-block mr-4">d</span>
            <span className="inline-block mr-4">o</span>
            <span className="inline-block mr-4">m</span>
            <span className="inline-block mr-4">s</span>
          </h2>
        </div>

        <div
          className="text-center max-w-2xl"
          style={{ opacity: subtitleOpacity }}
        >
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-4">
            Ideate, visualize, create digital experiences, and share
            your vision with the world, using modern web technologies
            and creative innovation.
          </p>
          <p className="text-base md:text-lg text-white/60">
            Available now on Web and Mobile.
          </p>
        </div>
      </section>

      {/* Content sections with gray background */}
      <div className="relative z-10 bg-gray-100 min-w-screen">
        {/* Spacer section for scroll transition */}
        <section className="h-screen"></section>

        {/* About Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 tracking-wider">
              <span className="inline-block mr-4">M</span>
              <span className="inline-block mr-4">a</span>
              <span className="inline-block mr-4">k</span>
              <span className="inline-block mr-4">e</span>
              <span className="inline-block mr-8">i</span>
              <span className="inline-block mr-4">t</span>
              <span className="inline-block mr-8">r</span>
              <span className="inline-block mr-4">e</span>
              <span className="inline-block mr-4">a</span>
              <span className="inline-block mr-4">l</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed">
              A new fluid approach to creating stunning digital
              experiences that feel out of this world. All you need to
              do is envision it.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Create beautiful interfaces, fast
                </h3>
                <p className="text-gray-600">
                  Ideate and iterate as fast as you think. Explore
                  endless possibilities with React, Next.js, and
                  modern design systems.
                </p>
              </div>

              <div className="text-center p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  No complex setup needed, just build
                </h3>
                <p className="text-gray-600">
                  Be as simple or as specific as you want. Work in
                  your own way to develop, deploy, and scale your
                  applications fluently.
                </p>
              </div>

              <div className="text-center p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Reference and remix anything
                </h3>
                <p className="text-gray-600">
                  Explore creative alternatives. Bring in your own
                  designs, brand guidelines, and user requirements.
                  Make it exactly how you see it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section
          ref={(el) => observeElement(el, 'work')}
          className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gray-50"
        >
          <div
            className={`max-w-6xl w-full transition-all duration-1000 ${
              isVisible.work
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-12 text-center tracking-wider">
              <span className="inline-block mr-4">D</span>
              <span className="inline-block mr-4">o</span>
              <span className="inline-block mr-8">i</span>
              <span className="inline-block mr-4">t</span>
              <span className="inline-block mr-8">a</span>
              <span className="inline-block mr-4">l</span>
              <span className="inline-block mr-4">l</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Build Applications
                </h3>
                <p className="text-gray-600 mb-6">
                  Create full-stack web applications with modern
                  frameworks. From concept to deployment with seamless
                  user experiences.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    TypeScript
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Design Systems
                </h3>
                <p className="text-gray-600 mb-6">
                  Craft cohesive design languages and component
                  libraries that scale across teams and products.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    Figma
                  </span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                    Tailwind
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    Storybook
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
