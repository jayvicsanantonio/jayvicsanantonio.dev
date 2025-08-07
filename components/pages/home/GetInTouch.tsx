import ContactMeForm from '@/components/pages/home/ContactMeForm';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GetInTouch({
  getInTouchRef,
}: {
  getInTouchRef: React.RefObject<HTMLElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: getInTouchRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  );

  return (
    <motion.section
      ref={getInTouchRef}
      id="get-in-touch"
      className="relative scroll-mt-52 space-y-12 text-gray-950 dark:text-gray-200"
      style={{ scale }}
    >
      <div className="space-y-4">
        <h2 className="font-oswald text-2xl font-bold tracking-tight">
          Get in Touch
        </h2>
        <p className="dark:text-gray-400">
          I'm always excited to discuss new projects and
          opportunities. Feel free to reach out to me.
        </p>
      </div>
      <ContactMeForm />
    </motion.section>
  );
}
