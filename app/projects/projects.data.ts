export type Project = {
  slug: string
  title: string
  period: string
  blurb: string
  image: {
    src: string
    alt: string
    width: number
    height: number
    ratio: string
  }
  skills: string[]
  metrics: string[]
  links: {
    label: string
    href: string
    icon?: 'github' | 'view' | 'watch' | 'marketplace' | 'external'
  }[]
  sections: { label: string; content: string }[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'ai-temple-run',
    title: 'AI Temple Run',
    period: '2025',
    blurb:
      'A Babylon.js endless‑runner game built with TypeScript, with assets authored in Blender via MCP and Hyper3D. It features cohesive temple environments and modular path tiling.',
    image: {
      src: '/images/projects/ai-temple-run.png',
      alt: 'AI Temple Run game with 3D temple environment',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: ['Babylon.js', 'TypeScript', '3D Graphics', 'Game Development', 'Hobby'],
    metrics: ['Procedural generation', 'Lane-based controls', 'High-score system'],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/ai-temple-run',
        icon: 'github',
      },
      { label: 'View', href: 'https://ai-temple-run.vercel.app/', icon: 'external' },
    ],
    sections: [
      {
        label: 'Context',
        content:
          'An endless runner game inspired by Temple Run, featuring 3D graphics and procedural path generation.',
      },
      {
        label: 'Decisions',
        content:
          'Babylon.js for 3D rendering; responsive controls for mobile and desktop; procedural generation for endless gameplay.',
      },
      {
        label: 'Results',
        content:
          'Engaging 3D runner with smooth controls, dynamic environments, and satisfying progression mechanics.',
      },
    ],
  },
  {
    slug: 'ai-pacman',
    title: 'Pac-Man',
    period: '2025',
    blurb:
      'A modern Pac‑Man remake built with React 19, TypeScript, Vite, and TailwindCSS that features stateful ghost AI and a clean gameplay architecture.',
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
      'An interactive AI history timeline built with Next.js 15, React 19, TypeScript, and Framer Motion. The curation backend is a Node.js service that uses the OpenAI API and GitHub Actions to score news and propose updates.',
    image: {
      src: '/images/projects/ai-timeline.png',
      alt: 'AI Timeline',
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Framer Motion',
      'Node',
      'OpenAI',
      'Automation',
      'Hobby',
    ],
    metrics: ['1,465 events', 'WCAG AA', '~178kB bundle', 'Auto PRs (GitHub Actions)', '41% tests'],
    links: [
      { label: 'Github', href: 'https://github.com/jayvicsanantonio/ai-timeline', icon: 'github' },
      {
        label: 'Github (Automation)',
        href: 'https://github.com/jayvicsanantonio/ai-timeline-automation',
        icon: 'github',
      },
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
      'An enterprise programmatic advertising platform interface built with Ember and React that focuses on audience tooling and real‑time bidding workflows.',
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
      'An LLM‑powered repository ethics analyzer built with Next.js 15, Groq, PostgreSQL, and Prisma that evaluates codebases and generates SVG badges.',
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
      'A festive countdown microsite that demonstrates the Popover and Anchor Positioning web platform APIs using HTML, CSS, and JavaScript.',
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
      'This experiment recreates the aurora borealis using only HTML and CSS. It uses advanced animations and layered gradients.',
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
      'A pure‑CSS animation that simulates a total solar eclipse using radial gradients and keyframes.',
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
      'A three‑variant VS Code theme built with the VS Code Extension API and JSON color tokens that balances Barbie and Oppenheimer palettes.',
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
      'A production Zed editor theme implemented with JSON and TOML using the Zed Extensions API. It ships coordinated light, dark, and high‑contrast variants via automated releases.',
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
      'A responsive and accessible church website built with React and a content‑first information architecture.',
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
      'A unified edge‑deployed synchronization service built with Hono on Vercel Edge that consolidates 19 Node functions into a single deployment. The system adds Redis‑backed rate limiting, email onboarding, and admin dashboards while reducing cold starts.',
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
      'A habit‑tracking progressive web app built with React 19, TypeScript, and Vite that uses modern PWA APIs. The backend is a Cloudflare Workers API built with Hono and secured with Clerk.',
    image: {
      src: '/images/projects/tracknstick.png',
      alt: "Track N' Stick",
      width: 1200,
      height: 675,
      ratio: '1200/675',
    },
    skills: [
      'Hobby',
      'React',
      'TypeScript',
      'Full Stack',
      'Cloudflare Workers',
      'Hono',
      'Security',
      'Clerk',
    ],
    metrics: [
      '98/100 Lighthouse',
      '~585KB gzipped',
      'Offline‑first caching',
      'Clerk JWT auth',
      'Sliding‑window rate limiting',
      '<50ms responses',
    ],
    links: [
      {
        label: 'Github',
        href: 'https://github.com/jayvicsanantonio/tracknstick.com',
        icon: 'github',
      },
      {
        label: 'Github (API)',
        href: 'https://github.com/jayvicsanantonio/tracknstick-api',
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
      'A curated developer resource hub built with Next.js 15, React 19, and Tailwind CSS v4 using @theme directives.',
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
      'A mobile‑first digital lending marketplace with secure onboarding, built on an API‑first Node.js backend and a responsive web frontend.',
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
      'An open‑source web tool for the Ember community built with React that guides upgrades across framework versions.',
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
      'A high‑traffic basketball platform built with Node.js, Express, MongoDB, Redis, and jQuery that delivers real‑time scores, news, and community features.',
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
]

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((c) => c.slug === slug)
}
