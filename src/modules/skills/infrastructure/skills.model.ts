import mongoose, { type Model } from "mongoose";
import type { ISkillsDocument } from "../domain/skill.entity";

const skillSubSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String },
});

const skillsSchema = new mongoose.Schema<
  ISkillsDocument,
  Model<ISkillsDocument>
>(
  {
    skills: [skillSubSchema],
  },
  { timestamps: true },
);

export const SkillsModel = mongoose.model<
  ISkillsDocument,
  Model<ISkillsDocument>
>("Skills", skillsSchema);
