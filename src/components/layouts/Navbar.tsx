import { IconBell, IconMoon, IconSearch, IconSun } from "@tabler/icons-react";
import { Autocomplete, Burger, Button, Group, Drawer } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import classes from "./Modules/Navbar.module.css";
import { NavLink } from "react-router-dom";
import userProfile from "../../assets/userProfile.png";
import { useThemeContext } from "../../context/ThemeContext";
import clsx from "clsx";

const links = [
  { link: "/", label: "Discover" },
  { link: "/latest", label: "Latest Posts" },
  { link: "/publish", label: "Publish" },
  { link: "/about", label: "About" },
];

export default function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { theme, toggleTheme } = useThemeContext();
  const { hovered, ref } = useHover();

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={({ isActive }) =>
        `px-2 mt-1 text-md transition-all duration-200 border-b-2 font-bold ${
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
        <div className="flex flex-col md:gap-6 gap-2 mt-6">
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

          {/* optional mobile actions */}
          <Button ref={ref} color={hovered ? "#3C4AE0" : "#5866FA"} radius={10}>
            Register
          </Button>
        </div>
      </Drawer>

      <header
        className={clsx(
          `container lg:px-10 min-w-full sm:px-6 transition-all duration-200`,
          {
            "bg-white": theme === "light",
            "bg-[#1C1B1B]": theme === "dark",
          },
        )}
      >
        <div className={classes.inner}>
          {/* LEFT */}
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
              aria-label="Toggle navigation"
            />

            <NavLink
              to="/"
              className={clsx(`text-2xl cursor-pointer leading-2 font-bold`, {
                "text-[#1B1C1C]": theme === "light",
                "text-[#F2F0F0]": theme === "dark",
              })}
            >
              The Curator
            </NavLink>

            <Group ml={20} gap={5} visibleFrom="sm">
              {items}
            </Group>
          </Group>

          {/* RIGHT */}
          <Group className="flex gap-2">
            {/* Search (hide on small screens) */}
            <Autocomplete
              placeholder="Search stories..."
              leftSection={<IconSearch size={16} stroke={1.5} />}
              data={["React", "Angular", "Vue", "Next.js", "Svelte"]}
              radius={10}
              visibleFrom="md"
              styles={{
                input: {
                  backgroundColor: "transparent",
                  border:
                    theme === "dark"
                      ? "1px solid #3C3C3C"
                      : "1px solid #E2E8F0",
                  color: theme === "dark" ? "#F2F0F0" : "#1B1C1C",
                  transition: "all 0.2s ease",
                  "&:focus": {
                    borderColor: theme === "dark" ? "#84CEF9" : "#1C2AC8",
                    outline: "none",
                  },
                  "&::placeholder": {
                    color: theme === "dark" ? "#A0A0A0" : "#94A3B8",
                  },
                },
                dropdown: {
                  backgroundColor: theme === "dark" ? "#2C2C2C" : "white",
                },
              }}
            />

            {/* Actions (hide on mobile) */}
            <Group visibleFrom="sm" className="flex gap-2">
              <Button
                ref={ref}
                color={hovered ? "#3C4AE0" : "#5866FA"}
                radius={10}
              >
                Register
              </Button>

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

              <img
                src={userProfile}
                className="cursor-pointer w-8 h-8 rounded-full"
              />
            </Group>
          </Group>
        </div>
      </header>
    </>
  );
}
