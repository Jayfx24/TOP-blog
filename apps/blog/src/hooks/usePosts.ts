import type { PostsWithAuthor } from "@blog/lib";
import { useEffect, useState } from "react";
import { blogService } from "../blogService";

export function usePosts() {
  const [posts, setPosts] = useState<PostsWithAuthor[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { posts, isLoading };
}
