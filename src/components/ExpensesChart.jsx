import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesChart = () => {
    const URL= import.meta.env.VITE_BACKEND_URL;
    const [expenses,setExpenses] = useState([]);
    const getExpenses = async () => {
        try {
            const res = await axios.get(`${URL}/api/expenses`)
            setExpenses(res.data.expenses)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getExpenses();
    },[])

    const expens = expenses.reduce((acc,item) =>{
        const date = item.date;
        if(!acc[date]) acc[date] = 0;
        acc[date] += Number(item.amount || 0)
        return acc;
    },{})

    const data = {
        labels:Object.keys(expens),
        datasets:[
            {
                label:"Daily Expense",
                data:Object.values(expens),
                backgroundColor:"#008fff",
                borderWidth:0
            }
        ]
    }
    console.log(expens)
  return (
    <div className='chart'>
        <Bar data={data}/>
    </div>
  )
}

export default ExpensesChart