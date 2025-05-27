// Import các dịch vụ xử lý xác thực từ file auth.service.js
import {
  verifySignUpService,
  signUpService,
  signInService,
  logOutService,
} from "../services/auth.service.js";

// API xác nhận đăng ký bằng OTP
export const verifySignUp = async (req, res, next) => {
  try {
    // Lấy mã OTP từ request body
    const { otp } = req.body;

    // Gọi dịch vụ xác nhận OTP
    const newUser = await verifySignUpService(req, otp);

    // Trả về phản hồi thành công nếu xác nhận đúng OTP
    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: newUser._id, // ID của user mới
        username: newUser.username, // Tên người dùng
        email: newUser.email, // Email đăng ký
      },
    });
  } catch (error) {
    // Nếu có lỗi, chuyển tiếp cho middleware xử lý lỗi
    next(error);
  }
};

// API đăng ký tài khoản
export const signUp = async (req, res, next) => {
  try {
    // Lấy thông tin đăng ký từ request body
    const { username, email, password, confirmPassword } = req.body;

    // Gọi dịch vụ đăng ký tài khoản mới
    await signUpService(req, username, email, password);

    // Trả về phản hồi xác nhận gửi email kích hoạt
    res.status(200).json({ message: "Gửi email thành công" });
  } catch (error) {
    // Nếu có lỗi, chuyển tiếp cho middleware xử lý lỗi
    next(error);
  }
};

// API đăng nhập
export const signIn = async (req, res, next) => {
  try {
    // Lấy thông tin đăng nhập từ request body
    const { email, password } = req.body;

    // Gọi dịch vụ đăng nhập để lấy token xác thực
    const token = await signInService(email, password);

    // Trả về token cho người dùng
    res.status(200).json({ token });
  } catch (error) {
    // Nếu có lỗi, chuyển tiếp cho middleware xử lý lỗi
    next(error);
  }
};

// API đăng xuất
export const logOut = async (req, res, next) => {
  try {
    // Gọi dịch vụ đăng xuất để xóa token hoặc session
    await logOutService(res);

    // Trả về phản hồi đăng xuất thành công
    res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    // Nếu có lỗi, chuyển tiếp cho middleware xử lý lỗi
    next(error);
  }
};
