import type { ExperienceRepository } from "../infrastructure/experience.repository.ts";
import type { IExperience } from "../domain/experience.entity.ts";

export class AddExperienceUseCase {
  constructor(private readonly repo: ExperienceRepository) {}

  async execute(data: Omit<IExperience, "id">): Promise<IExperience[]> {
    return this.repo.addExperience(data);
  }
}
