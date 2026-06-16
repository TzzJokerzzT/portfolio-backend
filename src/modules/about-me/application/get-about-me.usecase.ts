import type { AboutMeRepository } from "../infrastructure/about-me.repository";
import type { IAboutMe } from "../domain/about-me.entity";

export class GetAboutMeUseCase {
  constructor(private readonly repo: AboutMeRepository) {}

  async execute(): Promise<IAboutMe | null> {
    return this.repo.findOne();
  }
}
