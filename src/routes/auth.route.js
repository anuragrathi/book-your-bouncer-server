const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controller/auth.controller.js");
const jwtProvider = require("../config/jwtProvider");

// Register and normal login routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Google OAuth login - initiate
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback - generate JWT and redirect with token
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false,
  }),
  (req, res) => {
    // Generate JWT for logged in user
    const token = jwtProvider.generateToken(req.user._id); // Redirect to frontend with JWT token in URL params

    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);

// Optional endpoint to check if user is authenticated (can be used for sessions if needed)
router.get("/google/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Logout route (optional, clears session if used)
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully from session " });
  });
});

module.exports = router;
