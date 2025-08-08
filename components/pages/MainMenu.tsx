'use client';

import IconButton from '@/components/pages/IconButton';
import {
  House,
  LayoutPanelLeft,
  FlaskConical,
  FileUser,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MainMenu({
  closeDrawer,
}: {
  closeDrawer?: () => void;
}) {
  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -12, filter: 'blur(4px)' },
          show: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 420,
              damping: 28,
            },
          },
        }}
      >
        <IconButton
          IconName={House}
          link="/"
          callback={closeDrawer}
          subtitle="Start the journey"
        >
          Home
        </IconButton>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -12, filter: 'blur(4px)' },
          show: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 420,
              damping: 28,
            },
          },
        }}
      >
        <IconButton
          IconName={LayoutPanelLeft}
          link="/projects"
          callback={closeDrawer}
          subtitle="Selected builds & case studies"
        >
          Projects
        </IconButton>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -12, filter: 'blur(4px)' },
          show: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 420,
              damping: 28,
            },
          },
        }}
      >
        <IconButton
          IconName={FlaskConical}
          link="/lab"
          callback={closeDrawer}
          subtitle="Experiments & prototypes"
        >
          Lab
        </IconButton>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -12, filter: 'blur(4px)' },
          show: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 420,
              damping: 28,
            },
          },
        }}
      >
        <IconButton
          IconName={FileUser}
          link="/work"
          callback={closeDrawer}
          subtitle="Experience & highlights"
        >
          Work
        </IconButton>
      </motion.div>
    </>
  );
}
