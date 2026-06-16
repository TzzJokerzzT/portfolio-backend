import type { IntroductionRepository } from "../infrastructure/introduction.repository";
import type { IIntroduction } from "../domain/introduction.entity";

export class GetIntroductionUseCase {
  constructor(private readonly repo: IntroductionRepository) {}

  async execute(): Promise<IIntroduction | null> {
    return this.repo.findOne();
  }
}
