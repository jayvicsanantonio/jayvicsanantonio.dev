export type ProjectLink = {
  label: string;
  href: string;
  icon?: "github" | "view" | "watch" | "marketplace" | "external";
};

export type ProjectSection = {
  label: string;
  content: string;
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  blurb: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    ratio: string;
  };
  skills: string[];
  metrics: string[];
  links: ProjectLink[];
  sections: ProjectSection[];
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export type SkillSection = {
  title: string;
  accentClass: string;
  items: readonly string[];
};

export type HeroTimings = {
  introStartDelay: number;
  introExpansionDuration: number;
  reveal: {
    name: number;
    title: number;
    desc: number;
  };
  graceAfterExpandMs: number;
};

export type HeroScrollConfig = {
  max: number;
  shutterStartPx: number;
  shutterLengthPx: number;
  cyanStartT: number;
  uiRevealStartT: number;
};

export type HeroNavConfig = {
  centerTop: string;
  buttonSize: { w: number; h: number };
  leftOffsetsPx: Record<string, number>;
  rightOffsetsPx: Record<string, number>;
};

export type HeroVideoConfig = {
  playbackRate: number;
  scale: number;
  preload: "auto" | "metadata" | "none";
};

export type HeroConfig = {
  timings: HeroTimings;
  scroll: HeroScrollConfig;
  closeMaxY: string;
  closeMaxX: string;
  overlayUpDampen: number;
  video: HeroVideoConfig;
  nav: HeroNavConfig;
};
