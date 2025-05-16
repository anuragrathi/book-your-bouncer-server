const jwt = require("jsonwebtoken");
const ECRET_KEYd=require("dotenv").config();
const key = process.env.SECRET_KEY ; // Replace with your actual secret key
/// secret key jfncjfbvhjfbvhfdogih4ghfbfbfdhvbhvb
const SECRET_KEYd = key.SECRET_KEY;
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};
const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
