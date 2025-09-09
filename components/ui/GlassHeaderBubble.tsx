'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavPill } from '@/components/ui/NavPill';
export type GlassHeaderBubbleProps = {
  label: string;
  vtClassName?: string; // e.g., vt-tag-projects, vt-tag-work
  collapsedWidthPx?: number; // defaults to 80 (w-20)
  expandedWidthPx?: number; // defaults to 200
};

export default function GlassHeaderBubble({
  label: _label,
  vtClassName: _vtClassName,
  collapsedWidthPx: _collapsedWidthPx = 80,
  expandedWidthPx: _expandedWidthPx = 200,
}: GlassHeaderBubbleProps) {
  const pathname = usePathname();

  const isProjects = pathname?.startsWith('/projects');
  const isWork = pathname?.startsWith('/work');

  // Only keep vtTag on the expanded nav button for current route.
  // If the parent passes vt-tag-... to this header bubble, suppress it
  // when that tag matches the current route to avoid duplicate VT elements.

  // Delay the active pill expansion slightly to echo the main bubble

  return (
    <div className={`relative inline-flex items-center ${_vtClassName ?? ''}`}>
      {/* Inline nav buttons - order: LinkedIn, Projects, Home, Work, GitHub */}
      <nav aria-label="Header navigation" className="flex flex-wrap items-center gap-1 sm:gap-2">
        {/* LinkedIn (left) */}
        <NavPill
          href="https://www.linkedin.com/in/jayvicsanantonio/"
          ariaLabel="LinkedIn"
          icon={
            <Icon
              icon="mdi:linkedin"
              className="h-[clamp(24px,6vw,36px)] w-[clamp(24px,6vw,36px)]"
              aria-hidden="true"
            />
          }
          external
          tooltip="LinkedIn"
          tooltipPlacement="below"
          collapsedPx={'clamp(56px,11vw,84px)'}
          heightPx={'clamp(48px,9.5vw,72px)'}
          className="bg-white/20 backdrop-blur-[24px] backdrop-saturate-200 border-white/55 hover:border-white/60"
        />

        {/* Projects (left) */}
        <NavPill
          href="/projects"
          ariaLabel="Projects"
          icon={
            <Icon
              icon="mdi:application-brackets"
              className="h-[clamp(24px,6vw,36px)] w-[clamp(24px,6vw,36px)] font-bold"
              aria-hidden="true"
            />
          }
          label="Projects"
          active={isProjects}
          {...(isProjects ? { vtTagName: 'projects' } : {})}
          {...(!isProjects ? { tooltip: 'Projects', tooltipPlacement: 'below' as const } : {})}
          collapsedPx={'clamp(56px,11vw,84px)'}
          expandedPx={'clamp(120px,40vw,180px)'}
          heightPx={'clamp(48px,9.5vw,72px)'}
          className={[
            'bg-white/20 backdrop-blur-[24px] backdrop-saturate-200',
            !isProjects ? 'border-white/55 hover:border-white/60' : '',
          ].join(' ')}
        />

        {/* Home (middle): greeting pill (solid) */}
        <Link
          href="/"
          aria-label="Home"
          className="pointer-events-auto inline-flex h-[clamp(48px,9.5vw,72px)] items-center justify-center rounded-full bg-cyan-900 px-5 font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-cyan-800 sm:px-6 md:px-20"
          onClick={(e) => {
            e.preventDefault();
            // Force a full reload to ensure the homepage remounts and animations restart
            if (typeof window !== 'undefined') window.location.assign('/');
          }}
        >
          <span className="text-[clamp(14px,2.2vw,22px)]">Hi, I’m Jayvic 👋</span>
        </Link>

        {/* Work (right) */}
        <NavPill
          href="/work"
          ariaLabel="Work"
          icon={
            <Icon
              icon="mdi:timeline-text"
              className="h-[clamp(24px,6vw,36px)] w-[clamp(24px,6vw,36px)]"
              aria-hidden="true"
            />
          }
          label="Work"
          active={isWork}
          {...(isWork ? { vtTagName: 'work' } : {})}
          {...(!isWork ? { tooltip: 'Work', tooltipPlacement: 'below' as const } : {})}
          collapsedPx={'clamp(56px,11vw,84px)'}
          expandedPx={'clamp(104px,34vw,160px)'}
          heightPx={'clamp(48px,9.5vw,72px)'}
          className={[
            'bg-white/20 backdrop-blur-[24px] backdrop-saturate-200',
            !isWork ? 'border-white/55 hover:border-white/60' : '',
          ].join(' ')}
        />

        {/* GitHub (right) */}
        <NavPill
          href="https://github.com/jayvicsanantonio"
          ariaLabel="GitHub"
          icon={
            <Icon
              icon="mdi:github"
              className="h-[clamp(24px,6vw,36px)] w-[clamp(24px,6vw,36px)]"
              aria-hidden="true"
            />
          }
          external
          tooltip="GitHub"
          tooltipPlacement="below"
          collapsedPx={'clamp(56px,11vw,84px)'}
          heightPx={'clamp(48px,9.5vw,72px)'}
          className="bg-white/20 backdrop-blur-[24px] backdrop-saturate-200 border-white/55 hover:border-white/60"
        />
      </nav>
    </div>
  );
}
