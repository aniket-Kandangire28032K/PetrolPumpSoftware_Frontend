import React, { useEffect, useState } from "react";
import useGetShift from "../Hooks/useGetShift.jsx";
import "./component.css";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ShiftChart = ({ dates }) => {
  const { shiftData } = useGetShift();
  const [shifts, setShifts] = useState({});

  // 👉 Current month (YYYY-MM)
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentMonth = `${currentDate.getFullYear()}-${month}`;

  useEffect(() => {
    if (!shiftData) return;

    // 👉 Filter shifts by date or month
    const filteredData = dates && dates.length > 0
      ? shiftData.filter(item => dates.includes(item.date))
      : shiftData.filter(item => item.date.startsWith(currentMonth));

    // 👉 Group by shift
    const result = filteredData.reduce((acc, item) => {
      if (!acc[item.shift]) {
        acc[item.shift] = 0;
      }

      acc[item.shift] += Number(item.total || 0);

      return acc;
    }, {});

    setShifts(result);
  }, [shiftData, dates]);

  // 👉 Sort shifts (optional)
  const sortedKeys = Object.keys(shifts);
  const sortedValues = sortedKeys.map(key => shifts[key]);

  // 👉 Chart data
  const data = {
    labels: sortedKeys,
    datasets: [
      {
        label: "Shifts",
        data: sortedValues,
        backgroundColor: ["#FFE74C", "#FF5964", "#2274A5"],
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

export default ShiftChart;