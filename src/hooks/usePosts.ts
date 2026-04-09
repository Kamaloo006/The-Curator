import { useState, useEffect } from "react"
import type {Post} from '../types/Post';
import { getPosts } from "../services/api/posts";

export const usePosts = () =>{

const [isLoading, setIsLoading] = useState(false);
const [posts, setPosts] = useState<Post[]>([]);
const [error, setError] = useState();
    useEffect(()=> {
        setIsLoading(true);
        getPosts()
        .then((data) => setPosts(data))
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    } ,[])


return {posts, isLoading, error};
}