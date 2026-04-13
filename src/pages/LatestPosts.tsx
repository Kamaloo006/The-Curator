import Navbar from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { Container, Loader } from "@mantine/core";
import { useThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import PostCardHorizontal from "../components/ui/PostCardHorizontal";
import { useCategoryPosts, usePosts } from "../hooks/usePosts";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";
import useAOS from "../hooks/useAOS";

const LatestPosts = () => {
  const { theme } = useThemeContext();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const { posts, isLoading } = usePosts();
  const {
    categoryPosts,
    loading: isCategoryLoading,
    error: categoryError,
  } = useCategoryPosts(selectedCategoryId);

  useAOS();
  const filtered = selectedCategoryId !== null;
  const shownPosts = filtered ? categoryPosts : posts;
  const safeShownPosts = Array.isArray(shownPosts) ? shownPosts : [];
  console.log(safeShownPosts);
  const shownLoading = filtered ? isCategoryLoading : isLoading;

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
              "text-3xl md:text-4xl text-[#4551d7] font-extrabold tracking-tight leading-tight mb-2",
              {
                "": theme === "light",
                "text-[#1C2AC8]": theme === "dark",
              },
            )}
          >
            Latest Insights
          </h1>
          <p className="w-125 text-gray-500 mb-8">
            Refined perspective on culture, design, and the digital frontier.
            Curated daily by our global editorial collective.
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Posts Section */}
            <div className="flex-1 min-w-0">
              {shownLoading ? (
                <Loader color="#1C2AC8" className="mt-10" />
              ) : (
                <div className="flex flex-col">
                  {safeShownPosts.map((post) => (
                    <PostCardHorizontal
                      post={post}
                      key={post.id}
                      data-aos="fade-up"
                      data-aos-delay="150"
                    />
                  ))}

                  {filtered && !shownLoading && safeShownPosts.length === 0 && (
                    <p className="text-sm text-gray-500 mt-4">
                      No posts found for this category.
                    </p>
                  )}

                  {filtered && Boolean(categoryError) && (
                    <p className="text-sm text-red-500 mt-4">
                      Failed to load category posts.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Section */}
            {!shownLoading && (
              <Sidebar
                selectedCategoryId={selectedCategoryId}
                onCategorySelect={setSelectedCategoryId}
              />
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default LatestPosts;
