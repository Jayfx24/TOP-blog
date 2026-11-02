import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import validateSchema from "./validateSchema.js";
import { UserRegistrationSchema, ZLogin } from "./schema.js";
import {
  authenticateJwt,
  authenticateRefreshToken,
} from "./auth.middleware.js";

const authRouter = Router();

authRouter.get("/me", authenticateJwt, AuthController.me);
authRouter.post("/login", validateSchema(ZLogin), AuthController.login);
authRouter.post(
  "/register",
  validateSchema(UserRegistrationSchema),
  AuthController.register,
);
authRouter.post("/refresh", authenticateRefreshToken, AuthController.refresh);

export default authRouter;
