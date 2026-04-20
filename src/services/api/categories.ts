import { apiClient } from "./client";

export interface CategoryProps{
    id?: number;
    name:string;
}

interface ApiResponse {
    data?: CategoryProps[];
    categories?: CategoryProps[];
}


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
