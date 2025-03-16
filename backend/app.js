// importo express 
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require("cors");

// importo il file delle rotte
const budgetRouter = require('./routers/BudgetRouter');

// middleware CORS
app.use(cors({ origin: process.env.FE_APP }));

app.get('/', (req, res) => {
    res.send("Server del Budget Tracker");
})

// richiamo il file delle rotte
app.use("/api/transactions", budgetRouter)

app.listen(port, () => {
    console.log(`Esempio di applicazione in ascolto sulla porta ${port}`)
})