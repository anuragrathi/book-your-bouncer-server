const User = require("../models/user.model");
const Bouncer = require("../models/bouncer.model");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    if (role === "user") {
      user = new User({ name, email, password: hashedPassword });
    } else if (role === "bouncer") {
      user = new Bouncer({ name, email, password: hashedPassword });
    } else {
      return res.status(400).send({ message: "Invalid role" });
    }

    await user.save();
    const token = jwtProvider.generateToken(user._id, role);

    res.status(200).send({
      token,
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === "user") {
      user = await User.findOne({ email });
    } else if (role === "bouncer") {
      user = await Bouncer.findOne({ email });
    } else {
      return res.status(400).send({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwtProvider.generateToken(user._id, role);

    return res.status(200).send({
      token,
      message: "Login successful",
      user,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { register, login };
