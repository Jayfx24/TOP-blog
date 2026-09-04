import { Router } from "express";
import { AuthController } from "./controllers/AuthController.js";
import passport from "passport";
import validateSchema from "./validateSchema.js";
import { UserRegistrationSchema } from "./schema.js";
const authRouter = Router();

authRouter.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  AuthController.login,
);
authRouter.post(
  "/register",
  validateSchema(UserRegistrationSchema),
  AuthController.register,
);
