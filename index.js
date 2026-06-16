import { app } from "./src/app.ts";
import { connectDB } from "./src/config/database.ts";
import { env } from "./src/config/env.ts";

const start = async () => {
	await connectDB();
	app.listen(env.PORT, () => {
		console.log(`🚀 Server running on http://localhost:${env.PORT}`);
	});
};

start();
