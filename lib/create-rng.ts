// Small, stable LCG for deterministic pseudo-randoms
export function createRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

// Backward-compatible alias.
export const rng = createRng;
