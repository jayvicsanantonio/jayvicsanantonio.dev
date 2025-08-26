'use client';

import { useRef } from 'react';
import Hero from '@/components/pages/home/Hero';
import AboutMe from '@/components/pages/home/AboutMe';
import FeaturedProjects from '@/components/pages/home/FeaturedProjects';

export default function Page() {
  const aboutRef = useRef<HTMLElement>(null);
  const featuredProjectsRef = useRef<HTMLElement>(null);

  return (
    <>
      <Hero aboutRef={aboutRef} />
      <AboutMe aboutRef={aboutRef} />
      <FeaturedProjects impactRef={featuredProjectsRef} />
    </>
  );
}
