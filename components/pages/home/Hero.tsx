'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';
import ScrollDown from '@/components/pages/ScrollDown';
import SocialMediaIconButton from '@/components/pages/home/SocialMediaIconButton';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import Bluesky from '@/components/icons/Bluesky';

export default function Hero({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement>;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const crafts = [
    'Digital Experiences',
    'Interactive Solutions', 
    'Modern Interfaces',
    'Elegant Code',
    'User Journeys',
    'Creative Visions'
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % crafts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [crafts.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-amber/40 to-transparent rotate-12 animate-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-px h-24 bg-gradient-to-t from-rose/30 to-transparent -rotate-12" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-amber/60 rounded-full animate-pulse" />
      </div>

      <motion.div
        style={prefersReducedMotion ? {} : { y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="container-narrow text-center relative z-10"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-4 py-2 text-sm font-medium text-amber bg-amber/10 backdrop-blur-sm border border-amber/20 rounded-full">
            Available for new opportunities
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div variants={itemVariants} className="space-y-6 mb-12">
          <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tight">
            <span className="block text-pearl">Jayvic</span>
            <span className="block text-gradient">San Antonio</span>
          </h1>
          
          <div className="h-16 md:h-20 flex items-center justify-center">
            <motion.h2
              key={activeIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
              }
              className="text-xl md:text-2xl lg:text-3xl font-medium text-silver"
            >
              Crafting{' '}
              <span className="text-shimmer font-editorial font-light italic">
                {crafts[activeIndex]}
              </span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-silver/80 max-w-2xl mx-auto mb-16 leading-relaxed font-light"
        >
          I transform complex challenges into elegant digital solutions, 
          focusing on the intersection of{' '}
          <em className="text-amber font-medium not-italic">performance</em>,{' '}
          <em className="text-rose font-medium not-italic">aesthetics</em>, and{' '}
          <em className="text-pearl font-medium not-italic">user experience</em>.
        </motion.p>

        {/* Profile Image */}
        <motion.div 
          variants={itemVariants}
          className="relative mb-16 group"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
            {/* Elegant border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber via-copper to-bronze rounded-full p-1">
              <div className="w-full h-full bg-obsidian rounded-full p-1">
                <Image
                  alt="Jayvic San Antonio - Full-Stack Developer"
                  className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  height={160}
                  loading="eager"
                  src="/images/home/profile-image.jpg"
                  width={160}
                  priority={true}
                />
              </div>
            </div>
            
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-rose/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mb-16"
        >
          <SocialMediaIconButton
            Icon={Github}
            link="https://github.com/jayvicsanantonio"
            className="hover-lift hover-glow"
          >
            Github
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Linkedin}
            link="https://www.linkedin.com/in/jayvicsanantonio/"
            className="hover-lift hover-glow"
          >
            LinkedIn
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Bluesky}
            link="https://bsky.app/profile/jayvicsanantonio.dev"
            className="hover-lift hover-glow"
          >
            Bluesky
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Mail}
            link="mailto:hi@jayvicsanantonio.dev"
            className="hover-lift hover-glow"
          >
            Email
          </SocialMediaIconButton>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="space-y-6"
        >
          <button 
            onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary group inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            Explore My Work
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <p className="text-sm text-silver/60 font-mono">
            Scroll to discover
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollDown sectionRef={aboutRef} />
    </section>
  );
}
