// CombinedChart.jsx

// importo gli elementi del grafico e delle tabelle
import { PieChart, Pie, Cell, Tooltip, Legend, LabelList } from 'recharts';

export default function CombinedChart({ incomes = [], expenses = [] }) {
    const incomeData = incomes.reduce((acc, income) => {
        const category = income.category_name;
        acc[category] = (acc[category] || 0) + parseFloat(income.amount);
        return acc;
    }, {});

    const expenseData = expenses.reduce((acc, expense) => {
        const category = expense.category_name;
        acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
        return acc;
    }, {});

    const combined = [];

    if (incomes.length > 0) {
        Object.keys(incomeData).forEach(cat => {
            combined.push({
                name: cat + (expenses.length > 0 ? ' (Entrata)' : ''),
                value: incomeData[cat],
            });
        });
    }

    if (expenses.length > 0) {
        Object.keys(expenseData).forEach(cat => {
            combined.push({
                name: cat + (incomes.length > 0 ? ' (Uscita)' : ''),
                value: expenseData[cat],
            });
        });
    }

    const COLORS = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f'
    ];

    // titolo dinamico
    let title = '';
    if (incomes.length > 0 && expenses.length > 0) {
        title = 'Entrate e Uscite per Categoria';
    } else if (incomes.length > 0) {
        title = 'Entrate per Categoria';
    } else if (expenses.length > 0) {
        title = 'Uscite per Categoria';
    } else {
        title = 'Nessun dato disponibile';
    }

    return (
        <div className="text-center">
            <h4>{title}</h4>

            {combined.length > 0 && (
                <PieChart width={500} height={400}>
                    <Pie
                        data={combined}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={140}
                    >
                        {combined.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}`} />
                    <Legend
                        wrapperStyle={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}
                    />
                </PieChart>
            )}
        </div>
    );
}
