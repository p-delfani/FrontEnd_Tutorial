import { useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../Contexts/Auth";

const Blogs = () => {
  const { user, logout } = useContext(AuthContext);

  console.log(`[Blogs.jsx] Re-Render`);

  console.log(user);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">
        Blogs <button onClick={logout}>(Logout)</button>
      </h2>
      <div className="w-full h-px dark:bg-white/10"></div>
      <div className="space-y-4 mt-5">
        <article className="select-none cursor-pointer duration-150 dark:hover:bg-zinc-800/80 space-y-2 hover:bg-zinc-200 relative p-5 dark:bg-zinc-800/60 overflow-hidden bg-zinc-100 rounded-2xl">
          <Link className="size-full absolute top-0 left-0" to={"/blog/1"} />
          <h4 className="font-bold text-lg">
            Lorem ipsum dolor sit amet consectetur.
          </h4>
          <p className="dark:text-zinc-400 font-sans line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            suscipit impedit eum tenetur laudantium, doloribus quos sed
            perspiciatis cupiditate laboriosam, aliquam eaque deleniti cumque?
          </p>
        </article>
      </div>
    </div>
  );
};

export default Blogs;
