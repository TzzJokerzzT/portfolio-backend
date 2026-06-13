import type { SkillsRepository } from "../infrastructure/skills.repository.ts";
import type { ISkill } from "../domain/skill.entity.ts";

export class ReplaceSkillsUseCase {
  constructor(private readonly repo: SkillsRepository) {}

  async execute(skills: ISkill[]): Promise<ISkill[]> {
    return this.repo.replaceSkills(skills);
  }
}
