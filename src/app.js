const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Zine Backend Server is Running...");
});

module.exports = app;