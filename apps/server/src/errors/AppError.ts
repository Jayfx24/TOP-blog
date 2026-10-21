export default class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
  ) {
    super(message);
    // this.statusCode = statusCode;
    this.name = "AppError";
    // this.code = code;
  }
}
