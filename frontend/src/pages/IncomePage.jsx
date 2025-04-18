// IncomePage.jsx

// importo i component di bootstrap
import { Container, Row, Col, Table, Button } from "react-bootstrap";

// importo useLocation
import { useLocation } from 'react-router-dom';

// importo useState
import { useState } from "react"

// importo la funzione format della libreria date-fns
import { format } from 'date-fns';

// importo il componente di form per aggiungere una transazione
import AddTransactionForm from '../components/AddTransactionForm';
// importo grafico
import CombinedChart from '../components/CombinedChart';

export default function IncomePage() {

    const location = useLocation();

    // importo le entrate e la funzione di fetch
    const incomes = location.state?.incomes || [];
    const fetchTransaction = location.state?.fetchTransaction || (() => { });

    // calcolo le entrate totali
    const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0).toFixed(2);

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
                    {/* Colonna Tabella Entrate */}
                    <Col md={6}>
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
                        <h5 className="text-end">Totale Entrate: {totalIncome}€</h5>
                    </Col>

                    {/* Colonna Grafico Entrate */}
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <CombinedChart incomes={incomes} expenses={[]} />
                    </Col>
                </Row>
            </Container>

            {/* modale per aggiungere una nuova transazione */}
            <AddTransactionForm show={showModal} handleClose={handleCloseModal} fetchTransaction={fetchTransaction} />

        </>
    );

}