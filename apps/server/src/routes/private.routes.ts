import { commentRouter } from "../features/comment/comment.routes.js";
import { studioRouter } from "../features/post/post.routes.js";
import { Router } from "express";

export const privateRouter = Router();

privateRouter.use("/comments", commentRouter);
privateRouter.use("/posts", studioRouter);
