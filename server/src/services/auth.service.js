import User from "../models/user.model.js";
import hashPassword from "../utils/bcrypt.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import ErrorHandler from "../middlewares/errors/ErrorHandler.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signUpService = async (req, username, email, password) => {
  const sessionOtp = crypto.randomInt(100000, 999999).toString();

  const otpExpiresAt = Date.now() + 3 * 60 * 1000; // 3 phút

  req.session.signupData = {
    username,
    password,
    email,
    sessionOtp,
    otpExpiresAt,
  };

  await sendEmail(email, "ma xac nhan dang ky", `ma otp: ${sessionOtp}`);
};

export const verifySignUpService = async (req, otp) => {
  const sessionData = req.session.signupData;

  if (!sessionData) {
    throw new ErrorHandler("Không tìm thấy dữ liệu đăng ký.");
  }

  const { username, password, email, sessionOtp, otpExpiresAt } = sessionData;

  // Kiểm tra thời gian hết hạn
  if (Date.now() > otpExpiresAt) {
    delete req.session.signupData;
    throw new ErrorHandler("OTP đã hết hạn. Vui lòng yêu cầu OTP mới.");
  }

  // Kiểm tra mã OTP có đúng không
  if (sessionOtp !== otp) {
    throw new ErrorHandler("OTP không chính xác.", 400);
  }

  // Xóa OTP khỏi session
  delete req.session.signupData;

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Tạo người dùng mới
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

// method đăng nhập
export const signInService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new ErrorHandler("email không đúng", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ErrorHandler("sai mật khẩu", 400);

  const token = generateToken(user._id);
  return token;
};

export const logOutService = async (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });
};
