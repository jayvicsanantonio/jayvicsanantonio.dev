"use client";

import IconButton from "@/components/pages/IconButton";
import { motion } from "framer-motion";
import { FileUser, House, LayoutPanelLeft } from "lucide-react";

export default function MainMenu({
  closeDrawer,
}: {
  closeDrawer?: () => void;
}) {
  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -12, filter: "blur(4px)" },
          show: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 420,
              damping: 28,
            },
          },
        }}
      >
        <IconButton
          IconName={House}
          link="/"
          {...(closeDrawer ? { callback: closeDrawer } : {})}
          subtitle="Start the journey"
        >
          Home
        </IconButton>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -12, filter: "blur(4px)" },
          show: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 420,
              damping: 28,
            },
          },
        }}
      >
        <IconButton
          IconName={LayoutPanelLeft}
          link="/projects"
          {...(closeDrawer ? { callback: closeDrawer } : {})}
          subtitle="Selected builds & projects"
        >
          Projects
        </IconButton>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -12, filter: "blur(4px)" },
          show: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 420,
              damping: 28,
            },
          },
        }}
      >
        <IconButton
          IconName={FileUser}
          link="/work"
          {...(closeDrawer ? { callback: closeDrawer } : {})}
          subtitle="Experience & highlights"
        >
          Work
        </IconButton>
      </motion.div>
    </>
  );
}
