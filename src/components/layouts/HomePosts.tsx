import { Container, Loader } from "@mantine/core";
import { PostCard } from "../ui/PostCard";
import { useThemeContext } from "../../context/ThemeContext";
import clsx from "clsx";
import { usePosts } from "../../hooks/usePosts";

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default HomePosts;
