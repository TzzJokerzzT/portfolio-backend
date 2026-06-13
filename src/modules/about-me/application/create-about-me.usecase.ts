import type { AboutMeRepository } from "../infrastructure/about-me.repository.ts";
import type { IAboutMe } from "../domain/about-me.entity.ts";
import { ConflictError } from "../../../shared/errors/index.ts";

export class CreateAboutMeUseCase {
  constructor(private readonly repo: AboutMeRepository) {}

  async execute(data: Partial<IAboutMe>): Promise<IAboutMe> {
    const existing = await this.repo.findOne();
    if (existing) {
      throw new ConflictError("AboutMe already exists");
    }
    return this.repo.create(data);
  }
}
