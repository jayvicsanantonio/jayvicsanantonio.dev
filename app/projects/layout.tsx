'use client';

import { Icon } from '@iconify/react';
import React from 'react';

import GlassHeaderBubble from '@/components/ui/GlassHeaderBubble';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      {/* Top-centered header bubble shared across all /projects routes */}
      <div className="pointer-events-none fixed inset-x-0 top-[max(env(safe-area-inset-top),16px)] z-50 flex justify-center py-10">
        <div className="pointer-events-auto">
          <GlassHeaderBubble
            prefersReducedMotion={prefersReducedMotion}
            label="PROJECTS"
            vtClassName="vt-tag-projects"
            expandedWidthPx={200}
            icon={
              <Icon
                icon="mdi:application-brackets"
                width={28}
                height={28}
                className="text-white/90"
                aria-hidden="true"
              />
            }
          />
        </div>
      </div>
      {children}
    </>
  );
}
