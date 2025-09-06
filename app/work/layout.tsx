"use client";

import GlassHeaderBubble from "@/components/ui/GlassHeaderBubble";
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";
import { Icon } from "@iconify/react";
import React from "react";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      <div className="fixed inset-x-0 top-[max(env(safe-area-inset-top),16px)] z-50 flex justify-center pointer-events-none py-10">
        <div className="pointer-events-auto">
          <GlassHeaderBubble
            prefersReducedMotion={prefersReducedMotion}
            label="WORK"
            vtClassName="vt-tag-work"
            expandedWidthPx={180}
            icon={
              <Icon
                icon="mdi:timeline-text"
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
