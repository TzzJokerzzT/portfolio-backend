import mongoose from "mongoose";
import { env } from "./env.ts";

export const connectDB = async (): Promise<void> => {
  // Already connected or connecting — reuse the existing connection
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return;
  }

  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    // Throw instead of process.exit — let Express error handler deal with it
    throw new Error(
      `MongoDB connection failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
