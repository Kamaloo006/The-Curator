import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Counter from "./components/Counter.tsx";
// import NotFound from "./components/NotFound.tsx";
// import Profiles from "./components/Profiles.tsx";
// import Layout from "./components/Layout.tsx";
// import Post from "./components/Post.tsx";
import { TaskProvider } from "./context/TaskContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import NotFound from "./components/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         path: "/counter",
//         element: <Counter />,
//       },
//       {
//         path: "/main",
//         element: <App />,
//       },
//       {
//         path: "/posts",
//         element: <Post />,
//       },
//     ],
//   },
// ]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </ThemeProvider>
  </StrictMode>,
);
