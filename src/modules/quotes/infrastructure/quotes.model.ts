import mongoose, { type Model } from "mongoose";
import type { IQuotesDocument } from "../domain/quote.entity.ts";

const quoteSubSchema = new mongoose.Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
});

const quotesSchema = new mongoose.Schema<
  IQuotesDocument,
  Model<IQuotesDocument>
>(
  {
    quotes: [quoteSubSchema],
  },
  { timestamps: true },
);

export const QuotesModel = mongoose.model<
  IQuotesDocument,
  Model<IQuotesDocument>
>("Quotes", quotesSchema);
