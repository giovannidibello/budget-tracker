// HomePage.jsx

// importo axios
import axios from 'axios';
// importo elementi pagina da react bootstrap
import { Container, Row, Col, Table, Button } from "react-bootstrap";
// importo la funzione format della libreria date-fns
import { format } from 'date-fns';
// importo la localizzazione italiana
import { it } from 'date-fns/locale';
// importo gli use
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// imposto form aggiunta movimento
import AddTransactionForm from '../components/AddTransactionForm';
// importo grafico a barre
import MontlyBarChart from '../components/MontlyBarChart';

export default function HomePage() {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const fetchTransaction = () => {
        axios.get("http://localhost:3000/api/incomes")
            .then(res => setIncomes(res.data))
            .catch(err => console.log(err));

        axios.get("http://localhost:3000/api/expenses")
            .then(res => setExpenses(res.data))
            .catch(err => console.log(err));
    };

    useEffect(fetchTransaction, []);

    const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0).toFixed(2);
    const totalExpense = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const getMonthKey = (dateStr) => {
        const date = new Date(dateStr);
        return format(date, 'yyyy-MM');
    };

    const monthlyData = {};

    incomes.forEach(income => {
        const month = getMonthKey(income.date);
        if (!monthlyData[month]) {
            monthlyData[month] = { incomes: 0, expenses: 0 };
        }
        monthlyData[month].incomes += parseFloat(income.amount);
    });

    expenses.forEach(expense => {
        const month = getMonthKey(expense.date);
        if (!monthlyData[month]) {
            monthlyData[month] = { incomes: 0, expenses: 0 };
        }
        monthlyData[month].expenses += parseFloat(expense.amount);
    });

    const sortedMonths = Object.keys(monthlyData).sort();

    const goToIncomePage = () => {
        navigate("/entrate", { state: { incomes } });
    };

    const goToExpensePage = () => {
        navigate("/uscite", { state: { expenses } });
    };

    return (
        <>
            <Container className="mt-4">
                <h2 className="mb-3 d-flex justify-content-between align-items-center">
                    <Button className='button' variant="success" onClick={goToIncomePage}>Vai alla Pagina Entrate</Button>
                    <Button className='button' variant="success" onClick={goToExpensePage}>Vai alla Pagina Uscite</Button>
                    <Button className='button' variant="success" onClick={handleShowModal} >Aggiungi Movimento</Button>
                </h2>

                <Row>
                    <Col md={6}>
                        <h3>Riepilogo Entrate-Uscite</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Mese</th>
                                    <th>Entrate</th>
                                    <th>Uscite</th>
                                    <th>CashFlow</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedMonths.map(month => {
                                    const data = monthlyData[month];
                                    const cashFlow = data.incomes - data.expenses;

                                    return (
                                        <tr key={month}>
                                            <td>{format(new Date(month + '-01'), 'MMMM yyyy', { locale: it })}</td>
                                            <td>{data.incomes.toFixed(2)} €</td>
                                            <td>{data.expenses.toFixed(2)} €</td>
                                            <td style={{ color: cashFlow >= 0 ? 'green' : 'red' }}>
                                                {cashFlow.toFixed(2)} €
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr className="table-success fw-bold">
                                    <td>Totale</td>
                                    <td>{totalIncome} €</td>
                                    <td>{totalExpense} €</td>
                                    <td>{(totalIncome - totalExpense).toFixed(2)} €</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    {/* Colonna Grafico Entrate-Uscite */}
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <MontlyBarChart incomes={incomes} expenses={expenses} />
                    </Col>
                </Row>

                <AddTransactionForm show={showModal} handleClose={handleCloseModal} fetchTransaction={fetchTransaction} />
            </Container>
        </>
    );
}
