import { z } from "zod";

export const PostCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  image: z.string(),
  author: z.string(),
  created_at: z.string(),
  category: z.string().nullable().optional(),
  categories: z.array(PostCategorySchema),
  likes_count: z.number().nullable().optional(),
  author_avatar: z.string(),
  status: z.enum(["published", "draft", "archived", "pending"]),
});

export type Post = z.infer<typeof PostSchema>;