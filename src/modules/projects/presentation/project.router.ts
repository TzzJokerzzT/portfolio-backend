import { Router } from "express";
import { ProjectRepository } from "../infrastructure/project.repository.ts";
import { GetProjectsUseCase } from "../application/get-projects.usecase.ts";
import { CreateProjectUseCase } from "../application/create-project.usecase.ts";
import { UpdateProjectUseCase } from "../application/update-project.usecase.ts";
import { ProjectController } from "../presentation/project.controller.ts";
import { validate } from "../../../shared/middleware/index.ts";
import { asyncHandler } from "../../../shared/middleware/index.ts";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
} from "./create-project.dto.ts";

const projectRepo = new ProjectRepository();
const getProjectsUseCase = new GetProjectsUseCase(projectRepo);
const createProjectUseCase = new CreateProjectUseCase(projectRepo);
const updateProjectUseCase = new UpdateProjectUseCase(projectRepo);
const projectController = new ProjectController(
  getProjectsUseCase,
  createProjectUseCase,
  updateProjectUseCase,
);

export const projectRouter = Router();

projectRouter.get("/", projectController.getAll);
projectRouter.post(
  "/",
  validate(CreateProjectSchema),
  asyncHandler(projectController.create),
);
projectRouter.patch(
  "/:id",
  validate(UpdateProjectSchema),
  asyncHandler(projectController.update),
);
