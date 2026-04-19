import type {Author} from '../types/Author';
import { getAuthors } from "../services/api/authors";
import { useQuery } from "@tanstack/react-query";

export const useAuthors = () => {
    const {data:authors = [], isLoading} = useQuery<Author[]>({
        queryKey:["authors"],
        queryFn: getAuthors,
        staleTime: 1000 * 5 * 60 ,
    })

    return {authors, isLoading};
}