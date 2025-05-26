// configs/passport.js
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.model.js";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} from "./env.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          googleId: profile.id,
        });

        if (existingUser) return done(null, existingUser);

        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          profilePicture: profile.photos[0].value,
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
