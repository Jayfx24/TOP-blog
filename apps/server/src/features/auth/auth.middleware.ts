import type { Response, Request, NextFunction } from "express";
import passport from "passport";

export const rfTokenExtractor = function (req: Request): string | null {
  return req.cookies?.refresh_token ?? null;
};

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};

export const authenticateRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};
