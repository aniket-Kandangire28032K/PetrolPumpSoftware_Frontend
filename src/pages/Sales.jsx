import { useState } from "react";
import BarChart from "../components/BarChart.jsx";
import ExpensesChart from "../components/ExpensesChart.jsx";

const Sales = () => {
  const [sortDate, setSortDate] = useState({
    startDate: "",
    endDate: "",
  });
  return (
    <div className="sales-entry">
      <h2>Sales Report</h2>
      <form>
        <label htmlFor="">Start Date:</label>
        <input type="date" />

        <label htmlFor="">End Date:</label>
        <input type="date" />

        <button type="reset">Clear</button>
      </form>
      <BarChart dates={sortDate} />
      <ExpensesChart/>
    </div>
  );
};

export default Sales;
