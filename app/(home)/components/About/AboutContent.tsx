import { ABOUT_DATA } from "../../data/about-data";
import { type RefObject } from "react";

type AboutContentProps = {
  paragraph1Ref: RefObject<HTMLParagraphElement | null>;
  paragraph2Ref: RefObject<HTMLParagraphElement | null>;
};

export function AboutContent({ paragraph1Ref, paragraph2Ref }: AboutContentProps) {
  return (
    <div className="mt-[28rem] w-full space-y-28 text-4xl leading-relaxed text-white/80 md:mt-0 md:w-3/5 md:pl-12">
      <p>{ABOUT_DATA.PARAGRAPH_1}</p>
      <p ref={paragraph1Ref} className="will-change-transform">
        {ABOUT_DATA.PARAGRAPH_2}
      </p>
      <p ref={paragraph2Ref} className="text-white will-change-transform">
        {ABOUT_DATA.PARAGRAPH_3_START}
        <a
          href={`mailto:${ABOUT_DATA.EMAIL}`}
          className="text-cyan-200 underline-offset-4 transition-colors hover:text-cyan-100"
        >
          {ABOUT_DATA.EMAIL}
        </a>
        , on{" "}
        <a
          href={ABOUT_DATA.LINKEDIN_URL}
          className="text-cyan-200 underline-offset-4 transition-colors hover:text-cyan-100"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        , or through my{" "}
        <a
          href={ABOUT_DATA.PROJECTS_URL}
          className="text-cyan-200 underline-offset-4 transition-colors hover:text-cyan-100"
        >
          projects
        </a>
        .
      </p>
    </div>
  );
}
