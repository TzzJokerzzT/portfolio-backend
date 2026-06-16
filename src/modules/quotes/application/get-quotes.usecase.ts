import type { QuotesRepository } from "../infrastructure/quotes.repository";
import type { IQuote } from "../domain/quote.entity";

export class GetQuotesUseCase {
  constructor(private readonly repo: QuotesRepository) {}

  async execute(): Promise<IQuote[]> {
    return this.repo.getQuotes();
  }
}
