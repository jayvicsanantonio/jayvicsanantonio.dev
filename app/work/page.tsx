'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Users, 
  Code, 
  Award,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const workExperience = [
  {
    id: 1,
    title: 'Software Dev Engineer II',
    company: 'Yahoo Inc.',
    location: 'San Francisco, CA',
    duration: '2019 - 2023',
    type: 'Full-time',
    description: 'Led development of critical advertising platform features, generating over $140M in revenue while mentoring junior engineers and contributing to open source.',
    achievements: [
      {
        icon: TrendingUp,
        title: 'Revenue Impact',
        description: 'Rebuilt App Marketing business generating over $140M in advertising spend',
        metric: '$140M+'
      },
      {
        icon: Code,
        title: 'Performance Optimization',
        description: 'Optimized Email Audience Builder from 2M to 25M records capacity',
        metric: '1150% improvement'
      },
      {
        icon: Users,
        title: 'Mentorship',
        description: 'Mentored junior engineers and new hires, fostering collaborative culture',
        metric: '10+ engineers'
      },
      {
        icon: Award,
        title: 'Open Source',
        description: 'Contributed to Ember upgrade guide, featured in Ember Times Issue #166',
        metric: 'Community impact'
      }
    ],
    technologies: ['React', 'Ember.js', 'Node.js', 'Java', 'MySQL', 'AWS'],
    highlights: [
      'Successfully navigated Apple\'s iOS 14.5 IDFA challenges',
      'Built foundational frameworks and complex Ember components',
      'Executed performance improvements single-handedly',
      'Gained trust of senior peers for critical architectural decisions'
    ]
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'TechStartup Inc.',
    location: 'San Francisco, CA',
    duration: '2017 - 2019',
    type: 'Full-time',
    description: 'Developed responsive web applications and contributed to product strategy in fast-paced startup environment.',
    achievements: [
      {
        icon: Code,
        title: 'Feature Development',
        description: 'Led frontend development for core product features',
        metric: '20+ features'
      },
      {
        icon: TrendingUp,
        title: 'Performance',
        description: 'Improved application load times through optimization',
        metric: '40% faster'
      }
    ],
    technologies: ['React', 'TypeScript', 'Redux', 'SASS', 'Jest'],
    highlights: [
      'Collaborated directly with designers and product managers',
      'Implemented responsive design patterns',
      'Established testing practices and code quality standards'
    ]
  },
  {
    id: 3,
    title: 'Junior Software Developer',
    company: 'Digital Agency Co.',
    location: 'San Francisco, CA',
    duration: '2015 - 2017',
    type: 'Full-time',
    description: 'Started career building client websites and learning modern development practices in agency environment.',
    achievements: [
      {
        icon: Users,
        title: 'Client Projects',
        description: 'Successfully delivered projects for various clients',
        metric: '30+ projects'
      },
      {
        icon: Code,
        title: 'Skill Development',
        description: 'Mastered modern JavaScript frameworks and tools',
        metric: 'Full-stack'
      }
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'WordPress', 'PHP'],
    highlights: [
      'Learned full software development lifecycle',
      'Worked with diverse client requirements',
      'Built foundation in web technologies'
    ]
  }
];

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

export default function WorkPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section
        ref={sectionRef}
        className="container-narrow"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/10 border border-amber/20 rounded-full text-amber text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              Professional Journey
            </div>
            <h1 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-pearl mb-6">
              Work
              <span className="block text-gradient">Experience</span>
            </h1>
            <p className="text-xl text-silver/80 max-w-3xl mx-auto leading-relaxed">
              A journey through impactful roles where I've helped build products 
              that scale, teams that thrive, and solutions that make a difference.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber via-amber/50 to-transparent" />

            <div className="space-y-16">
              {workExperience.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-amber to-copper rounded-full border-4 border-obsidian" />

                  {/* Content */}
                  <div className="ml-20">
                    <div className="card group">
                      {/* Job header */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div className="space-y-2">
                          <h2 className="font-editorial text-2xl lg:text-3xl font-medium text-pearl">
                            {job.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 text-silver/70">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{job.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-0">
                          <span className="px-3 py-1 bg-amber/10 border border-amber/20 rounded-full text-amber text-sm font-medium">
                            {job.type}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-silver/80 leading-relaxed mb-8">
                        {job.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <div
                            key={achievementIndex}
                            className="card-minimal group"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-amber/10 rounded-lg flex-shrink-0">
                                <achievement.icon className="w-5 h-5 text-amber" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-pearl mb-1">
                                  {achievement.title}
                                </h4>
                                <p className="text-silver/70 text-sm mb-2">
                                  {achievement.description}
                                </p>
                                <span className="text-xs text-amber font-mono">
                                  {achievement.metric}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="font-medium text-pearl mb-3 text-sm uppercase tracking-wide">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm bg-pewter/20 text-silver rounded-full border border-pewter/30 group-hover:border-amber/30 transition-colors duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div>
                        <h4 className="font-medium text-pearl mb-3 text-sm uppercase tracking-wide">
                          Key Highlights
                        </h4>
                        <ul className="space-y-2">
                          {job.highlights.map((highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className="flex items-start gap-3 text-silver/80 text-sm"
                            >
                              <ChevronRight className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-20">
            <div className="card max-w-2xl mx-auto text-center">
              <h3 className="font-editorial text-2xl font-medium text-pearl mb-4">
                Interested in working together?
              </h3>
              <p className="text-silver/80 mb-6">
                I'm always open to discussing new opportunities and exciting projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:hi@jayvicsanantonio.dev"
                  className="btn-primary group inline-flex items-center gap-2"
                >
                  Get In Touch
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a 
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary group inline-flex items-center gap-2"
                >
                  Download Resume
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
