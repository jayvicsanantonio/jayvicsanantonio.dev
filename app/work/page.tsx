'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import AmbientBackground from '@/components/pages/AmbientBackground';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

type Experience = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
};

const EXPERIENCES: Experience[] = [
  {
    title: 'Software Dev Engineer II',
    company: 'Yahoo Inc.',
    period: '2019 - 2023',
    bullets: [
      'Rebuilt the App Marketing business of the Yahoo Demand Side Platform as a core developer using Ember, Java and MySQL and generating over $140M in advertising spend since it launched while successfully overcoming challenges posed by Apple’s iOS 14.5 IDFA opt-out feature',
      'Optimized Yahoo DSP Email Audience Builder Upload feature by transforming its capacity from 2M to 25M records, a 1150% improvement, inspiring other UI performance initiatives, and preventing potential revenue impact, executed single-handedly',
      'Designed and built a wide range of Yahoo DSP features, from UI/UX improvements to revenue-generating initiatives, demonstrating software engineering skills through consistent use of reusable components, proper end-to-end testing, and gaining the trust of senior peers to build the foundational frameworks and complex Ember components',
      'Fostered a culture of collaboration and growth by mentoring junior engineers and new hires, creating a positive environment where they could feel comfortable discussing technical concepts, and asking questions',
      'Contributed to an Ember open source project (https://github.com/ember-learn/upgrade-guide) and was recognized in Ember Times - Issue No. 166, streamlining app upgrades with detailed insights on new features, deprecations, and breaking changes across Ember core, Ember Data, and Ember CLI from older versions to newer ones',
    ],
    tags: [
      'React',
      'Ember',
      'Express',
      'Node',
      'JS',
      'HTML',
      'CSS',
      'AWS',
      'Java',
      'MySQL',
      'AdTech',
    ],
  },
  {
    title: 'Software Dev Engineer',
    company: 'Yahoo Inc.',
    period: '2016 - 2019',
    bullets: [
      'Built the Yahoo DSP Replay tool autonomously with React, enabling streamlined testing and validation of legitimate bid requests, significantly improving the productivity of the Product Support Team, and helping identify and debug issues quickly, a critical component of the DSP Serving’s Real Time Bidding System',
      'Contributed to front-end and back-end development of DMP (Data Management Platform), a key component of the Yahoo DSP utilizing Ember, Java, and MySQL, generating several millions of dollars in revenue',
      'Explored the adoption of Cypress.io to address the pain points of flaky end-to-end tests in Selenium, facilitated meetings to share insights on how to write simple reliable tests in JavaScript, resulting in increased team interest and engagement, with multiple team members integrating Cypress.io into our build pipeline successfully',
      'Contributed to upgrading Yahoo DSP’s Ember framework, enhancing performance, security, and developer experience, unlocking new capabilities and ecosystem of add-ons, ensuring compatibility with future updates, and resulting in a better product and increased customer satisfaction, as a key maintenance contributor',
    ],
    tags: [
      'React',
      'Ember',
      'Express',
      'Node',
      'JS',
      'HTML',
      'CSS',
      'Java',
      'MySQL',
      'AdTech',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Voyager Innovations Inc.',
    period: '2016',
    bullets: [
      'Demonstrated technical expertise and ability to thrive under pressure by leading my team to victory in several hackathons, including 1st Place finishes at Hack the Climate 2015 and HERE Hackathon Manila 2014, as well as a Semi-finalist ranking in the Google Cloud Developer Challenge 2013',
      'Authored an editorial titled "All I really need to know, I learned from Pinoy Hackathons," featured on GMA News Online, a highly regarded platform among the top news websites in the Philippines.',
      'Developed and delivered the back-end of Lendr, the Philippines’ first fully digital, end-to-end consumer loan platform, using Node and Express, collaborating with the team to ensure seamless project execution and timely delivery',
      'Implemented a scalable back-end system for a digital-media mobile application, Eat Bulaga! Mobile, leading a team of 3 junior engineers and utilizing Sails.js, MongoDB, and Redis to handle multiple thousands of concurrent requests from 700K+ active users',
      'Pioneered a culture of active participation in programming competitions and hackathons among Voyager engineers, resulting in increased creativity, knowledge and awareness of new tools and technologies',
    ],
    tags: [
      'AWS',
      'Express',
      'Node',
      'SailsJS',
      'Redis',
      'MongoDB',
      'FinTech',
    ],
  },
  {
    title: 'Co-Founder',
    company: 'Saffron Technologies Inc.',
    period: '2015 - 2016',
    bullets: [
      'Represented the company and pitched at local and international events, including the RISE Conference 2015 in Hong Kong and National Science and Technology Week 2015 in the Philippines, resulting in potential business partnerships and increased brand awareness.',
      'Achieved recognition in the Philippine tech industry, having been featured in a number of top tech blogs and news websites such as Deal Street Asia, Enterprise Innovation, KabayanTech, The Philippine Star and BusinessMirror for winning the IdeaSpace 2015 Startup Competition, which resulted in increased media coverage and brand visibility.',
      'Supported our CEO for the research, design and implementation of Bluetooth Low Energy technology in a wearable device (Croo), resulting in significant cost savings and improved product reliability.',
      'Collaborated with our COO and CTO in architecting and implementing a scalable and reliable AWS infrastructure to support the Croo Android application that complements our IoT Croo wearable, delivering a seamless user experience.',
      'Created and configured automated deployment processes using Puppet, resulting in streamlined and efficient updates and reduced deployment errors.',
    ],
    tags: ['AWS', 'Express', 'Node', 'Internet of Things'],
  },
  {
    title: 'Software Engineering Analyst',
    company: 'Voyager Innovations Inc.',
    period: '2013 - 2015',
    bullets: [
      'Developed the redesign of the existing stand-alone application, SmartNet, by participating in planning and initiation stages, implementing object-oriented design and JavaScript best practices, taking ownership of specific tasks, and delivering work with tight deadlines using Node, Sails.js, HTML, CSS, MongoDB, and Redis',
      'Refactored and optimized the codebase of Pinoy Hoops, a digital sports platform, using Express, jQuery, CSS, Pug, MongoDB and Redis',
    ],
    tags: [
      'Express',
      'Node',
      'SailsJS',
      'Redis',
      'MongoDB',
      'JS',
      'HTML',
      'CSS',
      'jQuery',
    ],
  },
  {
    title: 'Intern',
    company: 'University of the Philippines Diliman CRS',
    period: '2012',
    bullets: [
      'Collaborated with a team of interns to design and implement a new module that streamlined the registration process for thousands of students, leveraging PostgreSQL, PHP, CSS, JavaScript, and HTML, and optimized the database schema for improved data retrieval',
      "Applied theoretical knowledge to practice, demonstrating problem-solving and critical thinking skills in a real-world setting, and producing high-quality and maintainable code using CodeIgniter, contributing to the University's modern and efficient registration system",
    ],
    tags: ['PostgreSQL', 'PHP', 'JS', 'HTML', 'CSS'],
  },
  {
    title: 'Helpdesk Trainee',
    company: 'University of the Philippines Diliman Network',
    period: '2011 - 2012',
    bullets: [
      'Provided timely technical support to students, faculty, and staff of the University of the Philippines troubleshooting and resolving network-related issues to ensure uninterrupted access to essential resources in the Diliman campus',
      'Gained valuable experience working with Linux systems and developed a deep appreciation for open source projects',
      'Collaborated effectively with a team of full-time Computer Center employees to maintain a high standard of service, earning recognition from supervisors and clients for exceptional customer service skills',
    ],
    tags: ['Linux'],
  },
];

function TimelineDot() {
  return (
    <div className="relative z-10 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_3px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/50" />
  );
}

function ParallaxHalo({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const y = useTransform(
    progress,
    (v) => (v - 0.5) * (22 + index * 4)
  );
  const scale = useTransform(progress, [0, 1], [0.97, 1.03]);
  return (
    <motion.div
      aria-hidden
      style={{ y, scale }}
      className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl opacity-20 blur-xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.2),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)]"
    />
  );
}

