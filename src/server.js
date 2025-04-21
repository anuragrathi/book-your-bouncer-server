const app = require(".");
const { connectDb } = require("./config/db");
const PORT = 5858;
app.listen(PORT, async () => {
  await connectDb();
  console.log("Bouncer's Api listing on port :", PORT);
});
