import mongoose from "mongoose";
import ErrorHandler from "../middlewares/errors/ErrorHandler.js";
import User from "../models/user.model.js";
import { deleteFile } from "../utils/deleteFile.js";
import Ticket from "../models/ticket.model.js";

// Lấy user theo ID
export const getUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ErrorHandler("Không tìm thấy user", 404);
  return user;
};

export const getAllUserService = async (page = 1, limit = 8) => {
  const skip = (page - 1) * limit;
  const users = await User.find().skip(skip).limit(limit);
  const total = await User.countDocuments();
  return { users, total };
};

export const getUserByEmailService = async (keyword) => {
  const regex = new RegExp(keyword, "i");
  const users = await User.find({
    $or: [{ email: { $regex: regex } }, { username: { $regex: regex } }],
  });
  return users;
};

// Xóa user
export const deleteUserService = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Xóa user
    const user = await User.findByIdAndDelete(userId, { session });
    if (!user) {
      throw new ErrorHandler("Không tìm thấy user để xóa", 404);
    }

    // Xóa tất cả ticket liên quan
    await Ticket.deleteMany({ userId }, { session });

    // Commit transaction nếu mọi thứ thành công
    await session.commitTransaction();
    session.endSession();

    return user;
  } catch (err) {
    // Rollback nếu có lỗi
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

// Tạo user mới
export const createUserService = async (userData, avatar) => {
  const { username, email, password, gender, birthday } = userData;

  const user = new User({
    username,
    email,
    password,
    gender,
    birthday,
    avatar: avatar || "/uploads/avatars/blank-avatar.png",
  });

  return await user.save();
};

//5.5 lưu thông tin thay đổi xuống cơ sở dữ liệu trong lớp UserService theo phương thức updateUserService().
export const updateUserService = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!user) throw new ErrorHandler("Không tìm thấy user để cập nhật", 404);
  return user;
};

export const updateUserServiceAdmin = async (userId, userData, avatar) => {
  const userUdate = await User.findByIdAndUpdate(
    userId,

    {
      ...userData,
      ...(avatar && { avatar }),
    },
    {
      new: true,
    }
  );
  return userUdate;
};

export const updateAvatarService = async (userId, avatarPath) => {
  const user = await User.findById(userId);
  if (!user) return null;
  const oldAvatarPath = user.avatar;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: avatarPath },
    { new: true }
  );

  if (
    oldAvatarPath &&
    oldAvatarPath !== avatarPath &&
    !oldAvatarPath.includes("blank-avatar.png")
  ) {
    deleteFile(oldAvatarPath);
  }
  return updatedUser;
};
export const getTotalUsersService = async () => {
  const total = await User.estimatedDocumentCount();

  return total;
};
