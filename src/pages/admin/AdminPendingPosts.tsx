import { useEffect, useState } from "react";
import clsx from "clsx";
import { isAxiosError } from "axios";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  approvePendingPost,
  getPendingPosts,
  rejectPendingPost,
  type PendingPost,
} from "../../services/api/admin";

const AdminPendingPosts = () => {
  const { theme } = useThemeContext();
  const { token } = useAuth();

  const [posts, setPosts] = useState<PendingPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionPostId, setActionPostId] = useState<number | null>(null);

  const extractErrorMessage = (err: unknown, fallback: string): string => {
    if (isAxiosError(err)) {
      const payload = err.response?.data as { message?: string } | undefined;
      if (payload?.message) return payload.message;
    }

    if (err instanceof Error && err.message) return err.message;

    return fallback;
  };

  const loadPendingPosts = async () => {
    if (!token) return;

    setIsLoading(true);
    setError("");

    try {
      const data = await getPendingPosts(token);
      setPosts(data);
    } catch (err) {
      setError(extractErrorMessage(err, "Could not load pending posts."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPendingPosts();
  }, [token]);

  const handleModerationAction = async (
    postId: number,
    action: "approve" | "reject",
  ) => {
    if (!token) return;

    setActionPostId(postId);
    setError("");

    try {
      if (action === "approve") {
        await approvePendingPost(token, postId);
      } else {
        await rejectPendingPost(token, postId);
      }

      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      setError(extractErrorMessage(err, `Failed to ${action} post.`));
    } finally {
      setActionPostId(null);
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h2
          className={clsx("text-3xl font-extrabold", {
            "text-[#2c2014]": theme === "light",
            "text-[#f7e4c6]": theme === "dark",
          })}
        >
          Pending Posts
        </h2>
        <p
          className={clsx("mt-1", {
            "text-[#6d5b49]": theme === "light",
            "text-[#c9b396]": theme === "dark",
          })}
        >
          Approve or reject posts before they are published.
        </p>
      </header>

      {error && (
        <p className="rounded-xl bg-red-100 text-red-700 px-4 py-2 text-sm">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="text-sm">Loading moderation queue...</p>
      ) : posts.length === 0 ? (
        <p
          className={clsx("rounded-2xl p-4 border", {
            "bg-white border-[#ead8bf] text-[#2c2014]": theme === "light",
            "bg-[#222] border-[#363636] text-[#f7e4c6]": theme === "dark",
          })}
        >
          No pending posts. Everything is up to date.
        </p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => {
            const isActing = actionPostId === post.id;

            return (
              <article
                key={post.id}
                className={clsx("rounded-2xl border p-4", {
                  "bg-white border-[#ead8bf]": theme === "light",
                  "bg-[#222] border-[#363636]": theme === "dark",
                })}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className={clsx("text-xl font-bold", {
                        "text-[#2c2014]": theme === "light",
                        "text-[#f7e4c6]": theme === "dark",
                      })}
                    >
                      {post.title}
                    </h3>
                    <p
                      className={clsx("mt-1 text-sm", {
                        "text-[#6d5b49]": theme === "light",
                        "text-[#c9b396]": theme === "dark",
                      })}
                    >
                      By {post.author}
                      {post.category ? ` in ${post.category}` : ""}
                    </p>
                  </div>
                </div>

                <p
                  className={clsx("mt-3 text-sm line-clamp-3", {
                    "text-[#4d3f31]": theme === "light",
                    "text-[#d5be9f]": theme === "dark",
                  })}
                >
                  {post.content}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleModerationAction(post.id, "approve")}
                    disabled={isActing}
                    className={clsx("px-3 py-2 rounded-lg text-sm font-bold", {
                      "bg-green-600 text-white hover:bg-green-700": !isActing,
                      "bg-green-300 text-white cursor-not-allowed": isActing,
                    })}
                  >
                    {isActing ? "Working..." : "Approve"}
                  </button>

                  <button
                    onClick={() => handleModerationAction(post.id, "reject")}
                    disabled={isActing}
                    className={clsx("px-3 py-2 rounded-lg text-sm font-bold", {
                      "bg-red-600 text-white hover:bg-red-700": !isActing,
                      "bg-red-300 text-white cursor-not-allowed": isActing,
                    })}
                  >
                    {isActing ? "Working..." : "Reject"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AdminPendingPosts;
