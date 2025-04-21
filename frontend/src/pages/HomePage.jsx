// HomePage.jsx

// importo elementi pagina da react bootstrap
import { Container, Row, Col, Table, Button } from "react-bootstrap";
// importo la funzione format della libreria date-fns
import { format } from 'date-fns';
// importo la localizzazione italiana
import { it } from 'date-fns/locale';
// importo gli use
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// importo il globalcontext
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

// imposto form aggiunta movimento
import AddTransactionForm from '../components/AddTransactionForm';
// importo grafico a barre
import MontlyBarChart from '../components/MontlyBarChart';

export default function HomePage() {
    const {
        incomes,
        expenses,
        showModal,
        handleShowModal,
        handleCloseModal,
        fetchTransaction,
        totalIncome,
        totalExpense,
        getMonthKey,
        getMonthlyData,
    } = useContext(GlobalContext);

    const navigate = useNavigate();

    const monthlyData = getMonthlyData();
    const sortedMonths = Object.keys(monthlyData).sort();


    // navigazione al mese dell'entrata o dell'uscita selezionata
    const goToIncomePageWithMonth = (month) => {
        navigate("/entrate", { state: { selectedMonth: month, incomes } });
    };

    const goToExpensePageWithMonth = (month) => {
        navigate("/uscite", { state: { selectedMonth: month, expenses } });
    };

    return (
        <>
            <Container className="mt-4">
                <h2 className="mb-3 d-flex justify-content-end">
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
                                            <td
                                                style={{ cursor: 'pointer', color: 'green' }}
                                                onClick={() => goToIncomePageWithMonth(month)}
                                            >
                                                {data.incomes.toFixed(2)} €
                                            </td>
                                            <td
                                                style={{ cursor: 'pointer', color: 'red' }}
                                                onClick={() => goToExpensePageWithMonth(month)}
                                            >
                                                {data.expenses.toFixed(2)} €
                                            </td>
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
