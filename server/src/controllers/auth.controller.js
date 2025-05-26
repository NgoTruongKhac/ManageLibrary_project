import {
  verifySignUpService,
  signUpService,
  signInService,
  logOutService,
} from "../services/auth.service.js";

// api gừi mã OPT
export const verifySignUp = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const newUser = await verifySignUpService(req, otp);

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// api đăng kí
export const signUp = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    await signUpService(req, username, email, password);

    res.status(200).json({ message: "gui emai thanh cong" });
  } catch (error) {
    next(error);
  }
};
// api đăng nhập
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await signInService(email, password);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
// api đăng xuất
export const logOut = async (req, res, next) => {
  try {
    await logOutService(res);

    res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    next(error);
  }
};
