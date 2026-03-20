require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");

// CONNECT ROUTES (ADD THIS)
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log(err));

  
// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});