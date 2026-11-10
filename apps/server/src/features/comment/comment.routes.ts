import { Router } from "express";
import CommentController from "./comment.controller.js";

export const CommentRouter = Router();

CommentRouter.post("/new", CommentController.createComment);
CommentRouter.post("/update", CommentController.updateComment);
CommentRouter.get("/:commentId", CommentController.getComment);

// CommentRouter.get("/:userId/comment", CommentController.getComment);
// CommentRouter.delete("/:userId/:commentId", CommentController.getComment);

// CommentRouter.get("/", CommentController.getAllComments);

// export CommentRouter