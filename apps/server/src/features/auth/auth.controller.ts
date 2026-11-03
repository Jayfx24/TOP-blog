import { type Request, type Response, type NextFunction } from "express";
import UserService from "#features/user/user.service.js";
import { genHash } from "./passwordUtils.js";
import { generateAccessToken, generateRefreshToken } from "./utils.js";
import passport from "passport";
import { type User } from "#generated/prisma/client.js";
import UnauthorizedError from "#errors/UnauthorizedError.js";

async function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "local",
    { session: false },

    /* eslint-disable @typescript-eslint/no-explicit-any */
    (err: any, user: User | false) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // throw err instead
        return res.status(401).json({
          success: false,
          message: "Login failed",
        });
      }
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { passwordHash: _, ...data } = user;
      const payload = { sub: user.id };

      try {
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          // secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ token: accessToken, user: data });
      } catch (error) {
        console.error(error);
        next(error);
      }
    },
  )(req, res, next);
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return next(new UnauthorizedError("User not defined"));
  const payload = { sub: req.user.id };
  const accessToken = generateAccessToken(payload);
  return res.send({ token: accessToken });
}

export async function me(req: Request, res: Response, next: NextFunction) {
  const user = req.user
  return res.send({ user });
}

async function register(req: Request, res: Response) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { pwd, cPwd: _, ...body } = req.body;
  const passwordHash = await genHash(pwd);
  const data = { ...body, passwordHash };

  const user = await UserService.createUser(data);
  // generate jwt and send
  const payload = { sub: user.id };

  const token = generateAccessToken(payload);

  // login user

  return res.json({ token, user });
}

export async function logout(_req: Request, res: Response) {
  // TODO: add refresh_token and access_token to blacklist table
  return res
    .clearCookie("refresh_token", {
      httpOnly: true,
    })
    .sendStatus(200);
}

export const AuthController = {
  login,
  register,
  logout,
  refresh,
  me,
};
