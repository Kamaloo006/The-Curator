import { Link, NavLink } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import clsx from "clsx";

const Navbar = () => {
  const { theme, toggleTheme } = useThemeContext();
  const btnClasses = clsx(
    `ml-5 text-2xl  p-4 rounded cursor-pointer font-medium capitalize transition-all duration-300`,
    {
      "bg-cyan-300 hover:bg-cyan-400 ": theme === "light",
      "bg-cyan-500 hover:bg-cyan-600 text-white": theme === "dark",
    },
  );
  return (
    <div className="bg-amber-600 p-5">
      <Link to="/" className={btnClasses}>
        Home
      </Link>

      <button onClick={toggleTheme} className={btnClasses}>
        {theme === "light" ? `Dark` : `Light`}
      </button>
      <NavLink
        to="/counter"
        className={({ isActive }) => {
          return isActive
            ? `${btnClasses} transition-all duration-300 bg-cyan-700 text-white`
            : btnClasses;
        }}
      >
        Counter
      </NavLink>

      <Link to="/main" className={btnClasses}>
        App
      </Link>
      <Link to="/posts" className={btnClasses}>
        Posts
      </Link>
    </div>
  );
};

export default Navbar;
