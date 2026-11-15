import type { Post, PostsWithAuthor, PostsWithAuthorAndComment, TCommentInput } from "@blog/lib";
import { blogAPI } from "./config/api";

const getPosts = async () => {
  const { data } = await blogAPI.get<PostsWithAuthor[]>("/posts");
  console.log('services: ',data)
  return data;
};

const getPost = async (id: Post["id"]) => {
  const { data } = await blogAPI.get<PostsWithAuthorAndComment>(`/posts/${id}`);
  return data;
};

const postComment = async (payload: TCommentInput) => {
  const { data } = await blogAPI.post(`/comments/new`, payload);
  return data;
};

export const blogService = {
  getPosts,
  getPost,
  postComment,
};
