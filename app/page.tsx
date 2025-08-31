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

  // Calculate image scale based on scroll position
  const maxScroll = 1200; // Max scroll distance for shrinking effect
  const minScale = 0.25; // Minimum scale (25% of original size)
  const maxScale = 1; // Maximum scale (100% of original size)

  const scrollProgress = Math.min(scrollY / maxScroll, 1);
  const imageScale = Math.max(
    maxScale - scrollProgress * (maxScale - minScale),
    minScale
  );
  const imageOpacity = Math.max(1 - scrollProgress * 0.4, 0.6); // Slightly fade as it shrinks

  // Calculate text animations based on scroll
  const titleOpacity = Math.max(1 - scrollY / 400, 0);
  const subtitleOpacity = Math.max(1 - (scrollY - 150) / 350, 0);

  // Parallax effect for background
  const backgroundY = scrollY * 0.5;

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Background Video with Parallax */}
      <div
        className="fixed inset-0 z-0"
        style={{ transform: `translateY(${backgroundY}px)` }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[120vh] object-cover opacity-40"
        >
          <source src="/fashion-intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/20 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">Jayvic</div>
          <div className="hidden md:flex space-x-8 text-white/80">
            <a
              href="#work"
              className="hover:text-white transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
          <button className="md:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Main Title with Character Spacing */}
        <div
          className="text-center mb-8 max-w-4xl"
          style={{ opacity: titleOpacity }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-wider">
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              C
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              r
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              e
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              a
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              t
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              i
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '0.7s' }}
            >
              v
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '0.8s' }}
            >
              e
            </span>
          </h1>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white/90 mb-6 tracking-widest">
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '1s' }}
            >
              D
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '1.1s' }}
            >
              e
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '1.2s' }}
            >
              v
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '1.3s' }}
            >
              e
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '1.4s' }}
            >
              l
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '1.5s' }}
            >
              o
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '1.6s' }}
            >
              p
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '1.7s' }}
            >
              e
            </span>
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: '1.8s' }}
            >
              r
            </span>
          </h2>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          style={{ opacity: titleOpacity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Shrinking Profile Image - Fixed Position */}
      <div
        className="fixed top-1/2 left-1/2 z-20 pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) scale(${imageScale})`,
          opacity: imageOpacity,
          transition: 'none', // Smooth scroll-based animation
        }}
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow opacity-75 blur-sm"></div>
          <div className="absolute inset-1 rounded-full bg-black"></div>

          {/* Profile Image */}
          <div className="absolute inset-2 rounded-full overflow-hidden">
            <Image
              src="/images/me.png"
              alt="Jayvic San Antonio - Creative Developer"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 bg-black/20">
        <div
          className="max-w-4xl text-center"
          style={{ opacity: subtitleOpacity }}
        >
          <p className="text-2xl md:text-3xl text-white/90 leading-relaxed mb-8">
            Building exceptional digital experiences with modern web
            technologies.
          </p>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Transforming ideas into powerful, scalable solutions that
            make an impact.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={(el) => observeElement(el, 'about')}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 bg-black/30"
      >
        <div
          className={`max-w-6xl transition-all duration-1000 ${
            isVisible.about
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform translate-y-20'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center tracking-wider">
            <span className="inline-block mr-4">W</span>
            <span className="inline-block mr-4">h</span>
            <span className="inline-block mr-4">a</span>
            <span className="inline-block mr-4">t</span>
            <span className="inline-block mr-8">I</span>
            <span className="inline-block mr-4">D</span>
            <span className="inline-block mr-4">o</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">
                Frontend Development
              </h3>
              <p className="text-white/70">
                Creating beautiful, responsive user interfaces with
                React, Next.js, and modern CSS frameworks.
              </p>
            </div>

            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">
                Full-Stack Solutions
              </h3>
              <p className="text-white/70">
                Building complete web applications with robust
                backends and seamless integrations.
              </p>
            </div>

            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">
                Creative Direction
              </h3>
              <p className="text-white/70">
                Bringing creative vision to life through innovative
                design and user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section
        ref={(el) => observeElement(el, 'work')}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 bg-black/40"
      >
        <div
          className={`max-w-6xl w-full transition-all duration-1000 delay-200 ${
            isVisible.work
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform translate-y-20'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center tracking-wider">
            <span className="inline-block mr-4">F</span>
            <span className="inline-block mr-4">e</span>
            <span className="inline-block mr-4">a</span>
            <span className="inline-block mr-4">t</span>
            <span className="inline-block mr-4">u</span>
            <span className="inline-block mr-4">r</span>
            <span className="inline-block mr-4">e</span>
            <span className="inline-block mr-4">d</span>
            <span className="inline-block mr-8">W</span>
            <span className="inline-block mr-4">o</span>
            <span className="inline-block mr-4">r</span>
            <span className="inline-block mr-4">k</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Project Alpha
              </h3>
              <p className="text-white/70 mb-6">
                A revolutionary web application that transforms how
                users interact with digital content.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                  TypeScript
                </span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Project Beta
              </h3>
              <p className="text-white/70 mb-6">
                An innovative platform that bridges the gap between
                creativity and technology.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                  Vue.js
                </span>
                <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                  MongoDB
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={(el) => observeElement(el, 'contact')}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 bg-black/50"
      >
        <div
          className={`max-w-4xl text-center transition-all duration-1000 delay-400 ${
            isVisible.contact
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform translate-y-20'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wider">
            <span className="inline-block mr-4">L</span>
            <span className="inline-block mr-4">e</span>
            <span className="inline-block mr-4">t</span>
            <span className="inline-block mr-4">'</span>
            <span className="inline-block mr-4">s</span>
            <span className="inline-block mr-8">C</span>
            <span className="inline-block mr-4">r</span>
            <span className="inline-block mr-4">e</span>
            <span className="inline-block mr-4">a</span>
            <span className="inline-block mr-4">t</span>
            <span className="inline-block mr-4">e</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
            Ready to bring your vision to life? Let's collaborate on
            something extraordinary.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              View My Work
            </button>
            <button className="px-10 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 bg-black/60 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">
            © 2024 Jayvic San Antonio. Crafted with passion and code.
          </p>
        </div>
      </footer>
    </div>
  );
}
