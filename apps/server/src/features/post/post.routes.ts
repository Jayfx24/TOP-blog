import { Router } from "express";
import PostController from "./post.controller.js";
import validateSchema from "#features/auth/validateSchema.js";
import { ZPostUpdatePayload, ZPostCreatePayload } from "@blog/lib";
const studioRouter = Router();
const viewRouter = Router();

studioRouter.post(
  "/new",
  validateSchema(ZPostCreatePayload),
  PostController.createPost,
);
studioRouter.get("/:postId", PostController.getUserPost);
studioRouter.patch(
  "/:postId/update",
  validateSchema(ZPostUpdatePayload),
  PostController.updatePost,
);
studioRouter.delete("/:userId/:postId", PostController.deletePost); //TODO: confirm user with authorizatio
studioRouter.get("/", PostController.getUserPosts);

// VIEWSk
viewRouter.get("/:postId", PostController.getPost);
viewRouter.get("/", PostController.getPublicPosts);

// postRouter.get("/post/:userId", PostController.getPost);
export { studioRouter, viewRouter };
