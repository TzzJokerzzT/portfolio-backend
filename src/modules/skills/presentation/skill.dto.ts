import { z } from "zod";

export const AddSkillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  icon: z.string().optional(),
});

export const ReplaceSkillsSchema = z.object({
  skills: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1),
      category: z.string().min(1),
      icon: z.string().optional(),
    }),
  ),
});
