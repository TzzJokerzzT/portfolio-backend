import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/index.ts";
import { env } from "../../config/env.ts";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError && err.isOperational) {
    const response: {
      message: string;
      errors?: Array<{ field: string; message: string }>;
    } = {
      message: err.message,
    };

    if ("errors" in err && err.errors) {
      response.errors = err.errors as Array<{ field: string; message: string }>;
    }

    res.status(err.statusCode).json(response);
    return;
  }

  const response: { message: string } = {
    message:
      env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Internal server error",
  };

  res.status(500).json(response);
};
