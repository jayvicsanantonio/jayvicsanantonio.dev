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
      {/* On small screens, the greeting pill sits on its own row above the icon row */}
      <nav
        aria-label="Header navigation"
        className="inline-grid w-fit grid-cols-1 justify-items-center gap-2 sm:flex sm:w-auto sm:items-center sm:gap-2"
      >
        {/* Icon row (mobile): becomes contents on sm+ so items flow inline around greeting */}
        <div className="order-2 flex items-center gap-2 sm:order-none sm:contents">
          {/* LinkedIn (left) */}
          <span className="sm:order-1">
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
              className="bg-white/10 backdrop-blur-[24px] backdrop-saturate-200 border-white/55 hover:border-white/60"
            />
          </span>

          {/* Projects (left) */}
          <span className="sm:order-2">
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
          </span>

          {/* Work (right) */}
          <span className="sm:order-4">
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
          </span>

          {/* GitHub (right) */}
          <span className="sm:order-5">
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
          </span>
        </div>

        {/* Home (middle): greeting pill (solid) */}
        <Link
          href="/"
          aria-label="Home"
          className="pointer-events-auto order-1 inline-flex h-[clamp(48px,9.5vw,72px)] items-center justify-center rounded-full bg-cyan-900 px-5 font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-cyan-800 w-full sm:order-3 sm:w-auto sm:px-6 md:px-20"
          onClick={(e) => {
            e.preventDefault();
            // Force a full reload to ensure the homepage remounts and animations restart
            if (typeof window !== 'undefined') window.location.assign('/');
          }}
        >
          <span className="text-[clamp(14px,2.2vw,22px)]">Hi, I’m Jayvic 👋</span>
        </Link>
      </nav>
    </div>
  );
}
