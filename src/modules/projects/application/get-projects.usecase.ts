import type { IProject } from "../domain/project.entity";
import type { ProjectRepository } from "../infrastructure/project.repository";

export class GetProjectsUseCase {
	constructor(private readonly repo: ProjectRepository) {}

	async execute(): Promise<IProject[]> {
		return this.repo.findAll();
	}
}
