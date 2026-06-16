import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { GetAboutMeUseCase } from "../application/get-about-me.usecase";
import type { CreateAboutMeUseCase } from "../application/create-about-me.usecase";
import type { UpdateAboutMeUseCase } from "../application/update-about-me.usecase";

export class AboutMeController {
  constructor(
    private readonly getAboutMeUseCase: GetAboutMeUseCase,
    private readonly createAboutMeUseCase: CreateAboutMeUseCase,
    private readonly updateAboutMeUseCase: UpdateAboutMeUseCase,
  ) {}

  getOne = async (_req: Request, res: Response): Promise<void> => {
    const aboutMe = await this.getAboutMeUseCase.execute();
    res.status(StatusCodes.OK).json({ data: aboutMe });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const aboutMe = await this.createAboutMeUseCase.execute(req.body);
    res.status(StatusCodes.CREATED).json({ data: aboutMe });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const aboutMe = await this.updateAboutMeUseCase.execute(req.body);
    res.status(StatusCodes.OK).json({ data: aboutMe });
  };
}
