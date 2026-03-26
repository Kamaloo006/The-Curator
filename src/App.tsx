import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import Home from "./pages/Home";
function App() {
  return (
    <>
      <MantineProvider theme={{ fontFamily: "Manrope, sans-serif" }}>
        <Home />
      </MantineProvider>
    </>
  );
}

export default App;
