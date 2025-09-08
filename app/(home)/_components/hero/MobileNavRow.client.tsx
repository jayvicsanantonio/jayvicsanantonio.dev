'use client';

import { Icon } from '@iconify/react';

import { GlassButton } from '@/components/ui/GlassButton';

export default function MobileNavRow() {
  return (
    <div
      className="pointer-events-none absolute top-[52%] left-1/2 z-50 flex w-[var(--nav-row-w)] -translate-x-1/2 items-center justify-between gap-3 sm:hidden"
      style={{ opacity: 'var(--ui, 0)' }}
    >
      <GlassButton
        href="/projects"
        aria-label="Projects"
        className="vt-tag-projects h-14 w-14"
      >
        <Icon icon="mdi:application-brackets" width={28} height={28} aria-hidden="true" />
      </GlassButton>
      <GlassButton
        href="https://www.linkedin.com/in/jayvicsanantonio/"
        aria-label="LinkedIn"
        className="h-14 w-14"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="mdi:linkedin" width={30} height={30} aria-hidden="true" />
      </GlassButton>
      <GlassButton
        href="/work"
        aria-label="Work Experience"
        className="vt-tag-work h-14 w-14"
      >
        <Icon icon="mdi:timeline-text" width={28} height={28} aria-hidden="true" />
      </GlassButton>
      <GlassButton
        href="https://github.com/jayvicsanantonio"
        aria-label="GitHub"
        className="h-14 w-14"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="mdi:github" width={30} height={30} aria-hidden="true" />
      </GlassButton>
    </div>
  );
}
