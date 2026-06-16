import { Router } from "express";
import { SkillsRepository } from "../infrastructure/skills.repository";
import { GetSkillsUseCase } from "../application/get-skills.usecase";
import { AddSkillUseCase } from "../application/add-skill.usecase";
import { ReplaceSkillsUseCase } from "../application/replace-skills.usecase";
import { SkillsController } from "../presentation/skills.controller";
import { validate, asyncHandler } from "../../../shared/middleware/index";
import { AddSkillSchema, ReplaceSkillsSchema } from "./skill.dto";

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
