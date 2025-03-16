// importo express
const express = require('express')
const router = express.Router();

// importo le funzioni del controller
const budgetController = require("../controllers/BudgetController");

// index income
router.get('/incomes', budgetController.indexIncomes);

// index expenses
router.get('/expenses', budgetController.indexExpenses);

// store 
router.post('/transactions', budgetController.store);

// esporto router
module.exports = router;