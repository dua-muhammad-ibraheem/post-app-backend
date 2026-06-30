
require("dotenv").config();
const cors = require("cors");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
app.use(cors());
// Connect Database
connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

