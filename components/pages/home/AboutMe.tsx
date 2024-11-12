import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutMe({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.section
      ref={aboutRef}
      id="about-me"
      className="relative scroll-mt-52 min-h-screen grid lg:grid-cols-2 gap-4"
      style={{ opacity, scale }}
    >
      <div className="h-fit lg:text-lg text-gray-200 space-y-4 bg-gray-950 rounded-xl p-6 border-t-purple-500/80 border-r-purple-500/80 border-b-blue-400/80 border-l-blue-400/80 border-2 text-justify">
        <h2 className="font-oswald text-2xl font-bold">About Me</h2>
        <p className="hyphenate">
          I'm Jayvic San Antonio, a Full-Stack Web Developer originally from the
          Philippines, now thriving in the San Francisco Bay Area. With over 9
          years of experience, you could say JavaScript is my coding soulmate -
          I love its versatility and how it keeps getting better and better!
        </p>
        <p className="hyphenate">
          From hackathons and co-founding a startup to working at a global media
          and tech company, I've thrived in all kinds of environments. Whether
          I'm flying solo or part of an awesome team, I'm all about tackling
          challenging projects and delivering top-notch code (optimized,
          documented, and ready to roll!).
        </p>
        <p className="hyphenate">
          In this ever-evolving industry, staying sharp is key. That's why I'm
          constantly learning and pushing my skills to the next level.
        </p>
        <p className="hyphenate">
          <span className="font-oswald font-bold">What gets me excited?</span>{" "}
          The chance to create impactful solutions, make user experiences
          amazing, and drive innovation in a forward-thinking environment.
          Collaboration and inclusivity are super important to me, so working
          with a team that shares those values would be epic!
        </p>
        <p className="hyphenate">
          Excited to bring your vision to life? Let's collaborate and build
          something incredible together!{" "}
          <Link
            href="#get-in-touch"
            className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4"
          >
            Let's chat!
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="lg:text-lg text-gray-200 space-y-4 bg-gray-950 rounded-xl p-6 border-t-purple-500/80 border-r-purple-500/80 border-b-blue-400/80 border-l-blue-400/80 border-2 h-fit">
          <h2 className="font-oswald text-2xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-3">
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
            <Badge
              aria-label="Linux"
              className="w-fit text-sm"
              variant="secondary"
            >
              Linux
            </Badge>
            <Badge
              aria-label="Figma"
              className="w-fit text-sm"
              variant="secondary"
            >
              Figma
            </Badge>
          </div>
        </div>
        <div className="lg:text-lg text-gray-200 space-y-4 bg-gray-950 rounded-xl p-6 border-t-purple-500/80 border-r-purple-500/80 border-b-blue-400/80 border-l-blue-400/80 border-2 h-fit">
          <h2 className="font-oswald text-2xl font-bold">Expertise</h2>
          <ul className="space-y-1 text-gray-300">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Frontend Development
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Web Performance Optimization
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Agile and Scrum Methodologies
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Cross-functional Collaboration
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Problem-solving and Debugging
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Responsive Design
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Adaptability and Learning
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Mentoring and Knowledge Sharing
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Documentation Proficiency
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Technical Leadership
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Software Engineering Best Practices
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Startup Development
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
