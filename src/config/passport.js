// config/passport.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");
require("dotenv").config();

console.log("🔄 Loading Passport Google OAuth strategy...");

// Load from environment with fallback for local dev
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:5858/api/auth/google/callback";

// 🧠 Define Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
      passReqToCallback: true, // optional
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            image: profile.photos?.[0]?.value || "",
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("❌ Passport Google OAuth error:", err);
        return done(err, null);
      }
    }
  )
);

// 🔐 Session handlers
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
