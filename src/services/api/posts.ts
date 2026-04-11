import { apiClient } from "./client";
import type { Post } from "../../types/Post";

interface ApiResponse {
  data: Post[];
}

interface CreatePostPayload {
  title: string;
  content: string;
  image?: File | null;
  status?: "draft" | "pending" | "published" | "archived";
}

interface CreatePostResponse {
  id?: number;
  post?: { id?: number };
  data?: { id?: number };
  message?: string;
}

interface SubmitReviewResponse {
  message?: string;
}

interface AddCategoryResponse {
  message?: string;
}

const authHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const extractPostId = (payload: CreatePostResponse): number | null => {
  const id = payload.id ?? payload.post?.id ?? payload.data?.id;
  return typeof id === "number" ? id : null;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<ApiResponse>("/posts");
  return response.data.data;
};

export const saveDraftPost = async (
  token: string,
  payload: CreatePostPayload,
): Promise<number> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  formData.append("status", payload.status ?? "draft");

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const response = await apiClient.post<CreatePostResponse>("/posts", formData, {
    ...authHeader(token),
    headers: {
      ...authHeader(token).headers,
      "Content-Type": "multipart/form-data",
    },
  });

  const createdId = extractPostId(response.data);

  if (!createdId) {
    throw new Error("Could not detect created post id from API response.");
  }

  return createdId;
};

export const submitPostReview = async (
  token: string,
  postId: number,
): Promise<string> => {
  const response = await apiClient.post<SubmitReviewResponse>(
    `/posts/${postId}/submit_review`,
    {},
    authHeader(token),
  );

  return response.data.message ?? "Post submitted for admin review.";
};

export const addCategoryToPost = async (
  token: string,
  postId: number,
  categoryId: number,
): Promise<string> => {
  const response = await apiClient.post<AddCategoryResponse>(
    `/posts/${postId}/categories`,
    { category_id: categoryId },
    authHeader(token),
  );

  return response.data.message ?? "Category added to post.";
};

export const sumbitPost = async (token: string, postId: number): Promise<string> => {
  return submitPostReview(token, postId);
};


export const getCategoryPosts = async (categoryId:number): Promise<Post[]> =>{
  const response = await apiClient.get<ApiResponse>(`/categories/${categoryId}/posts`);
  const payload = response.data as ApiResponse & { category_posts?: Post[] };

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.category_posts)) {
    return payload.category_posts;
  }

  return [];
}

