'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AmbientBackground from '@/components/pages/AmbientBackground';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

type Experience = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
};

const EXPERIENCES: Experience[] = [
  {
    title: 'Software Dev Engineer II',
    company: 'Yahoo Inc.',
    period: '2019 - 2023',
    bullets: [
      'Rebuilt the App Marketing business of the Yahoo DSP as a core developer using Ember, Java and MySQL, generating $140M+ in ad spend while navigating iOS 14.5 IDFA changes',
      'Scaled Email Audience Builder upload from 2M to 25M records (1150% improvement), preventing revenue risk and inspiring wider UI performance work',
      'Built revenue-impacting features and reusable frameworks with strong testing practices, earning trust to own complex components',
      'Mentored engineers and new hires, fostering a collaborative, growth-oriented culture',
      'Contributed to Ember OSS (upgrade-guide), featured in Ember Times Issue #166',
    ],
    tags: [
      'React',
      'Ember',
      'Express',
      'Node',
      'JS',
      'HTML',
      'CSS',
      'AWS',
      'Java',
      'MySQL',
      'AdTech',
    ],
  },
  {
    title: 'Software Dev Engineer',
    company: 'Yahoo Inc.',
    period: '2016 - 2019',
    bullets: [
      'Built the Yahoo DSP Replay tool with React for validating bid requests, speeding Product Support workflows in RTB systems',
      'Contributed to Yahoo DMP (Ember, Java, MySQL) driving multi-million dollar revenues',
      'Evaluated and championed Cypress to reduce flaky E2E tests, influencing adoption and CI integration',
      'Key contributor to major Ember upgrades improving performance and developer experience',
    ],
    tags: [
      'React',
      'Ember',
      'Express',
      'Node',
      'JS',
      'HTML',
      'CSS',
      'Java',
      'MySQL',
      'AdTech',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Voyager Innovations Inc.',
    period: '2016',
    bullets: [
      'Led teams to wins in multiple hackathons (Hack the Climate 2015, HERE Hackathon Manila 2014); semifinalist in Google Cloud Dev Challenge 2013',
      'Authored an editorial on hackathons for GMA News Online',
      'Delivered Lendr backend (Node, Express) for the Philippines’ first fully digital loan platform',
      'Architected scalable backend for Eat Bulaga! Mobile (Sails.js, MongoDB, Redis) serving 700K+ users',
      'Cultivated a culture of competitions and learning within engineering',
    ],
    tags: [
      'AWS',
      'Express',
      'Node',
      'SailsJS',
      'Redis',
      'MongoDB',
      'FinTech',
    ],
  },
  {
    title: 'Co-Founder',
    company: 'Saffron Technologies Inc.',
    period: '2015 - 2016',
    bullets: [
      'Represented the company at events (RISE 2015, NSTW 2015), unlocking partnerships and visibility',
      'Featured in PH tech media after winning IdeaSpace 2015, expanding reach and brand recognition',
      'Researched and implemented BLE for Croo wearable with reliability and cost efficiency',
      'Co-architected scalable AWS infra for the Croo Android companion app',
      'Automated deployments via Puppet to reduce errors and streamline releases',
    ],
    tags: ['AWS', 'Express', 'Node', 'Internet of Things'],
  },
  {
    title: 'Software Engineering Analyst',
    company: 'Voyager Innovations Inc.',
    period: '2013 - 2015',
    bullets: [
      'Redesigned SmartNet with OOP and JS best practices (Node, Sails, MongoDB, Redis, HTML/CSS)',
      'Refactored Pinoy Hoops (Express, jQuery, CSS, Pug, MongoDB, Redis) for reliability and performance',
    ],
    tags: [
      'Express',
      'Node',
      'SailsJS',
      'Redis',
      'MongoDB',
      'JS',
      'HTML',
      'CSS',
      'jQuery',
    ],
  },
  {
    title: 'Intern',
    company: 'UP Diliman CRS',
    period: '2012',
    bullets: [
      'Built a registration module with PostgreSQL, PHP, JS, and HTML/CSS; optimized schemas for speed',
      'Applied theory to practice with CodeIgniter in a production system',
    ],
    tags: ['PostgreSQL', 'PHP', 'JS', 'HTML', 'CSS'],
  },
  {
    title: 'Helpdesk Trainee',
    company: 'UP Diliman Network',
    period: '2011 - 2012',
    bullets: [
      'Provided campus-wide support for network issues ensuring reliable access to resources',
      'Developed hands-on Linux skills and appreciation for open-source',
      'Collaborated with the Computer Center team to maintain high service quality',
    ],
    tags: ['Linux'],
  },
];

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.6'],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const reveal = prefersReducedMotion
    ? { initial: {}, whileInView: {}, viewport: {}, transition: {} }
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1] as any,
        },
      };

  return (
    <section className="relative w-full">
      <AmbientBackground />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Intro */}
        <div className="space-y-5 max-w-3xl">
          <div className="font-oswald uppercase inline-block rounded-lg bg-white/5 px-3 py-1 tracking-wide text-white/90">
            Work
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-300 to-purple-500">
            A Timeline of Crafting Impact
          </h1>
          <p className="text-gray-300/85 md:text-lg">
            A narrative journey through products, platforms, and
            teams— guided by intention, refined by iteration,
            delivered with care.
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative mt-16">
          {/* Spine that fills with scroll */}
          <motion.div
            aria-hidden
            style={{ scaleY: prefersReducedMotion ? 1 : spineScale }}
            className="origin-top pointer-events-none absolute left-6 top-0 h-full w-[2px] bg-[linear-gradient(to_bottom,rgba(59,130,246,0.75),rgba(168,85,247,0.55),rgba(34,211,238,0.35),transparent)] shadow-[0_0_14px_rgba(59,130,246,0.25)] md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="relative mx-auto max-w-[1100px] space-y-16 md:space-y-24 pl-12 md:pl-0">
            {EXPERIENCES.map((item, index) => {
              const isRight = index % 2 === 1;
              return (
                <li
                  key={`${item.title}-${item.period}`}
                  className="relative"
                >
                  {/* Node on spine */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-6">
                    <span className="block h-2.5 w-2.5 rounded-full bg-cyan-300 ring-1 ring-cyan-400/60 shadow-[0_0_10px_3px_rgba(34,211,238,0.35)]" />
                  </div>

                  <div
                    className={`relative ${
                      isRight ? 'md:ml-[56%]' : 'md:mr-[56%]'
                    } md:pl-0`}
                  >
                    {/* Connector from spine to card (desktop) */}
                    <span
                      aria-hidden
                      className={`absolute top-7 hidden h-[2px] w-14 md:block ${
                        isRight
                          ? 'left-[-56px] bg-[linear-gradient(to_right,rgba(34,211,238,0)_0%,rgba(34,211,238,0.7)_40%,rgba(168,85,247,0.7)_100%)]'
                          : 'right-[-56px] bg-[linear-gradient(to_left,rgba(34,211,238,0)_0%,rgba(34,211,238,0.7)_40%,rgba(168,85,247,0.7)_100%)]'
                      } shadow-[0_0_10px_rgba(34,211,238,0.25)]`}
                    />

                    {/* Card */}
                    <motion.article
                      {...(reveal as any)}
                      className={`group w-full rounded-xl border border-gray-800/60 bg-gray-950/70 p-6 shadow-[0_8px_28px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-0.5 md:w-[min(436px,42vw)] ${
                        isRight ? 'md:ml-0' : 'md:mr-[6%]'
                      }`}
                    >
                      {/* Subtle halo */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl opacity-20 blur-xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)]"
                      />

                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <h3 className="font-oswald text-2xl bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                            {item.title}
                          </h3>
                          <p className="text-gray-400">
                            {item.company}
                          </p>
                        </div>
                        <span className="text-gray-400 whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-3 text-[0.98rem]/relaxed">
                        {item.bullets.map((b, i) => (
                          <li key={i} className="text-gray-300/90">
                            <Check
                              size={18}
                              className="mr-2 inline-block text-gray-400 align-top"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <Badge
                            key={t}
                            className="text-xs"
                            variant="secondary"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </motion.article>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
