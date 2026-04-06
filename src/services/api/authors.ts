import type { Author } from "../../types/Author";
import { apiClient } from "./client";

interface ApiResponse {
    data?: Author[];
    authors?: Author[];
}

export const getAuthors = async (): Promise<Author[]> => {
    const response = await apiClient.get<ApiResponse | Author[]>('/authors');
    const payload = response.data;

    if (Array.isArray(payload)) {
        return payload;
    }

    if (Array.isArray(payload?.data)) {
        return payload.data;
    }

    if (Array.isArray(payload?.authors)) {
        return payload.authors;
    }

    return [];
}