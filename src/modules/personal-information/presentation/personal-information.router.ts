import { Router } from "express";
import { PersonalInformationRepository } from "../infrastructure/personal-information.repository.ts";
import { GetPersonalInformationUseCase } from "../application/get-personal-information.usecase.ts";
import { CreatePersonalInformationUseCase } from "../application/create-personal-information.usecase.ts";
import { UpdatePersonalInformationUseCase } from "../application/update-personal-information.usecase.ts";
import { PersonalInformationController } from "../presentation/personal-information.controller.ts";
import { validate, asyncHandler } from "../../../shared/middleware/index.ts";
import {
  CreatePersonalInformationSchema,
  UpdatePersonalInformationSchema,
} from "./personal-information.dto.ts";

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
