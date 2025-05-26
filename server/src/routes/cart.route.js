import { Router } from "express";
import {
  addCart,
  deleteCart,
  updateCart,
  getCarts,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth/veryfyToken.js";

const cartRouter = Router();

cartRouter.post("/:bookId", verifyToken, addCart);
cartRouter.delete("/:bookId", verifyToken, deleteCart);
cartRouter.patch("/:bookId", verifyToken, updateCart);
cartRouter.get("/", verifyToken, getCarts);

export default cartRouter;
