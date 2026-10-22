import express, { type Request, type Response } from "express";
import authRouter from "#features/auth/auth.routes.js";
import { studioRouter, viewRouter } from "#features/post/post.routes.js";
import passport from "passport";

const router = express.Router();

router.use(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  viewRouter,
);
router.use(
  "/studio",
  passport.authenticate("jwt", { session: false }),
  studioRouter,
); //validate user as proper authorization
router.use("/auth", authRouter);
router.get("/", (_req: Request, res: Response) => {
  return res.json("At the home page");
});

export default router;
