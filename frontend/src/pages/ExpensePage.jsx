// ExpensePage.jsx

// importo i component di bootstrap
import { Container, Row, Col, Table, Button } from "react-bootstrap";

// importo la funzione format della libreria date-fns
import { format } from 'date-fns';

// importo useLocation
import { useLocation } from 'react-router-dom';

// uso di state e effect
import { useState } from "react"

// importo il componente di form per aggiungere una transazione
import AddTransactionForm from '../components/AddTransactionForm';
// importo grafico
import CombinedChart from '../components/CombinedChart';

export default function ExpensePage() {

    const location = useLocation();

    // importo le uscite e la funzione di fetch
    const expenses = location.state?.expenses || [];
    const fetchTransaction = location.state?.fetchTransaction || (() => { });

    // calcolo le uscite totali
    const totalExpense = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2);

    // setto lo stato del componente   
    const [showModal, setShowModal] = useState(false);

    // funzioni per gestire l'apertura e la chiusura del modale
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    return (
        <>

            <Container className="mt-4">
                <h2 className="mb-3 d-flex justify-content-between align-items-center">
                    I tuoi Movimenti

                    <Button className='button' variant="success" onClick={handleShowModal} >
                        Aggiungi Movimento
                    </Button>
                </h2>

                <Row>
                    {/* Colonna Tabella Uscite */}
                    <Col md={6}>
                        <h3>Uscite</h3>
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
                        <h5 className="text-end">Totale Uscite: {totalExpense}€</h5>
                    </Col>

                    {/* Colonna Grafico Uscite */}
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <CombinedChart incomes={[]} expenses={expenses} />
                    </Col>
                </Row>
            </Container>

            {/* modale per aggiungere una nuova transazione */}
            <AddTransactionForm show={showModal} handleClose={handleCloseModal} fetchTransaction={fetchTransaction} />

        </>
    );

}