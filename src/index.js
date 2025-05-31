// 🌐 Core Dependencies
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

// 🚀 App Init
const app = express();

// 🔐 Environment Config
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const SESSION_SECRET = process.env.SESSION_SECRET || "defaultsecret";

// 🧩 Middleware
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [CLIENT_URL, "http://localhost:3000"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // secure session handling
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Bouncer API - Node",
    status: true,
  });
});

// 📦 API Routes
app.use("/api/auth", require("./routes/auth.route.js"));
app.use("/api/products", require("./routes/product.route.js"));
app.use("/api/accounts", require("./routes/account.route.js"));
app.use("/api/product-line-items", require("./routes/productLineItem.route.js"));
app.use("/api/filter", require("./routes/filter.route.js"));

// 🔄 Salesforce Outbound Routes
app.use("/sfdc/accounts", require("./sfdc/routes/accountRoutes"));

// 🧪 Future Expansion: Salesforce Inbound (disabled for now)
// app.use("/api/auth", require("./routes/auth.route.js"));
// app.use("/api/products", require("./routes/product.route.js"));
// app.use("/api/accounts", require("./routes/account.route.js"));
// app.use("/api/product-line-items", require("./routes/productLineItem.route.js"));

// 🚀 Export App
module.exports = app;
