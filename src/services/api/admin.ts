import { apiClient } from "./client";

export interface AdminCategory {
  id: number;
  name: string;
}

export interface MutationProps{
  postId:number;
  action: "approve" | "reject";
}

export interface PendingPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  status?: string;
  category?: string | null;
  author: string;
  createdAt?: string;
}

interface PendingPostsResponseItem {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  author_avatar: string | null;
  date: string;
  likes_count: number | null;
  category: string | null;
}

interface PendingPostsResponse {
  data: PendingPostsResponseItem[];
}

interface ApiListResponse<T> {
  data?: T[];
  categories?: T[];
  posts?: T[];
}

const authHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


// clean up function for ensuring the data coming from the backend is in the expected format and to prevent runtime errors due to unexpected data shapes.
// It also abstracts away the parsing logic from the main API functions,
// making them cleaner and more focused on their primary tasks.
const parseCategory = (item: unknown): AdminCategory | null => {
  if (!item || typeof item !== "object") return null;

  const raw = item as Record<string, unknown>;
  const id = Number(raw.id);
  const name = typeof raw.name === "string" ? raw.name : null;

  if (!Number.isFinite(id) || !name) return null;

  return { id, name };
};


const toList = <T,>(payload: ApiListResponse<T> | T[] | undefined): T[] => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.categories)) return payload.categories;
  if (Array.isArray(payload.posts)) return payload.posts;
  return [];
};

export const getAdminCategories = async (
  token: string,
): Promise<AdminCategory[]> => {
  const response = await apiClient.get<ApiListResponse<unknown> | unknown[]>(
    "/categories",
    authHeader(token),
  );

  return toList(response.data)
    .map(parseCategory)
    .filter((category): category is AdminCategory => Boolean(category));
};

export const createCategory = async (
  token: string,
  name: string,
): Promise<AdminCategory | null> => {
  const response = await apiClient.post<
    { category?: unknown; data?: unknown } | unknown
  >(
    "/categories",
    { name },
    authHeader(token),
  );

  const payload = response.data;

  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const obj = payload as Record<string, unknown>;
    return parseCategory(obj.category ?? obj.data ?? obj);
  }

  return null;
};

export const deleteCategory = async (
  token: string,
  categoryId: number,
): Promise<void> => {
  await apiClient.delete(`/categories/${categoryId}`, authHeader(token));
};

export const getPendingPosts = async (token: string): Promise<PendingPost[]> => {
  const response = await apiClient.get<PendingPostsResponse>(
    "/posts/pending",
    authHeader(token),
  );

  return response.data.data.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    image: post.image,
    author: post.author,
    category: post.category,
    createdAt: post.date,
  }));
};

export const approvePendingPost = async (
  token: string,
  postId: number,
): Promise<void> => {
  await apiClient.patch(`/posts/${postId}/approve`, {}, authHeader(token));
};

export const rejectPendingPost = async (
  token: string,
  postId: number,
): Promise<void> => {
  await apiClient.patch(`/posts/${postId}/reject`, {}, authHeader(token));
};
