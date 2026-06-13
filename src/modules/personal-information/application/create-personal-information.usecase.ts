import type { PersonalInformationRepository } from "../infrastructure/personal-information.repository.ts";
import type { IPersonalInformation } from "../domain/personal-information.entity.ts";
import { ConflictError } from "../../../shared/errors/index.ts";

export class CreatePersonalInformationUseCase {
  constructor(private readonly repo: PersonalInformationRepository) {}

  async execute(
    data: Partial<IPersonalInformation>,
  ): Promise<IPersonalInformation> {
    const existing = await this.repo.findOne();
    if (existing) {
      throw new ConflictError("PersonalInformation already exists");
    }
    return this.repo.create(data);
  }
}
