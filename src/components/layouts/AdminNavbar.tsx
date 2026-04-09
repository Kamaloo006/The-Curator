import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import { IconMoon, IconSun } from "@tabler/icons-react";

const adminLinks = [
  { label: "Dashboard", to: "/admin" },
  { label: "Categories", to: "/admin/categories" },
  { label: "Pending Posts", to: "/admin/pending-posts" },
];

const AdminNavbar = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      className={clsx("sticky top-0 z-40 border-b", {
        "bg-[#fff9f2] border-[#efdecc]": theme === "light",
        "bg-[#202020] border-[#343434]": theme === "dark",
      })}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <div>
          <p
            className={clsx("text-xs uppercase tracking-[0.2em]", {
              "text-[#8b5a2b]": theme === "light",
              "text-[#e2b36d]": theme === "dark",
            })}
          >
            Admin Panel
          </p>
          <h1
            className={clsx("text-lg font-extrabold", {
              "text-[#2c2014]": theme === "light",
              "text-[#f7e4c6]": theme === "dark",
            })}
          >
            The Curator
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              className={({ isActive }) =>
                clsx(
                  "px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                  {
                    "bg-[#2c2014] text-[#fef6ea]":
                      isActive && theme === "light",
                    "bg-[#f7e4c6] text-[#2d2216]": isActive && theme === "dark",
                    "text-[#5f4a35] hover:bg-[#f3e1cc]":
                      !isActive && theme === "light",
                    "text-[#e9cfab] hover:bg-[#2a2a2a]":
                      !isActive && theme === "dark",
                  },
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className={clsx("hidden sm:inline font-bold text-md", {
              "text-[#6d5b49]": theme === "light",
              "text-[#d6c3a6]": theme === "dark",
            })}
          >
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className={clsx("px-3 py-2 rounded-lg text-sm font-bold", {
              "bg-[#2c2014] text-white hover:bg-[#1f170f]": theme === "light",
              "bg-[#f7e4c6] text-[#2d2216] hover:bg-[#edd5af]":
                theme === "dark",
            })}
          >
            Logout
          </button>
          <button onClick={toggleTheme}>
            {theme === "light" ? <IconMoon /> : <IconSun color="#f7e4c6" />}
          </button>
        </div>
      </div>

      <nav className="md:hidden border-t border-inherit px-4 py-2 flex gap-2 overflow-x-auto">
        {adminLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/admin"}
            className={({ isActive }) =>
              clsx(
                "px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap",
                {
                  "bg-[#2c2014] text-white": isActive && theme === "light",
                  "bg-[#f7e4c6] text-[#2d2216]": isActive && theme === "dark",
                  "text-[#5f4a35]": !isActive && theme === "light",
                  "text-[#e9cfab]": !isActive && theme === "dark",
                },
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default AdminNavbar;
