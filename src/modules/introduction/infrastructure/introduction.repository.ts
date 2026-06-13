import type { IIntroduction } from "../domain/introduction.entity.ts";
import { IntroductionModel } from "./introduction.model.ts";
import { NotFoundError } from "../../../shared/errors/index.ts";

export class IntroductionRepository {
  constructor(private readonly model = IntroductionModel) {}

  async findOne(): Promise<IIntroduction | null> {
    return this.model.findOne().lean();
  }

  async create(data: Partial<IIntroduction>): Promise<IIntroduction> {
    const doc = new this.model(data);
    await doc.save();
    return doc.toObject();
  }

  async update(data: Partial<IIntroduction>): Promise<IIntroduction> {
    const doc = await this.model.findOne();
    if (!doc) {
      throw new NotFoundError("Introduction not found");
    }
    Object.assign(doc, { $set: data });
    await doc.save();
    return doc.toObject();
  }
}
