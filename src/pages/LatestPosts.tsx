import Navbar from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { Container, Loader } from "@mantine/core";
import { useThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import PostCardHorizontal from "../components/ui/PostCardHorizontal";
import { usePosts } from "../hooks/usePosts";

const LatestPosts = () => {
  const { theme } = useThemeContext();
  const { posts, isLoading } = usePosts();
  return (
    <div
      className={clsx({
        "bg-[#242424]": theme === "dark",
        "bg-[#FBF8F7]": theme === "light",
      })}
    >
      <Navbar />

      <div>
        <Container size={1232} className="py-22.5 px-4 md:px-8">
          <h1
            className={clsx(
              "text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2",
              {
                "text-[#1C2AC8]": theme === "light",
                "text-[#8C9EFF]": theme === "dark",
              },
            )}
          >
            Latest Insights
          </h1>
          <p className="w-125 text-gray-500">
            Refined perspective on culture, design, and the digital frontier.
            Curated daily by our global editorial collective.
          </p>

          {isLoading ? (
            <Loader color="#1C2AC8" className="mt-10" />
          ) : (
            <div className="flex flex-col">
              {posts.map((post) => (
                <PostCardHorizontal post={post} key={post.id} />
              ))}
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default LatestPosts;
