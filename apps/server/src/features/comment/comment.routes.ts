import { Router } from "express";
import CommentController from "./comment.controller.js";

export const commentRouter = Router();

commentRouter.post("/new", CommentController.createComment);
commentRouter.post("/update", CommentController.updateComment);
commentRouter.get("/:commentId", CommentController.getComment);

// CommentRouter.get("/:userId/comment", CommentController.getComment);
// CommentRouter.delete("/:userId/:commentId", CommentController.getComment);

// CommentRouter.get("/", CommentController.getAllComments);

// export CommentRouter