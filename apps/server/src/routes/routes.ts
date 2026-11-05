import express, { type Request, type Response } from "express";
import authRouter from "#features/auth/auth.routes.js";
import { studioRouter, viewRouter } from "#features/post/post.routes.js";
// import passport from "passport";
import { authenticateJwt } from "#features/auth/auth.middleware.js";

const router = express.Router();

router.use("/articles", authenticateJwt, viewRouter);
router.use("/studio", authenticateJwt, studioRouter); //validate user as proper authorization
router.use("/auth", authRouter);
router.get("/", (_req: Request, res: Response) => {
  return res.json("At the home page");
});

export default router;
