import mongoose, { type Model } from "mongoose";
import type { IAboutMe } from "../domain/about-me.entity";

const aboutItemSubSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const aboutMeSchema = new mongoose.Schema<IAboutMe, Model<IAboutMe>>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    about: [aboutItemSubSchema],
  },
  { timestamps: true },
);

export const AboutMeModel = mongoose.model<IAboutMe, Model<IAboutMe>>(
  "AboutMe",
  aboutMeSchema,
);
