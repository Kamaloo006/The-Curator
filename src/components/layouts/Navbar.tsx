import { IconBell, IconMoon, IconSearch, IconSun } from "@tabler/icons-react";
import { Autocomplete, Burger, Button, Group, Drawer } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import classes from "./Modules/Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import userProfile from "../../assets/userProfile.png";
const links = [
  { link: "/", label: "Discover" },
  { link: "/latest", label: "Latest Posts" },
  { link: "/publish", label: "Publish" },
  { link: "/about", label: "About" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [opened, { toggle, close }] = useDisclosure(false);
  const { theme, toggleTheme } = useThemeContext();
  const { hovered, ref } = useHover();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  console.log(user?.avatar);

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={({ isActive }) =>
        `px-2 mt-1 text-sm transition-all duration-200 py-1 border-b-2 font-bold ${
          isActive
            ? `text-[#1C2AC8] border-[#1C2AC8] ${
                theme === "dark" && "text-white border-[#5866FA]"
              }`
            : `text-[#64748B] border-transparent hover:text-[#414e61] ${
                theme === "dark" &&
                "text-[#eee] border-transparent hover:text-[#ddd]"
              }`
        }`
      }
    >
      {link.label}
    </NavLink>
  ));

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000}
      >
        <div className="flex flex-col gap-4 mt-6">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.link}
              onClick={close}
              className="text-lg font-semibold"
            >
              {link.label}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink to="/login" onClick={close}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={close}>
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3 mt-4">
              <NavLink to="/profile" onClick={close}>
                <a href="">
                  <img
                    src={user.avatar || userProfile}
                    className="w-10 h-10 rounded-full"
                  />
                </a>
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </Drawer>

      {/* 🔹 HEADER */}
      <header
        className={clsx(
          `sticky top-0 z-50 container lg:px-10 min-w-full sm:px-6 transition-all duration-200`,
          {
            "bg-white": theme === "light",
            "bg-[#1C1B1B]": theme === "dark",
          },
        )}
      >
        <div className={classes.inner}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
              color={theme === "dark" ? "white" : "black"}
            />

            <NavLink
              to="/"
              className={clsx(
                "text-2xl cursor-pointer font-bold",
                theme === "dark" ? "text-white" : "text-black",
              )}
            >
              The Curator
            </NavLink>

            <Group ml={20} gap={5} visibleFrom="sm">
              {items}
            </Group>
          </Group>

          <Group className="flex gap-2">
            <Autocomplete
              placeholder="Search stories..."
              leftSection={<IconSearch size={16} />}
              data={["React", "Laravel", "Design"]}
              visibleFrom="md"
              styles={{
                input: {
                  backgroundColor: "transparent",
                  border:
                    theme === "dark"
                      ? "1px solid #3C3C3C"
                      : "1px solid #E2E8F0",
                  color: theme === "dark" ? "#fff" : "#000",
                },
              }}
            />

            <Group visibleFrom="sm" className="flex gap-3 items-center">
              {!user ? (
                <>
                  <NavLink to="/login">
                    <Button variant="subtle">Login</Button>
                  </NavLink>

                  <Button
                    ref={ref}
                    onClick={() => navigate("/register")}
                    color={hovered ? "#3C4AE0" : "#5866FA"}
                    radius={10}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <IconBell
                    cursor="pointer"
                    color={theme === "dark" ? "white" : "black"}
                  />

                  {theme === "dark" ? (
                    <IconSun
                      onClick={toggleTheme}
                      className="cursor-pointer text-yellow-400"
                    />
                  ) : (
                    <IconMoon
                      onClick={toggleTheme}
                      className="cursor-pointer text-gray-700"
                    />
                  )}
                  <NavLink to="/profile" onClick={close}>
                    <img
                      src={user.avatar || userProfile}
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className={clsx(
                      "bg-[#5866FA] text-[#eee] hover:bg-[#3C4AE0] transition-all duration-300 px-3 py-1 cursor-pointer rounded",
                      {
                        "text-red-500 bg-[#eee] hover:bg-[#ddd]":
                          theme !== "dark",
                      },
                    )}
                  >
                    <span className="text-md font-bold leading-loose">
                      Logout
                    </span>
                  </button>
                </>
              )}
            </Group>
          </Group>
        </div>
      </header>
    </>
  );
}
