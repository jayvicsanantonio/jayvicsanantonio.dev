import { Github } from "lucide-react";
import React from "react";

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
  links: { label: string; href: string; icon?: React.ReactNode }[];
  sections: { label: string; content: React.ReactNode }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "ai-pacman",
    title: "Pac-Man",
    period: "2025",
    blurb:
      "Engineered a high-performance Pac-Man implementation using React 19 and TypeScript, featuring advanced collision detection and stateful ghost AI. This project demonstrates expertise in modern frontend architecture and complex state management.",
    image: {
      src: "/images/projects/ai-pacman.png",
      alt: "AI Pac-Man",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["React", "TypeScript", "Vite", "Tailwind", "Hobby"],
    metrics: ["React 19", "Ghost AI", "Collision Detection"],
    links: [
      {
        label: "Github",
        href: "https://github.com/jayvicsanantonio/ai-pacman",
        icon: <Github size={18} />,
      },
      {
        label: "View",
        href: "https://jayvicsanantonio.github.io/ai-pacman/",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            A modern implementation of the classic Pac-Man game, built to
            explore React 19 features, state management with hooks and context,
            and simple game AI.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Utilized React 19 for modern features, TypeScript for type safety,
            Vite for a fast development environment, and Tailwind CSS for
            styling. Implemented game logic including collision detection,
            power-up modes, and basic ghost AI.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            A playable demo showcasing a complete game loop, responsive
            controls, and functional AI-driven opponents.
          </>
        ),
      },
    ],
  },
  {
    slug: "ai-timeline",
    title: "The AI Timeline",
    period: "2025",
    blurb:
      "Developed a visually engaging and performant AI timeline using Next.js 15 and Framer Motion, ensuring full accessibility compliance. This project showcases skills in building interactive data visualizations and optimizing web performance.",
    image: {
      src: "/images/projects/ai-timeline.png",
      alt: "AI Timeline",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Next.js", "TypeScript", "Framer Motion", "Hobby"],
    metrics: ["Next.js 15", "Framer Motion", "Accessibility"],
    links: [
      {
        label: "Github",
        href: "https://github.com/jayvicsanantonio/ai-timeline",
        icon: <Github size={18} />,
      },
      {
        label: "View",
        href: "https://ai-timeline-six.vercel.app/",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            An interactive timeline of AI history, designed to be performant and
            accessible, built with the latest web technologies.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Utilized Next.js 15 for its performance features, TypeScript for
            type safety, and Framer Motion for smooth animations. Ensured WCAG
            compliance for accessibility.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            A fast, engaging, and accessible timeline that visually represents
            key moments in AI history.
          </>
        ),
      },
    ],
  },
  {
    slug: "yahoo-dsp",
    title: "Yahoo DSP",
    period: "2016–2023",
    blurb:
      "Led frontend architecture for a high-stakes programmatic advertising platform, enhancing audience tooling and real-time bidding systems. Achieved a 1150% increase in data processing throughput and influenced over $140M in ad spend.",
    image: {
      src: "/images/home/yahoo-dsp.webp",
      alt: "Yahoo DSP",
      width: 1200,
      height: 400,
      ratio: "1200/400",
    },
    skills: [
      "AdTech",
      "Architecture",
      "Performance",
      "Testing",
      "DX",
      "Ember",
      "React",
      "Enterprise",
    ],
    metrics: [
      "+1150% throughput (uploads)",
      "$140M+ ad spend influenced",
      "E2E stability via Cypress",
    ],
    links: [
      {
        label: "View",
        href: "https://www.advertising.yahooinc.com/our-dsp",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Core developer across RTB tools and audience systems. Owned
            performance-critical flows and mentored engineers while evolving
            frameworks (Ember→modernized stacks).
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Introduced resilient upload pipeline patterns, reusable UI
            primitives, and CI-friendly end‑to‑end testing with Cypress to
            reduce flakiness and accelerate feedback.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Increased audience upload capacity from 2M → 25M records;
            contributed to features that drove material spend; improved
            developer velocity and product reliability.
          </>
        ),
      },
    ],
  },
  {
    slug: "christmas-countdown",
    title: "Christmas Countdown",
    period: "2024",
    blurb:
      "Demonstrated expertise in modern CSS capabilities by creating a festive countdown timer that leverages the Popover and Anchor Positioning APIs for a unique and interactive user experience.",
    image: {
      src: "/images/projects/christmas-countdown.png",
      alt: "Christmas Countdown experiment preview",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Sandboxes"],
    metrics: ["Popover API", "Anchor Positioning API"],
    links: [
      {
        label: "View Sandbox",
        href: "https://codesandbox.io/p/sandbox/christmas-countdown-using-popover-and-anchor-positioning-apis-c894q8?file=%2Findex.html&from-embed",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Interactive holiday-themed UI exploring modern web platform
            features.
          </>
        ),
      },
    ],
  },
  {
    slug: "aurora-borealis",
    title: "Aurora Borealis",
    period: "2024",
    blurb:
      "Crafted a visually stunning aurora borealis effect using only HTML and CSS, showcasing advanced animation techniques and a deep understanding of layered gradients to create a dynamic and engaging background.",
    image: {
      src: "/images/projects/aurora-borealis.png",
      alt: "Aurora Borealis CSS animation",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Sandboxes"],
    metrics: ["CSS Animation", "Layered gradients"],
    links: [
      {
        label: "View Sandbox",
        href: "https://codesandbox.io/p/sandbox/23lnhc?file=%2Fstyles.css",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            A visual experiment recreating northern lights with gradients and
            keyframes.
          </>
        ),
      },
    ],
  },
  {
    slug: "total-solar-eclipse",
    title: "Total Solar Eclipse",
    period: "2024",
    blurb:
      "Engineered a precise and captivating solar eclipse animation using pure CSS, leveraging radial gradients and keyframes to simulate a complex astronomical event. This project highlights a mastery of CSS for creating sophisticated visual effects.",
    image: {
      src: "/images/projects/solar-eclipse.png",
      alt: "Total Solar Eclipse CSS animation",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Sandboxes"],
    metrics: ["Radial gradients", "Pure CSS"],
    links: [
      {
        label: "View Sandbox",
        href: "https://codesandbox.io/p/sandbox/qlnxgn?file=%2Fstyles.css",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Animating celestial motion with CSS only; inspired by April 2024
            eclipse.
          </>
        ),
      },
    ],
  },
  {
    slug: "barbenheimer-vscode-theme",
    title: "Barbenheimer VS Code Theme",
    period: "2023",
    blurb:
      "Designed and launched a popular VS Code theme with dual-light and dark modes, focusing on optimal contrast and legibility for improved developer experience. Published to the Visual Studio Marketplace, it has been widely adopted by the community.",
    image: {
      src: "/images/home/barbenheimer.webp",
      alt: "Barbenheimer VS Code Theme",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Open Source", "Design Systems", "DX"],
    metrics: [
      "Marketplace distribution",
      "Multi-theme variants",
      "Accessible contrast choices",
    ],
    links: [
      {
        label: "Github",
        href: "https://github.com/jayvicsanantonio/barbenheimer-vscode-theme",
        icon: <Github size={18} />,
      },
      {
        label: "View Marketplace",
        href: "https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Built for daily use with balanced syntax color roles and consistent
            UI surfaces. Prioritized clarity and theme cohesion across states.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Crafted palette pairs with measured saturation; tuned
            selection/hover backgrounds; hardened readability for long sessions.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Positive adoption and reuse patterns; approachable and fun without
            compromising professional legibility.
          </>
        ),
      },
    ],
  },
  {
    slug: "barbenheimer-zed-theme",
    title: "Barbenheimer Zed Theme",
    period: "2024",
    blurb:
      "Developed and published a Zed editor theme with a cohesive and polished design system, offering both light and dark variants. This project demonstrates a keen eye for UI/UX and a commitment to enhancing developer tools.",
    image: {
      src: "/images/projects/barbenheimer-zed-theme.webp",
      alt: "Barbenheimer Zed Theme",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Open Source", "Design Systems", "DX"],
    metrics: [
      "Published on Zed",
      "Consistent token roles",
      "Refined focus/selection states",
    ],
    links: [
      {
        label: "Github",
        href: "https://github.com/jayvicsanantonio/barbenheimer-zed-theme",
        icon: <Github size={18} />,
      },
      {
        label: "View Marketplace",
        href: "https://zed.dev/extensions/barbenheimer",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Designed variants that feel related yet distinct, preserving
            familiarity across modes.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Shared base hues with divergent accents; considered whitespace and
            contrast ergonomics.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Stable, readable themes with personality; easy to switch without
            visual fatigue.
          </>
        ),
      },
    ],
  },

  {
    slug: "mm-church",
    title: "Malayang Mananampalataya Church",
    period: "2022",
    blurb:
      "Engineered a responsive and accessible church website using React, focusing on clear navigation and a streamlined content architecture. The mobile-first design ensures a seamless user experience for a broad audience.",
    image: {
      src: "/images/home/mm-church.webp",
      alt: "Malayang Mananampalataya Church",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["React", "Accessibility", "Content Architecture", "Client"],
    metrics: ["Mobile‑first UX", "Fast loading", "Clear content structure"],
    links: [
      {
        label: "Github",
        href: "https://github.com/nesceal/mmchurch",
        icon: <Github size={18} />,
      },
      { label: "View", href: "https://mmchurch.ph/" },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Focused on simple publishing and intuitive structure for a broad
            audience.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Chose a lightweight React stack with accessible components and clear
            content hierarchy.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Improved discoverability of sermons and events; consistent UX across
            devices.
          </>
        ),
      },
    ],
  },
  {
    slug: "sync-flow",
    title: "SyncFlow",
    period: "2024",
    blurb:
      "Architected a low-latency, edge-deployed synchronization service to bridge Apple Reminders and Google Tasks. This project utilizes OAuth, webhooks, and Redis for an event-driven, zero-cold-start user experience.",
    image: {
      src: "/images/projects/sync-flow.png",
      alt: "SyncFlow",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: [
      "Edge",
      "Architecture",
      "Performance",
      "TypeScript",
      "Hono",
      "Hobby",
    ],
    metrics: [
      "<100ms edge latency targets",
      "Event‑driven updates",
      "Zero‑cold‑start UX",
    ],
    links: [
      {
        label: "Github",
        href: "https://github.com/jayvicsanantonio/sync-flow",
        icon: <Github size={18} />,
      },
      { label: "View", href: "https://sync-flow-nine.vercel.app/" },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Designed to feel instantaneous across ecosystems. Built for
            consistency, conflict resolution, and fault‑tolerant event delivery.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Chose Vercel edge + Hono for proximity; leveraged OAuth + webhooks
            with Redis‑backed state to minimize polling and avoid drift.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Smooth two‑way sync, responsive UX under network variability, and a
            portable architecture that can extend to other providers.
          </>
        ),
      },
    ],
  },
  {
    slug: "tracknstick",
    title: "Track N' Stick",
    period: "2024",
    blurb:
      "Developed a full-stack habit tracking application with streak visualization and goal management features. This project showcases expertise in building robust, user-centric applications with modern web technologies.",
    image: {
      src: "/images/projects/tracknstick.png",
      alt: "Track N' Stick",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Hobby", "React", "TypeScript", "Full Stack"],
    metrics: ["Habit tracking", "Streak visualization", "Goal management"],
    links: [
      {
        label: "Github",
        href: "https://github.com/jayvicsanantonio/tracknstick.com",
        icon: <Github size={18} />,
      },
      { label: "View", href: "https://tracknstick.com/" },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Personal project focused on building sustainable habits through
            visual progress tracking and goal setting.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Built with a clean, intuitive interface prioritizing ease of use and
            consistent engagement patterns.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Delivered a functional habit tracker with streak visualization and
            goal management capabilities.
          </>
        ),
      },
    ],
  },
  {
    slug: "webdevhub",
    title: "Web Development Hub",
    period: "2023",
    blurb:
      "Curated and built a comprehensive resource library for developers, featuring a structured taxonomy and a fast, intuitive search experience. This project highlights a commitment to improving developer workflow and knowledge sharing.",
    image: {
      src: "/images/home/webdevhub.png",
      alt: "Web Development Hub",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["DX", "Accessibility", "React", "Hobby"],
    metrics: [
      "Hundreds of links curated",
      "Structured taxonomy",
      "Fast search UX",
    ],
    links: [
      {
        label: "Github",
        href: "https://github.com/jayvicsanantonio/web-development-hub",
        icon: <Github size={18} />,
      },
      { label: "View", href: "https://webdevhub.link/" },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Built to onboard engineers quickly and reduce search friction.
            Focused on clarity and navigability.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Lightweight stack with accessible components and semantic markup.
            Emphasis on category IA and scanning speed.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Faster discovery of quality resources; repeatable curation model;
            easy contribution flow.
          </>
        ),
      },
    ],
  },
  {
    slug: "fintq-lendr",
    title: "FINTQ — Lendr",
    period: "2016",
    blurb:
      "Architected and delivered a mobile-first digital lending marketplace in the Philippines using Node.js and Express.js, connecting banks with borrowers through a secure and streamlined onboarding process.",
    image: {
      src: "/images/projects/fintq-lendr.png",
      alt: "FINTQ Lendr",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Architecture", "Performance", "DX", "Enterprise"],
    metrics: ["Digital lending marketplace", "Mobile-first onboarding"],
    links: [
      {
        label: "View",
        href: "https://www.voyagerinnovation.com/fintq",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Built to extend access to credit by bringing bank lending flows to
            mobile.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Focused on secure, streamlined journeys and an API-first integration
            surface for participating banks.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Enabled scalable distribution of loan products across geographies
            via a single mobile experience.
          </>
        ),
      },
    ],
  },
  {
    slug: "croo",
    title: "Croo",
    period: "2015–2016",
    blurb:
      "Led the development of an IoT wearable safety device with a companion Android app, featuring Bluetooth Low Energy connectivity and a scalable AWS backend. This project demonstrates expertise in building end-to-end IoT solutions.",
    image: {
      src: "/images/projects/croo.png",
      alt: "Croo wearable and app",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: [
      "Architecture",
      "DX",
      "Internet of Things",
      "AWS",
      "Node",
      "Express",
      "Android",
      "BLE",
      "Startup",
    ],
    metrics: [
      "Bluetooth Low Energy wearable",
      "Android companion app",
      "AWS-hosted backend (Node + Express)",
    ],
    links: [
      {
        label: "Watch Video",
        href: "https://www.youtube.com/watch?v=0wYUNuDsrRo",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Designed and supported the infrastructure for an IoT wearable
            focused on personal safety, with a companion Android application.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Chose BLE for low-power connectivity; implemented a Node.js +
            Express backend on AWS to provide reliable APIs and telemetry
            processing.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Delivered a responsive device–app experience with a scalable cloud
            backend and streamlined developer workflows.
          </>
        ),
      },
    ],
  },
  {
    slug: "ember-upgrade-guide",
    title: "Ember Upgrade Guide",
    period: "2020",
    blurb:
      "Contributed to a critical open-source tool for the Ember community, providing clear and concise guidance for upgrading applications across framework versions. This project showcases a commitment to developer education and open-source contribution.",
    image: {
      src: "/images/projects/ember-upgrade-guide.png",
      alt: "Ember Upgrade Guide",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Open Source", "DX", "Ember", "React"],
    metrics: [
      "Used by the Ember community",
      "Guided upgrades across framework releases",
    ],
    links: [
      {
        label: "Github",
        href: "https://github.com/ember-learn/upgrade-guide",
        icon: <Github size={18} />,
      },
      { label: "View", href: "https://upgrade.emberjs.com/" },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Contributed to a community resource that streamlines upgrading Ember
            apps by surfacing changes between versions and recommended migration
            steps.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Focused on clarity and accuracy of guidance; emphasized a
            developer‑friendly UX to minimize friction during upgrades.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Increased confidence and speed of framework upgrades across teams
            adopting modern Ember patterns.
          </>
        ),
      },
    ],
  },
  {
    slug: "eat-bulaga-mobile",
    title: "Eat Bulaga! Mobile",
    period: "2014–2015",
    blurb:
      "Co-engineered the official fan application for a major television show, supporting hundreds of thousands of concurrent users with scalable Node.js services and real-time features. The app achieved over 500,000 downloads and a 4.5-star rating.",
    image: {
      src: "/images/projects/eat-bulaga-mobile.png",
      alt: "Eat Bulaga Mobile app",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Enterprise", "Node", "SailsJS", "Redis", "MongoDB", "Android"],
    metrics: ["500K–1M downloads", "4.5★ (22,339 ratings)"],
    links: [
      {
        label: "Read Project",
        href: "https://www.ajmatillano.com/eb-mobile",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Collaborated on a large-scale consumer app for T.A.P.E., integrating
            social feeds and delivering the Pinoy Henyo multiplayer experience
            to mobile.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Used Node and SailsJS with Redis and MongoDB to handle spikes in
            concurrent requests; optimized for reliability and low-latency
            interactions.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Successfully launched for the show’s 35th anniversary with strong
            adoption and engagement.
          </>
        ),
      },
    ],
  },
  {
    slug: "pinoy-hoops",
    title: "Pinoy Hoops",
    period: "2013–2015",
    blurb:
      "Developed a high-traffic digital platform for basketball fans, delivering real-time scores, news, and community features. Engineered for reliability and scale, this project demonstrates expertise in building and maintaining high-availability web applications.",
    image: {
      src: "/images/projects/pinoy-hoops.webp",
      alt: "Pinoy Hoops",
      width: 1200,
      height: 675,
      ratio: "1200/675",
    },
    skills: ["Enterprise", "Express", "Node", "MongoDB", "Redis", "jQuery"],
    metrics: ["Highly trafficked sports content", "Optimized build and deploy"],
    links: [
      {
        label: "Read Article",
        href: "https://www.techinasia.com/pinoyhoops-app-assist-basketball-fans",
      },
    ],
    sections: [
      {
        label: "Context",
        content: (
          <>
            Helped evolve an enterprise-grade content platform serving
            Philippine basketball fans with fresh updates and features.
          </>
        ),
      },
      {
        label: "Decisions",
        content: (
          <>
            Used Express and Node with MongoDB and Redis for fast page delivery
            and caching; streamlined templating and UI with jQuery and CSS.
          </>
        ),
      },
      {
        label: "Results",
        content: (
          <>
            Delivered a responsive, reliable experience that handled bursts of
            traffic around major games and events.
          </>
        ),
      },
    ],
  },
];

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((c) => c.slug === slug);
}
