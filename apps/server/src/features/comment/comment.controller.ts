import { type Request, type Response } from "express";
import CommentService from "./comment.service.js";

async function createComment(req: Request, res: Response) {
  const newComment = await CommentService.createComment(req.body);
  return res.status(201).json({
    data: newComment,
  });
}
async function getComment(req: Request, res: Response) {
  const Comment = await CommentService.getComment(Number(req.params?.id));
  return res.json({
    data: Comment,
  });
}
async function getAllComments(req: Request, res: Response) {
  const lastCommentId = Number(req.query?.lastCommentId);
  const Comment = await CommentService.getAllComments(lastCommentId);
  return res.json({
    data: Comment,
  });
}

async function getUserComments(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  const Comment = await CommentService.getUserComments(userId);
  return res.json({
    data: Comment,
  });
}

async function deleteComment(req: Request, res: Response) {
  /**
   *  Ensure to check if user has the permission to delete and Comment belongs to user
   */
  const CommentId = Number(req.params.commentId);
  const userId = Number(req.params.userId);
  await CommentService.deleteComment(userId, CommentId);
  return res.status(204);
}

const CommentController = {
  createComment,
  getComment,
  getAllComments,
  getUserComments,
  deleteComment

};

export default CommentController;
