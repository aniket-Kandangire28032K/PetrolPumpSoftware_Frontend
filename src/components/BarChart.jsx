import React,{useEffect, useState} from 'react'
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
import axios from 'axios';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({dates}) => {
    const URL = import.meta.env.VITE_BACKEND_URL
  const [Shifts,setShits]   = useState([])
  const getShifts = async () => {
    try {
        const res = await axios.get(`${URL}/api/shift`)
        setShits(res.data.shiftData)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    getShifts();
  },[])
  const result = Shifts.reduce((acc, item) => {
  const date = item.date;
  // sum salerate inside nozels
  const shiftTotal = item.nozels.reduce(
    (sum, n) => sum + Number(n.salerate || 0),
    0
  );

  if (!acc[date]) {
    acc[date] = 0;
  }

  acc[date] += shiftTotal;

  return acc;
}, {});
const data = {
    labels : Object.keys(result),
    datasets:[
        {
        label:"Daily sales",
        data:Object.values(result),
        backgroundColor:"#00ff00",
        BorderWidth:0    
        }]
}
  return (
    <div className='chart'>
    <Bar data={data}/>
    </div>
    
  )
}

export default BarChart