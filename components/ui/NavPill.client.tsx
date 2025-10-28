"use client";

import { useEffect } from "react";

type NavPillMotionProps = {
  targetId: string;
};

export default function NavPillMotion({ targetId }: NavPillMotionProps) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const my = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      el.style.setProperty("--mx", String(mx));
      el.style.setProperty("--my", String(my));
    };

    const handleLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [targetId]);

  return null;
}
