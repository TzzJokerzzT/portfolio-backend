import { app } from "./src/app";
import { connectDB } from "./src/config/database";
import { ensureDB } from "./src/config/db-lazy";
import { env } from "./src/config/env";

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
