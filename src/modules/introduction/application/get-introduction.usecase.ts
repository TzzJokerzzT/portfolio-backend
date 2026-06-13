import type { IntroductionRepository } from "../infrastructure/introduction.repository.ts";
import type { IIntroduction } from "../domain/introduction.entity.ts";

export class GetIntroductionUseCase {
  constructor(private readonly repo: IntroductionRepository) {}

  async execute(): Promise<IIntroduction | null> {
    return this.repo.findOne();
  }
}
