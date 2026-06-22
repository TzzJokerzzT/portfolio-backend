import { Router } from "express";
import { asyncHandler, validate } from "../../../shared/middleware/index";
import { CreateProjectUseCase } from "../application/create-project.usecase";
import { GetProjectsUseCase } from "../application/get-projects.usecase";
import { UpdateProjectUseCase } from "../application/update-project.usecase";
import { ProjectRepository } from "../infrastructure/project.repository";
import { ProjectController } from "../presentation/project.controller";
import { CreateProjectSchema, UpdateProjectSchema } from "./create-project.dto";

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
