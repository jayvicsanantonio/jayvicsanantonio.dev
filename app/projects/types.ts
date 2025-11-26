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
  links: {
    label: string;
    href: string;
    icon?: "github" | "view" | "watch" | "marketplace" | "external";
  }[];
  sections: { label: string; content: string }[];
};
