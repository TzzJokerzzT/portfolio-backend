import crypto from "crypto";
import type {
  IPersonalInformation,
  IContact,
} from "../domain/personal-information.entity";
import { PersonalInformationModel } from "./personal-information.model";
import { NotFoundError } from "../../../shared/errors/index";

export class PersonalInformationRepository {
  constructor(private readonly model = PersonalInformationModel) {}

  async findOne(): Promise<IPersonalInformation | null> {
    return this.model.findOne().lean();
  }

  async create(
    data: Partial<IPersonalInformation>,
  ): Promise<IPersonalInformation> {
    const contact = (data.contact ?? []).map(
      (item: Partial<IContact> & { id?: string }) => ({
        ...item,
        id: item.id || crypto.randomUUID(),
      }),
    );

    const doc = new this.model({
      ...data,
      contact,
      personalExperience: {
        ...data.personalExperience,
        id: data.personalExperience?.id || crypto.randomUUID(),
      },
    });
    await doc.save();
    return doc.toObject();
  }

  async update(
    data: Partial<IPersonalInformation>,
  ): Promise<IPersonalInformation> {
    const updateFields: Record<string, unknown> = {};

    if (data.basic) {
      if (data.basic.name !== undefined)
        updateFields["basic.name"] = data.basic.name;
      if (data.basic.label !== undefined)
        updateFields["basic.label"] = data.basic.label;
      if (data.basic.image !== undefined)
        updateFields["basic.image"] = data.basic.image;
      if (data.basic.email !== undefined)
        updateFields["basic.email"] = data.basic.email;
      if (data.basic.summary !== undefined)
        updateFields["basic.summary"] = data.basic.summary;
    }

    if (data.social) {
      if (data.social.github !== undefined)
        updateFields["social.github"] = data.social.github;
      if (data.social.linkedin !== undefined)
        updateFields["social.linkedin"] = data.social.linkedin;
      if (data.social.twitter !== undefined)
        updateFields["social.twitter"] = data.social.twitter;
    }

    if (data.personalExperience) {
      if (data.personalExperience.title !== undefined)
        updateFields["personalExperience.title"] =
          data.personalExperience.title;
      if (data.personalExperience.description !== undefined)
        updateFields["personalExperience.description"] =
          data.personalExperience.description;
    }

    if (data.contact) {
      const contact = data.contact.map(
        (item: Partial<IContact> & { id?: string }) => ({
          ...item,
          id: item.id || crypto.randomUUID(),
        }),
      );
      updateFields["contact"] = contact;
    }

    const doc = await this.model
      .findOneAndUpdate(
        {},
        { $set: updateFields },
        { new: true, runValidators: true },
      )
      .lean();

    if (!doc) {
      throw new NotFoundError("PersonalInformation not found");
    }
    return doc;
  }
}
