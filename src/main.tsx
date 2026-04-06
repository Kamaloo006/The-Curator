import { StrictMode } from "react";
import type { ReactNode } from "react";
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
import LatestPosts from "./pages/LatestPosts.tsx";

const withMantine = (children: ReactNode) => (
  <MantineProvider theme={{ fontFamily: "Manrope, sans-serif" }}>
    {children}
  </MantineProvider>
);

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
    element: withMantine(
      <ProtectedRoute>
        <About />
      </ProtectedRoute>,
    ),
  },
  {
    path: "/latest",
    element: withMantine(
      <ProtectedRoute>
        <LatestPosts />
      </ProtectedRoute>,
    ),
  },
  {
    path: "/login",
    element: withMantine(<Login />),
  },
  {
    path: "/register",
    element: withMantine(<Register />),
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
