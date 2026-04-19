import { usePosts } from "../../hooks/usePosts";
import TrendingNow from "./TrendingNow";
import PopularTags from "./PopularTags";
import WeeklyDigest from "./WeeklyDigest";
import WhoToFollow from "./WhoToFollow";

interface SidebarProps {
  selectedCategoryId: number | null;
  onCategorySelect: (categoryId: number | null) => void;
}

const Sidebar = ({ selectedCategoryId, onCategorySelect }: SidebarProps) => {
  const { posts } = usePosts();

  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="sticky top-24">
        <TrendingNow posts={posts ?? []} />
        <PopularTags
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={onCategorySelect}
        />
        <WeeklyDigest />
        <WhoToFollow />
      </div>
    </aside>
  );
};

export default Sidebar;
