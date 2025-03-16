// importo il file di connessione al database
const connection = require('../data/db');

// index income
function indexIncomes(req, res) {

    // preparo la query
    const sql = `
        SELECT 
        incomes.id, 
        incomes.description, 
        incomes.amount, 
        incomes.date, 
        categories.name AS category_name, 
        payment_methods.name AS payment_method
        FROM incomes
        JOIN categories ON incomes.category_id = categories.id
        JOIN payment_methods ON incomes.payment_method_id = payment_methods.id;
    `;

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

// index expenses
function indexExpenses(req, res) {

    // preparo la query
    const sql = `
        SELECT 
        expenses.id, 
        expenses.description, 
        expenses.amount, 
        expenses.date, 
        categories.name AS category_name, 
        payment_methods.name AS payment_method
        FROM expenses
        JOIN categories ON expenses.category_id = categories.id
        JOIN payment_methods ON expenses.payment_method_id = payment_methods.id;
    `;

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

// store
function store(req, res) {

    // le altre info dal body
    const { amount, type, category_id, payment_method, description, date } = req.body;

    const insertReviewSql = 'INSERT INTO transactions (amount, type, category_id, payment_method, description, date) VALUES (?, ?, ?, ?, ?, ?)'

    // eseguo la query
    connection.query(insertReviewSql, [amount, type, category_id, payment_method, description, date], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Transaction added', id: results.insertId });

    });

}

// esporto tutto
module.exports = { indexIncomes, indexExpenses, store }