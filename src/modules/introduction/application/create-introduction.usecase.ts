import type { IntroductionRepository } from "../infrastructure/introduction.repository";
import type { IIntroduction } from "../domain/introduction.entity";
import { ConflictError } from "../../../shared/errors/index";

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
