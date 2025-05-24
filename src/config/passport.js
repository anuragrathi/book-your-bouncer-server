// config/passport.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");

console.log("🔄 Loading Passport Google OAuth strategy...");
/*
// Google OAuth Strategy — hardcoded credentials
passport.use(
  new GoogleStrategy(
    {
      clientID: "397306430248-l3d1fh36bbpaqvvs8059g41hld20o98s.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5858/api/auth/google/callback", // Must match your router path
      scope: ["profile", "email"],
    }, */

const GOOGLE_CLIENT_ID ="397306430248-l3d1fh36bbpaqvvs8059g41hld20o98s.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_CALLBACK_URL = "http://localhost:5858/api/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName, // ✅ this satisfies the required 'name' field
            email: profile.emails?.[0]?.value || "",
            image: profile.photos?.[0]?.value || "",
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("❌ Passport error:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize and deserialize users for session support
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
