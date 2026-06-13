import type { SkillsRepository } from "../infrastructure/skills.repository.ts";
import type { ISkill } from "../domain/skill.entity.ts";

export class GetSkillsUseCase {
  constructor(private readonly repo: SkillsRepository) {}

  async execute(): Promise<ISkill[]> {
    return this.repo.getSkills();
  }
}
