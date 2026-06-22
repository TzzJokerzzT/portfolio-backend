import { NotFoundError } from "../../../shared/errors/index";
import type { IProject } from "../domain/project.entity";
import type { ProjectRepository } from "../infrastructure/project.repository";

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
