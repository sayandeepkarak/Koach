import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  DB_URL,
  SECRET_KEY,
  SECRET_ACCESS_KEY,
  EMAIL_SERVICE_USER,
  EMAIL_SERVICE_KEY,
} = process.env;
