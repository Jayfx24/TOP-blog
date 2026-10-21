import { Router } from "express";
import PostController from "./post.controller.js";

const studioRouter = Router();
const viewRouter = Router();

studioRouter.post("/new", PostController.createPost);
studioRouter.get("/:postId", PostController.getUserPost);
studioRouter.patch("/:postId", PostController.updatePost);
studioRouter.delete("/:userId/:postId", PostController.deletePost); //TODO: confirm user with authorizatio
studioRouter.get("/", PostController.getUserPosts);

viewRouter.get("/:postId", PostController.getPost);
viewRouter.get("/", PostController.getPublicPosts);

// postRouter.get("/post/:userId", PostController.getPost);
export { studioRouter, viewRouter };
