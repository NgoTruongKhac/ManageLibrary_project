import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../configs/env.js";

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  return token;
};
