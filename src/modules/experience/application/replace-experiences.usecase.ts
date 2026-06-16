import type { ExperienceRepository } from "../infrastructure/experience.repository";
import type { IExperience } from "../domain/experience.entity";

export class ReplaceExperiencesUseCase {
  constructor(private readonly repo: ExperienceRepository) {}

  async execute(experiences: IExperience[]): Promise<IExperience[]> {
    return this.repo.replaceExperiences(experiences);
  }
}
