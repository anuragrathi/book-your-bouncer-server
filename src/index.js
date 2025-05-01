const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config(); // <--- Make sure this is before using envs
require("./config/passport");

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const SESSION_SECRET = process.env.SESSION_SECRET || "defaultsecret";

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to Bouncer API - Node",
    status: true,
  });
});

const authRouters = require("./routes/auth.route.js");
app.use("/api/auth", authRouters);

// const userRouters = require("./routes/user.route.js");
// app.use("/api/user", userRouters);

module.exports = app;
