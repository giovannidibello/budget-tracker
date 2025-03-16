// importo express
const express = require('express')
const router = express.Router();

// importo le funzioni del controller
const budgetController = require("../controllers/BudgetController");

// index
router.get('/', budgetController.index);

// store 
router.post('/', budgetController.store);

// esporto router
module.exports = router;