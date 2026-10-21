export default class AppError extends Error {
  statusCode: number;
  code: string;
  constructor(message: string, statusCode: number = 500, code: string) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
  }
}
