"use client";

import { useEffect, useRef, useState } from "react";

import AnimatedText from "@/components/ui/AnimatedText";

export type MorphingVideoProps = {
  centerTop: string;
  isIntro: boolean;
  initialPill: boolean;
  isExpanding: boolean;
  showTitleGroup: boolean;
  showDesc: boolean;
  shouldPlayVideo: boolean;
  containerRadius: string;
  video: { playbackRate: number; scale: number; preload: "auto" | "metadata" | "none" };
};

export default function MorphingVideo({
  centerTop,
  isIntro,
  initialPill,
  isExpanding,
  showTitleGroup,
  showDesc,
  shouldPlayVideo,
  containerRadius,
  video,
}: MorphingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = video.playbackRate;
      videoRef.current.muted = true;
    }
  }, [video.playbackRate]);

  useEffect(() => {
    let active = true;
    if (typeof window !== "undefined") {
      fetch("/matrix-horizontal.mp4", { method: "HEAD" })
        .then((res) => {
          if (!active) return;
          setHasVideo(res.ok);
        })
        .catch(() => {
          if (!active) return;
          setHasVideo(false);
        });
    }
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldPlayVideo]);

  return (
    <div
      className="fixed z-30 flex items-center justify-center overflow-hidden"
      style={{
        top: centerTop,
        left: "50%",
        ["--intro-scale" as any]: String(isIntro ? (initialPill ? 0.14 : 1) : 1),
        transform: "translate(-50%, -50%) scale(var(--intro-scale))",
        width: "96vw",
        height: "min(86svh, 86vh)",
        borderRadius: containerRadius,
        border: "none",
        willChange: isExpanding ? "transform, opacity, filter, clip-path" : undefined,
        transformOrigin: "50% 50%",
        transition: isExpanding
          ? "top 0.4s ease-out, transform 2s cubic-bezier(0.22, 1, 0.36, 1), border-radius 2s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s ease-out, backdrop-filter 0.5s ease-out, box-shadow 0.5s ease-out, clip-path 0.6s ease-out"
          : "top 0.4s ease-out, border-radius 0s, background-color 0.5s ease-out, backdrop-filter 0.5s ease-out, box-shadow 0.5s ease-out, clip-path 0.3s ease-out",
        ["--bg-a" as any]: isIntro ? "0.95" : "calc(max(0, (var(--p, 0) - 0.7) * 3) * 0.95)",
        ["--shadow-a" as any]: isIntro ? "0.25" : "calc(max(0, (var(--p, 0) - 0.7) * 3) * 0.25)",
        backgroundColor: initialPill ? "transparent" : "rgba(255, 255, 255, var(--bg-a))",
        backdropFilter:
          isIntro && !initialPill
            ? "blur(20px)"
            : isIntro
              ? "blur(0px)"
              : "blur(calc(max(0, (var(--p, 0) - 0.7) * 3) * 20px))",
        boxShadow: initialPill ? "none" : "0 25px 50px -12px rgba(0, 0, 0, var(--shadow-a))",
        clipPath:
          "inset(calc(var(--sh, 0) * var(--closeMaxY, 0)) calc(var(--sh, 0) * var(--closeMaxX, 0)) calc(var(--sh, 0) * var(--closeMaxY, 0)) calc(var(--sh, 0) * var(--closeMaxX, 0)) round calc(24px + var(--sh, 0) * 360px))",
      }}
    >
      {/* Titles */}
      <div
        className="absolute bottom-64 left-1/2 z-50 -translate-x-1/2 text-center transition-opacity duration-700 sm:right-8 sm:bottom-40 sm:left-auto sm:translate-x-0 md:right-10 md:bottom-22"
        style={{ opacity: showTitleGroup ? 1 : 0 }}
      >
        <h3 className="text-base font-medium tracking-widest text-white sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl">
          <AnimatedText text="Full-Stack" start={showTitleGroup} perCharDelay={45} />
        </h3>
      </div>
      <div
        className="absolute bottom-52 left-1/2 z-50 -translate-x-1/2 text-center transition-opacity duration-700 sm:right-8 sm:left-auto sm:translate-x-0 md:right-10 md:bottom-10"
        style={{ opacity: showTitleGroup ? 1 : 0 }}
      >
        <h4 className="text-base font-light tracking-wider text-white/90 italic sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl">
          <AnimatedText text="Software Engineer" start={showTitleGroup} perCharDelay={60} baseDelay={240} />
        </h4>
      </div>

      {/* Description */}
      <div
        className="absolute top-6 left-1/2 z-50 max-w-[22rem] -translate-x-1/2 text-center transition-opacity duration-700 sm:top-auto sm:bottom-32 sm:left-8 sm:translate-x-0 sm:text-left md:bottom-10 md:left-10"
        style={{ opacity: showDesc ? 1 : 0 }}
      >
        <p className="mb-2 text-sm leading-relaxed text-white/80 md:text-base">
          I experiment with AI daily—and build web platforms that put it to work.
        </p>
      </div>

      {/* Video / Fallback */}
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          borderRadius: "calc(24px + 360px * var(--sh, 0))",
          opacity: isIntro ? 0 : 1,
          transition: "opacity 0.8s ease-out",
        }}
      >
        {hasVideo ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload={video.preload}
            aria-hidden
            tabIndex={-1}
            onError={() => setHasVideo(false)}
            className="h-full w-full object-cover"
            style={{
              willChange: "opacity, transform",
              transform: `scale(${video.scale})`,
            }}
          >
            <source src="/matrix-horizontal.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            aria-hidden
            className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_0%,rgba(59,130,246,0.20),transparent_60%),radial-gradient(60%_50%_at_50%_100%,rgba(168,85,247,0.16),transparent_60%)]"
            style={{ transform: `scale(${video.scale})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" style={{ opacity: isIntro ? 0 : 1 }} />

        {/* Cyan overlay pill (opacity driven by --cyan/ui) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: isIntro ? 0 : undefined }}>
          <div
            className="relative flex h-14 w-[var(--nav-row-w)] items-center justify-center rounded-[384px] border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-[16px] backdrop-saturate-[160%] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(120%_60%_at_50%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)] before:content-[''] sm:h-full sm:w-full"
            style={{
              background: "linear-gradient(180deg, rgba(24,204,193,0.28) 0%, rgba(0,166,158,0.20) 100%)",
              opacity: "var(--cyan, 0)",
              transition: "opacity 0.5s ease-out",
            }}
          >
            <span
              className="font-semibold tracking-wide text-white"
              style={{
                fontSize: "clamp(14px, 2.1vw, 22px)",
                whiteSpace: "nowrap",
                maxWidth: "90%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                opacity: "var(--ui, 0)",
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              Hi, I’m Jayvic 👋
            </span>
          </div>
        </div>

        {/* Watermark cover */}
        <div className="absolute right-0 bottom-0 h-12 w-20 bg-gradient-to-tl from-black via-black/80 to-transparent" />
      </div>
    </div>
  );
}

