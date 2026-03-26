import clsx from "clsx";
import { useThemeContext } from "../context/ThemeContext";
import type { ReactNode } from "react";

const Box = ({ children }: { children: ReactNode }) => {
  const { theme } = useThemeContext();
  const classes = clsx(`w-100 h-100 container mx-auto`, {
    "bg-blue-400": theme === "light",
    "bg-blue-800": theme === "dark",
  });
  return <div className={classes}>{children}</div>;
};

export default Box;
