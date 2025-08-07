'use client';

import { useCallback, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useNarrativeScroll } from './NarrativeScroll';
import { toast } from 'sonner';

export default function ContactScene() {
  const { scrollYProgress } = useNarrativeScroll();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define the scroll range for this scene's animations.
  const sceneStart = 0.9;
  const sceneEnd = 1.0;

  const opacity = useTransform(scrollYProgress, [sceneStart - 0.05, sceneStart], [0, 1]);
  const y = useTransform(scrollYProgress, [sceneStart - 0.05, sceneStart], ['50px', '0px']);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !message) {
      toast.error('Action Required', {
        description: 'Please fill in all fields.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await result.json();

      if (data.error) {
        throw new Error(data.error.message || 'An unknown error occurred.');
      }

      setName('');
      setEmail('');
      setMessage('');
      toast.success('Message Sent', {
        description: "Thank you for your message! I'll get back to you soon.",
      });
    } catch (error) {
      toast.error('Uh oh! Something went wrong.', {
        description: error instanceof Error ? error.message : 'There was a problem with your request.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, message]);

  return (
    <motion.div style={{ opacity, y }} className="h-screen relative flex flex-col items-center justify-center text-center">
      <h2 className="text-5xl md:text-7xl font-bold mb-4">
        Let's build <span className="text-accent">together.</span>
      </h2>
      <p className="text-muted-foreground mb-12 max-w-lg">
        Have a project in mind or just want to say hello? Drop me a line.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-lg grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.input
            whileFocus={{ boxShadow: '0 0 0 2px hsl(var(--accent))' }}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg p-3 w-full focus:outline-none transition-shadow"
          />
          <motion.input
            whileFocus={{ boxShadow: '0 0 0 2px hsl(var(--accent))' }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg p-3 w-full focus:outline-none transition-shadow"
          />
        </div>
        <motion.textarea
          whileFocus={{ boxShadow: '0 0 0 2px hsl(var(--accent))' }}
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-secondary/50 border border-border rounded-lg p-3 w-full h-32 resize-none focus:outline-none transition-shadow"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting}
          className="justify-self-center px-8 py-3 bg-accent text-accent-foreground rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>
    </motion.div>
  );
}
