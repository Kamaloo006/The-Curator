import { Avatar, Badge, Card, Group, Image } from "@mantine/core";
import { useThemeContext } from "../../context/ThemeContext";
import type { Post } from "../../types/Post";
import clsx from "clsx";
import { Link } from "react-router-dom";
interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { theme } = useThemeContext();

  return (
    <Link to={`/posts/${post.id}`}>
      <Card
        padding="lg"
        radius="md"
        className={clsx(
          "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        )}
        bg={theme === "light" ? "white" : "#1c1b1b"}
      >
        {/* IMAGE */}
        <Card.Section mb="md">
          <Image
            src={post.image}
            loading="lazy"
            alt="post"
            className="h-45 sm:h-50 object-cover"
          />
        </Card.Section>

        {/* CATEGORY + READ TIME */}
        <div className="flex items-center gap-2 mb-2">
          <Badge
            color="#8C9EFF"
            variant={theme === "dark" ? "light" : "outline"}
          >
            {post.category}
          </Badge>

          <span className="text-xs font-semibold text-gray-500 uppercase">
            {Math.floor(Math.random() * 16)} min read
          </span>
        </div>

        {/* TITLE */}
        <h2
          className={clsx(
            "text-base sm:text-lg font-bold leading-snug cursor-pointer transition",
            {
              "text-[#1C1B1B] hover:text-[#1C2AC8]": theme === "light",
              "text-[#eee]": theme === "dark",
            },
          )}
        >
          {post.title}
        </h2>

        {/* DESCRIPTION */}
        <p
          className={clsx("text-sm mt-2 line-clamp-3", {
            "text-gray-700": theme === "light",
            "text-gray-400": theme === "dark",
          })}
        >
          {post.content}
        </p>

        {/* FOOTER */}
        <Group mt="md">
          <Avatar src={post.author_avatar} radius="xl" />

          <div>
            <h2
              color="white"
              className={clsx({
                "text-black": theme === "light",
                "text-white": theme === "dark",
              })}
            >
              {post.author}
            </h2>

            <span className="text-xs text-gray-500">
              {post.likes_count} liked this post
            </span>
          </div>
        </Group>
      </Card>
    </Link>
  );
}
