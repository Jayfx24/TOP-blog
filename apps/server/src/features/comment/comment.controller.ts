import { type Request, type Response } from "express";
import CommentService from "./comment.service.js";

async function createComment(req: Request, res: Response) {
  const newComment = await CommentService.createComment(req.body);
  return res.status(201).json({
    data: newComment,
  });
}
async function getComment(req: Request, res: Response) {
  const Comment = await CommentService.getComment(String(req.params?.id));
  return res.json({
    data: Comment,
  });
}
async function getAllComments(req: Request, res: Response) {
  const lastCommentId = String(req.query?.lastCommentId);
  const Comment = await CommentService.getAllComments(lastCommentId);
  return res.json({
    data: Comment,
  });
}

async function updateComment(req: Request, res: Response) {
  const newComment = await CommentService.updateComment(req.body);
  return res.status(201).json({
    data: newComment,
  });
}
// async function getUserComments(req: Request, res: Response) {
//   const userId = Number(req.params.userId);
//   const Comment = await CommentService.getUserComments(userId);
//   return res.json({
//     data: Comment,
//   });
// }

async function deleteComment(req: Request, res: Response) {
  /**
   *  Ensure to check if user has the permission to delete and Comment belongs to user
   */
  const CommentId = String(req.params.commentId);
  await CommentService.deleteComment(CommentId);
  return res.status(204);
}

const CommentController = {
  createComment,
  getComment,
  getAllComments,
  // getUserComments,
  deleteComment,
  updateComment,
};

export default CommentController;
