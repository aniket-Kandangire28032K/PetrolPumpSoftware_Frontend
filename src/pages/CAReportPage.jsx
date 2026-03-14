import { useState } from "react";

const CAReportPage = () => {
  // Mock data
  const [sales, setSales] = useState([
    { fuelType: "Petrol", quantity: 10000, rate: 96 },
    { fuelType: "Diesel", quantity: 8000, rate: 88 }
  ]);

  const [expenses, setExpenses] = useState([
    { category: "Electricity", amount: 12000 },
    { category: "Staff Salary", amount: 50000 },
    { category: "Maintenance", amount: 15000 }
  ]);

  const [creditCustomers, setCreditCustomers] = useState([
    { name: "Rajesh", outstanding: 20000 },
    { name: "Suresh", outstanding: 15000 }
  ]);

  // Calculate totals
  const totalSales = sales.reduce((sum, s) => sum + s.quantity * s.rate, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalOutstanding = creditCustomers.reduce((sum, c) => sum + Number(c.outstanding), 0);
  const netProfit = totalSales - totalExpenses - totalOutstanding;

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h2>CA Financial Report</h2>

      {/* Sales Summary */}
      <h3>Sales Summary</h3>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Fuel Type</th>
            <th>Quantity (L)</th>
            <th>Rate (₹/L)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, idx) => (
            <tr key={idx}>
              <td>{s.fuelType}</td>
              <td>{s.quantity}</td>
              <td>{s.rate}</td>
              <td>{s.quantity * s.rate}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total Sales</td>
            <td style={{ fontWeight: "bold" }}>{totalSales}</td>
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
          {expenses.map((e, idx) => (
            <tr key={idx}>
              <td>{e.category}</td>
              <td>{e.amount}</td>
            </tr>
          ))}
          <tr>
            <td style={{ textAlign: "right", fontWeight: "bold" }}>Total Expenses</td>
            <td style={{ fontWeight: "bold" }}>{totalExpenses}</td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* Credit Customer Summary */}
      <h3>Credit Customers Outstanding</h3>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Outstanding (₹)</th>
          </tr>
        </thead>
        <tbody>
          {creditCustomers.map((c, idx) => (
            <tr key={idx}>
              <td>{c.name}</td>
              <td>{c.outstanding}</td>
            </tr>
          ))}
          <tr>
            <td style={{ textAlign: "right", fontWeight: "bold" }}>Total Outstanding</td>
            <td style={{ fontWeight: "bold" }}>{totalOutstanding}</td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* Net Profit */}
      <h3>Net Profit / Loss</h3>
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        ₹ {netProfit >= 0 ? netProfit : `-${Math.abs(netProfit)}`} ({netProfit >= 0 ? "Profit" : "Loss"})
      </div>
    </div>
  );
};

export default CAReportPage;