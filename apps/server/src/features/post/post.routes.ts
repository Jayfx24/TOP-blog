import { Router } from "express";
import PostController from "./post.controller.js";

const studioRouter = Router();
const viewRouter = Router();

studioRouter.post("/new", PostController.createPost);

// get user posts
studioRouter.get("/:postId", PostController.getUserPost);
studioRouter.delete("/:userId/:postId", PostController.deletePost); //TODO: confirm user with authorization


studioRouter.get("/", PostController.getUserPosts);

viewRouter.get("/:postId", PostController.getPost);
viewRouter.get("/", PostController.getAllPosts);

// postRouter.get("/post/:userId", PostController.getPost);
export { studioRouter, viewRouter };
