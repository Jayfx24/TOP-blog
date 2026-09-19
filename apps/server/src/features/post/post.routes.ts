
import { Router } from "express";
import PostController  from "./post.controller.js";

const postRouter = Router();

postRouter.post("/post", PostController.createPost);
postRouter.get("/:postId", PostController.getPost);

// postRouter.get("/post/:userId", PostController.getPost);
postRouter.delete("/:userId/:postId", PostController.getPost);

postRouter.get("/", PostController.getAllPosts);
