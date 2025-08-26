'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

const FEATURED_PROJECTS = [
  {
    title: 'Yahoo DSP',
    subtitle: 'Enterprise Programmatic Platform',
    description:
      'Architected and scaled a programmatic advertising platform handling millions of RTB requests, contributing to $140M+ in ad spend with performance improvements of over 1150%.',
    image: '/images/home/yahoo-dsp.webp',
    metrics: [
      '$140M+ Ad Spend',
      '+1150% Throughput',
      'Enterprise Scale',
    ],
    technologies: ['React', 'Ember.js', 'Node.js', 'Performance'],
    link: 'https://www.advertising.yahooinc.com/our-dsp',
    github: null,
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    title: 'SyncFlow',
    subtitle: 'Edge-Deployed Task Synchronization',
    description:
      'Built a lightning-fast task sync service bridging Apple Reminders and Google Tasks with <100ms edge latency, OAuth integration, and Redis-backed state management.',
    image: '/images/projects/sync-flow.png',
    metrics: ['<100ms Latency', 'Edge Computing', 'Zero Cold Starts'],
    technologies: ['TypeScript', 'Hono', 'Edge Functions', 'Redis'],
    link: 'https://sync-flow-nine.vercel.app/',
    github: 'https://github.com/jayvicsanantonio/sync-flow',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Barbenheimer Theme',
    subtitle: 'Developer Experience Innovation',
    description:
      'Created a viral VS Code theme blending playful and dramatic aesthetics, distributed across multiple editors with thousands of downloads and positive community adoption.',
    image: '/images/home/barbenheimer.webp',
    metrics: [
      'Marketplace Success',
      'Multi-Platform',
      'Community Loved',
    ],
    technologies: ['Design Systems', 'DX', 'Open Source'],
    link: 'https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer',
    github:
      'https://github.com/jayvicsanantonio/barbenheimer-vscode-theme',
    gradient: 'from-pink-500 to-purple-600',
  },
];

export default function FeaturedProjects({
  impactRef,
}: {
  impactRef: React.RefObject<HTMLElement>;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    springConfig
  );

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen py-20"
      style={{ y: prefersReducedMotion ? 0 : y, opacity }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-cyan-300/90 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Where vision meets execution. These projects represent
            more than code—they're solutions that moved metrics,
            delighted users, and pushed boundaries.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="max-w-7xl mx-auto">
          {FEATURED_PROJECTS.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group relative rounded-2xl p-[1px] sm:p-[1.2px] shadow-[0_8px_28px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-transform duration-300 bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(168,85,247,0.22),rgba(34,211,238,0.2))] mb-8`}
            >
              {/* Subtle halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-20 blur-xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)]"
              />

              {/* Inner frosted panel */}
              <div className="relative rounded-2xl border border-white/5 bg-gray-950/70 backdrop-blur-md p-5 sm:p-6">
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Project Image */}
                  <motion.div
                    className={`relative ${
                      index % 2 === 1 ? 'lg:col-start-2' : ''
                    }`}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    {/* Floating Metrics */}
                    <div className="absolute -top-4 -right-4 bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                      <div className="text-sm text-white/60 mb-1">
                        Key Metrics
                      </div>
                      {project.metrics.map((metric) => (
                        <div
                          key={metric}
                          className="text-sm font-medium text-white"
                        >
                          {metric}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Project Content */}
                  <motion.div
                    className={`space-y-6 ${
                      index % 2 === 1 ? 'lg:col-start-1' : ''
                    }`}
                    initial={{
                      opacity: 0,
                      x: index % 2 === 0 ? -50 : 50,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <div className="text-sm text-white/60 mb-2 uppercase tracking-wider">
                        {project.subtitle}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-lg text-white/80 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2 focus:ring-offset-background"
                        >
                          <Github size={18} />
                          Github
                        </Link>
                      )}
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2 focus:ring-offset-background"
                      >
                        <ExternalLink size={18} />
                        View Project
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* More Projects Teaser */}
        <div className="text-center mt-20">
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            These are just the highlights. From enterprise platforms
            to creative experiments, each project tells a story of
            innovation, problem-solving, and technical excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-700/50 hover:bg-slate-700 rounded-full text-white transition-colors duration-200"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl" />
      </div>
    </motion.section>
  );
}
