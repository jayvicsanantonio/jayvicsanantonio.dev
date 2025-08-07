'use client';

import FocusLock from 'react-focus-lock';
import useEscapeKey from '@/hooks/use-escape-key';
import { RemoveScroll } from 'react-remove-scroll';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
const MainMenu = dynamic(
  () => import('@/components/pages/MainMenu'),
  {
    ssr: false,
  }
);
import { motion } from 'framer-motion';

export default function Drawer({
  closeDrawer,
}: {
  closeDrawer: () => void;
}) {
  useEscapeKey(closeDrawer);

  return (
    <FocusLock className="z-40" returnFocus={true}>
      <RemoveScroll>
        {/* Fullscreen glassy gradient veil */}
        <motion.div
          className="fixed inset-0 bg-[radial-gradient(80%_100%_at_50%_0%,rgba(59,130,246,0.25),transparent_70%),radial-gradient(80%_100%_at_50%_100%,rgba(168,85,247,0.25),transparent_70%)] backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Content layer */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-6"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_80px_rgba(99,102,241,0.35)] p-8">
            {/* Close */}
            <div className="absolute top-3 right-3">
              <Button
                className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
                size="icon"
                variant="ghost"
                onClick={closeDrawer}
                aria-label="Close navigation menu"
              >
                <X aria-hidden={true} size={16} />
              </Button>
            </div>

            {/* Staggered menu */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 1 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.06,
                  },
                },
              }}
            >
              <MainMenu closeDrawer={closeDrawer} />
            </motion.div>

            {/* Hint area reserved for future contextual copy */}
          </div>
        </motion.div>
      </RemoveScroll>
    </FocusLock>
  );
}
