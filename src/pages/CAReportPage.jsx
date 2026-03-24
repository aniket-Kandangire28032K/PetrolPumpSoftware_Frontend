import { useEffect, useState } from "react";
import { useGet } from "../Hooks/useGet.jsx";
import useGetShift from "../Hooks/useGetShift.jsx";
import axios from "axios";
const CAReportPage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const filterDate = `${date.getFullYear()}-${month}`;
  const { shiftData, getShiftData } = useGetShift();
  const [expenses, setExpenses] = useState([]);
  const [totalValues, setTotalValues] = useState({
    totalSales: 0,
    totalExpenses: 0,
    totalCredits: 0,
  });
  const [sales, setSales] = useState([]);
  let filterData = [];

  const getExpenses = async () => {
    try {
      const res = await axios.get(`${URL}/api/expenses`);
      let filterExpenses= res.data.expenses.filter((item) => (String(item.date).includes(filterData)))
      const expens = filterExpenses.reduce((acc,item)=>{
        if(!acc[item.category]){
          acc[item.category] = 0
        }
         acc[item.category] += item.amount
        return acc
      },{})
      const totalexpenses = Object.values(expens).reduce((sum,val)=> sum + val,0)
      setExpenses(expens);
      setTotalValues({...totalValues,totalExpenses:totalexpenses})
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate totals
  // const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  useEffect(() => {
    if (!shiftData) return;
    filterData = shiftData.filter((e) => e.date.includes(filterDate));
    const SaleTotal = filterData.reduce((sum, s) => sum + s.total, 0);
    setTotalValues((prev) => ({ ...prev, totalSales: SaleTotal }));
    // const totalOutstanding = creditCustomers.reduce((sum, c) => sum + Number(c.outstanding), 0);
    // const netProfit = totalSales - totalExpenses - totalOutstanding;
  }, [shiftData]);
  
  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <div className="ca-report">
      <h2>CA Financial Report</h2>

      {/* Sales Summary */}
      <h3>Sales Summary</h3>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Fuel Type</th>
            <th>Quantity (L)</th>
            <th>Rate (₹/L)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {shiftData.map((e) =>
            e.nozels.map((data, num) => (
              <tr key={num}>
                <td>{e.date}</td>
                <td style={{ textTransform: "capitalize" }}>{data.fuel}</td>
                <td>{data.sale}</td>
                <td>{data.rate}</td>
                <td>{data.salerate}</td>
              </tr>
            )),
          )}
          <tr>
            <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>
              Total Sales
            </td>
            <td style={{ fontWeight: "bold" }}>{totalValues.totalSales}</td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* Expenses Summary */}
      <h3>Expenses Summary</h3>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(expenses).map(([category,amount]) =>(
              <tr key={category}>
                <td style={{ textTransform: "capitalize" }}>{category}</td>
                <td>{amount}</td>
              </tr>
            ))
          }
          <tr>
            <td style={{ textAlign: "right", fontWeight: "bold" }}>
              Total Expenses
            </td>
            <td style={{ fontWeight: "bold" }}>{totalValues.totalExpenses}</td>
          </tr>
        </tbody>
      </table>

      {/* Net Profit */}
      {/* <h3>Net Profit / Loss</h3>
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        ₹ {netProfit >= 0 ? netProfit : `-${Math.abs(netProfit)}`} ({netProfit >= 0 ? "Profit" : "Loss"})
      </div> */}
      
    </div>
  );
};

export default CAReportPage;
