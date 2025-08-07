'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

// The opening scene of our narrative. It's designed to be immersive and set the tone.
export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headline = "Weaving Digital Narratives";
  const words = headline.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Simple particle effect using divs and framer-motion
  const particles = Array.from({ length: 20 });

  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Particle Background */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-0">
          {particles.map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-accent rounded-full"
              initial={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
                scale: Math.random() * 0.5 + 0.1,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0.2, 0],
                x: `calc(${Math.random() * 100}vw - 50%)`,
                y: `calc(${Math.random() * 100}vh - 50%)`,
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                repeatType: 'loop',
                delay: Math.random() * 5,
              }}
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Headline */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-7xl font-bold text-center z-10 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-2 md:mr-4"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={!prefersReducedMotion ? { y: ["0%", "20%", "0%"] } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </motion.div>
    </div>
  );
}
