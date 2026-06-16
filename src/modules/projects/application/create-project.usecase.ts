import type { ProjectRepository } from "../infrastructure/project.repository";
import type { IProject } from "../domain/project.entity";

export class CreateProjectUseCase {
  constructor(private readonly repo: ProjectRepository) {}

  async execute(data: Partial<IProject>): Promise<IProject> {
    return this.repo.create(data);
  }
}
