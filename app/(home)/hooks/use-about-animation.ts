import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export type UseAboutAnimationArgs = {
  sectionRef: MutableRefObject<HTMLElement | null>;
  labelRef: MutableRefObject<HTMLElement | null>;
  letterRefs: MutableRefObject<Array<HTMLSpanElement | null>>;
  paragraphRefs: MutableRefObject<Array<HTMLParagraphElement | null>>;
};

export function useAboutAnimation({
  sectionRef,
  labelRef,
  letterRefs,
  paragraphRefs,
}: UseAboutAnimationArgs) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      const label = labelRef.current;
      const letters = letterRefs.current;
      const paragraphs = paragraphRefs.current;

      if (!section || !label) return;

      // 1. Parallax "ABOUT" Label Container
      // The container moves slower than the scroll, creating a sticky/parallax feel.
      gsap.to(label, {
        yPercent: 50, // Move down by 50% of its height over the course of the section scroll
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
        xPercent: 500, // Start visually "above" (positive X in -90deg rotated space)
      });

      gsap.to(letters, {
        xPercent: 0, // Move to natural position
        ease: "none", // Linear movement for direct scroll linkage
        stagger: 0.1, // Stagger the start of each letter's animation
        scrollTrigger: {
          trigger: section,
          start: "top 25%", // Start revealing when top of section is 25% from top of viewport (75% visible)
          end: "bottom bottom", // Finish revealing when bottom of section hits bottom of viewport
          scrub: 1, // Smooth scrubbing linked to scroll
        },
      });

      // 3. Scrubbed Paragraph Reveal
      paragraphs.forEach((para) => {
        if (!para) return;

        gsap.set(para, { 
            y: 100, 
            opacity: 0,
            clipPath: "inset(0 0 100% 0)" 
        });

        gsap.to(para, {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: para,
            start: "top bottom-=10%",
            end: "bottom center",
            scrub: 1,
          },
        });
      });
    },
    { scope: sectionRef }
  );
}
