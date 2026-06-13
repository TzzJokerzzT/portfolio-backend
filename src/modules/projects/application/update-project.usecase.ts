import type { ProjectRepository } from "../infrastructure/project.repository.ts";
import type { IProject } from "../domain/project.entity.ts";
import { NotFoundError } from "../../../shared/errors/index.ts";

export class UpdateProjectUseCase {
  constructor(private readonly repo: ProjectRepository) {}

  async execute(id: string, data: Partial<IProject>): Promise<IProject> {
    const project = await this.repo.update(id, data);
    if (!project) {
      throw new NotFoundError("Project not found");
    }
    return project;
  }
}
