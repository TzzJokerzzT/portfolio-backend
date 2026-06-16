import { Router } from "express";
import { PersonalInformationRepository } from "../infrastructure/personal-information.repository";
import { GetPersonalInformationUseCase } from "../application/get-personal-information.usecase";
import { CreatePersonalInformationUseCase } from "../application/create-personal-information.usecase";
import { UpdatePersonalInformationUseCase } from "../application/update-personal-information.usecase";
import { PersonalInformationController } from "../presentation/personal-information.controller";
import { validate, asyncHandler } from "../../../shared/middleware/index";
import {
  CreatePersonalInformationSchema,
  UpdatePersonalInformationSchema,
} from "./personal-information.dto";

const personalInformationRepo = new PersonalInformationRepository();
const getPersonalInformationUseCase = new GetPersonalInformationUseCase(
  personalInformationRepo,
);
const createPersonalInformationUseCase = new CreatePersonalInformationUseCase(
  personalInformationRepo,
);
const updatePersonalInformationUseCase = new UpdatePersonalInformationUseCase(
  personalInformationRepo,
);
const personalInformationController = new PersonalInformationController(
  getPersonalInformationUseCase,
  createPersonalInformationUseCase,
  updatePersonalInformationUseCase,
);

export const personalInformationRouter = Router();

personalInformationRouter.get("/", personalInformationController.getOne);
personalInformationRouter.post(
  "/",
  validate(CreatePersonalInformationSchema),
  asyncHandler(personalInformationController.create),
);
personalInformationRouter.patch(
  "/",
  validate(UpdatePersonalInformationSchema),
  asyncHandler(personalInformationController.update),
);
