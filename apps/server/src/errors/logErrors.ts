import AppError from "./AppError.js";
import { type Request, type Response, type NextFunction } from "express";

export default function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack);
  next(err);
  if (err instanceof AppError) {
    return res
      .status(err.statusCode || 500)
      .json({ success: false, name: err.name, message: err.message });
  }
  return res.status(500).json({
    success: false,
    message: err.message || "An error occurred",
  });
}
