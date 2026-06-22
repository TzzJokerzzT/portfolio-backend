import mongoose, { type Model } from "mongoose";
import type { IProject } from "../domain/project.entity";

const projectSchema = new mongoose.Schema<IProject, Model<IProject>>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		imageUrl: { type: String, required: true },
		techStack: { type: [String], required: true },
		repoUrl: { type: String, required: true },
		liveUrl: { type: String, required: true },
		startDate: { type: Date },
		endDate: { type: Date },
	},
	{ timestamps: true },
);

export const ProjectModel = mongoose.model<IProject, Model<IProject>>(
	"Project",
	projectSchema,
);
