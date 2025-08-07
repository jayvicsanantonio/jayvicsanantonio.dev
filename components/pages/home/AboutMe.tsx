'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Code2, Lightbulb, Users, Coffee } from 'lucide-react';

const skills = [
  {
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    icon: Code2,
  },
  {
    category: 'Backend', 
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    icon: Lightbulb,
  },
  {
    category: 'Tools & Others',
    technologies: ['Git', 'Docker', 'AWS', 'Figma', 'Vercel'],
    icon: Users,
  },
];

const achievements = [
  {
    number: '9+',
    label: 'Years of Experience',
    description: 'Crafting digital experiences'
  },
  {
    number: '50+',
    label: 'Projects Delivered',
    description: 'From concept to production'
  },
  {
    number: '100%',
    label: 'Client Satisfaction',
    description: 'Building lasting relationships'
  },
];

export default function AboutMe({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <motion.div
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container-narrow relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/10 border border-amber/20 rounded-full text-amber text-sm font-medium mb-6">
            <Coffee className="w-4 h-4" />
            About Me
          </div>
          <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-pearl mb-6">
            Crafting Digital
            <span className="block text-gradient">Experiences</span>
          </h2>
          <p className="text-xl text-silver/80 max-w-3xl mx-auto leading-relaxed">
            I'm Jayvic San Antonio, a Full-Stack Developer who believes that great technology 
            should feel effortless and inspire genuine delight.
          </p>
        </motion.div>

        {/* Story Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
          {/* Personal Story */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-amber to-rose rounded-full" />
              <div className="space-y-6 text-lg leading-relaxed text-silver/90">
                <p>
                  Originally from the Philippines, now creating in the San Francisco Bay Area. 
                  With over{' '}
                  <span className="text-amber font-medium">9 years of experience</span>, 
                  I've discovered that the most beautiful code is the kind that solves real problems 
                  with elegance and intention.
                </p>
                <p>
                  From late-night hackathons to co-founding a startup, from intimate team collaborations 
                  to scaling solutions at global companies — each experience has taught me that 
                  technology's true power lies in its ability to{' '}
                  <span className="text-rose font-medium">connect and elevate</span> human experiences.
                </p>
                <p>
                  I approach every project with curiosity, craftsmanship, and a deep respect for 
                  the end user. Whether architecting scalable backends or crafting pixel-perfect 
                  interfaces, I believe in building things that{' '}
                  <span className="text-pearl font-medium">last and inspire</span>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills & Expertise */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="font-editorial text-2xl font-medium text-pearl mb-8">
              Technical Expertise
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  variants={itemVariants}
                  className="card-minimal group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber/10 rounded-lg flex-shrink-0">
                      <skill.icon className="w-5 h-5 text-amber" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-pearl mb-2">
                        {skill.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-pewter/20 text-silver rounded-full border border-pewter/30 group-hover:border-amber/30 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-editorial font-light text-gradient mb-2">
                    {achievement.number}
                  </div>
                  <h4 className="font-medium text-pearl text-lg mb-1">
                    {achievement.label}
                  </h4>
                  <p className="text-silver/70 text-sm">
                    {achievement.description}
                  </p>
                  
                  {/* Decorative line */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-lg text-silver/80 mb-8">
            Ready to bring your vision to life with thoughtful, impactful technology?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/work"
              className="btn-primary group inline-flex items-center gap-2"
            >
              View My Work
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link 
              href="/projects"
              className="btn-secondary group inline-flex items-center gap-2"
            >
              Explore Projects
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
