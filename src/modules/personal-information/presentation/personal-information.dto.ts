import { z } from "zod";

const contactSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  url: z.string().min(1),
  icon: z.string().optional(),
});

export const CreatePersonalInformationSchema = z.object({
  basic: z.object({
    name: z.string().min(1),
    label: z.string().min(1),
    image: z.string().optional(),
    email: z.string().email(),
    summary: z.string().min(1),
  }),
  social: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    twitter: z.string().url(),
  }),
  personalExperience: z.object({
    id: z.string().optional(),
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  contact: z.array(contactSchema).optional(),
});

export const UpdatePersonalInformationSchema = z.object({
  basic: z
    .object({
      name: z.string().min(1).optional(),
      label: z.string().min(1).optional(),
      image: z.string().optional(),
      email: z.string().email().optional(),
      summary: z.string().min(1).optional(),
    })
    .optional(),
  social: z
    .object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
    })
    .optional(),
  personalExperience: z
    .object({
      title: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
    })
    .optional(),
  contact: z.array(contactSchema).optional(),
});
