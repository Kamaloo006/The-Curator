import { apiClient } from "./client";

export interface CategoryProps{
    id?: number;
    name:string;
}

interface ApiResponse {
    data?: CategoryProps[];
    categories?: CategoryProps[];
}


/*
{
  "category_posts": [
    {
      "id": 10,
      "title": "King of wings",
      "content": "kaslksflkdlfkrkgorkgotkgttgktkgrtogkortgotrgtrogkortkgktrgkotrkgotrkgkrtokg",
      "image": "http://127.0.0.1:8000/storage/images/HWihn6E1UIHcxBFPMRHlFMuO6yRHkcnsJSeGH3SV.jpg",
      "author": "Mazen",
      "author_avatar": "http://127.0.0.1:8000/storage/avatars/DAiTvDyqV33OOV4DjoLCnbKHdl8JjOprzhNsUM2M.jpg",
      "date": "2026-04-10T20:38:20.000000Z",
      "likes_count": null,
      "category": "Jobs"
    }
  ]
}
*/

export const getCategories = async(): Promise<CategoryProps[]> => {
    const response = await apiClient.get<ApiResponse>('/categories');
    const payload = response.data;

    if(Array.isArray(payload)){
        return payload;
    }
    

    if(Array.isArray(payload?.data)){
        return payload.data;
    }

    if(Array.isArray(payload?.categories)){
        return payload.categories;
    }

    return [];

}
