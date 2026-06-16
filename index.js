import { app } from "./src/app.ts";
import { connectDB } from "./src/config/database.ts";
import { ensureDB } from "./src/config/db-lazy.ts";
import { env } from "./src/config/env.ts";

// Export the app for Vercel serverless
export default app;
export { ensureDB };

// Local development: start the server directly
if (env.NODE_ENV === "development") {
	const start = async () => {
		await connectDB();
		app.listen(env.PORT, () => {
			console.log(`🚀 Server running on http://localhost:${env.PORT}`);
		});
	};
	start();
}
