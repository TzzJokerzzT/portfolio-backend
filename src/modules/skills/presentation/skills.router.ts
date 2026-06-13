import { Router } from "express";
import { SkillsRepository } from "../infrastructure/skills.repository.ts";
import { GetSkillsUseCase } from "../application/get-skills.usecase.ts";
import { AddSkillUseCase } from "../application/add-skill.usecase.ts";
import { ReplaceSkillsUseCase } from "../application/replace-skills.usecase.ts";
import { SkillsController } from "../presentation/skills.controller.ts";
import { validate, asyncHandler } from "../../../shared/middleware/index.ts";
import { AddSkillSchema, ReplaceSkillsSchema } from "./skill.dto.ts";

const skillsRepo = new SkillsRepository();
const getSkillsUseCase = new GetSkillsUseCase(skillsRepo);
const addSkillUseCase = new AddSkillUseCase(skillsRepo);
const replaceSkillsUseCase = new ReplaceSkillsUseCase(skillsRepo);
const skillsController = new SkillsController(
  getSkillsUseCase,
  addSkillUseCase,
  replaceSkillsUseCase,
);

export const skillsRouter = Router();

skillsRouter.get("/", skillsController.getAll);
skillsRouter.post(
  "/",
  validate(AddSkillSchema),
  asyncHandler(skillsController.add),
);
skillsRouter.patch(
  "/",
  validate(ReplaceSkillsSchema),
  asyncHandler(skillsController.replace),
);
