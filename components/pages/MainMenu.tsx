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
      <IconButton Icon={House} link="/" callback={closeDrawer}>
        Home
      </IconButton>
      <IconButton
        Icon={LayoutPanelLeft}
        link="/projects"
        callback={closeDrawer}
      >
        Projects
      </IconButton>
      <IconButton Icon={Newspaper} link="/blog" callback={closeDrawer}>
        Blog
      </IconButton>
      <IconButton Icon={FlaskConical} link="/lab" callback={closeDrawer}>
        Lab
      </IconButton>
      <IconButton Icon={FileUser} link="/work" callback={closeDrawer}>
        Work
      </IconButton>
    </>
  );
}
