import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import validateSchema from "./validateSchema.js";
import { UserRegistrationSchema } from "./schema.js";

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post(
  "/register",
  validateSchema(UserRegistrationSchema),
  AuthController.register,
);

export default authRouter;
