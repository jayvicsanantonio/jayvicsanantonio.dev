'use client';

import { Icon } from '@iconify/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { Badge } from '@/components/ui/Badge';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

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
    tags: ['React', 'Ember', 'Express', 'Node', 'JS', 'HTML', 'CSS', 'Java', 'MySQL', 'AdTech'],
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
    tags: ['AWS', 'Express', 'Node', 'SailsJS', 'Redis', 'MongoDB', 'FinTech'],
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
    tags: ['Express', 'Node', 'SailsJS', 'Redis', 'MongoDB', 'JS', 'HTML', 'CSS', 'jQuery'],
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

export default function WorkTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.6'],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const reveal = prefersReducedMotion
    ? { initial: {}, whileInView: {}, viewport: {}, transition: {} }
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1] as any,
        },
      };

  return (
    <div ref={containerRef} className="relative mt-10 sm:mt-12 lg:mt-16">
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
                ease: 'easeOut',
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
        <ul className="relative space-y-12 pt-12 pl-0 sm:space-y-16 sm:pt-16 lg:space-y-28 lg:pt-24">
          {EXPERIENCES.map((item, index) => {
            const isRight = index % 2 === 0;
            return (
              <li key={`${item.title}-${item.period}`} className="relative">
                {/* Node on spine */}
                <div className="absolute top-6 hidden lg:left-1/2 lg:block lg:-translate-x-1/2">
                  <span className="relative z-10 block h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_3px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/60" />
                </div>

                <div
                  className={`relative ${
                    // On lg+, allocate viewport-side gutter so cards hug a 2vw gap from the 50vw spine
                    isRight ? 'lg:pl-[52vw]' : 'lg:pr-[52vw]'
                  }`}
                >
                  {/* Card */}
                  <motion.article
                    {...(reveal as any)}
                    className={`group relative w-full rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(168,85,247,0.22),rgba(34,211,238,0.2))] p-[1px] shadow-[0_8px_28px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-0.5 sm:p-[1.2px] lg:w-[min(500px,50vw)] ${
                      isRight ? 'lg:mr-auto' : 'lg:ml-auto'
                    } mx-auto lg:mx-0`}
                  >
                    {/* Subtle halo */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)] opacity-20 blur-xl"
                    />

                    {/* Inner frosted panel */}
                    <div className="relative rounded-2xl border border-white/5 bg-gray-950/70 p-5 backdrop-blur-md sm:p-6">
                      <div className="text-left">
                        <h3 className="font-oswald text-2xl text-white">{item.title}</h3>
                        <div className="mt-1 flex items-baseline justify-between gap-3">
                          <p className="text-sm tracking-[0.14em] text-gray-300/90 uppercase lg:text-base">
                            {item.company}
                          </p>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.12em] whitespace-nowrap text-gray-300 uppercase lg:text:[11px]">
                            {item.period}
                          </span>
                        </div>
                        <div className="mt-3 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
                      </div>

                      <ul className="mt-4 space-y-3 text-[0.95rem]/relaxed sm:text-[0.98rem]/relaxed">
                        {item.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2 break-words text-gray-300/90">
                                <Icon icon="mdi:check" width={18} height={18} className="mt-0.5 shrink-0 text-cyan-300/80" />
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

