import type { ProjectRepository } from "../infrastructure/project.repository.ts";
import type { IProject } from "../domain/project.entity.ts";

export class GetProjectsUseCase {
  constructor(private readonly repo: ProjectRepository) {}

  async execute(): Promise<IProject[]> {
    return this.repo.findAll();
  }
}