function TimelineAccentCanvas({
  hue = 200,
  prefersReducedMotion,
}: {
  hue?: number;
  prefersReducedMotion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const size = 110;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'lighter';
      const cx = size / 2;
      const cy = size / 2;
      for (let i = 0; i < 3; i++) {
        const r = 22 + i * 12 + Math.sin((t + i * 60) * 0.02) * 2;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r + 24);
        g.addColorStop(0, `hsla(${hue + i * 30}, 90%, 65%, 0.14)`);
        g.addColorStop(1, 'hsla(0,0%,0%,0)');
        ctx.fillStyle = g as any;
        ctx.beginPath();
        ctx.arc(cx, cy, r + 24, 0, Math.PI * 2);
        ctx.fill();
      }
      t += prefersReducedMotion ? 0 : 1.6;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [hue, prefersReducedMotion]);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="opacity-50 drop-shadow-[0_0_8px_rgba(34,211,238,0.18)]"
    />
  );
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.1'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Glow follows the currently focused card using a spring for smoothness
  const glowY = useSpring(0, {
    stiffness: 140,
    damping: 20,
    mass: 0.6,
  });
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const root = containerRef.current;
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!root || !items.length) return;

    const updateForEntry = (entry: IntersectionObserverEntry) => {
      const containerRect = root.getBoundingClientRect();
      const rect = entry.target.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2 - containerRect.top;
      const offset = 48; // half of glow height (h-24)
      glowY.set(centerY - offset);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        let best: IntersectionObserverEntry | null = null;
        let bestRatio = 0;
        for (const e of entries) {
          if (e.intersectionRatio >= bestRatio) {
            bestRatio = e.intersectionRatio;
            best = e;
          }
        }
        if (best) updateForEntry(best);
      },
      { root: null, threshold: [0.15, 0.35, 0.55, 0.75] }
    );
    items.forEach((el) => observer.observe(el));

    const onResize = () => {
      // Recompute position based on the most visible item
      let bestElLocal: HTMLLIElement | null = null;
      let bestVisible = 0;
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const visible = Math.max(
          0,
          Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
        );
        if (visible >= bestVisible) {
          bestVisible = visible;
          bestElLocal = el;
        }
      });
      if (bestElLocal && root) {
        const containerRect = root.getBoundingClientRect();
        const r = (
          bestElLocal as HTMLLIElement
        ).getBoundingClientRect();
        const centerY = r.top + r.height / 2 - containerRect.top;
        const offset = 48;
        glowY.set(centerY - offset);
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [glowY]);

  return (
    <section className="relative w-full ">
      <AmbientBackground />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800/80 px-3 py-1 tracking-wide">
            Work Experience
          </div>
          <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-100">
            Crafting Impactful Solutions
          </h2>
          <p className="max-w-[680px] text-gray-300/80 md:text-lg">
            A timeline of the products, platforms, and teams where I
            built, scaled, and shipped.
          </p>
        </div>

        <div ref={containerRef} className="relative mt-12">
          <motion.div
            aria-hidden
            style={{ scaleY: prefersReducedMotion ? 1 : lineScaleY }}
            className="origin-top pointer-events-none absolute left-6 lg:left-1/2 top-0 h-full w-[2px] lg:-translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(59,130,246,0.7),rgba(168,85,247,0.5),rgba(34,211,238,0.3),transparent)] shadow-[0_0_14px_rgba(59,130,246,0.25)]"
          />

          {/* Moving glow follows active card */}
          <motion.div
            aria-hidden
            style={{ y: glowY }}
            className="pointer-events-none absolute top-0 left-6 lg:left-1/2 lg:-translate-x-1/2 h-24 w-3 rounded-full opacity-60 blur-md bg-[radial-gradient(closest-side,rgba(59,130,246,0.75),rgba(168,85,247,0.4),rgba(34,211,238,0.05))] shadow-[0_0_24px_8px_rgba(59,130,246,0.25)]"
          />

          <ul className="relative mx-auto max-w-[1100px] space-y-16 md:space-y-24 pl-12 lg:pl-0">
            {EXPERIENCES.map((item, index) => {
              const isRight = index % 2 === 1;
              return (
                <li
                  key={`${item.title}-${item.period}`}
                  className="relative"
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                >
                  <div className="absolute left-6 lg:left-1/2 top-4 -translate-x-1/2 lg:-translate-x-1/2">
                    <TimelineDot />
                  </div>

                  <div
                    className={`relative ${
                      isRight ? 'lg:ml-[54%]' : 'lg:mr-[54%]'
                    } lg:pl-0`}
                  >
                    <ParallaxHalo
                      progress={scrollYProgress}
                      index={index}
                    />

                    <div
                      className={`pointer-events-none absolute -top-6 ${
                        isRight ? '-right-8' : '-left-8'
                      } hidden lg:block`}
                    >
                      <TimelineAccentCanvas
                        hue={isRight ? 250 : 195}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>

                    {/* Connector arm from spine to card (only on large screens) */}
                    <span
                      aria-hidden
                      className={`absolute top-4 hidden h-[2px] w-14 lg:block ${
                        isRight
                          ? 'left-[-56px] bg-[linear-gradient(to_right,rgba(34,211,238,0)_0%,rgba(34,211,238,0.6)_40%,rgba(168,85,247,0.6)_100%)]'
                          : 'right-[-56px] bg-[linear-gradient(to_left,rgba(34,211,238,0)_0%,rgba(34,211,238,0.6)_40%,rgba(168,85,247,0.6)_100%)]'
                      } shadow-[0_0_10px_rgba(34,211,238,0.25)]`}
                    />

                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, y: 24 }
                      }
                      whileInView={
                        prefersReducedMotion
                          ? {}
                          : { opacity: 1, y: 0 }
                      }
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`group w-full rounded-xl border border-gray-800/60 bg-gray-950/70 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-700/60 md:w-[min(520px,40vw)] ${
                        isRight ? 'md:ml-[6%]' : 'md:mr-[6%]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <h3 className="font-oswald text-2xl bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                            {item.title}
                          </h3>
                          <p className="text-gray-400">
                            {item.company}
                          </p>
                        </div>
                        <span className="text-gray-400 whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-3 text-[0.98rem]/relaxed">
                        {item.bullets.map((b, i) => (
                          <li key={i} className="text-gray-300/90">
                            <Check
                              size={20}
                              className="mr-2 inline-block text-gray-400 align-top"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <Badge
                            key={t}
                            className="text-sm"
                            variant="secondary"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
