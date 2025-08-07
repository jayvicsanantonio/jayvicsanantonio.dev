'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ProjectButton from '@/components/pages/ProjectButton';
import { Github } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

type Project = {
  title: string;
  image: {
    src: string;
    alt: string;
    ratio: string;
    height: number;
    width: number;
  };
  description: React.ReactNode;
  links: { label: string; href: string; icon?: React.ReactNode }[];
  tags: ('Featured' | 'Open Source')[];
};

const projects: Project[] = [
  {
    title: 'Yahoo DSP',
    image: {
      src: '/images/home/yahoo-dsp.webp',
      alt: 'Yahoo DSP',
      ratio: '400/125',
      height: 125,
      width: 400,
    },
    description: (
      <>
        A cutting-edge programmatic advertising platform for
        businesses. Built with a powerful tech stack including{' '}
        <em className="font-bold">Ember.js</em>,{' '}
        <em className="font-bold">React.js</em>, and{' '}
        <em className="font-bold">Node.js</em>, the platform empowers
        advertisers with features like real-time bidding, audience
        targeting, and comprehensive campaign performance measurement.
      </>
    ),
    links: [
      {
        label: 'View Project',
        href: 'https://www.advertising.yahooinc.com/our-dsp',
      },
    ],
    tags: ['Featured'],
  },
  {
    title: 'Barbenheimer VS Code Theme',
    image: {
      src: '/images/home/barbenheimer.webp',
      alt: 'Barbenheimer VS Code Theme',
      ratio: '400/225',
      height: 225,
      width: 400,
    },
    description: (
      <>
        A VS Code theme inspired by the Internet phenomenon of the
        same name. It combines the pink and playful aesthetics of
        Barbie with the dark and dramatic tones of Oppenheimer.
      </>
    ),
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/barbenheimer-vscode-theme',
        icon: <Github size={20} />,
      },
      {
        label: 'View Project',
        href: 'https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer',
      },
    ],
    tags: ['Open Source'],
  },
  {
    title: 'Web Development Hub',
    image: {
      src: '/images/home/webdevhub.png',
      alt: 'Web Development Hub',
      ratio: '400/225',
      height: 225,
      width: 400,
    },
    description: (
      <>
        An extensive library of categorized links tailored for web
        developers, featuring curated resources on learning, developer
        tools, frameworks, libraries, blogs and communities.
      </>
    ),
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/web-development-hub',
        icon: <Github size={20} />,
      },
      { label: 'View Project', href: 'https://webdevhub.link/' },
    ],
    tags: ['Open Source'],
  },
  {
    title: 'Barbenheimer Zed Theme',
    image: {
      src: '/images/projects/barbenheimer-zed-theme.webp',
      alt: 'Barbenheimer Zed Theme',
      ratio: '400/225',
      height: 225,
      width: 400,
    },
    description: (
      <>
        A zed theme inspired by the "Barbenheimer" cultural
        phenomenon, offering distinct styles that capture the essence
        of both Barbie and Oppenheimer. While each theme leans towards
        a different aesthetic, they share a cohesive color palette
        with subtle nods to both films, creating a balanced and
        unified experience.
      </>
    ),
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/barbenheimer-zed-theme',
        icon: <Github size={20} />,
      },
      {
        label: 'View Project',
        href: 'https://zed.dev/extensions?query=Barbenheimer',
      },
    ],
    tags: ['Open Source'],
  },
  {
    title: 'SyncFlow',
    image: {
      src: '/images/projects/sync-flow.png',
      alt: 'SyncFlow',
      ratio: '400/225',
      height: 225,
      width: 400,
    },
    description: (
      <>
        A real-time task synchronization service that bridges Apple
        Reminders and Google Tasks, built with TypeScript, Hono
        framework, and deployed on Vercel's edge network with OAuth
        2.0 authentication, webhook-based updates, and Redis-backed
        state management.
      </>
    ),
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/sync-flow',
        icon: <Github size={20} />,
      },
      {
        label: 'View Project',
        href: 'https://sync-flow-nine.vercel.app/',
      },
    ],
    tags: ['Open Source'],
  },
  {
    title: 'Malayang Mananampalataya Church',
    image: {
      src: '/images/home/mm-church.webp',
      alt: 'Malayang Mananampalataya Church',
      ratio: '400/225',
      height: 225,
      width: 400,
    },
    description: (
      <>
        Built with React.js, this Philippines church website fosters a
        strong connection between the church and its congregation.
        Easy navigation allows users to explore sermons, ministries,
        and events. Responsive design ensures the website looks great
        and is accessible across devices.
      </>
    ),
    links: [
      {
        label: 'Github',
        href: 'https://github.com/nesceal/mmchurch',
        icon: <Github size={20} />,
      },
      { label: 'View Project', href: 'https://mmchurch.ph/' },
    ],
    tags: [],
  },
];

const filters = ['All', 'Featured', 'Open Source'] as const;

export default function ProjectsGrid() {
  const [active, setActive] =
    useState<(typeof filters)[number]>('All');
  const prefersReducedMotion = usePrefersReducedMotion();

  const visibleProjects = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter((p) => p.tags.includes(active as any));
  }, [active]);

  const reveal = prefersReducedMotion
    ? { initial: {}, whileInView: {}, transition: {} }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
      };

  return (
    <section className="w-full">
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full px-4 py-2 text-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-[color:oklch(74%_0.16_276)]/60 ${
              active === f
                ? 'bg-linear-to-r from-blue-500/80 to-purple-500/80 text-white'
                : 'bg-transparent text-inherit'
            }`}
            aria-pressed={active === f}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Featured (Yahoo DSP) */}
      <motion.div {...reveal} viewport={{ once: true, amount: 0.25 }}>
        {renderProjectCard(projects[0])}
      </motion.div>

      <div className="mt-16 space-y-8">
        <h2 className="font-oswald text-2xl font-bold tracking-tighter">
          All Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {visibleProjects.slice(1).map((p, i) => (
            <motion.div
              key={p.title}
              {...reveal}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                ...(reveal.transition as any),
                delay: prefersReducedMotion ? 0 : 0.05 * i,
              }}
            >
              {renderProjectCard(p)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderProjectCard(p: Project) {
  return (
    <Card className="flex flex-col h-full border-purple-400 dark:border-purple-900 border-2 rounded-lg overflow-hidden shadow-md will-change-transform">
      <CardContent className="flex-1 -p-6 max-h-60 rounded-t-lg overflow-hidden">
        <Image
          alt={p.image.alt}
          className="w-full h-full object-cover"
          height={p.image.height}
          src={p.image.src}
          style={{ aspectRatio: p.image.ratio, objectFit: 'cover' }}
          width={p.image.width}
        />
      </CardContent>
      <CardFooter className="dark:bg-gray-950 text-gray-950 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
        <div className="flex flex-1 flex-start justify-between gap-2">
          <div className="space-y-2">
            <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
              {p.title}
            </h3>
            <p className="dark:text-gray-200">{p.description}</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4 flex-wrap">
          {p.links.map((l) => (
            <ProjectButton
              key={`${p.title}-${l.label}`}
              link={l.href}
            >
              {l.icon}
              {l.icon ? <>&nbsp;</> : null}
              {l.label}
            </ProjectButton>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
