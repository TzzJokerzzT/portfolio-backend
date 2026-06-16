import type { PersonalInformationRepository } from "../infrastructure/personal-information.repository";
import type { IPersonalInformation } from "../domain/personal-information.entity";

export class UpdatePersonalInformationUseCase {
  constructor(private readonly repo: PersonalInformationRepository) {}

  async execute(
    data: Partial<IPersonalInformation>,
  ): Promise<IPersonalInformation> {
    return this.repo.update(data);
  }
}
