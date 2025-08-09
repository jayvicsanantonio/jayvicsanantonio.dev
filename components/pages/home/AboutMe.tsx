import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useTransform } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

export default function AboutMe({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement>;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  );

  const driftX = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-8, 8]
  );
  const driftY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [6, -6]
  );

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.section
      ref={aboutRef}
      id="about-me"
      className="relative scroll-mt-32 min-h-screen grid lg:grid-cols-2 gap-4"
      style={{ opacity, scale }}
    >
      <div className="h-fit lg:text-lg space-y-4 text-gray-950 dark:text-gray-200 dark:bg-gray-950 rounded-xl p-6 border-2 border-transparent [border-image:linear-gradient(90deg,rgba(59,130,246,0.6),rgba(34,211,238,0.5),rgba(168,85,247,0.6))_1] text-justify content-visibility-auto">
        <h2 className="font-oswald text-2xl font-bold tracking-tight">
          About Me
        </h2>
        <p className="hyphenate">
          I'm Jayvic San Antonio, a Full-Stack Web Developer
          originally from the Philippines, now thriving in the San
          Francisco Bay Area. With over 9 years of experience, you
          could say JavaScript is my coding soulmate - I love its
          versatility and how it keeps getting better and better!
        </p>
        <p className="hyphenate">
          From hackathons and co-founding a startup to working at a
          global media and tech company, I've thrived in all kinds of
          environments. Whether I'm flying solo or part of an awesome
          team, I'm all about tackling challenging projects and
          delivering top-notch code (optimized, documented, and ready
          to roll!).
        </p>
        <p className="hyphenate">
          In this ever-evolving industry, staying sharp is key. That's
          why I'm constantly learning and pushing my skills to the
          next level.
        </p>
        <p className="hyphenate">
          <span className="font-oswald font-bold">
            What gets me excited?
          </span>{' '}
          The chance to create impactful solutions, make user
          experiences amazing, and drive innovation in a
          forward-thinking environment. Collaboration and inclusivity
          are super important to me, so working with a team that
          shares those values would be epic!
        </p>
        <p className="hyphenate">
          Excited to bring your vision to life? Let's collaborate and
          build something incredible together!{' '}
          <Link
            href="#get-in-touch"
            className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4"
          >
            Let's chat!
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-4 content-visibility-auto">
        <div className="lg:text-lg space-y-4 text-gray-950 dark:text-gray-200 dark:bg-gray-950 rounded-xl p-6 border-2 border-transparent [border-image:linear-gradient(90deg,rgba(59,130,246,0.6),rgba(34,211,238,0.5),rgba(168,85,247,0.6))_1] h-fit">
          <h2 className="font-oswald text-2xl font-bold tracking-tight">
            Skills
          </h2>
          <motion.div
            className="flex flex-wrap gap-3"
            style={{ x: driftX, y: driftY }}
          >
            <Badge
              aria-label="JavaScript"
              className="w-fit text-sm"
              variant="secondary"
            >
              JavaScript
            </Badge>
            <Badge
              aria-label="TypeScript"
              className="w-fit text-sm"
              variant="secondary"
            >
              TypeScript
            </Badge>
            <Badge
              aria-label="React"
              className="w-fit text-sm"
              variant="secondary"
            >
              React
            </Badge>
            <Badge
              aria-label="Next.js"
              className="w-fit text-sm"
              variant="secondary"
            >
              Next.js
            </Badge>
            <Badge
              aria-label="Remix"
              className="w-fit text-sm"
              variant="secondary"
            >
              Remix
            </Badge>
            <Badge
              aria-label="Node.js"
              className="w-fit text-sm"
              variant="secondary"
            >
              Node.js
            </Badge>
            <Badge
              aria-label="Express.js"
              className="w-fit text-sm"
              variant="secondary"
            >
              Express.js
            </Badge>
            <Badge
              aria-label="Tailwind CSS"
              className="w-fit text-sm"
              variant="secondary"
            >
              Tailwind CSS
            </Badge>
            <Badge
              aria-label="React Native"
              className="w-fit text-sm"
              variant="secondary"
            >
              React Native
            </Badge>
            <Badge
              aria-label="Expo"
              className="w-fit text-sm"
              variant="secondary"
            >
              Expo
            </Badge>
            <Badge
              aria-label="Ember"
              className="w-fit text-sm"
              variant="secondary"
            >
              Ember.js
            </Badge>
            <Badge
              aria-label="HTML"
              className="w-fit text-sm"
              variant="secondary"
            >
              HTML
            </Badge>
            <Badge
              aria-label="CSS"
              className="w-fit text-sm"
              variant="secondary"
            >
              CSS
            </Badge>
            <Badge
              aria-label="SASS / SCSS"
              className="w-fit text-sm"
              variant="secondary"
            >
              SASS / SCSS
            </Badge>
            <Badge
              aria-label="Amazon Web Services (AWS)"
              className="w-fit text-sm"
              variant="secondary"
            >
              AWS
            </Badge>
            <Badge
              aria-label="MongoDB"
              className="w-fit text-sm"
              variant="secondary"
            >
              MongoDB
            </Badge>
            <Badge
              aria-label="Redis"
              className="w-fit text-sm"
              variant="secondary"
            >
              Redis
            </Badge>
            <Badge
              aria-label="MySQL"
              className="w-fit text-sm"
              variant="secondary"
            >
              MySQL
            </Badge>
            <Badge
              aria-label="PostgreSQL"
              className="w-fit text-sm"
              variant="secondary"
            >
              PostgreSQL
            </Badge>
            <Badge
              aria-label="Java"
              className="w-fit text-sm"
              variant="secondary"
            >
              Java
            </Badge>
            <Badge
              aria-label="Cypress"
              className="w-fit text-sm"
              variant="secondary"
            >
              Cypress
            </Badge>
            <Badge
              aria-label="Git"
              className="w-fit text-sm"
              variant="secondary"
            >
              Git
            </Badge>
          </motion.div>
        </div>
        <div className="lg:text-lg space-y-4 text-gray-950 dark:text-gray-200 dark:bg-gray-950 rounded-xl p-6 border-2 border-transparent [border-image:linear-gradient(90deg,rgba(59,130,246,0.6),rgba(34,211,238,0.5),rgba(168,85,247,0.6))_1] h-fit">
          <h2 className="font-oswald text-2xl font-bold tracking-tight">
            Expertise
          </h2>
          <motion.ul
            className="space-y-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Frontend Development
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Web Performance Optimization
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Agile and Scrum Methodologies
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Cross-functional Collaboration
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Problem-solving and Debugging
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Responsive Design
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Adaptability and Learning
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Mentoring and Knowledge Sharing
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Documentation Proficiency
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Technical Leadership
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Software Engineering Best Practices
            </motion.li>
            <motion.li className="flex items-center" variants={item}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Startup Development
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </motion.section>
  );
}
