const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");
console.log("stage1");
// Google OAuth Strategy (hard-coded for now)
passport.use(
  new GoogleStrategy(
    {
      clientID: "process.env.GOOGLE_CLIENT_ID",
      clientSecret: "process.env.GOOGLE_CLIENT_SECRET",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("stage google stratergy", GoogleStrategy);

      try {
        console.log("stage2 try");
        let user = await User.findOne({ googleId: profile.id });
        console.log("user:", user);
        if (!user) {
          console.log("stage2 try if");

          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }
        return done(null, user);
      } catch (err) {
        console.log(" error:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
