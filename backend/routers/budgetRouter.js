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

// destroy incomes
router.delete('/incomes/:id', budgetController.destroyIncomes);

// destroy expenses
router.delete('/expenses/:id', budgetController.destroyExpenses);

// esporto router
module.exports = router;