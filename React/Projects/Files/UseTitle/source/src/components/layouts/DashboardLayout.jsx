import { Outlet } from "react-router";
import Sidebar from "../../features/Sidebar/Sidebar";
import Topbar from "../../features/Topbar/Topbar";
import BackgroundOverlay from "../common/BackgroundOverlay";

const DashboardLayout = () => {
  return (
    <main id="root" className="flex">
      <Sidebar />

      <section className="grow *:px-6">
        <Topbar />

        <div id="content" className="mt-6 container mx-auto">
          <div className="relative z-10">
            <Outlet />
          </div>

          <BackgroundOverlay />
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
