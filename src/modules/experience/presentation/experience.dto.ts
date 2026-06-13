import { z } from "zod";

export const AddExperienceSchema = z
  .object({
    title: z.string().min(1),
    company: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().nullable(),
    description: z.array(z.string().min(1)).min(1),
    techStack: z.array(z.string()),
    type: z.enum(["work", "freelance", "education"]),
    location: z.enum(["hybrid", "remote", "office"]),
  })
  .refine(
    (data) => {
      if (data.endDate === null) return true;
      return data.endDate >= data.startDate;
    },
    {
      message: "endDate must be equal to or after startDate",
      path: ["endDate"],
    },
  );

export const ReplaceExperiencesSchema = z.object({
  experiences: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(1),
      company: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().nullable(),
      description: z.array(z.string().min(1)).min(1),
      techStack: z.array(z.string()),
      type: z.enum(["work", "freelance", "education"]),
      location: z.enum(["hybrid", "remote", "office"]),
    }),
  ),
});
