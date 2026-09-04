import express, { type Request, type Response } from "express";
import authRouter from "#features/auth/AuthRouter.js";

const router = express.Router();

router.use("/",authRouter)
router.get("/", (req: Request, res: Response) => {
  return res.json("At the home page");
});

export default router;
