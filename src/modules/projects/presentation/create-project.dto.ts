import { z } from "zod";

export const CreateProjectSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	imageUrl: z.string().min(1),
	techStack: z.array(z.string()),
	repoUrl: z.string().min(1),
	liveUrl: z.string().min(1),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
});

export const UpdateProjectSchema = z.object({
	title: z.string().min(1).max(200).optional(),
	description: z.string().min(1).optional(),
	imageUrl: z.string().min(1).optional(),
	techStack: z.array(z.string()).optional(),
	repoUrl: z.string().min(1).optional(),
	liveUrl: z.string().min(1).optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
});
