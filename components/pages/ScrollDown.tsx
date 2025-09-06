import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MouseEventHandler, TouchEventHandler } from 'react';

import useBoop from '@/hooks/useBoop';
import useWindowSize from '@/hooks/useWindowSize';

export default function ScrollDown({
  sectionRef,
  bottom = 52,
}: {
  sectionRef: React.RefObject<HTMLElement>;
  bottom?: number;
}) {
  const { width } = useWindowSize();
  const [controls, trigger] = useBoop({
    y: 10,
    timing: 200,
  });

  const scrollToNextSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (width < 768) {
    return null;
  }

  return (
    <div
      className="absolute bottom-40 left-1/2 -translate-x-1/2"
      style={{ bottom: `${bottom / 4}rem` }}
    >
      <motion.button
        className="focus:ring-opacity-50 cursor-pointer rounded-full p-2 focus:ring-2 focus:ring-blue-400 focus:outline-hidden"
        onClick={scrollToNextSection}
        onMouseEnter={trigger as MouseEventHandler<HTMLButtonElement>}
        onTouchStart={trigger as TouchEventHandler<HTMLButtonElement>}
        aria-label="Scroll to About section"
        animate={controls}
      >
        <ChevronDown size={40} />
      </motion.button>
    </div>
  );
}
