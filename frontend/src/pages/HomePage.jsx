// HomePage.jsx

// importo axios
import axios from 'axios';

// importo i component di bootstrap
import { Container, Table, Button } from "react-bootstrap";

// importo la funzione format della libreria date-fns
import { format } from 'date-fns';

// uso di state e effect
import { useState, useEffect } from "react"

export default function HomePage() {

    // setto lo stato del componente
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // funzione chiamata dei dati index
    const fetchTransaction = () => {

        // chiamata per entrate
        axios.get("http://localhost:3000/api/incomes")

            .then(
                res => {
                    setIncomes(res.data)
                }
            )

            .catch(err => console.log(err)
            )

        // chiamata per uscite
        axios.get("http://localhost:3000/api/expenses")

            .then(
                res => {
                    setExpenses(res.data)
                }
            )

            .catch(err => console.log(err)
            )

    }

    useEffect(fetchTransaction, [])

    return (
        <>

            <Container className="mt-4">
                <h2 className="mb-3">Le Tue Transazioni</h2>

                {/* Tabella Entrate */}
                <h3>Entrate</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrizione</th>
                            <th>Importo</th>
                            <th>Categoria</th>
                            <th>Metodo di pagamento</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.map((income, index) => (
                            <tr key={index}>
                                <td>{format(new Date(income.date), 'dd/MM/yyyy')}</td>
                                <td>{income.description}</td>
                                <td>{income.amount}€</td>
                                <td>{income.category_name}</td>
                                <td>{income.payment_method}</td>
                                <td>
                                    <Button variant="danger" size="sm">Elimina</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Tabella Spese */}
                <h3>Spese</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrizione</th>
                            <th>Importo</th>
                            <th>Categoria</th>
                            <th>Metodo di pagamento</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{format(new Date(expense.date), 'dd/MM/yyyy')}</td>
                                <td>{expense.description}</td>
                                <td>{expense.amount}€</td>
                                <td>{expense.category_name}</td>
                                <td>{expense.payment_method}</td>
                                <td>
                                    <Button variant="danger" size="sm">Elimina</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

        </>
    );




}