import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
