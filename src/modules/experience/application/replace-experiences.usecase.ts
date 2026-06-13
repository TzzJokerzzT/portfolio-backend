import type { ExperienceRepository } from "../infrastructure/experience.repository.ts";
import type { IExperience } from "../domain/experience.entity.ts";

export class ReplaceExperiencesUseCase {
  constructor(private readonly repo: ExperienceRepository) {}

  async execute(experiences: IExperience[]): Promise<IExperience[]> {
    return this.repo.replaceExperiences(experiences);
  }
}
