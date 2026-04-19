import type { CategoryProps } from "../services/api/categories";
import { getCategories } from "../services/api/categories";
import { useQuery } from "@tanstack/react-query";


export const useCategories =() => {
    const {data: categories = [], isLoading, error} = useQuery<CategoryProps[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 1000 * 5 * 60 , 
    }) 

    return {categories, isLoading, error};
}

