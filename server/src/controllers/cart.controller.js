import {
  addCartService,
  deleteCartService,
  updateCartService,
  getCartsService,
} from "../services/cart.service.js";

export const addCart = async (req, res, next) => {
  try {
    const userId = req.userId; // Đảm bảo bạn có middleware xác thực user
    const { bookId } = req.params;

    const cart = await addCartService(userId, bookId);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params;

    const cart = await deleteCartService(userId, bookId);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params;
    const { quantity } = req.body;

    const cart = await updateCartService(userId, bookId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

//6.2 gọi phương thức getCarts() đê lấy danh sách giỏ hàng từ lớp CartController
export const getCarts = async (req, res, next) => {
  try {
    const userId = req.userId;
    const carts = await getCartsService(userId);
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};
