import ContactMeForm from "@/components/pages/home/ContactMeForm";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GetInTouch({
  getInTouchRef,
}: {
  getInTouchRef: React.RefObject<HTMLElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: getInTouchRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.section
      ref={getInTouchRef}
      id="get-in-touch"
      className="relative scroll-mt-52 h-screen mt-24 space-y-12"
      style={{ opacity, scale }}
    >
      <div className="space-y-4">
        <h2 className="font-oswald text-2xl font-bold">Get in Touch</h2>
        <p className="text-gray-400">
          I'm always excited to discuss new projects and opportunities. Feel
          free to reach out to me.
        </p>
      </div>
      <ContactMeForm />
    </motion.section>
  );
}
