import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getPendingPosts } from "../../services/api/admin";

const AdminDashboard = () => {
  const { theme } = useThemeContext();
  const { token } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!token) return;

    getPendingPosts(token)
      .then((posts) => setPendingCount(posts.length))
      .catch(() => setPendingCount(0));
  }, [token]);

  return (
    <section className="space-y-6">
      <div>
        <h2
          className={clsx("text-3xl font-extrabold", {
            "text-[#2c2014]": theme === "light",
            "text-[#f7e4c6]": theme === "dark",
          })}
        >
          Admin Dashboard
        </h2>
        <p
          className={clsx("mt-1", {
            "text-[#6d5b49]": theme === "light",
            "text-[#c9b396]": theme === "dark",
          })}
        >
          Review content, keep categories clean, and control what gets
          published.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article
          className={clsx("rounded-2xl p-5 border", {
            "bg-white border-[#ead8bf]": theme === "light",
            "bg-[#222] border-[#363636]": theme === "dark",
          })}
        >
          <h3
            className={clsx("font-bold", {
              "text-[#2c2014]": theme === "light",
              "text-[#f7e4c6]": theme === "dark",
            })}
          >
            Pending Posts
          </h3>
          <p
            className={clsx("mt-2 text-sm", {
              "text-[#6d5b49]": theme === "light",
              "text-[#c9b396]": theme === "dark",
            })}
          >
            You currently have {pendingCount} post(s) waiting for moderation.
          </p>
          <Link
            to="/admin/pending-posts"
            className={clsx("inline-block mt-4 text-sm font-bold underline", {
              "text-[#2c2014]": theme === "light",
              "text-[#f7e4c6]": theme === "dark",
            })}
          >
            Open moderation queue
          </Link>
        </article>

        <article
          className={clsx("rounded-2xl p-5 border", {
            "bg-white border-[#ead8bf]": theme === "light",
            "bg-[#222] border-[#363636]": theme === "dark",
          })}
        >
          <h3
            className={clsx("font-bold", {
              "text-[#2c2014]": theme === "light",
              "text-[#f7e4c6]": theme === "dark",
            })}
          >
            Categories
          </h3>
          <p
            className={clsx("mt-2 text-sm", {
              "text-[#6d5b49]": theme === "light",
              "text-[#c9b396]": theme === "dark",
            })}
          >
            Create and delete categories used in your blog taxonomy.
          </p>
          <Link
            to="/admin/categories"
            className={clsx("inline-block mt-4 text-sm font-bold underline", {
              "text-[#2c2014]": theme === "light",
              "text-[#f7e4c6]": theme === "dark",
            })}
          >
            Manage categories
          </Link>
        </article>
      </div>
    </section>
  );
};

export default AdminDashboard;
