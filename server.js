const express = require("express");
const mongoose = require("mongoose");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/expenses", expenseRoutes);

// MongoDB connection (you already did Day 1)
mongoose.connect("mongodb://127.0.0.1:27017/expense-tracker")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});