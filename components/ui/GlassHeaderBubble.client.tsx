"use client";

import { useEffect } from "react";

type GlassHeaderBubbleClientProps = {
  homeLinkId: string;
};

export default function GlassHeaderBubbleClient({ homeLinkId }: GlassHeaderBubbleClientProps) {
  useEffect(() => {
    const link = document.getElementById(homeLinkId);
    if (!link) return;

    const handler = (event: MouseEvent) => {
      event.preventDefault();
      window.location.assign("/");
    };

    link.addEventListener("click", handler);
    return () => {
      link.removeEventListener("click", handler);
    };
  }, [homeLinkId]);

  return null;
}
