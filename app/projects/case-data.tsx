import React from 'react';
import { Github } from 'lucide-react';

export type CaseStudy = {
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
  links: { label: string; href: string; icon?: React.ReactNode }[];
  sections: { label: string; content: React.ReactNode }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'yahoo-dsp',
    title: 'Yahoo DSP',
    period: '2016–2023',
    blurb:
      'Programmatic advertising platform: RTB systems, audience tooling, and performance at scale.',
    image: {
      src: '/images/home/yahoo-dsp.webp',
      alt: 'Yahoo DSP',
      width: 1200,
      height: 400,
      ratio: '1200/400',
    },
    skills: [
      'AdTech',
      'Architecture',
      'Performance',
      'Testing',
      'DX',
      'Ember',
      'React',
    ],
    metrics: [
      '+1150% throughput (uploads)',
      '$140M+ ad spend influenced',
      'E2E stability via Cypress',
    ],
    links: [
      {
        label: 'View',
        href: 'https://www.advertising.yahooinc.com/our-dsp',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Core developer across RTB tools and audience systems.
            Owned performance-critical flows and mentored engineers
            while evolving frameworks (Ember→modernized stacks).
          </>
        ),
      },
      {
        label: 'Decisions',
        content: (
          <>
            Introduced resilient upload pipeline patterns, reusable UI
            primitives, and CI-friendly end‑to‑end testing with
            Cypress to reduce flakiness and accelerate feedback.
          </>
        ),
      },
      {
        label: 'Results',
        content: (
          <>
            Increased audience upload capacity from 2M → 25M records;
            contributed to features that drove material spend;
            improved developer velocity and product reliability.
          </>
        ),
      },
    ],
  },
  {
    slug: 'christmas-countdown',
    title: 'Christmas Countdown',
    period: '2024',
    blurb:
      'A playful countdown and popover demo using the Popover API and CSS Anchor Positioning.',
    image: {
      src: '/images/home/placeholder-image.webp',
      alt: 'Christmas Countdown experiment preview',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Sandboxes'],
    metrics: ['Popover API', 'Anchor Positioning API'],
    links: [
      { label: 'View', href: 'https://codesandbox.io/s/c894q8' },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Interactive holiday-themed UI exploring modern web
            platform features.
          </>
        ),
      },
    ],
  },
  {
    slug: 'aurora-borealis',
    title: 'Aurora Borealis',
    period: '2024',
    blurb:
      'Pure HTML/CSS animation of a starry sky and aurora lights.',
    image: {
      src: '/images/home/placeholder-image.webp',
      alt: 'Aurora Borealis CSS animation',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Sandboxes'],
    metrics: ['CSS Animation', 'Layered gradients'],
    links: [
      { label: 'View', href: 'https://codesandbox.io/s/23lnhc' },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            A visual experiment recreating northern lights with
            gradients and keyframes.
          </>
        ),
      },
    ],
  },
  {
    slug: 'total-solar-eclipse',
    title: 'Total Solar Eclipse',
    period: '2024',
    blurb:
      'CSS-driven eclipse animation using radial gradients and keyframes.',
    image: {
      src: '/images/home/placeholder-image.webp',
      alt: 'Total Solar Eclipse CSS animation',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Sandboxes'],
    metrics: ['Radial gradients', 'Pure CSS'],
    links: [
      { label: 'View', href: 'https://codesandbox.io/s/qlnxgn' },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Animating celestial motion with CSS only; inspired by
            April 2024 eclipse.
          </>
        ),
      },
    ],
  },
  {
    slug: 'barbenheimer-vscode-theme',
    title: 'Barbenheimer VS Code Theme',
    period: '2023',
    blurb:
      'A playful yet dramatic editor theme blending Barbie and Oppenheimer aesthetics with thoughtful contrast and legibility.',
    image: {
      src: '/images/home/barbenheimer.webp',
      alt: 'Barbenheimer VS Code Theme',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Open Source', 'Design Systems', 'DX'],
    metrics: [
      'Marketplace distribution',
      'Multi-theme variants',
      'Accessible contrast choices',
    ],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/barbenheimer-vscode-theme',
        icon: <Github size={18} />,
      },
      {
        label: 'Marketplace',
        href: 'https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Built for daily use with balanced syntax color roles and
            consistent UI surfaces. Prioritized clarity and theme
            cohesion across states.
          </>
        ),
      },
      {
        label: 'Decisions',
        content: (
          <>
            Crafted palette pairs with measured saturation; tuned
            selection/hover backgrounds; hardened readability for long
            sessions.
          </>
        ),
      },
      {
        label: 'Results',
        content: (
          <>
            Positive adoption and reuse patterns; approachable and fun
            without compromising professional legibility.
          </>
        ),
      },
    ],
  },
  {
    slug: 'barbenheimer-zed-theme',
    title: 'Barbenheimer Zed Theme',
    period: '2024',
    blurb:
      'A cohesive pair of Zed editor themes capturing both playful and dramatic tones with shared palette logic.',
    image: {
      src: '/images/projects/barbenheimer-zed-theme.webp',
      alt: 'Barbenheimer Zed Theme',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Open Source', 'Design Systems', 'DX'],
    metrics: [
      'Published on Zed',
      'Consistent token roles',
      'Refined focus/selection states',
    ],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/barbenheimer-zed-theme',
        icon: <Github size={18} />,
      },
      {
        label: 'Zed Extensions',
        href: 'https://zed.dev/extensions?query=Barbenheimer',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Designed variants that feel related yet distinct,
            preserving familiarity across modes.
          </>
        ),
      },
      {
        label: 'Decisions',
        content: (
          <>
            Shared base hues with divergent accents; considered
            whitespace and contrast ergonomics.
          </>
        ),
      },
      {
        label: 'Results',
        content: (
          <>
            Stable, readable themes with personality; easy to switch
            without visual fatigue.
          </>
        ),
      },
    ],
  },
  {
    slug: 'mm-church',
    title: 'Malayang Mananampalataya Church',
    period: '2022',
    blurb:
      'Responsive church website built to strengthen community connection with clear navigation and accessible content.',
    image: {
      src: '/images/home/mm-church.webp',
      alt: 'Malayang Mananampalataya Church',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['React', 'Accessibility', 'Content Architecture'],
    metrics: [
      'Mobile‑first UX',
      'Fast loading',
      'Clear content structure',
    ],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/nesceal/mmchurch',
        icon: <Github size={18} />,
      },
      { label: 'View', href: 'https://mmchurch.ph/' },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Focused on simple publishing and intuitive structure for a
            broad audience.
          </>
        ),
      },
      {
        label: 'Decisions',
        content: (
          <>
            Chose a lightweight React stack with accessible components
            and clear content hierarchy.
          </>
        ),
      },
      {
        label: 'Results',
        content: (
          <>
            Improved discoverability of sermons and events; consistent
            UX across devices.
          </>
        ),
      },
    ],
  },
  {
    slug: 'sync-flow',
    title: 'SyncFlow',
    period: '2024',
    blurb:
      'Edge‑deployed task sync bridging Apple Reminders and Google Tasks with OAuth, webhooks, and Redis.',
    image: {
      src: '/images/projects/sync-flow.png',
      alt: 'SyncFlow',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: [
      'Edge',
      'Architecture',
      'Performance',
      'TypeScript',
      'Hono',
    ],
    metrics: [
      '<100ms edge latency targets',
      'Event‑driven updates',
      'Zero‑cold‑start UX',
    ],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/sync-flow',
        icon: <Github size={18} />,
      },
      { label: 'View', href: 'https://sync-flow-nine.vercel.app/' },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Designed to feel instantaneous across ecosystems. Built
            for consistency, conflict resolution, and fault‑tolerant
            event delivery.
          </>
        ),
      },
      {
        label: 'Decisions',
        content: (
          <>
            Chose Vercel edge + Hono for proximity; leveraged OAuth +
            webhooks with Redis‑backed state to minimize polling and
            avoid drift.
          </>
        ),
      },
      {
        label: 'Results',
        content: (
          <>
            Smooth two‑way sync, responsive UX under network
            variability, and a portable architecture that can extend
            to other providers.
          </>
        ),
      },
    ],
  },
  {
    slug: 'webdevhub',
    title: 'Web Development Hub',
    period: '2023',
    blurb:
      'A curated library of developer resources—learning, tools, frameworks, blogs, and communities.',
    image: {
      src: '/images/home/webdevhub.png',
      alt: 'Web Development Hub',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Open Source', 'DX', 'Accessibility', 'React'],
    metrics: [
      'Hundreds of links curated',
      'Structured taxonomy',
      'Fast search UX',
    ],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/web-development-hub',
        icon: <Github size={18} />,
      },
      { label: 'View', href: 'https://webdevhub.link/' },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Built to onboard engineers quickly and reduce search
            friction. Focused on clarity and navigability.
          </>
        ),
      },
      {
        label: 'Decisions',
        content: (
          <>
            Lightweight stack with accessible components and semantic
            markup. Emphasis on category IA and scanning speed.
          </>
        ),
      },
      {
        label: 'Results',
        content: (
          <>
            Faster discovery of quality resources; repeatable curation
            model; easy contribution flow.
          </>
        ),
      },
    ],
  },
  {
    slug: 'fintq-lendr',
    title: 'FINTQ — Lendr',
    period: '2016',
    blurb:
      'Mobile-first digital lending marketplace connecting banks with borrowers across the Philippines. Built with Node.js and Express.js.',
    image: {
      src: '/images/projects/fintq-lendr.png',
      alt: 'FINTQ Lendr',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Architecture', 'Performance', 'DX'],
    metrics: [
      'Digital lending marketplace',
      'Mobile-first onboarding',
    ],
    links: [
      {
        label: 'View',
        href: 'https://www.voyagerinnovation.com/fintq',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Built to extend access to credit by bringing bank lending
            flows to mobile.
          </>
        ),
      },
      {
        label: 'Decisions',
        content: (
          <>
            Focused on secure, streamlined journeys and an API-first
            integration surface for participating banks.
          </>
        ),
      },
      {
        label: 'Results',
        content: (
          <>
            Enabled scalable distribution of loan products across
            geographies via a single mobile experience.
          </>
        ),
      },
    ],
  },
  {
    slug: 'croo',
    title: 'Croo',
    period: '2015–2016',
    blurb:
      'Wearable safety device with Android companion app using Bluetooth Low Energy, backed by AWS services with a Node.js + Express.js backend.',
    image: {
      src: '/images/projects/croo.png',
      alt: 'Croo wearable and app',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: [
      'Architecture',
      'DX',
      'Internet of Things',
      'AWS',
      'Node',
      'Express',
      'Android',
      'BLE',
    ],
    metrics: [
      'Bluetooth Low Energy wearable',
      'Android companion app',
      'AWS-hosted backend (Node + Express)',
    ],
    links: [
      {
        label: 'Watch',
        href: 'https://www.youtube.com/watch?v=0wYUNuDsrRo',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: (
          <>
            Designed and supported the infrastructure for an IoT
            wearable focused on personal safety, with a companion
            Android application.
          </>
        ),
      },
      {
        label: 'Decisions',
        content: (
          <>
            Chose BLE for low-power connectivity; implemented a
            Node.js + Express backend on AWS to provide reliable APIs
            and telemetry processing.
          </>
        ),
      },
      {
        label: 'Results',
        content: (
          <>
            Delivered a responsive device–app experience with a
            scalable cloud backend and streamlined developer
            workflows.
          </>
        ),
      },
    ],
  },
];

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
