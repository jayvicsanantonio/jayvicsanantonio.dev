"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import NavRow, { HERO_NAV_PILL_HEIGHT, HERO_NAV_PILL_WIDTH } from "@/app/(home)/_components/NavRow.client";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const PANEL_BORDER_RADIUS = "32px";
const PILL_SHRINK_BOX_SHADOW = "0 24px 45px rgba(1,11,26,0.65), 0 0 45px rgba(34,211,238,0.35)";
const PILL_SHRINK_BACKGROUND = "rgba(4,15,32,0.95)";
const PILL_SHRINK_BORDER = "rgba(34,211,238,0.75)";
const TARGET_PILL_WIDTH = HERO_NAV_PILL_WIDTH;
const TARGET_PILL_HEIGHT = HERO_NAV_PILL_HEIGHT;

type HeroProps = {
  children?: ReactNode;
};

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Hero({ children }: HeroProps) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillContentRef = useRef<HTMLDivElement>(null);
  const pillSkinRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navRowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const navRowBaseStyle: CSSProperties = {
    visibility: "hidden",
  };

  // ScrollTrigger + ScrollSmoother drive the profile scale-down on scroll.
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

      const navRow = navRowRef.current;

      if (prefersReducedMotion) {
        gsap.set(pillRef.current, {
          ...finalPanelState,
          backgroundColor: "transparent",
        });
        gsap.set(pillContentRef.current, { autoAlpha: 0 });
        gsap.set(videoRef.current, { autoAlpha: 1 });
        if (videoOverlayRef.current) {
          gsap.set(videoOverlayRef.current, { autoAlpha: 0.55 });
        }
        if (pillSkinRef.current) {
          gsap.set(pillSkinRef.current, { autoAlpha: 0 });
        }
        if (profileRef.current) {
          gsap.set(profileRef.current, { autoAlpha: 1 });
        }
        if (navRow) {
          gsap.set(navRow, { autoAlpha: 1 });
        }
        videoRef.current.play().catch(() => {});
        return;
      }

      const timeline = gsap.timeline();

      if (navRow) {
        timeline.set(navRow, { autoAlpha: 0 });
      }

      timeline
        .set(videoRef.current, { autoAlpha: 0 })
        .set(videoOverlayRef.current, { autoAlpha: 0 })
        .set(profileRef.current, { autoAlpha: 0 })
        .set(pillSkinRef.current, { autoAlpha: 0 })
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
        )
        .to(
          videoOverlayRef.current,
          {
            autoAlpha: 0.55,
            duration: 0.6,
            ease: "power1.out",
          },
          ">-0.1",
        );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const wrapper = smoothWrapperRef.current;
      const content = smoothContentRef.current;
      const heroSection = heroSectionRef.current;
      const profile = profileRef.current;
      const container = containerRef.current;
      const pill = pillRef.current;
      const pillContent = pillContentRef.current;
      const video = videoRef.current;
      const overlay = videoOverlayRef.current;
      const pillSkin = pillSkinRef.current;
      const navRow = navRowRef.current;

      if (
        !wrapper ||
        !content ||
        !heroSection ||
        !profile ||
        !container ||
        !pill ||
        !pillContent ||
        !video ||
        !navRow
      ) {
        return;
      }

      ScrollSmoother.get()?.kill();

      const smoother = ScrollSmoother.create({
        wrapper,
        content,
        smooth: 1.2,
        smoothTouch: 0.12,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      const scrollTween = gsap.to(profile, {
        scale: 0.45,
        yPercent: 0,
        transformOrigin: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.2,
          scrub: true,
        },
      });

      const computeNavYOffset = () => {
        if (!navRow || !pill) {
          return 0;
        }
        const pillHeight = pill.getBoundingClientRect().height || pill.offsetHeight || 0;
        const navHeight = navRow.getBoundingClientRect().height || navRow.offsetHeight || 0;
        return -(navHeight - pillHeight) / 2;
      };

      const videoShrinkTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            scrub: true,
          },
        })
        .to(
          pill,
          {
            width: TARGET_PILL_WIDTH,
            height: TARGET_PILL_HEIGHT,
            borderRadius: "384px",
            backgroundColor: PILL_SHRINK_BACKGROUND,
            borderColor: PILL_SHRINK_BORDER,
            boxShadow: PILL_SHRINK_BOX_SHADOW,
            ease: "none",
          },
          0,
        )
        .to(
          pillContent,
          {
            color: "#ffffff",
            textShadow: "0 6px 18px rgba(0,0,0,0.55)",
            duration: 0.35,
            ease: "power1.out",
          },
          0.05,
        )
        .to(
          pillContent,
          {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power1.out",
          },
          0.1,
        );

      if (pillSkin) {
        videoShrinkTimeline.to(
          pillSkin,
          {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power1.out",
          },
          0.05,
        );
      }

      if (overlay) {
        videoShrinkTimeline.fromTo(
          overlay,
          {
            autoAlpha: 0.55,
          },
          {
            autoAlpha: 0.85,
            duration: 0.4,
            ease: "none",
            immediateRender: false,
          },
          0,
        );
      }

      if (navRow) {
        videoShrinkTimeline.fromTo(
          navRow,
          {
            autoAlpha: 0,
            yPercent: 18,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
             y: () => computeNavYOffset(),
            duration: 0.45,
            ease: "power2.out",
          },
          0.55,
        );
      }

      const heroPin = ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        pin: true,
        anticipatePin: 1,
      });

      ScrollTrigger.refresh();

      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
        smoother.kill();
        videoShrinkTimeline.scrollTrigger?.kill();
        videoShrinkTimeline.kill();
        heroPin.kill();
      };
    },
    { dependencies: [prefersReducedMotion] },
  );

  // Downstream sections render inside the same smoother so the entire page benefits from the eased scroll surface.
  return (
    <div ref={smoothWrapperRef} id="smooth-wrapper" className="relative w-full text-white">
      <div
        ref={smoothContentRef}
        id="smooth-content"
        className="w-full"
        style={{
          willChange: prefersReducedMotion ? undefined : "transform",
        }}
      >
        <section ref={heroSectionRef} className="relative min-h-screen overflow-hidden">
          <div
            ref={containerRef}
            className="absolute inset-0 px-7 pt-7 pb-[120px] [--nav-row-w:calc(3.5rem*4+0.75rem*3)] [--pill-h:54px] sm:[--nav-row-w:20vw] sm:[--pill-h:8vh] md:[--nav-row-w:24vw]"
          >
            <div className="relative h-full w-full">
              <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <div
                  ref={navRowRef}
                  data-testid="HeroNavRow"
                  className="opacity-0"
                  style={navRowBaseStyle}
                >
                  <NavRow />
                </div>
              </div>
              <div
                ref={pillRef}
                data-testid="HeroPill"
                className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-transparent text-lg font-semibold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                style={{ backgroundColor: "#ffffff" }}
              >
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
                  ref={pillSkinRef}
                  className="pointer-events-none absolute inset-[1px] z-[1] rounded-[inherit] opacity-0"
                  aria-hidden
                >
                  <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#071f3a] via-[#051328] to-[#030a16]" />
                  <div className="absolute inset-0 rounded-[inherit] border border-cyan-300/60 shadow-[0_0_35px_rgba(34,211,238,0.35)_inset]" />
                  <div className="absolute inset-0 rounded-[inherit] ring-1 ring-cyan-300/20" />
                </div>
                <div
                  ref={videoOverlayRef}
                  className="pointer-events-none absolute inset-0 z-[2]"
                  style={{
                    opacity: 0,
                    background:
                      "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.45), transparent 45%), radial-gradient(circle at 80% 30%, rgba(59,130,246,0.35), transparent 40%), linear-gradient(180deg, rgba(6,16,35,0.25), rgba(1,5,11,0.75))",
                  }}
                />
                <div
                  ref={pillContentRef}
                  className="relative z-10 flex items-center justify-center px-12 py-4 font-semibold tracking-wide text-black text-base lg:text-2xl"
                >
                  Hi, I&apos;m Jayvic 👋
                </div>
              </div>
            </div>
          </div>
        </section>

        <>
          {children}
          <section aria-hidden className="h-[140vh]" />
        </>
      </div>

      <div
        ref={profileRef}
        className="pointer-events-none fixed bottom-0 left-1/2 z-40 w-[55vw] max-w-[880px] min-w-[320px] -translate-x-1/2 opacity-0"
        style={{
          willChange: prefersReducedMotion ? undefined : "transform, opacity",
        }}
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
