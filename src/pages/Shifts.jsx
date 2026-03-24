import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Shifts = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const [sortData,setSortData] = useState({
    date:"",
    shift:""
  })
  const [shiftDetails,setShiftDetails] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const getShiftDetails = async () => {
    try {
      const res = await axios.get(`${URL}/api/shift`)
      setShiftDetails(res.data.shiftData)
      setFilteredData(res.data.shiftData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getShiftDetails();
  },[])
  useEffect(() => {
  let list = shiftDetails;

  if (sortData.date) {
    list = list.filter(item => item.date === sortData.date);
  }

  if (sortData.shift) {
    list = list.filter(item => item.shift === sortData.shift);
  }

  setFilteredData(list);

}, [sortData, shiftDetails]);
  
  return (
    <div className='shifts'>
        <h3>Shift Details</h3>
        <form>
            <label>Date:</label>
            <input type="date" value={sortData.date} onChange={e => setSortData({...sortData,date:e.target.value})}/>
            <label >Shift:</label>
            <select value={sortData.shift} onChange={e => setSortData({...sortData,shift:e.target.value})}>
                <option value="">--Shift--</option>
                <option value="1st shift">1st Shift</option>
                <option value="2nd shift">2nd Shift</option>
                <option value="3rd shift">3rd Shift</option>
            </select>
            <button type="reset" onClick={()=> setSortData({
              date:"",shift:""
            })}>Clear</button>
        </form>
       <table border={1}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Name</th>
            <th>Cashier</th>
            <th>Shift</th>
            <th>sales</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item,num)=>(
              <tr key={item._id}>
                <td>{num+1}</td>
                <td>{item.date.split("-").reverse().join("-")}</td>
                <td>{item.name}</td>
                <td>{item.cashier}</td>
                <td>{item.shift}</td>
                <td>{item.total}</td>
              </tr>
            ))
          }
        </tbody>
        </table> 
    </div>
    
  )
}

export default Shifts