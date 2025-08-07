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
          hidden: { opacity: 0, y: 8 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <IconButton IconName={House} link="/" callback={closeDrawer}>
          Home
        </IconButton>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <IconButton
          IconName={LayoutPanelLeft}
          link="/projects"
          callback={closeDrawer}
        >
          Projects
        </IconButton>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <IconButton
          IconName={FlaskConical}
          link="/lab"
          callback={closeDrawer}
        >
          Lab
        </IconButton>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <IconButton
          IconName={FileUser}
          link="/work"
          callback={closeDrawer}
        >
          Work
        </IconButton>
      </motion.div>
    </>
  );
}
