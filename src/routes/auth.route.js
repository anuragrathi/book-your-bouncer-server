const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controller/auth.controller.js");
const jwtProvider = require("../config/jwtProvider");
require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Register and normal login routes (same in both branches)
router.post("/register", authController.register);
router.post("/login", authController.login);

// Google OAuth login - initiate
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
// Using JWT generation from booking branch + CLIENT_URL from main branch
// session: false because we are using JWT instead of session
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/login`,
    session: false,
  }),
  (req, res) => {
    // Generate JWT token for the logged-in user
    const token = jwtProvider.generateToken(req.user._id);

    // Redirect to frontend app with token in URL query params
    res.redirect(`${CLIENT_URL}/oauth-success?token=${token}`);
  }
);

// Endpoint to return authenticated user info (session-based)
// Relies on req.isAuthenticated() from passport/session
router.get("/google/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Logout route clears session if any
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully from session" });
  });
});

module.exports = router;
