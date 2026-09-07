import { type Request, type Response } from "express";
import CommentService from "./CommentService.js";

export class CommentController {
  static async createComment(req: Request, res: Response) {
    const newComment = await CommentService.createComment(req.body);
    return res.status(201).json({
      data: newComment,
    });
  }
  static async getComment(req: Request, res: Response) {
    const Comment = await CommentService.getComment(Number(req.params?.id));
    return res.json({
      data: Comment,
    });
  }
  static async getAllComments(req: Request, res: Response) {
    const lastCommentId = Number(req.query?.lastCommentId);
    const Comment = await CommentService.getAllComments(lastCommentId);
    return res.json({
      data: Comment,
    });
  }

  static async getUserComments(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const Comment = await CommentService.getUserComments(userId);
    return res.json({
      data: Comment,
    });
  }

  static async deleteComment(req: Request, res: Response) {
    /**
     *  Ensure to check if user has the permission to delete and Comment belongs to user
     */
    const CommentId = Number(req.params.commentId);
    const userId = Number(req.params.userId);
    await CommentService.deleteComment(userId,CommentId);
    return res.status(204);
  }
}