import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3001"),
  MONGODB_URI: z.string().default(""),
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  CORS_ORIGIN: z.string().default("*"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  console.warn("⚠️  Using fallback defaults — some features may not work");
}

// Use parsed data if valid, otherwise fall back to schema defaults
const raw = parsed.success ? parsed.data : envSchema.parse({});
export const env = raw;
