import type { QuotesRepository } from "../infrastructure/quotes.repository.ts";
import type { IQuote } from "../domain/quote.entity.ts";

export class GetQuotesUseCase {
  constructor(private readonly repo: QuotesRepository) {}

  async execute(): Promise<IQuote[]> {
    return this.repo.getQuotes();
  }
}
