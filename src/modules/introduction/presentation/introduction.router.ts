import { Router } from "express";
import { IntroductionRepository } from "../infrastructure/introduction.repository";
import { GetIntroductionUseCase } from "../application/get-introduction.usecase";
import { CreateIntroductionUseCase } from "../application/create-introduction.usecase";
import { UpdateIntroductionUseCase } from "../application/update-introduction.usecase";
import { IntroductionController } from "../presentation/introduction.controller";
import { validate, asyncHandler } from "../../../shared/middleware/index";
import {
  CreateIntroductionSchema,
  UpdateIntroductionSchema,
} from "./introduction.dto";

const introductionRepo = new IntroductionRepository();
const getIntroductionUseCase = new GetIntroductionUseCase(introductionRepo);
const createIntroductionUseCase = new CreateIntroductionUseCase(
  introductionRepo,
);
const updateIntroductionUseCase = new UpdateIntroductionUseCase(
  introductionRepo,
);
const introductionController = new IntroductionController(
  getIntroductionUseCase,
  createIntroductionUseCase,
  updateIntroductionUseCase,
);

export const introductionRouter = Router();

introductionRouter.get("/", introductionController.getOne);
introductionRouter.post(
  "/",
  validate(CreateIntroductionSchema),
  asyncHandler(introductionController.create),
);
introductionRouter.patch(
  "/",
  validate(UpdateIntroductionSchema),
  asyncHandler(introductionController.update),
);
