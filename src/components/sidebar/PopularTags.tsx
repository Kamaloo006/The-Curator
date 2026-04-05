import clsx from "clsx";
import { useThemeContext } from "../../context/ThemeContext";

interface Tag {
  name: string;
  count?: number;
}

interface PopularTagsProps {
  tags?: Tag[];
}

const PopularTags = ({
  tags = [
    { name: "Typography", count: 24 },
    { name: "Sustainability", count: 18 },
    { name: "Product Design", count: 15 },
    { name: "AI Ethics", count: 12 },
    { name: "Future of Work", count: 9 },
  ],
}: PopularTagsProps) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

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
        Popular Tags
      </h3>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.name}
            className={clsx(
              "px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer",
              isDark
                ? "bg-[#2C2B2B] text-gray-300 hover:bg-[#3C3B3B]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
