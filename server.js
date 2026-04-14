const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const expenseRoutes = require("./routes/expenseRoutes");
console.log(expenseRoutes);
app.use("/api/expenses", expenseRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Server Start
app.listen(5000, () => {
  console.log("Server running on port 5000");
}); 
