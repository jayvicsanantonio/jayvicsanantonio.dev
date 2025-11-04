"use client";

import { Icon } from "@iconify/react";
import type { MotionProps } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/ui/Badge";
import { CARD_INNER_BASE, CARD_OUTER_BASE } from "@/components/ui/cardStyles";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

type Experience = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
};

const EXPERIENCES: Experience[] = [
  {
    title: "Independent Builder and AI Upskilling",
    company: "Professional Sabbatical",
    period: "2023 - Present",
    bullets: [
      "Rebuilt my personal website with Next.js, React, TypeScript, and Tailwind CSS, modernizing its architecture for performance, accessibility, and visual consistency. Benchmarked and refactored the frontend to improve mobile LCP by 0.52 seconds, introduced Partial Pre-Rendering experiments, and ensured Safari/mobile parity through dedicated proxy and CSS fallback systems. The site also showcases multiple production-grade React + TypeScript applications I built, including productivity tools, games, and utilities.",
      "Incorporated AI tools such as Claude Code, Cursor, Codex, and Kiro to accelerate implementation while keeping code structured, maintainable, and production-ready. I follow a spec-driven approach rather than “vibe-coding,” defining clear system requirements first, then using AI to automate repetitive work and generate high-quality code snippets. For ideation, learning, and consolidating new concepts, I regularly use ChatGPT and Gemini to refine my understanding and improve my decision-making as an engineer. This disciplined workflow enables me to build fully functional web app MVPs in under 24 hours without compromising clarity or craftsmanship.",
      "Invited by Google to attend Google I/O 2025, where I explored Gemini and Google’s AI ecosystem. Joined the first class of Google’s Startup School: GenAI Media training series to deepen my understanding of AI applications in creative and technical workflows. Actively participate in AI meetups and conferences both online and in person across the Bay Area, including AI-Driven Development Day, O’Reilly’s AI Codecon, Ship AI 2025 by Vercel, and the upcoming Google’s DevFest in Silicon Valley 2025 to stay current with emerging tools, trends, and expert discussions in AI development.",
      "Built and deployed CollectIQ from concept to production in under 2 weeks for the AWS AI Agent Global Hackathon, leading a team of three engineers to develop a serverless multi-agent AI system that authenticates and values Pokémon trading cards using AWS Bedrock (Claude Sonnet 4), Rekognition, and Step Functions. Leveraged Lambda, DynamoDB, S3, Cognito, CloudWatch, and X-Ray for scalable orchestration, storage, and observability. Designed specialized agents for OCR correction, authenticity detection, and pricing aggregation across eBay and Pokémon TCG APIs. Delivered explainable AI outputs, sub-minute analysis, and cost-efficient scalability ($0.01 per analysis at 50k runs/month) with full infrastructure-as-code via Terraform.",
      "Built Humanity Passport for the OpenAI Open Model Hackathon, leading a two-person team to create an AI-powered recognition platform that identifies and celebrates open-source projects contributing positively to humanity. Developed with Next.js 14, React, and TypeScript, integrating OpenAI gpt-oss-20b via Groq API, LangChain, and GitHub Octokit for repository analysis. Leveraged Prisma and Postgres for data persistence, and built a performant, responsive frontend with TailwindCSS, shadcn/ui, and Radix UI, deployed on Vercel. Delivered sub-10-second AI evaluations, dynamic SVG badges, and detailed public project pages that showcase AI-driven reasoning for each recognized repository.",
      "Built Reflexa AI for the Google Chrome Built-in AI Challenge 2025, a wellness-centered Chrome extension that transforms everyday reading into calm, reflective micro-sessions powered by Gemini Nano. Engineered with TypeScript, React, and Vite, and tested with Vitest, integrating all 7 Chrome Built-in AI APIs for summarization, rewriting, translation, and tone guidance with complete on-device privacy.",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Vite",
      "shadcn/ui",
      "Radix UI",
      "Vitest",
      "Prisma",
      "Postgres",
      "AWS Bedrock",
      "LLM",
      "AWS Lambda",
      "Step Functions",
      "Rekognition",
      "DynamoDB",
      "S3",
      "Cognito",
      "Terraform",
      "Vercel",
      "Gemini Nano",
      "Groq API",
      "LangChain",
      "GitHub Octokit",
      "Chrome Built-in AI APIs",
      "AI Agents",
      "Multi-Agent Systems",
      "Generative AI",
      "Context Engineering",
      "Spec-Driven Development",
      "Performance Optimization",
      "Accessibility",
      "Serverless Architecture",
      "Hackathons",
      "Open Source",
    ],
  },
  {
    title: "Software Engineer",
    company: "Yahoo Inc.",
    period: "2016 - 2023",
    bullets: [
      "Rebuilt the App Marketing business of the Yahoo Demand Side Platform as a core developer using Ember, Java and MySQL and generating over $140M in advertising spend since it launched while successfully overcoming challenges posed by Apple’s iOS 14.5 IDFA opt-out feature",
      "Optimized Yahoo DSP Email Audience Builder Upload feature by transforming its capacity from 2M to 25M records, a 1150% improvement, inspiring other UI performance initiatives, and preventing potential revenue impact, executed single-handedly",
      "Designed and built a wide range of Yahoo DSP features, from UI/UX improvements to revenue-generating initiatives, demonstrating software engineering skills through consistent use of reusable components, proper end-to-end testing, and gaining the trust of senior peers to build the foundational frameworks and complex Ember components",
      "Fostered a culture of collaboration and growth by mentoring junior engineers and new hires, creating a positive environment where they could feel comfortable discussing technical concepts, and asking questions",
      "Contributed to an Ember open source project (https://github.com/ember-learn/upgrade-guide) and was recognized in Ember Times - Issue No. 166, streamlining app upgrades with detailed insights on new features, deprecations, and breaking changes across Ember core, Ember Data, and Ember CLI from older versions to newer ones",
      "Built the Yahoo DSP Replay tool autonomously with React, enabling streamlined testing and validation of legitimate bid requests, significantly improving the productivity of the Product Support Team, and helping identify and debug issues quickly, a critical component of the DSP Serving’s Real Time Bidding System",
      "Contributed to front-end and back-end development of DMP (Data Management Platform), a key component of the Yahoo DSP utilizing Ember, Java, and MySQL, generating several millions of dollars in revenue",
      "Explored the adoption of Cypress.io to address the pain points of flaky end-to-end tests in Selenium, facilitated meetings to share insights on how to write simple reliable tests in JavaScript, resulting in increased team interest and engagement, with multiple team members integrating Cypress.io into our build pipeline successfully",
      "Contributed to upgrading Yahoo DSP’s Ember framework, enhancing performance, security, and developer experience, unlocking new capabilities and ecosystem of add-ons, ensuring compatibility with future updates, and resulting in a better product and increased customer satisfaction, as a key maintenance contributor",
    ],
    tags: [
      "Ember.js",
      "React.js",
      "Java",
      "MySQL",
      "Cypress.io",
      "Agile",
      "Selenium",
      "UI Performance Optimization",
      "Reusable Components",
      "Full-Stack Development",
      "End-to-End Testing",
      "Collaboration",
      "Real-Time Bidding Systems",
      "Data Management Platform (DMP)",
      "Ad Tech",
      "Mentorship",
      "Open Source",
    ],
  },
  {
    title: "Co-Founder",
    company: "Saffron Technologies Inc.",
    period: "2015 - 2016",
    bullets: [
      "Selected as one of the Top 10 startups (out of 1,028 entries across 15 countries) in the 2015 IdeaSpace Foundation Accelerator Program, the Philippines’ premier technology incubator, recognized for innovation in wearable technology.",
      "Featured in five of the Philippines’ top tech and business outlets, including Deal Street Asia, Enterprise Innovation, KabayanTech, The Philippine Star, and BusinessMirror, after winning the 2015 IdeaSpace Startup Competition, gaining national recognition and credibility in the local startup ecosystem",
      "Represented the company as one of 350 startups worldwide selected for the RISE Conference 2015 (Hong Kong) under the ALPHA Program, showcasing our wearable technology to investors, and strengthening brand presence at the National Science and Technology Week 2015 (Philippines)",
      "Co-led the research, design, and implementation of Bluetooth Low Energy (BLE) technology for the wearable device Croo, enhancing connection stability and cutting hardware costs",
      "ollaborated on designing and scaling AWS infrastructure for the Android companion app of our IoT wearable device, ensuring reliable performance and seamless data sync between the app and device",
    ],
    tags: [
      "Bluetooth Low Energy (BLE)",
      "IoT",
      "AWS",
      "Cloud Infrastructure",
      "Data Sync",
      "Innovation",
      "Hardware Integration",
      "Prototyping",
      "Product Design",
      "Wearable Technology",
      "Startup Leadership",
    ],
  },
  {
    title: "Software Engineer",
    company: "Voyager Innovations Inc.",
    period: "2013 - 2016",
    bullets: [
      "Built and delivered the back end of Lendr, the Philippines’ first fully digital end-to-end consumer loan platform (now part of Maya, Philippines’ #1 digital bank), using Node.js and Express, enabling seamless loan processing for thousands of users.",
      "Delivered a highly scalable back-end system for Eat Bulaga! Mobile, the official app of the Philippines’ longest-running TV show, supporting 700K+ active users through Sails.js, MongoDB, and Redis, while managing and mentoring three junior engineers; the app earned a 4.5 star rating from over 22K users on Google Play",
      "Led a cross-functional team to multiple victories in national hackathons, including 1st Place in Hack the Climate 2015 and HERE Hackathon Manila 2014, and reached the semifinals of the Google Cloud Developer Challenge 2013.",
      "Authored a featured editorial titled “All I Really Need to Know, I Learned from Pinoy Hackathons”, published on GMA News Online, one of the Philippines’ top news platforms, showcasing thought leadership in the local tech community.",
      "Redesigned and rebuilt SmartNet, a mobile suite used by 320K+ prepaid subscribers for free internet access, using Node.js, Sails.js, HTML, CSS, MongoDB, and Redis to improve performance and reliability.",
      "Refactored and optimized Pinoy Hoops, the go-to digital hub for PBA, NCAA, and FIBA fans, enhancing real-time responsiveness with Express.js, Socket.io, MongoDB, and Redis, ensuring reliable coverage during live games.",
    ],
    tags: [
      "Node.js",
      "Express.js",
      "Sails.js",
      "Socket.io",
      "MongoDB",
      "Redis",
      "HTML",
      "CSS",
      "JavaScript",
      "REST API",
      "Agile",
      "Scalable Systems",
      "Backend Development",
      "Microservices",
      "Performance Optimization",
      "Mentorship",
      "Hackathons",
    ],
  },
  {
    title: "Intern",
    company: "University of the Philippines Diliman CRS",
    period: "2011 - 2012",
    bullets: [
      "Collaborated with a team of interns to design and implement a new module that streamlined the registration process for thousands of students, leveraging PostgreSQL, PHP, CSS, JavaScript, and HTML, and optimized the database schema for improved data retrieval",
      "Applied theoretical knowledge to practice, demonstrating problem-solving and critical thinking skills in a real-world setting, and producing high-quality and maintainable code using CodeIgniter, contributing to the University's modern and efficient registration system",
      "Provided timely technical support to students, faculty, and staff of the University of the Philippines troubleshooting and resolving network-related issues to ensure uninterrupted access to essential resources in the Diliman campus",
      "Gained valuable experience working with Linux systems and developed a deep appreciation for open source projects",
      "Collaborated effectively with a team of full-time Computer Center employees to maintain a high standard of service, earning recognition from supervisors and clients for exceptional customer service skills",
    ],
    tags: ["PostgreSQL", "PHP", "JS", "HTML", "CSS", "Linux"],
  },
];

