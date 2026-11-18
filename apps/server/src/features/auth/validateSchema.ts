import { z } from "zod";
import { fromError, createErrorMap } from "zod-validation-error";
import { type Request, type Response, type NextFunction } from "express";
import ValidationError from "#errors/ValidationError.js";

export default function validateSchema<T extends z.ZodType>(schema: T) {
  z.config({
    customError: createErrorMap(),
  });
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      console.log("initial req:", req.body);
      const result = await schema.parseAsync(req.body);
      req.body = result;
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromError(error);
        req.log.warn(validationError.toString());
        return next(new ValidationError(validationError.toString()));
      }
    }
  };
}

//  NEED VALIDATE SCHEMA FOR SYNC
