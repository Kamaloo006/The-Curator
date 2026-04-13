import { Image } from "@mantine/core";
import clsx from "clsx";
import { useThemeContext } from "../../context/ThemeContext";
import type { Post } from "../../types/Post";
import useAOS from "../../hooks/useAOS";
import { useEffect } from "react";
interface postProps {
  post: Post;
}

const PostCardHorizontal = ({ post }: postProps) => {
  useAOS;
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const categoryLabel =
    Array.isArray(post.categories) && post.categories.length > 0
      ? post.categories.map((item) => item.name).join(" • ")
      : (post.category ?? "Uncategorized");
  useEffect(() => {
    console.log(post.author_avatar);
  }, []);
  return (
    <div
      className={clsx(
        "group cursor-pointer flex flex-col md:flex-row gap-6 py-8 transition-all duration-300 border-b",
        isDark
          ? "border-gray-800 hover:bg-[#1C1B1B]/50"
          : "border-gray-100 hover:bg-gray-50/50",
      )}
    >
      {/* Image Section */}
      <div className="w-full md:w-72 h-48 shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt="Minimalism space"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4F5BFF]">
            {categoryLabel}
          </span>
          <span className="text-gray-300">•</span>
          <span
            className={clsx(
              "text-[10px] font-bold uppercase tracking-widest",
              isDark ? "text-gray-500" : "text-gray-400",
            )}
          >
            {Math.floor(Math.random() * 10)} Min Read
          </span>
        </div>

        <h2
          className={clsx(
            "text-2xl md:text-3xl font-extrabold mb-3 tracking-tight leading-tight transition-colors",
            isDark
              ? "text-white group-hover:text-[#8C9EFF]"
              : "text-[#1C1B1B] group-hover:text-[#4F5BFF]",
          )}
        >
          {post.title}
        </h2>

        <p
          className={clsx(
            "text-sm md:text-base leading-relaxed mb-6 line-clamp-2",
            isDark ? "text-gray-500" : "text-gray-600",
          )}
        >
          {post.content}
        </p>

        {/* Author Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image src={post.author_avatar} alt={post.author} />
          </div>
          <div className="flex flex-col">
            <span
              className={clsx(
                "text-sm font-bold",
                isDark ? "text-gray-300" : "text-gray-900",
              )}
            >
              {post.author}
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              {post.created_at}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardHorizontal;
