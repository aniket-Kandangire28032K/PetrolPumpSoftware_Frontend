import React, { useEffect, useState } from "react";
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
import axios from "axios";
import "./component.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ dates }) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [Shifts, setShits] = useState([]);

  // 👉 Current month (YYYY-MM)
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentMonth = `${currentDate.getFullYear()}-${month}`;

  // 👉 Fetch data
  const getShifts = async () => {
    try {
      const res = await axios.get(`${URL}/api/shift`);
      setShits(res.data.shiftData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShifts();
  }, []);

  // 👉 Filter shifts
  const filteredShifts =
    dates && dates.length > 0
      ? Shifts.filter((item) => dates.includes(item.date))
      : Shifts.filter((item) => item.date.startsWith(currentMonth));

  // 👉 Reduce data
  const result = filteredShifts.reduce((acc, item) => {
    const date = item.date;

    const shiftTotal = item.nozels.reduce(
      (sum, n) => sum + Number(n.salerate || 0),
      0
    );

    acc[date] = (acc[date] || 0) + shiftTotal;

    return acc;
  }, {});

  // 👉 Sort dates
  const sortedKeys = Object.keys(result).sort();
  const sortedValues = sortedKeys.map((key) => result[key]);

  // 👉 Chart data
  const data = {
    labels: sortedKeys,
    datasets: [
      {
        label: "Daily sales",
        data: sortedValues,
        backgroundColor: "#255957",
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

export default BarChart;