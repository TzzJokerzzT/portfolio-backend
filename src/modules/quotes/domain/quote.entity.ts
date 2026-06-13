export interface IQuote {
  id: string;
  author: string;
  description: string;
}

export interface IQuotesDocument {
  _id?: string;
  quotes: IQuote[];
  createdAt?: string;
  updatedAt?: string;
}
