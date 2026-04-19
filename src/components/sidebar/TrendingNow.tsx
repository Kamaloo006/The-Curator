import clsx from "clsx";
import { useThemeContext } from "../../context/ThemeContext";
import type { Post } from "../../types/Post";

interface TrendingNowProps {
  posts: Post[];
}

const TrendingNow = ({ posts }: TrendingNowProps) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const trendingPosts = Array.isArray(posts) ? posts.slice(0, 3) : posts;

  return (
    <div
      className={clsx(
        "rounded-2xl p-6 mb-6",
        isDark ? "bg-[#1C1B1B]" : "bg-white border border-gray-200",
      )}
    >
      <h3
        className={clsx(
          "text-lg font-bold mb-4",
          isDark ? "text-white" : "text-gray-900",
        )}
      >
        Trending Now
      </h3>

      <div className="space-y-4">
        {trendingPosts.map((post, index) => (
          <div key={post.id} className="flex gap-3 cursor-pointer group">
            <span
              className={clsx(
                "text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full shrink-0",
                isDark
                  ? "bg-[#2C2B2B] text-gray-400"
                  : "bg-gray-100 text-gray-600",
              )}
            >
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h4
                className={clsx(
                  "text-sm font-semibold leading-snug group-hover:text-[#4F5BFF] transition-colors line-clamp-2",
                  isDark ? "text-gray-200" : "text-gray-900",
                )}
              >
                {post.title}
              </h4>
              <p
                className={clsx(
                  "text-xs mt-1",
                  isDark ? "text-gray-500" : "text-gray-400",
                )}
              >
                {"12k"} Reads
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
