import { useState } from "react";
import clsx from "clsx";
import { useThemeContext } from "../../context/ThemeContext";
import { Avatar } from "@mantine/core";

interface Author {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface WhoToFollowProps {
  authors?: Author[];
}

const WhoToFollow = ({
  authors = [
    {
      id: "1",
      name: "Lina Chang",
      role: "Design Critic",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=LinaChang",
    },
    {
      id: "2",
      name: "Oliver Smith",
      role: "Tech Lead",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=OliverSmith",
    },
  ],
}: WhoToFollowProps) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  const toggleFollow = (id: string) => {
    const newFollowed = new Set(followedUsers);
    if (newFollowed.has(id)) {
      newFollowed.delete(id);
    } else {
      newFollowed.add(id);
    }
    setFollowedUsers(newFollowed);
  };

  return (
    <div
      className={clsx(
        "rounded-2xl p-6",
        isDark ? "bg-[#1C1B1B]" : "bg-white border border-gray-200",
      )}
    >
      <h3
        className={clsx(
          "text-lg font-bold mb-4",
          isDark ? "text-white" : "text-gray-900",
        )}
      >
        Who to follow
      </h3>

      <div className="space-y-4">
        {authors.map((author) => (
          <div key={author.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Avatar
                src={author.image}
                name={author.name}
                size="md"
                radius="xl"
              />
              <div className="flex-1 min-w-0">
                <h4
                  className={clsx(
                    "text-sm font-semibold",
                    isDark ? "text-white" : "text-gray-900",
                  )}
                >
                  {author.name}
                </h4>
                <p
                  className={clsx(
                    "text-xs",
                    isDark ? "text-gray-500" : "text-gray-500",
                  )}
                >
                  {author.role}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleFollow(author.id)}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ml-2",
                followedUsers.has(author.id)
                  ? isDark
                    ? "bg-[#2C2B2B] text-gray-300"
                    : "bg-gray-200 text-gray-700"
                  : "bg-[#1C2AC8] text-white hover:bg-[#151CA0]",
              )}
            >
              {followedUsers.has(author.id) ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;
