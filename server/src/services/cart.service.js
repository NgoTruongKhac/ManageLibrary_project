import User from "../models/user.model.js";
import ErrorHandler from "../middlewares/errors/ErrorHandler.js";

export const addCartService = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) throw new ErrorHandler("user not found", 404);

  const existingItem = user.cart.find((item) => item.bookId.equals(bookId));
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    user.cart.push({ bookId, quantity: 1 });
  }

  await user.save();
  return user.cart;
};

export const deleteCartService = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) throw new ErrorHandler("user not found", 404);

  user.cart = user.cart.filter((item) => !item.bookId.equals(bookId));

  await user.save();
  return user.cart;
};

export const updateCartService = async (userId, bookId, quantity) => {
  if (quantity <= 0) throw new ErrorHandler("so luong phai lon hon 0", 404);

  const user = await User.findById(userId);
  if (!user) throw new ErrorHandler("user not found", 404);

  const item = user.cart.find((item) => item.bookId.equals(bookId));
  if (!item) throw new ErrorHandler("sach khong co trong gio", 404);

  item.quantity = quantity;

  await user.save();
  return user.cart;
};

//6.3 lấy danh sách giỏ hàng từ cơ sở dữ liệu qua getCartsService() từ lớp CartService
export const getCartsService = async (userId) => {
  const user = await User.findById(userId)
    .populate({
      path: "cart.bookId",
      select: "title coverImage category subCategory stock",
    })
    .lean();

  if (!user) throw new Error("Người dùng không tồn tại");

  return user.cart.map((item) => ({
    bookId: item.bookId._id,
    title: item.bookId.title,
    coverImage: item.bookId.coverImage,
    category: item.bookId.category,
    subCategory: item.bookId.subCategory,
    stock: item.bookId.stock,
    quantity: item.quantity,
  }));
};
