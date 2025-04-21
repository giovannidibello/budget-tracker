// GlobalContext.jsx

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    const getMonthlyData = () => {
        const data = {};
        incomes.forEach(income => {
            const month = getMonthKey(income.date);
            if (!data[month]) {
                data[month] = { incomes: 0, expenses: 0 };
            }
            data[month].incomes += parseFloat(income.amount);
        });

        expenses.forEach(expense => {
            const month = getMonthKey(expense.date);
            if (!data[month]) {
                data[month] = { incomes: 0, expenses: 0 };
            }
            data[month].expenses += parseFloat(expense.amount);
        });

        return data;
    };

    return (
        <GlobalContext.Provider value={{
            incomes,
            expenses,
            showModal,
            setShowModal,
            handleShowModal,
            handleCloseModal,
            fetchTransaction,
            totalIncome,
            totalExpense,
            getMonthKey,
            getMonthlyData
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
