'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ExternalLink, 
  Github, 
  Calendar,
  Code,
  Sparkles,
  ArrowUpRight,
  Star
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Yahoo DSP',
    category: 'AdTech Platform',
    description: 'A cutting-edge programmatic advertising platform empowering advertisers with real-time bidding, audience targeting, and comprehensive campaign performance measurement.',
    image: '/images/projects/yahoo-dsp-preview.jpg',
    technologies: ['Ember.js', 'React', 'Node.js', 'Java', 'MySQL'],
    features: [
      'Real-time bidding system',
      'Advanced audience targeting',
      'Performance analytics dashboard',
      'Campaign optimization tools'
    ],
    github: null,
    demo: 'https://www.advertising.yahooinc.com/our-dsp',
    year: '2019-2023',
    status: 'Production',
    featured: true,
  },
  {
    id: 2,
    title: 'Barbenheimer VS Code Theme',
    category: 'Developer Tool',
    description: 'A VS Code theme inspired by the Internet phenomenon, combining the pink aesthetics of Barbie with the dark tones of Oppenheimer for a unique coding experience.',
    image: '/images/projects/barbenheimer-preview.jpg',
    technologies: ['JSON', 'VS Code API', 'Color Theory'],
    features: [
      'Dual-theme approach',
      'Optimized syntax highlighting',
      'Eye-friendly color palette',
      'Community-driven'
    ],
    github: 'https://github.com/jpsanantonio/barbenheimer-vscode-theme',
    demo: 'https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer',
    year: '2023',
    status: 'Open Source',
    featured: true,
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    category: 'Full-Stack Application',
    description: 'A modern, scalable e-commerce solution with real-time inventory management, secure payments, and an intuitive admin dashboard.',
    image: '/images/projects/ecommerce-preview.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma'],
    features: [
      'Real-time inventory tracking',
      'Secure payment processing',
      'Admin dashboard',
      'Mobile-responsive design'
    ],
    github: 'https://github.com/jayvicsanantonio/ecommerce-platform',
    demo: 'https://ecommerce-demo.jayvicsanantonio.dev',
    year: '2023',
    status: 'In Development',
    featured: false,
  },
  {
    id: 4,
    title: 'Task Management App',
    category: 'Productivity Tool',
    description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.',
    image: '/images/projects/task-manager-preview.jpg',
    technologies: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
    features: [
      'Real-time collaboration',
      'Project tracking',
      'Team management',
      'Progress analytics'
    ],
    github: 'https://github.com/jayvicsanantonio/task-manager',
    demo: 'https://tasks.jayvicsanantonio.dev',
    year: '2022',
    status: 'Completed',
    featured: false,
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    category: 'Data Visualization',
    description: 'An interactive weather dashboard with real-time data, forecasting, and beautiful visualizations using modern web technologies.',
    image: '/images/projects/weather-preview.jpg',
    technologies: ['Vue.js', 'D3.js', 'Weather API', 'Chart.js'],
    features: [
      'Real-time weather data',
      'Interactive charts',
      'Location-based forecasting',
      'Responsive design'
    ],
    github: 'https://github.com/jayvicsanantonio/weather-dashboard',
    demo: 'https://weather.jayvicsanantonio.dev',
    year: '2022',
    status: 'Completed',
    featured: false,
  },
  {
    id: 6,
    title: 'Portfolio Website',
    category: 'Personal Project',
    description: 'A sophisticated personal portfolio showcasing work, skills, and experience with elegant design and smooth animations.',
    image: '/images/projects/portfolio-preview.jpg',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    features: [
      'Responsive design',
      'Smooth animations',
      'Dark/light mode',
      'Performance optimized'
    ],
    github: 'https://github.com/jayvicsanantonio/portfolio',
    demo: 'https://jayvicsanantonio.dev',
    year: '2024',
    status: 'Live',
    featured: false,
  },
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

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

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
              <Code className="w-4 h-4" />
              Portfolio
            </div>
            <h1 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-pearl mb-6">
              Featured
              <span className="block text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-silver/80 max-w-3xl mx-auto leading-relaxed">
              A curated collection of projects that showcase my technical expertise, 
              creative problem-solving, and passion for building exceptional digital experiences.
            </p>
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="font-editorial text-2xl font-medium text-pearl mb-12 flex items-center gap-3">
              <Star className="w-6 h-6 text-amber" />
              Featured Work
            </h2>
            
            <div className="space-y-16">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Project Image */}
                  <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-charcoal border border-pewter/20 aspect-[4/3]">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-rose/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-4 bg-slate/80 rounded-lg flex items-center justify-center">
                        <span className="text-silver/60 font-mono text-sm">
                          {project.title} Preview
                        </span>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-obsidian/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-charcoal/80 backdrop-blur-sm border border-pewter/20 rounded-xl text-silver hover:text-pearl transition-colors duration-300"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-charcoal/80 backdrop-blur-sm border border-pewter/20 rounded-xl text-silver hover:text-pearl transition-colors duration-300"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    <div className="absolute -top-4 -right-4 px-3 py-1 bg-amber text-obsidian text-sm font-medium rounded-full">
                      {project.status}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-amber font-medium">{project.category}</span>
                        <div className="flex items-center gap-2 text-silver/70">
                          <Calendar className="w-4 h-4" />
                          <span>{project.year}</span>
                        </div>
                      </div>
                      <h3 className="font-editorial text-3xl lg:text-4xl font-medium text-pearl">
                        {project.title}
                      </h3>
                      <p className="text-lg text-silver/80 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className="font-medium text-pearl mb-3 text-sm uppercase tracking-wide">
                        Key Features
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-2 text-silver/80 text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-amber rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-medium text-pearl mb-3 text-sm uppercase tracking-wide">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-pewter/20 text-silver rounded-full border border-pewter/30 hover:border-amber/30 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-4 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary group inline-flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      )}
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary group inline-flex items-center gap-2"
                      >
                        Live Demo
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Projects */}
          <motion.div variants={itemVariants}>
            <h2 className="font-editorial text-2xl font-medium text-pearl mb-12 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber" />
              More Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="card group"
                >
                  {/* Project image placeholder */}
                  <div className="relative overflow-hidden rounded-lg bg-charcoal/50 aspect-[4/3] mb-6">
                    <div className="absolute inset-4 bg-slate/60 rounded flex items-center justify-center">
                      <span className="text-silver/50 text-xs font-mono">
                        {project.title}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 bg-obsidian/80 backdrop-blur-sm text-amber text-xs font-medium rounded">
                      {project.status}
                    </div>
                  </div>

                  {/* Project details */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-amber text-sm font-medium">{project.category}</span>
                        <span className="text-silver/60 text-sm">{project.year}</span>
                      </div>
                      <h3 className="font-editorial text-xl font-medium text-pearl mb-2">
                        {project.title}
                      </h3>
                      <p className="text-silver/80 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-pewter/20 text-silver/70 rounded border border-pewter/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-silver/60">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-silver hover:text-pearl transition-colors duration-300"
                          title="View Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-silver hover:text-amber transition-colors duration-300"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-20">
            <div className="card max-w-2xl mx-auto text-center">
              <h3 className="font-editorial text-2xl font-medium text-pearl mb-4">
                Have a project in mind?
              </h3>
              <p className="text-silver/80 mb-6">
                Let's collaborate and bring your ideas to life with cutting-edge technology and thoughtful design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:hi@jayvicsanantonio.dev"
                  className="btn-primary group inline-flex items-center gap-2"
                >
                  Start a Project
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a 
                  href="/work"
                  className="btn-secondary group inline-flex items-center gap-2"
                >
                  View Experience
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
