import { useState, useEffect } from "react"
import type {Author} from '../types/Author';
import { getAuthors } from "../services/api/authors";

export const useAuthors = () =>{

const [isLoading, setIsLoading] = useState(false);
const [authors, setAuthors] = useState<Author[]>([]);
    useEffect(()=> {
        setIsLoading(true);
        getAuthors()
        .then((data) => setAuthors(data))
        .catch(() => {})
        .finally(() => setIsLoading(false));
    } ,[])


return {authors, isLoading};
}