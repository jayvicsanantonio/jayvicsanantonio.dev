/**
 * Manual test file for useScrollProgress hook
 *
 * To test:
 * 1. Import this component in a page
 * 2. Scroll the page
 * 3. Verify the progress value updates from 0 to 1
 * 4. Resize the window and verify it still works
 */

"use client";

import { useScrollProgress } from "./useScrollProgress";

export function ScrollProgressTest() {
  const progress = useScrollProgress();

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
        padding: "10px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        borderRadius: "4px",
        zIndex: 9999,
      }}
    >
      <div>Scroll Progress: {(progress * 100).toFixed(2)}%</div>
      <div style={{ fontSize: "12px", marginTop: "5px" }}>Raw value: {progress.toFixed(4)}</div>
    </div>
  );
}
