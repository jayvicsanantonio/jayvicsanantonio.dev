'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';

const featuredProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern, scalable e-commerce solution built with Next.js, featuring real-time inventory management, secure payments, and an intuitive admin dashboard.',
    image: '/images/projects/ecommerce-preview.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    github: 'https://github.com/jayvicsanantonio',
    demo: 'https://demo.example.com',
    featured: true,
  },
  {
    id: 2,
    title: 'AI-Powered Analytics Dashboard',
    description: 'An intelligent analytics platform that transforms complex data into actionable insights through machine learning algorithms and interactive visualizations.',
    image: '/images/projects/analytics-preview.jpg',
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js'],
    github: 'https://github.com/jayvicsanantonio',
    demo: 'https://demo.example.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Collaborative Design Tool',
    description: 'A real-time collaborative design platform enabling teams to create, share, and iterate on designs with seamless version control and commenting systems.',
    image: '/images/projects/design-tool-preview.jpg',
    technologies: ['Vue.js', 'WebRTC', 'Socket.io', 'Canvas API'],
    github: 'https://github.com/jayvicsanantonio',
    demo: 'https://demo.example.com',
    featured: true,
  },
];

export default function FeaturedProjects({
  featuredProjectsRef,
}: {
  featuredProjectsRef: React.RefObject<HTMLElement>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: featuredProjectsRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
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
      id="projects"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
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
            <Sparkles className="w-4 h-4" />
            Featured Work
          </div>
          <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-pearl mb-6">
            Selected
            <span className="block text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-silver/80 max-w-3xl mx-auto leading-relaxed">
            A curated collection of projects that showcase my approach to solving 
            complex challenges with elegant, scalable solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-24 mb-20">
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
                      Project Preview
                    </span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-obsidian/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-charcoal/80 backdrop-blur-sm border border-pewter/20 rounded-xl text-silver hover:text-pearl transition-colors duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
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
                
                {/* Project number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-amber to-copper rounded-full flex items-center justify-center text-obsidian font-bold text-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Project Details */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-4">
                  <h3 className="font-editorial text-3xl lg:text-4xl font-medium text-pearl">
                    {project.title}
                  </h3>
                  <p className="text-lg text-silver/80 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
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

                {/* Project Links */}
                <div className="flex gap-4 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary group inline-flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
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

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-lg text-silver/80 mb-8">
            Interested in seeing more of my work?
          </p>
          <Link 
            href="/projects"
            className="btn-secondary group inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            View All Projects
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
