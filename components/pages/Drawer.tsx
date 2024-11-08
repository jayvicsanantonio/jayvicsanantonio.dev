import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MainMenu from "./MainMenu";

export default function Drawer({ closeDrawer }: { closeDrawer: () => void }) {
  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div className="absolute inset-0 bg-violet-950/75  backdrop-blur-sm" />
        <div className="absolute top-0 right-0 max-w-72 min-w-48 bottom-0 w-2/5 flex flex-col space-between bg-gray-950 shadow-lg p-6">
          <div className="flex flex-col gap-6 flex-1">
            <MainMenu closeDrawer={closeDrawer} />
          </div>

          <Button
            className="flex items-center justify-center gap-2 text-white p-2 cursor-pointer rounded text-lg bg-violet-600 hover:bg-violet-700"
            onClick={closeDrawer}
          >
            <X /> Dismiss
          </Button>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}
