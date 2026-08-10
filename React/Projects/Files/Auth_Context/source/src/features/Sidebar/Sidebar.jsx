import Menus from "./components/Menus";
import menus from "../../data/menus";
import SidebarHeader from "./components/SidebarHeader";

const Sidebar = () => {
  return (
    <aside className="w-[272px] relative z-10 bg-white h-screen sticky top-0 border-l primary-border-color p-6">
      <SidebarHeader />
      <Menus menus={menus} />
    </aside>
  );
};

export default Sidebar;
