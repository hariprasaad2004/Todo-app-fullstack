const path = require("path");
require("dotenv").config({
  // Load .env from this server folder even when running from repo root
  path: path.join(__dirname, ".env")
});

const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");

// CONNECT ROUTES (ADD THIS)
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Missing MONGO_URI. Add it to server/.env");
  process.exit(1);
}

  
// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// start server after DB connects
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    process.exit(1);
  }
};

startServer();
