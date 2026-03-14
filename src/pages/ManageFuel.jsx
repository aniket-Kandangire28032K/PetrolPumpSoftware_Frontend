import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const ManageFuel = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [fuelData, setFuelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false)
  const getFuelData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/api/fuel`);
      setFuelData(res.data.fuelData);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
        setLoading(false);
    }
  };
  useEffect(() => {
    getFuelData();
  }, []);

  const DeleteFuel= async (_id,name)=>{
    const result = await Swal.fire({
        title:'Delete Fuel',
        text:'Are You Sure?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:"Delete Data"
    })
    if(!result.isConfirmed) return;
    try {
      const res = await axios.delete(`${URL}/api/fuel/${_id}`)
      console.log(res)
        Swal.fire("",`${name} Delete Sucessful`,'success')
    } catch (error) {
        console.log(error)
        Swal.fire('','Internal Server Error','error');
    }finally{
        getFuelData();
    }
  }
  return (
    <div className="manage-fuel">
      <h1>Manage Fuel</h1>
      <NavLink to='/fuel'>Add Fuel</NavLink>
      <table border={1}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Supplier</th>
            <th>Tank</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            { loading && 
            <tr>
                <td colSpan={6} style={{textAlign:'center',fontSize:'2rem'}}><strong>Loading....</strong></td>
            </tr>}
            {
                error && 
                <tr>
                    <td colSpan={6} style={{textAlign:'center',color:'crimson',fontSize:'2rem'}}>Internal Server Error</td>
                </tr>
            }
            {
               !loading && fuelData.length>0 && fuelData.map((item,num)=>(
                    <tr key={item._id || num+1}>
                        <td>{num+1}</td>
                        <td>{item.name}</td>
                        <td>{item.liters} l</td>
                        <td>₹.{item.rate}</td>
                        <td>{item.suppliername}</td>
                        <td>{item.tank || "Tank Not Set"}</td>
                        <td><button>Edit</button><button onClick={()=>DeleteFuel(item._id,item.name)}>Del</button></td>
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  );
};

export default ManageFuel;
