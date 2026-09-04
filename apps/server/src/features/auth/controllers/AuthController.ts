import { type Request, type Response, type NextFunction } from "express";
import UserService from "#features/user/UserService.js";
import { genHash } from "../passwordUtils.js";
import { generateJwt } from "../utils.js";
import passport from "passport";
import { type User } from "#generated/prisma/client.js";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "local",
      { session: false },

      /* eslint-disable @typescript-eslint/no-explicit-any */
      ({ err, user, info }: { err: any; user?: User; info: any }) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(400).json({
            success: false,
            message: info ? info?.message : "Login failed",
          });
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.send(err);
          }

          const token = generateJwt(user);

          return res.json({ user, token });
        });
      },
    );
  }
  static async register(req: Request, res: Response) {
    const { pwd, ...body } = req.body;

    const passwordHash = await genHash(pwd);
    const data = { ...body, passwordHash };

    const user = await UserService.createUser(data);

    // generate jwt and send
    const token = generateJwt(user);

    return res.json({ token });

  }
  static async logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      return res.status(400).json({
        success: true,
        message: "Logout success ",
      });
    });
  }
}
