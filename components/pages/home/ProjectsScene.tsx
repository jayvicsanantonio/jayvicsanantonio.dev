'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useTransform } from 'framer-motion';
import { useNarrativeScroll } from './NarrativeScroll';
import { Github } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

const projects = [
  {
    title: 'Yahoo DSP',
    description:
      'A cutting-edge programmatic advertising platform for businesses. Built with a powerful tech stack including Ember.js, React.js, and Node.js, the platform empowers advertisers with features like real-time bidding, audience targeting, and comprehensive campaign performance measurement.',
    image: '/images/home/yahoo-dsp.webp',
    github: null,
    link: 'https://www.advertising.yahooinc.com/our-dsp',
  },
  {
    title: 'Barbenheimer VS Code Theme',
    description:
      'A VS Code theme inspired by the Internet phenomenon of the same name. It combines the pink and playful aesthetics of Barbie with the dark and dramatic tones of Oppenheimer.',
    image: '/images/home/barbenheimer.webp',
    github: 'https://github.com/jpsanantonio/barbenheimer-vscode-theme',
    link: 'https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer',
  },
];

export default function ProjectsScene() {
  const { scrollYProgress } = useNarrativeScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const sceneStart = 0.4;
  const sceneEnd = 0.7;

  const x = useTransform(scrollYProgress, [sceneStart, sceneEnd], ['0%', `-${100 * (projects.length - 1)}%`]);
  const opacity = useTransform(scrollYProgress, [sceneStart - 0.05, sceneStart, sceneEnd, sceneEnd + 0.05], [0, 1, 1, 0]);

  if (prefersReducedMotion) {
    return (
      <div className="py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-accent text-center mb-12">Featured Projects</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} isStatic />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div style={{ opacity }} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, isStatic = false }: { project: (typeof projects)[0]; isStatic?: boolean }) {
  const cardContent = (
    <>
      <div className="absolute inset-0 z-0 opacity-20">
        <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-accent">{project.title}</h3>
        <p className="mt-4 max-w-lg text-sm md:text-base text-muted-foreground">{project.description}</p>
      </div>
      <div className="relative z-10 flex gap-4">
        {project.github && (
          <Link href={project.github} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors text-sm">
            <Github size={18} />
            GitHub
          </Link>
        )}
        <Link href={project.link} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground hover:opacity-80 transition-opacity text-sm">
          View Project
        </Link>
      </div>
    </>
  );

  if (isStatic) {
    return (
      <div
        className="relative h-[70vh] rounded-2xl overflow-hidden border border-border p-6 md:p-8 flex flex-col justify-between"
        style={{
          background: 'linear-gradient(145deg, hsl(var(--secondary) / 0.5), hsl(var(--secondary) / 0.2))',
          boxShadow: '0 0 40px hsl(var(--secondary) / 0.1)',
        }}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative w-[80vw] md:w-[60vw] h-[70vh] flex-shrink-0 rounded-2xl overflow-hidden border border-border p-6 md:p-8 flex flex-col justify-between"
      style={{
        background: 'linear-gradient(145deg, hsl(var(--secondary) / 0.5), hsl(var(--secondary) / 0.2))',
        boxShadow: '0 0 40px hsl(var(--secondary) / 0.1)',
      }}
    >
      {cardContent}
    </motion.div>
  );
}
