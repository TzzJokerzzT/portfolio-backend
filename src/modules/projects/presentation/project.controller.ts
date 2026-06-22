import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CreateProjectUseCase } from "../application/create-project.usecase";
import type { GetProjectsUseCase } from "../application/get-projects.usecase";
import type { UpdateProjectUseCase } from "../application/update-project.usecase";

export class ProjectController {
	constructor(
		private readonly getProjectsUseCase: GetProjectsUseCase,
		private readonly createProjectUseCase: CreateProjectUseCase,
		private readonly updateProjectUseCase: UpdateProjectUseCase,
	) {}

	getAll = async (req: Request, res: Response): Promise<void> => {
		const projects = await this.getProjectsUseCase.execute();
		res.status(StatusCodes.OK).json({ data: projects });
	};

	create = async (req: Request, res: Response): Promise<void> => {
		const project = await this.createProjectUseCase.execute(req.body);
		res.status(StatusCodes.CREATED).json({ data: project });
	};

	update = async (req: Request, res: Response): Promise<void> => {
		const project = await this.updateProjectUseCase.execute(
			req.params.id as string,
			req.body,
		);
		res.status(StatusCodes.OK).json({ data: project });
	};
}
