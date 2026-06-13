import { z } from "zod";

export const AddQuoteSchema = z.object({
  author: z.string().min(1),
  description: z.string().min(1),
});

export const ReplaceQuotesSchema = z.object({
  quotes: z.array(
    z.object({
      id: z.string().optional(),
      author: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
});
