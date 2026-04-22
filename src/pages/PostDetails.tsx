import { Avatar, Badge, Container, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { useThemeContext } from "../context/ThemeContext";
import { getPostById } from "../services/api/posts";
import type { Post } from "../types/Post";

const PostDetails = () => {
  const { id } = useParams();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const postId = Number(id);
  const hasValidId = Number.isFinite(postId) && postId > 0;

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: hasValidId,
    staleTime: 1000 * 5 * 60,
  });

  const categoryLabel =
    post && Array.isArray(post.categories) && post.categories.length > 0
      ? post.categories.map((item) => item.name).join(" • ")
      : (post?.category ?? "Uncategorized");

  return (
    <div
      className={clsx("min-h-screen transition-colors duration-200", {
        "bg-[#FBF8F7]": !isDark,
        "bg-[#242424]": isDark,
      })}
    >
      <Navbar />

      <Container size={980} className="px-4 md:px-6 py-10 md:py-14">
        <div className="mb-6">
          <Link
            to="/latest"
            className={clsx("text-sm font-semibold transition-colors", {
              "text-[#4F5BFF] hover:text-[#1C2AC8]": !isDark,
              "text-[#8C9EFF] hover:text-[#CED6FF]": isDark,
            })}
          >
            Back to latest posts
          </Link>
        </div>

        {!hasValidId ? (
          <p className="text-sm text-red-500">Invalid post id.</p>
        ) : isLoading ? (
          <div className="py-12 flex justify-center">
            <Loader color="#4F5BFF" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">
            {error instanceof Error
              ? error.message
              : "Failed to load post details."}
          </p>
        ) : !post ? (
          <p className="text-sm text-gray-500">Post not found.</p>
        ) : (
          <article
            className={clsx("rounded-3xl border overflow-hidden", {
              "bg-white border-[#ECE7E1]": !isDark,
              "bg-[#1A1A1A] border-[#333333]": isDark,
            })}
          >
            <div className="w-full h-72 md:h-104 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge
                  color="#5866FA"
                  variant={isDark ? "light" : "outline"}
                  className="font-semibold"
                >
                  {categoryLabel}
                </Badge>
                <span
                  className={clsx("text-xs uppercase tracking-widest", {
                    "text-gray-500": !isDark,
                    "text-gray-400": isDark,
                  })}
                >
                  {post.created_at}
                </span>
              </div>

              <h1
                className={clsx(
                  "text-3xl md:text-5xl font-black tracking-tight",
                  {
                    "text-[#171717]": !isDark,
                    "text-[#F5F5F5]": isDark,
                  },
                )}
              >
                {post.title}
              </h1>

              <div className="mt-7 mb-8 flex items-center gap-3">
                <Avatar src={post.author_avatar} radius="xl" size="lg" />
                <div>
                  <p
                    className={clsx("font-bold", {
                      "text-[#111827]": !isDark,
                      "text-[#F3F4F6]": isDark,
                    })}
                  >
                    {post.author}
                  </p>
                  <p
                    className={clsx("text-xs", {
                      "text-gray-500": !isDark,
                      "text-gray-400": isDark,
                    })}
                  >
                    {post.likes_count} likes
                  </p>
                </div>
              </div>

              <div
                className={clsx("text-base leading-8 whitespace-pre-line", {
                  "text-[#3F3F46]": !isDark,
                  "text-[#C7C7CC]": isDark,
                })}
              >
                {post.content}
              </div>
            </div>
          </article>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default PostDetails;
