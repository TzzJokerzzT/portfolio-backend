import type { AboutMeRepository } from "../infrastructure/about-me.repository.ts";
import type { IAboutMe } from "../domain/about-me.entity.ts";

export class UpdateAboutMeUseCase {
  constructor(private readonly repo: AboutMeRepository) {}

  async execute(data: Partial<IAboutMe>): Promise<IAboutMe> {
    return this.repo.update(data);
  }
}
