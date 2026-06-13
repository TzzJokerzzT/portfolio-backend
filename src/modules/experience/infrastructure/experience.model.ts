import mongoose, { type Model } from "mongoose";
import type {
  IExperience,
  IExperienceDocument,
} from "../domain/experience.entity.ts";

const experienceSubSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: null },
  description: {
    type: [String],
    required: true,
    validate: {
      validator: (arr: string[]) =>
        arr.length > 0 && arr.every((s: string) => s.trim().length > 0),
      message: "Description must contain at least one non-empty string",
    },
  },
  techStack: { type: [String], required: true },
  type: {
    type: String,
    enum: ["work", "freelance", "education"],
    required: true,
  },
  location: {
    type: String,
    enum: ["hybrid", "remote", "office"],
    required: true,
  },
});

const experienceSchema = new mongoose.Schema<
  IExperienceDocument,
  Model<IExperienceDocument>
>(
  {
    experiences: [experienceSubSchema],
  },
  { timestamps: true },
);

export const ExperienceModel = mongoose.model<
  IExperienceDocument,
  Model<IExperienceDocument>
>("Experience", experienceSchema);
