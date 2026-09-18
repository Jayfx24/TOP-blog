import { z } from "zod";
import { fromError, createErrorMap } from "zod-validation-error";
import { type Request, type Response, type NextFunction } from "express";

export default function validateSchema<T extends z.ZodType>(schema: T) {
  z.config({
    customError: createErrorMap(),
  });
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      const result = await schema.parseAsync(req.body);
      req.body = result;
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromError(error);
        req.log.warn(validationError.toString());
        return next(validationError);
      }
    }
  };
}

//  NEED VALIDATE SCHEMA FOR SYNC