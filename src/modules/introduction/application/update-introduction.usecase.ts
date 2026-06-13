import type { IntroductionRepository } from "../infrastructure/introduction.repository.ts";
import type { IIntroduction } from "../domain/introduction.entity.ts";

export class UpdateIntroductionUseCase {
  constructor(private readonly repo: IntroductionRepository) {}

  async execute(data: Partial<IIntroduction>): Promise<IIntroduction> {
    return this.repo.update(data);
  }
}
