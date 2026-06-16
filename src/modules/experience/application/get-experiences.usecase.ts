import type { ExperienceRepository } from "../infrastructure/experience.repository";
import type { IExperience } from "../domain/experience.entity";

export class GetExperiencesUseCase {
  constructor(private readonly repo: ExperienceRepository) {}

  async execute(): Promise<IExperience[]> {
    return this.repo.getExperiences();
  }
}
