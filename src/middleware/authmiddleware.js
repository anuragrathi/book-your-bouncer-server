const jwtProvider = require("../config/jwtProvider.js");
const User = require("../models/user.model.js");

const optionalAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    try {
      const token = authorization.split(" ")[1];
      const userId = jwtProvider.getUserIdFromToken(token);
      req.user = await User.findById(userId).select("-password");
    } catch (error) {
      console.log("Invalid token, continuing as guest");
      req.user = null;
    }
  } else {
    req.user = null; 
  }

  next();
};

const StrictAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  try {
    const token = authorization.split(" ")[1];
    const userId = jwtProvider.getUserIdFromToken(token);

    req.user = await User.findById(userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found or invalid token" });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = {optionalAuth,StrictAuth};
