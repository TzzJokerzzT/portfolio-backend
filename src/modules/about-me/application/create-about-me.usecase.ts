import type { AboutMeRepository } from "../infrastructure/about-me.repository";
import type { IAboutMe } from "../domain/about-me.entity";
import { ConflictError } from "../../../shared/errors/index";

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
