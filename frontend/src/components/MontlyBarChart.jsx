// MontlyBarChart.jsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

export default function MonthlyBarChart({ incomes = [], expenses = [] }) {
    // Funzione per ottenere il mese in formato 'YYYY-MM'
    const getMonth = (date) => dayjs(date).format('YYYY-MM');

    // Raggruppa entrate per mese
    const incomeByMonth = incomes.reduce((acc, income) => {
        const month = getMonth(income.date);
        acc[month] = acc[month] || { month, Entrate: 0, Uscite: 0 };
        acc[month].Entrate += parseFloat(income.amount);
        return acc;
    }, {});

    // Raggruppa uscite per mese
    const expenseByMonth = expenses.reduce((acc, expense) => {
        const month = getMonth(expense.date);
        acc[month] = acc[month] || { month, Entrate: 0, Uscite: 0 };
        acc[month].Uscite += parseFloat(expense.amount);
        return acc;
    }, incomeByMonth); // unisci i dati in uno solo

    // Converto in array ordinato per mese
    const data = Object.values(expenseByMonth).sort((a, b) => a.month.localeCompare(b.month));

    return (
        <div className="text-center">
            <h4>Entrate e Uscite Mensili</h4>
            <ResponsiveContainer width="95%" height={350}>
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })} />
                    <Legend
                        wrapperStyle={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}
                    />
                    <Bar dataKey="Entrate" fill="#198754" />
                    <Bar dataKey="Uscite" fill="#d62728" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
