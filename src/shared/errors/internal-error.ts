import { AppError } from "./app-error";

export class InternalError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}
