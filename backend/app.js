// importo express 
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require("cors");

// importo il file delle rotte
const budgetRouter = require('./routers/budgetRouter');

// middleware CORS
app.use(cors({ origin: process.env.FE_APP }));

// registro il body-parser
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server del Budget Tracker");
})

// richiamo il file delle rotte
app.use("/api", budgetRouter)

app.listen(port, () => {
    console.log(`Esempio di applicazione in ascolto sulla porta ${port}`)
})