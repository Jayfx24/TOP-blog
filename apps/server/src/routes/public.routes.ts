import { commentRouter } from "../features/comment/comment.routes.js";
import { PublicPostRouter } from "../features/post/post.routes.js";
import { Router } from "express";

export const publicRouter = Router();

publicRouter.use("/comments", commentRouter);
publicRouter.use("/posts", PublicPostRouter );
