import type { IntroductionRepository } from "../infrastructure/introduction.repository.ts";
import type { IIntroduction } from "../domain/introduction.entity.ts";
import { ConflictError } from "../../../shared/errors/index.ts";

export class CreateIntroductionUseCase {
  constructor(private readonly repo: IntroductionRepository) {}

  async execute(data: Partial<IIntroduction>): Promise<IIntroduction> {
    const existing = await this.repo.findOne();
    if (existing) {
      throw new ConflictError("Introduction already exists");
    }
    return this.repo.create(data);
  }
}
