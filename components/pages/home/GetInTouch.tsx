'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MessageCircle, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import ContactMeForm from '@/components/pages/home/ContactMeForm';
import SocialMediaIconButton from '@/components/pages/home/SocialMediaIconButton';
import { Github, Linkedin } from 'lucide-react';
import Bluesky from '@/components/icons/Bluesky';

const contactOptions = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Send me a direct message',
    action: 'hi@jayvicsanantonio.dev',
    href: 'mailto:hi@jayvicsanantonio.dev',
    primary: true,
  },
  {
    icon: Calendar,
    title: 'Schedule a Call',
    description: 'Book a 30-minute chat',
    action: 'Schedule Meeting',
    href: 'https://calendly.com/jayvicsanantonio',
    primary: false,
  },
  {
    icon: MessageCircle,
    title: 'Quick Message',
    description: 'Use the form below',
    action: 'Scroll Down',
    href: '#contact-form',
    primary: false,
  },
];

export default function GetInTouch({
  getInTouchRef,
}: {
  getInTouchRef: React.RefObject<HTMLElement>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: getInTouchRef,
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
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose/5 rounded-full blur-2xl" />
      </div>
      
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
            Get In Touch
          </div>
          <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-pearl mb-6">
            Let's Create
            <span className="block text-gradient">Something Great</span>
          </h2>
          <p className="text-xl text-silver/80 max-w-3xl mx-auto leading-relaxed">
            I'm always excited to collaborate on meaningful projects. 
            Whether you have a clear vision or just an idea, let's explore 
            how we can bring it to life together.
          </p>
        </motion.div>

        {/* Contact Options */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mb-20">
          {contactOptions.map((option, index) => (
            <motion.a
              key={option.title}
              href={option.href}
              variants={itemVariants}
              className={`card group text-center ${
                option.primary ? 'border-amber/30 bg-amber/5' : ''
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                option.primary 
                  ? 'bg-gradient-to-br from-amber to-copper text-obsidian' 
                  : 'bg-pewter/20 text-amber'
              }`}>
                <option.icon className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-pearl text-lg mb-2">
                {option.title}
              </h3>
              <p className="text-silver/70 text-sm mb-4">
                {option.description}
              </p>
              <div className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                option.primary 
                  ? 'text-amber group-hover:text-copper' 
                  : 'text-silver group-hover:text-pearl'
              }`}>
                {option.action}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants} id="contact-form" className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="font-editorial text-3xl font-medium text-pearl mb-4">
                Send a Message
              </h3>
              <p className="text-silver/70">
                Fill out the form below and I'll get back to you within 24 hours.
              </p>
            </div>
            <ContactMeForm />
          </div>
        </motion.div>

        {/* Social Links & Alternative Contact */}
        <motion.div variants={itemVariants} className="text-center border-t border-pewter/20 pt-16">
          <h4 className="font-medium text-pearl text-lg mb-6">
            Or connect with me on social media
          </h4>
          
          <div className="flex justify-center gap-6 mb-8">
            <SocialMediaIconButton
              Icon={Github}
              link="https://github.com/jayvicsanantonio"
              className="hover-lift"
            >
              Github
            </SocialMediaIconButton>
            <SocialMediaIconButton
              Icon={Linkedin}
              link="https://www.linkedin.com/in/jayvicsanantonio/"
              className="hover-lift"
            >
              LinkedIn
            </SocialMediaIconButton>
            <SocialMediaIconButton
              Icon={Bluesky}
              link="https://bsky.app/profile/jayvicsanantonio.dev"
              className="hover-lift"
            >
              Bluesky
            </SocialMediaIconButton>
          </div>

          <p className="text-silver/60 text-sm">
            Based in San Francisco Bay Area • Available for remote work worldwide
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
