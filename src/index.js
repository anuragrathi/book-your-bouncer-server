const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const SESSION_SECRET = process.env.SESSION_SECRET || "defaultsecret";

// Middleware
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
    saveUninitialized: false, // recommended for login-based apps
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to Bouncer API - Node",
    status: true,
  });
});

// Routes
app.use("/api/auth", require("./routes/auth.route.js"));
app.use("/api/products", require("./routes/product.route.js"));
app.use("/api/accounts", require("./routes/account.route.js"));
app.use("/api/product-line-items",require("./routes/productLineItem.route.js"));

module.exports = app;
