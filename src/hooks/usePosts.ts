import { useState, useEffect } from "react";
import type { Post } from "../types/Post";
import { getCategoryPosts, getPosts } from "../services/api/posts";

export const usePosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setIsLoading(true);
        getPosts()
            .then((data) => setPosts(data))
            .catch((e) => setError(e))
            .finally(() => setIsLoading(false));
    }, []);

    return { posts, isLoading, error };
};

export const useCategoryPosts = (categoryId: number | null) => {
    const [loading, setLoading] = useState(false);
    const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (categoryId === null) {
            setCategoryPosts([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        getCategoryPosts(categoryId)
            .then((data) => setCategoryPosts(data))
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    }, [categoryId]);

    return { categoryPosts, loading, error };
};