export default function WorkTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.6"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const getRevealProps = (index: number): MotionProps => {
    if (prefersReducedMotion) {
      return { initial: {}, whileInView: {}, viewport: {}, transition: {} };
    }
    // First card shows immediately without animation
    if (index === 0) {
      return {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: {},
      };
    }
    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2, margin: "0px 0px -100px 0px" },
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    };
  };

  return (
    <div ref={containerRef} className="relative mt-8 sm:mt-12 lg:mt-16">
      {/* Flow wrapper: center 100vw wrapper so spine aligns at viewport center */}
      <div className="lg:relative lg:left-1/2 lg:w-[100vw] lg:-translate-x-1/2">
        {/* Spine track (subtle) */}
        <div
          aria-hidden
          className="hidden h-full w-px bg-white/5 lg:absolute lg:top-0 lg:left-1/2 lg:block lg:-translate-x-1/2"
        />
        {/* Spine fill that grows with scroll */}
        <motion.div
          aria-hidden
          style={{
            scaleY: prefersReducedMotion ? 1 : spineScale,
          }}
          className="pointer-events-none hidden h-full w-1 origin-top [transform:translateZ(0)] bg-[linear-gradient(to_bottom,rgba(59,130,246,0.75),rgba(168,85,247,0.55),rgba(34,211,238,0.35),transparent)] shadow-[0_0_14px_rgba(59,130,246,0.25)] lg:absolute lg:top-0 lg:left-1/2 lg:block lg:-translate-x-1/2"
        />
        {/* Elegant cap at the start of the spine */}
        <div className="hidden translate-y-[-6px] lg:absolute lg:top-0 lg:left-1/2 lg:block lg:-translate-x-1/2">
          <div className="relative">
            {/* Distinct cap: gradient sphere (larger than nodes) */}
            <span className="block h-3.5 w-3.5 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.95),rgba(168,85,247,0.9))] shadow-[0_0_16px_rgba(59,130,246,0.45)] ring-1 ring-white/20" />
            {/* Soft halo */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.35),rgba(168,85,247,0.25),transparent_70%)] opacity-25 blur-md"
            />
            {/* Gentle pulse */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-cyan-300/50"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.45, opacity: 0 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            {/* Intro rays */}
            <span
              aria-hidden
              className="absolute top-1 left-1/2 h-[12px] w-px -translate-x-1/2 -rotate-[18deg] bg-cyan-300/25"
            />
            <span
              aria-hidden
              className="absolute top-1 left-1/2 h-[12px] w-px -translate-x-1/2 rotate-[18deg] bg-purple-400/25"
            />
          </div>
        </div>
        <ul className="relative space-y-8 pt-10 pl-0 sm:space-y-12 sm:pt-16 lg:space-y-28 lg:pt-24">
          {EXPERIENCES.map((item, index) => {
            const isRight = index % 2 === 0;
            return (
              <li key={`${item.title}-${item.period}`} className="relative">
                {/* Node on spine */}
                <div className="absolute top-6 hidden lg:left-1/2 lg:block lg:-translate-x-1/2">
                  <span className="relative z-10 block h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_3px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/60" />
                  {!prefersReducedMotion ? (
                    <>
                      {/* Primary, brighter ripple */}
                      <motion.span
                        aria-hidden
                        initial={{ scale: 1, opacity: 0.5 }}
                        whileInView={{ scale: 2.8, opacity: 0 }}
                        viewport={{ once: true, amount: 0.4, margin: "0px 0px -50px 0px" }}
                        transition={{
                          duration: 2.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: index * 0.08,
                        }}
                        className="pointer-events-none absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_20px_1px_rgba(34,211,238,0.25)] ring-2 ring-cyan-300/50"
                      />
                      {/* Secondary ripple for depth */}
                      <motion.span
                        aria-hidden
                        initial={{ scale: 1, opacity: 0.35 }}
                        whileInView={{ scale: 2.2, opacity: 0 }}
                        viewport={{ once: true, amount: 0.4, margin: "0px 0px -50px 0px" }}
                        transition={{
                          duration: 2.0,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: index * 0.08 + 0.1,
                        }}
                        className="pointer-events-none absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-purple-400/30"
                      />
                    </>
                  ) : null}
                </div>

                <div
                  className={`relative ${
                    // On lg+, allocate viewport-side gutter so cards hug a 2vw gap from the 50vw spine
                    isRight ? "lg:pl-[52vw]" : "lg:pr-[52vw]"
                  }`}
                >
                  {/* Card */}
                  <motion.article
                    {...getRevealProps(index)}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            y: -4,
                            transition: {
                              duration: 0.3,
                              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                            },
                          }
                    }
                    className={`${CARD_OUTER_BASE} mx-auto w-full lg:mx-0 lg:w-[min(500px,50vw)] ${
                      isRight ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                  >
                    <div
                      className={`${CARD_INNER_BASE} p-5 sm:p-6 [@container(min-width:36rem)]:p-6`}
                    >
                      <div className="text-left">
                        <h3 className="font-oswald text-xl text-white [@container(min-width:28rem)]:text-2xl">
                          {item.title}
                        </h3>
                        <div className="mt-1 flex items-baseline justify-between gap-3">
                          <p className="text-sm tracking-[0.14em] text-gray-300/90 uppercase lg:text-base">
                            {item.company}
                          </p>
                          <span className="lg:text:[11px] rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.12em] whitespace-nowrap text-gray-300 uppercase">
                            {item.period}
                          </span>
                        </div>
                        <div className="mt-3 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
                      </div>

                      <ul className="mt-4 space-y-3 text-[0.95rem]/relaxed sm:text-[0.98rem]/relaxed [@container(min-width:34rem)]:space-y-4">
                        {item.bullets.map((b) => (
                          <li key={b} className="flex gap-2 break-words text-gray-300/90">
                            <Icon
                              icon="mdi:check"
                              width={18}
                              height={18}
                              className="mt-0.5 shrink-0 text-cyan-300/80"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <Badge key={t} className="text-xs" variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
