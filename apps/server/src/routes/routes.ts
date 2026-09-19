import express, { type Request, type Response } from "express";
import authRouter from "#features/auth/auth.routes.js";

const router = express.Router();

router.use("/",authRouter)
router.get("/", (_req: Request, res: Response) => {
  return res.json("At the home page");
});

export default router;
