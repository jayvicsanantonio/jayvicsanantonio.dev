import type React from "react";

import GlassHeaderBubble from "@/components/ui/GlassHeaderBubble";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Top-centered header bubble shared across all /projects routes */}
      <div className="pointer-events-none fixed inset-x-0 top-[max(env(safe-area-inset-top),16px)] z-[70] flex justify-center py-6 sm:py-10">
        <div className="pointer-events-auto">
          <GlassHeaderBubble label="PROJECTS" expandedWidthPx={200} />
        </div>
      </div>
      {children}
    </>
  );
}
