import { type Request, type Response } from "express";
import PostService from "./PostService.js";
import type { PostBase, PostCreateInput } from "./postSchemas.js";
export class PostController {
  static async createPost(
    req: Request<PostCreateInput>,
    res: Response<PostBase>,
  ) {
    const newPost = await PostService.createPost(req.body);
    return res.status(201).json({
      ...newPost,
    });
  }

  static async updatePost(req: Request, res: Response) {
    const data = {
      id: Number(req.params?.id),
      ...req.body,
    };
    const newPost = await PostService.updatePost(data);
    return res.status(201).json({
      data: newPost,
    });
  }

  static async getPost(req: Request, res: Response) {
    const post = await PostService.getPost(Number(req.params?.id));
    return res.json({
      ...post,
    });
  }
  static async getAllPosts(req: Request, res: Response) {
    const lastPostId = Number(req.query?.lastPostId);
    const post = await PostService.getAllPosts(lastPostId);
    return res.json({
      ...post,
    });
  }

  static async getUserPosts(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const post = await PostService.getUserPosts(userId);
    return res.json({
      ...post,
    });
  }

  static async deletePost(req: Request, res: Response) {
    /**
     *  Ensure to check if user has the permission to delete and post belongs to user
     */
    const postId = Number(req.params.postId);
    const userId = Number(req.params.userId);
    await PostService.deletePost(userId, postId);
    return res.status(204);
  }
}
