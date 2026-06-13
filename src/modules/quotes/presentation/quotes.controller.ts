import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { GetQuotesUseCase } from "../application/get-quotes.usecase.ts";
import type { AddQuoteUseCase } from "../application/add-quote.usecase.ts";
import type { ReplaceQuotesUseCase } from "../application/replace-quotes.usecase.ts";

export class QuotesController {
  constructor(
    private readonly getQuotesUseCase: GetQuotesUseCase,
    private readonly addQuoteUseCase: AddQuoteUseCase,
    private readonly replaceQuotesUseCase: ReplaceQuotesUseCase,
  ) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const quotes = await this.getQuotesUseCase.execute();
    res.status(StatusCodes.OK).json({ data: quotes });
  };

  add = async (req: Request, res: Response): Promise<void> => {
    const quotes = await this.addQuoteUseCase.execute(req.body);
    res.status(StatusCodes.CREATED).json({ data: quotes });
  };

  replace = async (req: Request, res: Response): Promise<void> => {
    const quotes = await this.replaceQuotesUseCase.execute(req.body.quotes);
    res.status(StatusCodes.OK).json({ data: quotes });
  };
}
