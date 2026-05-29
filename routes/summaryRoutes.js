const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    let income = 0;
    let expense = 0;

    const categoryData = {};

    expenses.forEach((item) => {
      if (item.type === "income") {
        income += item.amount;
      } else {
        expense += item.amount;

        if (categoryData[item.category]) {
          categoryData[item.category] += item.amount;
        } else {
          categoryData[item.category] = item.amount;
        }
      }
    });

    res.json({
      income,
      expense,
      balance: income - expense,
      categories: categoryData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;