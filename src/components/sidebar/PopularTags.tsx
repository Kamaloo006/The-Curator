import clsx from "clsx";
import { useThemeContext } from "../../context/ThemeContext";
import { useCategories } from "../../hooks/useCategories";
import { Loader } from "@mantine/core";

interface PopularTagsProps {
  selectedCategoryId: number | null;
  onCategorySelect: (categoryId: number | null) => void;
}

const PopularTags = ({
  selectedCategoryId,
  onCategorySelect,
}: PopularTagsProps) => {
  const { categories, isLoading } = useCategories();
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
        Popular Categories
      </h3>

      {isLoading ? (
        <Loader color="#6B7280" />
      ) : (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategorySelect(null)}
            className={clsx(
              "px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer",
              selectedCategoryId === null
                ? "bg-[#1C2AC8] text-white"
                : isDark
                  ? "bg-[#2C2B2B] text-gray-300 hover:bg-[#3C3B3B]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            All
          </button>

          {(Array.isArray(categories) ? categories : []).map((category) => (
            <button
              onClick={() =>
                onCategorySelect(
                  typeof category.id === "number" ? category.id : null,
                )
              }
              key={category.name}
              className={clsx(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer",
                selectedCategoryId === category.id
                  ? "bg-[#1C2AC8] text-white"
                  : isDark
                    ? "bg-[#2C2B2B] text-gray-300 hover:bg-[#3C3B3B]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularTags;
