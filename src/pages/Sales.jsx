import { useState } from "react";
import BarChart from "../components/BarChart.jsx";
import ExpensesChart from "../components/ExpensesChart.jsx";
import ShiftChart from "../components/ShiftChart.jsx";

const Sales = () => {
  const [sortDate, setSortDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [dates,setDates] = useState([])
  
  const getDates=(e)=> {
    e.preventDefault()
  const start = new Date(sortDate.startDate)
  const end = new Date(sortDate.endDate)

  const dates = [];

  let currentDate = new Date(start);

  while (currentDate <= end) {
    dates.push(new Date(currentDate).toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  setDates(dates)
}
const resetDates = ()=>{
  setSortDate({
     startDate: "",
    endDate: "",
  })
  setDates([])
}
  return (
    <div className="sales-entry">
      <h2>Sales Report</h2>
      <form onSubmit={getDates}>
        <label htmlFor="">Start Date:</label>
        <input type="date" onChange={e=>setSortDate({
          ...sortDate,
          startDate:e.target.value
        })} />

        <label htmlFor="">End Date:</label>
        <input type="date" 
        onChange={e=>setSortDate({
          ...sortDate,
          endDate:e.target.value
        })}
        />
        <button type="submit">Submit</button>
        <button type="reset" onClick={resetDates}>Clear</button>
      </form>
      <BarChart dates={dates} />
      <ExpensesChart dates={dates} />
      <ShiftChart dates={dates}/>
    </div>
  );
};

export default Sales;
