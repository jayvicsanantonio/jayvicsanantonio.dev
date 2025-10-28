import type React from "react";

import GlassHeaderBubble from "@/components/ui/GlassHeaderBubble";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-[max(env(safe-area-inset-top),16px)] z-[70] flex justify-center py-6 sm:py-10">
        <div className="pointer-events-auto">
          <GlassHeaderBubble label="WORK" expandedWidthPx={180} activeRoute="work" />
        </div>
      </div>
      {children}
    </>
  );
}
