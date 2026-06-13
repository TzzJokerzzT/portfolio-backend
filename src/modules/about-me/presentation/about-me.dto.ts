import { z } from "zod";

const aboutItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const CreateAboutMeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  about: z.array(aboutItemSchema).optional(),
});

export const UpdateAboutMeSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  about: z.array(aboutItemSchema).optional(),
});
