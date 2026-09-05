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
      (err: any, user: User | false, info: any) => {
       
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(400).json({
            success: false,
            message: info ? info?.message : "Login failed",
          });
        }
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const { passwordHash: _, ...data } = user;

        

        const token = generateJwt(user.id);

        return res.json({ data, token });
      },
    )(req, res, next);
  }
  static async register(req: Request, res: Response, next: NextFunction) {
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

  static async logout(req: Request, res: Response, next: NextFunction) {
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
}
