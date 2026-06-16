import type { SkillsRepository } from "../infrastructure/skills.repository";
import type { ISkill } from "../domain/skill.entity";

export class AddSkillUseCase {
  constructor(private readonly repo: SkillsRepository) {}

  async execute(data: Omit<ISkill, "id">): Promise<ISkill[]> {
    return this.repo.addSkill(data);
  }
}
