import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useThemeContext } from "./context/ThemeContext";
import Home from "./pages/Home";
import AOS from "aos";
import clsx from "clsx";
import { useEffect } from "react";
function App() {
  const { theme } = useThemeContext();
  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 100,
      easing: "ease",
      once: false,
      mirror: false,
    });
  }, []);
  return (
    <>
      <MantineProvider theme={{ fontFamily: "Manrope, sans-serif" }}>
        <div
          className={clsx({
            "bg-[#242424]": theme === "dark",
            "bg-[#FBF8F7]": theme === "light",
          })}
        >
          <Home />
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
