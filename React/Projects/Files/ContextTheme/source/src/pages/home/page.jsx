import AboutMe from "../../components/AboutMe";
import Blogs from "../../components/Blogs";
import Navigation from "../../components/Navigation";

const HomePage = () => {
  return (
    <div className="space-y-20">
      <div>
        <h1 className="text-xl font-black">Amin Saeedi Rad.</h1>
        <p className="text-zinc-600 font-medium dark:text-zinc-500">
            Software Developer
        </p>
      </div>
      <AboutMe />
      <Blogs />

      <Navigation />
    </div>
  );
};

export default HomePage;
