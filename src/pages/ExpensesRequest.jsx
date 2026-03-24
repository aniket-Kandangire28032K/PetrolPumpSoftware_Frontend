import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const ExpensesRequest = () => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [loading,setLoading] = useState(false);
    const [requestList,setRequestList] = useState([])
    const [request,setRequest] = useState({
        date:"",
        category:"",
        requesterName:"",
        amount:0,
        notes:"",
        paymentMode:"",
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setRequest({
            ...request,
            [name]:value
        })
    }

    const getAllRequest = async () => {
        try {
            const res = await axios.get(`${URL}/api/request`);
            let requestList =res.data.requests.filter(item => item.status === "pending")
            setRequestList(requestList)
            // console.log(requestList)
        } catch (error) {
            console.log(error)
        }
    }
     const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log(request)
      const res =await axios.post(`${URL}/api/request`, request);
      Swal.fire("Sucess", "Expenses Requested", "success");
    } catch (error) {
      console.log(error.response);
      Swal.fire("Error", "Internal Server Error", "error");
    } finally {
      setLoading(false);
      setRequest({
        date:"",
        category:"",
        requesterName:"",
        amount:0,
        notes:"",
        paymentModel:"",
      })
      getAllRequest();
    }
  };
    useEffect(()=>{
        getAllRequest();    
    },[])

    const resetFun = () =>{
        setRequest({
        date:"",
        category:"",
        requesterName:"",
        amount:0,
        notes:"",
        paymentModel:"",
      })
    }
    const requestStatus = async (id,state) => {
        let object = {
            id:id,status:state
        }
        console.log(object)
        try {
            const res = await axios.patch(`${URL}/api/request`,object)
            console.log(res)
        } catch (error) {
            console.log(error.response)
        }finally{
            getAllRequest();
        }
    }
  return (
    <div className='request'>
        <h2>Expenses Requests</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Date</label>
                <input type="date" value={request.date} name='date' onChange={handleChange}/>
            </div>
            <div>
                <label>Employee Name</label>
                <input type="text" value={request.requesterName} name='requesterName' onChange={handleChange}/>
            </div>
            <div>
                <label>Category</label>
                <select value={request.category} name='category' onChange={handleChange}>
                    <option value="">--Options--</option>
                    <option value="lunch">Lunch</option>
                    <option value="tea">Tea</option>
                </select>
            </div>
            <div>
                <label>Amount</label>
                <input type="number" min={0} value={request.amount} name='amount' onChange={handleChange}/>
            </div>
            <div>
                <label>Notes</label>
                <input type="text" min={0} value={request.notes} name='notes' onChange={handleChange}/>
            </div>
            <div>
                <label >Payment Mode</label>
                <select value={request.paymentMode} name='paymentMode' onChange={handleChange}>
                    <option value="">Options</option>
                    <option value="cash">CASH</option>
                    <option value="upi">UPI</option>
                </select>
            </div>
            <div>
                {loading ? <button type='submit' style={{opacity:0.4}} disabled>Submit</button> : <button type='submit'>Submit</button>}
                <button type='reset' onClick={resetFun}>Clear</button>
            </div>
        </form>
        <div className='expense-requests'>
            {
                requestList.map((req)=>
                    <div key={req._id} className='req-card'>
                        <h3>Request</h3>
                        <p><strong>Date: </strong>{req.date}</p>
                        <p><strong>Employye Name: </strong>{req.requesterName}</p>
                        <p><strong>Cateory:</strong> {req.category}</p>
                        <p><strong>Notes: </strong>{req.notes}</p>
                        <p><strong>Amount:</strong> {req.amount}</p>
                        <p><strong>Payment Mode: </strong><span>{req.paymentMode}</span></p>
                        <p><strong>Status:</strong><span>{req.status}</span></p>
                        <button type='button' onClick={()=>requestStatus(req._id,"approved")}>approve</button>
                        <button type='button' onClick={()=>requestStatus(req._id,"denied")}>Reject</button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ExpensesRequest