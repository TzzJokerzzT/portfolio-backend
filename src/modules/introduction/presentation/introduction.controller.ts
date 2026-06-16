import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { GetIntroductionUseCase } from "../application/get-introduction.usecase";
import type { CreateIntroductionUseCase } from "../application/create-introduction.usecase";
import type { UpdateIntroductionUseCase } from "../application/update-introduction.usecase";

export class IntroductionController {
  constructor(
    private readonly getIntroductionUseCase: GetIntroductionUseCase,
    private readonly createIntroductionUseCase: CreateIntroductionUseCase,
    private readonly updateIntroductionUseCase: UpdateIntroductionUseCase,
  ) {}

  getOne = async (_req: Request, res: Response): Promise<void> => {
    const introduction = await this.getIntroductionUseCase.execute();
    res.status(StatusCodes.OK).json({ data: introduction });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const introduction = await this.createIntroductionUseCase.execute(req.body);
    res.status(StatusCodes.CREATED).json({ data: introduction });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const introduction = await this.updateIntroductionUseCase.execute(req.body);
    res.status(StatusCodes.OK).json({ data: introduction });
  };
}
