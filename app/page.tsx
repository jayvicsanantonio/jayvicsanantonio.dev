"use client";

import NarrativeScroll from '@/components/pages/home/NarrativeScroll';
import Hero from '@/components/pages/home/Hero';
import AboutScene from '@/components/pages/home/AboutScene';
import ProjectsScene from '@/components/pages/home/ProjectsScene';
import SkillsScene from '@/components/pages/home/SkillsScene';
import ContactScene from '@/components/pages/home/ContactScene';

export default function Page() {
  return (
    <NarrativeScroll>
      <Hero />
      <AboutScene />
      <ProjectsScene />
      <SkillsScene />
      <ContactScene />
    </NarrativeScroll>
  );
}
