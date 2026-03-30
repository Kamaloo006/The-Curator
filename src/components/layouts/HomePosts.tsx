import { Container, Loader } from "@mantine/core";
import { PostCard } from "../ui/PostCard";
import { useThemeContext } from "../../context/ThemeContext";
import clsx from "clsx";
import { usePosts } from "../../hooks/usePosts";
import {
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

const HomePosts = () => {
  const { theme } = useThemeContext();
  const { posts, isLoading } = usePosts();

  return (
    <Container size={1232} className="px-4 md:px-6 lg:px-8">
      {/* TITLE */}
      <div className="my-10">
        <h1
          className={clsx("text-2xl md:text-3xl font-bold mb-2", {
            "text-[#1C2AC8]": theme === "light",
            "text-[#8C9EFF]": theme === "dark",
          })}
        >
          Latest Insights
        </h1>

        <p
          className={clsx("text-sm md:text-base", {
            "text-[#454]": theme === "light",
            "text-gray-400": theme === "dark",
          })}
        >
          Curated perspectives on design, technology, and culture.
        </p>
      </div>

      {/* CARDS */}
      {isLoading ? (
        <Loader size={20} />
      ) : (
        <div className="flex justify-center items-center flex-col">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="flex gap-5 mt-10 mb-6">
            <IconChevronLeft
              className={clsx(
                "border cursor-pointer text-xl  text-[#454655] rounded w-7 h-7",
                {
                  "border-[#D5D4E0]": theme === "light",
                  "border-[#454655]": theme === "dark",
                  "text-[#555252]": theme === "dark",
                },
              )}
            />
            <IconChevronRight
              className={clsx(
                "border cursor-pointer text-xl  text-[#454655] rounded w-7 h-7",
                {
                  "border-[#D5D4E0]": theme === "light",
                  "border-[#454655]": theme === "dark",
                  "text-[#555252]": theme === "dark",
                },
              )}
            />
          </div>

          <button
            className={clsx(
              ` flex gap-1 items-center  p-4 rounded  mb-5 cursor-pointer  transition-all duration-300`,
              {
                "bg-[#F6F3F2] text-[#3C4AE0] hover:bg-[#dad7d5]":
                  theme === "light",
                "bg-[#5866FA] text-[#f6f3f2] hover:bg-[#3C4AE0]":
                  theme === "dark",
              },
            )}
          >
            <span className="font-semibold leading-loose">
              Discover More Stories
            </span>
            <IconArrowRight />
          </button>
        </div>
      )}
    </Container>
  );
};

export default HomePosts;
