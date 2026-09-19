import { type Request, type Response, type NextFunction } from "express";
import AppError from "../errors/AppError.js";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
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
