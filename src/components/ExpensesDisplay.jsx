import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./component.css"

const ExpensesDisplay = () => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [expensesList,setExpensesList] =useState([]);
    const getExpenses = async () => {
        try {
            const res = await axios.get(`${URL}/api/expenses`);
            setExpensesList(res.data.expenses)
        } catch (error) {
            console.log(error)
        }finally{
            
        }
    }
    useEffect(()=>{
        getExpenses();
    },[])
  return (
    <div className='expenses-table'>
        <h3>Expenses</h3>
        <table border={1}>
            <thead>
                <tr>
                    <th>No</th>
                    <th>date</th>
                    <th>Category</th>
                    <th>paymeny mode</th>
                    <th>Amount</th>
                    <th>notes</th>
                </tr>
            </thead>
            <tbody>
                {
                    expensesList.map((item,num)=>(
                        <tr key={item._id}>
                            <td>{num+1}</td>
                            <td>{item.date.split("-").reverse().join("-")}</td>
                            <td>{item.category}</td>
                            <td>{item.paymentMode}</td>
                            <td>{item.amount}</td>
                            <td>{item.notes}</td>
                        </tr>
                    ))
                }
            </tbody>        
        </table>
    </div>
  )
}
// export { getExpenses };
export default ExpensesDisplay