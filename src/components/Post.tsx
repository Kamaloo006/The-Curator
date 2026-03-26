import { useEffect, useRef, useState } from "react";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const Post = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchedPosts = async () => {
      setIsLoading(true);

      try {
        await axios.get(`${BASE_URL}/posts`).then(function (response) {
          console.log(response.data.data);
          setPosts(response.data.data);
        });
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchedPosts();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       await axios.get(`${BASE_URL}/posts`).then(function (response) {
  //         setPosts(response.data);
  //       });
  //     } catch (e: any) {
  //       setError(e);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // setIsLoading(false);

  // const abortControllerRef = useRef<AbortController | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     abortControllerRef.current?.abort();
  //     abortControllerRef.current = new AbortController();

  //     setIsLoading(true);

  //     try {
  //       const response = await fetch(`${BASE_URL}/posts?=${page}`, {
  //         signal: abortControllerRef.current?.signal,
  //       });
  //       const posts = (await response.json()) as Post[];
  //       setPosts(posts);
  //     } catch (e: any) {
  //       if (e.name === "AbortError") {
  //         console.log("aborted");
  //         return;
  //       }
  //       setError(e);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (isLoading) return <div>Loading...</div>;
  if (posts.length === 0) return <div>No Posts Yet</div>;
  // if (error) return <div>error happened please try again later</div>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">
        Blog Posts
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>

            {/* Content */}
            <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

            {/* Author */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                ✍️ {post.author || "Unknown"}
              </span>

              <button className="text-blue-500 hover:underline text-sm">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
