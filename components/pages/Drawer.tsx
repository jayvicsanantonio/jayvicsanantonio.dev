import FocusLock from "react-focus-lock";
import useEscapeKey from "@/hooks/use-escape-key";
import { RemoveScroll } from "react-remove-scroll";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MainMenu from "./MainMenu";

export default function Drawer({ closeDrawer }: { closeDrawer: () => void }) {
  useEscapeKey(closeDrawer);

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20  backdrop-blur-sm" />
        <div className="absolute top-0 right-0 max-w-72 min-w-48 bottom-0 w-3/5 flex flex-col space-between bg-white dark:bg-gray-950 shadow-lg p-6 z-1000">
          <div className="flex flex-col gap-6 flex-1">
            <MainMenu closeDrawer={closeDrawer} />
          </div>

          <Button
            className="group inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium bg-white text-gray-950 hover:bg-white dark:bg-gray-950 dark:hover:bg-gray-950 dark:text-white border-t-purple-500 border-r-purple-500 border-b-blue-400 border-l-blue-400  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 space-x-2 hover:scale-110 transition ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
            onClick={closeDrawer}
            aria-label="Close navigation menu"
          >
            <X aria-hidden={true} size={16} />
            <span>Dismiss</span>
          </Button>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}
