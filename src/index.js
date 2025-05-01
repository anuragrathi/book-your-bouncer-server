const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use(
  session({
    //hbvhbhjvvhev21334fsf enter in secret
    secret: "****************",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome to Bouncer API - Node", status: true });
});

const authRouters = require("./routes/auth.route.js");
app.use("/api/auth", authRouters);

// const userRouters = require("./routes/user.route.js");
// app.use("/api/user", userRouters);


module.exports = app;
