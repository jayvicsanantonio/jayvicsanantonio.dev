import IconButton from "@/components/pages/IconButton";
import {
  House,
  LayoutPanelLeft,
  Newspaper,
  FlaskConical,
  FileUser,
} from "lucide-react";

export default function MainMenu({
  closeDrawer,
}: {
  closeDrawer?: () => void;
}) {
  return (
    <>
      <IconButton IconName={House} link="/" callback={closeDrawer}>
        Home
      </IconButton>
      <IconButton
        IconName={LayoutPanelLeft}
        link="/projects"
        callback={closeDrawer}
      >
        Projects
      </IconButton>
      <IconButton IconName={FlaskConical} link="/lab" callback={closeDrawer}>
        Lab
      </IconButton>
      <IconButton IconName={FileUser} link="/work" callback={closeDrawer}>
        Work
      </IconButton>
    </>
  );
}
