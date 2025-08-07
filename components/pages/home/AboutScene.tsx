'use client';

import Image from 'next/image';
import { motion, useTransform } from 'framer-motion';
import { useNarrativeScroll } from './NarrativeScroll';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

export default function AboutScene() {
  const { scrollYProgress } = useNarrativeScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const sceneStart = 0.1;
  const sceneEnd = 0.4;

  const opacity = useTransform(scrollYProgress, [sceneStart - 0.05, sceneStart, sceneEnd, sceneEnd + 0.05], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [sceneStart, sceneStart + 0.05], ['20px', '0px']);
  const headlineOpacity = useTransform(scrollYProgress, [sceneStart, sceneStart + 0.05], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [sceneStart + 0.05, sceneStart + 0.15], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [sceneStart + 0.05, sceneStart + 0.15], [0, 1]);
  const textY = useTransform(scrollYProgress, [sceneStart + 0.1, sceneStart + 0.2], ['20px', '0px']);
  const textOpacity = useTransform(scrollYProgress, [sceneStart + 0.1, sceneStart + 0.2], [0, 1]);

  if (prefersReducedMotion) {
    return (
      <div className="h-[150vh] relative flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4">
          <div className="relative aspect-square">
            <Image src="/images/home/profile-image.webp" alt="Profile Picture" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-accent">About Me</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>I'm Jayvic San Antonio...</p>
              <p>From hackathons and co-founding a startup...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div style={{ opacity }} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4">
          <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="relative aspect-square">
            <Image src="/images/home/profile-image.webp" alt="Profile Picture" layout="fill" objectFit="cover" className="rounded-lg" />
          </motion.div>
          <div className="space-y-4">
            <motion.h2 style={{ y: headlineY, opacity: headlineOpacity }} className="text-3xl md:text-4xl font-bold text-accent">
              About Me
            </motion.h2>
            <motion.div style={{ y: textY, opacity: textOpacity }} className="space-y-4 text-muted-foreground">
              <p>
                I'm Jayvic San Antonio, a Full-Stack Web Developer
                originally from the Philippines, now thriving in the San
                Francisco Bay Area. With over 9 years of experience, you
                could say JavaScript is my coding soulmate - I love its
                versatility and how it keeps getting better and better!
              </p>
              <p>
                From hackathons and co-founding a startup to working at a
                global media and tech company, I've thrived in all kinds of
                environments. Whether I'm flying solo or part of an awesome
                team, I'm all about tackling challenging projects and
                delivering top-notch code.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
