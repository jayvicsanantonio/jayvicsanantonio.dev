import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export type UseAboutAnimationArgs = {
  sectionRef: MutableRefObject<HTMLElement | null>;
  labelRef: MutableRefObject<HTMLElement | null>;
  letterRefs: MutableRefObject<Array<HTMLSpanElement | null>>;
  paragraph1Ref: MutableRefObject<HTMLParagraphElement | null>;
  paragraph2Ref: MutableRefObject<HTMLParagraphElement | null>;
};

export function useAboutAnimation({
  sectionRef,
  labelRef,
  letterRefs,
  paragraph1Ref,
  paragraph2Ref,
}: UseAboutAnimationArgs) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      const label = labelRef.current;
      const letters = letterRefs.current;
      const p1 = paragraph1Ref.current;
      const p2 = paragraph2Ref.current;

      if (!section || !label) return;

      // 1. Parallax "ABOUT" Label Container
      // The container moves slower than the scroll, creating a sticky/parallax feel.
      gsap.to(label, {
        yPercent: 350, // Move down significantly to ensure continuous movement
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Letter-by-Letter Reveal
      // Letters appear one by one from the top edge as user scrolls down.
      // With -90deg rotation (counter-clockwise), the local X axis points visually UP.
      // To appear from the "top edge", they need to start from a positive X value (visually above) and move down to 0.

      // Ensure letters are initially hidden/positioned (relying on overflow-hidden for mask)
      gsap.set(letters, {
        x: "500vh", // Start visually "above" (positive X in -90deg rotated space)
      });

      gsap.to(letters, {
        x: 0, // Move to natural position
        ease: "none", // Linear movement for direct scroll linkage
        scrollTrigger: {
          trigger: section,
          start: "top 50%", // Start revealing when top of section is 50% from top of viewport (50% visible)
          end: "bottom bottom", // Finish revealing when bottom of section hits bottom of viewport
          scrub: 1, // Smooth scrubbing linked to scroll
        },
      });

      // 3. Paragraph Animations
      // Animate 2nd and 3rd paragraphs upwards smoothly when they become visible
      const paragraphs = [p1, p2].filter((p): p is HTMLParagraphElement => p !== null);

      paragraphs.forEach((p) => {
        gsap.fromTo(
          p,
          {
            y: 720, // Start 720px below
            opacity: 0.2,
          },
          {
            y: 0, // Move to natural position
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top bottom", // Start when top of paragraph enters viewport
              end: "center center", // End when center of paragraph is in center of viewport
              scrub: 1, // Smooth scrubbing
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );
}
