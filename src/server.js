// server.js

const app = require("./index");
const { connectDb } = require("./config/db");

const PORT = process.env.PORT || 5858;


(async () => {
  try {
    await connectDb();
    console.log("✅ MongoDB connected");
    
    app.listen(PORT, () => {
      console.log(`🚀 Bouncer's API running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
})();
