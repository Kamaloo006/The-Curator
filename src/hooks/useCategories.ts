import { useEffect, useState } from "react";
import type { CategoryProps } from "../services/api/categories";
import { getCategories } from "../services/api/categories";

export const useCategories = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(()=>{
        setIsLoading(true);
        getCategories()
        .then((data) => setCategories(data))
        .catch(() =>{})
        .finally(() => setIsLoading(false));
    },[])

    return {categories, isLoading};
}

