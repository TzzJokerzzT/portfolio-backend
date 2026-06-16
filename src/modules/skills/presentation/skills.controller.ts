import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { GetSkillsUseCase } from "../application/get-skills.usecase";
import type { AddSkillUseCase } from "../application/add-skill.usecase";
import type { ReplaceSkillsUseCase } from "../application/replace-skills.usecase";

export class SkillsController {
  constructor(
    private readonly getSkillsUseCase: GetSkillsUseCase,
    private readonly addSkillUseCase: AddSkillUseCase,
    private readonly replaceSkillsUseCase: ReplaceSkillsUseCase,
  ) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const skills = await this.getSkillsUseCase.execute();
    res.status(StatusCodes.OK).json({ data: skills });
  };

  add = async (req: Request, res: Response): Promise<void> => {
    const skills = await this.addSkillUseCase.execute(req.body);
    res.status(StatusCodes.CREATED).json({ data: skills });
  };

  replace = async (req: Request, res: Response): Promise<void> => {
    const skills = await this.replaceSkillsUseCase.execute(req.body.skills);
    res.status(StatusCodes.OK).json({ data: skills });
  };
}
