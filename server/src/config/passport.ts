

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../models/user.models";
import { IUser } from "../types/user.type";
import { generateTokens } from "../utils/jwt";

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
          user = await UserModel.findOne({ email: profile.emails?.[0].value });

          if (user) {
            user.googleId = profile.id;
            user.authProvider = "google";
            await user.save();
          } else {
            user = await UserModel.create({
              googleId: profile.id,
              email: profile.emails?.[0].value,
              name: profile.displayName,
              role: "user",
              isVerified: true,
              authProvider: "google",
            });
          }
        }

        const tokens = generateTokens({ userId: (user._id as string), role: user.role });
        return done(null, { user, tokens });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
