import {
  signUp,
  verifySignUp,
  signIn,
  logOut,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import validate from "../middlewares/validations/validate.js";
import signUpValidationRules from "../middlewares/validations/auth.validation.js";
import passport from "passport";
import { generateToken } from "../utils/generateToken.js";
import { FONTEND_DOMAIN } from "../configs/env.js";

const authRouter = Router();

authRouter.post("/sign-up", validate(signUpValidationRules), signUp);
authRouter.post("/verify-sign-up", verifySignUp);
authRouter.post("/sign-in", signIn);
authRouter.get("/log-out", logOut);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    const redirectUrl = `${FONTEND_DOMAIN}/google-auth-success?token=${token}`;
    res.redirect(redirectUrl);
    // const androidRedirect = `myapp://auth/google/callback?token=${token}`;
    // res.redirect(androidRedirect);
  }
);

export default authRouter;
