import { Router } from "express";
import { AboutMeRepository } from "../infrastructure/about-me.repository.ts";
import { GetAboutMeUseCase } from "../application/get-about-me.usecase.ts";
import { CreateAboutMeUseCase } from "../application/create-about-me.usecase.ts";
import { UpdateAboutMeUseCase } from "../application/update-about-me.usecase.ts";
import { AboutMeController } from "../presentation/about-me.controller.ts";
import { validate, asyncHandler } from "../../../shared/middleware/index.ts";
import { CreateAboutMeSchema, UpdateAboutMeSchema } from "./about-me.dto.ts";

const aboutMeRepo = new AboutMeRepository();
const getAboutMeUseCase = new GetAboutMeUseCase(aboutMeRepo);
const createAboutMeUseCase = new CreateAboutMeUseCase(aboutMeRepo);
const updateAboutMeUseCase = new UpdateAboutMeUseCase(aboutMeRepo);
const aboutMeController = new AboutMeController(
  getAboutMeUseCase,
  createAboutMeUseCase,
  updateAboutMeUseCase,
);

export const aboutMeRouter = Router();

aboutMeRouter.get("/", aboutMeController.getOne);
aboutMeRouter.post(
  "/",
  validate(CreateAboutMeSchema),
  asyncHandler(aboutMeController.create),
);
aboutMeRouter.patch(
  "/",
  validate(UpdateAboutMeSchema),
  asyncHandler(aboutMeController.update),
);
