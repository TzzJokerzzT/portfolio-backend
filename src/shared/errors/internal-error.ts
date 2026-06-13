import { AppError } from "./app-error.ts";

export class InternalError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}
