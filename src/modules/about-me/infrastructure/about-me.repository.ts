import crypto from "crypto";
import type { IAboutItem, IAboutMe } from "../domain/about-me.entity.ts";
import { AboutMeModel } from "./about-me.model.ts";
import { NotFoundError } from "../../../shared/errors/index.ts";

export class AboutMeRepository {
  constructor(private readonly model = AboutMeModel) {}

  async findOne(): Promise<IAboutMe | null> {
    return this.model.findOne().lean();
  }

  async create(data: Partial<IAboutMe>): Promise<IAboutMe> {
    const about = (data.about ?? []).map(
      (item: Partial<IAboutItem> & { id?: string }) => ({
        ...item,
        id: item.id || crypto.randomUUID(),
      }),
    );
    const doc = new this.model({ ...data, about });
    await doc.save();
    return doc.toObject();
  }

  async update(data: Partial<IAboutMe>): Promise<IAboutMe> {
    let doc = await this.model.findOne();
    if (!doc) {
      throw new NotFoundError("AboutMe not found");
    }

    if (data.about) {
      const about = data.about.map(
        (item: Partial<IAboutItem> & { id?: string }) => ({
          ...item,
          id: item.id || crypto.randomUUID(),
        }),
      );
      doc.about = about as any;
    } else {
      if (data.title !== undefined) doc.title = data.title;
      if (data.description !== undefined) doc.description = data.description;
    }

    await doc.save();
    return doc.toObject();
  }
}
