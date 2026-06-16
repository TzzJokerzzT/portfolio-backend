import { connectDB } from "./database";

let dbConnected = false;

export const ensureDB = async () => {
	if (!dbConnected) {
		await connectDB();
		dbConnected = true;
	}
};
