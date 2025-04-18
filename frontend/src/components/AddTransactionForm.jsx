// AddTransactionForm.jsx

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddTransactionForm = ({ show, handleClose, fetchTransaction }) => {
    const [newTransaction, setNewTransaction] = useState({
        description: '',
        amount: '',
        category_id: '',
        payment_method: '',
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Invia la nuova transazione al backend
        axios.post('http://localhost:3000/api/transactions', newTransaction)
            .then(response => {
                console.log(response.data);
                // chiudo il modale dopo il submit
                handleClose();

                // aggiorno le transazioni nella Homepage
                fetchTransaction();
            })
            .catch(error => {
                console.error('Errore durante l\'invio dei dati:', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Aggiungi Nuova Transazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    {/* Radio button per selezionare il tipo di transazione */}
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo di Transazione</Form.Label>
                        <div className="d-flex">
                            <Form.Check
                                type="radio"
                                label="Entrata"
                                name="type"
                                value="income"
                                checked={newTransaction.type === 'income'}
                                onChange={handleInputChange}
                                required
                                inline
                            />
                            <Form.Check
                                type="radio"
                                label="Uscita"
                                name="type"
                                value="expense"
                                checked={newTransaction.type === 'expense'}
                                onChange={handleInputChange}
                                required
                                inline
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Descrizione"
                            name="description"
                            value={newTransaction.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Importo</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Importo"
                            name="amount"
                            value={newTransaction.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="category_id">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            as="select"
                            name="category_id"
                            value={newTransaction.category_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleziona Categoria</option>
                            {/* Categorie per Entrate */}
                            {newTransaction.type === 'income' && (
                                <>
                                    <option value="2">Stipendio</option>
                                </>
                            )}
                            {/* Categorie per Uscite */}
                            {newTransaction.type === 'expense' && (
                                <>
                                    <option value="1">Affitto</option>
                                    <option value="3">Spesa</option>
                                    <option value="4">Trasporto</option>
                                    <option value="5">Ristorazione</option>
                                    <option value="6">Intrattenimento</option>
                                    <option value="7">Bollette</option>
                                </>
                            )}



                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="payment_method">
                        <Form.Label>Metodo di pagamento</Form.Label>
                        <Form.Control
                            as="select"
                            name="payment_method"
                            value={newTransaction.payment_method}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleziona Metodo di pagamento</option>
                            {/* Aggiungi le opzioni delle categorie qui */}
                            <option value="1">Contanti</option>
                            <option value="2">Carta di Credito</option>
                            <option value="3">Bonifico Bancario</option>
                            <option value="4">PayPal</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={newTransaction.date}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Button className='button' variant="success" type="submit">
                        Aggiungi Movimento
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTransactionForm;