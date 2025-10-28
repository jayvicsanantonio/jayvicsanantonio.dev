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

  useEffect(() => {
    if (reduceMotion) {
      startRef.current = null;
      setElapsed(Number.POSITIVE_INFINITY);
      elapsedRef.current = Number.POSITIVE_INFINITY;
      return;
    }

    let raf = 0;
    elapsedRef.current = 0;
    setElapsed(0);
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
        raf = requestAnimationFrame(loop);
      }
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
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
  const initialPill = elapsed < timings.introStartDelay;
  const isExpanding =
    elapsed >= timings.introStartDelay &&
    elapsed < timings.introStartDelay + timings.introExpansionDuration;
  const showName = elapsed >= timings.reveal.name;
  const showTitleGroup = elapsed >= timings.reveal.title;
  const showDesc = elapsed >= timings.reveal.desc;
  const shouldPlayVideo =
    elapsed >=
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
