'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AmbientBackground from '@/components/pages/AmbientBackground';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';
import { CASE_STUDIES } from '@/app/projects/case-data';

// CASE_STUDIES now sourced from case-data.ts

function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2 focus:ring-offset-background"
    >
      {children}
    </a>
  );
}

export default function ProjectsPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const reveal = prefersReducedMotion
    ? { initial: {}, whileInView: {}, viewport: {}, transition: {} }
    : {
        initial: { opacity: 0, y: 16 },
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

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full opacity-20 blur-3xl bg-[radial-gradient(closest-side,rgba(59,130,246,0.25),transparent)]" />
        <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full opacity-15 blur-3xl bg-[radial-gradient(closest-side,rgba(168,85,247,0.25),transparent)]" />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="space-y-5 max-w-3xl">
          <div className="font-oswald uppercase inline-block rounded-lg bg-white/5 px-3 py-1 tracking-wide text-white/90">
            Projects
          </div>
          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-cyan-300/90">
            Crafted Artifacts
          </h1>
          <p className="text-gray-300/85 text-base sm:text-lg max-w-[720px]">
            A curated collection of platforms, tools, and
            experiments—built with care, tuned for performance, and
            shaped by design.
          </p>
        </div>

        {/* Case studies only */}
        <Suspense fallback={null}>
          <SkillsAndCases
            prefersReducedMotion={prefersReducedMotion}
          />
        </Suspense>
      </div>
    </section>
  );
}

function SkillsAndCases({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const searchParams = useSearchParams();
  const initialFromQuery =
    (searchParams?.get('skill') || searchParams?.get('filter')) ??
    undefined;
  const skills = React.useMemo(
    () => [
      'All',
      'Enterprise',
      'Startup',
      'Hobby',
      'Client',
      'Open Source',
      'Sandboxes',
    ],
    []
  );

  const [active, setActive] = React.useState<string>(() =>
    initialFromQuery && skills.includes(initialFromQuery)
      ? initialFromQuery
      : 'All'
  );

  const reveal = prefersReducedMotion
    ? { initial: {}, whileInView: {}, viewport: {}, transition: {} }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },

        transition: { duration: 0.45 },
      };

  const priorityOrder = React.useMemo(
    () => [
      'yahoo-dsp',
      'webdevhub',
      'sync-flow',
      'tracknstick',
      'barbenheimer-vscode-theme',
      'barbenheimer-zed-theme',
      'ember-upgrade-guide',
    ],
    []
  );

  const visible = React.useMemo(() => {
    const filtered = CASE_STUDIES.filter(
      (c) => active === 'All' || c.skills.includes(active)
    );
    return filtered.slice().sort((a, b) => {
      const ai = priorityOrder.indexOf(a.slug);
      const bi = priorityOrder.indexOf(b.slug);
      if (ai !== -1 || bi !== -1) {
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      }
      return 0;
    });
  }, [active, priorityOrder]);

  return (
    <div className="mt-12">
      {/* Matrix */}
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`rounded-full px-3 py-1.5 text-xs sm:text-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-blue-400/60 ${
              active === s
                ? 'bg-purple-600/70 text-white border-purple-500/70'
                : 'bg-white/5 text-white/90 border-white/10'
            }`}
            aria-pressed={active === s}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Case studies rail */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {visible.map((c, i) => (
          <motion.article
            key={c.slug}
            {...(reveal as any)}
            transition={{
              ...(reveal.transition as any),
              delay: prefersReducedMotion ? 0 : 0.01 * i,
            }}
            className="group relative rounded-2xl p-[1px] min-h-[430px] bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(168,85,247,0.22),rgba(34,211,238,0.2))] shadow-[0_8px_28px_rgba(0,0,0,0.35)] ring-1 ring-white/5"
          >
            <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-gray-950/70 backdrop-blur-md overflow-hidden">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                width={c.image.width}
                height={c.image.height}
                style={{
                  aspectRatio: c.image.ratio,
                  objectFit: 'cover',
                }}
                className="w-full h-40 md:h-44 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-oswald text-xl text-white">
                    {c.title}
                  </h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] font-medium text-gray-300 whitespace-nowrap">
                    {c.period}
                  </span>
                </div>
                <p className="text-gray-300/90 text-[0.98rem]/relaxed flex-1 overflow-hidden">
                  {c.blurb}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {c.metrics.map((m) => (
                    <li
                      key={m}
                      className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-white/90"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2">
                  {c.links.map((l) => (
                    <LinkButton
                      key={`${c.slug}-${l.label}`}
                      href={l.href}
                    >
                      {l.icon}
                      {l.icon ? <>&nbsp;</> : null}
                      {l.label}
                    </LinkButton>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
