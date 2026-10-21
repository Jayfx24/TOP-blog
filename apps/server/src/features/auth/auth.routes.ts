import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import validateSchema from "./validateSchema.js";
import { UserRegistrationSchema, ZLogin } from "./schema.js";

const authRouter = Router();

authRouter.post("/login", validateSchema(ZLogin), AuthController.login);
authRouter.post(
  "/register",
  validateSchema(UserRegistrationSchema),
  AuthController.register,
);

export default authRouter;
