import AboutMe from "../../components/AboutMe";
import Navigation from "../../components/Navigation";

const BlogPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-extrabold!">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sint
        accusamus eligendi inventore soluta!
      </h1>
      <br />
      <AboutMe useLabel={false} />
      <Navigation />
    </div>
  );
};

export default BlogPage;
