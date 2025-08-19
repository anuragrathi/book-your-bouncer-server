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

module.exports = optionalAuth;
