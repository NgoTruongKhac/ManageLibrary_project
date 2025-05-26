import dotenv, { config } from "dotenv";

dotenv.config();

export const {
  SERVER_URL,
  PORT,
  DB_URI,
  JWT_SECRET_KEY,
  JWT_EXPIRE,
  PASS_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  SESSION_SECRET,
  FONTEND_DOMAIN,
} = process.env;
