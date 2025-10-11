import dotenv from "dotenv";
dotenv.config({ path: ".env" }); 

const { MONGO_URI } = process.env;

export const connectionStr = MONGO_URI;
