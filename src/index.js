// 🌐 Core Dependencies
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

// 🔐 Local Configs
require("./config/passport");

// 🚀 App Init
const app = express();

// 🔧 Environment Variables
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const SESSION_SECRET = process.env.SESSION_SECRET || "defaultsecret";

// 🌍 Allow CORS for frontend development environments
const allowedOrigins = [
  CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173", // ✅ Vite dev server
  "http://127.0.0.1:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      console.log(`✅ CORS allowed: ${origin}`);
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
};

// 🧩 Middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Bouncer API - Node",
    status: true,
  });
});


// Routes
app.use("/api/auth", require("./routes/auth.route.js"));
app.use("/api/products", require("./routes/product.route.js"));
app.use("/api/accounts", require("./routes/account.route.js"));
app.use("/api/product-line-items",require("./routes/productLineItem.route.js"));
app.use("/api/bookings", require("./routes/booking.route.js"));
app.use("/api/filter", require("./routes/filter.route"));
app.use("/api/reservation",require("./routes/cart.route.js"));
// 🔄 Salesforce Outbound Routes
app.use("/sfdc/accounts", require("./sfdc/routes/accountRoutes"));
// 🧪 Future Expansion: Salesforce Inbound (disabled)
// app.use("/api/...", require("./routes/..."));

// 🚀 Export App
module.exports = app;
