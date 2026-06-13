import type { RequestHandler } from "express";
import { z } from "zod";
import { ValidationError } from "../errors/index.ts";

export const validate = (schema: z.ZodType): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const flattened = result.error.flatten();
      const errors: Array<{ field: string; message: string }> = [];

      for (const [field, messages] of Object.entries(
        flattened.fieldErrors as Record<string, string[]>,
      )) {
        if (messages) {
          for (const message of messages) {
            errors.push({ field, message });
          }
        }
      }

      throw new ValidationError("Validation failed", errors);
    }

    req.body = result.data;
    next();
  };
};
