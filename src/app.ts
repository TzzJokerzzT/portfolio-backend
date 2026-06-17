import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/database";
import { ensureDB } from "./config/db-lazy";
import { env } from "./config/env";
import { aboutMeRouter } from "./modules/about-me/presentation/about-me.router";
import { experienceRouter } from "./modules/experience/presentation/experience.router";
import { introductionRouter } from "./modules/introduction/presentation/introduction.router";
import { personalInformationRouter } from "./modules/personal-information/presentation/personal-information.router";
import { projectRouter } from "./modules/projects/presentation/project.router";
import { quotesRouter } from "./modules/quotes/presentation/quotes.router";
import { skillsRouter } from "./modules/skills/presentation/skills.router";
import { errorHandler } from "./shared/middleware/error-handler";

const app = express();

app.use(helmet());
app.use(
	cors({
		origin: (origin, callback) => {
			// Allow non-browser requests (curl, server-to-server, etc.)
			if (!origin) return callback(null, true);

			const allowed = env.CORS_ORIGIN.split(",").map((s) => s.trim());

			// Universal wildcard: allow all origins
			if (allowed.includes("*")) return callback(null, true);

			// Exact match
			if (allowed.includes(origin)) return callback(null, true);

			// Wildcard patterns like *.vercel.app
			const wildcardMatch = allowed.some((pattern) => {
				if (pattern.startsWith("*.")) {
					const domain = pattern.slice(1);
					return origin.endsWith(domain);
				}
				return false;
			});

			if (wildcardMatch) return callback(null, true);

			callback(new Error("Not allowed by CORS"));
		},
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);
app.use(morgan("dev"));
app.use(express.json());

// Health check — no DB required
app.get("/health", (_, res) => {
	res.json({ status: "ok" });
});

// Lazy DB connection for API routes only
app.use("/api", async (_req, _res, next) => {
	try {
		await ensureDB();
		next();
	} catch (err) {
		next(err);
	}
});

app.use("/api/projects", projectRouter);
app.use("/api/introduction", introductionRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/quotes", quotesRouter);
app.use("/api/about-me", aboutMeRouter);
app.use("/api/personal-information", personalInformationRouter);
app.use("/api/experience", experienceRouter);

app.use(errorHandler);

export default app;

// Local development only — Vercel sets NODE_ENV=production
if (env.NODE_ENV === "development") {
	const start = async () => {
		await connectDB();
		app.listen(env.PORT, () => {
			console.log(`🚀 Server running on http://localhost:${env.PORT}`);
		});
	};
	start();
}
