import { FaBook, FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import ThemeButton from "./ThemeButton";

const Navigation = () => {
  return (
    <div className="fixed max-w-max bottom-6 mx-auto! px-1 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600/40 dark:text-zinc-200 dark:*:hover:bg-zinc-700/50 left-0 right-0 h-12 border rounded-lg flex items-center justify-center *:size-10 *:rounded-lg *:duration-150 *:hover:bg-zinc-200 *:flex *:items-center *:justify-center *:text-xl text-zinc-700 gap-1 bg-white shadow-lg">
      <Link to={"/"} className="">
        <FaHome />
      </Link>
      <Link to={"/"} className="">
        <FaBook />
      </Link>
      <Link to={"/"} className="">
        <FaUser />
      </Link>
      <ThemeButton />
    </div>
  );
};

export default Navigation;
