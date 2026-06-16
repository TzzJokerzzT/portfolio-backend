import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { GetExperiencesUseCase } from "../application/get-experiences.usecase";
import type { AddExperienceUseCase } from "../application/add-experience.usecase";
import type { ReplaceExperiencesUseCase } from "../application/replace-experiences.usecase";

export class ExperienceController {
  constructor(
    private readonly getExperiencesUseCase: GetExperiencesUseCase,
    private readonly addExperienceUseCase: AddExperienceUseCase,
    private readonly replaceExperiencesUseCase: ReplaceExperiencesUseCase,
  ) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const experiences = await this.getExperiencesUseCase.execute();
    res.status(StatusCodes.OK).json({ data: experiences });
  };

  add = async (req: Request, res: Response): Promise<void> => {
    const experiences = await this.addExperienceUseCase.execute(req.body);
    res.status(StatusCodes.CREATED).json({ data: experiences });
  };

  replace = async (req: Request, res: Response): Promise<void> => {
    const experiences = await this.replaceExperiencesUseCase.execute(
      req.body.experiences,
    );
    res.status(StatusCodes.OK).json({ data: experiences });
  };
}
