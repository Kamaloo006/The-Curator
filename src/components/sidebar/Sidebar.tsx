import { usePosts } from "../../hooks/usePosts";
import TrendingNow from "./TrendingNow";
import PopularTags from "./PopularTags";
import WeeklyDigest from "./WeeklyDigest";
import WhoToFollow from "./WhoToFollow";

const Sidebar = () => {
  const { posts } = usePosts();

  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="sticky top-24">
        <TrendingNow posts={posts} />
        <PopularTags />
        <WeeklyDigest />
        <WhoToFollow />
      </div>
    </aside>
  );
};

export default Sidebar;
