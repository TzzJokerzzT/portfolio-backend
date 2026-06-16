import type { QuotesRepository } from "../infrastructure/quotes.repository";
import type { IQuote } from "../domain/quote.entity";

export class ReplaceQuotesUseCase {
  constructor(private readonly repo: QuotesRepository) {}

  async execute(quotes: IQuote[]): Promise<IQuote[]> {
    return this.repo.replaceQuotes(quotes);
  }
}
