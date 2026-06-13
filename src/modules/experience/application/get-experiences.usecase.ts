import type { ExperienceRepository } from "../infrastructure/experience.repository.ts";
import type { IExperience } from "../domain/experience.entity.ts";

export class GetExperiencesUseCase {
  constructor(private readonly repo: ExperienceRepository) {}

  async execute(): Promise<IExperience[]> {
    return this.repo.getExperiences();
  }
}
