// ExpensePage.jsx

// importo axios
import axios from 'axios';

// importo i component di bootstrap
import { Container, Row, Col, Table, Button } from "react-bootstrap";

// importo uselocation
import { useLocation } from 'react-router-dom';

// importo il contesto globale
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

// importo la localizzazione italiana
import { it } from 'date-fns/locale';

// importo parseIso per data in utc
import { parseISO } from 'date-fns';

// importo useState
import { useState } from "react"

// importo la funzione format della libreria date-fns
import { format } from 'date-fns';

// importo il componente di form per aggiungere una transazione
import AddTransactionForm from '../components/AddTransactionForm';
// importo grafico
import CombinedChart from '../components/CombinedChart';

export default function ExpensePage() {

    const { expenses, fetchTransaction } = useContext(GlobalContext);
    const location = useLocation();

    // setto lo stato del componente   
    const [showModal, setShowModal] = useState(false);

    // Ottieni il mese selezionato se presente (quando arrivi da click)    
    const [selectedMonth, setSelectedMonth] = useState(location.state?.selectedMonth || null);

    // filtro le uscite per il mese selezionato
    const currentMonthExpenses = selectedMonth
        ? expenses.filter(expense => {
            const dateUTC = parseISO(expense.date);
            return format(dateUTC, 'yyyy-MM') === selectedMonth;
        })
        : [];

    // calcolo il totale delle uscite per il mese selezionato
    const totalCurrentMonthExpense = currentMonthExpenses.reduce((sum, expense) => {
        const parsedAmount = parseFloat(expense.amount.replace(',', '.'));
        return sum + (isNaN(parsedAmount) ? 0 : parsedAmount);
    }, 0).toFixed(2);

    // funzioni per gestire l'apertura e la chiusura del modale
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // raggruppamento per mese
    const groupedByMonth = expenses.reduce((acc, expense) => {
        const month = format(parseISO(expense.date), 'yyyy-MM');
        if (!acc[month]) acc[month] = [];
        acc[month].push(expense);
        return acc;
    }, {});

    const monthExpenses = selectedMonth ? groupedByMonth[selectedMonth] : [];

    // funzione rimozione uscita
    const handleDelete = async (id) => {
        if (!window.confirm("Sei sicuro di voler eliminare questa transazione?")) return;

        try {
            const response = await axios.delete(`http://localhost:3000/api/expenses/${id}`);

            if (response.status === 204) {
                // Ricarica i dati
                fetchTransaction();
            } else {
                console.error("Errore nella cancellazione:", response.statusText);
            }
        } catch (error) {
            console.error("Errore nella richiesta di cancellazione:", error);
        }
    };

    return (
        <>

            <Container className="mt-4">
                <h2 className="mb-3 d-flex justify-content-between align-items-center">
                    Uscite

                    <Button className='button' variant="success" onClick={handleShowModal} >
                        Aggiungi Movimento
                    </Button>
                </h2>

                <Row>
                    <Col md={7}>
                        {selectedMonth && (
                            <>
                                <h4 className="mt-5">Dettagli per {format(new Date(selectedMonth + "-01"), 'MMMM yyyy', { locale: it })}</h4>
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
                                        {monthExpenses && monthExpenses.length > 0 ? (
                                            monthExpenses.map((expense, index) => (
                                                <tr key={index}>
                                                    <td>{format(new Date(expense.date), 'dd/MM/yyyy')}</td>
                                                    <td>{expense.description}</td>
                                                    <td>{expense.amount}€</td>
                                                    <td>{expense.category_name}</td>
                                                    <td>{expense.payment_method}</td>
                                                    <td>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleDelete(expense.id)} // Elimina la transazione
                                                        >
                                                            Elimina
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">Nessuna uscita per questo mese</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <h5 className="text-end">Totale Uscite: {totalCurrentMonthExpense}€</h5>
                            </>
                        )}
                    </Col>

                    <Col md={5} className="d-flex justify-content-center align-items-center">
                        {selectedMonth ? (
                            <CombinedChart expenses={monthExpenses} incomes={[]} />
                        ) : (
                            <p className="text-muted">Seleziona un mese per vedere il grafico</p>
                        )}
                    </Col>
                </Row>
            </Container>

            {/* modale per aggiungere una nuova transazione */}
            <AddTransactionForm show={showModal} handleClose={handleCloseModal} fetchTransaction={fetchTransaction} />

        </>
    );

}