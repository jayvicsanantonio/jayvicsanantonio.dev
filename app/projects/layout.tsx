import type React from 'react';

import GlassHeaderBubble from '@/components/ui/GlassHeaderBubble';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Top-centered header bubble shared across all /projects routes */}
      <div className="pointer-events-none fixed inset-x-0 top-[max(env(safe-area-inset-top),16px)] z-50 flex justify-center py-10">
        <div className="pointer-events-auto">
          <GlassHeaderBubble label="PROJECTS" vtClassName="vt-tag-projects" expandedWidthPx={200} />
        </div>
      </div>
      {children}
    </>
  );
}
