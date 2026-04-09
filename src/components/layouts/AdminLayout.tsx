import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { useThemeContext } from "../../context/ThemeContext";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const { theme } = useThemeContext();

  return (
    <div
      className={clsx("min-h-screen", {
        "bg-[#fbf3e7]": theme === "light",
        "bg-[#171717]": theme === "dark",
      })}
    >
      <AdminNavbar />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
