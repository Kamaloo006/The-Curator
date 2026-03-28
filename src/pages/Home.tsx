import Navbar from "../components/layouts/Navbar";
import Hero from "../components/layouts/Hero";
import { useThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import HomePosts from "../components/layouts/HomePosts";

const Home = () => {
  const { theme } = useThemeContext();
  return (
    <div
      className={clsx({
        "bg-[#242424]": theme === "dark",
        "bg-[#FBF8F7]": theme === "light",
      })}
    >
      <Navbar />
      <Hero />
      <HomePosts />
    </div>
  );
};

export default Home;
