import { Router } from "express";
import { IntroductionRepository } from "../infrastructure/introduction.repository.ts";
import { GetIntroductionUseCase } from "../application/get-introduction.usecase.ts";
import { CreateIntroductionUseCase } from "../application/create-introduction.usecase.ts";
import { UpdateIntroductionUseCase } from "../application/update-introduction.usecase.ts";
import { IntroductionController } from "../presentation/introduction.controller.ts";
import { validate, asyncHandler } from "../../../shared/middleware/index.ts";
import {
  CreateIntroductionSchema,
  UpdateIntroductionSchema,
} from "./introduction.dto.ts";

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
