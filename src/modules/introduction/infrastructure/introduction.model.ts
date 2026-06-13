import mongoose, { type Model } from "mongoose";
import type { IIntroduction } from "../domain/introduction.entity.ts";

const introductionSchema = new mongoose.Schema<
  IIntroduction,
  Model<IIntroduction>
>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const IntroductionModel = mongoose.model<
  IIntroduction,
  Model<IIntroduction>
>("Introduction", introductionSchema);
