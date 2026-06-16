import { Router } from "express";
import { QuotesRepository } from "../infrastructure/quotes.repository";
import { GetQuotesUseCase } from "../application/get-quotes.usecase";
import { AddQuoteUseCase } from "../application/add-quote.usecase";
import { ReplaceQuotesUseCase } from "../application/replace-quotes.usecase";
import { QuotesController } from "../presentation/quotes.controller";
import { validate, asyncHandler } from "../../../shared/middleware/index";
import { AddQuoteSchema, ReplaceQuotesSchema } from "./quote.dto";

const quotesRepo = new QuotesRepository();
const getQuotesUseCase = new GetQuotesUseCase(quotesRepo);
const addQuoteUseCase = new AddQuoteUseCase(quotesRepo);
const replaceQuotesUseCase = new ReplaceQuotesUseCase(quotesRepo);
const quotesController = new QuotesController(
  getQuotesUseCase,
  addQuoteUseCase,
  replaceQuotesUseCase,
);

export const quotesRouter = Router();

quotesRouter.get("/", quotesController.getAll);
quotesRouter.post(
  "/",
  validate(AddQuoteSchema),
  asyncHandler(quotesController.add),
);
quotesRouter.patch(
  "/",
  validate(ReplaceQuotesSchema),
  asyncHandler(quotesController.replace),
);
