'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';
import Bluesky from '@/components/icons/Bluesky';
import ScrollDown from '@/components/pages/ScrollDown';
import SocialMediaIconButton from '@/components/pages/home/SocialMediaIconButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import HeroAmbient from '@/components/pages/home/HeroAmbient';

export default function Hero({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement>;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -30]
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [1, 0.92, 0.85]
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -60]
  );
  const roles = [
    'Full-Stack Web Developer',
    'JavaScript Specialist',
    'React Expert',
    'Node.JS Developer',
    'UI/UX Enthusiast',
    'Performance Optimization Advocate',
    'Creative Thinker',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col-reverse justify-end md:flex-row items-center px-4 pb-60 text-gray-950 dark:text-gray-200"
    >
      <HeroAmbient />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[44rem] w-[44rem] rounded-full opacity-20 blur-3xl bg-[radial-gradient(closest-side,rgba(59,130,246,0.25),transparent)]" />
        <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full opacity-15 blur-3xl bg-[radial-gradient(closest-side,rgba(168,85,247,0.25),transparent)]" />
      </div>
      <div className="space-y-6">
        <div className="font-oswald lg:space-y-2 flex flex-col items-center md:items-start">
          <motion.h1
            style={{ y: titleY, opacity: titleOpacity }}
            className="font-title text-4xl font-bold leading-snug lg:text-6xl "
          >
            Hey, I'm Jayvic 👋
          </motion.h1>
          <motion.h2
            key={activeIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.5 }
            }
            className="text-lg lg:text-3xl font-light uppercase tracking-[0.22em] md:tracking-[0.28em] lg:tracking-[0.34em] bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-300 to-purple-500 will-change-transform"
          >
            {roles[activeIndex]}
          </motion.h2>
        </div>
        <p className="text-lg lg:text-xl text-center md:text-left text-white/80">
          Turning caffeine into code and transforming challenges into
          innovative web solutions that make a difference.
        </p>
        <div className="flex space-x-6 justify-center md:justify-start">
          <SocialMediaIconButton
            Icon={Github}
            link="https://github.com/jayvicsanantonio"
          >
            Github
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Linkedin}
            link="https://www.linkedin.com/in/jayvicsanantonio/"
          >
            LinkedIn
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Bluesky}
            link="https://bsky.app/profile/jayvicsanantonio.dev"
          >
            Bluesky
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Mail}
            link="mailto:hi@jayvicsanantonio.dev"
          >
            Email
          </SocialMediaIconButton>
        </div>
      </div>
      <motion.div
        style={{ y: imageY }}
        className="will-change-transform"
      >
        <Image
          alt="Profile"
          className="rounded-full md:mb-0 mb-8 p-1.5 shadow-[0_0_0_2px_rgba(59,130,246,0.6),0_0_0_4px_rgba(168,85,247,0.4)]"
          height={340}
          loading="eager"
          src="/images/home/profile-image.jpg"
          style={{
            aspectRatio: '340/340',
            objectFit: 'cover',
          }}
          width={340}
          priority={true}
        />
      </motion.div>
      <ScrollDown sectionRef={aboutRef} />
    </section>
  );
}
