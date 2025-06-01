const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controller/auth.controller.js");
require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// 👤 Traditional auth
router.post("/register", authController.register);
router.post("/login", authController.login);

// 🔐 Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/login`,
    session: true,
  }),
  (req, res) => {
    // On success, redirect to frontend root
    res.redirect(CLIENT_URL);
  }
);

// ✅ Return user if logged in
router.get("/google/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// 🔓 Logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
