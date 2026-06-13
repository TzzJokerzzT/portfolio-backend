import mongoose, { type Model } from "mongoose";
import type { IPersonalInformation } from "../domain/personal-information.entity.ts";

const contactSubSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String },
});

const personalInformationSchema = new mongoose.Schema<
  IPersonalInformation,
  Model<IPersonalInformation>
>(
  {
    basic: {
      type: new mongoose.Schema({
        name: { type: String, required: true },
        label: { type: String, required: true },
        image: { type: String },
        email: { type: String, required: true },
        summary: { type: String, required: true },
      }),
      required: true,
    },
    social: {
      type: new mongoose.Schema({
        github: { type: String, required: true },
        linkedin: { type: String, required: true },
        twitter: { type: String, required: true },
      }),
      required: true,
    },
    personalExperience: {
      type: new mongoose.Schema({
        id: { type: String },
        title: { type: String, required: true },
        description: { type: String, required: true },
      }),
      required: true,
    },
    contact: [contactSubSchema],
  },
  { timestamps: true },
);

export const PersonalInformationModel = mongoose.model<
  IPersonalInformation,
  Model<IPersonalInformation>
>("PersonalInformation", personalInformationSchema);
