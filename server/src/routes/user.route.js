import {
  getUser,
  deleteUser,
  createUser,
  updateUser,
  updateAvatar,
  getUserByEmail,
  getAllUsers,
  updateUserAdmin,
  getTotalUsers,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/auth/veryfyToken.js";
import upload from "../configs/multer.js";

const userRouter = Router();
userRouter.patch("/admin/:userId", upload.single("avatar"), updateUserAdmin);
userRouter.get("/search", getUserByEmail);
userRouter.get("/total", getTotalUsers);
userRouter.get("/:userId", getUser);
userRouter.get("/", getAllUsers);
userRouter.delete("/:userId", deleteUser);
userRouter.patch("/:userId", updateUser);
userRouter.post("/", upload.single("avatar"), createUser);
userRouter.patch("/:userId/avatar", upload.single("avatar"), updateAvatar);

export default userRouter;
