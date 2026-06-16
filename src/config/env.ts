import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().default("3000"),
	MONGODB_URI: z.string().min(1),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	CORS_ORIGIN: z.string().default(`${import.meta.env.CORS_ORIGIN}`),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("❌ Invalid environment variables:", parsed.error.format());
	process.exit(1);
}

export const env = parsed.data;
