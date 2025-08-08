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
        {/* Fullscreen matte backdrop (no blur, opaque) */}
        <motion.div
          className="fixed inset-0 bg-[#0b0c12]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.92 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
          role="button"
          aria-label="Close navigation"
        />

        {/* Close control positioned just outside the card corner */}

        {/* Content layer */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div
            className="relative w-full max-w-3xl mx-4 sm:mx-6 rounded-xl sm:rounded-2xl border border-white/5 bg-[#101118] p-5 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(99,102,241,0.25)] max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Outside-close control anchored to the card corner (desktop only) */}
            <div className="absolute -top-9 -right-9 hidden sm:block">
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close navigation menu"
                className="group h-10 w-10 inline-flex items-center justify-center rounded-full border border-white/25 bg-[#0b0c12] text-white/80 hover:text-white hover:border-white/40 transition-colors shadow-none hover:shadow-[0_0_0_1px_rgba(168,85,247,0.35),0_0_24px_rgba(99,102,241,0.35)]"
              >
                <X
                  aria-hidden={true}
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Inline close for mobile */}
            <div className="flex items-center justify-end mb-3 sm:hidden">
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close navigation menu"
                className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40"
              >
                <X aria-hidden={true} size={16} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            {/* Vertical, perfectly aligned stack with mobile overflow */}
            <div className="overflow-y-auto max-h-[calc(80vh-2.5rem)]">
              <motion.div
                className="flex flex-col gap-3"
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
            </div>

            {/* Hint area reserved for future contextual copy */}
          </div>
        </motion.div>
      </RemoveScroll>
    </FocusLock>
  );
}
