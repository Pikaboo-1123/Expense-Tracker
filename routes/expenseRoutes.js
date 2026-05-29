const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

// GET all expenses
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    });

    res.json(expenses);

  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// ADD expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category, type } = req.body;

    const newExpense = new Expense({
      title,
      amount,
      category,
      type,
      user: req.user.id,
    });

    const savedExpense = await newExpense.save();

    res.json(savedExpense);

  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// DELETE expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Expense deleted",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;