// importo il file di connessione al database
const connection = require('../data/db');

// index
function index(req, res) {

    // preparo la query
    const sql = 'SELECT * FROM transactions';

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
module.exports = { index, store }