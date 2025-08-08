import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AmbientBackground from '@/components/pages/AmbientBackground';
import {
  CASE_STUDIES,
  findCaseStudy,
} from '@/app/projects/case-data';

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = findCaseStudy(params.slug);
  if (!cs) return notFound();

  return (
    <section className="relative w-full">
      <AmbientBackground />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4 max-w-4xl">
          <div className="font-oswald uppercase inline-block rounded-lg bg-white/5 px-3 py-1 tracking-wide text-white/90">
            Case Study
          </div>
          <h1 className="font-oswald text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-300 to-purple-500">
            {cs.title}
          </h1>
          <p className="text-gray-300/85 text-base sm:text-lg max-w-[720px]">
            {cs.blurb}
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.12em] text-gray-300">
              {cs.period}
            </span>
            {cs.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/90"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/5 bg-gray-950/70 backdrop-blur-md">
          <Image
            src={cs.image.src}
            alt={cs.image.alt}
            width={cs.image.width}
            height={cs.image.height}
            style={{
              aspectRatio: cs.image.ratio,
              objectFit: 'cover',
            }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {cs.sections.map((sec) => (
            <article
              key={sec.label}
              className="rounded-xl border border-white/5 bg-gray-950/70 backdrop-blur-md p-6"
            >
              <h2 className="font-oswald text-xl bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 mb-2">
                {sec.label}
              </h2>
              <div className="text-gray-300/90 text-[0.98rem]/relaxed">
                {sec.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
