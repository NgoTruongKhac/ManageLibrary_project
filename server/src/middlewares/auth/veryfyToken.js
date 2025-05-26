import ErrorHandler from "../errors/ErrorHandler.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../configs/env.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ErrorHandler("Không có token", 401);
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, JWT_SECRET_KEY);

    req.userId = decode.userId;
    next();
  } catch (error) {
    next(error);
  }
};
