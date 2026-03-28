import { apiClient } from "./client";
import type { Post } from "../../types/Post";

interface ApiResponse {
  data: Post[];
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<ApiResponse>("/posts");
  return response.data.data;
};