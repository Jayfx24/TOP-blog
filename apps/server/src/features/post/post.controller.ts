import { type Request, type Response } from "express";
import PostService from "./post.service.js";

async function createPost(req: Request, res: Response) {
  const payload = {
    ...req.body,
    authorId: req.user?.id,
  };
  const response = await PostService.createPost(payload);
  return res.status(201).json({
    ...response,
  });
}

async function updatePost(req: Request, res: Response) {
  const payload = {
    ...req.body,
    id: req.params?.id,
  };
  const newPost = await PostService.updatePost(payload);
  return res.status(201).json({
    data: newPost,
  });
}

async function getPost(req: Request, res: Response) {
  const post = await PostService.getPost(req.params.id as string);
  return res.json({
    ...post,
  });
}
async function getPublicPosts(req: Request, res: Response) {
  const lastPostId = req.query.lastPostId as string;

  const post = await PostService.getAllPosts(lastPostId);
  return res.json({
    ...post,
  });
}

// studio

async function getUserPosts(req: Request, res: Response) {
  const userId = Number(req.user?.id);
  const post = await PostService.getUserPosts(userId);
  return res.json({
    ...post,
  });
}

async function getUserPost(req: Request, res: Response) {
  const userId = Number(req.user?.id);
  const postId = req.params.postId as string;

  const post = await PostService.getUserPost(userId, postId);
  return res.json({
    ...post,
  });
}

async function deletePost(req: Request, res: Response) {
  /**
   *  Ensure to check if user has the permission to delete and post belongs to user
   */
  const postId = req.params.postId as string;
  const userId = Number(req.params.userId);
  await PostService.deletePost(userId, postId);
  return res.status(204);
}

const PostController = {
  createPost,
  updatePost,
  getPost,
  getPublicPosts,
  getUserPost,
  getUserPosts,
  deletePost,
};

export default PostController;
