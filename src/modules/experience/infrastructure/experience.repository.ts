import crypto from "crypto";
import type {
  IExperience,
  IExperienceDocument,
} from "../domain/experience.entity";
import { ExperienceModel } from "./experience.model";

export class ExperienceRepository {
  constructor(private readonly model = ExperienceModel) {}

  async getExperiences(): Promise<IExperience[]> {
    const doc = await this.model.findOne().lean();
    return doc?.experiences ?? [];
  }

  async addExperience(data: Omit<IExperience, "id">): Promise<IExperience[]> {
    let doc = await this.model.findOne();
    if (!doc) {
      doc = new this.model({ experiences: [] });
    }
    const experience: IExperience = { ...data, id: crypto.randomUUID() };
    doc.experiences.push(experience);
    await doc.save();
    return doc.experiences;
  }

  async replaceExperiences(experiences: IExperience[]): Promise<IExperience[]> {
    const autoIdExperiences = experiences.map((exp) => ({
      ...exp,
      id: exp.id || crypto.randomUUID(),
    }));
    const doc = await this.model
      .findOneAndUpdate(
        {},
        { $set: { experiences: autoIdExperiences } },
        { upsert: true, new: true },
      )
      .lean();
    return doc!.experiences;
  }
}
