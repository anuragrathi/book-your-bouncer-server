require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
const DEFAULT_EXPIRATION = "24h";
const generateToken = (userId, customExpiration) => {
  return jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: customExpiration || DEFAULT_EXPIRATION,
  });
};

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.userId;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateToken, getUserIdFromToken };
