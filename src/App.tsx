import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useThemeContext } from "./context/ThemeContext";
import Home from "./pages/Home";
import clsx from "clsx";
function App() {
  const { theme } = useThemeContext();
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
