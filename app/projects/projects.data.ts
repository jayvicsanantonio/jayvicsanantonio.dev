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
    icon?: 'github' | 'view' | 'watch' | 'marketplace' | 'external';
  }[];
  sections: { label: string; content: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'ai-pacman',
    title: 'Pac-Man',
    period: '2025',
    blurb:
      'Engineered a high-performance Pac-Man implementation using React 19 and TypeScript, featuring advanced collision detection and stateful ghost AI.',
    image: {
      src: '/images/projects/ai-pacman.png',
      alt: 'AI Pac-Man',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Hobby'],
    metrics: ['React 19', 'Ghost AI', 'Collision Detection'],
    links: [
      { label: 'Github', href: 'https://github.com/jayvicsanantonio/ai-pacman', icon: 'github' },
      { label: 'View', href: 'https://jayvicsanantonio.github.io/ai-pacman/', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content:
          'A modern implementation of the classic Pac-Man game exploring React 19 features and simple game AI.',
      },
      {
        label: 'Decisions',
        content:
          'TypeScript for type safety; Vite for fast dev; Tailwind for styling; implemented collision detection and ghost AI.',
      },
      {
        label: 'Results',
        content:
          'Playable demo with complete game loop, responsive controls, and functional AI-driven opponents.',
      },
    ],
  },
  {
    slug: 'ai-timeline',
    title: 'The AI Timeline',
    period: '2025',
    blurb:
      'Developed a visually engaging and performant AI timeline using Next.js 15 and Framer Motion, ensuring full accessibility compliance.',
    image: {
      src: '/images/projects/ai-timeline.png',
      alt: 'AI Timeline',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Next.js', 'TypeScript', 'Framer Motion', 'Hobby'],
    metrics: ['Next.js 15', 'Framer Motion', 'Accessibility'],
    links: [
      { label: 'Github', href: 'https://github.com/jayvicsanantonio/ai-timeline', icon: 'github' },
      { label: 'View', href: 'https://ai-timeline-six.vercel.app/', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content: 'An interactive timeline of AI history built to be performant and accessible.',
      },
      {
        label: 'Decisions',
        content: 'Next.js 15; TypeScript; Framer Motion for animations; WCAG-compliant design.',
      },
      {
        label: 'Results',
        content:
          'Fast, engaging, and accessible timeline that visually represents key moments in AI history.',
      },
    ],
  },
  {
    slug: 'yahoo-dsp',
    title: 'Yahoo DSP',
    period: '2016–2023',
    blurb:
      'Led frontend architecture for a programmatic advertising platform, enhancing audience tooling and real-time bidding systems; +1150% data throughput and $140M+ ad spend influenced.',
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
      'Enterprise',
    ],
    metrics: [
      '+1150% throughput (uploads)',
      '$140M+ ad spend influenced',
      'E2E stability via Cypress',
    ],
    links: [
      { label: 'View', href: 'https://www.advertising.yahooinc.com/our-dsp', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content:
          'Core developer across RTB tools and audience systems; owned performance-critical flows and mentored engineers.',
      },
      {
        label: 'Decisions',
        content:
          'Resilient upload pipeline patterns; reusable UI primitives; CI-friendly end-to-end testing with Cypress.',
      },
      {
        label: 'Results',
        content:
          'Increased upload capacity from 2M → 25M; contributed to features driving material spend; improved reliability and velocity.',
      },
    ],
  },
  {
    slug: 'ai-humanity-passport',
    title: 'Humanity+ Passport',
    period: '2025',
    blurb:
      'AI-powered evaluator that analyzes GitHub repositories and awards a Humanity+ badge for socially responsible software; built for the OpenAI Open Model Hackathon.',
    image: {
      src: '/images/projects/ai-humanity.png',
      alt: 'Humanity+ Passport',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['AI', 'TypeScript', 'Hobby', 'Hackathon'],
    metrics: ['Groq + gpt-oss-20b', 'AI repo analysis', 'Dynamic SVG badges'],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/ai-humanity-passport',
        icon: 'github',
      },
      { label: 'View', href: 'https://ai-humanity-passport.vercel.app/', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content:
          'An AI service that evaluates open‑source repositories and issues Humanity+ badges to highlight positive societal impact.',
      },
      {
        label: 'Decisions',
        content:
          'Emphasized transparent criteria and fast analysis; generated shareable SVG badges for verified outcomes.',
      },
      {
        label: 'Results',
        content: 'Live demo and badge issuance flow encouraging socially responsible development.',
      },
    ],
  },
  {
    slug: 'christmas-countdown',
    title: 'Christmas Countdown',
    period: '2024',
    blurb:
      'Festive countdown experiment leveraging the Popover and Anchor Positioning APIs for a unique, interactive UX.',
    image: {
      src: '/images/projects/christmas-countdown.png',
      alt: 'Christmas Countdown experiment preview',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Sandboxes'],
    metrics: ['Popover API', 'Anchor Positioning API'],
    links: [
      {
        label: 'View Sandbox',
        href: 'https://codesandbox.io/p/sandbox/christmas-countdown-using-popover-and-anchor-positioning-apis-c894q8?file=%2Findex.html&from-embed',
        icon: 'external',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Interactive holiday-themed UI exploring modern web platform features.',
      },
    ],
  },
  {
    slug: 'aurora-borealis',
    title: 'Aurora Borealis',
    period: '2024',
    blurb:
      'Visually stunning aurora borealis effect using only HTML and CSS; advanced animation and layered gradients.',
    image: {
      src: '/images/projects/aurora-borealis.png',
      alt: 'Aurora Borealis CSS animation',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Sandboxes'],
    metrics: ['CSS Animation', 'Layered gradients'],
    links: [
      {
        label: 'View Sandbox',
        href: 'https://codesandbox.io/p/sandbox/23lnhc?file=%2Fstyles.css',
        icon: 'external',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: 'A visual experiment recreating northern lights with gradients and keyframes.',
      },
    ],
  },
  {
    slug: 'total-solar-eclipse',
    title: 'Total Solar Eclipse',
    period: '2024',
    blurb:
      'Precise and captivating solar eclipse animation using pure CSS with radial gradients and keyframes.',
    image: {
      src: '/images/projects/solar-eclipse.png',
      alt: 'Total Solar Eclipse CSS animation',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Sandboxes'],
    metrics: ['Radial gradients', 'Pure CSS'],
    links: [
      {
        label: 'View Sandbox',
        href: 'https://codesandbox.io/p/sandbox/qlnxgn?file=%2Fstyles.css',
        icon: 'external',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Animating celestial motion with CSS only; inspired by April 2024 eclipse.',
      },
    ],
  },
  {
    slug: 'barbenheimer-vscode-theme',
    title: 'Barbenheimer VS Code Theme',
    period: '2023',
    blurb:
      'Popular VS Code theme with dual-light/dark modes focusing on contrast and legibility for improved DX.',
    image: {
      src: '/images/home/barbenheimer.webp',
      alt: 'Barbenheimer VS Code Theme',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Open Source', 'Design Systems', 'DX'],
    metrics: ['Marketplace distribution', 'Multi-theme variants', 'Accessible contrast choices'],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/barbenheimer-vscode-theme',
        icon: 'github',
      },
      {
        label: 'View Marketplace',
        href: 'https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer',
        icon: 'marketplace',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Built for daily use with balanced syntax roles and consistent UI surfaces.',
      },
      {
        label: 'Decisions',
        content: 'Measured saturation; tuned selection/hover backgrounds; hardened readability.',
      },
      {
        label: 'Results',
        content: 'Positive adoption; approachable and fun while maintaining legibility.',
      },
    ],
  },
  {
    slug: 'barbenheimer-zed-theme',
    title: 'Barbenheimer Zed Theme',
    period: '2024',
    blurb:
      'Zed editor theme with cohesive design system, light/dark variants, and refined focus/selection states.',
    image: {
      src: '/images/projects/barbenheimer-zed-theme.webp',
      alt: 'Barbenheimer Zed Theme',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Open Source', 'Design Systems', 'DX'],
    metrics: ['Published on Zed', 'Consistent token roles', 'Refined focus/selection states'],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/barbenheimer-zed-theme',
        icon: 'github',
      },
      {
        label: 'View Marketplace',
        href: 'https://zed.dev/extensions/barbenheimer',
        icon: 'marketplace',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Designed related yet distinct variants preserving familiarity across modes.',
      },
      {
        label: 'Decisions',
        content: 'Shared base hues with divergent accents; whitespace and contrast ergonomics.',
      },
      {
        label: 'Results',
        content: 'Stable, readable themes with personality; easy switching without fatigue.',
      },
    ],
  },
  {
    slug: 'mm-church',
    title: 'Malayang Mananampalataya Church',
    period: '2022',
    blurb:
      'Responsive and accessible church website focusing on clear navigation and streamlined content architecture.',
    image: {
      src: '/images/home/mm-church.webp',
      alt: 'Malayang Mananampalataya Church',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['React', 'Accessibility', 'Content Architecture', 'Client'],
    metrics: ['Mobile‑first UX', 'Fast loading', 'Clear content structure'],
    links: [
      { label: 'Github', href: 'https://github.com/nesceal/mmchurch', icon: 'github' },
      { label: 'View', href: 'https://mmchurch.ph/', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Focused on simple publishing and intuitive structure for a broad audience.',
      },
    ],
  },
  {
    slug: 'sync-flow',
    title: 'SyncFlow',
    period: '2024',
    blurb:
      'Low-latency, edge-deployed synchronization service bridging Apple Reminders and Google Tasks using OAuth, webhooks, and Redis.',
    image: {
      src: '/images/projects/sync-flow.png',
      alt: 'SyncFlow',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Edge', 'Architecture', 'Performance', 'TypeScript', 'Hono', 'Hobby'],
    metrics: ['<100ms edge latency targets', 'Event‑driven updates', 'Zero‑cold‑start UX'],
    links: [
      { label: 'Github', href: 'https://github.com/jayvicsanantonio/sync-flow', icon: 'github' },
      { label: 'View', href: 'https://sync-flow-nine.vercel.app/', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content:
          'Designed to feel instantaneous across ecosystems with conflict resolution and fault‑tolerant event delivery.',
      },
      {
        label: 'Decisions',
        content:
          'Vercel edge + Hono; OAuth + webhooks with Redis-backed state to minimize polling.',
      },
      {
        label: 'Results',
        content:
          'Smooth two‑way sync; responsive UX under network variability; portable architecture.',
      },
    ],
  },
  {
    slug: 'tracknstick',
    title: "Track N' Stick",
    period: '2024',
    blurb:
      'Full-stack habit tracking app with streak visualization and goal management, showcasing robust, user-centric design.',
    image: {
      src: '/images/projects/tracknstick.png',
      alt: "Track N' Stick",
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Hobby', 'React', 'TypeScript', 'Full Stack'],
    metrics: ['Habit tracking', 'Streak visualization', 'Goal management'],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/tracknstick.com',
        icon: 'github',
      },
      { label: 'View', href: 'https://tracknstick.com/', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Build sustainable habits through visual progress tracking and goal setting.',
      },
      {
        label: 'Decisions',
        content: 'Clean, intuitive interface prioritizing ease of use and engagement.',
      },
      {
        label: 'Results',
        content: 'Functional habit tracker with streak visualization and goal management.',
      },
    ],
  },
  {
    slug: 'webdevhub',
    title: 'Web Development Hub',
    period: '2023',
    blurb:
      'Comprehensive resource library for developers featuring structured taxonomy and fast, intuitive search.',
    image: {
      src: '/images/home/webdevhub.png',
      alt: 'Web Development Hub',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['DX', 'Accessibility', 'React', 'Hobby'],
    metrics: ['Hundreds of links curated', 'Structured taxonomy', 'Fast search UX'],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/web-development-hub',
        icon: 'github',
      },
      { label: 'View', href: 'https://webdevhub.link/', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Built to onboard engineers quickly and reduce search friction.',
      },
      {
        label: 'Decisions',
        content: 'Lightweight stack with accessible components and semantic markup.',
      },
      {
        label: 'Results',
        content: 'Faster discovery; repeatable curation model; easy contribution flow.',
      },
    ],
  },
  {
    slug: 'fintq-lendr',
    title: 'FINTQ — Lendr',
    period: '2016',
    blurb:
      'Mobile-first digital lending marketplace connecting banks with borrowers via secure, streamlined onboarding.',
    image: {
      src: '/images/projects/fintq-lendr.png',
      alt: 'FINTQ Lendr',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Architecture', 'Performance', 'DX', 'Enterprise'],
    metrics: ['Digital lending marketplace', 'Mobile-first onboarding'],
    links: [{ label: 'View', href: 'https://www.voyagerinnovation.com/fintq', icon: 'external' }],
    sections: [
      {
        label: 'Context',
        content: 'Extend access to credit by bringing bank lending flows to mobile.',
      },
      {
        label: 'Decisions',
        content: 'Secure journeys and an API-first integration surface for banks.',
      },
      {
        label: 'Results',
        content: 'Scalable distribution of loan products across geographies via mobile.',
      },
    ],
  },
  {
    slug: 'croo',
    title: 'Croo',
    period: '2015–2016',
    blurb:
      'IoT wearable safety device with companion Android app, BLE connectivity, and scalable AWS backend.',
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
      'Startup',
    ],
    metrics: ['BLE wearable', 'Android app', 'AWS-hosted backend (Node + Express)'],
    links: [
      { label: 'Watch Video', href: 'https://www.youtube.com/watch?v=0wYUNuDsrRo', icon: 'watch' },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Infrastructure for an IoT wearable focused on personal safety, with Android app.',
      },
      {
        label: 'Decisions',
        content:
          'BLE for low power; Node.js + Express backend on AWS; reliable APIs and telemetry.',
      },
      {
        label: 'Results',
        content:
          'Responsive device–app experience with a scalable backend and streamlined workflows.',
      },
    ],
  },
  {
    slug: 'ember-upgrade-guide',
    title: 'Ember Upgrade Guide',
    period: '2020',
    blurb:
      'Open-source tool for the Ember community, providing guidance for upgrading apps across framework versions.',
    image: {
      src: '/images/projects/ember-upgrade-guide.png',
      alt: 'Ember Upgrade Guide',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Open Source', 'DX', 'Ember', 'React'],
    metrics: ['Used by the Ember community', 'Guided upgrades across framework releases'],
    links: [
      { label: 'Github', href: 'https://github.com/ember-learn/upgrade-guide', icon: 'github' },
      { label: 'View', href: 'https://upgrade.emberjs.com/', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Streamlines upgrading Ember apps by surfacing changes and migration steps.',
      },
      {
        label: 'Decisions',
        content: 'Focus on clarity and accuracy; developer‑friendly UX to minimize friction.',
      },
      {
        label: 'Results',
        content: 'Increased confidence and speed of framework upgrades across teams.',
      },
    ],
  },
  {
    slug: 'eat-bulaga-mobile',
    title: 'Eat Bulaga! Mobile',
    period: '2014–2015',
    blurb:
      'Official fan app supporting hundreds of thousands of users with scalable Node.js services and real-time features.',
    image: {
      src: '/images/projects/eat-bulaga-mobile.png',
      alt: 'Eat Bulaga Mobile app',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Enterprise', 'Node', 'SailsJS', 'Redis', 'MongoDB', 'Android'],
    metrics: ['500K–1M downloads', '4.5★ (22,339 ratings)'],
    links: [
      { label: 'Read Project', href: 'https://www.ajmatillano.com/eb-mobile', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Large-scale consumer app integrating social feeds and Pinoy Henyo multiplayer.',
      },
      {
        label: 'Decisions',
        content: 'Node and SailsJS with Redis and MongoDB to handle spikes in concurrency.',
      },
      {
        label: 'Results',
        content: 'Successfully launched for the show’s 35th anniversary with strong adoption.',
      },
    ],
  },
  {
    slug: 'pinoy-hoops',
    title: 'Pinoy Hoops',
    period: '2013–2015',
    blurb:
      'High-traffic digital platform for basketball fans with real-time scores, news, and community features.',
    image: {
      src: '/images/projects/pinoy-hoops.webp',
      alt: 'Pinoy Hoops',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Enterprise', 'Express', 'Node', 'MongoDB', 'Redis', 'jQuery'],
    metrics: ['Highly trafficked sports content', 'Optimized build and deploy'],
    links: [
      {
        label: 'Read Article',
        href: 'https://www.techinasia.com/pinoyhoops-app-assist-basketball-fans',
        icon: 'external',
      },
    ],
    sections: [
      {
        label: 'Context',
        content: 'Evolved an enterprise-grade content platform serving PH basketball fans.',
      },
      {
        label: 'Decisions',
        content: 'Express + Node with MongoDB/Redis; streamlined templating and UI.',
      },
      {
        label: 'Results',
        content: 'Responsive, reliable experience handling bursts of traffic around major games.',
      },
    ],
  },
];

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((c) => c.slug === slug);
}
