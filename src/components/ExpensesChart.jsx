import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./component.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesChart = ({ dates }) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [expenses, setExpenses] = useState([]);

  // 👉 Current month (YYYY-MM)
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentMonth = `${currentDate.getFullYear()}-${month}`;

  // 👉 Fetch expenses
  const getExpenses = async () => {
    try {
      const res = await axios.get(`${URL}/api/expenses`);
      setExpenses(res.data.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  // 👉 Filter expenses
  const filteredExpenses =
    dates && dates.length > 0
      ? expenses.filter((item) => dates.includes(item.date))
      : expenses.filter((item) => item.date.startsWith(currentMonth));

  // 👉 Reduce data
  const result = filteredExpenses.reduce((acc, item) => {
    const date = item.date;

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date] += Number(item.amount || 0);

    return acc;
  }, {});

  // 👉 Sort data
  const sortedKeys = Object.keys(result).sort();
  const sortedValues = sortedKeys.map((key) => result[key]);

  // 👉 Chart data
  const data = {
    labels: sortedKeys,
    datasets: [
      {
        label: "Daily Expense",
        data: sortedValues,
        backgroundColor: "#008fff",
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="chart">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default ExpensesChart;