import { AppError } from "./app-error.ts";

export class ValidationError extends AppError {
  public readonly errors?: Array<{ field: string; message: string }>;

  constructor(
    message = "Validation failed",
    errors?: Array<{ field: string; message: string }>,
  ) {
    super(message, 400);
    this.errors = errors;
  }
}
