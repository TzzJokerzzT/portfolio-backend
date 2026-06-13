import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { projectRouter } from "./modules/projects/presentation/project.router.ts";
import { introductionRouter } from "./modules/introduction/presentation/introduction.router.ts";
import { skillsRouter } from "./modules/skills/presentation/skills.router.ts";
import { quotesRouter } from "./modules/quotes/presentation/quotes.router.ts";
import { aboutMeRouter } from "./modules/about-me/presentation/about-me.router.ts";
import { personalInformationRouter } from "./modules/personal-information/presentation/personal-information.router.ts";
import { experienceRouter } from "./modules/experience/presentation/experience.router.ts";
import { errorHandler } from "./shared/middleware/error-handler.ts";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/projects", projectRouter);
app.use("/api/introduction", introductionRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/quotes", quotesRouter);
app.use("/api/about-me", aboutMeRouter);
app.use("/api/personal-information", personalInformationRouter);
app.use("/api/experience", experienceRouter);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

export { app };
