import type { ExperienceRepository } from "../infrastructure/experience.repository";
import type { IExperience } from "../domain/experience.entity";

export class AddExperienceUseCase {
  constructor(private readonly repo: ExperienceRepository) {}

  async execute(data: Omit<IExperience, "id">): Promise<IExperience[]> {
    return this.repo.addExperience(data);
  }
}
