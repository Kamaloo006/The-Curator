import { Badge, Container, Loader } from "@mantine/core";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import { useUserPosts } from "../hooks/usePosts";

const statusLabel: Record<string, string> = {
  published: "Published",
  draft: "Draft",
  pending: "Pending Review",
  archived: "Archived",
};

const statusColor: Record<string, string> = {
  published: "green",
  draft: "gray",
  pending: "yellow",
  archived: "red",
};

const ProfilePosts = () => {
  const { user } = useAuth();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const { userPosts, isLoading } = useUserPosts(user?.id ?? 0);

  if (!user) {
    return <p className="p-6">Please log in to view your posts.</p>;
  }

  const totalWritten = userPosts?.length;
  const publishedCount = userPosts?.filter(
    (post) => post.status === "published",
  ).length;
  const draftCount = userPosts?.filter(
    (post) => post.status === "draft",
  ).length;
  const pendingCount = userPosts?.filter(
    (post) => post.status === "pending",
  ).length;

  const stats = [
    { label: "Total Written", value: totalWritten },
    { label: "Published", value: publishedCount },
    { label: "Drafts", value: draftCount },
    { label: "Pending", value: pendingCount },
  ];

  return (
    <div
      className={clsx("min-h-screen transition-colors duration-200", {
        "bg-[#f7f3ee]": !isDark,
        "bg-[#101010]": isDark,
      })}
    >
      <Navbar />

      <Container size={1232} className="py-10 md:py-14 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p
              className={clsx("text-xs font-bold uppercase tracking-[0.2em]", {
                "text-[#7b7b86]": !isDark,
                "text-[#a1a1aa]": isDark,
              })}
            >
              Content Studio
            </p>
            <h1
              className={clsx("mt-2 text-4xl md:text-5xl font-black", {
                "text-[#111827]": !isDark,
                "text-[#f3f4f6]": isDark,
              })}
            >
              My Posts
            </h1>
            <p
              className={clsx("mt-2 max-w-2xl text-sm md:text-base", {
                "text-[#6b7280]": !isDark,
                "text-[#a1a1aa]": isDark,
              })}
            >
              Review everything you’ve written and continue publishing from one
              clean workspace.
            </p>
          </div>

          <Link to="/publish">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#5866FA] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5866FA]/20 transition hover:bg-[#4655e6]">
              <span className="text-lg leading-none">+</span>
              Publish New Post
            </button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={clsx("rounded-2xl border p-5 shadow-sm", {
                "bg-white border-[#ece8e2]": !isDark,
                "bg-[#1a1a1a] border-[#2b2b2b]": isDark,
                "ring-1 ring-[#5866FA]": index === 0,
              })}
            >
              <p
                className={clsx(
                  "text-xs font-bold uppercase tracking-[0.18em]",
                  {
                    "text-[#8b8b95]": !isDark,
                    "text-[#a1a1aa]": isDark,
                  },
                )}
              >
                {stat.label}
              </p>
              <p
                className={clsx("mt-3 text-3xl font-black", {
                  "text-[#111827]": !isDark,
                  "text-[#f9fafb]": isDark,
                })}
              >
                {isLoading ? "--" : String(stat.value).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>

        <div
          className={clsx("rounded-3xl border overflow-hidden", {
            "bg-white border-[#ece8e2]": !isDark,
            "bg-[#161616] border-[#2c2c2c]": isDark,
          })}
        >
          <div
            className={clsx(
              "flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 py-4 border-b",
              {
                "border-[#ece8e2]": !isDark,
                "border-[#2c2c2c]": isDark,
              },
            )}
          >
            <div>
              <h2
                className={clsx("text-lg font-extrabold", {
                  "text-[#111827]": !isDark,
                  "text-[#f3f4f6]": isDark,
                })}
              >
                All Written Posts
              </h2>
              <p
                className={clsx("text-sm mt-1", {
                  "text-[#6b7280]": !isDark,
                  "text-[#a1a1aa]": isDark,
                })}
              >
                Showing everything you wrote, not only published posts.
              </p>
            </div>

            <div
              className={clsx(
                "rounded-xl px-4 py-2 text-sm font-semibold border",
                {
                  "bg-[#f8f9ff] border-[#dbe0ff] text-[#5866FA]": !isDark,
                  "bg-[#20253f] border-[#39417a] text-[#c9d1ff]": isDark,
                },
              )}
            >
              {userPosts?.length} total
            </div>
          </div>

          {isLoading ? (
            <div className="p-10 flex justify-center">
              <Loader color="#5866FA" />
            </div>
          ) : (userPosts?.length ?? 0 > 0) ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse">
                <thead>
                  <tr
                    className={clsx(
                      "text-left text-xs uppercase tracking-[0.18em]",
                      {
                        "text-[#8b8b95]": !isDark,
                        "text-[#9ca3af]": isDark,
                      },
                    )}
                  >
                    <th className="px-5 py-4">Post Title & Metadata</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Categories</th>
                    <th className="px-5 py-4">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {userPosts?.map((post) => (
                    <tr
                      key={post.id}
                      className={clsx("border-t", {
                        "border-[#f0ece7]": !isDark,
                        "border-[#262626]": isDark,
                      })}
                    >
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-start gap-4">
                          <div
                            className={clsx(
                              "h-14 w-14 shrink-0 rounded-xl overflow-hidden border",
                              {
                                "border-[#eee]": !isDark,
                                "border-[#2f2f2f]": isDark,
                              },
                            )}
                          >
                            <img
                              src={post.image}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div>
                            <p
                              className={clsx("font-bold", {
                                "text-[#111827]": !isDark,
                                "text-[#f3f4f6]": isDark,
                              })}
                            >
                              {post.title}
                            </p>
                            <p
                              className={clsx("mt-1 text-sm", {
                                "text-[#6b7280]": !isDark,
                                "text-[#a1a1aa]": isDark,
                              })}
                            >
                              {post.content.slice(0, 72)}
                              {post.content.length > 72 ? "..." : ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <Badge
                          variant="light"
                          color={statusColor[post.status] || "gray"}
                        >
                          {statusLabel[post.status] || post.status}
                        </Badge>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="flex flex-wrap gap-2">
                          {post.categories?.length ? (
                            post.categories.map((category) => (
                              <span
                                key={category.id}
                                className={clsx(
                                  "rounded-full px-3 py-1 text-xs font-semibold",
                                  {
                                    "bg-[#eef0ff] text-[#5866FA]": !isDark,
                                    "bg-[#23294a] text-[#d3d8ff]": isDark,
                                  },
                                )}
                              >
                                {category.name}
                              </span>
                            ))
                          ) : (
                            <span
                              className={clsx("text-sm", {
                                "text-[#9ca3af]": !isDark,
                                "text-[#6b7280]": isDark,
                              })}
                            >
                              No category
                            </span>
                          )}
                        </div>
                      </td>

                      <td
                        className={clsx("px-5 py-4 align-top text-sm", {
                          "text-[#6b7280]": !isDark,
                          "text-[#a1a1aa]": isDark,
                        })}
                      >
                        {post.created_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              <p
                className={clsx("text-sm", {
                  "text-[#6b7280]": !isDark,
                  "text-[#a1a1aa]": isDark,
                })}
              >
                No posts found yet.
              </p>
            </div>
          )}
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default ProfilePosts;
