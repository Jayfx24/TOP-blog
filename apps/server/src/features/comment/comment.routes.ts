import { Router } from "express";
import CommentController from "./comment.controller.js";

const CommentRouter = Router();

CommentRouter.post("/comment", CommentController.createComment);
CommentRouter.get("/:commentId", CommentController.getComment);

// CommentRouter.get("/:userId/comment", CommentController.getComment);
CommentRouter.delete("/:userId/:commentId", CommentController.getComment);

CommentRouter.get("/", CommentController.getAllComments);
