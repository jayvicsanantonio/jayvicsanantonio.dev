import { useEffect, useRef, useState } from "react";

export type IntroTimings = {
  introStartDelay: number;
  introExpansionDuration: number;
  reveal: { name: number; title: number; desc: number };
  graceAfterExpandMs: number;
};

export function useIntroSequence(cfg: { timings: IntroTimings }, reduceMotion: boolean) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      startRef.current = null;
      elapsedRef.current = Number.POSITIVE_INFINITY;
      return;
    }

    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    elapsedRef.current = Number.NEGATIVE_INFINITY;
    startRef.current = null;
    const maxTime = Math.max(
      cfg.timings.reveal.desc,
      cfg.timings.introStartDelay + cfg.timings.introExpansionDuration + cfg.timings.graceAfterExpandMs,
    );

    const loop: FrameRequestCallback = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const baseline = startRef.current ?? ts;
      const next = Math.min(ts - baseline, maxTime);
      if (Math.abs(next - elapsedRef.current) >= 16) {
        elapsedRef.current = next;
        setElapsed(next);
      }
      if (next < maxTime) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      startRef.current = null;
    };
  }, [cfg.timings, reduceMotion]);

  if (reduceMotion) {
    return {
      initialPill: false,
      showTitleGroup: true,
      showDesc: true,
      showName: true,
      isExpanding: false,
      shouldPlayVideo: true,
    } as const;
  }

  const { timings } = cfg;
  const effectiveElapsed = reduceMotion ? Number.POSITIVE_INFINITY : elapsed;
  const initialPill = effectiveElapsed < timings.introStartDelay;
  const isExpanding =
    effectiveElapsed >= timings.introStartDelay &&
    effectiveElapsed < timings.introStartDelay + timings.introExpansionDuration;
  const showName = effectiveElapsed >= timings.reveal.name;
  const showTitleGroup = effectiveElapsed >= timings.reveal.title;
  const showDesc = effectiveElapsed >= timings.reveal.desc;
  const shouldPlayVideo =
    effectiveElapsed >=
    timings.introStartDelay + timings.introExpansionDuration + timings.graceAfterExpandMs;

  return {
    initialPill,
    showTitleGroup,
    showDesc,
    showName,
    isExpanding,
    shouldPlayVideo,
  } as const;
}
