import SearchInput from "./components/SearchInput";
import Notifications from "./components/Notifications";
import Divider from "./components/Divider";
import Profile from "./components/Profile";

const Topbar = () => {
  return (
    <div className="w-full h-20 relative z-10 border-b primary-border-color flex items-center justify-between *:flex *:items-center *:gap-3">
      <div>
        <SearchInput />
      </div>

      <div>
        <Notifications />
        <Divider />
        <Profile />
      </div>
    </div>
  );
};

export default Topbar;
