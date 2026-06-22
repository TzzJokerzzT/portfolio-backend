import type { IProject } from "../domain/project.entity";
import type { ProjectRepository } from "../infrastructure/project.repository";

export class CreateProjectUseCase {
	constructor(private readonly repo: ProjectRepository) {}

	async execute(data: Partial<IProject>): Promise<IProject> {
		return this.repo.create(data);
	}
}
