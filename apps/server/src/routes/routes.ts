import express, { type Request, type Response } from "express";
import authRouter from "#features/auth/auth.routes.js";
import { studioRouter, viewRouter } from "#features/post/post.routes.js";

const router = express.Router();

router.use("/posts",viewRouter)
router.use("/studio",studioRouter) //validate user as proper authorization
router.use("/auth",authRouter)
router.get("/", (_req: Request, res: Response) => {
  return res.json("At the home page");
});

export default router;
