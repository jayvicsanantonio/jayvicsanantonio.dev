'use client';

import { motion, useTransform } from 'framer-motion';
import { useNarrativeScroll } from './NarrativeScroll';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Remix', 'Node.js',
  'Express.js', 'Tailwind CSS', 'React Native', 'Expo', 'Ember.js', 'HTML',
  'CSS', 'SASS / SCSS', 'AWS', 'MongoDB', 'Redis', 'MySQL', 'PostgreSQL',
  'Java', 'Cypress', 'Git', 'Linux', 'Figma'
];

const expertise = [
  'Frontend Development', 'Web Performance Optimization', 'Agile and Scrum Methodologies',
  'Cross-functional Collaboration', 'Problem-solving and Debugging', 'Responsive Design',
  'Adaptability and Learning', 'Mentoring and Knowledge Sharing', 'Documentation Proficiency',
  'Technical Leadership', 'Software Engineering Best Practices', 'Startup Development'
];

export default function SkillsScene() {
  const { scrollYProgress } = useNarrativeScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const sceneStart = 0.7;
  const sceneEnd = 0.9;

  const opacity = useTransform(scrollYProgress, [sceneStart - 0.05, sceneStart, sceneEnd, sceneEnd + 0.05], [0, 1, 1, 0]);

  if (prefersReducedMotion) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-accent mb-8">Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <div key={skill} className="px-3 py-1 text-sm border border-border rounded-full text-muted-foreground">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-accent mb-8">Expertise</h3>
            <ul className="space-y-2">
              {expertise.map((item) => (
                <li key={item} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div style={{ opacity }} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center px-4">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-accent mb-8">Skills</h3>
            <motion.div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => {
                const skillStart = sceneStart + (i * 0.005);
                const skillOpacity = useTransform(scrollYProgress, [skillStart, skillStart + 0.005], [0, 1]);
                const skillY = useTransform(scrollYProgress, [skillStart, skillStart + 0.005], ['10px', '0px']);
                return (
                  <motion.div
                    key={skill}
                    style={{ opacity: skillOpacity, y: skillY }}
                    className="px-3 py-1 text-sm border border-border rounded-full text-muted-foreground"
                  >
                    {skill}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-accent mb-8">Expertise</h3>
            <motion.ul className="space-y-2">
              {expertise.map((item, i) => {
                const itemStart = sceneStart + 0.1 + (i * 0.005);
                const itemOpacity = useTransform(scrollYProgress, [itemStart, itemStart + 0.005], [0, 1]);
                const itemX = useTransform(scrollYProgress, [itemStart, itemStart + 0.005], ['-10px', '0px']);
                return (
                  <motion.li key={item} style={{ opacity: itemOpacity, x: itemX }} className="text-muted-foreground">
                    {item}
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
