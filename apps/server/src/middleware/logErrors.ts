import { type Request, type Response, type NextFunction } from "express";

export default function logErrors(
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  console.error(err.stack);
  next(err);
}
