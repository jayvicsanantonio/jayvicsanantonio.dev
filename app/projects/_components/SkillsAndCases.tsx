'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { PROJECTS } from '@/app/projects/projects.data';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

import ProjectLink from './ProjectLink';

const SKILL_FILTERS = [
  'All',
  'Enterprise',
  'Startup',
  'Hobby',
  'Client',
  'Open Source',
  'Sandboxes',
] as const;

const PRIORITY_ORDER = [
  'yahoo-dsp',
  'webdevhub',
  'sync-flow',
  'tracknstick',
  'barbenheimer-vscode-theme',
  'barbenheimer-zed-theme',
  'ember-upgrade-guide',
];

export default function SkillsAndCases() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialFromQuery = (searchParams?.get('skill') || searchParams?.get('filter')) ?? undefined;

  // Fixed, curated filters
  const [active, setActive] = React.useState<string>(() =>
    initialFromQuery && SKILL_FILTERS.includes(initialFromQuery as any)
      ? (initialFromQuery as (typeof SKILL_FILTERS)[number])
      : 'All',
  );

  // Announce filter changes for screen readers
  const [announce, setAnnounce] = React.useState<string>('');

  // Keep URL query param in sync with active filter (replace to avoid history spam)
  React.useEffect(() => {
    try {
      const currentQS = searchParams?.toString() ?? '';
      const params = new URLSearchParams(currentQS);
      if (active === 'All') {
        params.delete('skill');
        params.delete('filter');
      } else {
        params.set('skill', active);
      }
      const qs = params.toString();
      // Avoid redundant replaces that can trigger nested view transitions
      if (qs !== currentQS) {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }
      setAnnounce(`Filter: ${active}`);
    } catch {
      // no-op
    }
    // Intentionally omitting searchParams from deps to avoid feedback loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, pathname, router]);

  // CSS-first entrance animation; we keep Framer only for future interactions

  // Card animation handled via CSS keyframes (animate-fade-in-up)

  const visible = React.useMemo(() => {
    const filtered = PROJECTS.filter((c) => active === 'All' || c.skills.includes(active));
    return filtered.slice().sort((a, b) => {
      const ai = PRIORITY_ORDER.indexOf(a.slug);
      const bi = PRIORITY_ORDER.indexOf(b.slug);
      if (ai !== -1 || bi !== -1) {
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      }
      return 0;
    });
  }, [active]);

  return (
    <div className="mt-12">
      {/* SR announcement for filter changes */}
      <span className="sr-only" aria-live="polite" role="status">
        {announce}
      </span>
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex gap-2 whitespace-nowrap sm:flex sm:flex-wrap">
          {SKILL_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`relative inline-flex min-h-11 items-center rounded-full border px-3 py-2 text-xs backdrop-blur-md backdrop-saturate-[140%] transition-colors sm:text-sm ${
                active === s
                  ? 'border-cyan-400/60 bg-cyan-900/70 text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)]'
                  : 'border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06))] text-white/90 hover:border-white/50'
              } focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2`}
              aria-pressed={active === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <div key={active} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((c, i) => (
          <article
            key={c.slug}
            className={`group cq relative min-h-[360px] transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(168,85,247,0.22),rgba(34,211,238,0.2))] p-[1px] shadow-[0_8px_28px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-transform duration-300 [transform-style:preserve-3d] after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 md:min-h-[430px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] ${!prefersReducedMotion ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: !prefersReducedMotion ? `${80 * i}ms` : undefined }}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-gray-950/70 backdrop-blur-md [@container(min-width:36rem)]:grid [@container(min-width:36rem)]:grid-cols-[1fr,1.5fr]">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                width={c.image.width}
                height={c.image.height}
                style={{ aspectRatio: c.image.ratio }}
                className="h-36 w-full transform-gpu object-cover transition-transform duration-500 ease-out [will-change:transform] md:h-44 md:group-hover:translate-y-[-2px] md:group-hover:scale-[1.03] [@container(min-width:28rem)]:h-44 [@container(min-width:36rem)]:h-full"
              />
              <div className="flex flex-1 flex-col gap-3 p-5 [@container(min-width:36rem)]:p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-oswald text-xl text-white">{c.title}</h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.12em] whitespace-nowrap text-gray-300 uppercase">
                    {c.period}
                  </span>
                </div>
                <p className="hyphenate flex-1 overflow-hidden text-[0.98rem]/relaxed text-gray-300/90">
                  {c.blurb}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {c.links.map((l) => {
                    let icon: React.ReactNode = null;
                    switch (l.icon) {
                      case 'github':
                        icon = <Icon icon="mdi:github" width={18} height={18} />;
                        break;
                      case 'watch':
                        icon = <Icon icon="mdi:play" width={16} height={16} />;
                        break;
                      case 'marketplace':
                      case 'external':
                      case 'view':
                        icon = <Icon icon="mdi:open-in-new" width={16} height={16} />;
                        break;
                      default:
                        icon = null;
                    }
                    return (
                      <ProjectLink key={`${c.slug}-${l.label}`} href={l.href}>
                        {icon}
                        {icon ? <>&nbsp;</> : null}
                        {l.label}
                      </ProjectLink>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
