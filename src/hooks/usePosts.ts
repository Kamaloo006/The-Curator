import type { Post } from "../types/Post";
import { getCategoryPosts, getPosts, getUserPosts } from "../services/api/posts";
import { useQuery } from "@tanstack/react-query";



export const usePosts = () => {
    const {data: posts = [],isLoading, error} = useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn: getPosts,
        staleTime: 1000 * 5 * 60 , 
    })
    return {posts, isLoading, error};
}

export const useCategoryPosts = (categoryId:number | null) => {
    const {data:categoryPosts = [], isLoading, error} = useQuery<Post[]>({
        queryKey:['categoryPosts', categoryId], 
        queryFn: () => {
            if(categoryId !== null)
            return getCategoryPosts(categoryId)
            return Promise.resolve([])
        },
        enabled: categoryId !== null,
        staleTime: 1000 * 5 * 60 ,
    })

    return {categoryPosts, isLoading, error};
}




export const useUserPosts = (user_id:number) => {
    const {data:userPosts = [], isLoading, error} = useQuery<Post[]>({
        queryKey: ['userPosts', user_id],
        queryFn: () => getUserPosts(user_id),
        staleTime: 1000 * 5 * 60 ,
    })
    return {userPosts, isLoading, error};
}