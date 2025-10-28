import { cacheLife, cacheTag } from "next/cache";

import type { Experience } from "./types";

const EXPERIENCES_DATA = [
  {
    title: "Independent Builder and AI Upskilling",
    company: "Professional Sabbatical",
    period: "2023 - Present",
    bullets: [
      "Built and shipped multiple production-grade React + TypeScript applications, using Next.js for server-rendered experiences and Vite for high-performance SPAs; structured my sabbatical to master modern, in-demand tools beyond my former team’s stack by delivering end-to-end projects with solid architecture, testing, and CI/CD. Projects included productivity tools, developer tooling, automation and orchestrators, data visualizations, PWAs, and API services.",
      "Focused on AI upskilling and workflow integration, practicing generative AI and context engineering; built model selection intuition to choose the right LLM for analysis, coding, and refactoring; and developed agents with tool access via the Model Context Protocol. I rotate coding tools like Cursor, Claude Code, Codex, and Warp, and I use ChatGPT, Gemini, Anthropic, and Perplexity to draft project specs, engineering plans, and UX/UI design plans. I also alternate between Google Chrome and Perplexity’s AI browser called Comet and am adopting Chrome’s integrated Gemini. I am excited about AI and use it to ship faster with higher quality and reliability, while rigorously reviewing AI-generated outputs to ensure I fully understand and own the code.",
      "Invited by Google to attend Google I/O 2025 and explored Gemini and AI integrations across the product suite; continued learning through online events including AI-Driven Development Day, O’Reilly’s AI Codecon: Coding for the Agentic World, and Coding with AI: The End of Software Development as We Know It, reinforcing a curiosity-driven approach to staying competitive and integrating AI into developer workflows.",
      "Collaborated with my sibling (also a software engineer) to compete in AI hackathons including OpenAI Open Model Hackathon, AWS AI Agent Global Hackathon, and Google Chrome Built-in AI Challenge 2025; demonstrated competitive drive and hands-on experimentation by applying newly learned AI tools, agent frameworks, and workflows in real-world challenges.",
    ],
    tags: [
      "React",
      "JavaScript",
      "TypeScript",
      "NextJS",
      "Tailwind CSS",
      "Vite",
      "NodeJS",
      "Hono",
      "Vercel Edge",
      "Cloudflare Workers",
      "PostgreSQL",
      "SQLite",
      "GitHub Actions",
      "Redis",
      "AI Agents",
      "Large Language Models",
      "Model Context Protocol",
      "Generative AI",
      "Context Engineering",
      "AI Coding Tools",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Yahoo Inc.",
    period: "2019 - 2023",
    bullets: [
      "Rebuilt the App Marketing business of the Yahoo Demand Side Platform as a core developer using Ember, Java and MySQL and generating over $140M in advertising spend since it launched while successfully overcoming challenges posed by Apple’s iOS 14.5 IDFA opt-out feature",
      "Optimized Yahoo DSP Email Audience Builder Upload feature by transforming its capacity from 2M to 25M records, a 1150% improvement, inspiring other UI performance initiatives, and preventing potential revenue impact, executed single-handedly",
      "Designed and built a wide range of Yahoo DSP features, from UI/UX improvements to revenue-generating initiatives, demonstrating software engineering skills through consistent use of reusable components, proper end-to-end testing, and gaining the trust of senior peers to build the foundational frameworks and complex Ember components",
      "Fostered a culture of collaboration and growth by mentoring junior engineers and new hires, creating a positive environment where they could feel comfortable discussing technical concepts, and asking questions",
      "Contributed to an Ember open source project (https://github.com/ember-learn/upgrade-guide) and was recognized in Ember Times - Issue No. 166, streamlining app upgrades with detailed insights on new features, deprecations, and breaking changes across Ember core, Ember Data, and Ember CLI from older versions to newer ones",
    ],
    tags: [
      "React",
      "Ember",
      "Express",
      "Node",
      "JS",
      "HTML",
      "CSS",
      "AWS",
      "Java",
      "MySQL",
      "AdTech",
    ],
  },
  {
    title: "Software Engineer",
    company: "Yahoo Inc.",
    period: "2016 - 2019",
    bullets: [
      "Built the Yahoo DSP Replay tool autonomously with React, enabling streamlined testing and validation of legitimate bid requests, significantly improving the productivity of the Product Support Team, and helping identify and debug issues quickly, a critical component of the DSP Serving’s Real Time Bidding System",
      "Contributed to front-end and back-end development of DMP (Data Management Platform), a key component of the Yahoo DSP utilizing Ember, Java, and MySQL, generating several millions of dollars in revenue",
      "Explored the adoption of Cypress.io to address the pain points of flaky end-to-end tests in Selenium, facilitated meetings to share insights on how to write simple reliable tests in JavaScript, resulting in increased team interest and engagement, with multiple team members integrating Cypress.io into our build pipeline successfully",
      "Contributed to upgrading Yahoo DSP’s Ember framework, enhancing performance, security, and developer experience, unlocking new capabilities and ecosystem of add-ons, ensuring compatibility with future updates, and resulting in a better product and increased customer satisfaction, as a key maintenance contributor",
    ],
    tags: ["React", "Ember", "Express", "Node", "JS", "HTML", "CSS", "Java", "MySQL", "AdTech"],
  },
  {
    title: "Senior Software Engineer",
    company: "Voyager Innovations Inc.",
    period: "2016",
    bullets: [
      "Demonstrated technical expertise and ability to thrive under pressure by leading my team to victory in several hackathons, including 1st Place finishes at Hack the Climate 2015 and HERE Hackathon Manila 2014, as well as a Semi-finalist ranking in the Google Cloud Developer Challenge 2013",
      'Authored an editorial titled "All I really need to know, I learned from Pinoy Hackathons," featured on GMA News Online, a highly regarded platform among the top news websites in the Philippines.',
      "Developed and delivered the back-end of Lendr, the Philippines’ first fully digital, end-to-end consumer loan platform, using Node and Express, collaborating with the team to ensure seamless project execution and timely delivery",
      "Implemented a scalable back-end system for a digital-media mobile application, Eat Bulaga! Mobile, leading a team of 3 junior engineers and utilizing Sails.js, MongoDB, and Redis to handle multiple thousands of concurrent requests from 700K+ active users",
      "Pioneered a culture of active participation in programming competitions and hackathons among Voyager engineers, resulting in increased creativity, knowledge and awareness of new tools and technologies",
    ],
    tags: ["AWS", "Express", "Node", "SailsJS", "Redis", "MongoDB", "FinTech"],
  },
  {
    title: "Co-Founder",
    company: "Saffron Technologies Inc.",
    period: "2015 - 2016",
    bullets: [
      "Represented the company and pitched at local and international events, including the RISE Conference 2015 in Hong Kong and National Science and Technology Week 2015 in the Philippines, resulting in potential business partnerships and increased brand awareness.",
      "Achieved recognition in the Philippine tech industry, having been featured in a number of top tech blogs and news websites such as Deal Street Asia, Enterprise Innovation, KabayanTech, The Philippine Star and BusinessMirror for winning the IdeaSpace 2015 Startup Competition, which resulted in increased media coverage and brand visibility.",
      "Supported our CEO for the research, design and implementation of Bluetooth Low Energy technology in a wearable device (Croo), resulting in significant cost savings and improved product reliability.",
      "Collaborated with our COO and CTO in architecting and implementing a scalable and reliable AWS infrastructure to support the Croo Android application that complements our IoT Croo wearable, delivering a seamless user experience.",
      "Created and configured automated deployment processes using Puppet, resulting in streamlined and efficient updates and reduced deployment errors.",
    ],
    tags: ["AWS", "Express", "Node", "Internet of Things"],
  },
  {
    title: "Software Engineering Analyst",
    company: "Voyager Innovations Inc.",
    period: "2013 - 2015",
    bullets: [
      "Developed the redesign of the existing stand-alone application, SmartNet, by participating in planning and initiation stages, implementing object-oriented design and JavaScript best practices, taking ownership of specific tasks, and delivering work with tight deadlines using Node, Sails.js, HTML, CSS, MongoDB, and Redis",
      "Refactored and optimized the codebase of Pinoy Hoops, a digital sports platform, using Express, jQuery, CSS, Pug, MongoDB and Redis",
    ],
    tags: ["Express", "Node", "SailsJS", "Redis", "MongoDB", "JS", "HTML", "CSS", "jQuery"],
  },
  {
    title: "Intern",
    company: "University of the Philippines Diliman CRS",
    period: "2012",
    bullets: [
      "Collaborated with a team of interns to design and implement a new module that streamlined the registration process for thousands of students, leveraging PostgreSQL, PHP, CSS, JavaScript, and HTML, and optimized the database schema for improved data retrieval",
      "Applied theoretical knowledge to practice, demonstrating problem-solving and critical thinking skills in a real-world setting, and producing high-quality and maintainable code using CodeIgniter, contributing to the University's modern and efficient registration system",
    ],
    tags: ["PostgreSQL", "PHP", "JS", "HTML", "CSS"],
  },
  {
    title: "Helpdesk Trainee",
    company: "University of the Philippines Diliman Network",
    period: "2011 - 2012",
    bullets: [
      "Provided timely technical support to students, faculty, and staff of the University of the Philippines troubleshooting and resolving network-related issues to ensure uninterrupted access to essential resources in the Diliman campus",
      "Gained valuable experience working with Linux systems and developed a deep appreciation for open source projects",
      "Collaborated effectively with a team of full-time Computer Center employees to maintain a high standard of service, earning recognition from supervisors and clients for exceptional customer service skills",
    ],
    tags: ["Linux"],
  },
] satisfies Experience[];

export const EXPERIENCES: readonly Experience[] = EXPERIENCES_DATA;

export async function getExperiences(): Promise<readonly Experience[]> {
  "use cache";
  cacheTag("experiences");
  cacheLife("hours");
  return EXPERIENCES_DATA;
}

export function findExperience(title: string): Experience | undefined {
  return EXPERIENCES_DATA.find((experience) => experience.title === title);
}
