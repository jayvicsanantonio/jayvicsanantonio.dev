import { useEffect, useRef, useState } from 'react';

export type IntroTimings = {
  introStartDelay: number;
  introExpansionDuration: number;
  reveal: { name: number; title: number; desc: number };
  graceAfterExpandMs: number;
};

export function useIntroSequence(cfg: { timings: IntroTimings }) {
  const [initialPill, setInitialPill] = useState(true);
  const [showTitleGroup, setShowTitleGroup] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showName, setShowName] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const startedRef = useRef(false);

  // Orchestrate intro sequencing
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    setInitialPill(true);
    const timers: number[] = [];

    // Begin expansion
    timers.push(
      window.setTimeout(() => {
        setInitialPill(false);
        setIsExpanding(true);
        timers.push(
          window.setTimeout(() => setIsExpanding(false), cfg.timings.introExpansionDuration),
        );
      }, cfg.timings.introStartDelay),
    );

    // Staggered reveals
    timers.push(window.setTimeout(() => setShowName(true), cfg.timings.reveal.name));
    timers.push(window.setTimeout(() => setShowTitleGroup(true), cfg.timings.reveal.title));
    timers.push(window.setTimeout(() => setShowDesc(true), cfg.timings.reveal.desc));

    return () => {
      timers.forEach((t) => {
        window.clearTimeout(t);
      });
    };
  }, [cfg.timings]);

  // Allow video play a little after expansion finishes
  useEffect(() => {
    if (!initialPill && !isExpanding) {
      const t = window.setTimeout(() => setShouldPlayVideo(true), cfg.timings.graceAfterExpandMs);
      return () => window.clearTimeout(t);
    }
  }, [initialPill, isExpanding, cfg.timings.graceAfterExpandMs]);

  return {
    initialPill,
    showTitleGroup,
    showDesc,
    showName,
    isExpanding,
    shouldPlayVideo,
  } as const;
}
