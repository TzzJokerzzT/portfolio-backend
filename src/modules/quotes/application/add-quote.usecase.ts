import type { QuotesRepository } from "../infrastructure/quotes.repository";
import type { IQuote } from "../domain/quote.entity";

export class AddQuoteUseCase {
  constructor(private readonly repo: QuotesRepository) {}

  async execute(data: Omit<IQuote, "id">): Promise<IQuote[]> {
    return this.repo.addQuote(data);
  }
}
