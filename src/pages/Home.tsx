import Navbar from "../components/layouts/Navbar";
import Hero from "../components/layouts/Hero";
import { useThemeContext } from "../context/ThemeContext";
import clsx from "clsx";

const Home = () => {
  const { theme } = useThemeContext();
  return (
    <div
      className={clsx({
        "bg-[#313030]": theme === "dark",
      })}
    >
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
