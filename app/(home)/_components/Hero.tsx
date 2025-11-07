"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const PANEL_BORDER_RADIUS = "32px";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillContentRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!pillRef.current || !pillContentRef.current || !videoRef.current) {
        return;
      }

      const finalGeometryState = {
        width: "100%",
        height: "100%",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      };

      const finalPanelState = {
        ...finalGeometryState,
        borderRadius: PANEL_BORDER_RADIUS,
      };

      if (prefersReducedMotion) {
        gsap.set(pillRef.current, {
          ...finalPanelState,
          backgroundColor: "transparent",
        });
        gsap.set(pillContentRef.current, { autoAlpha: 0 });
        gsap.set(videoRef.current, { autoAlpha: 1 });
        if (videoOverlayRef.current) {
          gsap.set(videoOverlayRef.current, { autoAlpha: 1 });
        }
        if (profileRef.current) {
          gsap.set(profileRef.current, { autoAlpha: 1 });
        }
        videoRef.current.play().catch(() => {});
        return;
      }

      const timeline = gsap.timeline();

      timeline
        .set(videoRef.current, { autoAlpha: 0 })
        .set(videoOverlayRef.current, { autoAlpha: 0 })
        .set(profileRef.current, { autoAlpha: 0 })
        .set(pillRef.current, { backgroundColor: "#ffffff" })
        .to(
          pillRef.current,
          {
            delay: 1,
            keyframes: [
              {
                duration: 2,
                ...finalGeometryState,
                borderRadius: "160px",
                ease: "power3.in",
              },
              {
                duration: 0.8,
                borderRadius: PANEL_BORDER_RADIUS,
                ease: "power1.inOut",
              },
            ],
          },
          0,
        )
        .to(
          pillContentRef.current,
          {
            autoAlpha: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "<+=0.6",
        )
        .to(
          profileRef.current,
          {
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          ">",
        )
        .to(
          pillRef.current,
          {
            backgroundColor: "rgba(255,255,255,0)",
            duration: 0.8,
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black from-70% via-gray-800 via-100% to-gray-200 to-100% text-white">
      <div
        ref={containerRef}
        className="absolute inset-0 px-7 pt-7 pb-[120px] [--nav-row-w:calc(3.5rem*4+0.75rem*3)] [--pill-h:54px] sm:[--nav-row-w:20vw] sm:[--pill-h:8vh] md:[--nav-row-w:24vw]"
      >
        <div className="relative h-full w-full">
          <div
            ref={pillRef}
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full text-lg font-semibold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div
              ref={pillContentRef}
              className="relative z-10 flex items-center justify-center px-12 py-4 font-semibold tracking-wide text-black text-base lg:text-2xl"
            >
              Hi, I&apos;m Jayvic 👋
            </div>
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

      <div
        ref={profileRef}
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[56vw] max-w-[880px] min-w-[320px] -translate-x-1/2 opacity-0"
      >
        <div className="relative w-full">
          <Image
            src="/images/me.png"
            alt="Jayvic San Antonio"
            width={1280}
            height={720}
            priority
            className="block w-full object-contain"
            style={{
              filter:
                "drop-shadow(0 24px 36px rgba(0,0,0,0.55)) drop-shadow(0 0 20px rgba(34,211,238,0.45))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
