import { useState } from "react";
import FocusLock from "react-focus-lock";
import useEscapeKey from "@/hooks/use-escape-key";
import { RemoveScroll } from "react-remove-scroll";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useSpring, animated } from "react-spring";
import MainMenu from "@/components/pages/MainMenu";

export default function Drawer({ closeDrawer }: { closeDrawer: () => void }) {
  useEscapeKey(closeDrawer);
  const [isClosing, setIsClosing] = useState(false);

  const slideAnimation = useSpring({
    from: { x: isClosing ? 0 : 290 },
    to: { x: isClosing ? 290 : 0 },
    config: { mass: 1, tension: 180, friction: 20 },
  });

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      closeDrawer();
    }, 300);
  };

  return (
    <FocusLock returnFocus={true}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20  backdrop-blur-sm" />
      <animated.div
        className="absolute top-0 right-0 max-w-72 min-w-48 bottom-0 w-3/5 flex flex-col space-between bg-white dark:bg-gray-950 shadow-lg p-6 z-1000"
        style={slideAnimation}
      >
        <div className="flex flex-col gap-6 flex-1">
          <MainMenu closeDrawer={handleClose} />
        </div>

        <Button
          className="group inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium bg-white text-gray-950 hover:bg-white dark:bg-gray-950 dark:hover:bg-gray-950 dark:text-white border-t-purple-500 border-r-purple-500 border-b-blue-400 border-l-blue-400  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 space-x-2 hover:scale-110 transition ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
          onClick={handleClose}
          aria-label="Close navigation menu"
        >
          <X aria-hidden={true} size={16} />
          <span>Dismiss</span>
        </Button>
      </animated.div>
    </FocusLock>
  );
}
