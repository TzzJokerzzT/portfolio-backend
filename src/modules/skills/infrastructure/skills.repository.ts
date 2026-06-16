import crypto from "crypto";
import type { ISkill, ISkillsDocument } from "../domain/skill.entity";
import { SkillsModel } from "./skills.model";

export class SkillsRepository {
  constructor(private readonly model = SkillsModel) {}

  async getSkills(): Promise<ISkill[]> {
    const doc = await this.model.findOne().lean();
    return doc?.skills ?? [];
  }

  async addSkill(data: Omit<ISkill, "id">): Promise<ISkill[]> {
    let doc = await this.model.findOne();
    if (!doc) {
      doc = new this.model({ skills: [] });
    }
    const skill: ISkill = { ...data, id: crypto.randomUUID() };
    doc.skills.push(skill);
    await doc.save();
    return doc.skills;
  }

  async replaceSkills(skills: ISkill[]): Promise<ISkill[]> {
    const autoIdSkills = skills.map((skill) => ({
      ...skill,
      id: skill.id || crypto.randomUUID(),
    }));
    const doc = await this.model
      .findOneAndUpdate(
        {},
        { $set: { skills: autoIdSkills } },
        { upsert: true, new: true },
      )
      .lean();
    return doc!.skills;
  }
}
