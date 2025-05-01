const app = require("./index");
const { connectDb } = require("./config/db");

const PORT =5858;

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Bouncer's API running at http://localhost:${PORT} 🚀`);
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
});
