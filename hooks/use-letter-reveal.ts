import { useEffect, useState } from "react";

export function useLetterReveal(
  enabled: boolean,
  label: string,
  prefersReducedMotion: boolean,
  startDelayMs = 300,
  stepMs = 200,
) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setVisible(0);
      return;
    }
    if (prefersReducedMotion) {
      setVisible(label.length);
      return;
    }

    let current = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const initial: ReturnType<typeof setTimeout> = setTimeout(() => {
      interval = setInterval(() => {
        current++;
        setVisible(current);
        if (current >= label.length) {
          if (interval) clearInterval(interval);
        }
      }, stepMs);
    }, startDelayMs);

    return () => {
      clearTimeout(initial);
      if (interval) clearInterval(interval);
    };
  }, [enabled, label, prefersReducedMotion, startDelayMs, stepMs]);

  return visible;
}

