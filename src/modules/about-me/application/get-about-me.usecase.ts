import type { AboutMeRepository } from "../infrastructure/about-me.repository.ts";
import type { IAboutMe } from "../domain/about-me.entity.ts";

export class GetAboutMeUseCase {
  constructor(private readonly repo: AboutMeRepository) {}

  async execute(): Promise<IAboutMe | null> {
    return this.repo.findOne();
  }
}
