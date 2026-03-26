import { type ReactNode } from "react";
import { useThemeContext } from "../context/ThemeContext";

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  const { theme } = useThemeContext();
  return (
    <div
      className={`${theme === "light" ? `bg-gray-400` : `bg-gray-800`} h-screen py-10 flex justify-center align-middle`}
    >
      {children}
    </div>
  );
};

export default Main;
