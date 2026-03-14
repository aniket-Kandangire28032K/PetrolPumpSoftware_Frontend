import axios from "axios";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import ExpensesDisplay from "../components/ExpensesDisplay.jsx";


const ExpenseManagement = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [expenses, setExpenses] = useState([
    { category: "", amount: "", date: "", paymentMode: "Cash", notes: "" }
  ]);

  // Handle change in any row
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...expenses];
    updated[index][name] = value;
    setExpenses(updated);
  };

  // Add new row
  const addRow = () => {
    setExpenses([...expenses, { category: "", amount: "", date: "", paymentMode: "Cash", notes: "" }]);
  };

  // Remove a row
  const removeRow = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  // Save all expenses
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post(`${URL}/api/expenses`,expenses);
     console.log(res.data)
     Swal.fire("Success","Expenses Saved","success")

    } catch (error) {
      console.log(error)
    }finally{
      // setExpenses([{ category: "", amount: "", date: "", paymentMode: "Cash", notes: "" }]);
    }
  };
  // Grand total
  const getGrandTotal = () => {
    return expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
  };

  return (
    <div className="expenses">
      <h2>Expense Management - Multiple Expenses</h2>

      <form onSubmit={handleSubmit}>
        {expenses.map((exp, index) => (
          <div key={index} >
            <h4>Expense #{index + 1}</h4>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={exp.date}
              onChange={(e) => handleChange(index, e)}
              required
            />
            
            <label>Category</label>
            <select name="category" value={exp.category} onChange={(e) => handleChange(index, e)} required>
              <option value="">Select Category</option>
              <option>Electricity</option>
              <option>Staff Salary</option>
              <option>Maintenance</option>
              <option>Diesel Generator</option>
              <option>Office Expenses</option>
              <option>Other</option>
            </select>

            

            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={exp.amount}
              onChange={(e) => handleChange(index, e)}
              required
            />

            


            <label>Payment Mode</label>
            <select name="paymentMode" value={exp.paymentMode} onChange={(e) => handleChange(index, e)}>
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>

            

            <label>Notes</label>
            <input
              type="text"
              name="notes"
              value={exp.notes}
              onChange={(e) => handleChange(index, e)}
              placeholder="Optional"
            />


            {expenses.length > 1 && (
              <button className="rmv-btn" type="button" onClick={() => removeRow(index)} >
                <IoClose/>
              </button>
            )}
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addRow}>
          + Add Expense
        </button>

        <h3>Grand Total: ₹ {getGrandTotal()}</h3>

        <button type="submit">Save All Expenses</button>
      </form>
      <ExpensesDisplay/>  
    </div>
  );
};

export default ExpenseManagement;