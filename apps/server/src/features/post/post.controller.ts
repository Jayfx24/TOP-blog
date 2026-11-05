import { type NextFunction, type Request, type Response } from "express";
import PostService from "./post.service.js";
import UnauthorizedError from "#errors/UnauthorizedError.js";

async function createPost(req: Request, res: Response, next: NextFunction) {
  const authorId = req.user?.id;

  if (!authorId) return next(new UnauthorizedError("Access denied"));

  const payload = {
    ...req.body,
    authorId,
  };
  const response = await PostService.createPost(payload);
  return res.status(201).json({
    ...response,
  });
}

async function updatePost(req: Request, res: Response) {
  const payload = {
    ...req.body,
    id: req.params?.postId,
  };
  const newPost = await PostService.updatePost(payload);
  return res.status(201).json({
    data: newPost,
  });
}

async function getPublicPost(req: Request, res: Response) {
  const post = await PostService.getPublicPost(req.params.id as string);
  return res.json({
    ...post,
  });
}
async function getPublicPosts(req: Request, res: Response) {
  const lastPostId = req.query.lastPostId as string;

  const posts = await PostService.getPublicPosts(lastPostId);
  return res.json({
    posts,
  });
}

// studio

async function getUserPosts(req: Request, res: Response) {
  const userId = Number(req.user?.id);

  console.log(`userId : ${userId}`);
  const posts = await PostService.getUserPosts(userId);
  console.log(`posts : ${posts}`);

  return res.json(posts);
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
  getPublicPost,
  getPublicPosts,
  getUserPost,
  getUserPosts,
  deletePost,
};

export default PostController;
