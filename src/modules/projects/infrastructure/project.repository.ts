import type { IProject } from "../domain/project.entity";
import { ProjectModel } from "./project.model";
import { NotFoundError } from "../../../shared/errors/index";

export class ProjectRepository {
  async findAll(): Promise<IProject[]> {
    return ProjectModel.find().lean();
  }

  async findById(id: string): Promise<IProject | null> {
    return ProjectModel.findById(id).lean();
  }

  async create(data: Partial<IProject>): Promise<IProject> {
    const doc = new ProjectModel(data);
    await doc.save();
    return doc.toObject();
  }

  async update(id: string, data: Partial<IProject>): Promise<IProject> {
    const doc = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    ).lean();
    if (!doc) {
      throw new NotFoundError("Project not found");
    }
    return doc;
  }
}
