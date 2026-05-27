const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/expense-tracker")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});