"use client";

import { useEffect, useRef, useState } from "react";

const DOT_OFFSET = 3;
const GLOW_OFFSET = 60;
const LERP_FACTOR = 0.18;
const FALLBACK_GLOW =
  "radial-gradient(circle at center, rgba(59,130,246,0.28), rgba(168,85,247,0.24), rgba(34,211,238,0.12))";
const CONIC_GLOW =
  "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.25), rgba(168,85,247,0.25), rgba(34,211,238,0.2), rgba(59,130,246,0.25))";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [glowBackground] = useState(() => {
    if (typeof window !== "undefined" && window.CSS?.supports?.("background: conic-gradient(red, blue)")) {
      return CONIC_GLOW;
    }
    return FALLBACK_GLOW;
  });

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerFine = window.matchMedia("(pointer: fine)");
    const supportsPointerEvents = "PointerEvent" in window;

    let raf = 0;
    let isLooping = false;
    let trackingPointer = false;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const setActiveState = (active: boolean) => {
      const value = active ? "true" : "false";
      dot.dataset.active = value;
      glow.dataset.active = value;
    };

    const stopLoop = () => {
      if (!isLooping) return;
      isLooping = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const step = () => {
      const deltaX = targetX - currentX;
      const deltaY = targetY - currentY;
      currentX += deltaX * LERP_FACTOR;
      currentY += deltaY * LERP_FACTOR;
      glow.style.transform = `translate3d(${currentX - GLOW_OFFSET}px, ${currentY - GLOW_OFFSET}px, 0)`;

      if (Math.abs(deltaX) < 0.1 && Math.abs(deltaY) < 0.1) {
        isLooping = false;
        return;
      }

      raf = requestAnimationFrame(step);
    };

    const ensureLoop = () => {
      if (isLooping) return;
      isLooping = true;
      raf = requestAnimationFrame(step);
    };

    const updateTargets = (x: number, y: number) => {
      targetX = x;
      targetY = y;

      dot.style.transform = `translate3d(${targetX - DOT_OFFSET}px, ${targetY - DOT_OFFSET}px, 0)`;
      setActiveState(true);
      ensureLoop();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      updateTargets(event.clientX, event.clientY);
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateTargets(event.clientX, event.clientY);
    };

    const startTracking = () => {
      if (trackingPointer) return;
      trackingPointer = true;
      if (supportsPointerEvents) {
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        return;
      }
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    };

    const stopTracking = () => {
      if (!trackingPointer) return;
      trackingPointer = false;
      if (supportsPointerEvents) {
        window.removeEventListener("pointermove", handlePointerMove);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      stopLoop();
      setActiveState(false);
      currentX = targetX;
      currentY = targetY;
    };

    const shouldAnimate = () => !prefersReduced.matches && pointerFine.matches;
    const refreshTracking = () => {
      if (shouldAnimate()) {
        startTracking();
      } else {
        stopTracking();
      }
    };

    refreshTracking();

    const handlePreferenceChange = () => refreshTracking();
    const mediaQueryLists = [prefersReduced, pointerFine];

    mediaQueryLists.forEach((media) => {
      if (media.addEventListener) {
        media.addEventListener("change", handlePreferenceChange);
      } else {
        media.addListener(handlePreferenceChange);
      }
    });

    return () => {
      stopTracking();
      mediaQueryLists.forEach((media) => {
        if (media.removeEventListener) {
          media.removeEventListener("change", handlePreferenceChange);
        } else {
          media.removeListener(handlePreferenceChange);
        }
      });
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        data-active="false"
        style={{ background: glowBackground }}
        className="pointer-events-none fixed z-[60] h-[120px] w-[120px] rounded-full opacity-0 blur-2xl mix-blend-screen data-[active=true]:opacity-40 [transition:opacity_200ms_ease,transform_60ms_linear] [will-change:transform]"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        data-active="false"
        className="pointer-events-none fixed z-[61] h-1.5 w-1.5 rounded-full bg-cyan-300 opacity-0 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)] transition-opacity duration-200 ease-out data-[active=true]:opacity-100 [will-change:transform]"
      />
    </>
  );
}
