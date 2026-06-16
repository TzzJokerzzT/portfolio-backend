import type { IntroductionRepository } from "../infrastructure/introduction.repository";
import type { IIntroduction } from "../domain/introduction.entity";

export class UpdateIntroductionUseCase {
  constructor(private readonly repo: IntroductionRepository) {}

  async execute(data: Partial<IIntroduction>): Promise<IIntroduction> {
    return this.repo.update(data);
  }
}
