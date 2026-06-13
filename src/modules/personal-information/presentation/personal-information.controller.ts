import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { GetPersonalInformationUseCase } from "../application/get-personal-information.usecase.ts";
import type { CreatePersonalInformationUseCase } from "../application/create-personal-information.usecase.ts";
import type { UpdatePersonalInformationUseCase } from "../application/update-personal-information.usecase.ts";

export class PersonalInformationController {
  constructor(
    private readonly getPersonalInformationUseCase: GetPersonalInformationUseCase,
    private readonly createPersonalInformationUseCase: CreatePersonalInformationUseCase,
    private readonly updatePersonalInformationUseCase: UpdatePersonalInformationUseCase,
  ) {}

  getOne = async (_req: Request, res: Response): Promise<void> => {
    const info = await this.getPersonalInformationUseCase.execute();
    res.status(StatusCodes.OK).json({ data: info });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const info = await this.createPersonalInformationUseCase.execute(req.body);
    res.status(StatusCodes.CREATED).json({ data: info });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const info = await this.updatePersonalInformationUseCase.execute(req.body);
    res.status(StatusCodes.OK).json({ data: info });
  };
}
