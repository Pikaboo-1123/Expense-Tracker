const Expense = require("../models/Expense");
console.log("Expense model:", Expense); 
const addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const expense = new Expense({ title, amount, category });
    await expense.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addExpense };