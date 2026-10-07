import { Router } from "express";
import PostController from "./post.controller.js";

const studioRouter = Router();
const viewRouter = Router();

studioRouter.post("/post", PostController.createPost);
studioRouter.get("/posts/:postId", PostController.getPost);
studioRouter.delete("/posts/:userId/:postId", PostController.deletePost);

viewRouter.get("/:postId", PostController.getPost);
viewRouter.get("/", PostController.getAllPosts);

// postRouter.get("/post/:userId", PostController.getPost);
export { studioRouter, viewRouter };
