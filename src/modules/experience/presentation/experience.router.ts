import { Router } from "express";
import { ExperienceRepository } from "../infrastructure/experience.repository";
import { GetExperiencesUseCase } from "../application/get-experiences.usecase";
import { AddExperienceUseCase } from "../application/add-experience.usecase";
import { ReplaceExperiencesUseCase } from "../application/replace-experiences.usecase";
import { ExperienceController } from "../presentation/experience.controller";
import { validate, asyncHandler } from "../../../shared/middleware/index";
import {
  AddExperienceSchema,
  ReplaceExperiencesSchema,
} from "./experience.dto";

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
