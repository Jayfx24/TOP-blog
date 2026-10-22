import AppError from "./AppError.js";
import { ErrorCode } from "@blog/lib";

export default class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401, ErrorCode.Forbidden);
    this.name = "UnauthorizedError";
  }
}
