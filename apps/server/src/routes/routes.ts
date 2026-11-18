import express, { type Request, type Response } from "express";
import authRouter from "../features/auth/auth.routes.js";
import { authenticateJwt } from "../features/auth/auth.middleware.js";
import { publicRouter } from "./public.routes.js";
import { privateRouter } from "./private.routes.js";

const router = express.Router();


// router.use("/articles", viewRouter);
router.use("/auth", authRouter);
router.use("/blog", publicRouter)
router.use("/studio",authenticateJwt, privateRouter); //validate user as proper authorization



router.get("/", (_req: Request, res: Response) => {
  return res.json("At the home page");
});

export default router;
