"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillContentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!pillRef.current || !pillContentRef.current || !videoRef.current) {
        return;
      }

      const finalPanelState = {
        width: "100%",
        height: "100%",
        borderRadius: "32px",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      };

      if (prefersReducedMotion) {
        gsap.set(pillRef.current, {
          ...finalPanelState,
        });
        gsap.set(pillContentRef.current, { autoAlpha: 0 });
        gsap.set(videoRef.current, { autoAlpha: 1 });
        if (videoOverlayRef.current) {
          gsap.set(videoOverlayRef.current, { autoAlpha: 1 });
        }
        videoRef.current.play().catch(() => {});
        return;
      }

      const timeline = gsap.timeline();

      timeline
        .set(videoRef.current, { autoAlpha: 0 })
        .set(videoOverlayRef.current, { autoAlpha: 0 })
        .to(
          pillRef.current,
          {
            delay: 1,
            duration: 1.5,
            ...finalPanelState,
            ease: "power1.inOut",
          },
          0,
        )
        .to(
          pillContentRef.current,
          {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .to(
          [videoRef.current, videoOverlayRef.current],
          {
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
            onStart: () => {
              videoRef.current?.play().catch(() => {});
            },
          },
          "-=0.2",
        );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black from-70% via-gray-800 via-100% to-gray-200 to-100% text-white [--nav-row-w:calc(3.5rem*4+0.75rem*3)] [--pill-h:54px] sm:[--nav-row-w:20vw] sm:[--pill-h:8vh] md:[--nav-row-w:24vw]"
    >
      <div className="absolute inset-0 px-7 pt-7 pb-[120px]">
        <div className="relative h-full w-full">
          <div
            ref={pillRef}
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
          >
            <span
              ref={pillContentRef}
              className="font-semibold tracking-wide text-black text-base lg:text-2xl"
            >
              Hi, I&apos;m Jayvic 👋
            </span>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              tabIndex={-1}
              className="absolute inset-0 z-0 h-full w-full rounded-[inherit] object-cover opacity-0"
            >
              <source src="/matrix-horizontal.mp4" type="video/mp4" />
            </video>
            <div
              ref={videoOverlayRef}
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/100"
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
