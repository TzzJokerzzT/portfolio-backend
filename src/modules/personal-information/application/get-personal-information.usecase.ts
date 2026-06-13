import type { PersonalInformationRepository } from "../infrastructure/personal-information.repository.ts";
import type { IPersonalInformation } from "../domain/personal-information.entity.ts";

export class GetPersonalInformationUseCase {
  constructor(private readonly repo: PersonalInformationRepository) {}

  async execute(): Promise<IPersonalInformation | null> {
    return this.repo.findOne();
  }
}
