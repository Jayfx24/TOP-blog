import { api } from "@blog/features";
import type { Post, PostsWithAuthor, TCommentInput } from "@blog/lib";

const getPosts = async () => {
  const { data } = await api.get<PostsWithAuthor[]>("/all");
  return data;
};

const getPost = async (id: Post["id"]) => {
  // post with comment
  const { data } = await api.get<PostsWithAuthor>(`/${id}`);
  return data;
};

const postComment = async (payload: TCommentInput) => {
  const { data } = await api.post(`/comment}`, payload);
  return data;
};

export const blogService = {
  getPosts,
  getPost,
  postComment,
};
