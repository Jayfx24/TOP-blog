import { type Request, type Response, type NextFunction } from "express";
import UserService from "#features/user/user.service.js";
import { genHash } from "./passwordUtils.js";
import { generateJwt } from "./utils.js";
import passport from "passport";
import { type User } from "#generated/prisma/client.js";

async function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "local",
    { session: false },

    /* eslint-disable @typescript-eslint/no-explicit-any */
    (err: any, user: User | false, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          message: info ? info?.message : "Login failed",
        });
      }
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { passwordHash: _, ...data } = user;

      const token = generateJwt(user.id);

      return res.json({ user: data, token: token });
    },
  )(req, res, next);
}
async function register(req: Request, res: Response) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { pwd, cPwd: _, ...body } = req.body;
  const passwordHash = await genHash(pwd);
  const data = { ...body, passwordHash };

  const user = await UserService.createUser(data);
  // generate jwt and send
  const token = generateJwt(user.id);

  // login user

  return res.json({ data: user, token });
}

async function logout(_req: Request, _res: Response) {
  // req.logout((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   return res.status(400).json({
  //     success: true,
  //     message: "Logout success ",
  //   });
  // });
}

export const AuthController = {
  login,
  register,
  logout,
};
