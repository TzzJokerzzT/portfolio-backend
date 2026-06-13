import crypto from "crypto";
import type { IQuote, IQuotesDocument } from "../domain/quote.entity.ts";
import { QuotesModel } from "./quotes.model.ts";

export class QuotesRepository {
  constructor(private readonly model = QuotesModel) {}

  async getQuotes(): Promise<IQuote[]> {
    const doc = await this.model.findOne().lean();
    return doc?.quotes ?? [];
  }

  async addQuote(data: Omit<IQuote, "id">): Promise<IQuote[]> {
    let doc = await this.model.findOne();
    if (!doc) {
      doc = new this.model({ quotes: [] });
    }
    const quote: IQuote = { ...data, id: crypto.randomUUID() };
    doc.quotes.push(quote);
    await doc.save();
    return doc.quotes;
  }

  async replaceQuotes(quotes: IQuote[]): Promise<IQuote[]> {
    const autoIdQuotes = quotes.map((quote) => ({
      ...quote,
      id: quote.id || crypto.randomUUID(),
    }));
    const doc = await this.model
      .findOneAndUpdate(
        {},
        { $set: { quotes: autoIdQuotes } },
        { upsert: true, new: true },
      )
      .lean();
    return doc!.quotes;
  }
}
