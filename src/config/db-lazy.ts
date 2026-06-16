import { connectDB } from "./database.ts";

let dbConnected = false;

export const ensureDB = async () => {
	if (!dbConnected) {
		await connectDB();
		dbConnected = true;
	}
};
