import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import About from "./pages/About.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },

  {
    path: "/about",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <MantineProvider theme={{ fontFamily: "Manrope, sans-serif" }}>
        <Login />
      </MantineProvider>
    ),
  },
  {
    path: "/register",
    element: (
      <MantineProvider theme={{ fontFamily: "Manrope, sans-serif" }}>
        <Register />
      </MantineProvider>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
