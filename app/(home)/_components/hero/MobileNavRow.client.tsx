'use client';

import { Icon } from '@iconify/react';

import { GlassButton } from '@/components/ui/GlassButton';

export default function MobileNavRow() {
  return (
    <div
      className="pointer-events-none absolute top-[calc(46%+4rem)] left-1/2 z-[70] flex w-[calc(100vw-2rem)] max-w-[var(--nav-row-w)] -translate-x-1/2 items-center justify-between gap-2 px-2 sm:hidden"
      style={{
        opacity: 'var(--ui, 0)',
        paddingLeft: 'max(env(safe-area-inset-left), 0.5rem)',
        paddingRight: 'max(env(safe-area-inset-right), 0.5rem)',
      }}
    >
      <GlassButton
        href="/projects"
        aria-label="Projects"
        className="vt-tag-projects h-12 w-12 min-w-[3rem] bg-white/30 backdrop-blur-[28px] backdrop-saturate-[220%] border-white/60 hover:border-white/65 will-change-transform"
      >
        <Icon icon="mdi:application-brackets" width={24} height={24} aria-hidden="true" />
      </GlassButton>
      <GlassButton
        href="https://www.linkedin.com/in/jayvicsanantonio/"
        aria-label="LinkedIn"
        className="h-12 w-12 min-w-[3rem] bg-white/30 backdrop-blur-[28px] backdrop-saturate-[220%] border-white/60 hover:border-white/65 will-change-transform"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="mdi:linkedin" width={26} height={26} aria-hidden="true" />
      </GlassButton>
      <GlassButton
        href="/work"
        aria-label="Work Experience"
        className="vt-tag-work h-12 w-12 min-w-[3rem] bg-white/30 backdrop-blur-[28px] backdrop-saturate-[220%] border-white/60 hover:border-white/65 will-change-transform"
      >
        <Icon icon="mdi:timeline-text" width={24} height={24} aria-hidden="true" />
      </GlassButton>
      <GlassButton
        href="https://github.com/jayvicsanantonio"
        aria-label="GitHub"
        className="h-12 w-12 min-w-[3rem] bg-white/30 backdrop-blur-[28px] backdrop-saturate-[220%] border-white/60 hover:border-white/65 will-change-transform"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="mdi:github" width={26} height={26} aria-hidden="true" />
      </GlassButton>
    </div>
  );
}
