import { Router } from "express";
import { ExperienceRepository } from "../infrastructure/experience.repository.ts";
import { GetExperiencesUseCase } from "../application/get-experiences.usecase.ts";
import { AddExperienceUseCase } from "../application/add-experience.usecase.ts";
import { ReplaceExperiencesUseCase } from "../application/replace-experiences.usecase.ts";
import { ExperienceController } from "../presentation/experience.controller.ts";
import { validate, asyncHandler } from "../../../shared/middleware/index.ts";
import {
  AddExperienceSchema,
  ReplaceExperiencesSchema,
} from "./experience.dto.ts";

const experienceRepo = new ExperienceRepository();
const getExperiencesUseCase = new GetExperiencesUseCase(experienceRepo);
const addExperienceUseCase = new AddExperienceUseCase(experienceRepo);
const replaceExperiencesUseCase = new ReplaceExperiencesUseCase(experienceRepo);
const experienceController = new ExperienceController(
  getExperiencesUseCase,
  addExperienceUseCase,
  replaceExperiencesUseCase,
);

export const experienceRouter = Router();

experienceRouter.get("/", experienceController.getAll);
experienceRouter.post(
  "/",
  validate(AddExperienceSchema),
  asyncHandler(experienceController.add),
);
experienceRouter.patch(
  "/",
  validate(ReplaceExperiencesSchema),
  asyncHandler(experienceController.replace),
);
